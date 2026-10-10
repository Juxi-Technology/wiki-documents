---
title: Fonctions avancées et suivi
---

# Fonctions avancées et suivi

> **[Acheter en boutique](https://www.juxitech.com/fr/products/2-dof-servo-pan-tilt-unit)**

Ce chapitre détaille les fonctions de suivi automatique du système : suivi de couleur, suivi de visage et suivi de QR code, ainsi que le mécanisme de verrouillage de cible et le réglage des paramètres.

---

## Aperçu des modes de suivi automatique

Le système prend en charge trois modes de suivi automatique :
1. Suivi de couleur : suit les objets d'une couleur spécifiée
2. Suivi de visage : suit les visages
3. Suivi de QR code : suit les QR codes

---

## Suivi de couleur

### Choix de la couleur

Le système prend en charge le suivi de plusieurs couleurs :
- Rouge
- Vert
- Bleu
Dans le programme, vous pouvez changer de couleur avec les touches :
- `X` : sélectionner le rouge
- `Y` : sélectionner le vert
- `Z` : sélectionner le bleu

### Flux d'utilisation du suivi de couleur

1. Appuyez sur `C` pour connecter le cardan
2. Appuyez sur `2` pour passer en mode suivi de couleur
3. Placez l'objet de la couleur cible au centre de l'image
4. Appuyez sur `T` pour verrouiller la cible
5. Déplacez la cible et observez le cardan la suivre

### Exemple simple de suivi de couleur

Vous pouvez aussi utiliser l'exemple simple de suivi de couleur :

```python
python examples/04_color_track_simple.py --camera 0 --port COM3 --color red
```

Ce programme offre la fonction de suivi de couleur la plus élémentaire ; idéal pour l'apprentissage.

---

## Suivi de visage

### Principe du suivi de visage

Le système utilise le classificateur en cascade Haar d'OpenCV pour la détection de visages. Une fois un visage détecté, le système calcule automatiquement la position de la cible et commande le cardan pour la suivre.

### Flux d'utilisation du suivi de visage

1. Appuyez sur `C` pour connecter le cardan
2. Appuyez sur `1` pour passer en mode suivi de visage
3. Placez votre visage au centre de l'image
4. Appuyez sur `T` pour verrouiller la cible
5. Déplacez votre visage : le cardan suit automatiquement

### Conseils pour améliorer la détection de visage

- Maintenez un éclairage suffisant, évitez le contre-jour
- Gardez le visage orienté face à la caméra
- Gardez une distance appropriée (1 à 3 m recommandé)
- Évitez les scènes avec plusieurs visages, ou utilisez le mécanisme de verrouillage pour fixer la cible suivie

---

## Suivi de QR code

Le mode de suivi de QR code s'appuie sur le QRCodeDetector d'OpenCV pour reconnaître et localiser les QR codes. La méthode d'utilisation est similaire aux deux modes de suivi précédents :
1. Connectez le cardan et passez en mode suivi de QR code
2. Placez le QR code au centre de l'image, puis appuyez sur `T` pour verrouiller
3. Déplacez le QR code et observez le cardan le suivre

---

## Mécanisme de verrouillage de cible

### Rôle du verrouillage

Le mécanisme de verrouillage de cible est une fonction clé du système ; il permet de :
- Enregistrer la position centrale et la taille de la cible au moment du verrouillage
- Lorsque plusieurs cibles sont présentes, privilégier la cible la plus proche du point de verrouillage
- Éviter les sauts fréquents de cible et préserver la stabilité du suivi

### Procédure de verrouillage

1. Placez l'objet cible au centre de l'image
2. Appuyez sur `T` pour effectuer le verrouillage
3. Une fois le verrouillage réussi, le système suit en priorité la cible la plus similaire à celle du moment du verrouillage
4. Appuyez sur `S` pour annuler le verrouillage et arrêter le suivi

### Logique de sélection après verrouillage

Après le verrouillage, le système tient compte de deux facteurs pour sélectionner la cible :
- Distance : proximité du centre de la cible par rapport au point de verrouillage (poids 70 %)
- Taille : similarité de la taille de la cible avec celle du moment du verrouillage (poids 30 %)
- Le système sélectionne et suit la cible au score global le plus élevé

---

## Réglage des paramètres de contrôle du suivi

Dans `src/trackers/tracking_controller.py`, les paramètres suivants sont ajustables :

|Paramètre|Valeur par défaut|Description|
|---|---|---|
|kp_pan|0.08|Gain proportionnel du suivi gauche/droite|
|kp_tilt|0.12|Gain proportionnel du suivi haut/bas|
|dead_zone|30|Zone morte (pixels) : le cardan ne bouge pas dans cette plage|
|min_move_interval|0.15|Intervalle minimal de mouvement (secondes), limite la fréquence des mouvements du cardan|


### Méthode de réglage des paramètres

- **Suivi trop lent** : augmentez `kp_pan` et `kp_tilt`
- **Suivi trop sensible provoquant des tremblements** : diminuez `kp_pan` et `kp_tilt`, ou augmentez `min_move_interval`, ou augmentez `dead_zone`
- **Ajustements fins fréquents provoquant des tremblements** : augmentez `dead_zone`
- **Direction inversée** : modifiez le signe de `delta_pan` ou `delta_tilt` dans la méthode `calculate_move`

---

## Exemple complet d'utilisation du suivi

Voici un exemple complet de flux d'utilisation :
1. Lancez le programme :

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3 --color red
```

1. Appuyez sur `C` pour connecter le cardan
2. Appuyez sur `2` pour choisir le mode suivi de couleur
3. Placez un objet rouge au centre de l'image
4. Appuyez sur `T` pour verrouiller la cible
5. Déplacez l'objet et observez le cardan le suivre
6. Pour passer au vert, appuyez sur `Y` puis verrouillez de nouveau avec `T`
7. Appuyez sur `S` pour arrêter le suivi et sur `R` pour recentrer
8. Appuyez sur `Q` pour quitter

---

## Conseils de développement avancé

Pour personnaliser les fonctions ou développer vos propres extensions, vous pouvez vous référer à :
- `src/sc_servo.py` : couche basse de communication des servos
- `src/gimbal.py` : contrôle du cardan
- `src/trackers/tracking_controller.py` : contrôleur de suivi
- `src/detectors/` : divers détecteurs de cible
