---
title: "Jetson"
description: "IMU attitude sensor I2C example on the Jetson Orin NX: wire the sensor to the I2C bus, detect the device address, and read attitude data in Python."
---

# Jetson

## 1. Connect the device

This tutorial takes the Jetson Orin NX motherboard as an example. 

Connect the IMU attitude sensor to the I2C interface of Jetson Orin NX as shown in the figure below. 

![1. Connect the device – 1](../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson/1.jpg)

![1. Connect the device – 2](../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson/2.png)

## 2. Check device status

First, install I2Ctool, then enter the following in the terminal: 

```PowerShell
sudo apt-get update
sudo apt-get install -y i2c-tools
```

View I2C Devices 

```PowerShell
sudo i2cdetect -y -r -a 7
```

![2. Check device status – 1](../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson/3.png)

## 3. Install the driver library

3.1** Install the Python libraries required for the code **

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

3.2 Transfer Files

IMU_ROS2.zip

Friends who are not yet familiar with using MobaXterm to transfer files, please refer to the following webpage for detailed installation and operation methods of MobaXterm:[文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

Drag the decompressed files onto Raspberry Pi 5 via MobaXterm software. 

![3. Install the driver library – 1](../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson/4.png)

## 4. View IMU data

**Enter the ~/IMU_Library directory and run the IMU_Serial_Library.py file **

```PowerShell
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# Run the IMU data printing file
python3 -m IMU_Library.IMU_I2C_Library
```

![4. View IMU data – 1](../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson/5.png)

Note: The above is the data reading for a 10-axis IMU. The 6-axis has no Magnetometer and Barometer data, and the 9-axis has no Barometer data.

## **5. IMU Calibration**

**Enter the ~/IMU_Library directory and run the imu_calibration_tool.py file **

```PowerShell
cd ~/IMU_Library

# Run the IMU calibration code file -- I2C communication calibration
# Run all calibrations (full, magnetometer, temperature)
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 7

# Full calibration only
python3-m IMU_Library.imu_calibration_tool --mode i2c --port 7 --calibrate imu

# Magnetometer only
python3-m IMU_Library.imu_calibration_tool --mode i2c --port 7 --calibrate mag

# Temperature only
python3-m IMU_Library.imu_calibration_tool --mode i2c --port 7 --calibrate temp
```

![5. IMU Calibration – 1](../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson/6.png)

## 6. Precautions

When using the Orin series motherboard, you need to modify the bus number of the I2C according to the actual situation. The modification location is shown in the figure below. Usually, it is bus 7. 

![6. Precautions – 1](../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson/7.png)

![6. Precautions – 2](../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson/8.png)



