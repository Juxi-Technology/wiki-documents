---
title: 高精度IMU姿勢センサー 使用チュートリアル
description: "1. コード実行に必要なpythonライブラリをインストール"
# ---

高精度IMU姿勢センサー 使用チュートリアル

### 圧縮パッケージ [IMU_ROS1.zip](https://juxitech.feishu.cn/wiki/BcWGwW2yDiXex9k6qjTcleTvnPb) または [IMU_ROS2.zip](https://juxitech.feishu.cn/wiki/ZL8XwrPriifnASk41AhcoPj1nnb) をダウンロードし、解凍後に ~/IMU_Library に移動してください

1. **コード実行に必要なpythonライブラリをインストール**

```PowerShell
pip install pyserial
pip install smbus2
```

2. **IMU_Library ライブラリをインストール**

```PowerShell
# コード実行に必要なpythonライブラリをインストール
pip install -e .

# ライブラリとその依存をインストール
python setup.py install
```

3. **ポートマッピングを設定**

```PowerShell
# 抜き差し後にポートが変わるのを防ぐため、ポートマッピングを設定
sudo gedit /etc/udev/rules.d/99-serial-imu.rules

# gedit コマンドがない場合は先にインストール
sudo apt install gedit

# マッピング内容を記入
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"

# パラメータ説明：
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

# 出力例：
lrwxrwxrwx 1 root root 7 1月 22 10:00 /dev/imu-serial -> ttyUSB0
```

### シリアル通信

1. **~/IMU_Library ディレクトリに入り、IMU_Serial_Library.py ファイルを実行**

```PowerShell
cd ~/imu_ros1/src/IMU_ROS1/IMU_Library/IMU_Library
# IMU シリアルデータ出力ファイルを実行
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# または
python3 IMU_Serial_Library.py
```

### I2C 通信

1. **~/IMU_Library ディレクトリに入り、IMU_I2C_Library.py ファイルを実行**

```PowerShell
cd ~/IMU_Library/IMU_Library

# IMU I2C データ出力ファイルを実行
python3 IMU_I2C_Library.py
```

### imu 校正

1. **~/IMU_Library ディレクトリに入り、imu_calibration_tool.py ファイルを実行**

```PowerShell
cd ~/IMU_Library/IMU_Library

# IMU 校正コードファイルを実行 --シリアル通信校正
# すべての校正を実行（全体、磁力計、温度）
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial

# 全体校正のみ
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate imu

# 磁力計校正のみ
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate mag

# 温度校正のみ
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate temp

# I2C 通信校正
# IMU 校正コードファイルを実行 --I2C 通信校正
python3 imu_calibration_tool.py --mode i2c --port 1

# 全体校正のみ
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate imu

# 磁力計校正のみ
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate mag

# 温度校正のみ
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate temp
```


---

## 公式リポジトリサンプル

鉅犀科技は IMU 慣性航法モジュール向けの完全なオープンソースコードを提供しています：[GitHub](https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module)
