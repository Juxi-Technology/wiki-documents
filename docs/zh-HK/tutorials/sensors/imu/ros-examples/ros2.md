---
title: ROS2應用
description: "系統配置：ubuntu22.04"
---

# ROS2應用

**系統配置：ubuntu22.04**

**ROS2版本：humble**

### ROS2環境配置

1. **更新下載源**

```PowerShell
sudo apt update
```

2. **輸入ros2下載指令**

```PowerShell
wget http://fishros.com/install -O fishros && . fishros
```

### 設備連接至虛擬機

1. **查看設備**

```PowerShell
ll /dev/ttyUSB*
```

2. **建立端口映射**

```PowerShell
sudo gedit /etc/udev/rules.d/99-serial-imu.rules
```

3. **填寫映射文件內容**

```PowerShell
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"
```

4. **保存退出，運行命令使規則生效**

```PowerShell
sudo udevadm trigger
sudo service udev reload
sudo service udev restart
```

5. **驗證**

```PowerShell
ll /dev/imu-serial
```

### 導入準備好的壓縮包

1. **飛書同級目錄下有**[IMU_ROS2.zip](https://juxitech.feishu.cn/wiki/ElvZwpfqniF9EikmSVoc3xMgn5c)

2. **通過文件傳輸軟件傳輸到虛擬機中**

3. **安裝IMU_Library庫**

```PowerShell
# 下载解压IMU_ROS2压缩文件后，进入到IMU_Library目录下，运行setup.py
cd IMU_ROS2/IMU_Library

# 安装库及其依赖
pip install -e .

# 或使用setup.py安装
python setup.py install
```

### python相關庫安裝

```PowerShell
sudo pip3 install pyserial
sudo pip3 install smbus2
```

### 構建ROS2項目

1. **返回到~/IMU_ROS2目錄**

```PowerShell
cd IMU_ROS2
colcon build --symlink-install
```

1. **把工作目錄~/IMU_ROS2寫入到環境變量中**

```PowerShell
# 编辑 ~/.bashrc
sudo gedit ~/.bashrc

# 把下面命令写到末尾
source ~/IMU_ROS2/install/setup.bash
```

編譯成功後，執行以下命令查看imu_ros2功能包下是否有可執行文件

`ROS2 pkg可執行文件imu_ros2`

### 開啓ROS2節點

```PowerShell
source install/setup.bash
ros2 run imu_ros2 imu_publisher
```

### IMU數據打印

1. **打開新的終端，查看imu話題**

```PowerShell
ros2 topic list
```

2. **打印/imu/data話題數據**

```PowerShell
ros2 topic echo /imu/data
```

3. **打開新的終端，查看msg話題**

```PowerShell
ros2 topic echo /imu/mag
```

### RViz2可視化

1. **運行命令，打開rviz可視化界面**

```PowerShell
ros2 launch imu_ros2 imu_visualization.launch.py
```

### 常見問題

1. 啓動節點如出現打開失敗，請嘗試以下指令

```PowerShell
# 在~/IMU_ROS2目录下运行
source install/setup.bash

# 端口号问题
sudo chmod 666 /dev/imu-serial
```



