# Burgers 3D de Crunch!

Modélisés et rendus dans Blender 4.2 (Cycles), dans le style du Classic Smash : planche en bois sombre, fond sombre, lumière chaude.
Script : `../scripts/burgers-crunch-blender.py` (une recette par burger).

| Burger | Rendu (2048 px, de face) | Modèle web |
|---|---|---|
| Chicken Crispy Bacon | chicken-crispy.jpg | chicken-crispy.glb (1,3 Mo) |
| Le Forestier | forestier.jpg | forestier.glb (1,5 Mo) |
| Double Cheese Bacon | double-cheese.jpg | double-cheese.glb (1,4 Mo) |
| Chicken Avocat | chicken-avocat.jpg | chicken-avocat.glb (1,3 Mo) |
| L'Egg Bacon | egg-bacon.jpg | egg-bacon.glb (1,2 Mo) |
| Classic Smash (référence de style) | classic-smash.jpg | — |

GLB : compression Draco (glTF-Transform), environ 300 000 triangles par burger. Les couleurs sont cuites dans les sommets (pas de texture). Un objet par ingrédient, de bas en haut, ce qui permet d'animer l'assemblage couche par couche. Le burger repose sur y = 0 ; unité : mètre (pain de 11 cm). Il faut un DRACOLoader pour les charger dans three.js.

Assets Poly Haven (CC0), pour la scène des rendus uniquement : HDRI brown_photostudio_02, textures dark_wooden_planks, modèle wooden_cutting_board.
