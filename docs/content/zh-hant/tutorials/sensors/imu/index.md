---
title: 高精度IMU姿態傳感器 使用教程
description: "1. 安裝代碼所需python庫"
---

# 高精度IMU姿態傳感器 使用教程

### 下載壓縮包 [IMU_ROS1.zip](https://juxitech.feishu.cn/wiki/GNgWwGnYIiBd4Gk81yccEN6jnNf)，解壓後進入~/IMU_Library

1. **安裝代碼所需python庫**

```PowerShell
pip install pyserial
pip install smbus2
```

2. **安裝IMU_Library庫**

```PowerShell
# 安装库及其依赖
pip install -e .

# 或使用setup.py安装
python setup.py install
```

3. **設置端口映射**

```PowerShell
# 防止插拔后端口变更，请设置端口映射
sudo gedit /etc/udev/rules.d/99-serial-imu.rules

# 如出现没有gedit命令相关内容，先下载安装
sudo apt install gedit

# 填写映射内容
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"

# 参数说明：
`--mode`: 通信模式，可选值为`serial`(串口)或`i2c`
`--port`: 串口名(如`/dev/ttyUSB0`)或I2C端口号(如`7`)
`--rate`: 数据打印频率(Hz)，默认10Hz
`--debug`: 启用调试模式，显示详细信息

# 保存退出，运行命令使规则生效
sudo udevadm trigger
sudo service udev reload
sudo service udev restart

# 验证
ll /dev/imu-serial

# 输出示例：
lrwxrwxrwx 1 root root 7 1月 22 10:00 /dev/imu-serial -> ttyUSB0
```

### 串口通訊

1. **進入 ~/IMU_Library/IMU_Library目錄，運行IMU_Serial_Library.py文件**

```PowerShell
cd ~/imu_ros1/src/IMU_ROS1/IMU_Library/IMU_Library 
# 或
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library/IMU_Library

# 运行 IMU 数据打印文件
python3 IMU_Serial_Library.py
```

### I2C通訊

1. **進入 ~/IMU_Library/IMU_Library目錄，運行IMU_I2C_Library.py文件**

```PowerShell
cd ~/IMU_Library/IMU_Library

# 运行 IMU 数据打印文件
python3 IMU_I2C_Library.py
```

### imu校準

1. **進入 ~/IMU_Library/IMU_Library目錄，運行imu_calibration_tool.py文件**

```PowerShell
cd ~/IMU_Library/IMU_Library

# 运行 IMU 校准代码文件 --串口通讯校准
# 执行所有校准（整体、磁力计、温度）
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial

# 仅整体校准
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate imu

# 仅磁力计校准
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate mag

# 仅温度校准
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate temp

# 运行 IMU 校准代码文件 --I2C通讯校准
# 执行所有校准（整体、磁力计、温度）
python3 imu_calibration_tool.py --mode i2c --port 1

# 仅整体校准
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate imu

# 仅磁力计校准
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate mag

# 仅温度校准
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate temp
```

## 官方倉庫示例

鉅犀科技為 IMU 慣導模組提供完整的開源代碼：[GitHub](https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module)

### ROS1 / ROS2 示例

倉庫原生支援 ROS1 和 ROS2，包含標定工具和視覺化節點：

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module

# ROS2
colcon build
source install/setup.bash
ros2 launch icm42670p imu_launch.py
```

### Python 校準工具

```bash
# 运行六面校准获取精确的加速度计和陀螺仪零偏
python calibration/calibrate.py --port /dev/ttyUSB0
```
