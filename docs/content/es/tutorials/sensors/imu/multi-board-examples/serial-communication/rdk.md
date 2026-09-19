---
title: "RDK"
description: "Módulo IMU en RDK X5 por puerto serie: conexión del sensor por USB Type-C, comprobación del dispositivo y mapeo del puerto."
---

# RDK

## 1. Conectar el dispositivo

Este tutorial usa la placa madre RDK X5 como ejemplo.

Conectar el sensor de actitud IMU al USB del host mediante un cable Type-C.

![1. Conectar el dispositivo – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk/1.jpg)

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
# Configurar el mapeo de puertos para evitar cambios tras la desconexión
sudo gedit /etc/udev/rules.d/99-serial-imu.rules
# Si aparece un aviso de que no existe el comando gedit, descargarlo e instalarlo primero
sudo apt install gedit
# Rellenar el contenido del mapeo
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"
# Explicación de parámetros
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
# Ejemplo de salida
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

Arrastrar los archivos descomprimidos a RDK X5 con MobaXterm.

![3. Instalar bibliotecas de controladores – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk/2.png)

## 4. Ver los datos IMU

**Entrar en el directorio ~/IMU_Library y ejecutar IMU_Serial_Library.py**

```PowerShell
cd ~/IMU_ROS2/IMU_Library
# Ejecutar el archivo de salida de datos IMU
python3 -m IMU_Library.IMU_Serial_Library
```

![4. Ver los datos IMU – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk/3.png)

Nota: lo anterior son datos de un IMU de 10 ejes; los de 6 ejes no tienen magnetómetro ni barómetro, los de 9 ejes no tienen barómetro.

## **5. Calibración IMU**

**Entrar en el directorio ~/IMU_Library y ejecutar imu_calibration_tool.py**

```PowerShell
cd ~/IMU_Library
# Ejecutar el código de calibración IMU -- comunicación serie
# Ejecutar todas las calibraciones (completa, magnetómetro, temperatura)
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial
# Solo calibración completa
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial --calibrate imu
# Solo magnetómetro
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial --calibrate mag
# Solo temperatura
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial --calibrate temp
```

![5. Calibración IMU – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk/4.png)

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
