---
title: High-precision IMU Attitude Sensor Usage Tutorial
description: "High-precision IMU attitude sensor tutorial: install the Python library, set up a udev port mapping, and read attitude data over serial or I2C."
---

# High-precision IMU Attitude Sensor Usage Tutorial

### Download the Compressed Packet[IMU_ROS1.zip](https://juxitech.feishu.cn/wiki/GNgWwGnYIiBd4Gk81yccEN6jnNf), unzip it, and then enter ~/IMU_Library

1. **Install the required Python libraries for the code **

```PowerShell
pip install pyserial
pip install smbus2
```

2. **Install the IMU_Library **

```PowerShell
# Install the library and its dependencies
pip install -e .

# Or install with setup.py
python setup.py install
```

3. **Set Port Mapping**

```PowerShell
# To prevent the port from changing after unplugging, set up port mapping
sudo gedit /etc/udev/rules.d/99-serial-imu.rules

# If the message that the gedit command is not found appears, install it first
sudo apt install gedit

# Fill in the mapping content
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"

# Parameter description:
`--mode`: 通信模式，可选值为`serial`(串口)或`i2c`
`--port`: 串口名(如`/dev/ttyUSB0`)或I2C端口号(如`7`)
`--rate`: 数据打印频率(Hz)，默认10Hz
`--debug`: 启用调试模式，显示详细信息

# Save and exit, then run the command to apply the rules
sudo udevadm trigger
sudo service udev reload
sudo service udev restart

# Verify
ll /dev/imu-serial

# Output example:
lrwxrwxrwx 1 root root 7 1月 22 10:00 /dev/imu-serial -> ttyUSB0
```

### Serial Communication

1. **Enter the ~/IMU_Library/IMU_Library directory and run the IMU_Serial_Library.py file **

```PowerShell
cd ~/imu_ros1/src/IMU_ROS1/IMU_Library/IMU_Library 
# or
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library/IMU_Library

# Run the IMU data printing file
python3 IMU_Serial_Library.py
```

### I2C Communication

1. **Enter the ~/IMU_Library/IMU_Library directory and run the IMU_I2C_Library.py file **

```PowerShell
cd ~/IMU_Library/IMU_Library

# Run the IMU data printing file
python3 IMU_I2C_Library.py
```

### IMU Calibration

1. **Enter the ~/IMU_Library/IMU_Library directory and run the imu_calibration_tool.py file **

```PowerShell
cd ~/IMU_Library/IMU_Library

# Run the IMU calibration code file -- serial communication calibration
# Run all calibrations (full, magnetometer, temperature)
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial

# Full calibration only
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate imu

# Magnetometer only
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate mag

# Temperature only
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate temp

# Run the IMU calibration code file -- I2C communication calibration
# Run all calibrations (full, magnetometer, temperature)
python3 imu_calibration_tool.py --mode i2c --port 1

# Full calibration only
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate imu

# Magnetometer only
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate mag

# Temperature only
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate temp
```

## Official Repository Example

Juxi Technology provides complete open-source code for the IMU module: [GitHub](https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module)

### ROS1 / ROS2 Examples

The repository natively supports ROS1 and ROS2, including calibration tools and visualization nodes:

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module

# ROS2
colcon build
source install/setup.bash
ros2 launch icm42670p imu_launch.py
```

### Python Calibration Tool

```bash
# Run six-face calibration to obtain accurate accelerometer and gyroscope bias
python calibration/calibrate.py --port /dev/ttyUSB0
```

- **IMU Inertial Module**
  - [Product Info](./product-info.md)
  - [IMU Calibration](./calibration.md)
  - [Remote File Transfer](./remote-file-transfer.md)
  - [SSH File Transfer](./ssh-file-transfer.md)
- **Multi-Board Examples**
  - [Overview](./multi-board-examples/overview.md)
  - [PC Communication](./multi-board-examples/pc-communication.md)
- **I2C Communication**
  - [Arduino](./multi-board-examples/i2c-communication/arduino.md)
  - [Jetson](./multi-board-examples/i2c-communication/jetson.md)
  - [Raspberry Pi](./multi-board-examples/i2c-communication/raspberry-pi.md)
  - [RDK](./multi-board-examples/i2c-communication/rdk.md)
  - [STM32](./multi-board-examples/i2c-communication/stm32.md)
- **Serial Communication**
  - [Arduino](./multi-board-examples/serial-communication/arduino.md)
  - [Jetson](./multi-board-examples/serial-communication/jetson.md)
  - [Raspberry Pi](./multi-board-examples/serial-communication/raspberry-pi.md)
  - [RDK](./multi-board-examples/serial-communication/rdk.md)
  - [STM32](./multi-board-examples/serial-communication/stm32.md)
- **ROS Examples**
  - [ROS1 Application](./ros-examples/ros1.md)
  - [ROS2 Application](./ros-examples/ros2.md)
