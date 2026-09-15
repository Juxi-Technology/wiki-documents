---
title: "Jetson"
description: "Módulo IMU en Jetson Orin NX por I2C: conexión del sensor de actitud, comprobación del bus I2C e instalación de las bibliotecas de controladores."
---

# Jetson

## 1. Conectar el dispositivo

Este tutorial usa la placa madre Jetson Orin NX como ejemplo.

Conectar el sensor de actitud IMU a la interfaz I2C de la Jetson Orin NX como se muestra a continuación.

![1. Conectar el dispositivo – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NGE4ODJlYmE0NTQ2ZmFkMjJjNzZiNzYxNTk4YmU1NThfZGM5ZDA4MDdiZmU3MGI0YTZhMDBkYWZjZTJhZjU4YzJfSUQ6NzYwMjU5MzY2NjkxMzM3MzE0OV8xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)

![1. Conectar el dispositivo – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MjI3ZGUyMjE4N2Q1ZjkwZTk5OTNmOWZjMjRjYzE4YWVfZTIxMjNjMjE5MmU4ZDIyMDE1YTM4YzZhNWM1OGVjODVfSUQ6NzYwMjU5MzYwODU4ODA4NjIzMV8xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)

## 2. Comprobar el estado del dispositivo

Instalar primero I2Ctool, introducir en el terminal:

```PowerShell
sudo apt-get update
sudo apt-get install -y i2c-tools
```

Comprobar dispositivos I2C

\`\`\`PowerShell
sudo i2cdetect -y -r -a 7
\`\`\`

![2. Comprobar el estado del dispositivo – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NWFiNTRkMWNlYWYyYmVlMjQ0YTkxMGRmYzI5ZmI3MTVfOTRlMjA4MzMzM2RiNjFiOTlmODcxYWFiOTZiMDRjYjdfSUQ6NzYwMzIxMzAxMDYwOTgxODU4Ml8xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)

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

Arrastrar los archivos descomprimidos a Jetson Orin NX con MobaXterm.

![3. Instalar bibliotecas de controladores – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=N2I1Njk5NDIyOWI0NmFlYWY1YzcxOTNmODc1NTA3ODRfM2MyNjQ2YjA4YWUwNGQwMzdjM2ZlZWUzZDRkN2M5ZTlfSUQ6NzYwMjU5MzM2MTQ4ODkzOTk4M18xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)

## 4. Ver los datos IMU

**Entrar en el directorio ~/IMU_Library y ejecutar IMU_Serial_Library.py**

```PowerShell
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# 运行 IMU 数据打印文件
python3 -m IMU_Library.IMU_I2C_Library
```

![4. Ver los datos IMU – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NWMwZWNkYTdjMDE0ZGI1OGZiZjM3M2I1Mjk4ZmJmNzVfYzZlYjVjMTNiNWQ0MDZhNzFmZmVlNzUyNzE3ZWUzYjFfSUQ6NzYwMzIxMjQ3Mjc4MzQ3Mzg4OV8xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)

Nota: lo anterior son datos de un IMU de 10 ejes; los de 6 ejes no tienen magnetómetro ni barómetro, los de 9 ejes no tienen barómetro.

## **5. Calibración IMU**

**Entrar en el directorio ~/IMU_Library y ejecutar imu_calibration_tool.py**

```PowerShell
cd ~/IMU_Library

# 运行 IMU 校准代码文件 --I2C通讯校准
# 执行所有校准（整体、磁力计、温度）
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 7

# 仅整体校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 7 --calibrate imu

# 仅磁力计校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 7 --calibrate mag

# 仅温度校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 7 --calibrate temp
```

![5. Calibración IMU – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OGUxOGUxYjRiMzBkYzIwYTQxM2FmYzgzZjlhMzZhMjZfYzZiZmQ2ZTEwZmE1YjAzMjBkYzY1MjFlMjc1NTZjNTJfSUQ6NzYwMzIxMjgwNzgyMzYyNTQ0Ml8xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)

## 6. Notas

Con la Jetson Orin NX, el número del bus I2C debe ajustarse según la situación – ver figura abajo. Normalmente bus 7

![6. Notas – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTI2ZmQzNTJhMWM5NmQ2YmM5ODE5NDI1Yzk3MTYxMTBfNGQ2MDk5YmI2YjU1ZmQxMzk5NGJmMDc0MjFhZTRhODRfSUQ6NzYwMjU5Nzk4ODE3MDQ4NDk2NF8xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)

![6. Notas – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTYyYWUwNDQyOTFkZGQzZDc5NmM4NmZiOWQ3OTc2MzNfNDNhNGQ5NGJiM2M0NmMwNWFlMDAyYmIxZGNkOTU0MzJfSUQ6NzYwMjU5ODAxMzU5MjMyNTM0M18xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)






