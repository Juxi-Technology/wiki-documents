---
title: "ラズベリーパイ:百度地図 API 申請"
description: "ラズベリーパイで百度地図の位置表示を使うための API 申請チュートリアル。開発者登録からアプリ作成、ak キー取得までの流れを解説します。"
---

# ラズベリーパイ:百度地図 API 申請

**1.** **登録方法**

百度地图開放プラットフォーム https://lbsyun.baidu.com/ にアクセスします

ページの最下部までスクロールします

今すぐ登録をクリックします

![図 1](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/19.jpg) 

個人開発者になることをお勧めします（当日申請すればすぐに使用できるためです）

プロンプトに従って順番に完了するだけです

![図 2](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/20.jpg) 

**2. akの取得**

私たちが使用するのはwebサービスの中の 普通IP定位 です。ドキュメントは以下のリンクで確認できます。

https://lbsyun.baidu.com/index.php?title=webapi/ip-api

コンソール をクリックし、マイアプリ を選択し、アプリの作成 を選択します。

![図 3](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/21.jpg) 

アプリ名は自由に記入し、アプリの種類は サーバーサイド を選択し、サービスを有効化し、ホワイトリストに 0.0.0.0/0 を入力します。

![図 4](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/22.jpg) 

送信 をクリックするとアプリが生成されます。

![図 5](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/23.jpg) 

私たちのアプリのak値をコピーします

![図 6](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/24.jpg) 

プログラムに貼り付けて保存すれば、百度地图を通じて位置情報を読み取ることができます。

![図 7](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API/25.jpg)

<RelatedProducts slugs="gps-beidou-module" />
