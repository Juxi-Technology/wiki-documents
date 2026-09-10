---
title: Serie RDK
description: "Questo tutorial usa la scheda madre RDK X5 come esempio."
---

# Serie RDK

## 1. Collegare il dispositivo

Questo tutorial usa la scheda madre RDK X5 come esempio.

Collegare il sensore di assetto IMU all'interfaccia I2C della RDK X5 come mostrato sotto.

![1. Collegare il dispositivo – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OWFkNTFjYzkwN2VlOTNhMTYzZTk4OGE0Y2I0MWQwYTJfNWViZWVlZWE1NGIwYjIxNjljOWE3MDQ2OWYzNGYzNjlfSUQ6NzYwMjU5NDE1ODEyNTI3MjI2OV8xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)

![1. Collegare il dispositivo – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjhhOTgyYjQxNmJhZjVlYjk5M2Y4ODE3OGVkYWM2MmFfMmFjZDM5N2U3Y2IxODQzMDFmNDBiZDNmYTQwZWQyNmJfSUQ6NzYwMjU5ODYyMDIzNTkxMDMyMl8xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)

## 2. Verificare lo stato del dispositivo

Installare prima I2Ctool, inserire nel terminale:

```PowerShell
sudo apt-get update
sudo apt-get install -y i2c-tools
```

Verificare i dispositivi I2C

\`\`\`PowerShell
sudo i2cdetect -y -r -a 0
\`\`\`

![2. Verificare lo stato del dispositivo – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTMyZTdiNDQ5OGMxNjhlMzA3YzA0MTRkMmY0ZWUwNjNfNjA2Y2FmZTU1NjdjNWYyNzI0ZGRhOWFjZjg3OGExMzdfSUQ6NzYwNTAzOTAxMDYwOTgxODU4M18xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)

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

Trascinare i file estratti su RDK X5 con MobaXterm.

![3. Installare le librerie del driver – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjcyMTE3MTJiMWUzMjhhZTlkYTgyNDVkMGJmZDIyZTFfZWI4Mzc5MjUyZDk3Yjg3ODgzMTAwZDY2YjdiZTAzYWVfSUQ6NzYwMjU5MzgxMDE3MDAyMjg2NF8xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)

## 4. Visualizzare i dati IMU

**Entrare nella directory ~/IMU_Library ed eseguire IMU_Serial_Library.py**

```PowerShell
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# 运行 IMU 数据打印文件
python3 -m IMU_Library.IMU_I2C_Library
```

![4. Visualizzare i dati IMU – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NjNjN2YzOTMyNWUyM2RjOGYyNDRiNjg3MDA2NzlhN2ZfNWI4NGYzM2NmYWExYjRlZjQ3YTY1Y2I2NDMxYmU5YTNfSUQ6NzYwMjU5MzgwOTY2NjkxOTM2Nl8xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)

Nota: quanto sopra riguarda un IMU a 10 assi; i modelli a 6 assi non hanno magnetometro né barometro, quelli a 9 assi non hanno barometro.

## **5. Calibrazione IMU**

**Entrare nella directory ~/IMU_Library ed eseguire imu_calibration_tool.py**

```PowerShell
cd ~/IMU_Library

# 运行 IMU 校准代码文件 --I2C通讯校准
# 执行所有校准（整体、磁力计、温度）
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0

# 仅整体校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate imu

# 仅磁力计校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate mag

# 仅温度校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate temp
```

![5. Calibrazione IMU – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZWM5YTZmOTIyZDBmZjk4OTkzNWEwYjI2ZjgxMDE4MGNfNGVkYzlkZjU5YmNhNmE3N2YwZGJiNDcwMzFlN2U0YWJfSUQ6NzYwMjU5MzgwODE2NTUwNjAwOV8xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)

## 6. Note

Con la RDK X5, il numero del bus I2C va adattato alla situazione – vedi figura sotto. Di solito bus 0

![6. Note – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjhmNGIzMGZiOGI1ZTM3MjA1MGQ5ZDc4NWYwYjcxMjVfNTZkMjFjOGY1OTQwMzU3ODhlY2M2MTg1ZGJiZGVhZWJfSUQ6NzYwMjU5NTU1MjI1NzM5NTY0NF8xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)

![6. Note – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NmFmMzJjYWQ2MmZlNTBmOGE0NDM0NzZmZWQxZDNkN2ZfODUzNmYzMTE4OTFhMGRjNTgyODFmYTdjMGM4ZjEzY2RfSUQ6NzYwMjU5NTY5NTc1ODU2MDIxMl8xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)






