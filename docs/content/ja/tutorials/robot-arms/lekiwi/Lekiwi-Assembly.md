---
title: Lekiwi 移動ロボット組み立てチュートリアル
description: "Fusion360 オンライン CAD で正確なコンポーネント位置を可視化できます。"
---

# Lekiwi 移動ロボット組み立てチュートリアル

> **[ストアで購入](https://www.juxitech.com/ja/products/lekiwi-embodied-intelligence-mobile-robotic-car)**


[*Fusion360 オンライン CAD*](https://a360.co/4k1P8yO)*で正確なコンポーネント位置を可視化できます。*
[URDFファイル](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)
オンラインURDFプレビュー https://urdf.d-robotics.cc/

## 一、ホイールモジュールの組み立て（1台につき3個）

1. 12本の **M2x6** タッピングネジで駆動モーターをモーターブラケットに固定します。（サーボボックス付属）

![image – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/1.jpg)

![image – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/10.jpg)





2. 12本の **M3x16 機ネジと12個の** で駆動モーターブラケットを底板に固定します。

![image – 3](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/11.jpg)



3. 82mm 全方向ホイールの機ネジとナットを取り外します

![image – 4](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/12.jpg)



4. m3*6ネジで 舵盤 をサーボに固定します

![image – 5](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/13.jpg)



5. 4個の緩み止めナットを カップリング に取り付け、4本の m3*6ネジ で カップリング を 舵盤 に固定します

![image – 6](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/14.jpg)

![image – 7](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/15.jpg)





6. m3*25機ネジと緩み止めナットで 82mm 全方向ホイール を カップリング に固定します

3つのホイールをすべて底板に取り付けた後：

![image – 8](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/16.jpg)

![image – 9](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/17.jpg)

![image – 10](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/18.jpg)







## 二、底板アセンブリ

1. M3ナットをサーボドライバ基板とバッテリー取付座の穴に差し込みます。4本のM3x12機ネジで両方を底板に固定します。

![image – 11](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/19.jpg)

![image – 12](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/2.jpg)





2. 4本のM2.5*6.5銅スタンドと4本のM2.5*8ネジでサーボドライバ基板を取り付け、3個のサーボに接続します。



モバイル電源 ケーブル接続

- **電源入力**は電源に直接接続





- **USB-C** インターフェースはラズベリーパイに 5V 電源を供給
- **12V ロボットアーム**を使用する場合、**DC 電源分岐器**で直接 **サーボモーターボード**に給電します





ケーブルは下図のように接続できます：

![image – 13](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/20.jpg)

![image – 14](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/21.jpg)

![image – 15](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/22.jpg)

![image – 16](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/3.jpg)

![image – 17](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/4.jpg)

![image – 18](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/5.jpg)



## 三、トッププレートアセンブリ

1. ラズベリーパイ 5 をラズベリーパイケース下部に入れ、ケース上部をはめ込みます。
2. 2本の M3x12 機ネジと2個の M3緩み止めナットでラズベリーパイを上部底板に固定し、4本の M4x25 機ネジと4個のM4緩み止めナットで SO-101 ロボットアームベースを取り付けます。改良版の SO-101 ベースでも純正ベースでも構いません。底板には両方のベース用の取付穴が用意されているためです。

![image – 19](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/6.jpg)



## 四、

1. サーボドライバ基板の USB-C から USB-A ケーブル、5V USB-C 電源ケーブル、SO0-101 サーボケーブルを上部底板の穴に通します。

![image – 20](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/7.jpg)



2. 6本の m3x12 機ネジと6個のm3緩み止めナットで 上部底板 をモーターブラケットに取り付けます。

![image – 21](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/8.jpg)



3. 6本の M3*50 銅スタンド と 6本の M3*機ネジ で トッププレートと底板を接続

## 五、カメラの取り付け

*注意：私たちの設計したブラケットは選択したカメラ専用です。異なるカメラモジュールの場合は修正が必要な場合があります。*

### （オプション 1）前方カメラの取り付け

3本の m3*12機ネジ と3個のm3ナットで前方カメラブラケットを底板に取り付けます
4個の m2*5*5スペーサーネジでカメラモジュールを固定します

### （オプション 2）アーム搭載カメラの取り付け

4個の m2*5*5スペーサーネジでカメラモジュールを固定します

## 六、電源を入れる

DC円筒プラグアダプターをサーボドライバ基板に挿し、5V USB-C コネクターをラズベリーパイ 5 に挿すと電子機器に給電されます。サーボドライバ基板とカメラのUSBデータケーブルはラズベリーパイに直接挿せます。


![Option 2 Install an arm-mounted camera – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/9.jpg)



