---
title: 高精度IMU姿態傳感器 使用教程
description: "鉅犀科技 IMU 慣導模組使用教程：驅動庫安裝、串列埠映射設定與資料列印的入門步驟說明。"
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
# 安裝庫及其依賴
pip install -e .

# 或使用setup.py安裝
python setup.py install
```

3. **設置端口映射**

```PowerShell
# 防止插拔後端口變更，請設置端口映射
sudo gedit /etc/udev/rules.d/99-serial-imu.rules

# 如出現沒有gedit命令相關內容，先下載安裝
sudo apt install gedit

# 填寫映射內容
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"

# 參數說明：
`--mode`: 通信模式，可选值为`serial`(串口)或`i2c`
`--port`: 串口名(如`/dev/ttyUSB0`)或I2C端口号(如`7`)
`--rate`: 数据打印频率(Hz)，默认10Hz
`--debug`: 启用调试模式，显示详细信息

# 保存退出，運行命令使規則生效
sudo udevadm trigger
sudo service udev reload
sudo service udev restart

# 驗證
ll /dev/imu-serial

# 輸出示例：
lrwxrwxrwx 1 root root 7 1月 22 10:00 /dev/imu-serial -> ttyUSB0
```

### 串口通訊

1. **進入 ~/IMU_Library/IMU_Library目錄，運行IMU_Serial_Library.py文件**

```PowerShell
cd ~/imu_ros1/src/IMU_ROS1/IMU_Library/IMU_Library 
# 或
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library/IMU_Library

# 運行 IMU 數據打印文件
python3 IMU_Serial_Library.py
```

### I2C通訊

1. **進入 ~/IMU_Library/IMU_Library目錄，運行IMU_I2C_Library.py文件**

```PowerShell
cd ~/IMU_Library/IMU_Library

# 運行 IMU 數據打印文件
python3 IMU_I2C_Library.py
```

### imu校準

1. **進入 ~/IMU_Library/IMU_Library目錄，運行imu_calibration_tool.py文件**

```PowerShell
cd ~/IMU_Library/IMU_Library

# 運行 IMU 校準代碼文件 --串口通訊校準
# 執行所有校準（整體、磁力計、溫度）
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial

# 僅整體校準
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate imu

# 僅磁力計校準
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate mag

# 僅溫度校準
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate temp

# 運行 IMU 校準代碼文件 --I2C通訊校準
# 執行所有校準（整體、磁力計、溫度）
python3 imu_calibration_tool.py --mode i2c --port 1

# 僅整體校準
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate imu

# 僅磁力計校準
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate mag

# 僅溫度校準
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
# 運行六面校準獲取精確的加速度計和陀螺儀零偏
python calibration/calibrate.py --port /dev/ttyUSB0
```

- **IMU 慣性導航模組**
  - [產品資料](./product-info.md)
  - [IMU 校準](./calibration.md)
  - [檔案遠程傳輸](./remote-file-transfer.md)
  - [SSH檔案傳輸](./ssh-file-transfer.md)
- **多板卡示例**
  - [多主控通信案例概覽](./multi-board-examples/overview.md)
  - [PC 通信](./multi-board-examples/pc-communication.md)
- **I2C 通信**
  - [Arduino](./multi-board-examples/i2c-communication/arduino.md)
  - [Jetson](./multi-board-examples/i2c-communication/jetson.md)
  - [樹莓派](./multi-board-examples/i2c-communication/raspberry-pi.md)
  - [RDK](./multi-board-examples/i2c-communication/rdk.md)
  - [STM32](./multi-board-examples/i2c-communication/stm32.md)
- **串口通信**
  - [Arduino](./multi-board-examples/serial-communication/arduino.md)
  - [Jetson](./multi-board-examples/serial-communication/jetson.md)
  - [樹莓派](./multi-board-examples/serial-communication/raspberry-pi.md)
  - [RDK](./multi-board-examples/serial-communication/rdk.md)
  - [STM32](./multi-board-examples/serial-communication/stm32.md)
- **ROS 示例**
  - [ROS1 應用](./ros-examples/ros1.md)
  - [ROS2 應用](./ros-examples/ros2.md)
