---
title: "パーツキット組み立て"
description: "ねじ締めの楽しみをスキップしたい場合は、Xlerobot に対応した SO101 フォロワーアームの組み立て済みキットを購入することもできます。"
---

# パーツキット組み立て

![図 1](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/1.jpg)

ヒント

ねじ締めの楽しみをスキップしたい場合は、Xlerobot に対応した SO101 フォロワーアームの[組み立て済みキット](https://item.taobao.com/item.htm?ft=t&id=1002551208989&spm=a21dvs.23580594.0.0.47b32c1bwUlxLA&skuId=6088534920039)を購入することもできます。



## 🦾 SO101 ロボットアーム

![図 2](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/2.jpg)

> すでにサーボを設定済みの、組み立てられた SO101 ロボットアームが 2 台ある場合は、スキップしてください。
> 
> 

- [SO101 のステップバイステップ組み立て説明](https://juxitech.feishu.cn/wiki/HllBwhjJ1iayMdkUTGgcyKbgn8g)に従って SO101 ロボットアームを 2 台構築し、同じフォロワーアームを 2 台製作します。2 セットのサーボ(以前の ID はすべて 1-6)を 2 つのサーボドライバ基板用に用意します。

- この[取り付けガイド](https://juxitech.feishu.cn/wiki/LjJywf5ILihuwkkOboGcFx1Qnkc)に従って手首カメラを取り付けます。

- 滑り止めパッドがある場合は、グリッパーに貼ることができます。

## 一、サーボの設定

||数量|サーボ id|用途|
|---|---|---|---|
|Feetech STS3215-C018 サーボ|3|7、8、9|全方向ホイールシャーシ|
|Feetech STS3215-C018 サーボ|2|7、8|上肢キット-カメラタワー|
|90CM サーボ延長ケーブル|2||シャーシとカメラタワーをサーボドライバ基板に接続する|

![図 3](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/3.jpg)

> 公式の lerobot コードリポジトリは現在、ロボットアーム以外のサーボ設定に対応していないため、代わりに [Bambot](https://bambot.org/) を使用します(Windows と Mac で動作し、Linux では先に sudo chmod 666 /dev/ttyACM0 を実行する必要があります)。
> 
> 

```Plain Text
sudo chmod 666 /dev/ttyACM0
```

- 設定したいサーボを(1 つずつ)サーボドライバ基板に接続し、サーボドライバ基板を直接コンピューターに接続します。

- [Bambot のサーボ設定ページ](https://bambot.org/feetech.js)に移動し、接続を確立してサーボをスキャンします。 

![図 4](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/4.png)

- 以下の説明に従ってサーボ ID の名前を変更します。 

![図 5](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/5.png)

- SO101 ロボットアーム以外に、2 つの サーボドライバ基板 用に 2 セットのサーボを設定する必要があります：

    - 1 セットは **カメラタワー** 用(サーボ id：7, 8)

    - もう 1 セットは **全方向ホイールシャーシ** 用(サーボ id：7, 8, 9)。

- ヒント：マーカーペンでサーボに数字を書き、異なる基板のサーボを区別します(例：L1-L8 と R1-R9)。

## 🛒 カート

- 万一マニュアルを誤って捨ててしまった場合、[こちらにあります](https://github.com/Vector-Wangel/XLeRobot/blob/main/others/Manuals_raskog_utility_cart.pdf)。

![図 6](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/6.png)

## 🧑🦼➡ シャーシ

> すでに Lekiwi ベースがある場合は、バッテリー、サーボブラケットなどを取り外してください。底板には車輪付きのサーボを 3 つ取り付けるだけです(配線は残します)。
> 
> 

![図 7](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/7.png)

**備考**

基板を間違えないでください。各基板には特定の順序があります。

- 上の図に従って 全方向ホイール を基板に取り付けます。

    - 対応する特定のサーボ id を取り付ける必要があります。

- 全方向ホイールのコネクタには 3 個の M4 ねじが必要です。

- [チュートリアル](https://github.com/SIGRobotics-UIUC/LeKiwi/blob/main/Assembly.md#2-bottom-plate-assembly)に従って通常どおりサーボを配線し、その後はサーボケーブルをサーボドライバ基板に接続せず、**90CM サーボ延長ケーブル** を使って サーボドライバ基板 を接続します。

![図 8](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/8.png)

- 上の図に従ってトッププレートを取り付けます。

- **90CM サーボ延長ケーブル** をぶら下げたままにし、当面は トッププレートの穴 から引き出さないでください。

![図 9](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/9.jpg)

- 上の図に従ってトッププレートに 3 つのコネクタ（スペーサー）を取り付けます。

ヒント

コネクタ付きの Lekiwi ベースをカートの下方に置き、カートに十分な圧力をかけられるか、カートの 4 つの車輪がまだ地面に接しているかを確認します。もしそうでなければ、スライサーソフトで z 軸の比率を直接少し調整して(xy 軸の比率は変えずに)コネクタの 3D モデルを修正し、再印刷してみてください。

![図 10](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/10.png)

ヒント

カートをひっくり返して以下の組み立てを行います。

- 次に、コネクタ付きの Lekiwi ベースをカートの底部に取り付けます。薄い方の板は反対側になります。

- 画像を参考に、サーボのインデックスに従って必要な組み立て方向を確認します。

備考

この新しいハードウェアバージョンはカートの金属メッシュと互換性があり、12 個の M3 ねじはすべて問題なく取り付けられるはずです。

![図 11](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/11.jpg)

- その後、先ほど延長したケーブルを下方からカートを通して上へ配線します。

## 🦾 ロボットアームベース

### トップベースの組み立て

14 個の M3\*12 六角ねじ

4 個の M3\*16 六角ねじ

![図 12](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/12.png)

- ベースをひっくり返した状態で組み立てると容易です。

### ヘッドの組み立て

①まず 90CM サーボ延長ケーブル（白黒）と サーボケーブル（白赤黒）を 7 番のサーボに差し込みます。



②4 つの M2\*6 スペーサーねじ でカメラを固定します

![図 13](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/13.png)

- サーボホーンを取り付ける際、サーボホーンの中央の穴にはねじを締めないよう注意してください。

- これは[SO101 ロボットアームの組み立て](https://huggingface.co/docs/lerobot/so101#joint-1)の最初の 2 つのステップと同じはずです。

## 🧵 配線

重要

トップベースをカートに固定する前に、トップベースのすべての配線とケーブル管理を完了し、Raspberry Pi をそのケースに収めます。

![図 14](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/14.png)

- **Lekiwi ベース**からの 90CM サーボ延長ケーブルを **左の SO101 ロボットアーム** に接続します(これによりベースとロボットアームが Lekiwi になります)。

- 2 本の**USB-C から USB-A へのデータケーブル ** を、2 つの **サーボドライバ基板** から **Raspberry Pi**(残りの 2 つの USB-A スロットはカメラ用)または Jetson メインボードに接続します。

- 3 本の**電源ケーブル**をすべて接続します：2 本の**USB-C から DC(12V)、2 つのサーボドライバ基板から** と 1 本の**USB-C から USB-C**、**Raspberry Pi** から、電源の PD 急速充電 インターフェースに接続します。各インターフェースは同時充電時に最大 100W の電力を供給し、12V バージョンの動作を支えるのに十分であることがテスト済みです。

### 🔋 バッテリーの設置 🛒

- 低い重心を保つため、カートの中段または下段の任意の位置に置きます。バッテリーは底面が滑り止めになっており、通常の操作では滑りにくいです。

- 安全のため、直立させて設置します。

- 万一バッテリーのマニュアルも誤って捨ててしまった場合、[こちらにあります](https://github.com/Vector-Wangel/XLeRobot/blob/main/others/Manual_Anker_SOLIX_C300_DC_Portable_Power_Station.pdf)。

重要

サーボドライバ基板を保護するため、電源ケーブルは最後に接続するようにしてください。他のケーブルを抜き差しするときは、常に電源ケーブルを外してください。

## 📸 最終組み立て

### ベースをカートに組み込む

重要

トップベースをカートに固定する前に、トップベースのすべての配線とケーブル管理を完了し、Raspberry Pi をそのケースに収めます。

![図 15](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/15.jpg)

- カートの縁をケースのソケットに差し込む際は、ケースを壊さないよう注意してください。

- テストを容易にするため、SO101 ロボットアームはカートに直接固定します。[ロボットアームベース](https://github.com/Vector-Wangel/XLeRobot/blob/main/3D_Models/3D_models_for_printing/XLeRobot_special/SO_5DOF_ARM100_Assemblybases.stl)をカート上段の 2 つの角に位置決めし、**F 型クランプ** で固定します。

- Bambu Lab のフィラメントの紙製スプールがある場合、安定した構造サポートを提供するために、中に入れるのを忘れないでください。

![図 16](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/16.jpg)

これらのステップを完了すると、XLeRobot は物理的にしっかりと組み立てられ、家事をする準備が整っているはずです。

![図 17](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/17.jpg)

![図 18](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/18.jpg)

重要

XLeRobot が完全に組み立てられた後は、カートのように押して移動しないでください。サーボのギアが破損する可能性があります。手動で移動する必要がある場合は、代わりにロボットを持ち上げてください(~12kg)。

<RelatedProducts slugs="xlerobot" />
