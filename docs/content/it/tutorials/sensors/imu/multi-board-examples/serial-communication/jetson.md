---
title: "Jetson"
description: "Sensore di assetto IMU e Jetson Orin NX via porta seriale: collegamento USB Type-C, mappatura della porta e lettura dei dati di assetto."
---

# Jetson

## 1. Collegare il dispositivo

Questo tutorial usa la scheda madre Jetson Orin NX come esempio.

Collegare il sensore di assetto IMU all'USB dell'host tramite cavo Type-C.

![1. Collegare il dispositivo – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MzcwZGQ0YWY0YzFhNTRjY2Y3NDRlMGNiNGRkOGFlZTBfMmZkZTFmMTQ4NzVmMTUyODdkYjFkY2U2ZTNmYzNlYmZfSUQ6NzYwMjU4ODM2NTcxNTc3MDMzM18xNzgwMDUyNTg0OjE3ODAxMzg5ODRfVjM)

## 2. Verificare lo stato del dispositivo

Verificare l'ID del dispositivo

```PowerShell
lsusb
```

Verificare il numero di dispositivo

```PowerShell
ls -l /dev/ttyU*
```

Configurare il mapping delle porte

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

## 3. Installare le librerie del driver

3.1 **Installare le librerie Python necessarie al codice**

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

3.2 **Trasferire i file**

IMU_ROS2.zip

Se non hai ancora familiarità con l'uso di MobaXterm per trasferire file, consulta la seguente pagina per le istruzioni dettagliate di installazione e utilizzo di MobaXterm: [文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

Trascinare i file estratti su Jetson Orin NX con MobaXterm.

![3. Installare le librerie del driver – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YWE2MDE0NjZkNGUxOTQ2NjU1ZmJkOWQ5MGY0Y2JlZDFfNTJhNjcyYWYwMTY2ZjVjMGM5ZjZhZmM4YTFhYTgwMzJfSUQ6NzYwMzE5OTkxNjEzOTc3NzIyMV8xNzgwMDUyNTg0OjE3ODAxMzg5ODRfVjM)

## 4. Visualizzare i dati IMU

**Entrare nella directory ~/IMU_Library ed eseguire IMU_Serial_Library.py**

```PowerShell
cd ~/IMU_ROS2/IMU_Library
# 运行 IMU 数据打印文件
python3 -m IMU_Library.IMU_Serial_Library
```

![4. Visualizzare i dati IMU – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YWIyMjM0NDcxOGVhN2VhNTFiNzcyNzliN2ZhYTMzZDVfZGRiNzcyZjdkNzkxZjk3ODZjMDNlNDI4MTc4ZTY4NTVfSUQ6NzYwMjU4NDYwNjQzNjY0MTczM18xNzgwMDUyNTg0OjE3ODAxMzg5ODRfVjM)

Nota: quanto sopra riguarda un IMU a 10 assi; i modelli a 6 assi non hanno magnetometro né barometro, quelli a 9 assi non hanno barometro.

## **5. Calibrazione IMU**

**Entrare nella directory ~/IMU_Library ed eseguire imu_calibration_tool.py**

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

![5. Calibrazione IMU – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ODU4NTBhMzJmMzhmYjFkMTllZGFjY2M4NjAyNTQ4YWFfMjExNDhmZTRlNmVkZmQzZDY0YTFhM2ZhYjhiNmExYWNfSUQ6NzYwMzIwNzAyMDAxMTIyODM2Nl8xNzgwMDUyNTg0OjE3ODAxMzg5ODRfVjM)

## 6. Note

Se l'ID del dispositivo è visibile ma il numero di dispositivo non si trova, installare il driver ch34x con i comandi seguenti

```PowerShell
sudo apt remove brltty
git clone https://github.com/clhchan/CH341SER.git
cd CH341SER
make -j6
sudo make install
sudo modprobe ch34x
```
