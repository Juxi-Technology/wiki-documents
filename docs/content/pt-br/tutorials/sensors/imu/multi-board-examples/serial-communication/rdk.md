---
title: "RDK"
description: "IMU com RDK X5 via porta serial: conexão USB do sensor, mapeamento de porta e leitura dos dados de atitude no RDK."
---

# RDK

## 1. Conectar o dispositivo

Este tutorial usa a imagem da versão ? da placa-mãe RDK X5 como exemplo. 

Conecte o sensor de atitude IMU à porta USB do controlador principal por meio de um cabo Type-C. 

![1. Connect the device – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk/1.jpg)

## 2. Verificar o status do dispositivo

Visualizar o ID do dispositivo

```PowerShell
lsusb
```

Visualizar o Número do Dispositivo

```PowerShell
ls -l /dev/ttyU*
```

![2. Check device status – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk/2.png)

Configurar o Mapeamento de Portas

```Bash
# Para evitar que a porta mude após reconectar, configure o mapeamento de porta
sudo gedit /etc/udev/rules.d/99-serial-imu.rules

# Se aparecer que o comando gedit não existe, baixe e instale primeiro
sudo apt install gedit

# Preencher o conteúdo do mapeamento
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"

# Descrição dos parâmetros:
`--mode`: 通信模式，可选值为`serial`(串口)或`i2c`
`--port`: 串口名(如`/dev/ttyUSB0`)或I2C端口号(如`7`)
`--rate`: 数据打印频率(Hz)，默认10Hz
`--debug`: 启用调试模式，显示详细信息

# Salvar e sair; executar os comandos para aplicar a regra
sudo udevadm trigger
sudo service udev reload
sudo service udev restart

# Verificar
ll /dev/imu-serial

# Exemplo de saída:
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

IMU_ROS2.zip

Amigos que ainda não estão familiarizados com o uso do MobaXterm para transferir arquivos, consultem a página a seguir para obter instruções detalhadas de instalação e operação do MobaXterm:[文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

Arraste os arquivos extraídos para o RDK X5 por meio do software MobaXterm.

![3. Install the driver library – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk/3.png)

## 4. Visualizar os dados do IMU

**Entre no diretório ~/IMU_Library e execute o arquivo IMU_Serial_Library.py**

```PowerShell
cd ~/IMU_ROS2/IMU_Library

# Executar o arquivo de impressão de dados da IMU
python3 -m IMU_Library.IMU_Serial_Library
```

![4. View IMU data – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk/4.png)

Observação: O acima é a leitura de dados de um IMU de 10 eixos. O de 6 eixos não possui dados de magnetômetro e barômetro, e o de 9 eixos não possui dados de barômetro.

## **5. Calibração do IMU**

**Entre no diretório ~/IMU_Library e execute o arquivo imu_calibration_tool.py**

```PowerShell
cd ~/IMU_Library

# Executar o arquivo de código de calibração da IMU --calibração por comunicação serial
# Executar todas as calibrações (completa, magnetômetro, temperatura)
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial

# Somente calibração completa
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial --calibrate imu

# Somente calibração do magnetômetro
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial --calibrate mag

# Somente calibração de temperatura
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



