---
title: "RDK"
description: "IMU 慣導模組串列埠通訊教程(RDK X5 版)：設備連接、串列埠映射設定與驅動庫安裝校準。"
---

# RDK

## 1.連接設備

本教程以RDK X5主板的？版本的鏡像爲例。

將IMU姿態傳感器通過type-c線插在主控的USB上。

![1.連接設備 – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YmZjYjdjNzllNTdjMzhjZWE1MDcyY2FjNzc4YmYzNGRfOTc0ZjFiYmMxYWFlYmM2ZjBiNTNhOTFhMDA2NGZlMzhfSUQ6NzYzODk2NjEzNzc1MzY4NDkzMF8xNzgwNDA0NDg2OjE3ODA0OTA4ODZfVjM)

## 2.查看設備狀態

查看設備id

```PowerShell
lsusb
```

查看設備號

```PowerShell
ls -l /dev/ttyU*
```

![2.查看設備狀態 – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=Nzc5MDlmY2M4MzdmOTI0MjU0OWEwMTY1MWQyNjkzZjJfODk5NTU3Y2NlM2FkNjhiMmM2NWNkYWEzNGVjNTBjMjVfSUQ6NzYzODk2NjE0MTUxNTMyMDI5MF8xNzgwNDA0NDg2OjE3ODA0OTA4ODZfVjM)

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

IMU_ROS2.zip

如果還不會使用MobaXterm傳輸文件的朋友，請查看以下網頁MobaXterm詳細安裝和操作方法：[文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

通過MobaXterm軟件將 解壓後的文件 拖入 RDK X5 上。

![3.安裝驅動庫 – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YmI1MWZmYmYwYWZjOGI5YjliOTk4ODJmOTU5MTZlMDZfNzYxOWM5YmM4OThlZTQzZGNiZGMyZWI5NTc4OGZlOWRfSUQ6NzYzODk2NjEzOTc1NDEzODU3MV8xNzgwNDA0NDg2OjE3ODA0OTA4ODZfVjM)

## 4.查看imu數據

**進入 ~/IMU_Library目錄，運行IMU_Serial_Library.py文件**

```PowerShell
cd ~/IMU_ROS2/IMU_Library

# 运行 IMU 数据打印文件
python3 -m IMU_Library.IMU_Serial_Library
```

![4.查看imu數據 – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YWM5MDhmOWRlMGY1YzU2ZmNlMzg3ZDFjNjI0Y2U1NDdfMTc5MGU2Nzc4ZGNhZmExNjgzYzcxYjdmNzY4MjcxMzdfSUQ6NzYzODk2NjEzOTcyODg3NDQyOF8xNzgwNDA0NDg2OjE3ODA0OTA4ODZfVjM)

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



