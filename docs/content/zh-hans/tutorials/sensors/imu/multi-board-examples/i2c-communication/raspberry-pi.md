---
title: "树莓派"
description: "IMU 姿态传感器与树莓派 5 的 I2C 通信教程：在官方 64 位系统上连接 I2C 接口，查看状态并读取姿态数据。"
---

# 树莓派

## 1. 连接设备

本教程以树莓派5主板，官方64位版本的镜像为例。

将IMU姿态传感器按照下图连接到树莓派5的I2C接口。

![1. 连接设备 – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/1.jpg)

![1. 连接设备 – 2](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/2.png)

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

![2. 查看设备状态 – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/3.png)

## 3. 安装驱动库

3.1 **安装代码所需python库**

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

3.2 传输文件

IMU_ROS2.zip

如果还不会使用MobaXterm传输文件的朋友，请查看以下网页MobaXterm详细安装和操作方法：[文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

通过MobaXterm软件将 解压后的文件 拖入 树莓派5 上。

![3. 安装驱动库 – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/4.png)

## 4. 查看imu数据

**进入 ~/IMU_Library目录，运行IMU_Serial_Library.py文件**

```PowerShell
cd ~/imu_ros2/src/IMU_ROS1/IMU_Library

# 运行 IMU 数据打印文件
python3 -m IMU_Library.IMU_I2C_Library
```

![4. 查看imu数据 – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/5.png)

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

![5. IMU校准 – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/6.png)

## 6. 注意事项

树莓派5需要提前开启i2c引脚。

开启操作如下：

终端运行命令

```PowerShell
sudo raspi-config
```

通过键盘的方向键选择，选中后按键盘Enter键进入

![6. 注意事项 – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/7.png)

选择I2C，选中后按键盘Enter键进入，

![6. 注意事项 – 2](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/8.png)

选中I2C后，按键盘Enter键，控制方向键选择Yes，再按Eneter键确认。

![6. 注意事项 – 3](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/9.png)

按Enter键确认

![6. 注意事项 – 4](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/10.png)

按方向键选择Finish，然后按Enter键，退出配置。

![6. 注意事项 – 5](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/11.png)

