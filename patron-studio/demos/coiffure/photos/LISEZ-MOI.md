# Photos d’Atelier Mèche

Pour changer une photo : déposez la vôtre dans ce dossier **avec le même nom**, puis relancez
`./construire-dossier-ovh.sh` (versions WebP 800 et 1 600 px créées automatiquement).
Format conseillé : vertical (4:5). Privilégiez les cheveux vus de dos ou les mains de la coiffeuse : pas de
visage reconnaissable sans l’accord écrit de la personne.

| Emplacement | Look | Description de la photo attendue |
|---|---|---|
| `look-brushing-souple` | Brushing souple | Brushing à la brosse ronde sur cheveux mi-longs |
| `look-balayage-caramel` | Balayage caramel | Cheveux longs ondulés au balayage caramel, de dos |
| `look-degrade-net` | Dégradé net | Coupe homme dégradée, vue de dos (photo recadrée pour retirer une inscription) |
| `look-chignon-boheme` | Chignon bohème | Chignon souple épinglé, de dos, mains de la coiffeuse |

L’équipe (Léa, Samir, Inès) est présentée sans photo : ajoutez des portraits uniquement avec l’accord des personnes.

## Origine (Unsplash, licence libre, usage commercial autorisé)

| Fichier | Photo d'origine |
|---|---|
| look-brushing-souple | https://images.unsplash.com/photo-1580618672591-eb180b1a973f |
| look-balayage-caramel | https://images.unsplash.com/photo-1522337360788-8b13dee7a37e |
| look-degrade-net | https://images.unsplash.com/photo-1622286342621-4bd786c2447c (recadrée) |
| look-chignon-boheme | https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3 |

## Accueil 3D : le salon

L'accueil est un salon en 3D construit en code (`src/three/Salon3D.jsx`). Les clients sont des mannequins de vitrine
sculptés en code (`src/three/Mannequin.jsx`), chacun avec la coupe de la prestation affichée (réglages dans
`clientes`, `src/data/site.js`). Aucune photo n'y est utilisée.
