---
title: Module de positionnement GNSS GPS & Beidou
category: sensor
description: "Module GNSS de Juxi Technology — puce ATGM336H-5N, combinaison de quatre constellations, précision 2.5m, support ROS"
keywords: [gps, beidou, gnss, module de positionnement, ros]
---

# Module de positionnement GNSS GPS & Beidou

> **[Acheter en boutique](https://www.juxitech.com/fr/products/gps-beidou-gnss-positioning-module)**

## Présentation

Le module GPS & BDS repose sur la puce **ATGM336H-5N** d'Unicore et prend en charge Beidou Gen. 2/3 (tous les satellites 1-63), GPS, GLONASS et QZSS, avec réception simultanée multi-systèmes pour la localisation, la navigation et la synchronisation temporelle.

**Caractéristiques clés** :

- Quatre systèmes **BDS/GPS/QZSS/GLONASS** (seul ou combiné)
- Récepteur **32 canaux** haute sensibilité, positionnement stable
- Précision **2.5m (CEP50)**, démarrage à froid 32 s
- USB série + TTL série plug-and-play
- Tutoriels open source Arduino/Jetson/Raspberry Pi/ROS

## Spécifications

| Catégorie | Spécification |
|------|------|
| Puce | ATGM336H-5N |
| Systèmes satellites | BDS / GPS / QZSS / GLONASS |
| Canaux | 32 canaux, multi-systèmes simultanés |
| Précision | <2.5m (CEP50) |
| Fréquence de mise à jour | 1Hz par défaut, max. 10Hz |
| Débit | 4800–115200bps (9600 par défaut) |
| Sensibilité | Démarrage à froid -148dBm, suivi -162dBm |
| Consommation | 25mA @ 3.3V |
| Température de fonctionnement | -40℃ ~ +85℃ |
| Interfaces | USB Type-C / TTL série (PH2.0) |

## Description des broches

| Broche | Fonction |
|------|------|
| 5V | Alimentation |
| RES | Réinitialisation |
| PPS | Impulsion par seconde |
| TX | Sortie série |
| RX | Entrée série (optionnelle) |

## Démarrage rapide

### 1. Connecter l'antenne

Antenne GPS active de 3 m branchée au module, placée en dégagé (extérieur ou fenêtre) pour une acquisition rapide.

### 2. Connexion USB

Câble Type-C direct, plug-and-play (9600bps par défaut).

### 3. Vérifier la position

```bash
# Installer pynmea2 pour analyser les données NMEA
pip install pynmea2

# Exemple de lecture des données de positionnement
import serial
import pynmea2

ser = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)
while True:
    line = ser.readline().decode(errors='ignore')
    if line.startswith(('$GPRMC', '$GNRMC')):
        msg = pynmea2.parse(line)
        print(f'纬度: {msg.latitude}, 经度: {msg.longitude}')
```
### 4. Intégration ROS

Nœud de positionnement ROS compatible, fusion IMU et navigation Move_Base.

## Outils et ressources

- **GnssToolKit3** : visualisation, état des satellites, enregistrement, export KML
- **Conversion de coordonnées** : WGS-84 → GCJ-02 → BD-09
- **Code d'exemple** : tutoriels Arduino / Python / Jetson Nano
- [Dépôt officiel](https://github.com/Juxi-Technology)(code IMU/positionnement)

## FAQ

**Q : Positionnement lent ou aucun signal ?**
Placer l'antenne en dégagé (extérieur/fenêtre) ; vérifier le branchement ; le démarrage à froid prend 32 s.

**Q : Quels systèmes satellites ?**
BDS, GPS, QZSS, GLONASS — seuls ou combinés.

**Q : Connexion à un microcontrôleur ?**
Oui, TTL série (PH2.0) pour cartes MCU, tutoriels 51/Arduino/STM32 inclus.

**Q : Format de sortie ?**
Protocole standard NMEA 0183.

## Support

- 📧 E-mail : support@juxitech.com
- 🌐 Site officiel : [www.juxitech.com](https://www.juxitech.com)
- 💬 [Retour](https://github.com/Juxi-Technology/wiki-documents/issues)
