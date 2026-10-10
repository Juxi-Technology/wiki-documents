---
title: Lekiwi 移動ロボット組み立てチュートリアル
description: "Fusion360 オンライン CAD で正確なコンポーネント位置を可視化できます。"
---

# Lekiwi 移動ロボット組み立てチュートリアル

> **[ストアで購入](https://www.juxitech.com/ja/products/lekiwi-embodied-intelligence-mobile-robotic-car)**

[*Fusion360 のオンライン CAD*](https://a360.co/4k1P8yO)* で、各部品の正確な位置を確認できます。*

[URDF ファイル](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)

オンライン URDF プレビュー https://urdf.d-robotics.cc/

## 1. ホイールモジュールの組み立て(ロボット1台につき3個)

1. 12本の **M2x6** タッピングねじを使用して、駆動モーターをモーターブラケットに固定します。(サーボボックスに付属しています。)

![image – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-01.png)
![image – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-02.png)

2. 12本の **M3x16** 皿ねじと12個の **M3 ナット**を使用して、駆動モーターブラケットでサーボをベースプレートに固定します。

![image – 3](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-03.jpg)

3. 82mm オムニホイールからねじとナットを取り外します。

![image – 4](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-04.png)

4. m3\*6 ねじを使用して、サーボホーンをサーボに固定します。

![image – 5](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-05.png)

5. カップリングに4つのロックナットを取り付けます。まず、4本の m3\*6 ねじを使用してカップリングをサーボホーンに固定します。

![image – 6](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-06.png)
![image – 7](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-07.png)

6. m3\*25 皿ねじとロックナットを使用して、82mm オムニホイールをカップリングに固定します。



3つのホイールをすべてベースプレートに取り付けた状態:

![image – 8](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-08.png)
![image – 9](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-09.jpg)

![image – 10](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-10.png)

## 2. ベースプレートの組み立て

1. サーボドライバ基板とバッテリーマウントの穴に M3 ナットを2つ挿入します。4本の M3x12 六角穴付きねじを使用して、両方をベースプレートに固定します。

![image – 11](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-11.png)
![image – 12](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-12.png)

2. 2本の M3\*12 六角穴付きねじと2個の M3 ナットを使用してサーボドライバ基板を取り付け、3つのサーボに接続します。

![image – 13](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-13.png)

ポータブル電源のケーブル接続

- **電源入力**は電源に直接接続します

![image – 14](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-14.png)
![image – 15](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-15.png)

- **USB-C** インターフェースは Raspberry Pi に5V電源を供給します
- **12V ロボットアーム**を使用する場合は、**DC 電源分配器**から**サーボモータ基板**に直接給電してください

![image – 16](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-16.png)
![image – 17](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-17.png)

ケーブルは下図のように接続できます:

![image – 18](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-18.png)

## 3. トッププレートの組み立て

1. Raspberry Pi 5 を Raspberry Pi ケースの底面にセットし、ケースの上面をはめ込みます。

2. 2本の M3x16 六角穴付きねじと2個の M3 ナットを使用して Raspberry Pi をトップベースプレートに固定し、4本の M4x25 皿ねじと4個の M4 ナットを使用して SO-101 ロボットアームのベースを取り付けます。

![image – 19](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-19.png)

## 4.

1. サーボドライバ基板の USB-C - USB-A ケーブル、5V USB-C 電源ケーブル、サーボケーブルをトッププレートの穴に通します。

![image – 20](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-20.png)

2. 8本の m3x16 皿ねじと4個の m3 ナットを使用して、トッププレートをモーターブラケットに取り付けます。

![image – 21](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-21.png)



## 5. カメラの取り付け

*注: 私たちが設計したブラケットは、選定したカメラに合わせたものです。カメラモジュールが異なる場合は、改造が必要になることがあります。*

## (オプション1) 前方カメラの取り付け

①4本の m2\*5\*5 スペーサーねじを使用してカメラモジュールを固定します

②2本の m3\*12 皿ねじと2個の m3 ナットを使用して、前方カメラブラケットをベースプレートに取り付けます

![image – 22](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-22.webp)
![image – 23](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-23.webp)

## (オプション2) アーム搭載カメラの取り付け

4本の m2\*5\*5 スペーサーねじを使用してカメラモジュールを固定します

このブラケットは、穴間隔 24\*25mm または 28\*28mm のカメラに対応しています

![image – 24](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-24.png)

![image – 25](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-25.png)

## 6. 電源の接続と配線

DC バレルプラグアダプターを**サーボドライバ基板**に接続します。

5V USB-C コネクタを **Raspberry Pi 5** に接続して、電子機器に給電します。

サーボドライバ基板とカメラの USB データケーブルは、Raspberry Pi に直接接続できます。

![image – 26](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-26.png)
