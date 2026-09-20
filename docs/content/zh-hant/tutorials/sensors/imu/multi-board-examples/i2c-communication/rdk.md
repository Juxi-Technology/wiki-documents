---
title: "RDK"
description: "IMU 慣導模組 I2C 通訊教程(RDK X5 版)：設備連接、驅動庫安裝與 IMU 校準操作。"
---

# RDK

## 1.連接設備

本教程以RDK X5主板的？版本的鏡像爲例。

將IMU姿態傳感器按照下圖連接到RDK X5的I2C接口。

![1.連接設備 – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/1.jpg)

![1.連接設備 – 2](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/2.jpg)

## 2.查看設備狀態

查看I2C設備

```PowerShell
python3 /app/40pin_samples/test_i2c.py
```

![2.查看設備狀態 – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/3.png)

## 3.安裝驅動庫

3.1**安裝代碼所需python庫**

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

3.2傳輸文件

IMU_ROS2.zip

如果還不會使用MobaXterm傳輸文件的朋友，請查看以下網頁MobaXterm詳細安裝和操作方法：[文件遠程傳輸](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

通過MobaXterm軟件將 解壓後的文件 拖入 樹莓派5 上。

![3.安裝驅動庫 – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/4.png)

## 4.查看imu數據

**進入 ~/IMU_Library目錄，運行IMU_Serial_Library.py文件**

```PowerShell
cd ~/imu_ros1/src/IMU_ROS1/IMU_Library
# 或
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# 運行 IMU 數據打印文件
python3 -m IMU_Library.IMU_I2C_Library
```

![4.查看imu數據 – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/5.png)

注意：以上爲10軸IMU的數據讀取，6軸無磁力計（Magnetometer）與氣壓計（Barometer）數據，9軸無氣壓計（Barometer）數據。

## **5.IMU校準**

**進入 ~/IMU_Library目錄，運行imu_calibration_tool.py文件**

```PowerShell
cd ~/IMU_Library

# 運行 IMU 校準代碼文件 --I2C通訊校準
# 執行所有校準（整體、磁力計、溫度）
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0

# 僅整體校準
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate imu

# 僅磁力計校準
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate mag

# 僅溫度校準
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate temp
```

![5.IMU校準 – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/6.png)

## 6.注意事項

使用RDK X5主板時，需要根據實際情況修改I2C的總線的序號，修改位置如下圖。通常是0號總線。

![6.注意事項 – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/7.png)

![6.注意事項 – 2](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk/8.png)



