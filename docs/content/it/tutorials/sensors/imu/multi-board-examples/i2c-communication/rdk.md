---
title: "RDK"
description: "Sensore di assetto IMU e RDK X5 via I2C: collegamento all'interfaccia I2C della scheda, verifica del dispositivo e lettura dei dati di assetto."
---

# RDK

## 1. Collegare il dispositivo

Questo tutorial usa la scheda madre RDK X5 come esempio.

Collegare il sensore di assetto IMU all'interfaccia I2C della RDK X5 come mostrato sotto.

![1. Collegare il dispositivo – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/1.jpg)

![1. Collegare il dispositivo – 2](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/2.jpg)

## 2. Verificare lo stato del dispositivo

Verificare i dispositivi I2C

```PowerShell
python3 /app/40pin_samples/test_i2c.py
```

![2. Verificare lo stato del dispositivo – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/3.png)

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

Trascinare i file estratti su RDK X5 con MobaXterm.

![3. Installare le librerie del driver – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/4.png)

## 4. Visualizzare i dati IMU

**Entrare nella directory ~/IMU_Library ed eseguire IMU_Serial_Library.py**

```PowerShell
cd ~/imu_ros1/src/IMU_ROS1/IMU_Library
# Oppure
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# Esegui il file di stampa dei dati IMU
python3 -m IMU_Library.IMU_I2C_Library
```

![4. Visualizzare i dati IMU – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/5.png)

Nota: quanto sopra riguarda un IMU a 10 assi; i modelli a 6 assi non hanno magnetometro né barometro, quelli a 9 assi non hanno barometro.

## **5. Calibrazione IMU**

**Entrare nella directory ~/IMU_Library ed eseguire imu_calibration_tool.py**

```PowerShell
cd ~/IMU_Library

# Esegui il file di calibrazione IMU -- calibrazione via I2C
# Esegui tutte le calibrazioni (completa, magnetometro, temperatura)
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0

# Solo calibrazione completa
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate imu

# Solo calibrazione del magnetometro
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate mag

# Solo calibrazione della temperatura
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate temp
```

![5. Calibrazione IMU – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/6.png)

## 6. Note

Con la RDK X5, il numero del bus I2C va adattato alla situazione – vedi figura sotto. Di solito bus 0

![6. Note – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/7.png)

![6. Note – 2](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/8.png)






