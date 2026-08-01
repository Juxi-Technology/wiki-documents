# 樹莓派5

## 1.連接設備

本教程以樹莓派5主板，官方64位版本的鏡像爲例。

將IMU姿態傳感器按照下圖連接到樹莓派5的I2C接口。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZWM5ODBiMDZkNDVjNzhhNTVlODBjMDQ5ZDMxYjhlOWRfMjQxZDc2Y2JlNTFhMWZjNTkwMmM0ZjEwZTJlMDk5MmRfSUQ6NzYzODk2NjYyNjcyOTMzMTY0MF8xNzgwNDA0MzI4OjE3ODA0OTA3MjhfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZGJjNjIzMzE5ZmEyNjY1NWJlNGY5OGE0OTkyYzc1MWJfZTlkMmZlMThiNWI4MDhkMmE5YzM2OWRiM2U5NGU3YzFfSUQ6NzYzODk2NjYyNzE5MDY1NTk1N18xNzgwNDA0MzI4OjE3ODA0OTA3MjhfVjM)

## 2.查看設備狀態

首先安裝 I2Ctool，終端輸入：

```PowerShell
sudo apt-get update
sudo apt-get install -y i2c-tools
```

查看I2C設備

```PowerShell
sudo i2cdetect -y -r -a 1
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTI0MDNiMjliNWIzOTc5NWViNmJiMDc0N2ViMWNmZTdfNTg4ODAwNmQ1MjM5NDA0ZTA5MjllNTI2MTIxYmM5ZGFfSUQ6NzYzODk2NjYyNjA2Njg5Mzc5M18xNzgwNDA0MzI4OjE3ODA0OTA3MjhfVjM)

## 3.安裝驅動庫

3.1**安裝代碼所需python庫**

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

3.2傳輸文件

[IMU_ROS2.zip]

如果還不會使用MobaXterm傳輸文件的朋友，請查看以下網頁MobaXterm詳細安裝和操作方法：[文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

通過MobaXterm軟件將 解壓後的文件 拖入 樹莓派5 上。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzM2ZWNlZjllZjY0OGE3Mzk3OGE3NTkzNjVjN2MyNjNfZjc5YTVmYzkxMTcyMGY2MGUwNjViZDIxNTY3YWEwYjhfSUQ6NzYzODk2NjYyNDkwNDg3NDkzOV8xNzgwNDA0MzI4OjE3ODA0OTA3MjhfVjM)

## 4.查看imu數據

**進入 ~/IMU_Library目錄，運行IMU_Serial_Library.py文件**

```PowerShell
cd ~/imu_ros2/src/IMU_ROS1/IMU_Library

# 运行 IMU 数据打印文件
python3 -m IMU_Library.IMU_I2C_Library
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MzVkNTlmMjg5NmE4ODY1NDQzOTM5MzEzYmVjY2YxMDRfOTFkNzllYWI5MjMzNmYzMjNjMjg4MzYzNTliOWRiNTRfSUQ6NzYzODk2NjYyNjgyNTk4MDg4MF8xNzgwNDA0MzI4OjE3ODA0OTA3MjhfVjM)

注意：以上爲10軸IMU的數據讀取，6軸無磁力計（Magnetometer）與氣壓計（Barometer）數據，9軸無氣壓計（Barometer）數據。

## **5.IMU校準**

**進入 ~/IMU_Library目錄，運行imu_calibration_tool.py文件**

```PowerShell
cd ~/IMU_Library

# 运行 IMU 校准代码文件 --I2C通讯校准
# 执行所有校准（整体、磁力计、温度）
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1

# 仅整体校准
python3-m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate imu

# 仅磁力计校准
python3-m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate mag

# 仅温度校准
python3-m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate temp
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MDU2YzMyMjIzZWIwYjY1NWNhM2EzMTA4NGQ2ZDE4MThfMmEwYTQ3Y2YyMDdiMWYxNWFmOTY5MTNiYWYxYjFhNGNfSUQ6NzYzODk2NjYyNzQxMjkzNzY1Nl8xNzgwNDA0MzI4OjE3ODA0OTA3MjhfVjM)

## 6.注意事項

樹莓派5需要提前開啓i2c引腳。

開啓操作如下：

終端運行命令

```PowerShell
sudo raspi-config
```

通過鍵盤的方向鍵選擇，選中後按鍵盤Enter鍵進入

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTU0MjdhOTY1ZmJiZjE2ZmRmNDZlNGI4NWRkMmZiNzRfNDE5NTdhZTZiNjk0MWM2MjZmNGM2OGYxMGVhM2ViMjBfSUQ6NzYzODk2NjYyNjE5NjY3MTQ1OV8xNzgwNDA0MzI4OjE3ODA0OTA3MjhfVjM)

選擇I2C，選中後按鍵盤Enter鍵進入，

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzZlOTg2NTJiYzcxMGEzNDZiZmI4ZmZjMzk5NDA1NTBfMzMzMDU0OTcyOWY4MjkyNWY5YWQ3N2NlZDViNzNhYmRfSUQ6NzYzODk2NjYyNjU2NTczNzQyOV8xNzgwNDA0MzI4OjE3ODA0OTA3MjhfVjM)

選中I2C後，按鍵盤Enter鍵，控制方向鍵選擇Yes，再按Eneter鍵確認。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OGE2YWRlZDlkMTZmZDg3MGNlNjA0MDNlMzA5ODgzMThfYzYyNWFhNGVlM2IzNWQ0NGQ1YmQzNGY5Njg5MzlhMjdfSUQ6NzYzODk2NjYyNDY5MTI2MDM2Nl8xNzgwNDA0MzI4OjE3ODA0OTA3MjhfVjM)

按Enter鍵確認

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=Y2RiZDljMDJkNjE2MDk2ZGNiZGExZmM4N2U1ZDZlM2JfNzJiZTRjMjZkZjJhNzI3NTdkNjdjYzA0ZjUzMjQwMWJfSUQ6NzYzODk2NjYyNzM3MDk2MTg3Nl8xNzgwNDA0MzI4OjE3ODA0OTA3MjhfVjM)

按方向鍵選擇Finish，然後按Enter鍵，退出配置。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OWFlZjNlODgxNzUwNGUwMmVkM2VlYjQ5N2U0YzFhMWFfNDNiMTBlOWYzZTdiNjIxNjZlNGRjYmY1YTQxNTU4NTdfSUQ6NzYzODk2NjYyNDcyODkyNzE2Ml8xNzgwNDA0MzI4OjE3ODA0OTA3MjhfVjM)



