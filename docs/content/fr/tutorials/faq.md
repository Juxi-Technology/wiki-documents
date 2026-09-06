---
title: FAQ
description: FAQ produits Juxi Technology — bras robotiques, capteurs, accessoires
keywords: [faq, dépannage]
---

# FAQ

Questions fréquentes par catégorie de produit.

---

## Bras robotiques · SO-ARM101

**Q : Le port n'est pas détecté ?**

**A :** Vérifier avec `lerobot-find-port`. Vérifier les connexions USB. Sous Linux : `sudo chmod 666 /dev/ttyACM*`.

**Q : Erreur `Could not connect on port "/dev/ttyACM0"` ?**

**A :** Vérifier que `/dev/ttyACM*` existe et que les permissions sont correctes, puis réessayer.

**Q : `Magnitude 30841 exceeds 2047` pendant la calibration ?**

**A :** Couper puis rallumer le bras robotique et relancer la calibration.

**Q : Erreur de servo `ConnectionError: Failed to sync read 'Present_Position' on ids=[1,...,6]` ?**

**A :** Vérifier que le bras sur ce port est alimenté et que les servos bus sont correctement connectés.

**Q : `Motor 'gripper' was not found` ?**

**A :** Vérifier les câbles de communication des servos et la tension d'alimentation.

**Q : GPU indisponible avec PyTorch ?**

**A :** Voir [Incompatibilités PyTorch sur Jetson Orin](/fr/tutorials/learning-resources/jetson-orin-pytorch-compatibility).

---

## Capteurs · IMU

**Q : Les données IMU dérivent ?**

**A :** Effectuer la [calibration](/fr/tutorials/sensors/imu/calibration) complète ; vérifier la fixation du module ; ajouter une calibration de température en cas de fortes variations.

**Q : Valeurs du magnétomètre fausses ?**

**A :** Effectuer la calibration du magnétomètre — tourner lentement dans toutes les orientations, loin des moteurs et des aimants.

**Q : Aucune donnée dans les topics ROS ?**

**A :** Vérifier les permissions série (`sudo chmod 666 /dev/ttyUSB*`) et les paramètres de port dans votre fichier launch.

---

## Accessoires · Reconnaissance vocale KWS

**Q : Le module vocal ne répond pas ?**

**A :** Vérifier que le firmware d'usine est flashé. Voir [téléchargement du firmware](/fr/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words).

**Q : Aucune donnée en communication série ?**

**A :** Vérifier que la vitesse en bauds correspond au tutoriel et que le câblage est correct (RX/TX croisés).

---

## Accessoires · Capteur cardiaque et SpO2

**Q : L'initialisation échoue (init fail) ?**

**A :** Vérifier le câblage : adresse I2C par défaut 0x57 ; bauds UART 9600.

**Q : Mesures instables ?**

**A :** Assurer un bon contact capteur-peau ; garder le doigt immobile.

---

## Accessoires · Caméras USB / CSI

**Q : Caméra non détectée ?**

**A :** Vérifier câble et ports USB ; exécuter `ls /dev/video*` et `v4l2-ctl --list-devices`.

**Q : Caméra CSI non reconnue ?**

**A :** Vérifier l'orientation du nappe (contacts métalliques vers la carte), brancher **hors tension** ; vérifier JetPack ≥ 5.0.

**Q : Erreur de pipeline GStreamer ?**

**A :** Vérifier JetPack ≥ 5.0 ; exécuter `apt list --installed | grep nvarguscamerasrc`.

---

## Accessoires · Autres

**Q : La capture HDMI 4K affiche un écran noir ?**

**A :** Vérifier le type d'interface HDMI (HDMI/Micro HDMI/adaptateur DP) et utiliser le bon convertisseur.

**Q : L'écran OLED ne s'allume pas ?**

**A :** Vérifier le câblage I2C (SCL/SDA) ; un court-circuit de broche peut endommager la carte hôte.

**Q : Carte son USB non détectée ?**

**A :** Appareil plug-and-play ; vérifier l'alimentation USB ; changer le périphérique de sortie audio par défaut.

**Q : Les servos du cardan 2-DOF ne répondent pas ?**

**A :** Vérifier l'alimentation des servos (les servos SCS nécessitent 6–8,4 V externes).

---

## Général

**Q : Les liens Feishu des tutoriels ne s'ouvrent pas ?**

**A :** Les documents Feishu sont réservés au personnel interne/collaborateurs. Utilisez ce wiki ou contactez support@juxitech.com.

**Q : Quelles plateformes sont prises en charge ?**

**A :** PC (Linux/Windows), Jetson, Raspberry Pi — voir les « exigences système » de chaque tutoriel.

**Q : Comment obtenir de l'aide ?**
**A:**
- 📧 support@juxitech.com
- 💬 [GitHub Issues](https://github.com/Juxi-Technology/wiki-documents/issues)

---

## Liens connexes

- [Guide de sélection des bras robotiques](/fr/tutorials/robot-arms/select-guide)
- [Centre de téléchargement](/fr/downloads/)
- [Témoignages d'utilisateurs](/fr/cases/)
