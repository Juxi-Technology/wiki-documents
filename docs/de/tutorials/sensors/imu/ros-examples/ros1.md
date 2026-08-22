---
title: ROS1-Anwendung
description: "Systemkonfiguration: Ubuntu 20.04"
---

# ROS1-Anwendung

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
# 下载解压IMU_ROS1压缩文件后，进入到IMU_Library目录下，运行以下指令
cd IMU_Library
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
# 复制 IMU_ROS1 文件夹到新建的 src 目录下
cp -r ~/IMU_ROS1 ~/imu_ros1/src
cd ~/imu_ros1
catkin_make
```

3. **Arbeitsverzeichnis ~/imu_ros1 in die Umgebungsvariablen eintragen**

```PowerShell
# 编辑 ~/.bashrc
sudo gedit ~/.bashrc
# 把下面命令写到末尾
source ~/imu_ros1/devel/setup.bash
source ~/.bashrc
```

### ROS1-Node starten

1. **Terminal öffnen, roscore eingeben zum Starten des Nodes**

```PowerShell
# 启动roscore
roscore
# 新开终端，设置环境，启动节点
source ~/imu_ros1/devel/setup.bash
```

2. **Python-Skripten Ausführungsrechte geben (wichtig)**

In das `scripts`-Verzeichnis der Skripte wechseln und mit `chmod +x` Ausführungsrechte vergeben (`+x` = Ausführungsberechtigung hinzufügen):

```PowerShell
# 进入imu_driver.py所在目录（按你的实际路径）
cd ~/imu_ros1/src/IMU_ROS1/scripts/
# 赋予可执行权限（仅需执行1次，永久生效）
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
# 查看当前发布的所有话题
rostopic list
```

2. **Topic-Daten ausgeben**

```PowerShell
# 打印IMU原始数据
rostopic echo /imu/data_raw
# 打印磁力计数据
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
# 在~/imu_ros1目录下运行
source devel/setup.bash
# 端口号问题
sudo chmod 666 /dev/imu-serial
```

2. Wenn die Achsen in RViz sehr klein dargestellt werden, Enable axes erneut aktivieren
