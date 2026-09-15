---
title: "GPS模組使用前説明"
description: "（1）建立好工作空間後，把資料夾gpssrc資料夾裏的內容複製到工作空間的src裏邊，然後利用colcon build編譯，沒有出現錯誤表示編譯通過；"
---

# GPS模組使用前説明

#### 1、GPS模組編譯説明

（1）建立好工作空間後，把資料夾gps_src資料夾裏的內容複製到工作空間的src裏邊，然後利用colcon build編譯，沒有出現錯誤表示編譯通過；

在~/gps_ros2目錄下執行

```
colcon build
```

在~/gps_ros2目錄下執行 

```
source install/setup.bash
```

（2）功能包內容説明：

- nmea_navsat_driver：GPS模組啓動、讀取GPS模組數據、繪製GPS數據等功能；
- nmea_msgs：存放一些GPS訊息的msg檔案
- imu_gps_localization：IMU與GPS數據融合功能
- gps_goal：轉換經緯度數據成Nav2目標導航數據

#### 2、綁定GPS連接埠

GPS模組通過串口與電腦或者主控連接，因此我們需要給GPS綁定好連接埠，以免連接埠號的問題導致GPS模組不能被電腦或者主控識別出來。

（1）查看連接的USB裝置，找到GPS模組，終端輸入**lsusb**查找GPS連接的裝置ID號，如下圖所示，就是GPS模組的裝置識別ID，

![圖 1](../../../../../public/images/tutorials/sensors/gps/ROS-Preparation/1.png)

（2）知道了裝置號ID，那麼接下來就編寫rules檔案，綁定好連接埠，終端輸入，

```
sudo gedit /etc/udev/rules.d/my_serial.rules 
```

把以下內容複製到裏邊，

```
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="myserial"
```

儲存後退出，然後給它執行權限，終端輸入，

```
sudo chmod 777 /etc/udev/rules.d/my_serial.rules 
```

（3）重新拔插GPS模組，終端輸入ll /dev/myserial檢查是否綁定成功，出現以下畫面則表示成功綁定，

```
ll /dev/myserial
```

![圖 2](../../../../../public/images/tutorials/sensors/gps/ROS-Preparation/2.png)

<RelatedProducts slugs="gps-beidou-module" />
