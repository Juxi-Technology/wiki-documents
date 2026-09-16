---
title: 器用ハンド（TTL シリアルサーボ）デバッグチュートリアル
description: "まず「灵巧手调试.zip」圧縮パッケージをダウンロードし、解凍後「使用arduio程序调试灵巧手过程（TTL舵机）」ドキュメントでサーボID設定、キャリブレーション、中位校正、デモプログラム実行を行うか、公式オープンソースコードを参照してください。"
---

# 器用ハンド（TTL シリアルサーボ）デバッグチュートリアル

> **[ストアで購入](https://www.juxitech.com/ja/products/amazinghand)**


まず「[灵巧手调试.zip](https://juxitech.feishu.cn/wiki/QjYBwL0A0iJVlNkEpUUclLYGnBc)」圧縮パッケージをダウンロードし、解凍後「使用arduio程序调试灵巧手过程（TTL舵机）」ドキュメントでサーボID設定、キャリブレーション、中位校正、デモプログラム実行を行うか、[公式オープンソースコード](https://github.com/pollen-robotics/AmazingHand/tree/main/ArduinoExample)を参照してください。

**完成品で分解しない場合**（出荷時にサーボID設定・キャリブレーション・中位校正済み）は、直接**[第6点「02 演示程序」の実行](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229188003&from=from_node_link)** と 第7点の**[ハンドトラッキング](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229188027&from=from_node_link)** に進めます。

![image – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/1.png)

## 1. 器用ハンドのデバッグ配線方法

1つ目は、PC で python などの上位機ソフトウェア（飛特サーボ上位機や python コード）を実行する方法
2つ目は、MEGA328P などのマイコン、または市販の開発ボードや主制御を使用する方法

配線方法は以下の通り：
（1）python 方式でデバッグする場合の配線（サーボドライバ基板のみ接続）：

![1. Debug the wiring method of the dexterous hand – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/2.png)

（2）MEGA328P 開発ボードでデバッグする場合の配線（サーボドライバ基板+328P 開発ボード）：

**MEGA328P 開発ボードのピン位置をよく確認してください！**

![1. Debug the wiring method of the dexterous hand – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/3.png)

![1. Debug the wiring method of the dexterous hand – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/4.png)

![1. Debug the wiring method of the dexterous hand – 4](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/5.png)

![1. Debug the wiring method of the dexterous hand – 5](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/6.png)

以下はマイコンを使用したデバッグ手順です。マイコン自体はデモプログラムを繰り返し実行するため、データ線を抜くだけで停止できます。

## 2.サーボIDの設定

器用ハンド1本には8個のサーボを使用します。右手のIDは1〜8、左手のIDは11〜18に設定します

中位校正 完成品デフォルト 右手[451,571,451,571,451,571,451,571] 左手[571,451,571,451,571,451,571,451]

1、配線：**個々の** サーボ、サーボドライバ基板を順に接続します。

![2. Set Servo ID – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/7.jpg)

2、サーボメーカー提供の上位機ソフトウェア FD1.9.8.2 を設定に使用します
FD.rar

![2. Set Servo ID – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/8.png)

![2. Set Servo ID – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/9.png)

![2. Set Servo ID – 4](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/10.png)

## 3.**サーボホーンの固定**

1、コード「安装白色伺服喇叭时使用」を開発ボードにアップロードします

このプログラムの役割：サーボのギア位置をだいたい中央にし、以降の動作角度はこの中央位置を基準にします。

（1）arduino ソフトウェアを自分でインストールし、OS に応じて[インストールチュートリアル](https://blog.csdn.net/weixin_35509395/article/details/156188274)を参照。arduino プログラムをコンパイル・ダウンロードする前に、ライブラリマネージャーで FTServo ライブラリ、SCServo ライブラリをインストールします

![3.Fix the servo horn – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/11.png)

（2）開発ボードの種類：「Arduino Nano」を選択

![3.Fix the servo horn – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/12.png)

2、サーボ1、2のデバッグ
（1）編集：デバッグするサーボIDに応じて以下を変更。例：人差し指をデバッグする場合は、ID値を1、2に設定

![3.Fix the servo horn – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/13.png)

（2）プログラムを開発ボードにアップロード
（3）配線：開発ボードをサーボドライバ基板、**1、2**番サーボに接続すると、サーボギアが一定角度回転して停止する音が聞こえます。

![3.Fix the servo horn – 4](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/14.png)

（4）サーボホーンをギアに取り付け、位置はできるだけ平行に

![3.Fix the servo horn – 5](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/15.png)

3、サーボ3、4のデバッグ
（1）**328P開発ボードとサーボドライバ基板の配線を外す（アップロードできないため）**
（2）編集：ID値を3、4に設定

![3.Fix the servo horn – 6](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/16.png)

（3）プログラムを開発ボードにアップロード
（4）配線：開発ボードをサーボドライバ基板、**3、4**番サーボに接続すると、サーボギアが一定角度回転して停止する音が聞こえます。
（5）サーボホーンをギアに取り付け、位置はできるだけ平行に

4、サーボ5、6のデバッグ
手順は同上

5、サーボ7、8のデバッグ
手順は同上

## 4.**中間値の微調整**

1、コード「01 微调MiddlePos值时使用」を開発ボードにアップロードします

2、指が閉じた位置でプログラムを即停止し（データ線を抜く）、サーボホーンが正しく整列しているか確認します（下図）。整列していない場合は、プログラム内のMiddlePos_1、MiddlePos_2の値を調整し、整列するまで繰り返します。その値を記録します（8サーボで8値）。最終プログラムで使用します。

![4.Fine-tune intermediate values – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/17.png)

![4.Fine-tune intermediate values – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/18.png)

## 5.**テストプログラムの実行**

1、上で保存したMiddlePos_1、MiddlePos_2の値を以下の配列に記入し、プログラムをダウンロードします。

![5.Run the test program – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/19.png)

## 6.**「02 演示程序」の実行**

（1）arduino ソフトウェアを自分でインストールし、OS に応じて[インストールチュートリアル](https://blog.csdn.net/weixin_35509395/article/details/156188274)を参照
（2）`灵巧手调试\00 TTL串口舵机\arduino程序（MEGA328P开发板）\02 演示程序`ディレクトリで、左手か右手かに応じて対応する ino ファイルを開く

![6.Run "02 Demo Program" – 1](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/20.png)

（3）arduino プログラムをコンパイル・アップロードする前に、ライブラリマネージャーで FTServo ライブラリ、SCServo ライブラリをインストール

![6.Run "02 Demo Program" – 2](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/21.png)

（4）開発ボードの種類：「Arduino Nano」を選択

![6.Run "02 Demo Program" – 3](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/22.png)

（5）コンパイルしてアップロード

注意 このとき PC は開発ボードにのみ接続し、開発ボードはサーボドライバ基板に接続しない（つまり器用ハンドに接続しない）

アップロード成功後、開発ボードを3本のジャンパ線でサーボドライバ基板に接続し、サーボをサーボドライバ基板に接続します。[MEGA328P開発板調試](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229187947&from=from_node_link)[時の配線方式](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229187947&from=from_node_link)を参照。

器用ハンドは「**02 演示程序**」を繰り返し実行します

実行結果は以下の通り：

![6.Run "02 Demo Program" – 4](../../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/23.png)

## [7.ハンドトラッキング](https://juxitech.feishu.cn/wiki/ZpHmwYARQiN2fwkqFJecqUFZnQg)
