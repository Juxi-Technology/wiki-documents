---
title: "Arduino Nano 使用チュートリアル"
description: "Arduino Nano（328P）とサーボドライバ基板で AmazingHand「02 デモプログラム」を実行：配線、ライブラリのインストール、コンパイル・アップロードと実行結果。"
---

# Arduino Nano 使用チュートリアル

## 配線方法（サーボドライバ基板 + Nano ボード）

**Nano ボード（つまり 328P 開発ボード）のピン位置をよく確認してください！**

![図](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/01.png)

![図](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/02.png)

![図](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/03.png)

![図](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/04.png)

以下ではマイコンを使ったデバッグ手順を説明します。マイコン自体はデモプログラムを繰り返し実行し続けるため、データケーブルを抜くだけで停止できます。

## 「02 デモプログラム」を実行する

1. Arduino IDE を自身でインストールします。

2. **左手か右手か**に応じて、対応する `.ino` ファイルを開きます。

   ![図](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/05.png)

3. Arduino プログラムをコンパイルして Nano ボードにアップロードする前に、まず「ライブラリマネージャー」で **FTServo ライブラリ** と **SCServo ライブラリ** をインストールします。

   ![図](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/06.png)

4. Nano ボードの種類は「**Arduino Nano**」を選択します。

   ![図](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/07.png)

5. コンパイルしてアップロードします。

> **注意：** この時点では、コンピューターは Nano ボードにのみ単独で接続し、Nano ボードはまだサーボドライバ基板に接続しないでください（つまり器用ハンドとは接続しません）。

アップロードに成功したら、Nano ボードを 3 本のジャンパワイヤでサーボドライバ基板に接続し、サーボをサーボドライバ基板に接続します。参考：[MEGA328P Nano ボードのデバッグ時の配線方法](https://juxitech.feishu.cn/wiki/Wt46wtt26imdWkkQlxTcL87qnHd#share-HdS4dNgwyo2seVxRZ9PcZ1R3nuc)。

器用ハンドは「02 デモプログラム」を繰り返し実行し続けます。実行結果は以下のとおりです：

![図](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/08.png)
