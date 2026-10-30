---
title: "Guide Raspberry Pi"
description: "Connecter le module de fréquence cardiaque et SpO2 MAX30102 à un Raspberry Pi en I2C ou UART : configuration de l'environnement, exemple de code, API et questions fréquentes."
---

# Guide Raspberry Pi

## Présentation du projet

JUXI_HeartRate_SPO2 est un module capteur de fréquence cardiaque et SpO2 basé sur la puce MAX30102 ; son algorithme intégré fournit directement la fréquence cardiaque et la saturation en oxygène.

**Fonctions principales :**

- Mesure de la saturation en oxygène (SPO2)
- Mesure de la fréquence cardiaque (battements/min)
- Mesure de la température de la carte
- Prise en charge des deux modes de communication UART et I2C

---

## Préparation du matériel

| Matériel nécessaire | Description |
|---|---|
| Raspberry Pi (2/3/4/Zero) | Raspberry Pi 3B+ ou 4B recommandé |
| Capteur JUXI_HeartRate_SPO2 | Module capteur de fréquence cardiaque et SpO2 |
| Câbles Dupont (plusieurs) | 4 câbles Dupont femelle-femelle |
| Adaptateur secteur | Alimentation dédiée au Raspberry Pi |

---

## Câblage matériel

### Méthode 1 : communication I2C (recommandée)

Le câblage I2C est simple, nous le recommandons.

![Illustration](../../../../../public/images/tutorials/accessories/heart-rate-spo2/raspberry-pi/01.png)

| Broche du capteur | Broche physique du Raspberry Pi | Numéro BCM | Description |
|---|---|---|---|
| VCC | 1 ou 17 | - | Alimentation 3,3 V (5 V possible aussi) |
| GND | 6 ou 9 ou 14 | - | Masse |
| SDA | 3 | GPIO2 | Ligne de données I2C |
| SCL | 5 | GPIO3 | Ligne d'horloge I2C |

**Important :** placez le commutateur du capteur sur la position **IIC** !

### Méthode 2 : communication série UART

La communication UART nécessite un câblage croisé.

![Illustration](../../../../../public/images/tutorials/accessories/heart-rate-spo2/raspberry-pi/02.png)

| Broche du capteur | Broche physique du Raspberry Pi | Numéro BCM | Description |
|---|---|---|---|
| VCC | 2 ou 4 | - | Alimentation 5 V (3,3 V possible aussi) |
| GND | 6 ou 9 ou 14 | - | Masse |
| RX | 8 | GPIO14 | RX du capteur vers TX du Raspberry Pi |
| TX | 10 | GPIO15 | TX du capteur vers RX du Raspberry Pi |

**Important :** placez le commutateur du capteur sur la position **UART** !

![Illustration](../../../../../public/images/tutorials/accessories/heart-rate-spo2/raspberry-pi/03.png)

---

## Configuration de l'environnement

### 1. Activer l'I2C (nécessaire en mode I2C)

```bash
sudo raspi-config
```

Choisissez `Interface Options` → `I2C` → `Yes` pour activer

Redémarrez le Raspberry Pi :

```bash
sudo reboot
```

### 2. Activer le port série (nécessaire en mode UART)

```bash
sudo raspi-config
```

Choisissez `Interface Options` → `Serial`

- Première question : "Would you like a login shell to be accessible over serial?" → choisissez `No`
- Deuxième question : "Would you like the serial port hardware to be enabled?" → choisissez `Yes`

Redémarrez le Raspberry Pi :

```bash
sudo reboot
```

### 3. Installer les bibliothèques requises

```bash
# 更新软件源
sudo apt-get update

# 安装 I2C 工具和 smbus2 库（I2C 模式必须使用 smbus2）
sudo apt-get install -y i2c-tools python3-smbus2

# 安装 pyserial（串口支持）
sudo pip3 install pyserial
```

> **Remarque :** le mode I2C exige l'installation de `smbus2` ; l'ancien `python-smbus` ne doit pas être utilisé.
En interne, la bibliothèque utilise `smbus2.i2c_msg` pour réaliser des transactions I2C en deux étapes indépendantes (écrire d'abord l'adresse du registre et envoyer STOP,
puis ouvrir une nouvelle transaction de lecture pour lire plusieurs octets en continu), afin de respecter les exigences de timing I2C de la puce du capteur.

### 4. Vérifier la connexion I2C (mode I2C)

Une fois le câblage terminé, exécutez la commande suivante pour détecter les appareils I2C :

```bash
i2cdetect -y 1
```

Si l'adresse `0x57` apparaît, le capteur est correctement connecté.

---

## Utilisation de l'exemple de code

