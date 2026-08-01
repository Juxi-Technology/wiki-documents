---
title: ROS1應用
description: "系統配置：ubuntu20.04"
---

# ROS1應用

**系統配置：ubuntu20.04**

**ROS1**版本：noetic**

### ROS1環境配置

1. **設置ROS1**

```PowerShell
sudo sh -c '. /etc/lsb-release && echo "deb http://mirrors.tuna.tsinghua.edu.cn/ros/ubuntu/ `lsb_release -cs` main" > /etc/apt/sources.list.d/ros-latest.list'
```

2. **設置Key**

```PowerShell
sudo apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654
```

```Plain Text
sudo apt update
```

3. **安裝**ROS1（官方下載）**

```PowerShell
sudo apt install ros-noetic-desktop-full
```

代理加速下載安裝ROS1

wgethttp://fishros.com/install-O Fishros&amp;&amp;.

4. **配置環境變量**

```Plain Text
echo "source /opt/ros/noetic/setup.bash">> ~/.bashrc
```

```PowerShell
source ~/.bashrc
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
```

```Plain Text
sudo service udev reload
```

```Plain Text
sudo service udev restart
```

5. **驗證**

```PowerShell
ll /dev/imu-serial
```

```Plain Text
sudo usermod -aG dialout ash
```

### 導入準備好的壓縮包

1. **飛書同級目錄下有**[IMU_ROS1.zip](https://juxitech.feishu.cn/wiki/GNgWwGnYIiBd4Gk81yccEN6jnNf)

2. **通過文件傳輸軟件傳輸到虛擬機中**

3. **安裝IMU_Library庫**

```PowerShell
cd IMU_ROS1
# 下载解压IMU_ROS1压缩文件后，进入到IMU_Library目录下，运行以下指令
cd IMU_Library

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

**如果出現渲染有問題的時候，執行以下命令**

```PowerShell
sudo apt-get install ros-noetic-imu-filter-madgwick
sudo apt-get install ros-noetic-rviz-imu-plugin
```

### 構建ROS1項目

1. **在/home目錄下新開終端，新建ros1工作空間**

```PowerShell
mkdir imu_ros1
cd imu_ros1
mkdir src
cd src/
catkin_init_workspace
```

2. **將傳輸過來的文件IMU_ROS1文件夾複製到~/imu_ros1/src/目錄下**

```PowerShell
# 复制 IMU_ROS1 文件夹到新建的 src 目录下
cp -r ~/IMU_ROS1 ~/imu_ros1/src
cd ~/imu_ros1
catkin_make
```

3. **把工作目錄~/imu_ros1寫入到環境變量中**

```PowerShell
# 编辑 ~/.bashrc
sudo gedit ~/.bashrc

# 把下面命令写到末尾
source ~/imu_ros1/devel/setup.bash

source ~/.bashrc
```

### 開啓ROS1節點

1. **打開終端，輸入roscore啓動節點**

```PowerShell
# 启动roscore
roscore

# 新开终端，设置环境，启动节点
source ~/imu_ros1/devel/setup.bash
```

2. **給 Python 腳本添加可執行權限（關鍵）**

進入腳本所在的 `scripts` 目錄，執行 `chmod +x` 命令賦予可執行權限（`+x` 即 add execute 增加執行權限）：

```PowerShell
# 进入imu_driver.py所在目录（按你的实际路径）
cd ~/imu_ros1/src/IMU_ROS1/scripts/ 

# 赋予可执行权限（仅需执行1次，永久生效）
chmod +x imu_driver.py
chmod +x mag_visualizer.py
```

返回imu_ros1文件夾下運行imu_driver.py

```Plain Text
cd ~/imu_ros1
```

```Plain Text
rosrun IMU_ROS1 imu_driver.py
```

### IMU數據打印

1. **打開新的終端，查看imu話題**

```PowerShell
# 查看当前发布的所有话题
rostopic list
```

2. **打印話題數據**

```PowerShell
# 打印IMU原始数据
rostopic echo /imu/data_raw

# 打印磁力计数据
rostopic echo /imu/mag
```

### RViz可視化

1. **運行命令啓動rviz**()**

```PowerShell
roslaunch IMU_ROS1 imu_display.launch
```

### 常見問題

1. 啓動節點如出現打開失敗，請嘗試以下指令

```PowerShell
# 在~/imu_ros1目录下运行
source devel/setup.bash

# 端口号问题
sudo chmod 666 /dev/imu-serial
```

2. RVIZ可視化中三軸顯示很小，重新勾選 Enable axes

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NDFlMzg2OGIyZDY0ZTY0MjU5YTdmNGU4YTA2MDM3NThfYTFmYTViNTJiNWE5YzM4ZDA5YzJlZjk0YmNlMWFmYTRfSUQ6NzYzODk2NzQyMDMzOTcxOTE0MV8xNzgwNDA0NTc4OjE3ODA0OTA5NzhfVjM)



