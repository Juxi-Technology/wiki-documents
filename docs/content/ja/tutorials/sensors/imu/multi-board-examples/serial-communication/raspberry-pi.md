---
title: "ラズベリーパイ"
description: "ラズベリーパイ 5 で IMU 姿勢センサーを USB シリアル接続するチュートリアル。ドライバ導入からデータ取得、校正までの手順を解説します。"
---

# ラズベリーパイ

## 1. デバイスの接続

本チュートリアルはツリーパイ5マザーボードを例にしています。

IMU姿勢センサーをType-CケーブルでホストのUSBに挿します。

![1. デバイスの接続 – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/raspberry-pi/1.jpg)

## 2. デバイス状態の確認

デバイスIDの確認

```PowerShell
lsusb
```

デバイス番号の確認

```PowerShell
ls -l /dev/ttyU*
```

ポートマッピングの設定

```Bash
# 抜き差し後にポートが変わるのを防ぐため、ポートマッピングを設定
sudo gedit /etc/udev/rules.d/99-serial-imu.rules
# gedit コマンドがない場合は先にインストール
sudo apt install gedit
# マッピング内容を記入
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"
# パラメータ説明
`--mode`: 通信モード。`serial`（シリアル）または `i2c`
`--port`: シリアルポート名（例：`/dev/ttyUSB0`）または I2C ポート番号（例：`7`）
`--rate`: データ出力頻度(Hz)、デフォルト 10Hz
`--debug`: デバッグモードを有効化、詳細情報を表示
# 保存して終了し、ルールを有効化するコマンドを実行
sudo udevadm trigger
sudo service udev reload
sudo service udev restart
# 検証
ll /dev/imu-serial
# 出力例
lrwxrwxrwx 1 root root 7 1月 22 10:00 /dev/imu-serial -> ttyUSB0
```

## 3. ドライバライブラリのインストール

3.1 **コードに必要なpythonライブラリのインストール**

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

3.2 **ファイルの転送**

IMU_ROS2.zip

MobaXterm を使ったファイル転送にまだ慣れていない方は、以下のページで MobaXterm の詳しいインストール方法と操作方法をご確認ください: [文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

MobaXtermソフトで解凍したファイルを ツリーパイ5 にドラッグします。

![3. ドライバライブラリのインストール – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/raspberry-pi/2.png)

## 4. imuデータの確認

**~/IMU_Library ディレクトリに入り、IMU_Serial_Library.py ファイルを実行**

```PowerShell
cd ~/IMU_ROS2/IMU_Library
# IMU シリアルデータ出力ファイルを実行
python3 -m IMU_Library.IMU_Serial_Library
```

![4. imuデータの確認 – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/raspberry-pi/3.png)

注意：上記は10軸IMUのデータ読み取りです。6軸は磁力計（Magnetometer）と気圧計（Barometer）データがなく、9軸は気圧計（Barometer）データがありません。

## **5. IMUキャリブレーション**

**~/IMU_Library ディレクトリに入り、imu_calibration_tool.py ファイルを実行**

```PowerShell
cd ~/IMU_Library
# IMU 校正コードファイルを実行 --シリアル通信校正
# すべての校正を実行（全体、磁力計、温度）
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial
# 全体校正のみ
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial --calibrate imu
# 磁力計校正のみ
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial --calibrate mag
# 温度校正のみ
python3 -m IMU_Library.imu_calibration_tool --mode serial --port /dev/imu-serial --calibrate temp
```

![5. IMUキャリブレーション – 1](../../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/serial-communication/raspberry-pi/4.png)

## 6. 注意事項

デバイスIDは確認できたがデバイス番号を確認できない場合、以下のコマンドでch34xドライバをインストールできます

```PowerShell
sudo apt remove brltty
git clone https://github.com/clhchan/CH341SER.git
cd CH341SER
make -j6
sudo make install
sudo modprobe ch34x
```
