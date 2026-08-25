---
title: RDK-Serie
description: "Dieses Tutorial verwendet das RDK X5-Mainboard als Beispiel."
---

# RDK-Serie

## 1. Gerät anschließen

Dieses Tutorial verwendet das RDK X5-Mainboard als Beispiel.

Den IMU-Lagesensor per Typ-C-Kabel an den USB-Anschluss des Hosts anschließen.

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2ZiMDI5ZTk0ZjY0YjIwMGIxY2M3MTc4NzI5OThkODlfN2E4NGM0ODE2NTRhNWU2NzI2NmU0Zjg1MmMyNTg1ZDdfSUQ6NzYwMjU4Njc3NTMwMzU1MDkwNV8xNzgwMDUyNjAwOjE3ODAxMzkwMDBfVjM)

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
# 防止插拔后端口变更，请设置端口映射
sudo gedit /etc/udev/rules.d/99-serial-imu.rules
# 如出现没有gedit命令相关内容，请先下载安装
sudo apt install gedit
# 填写映射内容
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"
# 参数说明
`--mode`: 通信模式，可选值为`serial`(串口)或`i2c`
`--port`: 串口名(如`/dev/ttyUSB0`)或I2C端口号(如`7`)
`--rate`: 数据打印频率(Hz)，默认10Hz
`--debug`: 启用调试模式，显示详细信息
# 保存退出，运行命令使规则生效
sudo udevadm trigger
sudo service udev reload
sudo service udev restart
# 验证
ll /dev/imu-serial
# 输出示例
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

[IMU_ROS2.zip]

如果还不会使用MobaXterm传输文件的朋友，请查看以下网页MobaXterm详细安装和操作方法：[文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

Die entpackten Dateien per MobaXterm auf RDK X5 ziehen.

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=Y2VkYmFlOTI1NGQxN2Y2OWYxZGUwNmM4MzZhOWI1Y2NfNjc0ZTgzNjUyZGYxYjJiNmY5ZDkxM2NmMmYzOTgyODZfSUQ6NzYwNTAzOTY3NjgwNTk5MTYxNV8xNzgwMDUyNjAwOjE3ODAxMzkwMDBfVjM)

## 4. IMU-Daten anzeigen

**In das Verzeichnis ~/IMU_Library wechseln und IMU_Serial_Library.py ausführen**

```PowerShell
cd ~/IMU_ROS2/IMU_Library
# 运行 IMU 数据打印文件
python3 -m IMU_Library.IMU_Serial_Library
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NzIzMjY1Mzc1MGRhNmRlNjY1YmI5MWQ0NjY3Y2M5YjBfMDE5NmIwOTNhNmJmZWRmMTgyOTE3Njk0ZGM1ZDNjNDNfSUQ6NzYwMjU4NDkwODk5MzAyMjk0MV8xNzgwMDUyNjAwOjE3ODAxMzkwMDBfVjM)

Hinweis: Oben werden die Daten eines 10-Achsen-IMU gelesen; 6-Achsen haben keine Magnetometer- und Barometerdaten, 9-Achsen keine Barometerdaten.

## **5. IMU-Kalibrierung**

**In das Verzeichnis ~/IMU_Library wechseln und imu_calibration_tool.py ausführen**

```PowerShell
cd ~/IMU_Library
# 运行 IMU 校准代码文件 --串口通讯校准
# 执行所有校准（整体、磁力计、温度）
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial
# 仅整体校准
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial --calibrate imu
# 仅磁力计校准
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial --calibrate mag
# 仅温度校准
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial --calibrate temp
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OGQ5ZDM1OGFhMWZlZDE1ZjFjMDNhYzE0OGRmYmQ2MDRfNDUxNTY4MDRhNTBkYjQxYmQ0MDA2ZjBlYmEwYTZlN2JfSUQ6NzYwMjU4NDkwOTY2ODM4Nzc4Ml8xNzgwMDUyNjAwOjE3ODAxMzkwMDBfVjM)

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
