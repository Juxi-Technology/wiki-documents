---
title: "RDK"
description: "IMU-Lagesensor am RDK X5 über USB-Seriell anbinden: Kabel anschließen, Portzuordnung fest einrichten und Lagedaten auslesen."
---

# RDK

## 1. Gerät anschließen

Dieses Tutorial verwendet das RDK X5-Mainboard als Beispiel.

Den IMU-Lagesensor per Typ-C-Kabel an den USB-Anschluss des Hosts anschließen.

![1. Gerät anschließen – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk/1.jpg)

## 2. Gerätestatus prüfen

Geräte-ID prüfen

```PowerShell
lsusb
```

Gerätenummer prüfen

```PowerShell
ls -l /dev/ttyU*
```

Port-Zuordnung einrichten

```Bash
# Port-Zuordnung einrichten, um Portänderungen nach dem Ein-/Ausstecken zu verhindern
sudo gedit /etc/udev/rules.d/99-serial-imu.rules
# Falls kein gedit-Befehl vorhanden, zuerst installieren
sudo apt install gedit
# Zuordnung eintragen
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"
# Parameter-Erklärung
`--mode`: Kommunikationsmodus: `serial` (seriell) oder `i2c`
`--port`: Serieller Portname (z. B. `/dev/ttyUSB0`) oder I2C-Portnummer (z. B. `7`)
`--rate`: Datenausgabefrequenz (Hz), Standard 10Hz
`--debug`: Debug-Modus aktivieren, Details anzeigen
# Speichern und beenden, Befehle zum Aktivieren der Regeln ausführen
sudo udevadm trigger
sudo service udev reload
sudo service udev restart
# Verifizieren
ll /dev/imu-serial
# Beispielausgabe
lrwxrwxrwx 1 root root 7 1月 22 10:00 /dev/imu-serial -> ttyUSB0
```

## 3. Treiberbibliotheken installieren

3.1 **Für den Code benötigte Python-Bibliotheken installieren**

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

3.2 **Dateien übertragen**

IMU_ROS2.zip

Wer noch nicht mit der Dateiübertragung per MobaXterm vertraut ist, findet unter folgendem Link eine ausführliche Installations- und Bedienungsanleitung: [文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

Die entpackten Dateien per MobaXterm auf RDK X5 ziehen.

![3. Treiberbibliotheken installieren – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk/2.png)

## 4. IMU-Daten anzeigen

**In das Verzeichnis ~/IMU_Library wechseln und IMU_Serial_Library.py ausführen**

```PowerShell
cd ~/IMU_ROS2/IMU_Library
# IMU-Datenausgabedatei ausführen
python3 -m IMU_Library.IMU_Serial_Library
```

![4. IMU-Daten anzeigen – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk/3.png)

Hinweis: Oben werden die Daten eines 10-Achsen-IMU gelesen; 6-Achsen haben keine Magnetometer- und Barometerdaten, 9-Achsen keine Barometerdaten.

## **5. IMU-Kalibrierung**

**In das Verzeichnis ~/IMU_Library wechseln und imu_calibration_tool.py ausführen**

```PowerShell
cd ~/IMU_Library
# IMU-Kalibrierungscode ausführen -- Serielle Kommunikation
# Alle Kalibrierungen ausführen (Gesamt, Magnetometer, Temperatur)
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial
# Nur Gesamtkalibrierung
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial --calibrate imu
# Nur Magnetometer
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial --calibrate mag
# Nur Temperatur
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial --calibrate temp
```

![5. IMU-Kalibrierung – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk/4.png)

## 6. Hinweise

Wenn die Geräte-ID sichtbar ist, aber keine Gerätenummer findet, mit folgenden Befehlen den ch34x-Treiber installieren

```PowerShell
sudo apt remove brltty
git clone https://github.com/clhchan/CH341SER.git
cd CH341SER
make -j6
sudo make install
sudo modprobe ch34x
```
