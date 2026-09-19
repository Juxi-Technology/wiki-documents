---
title: "RDK"
description: "Sensore di assetto IMU e RDK X5 via porta seriale: collegamento USB, mappatura della porta e lettura dei dati di assetto."
---

# RDK

## 1. Collegare il dispositivo

Questo tutorial usa la scheda madre RDK X5 come esempio.

Collegare il sensore di assetto IMU all'USB dell'host tramite cavo Type-C.

![1. Collegare il dispositivo – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk/1.jpg)

## 2. Verificare lo stato del dispositivo

Verificare l'ID del dispositivo

```PowerShell
lsusb
```

Verificare il numero di dispositivo

```PowerShell
ls -l /dev/ttyU*
```

Configurare il mapping delle porte

```Bash
# Per evitare che la porta cambi dopo il collegamento/scollegamento, configura il mapping delle porte
sudo gedit /etc/udev/rules.d/99-serial-imu.rules
# Se compare un messaggio che indica l'assenza del comando gedit, installalo prima
sudo apt install gedit
# Inserisci il contenuto del mapping
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"
# Descrizione dei parametri
`--mode`: 通信模式，可选值为`serial`(串口)或`i2c`
`--port`: 串口名(如`/dev/ttyUSB0`)或I2C端口号(如`7`)
`--rate`: 数据打印频率(Hz)，默认10Hz
`--debug`: 启用调试模式，显示详细信息
# Salva ed esci, esegui i comandi per rendere effettive le regole
sudo udevadm trigger
sudo service udev reload
sudo service udev restart
# Verifica
ll /dev/imu-serial
# Esempio di output
lrwxrwxrwx 1 root root 7 1月 22 10:00 /dev/imu-serial -> ttyUSB0
```

## 3. Installare le librerie del driver

3.1 **Installare le librerie Python necessarie al codice**

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

3.2 **Trasferire i file**

IMU_ROS2.zip

Se non hai ancora familiarità con l'uso di MobaXterm per trasferire file, consulta la seguente pagina per le istruzioni dettagliate di installazione e utilizzo di MobaXterm: [文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

Trascinare i file estratti su RDK X5 con MobaXterm.

![3. Installare le librerie del driver – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk/2.png)

## 4. Visualizzare i dati IMU

**Entrare nella directory ~/IMU_Library ed eseguire IMU_Serial_Library.py**

```PowerShell
cd ~/IMU_ROS2/IMU_Library
# Esegui il file di stampa dei dati IMU
python3 -m IMU_Library.IMU_Serial_Library
```

![4. Visualizzare i dati IMU – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk/3.png)

Nota: quanto sopra riguarda un IMU a 10 assi; i modelli a 6 assi non hanno magnetometro né barometro, quelli a 9 assi non hanno barometro.

## **5. Calibrazione IMU**

**Entrare nella directory ~/IMU_Library ed eseguire imu_calibration_tool.py**

```PowerShell
cd ~/IMU_Library
# Esegui il file di calibrazione IMU -- calibrazione via porta seriale
# Esegui tutte le calibrazioni (completa, magnetometro, temperatura)
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial
# Solo calibrazione completa
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial --calibrate imu
# Solo calibrazione del magnetometro
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial --calibrate mag
# Solo calibrazione della temperatura
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial --calibrate temp
```

![5. Calibrazione IMU – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk/4.png)

## 6. Note

Se l'ID del dispositivo è visibile ma il numero di dispositivo non si trova, installare il driver ch34x con i comandi seguenti

```PowerShell
sudo apt remove brltty
git clone https://github.com/clhchan/CH341SER.git
cd CH341SER
make -j6
sudo make install
sudo modprobe ch34x
```
