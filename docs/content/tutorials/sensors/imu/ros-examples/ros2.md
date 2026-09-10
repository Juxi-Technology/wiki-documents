---
title: ROS2 Application
description: "System configuration: Ubuntu 22.04"
---

# ROS2 Application

> **[Buy in Store](https://www.juxitech.com/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


**System configuration: Ubuntu 22.04**

**ROS2 version: humble**

### ROS2 environment setup

1. **Update the download sources**

```PowerShell
sudo apt update
```

2. **Enter the ros2 installation command**

```PowerShell
wget http://fishros.com/install -O fishros && . fishros
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
sudo service udev reload
sudo service udev restart
```

5. **Verify**

```PowerShell
ll /dev/imu-serial
```

### Import the prepared archive

1. **Available in the same Feishu directory**: [IMU_ROS2.zip](https://juxitech.feishu.cn/wiki/ZL8XwrPriifnASk41AhcoPj1nnb)

2. **Transfer it to the VM with a file transfer tool**

3. **Install the IMU_Library library**

```PowerShell
# 下载解压IMU_ROS2压缩文件后，进入到IMU_Library目录下，运行setup.py
cd IMU_ROS2/IMU_Library

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

### Build the ROS2 project

1. **Return to the ~/IMU_ROS2 directory**

```PowerShell
cd IMU_ROS2
colcon build --symlink-install
```

1. **Add the workspace ~/IMU_ROS2 to the environment variables**

```PowerShell
# 编辑 ~/.bashrc
sudo gedit ~/.bashrc

# 把下面命令写到末尾
source ~/IMU_ROS2/install/setup.bash
```

After a successful build, run the following command to check whether the imu_ros2 package contains executables

`ros2 pkg executables imu_ros2`

### Start the ROS2 nodes

```PowerShell
source install/setup.bash
ros2 run imu_ros2 imu_publisher
```

### IMU data output

1. **Open a new terminal and list the imu topics**

```PowerShell
ros2 topic list
```

2. **Print the /imu/data topic data**

```PowerShell
ros2 topic echo /imu/data
```

3. **Open a new terminal and check the msg topic**

```PowerShell
ros2 topic echo /imu/mag
```

### RViz2 visualization

1. **Run the command to open the rviz interface**

```PowerShell
ros2 launch imu_ros2 imu_visualization.launch.py
```

### FAQ

1. If the node fails to start, try the following commands

```PowerShell
# 在~/IMU_ROS2目录下运行
source install/setup.bash

# 端口号问题
sudo chmod 666 /dev/imu-serial
```
