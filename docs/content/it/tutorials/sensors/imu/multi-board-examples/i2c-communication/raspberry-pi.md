---
title: "Raspberry Pi"
description: "Questo tutorial usa la scheda madre Raspberry Pi 5 con l'immagine ufficiale a 64 bit come esempio."
---

# Raspberry Pi

## 1. Collegare il dispositivo

Questo tutorial usa la scheda madre Raspberry Pi 5 con l'immagine ufficiale a 64 bit come esempio.

Collegare il sensore di assetto IMU all'interfaccia I2C della Raspberry Pi 5 come mostrato sotto.

![1. Collegare il dispositivo – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/1.jpg)

![1. Collegare il dispositivo – 2](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/2.png)

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

![2. Verificare lo stato del dispositivo – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/3.png)

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

![3. Installare le librerie del driver – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/4.png)

## 4. Visualizzare i dati IMU

**Entrare nella directory ~/IMU_Library ed eseguire IMU_Serial_Library.py**

```PowerShell
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# 运行 IMU 数据打印文件
python3 -m IMU_Library.IMU_I2C_Library
```

![4. Visualizzare i dati IMU – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/5.png)

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

![5. Calibrazione IMU – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/6.png)

## 6. Note

Il Raspberry Pi 5 richiede di attivare prima i pin I2C.<br>Procedura:<br>Eseguire nel terminale

```PowerShell
sudo raspi-config
```

Selezionare con le frecce, confermare con Invio<br>Selezionare I2C, confermare con Invio<br>Dopo la selezione di I2C, premere Invio, scegliere Yes con le frecce e confermare con Invio.<br>Confermare con Invio<br>Scegliere Finish con le frecce e uscire con Invio.

![6. Note – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/7.png)

![6. Note – 2](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/8.png)

![6. Note – 3](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/9.png)

![6. Note – 4](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/10.png)

![6. Note – 5](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/11.png)
