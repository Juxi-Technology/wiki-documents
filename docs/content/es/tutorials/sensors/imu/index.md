---
title: Tutorial del sensor de actitud IMU de alta precisión
description: "1. Instalar las librerías Python necesarias"
---

# Tutorial del sensor de actitud IMU de alta precisión

### Descargue el paquete [IMU_ROS1.zip](https://juxitech.feishu.cn/wiki/BcWGwW2yDiXex9k6qjTcleTvnPb) o [IMU_ROS2.zip](https://juxitech.feishu.cn/wiki/ZL8XwrPriifnASk41AhcoPj1nnb), extráigalo y entre en ~/IMU_Library

1. **Instalar las librerías Python necesarias**

```PowerShell
pip install pyserial
pip install smbus2
```

2. **Instalar la librería IMU_Library**

```PowerShell
# Instalar las librerías Python necesarias
pip install -e .

# Instalar la biblioteca y sus dependencias
python setup.py install
```

3. **Configurar el mapeo de puertos**

```PowerShell
# Configurar el mapeo de puertos para evitar cambios tras la desconexión
sudo gedit /etc/udev/rules.d/99-serial-imu.rules

# Si no existe el comando gedit, instalarlo primero
sudo apt install gedit

# Rellenar el mapeo
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"

# Explicación de parámetros:
`--mode`: Modo de comunicación: `serial` (serie) o `i2c`
`--port`: Nombre del puerto serie (ej. `/dev/ttyUSB0`) o número de puerto I2C (ej. `7`)
`--rate`: Frecuencia de impresión (Hz), 10Hz por defecto
`--debug`: Activar modo debug para ver detalles

# Guardar y salir, ejecutar los comandos para activar las reglas
sudo udevadm trigger
sudo service udev reload
sudo service udev restart

# Verificar
ll /dev/imu-serial

# Ejemplo de salida:
lrwxrwxrwx 1 root root 7 1月 22 10:00 /dev/imu-serial -> ttyUSB0
```

### Comunicación serie

1. **Entrar en ~/IMU_Library y ejecutar IMU_Serial_Library.py**

```PowerShell
cd ~/imu_ros1/src/IMU_ROS1/IMU_Library/IMU_Library
# Ejecutar el archivo de salida de datos serie IMU
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# o
python3 IMU_Serial_Library.py
```

### Comunicación I2C

1. **Entrar en ~/IMU_Library y ejecutar IMU_I2C_Library.py**

```PowerShell
cd ~/IMU_Library/IMU_Library

# Ejecutar el archivo de salida de datos I2C IMU
python3 IMU_I2C_Library.py
```

### Calibración IMU

1. **Entrar en ~/IMU_Library y ejecutar imu_calibration_tool.py**

```PowerShell
cd ~/IMU_Library/IMU_Library

# Ejecutar el código de calibración IMU -- Comunicación serie
# Ejecutar todas las calibraciones (global, magnetómetro, temperatura)
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial

# Solo global
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate imu

# Solo magnetómetro
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate mag

# Solo temperatura
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate temp

# Calibración I2C
# Ejecutar el código de calibración IMU -- I2C
python3 imu_calibration_tool.py --mode i2c --port 1

# Solo global
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate imu

# Solo magnetómetro
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate mag

# Solo temperatura
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate temp
```


---

## Ejemplo del repositorio oficial

Juxi Technology proporciona el código open source completo para el módulo IMU: [GitHub](https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module)

### Ejemplos ROS1 / ROS2

El repositorio es compatible de forma nativa con ROS1 y ROS2, incluyendo herramientas de calibración y nodos de visualización:

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module

# ROS2
colcon build
source install/setup.bash
ros2 launch icm42670p imu_launch.py
```

### Herramienta de calibración Python

```bash
# 运行六面校准获取精确的加速度计和陀螺仪零偏
python calibration/calibrate.py --port /dev/ttyUSB0
```
