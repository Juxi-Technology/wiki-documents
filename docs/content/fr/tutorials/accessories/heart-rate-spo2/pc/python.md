---
title: "PC · Exécution Python"
description: "Lire les données de fréquence cardiaque et SpO2 MAX30102 sous Windows via un adaptateur USB-TTL et un script Python : pilotes, port COM, étapes d'exécution et registres Modbus."
---

# PC · Exécution Python

## Sommaire

1. Préparation du matériel
1. Câblage matériel
1. Configuration de l'environnement logiciel
1. Exécution du programme d'exemple
1. Questions fréquentes

---

## Préparation du matériel

### Matériel nécessaire

| Matériel | Description |
|---|---|
| Capteur JUXI_HeartRate_SPO2 | Module de fréquence cardiaque et SpO2 |
| Module USB-TTL | CH340 / CP2102 / FT232, etc. |
| Câbles Dupont | 4 (femelle-femelle) |
| Ordinateur Windows | Win7/Win10/Win11 |

---

## Câblage matériel

### Schéma de câblage

| Broche du capteur | Broche USB-TTL | Description |
|---|---|---|
| VCC | 3,3 V ou 5 V | Pôle positif de l'alimentation |
| GND | GND | Pôle négatif de l'alimentation |
| TX | RX | Le capteur émet → le module reçoit |
| RX | TX | Le capteur reçoit → le module émet |

![Illustration](../../../../../../public/images/tutorials/accessories/heart-rate-spo2/pc-python/01.png)

⚠️ **Remarques importantes** :

1. Placez le commutateur du module sur UART !!!
1. **TX et RX doivent être croisés !**
1. Le capteur accepte 3,3 V et 5 V, ne vous trompez pas de tension
1. Câblez d'abord tous les fils, puis branchez l'USB sur l'ordinateur

### Schéma de câblage

```text
传感器        USB转TTL模块
┌──────┐      ┌──────────┐
│ VCC  │──────│ 3.3V/5V  │
│ GND  │──────│ GND      │
│ TX   │──────│ RX       │  ← 交叉连接
│ RX   │──────│ TX       │  ← 交叉连接
└──────┘      └──────────┘
```

---

## Configuration de l'environnement logiciel

### Installer le pilote

Installez le pilote correspondant au modèle de puce de votre adaptateur USB-TTL :

