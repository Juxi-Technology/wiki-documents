---
title: FAQ
description: FAQ produits Juxi Technology — bras robotiques, capteurs, accessoires
keywords: [faq, dépannage]
---

# FAQ

Questions fréquentes par catégorie de produit.

## Bras robotiques · SO-ARM101

**Q : Le port n'est pas détecté ?**
Vérifier avec `lerobot-find-port`. Sur Linux : `sudo chmod 666 /dev/ttyACM*`.

**Q : Erreur `Could not connect on port "/dev/ttyACM0"` ?**
Vérifier que `/dev/ttyACM*` existe et que les permissions sont correctes.

## Capteurs · IMU

**Q : Les données IMU dérivent ?**
Effectuer la [calibration](/fr/tutorials/sensors/imu/calibration). Vérifier la fixation.

## Accessoires · KWS

**Q : Le module vocal ne répond pas ?**
Vérifier le flash du firmware. Voir [téléchargement du firmware](/fr/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words).

## Général

**Q : Comment obtenir du support ?**
- 📧 support@juxitech.com
- 💬 [GitHub Issues](https://github.com/Juxi-Technology/wiki-documents/issues)