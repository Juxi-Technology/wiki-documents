---
title: "Raspberry Pi"
description: "IMU com Raspberry Pi 5 via I2C: no sistema oficial de 64 bits, conecte o sensor de atitude à interface e leia os dados."
---

# Raspberry Pi

## 1. Conectar o dispositivo

Este tutorial usa a placa-mãe Raspberry Pi 5 e a imagem oficial de 64 bits como exemplo. 

Conecte o sensor de atitude IMU à interface I2C do Raspberry Pi 5 conforme mostrado na figura abaixo. 

![1. Connect the device – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/1.jpg)

![1. Connect the device – 2](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/2.png)

## 2. Verificar o status do dispositivo

Primeiro, instale o I2Ctool e depois digite o seguinte no terminal: 

```PowerShell
sudo apt-get update
sudo apt-get install -y i2c-tools
```

Visualizar Dispositivos I2C 

```PowerShell
sudo i2cdetect -y -r -a 1
```

![2. Check device status – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/3.png)

## 3. Instalar a biblioteca do driver

3.1** Instalar as bibliotecas Python necessárias para o código**

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

3.2 Transferir Arquivos

IMU_ROS2.zip

Amigos que ainda não estão familiarizados com o uso do MobaXterm para transferir arquivos, consultem a página a seguir para obter instruções detalhadas de instalação e operação do MobaXterm:[文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

Arraste os arquivos descompactados para o Raspberry Pi 5 por meio do software MobaXterm. 

![3. Install the driver library – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/4.png)

## 4. Visualizar os dados do IMU

**Entre no diretório ~/IMU_Library e execute o arquivo IMU_Serial_Library.py**

```PowerShell
cd ~/imu_ros2/src/IMU_ROS1/IMU_Library

# Executar o arquivo de impressão de dados da IMU
python3 -m IMU_Library.IMU_I2C_Library
```

![4. View IMU data – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/5.png)

Observação: O acima é a leitura de dados de um IMU de 10 eixos. O de 6 eixos não possui dados de magnetômetro e barômetro, e o de 9 eixos não possui dados de barômetro.

## **5. Calibração do IMU**

**Entre no diretório ~/IMU_Library e execute o arquivo imu_calibration_tool.py**

```PowerShell
cd ~/IMU_Library

# Executar o arquivo de código de calibração da IMU --calibração por comunicação I2C
# Executar todas as calibrações (completa, magnetômetro, temperatura)
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1

# Somente calibração completa
python3-m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate imu

# Somente calibração do magnetômetro
python3-m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate mag

# Somente calibração de temperatura
python3-m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate temp
```

![5. IMU Calibration – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/6.png)

## 6. Precauções

O Raspberry Pi 5 precisa habilitar o pino i2c antecipadamente. 

O procedimento de habilitação é o seguinte: 

Executar o comando no terminal

```PowerShell
sudo raspi-config
```

Selecione usando as setas do teclado e pressione a tecla Enter para entrar após a seleção

![6. Precautions – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/7.png)

Selecione I2C e, após a seleção, pressione a tecla Enter para entrar.

![6. Precautions – 2](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/8.png)

Após selecionar I2C, pressione a tecla Enter no teclado, use as setas para selecionar Yes e pressione Enter para confirmar. 

![6. Precautions – 3](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/9.png)

Pressione Enter para confirmar

![6. Precautions – 4](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/10.png)

Pressione as setas para selecionar Finish e depois Enter para sair da configuração.

![6. Precautions – 5](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/11.png)



