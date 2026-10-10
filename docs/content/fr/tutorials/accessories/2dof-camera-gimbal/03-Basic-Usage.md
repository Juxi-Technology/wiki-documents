---
title: Utilisation de base
---

# Utilisation de base

> **[Acheter en boutique](https://www.juxitech.com/fr/products/2-dof-servo-pan-tilt-unit)**

Ce chapitre détaille les méthodes de contrôle de base du cardan et son flux d'utilisation, afin d'aider l'utilisateur à se familiariser avec les opérations fondamentales.

---

## Aperçu des modes de contrôle

Le système de cardan prend en charge deux modes de contrôle principaux :
1. Contrôle au clavier : pilotage manuel des mouvements du cardan avec les touches du clavier
2. Suivi automatique : le système détecte et suit automatiquement la cible

---

## Contrôle au clavier

### Description des raccourcis clavier

Voici les raccourcis clavier disponibles dans le programme principal :

|Touche|Fonction|
|---|---|
|Flèche ←|Rotation du cardan vers la gauche|
|Flèche →|Rotation du cardan vers la droite|
|Flèche ↑|Inclinaison du cardan vers le haut|
|Flèche ↓|Inclinaison du cardan vers le bas|
|C|Connecter ou déconnecter le cardan|
|R|Recentrer le cardan (retour à la position initiale)|
|1|Basculer en mode suivi de visage|
|2|Basculer en mode suivi de couleur|
|T|Verrouiller/démarrer le suivi de la cible|
|S|Arrêter le suivi|
|X|Mode couleur : suivi des objets rouges|
|Y|Mode couleur : suivi des objets verts|
|Z|Mode couleur : suivi des objets bleus|
|Q|Quitter le programme|


### Exemple de contrôle au clavier autonome

Vous pouvez également vous entraîner avec un programme de contrôle au clavier distinct :

```python
python examples/keyboard_control.py --port COM3
```

Ce programme n'offre que les fonctions de base de contrôle du cardan ; il est parfait pour les débutants.

---

## Flux d'opérations de base

### Démarrage et connexion

1. Lancez le programme principal avec la commande suivante :

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3
```

1. Une fois le programme lancé, appuyez sur `C` pour connecter le cardan
2. Vérifiez que les servos répondent normalement ; en cas d'anomalie, consultez la section Dépannage

### Exercices de contrôle manuel

1. Appuyez sur les touches fléchées et vérifiez que les mouvements du cardan correspondent à vos attentes
2. Entraînez-vous à déplacer le cardan dans différentes positions avec les touches fléchées
3. Appuyez sur `R` pour recentrer le cardan
4. Familiarisez-vous avec les limites de position minimale et maximale du cardan
Exercices suggérés :
- Exercice 1 : déplacez le cardan vers les quatre positions extrêmes (tout à gauche, tout à droite, tout en haut, tout en bas) pour vous familiariser avec la plage de positions
- Exercice 2 : recentrez le cardan depuis une position quelconque et observez si le recentrage est fluide
- Exercice 3 : essayez des réglages fins pour vous familiariser avec la précision de mouvement des servos

---

## Exemples de programmes de base

Le projet fournit plusieurs exemples de programmes progressifs pour l'apprentissage :

### Affichage de la caméra uniquement

```python
python examples/01_camera_only.py --camera 0
```

Ce programme ouvre uniquement la caméra et affiche le flux en temps réel, sans contrôle du cardan. Idéal pour vérifier le bon fonctionnement de la caméra.

### Contrôle du cardan uniquement

```python
python examples/02_gimbal_only.py --port COM3
```

Ce programme ne fournit que le contrôle du cardan, sans caméra. Idéal pour vérifier que les servos et la carte de commande sont correctement connectés.

### Caméra et cardan combinés

```python
python examples/03_simple_gimbal_camera.py --camera 0 --port COM3
```

Ce programme combine l'affichage de la caméra et le contrôle du cardan, ce qui permet d'observer l'interaction entre l'image et le cardan.

---

## Précautions d'utilisation

Pendant l'utilisation, veuillez noter les points suivants :
1. Après avoir connecté le cardan, vérifiez que l'alimentation des servos est branchée
2. En contrôle manuel, évitez de rester longtemps en position extrême
3. Évitez de heurter brutalement le support du cardan pendant l'utilisation
4. Si les servos tremblent anormalement ou émettent des bruits inhabituels, coupez immédiatement l'alimentation et vérifiez
5. En cas de non-utilisation prolongée, il est conseillé de débrancher l'alimentation
