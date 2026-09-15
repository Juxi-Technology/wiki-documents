---
title: "Jetson"
description: "This tutorial takes the Jetson Orin NX motherboard as an example."
---

# Jetson

## 1. Connect the device

This tutorial takes the Jetson Orin NX motherboard as an example. 

Connect the IMU attitude sensor to the I2C interface of Jetson Orin NX as shown in the figure below. 

![1. Connect the device – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzA3MWU4MTVlMjI4ZTY0MDA4NGRlZDJhYjEwM2JlNTNfMDVkN2E3ZjFhY2Y4YzE0ZTRhZjRmYzVhMzU4YzllMjFfSUQ6NzYzODkzMTcwMzc0MDQ1MTc3OF8xNzgwMzE4NjUyOjE3ODA0MDUwNTJfVjM)

![1. Connect the device – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZGI2NjZlMmNmYTFiYmYzZDM0YzYyNjJjZjJkMDJmY2NfYzUxNTI5N2Q2NzA0MmU1ZjIxOWJkNjdiMDIwN2ExMDRfSUQ6NzYzODkzMTcwNTIxMDQyNDI2OF8xNzgwMzE4NjUyOjE3ODA0MDUwNTJfVjM)

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

![2. Check device status – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTEyMTU4Y2Q3YmRjMGE2ODRjZGVkNjMxNDMxZjVjMGVfMDI4NTlhZjQzMmIwMGMwMDYyNDAxOGZlNTE4YWE3MmZfSUQ6NzYzODkzMTcwMzQ2NTg1NTkzOF8xNzgwMzE4NjUyOjE3ODA0MDUwNTJfVjM)

## 3. Install the driver library

3.1** Install the Python libraries required for the code **

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

3.2 Transfer Files

[IMU_ROS2.zip]

Friends who are not yet familiar with using MobaXterm to transfer files, please refer to the following webpage for detailed installation and operation methods of MobaXterm:[文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

Drag the decompressed files onto Raspberry Pi 5 via MobaXterm software. 

![3. Install the driver library – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTAwZDhkMTA3NDM2ZDZhNDI3NzRmOTk3ZGEzNmFmNjZfZTQyMzFhYmIxNmEyZDQyYzEzZTc1ODk1ZTUzMDNjMzNfSUQ6NzYzODkzMTcwNjgyNDczOTgwN18xNzgwMzE4NjUyOjE3ODA0MDUwNTJfVjM)

## 4. View IMU data

**Enter the ~/IMU_Library directory and run the IMU_Serial_Library.py file **

```PowerShell
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# 运行 IMU 数据打印文件
python3 -m IMU_Library.IMU_I2C_Library
```

![4. View IMU data – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTU0NTQ3Yjc1ZGMyZjAxZGFmYjRjZWIyODgwZTliMzRfODkyODA2YWY2MDI2MzFjYjhmN2NjYjk2NGJjZmRlOTFfSUQ6NzYzODkzMTcwNjgyNDcyMzQyM18xNzgwMzE4NjUyOjE3ODA0MDUwNTJfVjM)

Note: The above is the data reading for a 10-axis IMU. The 6-axis has no Magnetometer and Barometer data, and the 9-axis has no Barometer data.

## **5. IMU Calibration**

**Enter the ~/IMU_Library directory and run the imu_calibration_tool.py file **

```PowerShell
cd ~/IMU_Library

# 运行 IMU 校准代码文件 --I2C通讯校准
# 执行所有校准（整体、磁力计、温度）
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 7

# 仅整体校准
python3-m IMU_Library.imu_calibration_tool --mode i2c --port 7 --calibrate imu

# 仅磁力计校准
python3-m IMU_Library.imu_calibration_tool --mode i2c --port 7 --calibrate mag

# 仅温度校准
python3-m IMU_Library.imu_calibration_tool --mode i2c --port 7 --calibrate temp
```

![5. IMU Calibration – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjlkMjJiZjE5NTk2NTBmOTA0OWU3NDVmYmEyNjMwZmVfOTg2MTNjOTg2ZTE0YTgyZmE5ZThkMjc0NWNiOGQ0MTdfSUQ6NzYzODkzMTcwNDE4NzMyNTM5Ml8xNzgwMzE4NjUyOjE3ODA0MDUwNTJfVjM)

## 6. Precautions

When using the Orin series motherboard, you need to modify the bus number of the I2C according to the actual situation. The modification location is shown in the figure below. Usually, it is bus 7. 

![6. Precautions – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NmU4NjBhMmRmYzAxYmY0ODJjZDhiNTJmYWVkY2ViODRfNzUwMDc0NWRjYjAxYjI1MjczZGFhZWY4MzZmNGJjZTNfSUQ6NzYzODkzMTcwNDY0NDUyMDkzMV8xNzgwMzE4NjUyOjE3ODA0MDUwNTJfVjM)

![6. Precautions – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmFmYjUxZDk4OTAzMzIyNjA5MWQxNDBlMGZmZTQ5M2RfMTE1NzEwYmFlYzVhZjkyM2I3NzA4MWYwYWMyZjc0Y2JfSUQ6NzYzODkzMTcwMzQ2NTgzOTU1NF8xNzgwMzE4NjUyOjE3ODA0MDUwNTJfVjM)