[JUXI_HeartRate_SPO2.zip](https://juxitech.feishu.cn/wiki/W2IwwDop5i4BVlk98EacfyJvnrh)

### Structure des fichiers

```bash
python/raspberry/
├── JUXI_HeartRate_SPO2.py      # 主库文件
└── examples/
    ├── i2c_example.py          # I2C 模式示例
    └── uart_example.py         # UART 模式示例
```

### Exécuter l'exemple en mode I2C

```bash
cd python/raspberry/examples
```

```bash
sudo python3 i2c_example.py
```

### Exécuter l'exemple en mode UART

```bash
cd python/raspberry/examples
```

```bash
sudo python3 uart_example.py
```

**Remarque :** l'utilisation du port série matériel nécessite les droits `sudo`.

### Résultat d'exécution

Si tout se passe bien, vous verrez une sortie semblable à la suivante :

```bash
==================================================
JUXI 心率血氧传感器 - I2C 模式
==================================================

正在初始化 I2C 总线 1，地址 0x57...
传感器初始化成功！

开始数据采集...
传感器 LED 已亮起！

请将手指放在传感器上...

血氧饱和度: 98 %
心率: 72 次/分钟
板载温度: 25.5 ℃
...
```

Appuyez sur `Ctrl+C` pour arrêter le programme.

---

## Référence API

### Classe : JUXI_HeartRate_SPO2_i2c

Classe du capteur pour la communication I2C.

**Constructeur**

`JUXI_HeartRate_SPO2_i2c(bus_number=1, i2c_address=0x57)`

Paramètres :

- `bus_number` : numéro du bus I2C, généralement 1 sur Raspberry Pi
- `i2c_address` : adresse I2C du capteur, 0x57 par défaut

**Méthodes**

| Méthode | Description | Valeur de retour |
|---|---|---|
| begin() | Initialise le capteur et détecte la connexion | bool (True en cas de succès) |
| sensor_start_collect() | Démarre l'acquisition (la LED du capteur s'allume) | aucune |
| sensor_end_collect() | Arrête l'acquisition (la LED du capteur s'éteint) | aucune |
| get_heartbeat_SPO2() | Lit la fréquence cardiaque et le SpO2 | aucune (résultats stockés dans les attributs de l'objet) |
| get_temperature_c() | Lit la température de la carte | float (degrés Celsius) |
| close() | Ferme la connexion I2C | aucune |

**Attributs**

| Attribut | Description |
|---|---|
| SPO2 | Saturation en oxygène (%), valeur invalide : -1 |
| heartbeat | Fréquence cardiaque (battements/min), valeur invalide : -1 |

---

### Classe : JUXI_HeartRate_SPO2_uart

Classe du capteur pour la communication série UART.

**Constructeur**

`JUXI_HeartRate_SPO2_uart(port='/dev/serial0', baudrate=9600)`

Paramètres :

- `port` : chemin du port série, `/dev/serial0` par défaut sur Raspberry Pi
- `baudrate` : débit en bauds, 9600 par défaut

**Méthodes**

Identiques à `JUXI_HeartRate_SPO2_i2c`.

---

## Questions fréquentes

### Q1 : Que faire si l'initialisation du capteur échoue ?

**R :** Vérifiez les points suivants :

1. **Vérifier le câblage**
  - Mode I2C : SDA sur GPIO2, SCL sur GPIO3
  - Mode UART : connexion croisée RX-TX

1. **Vérifier le commutateur du capteur**
  - Mode I2C : le commutateur doit être sur IIC
  - Mode UART : le commutateur doit être sur UART

1. **Vérifier l'alimentation**
  - VCC sur 3,3 V ou 5 V
  - GND connecté

1. **Vérifier les réglages système**
  - Mode I2C : I2C activé
  - Mode UART : port série activé

1. **Utiliser les commandes de détection**

```bash
# I2C 模式
i2cdetect -y 1

# UART 模式
ls /dev/serial*
```

### Q2 : Que faire si les données affichent toujours -1 ?

**R :**

1. Vérifiez que le doigt est correctement placé sur le capteur et couvre entièrement les deux LED
1. Attendez quelques secondes que les données se stabilisent (généralement 10-30 secondes)
1. Vérifiez que `sensor_start_collect()` a bien été appelé pour démarrer l'acquisition
1. Vérifiez que le voyant du capteur est allumé

### Q3 : Que faire si les données sont imprécises ?

**R :**

1. Assurez-vous que le doigt couvre entièrement la zone optique du capteur
1. Gardez le doigt immobile
1. Attendez plus de 30 secondes pour stabiliser les données
1. Réalisez plusieurs mesures et faites la moyenne
1. Évitez la lumière directe et intense sur le capteur

### Q4 : Peut-on utiliser I2C et UART en même temps ?

**R :** Non, un seul mode de communication peut être choisi à la fois.

### Q5 : Faut-il exécuter le programme avec sudo ?

**R :**

- Mode I2C : sudo recommandé pour éviter les problèmes de permissions
- Mode UART : sudo obligatoire, sinon le port série est inaccessible

---

## Précautions

### Conseils de mesure

1. **Bien placer le doigt**
  - Posez délicatement le doigt sur le capteur en couvrant les deux LED
  - N'appuyez pas fort, pour ne pas gêner la circulation sanguine
  - Gardez le doigt stable, sans bouger

1. **Attendre la stabilisation des données**
  - En début de mesure, les valeurs peuvent être instables
  - Attendez 10-30 secondes que les données se stabilisent avant de les lire
  - Le capteur actualise les données toutes les 4 secondes

1. **Environnement**
  - Évitez la lumière directe et intense sur le capteur
  - Maintenez une température ambiante agréable
  - Restez au calme pendant la mesure

### Interprétation des données

| Plage SpO2 | Description |
|---|---|
| 95% - 100% | normale |
| 90% - 94% | légère hypoxie |
| < 90% | hypoxie, consultez un médecin |

| Plage de fréquence cardiaque | Description |
|---|---|
| 60 - 100 battements/min | plage normale chez l'adulte |
| < 60 battements/min | bradycardie |
| > 100 battements/min | tachycardie |

### Consignes de sécurité

- Ce capteur est fourni à titre indicatif uniquement et ne remplace pas un dispositif médical professionnel
- En cas de problème de santé, consultez rapidement un médecin
- Les résultats de mesure sont donnés à titre indicatif et ne constituent pas une base de diagnostic
