---
title: "Raspberry Pi"
description: "Este tutorial usa la placa madre Raspberry Pi 5 con la imagen oficial de 64 bits como ejemplo."
---

# Raspberry Pi

## 1. Conectar el dispositivo

Este tutorial usa la placa madre Raspberry Pi 5 con la imagen oficial de 64 bits como ejemplo.

Conectar el sensor de actitud IMU a la interfaz I2C de la Raspberry Pi 5 como se muestra a continuación.

![1. Conectar el dispositivo – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/1.jpg)

![1. Conectar el dispositivo – 2](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/2.png)

## 2. Comprobar el estado del dispositivo

Instalar primero I2Ctool, introducir en el terminal:

```PowerShell
sudo apt-get update
sudo apt-get install -y i2c-tools
```

Comprobar dispositivos I2C

\`\`\`PowerShell
sudo i2cdetect -y -r -a 1
\`\`\`

![2. Comprobar el estado del dispositivo – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/3.png)

## 3. Instalar bibliotecas de controladores

3.1 **Instalar las bibliotecas Python necesarias para el código**

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

3.2 Transferir archivos

IMU_ROS2.zip

Si aún no está familiarizado con el uso de MobaXterm para transferir archivos, consulte la siguiente página para obtener instrucciones detalladas de instalación y uso de MobaXterm: [文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

Arrastrar los archivos descomprimidos a Raspberry Pi 5 con MobaXterm.

![3. Instalar bibliotecas de controladores – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/4.png)

## 4. Ver los datos IMU

**Entrar en el directorio ~/IMU_Library y ejecutar IMU_Serial_Library.py**

```PowerShell
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# 运行 IMU 数据打印文件
python3 -m IMU_Library.IMU_I2C_Library
```

![4. Ver los datos IMU – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/5.png)

Nota: lo anterior son datos de un IMU de 10 ejes; los de 6 ejes no tienen magnetómetro ni barómetro, los de 9 ejes no tienen barómetro.

## **5. Calibración IMU**

**Entrar en el directorio ~/IMU_Library y ejecutar imu_calibration_tool.py**

```PowerShell
cd ~/IMU_Library

# 运行 IMU 校准代码文件 --I2C通讯校准
# 执行所有校准（整体、磁力计、温度）
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1

# 仅整体校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate imu

# 仅磁力计校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate mag

# 仅温度校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate temp
```

![5. Calibración IMU – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/6.png)

## 6. Notas

El Raspberry Pi 5 requiere activar previamente los pines I2C.<br>Procedimiento:<br>Ejecutar en el terminal

```PowerShell
sudo raspi-config
```

Seleccionar con las flechas y confirmar con Enter<br>Seleccionar I2C y confirmar con Enter<br>Tras seleccionar I2C, pulsar Enter, elegir Yes con las flechas y confirmar con Enter.<br>Confirmar con Enter<br>Elegir Finish con las flechas y salir con Enter.

![6. Notas – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/7.png)

![6. Notas – 2](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/8.png)

![6. Notas – 3](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/9.png)

![6. Notas – 4](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/10.png)

![6. Notas – 5](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/11.png)
