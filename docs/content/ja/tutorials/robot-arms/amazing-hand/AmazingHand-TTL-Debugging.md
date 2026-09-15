---
title: 器用ハンド（TTL シリアルサーボ）デバッグチュートリアル
description: "まず「灵巧手调试.zip」圧縮パッケージをダウンロードし、解凍後「使用arduio程序调试灵巧手过程（TTL舵机）」ドキュメントでサーボID設定、キャリブレーション、中位校正、デモプログラム実行を行うか、公式オープンソースコードを参照してください。"
---

# 器用ハンド（TTL シリアルサーボ）デバッグチュートリアル

> **[ストアで購入](https://www.juxitech.com/ja/products/amazinghand)**


まず「[灵巧手调试.zip](https://juxitech.feishu.cn/wiki/QjYBwL0A0iJVlNkEpUUclLYGnBc)」圧縮パッケージをダウンロードし、解凍後「使用arduio程序调试灵巧手过程（TTL舵机）」ドキュメントでサーボID設定、キャリブレーション、中位校正、デモプログラム実行を行うか、[公式オープンソースコード](https://github.com/pollen-robotics/AmazingHand/tree/main/ArduinoExample)を参照してください。

**完成品で分解しない場合**（出荷時にサーボID設定・キャリブレーション・中位校正済み）は、直接**[第6点「02 演示程序」の実行](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229188003&from=from_node_link)** と 第7点の**[ハンドトラッキング](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229188027&from=from_node_link)** に進めます。

![image – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTQ0NjE2ZmE3MmFlM2ZkMGQ5YmE2MmY3NTUyZDdjMWRfZjY1YjhhN2Q4ZjhhOWQ0NGE5ZWM4YWRjZDY3N2EwYjZfSUQ6NzYzODkzOTYxMTI1MDc4OTMzM18xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 1. 器用ハンドのデバッグ配線方法

1つ目は、PC で python などの上位機ソフトウェア（飛特サーボ上位機や python コード）を実行する方法
2つ目は、MEGA328P などのマイコン、または市販の開発ボードや主制御を使用する方法

配線方法は以下の通り：
（1）python 方式でデバッグする場合の配線（サーボドライバ基板のみ接続）：

![1. Debug the wiring method of the dexterous hand – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTdmMjBiMGQzMTI2ODllOWMzYTU2N2ZkYWZlMzVkODdfNjNlZTQ2OTI4M2M3Mzg2NmZmZDNiYjI5Zjc3NDg0MjZfSUQ6NzYzODkzOTYxMTQ4OTg0ODI5MV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

（2）MEGA328P 開発ボードでデバッグする場合の配線（サーボドライバ基板+328P 開発ボード）：

**MEGA328P 開発ボードのピン位置をよく確認してください！**

![1. Debug the wiring method of the dexterous hand – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjFjYzRiMGQ0ZGNjN2M0MmUyMTY1MjNiMjQ4MzQ4NmZfM2JmYWU5NmZjNDQyY2Y1MGZkNzExYTJiMDg1OGRlMjlfSUQ6NzYzODkzOTYwOTIwNDM5NDk2NV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![1. Debug the wiring method of the dexterous hand – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzIxZTg3NzMxNzZiYTRhMWMzNmM5ODJhMzZhNTE2YzZfNDY1MTNkNTI3YTVmYzBkY2U2YjViZTQzZDU2YmI5NzBfSUQ6NzYzODkzOTYxMDQxMjE0MTUzNV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![1. Debug the wiring method of the dexterous hand – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmYwNzM3ZjRiZjk3Njg1M2UyOGMwNzM0NmJhNjliMDNfNGE0NmRlYTI3MDY4ZDA1M2IwNTI3NTczZDE3NTBhNzhfSUQ6NzYzODkzOTYwOTU2NDkwODUwNV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![1. Debug the wiring method of the dexterous hand – 5](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTUwM2U2Nzc0MjVhNzczODJiMGUwNjA0YTdjZWM0YTVfYWU4ZTQzOWRjOTlkOWU4NjhlNWFlOGJiODViNzNjNDRfSUQ6NzYzODkzOTYwNzY5MDk3MjEwOF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

以下はマイコンを使用したデバッグ手順です。マイコン自体はデモプログラムを繰り返し実行するため、データ線を抜くだけで停止できます。

## 2.サーボIDの設定

器用ハンド1本には8個のサーボを使用します。右手のIDは1〜8、左手のIDは11〜18に設定します

中位校正 完成品デフォルト 右手[451,571,451,571,451,571,451,571] 左手[571,451,571,451,571,451,571,451]

1、配線：**個々の** サーボ、サーボドライバ基板を順に接続します。

![2. Set Servo ID – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZWM0NTY2YjdjZWU5ZmNiNmJhZWRhODg0NjgwZDJiZjlfNjMzNGZmNzY1NTg3YmM5ZTMyNGRlYzk4YzdiMmZhYmNfSUQ6NzYzODkzOTYwNzUzOTQzNjUxN18xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

2、サーボメーカー提供の上位機ソフトウェア FD1.9.8.2 を設定に使用します
FD.rar

![2. Set Servo ID – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NmI3MTMyZTFlMjRmM2U1OTY3M2JkN2ZlYWYwM2MyMzdfYjA0NzhmZDNjODMyYjNiNmYyZjBkN2Q2NzJkNDUxMmVfSUQ6NzYzODkzOTYwODM0OTAxOTA5MF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![2. Set Servo ID – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZGJmNWE2MGEwZGU4ZGUxMWU4ZDA2YWIwYWFkMDk3YzJfMjcxOGRlZTE2Mjg3MDQ0OWExNjJmODU1OTBmYTBhZDRfSUQ6NzYzODkzOTYxMDcyNjY4MTU3NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![2. Set Servo ID – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YmQyNGIyMTQwOTExYzM3YzJhNGY2ZWQwMGZkOGI5NjdfZWJiYTYwZDZjNDlmNzY1OGRjYjEwMmRhMGEzMWZkZDBfSUQ6NzYzODkzOTYwODAxMzQ0MTk4MF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 3.**サーボホーンの固定**

1、コード「安装白色伺服喇叭时使用」を開発ボードにアップロードします

このプログラムの役割：サーボのギア位置をだいたい中央にし、以降の動作角度はこの中央位置を基準にします。

（1）arduino ソフトウェアを自分でインストールし、OS に応じて[インストールチュートリアル](https://blog.csdn.net/weixin_35509395/article/details/156188274)を参照。arduino プログラムをコンパイル・ダウンロードする前に、ライブラリマネージャーで FTServo ライブラリ、SCServo ライブラリをインストールします

![3.Fix the servo horn – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjU0NGRjM2VhZDU4NGViMmU4YjBkNjQ3OGRmYzMxOGFfMzYxMzAxMDM1NmFhYjFjM2ZhMTlmODMwNDBiOWUwMzlfSUQ6NzYzODkzOTYwNzU1MjI4MTUzOF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

（2）開発ボードの種類：「Arduino Nano」を選択

![3.Fix the servo horn – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjdiYmNjMzFjMjE3OTZkNjAzYjZkM2RhZDRiZDY5MDFfZTVjNTAyZGU5ZGFmYmJmYzgwNDI3YzMyOWNmMjljYzVfSUQ6NzYzODkzOTYxMTUyMzQ1MTg1NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

2、サーボ1、2のデバッグ
（1）編集：デバッグするサーボIDに応じて以下を変更。例：人差し指をデバッグする場合は、ID値を1、2に設定

![3.Fix the servo horn – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=N2UyYzFjYmJiNjA3YTZkMjY4MWZkYjdhMzFhMDNkZDlfMjQ4NjdlY2M4ZjI2ZjcxNjJlNDc5YmQyNGNmNGZhYzVfSUQ6NzYzODkzOTYwNzYyMzQwNDUxN18xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

（2）プログラムを開発ボードにアップロード
（3）配線：開発ボードをサーボドライバ基板、**1、2**番サーボに接続すると、サーボギアが一定角度回転して停止する音が聞こえます。

![3.Fix the servo horn – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2U4MTBhZWY4YmY0Y2MzOWU5MzhiODA0ZDZhODc4MzRfZGEzZjM4ODdkOWQ1MTJmZjNiYmQxNTMyMjQ2ZDQ0MDZfSUQ6NzYzODkzOTYwNzkzNTY4MzU1OF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

（4）サーボホーンをギアに取り付け、位置はできるだけ平行に

![3.Fix the servo horn – 5](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTUyMDI0ODVjYjhhNDBjZDJkZmQ1YjNmMzA2NDc5ZTlfNTUxNmQ2MWQwOTdmYzdjOTM2YTNkZTkxYzYzYjI5YmVfSUQ6NzYzODkzOTYwODAxMzQ1ODM2NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

3、サーボ3、4のデバッグ
（1）**328P開発ボードとサーボドライバ基板の配線を外す（アップロードできないため）**
（2）編集：ID値を3、4に設定

![3.Fix the servo horn – 6](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2RlNzE0MzI1ZDYxY2I2YjE4Y2YyNWZkYjM0MTgyOGFfZTI2MWI2MmQ0NmJlNTgwOTEzZDAzN2U4OGRmOTkwNDFfSUQ6NzYzODkzOTYxMTI0NjY2MDU3OF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

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

![4.Fine-tune intermediate values – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmExMWZhZTY2NTUxMWE0OGJkMjg5OWJjM2QwNjcwMmJfNDE3MzY4ODI3OGRjNTU0YjlhMDA3ZDViMGNkZmUxNjZfSUQ6NzYzODkzOTYxMTE5MjAxOTkyMF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![4.Fine-tune intermediate values – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YmY0ZTAyNTRkNGQ5OGQyMTAyZTkwNDk0Y2RmNDAzMjRfZGRjODE0NjQwODBlOTJkY2Q5NzUwN2M3OTZmYjEwZjlfSUQ6NzYzODkzOTYwODEwMzQ1NTY5NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 5.**テストプログラムの実行**

1、上で保存したMiddlePos_1、MiddlePos_2の値を以下の配列に記入し、プログラムをダウンロードします。

![5.Run the test program – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NzA4ZmVjODQzYzU3ZjIwMjU2NGQ1NjQ4YzFkZjFjZDdfMmU3ZDU0NGJiODU3OWI4ZDQzNDNiNzY0YjNkYzllYWZfSUQ6NzYzODkzOTYxMTI2MzQzNzc2Ml8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 6.**「02 演示程序」の実行**

（1）arduino ソフトウェアを自分でインストールし、OS に応じて[インストールチュートリアル](https://blog.csdn.net/weixin_35509395/article/details/156188274)を参照
（2）`灵巧手调试\00 TTL串口舵机\arduino程序（MEGA328P开发板）\02 演示程序`ディレクトリで、左手か右手かに応じて対応する ino ファイルを開く

![6.Run "02 Demo Program" – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MGU3YzRlZWM2ZDRiNWZmYjNjMWQ3MmQzNGVkOTYxNTNfNzE3NWFjMGY4MGY4ZjJkYmJhMGY1NjhiMDAxNTFlMmVfSUQ6NzYzODkzOTYwODAxMzQ5MTEzMl8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

（3）arduino プログラムをコンパイル・アップロードする前に、ライブラリマネージャーで FTServo ライブラリ、SCServo ライブラリをインストール

![6.Run "02 Demo Program" – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NzgwNjdhZWY4ZjAzNmIzNzMyYmIzMGZkYzE0OTNiMTBfNmU3ODBjZTA2ODMwMzc5MWJhMDJmNDkzMDU3MmY1MjlfSUQ6NzYzODkzOTYwNzk0NjU3ODg3Ml8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

（4）開発ボードの種類：「Arduino Nano」を選択

![6.Run "02 Demo Program" – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTc0YjYyYjRjMTY4NGI5NzIxN2RhNjA0MTQ5YzE3OTRfYjYzZGYyNjkwMzY5ZTM3MjIzZWIxNmI4MWUzMGMxNmZfSUQ6NzYzODkzOTYxMTUwMjQxNDgwMl8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

（5）コンパイルしてアップロード

注意 このとき PC は開発ボードにのみ接続し、開発ボードはサーボドライバ基板に接続しない（つまり器用ハンドに接続しない）

アップロード成功後、開発ボードを3本のジャンパ線でサーボドライバ基板に接続し、サーボをサーボドライバ基板に接続します。[MEGA328P開発板調試](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229187947&from=from_node_link)[時の配線方式](https://juxitech.feishu.cn/wiki/WqxUwGrGHiNi7wkqFkmcCGpXnE?node-id=1758747871229187947&from=from_node_link)を参照。

器用ハンドは「**02 演示程序**」を繰り返し実行します

実行結果は以下の通り：

![6.Run "02 Demo Program" – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTY0NzA2NGI2OTBjNzkwODE4ZGFhNGM2ZDFkNjhhMzFfZDMxNjlmZWZhNmMxYjQ0YTNhMjZhZWEzYWU0OGY2YzBfSUQ6NzYzODkzOTYwOTI1NDY0NDY3NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## [7.ハンドトラッキング](https://juxitech.feishu.cn/wiki/ZpHmwYARQiN2fwkqFJecqUFZnQg)
