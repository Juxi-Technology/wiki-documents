---
title: ROS1 Application
description: "IMU ROS1 application tutorial: set up ROS Noetic on Ubuntu 20.04 and connect the high-precision IMU attitude sensor to publish orientation data."
---

# ROS1 Application

> **[Buy in Store](https://www.juxitech.com/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


**System configuration: Ubuntu 20.04**

**ROS1 version: noetic**

### ROS1 environment setup

1. **Set up the ROS1 installation source**

```PowerShell
sudo sh -c '. /etc/lsb-release && echo "deb http://mirrors.tuna.tsinghua.edu.cn/ros/ubuntu/ `lsb_release -cs` main" > /etc/apt/sources.list.d/ros-latest.list'
```

2. **Set up the Key**

```PowerShell
sudo apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654
```

```Plain Text
sudo apt update
```

3. **Install ROS1 (official download)**

```PowerShell
sudo apt install ros-noetic-desktop-full
```

Install ROS1 with proxy acceleration
wget http://fishros.com/install -O fishros && . fishros

4. **Configure environment variables**

```Plain Text
echo "source /opt/ros/noetic/setup.bash" >> ~/.bashrc
```

```PowerShell
source ~/.bashrc
```

### Connect the device to the VM

1. **Check the device**

```PowerShell
ll /dev/ttyUSB*
```

2. **Create the port mapping**

```PowerShell
sudo gedit /etc/udev/rules.d/99-serial-imu.rules
```

3. **Fill in the mapping file contents**

```PowerShell
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"
```

4. **Save and exit, then run the commands to apply the rules**

```PowerShell
sudo udevadm trigger
```

```Plain Text
sudo service udev reload
```

```Plain Text
sudo service udev restart
```

5. **Verify**

```PowerShell
ll /dev/imu-serial
```

```Bash
sudo usermod -aG dialout ash
```

### Import the prepared archive

1. **Available in the same Feishu directory**: [IMU_ROS1.zip](https://juxitech.feishu.cn/wiki/BcWGwW2yDiXex9k6qjTcleTvnPb)

2. **After extraction, transfer it to the VM with a file transfer tool**

3. **Install the IMU_Library library**

```PowerShell
cd IMU_ROS1
# 下载解压IMU_ROS1压缩文件后，进入到IMU_Library目录下，运行以下指令
cd IMU_Library
# 安装库及其依赖
pip install -e .
# 或使用setup.py安装
python setup.py install
```

### Install Python libraries

```PowerShell
sudo pip3 install pyserial
sudo pip3 install smbus2
```

**If rendering issues occur, run the following commands**

```PowerShell
sudo apt-get install ros-noetic-imu-filter-madgwick
sudo apt-get install ros-noetic-rviz-imu-plugin
```

### Build the ROS1 project

1. **Open a new terminal in /home and create a ros1 workspace**

```PowerShell
mkdir imu_ros1
cd imu_ros1
mkdir src
cd src/
catkin_init_workspace
```

2. **Copy the transferred IMU_ROS1 folder into ~/imu_ros1/src/**

```PowerShell
# 复制 IMU_ROS1 文件夹到新建的 src 目录下
cp -r ~/IMU_ROS1 ~/imu_ros1/src
cd ~/imu_ros1
catkin_make
```

3. **Add the workspace ~/imu_ros1 to the environment variables**

```PowerShell
# 编辑 ~/.bashrc
sudo gedit ~/.bashrc

# 把下面命令写到末尾
source ~/imu_ros1/devel/setup.bash

source ~/.bashrc
```

### Start the ROS1 nodes

1. **Open a terminal and enter roscore to start the node**

```PowerShell
# 启动roscore
roscore

# 新开终端，设置环境，启动节点
source ~/imu_ros1/devel/setup.bash
```

2. **Grant executable permission to the Python scripts (important)**

Enter the `scripts` directory where the scripts reside, and run `chmod +x` to grant executable permission (`+x` = add execute):

```PowerShell
# 进入imu_driver.py所在目录（按你的实际路径）
cd ~/imu_ros1/src/IMU_ROS1/scripts/

# 赋予可执行权限（仅需执行1次，永久生效）
chmod +x imu_driver.py
chmod +x mag_visualizer.py
```

Return to the imu_ros1 folder and run imu_driver.py

```Plain Text
cd ~/imu_ros1
```

```Plain Text
rosrun IMU_ROS1 imu_driver.py
```

### IMU data output

1. **Open a new terminal and list the imu topics**

```PowerShell
# 查看当前发布的所有话题
rostopic list
```

2. **Print topic data**

```PowerShell
# 打印IMU原始数据
rostopic echo /imu/data_raw

# 打印磁力计数据
rostopic echo /imu/mag
```

### RViz visualization

1. **Run the command to start rviz**

```PowerShell
roslaunch IMU_ROS1 imu_display.launch
```

### FAQ

1. If the node fails to start, try the following commands

```PowerShell
# 在~/imu_ros1目录下运行
source devel/setup.bash

# 端口号问题
sudo chmod 666 /dev/imu-serial
```

2. If the three axes appear too small in RViz, re-check Enable axes

![FAQ – 1](../../../../../public/images/tutorials/sensors/imu/ros-examples/ros1/1.png)
