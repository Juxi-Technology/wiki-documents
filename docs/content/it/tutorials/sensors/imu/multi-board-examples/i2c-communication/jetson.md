---
title: Serie Jetson
description: "Questo tutorial usa la scheda madre Jetson Orin NX come esempio."
---

# Serie Jetson

## 1. Collegare il dispositivo

Questo tutorial usa la scheda madre Jetson Orin NX come esempio.

Collegare il sensore di assetto IMU all'interfaccia I2C della Jetson Orin NX come mostrato sotto.

![1. Collegare il dispositivo – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NGE4ODJlYmE0NTQ2ZmFkMjJjNzZiNzYxNTk4YmU1NThfZGM5ZDA4MDdiZmU3MGI0YTZhMDBkYWZjZTJhZjU4YzJfSUQ6NzYwMjU5MzY2NjkxMzM3MzE0OV8xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)

![1. Collegare il dispositivo – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MjI3ZGUyMjE4N2Q1ZjkwZTk5OTNmOWZjMjRjYzE4YWVfZTIxMjNjMjE5MmU4ZDIyMDE1YTM4YzZhNWM1OGVjODVfSUQ6NzYwMjU5MzYwODU4ODA4NjIzMV8xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)

## 2. Verificare lo stato del dispositivo

Installare prima I2Ctool, inserire nel terminale:

```PowerShell
sudo apt-get update
sudo apt-get install -y i2c-tools
```

Verificare i dispositivi I2C

\`\`\`PowerShell
sudo i2cdetect -y -r -a 7
\`\`\`

![2. Verificare lo stato del dispositivo – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NWFiNTRkMWNlYWYyYmVlMjQ0YTkxMGRmYzI5ZmI3MTVfOTRlMjA4MzMzM2RiNjFiOTlmODcxYWFiOTZiMDRjYjdfSUQ6NzYwMzIxMzAxMDYwOTgxODU4Ml8xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)

## 3. Installare le librerie del driver

3.1 **Installare le librerie Python necessarie al codice**

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

3.2 Trasferire i file

[IMU_ROS2.zip]

Se non hai ancora familiarità con l'uso di MobaXterm per trasferire file, consulta la seguente pagina per le istruzioni dettagliate di installazione e utilizzo di MobaXterm: [文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

Trascinare i file estratti su Jetson Orin NX con MobaXterm.

![3. Installare le librerie del driver – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=N2I1Njk5NDIyOWI0NmFlYWY1YzcxOTNmODc1NTA3ODRfM2MyNjQ2YjA4YWUwNGQwMzdjM2ZlZWUzZDRkN2M5ZTlfSUQ6NzYwMjU5MzM2MTQ4ODkzOTk4M18xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)

## 4. Visualizzare i dati IMU

**Entrare nella directory ~/IMU_Library ed eseguire IMU_Serial_Library.py**

```PowerShell
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# 运行 IMU 数据打印文件
python3 -m IMU_Library.IMU_I2C_Library
```

![4. Visualizzare i dati IMU – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NWMwZWNkYTdjMDE0ZGI1OGZiZjM3M2I1Mjk4ZmJmNzVfYzZlYjVjMTNiNWQ0MDZhNzFmZmVlNzUyNzE3ZWUzYjFfSUQ6NzYwMzIxMjQ3Mjc4MzQ3Mzg4OV8xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)

Nota: quanto sopra riguarda un IMU a 10 assi; i modelli a 6 assi non hanno magnetometro né barometro, quelli a 9 assi non hanno barometro.

## **5. Calibrazione IMU**

**Entrare nella directory ~/IMU_Library ed eseguire imu_calibration_tool.py**

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

![5. Calibrazione IMU – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OGUxOGUxYjRiMzBkYzIwYTQxM2FmYzgzZjlhMzZhMjZfYzZiZmQ2ZTEwZmE1YjAzMjBkYzY1MjFlMjc1NTZjNTJfSUQ6NzYwMzIxMjgwNzgyMzYyNTQ0Ml8xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)

## 6. Note

Con la Jetson Orin NX, il numero del bus I2C va adattato alla situazione – vedi figura sotto. Di solito bus 7

![6. Note – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTI2ZmQzNTJhMWM5NmQ2YmM5ODE5NDI1Yzk3MTYxMTBfNGQ2MDk5YmI2YjU1ZmQxMzk5NGJmMDc0MjFhZTRhODRfSUQ6NzYwMjU5Nzk4ODE3MDQ4NDk2NF8xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)

![6. Note – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTYyYWUwNDQyOTFkZGQzZDc5NmM4NmZiOWQ3OTc2MzNfNDNhNGQ5NGJiM2M0NmMwNWFlMDAyYmIxZGNkOTU0MzJfSUQ6NzYwMjU5ODAxMzU5MjMyNTM0M18xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)






