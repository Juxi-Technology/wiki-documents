---
title: ROS1応用
description: "システム構成：ubuntu20.04"
---

# ROS1応用

**システム構成：ubuntu20.04**

**ROS1バージョン：noetic**

### ROS1環境設定

1. **ROS1インストールソースの設定**

```PowerShell
sudo sh -c '. /etc/lsb-release && echo "deb http://mirrors.tuna.tsinghua.edu.cn/ros/ubuntu/ `lsb_release -cs` main" > /etc/apt/sources.list.d/ros-latest.list'
```

2. **Keyの設定**

```PowerShell
sudo apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654
```

```Plain Text
sudo apt update
```

3. **ROS1のインストール（公式ダウンロード）**

```PowerShell
sudo apt install ros-noetic-desktop-full
```

プロキシ加速ダウンロードでROS1をインストール
wget http://fishros.com/install -O fishros && . fishros

4. **環境変数の設定**

```Plain Text
echo "source /opt/ros/noetic/setup.bash" >> ~/.bashrc
```

```PowerShell
source ~/.bashrc
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

```Bash
sudo usermod -aG dialout ash
```

### 準備済みの圧縮パッケージのインポート

1. **飞书の同级ディレクトリにあります**[IMU_ROS1.zip](https://juxitech.feishu.cn/wiki/BcWGwW2yDiXex9k6qjTcleTvnPb)

2. **解凍後、ファイル転送ソフトで仮想マシンに転送します**

3. **IMU_Libraryライブラリのインストール**

```PowerShell
cd IMU_ROS1
# 下载解压IMU_ROS1压缩文件后，进入到IMU_Library目录下，运行以下指令
cd IMU_Library
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

**レンダリングに問題が発生した場合は、以下のコマンドを実行してください**

```PowerShell
sudo apt-get install ros-noetic-imu-filter-madgwick
sudo apt-get install ros-noetic-rviz-imu-plugin
```

### ROS1プロジェクトの構築

1. **/homeディレクトリで新しいターミナルを開き、ros1ワークスペースを作成**

```PowerShell
mkdir imu_ros1
cd imu_ros1
mkdir src
cd src/
catkin_init_workspace
```

2. **転送したファイルIMU_ROS1フォルダを~/imu_ros1/src/ディレクトリにコピー**

```PowerShell
# 复制 IMU_ROS1 文件夹到新建的 src 目录下
cp -r ~/IMU_ROS1 ~/imu_ros1/src
cd ~/imu_ros1
catkin_make
```

3. **作業ディレクトリ~/imu_ros1を環境変数に書き込む**

```PowerShell
# 编辑 ~/.bashrc
sudo gedit ~/.bashrc
# 把下面命令写到末尾
source ~/imu_ros1/devel/setup.bash
source ~/.bashrc
```

### ROS1ノードの起動

1. **ターミナルを開き、roscoreを入力してノードを起動**

```PowerShell
# 启动roscore
roscore
# 新开终端，设置环境，启动节点
source ~/imu_ros1/devel/setup.bash
```

2. **Pythonスクリプトに実行権限を付与（重要）**

スクリプトがある `scripts` ディレクトリに入り、`chmod +x` コマンドで実行権限を付与します（`+x` は実行権限の追加）：

```PowerShell
# 进入imu_driver.py所在目录（按你的实际路径）
cd ~/imu_ros1/src/IMU_ROS1/scripts/
# 赋予可执行权限（仅需执行1次，永久生效）
chmod +x imu_driver.py
chmod +x mag_visualizer.py
```

imu_ros1フォルダに戻ってimu_driver.pyを実行
```Plain Text
cd ~/imu_ros1
```

```Plain Text
rosrun IMU_ROS1 imu_driver.py
```

### IMUデータの出力

1. **新しいターミナルを開き、imuトピックを確認**

```PowerShell
# 查看当前发布的所有话题
rostopic list
```

2. **トピックデータを出力**

```PowerShell
# 打印IMU原始数据
rostopic echo /imu/data_raw
# 打印磁力计数据
rostopic echo /imu/mag
```

### RViz可視化

1. **コマンドを実行してrvizを起動**

```PowerShell
roslaunch IMU_ROS1 imu_display.launch
```

### よくある質問

1. ノード起動時に失敗する場合は、以下のコマンドを試してください

```PowerShell
# 在~/imu_ros1目录下运行
source devel/setup.bash
# 端口号问题
sudo chmod 666 /dev/imu-serial
```

2. RVIZ可視化で三軸の表示が非常に小さい場合、Enable axes を再チェックしてください
