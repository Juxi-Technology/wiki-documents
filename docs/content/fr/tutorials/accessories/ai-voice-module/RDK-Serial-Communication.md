---
title: "Communication par port série"
description: "Ce dépôt fournit un exemple de code Python pour la communication entre la plateforme RDK X5 (Raspberry Pi) et…"
---

# Communication par port série

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

### Connexion de la version UART

**Attention** : utilise par défaut le dispositif de port série `/dev/ttyAMA0`

---

### Connexion par câble de données Type-C (alternative UART)

Si vous utilisez un module adaptateur USB-TTL :

**Attention** : dans ce cas, le dispositif de port série est généralement `/dev/ttyUSB0`

![Image 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RDK-Serial-Communication/1.jpg)

---

## Configuration de l'environnement

### Configuration système requise

- RDK X5

- Système Ubuntu / Debian

- Python 3.7+

### Installer les paquets de dépendances

```Bash
# 更新软件包
sudo apt update
sudo apt upgrade -y

# 安装 Python 库
sudo apt install -y python3-pip

# 安装 pyserial
pip3 install pyserial
```

### Activer l'interface du port série

```Bash
# 打开配置工具
sudo raspi-config

# 选择 Interface Options → Serial
Select: No (shell) → Yes (hardware serial port)
# 重启生效
sudo reboot
```

---

## Utilisation de la version UART

### Vérifier les fichiers de code

```Bash
cd UART_Voice
ls -la
# 应该看到 uart_voice.py
```

### Configurer le dispositif de port série

Modifiez le fichier `uart_voice.py` et changez le dispositif de port série :

```Bash
# UART 直连（默认）
SERIAL_PORT = '/dev/ttyAMA0'

# 或者使用 USB-TTL
SERIAL_PORT = '/dev/ttyUSB0'

# 波特率
BAUD_RATE = 115200
```

### Exécuter le programme

## Attribution de l'autorisation d'exécution

```Bash
chmod +x uart_voice.py
# 运行（需要 sudo 权限访问串口）
sudo python3 uart_voice.py
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

Appuyez sur `Ctrl + C` pour arrêter le programme

---

## Dépannage

### Q1 : le dispositif de port série est introuvable

**R : vérifiez :**

1. Vérifiez si le port série est activé (raspi-config)

2. Vérifiez si le nom du dispositif est correct

    - UART direct : `/dev/ttyAMA0`

    - USB-TTL : `/dev/ttyUSB0` ou `/dev/ttyUSB1`

3. Vérifiez si la connexion matérielle est correcte

4. Vérifiez si le port série est occupé par un autre programme

```Bash
# 查看可用串口
ls /dev/tty* | grep tty
```

---

### Q2 : l'ID de commande n'affiche que 0 ou ne s'affiche pas

**R : phénomène normal :**

- 0 = aucune commande valide reconnue

- L'ID n'est affiché que si un mot de commande valide est prononcé

- Réveillez d'abord le module, puis dites la commande

---

### Q3 : le taux de reconnaissance n'est pas élevé

**R : suggestions d'optimisation :**

- Assurez-vous que l'environnement est calme et que le bruit de fond n'est pas trop important

- Gardez une distance appropriée par rapport au microphone (10-50cm)

- Adoptez un débit de parole modéré et une prononciation claire

---

### Q4 : anomalie de communication du port série

**R : vérifiez :**

1. Si TX/RX sont connectés en croisé (TX du module → RX du RPi)

2. Si le débit en bauds est 115200

3. Si les masses sont communes

4. Si le port série est occupé par un autre processus

```Bash
# 检查串口占用
sudo lsof /dev/ttyAMA0
```

---

## Support technique

En cas de problème, veuillez vérifier :

1. Si le câblage matériel est correct (la masse commune est très importante !)

2. Si le débit en bauds du port série est 115200

3. Si vous disposez d'autorisations suffisantes pour accéder à l'interface matérielle

## Commandes de débogage courantes

```Bash
ls -l /dev/ttyAMA0   # 查看串口设备
groups                # 查看用户组权限
```

<RelatedProducts slugs="ai-voice-module" />
