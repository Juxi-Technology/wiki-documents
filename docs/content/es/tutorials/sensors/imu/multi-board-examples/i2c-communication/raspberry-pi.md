---
title: Raspberry Pi 5
description: "Este tutorial usa la placa madre Raspberry Pi 5 con la imagen oficial de 64 bits como ejemplo."
---

# Raspberry Pi 5

## 1. Conectar el dispositivo

Este tutorial usa la placa madre Raspberry Pi 5 con la imagen oficial de 64 bits como ejemplo.

Conectar el sensor de actitud IMU a la interfaz I2C de la Raspberry Pi 5 como se muestra a continuación.

![1. Conectar el dispositivo – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmVjNTEwNDY2MWRiNmUzNWNhYjVmMjhlYWVlZmY1ODhfOWExZWQxZGMwNmIxNzNlNmQzNjRmYWZmMDU0OTE1ODVfSUQ6NzYwMjU3ODcxMzEyOTA2MTMyOF8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

![1. Conectar el dispositivo – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MDYzMGZjYWU1ZGUzMzFjZjdhNzk1MGJhNThkY2ViODNfYzA3MTIyZjAxYjc0NTc4ZTM0NWViZGNkYjMyMmJiZTFfSUQ6NzYwMjU3NDczMjM2MjA5MTQ1MF8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

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

![2. Comprobar el estado del dispositivo – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OWM3NzU5ODY2MDUwNTg3MjdlMTNiYjlhOWRiOTI1MDZfZGM4NDM5MzFiNTZlODgyMWE2ZjY3M2VjZGM3MmU0MzNfSUQ6NzYwMjU3OTYzMDY2MjUzNjM4OF8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

## 3. Instalar bibliotecas de controladores

3.1 **Instalar las bibliotecas Python necesarias para el código**

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

3.2 Transferir archivos

[IMU_ROS2.zip]

Si aún no está familiarizado con el uso de MobaXterm para transferir archivos, consulte la siguiente página para obtener instrucciones detalladas de instalación y uso de MobaXterm: [文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

Arrastrar los archivos descomprimidos a Raspberry Pi 5 con MobaXterm.

![3. Instalar bibliotecas de controladores – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MGE0OThjMWZiZGZkMmNkODY1MWQ1YTJjZTI1ZTBjYTlfMTVjYzhhOTdjZjAxODdmZjcxYjliMjgzYTkzOTg4YzBfSUQ6NzYwMjU4MjU5NjQ0Njg2NjY1N18xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

## 4. Ver los datos IMU

**Entrar en el directorio ~/IMU_Library y ejecutar IMU_Serial_Library.py**

```PowerShell
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# 运行 IMU 数据打印文件
python3 -m IMU_Library.IMU_I2C_Library
```

![4. Ver los datos IMU – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTI5NzY2YzRiODVkYWExYjk3M2QyNWU2ZjRmMDkxODRfOTMxYTMxMTU4NzVlNjNmY2YxMTUwMzgxOTI0ZTc3ZTJfSUQ6NzYwMjU3NTcxMDk4NDczNTk0OV8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

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

![5. Calibración IMU – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTBhMDJlMGQ0ZmZmYzRlYzVmOGNhZTQyYjExYmQxNDhfMjU5YjA0NGRkNGY0YTM1OGE3NzYxOTdlNjcxMGQ2NmRfSUQ6NzYwMjU3NDczMzQ5MDA0NzkzOV8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

## 6. Notas

El Raspberry Pi 5 requiere activar previamente los pines I2C.<br>Procedimiento:<br>Ejecutar en el terminal

```PowerShell
sudo raspi-config
```

Seleccionar con las flechas y confirmar con Enter<br>Seleccionar I2C y confirmar con Enter<br>Tras seleccionar I2C, pulsar Enter, elegir Yes con las flechas y confirmar con Enter.<br>Confirmar con Enter<br>Elegir Finish con las flechas y salir con Enter.

![6. Notas – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NGFhOGFkMjU0M2ZhZTA3ZTgzN2RmNWNhMTFhYTdmNzBfN2VkMWQ4ZWNjZDY3OThkM2M4MDA5OWE4MTczNTQ0NTRfSUQ6NzYwMjU4MDA1MTM1MjA3OTU3OV8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

![6. Notas – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzY0NWQ5NTdkNjExNDk4ZTUwMDc2NTEzMDUwZTdiZTNfMTAwMzc2NzNlMTAzZmQ4OGE0YWJiM2YxZjg0ZDc3NDVfSUQ6NzYwMjU4MDIyMjIwMjEyMTQwNF8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

![6. Notas – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NDUzZjI5OWU2MmQ2OGZjNDBkMmFmMjE3OWUwYmRmMTBfMWY1ZmUwYjdjOTAwZTBiYzg5NTBjNWM5ZTNkOWI0OTdfSUQ6NzYwMjU4MDMxMTA4Mzk0NTE3NF8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

![6. Notas – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTRjMDQxNWViMzJiZDVhYzVkMDBkYWZjODg0NTI3NTA3MWExODE2ZjRlOTVlZWM0NDdmZGQ0Yzc4Y2Y1MWJlNmRfSUQ6NzYwMjU4MDM5OTc2MzY4ODM4MF8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

![6. Notas – 5](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTBjZDE2YTYxNGU3OTJlNzA0OWQwMjY0ODY2MTBiZGZfY2Q0ZmU0OTdmYTQyYjliODExMzI2YmM3NTdkMWY5YWRfSUQ6NzYwMjU4MDQ5NjAyNzUzNjU4Nl8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)
