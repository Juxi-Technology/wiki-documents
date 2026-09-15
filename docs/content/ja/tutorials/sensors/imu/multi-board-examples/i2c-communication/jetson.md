---
title: "Jetson"
description: "Jetson Orin NX で IMU 姿勢センサーを I2C 接続するチュートリアル。配線、デバイス確認、ドライバ導入、データ取得、校正の手順を解説します。"
---

# Jetson

## 1. デバイスの接続

本チュートリアルはJetson Orin NXマザーボードを例にしています。

IMU姿勢センサーを下図のようにJetson Orin NXのI2Cインターフェースに接続します。

![1. デバイスの接続 – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NGE4ODJlYmE0NTQ2ZmFkMjJjNzZiNzYxNTk4YmU1NThfZGM5ZDA4MDdiZmU3MGI0YTZhMDBkYWZjZTJhZjU4YzJfSUQ6NzYwMjU5MzY2NjkxMzM3MzE0OV8xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)

![1. デバイスの接続 – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MjI3ZGUyMjE4N2Q1ZjkwZTk5OTNmOWZjMjRjYzE4YWVfZTIxMjNjMjE5MmU4ZDIyMDE1YTM4YzZhNWM1OGVjODVfSUQ6NzYwMjU5MzYwODU4ODA4NjIzMV8xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)

## 2. デバイス状態の確認

まず I2Ctool をインストールします。ターミナルで入力：

```PowerShell
sudo apt-get update
sudo apt-get install -y i2c-tools
```

I2Cデバイスの確認

\`\`\`PowerShell
sudo i2cdetect -y -r -a 7
\`\`\`

![2. デバイス状態の確認 – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NWFiNTRkMWNlYWYyYmVlMjQ0YTkxMGRmYzI5ZmI3MTVfOTRlMjA4MzMzM2RiNjFiOTlmODcxYWFiOTZiMDRjYjdfSUQ6NzYwMzIxMzAxMDYwOTgxODU4Ml8xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)

## 3. ドライバライブラリのインストール

3.1 **コードに必要なpythonライブラリのインストール**

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

3.2 ファイルの転送

IMU_ROS2.zip

MobaXterm を使ったファイル転送にまだ慣れていない方は、以下のページで MobaXterm の詳しいインストール方法と操作方法をご確認ください: [文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

MobaXtermソフトで解凍したファイルを Jetson Orin NX にドラッグします。

![3. ドライバライブラリのインストール – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=N2I1Njk5NDIyOWI0NmFlYWY1YzcxOTNmODc1NTA3ODRfM2MyNjQ2YjA4YWUwNGQwMzdjM2ZlZWUzZDRkN2M5ZTlfSUQ6NzYwMjU5MzM2MTQ4ODkzOTk4M18xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)

## 4. imuデータの確認

**~/IMU_Library ディレクトリに入り、IMU_Serial_Library.py ファイルを実行**

```PowerShell
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# 运行 IMU 数据打印文件
python3 -m IMU_Library.IMU_I2C_Library
```

![4. imuデータの確認 – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NWMwZWNkYTdjMDE0ZGI1OGZiZjM3M2I1Mjk4ZmJmNzVfYzZlYjVjMTNiNWQ0MDZhNzFmZmVlNzUyNzE3ZWUzYjFfSUQ6NzYwMzIxMjQ3Mjc4MzQ3Mzg4OV8xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)

注意：上記は10軸IMUのデータ読み取りです。6軸は磁力計（Magnetometer）と気圧計（Barometer）データがなく、9軸は気圧計（Barometer）データがありません。

## **5. IMUキャリブレーション**

**~/IMU_Library ディレクトリに入り、imu_calibration_tool.py ファイルを実行**

```PowerShell
cd ~/IMU_Library

# 运行 IMU 校准代码文件 --I2C通讯校准
# 执行所有校准（整体、磁力计、温度）
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 7

# 仅整体校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 7 --calibrate imu

# 仅磁力计校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 7 --calibrate mag

# 仅温度校准
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 7 --calibrate temp
```

![5. IMUキャリブレーション – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OGUxOGUxYjRiMzBkYzIwYTQxM2FmYzgzZjlhMzZhMjZfYzZiZmQ2ZTEwZmE1YjAzMjBkYzY1MjFlMjc1NTZjNTJfSUQ6NzYwMzIxMjgwNzgyMzYyNTQ0Ml8xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)

## 6. 注意事項

Jetson Orin NXを使用する場合、実際に合わせてI2Cバスの番号を変更する必要があります。変更箇所は下図の通りです。通常は7号バスです

![6. 注意事項 – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTI2ZmQzNTJhMWM5NmQ2YmM5ODE5NDI1Yzk3MTYxMTBfNGQ2MDk5YmI2YjU1ZmQxMzk5NGJmMDc0MjFhZTRhODRfSUQ6NzYwMjU5Nzk4ODE3MDQ4NDk2NF8xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)

![6. 注意事項 – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTYyYWUwNDQyOTFkZGQzZDc5NmM4NmZiOWQ3OTc2MzNfNDNhNGQ5NGJiM2M0NmMwNWFlMDAyYmIxZGNkOTU0MzJfSUQ6NzYwMjU5ODAxMzU5MjMyNTM0M18xNzgwMDUyNzk1OjE3ODAxMzkxOTVfVjM)






