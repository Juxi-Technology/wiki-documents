---
title: Applicazione ROS1
description: "Applicazione ROS1 del modulo IMU su Ubuntu 20.04: installare ROS Noetic, costruire il progetto e avviare il nodo del driver per stampare i dati di assetto."
---

# Applicazione ROS1

> **[Acquista nel negozio](https://www.juxitech.com/it/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


**Configurazione di sistema: ubuntu20.04**

**Versione ROS1: noetic**

### Configurazione dell'ambiente ROS1

1. **Configurare la sorgente di installazione di ROS1**

```PowerShell
sudo sh -c '. /etc/lsb-release && echo "deb http://mirrors.tuna.tsinghua.edu.cn/ros/ubuntu/ `lsb_release -cs` main" > /etc/apt/sources.list.d/ros-latest.list'
```

2. **Configurare la chiave**

```PowerShell
sudo apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654
```

```Plain Text
sudo apt update
```

3. **Installare ROS1 (download ufficiale)**

```PowerShell
sudo apt install ros-noetic-desktop-full
```

Installare ROS1 con download accelerato via proxy
wget http://fishros.com/install -O fishros && . fishros

4. **Configurare le variabili di ambiente**

```Plain Text
echo "source /opt/ros/noetic/setup.bash" >> ~/.bashrc
```

```PowerShell
source ~/.bashrc
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

```Bash
sudo usermod -aG dialout ash
```

### Importare l'archivio preparato

1. **Nella stessa directory di Feishu**: [IMU_ROS1.zip](https://juxitech.feishu.cn/wiki/BcWGwW2yDiXex9k6qjTcleTvnPb)

2. **Estrarre e trasferire nella macchina virtuale con il software di trasferimento**

3. **Installare la libreria IMU_Library**

```PowerShell
cd IMU_ROS1
# Dopo aver scaricato ed estratto il file compresso IMU_ROS1, entra nella directory IMU_Library ed esegui i comandi seguenti
cd IMU_Library
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

**Se si verificano problemi di rendering, eseguire il comando seguente**

```PowerShell
sudo apt-get install ros-noetic-imu-filter-madgwick
sudo apt-get install ros-noetic-rviz-imu-plugin
```

### Costruire il progetto ROS1

1. **Aprire un nuovo terminale in /home, creare il workspace ros1**

```PowerShell
mkdir imu_ros1
cd imu_ros1
mkdir src
cd src/
catkin_init_workspace
```

2. **Copiare la cartella IMU_ROS1 trasferita in ~/imu_ros1/src/**

```PowerShell
# Copia la cartella IMU_ROS1 nella nuova directory src
cp -r ~/IMU_ROS1 ~/imu_ros1/src
cd ~/imu_ros1
catkin_make
```

3. **Aggiungere la directory di lavoro ~/imu_ros1 alle variabili di ambiente**

```PowerShell
# Modifica ~/.bashrc
sudo gedit ~/.bashrc
# Aggiungi i comandi seguenti alla fine
source ~/imu_ros1/devel/setup.bash
source ~/.bashrc
```

### Avviare il nodo ROS1

1. **Aprire un terminale, digitare roscore per avviare il nodo**

```PowerShell
# Avvia roscore
roscore
# Apri un nuovo terminale, configura l'ambiente e avvia il nodo
source ~/imu_ros1/devel/setup.bash
```

2. **Dare i permessi di esecuzione agli script Python (importante)**

Entrare nella directory `scripts` degli script ed eseguire `chmod +x` per dare i permessi di esecuzione (`+x` = aggiungi esecuzione):

```PowerShell
# Entra nella directory di imu_driver.py (in base al tuo percorso effettivo)
cd ~/imu_ros1/src/IMU_ROS1/scripts/
# Assegna il permesso di esecuzione (basta eseguirlo una volta, effetto permanente)
chmod +x imu_driver.py
chmod +x mag_visualizer.py
```

Tornare alla cartella imu_ros1 ed eseguire imu_driver.py
```Plain Text
cd ~/imu_ros1
```

```Plain Text
rosrun IMU_ROS1 imu_driver.py
```

### Stampare i dati IMU

1. **Aprire un nuovo terminale, vedere i topic imu**

```PowerShell
# Visualizza tutti i topic attualmente pubblicati
rostopic list
```

2. **Stampare i dati dei topic**

```PowerShell
# Stampa i dati IMU grezzi
rostopic echo /imu/data_raw
# Stampa i dati del magnetometro
rostopic echo /imu/mag
```

### Visualizzazione RViz

1. **Eseguire il comando per avviare rviz**

```PowerShell
roslaunch IMU_ROS1 imu_display.launch
```

### Domande frequenti

1. Se l'avvio del nodo fallisce, provare questi comandi

```PowerShell
# Esegui nella directory ~/imu_ros1
source devel/setup.bash
# Problema del numero di porta
sudo chmod 666 /dev/imu-serial
```

2. Se gli assi in RViz sono visualizzati molto piccoli, riselezionare Enable axes


![Immagine 1](../../../../../../public/images/tutorials/sensors/imu/ros-examples/ros1/1.png)