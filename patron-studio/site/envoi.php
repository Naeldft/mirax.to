<?php
/**
 * Patrôn Studio — réception des demandes du site (contact, devis, rappel, partenaires).
 * Hébergement OVH mutualisé : envoi par la fonction mail() de PHP, sans service tiers.
 *
 * RÉGLAGES : voir envoi-config.php (adresse de réception, adresse d'expédition).
 *
 * Protection :
 *  - méthode POST uniquement, même site d'origine, taille limitée ;
 *  - honeypot (case « botcheck ») et piège temporel (formulaire envoyé en moins de 3 s = robot) ;
 *  - validation de chaque champ côté serveur ;
 *  - aucune donnée réinjectée dans les en-têtes du mail (pas d'injection d'en-têtes) ;
 *  - 5 envois maximum par adresse IP et par 10 minutes.
 * Réponse : JSON { success: true } ou { success: false, message: "…" }.
 */

declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function repondre(bool $ok, string $message = '', int $code = 200): void {
    if (!empty($GLOBALS['formulaireClassique'])) {
        // sans JavaScript : page de remerciement, ou retour au formulaire avec le motif
        header('Location: ' . ($ok ? './merci.html' : './contact.html?erreur=' . rawurlencode($message)), true, 303);
        exit;
    }
    http_response_code($code);
    echo json_encode(['success' => $ok, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

$config = require __DIR__ . '/envoi-config.php';
$formulaireClassique = false;

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    repondre(false, 'Méthode non autorisée.', 405);
}

// Même site uniquement (protection contre l'envoi depuis un autre site)
$origine = $_SERVER['HTTP_ORIGIN'] ?? '';
$hote = $_SERVER['HTTP_HOST'] ?? '';
$hoteSansPort = strtolower(preg_replace('/:\d+$/', '', $hote) ?? '');
if ($origine !== '' && strtolower((string) parse_url($origine, PHP_URL_HOST)) !== $hoteSansPort) {
    repondre(false, 'Origine non autorisée.', 403);
}

// Lecture (JSON envoyé par contact-form.js), 20 Ko maximum
$formulaireClassique = stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') === false;
if ($formulaireClassique) {
    // formulaire HTML sans JavaScript (contact.html) : réponse = redirection vers une page
    $donnees = $_POST;
    $c = trim((string) ($donnees['contact'] ?? ''));
    if (filter_var($c, FILTER_VALIDATE_EMAIL)) {
        $donnees['email'] = $c;
    } else {
        $donnees['phone'] = $c;
    }
} else {
    $brut = file_get_contents('php://input', false, null, 0, 20000);
    $donnees = json_decode($brut ?: '', true);
}
if (!is_array($donnees)) {
    repondre(false, 'Demande illisible.', 400);
}

// Honeypot : un humain ne coche jamais cette case invisible. On répond « succès » sans rien envoyer.
if (!empty($donnees['botcheck'])) {
    repondre(true);
}

// Piège temporel : horodatage (ms) posé à l'affichage du formulaire
$affiche = isset($donnees['_t']) ? (int) $donnees['_t'] : 0;
$maintenant = (int) round(microtime(true) * 1000);
if ($affiche > 0 && ($maintenant - $affiche) < 3000) {
    repondre(true);
}

// Limite d'envois par adresse IP (fichiers dans un dossier temporaire, empreinte de l'IP seulement)
$ip = $_SERVER['REMOTE_ADDR'] ?? 'inconnue';
$dossier = sys_get_temp_dir() . '/patron-envois';
if (!is_dir($dossier)) {
    @mkdir($dossier, 0700, true);
}
$fichier = $dossier . '/' . hash('sha256', $ip . ($config['sel'] ?? '')) . '.json';
$historique = is_file($fichier) ? (json_decode((string) @file_get_contents($fichier), true) ?: []) : [];
$historique = array_values(array_filter($historique, fn($t) => is_int($t) && $t > time() - 600));
if (count($historique) >= 5) {
    repondre(false, 'Trop de demandes envoyées. Réessayez dans quelques minutes, ou appelez-nous.', 429);
}

// Nettoyage et validation des champs
function texte($v, int $max): string {
    $v = is_scalar($v) ? (string) $v : '';
    $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $v) ?? '';
    return trim(mb_substr($v, 0, $max));
}
function ligne($v, int $max): string {
    return str_replace(["\r", "\n"], ' ', texte($v, $max));
}

$nom = ligne($donnees['name'] ?? '', 120);
$contact = ligne($donnees['contact'] ?? '', 160);
$sujet = ligne($donnees['subject'] ?? 'Nouvelle demande', 160);
$message = texte($donnees['message'] ?? '', 8000);
$page = ligne($donnees['page'] ?? '', 300);
$email = ligne($donnees['email'] ?? '', 160);
$tel = ligne($donnees['phone'] ?? '', 40);

$emailValide = $email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL);
$telValide = $tel !== '' && preg_match('/^\+?[0-9 .()-]{8,20}$/', $tel);

if ($nom === '' || mb_strlen($nom) < 2) {
    repondre(false, 'Indiquez votre nom.', 422);
}
if (!$emailValide && !$telValide) {
    repondre(false, 'Indiquez une adresse e-mail ou un numéro de téléphone valide.', 422);
}
if ($message === '') {
    repondre(false, 'Écrivez quelques mots.', 422);
}
// Trop de liens = spam
if (preg_match_all('#https?://#i', $message) > 5) {
    repondre(true);
}

// Autres champs éventuels (partenaires…) : ajoutés au corps du mail, jamais aux en-têtes
$connus = ['name', 'contact', 'subject', 'message', 'page', 'email', 'phone', 'botcheck', '_t'];
$autres = '';
foreach ($donnees as $cle => $valeur) {
    if (in_array($cle, $connus, true) || !is_string($cle) || !preg_match('/^[a-z0-9_-]{1,40}$/i', $cle)) {
        continue;
    }
    $autres .= ucfirst($cle) . ' : ' . texte(is_array($valeur) ? implode(', ', array_map('strval', $valeur)) : $valeur, 1000) . "\n";
}

$corps = "Nouvelle demande reçue depuis le site.\n\n"
    . "Nom : $nom\n"
    . "Contact : $contact\n"
    . ($emailValide ? "E-mail : $email\n" : '')
    . ($telValide ? "Téléphone : $tel\n" : '')
    . ($autres !== '' ? "\n$autres" : '')
    . "\nMessage :\n$message\n\n"
    . "Page : $page\n"
    . 'Date : ' . date('d/m/Y H:i') . "\n";

// En-têtes : uniquement des valeurs fixes de la configuration (+ Reply-To validé)
$destinataire = $config['destinataire'];
$expediteur = $config['expediteur'];
$entetes = [
    'From: =?UTF-8?B?' . base64_encode('Site Patrôn Studio') . '?= <' . $expediteur . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];
if ($emailValide) {
    $entetes[] = 'Reply-To: ' . $email;
}
$objet = '=?UTF-8?B?' . base64_encode($sujet) . '?=';

$envoye = @mail($destinataire, $objet, $corps, implode("\r\n", $entetes), '-f' . $expediteur);
if (!$envoye) {
    repondre(false, 'Le serveur n’a pas pu envoyer le message.', 500);
}

$historique[] = time();
@file_put_contents($fichier, json_encode($historique), LOCK_EX);
repondre(true);
