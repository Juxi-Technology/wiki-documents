---
title: "FAQ"
description: "FAQ prodotti Juxi Technology — bracci robotici, sensori, accessori"
keywords: [faq, risoluzione problemi]
---

# FAQ

Domande frequenti per categoria di prodotto.

---

## Bracci robotici · SO-ARM101

**Q: La porta non viene rilevata?**

**A:** Controllare con `lerobot-find-port`. Verificare le connessioni USB. Su Linux: `sudo chmod 666 /dev/ttyACM*`.

**Q: Errore `Could not connect on port "/dev/ttyACM0"`?**

**A:** Verificare che `/dev/ttyACM*` esista e che i permessi siano corretti, quindi riprovare.

**Q: `Magnitude 30841 exceeds 2047` durante la calibrazione?**

**A:** Spegnere e riaccendere il braccio robotico e ricalibrare.

**Q: Errore servo `ConnectionError: Failed to sync read 'Present_Position' on ids=[1,...,6]`?**

**A:** Verificare che il braccio su quella porta sia alimentato e che i servo bus siano collegati correttamente.

**Q: `Motor 'gripper' was not found`?**

**A:** Controllare i cavi di comunicazione dei servo e la tensione di alimentazione.

**Q: GPU non disponibile con PyTorch?**

**A:** Vedi [Incompatibilità PyTorch su Jetson Orin](/it/tutorials/learning-resources/jetson-orin-pytorch-compatibility).

---

## Sensori · IMU

**Q: I dati IMU derivano?**

**A:** Eseguire prima la [calibrazione completa](/it/tutorials/sensors/imu/calibration); verificare il fissaggio del modulo; aggiungere la calibrazione della temperatura per grandi variazioni termiche.

**Q: Valori del magnetometro errati?**

**A:** Eseguire la calibrazione del magnetometro — ruotare lentamente in tutte le orientazioni, lontano da motori e magneti.

**Q: Nessun dato nei topic ROS?**

**A:** Controllare i permessi seriali (`sudo chmod 666 /dev/ttyUSB*`) e i parametri di porta nel file launch.

---

## Accessori · Riconoscimento vocale KWS

**Q: Il modulo vocale non risponde?**

**A:** Verificare che il firmware di fabbrica sia flashato. Vedi [download firmware](/it/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words).

**Q: Nessun dato dalla comunicazione seriale?**

**A:** Verificare che il baud rate corrisponda al tutorial e che il cablaggio sia corretto (RX/TX incrociati).

---

## Accessori · Sensore di frequenza cardiaca e SpO2

**Q: L'inizializzazione fallisce (init fail)?**

**A:** Controllare il cablaggio: indirizzo I2C predefinito 0x57; UART 9600 baud.

**Q: Letture instabili?**

**A:** Garantire un buon contatto sensore-pelle; tenere il dito fermo.

---

## Accessori · Fotocamere USB / CSI

**Q: Fotocamera non rilevata?**

**A:** Controllare cavo e porte USB; eseguire `ls /dev/video*` e `v4l2-ctl --list-devices`.

**Q: Fotocamera CSI non riconosciuta?**

**A:** Controllare l'orientamento del flat cable (contatti metallici verso la scheda), collegare **a dispositivo spento**; verificare JetPack ≥ 5.0.

**Q: Errore pipeline GStreamer?**

**A:** Verificare JetPack ≥ 5.0; controllare `apt list --installed | grep nvarguscamerasrc`.

---

## Accessori · Altro

**Q: La scheda di acquisizione HDMI 4K mostra schermo nero?**

**A:** Verificare il tipo di interfaccia HDMI (HDMI/Micro HDMI/adattatore DP) e usare il convertitore giusto.

**Q: Il display OLED non si accende?**

**A:** Controllare il cablaggio I2C (SCL/SDA); un cortocircuito dei pin può danneggiare la scheda host.

**Q: Scheda audio USB non rilevata?**

**A:** Dispositivo plug-and-play; verificare l'alimentazione USB; cambiare il dispositivo di uscita audio predefinito.

**Q: I servo del gimbal 2-DOF non rispondono?**

**A:** Controllare l'alimentazione dei servo (i servo SCS richiedono 6–8,4 V esterni).

---

## Generale

**Q: I link Feishu dei tutorial non si aprono?**

**A:** I documenti Feishu sono solo per personale interno/collaboratori. Usa questa wiki o contatta support@juxitech.com.

**Q: Quali piattaforme sono supportate?**

**A:** PC (Linux/Windows), Jetson, Raspberry Pi — vedi i «requisiti di sistema» in ogni tutorial.

**Q: Come ottenere supporto?**
**A:**
- 📧 support@juxitech.com
- 💬 [GitHub Issues](https://github.com/Juxi-Technology/wiki-documents/issues)

---

## Link correlati

- [Guida alla scelta dei bracci robotici](/it/tutorials/robot-arms/select-guide)
- [Centro download](/it/downloads/)
- [Storie di successo degli utenti](/it/cases/)
