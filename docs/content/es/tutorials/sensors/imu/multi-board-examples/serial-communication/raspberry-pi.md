---
title: "Raspberry Pi"
description: "Este tutorial usa la placa madre Raspberry Pi 5 como ejemplo."
---

# Raspberry Pi

## 1. Conectar el dispositivo

Este tutorial usa la placa madre Raspberry Pi 5 como ejemplo.

Conectar el sensor de actitud IMU al USB del host mediante un cable Type-C.

![1. Conectar el dispositivo – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTAxMDU2NzljZjZjMTUyOGY4ZWY0NWE4ZjUyZGJmNGVfODg1Mzk5YzQzYTBkZjE4MjkwOGIwMjNiYWZkODk4MzZfSUQ6NzYwMjU4Mzc1NjcyMTExNDA0OV8xNzgwMDUyNTY3OjE3ODAxMzg5NjdfVjM)

## 2. Comprobar el estado del dispositivo

Comprobar el ID del dispositivo

```PowerShell
lsusb
```

Comprobar el número de dispositivo

```PowerShell
ls -l /dev/ttyU*
```

Configurar el mapeo de puertos

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

## 3. Instalar bibliotecas de controladores

3.1 **Instalar las bibliotecas Python necesarias para el código**

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

3.2 **Transferir archivos**

IMU_ROS2.zip

Si aún no está familiarizado con el uso de MobaXterm para transferir archivos, consulte la siguiente página para obtener instrucciones detalladas de instalación y uso de MobaXterm: [文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

Arrastrar los archivos descomprimidos a Raspberry Pi 5 con MobaXterm.

![3. Instalar bibliotecas de controladores – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NGNlZjZiYTMxNWUyZDE0NGY2NWE5MjVlMjkyMzE1NTVfZGY2YTdlZjQxNDgwZDYzMTIyMDAyNjZjYWZkN2FkYjJfSUQ6NzYwMjQ4NTg3OTQ0MTM0NTQ4NV8xNzgwMDUyNTY3OjE3ODAxMzg5NjdfVjM)

## 4. Ver los datos IMU

**Entrar en el directorio ~/IMU_Library y ejecutar IMU_Serial_Library.py**

```PowerShell
cd ~/IMU_ROS2/IMU_Library
# 运行 IMU 数据打印文件
python3 -m IMU_Library.IMU_Serial_Library
```

![4. Ver los datos IMU – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTFjNTdmZmM2MzY0MzQ4YmFkOWU3NGI4MGZlY2FiNDdfZGMwMTAwMzQ5YTI5MDJlYTY5NzQ5ZjBlYzE5MmZlNzlfSUQ6NzYwMjU4Mjg3Nzc5NjM4Nzc4Ml8xNzgwMDUyNTY3OjE3ODAxMzg5NjdfVjM)

Nota: lo anterior son datos de un IMU de 10 ejes; los de 6 ejes no tienen magnetómetro ni barómetro, los de 9 ejes no tienen barómetro.

## **5. Calibración IMU**

**Entrar en el directorio ~/IMU_Library y ejecutar imu_calibration_tool.py**

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

![5. Calibración IMU – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NGNmMDJmYzMzMjRmMDExMDY5ZmU3ODkzNDZhN2U5NzFfYWJkOTYxYWJlM2MxODEyOTE0NDY4ZjIxNzI4ODZmNmZfSUQ6NzYwMjU4NDA1NDU0MjAxMTYwNV8xNzgwMDUyNTY3OjE3ODAxMzg5NjdfVjM)

## 6. Notas

Si se ve el ID del dispositivo pero no se encuentra el número de dispositivo, instalar el controlador ch34x con los siguientes comandos

```PowerShell
sudo apt remove brltty
git clone https://github.com/clhchan/CH341SER.git
cd CH341SER
make -j6
sudo make install
sudo modprobe ch34x
```
