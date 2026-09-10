---
title: Tutorial hochpräziser IMU-Attitüdensensor
description: "1. Erforderliche Python-Bibliotheken installieren"
---

# Tutorial hochpräziser IMU-Attitüdensensor

### Archiv [IMU_ROS1.zip](https://juxitech.feishu.cn/wiki/BcWGwW2yDiXex9k6qjTcleTvnPb) oder [IMU_ROS2.zip](https://juxitech.feishu.cn/wiki/ZL8XwrPriifnASk41AhcoPj1nnb) herunterladen, entpacken und in ~/IMU_Library wechseln

1. **Erforderliche Python-Bibliotheken installieren**

```PowerShell
pip install pyserial
pip install smbus2
```

2. **IMU_Library-Bibliothek installieren**

```PowerShell
# Erforderliche Python-Bibliotheken installieren
pip install -e .

# Bibliothek und ihre Abhängigkeiten installieren
python setup.py install
```

3. **Port-Zuordnung einrichten**

```PowerShell
# Port-Zuordnung einrichten, um Portänderungen nach dem Ein-/Ausstecken zu verhindern
sudo gedit /etc/udev/rules.d/99-serial-imu.rules

# Falls kein gedit-Befehl vorhanden, zuerst installieren
sudo apt install gedit

# Zuordnung eintragen
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"

# Parameter-Erklärung:
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

# Beispielausgabe:
lrwxrwxrwx 1 root root 7 1月 22 10:00 /dev/imu-serial -> ttyUSB0
```

### Serielle Kommunikation

1. **In ~/IMU_Library wechseln und IMU_Serial_Library.py ausführen**

```PowerShell
cd ~/imu_ros1/src/IMU_ROS1/IMU_Library/IMU_Library
# IMU-Seriendaten-Ausgabedatei ausführen
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# oder
python3 IMU_Serial_Library.py
```

### I2C-Kommunikation

1. **In ~/IMU_Library wechseln und IMU_I2C_Library.py ausführen**

```PowerShell
cd ~/IMU_Library/IMU_Library

# IMU-I2C-Daten-Ausgabedatei ausführen
python3 IMU_I2C_Library.py
```

### imu-Kalibrierung

1. **In ~/IMU_Library wechseln und imu_calibration_tool.py ausführen**

```PowerShell
cd ~/IMU_Library/IMU_Library

# IMU-Kalibrierungscode ausführen -- Serielle Kommunikation
# Alle Kalibrierungen ausführen (Gesamt, Magnetometer, Temperatur)
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial

# Nur Gesamtkalibrierung
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate imu

# Nur Magnetometer
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate mag

# Nur Temperatur
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate temp

# I2C-Kalibrierung
# IMU-Kalibrierungscode ausführen -- I2C
python3 imu_calibration_tool.py --mode i2c --port 1

# Nur Gesamtkalibrierung
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate imu

# Nur Magnetometer
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate mag

# Nur Temperatur
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate temp
```


---

## Offizielles Repository-Beispiel

Juxi Technology stellt den vollständigen Open-Source-Code für das IMU-Modul bereit: [GitHub](https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module)

### ROS1-/ROS2-Beispiele

Das Repository unterstützt ROS1 und ROS2 nativ, inklusive Kalibrierungstools und Visualisierungs-Nodes:

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module

# ROS2
colcon build
source install/setup.bash
ros2 launch icm42670p imu_launch.py
```

### Python-Kalibrierungstool

```bash
# 运行六面校准获取精确的加速度计和陀螺仪零偏
python calibration/calibrate.py --port /dev/ttyUSB0
```
