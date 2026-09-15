---
title: "GPSデータ解析"
description: "今回の講座では、主にSTC89C52RC型の51シングルチップマイコンとGPSモジュールを使用して、位置情報の解析機能を実装する方法を学びます。"
---

# GPSデータ解析

**1. 学習目標**

今回の講座では、主にSTC89C52RC型の51シングルチップマイコンとGPSモジュールを使用して、位置情報の解析機能を実装する方法を学びます。

**2. 事前準備**

GPSモジュールはUARTとUSBで通信します。ここではC51のUARTポートを使用して情報を読み取ります。モジュールのTXを51ボードのP3.0ピンに接続します。VCCとGNDはそれぞれ5VとGNDに接続します。

![図 1](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/1.png)

**3.** **プログラム**

シリアルポートとデータ配列を初期化します

![図 2](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/2.jpg) 

受信したデータを読み取って解析します。

![図 3](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/3.jpg) 

シリアルポートを通じて受信したデータを出力します。

![図 4](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/4.jpg) 

**4****. 実験現象**

モジュールに通電すると、起動に約32sの時間がかかり、その後モジュール上のシリアル出力状態ランプが点滅し続け、このとき正常にデータを受信できます。

プログラムをダウンロードして実行し、シリアルソフトを開き、ボーレートを9600に設定すると、シリアルに現在の位置情報が繰り返し出力されます。

![図 5](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/5.jpg) 

注意、モジュールのアンテナは室外に置く必要があります。そうでないとGPS信号を検索できない場合があります。

<RelatedProducts slugs="gps-beidou-module" />