- **CH340** : [https://sparks.gogo.co.nz/ch340.html](https://sparks.gogo.co.nz/ch340.html)
- **CP2102** : [https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers)
- **FT232** : [https://ftdichip.com/drivers/vcp-drivers/](https://ftdichip.com/drivers/vcp-drivers/)

Une fois l'installation terminée, branchez le module USB-TTL.

### Vérifier le port COM

#### Méthode 1 : Gestionnaire de périphériques

1. Appuyez sur `Win + X` et choisissez « Gestionnaire de périphériques »
1. Développez « Ports (COM et LPT) »
1. Relevez le numéro de port COM correspondant à votre adaptateur USB-TTL (par exemple COM3)

#### Méthode 2 : Détection automatique par le programme

Lors de l'exécution du programme d'exemple, tous les ports série disponibles sont listés automatiquement.

### Installer les dépendances Python

Ouvrez l'invite de commandes (CMD) ou PowerShell et exécutez :

```bash
pip install pyserial
```

---

## Exécution du programme d'exemple

Téléchargez l'archive [JUXI_HeartRate_SPO2.zip](https://juxitech.feishu.cn/wiki/W2IwwDop5i4BVlk98EacfyJvnrh) et décompressez-la.

### Emplacement des fichiers

```text
JUXI_HeartRate_SPO2/python/windows/
├── gain_heartbeat_SPO2.py  ← 主程序（直接运行这个）
├── JUXI_HeartRate_SPO2_Windows.py
├── JUXI_RTU_Windows.py
└── README_CN.md        ← 本文件
└── README.md
```

### Étapes d'exécution

1. **Vérifier le câblage matériel**
  - VCC → 3,3 V/5 V
  - GND → GND
  - TX → RX (croisé)
  - RX → TX (croisé)

1. **Brancher l'USB sur l'ordinateur**
1. **Exécuter le programme**

```bash
cd D:\JUXI_HeartRate_SPO2\python\windows
```

```bash
python gain_heartbeat_SPO2.py
```

1. **Suivre les instructions**
  - Le programme liste tous les ports série disponibles
  - Saisissez votre numéro de port COM (par exemple COM3)
  - Le programme détecte automatiquement le capteur et démarre la mesure

### Sortie attendue

```python
==================================================
JUXI Blood Oxygen Sensor - Windows Test
==================================================
Available serial ports:
  COM3

Please enter the COM port number (e.g., COM3):

Connecting to COM3 at 9600 baud...
Initializing sensor...
Sensor initialized successfully!

Starting data collection...
Sensor LED should be ON now!

Place your finger on the sensor...

SPO2 (血氧): 97 %
Heart Rate (心率): 82 BPM
Temperature (温度): 26.5 °C
SPO2 (血氧): 98 %
Heart Rate (心率): 78 BPM
Temperature (温度): 26.6 °C
...
```

Appuyez sur `Ctrl + C` pour arrêter le programme.

---

## Description des fonctions du programme

### API principales

```bash
# 创建传感器对象
sensor = BloodOxygenSensor("COM3", 9600)

# 初始化传感器
sensor.begin()

# 开始采集（LED亮起）
sensor.sensor_start_collect()

# 读取心率血氧
sensor.get_heartbeat_SPO2()
print(f"SPO2: {sensor.SPO2}%")
print(f"Heart Rate: {sensor.heartbeat} BPM")

# 读取温度
temp = sensor.get_temperature_c()

# 停止采集（LED熄灭）
sensor.sensor_end_collect()

# 关闭串口
sensor.close()
```

---

## Questions fréquentes

### Q1 : Que faire si le port COM est introuvable ?

**R :**

1. Vérifiez que l'adaptateur USB-TTL est bien branché
1. Réinstallez le pilote
1. Essayez un autre port USB
1. Vérifiez dans le Gestionnaire de périphériques la présence d'un « Périphérique inconnu »

### Q2 : Que faire si l'initialisation du capteur échoue ?

**R :**

1. Vérifiez le câblage :
  - VCC et GND correctement reliés
  - **TX et RX bien croisés** (problème le plus fréquent)

1. Vérifiez que le débit est bien de 9600
1. Vérifiez que le module USB-TTL fonctionne correctement
1. Rebranchez l'USB

### Q3 : Que faire si les données affichent toujours -1 ?

**R :**

1. Vérifiez que le doigt est correctement placé sur le capteur (zone des LED entièrement couverte)
1. Gardez le doigt stable, sans bouger
1. Attendez quelques secondes que les données se stabilisent
1. Vérifiez que la LED du capteur est allumée

### Q4 : La LED ne s'allume pas mais la communication fonctionne ?

**R :**

- Il peut s'agir d'un problème matériel de la LED, mais le capteur fonctionne normalement
- Tant que les données sont normales, ce problème de LED peut être ignoré

### Q5 : Que faire si le port série est occupé ?

**R :**

1. Fermez les autres logiciels de port série (assistant série, Arduino IDE, etc.)
1. Vérifiez qu'aucun autre programme Python ne s'exécute
1. Rebranchez l'USB

### Q6 : Que faire si les données sont imprécises ?

**R :**

1. Assurez-vous que le doigt couvre entièrement la zone optique du capteur
1. Restez au calme pendant la mesure, ne parlez pas et ne bougez pas
1. Attendez plus de 30 secondes pour stabiliser les données
1. Réalisez plusieurs mesures et faites la moyenne

---

## Spécifications techniques

| Paramètre | Spécification |
|---|---|
| Communication | UART (niveau TTL) |
| Débit en bauds | 9600 bps (par défaut) |
| Format des données | 8N1 (8 bits de données, sans parité, 1 bit d'arrêt) |
| Tension d'alimentation | 3,3 V / 5 V |
| Plage de mesure SpO2 | 35% - 100% |
| Plage de mesure de la fréquence cardiaque | 30 - 250 BPM |
| Adresse de l'appareil Modbus | 0x20 |

---

## Description des registres Modbus

| Adresse du registre | Fonction | Description |
|---|---|---|
| 0x02 | ID de l'appareil | Lecture : renvoie 0x0020 |
| 0x06-0x09 | Données de fréquence cardiaque et SpO2 | Lecture : SPO2 + fréquence cardiaque |
| 0x0A | Température | Lecture : température de la carte |
| 0x10 | Contrôle d'acquisition | Écriture : 0x0001=démarrer, 0x0002=arrêter |
