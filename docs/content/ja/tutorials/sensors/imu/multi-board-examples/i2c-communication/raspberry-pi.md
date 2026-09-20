---
title: "ラズベリーパイ"
description: "本チュートリアルはツリーパイ5マザーボード、公式64ビット版のイメージを例にしています。"
---

# ラズベリーパイ

## 1. デバイスの接続

本チュートリアルはツリーパイ5マザーボード、公式64ビット版のイメージを例にしています。

IMU姿勢センサーを下図のようにツリーパイ5のI2Cインターフェースに接続します。

![1. デバイスの接続 – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/1.jpg)

![1. デバイスの接続 – 2](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/2.png)

## 2. デバイス状態の確認

まず I2Ctool をインストールします。ターミナルで入力：

```PowerShell
sudo apt-get update
sudo apt-get install -y i2c-tools
```

I2Cデバイスの確認

```PowerShell
sudo i2cdetect -y -r -a 1
```

![2. デバイス状態の確認 – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/3.png)

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

MobaXtermソフトで解凍したファイルを ツリーパイ5 にドラッグします。

![3. ドライバライブラリのインストール – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/4.png)

## 4. imuデータの確認

**~/IMU_Library ディレクトリに入り、IMU_Serial_Library.py ファイルを実行**

```PowerShell
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# IMU シリアルデータ出力ファイルを実行
python3 -m IMU_Library.IMU_I2C_Library
```

![4. imuデータの確認 – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/5.png)

注意：上記は10軸IMUのデータ読み取りです。6軸は磁力計（Magnetometer）と気圧計（Barometer）データがなく、9軸は気圧計（Barometer）データがありません。

## **5. IMUキャリブレーション**

**~/IMU_Library ディレクトリに入り、imu_calibration_tool.py ファイルを実行**

```PowerShell
cd ~/IMU_Library

# IMU 校正コードファイルを実行 --I2C 通信校正
# すべての校正を実行（全体、磁力計、温度）
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1

# 全体校正のみ
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate imu

# 磁力計校正のみ
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate mag

# 温度校正のみ
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate temp
```

![5. IMUキャリブレーション – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/6.png)

## 6. 注意事項

ラズベリーパイ5は事前にI2Cピンを有効にする必要があります。<br>有効化手順は以下の通り：<br>ターミナルでコマンドを実行

```PowerShell
sudo raspi-config
```

キーボードの矢印キーで選択し、Enterキーで確定<br>I2Cを選択し、Enterキーで確定<br>I2C選択後、Enterキーを押し、矢印キーでYesを選び、Enterキーで確定。<br>Enterキーで確認<br>矢印キーでFinishを選び、Enterキーで退出。

![6. 注意事項 – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/7.png)

![6. 注意事項 – 2](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/8.png)

![6. 注意事項 – 3](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/9.png)

![6. 注意事項 – 4](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/10.png)

![6. 注意事項 – 5](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi/11.png)
