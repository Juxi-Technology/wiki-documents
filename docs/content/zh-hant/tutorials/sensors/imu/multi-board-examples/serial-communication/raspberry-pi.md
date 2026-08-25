---
title: 樹莓派5
description: "本教程以樹莓派5主板，官方64位版本的鏡像爲例。"
---

# 樹莓派5

## 1.連接設備

本教程以樹莓派5主板，官方64位版本的鏡像爲例。

將IMU姿態傳感器通過type-c線插在主控的USB上。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YWE2NWYzZGUzNzgzMGFkYjY4NWUwYjc0ZDMxOGEwMzhfZWYxNGI4OTg2NGJkNTYwYTU3ZTM5NzJkYzhlYmU2NWJfSUQ6NzYzODk2NTkxMDMxNzM3MDMzNV8xNzgwNDA0NDYyOjE3ODA0OTA4NjJfVjM)

## 2.查看設備狀態

查看設備id

```PowerShell
lsusb
```

查看設備號

```PowerShell
ls -l /dev/ttyU*
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTY4NmMwZjg0NDEzZmNiODJmYjE0N2RkZWVlZTM2ODNfMjBmYTY1MGIyNGFhYzU0Y2NkZjk5NzMyZWQyYTcwM2FfSUQ6NzYzODk2NTkxMzg2OTM3MjM0OF8xNzgwNDA0NDYyOjE3ODA0OTA4NjJfVjM)

設置端口映射

```Bash
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

## 3.安裝驅動庫

**3.1安裝代碼所需python庫**

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

**3.2傳輸文件**

[IMU_ROS2.zip]

如果還不會使用MobaXterm傳輸文件的朋友，請查看以下網頁MobaXterm詳細安裝和操作方法：[文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

通過MobaXterm軟件將 解壓後的文件 拖入 樹莓派5 上。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmM2NjBjMmJhYmQ2Y2JkMTYzOWZjNjNiMGRlYmExMDhfYzk4NjVlYzNjYjY3ZTk5Y2VmYTFkZDY4NjY3YzlkNTZfSUQ6NzYzODk2NTkxMjg2NzE5NTg3N18xNzgwNDA0NDYyOjE3ODA0OTA4NjJfVjM)

## 4.查看imu數據

**進入 ~/IMU_Library目錄，運行IMU_Serial_Library.py文件**

```PowerShell
cd ~/IMU_ROS2/IMU_Library

# 运行 IMU 数据打印文件
python3 -m IMU_Library.IMU_Serial_Library
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTc4MDYzNTczZjE4ZTk3YjQ4Y2ExOTk2ZTBhOTY4NGNfMTliMTlkNThjYTQ0ZmI1ODg2NTdlNWVkOGEwODZmYzFfSUQ6NzYzODk2NTkxMzU2MzM2ODQyMl8xNzgwNDA0NDYyOjE3ODA0OTA4NjJfVjM)

注意：以上爲10軸IMU的數據讀取，6軸無磁力計（Magnetometer）與氣壓計（Barometer）數據，9軸無氣壓計（Barometer）數據。

## **5.IMU校準**

**進入 ~/IMU_Library目錄，運行imu_calibration_tool.py文件**

```PowerShell
cd ~/IMU_Library

# 运行 IMU 校准代码文件 --串口通讯校准
# 执行所有校准（整体、磁力计、温度）
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial

# 仅整体校准
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial --calibrate imu

# 仅磁力计校准
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial --calibrate mag

# 仅温度校准
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial --calibrate temp
```

## 6.注意事項

如果可以查到設備ID，但是無法查到設備號，可以參考下面的命令安裝ch34x驅動

```PowerShell
sudo apt remove brltty
git clone https://github.com/clhchan/CH341SER.git
cd CH341SER
make -j6
sudo make install
sudo modprobe ch34x
```



