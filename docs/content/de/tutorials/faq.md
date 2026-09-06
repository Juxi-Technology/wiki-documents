---
title: Häufige Fragen (FAQ)
description: Juxi Technology Produkt-FAQ — Roboterarme, Sensoren, Zubehör
keywords: [faq, troubleshooting]
---

# Häufige Fragen (FAQ)

Häufige Fragen nach Produktkategorie.

---

## Roboterarme · SO-ARM101

**Q: Port wird nicht erkannt?**

**A:** Mit `lerobot-find-port` prüfen. USB-Verbindung prüfen; unter Linux `sudo chmod 666 /dev/ttyACM*`.

**Q: Fehler `Could not connect on port "/dev/ttyACM0"`?**

**A:** Prüfe, ob `/dev/ttyACM*` existiert und Rechte gesetzt sind.

**Q: `Magnitude 30841 exceeds 2047` bei der Kalibrierung?**

**A:** Roboterarm aus- und wieder einschalten, dann erneut kalibrieren.

**Q: Servofehler `ConnectionError: Failed to sync read 'Present_Position' on ids=[1,...,6]`?**

**A:** Prüfe, ob der Arm an diesem Port mit Strom versorgt wird und die Bus-Servos korrekt angeschlossen sind.

**Q: `Motor 'gripper' was not found`?**

**A:** Prüfe die Servo-Kommunikationskabel und die Versorgungsspannung.

**Q: GPU mit PyTorch nicht verfügbar?**

**A:** Siehe [PyTorch-Inkompatibilitäten auf Jetson Orin](/de/tutorials/learning-resources/jetson-orin-pytorch-compatibility).

---

## Sensoren · IMU

**Q: IMU-Daten driften?**

**A:** Zuerst [Kalibrierung](/de/tutorials/sensors/imu/calibration) ausführen; Befestigung prüfen; bei großen Temperaturänderungen Temperaturkalibrierung ergänzen.

**Q: Magnetometer-Werte ungenau?**

**A:** Magnetometer-Kalibrierung ausführen — dabei langsam durch alle Ausrichtungen drehen, fern von Motoren und Magneten.

**Q: Keine Daten in ROS-Themen?**

**A:** Serielle Rechte (`sudo chmod 666 /dev/ttyUSB*`) und Port-Parameter in der Launch-Datei prüfen.

---

## Zubehör · KWS-Spracherkennung

**Q: Sprachmodul reagiert nicht?**

**A:** Sicherstellen, dass die Werks-Firmware geflasht ist. Siehe [Firmware-Download](/de/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words).

**Q: Keine Daten über die serielle Schnittstelle?**

**A:** Baudrate mit dem Tutorial abgleichen und Verkabelung prüfen (RX/TX gekreuzt).

---

## Zubehör · Herzfrequenz- und SpO2-Sensor

**Q: Initialisierung schlägt fehl (init fail)?**

**A:** Verkabelung prüfen: I2C-Adresse standardmäßig 0x57; UART-Baudrate 9600.

**Q: Unstabile Messwerte?**

**A:** Guten Hautkontakt sicherstellen; Finger ruhig halten.

---

## Zubehör · USB-/CSI-Kameras

**Q: Kamera wird nicht erkannt?**

**A:** USB-Kabel und Anschlüsse prüfen; `ls /dev/video*` und `v4l2-ctl --list-devices` ausführen.

**Q: CSI-Kamera wird nicht erkannt?**

**A:** Ausrichtung des Flachbandkabels prüfen (Metallkontakte zur Platine), nur **im ausgeschalteten Zustand** anschließen; JetPack ≥ 5.0 voraussetzen.

**Q: GStreamer-Pipeline-Fehler?**

**A:** JetPack ≥ 5.0 prüfen; `apt list --installed | grep nvarguscamerasrc` ausführen.

---

## Zubehör · Sonstiges

**Q: 4K-HDMI-Capture zeigt schwarzes Bild?**

**A:** HDMI-Schnittstellentyp prüfen (HDMI/Micro-HDMI/DP-Adapter) und passenden Konverter verwenden.

**Q: OLED-Display leuchtet nicht?**

**A:** I2C-Verkabelung (SCL/SDA) prüfen; Pin-Kurzschlüsse können das Host-Board beschädigen.

**Q: USB-Soundkarte wird nicht erkannt?**

**A:** Plug-and-Play-Gerät; USB-Stromversorgung prüfen; Standard-Audioausgabegerät wechseln.

**Q: 2-DOF-Gimbal-Servos reagieren nicht?**

**A:** Servo-Stromversorgung prüfen (SCS-Servos benötigen externe 6–8,4 V).

---

## Allgemein

**Q: Feishu-Links in Tutorials öffnen nicht?**

**A:** Feishu-Dokumente sind nur für interne Mitarbeiter/Kollaborateure. Nutze dieses Wiki oder wende dich an support@juxitech.com.

**Q: Welche Plattformen werden unterstützt?**

**A:** PC (Linux/Windows), Jetson, Raspberry Pi — siehe „Systemanforderungen" in jedem Tutorial.

**Q: Wie erhalte ich Support?**
**A:**
- 📧 support@juxitech.com
- 💬 [GitHub Issues](https://github.com/Juxi-Technology/wiki-documents/issues)

---

## Verwandte Links

- [Auswahlhilfe Roboterarme](/de/tutorials/robot-arms/select-guide)
- [Download-Center](/de/downloads/)
- [Nutzer-Erfolgsgeschichten](/de/cases/)
