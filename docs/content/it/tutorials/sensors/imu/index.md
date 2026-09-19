---
title: Tutorial sensore di assetto IMU ad alta precisione
description: "Tutorial del sensore di assetto IMU ad alta precisione: installare le librerie Python, configurare la porta seriale e leggere i dati di assetto."
---

# Tutorial sensore di assetto IMU ad alta precisione

### Scarica l'archivio [IMU_ROS1.zip](https://juxitech.feishu.cn/wiki/BcWGwW2yDiXex9k6qjTcleTvnPb) o [IMU_ROS2.zip](https://juxitech.feishu.cn/wiki/ZL8XwrPriifnASk41AhcoPj1nnb), decomprimilo e vai in ~/IMU_Library

1. **Installare le librerie Python necessarie**

```PowerShell
pip install pyserial
pip install smbus2
```

2. **Installare la libreria IMU_Library**

```PowerShell
# Installare le librerie Python necessarie
pip install -e .

# Installare la libreria e le sue dipendenze
python setup.py install
```

3. **Impostare la mappatura delle porte**

```PowerShell
# Impostare la mappatura delle porte per evitare cambiamenti dopo la disconnessione
sudo gedit /etc/udev/rules.d/99-serial-imu.rules

# Se gedit non è disponibile, installarlo prima
sudo apt install gedit

# Compilare la mappatura
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"

# Spiegazione dei parametri:
`--mode`: Modalità di comunicazione: `serial` (seriale) o `i2c`
`--port`: Nome della porta seriale (es. `/dev/ttyUSB0`) o numero di porta I2C (es. `7`)
`--rate`: Frequenza di stampa (Hz), 10Hz predefinito
`--debug`: Attivare la modalità debug per i dettagli

# Salvare ed uscire, eseguire i comandi per attivare le regole
sudo udevadm trigger
sudo service udev reload
sudo service udev restart

# Verificare
ll /dev/imu-serial

# Esempio di output:
lrwxrwxrwx 1 root root 7 1月 22 10:00 /dev/imu-serial -> ttyUSB0
```

### Comunicazione seriale

1. **Entrare in ~/IMU_Library ed eseguire IMU_Serial_Library.py**

```PowerShell
cd ~/imu_ros1/src/IMU_ROS1/IMU_Library/IMU_Library
# Eseguire il file di output dati seriali IMU
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# oppure
python3 IMU_Serial_Library.py
```

### Comunicazione I2C

1. **Entrare in ~/IMU_Library ed eseguire IMU_I2C_Library.py**

```PowerShell
cd ~/IMU_Library/IMU_Library

# Eseguire il file di output dati I2C IMU
python3 IMU_I2C_Library.py
```

### Calibrazione IMU

1. **Entrare in ~/IMU_Library ed eseguire imu_calibration_tool.py**

```PowerShell
cd ~/IMU_Library/IMU_Library

# Eseguire il codice di calibrazione IMU -- Comunicazione seriale
# Eseguire tutte le calibrazioni (globale, magnetometro, temperatura)
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial

# Solo globale
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate imu

# Solo magnetometro
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate mag

# Solo temperatura
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate temp

# Calibrazione I2C
# Eseguire il codice di calibrazione IMU -- I2C
python3 imu_calibration_tool.py --mode i2c --port 1

# Solo globale
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate imu

# Solo magnetometro
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate mag

# Solo temperatura
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate temp
```


---

## Esempio del repository ufficiale

Juxi Technology fornisce il codice open source completo per il modulo IMU: [GitHub](https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module)

### Esempi ROS1 / ROS2

Il repository supporta nativamente ROS1 e ROS2, inclusi strumenti di calibrazione e nodi di visualizzazione:

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module

# ROS2
colcon build
source install/setup.bash
ros2 launch icm42670p imu_launch.py
```

### Strumento di calibrazione Python

```bash
# 运行六面校准获取精确的加速度计和陀螺仪零偏
python calibration/calibrate.py --port /dev/ttyUSB0
```

- **Ultimo aggiornamento (UTC)**
  - [Calibrazione IMU](./calibration.md)
  - [Trasferimento remoto di file](./remote-file-transfer.md)
  - [Trasferimento di file tramite SSH](./ssh-file-transfer.md)
- **Navigazione inerziale IMU**
  - [Informazioni prodotto](./product-info.md)
- **Esempi multi-scheda**
  - [Panoramica dei casi multi-host](./multi-board-examples/overview.md)
  - [Comunicazione PC](./multi-board-examples/pc-communication.md)
- **Comunicazione I2C**
  - [Arduino](./multi-board-examples/i2c-communication/arduino.md)
  - [Jetson](./multi-board-examples/i2c-communication/jetson.md)
  - [Raspberry Pi](./multi-board-examples/i2c-communication/raspberry-pi.md)
  - [RDK](./multi-board-examples/i2c-communication/rdk.md)
  - [STM32](./multi-board-examples/i2c-communication/stm32.md)
- **Comunicazione seriale**
  - [Arduino](./multi-board-examples/serial-communication/arduino.md)
  - [Jetson](./multi-board-examples/serial-communication/jetson.md)
  - [Raspberry Pi](./multi-board-examples/serial-communication/raspberry-pi.md)
  - [RDK](./multi-board-examples/serial-communication/rdk.md)
  - [STM32](./multi-board-examples/serial-communication/stm32.md)
- **Esempi ROS**
  - [Applicazione ROS1](./ros-examples/ros1.md)
  - [Applicazione ROS2](./ros-examples/ros2.md)
