---
title: "ラズベリーパイ:位置情報解析"
description: "今回の講座では、主にRaspberry PiとGPSモジュールを使用して、位置情報の読み取りと解析を実装する方法を学びます。"
---

# ラズベリーパイ:位置情報解析

**1. 学習目標**

今回の講座では、主にRaspberry PiとGPSモジュールを使用して、位置情報の読み取りと解析を実装する方法を学びます。

**2. 事前準備**

GPSモジュールはUART通信またはUSB通信を採用しており、ここではUSB通信を例とします。

![図 1](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/1.png)

type-cケーブルでRaspberry PiとGPSモジュールを接続し、コマンド ls /dev | grep 'ttyUSB' を実行すると、音声モジュールがUSB0として認識されるのが確認できます

![図 2](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/2.jpg) 

**3. プログラム**

今回の講座のプログラムは次を参照してください：GPS.py

USBを初期化します：

![図 3](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/3.jpg) 

位置情報の取得と解析関数です。下図では、位置情報の中からGNGGAで始まる位置情報を抽出し、その後データを解析して各グローバル変数に格納します。

![図 4](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/4.jpg) 

![図 5](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/5.jpg) 

同様の方法でGNVTGの方位情報を取得して解析します。

![図 6](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/6.jpg) 

解析後のデータを繰り返し出力します

![図 7](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/7.jpg) 

**4. プログラムの実行**

ターミナルでsudo python2 GPS.pyを入力してプログラムを実行します。

**5.** **実験現象**

モジュールに通電すると、起動に約32sの時間がかかり、その後モジュール上のシリアル出力状態ランプが点滅し続け、このとき正常にデータを受信できます。

プログラムを実行すると、USBの初期化が始まり、初期化に成功すると「GPS Serial Opened! Baudrate=9600」と表示され、そうでなければ「GPS Serial Open Failed!」と表示されます。エラーの場合は配線またはUSBポートを確認する必要があります。その後、位置と方位情報が繰り返し出力されます。

![図 8](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/8.jpg) 

Ctrl+Cを押して情報の読み取りを終了します。

注意、モジュールのアンテナは室外に置く必要があります。そうでないとGPS信号を検索できない場合があります。信号が検索できないときは"GPS no found"と出力されます。

<RelatedProducts slugs="gps-beidou-module" />
