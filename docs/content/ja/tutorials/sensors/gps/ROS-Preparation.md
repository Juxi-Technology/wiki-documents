---
title: "ROS:事前準備"
description: "（1）ワークスペースを構築した後、gpssrcフォルダ内の内容をワークスペースのsrc内にコピーし、その後colcon buildでコンパイルします。エラーが表示されなければコンパイルに成功したことになります。"
---

# ROS:事前準備

#### 1、GPSモジュールのコンパイル説明

（1）ワークスペースを構築した後、gps_srcフォルダ内の内容をワークスペースのsrc内にコピーし、その後colcon buildでコンパイルします。エラーが表示されなければコンパイルに成功したことになります。

~/gps_ros2ディレクトリで実行

```
colcon build
```

~/gps_ros2ディレクトリで実行 

```
source install/setup.bash
```

（2）機能パッケージの内容説明：

- nmea_navsat_driver：GPSモジュールの起動、GPSモジュールデータの読み取り、GPSデータの描画などの機能；
- nmea_msgs：いくつかのGPSメッセージのmsgファイルを格納
- imu_gps_localization：IMUとGPSデータの融合機能
- gps_goal：緯度経度データをNav2目標ナビゲーションデータに変換

#### 2、GPSポートのバインド

GPSモジュールはシリアルポートを通じてパソコンまたはメインコントローラと接続するため、ポート番号の問題でGPSモジュールがパソコンやメインコントローラに認識されないことを避けるために、GPSのポートをバインドする必要があります。

（1）接続されているUSBデバイスを確認し、GPSモジュールを見つけます。ターミナルで**lsusb**を入力してGPSが接続されているデバイスID番号を検索します。以下の図のように、これがGPSモジュールのデバイス識別IDです。

![図 1](../../../../../public/images/tutorials/sensors/gps/ROS-Preparation/1.png)

（2）デバイス番号IDが分かったら、次にrulesファイルを作成し、ポートをバインドします。ターミナルに入力し、

```
sudo gedit /etc/udev/rules.d/my_serial.rules 
```

以下の内容をコピーして入れます。

```
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="myserial"
```

保存して終了し、次に実行権限を与えます。ターミナルに入力し、

```
sudo chmod 777 /etc/udev/rules.d/my_serial.rules 
```

（3）GPSモジュールを抜き差しし直し、ターミナルでll /dev/myserialを入力してバインドが成功したか確認します。以下の画面が表示されればバインド成功です。

```
ll /dev/myserial
```

![図 2](../../../../../public/images/tutorials/sensors/gps/ROS-Preparation/2.png)

<RelatedProducts slugs="gps-beidou-module" />
