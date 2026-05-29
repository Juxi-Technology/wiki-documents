# RDK系列

## 1. 连接设备

本教程以RDK X5主板的版本的镜像为例。

将IMU姿态传感器按照下图连接到RDK X5的I2C接口。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OWFkNTFjYzkwN2VlOTNhMTYzZTk4OGE0Y2I0MWQwYTJfNWViZWVlZWE1NGIwYjIxNjljOWE3MDQ2OWYzNGYzNjlfSUQ6NzYwMjU5NDE1ODEyNTI3MjI2OV8xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjhhOTgyYjQxNmJhZjVlYjk5M2Y4ODE3OGVkYWM2MmFfMmFjZDM5N2U3Y2IxODQzMDFmNDBiZDNmYTQwZWQyNmJfSUQ6NzYwMjU5ODYyMDIzNTkxMDMyMl8xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)

## 2. 查看设备状态

查看I2C设备

```PowerShell
python3 /app/40pin_samples/test_i2c.py
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTMyZTdiNDQ5OGMxNjhlMzA3YzA0MTRkMmY0ZWUwNjNfNjA2Y2FmZTU1NjdjNWYyNzI0ZGRhOWFjZjg3OGExMzdfSUQ6NzYwNTAzOTAxMDYwOTgxODU4M18xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)

## 3. 安装驱动库

3.1 **安装代码所需python库**

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

3.2 传输文件

[IMU_ROS2.zip]

如果还不会使用MobaXterm传输文件的朋友，请查看以下网页MobaXterm详细安装和操作方法：[文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

通过MobaXterm软件将 解压后的文件 拖入 树莓派5 上。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjcyMTE3MTJiMWUzMjhhZTlkYTgyNDVkMGJmZDIyZTFfZWI4Mzc5MjUyZDk3Yjg3ODgzMTAwZDY2YjdiZTAzYWVfSUQ6NzYwMjU5MzgxMDE3MDAyMjg2NF8xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)

## 4. 查看imu数据

**进入 ~/IMU_Library目录，运行IMU_Serial_Library.py文件**

```PowerShell
cd ~/imu_ros1/src/IMU_ROS1/IMU_Library
# 或
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# 运行 IMU 数据打印文件
python3 -m IMU_Library.IMU_I2C_Library
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NjNjN2YzOTMyNWUyM2RjOGYyNDRiNjg3MDA2NzlhN2ZfNWI4NGYzM2NmYWExYjRlZjQ3YTY1Y2I2NDMxYmU5YTNfSUQ6NzYwMjU5MzgwOTY2NjkxOTM2Nl8xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)

注意：以上为10轴IMU的数据读取，6轴无磁力计（Magnetometer）与气压计（Barometer）数据，9轴无气压计（Barometer）数据。

## **5. IMU校准**

**进入 ~/IMU_Library目录，运行imu_calibration_tool.py文件**

```PowerShell
cd ~/IMU_Library

# 运行 IMU 校准代码文件 --I2C通讯校准
# 执行所有校准（整体、磁力计、温度）
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0

# 仅整体校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate imu

# 仅磁力计校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate mag

# 仅温度校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate temp
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZWM5YTZmOTIyZDBmZjk4OTkzNWEwYjI2ZjgxMDE4MGNfNGVkYzlkZjU5YmNhNmE3N2YwZGJiNDcwMzFlN2U0YWJfSUQ6NzYwMjU5MzgwODE2NTUwNjAwOV8xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)

## 6. 注意事项

使用RDK X5主板时，需要根据实际情况修改I2C的总线的序号，修改位置如下图。通常是0号总线。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjhmNGIzMGZiOGI1ZTM3MjA1MGQ5ZDc4NWYwYjcxMjVfNTZkMjFjOGY1OTQwMzU3ODhlY2M2MTg1ZGJiZGVhZWJfSUQ6NzYwMjU5NTU1MjI1NzM5NTY0NF8xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NmFmMzJjYWQ2MmZlNTBmOGE0NDM0NzZmZWQxZDNkN2ZfODUzNmYzMTE4OTFhMGRjNTgyODFmYTdjMGM4ZjEzY2RfSUQ6NzYwMjU5NTY5NTc1ODU2MDIxMl8xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)

