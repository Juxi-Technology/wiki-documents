---
title: Dépannage
---

# Dépannage

> **[Acheter en boutique](https://www.juxitech.com/fr/products/2-dof-servo-pan-tilt-unit)**

Ce chapitre récapitule les problèmes courants et leurs solutions, afin d'aider l'utilisateur à diagnostiquer et résoudre rapidement les différents problèmes rencontrés lors de l'utilisation.

---

## Problèmes matériels

### Le servo ne répond pas

**Causes possibles :**
1. Alimentation des servos non connectée
2. Connexion défectueuse entre le servo et la carte de commande
3. Échec de la connexion du port série
4. Servo non activé
**Solutions :**
1. Vérifiez que l'alimentation des servos est correctement connectée et sous tension
2. Vérifiez que les câbles entre les servos et la carte de commande sont bien fixés
3. Exécutez `examples/diagnostic.py` pour consulter les informations de diagnostic
4. Assurez-vous que le cardan est connecté avec `C` et que les servos sont activés

### Sens de rotation du servo inversé

**Causes possibles :**
- L'orientation de montage du servo ou les paramètres de contrôle du programme doivent être ajustés
**Solutions :**
Modifiez la méthode `calculate_move` dans `src/trackers/tracking_controller.py` pour inverser le signe du paramètre concerné :

# Si la direction gauche/droite est inversée

```python
delta_pan = -int(self.kp_pan * err_x)
```

# Si la direction haut/bas est inversée

```python
delta_tilt = -int(self.kp_tilt * err_y)
```

### Le servo tremble

**Causes possibles :**
- Paramètres de suivi trop sensibles
- Zone morte trop petite
- Charge trop importante sur les servos ou alimentation insuffisante
**Solutions :**
1. Augmentez le paramètre `dead_zone`
2. Augmentez `min_move_interval`
3. Diminuez `kp_pan` et `kp_tilt`
4. Vérifiez que la tension d'alimentation est correcte

### Échec de la connexion du port série

**Causes possibles :**
- Pilote non installé
- Numéro de port incorrect
- Port série occupé par un autre programme
- Câble défectueux
**Solutions :**
1. Sous Windows, vérifiez dans le Gestionnaire de périphériques que le pilote est correctement installé
2. Exécutez `examples/list_ports.py` pour trouver le bon port série
3. Fermez les autres programmes susceptibles d'occuper le port série
4. Essayez un autre port USB ou un autre câble de données

---

## Problèmes logiciels

### Impossible d'ouvrir la caméra

**Causes possibles :**
- Indice de caméra incorrect
- Caméra occupée par un autre programme
- Problème de connexion matérielle de la caméra
- Problème de pilote de la caméra
**Solutions :**
1. Exécutez `examples/list_cameras.py` pour afficher les indices des caméras disponibles
2. Fermez les autres programmes susceptibles d'utiliser la caméra
3. Vérifiez que la caméra est correctement connectée
4. Essayez un autre port USB

### Erreurs OpenCV

**Causes possibles :**
- Problème de version d'OpenCV
- Installation incomplète des bibliothèques de dépendances
- Anomalie matérielle de la caméra
**Solutions :**
1. Essayez de réinstaller les bibliothèques de dépendances :

```python
pip install --upgrade opencv-python numpy
```

1. Vérifiez que la version de Python est conforme aux exigences (>=3.8)
2. Consultez la pile d'erreurs pour localiser le code en cause

### Échec de l'installation des dépendances

**Causes possibles :**
- Version de pip trop ancienne
- Problème de connexion réseau
- Problème de permissions
**Solutions :**
1. Commencez par mettre pip à jour :

```python
pip install --upgrade pip
```

1. Utilisez un miroir en Chine pour accélérer :

```python
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
```

1. Vérifiez que la connexion réseau fonctionne correctement

### Démarrage lent du programme

**Causes possibles :**
- DSHOW non utilisé sous Windows
- L'initialisation matérielle de la caméra prend du temps
**Solutions :**
1. Vérifiez que le code utilise `cv2.CAP_DSHOW` comme backend de la caméra
2. Vérifiez qu'aucun autre programme n'occupe la caméra
3. Patientez quelques secondes : l'initialisation de la caméra prend généralement un peu de temps

---

## Problèmes de suivi

### Détection de cible imprécise

**En suivi de couleur :**
- Vérifiez que le contraste entre la couleur cible et l'arrière-plan est bien marqué
- Ajustez les paramètres de couleur (dans `src/detectors/color_detector.py`)
- Assurez un éclairage suffisant et uniforme
**En suivi de visage :**
- L'éclairage doit être suffisant, évitez le contre-jour
- Le visage doit être orienté face à la caméra
- Gardez une distance appropriée

### Le cardan ne bouge pas pendant le suivi

**Causes possibles :**
1. Cardan non connecté
2. Cible non verrouillée
3. Cible située dans la zone morte
4. Erreur du programme
**Solutions :**
1. Vérifiez que le cardan est connecté (touche `C`)
2. Vérifiez que la cible est verrouillée (touche `T`)
3. Consultez la sortie de la console pour rechercher des messages d'erreur
4. Vérifiez si la cible se trouve dans la plage `dead_zone`

### Direction du suivi inversée

**Solutions :**
Reportez-vous à la solution du problème « Sens de rotation du servo inversé ».

### Tremblements lors du suivi

**Solutions :**
Reportez-vous à la solution du problème « Le servo tremble ».

### Échec du verrouillage de cible

**Causes possibles :**
1. Au moment du verrouillage, la cible n'est pas au centre de l'image
2. Cible trop petite ou couleur peu marquée
3. Aucune cible détectée
**Solutions :**
1. Assurez-vous que la cible est au centre de l'image au moment du verrouillage
2. Utilisez une cible de taille appropriée, pouvant être correctement détectée
3. Consultez la sortie de la console pour vérifier si la cible est détectée
4. Réajustez la position de la cible, puis verrouillez de nouveau

---

## Utilisation des outils de diagnostic

### Utiliser le programme de diagnostic

Le système fournit un outil de diagnostic complet, qui permet de tester l'ensemble du matériel du système :

```python
python examples/diagnostic.py --camera 0 --port COM3
```

Le programme de diagnostic teste successivement :
1. Le bon fonctionnement de la caméra
2. La connexion correcte du port série
3. La réponse correcte des servos
Une fois le diagnostic terminé, les résultats de test s'affichent pour vous aider à localiser le problème.

### Consulter la sortie de débogage

Pendant l'exécution du programme, la console affiche des informations de débogage, notamment :
- Les informations sur les cibles détectées
- Les coordonnées des cibles
- Les valeurs d'erreur
- Les commandes de mouvement du cardan
- Tout message d'erreur
Examinez attentivement ces sorties : elles aident à localiser rapidement le problème.

---

## Méthodes de récupération

### Remettre le cardan en position sûre

- Appuyez sur `R` pour recentrer le cardan
- Ou appelez `gimbal.return_to_center()`

### Réinitialiser tous les réglages

- Appuyez sur `S` pour arrêter le suivi
- Appuyez sur `R` pour recentrer
- Verrouillez de nouveau la cible

### Recalibrer

Si la qualité du suivi est très mauvaise, vous pouvez :
1. Ajuster les paramètres de suivi
2. Verrouiller de nouveau la cible
3. Redémarrer le programme si nécessaire
4. Vérifier les connexions matérielles

---

## Obtenir de l'aide

Si les méthodes ci-dessus ne permettent pas de résoudre le problème, veuillez noter les informations suivantes :
- Informations sur le système d'exploitation
- Version de Python
- Messages d'erreur détaillés
- Étapes de reproduction du problème
- Résultats de l'exécution du diagnostic
