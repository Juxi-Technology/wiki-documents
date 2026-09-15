---
title: "ROS2 応用"
description: "システム構成：ubuntu22.04"
---

# ROS2 応用

> **[ストアで購入](https://www.juxitech.com/ja/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


**システム構成：ubuntu22.04**

**ROS2バージョン：humble**

### ROS2環境設定

1. **ダウンロードソースの更新**

```PowerShell
sudo apt update
```

2. **ros2ダウンロードコマンドを入力**

```PowerShell
wget http://fishros.com/install -O fishros && . fishros
```

### デバイスを仮想マシンに接続

1. **デバイスの確認**

```PowerShell
ll /dev/ttyUSB*
```

2. **ポートマッピングの作成**

```PowerShell
sudo gedit /etc/udev/rules.d/99-serial-imu.rules
```

3. **マッピングファイルの内容を記入**

```PowerShell
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"
```

4. **保存して終了、コマンドを実行してルールを有効化**

```PowerShell
sudo udevadm trigger
```

```Plain Text
sudo service udev reload
```

```Plain Text
sudo service udev restart
```

5. **検証**

```PowerShell
ll /dev/imu-serial
```

### 準備済みの圧縮パッケージのインポート

1. **飞书の同级ディレクトリにあります**[IMU_ROS2.zip](https://juxitech.feishu.cn/wiki/ZL8XwrPriifnASk41AhcoPj1nnb)

2. **ファイル転送ソフトで仮想マシンに転送します**

3. **IMU_Libraryライブラリのインストール**

```PowerShell
# 下载解压IMU_ROS2压缩文件后，进入到IMU_Library目录下，运行setup.py
cd IMU_ROS2/IMU_Library
# 安装库及其依赖
pip install -e .
# 或使用setup.py安装
python setup.py install
```

### python関連ライブラリのインストール

```PowerShell
sudo pip3 install pyserial
sudo pip3 install smbus2
```

### ROS2プロジェクトの構築

1. **~/IMU_ROS2ディレクトリに戻ります**

```PowerShell
cd IMU_ROS2
colcon build --symlink-install
```

1. **作業ディレクトリ~/IMU_ROS2を環境変数に書き込む**

```PowerShell
# 编辑 ~/.bashrc
sudo gedit ~/.bashrc
# 把下面命令写到末尾
source ~/IMU_ROS2/install/setup.bash
```

コンパイル成功後、以下のコマンドでimu_ros2機能パッケージに実行可能ファイルがあるか確認します
`ros2 pkg executables imu_ros2`

### ROS2ノードの起動

```PowerShell
source install/setup.bash
ros2 run imu_ros2 imu_publisher
```

### IMUデータの出力

1. **新しいターミナルを開き、imuトピックを確認**

```PowerShell
ros2 topic list
```

2. **/imu/dataトピックデータを出力**

```PowerShell
ros2 topic echo /imu/data
```

3. **新しいターミナルを開き、msgトピックを確認**

```PowerShell
ros2 topic echo /imu/mag
```

### RViz2可視化

1. **コマンドを実行し、rviz可視化インターフェースを開く**

```PowerShell
ros2 launch imu_ros2 imu_visualization.launch.py
```

### よくある質問

1. ノード起動時に失敗する場合は、以下のコマンドを試してください

```PowerShell
# 在~/IMU_ROS2目录下运行
source install/setup.bash
# 端口号问题
sudo chmod 666 /dev/imu-serial
```
