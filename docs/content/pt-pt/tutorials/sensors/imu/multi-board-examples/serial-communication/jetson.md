---
title: "Jetson"
description: "Sensor de atitude IMU no Jetson Orin NX por porta série Type-C: verificação do dispositivo, mapeamento da porta e instalação do driver."
---

# Jetson

## 1. Conectar o dispositivo

Este tutorial usa a placa-mãe Jetson Orin NX como exemplo. 

Conecte o sensor de atitude IMU à porta USB do controlador principal por meio de um cabo Type-C. 

![1. Connect the device – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/jetson/1.jpg)

## 2. Verificar o status do dispositivo

Visualizar o ID do dispositivo

```PowerShell
lsusb
```

Visualizar o Número do Dispositivo

```PowerShell
ls -l /dev/ttyU*
```

![2. Check device status – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/jetson/2.png)

Configurar o Mapeamento de Portas

```Bash
# Para evitar que a porta mude após ligar/desligar, configure o mapeamento de portas
sudo gedit /etc/udev/rules.d/99-serial-imu.rules

# Se aparecer uma mensagem a indicar que o comando gedit não existe, instale-o primeiro
sudo apt install gedit

# Preencher o conteúdo do mapeamento
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"

# Descrição dos parâmetros:
`--mode`: modo de comunicação, valores possíveis: `serial` (porta série) ou `i2c`
`--port`: nome da porta série (por exemplo, `/dev/ttyUSB0`) ou número da porta I2C (por exemplo, `7`)
`--rate`: frequência de impressão dos dados (Hz), 10Hz por predefinição
`--debug`: ativar o modo de depuração e mostrar informações detalhadas

# Guardar e sair, executar o comando para aplicar as regras
sudo udevadm trigger
sudo service udev reload
sudo service udev restart

# Verificação
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

**3.2 Transferir Ficheiros**

IMU_ROS2.zip

Amigos que ainda não estão familiarizados com o uso do MobaXterm para transferir ficheiros, consultem a página a seguir para obter instruções detalhadas de instalação e operação do MobaXterm:[文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

Arraste os ficheiros extraídos para o Jetson por meio do software MobaXterm. 

![3. Install the driver library – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/jetson/3.png)

## 4. Visualizar os dados do IMU

**Entre no diretório ~/IMU_Library e execute o ficheiro IMU_Serial_Library.py**

```PowerShell
cd ~/IMU_ROS2/IMU_Library

# Executar o ficheiro de impressão de dados do IMU
python3 -m IMU_Library.IMU_Serial_Library
```

![4. View IMU data – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/jetson/4.png)

Observação: O acima é a leitura de dados de um IMU de 10 eixos. O de 6 eixos não possui dados de magnetômetro e barômetro, e o de 9 eixos não possui dados de barômetro.

## **5. Calibração do IMU**

**Entre no diretório ~/IMU_Library e execute o ficheiro imu_calibration_tool.py**

```PowerShell
cd ~/IMU_Library

# Executar o ficheiro de código de calibração do IMU --calibração de comunicação por porta série
# Executar todas as calibrações (completa, magnetómetro, temperatura)
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial

# Apenas calibração completa
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial --calibrate imu

# Apenas calibração do magnetómetro
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial --calibrate mag

# Apenas calibração de temperatura
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial --calibrate temp
```

![5. IMU Calibration – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/jetson/5.png)

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



