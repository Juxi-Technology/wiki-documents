---
title: RDK Series
description: "This tutorial takes the mirroring of the? version of the RDK X5 motherboard as an example."
---

# RDK Series

## Step 1 Connect devices

This tutorial takes the mirroring of the? version of the RDK X5 motherboard as an example. 

Connect the IMU attitude sensor to the I2C interface of the RDK X5 as shown below.

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MjFjNTI1MjI3YjNlODQ0YjM0YjEyZTRmY2M3MDhjMzZfMzZjMWU3NDhmZTg5MDkxMTZhMGU3YzcwZTExOGEyNTRfSUQ6NzYzODkzMTkyMjI3ODg2MTc3Ml8xNzgwMzE4Njk0OjE3ODA0MDUwOTRfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjAwZGU4NDIzMTE2YjU4YzE5OWU3OWY0Njc5Y2U5M2RfYzcxMzM5NTllY2QxZGI1Yjg3MTk3MzBmYmQ2YmE1ZTlfSUQ6NzYzODkzMTkxOTI1MDI3OTM1NV8xNzgwMzE4Njk1OjE3ODA0MDUwOTVfVjM)

## 2. Check device status

View I2C Devices 

```PowerShell
python3 /app/40pin_samples/test_i2c.py
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MDM2NDA4ZTAwZTQyMWY0YzAwNWZiMjJlNjNmY2Y0YzNfZTIxMGFjM2M2YzYzYzQ0YTZkNGM0MDIzY2I0OTFkOTlfSUQ6NzYzODkzMTkyMTIzMzY0NDQ4N18xNzgwMzE4Njk0OjE3ODA0MDUwOTRfVjM)

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

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=N2E3NGJkNTA5OWVkM2FkYjc0ZDQ1ODJlNDQ5OGNjOTRfN2IyY2YxYzRjMDk4NmJmMWViYzczY2FiZDczYzM4MmFfSUQ6NzYzODkzMTkxOTg1ODMyMjM2NF8xNzgwMzE4Njk0OjE3ODA0MDUwOTRfVjM)

## 4. View IMU data

**Enter the ~/IMU_Library directory and run the IMU_Serial_Library.py file **

```PowerShell
cd ~/imu_ros1/src/IMU_ROS1/IMU_Library
# 或
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# 运行 IMU 数据打印文件
python3 -m IMU_Library.IMU_I2C_Library
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTBlMzMzMTQ0ZDg5MWM2ZjEwNWQ4ZDViMDdkN2Q5OWNfZTYxMWQzZTZmOTdiN2I3ZTA2Y2E2ZDVkZGYyNmMyMjNfSUQ6NzYzODkzMTkyMTY4NzU2MzIzMV8xNzgwMzE4Njk0OjE3ODA0MDUwOTRfVjM)

Attention: The above is the data reading of 10-axis IMU, 6-axis without magnetometer and barometer data, 9-axis without barometer data.

## **5. IMU Calibration**

**Enter the ~/IMU_Library directory and run the imu_calibration_tool.py file **

```PowerShell
cd ~/IMU_Library

# 运行 IMU 校准代码文件 --I2C通讯校准
# 执行所有校准（整体、磁力计、温度）
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0

# 仅整体校准
python3-m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate imu

# 仅磁力计校准
python3-m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate mag

# 仅温度校准
python3-m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate temp
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjNkYjNiZTExNzllNjViZWMwYmU0OWU4ZTllYmM2MWZfYmJhYzRjMzc1OTA0MmRhNjk3MWVhZjA0NzlhYjhjOTRfSUQ6NzYzODkzMTkxOTU1MjMxODQzMV8xNzgwMzE4Njk0OjE3ODA0MDUwOTRfVjM)

## 6. Precautions

When using the RDK X5 main board, it is necessary to modify the serial number of the I2C bus according to the actual situation. The modification position is shown in the figure below. Usually, it is bus number 0.

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NjdkYmIxYmU3YmUwN2YyNzRmNWRhMjJiZjVkMzVmODZfM2M1MTgzMTg5ZmExNmE3OWZlYjY1MjYwM2QyNWEzNmVfSUQ6NzYzODkzMTkyMDIwNjMwMjE2NV8xNzgwMzE4Njk1OjE3ODA0MDUwOTVfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MWQwOTZmNDUyMjJlOGI3ZTY3MDY3MDcxMzUyMjQ0YTBfOTZlMTExOTNlOTk2NjA4NWYwNmM3MmJiNjc3MGVmNGFfSUQ6NzYzODkzMTkyMjM1NzU4NjkxOF8xNzgwMzE4Njk0OjE3ODA0MDUwOTRfVjM)



