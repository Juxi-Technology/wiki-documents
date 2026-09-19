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
# After downloading and extracting the IMU_ROS1 archive, enter the IMU_Library directory and run the following commands
cd IMU_Library
# Install the library and its dependencies
pip install -e .
# Or install with setup.py
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
# Copy the IMU_ROS1 folder into the newly created src directory
cp -r ~/IMU_ROS1 ~/imu_ros1/src
cd ~/imu_ros1
catkin_make
```

3. **Add the workspace ~/imu_ros1 to the environment variables**

```PowerShell
# Edit ~/.bashrc
sudo gedit ~/.bashrc

# Write the following command at the end
source ~/imu_ros1/devel/setup.bash

source ~/.bashrc
```

### Start the ROS1 nodes

1. **Open a terminal and enter roscore to start the node**

```PowerShell
# Start roscore
roscore

# Open a new terminal, set up the environment, and start the node
source ~/imu_ros1/devel/setup.bash
```

2. **Grant executable permission to the Python scripts (important)**

Enter the `scripts` directory where the scripts reside, and run `chmod +x` to grant executable permission (`+x` = add execute):

```PowerShell
# Enter the directory containing imu_driver.py (use your actual path)
cd ~/imu_ros1/src/IMU_ROS1/scripts/

# Grant execute permission (only needs to be done once, takes effect permanently)
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
# List all currently published topics
rostopic list
```

2. **Print topic data**

```PowerShell
# Print IMU raw data
rostopic echo /imu/data_raw

# Print magnetometer data
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
# Run in the ~/imu_ros1 directory
source devel/setup.bash

# Port number issue
sudo chmod 666 /dev/imu-serial
```

2. If the three axes appear too small in RViz, re-check Enable axes

![FAQ – 1](../../../../../public/images/tutorials/sensors/imu/ros-examples/ros1/1.png)
