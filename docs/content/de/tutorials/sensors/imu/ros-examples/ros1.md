---
title: ROS1-Anwendung
description: "IMU-Attitüdensensor unter ROS1: Umgebung mit Ubuntu 20.04 konfigurieren, Bibliotheken installieren und das ROS1-Projekt bauen und ausführen."
---

# ROS1-Anwendung

> **[Im Shop kaufen](https://www.juxitech.com/de/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


**Systemkonfiguration: Ubuntu 20.04**

**ROS1-Version: noetic**

### ROS1-Umgebung konfigurieren

1. **ROS1-Installationsquelle einrichten**

```PowerShell
sudo sh -c '. /etc/lsb-release && echo "deb http://mirrors.tuna.tsinghua.edu.cn/ros/ubuntu/ `lsb_release -cs` main" > /etc/apt/sources.list.d/ros-latest.list'
```

2. **Key einrichten**

```PowerShell
sudo apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654
```

```Plain Text
sudo apt update
```

3. **ROS1 installieren (offizieller Download)**

```PowerShell
sudo apt install ros-noetic-desktop-full
```

ROS1 mit Proxy-Beschleunigung installieren
wget http://fishros.com/install -O fishros && . fishros

4. **Umgebungsvariablen konfigurieren**

```Plain Text
echo "source /opt/ros/noetic/setup.bash" >> ~/.bashrc
```

```PowerShell
source ~/.bashrc
```

### Gerät mit der VM verbinden

1. **Gerät prüfen**

```PowerShell
ll /dev/ttyUSB*
```

2. **Port-Zuordnung erstellen**

```PowerShell
sudo gedit /etc/udev/rules.d/99-serial-imu.rules
```

3. **Inhalt der Zuordnungsdatei eintragen**

```PowerShell
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"
```

4. **Speichern und beenden, Befehle zum Aktivieren der Regeln ausführen**

```PowerShell
sudo udevadm trigger
```

```Plain Text
sudo service udev reload
```

```Plain Text
sudo service udev restart
```

5. **Verifizieren**

```PowerShell
ll /dev/imu-serial
```

```Bash
sudo usermod -aG dialout ash
```

### Vorbereitetes Archiv importieren

1. **Im gleichen Verzeichnis wie die Feishu-Dateien**: [IMU_ROS1.zip](https://juxitech.feishu.cn/wiki/BcWGwW2yDiXex9k6qjTcleTvnPb)

2. **Entpacken und per Übertragungssoftware in die VM übertragen**

3. **IMU_Library-Bibliothek installieren**

```PowerShell
cd IMU_ROS1
# Nach dem Herunterladen und Entpacken des IMU_ROS1-Archivs in das Verzeichnis IMU_Library wechseln und folgenden Befehl ausführen
cd IMU_Library
# Bibliothek und ihre Abhängigkeiten installieren
pip install -e .
# Oder mit setup.py installieren
python setup.py install
```

### Python-Bibliotheken installieren

```PowerShell
sudo pip3 install pyserial
sudo pip3 install smbus2
```

**Falls Rendering-Probleme auftreten, folgenden Befehl ausführen**

```PowerShell
sudo apt-get install ros-noetic-imu-filter-madgwick
sudo apt-get install ros-noetic-rviz-imu-plugin
```

### ROS1-Projekt bauen

1. **Im /home-Verzeichnis neues Terminal öffnen, ros1-Workspace erstellen**

```PowerShell
mkdir imu_ros1
cd imu_ros1
mkdir src
cd src/
catkin_init_workspace
```

2. **Übertragenen IMU_ROS1-Ordner nach ~/imu_ros1/src/ kopieren**

```PowerShell
# Den Ordner IMU_ROS1 in das neu erstellte src-Verzeichnis kopieren
cp -r ~/IMU_ROS1 ~/imu_ros1/src
cd ~/imu_ros1
catkin_make
```

3. **Arbeitsverzeichnis ~/imu_ros1 in die Umgebungsvariablen eintragen**

```PowerShell
# ~/.bashrc bearbeiten
sudo gedit ~/.bashrc
# Die folgenden Befehle ans Ende schreiben
source ~/imu_ros1/devel/setup.bash
source ~/.bashrc
```

### ROS1-Node starten

1. **Terminal öffnen, roscore eingeben zum Starten des Nodes**

```PowerShell
# roscore starten
roscore
# Neues Terminal öffnen, Umgebung einrichten, Node starten
source ~/imu_ros1/devel/setup.bash
```

2. **Python-Skripten Ausführungsrechte geben (wichtig)**

In das `scripts`-Verzeichnis der Skripte wechseln und mit `chmod +x` Ausführungsrechte vergeben (`+x` = Ausführungsberechtigung hinzufügen):

```PowerShell
# In das Verzeichnis mit imu_driver.py wechseln (gemäß Ihrem tatsächlichen Pfad)
cd ~/imu_ros1/src/IMU_ROS1/scripts/
# Ausführungsrechte vergeben (nur einmal nötig, dauerhaft wirksam)
chmod +x imu_driver.py
chmod +x mag_visualizer.py
```

Zurück zum imu_ros1-Ordner und imu_driver.py ausführen
```Plain Text
cd ~/imu_ros1
```

```Plain Text
rosrun IMU_ROS1 imu_driver.py
```

### IMU-Daten ausgeben

1. **Neues Terminal öffnen, imu-Topic anzeigen**

```PowerShell
# Alle aktuell veröffentlichten Topics anzeigen
rostopic list
```

2. **Topic-Daten ausgeben**

```PowerShell
# IMU-Rohdaten ausgeben
rostopic echo /imu/data_raw
# Magnetometerdaten ausgeben
rostopic echo /imu/mag
```

### RViz-Visualisierung

1. **Befehl ausführen, um rviz zu starten**

```PowerShell
roslaunch IMU_ROS1 imu_display.launch
```

### Häufige Fragen

1. Falls der Node nicht startet, folgende Befehle versuchen

```PowerShell
# Im Verzeichnis ~/imu_ros1 ausführen
source devel/setup.bash
# Probleme mit der Portnummer
sudo chmod 666 /dev/imu-serial
```

2. Wenn die Achsen in RViz sehr klein dargestellt werden, Enable axes erneut aktivieren


![Abb. 1](../../../../../../public/images/tutorials/sensors/imu/ros-examples/ros1/1.png)