---
title: Applicazione ROS2
description: "Applicazione ROS2 del modulo IMU su Ubuntu 22.04: installare ROS2, costruire il progetto e avviare il nodo del driver per leggere i dati di assetto."
---

# Applicazione ROS2

> **[Acquista nel negozio](https://www.juxitech.com/it/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


**Configurazione di sistema: ubuntu22.04**

**Versione ROS2: humble**

### Configurazione dell'ambiente ROS2

1. **Aggiornare le sorgenti di download**

```PowerShell
sudo apt update
```

2. **Inserire il comando di download di ros2**

```PowerShell
wget http://fishros.com/install -O fishros && . fishros
```

### Collegare il dispositivo alla macchina virtuale

1. **Verificare il dispositivo**

```PowerShell
ll /dev/ttyUSB*
```

2. **Creare il mapping delle porte**

```PowerShell
sudo gedit /etc/udev/rules.d/99-serial-imu.rules
```

3. **Compilare il contenuto del file di mapping**

```PowerShell
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"
```

4. **Salvare e uscire, eseguire i comandi per attivare le regole**

```PowerShell
sudo udevadm trigger
```

```Plain Text
sudo service udev reload
```

```Plain Text
sudo service udev restart
```

5. **Verificare**

```PowerShell
ll /dev/imu-serial
```

### Importare l'archivio preparato

1. **Nella stessa directory di Feishu**: [IMU_ROS2.zip](https://juxitech.feishu.cn/wiki/ZL8XwrPriifnASk41AhcoPj1nnb)

2. **Trasferire nella macchina virtuale con il software di trasferimento**

3. **Installare la libreria IMU_Library**

```PowerShell
# Dopo aver scaricato ed estratto il file compresso IMU_ROS2, entra nella directory IMU_Library ed esegui setup.py
cd IMU_ROS2/IMU_Library
# Installa la libreria e le sue dipendenze
pip install -e .
# Oppure installa con setup.py
python setup.py install
```

### Installare le librerie Python

```PowerShell
sudo pip3 install pyserial
sudo pip3 install smbus2
```

### Costruire il progetto ROS2

1. **Tornare alla directory ~/IMU_ROS2**

```PowerShell
cd IMU_ROS2
colcon build --symlink-install
```

1. **Aggiungere la directory di lavoro ~/IMU_ROS2 alle variabili di ambiente**

```PowerShell
# Modifica ~/.bashrc
sudo gedit ~/.bashrc
# Aggiungi i comandi seguenti alla fine
source ~/IMU_ROS2/install/setup.bash
```

Dopo la compilazione riuscita, verificare con il comando seguente se il pacchetto imu_ros2 contiene eseguibili
`ros2 pkg executables imu_ros2`

### Avviare il nodo ROS2

```PowerShell
source install/setup.bash
ros2 run imu_ros2 imu_publisher
```

### Stampare i dati IMU

1. **Aprire un nuovo terminale, vedere i topic imu**

```PowerShell
ros2 topic list
```

2. **Stampare i dati del topic /imu/data**

```PowerShell
ros2 topic echo /imu/data
```

3. **Aprire un nuovo terminale, vedere il topic msg**

```PowerShell
ros2 topic echo /imu/mag
```

### Visualizzazione RViz2

1. **Eseguire il comando per aprire l'interfaccia rviz**

```PowerShell
ros2 launch imu_ros2 imu_visualization.launch.py
```

### Domande frequenti

1. Se l'avvio del nodo fallisce, provare questi comandi

```PowerShell
# Esegui nella directory ~/IMU_ROS2
source install/setup.bash
# Problema del numero di porta
sudo chmod 666 /dev/imu-serial
```
