# RDK系列

## 1.連接設備

本教程以RDK X5主板的？版本的鏡像爲例。

將IMU姿態傳感器按照下圖連接到RDK X5的I2C接口。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YmJjZDg0NDBlMTQ4YTBmMWM1NmFlYWU4MjlkYTQ1OTJfNGZmOGEzOWFmYTMwYzNjODI0MDE3NDYyMzE5MjQwNTdfSUQ6NzYzODk2Njg0MzEwOTQ2MDk0MV8xNzgwNDA0MzUyOjE3ODA0OTA3NTJfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=Zjc1MzhmOWZkNTk0M2M0MzFlNDBhYzExNTBlMGNkODlfM2UzODQ2NGMwOTJiMWEwZTFiMWNjOWNkMDQzODAzNGJfSUQ6NzYzODk2Njg0NTU3MTEwNzgwNl8xNzgwNDA0MzUyOjE3ODA0OTA3NTJfVjM)

## 2.查看設備狀態

查看I2C設備

```PowerShell
python3 /app/40pin_samples/test_i2c.py
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OGYxZTRkYWQ4Njg2ZDRjOGRhNTAzMmFlNGZmMzRiNThfZDA1OGRkM2I3NTQ1YjI2OTZlOGI4MTdlNGY0ZGFhOWJfSUQ6NzYzODk2Njg0MzEzNDQ3OTI5MV8xNzgwNDA0MzUyOjE3ODA0OTA3NTJfVjM)

## 3.安裝驅動庫

3.1**安裝代碼所需python庫**

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

3.2傳輸文件

[IMU_ROS2.zip]

如果還不會使用MobaXterm傳輸文件的朋友，請查看以下網頁MobaXterm詳細安裝和操作方法：[文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

通過MobaXterm軟件將 解壓後的文件 拖入 樹莓派5 上。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZThiNGY3NjQ0OGMyY2U3YmExMmFlZDc3ODMzYjJkZTVfZjhhNDZjNzc1YTg4ODJjMzkyN2RmYmUwOTI3MzljMjRfSUQ6NzYzODk2Njg0NDE0MTE3NzgwNV8xNzgwNDA0MzUyOjE3ODA0OTA3NTJfVjM)

## 4.查看imu數據

**進入 ~/IMU_Library目錄，運行IMU_Serial_Library.py文件**

```PowerShell
cd ~/imu_ros1/src/IMU_ROS1/IMU_Library
# 或
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# 运行 IMU 数据打印文件
python3 -m IMU_Library.IMU_I2C_Library
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTAwNTNiOGU0YzAzYTcxNTY1YWM5OTE2MWU0NzIwYmVfYzMyZDZiYTNmMTc0YzgzZGVjMjI5ZmE2NWU1MjNmY2JfSUQ6NzYzODk2Njg0MzgxMDU4MTQ2NV8xNzgwNDA0MzUyOjE3ODA0OTA3NTJfVjM)

注意：以上爲10軸IMU的數據讀取，6軸無磁力計（Magnetometer）與氣壓計（Barometer）數據，9軸無氣壓計（Barometer）數據。

## **5.IMU校準**

**進入 ~/IMU_Library目錄，運行imu_calibration_tool.py文件**

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

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZDMzNzhiYjExOGM3ZmY1OWEyYTMwY2Y5ZTljYjZjYjJfOWNiMTBlNmYxNTcxMjhmNWY2OWVmNmE1NjQ1YTgzMzZfSUQ6NzYzODk2Njg0MzgzOTIwNDMyMV8xNzgwNDA0MzUyOjE3ODA0OTA3NTJfVjM)

## 6.注意事項

使用RDK X5主板時，需要根據實際情況修改I2C的總線的序號，修改位置如下圖。通常是0號總線。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjIwZTQxNTAxYTJlMWFiY2QzZWVlM2QwMzJmMDUzYmNfN2M4Njc5YjQ3YmFiMjI2N2I0NzRiMDdlYWQzZGU2ODlfSUQ6NzYzODk2Njg0MzgxMDU5Nzg0OV8xNzgwNDA0MzUyOjE3ODA0OTA3NTJfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YWRiNjBlN2UxMTNkMGZiYTZkZDc2NjU0NDVkOTdiNDVfZTI1ZWZlZWVhYmVjNDViMmZkNzA2MDQwYmFiYmY5ZGNfSUQ6NzYzODk2Njg0NDI3Mjc1NzY4OF8xNzgwNDA0MzUyOjE3ODA0OTA3NTJfVjM)



