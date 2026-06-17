# Raspberry Pi 5

## 1. Connect the device

This tutorial takes the Raspberry Pi 5 motherboard and the official 64-bit version of the mirroring as an example. 

Connect the IMU attitude sensor to the I2C interface of Raspberry Pi 5 as shown in the figure below. 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NDYxMGQyZWEyNmY4MzYyMDcwNjhhZDI1Mjg3OTAzMWVfNzNlZWYyNjg0OWE4MjkyMTJkYjk2ZDMwMmNlY2VlMzFfSUQ6NzYzODkzMTU2MTM2MjE0ODI4OF8xNzgwMzE4NTk1OjE3ODA0MDQ5OTVfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MjNlNDJkMjY5YjkxNDY3Y2IyMDk3N2E3Mzk4YTViZTFfZTQ5ODI2OWY0OGY0NTEzMjlmMzBiYjE0MDJlMjk5OTRfSUQ6NzYzODkzMTU2MDAxMTkyNjQ5OV8xNzgwMzE4NTk1OjE3ODA0MDQ5OTVfVjM)

## 2. Check device status

First, install I2Ctool, then enter the following in the terminal: 

```PowerShell
sudo apt-get update
sudo apt-get install -y i2c-tools
```

View I2C Devices 

```PowerShell
sudo i2cdetect -y -r -a 1
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NjcwZDgyNmJmZDEwNmNmNjhiZTIzNGVmMGZkNzYyYmJfNmRlNTBjOGZlMWI3ODBmMDljZTY4Y2QyMzNhNDZhZDRfSUQ6NzYzODkzMTU1OTU4ODIzNjIzM18xNzgwMzE4NTk1OjE3ODA0MDQ5OTVfVjM)

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

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTkxMzZhNTNmZTI5MWE2Y2FkNzQzZTI4MTQ4OWMwMTlfNTMyY2MxNDE0MDQ3MWJmMDhkMzIxMGJmYTJhMGEzMDFfSUQ6NzYzODkzMTU1ODYxNTQxOTg1NF8xNzgwMzE4NTk1OjE3ODA0MDQ5OTVfVjM)

## 4. View IMU data

**Enter the ~/IMU_Library directory and run the IMU_Serial_Library.py file **

```PowerShell
cd ~/imu_ros2/src/IMU_ROS1/IMU_Library

# 运行 IMU 数据打印文件
python3 -m IMU_Library.IMU_I2C_Library
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NjM1OTBlMTM4Yzg4MDFhNmM2NjcxNWI1MWQ4NGY5OGJfN2Y2NjkxODUzNjYxNmNlYWYzOTMwM2RmZDIwNTlhY2RfSUQ6NzYzODkzMTU1ODQ3MzA0MjkyMV8xNzgwMzE4NTk1OjE3ODA0MDQ5OTVfVjM)

Note: The above is the data reading for a 10-axis IMU. The 6-axis has no Magnetometer and Barometer data, and the 9-axis has no Barometer data.

## **5. IMU Calibration**

**Enter the ~/IMU_Library directory and run the imu_calibration_tool.py file **

```PowerShell
cd ~/IMU_Library

# 运行 IMU 校准代码文件 --I2C通讯校准
# 执行所有校准（整体、磁力计、温度）
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1

# 仅整体校准
python3-m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate imu

# 仅磁力计校准
python3-m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate mag

# 仅温度校准
python3-m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate temp
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTQxNzA1YjY0N2FkYTdiOWM2ZDI5ODU2YjIyZjQ2N2JfMzBhYWY2NGU1M2M2NDViMjg5OGFkMDI5MzgzNmQ5YzFfSUQ6NzYzODkzMTU1NzU3NjUxMDQxMV8xNzgwMzE4NTk1OjE3ODA0MDQ5OTVfVjM)

## 6. Precautions

Raspberry Pi 5 needs to enable the i2c pin in advance. 

The opening operation is as follows: 

Terminal run command

```PowerShell
sudo raspi-config
```

Select using the arrow keys on the keyboard, and press the Enter key on the keyboard to enter after selection

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTU4ZGFjMTllY2U1MGNlZGM3ZjY1MzQzOGJkYTA5MTVfN2MyYmM3ZDhiM2I5ZmNiOWE4NWQ5ZTM2MDFiYjQ1ZGZfSUQ6NzYzODkzMTU1ODE5NjYyODQ1MV8xNzgwMzE4NTk1OjE3ODA0MDQ5OTVfVjM)

Select I2C, and after selection, press the Enter key on the keyboard to enter.

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ODUwZDY4OTRlYTIxOTk4NjA1OGE5YzdiYjU4ZmE3MDZfMjBiZDk2ZjM3ZWVkMzNjNThmMDVmZGUyMDQxYzk4MTRfSUQ6NzYzODkzMTU1ODgyMTA1NTQ1Nl8xNzgwMzE4NTk1OjE3ODA0MDQ5OTVfVjM)

After selecting I2C, press the Enter key on the keyboard, use the arrow keys to select Yes, and then press the Enter key to confirm. 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NjZhNWQxMjVjMWU2MjZhZTgzOTM4ZDM5ZWFkMGUwNmFfZTg3M2Q1ZTRiZWYzYTE4Yzk0ZTdjZGQzMTlmYjdlYjBfSUQ6NzYzODkzMTU2MDk4ODg4ODAyMV8xNzgwMzE4NTk1OjE3ODA0MDQ5OTVfVjM)

Press Enter to confirm

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTA1YzI4ODJjMTU1Yjk1ZTNiODIwMzI1MDAxYzA2ODVfMzliYWRhODM2MThmMTNlYjg4NjdhMmRmNjA0YjQyYWVfSUQ6NzYzODkzMTU1ODA4ODA2ODA2M18xNzgwMzE4NTk1OjE3ODA0MDQ5OTVfVjM)

Press the arrow keys to select Finish, then press Enter to exit the configuration.

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YWNiNmZjNjExOTA3NTM2ZTg5M2Q4MjM4MDM2YTE0Y2VfZmVhNGRkNjA1OGIzZDI4YjRlMGQwM2I3Njk0OWMyNDFfSUQ6NzYzODkzMTU1Nzc5MzY4MDM0NV8xNzgwMzE4NTk1OjE3ODA0MDQ5OTVfVjM)



