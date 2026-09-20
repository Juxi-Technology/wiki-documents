---
title: "RDK"
description: "IMU attitude sensor I2C example on the RDK X5: wire the sensor to the I2C pins, verify the device detection, and run the Python library to print data."
---

# RDK

## Step 1 Connect devices

This tutorial takes the mirroring of the? version of the RDK X5 motherboard as an example. 

Connect the IMU attitude sensor to the I2C interface of the RDK X5 as shown below.

![Step 1 Connect devices – 1](../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/1.jpg)

![Step 1 Connect devices – 2](../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/2.jpg)

## 2. Check device status

View I2C Devices 

```PowerShell
python3 /app/40pin_samples/test_i2c.py
```

First install I2Ctool, enter in the terminal:

```PowerShell
sudo apt-get update
sudo apt-get install -y i2c-tools
```

Check the I2C device

```PowerShell
sudo i2cdetect -y -r -a 0
```

![2. Check device status – 1](../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/3.png)

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

![3. Install the driver library – 1](../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/4.png)

## 4. View IMU data

**Enter the ~/IMU_Library directory and run the IMU_Serial_Library.py file **

```PowerShell
cd ~/imu_ros1/src/IMU_ROS1/IMU_Library
# or
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# Run the IMU data printing file
python3 -m IMU_Library.IMU_I2C_Library
```

![4. View IMU data – 1](../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/5.png)

Attention: The above is the data reading of 10-axis IMU, 6-axis without magnetometer and barometer data, 9-axis without barometer data.

## **5. IMU Calibration**

**Enter the ~/IMU_Library directory and run the imu_calibration_tool.py file **

```PowerShell
cd ~/IMU_Library

# Run the IMU calibration code file -- I2C communication calibration
# Run all calibrations (full, magnetometer, temperature)
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0

# Full calibration only
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate imu

# Magnetometer only
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate mag

# Temperature only
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate temp
```

![5. IMU Calibration – 1](../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/6.png)

## 6. Precautions

When using the RDK X5 main board, it is necessary to modify the serial number of the I2C bus according to the actual situation. The modification position is shown in the figure below. Usually, it is bus number 0.

![6. Precautions – 1](../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/7.png)

![6. Precautions – 2](../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/8.png)



