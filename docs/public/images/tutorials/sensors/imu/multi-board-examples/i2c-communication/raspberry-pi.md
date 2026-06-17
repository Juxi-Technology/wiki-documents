# 树莓派5

## 1. 连接设备

本教程以树莓派5主板，官方64位版本的镜像为例。

将IMU姿态传感器按照下图连接到树莓派5的I2C接口。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmVjNTEwNDY2MWRiNmUzNWNhYjVmMjhlYWVlZmY1ODhfOWExZWQxZGMwNmIxNzNlNmQzNjRmYWZmMDU0OTE1ODVfSUQ6NzYwMjU3ODcxMzEyOTA2MTMyOF8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MDYzMGZjYWU1ZGUzMzFjZjdhNzk1MGJhNThkY2ViODNfYzA3MTIyZjAxYjc0NTc4ZTM0NWViZGNkYjMyMmJiZTFfSUQ6NzYwMjU3NDczMjM2MjA5MTQ1MF8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

## 2. 查看设备状态

首先安装 I2Ctool，终端输入：

```PowerShell
sudo apt-get update
sudo apt-get install -y i2c-tools
```

查看I2C设备

```PowerShell
sudo i2cdetect -y -r -a 1
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OWM3NzU5ODY2MDUwNTg3MjdlMTNiYjlhOWRiOTI1MDZfZGM4NDM5MzFiNTZlODgyMWE2ZjY3M2VjZGM3MmU0MzNfSUQ6NzYwMjU3OTYzMDY2MjUzNjM4OF8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

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

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MGE0OThjMWZiZGZkMmNkODY1MWQ1YTJjZTI1ZTBjYTlfMTVjYzhhOTdjZjAxODdmZjcxYjliMjgzYTkzOTg4YzBfSUQ6NzYwMjU4MjU5NjQ0Njg2NjY1N18xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

## 4. 查看imu数据

**进入 ~/IMU_Library目录，运行IMU_Serial_Library.py文件**

```PowerShell
cd ~/imu_ros2/src/IMU_ROS1/IMU_Library

# 运行 IMU 数据打印文件
python3 -m IMU_Library.IMU_I2C_Library
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTI5NzY2YzRiODVkYWExYjk3M2QyNWU2ZjRmMDkxODRfOTMxYTMxMTU4NzVlNjNmY2YxMTUwMzgxOTI0ZTc3ZTJfSUQ6NzYwMjU3NTcxMDk4NDczNTk0OV8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

注意：以上为10轴IMU的数据读取，6轴无磁力计（Magnetometer）与气压计（Barometer）数据，9轴无气压计（Barometer）数据。

## **5. IMU校准**

**进入 ~/IMU_Library目录，运行imu_calibration_tool.py文件**

```PowerShell
cd ~/IMU_Library

# 运行 IMU 校准代码文件 --I2C通讯校准
# 执行所有校准（整体、磁力计、温度）
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1

# 仅整体校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate imu

# 仅磁力计校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate mag

# 仅温度校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate temp
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTBhMDJlMGQ0ZmZmYzRlYzVmOGNhZTQyYjExYmQxNDhfMjU5YjA0NGRkNGY0YTM1OGE3NzYxOTdlNjcxMGQ2NmRfSUQ6NzYwMjU3NDczMzQ5MDA0NzkzOV8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

## 6. 注意事项

树莓派5需要提前开启i2c引脚。

开启操作如下：

终端运行命令

```PowerShell
sudo raspi-config
```

通过键盘的方向键选择，选中后按键盘Enter键进入

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NGFhOGFkMjU0M2ZhZTA3ZTgzN2RmNWNhMTFhYTdmNzBfN2VkMWQ4ZWNjZDY3OThkM2M4MDA5OWE4MTczNTQ0NTRfSUQ6NzYwMjU4MDA1MTM1MjA3OTU3OV8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

选择I2C，选中后按键盘Enter键进入，

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzY0NWQ5NTdkNjExNDk4ZTUwMDc2NTEzMDUwZTdiZTNfMTAwMzc2NzNlMTAzZmQ4OGE0YWJiM2YxZjg0ZDc3NDVfSUQ6NzYwMjU4MDIyMjIwMjEyMTQwNF8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

选中I2C后，按键盘Enter键，控制方向键选择Yes，再按Eneter键确认。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NDUzZjI5OWU2MmQ2OGZjNDBkMmFmMjE3OWUwYmRmMTBfMWY1ZmUwYjdjOTAwZTBiYzg5NTBjNWM5ZTNkOWI0OTdfSUQ6NzYwMjU4MDMxMTA4Mzk0NTE3NF8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

按Enter键确认

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTRjMDQxNWViMzJiZDVhYzVkMDBkYWZjODg0NTI3NTA3MWExODE2ZjRlOTVlZWM0NDdmZGQ0Yzc4Y2Y1MWJlNmRfSUQ6NzYwMjU4MDM5OTc2MzY4ODM4MF8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

按方向键选择Finish，然后按Enter键，退出配置。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTBjZDE2YTYxNGU3OTJlNzA0OWQwMjY0ODY2MTBiZGZfY2Q0ZmU0OTdmYTQyYjliODExMzI2YmM3NTdkMWY5YWRfSUQ6NzYwMjU4MDQ5NjAyNzUzNjU4Nl8xNzgwMDUyNzU0OjE3ODAxMzkxNTRfVjM)

