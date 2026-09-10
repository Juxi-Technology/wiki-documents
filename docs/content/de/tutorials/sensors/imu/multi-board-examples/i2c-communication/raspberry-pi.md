---
title: Raspberry Pi 5
description: "Dieses Tutorial verwendet das Raspberry Pi 5-Mainboard mit dem offiziellen 64-Bit-Image als Beispiel."
---

# Raspberry Pi 5

## 1. Gerät anschließen

Dieses Tutorial verwendet das Raspberry Pi 5-Mainboard mit dem offiziellen 64-Bit-Image als Beispiel.

Den IMU-Lagesensor wie unten abgebildet an den I2C-Anschluss von Raspberry Pi 5 anschließen.

![1. Gerät anschließen – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmVjNTEwNDY2MWRiNmUzNWNhYjVmMjhlYWVlZmY1ODhfOWExZWQxZGMwNmIxNzNlNmQzNjRmYWZmMDU0OTE1ODVfSUQ6NzYwMjU3ODcxMzEyOTA2MTMyOF8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

![1. Gerät anschließen – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MDYzMGZjYWU1ZGUzMzFjZjdhNzk1MGJhNThkY2ViODNfYzA3MTIyZjAxYjc0NTc4ZTM0NWViZGNkYjMyMmJiZTFfSUQ6NzYwMjU3NDczMjM2MjA5MTQ1MF8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

## 2. Gerätestatus prüfen

Zuerst I2Ctool installieren, im Terminal eingeben:

```PowerShell
sudo apt-get update
sudo apt-get install -y i2c-tools
```

I2C-Geräte prüfen

\`\`\`PowerShell
sudo i2cdetect -y -r -a 1
\`\`\`

![2. Gerätestatus prüfen – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OWM3NzU5ODY2MDUwNTg3MjdlMTNiYjlhOWRiOTI1MDZfZGM4NDM5MzFiNTZlODgyMWE2ZjY3M2VjZGM3MmU0MzNfSUQ6NzYwMjU3OTYzMDY2MjUzNjM4OF8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

## 3. Treiberbibliotheken installieren

3.1 **Für den Code benötigte Python-Bibliotheken installieren**

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

3.2 Dateien übertragen

[IMU_ROS2.zip]

Wer noch nicht mit der Dateiübertragung per MobaXterm vertraut ist, findet unter folgendem Link eine ausführliche Installations- und Bedienungsanleitung: [文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

Die entpackten Dateien per MobaXterm auf Raspberry Pi 5 ziehen.

![3. Treiberbibliotheken installieren – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MGE0OThjMWZiZGZkMmNkODY1MWQ1YTJjZTI1ZTBjYTlfMTVjYzhhOTdjZjAxODdmZjcxYjliMjgzYTkzOTg4YzBfSUQ6NzYwMjU4MjU5NjQ0Njg2NjY1N18xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

## 4. IMU-Daten anzeigen

**In das Verzeichnis ~/IMU_Library wechseln und IMU_Serial_Library.py ausführen**

```PowerShell
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# 运行 IMU 数据打印文件
python3 -m IMU_Library.IMU_I2C_Library
```

![4. IMU-Daten anzeigen – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTI5NzY2YzRiODVkYWExYjk3M2QyNWU2ZjRmMDkxODRfOTMxYTMxMTU4NzVlNjNmY2YxMTUwMzgxOTI0ZTc3ZTJfSUQ6NzYwMjU3NTcxMDk4NDczNTk0OV8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

Hinweis: Oben werden die Daten eines 10-Achsen-IMU gelesen; 6-Achsen haben keine Magnetometer- und Barometerdaten, 9-Achsen keine Barometerdaten.

## **5. IMU-Kalibrierung**

**In das Verzeichnis ~/IMU_Library wechseln und imu_calibration_tool.py ausführen**

```PowerShell
cd ~/IMU_Library

# 运行 IMU 校准代码文件 --I2C通讯校准
# 执行所有校准（整体、磁力计、温度）
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1

# 仅整体校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate imu

# 仅磁力计校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate mag

# 仅温度校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate temp
```

![5. IMU-Kalibrierung – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTBhMDJlMGQ0ZmZmYzRlYzVmOGNhZTQyYjExYmQxNDhfMjU5YjA0NGRkNGY0YTM1OGE3NzYxOTdlNjcxMGQ2NmRfSUQ6NzYwMjU3NDczMzQ5MDA0NzkzOV8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

## 6. Hinweise

Beim Raspberry Pi 5 müssen die I2C-Pins im Voraus aktiviert werden.<br>So geht's:<br>Im Terminal ausführen

```PowerShell
sudo raspi-config
```

Mit den Pfeiltasten auswählen, mit Enter bestätigen<br>I2C auswählen, mit Enter bestätigen<br>Nach Auswahl von I2C Enter drücken, mit den Pfeiltasten Yes wählen und mit Enter bestätigen.<br>Mit Enter bestätigen<br>Mit den Pfeiltasten Finish wählen und mit Enter beenden.

![6. Hinweise – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NGFhOGFkMjU0M2ZhZTA3ZTgzN2RmNWNhMTFhYTdmNzBfN2VkMWQ4ZWNjZDY3OThkM2M4MDA5OWE4MTczNTQ0NTRfSUQ6NzYwMjU4MDA1MTM1MjA3OTU3OV8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

![6. Hinweise – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzY0NWQ5NTdkNjExNDk4ZTUwMDc2NTEzMDUwZTdiZTNfMTAwMzc2NzNlMTAzZmQ4OGE0YWJiM2YxZjg0ZDc3NDVfSUQ6NzYwMjU4MDIyMjIwMjEyMTQwNF8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

![6. Hinweise – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NDUzZjI5OWU2MmQ2OGZjNDBkMmFmMjE3OWUwYmRmMTBfMWY1ZmUwYjdjOTAwZTBiYzg5NTBjNWM5ZTNkOWI0OTdfSUQ6NzYwMjU4MDMxMTA4Mzk0NTE3NF8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

![6. Hinweise – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTRjMDQxNWViMzJiZDVhYzVkMDBkYWZjODg0NTI3NTA3MWExODE2ZjRlOTVlZWM0NDdmZGQ0Yzc4Y2Y1MWJlNmRfSUQ6NzYwMjU4MDM5OTc2MzY4ODM4MF8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

![6. Hinweise – 5](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTBjZDE2YTYxNGU3OTJlNzA0OWQwMjY0ODY2MTBiZGZfY2Q0ZmU0OTdmYTQyYjliODExMzI2YmM3NTdkMWY5YWRfSUQ6NzYwMjU4MDQ5NjAyNzUzNjU4Nl8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)
