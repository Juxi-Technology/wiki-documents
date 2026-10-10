---
title: Informations produit
---

# Informations produit

> **[Acheter en boutique](https://www.juxitech.com/fr/products/2-dof-servo-pan-tilt-unit)**

Projet de contrôle de cardan caméra 2-DOF, avec suivi automatique par couleur, visage et QR code.

---

## 📋 Fonctionnalités

- 🎮 Contrôle manuel du cardan au clavier
- 🎯 Suivi automatique d'objets par couleur
- 👤 Suivi automatique de visage
- 📱 Suivi automatique de QR code
- 🔒 Mécanisme de verrouillage de cible
- 🚀 Démarrage rapide (avec le backend DSHOW)

---

## 🛠 Configuration matérielle

- **Modèle de servo** : SCS009
- **Affectation des servos** :
  - Servo n° 1 : contrôle de la rotation gauche/droite
  - Servo n° 2 : contrôle de l'inclinaison haut/bas
- **Mode de communication** : carte de commande à bus série
- **Puce de la carte de commande** : CH343
- **Débit** : 1 Mbps par défaut

### Paramètres des servos


|Paramètre|Servo n° 1 (gauche/droite)|Servo n° 2 (haut/bas)|
|---|---|---|
|Plage|220-802|220-511|
|Position centrale|511|511|
|Description|220 = gauche, 802 = droite|220 = haut, 511 = position centrale|


---

## 📁 Structure du projet

```python
2-DOF-Camera-Gimbal/
├── docs/            # Documentation et tutoriels
│   └── tutorials/  # Fichiers de tutoriels
├── examples/        # Programmes d'exemple
│   ├── auto_tracking_demo.py  # Démonstration complète de suivi
│   ├── basic_usage.py        # Exemple d'utilisation de base
│   ├── keyboard_control.py    # Exemple de contrôle au clavier
│   └── diagnostic.py         # Outil de diagnostic
├── src/            # Code source
│   ├── detectors/  # Détecteurs de cible
│   │   ├── color_detector.py
│   │   ├── face_detector.py
│   │   └── qr_detector.py
│   ├── trackers/  # Contrôleur de suivi
│   │   └── tracking_controller.py
│   └── sc_servo.py  # Bibliothèque de communication des servos
├── .gitignore
├── requirements.txt
└── README.md
```

---

## 🚀 Démarrage rapide

### Installer les dépendances

```python
pip install -r requirements.txt
```

### Rechercher les appareils disponibles

**Rechercher les caméras disponibles**

```python
python examples/list_cameras.py
```

**Rechercher les ports série disponibles**

```python
python examples/list_ports.py
```

### Exécuter la démonstration

Configuration via les arguments de ligne de commande :

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3 --color red
```

**Description des paramètres**
- `--camera` ou `-c` : indice de la caméra (0 par défaut)
- `--port` ou `-p` : périphérique de port série (COM3 par défaut)
- `--color` ou `-C` : couleur par défaut (par défaut : red)

---

## 🎮 Instructions d'utilisation

### Raccourcis clavier


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


### Flux d'utilisation du suivi automatique

1. Appuyez sur `C` pour connecter le cardan
2. Choisissez le mode (appuyez sur `1` ou `2`)
3. Placez l'objet cible au centre de l'image
4. Appuyez sur `T` pour verrouiller la cible
5. Déplacez la cible : le cardan la suit automatiquement

---

## 📚 Documentation et tutoriels

Pour les tutoriels détaillés, consultez le répertoire docs/tutorials/ :
- 01-快速开始指南.md - Prise en main rapide
- 02-硬件与环境准备.md - Liste du matériel et préparation de l'environnement
- 03-基础使用.md - Contrôle au clavier et utilisation de base
- 04-高级功能与追踪.md - Fonctions avancées et suivi en détail
- 05-故障排除.md - Problèmes courants et solutions

---

## 🔧 Remarques techniques

### Paramètres de contrôle du suivi

Ajustables dans `src/trackers/tracking_controller.py` :

|Paramètre|Valeur par défaut|Description|
|---|---|---|
|kp_pan|0.08|Gain proportionnel du suivi gauche/droite|
|kp_tilt|0.12|Gain proportionnel du suivi haut/bas|
|dead_zone|30|Zone morte (pixels) : aucun mouvement dans cette plage|
|min_move_interval|0.15|Intervalle minimal de mouvement (secondes)|


### Mécanisme de verrouillage de cible

Après le verrouillage, le système sélectionne la cible selon les conditions suivantes :
- La plus grande proximité avec le point de verrouillage (poids 70 %)
- La taille la plus similaire à celle du moment du verrouillage (poids 30 %)

---

## 📖 Spécifications des servos

- **Modèle** : SCS009
- **Tension de fonctionnement** : 4 à 7,4 V (6 V typique)
- **Couple de blocage** : 2,3 kg·cm à 6 V
- **Protocole** : port série asynchrone semi-duplex (TTL)
