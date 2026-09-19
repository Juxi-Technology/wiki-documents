---
title: Tutorial de Uso do Sensor de Atitude IMU de Alta Precisão
description: "Sensor IMU de atitude de alta precisão da Juxi Technology: bibliotecas Python, comunicação serial e I2C, calibração e exemplos ROS1 e ROS2."
---

# Tutorial de Uso do Sensor de Atitude IMU de Alta Precisão

### Descarregue o pacote compactado [IMU_ROS1.zip](https://juxitech.feishu.cn/wiki/GNgWwGnYIiBd4Gk81yccEN6jnNf), descompacte-o e depois entre em ~/IMU_Library

1. **Instale as bibliotecas Python necessárias para o código**

```PowerShell
pip install pyserial
pip install smbus2
```

2. **Instale a IMU_Library**

```PowerShell
# Instalar a biblioteca e as suas dependências
pip install -e .

# Ou instalar com setup.py
python setup.py install
```

3. **Configure o Mapeamento de Portas**

```PowerShell
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

### Comunicação Serial

1. **Entre no diretório ~/IMU_Library/IMU_Library e execute o ficheiro IMU_Serial_Library.py**

```PowerShell
cd ~/imu_ros1/src/IMU_ROS1/IMU_Library/IMU_Library 
# ou
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library/IMU_Library

# Executar o ficheiro de impressão de dados do IMU
python3 IMU_Serial_Library.py
```

### Comunicação I2C

1. **Entre no diretório ~/IMU_Library/IMU_Library e execute o ficheiro IMU_I2C_Library.py**

```PowerShell
cd ~/IMU_Library/IMU_Library

# Executar o ficheiro de impressão de dados do IMU
python3 IMU_I2C_Library.py
```

### Calibração do IMU

1. **Entre no diretório ~/IMU_Library/IMU_Library e execute o ficheiro imu_calibration_tool.py**

```PowerShell
cd ~/IMU_Library/IMU_Library

# Executar o ficheiro de código de calibração do IMU --calibração de comunicação por porta série
# Executar todas as calibrações (completa, magnetómetro, temperatura)
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial

# Apenas calibração completa
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate imu

# Apenas calibração do magnetómetro
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate mag

# Apenas calibração de temperatura
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate temp

# Executar o ficheiro de código de calibração do IMU --calibração de comunicação I2C
# Executar todas as calibrações (completa, magnetómetro, temperatura)
python3 imu_calibration_tool.py --mode i2c --port 1

# Apenas calibração completa
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate imu

# Apenas calibração do magnetómetro
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate mag

# Apenas calibração de temperatura
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate temp
```

## Exemplo do repositório oficial

A Juxi Technology fornece código open source completo para o módulo IMU: [GitHub](https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module)

### Exemplos ROS1 / ROS2

O repositório suporta nativamente ROS1 e ROS2, incluindo ferramentas de calibração e nós de visualização:

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module

# ROS2
colcon build
source install/setup.bash
ros2 launch icm42670p imu_launch.py
```

### Ferramenta de calibração Python

```bash
# Executar a calibração de seis faces para obter um desvio de zero preciso do acelerómetro e do giroscópio
python calibration/calibrate.py --port /dev/ttyUSB0
```

- **Módulo de Navegação Inercial IMU**
  - [Informações do Produto](./product-info.md)
  - [Calibração IMU](./calibration.md)
  - [Transferência remota de ficheiros](./remote-file-transfer.md)
  - [Transferência de ficheiros via SSH](./ssh-file-transfer.md)
- **Exemplos Multi-Placa**
  - [Visão Geral dos Casos Multi-Host](./multi-board-examples/overview.md)
  - [Comunicação PC](./multi-board-examples/pc-communication.md)
- **Comunicação I2C**
  - [Arduino](./multi-board-examples/i2c-communication/arduino.md)
  - [Jetson](./multi-board-examples/i2c-communication/jetson.md)
  - [Raspberry Pi](./multi-board-examples/i2c-communication/raspberry-pi.md)
  - [RDK](./multi-board-examples/i2c-communication/rdk.md)
  - [STM32](./multi-board-examples/i2c-communication/stm32.md)
- **Comunicação Serial**
  - [Arduino](./multi-board-examples/serial-communication/arduino.md)
  - [Jetson](./multi-board-examples/serial-communication/jetson.md)
  - [Raspberry Pi](./multi-board-examples/serial-communication/raspberry-pi.md)
  - [RDK](./multi-board-examples/serial-communication/rdk.md)
  - [STM32](./multi-board-examples/serial-communication/stm32.md)
- **Exemplos ROS**
  - [Aplicação ROS1](./ros-examples/ros1.md)
  - [Aplicação ROS2](./ros-examples/ros2.md)
