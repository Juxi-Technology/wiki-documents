---
title: "Jetson"
description: "IMU-Lagesensor am Jetson Orin NX per I2C anbinden: Sensor anschließen, Gerätestatus prüfen, Lagedaten auslesen und Kalibrierung starten."
---

# Jetson

## 1. Gerät anschließen

Dieses Tutorial verwendet das Jetson Orin NX-Mainboard als Beispiel.

Den IMU-Lagesensor wie unten abgebildet an den I2C-Anschluss von Jetson Orin NX anschließen.

![1. Gerät anschließen – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NGE4ODJlYmE0NTQ2ZmFkMjJjNzZiNzYxNTk4YmU1NThfZGM5ZDA4MDdiZmU3MGI0YTZhMDBkYWZjZTJhZjU4YzJfSUQ6NzYwMjU5MzY2NjkxMzM3MzE0OV8xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)

![1. Gerät anschließen – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MjI3ZGUyMjE4N2Q1ZjkwZTk5OTNmOWZjMjRjYzE4YWVfZTIxMjNjMjE5MmU4ZDIyMDE1YTM4YzZhNWM1OGVjODVfSUQ6NzYwMjU5MzYwODU4ODA4NjIzMV8xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)

## 2. Gerätestatus prüfen

Zuerst I2Ctool installieren, im Terminal eingeben:

```PowerShell
sudo apt-get update
sudo apt-get install -y i2c-tools
```

I2C-Geräte prüfen

\`\`\`PowerShell
sudo i2cdetect -y -r -a 7
\`\`\`

![2. Gerätestatus prüfen – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NWFiNTRkMWNlYWYyYmVlMjQ0YTkxMGRmYzI5ZmI3MTVfOTRlMjA4MzMzM2RiNjFiOTlmODcxYWFiOTZiMDRjYjdfSUQ6NzYwMzIxMzAxMDYwOTgxODU4Ml8xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)

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

![3. Treiberbibliotheken installieren – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=N2I1Njk5NDIyOWI0NmFlYWY1YzcxOTNmODc1NTA3ODRfM2MyNjQ2YjA4YWUwNGQwMzdjM2ZlZWUzZDRkN2M5ZTlfSUQ6NzYwMjU5MzM2MTQ4ODkzOTk4M18xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)

## 4. IMU-Daten anzeigen

**In das Verzeichnis ~/IMU_Library wechseln und IMU_Serial_Library.py ausführen**

```PowerShell
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# 运行 IMU 数据打印文件
python3 -m IMU_Library.IMU_I2C_Library
```

![4. IMU-Daten anzeigen – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NWMwZWNkYTdjMDE0ZGI1OGZiZjM3M2I1Mjk4ZmJmNzVfYzZlYjVjMTNiNWQ0MDZhNzFmZmVlNzUyNzE3ZWUzYjFfSUQ6NzYwMzIxMjQ3Mjc4MzQ3Mzg4OV8xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)

Hinweis: Oben werden die Daten eines 10-Achsen-IMU gelesen; 6-Achsen haben keine Magnetometer- und Barometerdaten, 9-Achsen keine Barometerdaten.

## **5. IMU-Kalibrierung**

**In das Verzeichnis ~/IMU_Library wechseln und imu_calibration_tool.py ausführen**

```PowerShell
cd ~/IMU_Library

# 运行 IMU 校准代码文件 --I2C通讯校准
# 执行所有校准（整体、磁力计、温度）
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 7

# 仅整体校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 7 --calibrate imu

# 仅磁力计校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 7 --calibrate mag

# 仅温度校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 7 --calibrate temp
```

![5. IMU-Kalibrierung – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OGUxOGUxYjRiMzBkYzIwYTQxM2FmYzgzZjlhMzZhMjZfYzZiZmQ2ZTEwZmE1YjAzMjBkYzY1MjFlMjc1NTZjNTJfSUQ6NzYwMzIxMjgwNzgyMzYyNTQ0Ml8xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)

## 6. Hinweise

Bei Verwendung von Jetson Orin NX muss die I2C-Busnummer je nach Situation angepasst werden – siehe Abbildung unten. Üblicherweise Bus 7

![6. Hinweise – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTI2ZmQzNTJhMWM5NmQ2YmM5ODE5NDI1Yzk3MTYxMTBfNGQ2MDk5YmI2YjU1ZmQxMzk5NGJmMDc0MjFhZTRhODRfSUQ6NzYwMjU5Nzk4ODE3MDQ4NDk2NF8xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)

![6. Hinweise – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTYyYWUwNDQyOTFkZGQzZDc5NmM4NmZiOWQ3OTc2MzNfNDNhNGQ5NGJiM2M0NmMwNWFlMDAyYmIxZGNkOTU0MzJfSUQ6NzYwMjU5ODAxMzU5MjMyNTM0M18xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)






