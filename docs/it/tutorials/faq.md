---
title: Domande frequenti (FAQ)
description: FAQ prodotti Juxi Technology — bracci robotici, sensori, accessori
keywords: [faq, risoluzione problemi]
---

# Domande frequenti (FAQ)

Domande frequenti per categoria di prodotto.

## Bracci robotici · SO-ARM101

**Q: La porta non viene rilevata?**
Controllare con `lerobot-find-port`. Su Linux: `sudo chmod 666 /dev/ttyACM*`.

**Q: Errore `Could not connect on port "/dev/ttyACM0"`?**
Verificare che `/dev/ttyACM*` esista e che i permessi siano corretti.

## Sensori · IMU

**Q: I dati IMU derivano?**
Eseguire la [calibrazione](/it/tutorials/sensors/imu/calibration). Verificare il fissaggio.

## Accessori · KWS

**Q: Il modulo vocale non risponde?**
Verificare il flash del firmware. Vedi [download firmware](/it/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words).

## Generale

**Q: Come ottenere supporto?**
- 📧 support@juxitech.com
- 💬 [GitHub Issues](https://github.com/Juxi-Technology/wiki-documents/issues)