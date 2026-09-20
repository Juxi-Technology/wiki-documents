---
title: "RDK"
description: "Módulo IMU en RDK X5 por I2C: conexión del sensor de actitud, comprobación del bus I2C e instalación de las bibliotecas de controladores."
---

# RDK

## 1. Conectar el dispositivo

Este tutorial usa la placa madre RDK X5 como ejemplo.

Conectar el sensor de actitud IMU a la interfaz I2C de la RDK X5 como se muestra a continuación.

![1. Conectar el dispositivo – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/1.jpg)

![1. Conectar el dispositivo – 2](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/2.jpg)

## 2. Comprobar el estado del dispositivo

Comprobar dispositivos I2C

```PowerShell
python3 /app/40pin_samples/test_i2c.py
```

En primer lugar, instale I2Ctool; introduzca en el terminal:

```PowerShell
sudo apt-get update
sudo apt-get install -y i2c-tools
```

Consultar el dispositivo I2C

```PowerShell
sudo i2cdetect -y -r -a 0
```

![2. Comprobar el estado del dispositivo – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/3.png)

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

Arrastrar los archivos descomprimidos a RDK X5 con MobaXterm.

![3. Instalar bibliotecas de controladores – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/4.png)

## 4. Ver los datos IMU

**Entrar en el directorio ~/IMU_Library y ejecutar IMU_Serial_Library.py**

```PowerShell
cd ~/imu_ros1/src/IMU_ROS1/IMU_Library
# O
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# Ejecutar el archivo de salida de datos IMU
python3 -m IMU_Library.IMU_I2C_Library
```

![4. Ver los datos IMU – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/5.png)

Nota: lo anterior son datos de un IMU de 10 ejes; los de 6 ejes no tienen magnetómetro ni barómetro, los de 9 ejes no tienen barómetro.

## **5. Calibración IMU**

**Entrar en el directorio ~/IMU_Library y ejecutar imu_calibration_tool.py**

```PowerShell
cd ~/IMU_Library

# Ejecutar el código de calibración IMU -- comunicación I2C
# Ejecutar todas las calibraciones (completa, magnetómetro, temperatura)
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0

# Solo calibración completa
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate imu

# Solo magnetómetro
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate mag

# Solo temperatura
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate temp
```

![5. Calibración IMU – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/6.png)

## 6. Notas

Con la RDK X5, el número del bus I2C debe ajustarse según la situación – ver figura abajo. Normalmente bus 0

![6. Notas – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/7.png)

![6. Notas – 2](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/8.png)






