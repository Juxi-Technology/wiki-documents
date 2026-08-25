---
title: ROS2-Anwendung
description: "Systemkonfiguration: Ubuntu 22.04"
---

# ROS2-Anwendung

**Systemkonfiguration: Ubuntu 22.04**

**ROS2-Version: humble**

### ROS2-Umgebung konfigurieren

1. **Download-Quellen aktualisieren**

```PowerShell
sudo apt update
```

2. **ROS2-Download-Befehl eingeben**

```PowerShell
wget http://fishros.com/install -O fishros && . fishros
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

### Vorbereitetes Archiv importieren

1. **Im gleichen Verzeichnis wie die Feishu-Dateien**: [IMU_ROS2.zip](https://juxitech.feishu.cn/wiki/ZL8XwrPriifnASk41AhcoPj1nnb)

2. **Per Übertragungssoftware in die VM übertragen**

3. **IMU_Library-Bibliothek installieren**

```PowerShell
# 下载解压IMU_ROS2压缩文件后，进入到IMU_Library目录下，运行setup.py
cd IMU_ROS2/IMU_Library
# 安装库及其依赖
pip install -e .
# 或使用setup.py安装
python setup.py install
```

### Python-Bibliotheken installieren

```PowerShell
sudo pip3 install pyserial
sudo pip3 install smbus2
```

### ROS2-Projekt bauen

1. **Zurück zum ~/IMU_ROS2-Verzeichnis**

```PowerShell
cd IMU_ROS2
colcon build --symlink-install
```

1. **Arbeitsverzeichnis ~/IMU_ROS2 in die Umgebungsvariablen eintragen**

```PowerShell
# 编辑 ~/.bashrc
sudo gedit ~/.bashrc
# 把下面命令写到末尾
source ~/IMU_ROS2/install/setup.bash
```

Nach erfolgreicher Kompilierung mit folgendem Befehl prüfen, ob das Funktionspaket imu_ros2 ausführbare Dateien enthält
`ros2 pkg executables imu_ros2`

### ROS2-Node starten

```PowerShell
source install/setup.bash
ros2 run imu_ros2 imu_publisher
```

### IMU-Daten ausgeben

1. **Neues Terminal öffnen, imu-Topic anzeigen**

```PowerShell
ros2 topic list
```

2. **Daten des Topics /imu/data ausgeben**

```PowerShell
ros2 topic echo /imu/data
```

3. **Neues Terminal öffnen, msg-Topic anzeigen**

```PowerShell
ros2 topic echo /imu/mag
```

### RViz2-Visualisierung

1. **Befehl ausführen, um die rviz-Oberfläche zu öffnen**

```PowerShell
ros2 launch imu_ros2 imu_visualization.launch.py
```

### Häufige Fragen

1. Falls der Node nicht startet, folgende Befehle versuchen

```PowerShell
# 在~/IMU_ROS2目录下运行
source install/setup.bash
# 端口号问题
sudo chmod 666 /dev/imu-serial
```
