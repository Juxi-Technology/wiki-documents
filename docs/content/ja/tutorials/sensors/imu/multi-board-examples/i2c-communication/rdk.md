---
title: RDKシリーズ
description: "本チュートリアルはRDK X5マザーボードを例にしています。"
---

# RDKシリーズ

## 1. デバイスの接続

本チュートリアルはRDK X5マザーボードを例にしています。

IMU姿勢センサーを下図のようにRDK X5のI2Cインターフェースに接続します。

![1. デバイスの接続 – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OWFkNTFjYzkwN2VlOTNhMTYzZTk4OGE0Y2I0MWQwYTJfNWViZWVlZWE1NGIwYjIxNjljOWE3MDQ2OWYzNGYzNjlfSUQ6NzYwMjU5NDE1ODEyNTI3MjI2OV8xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)

![1. デバイスの接続 – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjhhOTgyYjQxNmJhZjVlYjk5M2Y4ODE3OGVkYWM2MmFfMmFjZDM5N2U3Y2IxODQzMDFmNDBiZDNmYTQwZWQyNmJfSUQ6NzYwMjU5ODYyMDIzNTkxMDMyMl8xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)

## 2. デバイス状態の確認

まず I2Ctool をインストールします。ターミナルで入力：

```PowerShell
sudo apt-get update
sudo apt-get install -y i2c-tools
```

I2Cデバイスの確認

\`\`\`PowerShell
sudo i2cdetect -y -r -a 0
\`\`\`

![2. デバイス状態の確認 – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTMyZTdiNDQ5OGMxNjhlMzA3YzA0MTRkMmY0ZWUwNjNfNjA2Y2FmZTU1NjdjNWYyNzI0ZGRhOWFjZjg3OGExMzdfSUQ6NzYwNTAzOTAxMDYwOTgxODU4M18xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)

## 3. ドライバライブラリのインストール

3.1 **コードに必要なpythonライブラリのインストール**

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

3.2 ファイルの転送

[IMU_ROS2.zip]

如果还不会使用MobaXterm传输文件的朋友，请查看以下网页MobaXterm详细安装和操作方法：[文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

MobaXtermソフトで解凍したファイルを RDK X5 にドラッグします。

![3. ドライバライブラリのインストール – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjcyMTE3MTJiMWUzMjhhZTlkYTgyNDVkMGJmZDIyZTFfZWI4Mzc5MjUyZDk3Yjg3ODgzMTAwZDY2YjdiZTAzYWVfSUQ6NzYwMjU5MzgxMDE3MDAyMjg2NF8xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)

## 4. imuデータの確認

**~/IMU_Library ディレクトリに入り、IMU_Serial_Library.py ファイルを実行**

```PowerShell
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# 运行 IMU 数据打印文件
python3 -m IMU_Library.IMU_I2C_Library
```

![4. imuデータの確認 – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NjNjN2YzOTMyNWUyM2RjOGYyNDRiNjg3MDA2NzlhN2ZfNWI4NGYzM2NmYWExYjRlZjQ3YTY1Y2I2NDMxYmU5YTNfSUQ6NzYwMjU5MzgwOTY2NjkxOTM2Nl8xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)

注意：上記は10軸IMUのデータ読み取りです。6軸は磁力計（Magnetometer）と気圧計（Barometer）データがなく、9軸は気圧計（Barometer）データがありません。

## **5. IMUキャリブレーション**

**~/IMU_Library ディレクトリに入り、imu_calibration_tool.py ファイルを実行**

```PowerShell
cd ~/IMU_Library

# 运行 IMU 校准代码文件 --I2C通讯校准
# 执行所有校准（整体、磁力计、温度）
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0

# 仅整体校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate imu

# 仅磁力计校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate mag

# 仅温度校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate temp
```

![5. IMUキャリブレーション – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZWM5YTZmOTIyZDBmZjk4OTkzNWEwYjI2ZjgxMDE4MGNfNGVkYzlkZjU5YmNhNmE3N2YwZGJiNDcwMzFlN2U0YWJfSUQ6NzYwMjU5MzgwODE2NTUwNjAwOV8xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)

## 6. 注意事項

RDK X5を使用する場合、実際に合わせてI2Cバスの番号を変更する必要があります。変更箇所は下図の通りです。通常は0号バスです

![6. 注意事項 – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjhmNGIzMGZiOGI1ZTM3MjA1MGQ5ZDc4NWYwYjcxMjVfNTZkMjFjOGY1OTQwMzU3ODhlY2M2MTg1ZGJiZGVhZWJfSUQ6NzYwMjU5NTU1MjI1NzM5NTY0NF8xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)

![6. 注意事項 – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NmFmMzJjYWQ2MmZlNTBmOGE0NDM0NzZmZWQxZDNkN2ZfODUzNmYzMTE4OTFhMGRjNTgyODFmYTdjMGM4ZjEzY2RfSUQ6NzYwMjU5NTY5NTc1ODU2MDIxMl8xNzgwMDUyODE4OjE3ODAxMzkxMThfVjM)






