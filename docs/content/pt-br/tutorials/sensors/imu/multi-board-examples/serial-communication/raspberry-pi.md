---
title: "Raspberry Pi"
description: "Este tutorial usa a placa-mãe Raspberry Pi 5 e a imagem oficial de 64 bits como exemplo."
---

# Raspberry Pi

## 1. Conectar o dispositivo

Este tutorial usa a placa-mãe Raspberry Pi 5 e a imagem oficial de 64 bits como exemplo. 

Conecte o sensor de atitude IMU à porta USB do controlador principal por meio de um cabo Type-C. 

![1. Connect the device – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NjdhZGI0ZDhmNTgxYmQ3MTFlZjA4NjU4YzdhZmFjYzZfN2ZlMTg5ZWEyMGYxZmVlZGI0MmY0YzY3NTI2Mjg3ZDJfSUQ6NzYzODkzMDQ0NDk2MDQxODc0NF8xNzgwMzE4NDA3OjE3ODA0MDQ4MDdfVjM)

## 2. Verificar o status do dispositivo

Visualizar o ID do dispositivo

```PowerShell
lsusb
```

Visualizar o Número do Dispositivo

```PowerShell
ls -l /dev/ttyU*
```

![2. Check device status – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NGYxOGY5NTY4ZGYzNmRiMzZiZWFkYzcwN2EyODk3NGNfZmJlYWZiMGY5NWMwMmQ3MjI3Y2UzNjJlZDA4M2I4ZWNfSUQ6NzYzODkzMDQ0NTE3MDAxOTI2MF8xNzgwMzE4NDA3OjE3ODA0MDQ4MDdfVjM)

Configurar o Mapeamento de Portas

```Bash
# 防止插拔后端口变更，请设置端口映射
sudo gedit /etc/udev/rules.d/99-serial-imu.rules

# 如出现没有gedit命令相关内容，先下载安装
sudo apt install gedit

# 填写映射内容
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"

# 参数说明：
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

# 输出示例：
lrwxrwxrwx 1 root root 7 1月 22 10:00 /dev/imu-serial -> ttyUSB0
```

## 3. Instalar a biblioteca do driver

**3.1 Instalar as bibliotecas Python necessárias para o código**

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

**3.2 Transferir Arquivos**

[IMU_ROS2.zip]

Amigos que ainda não estão familiarizados com o uso do MobaXterm para transferir arquivos, consultem a página a seguir para obter instruções detalhadas de instalação e operação do MobaXterm:[文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

Arraste os arquivos descompactados para o Raspberry Pi 5 por meio do software MobaXterm. 

![3. Install the driver library – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MDA1ZDAwMTU5ZDIxMDE4YmI1NmE0YjQ0ZGVkNzdhYjlfZmE2NTdhNmM5YjYwMzk3OTkwNGJiZDIxODdmYmM5NTlfSUQ6NzYzODkzMDQ0MjY0MTczODcyOV8xNzgwMzE4NDA3OjE3ODA0MDQ4MDdfVjM)

## 4. Visualizar os dados do IMU

**Entre no diretório ~/IMU_Library e execute o arquivo IMU_Serial_Library.py**

```PowerShell
cd ~/IMU_ROS2/IMU_Library

# 运行 IMU 数据打印文件
python3 -m IMU_Library.IMU_Serial_Library
```

![4. View IMU data – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MGJjMGI3NzIwOGY4NDk3NjFhY2YyM2FjMmViZWU0ZDBfYjcwY2ZiMTgxODQ0MWNmZDMwOTg1ZWU5MmFiOTQwYmJfSUQ6NzYzODkzMDQ0NDE0NjkwNDAzMF8xNzgwMzE4NDA3OjE3ODA0MDQ4MDdfVjM)

Observação: O acima é a leitura de dados de um IMU de 10 eixos. O de 6 eixos não possui dados de magnetômetro e barômetro, e o de 9 eixos não possui dados de barômetro.

## **5. Calibração do IMU**

**Entre no diretório ~/IMU_Library e execute o arquivo imu_calibration_tool.py**

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

## 6. Precauções

Se o ID do dispositivo puder ser encontrado, mas o número do dispositivo não, você pode consultar o comando abaixo para instalar o driver ch34x 

```PowerShell
sudo apt remove brltty
git clone https://github.com/clhchan/CH341SER.git
cd CH341SER
make -j6
sudo make install
sudo modprobe ch34x
```



