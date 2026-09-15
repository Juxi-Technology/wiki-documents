---
title: "Arduino:位置情報の読み取り"
description: "今回の講座では、主にarduinoとGPSモジュールを使用して、位置情報の読み取り機能を実装する方法を学びます。"
---

# Arduino:位置情報の読み取り

**1. 学習目標**

今回の講座では、主にarduinoとGPSモジュールを使用して、位置情報の読み取り機能を実装する方法を学びます。

**2. 事前準備**

GPSモジュールはUARTとUSBで通信します。ここではarduino UNOのUARTポートを使用して情報を読み取ります。モジュールのTXをarduino UNOボードのD0ピンに接続します。VCCとGNDはそれぞれ5VとGNDに接続します。

![図 1](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Reading/1.png)

**3.** **プログラム**

シリアルポートを初期化します。

![図 2](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Reading/2.jpg) 

受信したデータを出力します。


**4. コンパイルとプログラムのダウンロード**

4.1 Arduino IDEソフトウェアでファイルを開き、メニューバーの「√」をクリックしてプログラムをコンパイルし、左下に「コンパイル成功」の文字が表示されるまで待つ必要があります。

 ![図 3](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Reading/3.jpg)

4.2 Arduino IDEのメニューバーで、【ツール】---【ポート】---デバイスマネージャーに先ほど表示されたポート番号を選択する必要があります。以下の図のとおりです。

![図 4](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Reading/4.jpg) 

4.3 選択が完了したら、メニューバー下の「→」をクリックしてコードをUNOボードにアップロードします。左下に「アップロード完了」の文字が表示されたら、プログラムがUNOボードに正常にアップロードされたことを示します。以下の図のとおりです。

![図 5](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Reading/5.jpg) 

 

**5. 実験現象**

モジュールに通電すると、起動に約32sの時間がかかり、その後モジュール上のシリアル出力状態ランプが点滅し続け、このとき正常にデータを受信できます。

プログラムをダウンロードして実行し、シリアルモニタウィンドウを開き、シリアルソフトを開き、ボーレートを9600に設定すると、シリアルに現在の位置情報が繰り返し出力されます。これらの情報は処理されていない生の情報であり、  CASIC多模卫星导航接收机协议规范.pdf  を参照して各情報の具体的な内容を確認できます。

![図 6](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Reading/6.jpg) 

注意、モジュールのアンテナは室外に置く必要があります。そうでないとGPS信号を検索できない場合があります。

<RelatedProducts slugs="gps-beidou-module" />
