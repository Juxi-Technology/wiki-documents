---
title: "RDK: Communication IIC"
description: "Communication IIC entre la plateforme RDK X5 et le module d'interaction vocale IA : exemple Python, adresse 0x2A et reconnaissance hors ligne."
---

# RDK: Communication IIC

## Introduction

Ce dépôt fournit un exemple de code Python pour la communication entre la plateforme RDK X5 (Raspberry Pi) et le module d'interaction vocale AI, prenant en charge les deux modes de communication I2C et UART.

- **Module de reconnaissance vocale** : prend en charge la reconnaissance vocale hors ligne et affiche l'ID de commande après reconnaissance

- **Fonction de diffusion** : prend en charge la diffusion passive, la diffusion de mots de fonction et la diffusion de mots de commande

- **Protocole de communication** : adresse I2C 0x2A, débit en bauds UART 115200

- **Langage de programmation** : Python 3

---

## Connexion matérielle

### Connexion générale

> **Remarque importante** : assurez-vous que tous les appareils partagent la même masse !
> 
> 

---

### Connexion de la version I2C

**Attention** : utilise par défaut le bus I2C 5 (numérotation BCM)

![Image 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RDK-IIC-Communication/1.jpg)

---

## Configuration de l'environnement

### Configuration système requise

- RDK X5

- Système Ubuntu / Debian

- Python 3.7+

### Installer les paquets de dépendances

```Bash
# Mettre à jour les paquets
sudo apt update
sudo apt upgrade -y

# Installer les bibliothèques Python
sudo apt install -y python3-pip python3-smbus i2c-tools
```

### Activer l'interface I2C

```Bash
# Ouvrir l'outil de configuration
sudo raspi-config

# Sélectionner Interface Options → I2C → Enable
# Prend effet après redémarrage
sudo reboot
```

### Tester l'interface matérielle

```Bash
# Tester le périphérique I2C
sudo i2cdetect -y 5
```

---

## Utilisation de la version IIC

### Vérifier les fichiers de code

```Bash
cd IIC_Voice
ls -la
# Vous devriez voir iic_voice.py
```

### Configurer le bus I2C

Modifiez le fichier `iic_voice.py` et ajustez les paramètres nécessaires :

```Bash
# Adresse du périphérique I2C
DEVICE_ADDRESS = 0x2A

# Adresse du registre
REG_RESULT = 0xDA

# Numéro de bus I2C (à modifier selon le câblage réel)
bus = smbus.SMBus(5)  # Bus I2C 5
```

### Exécuter le programme

```Bash
# Donner les permissions d'exécution
chmod +x iic_voice.py

# Exécuter (les droits sudo sont nécessaires pour accéder à l'I2C)
sudo python3 iic_voice.py
```

### Test d'exécution

Après un démarrage normal, l'affichage suivant apparaît :

```Bash
Speech Serial Opened! Baudrate=115200
```

Prononcez un mot de commande vers le module vocal et l'ID correspondant s'affiche :

```Bash
Speech Serial Opened! Baudrate=115200
ID:1
ID:4
ID:10
```

### Arrêter le programme

Appuyez sur `Ctrl + C` pour arrêter le programme :

```Bash
Program terminated
```

---

## Dépannage

### Q1 : autorisations I2C insuffisantes

**R : ajoutez l'utilisateur au groupe d'utilisateurs I2C :**

```Bash
sudo usermod -aG i2c $USER
# Prend effet après reconnexion
```

Ou exécutez le programme avec `sudo`

---

### Q2 : l'appareil I2C n'est pas détecté lors du scan

**R : vérifiez :**

1. Confirmez que l'I2C est activé (raspi-config)

2. Vérifiez si SDA/SCL sont inversés

3. Vérifiez si les masses sont communes

4. Vérifiez si l'appareil est alimenté

```Bash
# Scanner les périphériques I2C
sudo i2cdetect -y 5
# Si vous voyez 0x2A, le périphérique est correctement connecté
```

---

### Q3 : l'ID de commande n'affiche que 0 ou ne s'affiche pas

**R : phénomène normal :**

- 0 = aucune commande valide reconnue

- L'ID n'est affiché que si un mot de commande valide est prononcé

- Réveillez d'abord le module, puis dites la commande

---

### Q4 : le taux de reconnaissance n'est pas élevé

**R : suggestions d'optimisation :**

- Assurez-vous que l'environnement est calme et que le bruit de fond n'est pas trop important

- Gardez une distance appropriée par rapport au microphone (10-50cm)

- Adoptez un débit de parole modéré et une prononciation claire

---

## Support technique

En cas de problème, veuillez vérifier :

1. Si le câblage matériel est correct (la masse commune est très importante !)

2. Si le débit en bauds du port série est 115200

3. Si l'adresse I2C est correcte (0x2A)

4. Si vous disposez d'autorisations suffisantes pour accéder à l'interface matérielle

## Commandes de débogage courantes

```Bash
ls -l /dev/i2c*      # Afficher les périphériques I2C
groups                # Vérifier les permissions des groupes d'utilisateurs
```

<RelatedProducts slugs="ai-voice-module" />
