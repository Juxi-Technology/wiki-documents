---
title: Guide de démarrage rapide
---

# Guide de démarrage rapide

> **[Acheter en boutique](https://www.juxitech.com/fr/products/2-dof-servo-pan-tilt-unit)**

> Destiné aux utilisateurs dont le matériel est déjà assemblé et qui souhaitent découvrir rapidement les fonctionnalités.

---

## Étape 0 : Rechercher les appareils disponibles

Avant de commencer, nous devons identifier la bonne caméra et le bon port série.

### Rechercher les caméras disponibles

```python
python examples/list_cameras.py
```

Le programme liste toutes les caméras disponibles et leur indice ; notez l'indice que vous devez utiliser (généralement 0).

### Rechercher les ports série disponibles

```python
python examples/list_ports.py
```

Le programme liste tous les ports série disponibles : sous Windows, COM3, COM4, etc. ; sous Linux, /dev/ttyUSB0, etc.

---

## Étape 1 : Installer les dépendances

```python
pip install -r requirements.txt
```

---

## Étape 2 : Exécuter les tutoriels pas à pas dans l'ordre (facultatif mais recommandé)

Pour mieux comprendre le système, il est conseillé d'exécuter ces programmes dans l'ordre :
1. **01_camera_only.py** - Affiche uniquement le flux de la caméra, sans connexion au cardan

```python
python examples/01_camera_only.py --camera 0
```

Fonction : vérifier que la caméra fonctionne correctement
1. **02_gimbal_only.py** - Contrôle uniquement le cardan, sans caméra

```python
python examples/02_gimbal_only.py --port COM3
```

Fonction : vérifier que les servos et la carte de commande sont correctement connectés
1. **03_simple_gimbal_camera.py** - Combinaison caméra + cardan

```python
python examples/03_simple_gimbal_camera.py --camera 0 --port COM3
```

Fonction : contrôler manuellement le cardan tout en visualisant le flux de la caméra
1. **04_color_track_simple.py** - Suivi de couleur simple (sans verrouillage)

```python
python examples/04_color_track_simple.py --camera 0 --port COM3 --color red
```

Fonction : démonstration de suivi automatique la plus élémentaire

---

## Étape 3 : Exécuter le programme complet

Une fois les fonctions de base maîtrisées, exécutez le programme complet de suivi automatique :

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3 --color red
```

---

## Raccourcis clavier du programme complet


|Touche|Fonction|
|---|---|
|1|Basculer en mode suivi de visage|
|2|Basculer en mode suivi de couleur|
|C|Connecter le cardan|
|R|Recentrer le cardan|
|T|Verrouiller/démarrer le suivi de la cible|
|S|Arrêter le suivi|
|X|Mode couleur : rouge|
|Y|Mode couleur : vert|
|Z|Mode couleur : bleu|
|Q|Quitter le programme|


---

## Parcours de prise en main rapide

### Test du suivi de couleur

1. Appuyez sur `C` pour connecter le cardan
2. Appuyez sur `2` pour passer en mode suivi de couleur
3. Placez un objet rouge (ou d'une autre couleur) au centre de l'image
4. Appuyez sur `T` pour verrouiller la cible
5. Déplacez l'objet et observez le cardan le suivre

### Test du suivi de visage

1. Appuyez sur `C` pour connecter le cardan
2. Appuyez sur `1` pour passer en mode suivi de visage
3. Placez votre visage au centre de l'image
4. Appuyez sur `T` pour verrouiller la cible
5. Déplacez votre visage et observez le cardan suivre le mouvement

---

## Réponses rapides aux questions fréquentes

Q : Le programme indique qu'aucun port série n'est trouvé ?
R : Exécutez `list_ports.py` pour afficher les ports série disponibles, puis spécifiez-en un avec l'argument `--port`.
Q : La caméra ne s'ouvre pas ?
R : Exécutez `list_cameras.py` pour afficher les caméras disponibles, puis spécifiez l'indice avec l'argument `--camera`.
Q : Le cardan ne bouge pas ?
R : Vérifiez que le cardan est connecté via `C` et que l'alimentation des servos est branchée.
Q : La direction du suivi est inversée ?
R : Consultez la section Dépannage.
