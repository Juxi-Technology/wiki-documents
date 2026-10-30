---
title: "Logiciel hôte PC"
description: "Logiciel hôte graphique PC pour le module de fréquence cardiaque et SpO2 MAX30102 : paramètres du port série, acquisition, surveillance, interprétation des données et questions fréquentes."
---

# Logiciel hôte PC

## 📋 Fonctionnalités

Il s'agit d'un programme graphique de surveillance de la fréquence cardiaque et du SpO2 pour PC, avec les fonctions suivantes :

1. ✅ **Sélection du port série** - analyse automatique des ports série disponibles
1. ✅ **Sélection du débit** - prise en charge de 9600/19200/38400/57600/115200
1. ✅ **Connexion/Déconnexion** - connexion/déconnexion du module en un clic
1. ✅ **Démarrer/Arrêter l'acquisition** - contrôle la LED du capteur
1. ✅ **Démarrer/Arrêter la surveillance** - affichage des données en temps réel
1. ✅ **Affichage en temps réel** - SpO2, fréquence cardiaque, température

---

## 🔌 Câblage matériel

| Module de fréquence cardiaque et SpO2 | Module USB-TTL |
|---|---|
| VCC | 5V (important ! ne pas brancher sur 3.3V) |
| GND | GND |
| TX | RX (connexion croisée) |
| RX | TX (connexion croisée) |

![Illustration](../../../../../../public/images/tutorials/accessories/heart-rate-spo2/pc-upper-computer/01.png)

⚠️ **Attention : placez le commutateur du module sur UART, TX et RX doivent être croisés !**

---

## 🚀 Exécution du programme

### Méthode 1 : exécuter directement le script Python

1. Installer les dépendances :

```bash
pip install pyserial
```

1. Exécuter le programme :

```bash
cd D:\JUXI_HeartRate_SPO2\python\windows
```

```bash
python HeartRateOximeter.py
```

---

## 📖 Étapes d'utilisation

### Étape 1 : connecter le matériel

1. Reliez le capteur et l'adaptateur USB-TTL selon le tableau de câblage ci-dessus

```text
VCC->VCC
GND->GND
RX->TX
TX->RX
```

1. Branchez l'adaptateur USB-TTL sur un port USB de l'ordinateur

### Étape 2 : ouvrir le programme

Exécutez `HeartRateOximeter.exe`.

### Étape 3 : paramètres du port série

1. Sélectionnez le bon port COM (par exemple COM3)
1. Choisissez le débit **9600** (par défaut)
1. Cliquez sur le bouton [Connecter]

### Étape 4 : démarrer l'acquisition

1. Une fois la connexion réussie, cliquez sur [Démarrer l'acquisition]
1. ✅ La LED du capteur s'allume

### Étape 5 : démarrer la surveillance

1. Placez le doigt sur le capteur
1. Cliquez sur [Démarrer la surveillance]
1. Consultez les données en temps réel

---

## 📊 Présentation de l'interface

```text
┌─────────────────────────────────────────┐
│           串口设置                       │
│  串口:  [COM3  ↓]  [刷新]               │
│  波特率:[9600  ↓]  [连接]               │
├─────────────────────────────────────────┤
│           模块控制                       │
│  [启动采集]  [开始监测]                 │
├─────────────────────────────────────────┤
│           实时数据                       │
│  血氧 (SPO2):       98 %                │
│  心率 (Heart Rate): 75 Times/min        │
│  温度 (Temperature): 36.6 °C            │
│  状态:  正在监测...                     │
├─────────────────────────────────────────┤
│           使用提示                       │
│  1. 接线：VCC->5V, GND->GND, RX->TX, TX->RX          │
│  2. 点击连接后再启动采集                               │
│  3. 启动采集后传感器LED会亮起                           │
└─────────────────────────────────────────┘
```
---
## 📋 Interprétation des données

| Donnée | Plage normale | Description |
|---|---|---|
| Saturation en oxygène (SPO2) | 95% - 100% | en dessous de 90 %, consultez un médecin |
| Fréquence cardiaque | 60 - 100 battements/min | plage normale chez l'adulte |
| Température | 25 - 35 °C | température embarquée du module, pas la température corporelle |

**Remarque** : au démarrage ou si le doigt est mal placé, les données peuvent afficher `-1` ; c'est normal.

---

## ❓ Questions fréquentes

### Q1 : Que faire si aucun port série n'est trouvé ?

**R :**

1. Vérifiez que le pilote USB-TTL est correctement installé
1. Rebranchez le câble USB
1. Cliquez sur [Actualiser] pour relancer l'analyse

### Q2 : Que faire si la connexion échoue ?

**R :**

1. Vérifiez que le bon port série est sélectionné
1. Vérifiez que le port série n'est pas occupé par un autre programme (assistant série, Arduino IDE, etc.)
1. Vérifiez que l'adaptateur USB-TTL fonctionne correctement

### Q3 : La LED ne s'allume pas après avoir cliqué sur « Démarrer l'acquisition » ?

**R :**

1. Vérifiez que VCC est bien branché sur 5V (et non 3.3V)
1. Vérifiez que TX/RX sont croisés
1. Vérifiez que le module capteur n'est pas endommagé

### Q4 : Les données affichent toujours -1 ?

**R :**

1. Vérifiez que [Démarrer l'acquisition] a bien été cliqué
1. Placez correctement le doigt sur le capteur en couvrant entièrement la zone des LED
1. Gardez le doigt stable et attendez quelques secondes
1. Vérifiez que le câblage n'est pas desserré

### Q5 : Le programme ne répond pas ?

**R :**

1. Cliquez d'abord sur [Arrêter la surveillance]
1. Cliquez ensuite sur [Arrêter l'acquisition]
1. Cliquez enfin sur [Déconnecter]
1. Redémarrez le programme

---

## ⚠️ Précautions

1. **Ordre de branchement** : branchez d'abord le capteur, puis l'USB
1. **Ordre de déconnexion** : arrêtez d'abord la surveillance, puis l'acquisition, et enfin déconnectez
1. **Alimentation** : le capteur doit être alimenté en 5V ; le 3.3V peut ne pas fonctionner correctement
1. **Placement du doigt** : pendant la mesure, le doigt doit couvrir entièrement la zone optique, sans appuyer fort
1. **Environnement** : évitez la lumière directe et intense sur le capteur

---

## 📞 Support technique

En cas de problème, vérifiez :

1. Que le câblage matériel est correct (en particulier le croisement TX/RX)
1. Que l'alimentation est bien de 5V
1. Que le pilote USB-TTL fonctionne normalement
1. Que le port série n'est pas occupé par un autre programme
