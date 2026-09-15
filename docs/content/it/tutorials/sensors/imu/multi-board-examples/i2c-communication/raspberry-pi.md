---
title: "Raspberry Pi"
description: "Questo tutorial usa la scheda madre Raspberry Pi 5 con l'immagine ufficiale a 64 bit come esempio."
---

# Raspberry Pi

## 1. Collegare il dispositivo

Questo tutorial usa la scheda madre Raspberry Pi 5 con l'immagine ufficiale a 64 bit come esempio.

Collegare il sensore di assetto IMU all'interfaccia I2C della Raspberry Pi 5 come mostrato sotto.

![1. Collegare il dispositivo – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmVjNTEwNDY2MWRiNmUzNWNhYjVmMjhlYWVlZmY1ODhfOWExZWQxZGMwNmIxNzNlNmQzNjRmYWZmMDU0OTE1ODVfSUQ6NzYwMjU3ODcxMzEyOTA2MTMyOF8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

![1. Collegare il dispositivo – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MDYzMGZjYWU1ZGUzMzFjZjdhNzk1MGJhNThkY2ViODNfYzA3MTIyZjAxYjc0NTc4ZTM0NWViZGNkYjMyMmJiZTFfSUQ6NzYwMjU3NDczMjM2MjA5MTQ1MF8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

## 2. Verificare lo stato del dispositivo

Installare prima I2Ctool, inserire nel terminale:

```PowerShell
sudo apt-get update
sudo apt-get install -y i2c-tools
```

Verificare i dispositivi I2C

\`\`\`PowerShell
sudo i2cdetect -y -r -a 1
\`\`\`

![2. Verificare lo stato del dispositivo – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OWM3NzU5ODY2MDUwNTg3MjdlMTNiYjlhOWRiOTI1MDZfZGM4NDM5MzFiNTZlODgyMWE2ZjY3M2VjZGM3MmU0MzNfSUQ6NzYwMjU3OTYzMDY2MjUzNjM4OF8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

## 3. Installare le librerie del driver

3.1 **Installare le librerie Python necessarie al codice**

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

3.2 Trasferire i file

IMU_ROS2.zip

Se non hai ancora familiarità con l'uso di MobaXterm per trasferire file, consulta la seguente pagina per le istruzioni dettagliate di installazione e utilizzo di MobaXterm: [文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

Trascinare i file estratti su Raspberry Pi 5 con MobaXterm.

![3. Installare le librerie del driver – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MGE0OThjMWZiZGZkMmNkODY1MWQ1YTJjZTI1ZTBjYTlfMTVjYzhhOTdjZjAxODdmZjcxYjliMjgzYTkzOTg4YzBfSUQ6NzYwMjU4MjU5NjQ0Njg2NjY1N18xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

## 4. Visualizzare i dati IMU

**Entrare nella directory ~/IMU_Library ed eseguire IMU_Serial_Library.py**

```PowerShell
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# 运行 IMU 数据打印文件
python3 -m IMU_Library.IMU_I2C_Library
```

![4. Visualizzare i dati IMU – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTI5NzY2YzRiODVkYWExYjk3M2QyNWU2ZjRmMDkxODRfOTMxYTMxMTU4NzVlNjNmY2YxMTUwMzgxOTI0ZTc3ZTJfSUQ6NzYwMjU3NTcxMDk4NDczNTk0OV8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

Nota: quanto sopra riguarda un IMU a 10 assi; i modelli a 6 assi non hanno magnetometro né barometro, quelli a 9 assi non hanno barometro.

## **5. Calibrazione IMU**

**Entrare nella directory ~/IMU_Library ed eseguire imu_calibration_tool.py**

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

![5. Calibrazione IMU – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTBhMDJlMGQ0ZmZmYzRlYzVmOGNhZTQyYjExYmQxNDhfMjU5YjA0NGRkNGY0YTM1OGE3NzYxOTdlNjcxMGQ2NmRfSUQ6NzYwMjU3NDczMzQ5MDA0NzkzOV8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

## 6. Note

Il Raspberry Pi 5 richiede di attivare prima i pin I2C.<br>Procedura:<br>Eseguire nel terminale

```PowerShell
sudo raspi-config
```

Selezionare con le frecce, confermare con Invio<br>Selezionare I2C, confermare con Invio<br>Dopo la selezione di I2C, premere Invio, scegliere Yes con le frecce e confermare con Invio.<br>Confermare con Invio<br>Scegliere Finish con le frecce e uscire con Invio.

![6. Note – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NGFhOGFkMjU0M2ZhZTA3ZTgzN2RmNWNhMTFhYTdmNzBfN2VkMWQ4ZWNjZDY3OThkM2M4MDA5OWE4MTczNTQ0NTRfSUQ6NzYwMjU4MDA1MTM1MjA3OTU3OV8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

![6. Note – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzY0NWQ5NTdkNjExNDk4ZTUwMDc2NTEzMDUwZTdiZTNfMTAwMzc2NzNlMTAzZmQ4OGE0YWJiM2YxZjg0ZDc3NDVfSUQ6NzYwMjU4MDIyMjIwMjEyMTQwNF8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

![6. Note – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NDUzZjI5OWU2MmQ2OGZjNDBkMmFmMjE3OWUwYmRmMTBfMWY1ZmUwYjdjOTAwZTBiYzg5NTBjNWM5ZTNkOWI0OTdfSUQ6NzYwMjU4MDMxMTA4Mzk0NTE3NF8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

![6. Note – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTRjMDQxNWViMzJiZDVhYzVkMDBkYWZjODg0NTI3NTA3MWExODE2ZjRlOTVlZWM0NDdmZGQ0Yzc4Y2Y1MWJlNmRfSUQ6NzYwMjU4MDM5OTc2MzY4ODM4MF8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

![6. Note – 5](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTBjZDE2YTYxNGU3OTJlNzA0OWQwMjY0ODY2MTBiZGZfY2Q0ZmU0OTdmYTQyYjliODExMzI2YmM3NTdkMWY5YWRfSUQ6NzYwMjU4MDQ5NjAyNzUzNjU4Nl8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)
