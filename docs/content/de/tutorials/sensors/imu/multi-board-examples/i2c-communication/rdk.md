---
title: RDK-Serie
description: "Dieses Tutorial verwendet das RDK X5-Mainboard als Beispiel."
---

# RDK-Serie

## 1. Gerät anschließen

Dieses Tutorial verwendet das RDK X5-Mainboard als Beispiel.

Den IMU-Lagesensor wie unten abgebildet an den I2C-Anschluss von RDK X5 anschließen.

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OWFkNTFjYzkwN2VlOTNhMTYzZTk4OGE0Y2I0MWQwYTJfNWViZWVlZWE1NGIwYjIxNjljOWE3MDQ2OWYzNGYzNjlfSUQ6NzYwMjU5NDE1ODEyNTI3MjI2OV8xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjhhOTgyYjQxNmJhZjVlYjk5M2Y4ODE3OGVkYWM2MmFfMmFjZDM5N2U3Y2IxODQzMDFmNDBiZDNmYTQwZWQyNmJfSUQ6NzYwMjU5ODYyMDIzNTkxMDMyMl8xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)

## 2. Gerätestatus prüfen

Zuerst I2Ctool installieren, im Terminal eingeben:

```PowerShell
sudo apt-get update
sudo apt-get install -y i2c-tools
```

I2C-Geräte prüfen

\`\`\`PowerShell
sudo i2cdetect -y -r -a 0
\`\`\`

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTMyZTdiNDQ5OGMxNjhlMzA3YzA0MTRkMmY0ZWUwNjNfNjA2Y2FmZTU1NjdjNWYyNzI0ZGRhOWFjZjg3OGExMzdfSUQ6NzYwNTAzOTAxMDYwOTgxODU4M18xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)

## 3. Treiberbibliotheken installieren

3.1 **Für den Code benötigte Python-Bibliotheken installieren**

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

3.2 Dateien übertragen

[IMU_ROS2.zip]

如果还不会使用MobaXterm传输文件的朋友，请查看以下网页MobaXterm详细安装和操作方法：[文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

Die entpackten Dateien per MobaXterm auf RDK X5 ziehen.

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjcyMTE3MTJiMWUzMjhhZTlkYTgyNDVkMGJmZDIyZTFfZWI4Mzc5MjUyZDk3Yjg3ODgzMTAwZDY2YjdiZTAzYWVfSUQ6NzYwMjU5MzgxMDE3MDAyMjg2NF8xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)

## 4. IMU-Daten anzeigen

**In das Verzeichnis ~/IMU_Library wechseln und IMU_Serial_Library.py ausführen**

```PowerShell
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# 运行 IMU 数据打印文件
python3 -m IMU_Library.IMU_I2C_Library
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NjNjN2YzOTMyNWUyM2RjOGYyNDRiNjg3MDA2NzlhN2ZfNWI4NGYzM2NmYWExYjRlZjQ3YTY1Y2I2NDMxYmU5YTNfSUQ6NzYwMjU5MzgwOTY2NjkxOTM2Nl8xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)

Hinweis: Oben werden die Daten eines 10-Achsen-IMU gelesen; 6-Achsen haben keine Magnetometer- und Barometerdaten, 9-Achsen keine Barometerdaten.

## **5. IMU-Kalibrierung**

**In das Verzeichnis ~/IMU_Library wechseln und imu_calibration_tool.py ausführen**

```PowerShell
cd ~/IMU_Library

# 运行 IMU 校准代码文件 --I2C通讯校准
# 执行所有校准（整体、磁力计、温度）
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0

# 仅整体校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate imu

# 仅磁力计校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate mag

# 仅温度校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate temp
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZWM5YTZmOTIyZDBmZjk4OTkzNWEwYjI2ZjgxMDE4MGNfNGVkYzlkZjU5YmNhNmE3N2YwZGJiNDcwMzFlN2U0YWJfSUQ6NzYwMjU5MzgwODE2NTUwNjAwOV8xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)

## 6. Hinweise

Bei Verwendung von RDK X5 muss die I2C-Busnummer je nach Situation angepasst werden – siehe Abbildung unten. Üblicherweise Bus 0

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjhmNGIzMGZiOGI1ZTM3MjA1MGQ5ZDc4NWYwYjcxMjVfNTZkMjFjOGY1OTQwMzU3ODhlY2M2MTg1ZGJiZGVhZWJfSUQ6NzYwMjU5NTU1MjI1NzM5NTY0NF8xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NmFmMzJjYWQ2MmZlNTBmOGE0NDM0NzZmZWQxZDNkN2ZfODUzNmYzMTE4OTFhMGRjNTgyODFmYTdjMGM4ZjEzY2RfSUQ6NzYwMjU5NTY5NTc1ODU2MDIxMl8xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)






