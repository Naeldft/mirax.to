<?php
/**
 * Réglages de l'envoi des demandes (envoi.php).
 *
 * destinataire : l'adresse qui reçoit les demandes.
 * expediteur   : une adresse DE VOTRE DOMAINE (OVH refuse ou classe en spam les mails
 *                envoyés « de la part » d'un autre domaine). Elle n'a pas besoin d'exister
 *                comme boîte mail, mais c'est mieux si elle existe (ex. ne-pas-repondre@…).
 * sel          : texte au hasard, sert seulement à anonymiser les adresses IP
 *                dans la limite d'envois. Changez-le une fois.
 *
 * Ce fichier n'est pas lisible depuis le navigateur (protégé par .htaccess).
 */
return [
    'destinataire' => 'admin.ps@xn--patrn-studio-hib.fr',
    'expediteur' => 'ne-pas-repondre@xn--patrn-studio-hib.fr',
    'sel' => 'remplacez-moi-par-un-texte-au-hasard',
];
