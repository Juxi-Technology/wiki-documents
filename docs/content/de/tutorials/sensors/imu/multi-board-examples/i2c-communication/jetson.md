---
title: "Jetson"
description: "IMU-Lagesensor am Jetson Orin NX per I2C anbinden: Sensor anschließen, Gerätestatus prüfen, Lagedaten auslesen und Kalibrierung starten."
---

# Jetson

## 1. Gerät anschließen

Dieses Tutorial verwendet das Jetson Orin NX-Mainboard als Beispiel.

Den IMU-Lagesensor wie unten abgebildet an den I2C-Anschluss von Jetson Orin NX anschließen.

![1. Gerät anschließen – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson/1.jpg)

![1. Gerät anschließen – 2](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson/2.png)

## 2. Gerätestatus prüfen

Zuerst I2Ctool installieren, im Terminal eingeben:

```PowerShell
sudo apt-get update
sudo apt-get install -y i2c-tools
```

I2C-Geräte prüfen

```PowerShell
sudo i2cdetect -y -r -a 7
```

![2. Gerätestatus prüfen – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson/3.png)

## 3. Treiberbibliotheken installieren

3.1 **Für den Code benötigte Python-Bibliotheken installieren**

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

3.2 Dateien übertragen

IMU_ROS2.zip

Wer noch nicht mit der Dateiübertragung per MobaXterm vertraut ist, findet unter folgendem Link eine ausführliche Installations- und Bedienungsanleitung: [文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

Die entpackten Dateien per MobaXterm auf Jetson Orin NX ziehen.

![3. Treiberbibliotheken installieren – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson/4.png)

## 4. IMU-Daten anzeigen

**In das Verzeichnis ~/IMU_Library wechseln und IMU_Serial_Library.py ausführen**

```PowerShell
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# IMU-Datenausgabedatei ausführen
python3 -m IMU_Library.IMU_I2C_Library
```

![4. IMU-Daten anzeigen – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson/5.png)

Hinweis: Oben werden die Daten eines 10-Achsen-IMU gelesen; 6-Achsen haben keine Magnetometer- und Barometerdaten, 9-Achsen keine Barometerdaten.

## **5. IMU-Kalibrierung**

**In das Verzeichnis ~/IMU_Library wechseln und imu_calibration_tool.py ausführen**

```PowerShell
cd ~/IMU_Library

# IMU-Kalibrierungscode ausführen -- I2C
# Alle Kalibrierungen ausführen (Gesamt, Magnetometer, Temperatur)
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 7

# Nur Gesamtkalibrierung
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 7 --calibrate imu

# Nur Magnetometer
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 7 --calibrate mag

# Nur Temperatur
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 7 --calibrate temp
```

![5. IMU-Kalibrierung – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson/6.png)

## 6. Hinweise

Bei Verwendung von Jetson Orin NX muss die I2C-Busnummer je nach Situation angepasst werden – siehe Abbildung unten. Üblicherweise Bus 7

![6. Hinweise – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson/7.png)

![6. Hinweise – 2](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson/8.png)






