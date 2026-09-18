---
title: Lerobot ロボットアーム組立ガイド
description: "SO-ARM101 LeRobot ロボットアームの組立ガイド。Windows と Linux それぞれの組立手順と、Pro 版の電源アダプターの使い分けを説明します。"
---

# Lerobot ロボットアーム組立ガイド

注意：完成品のロボットアームをお持ちの場合は、本チュートリアルをスキップしてください

## フォロワーアームの 3D プリント部品

![IMG_20251229_141748.jpg](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/1.jpg)

## リーダーアームの 3D プリント部品

![IMG_20251229_141533.jpg](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/2.jpg)

リーダーアームとフォロワーアームは非常に似ており、先端だけが異なります

リーダーアームはハンドルとトリガー、フォロワーアームはグリッパです

## 3D プリント部品に残ったサポート材の除去

すべての穴、開口部、溝、グリッドを確認します。特に麻雀の「五筒」のような 5 つの穴に注意してください

この手順は非常に重要です。そうしないと後でネジを締め込めません

## 4 種類のサーボの見分け方

|大型番号|小型番号|電圧（V）|減速比|ロボットアーム関節|数量|
|---|---|---|---|---|---|
|STS-3215|C001|7.4|1:345|リーダーアーム2|1|
||C044|7.4|1:191|リーダーアーム1、3|2|
||C046|7.4|1:147|リーダーアーム4、5、6|3|
||C047|12|1:345|フォロワーアームのすべての関節|6|

> 減速比は「モーター回転数：サーボ出力軸回転数」の比率です。たとえば 1:345 は、モーターが 345 回転して、サーボ出力軸がようやく 1 回転することを表します。
> 
> 大きな減速比はギア列によってトルクを増幅するため、より重い負荷（たとえばフォロワーアーム）を駆動できます
> 
> ただし同時に、出力軸の回転速度はより遅くなります（「減速」されているためです）
> 
> 関節をドラッグすると、より力が必要になります
> 
> 

以下は本プロジェクトのすべてのサーボの型番と減速比です。下線がそれらの番号です

![12月30日(7).png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/3.jpg)

![IMG_20260108_145707.jpg](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/4.jpg)

## 2 種類の電圧の電源アダプタの見分け方

5V 6A 30W の電源アダプタ：7.4V サーボ（リーダーアーム）に給電、黒

12V 5A 60W の電源アダプタ：12V サーボ（フォロワーアーム）に給電、白

## Feetech サーボデバッグツールのダウンロード

### Windows パソコン

https://gitee.com/ftservo/fddebug

[`FD1.9.8.5(250729).7z`](https://gitee.com/ftservo/fddebug/blob/master/FD1.9.8.5(250729).7z) をダウンロードし、解凍して、中の exe プログラムを実行します

### Ubuntu パソコンと Mac パソコン（圧縮ファイルにチュートリアルを同梱）

[Juxi_ServoController.zip](/downloads/Juxi_ServoController.zip)

![Lerobot 101机械臂.jpg](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/5.jpg)

**Pro 版では、リーダーアームは 5V6A 電源アダプタ、フォロワーアームは 12V5A 電源アダプタを使用します**

サーボ ID の設定とサーボ角度のキャリブレーション、および組み立ては事前に行ってください。詳しくは[公式組立チュートリアル](https://huggingface.co/docs/lerobot/so101)を参照できます

## ステップ 1：サーボ ID の設定とサーボホーンの取り付け（5 番サーボを除く）

![image.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/6.png)

![image.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/7.png)

1. Feetech 上位機デバッグツールを開き、COM ポート番号を選択し、ボーレートを 100 万に設定して、「開く」をクリックします

2. 「検索」をクリックし、「STS3215」が表示されたら「停止」をクリックし、「STS3215」をクリックします

3. 上部の「デバッグ」を選択すると、スライダーをドラッグしてサーボを回転させたり、「スキャン」をクリックしてサーボを往復運動させたりできます。サーボが正常に動作することを確認します

4. 上部の「プログラミング」を選択します

5. 「中位キャリブレーション」をクリックし、このときのサーボ回転軸の位置を中位（0-4095）に設定します

6. 「ID」をクリックし、右下で対応するサーボの ID 番号を設定して「保存」をクリックします。番号は純粋なアラビア数字で、アルファベットは付けません。

7. サーボと制御基板を接続しているケーブルを抜きます

8. サーボにサーボケーブルを挿します

1 番サーボは 2 本のケーブルを挿し、その他のサーボはまず 1 本だけ挿します

![截图_20260115151626.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/8.png)

あらためての注意ですが、サーボ関節の ID とギア比が **SO-ARM101** と厳密に対応していることを確認してください。

バス上の各モーターには一意の ID があります。新しいモーターには通常デフォルト ID `1` が付いています。モーターとコントローラ間の通信を正常に行うために、まず各モーターに一意の ID を設定する必要があります。また、バス上のデータ転送速度はボーレートによって決まります。互いに通信できるようにするには、コントローラとすべてのモーターに同じボーレートを設定する必要があり、本ロボットアームのサーボのボーレートは 100000 です。

そのため、まずコントローラを各モーターに個別に接続して設定する必要があります。これらのパラメータはモーター内部のメモリ（EEPROM）の不揮発性領域に書き込まれるため、一度実行するだけで済みます。

他のロボットのモーターを再利用する場合も、ID とボーレートが一致しない可能性があるため、この手順を実行する必要があるかもしれません。

以下の動画は、モーター ID を設定する手順の流れを示しています。

### Windows システム

[Feetech サーボ上位機.zip](/downloads/飞特舵机上位机.zip)

Feetech サーボ上位機を使ってサーボ ID を設定し中位をキャリブレーションします。ID の設定は 1 から 6 です！

**ロボットアームのサーボ ID 設定-Windows システム.mp4**（机械臂舵机设置ID-Windows系统.mp4，体积超过站点单文件上限，可向 support@juxitech.com 索取）

### Linux/ubuntu システムと Mac パソコン

Feetech サーボ上位機が必要な場合は、上記の [Feetech サーボデバッグツール](https://juxitech.feishu.cn/wiki/HllBwhjJ1iayMdkUTGgcyKbgn8g#share-Jvk1dRRl8oY0Skxrt2VczA9jnNb) を参照してください

まず [公式 Lerobot 環境インストール](https://huggingface.co/docs/lerobot/installation) のページに従って環境のデプロイを完了してください

仮想環境をアクティベートし、対応する src/lerobot ディレクトリに移動してください

conda activate lerobot

cd lerobot/src/lerobot

1、ロボットアームに対応する USB ポートを探します。各ロボットアームの正しいポートを見つけるために、ユーティリティスクリプトを 2 回実行してください：：

```Plain Text
lerobot-find-port
```

Leader ロボットアームのポートを識別するときの出力例（たとえば Mac では `/dev/tty.usbmodem575E0031751`、Linux では `/dev/ttyACM0` の可能性があります）：

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.

[...Disconnect corresponding leader or follower arm and press Enter...]

The port of this MotorsBus is /dev/ttyACM1
Reconnect the USB cable.
```

Follower ロボットアームのポートを識別するときの出力例（たとえば `/dev/tty.usbmodem575E0032081`、Linux では `/dev/ttyACM1` の可能性があります）：

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.

[...Disconnect corresponding leader or follower arm and press Enter...]

The port of this MotorsBus is /dev/ttyACM0
Reconnect the USB cable.
```

USB コネクタを抜くことを忘れないでください。そうしないとインターフェースを検出できません。

2、USB ケーブルでパソコンからフォロワーアームのサーボドライバ基板に接続し、電源を入れます。次に、以下のコマンドを実行します。コマンド内の--robot.port=/dev/ttyACM0 を見つけたポート番号に変更してください。見つけたポートが/dev/ttyACM1 の場合は、--robot.port=/dev/ttyACM1 に変更します

```Python
lerobot-setup-motors \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0
```

以下の出力が表示されます。

```Python
Connect the controller board to the 'gripper' motor only and press enter.
```

指示に従い、グリッパのサーボを接続します。これがサーボドライバ基板に接続されている唯一のサーボであり、このサーボがまだ他のどのサーボとも接続されていないことを確認してください。**[Enter]** キーを押すと、スクリプトがこのサーボの ID とボーレートを自動的に設定します。ID の設定は 6 から 1 です！

その後、以下のメッセージが表示されます：

```Python
'gripper' motor id set to 6
```

続いて、次に出力されるのは:

```Python
Connect the controller board to the 'wrist_roll' motor only and press enter.
```

**注意 **指示に従い、各サーボに対して上記の操作を繰り返します。

以前のサーボと同様に、これがドライバ基板に接続されている唯一のサーボであり、サーボ自体が他のどのサーボにも接続されていないことを確認してください。

毎回 **Enter** キーを押す前に、ケーブルの接続を必ず確認してください。たとえば、基板を扱っているときに電源ケーブルが外れることがあります。

すべての手順を完了すると、スクリプトは自動的に終了し、サーボはすぐに使用できる状態になります。これで、各サーボの 3 ピンコネクタを順に接続し、最初のサーボ（ID が 1 の「shoulder pan」サーボ）のケーブルをドライバ基板に接続できます。これでドライバ基板をロボットアームのベースに取り付けることができます。

リーダーアームについても同じ手順を繰り返します。

```Python
lerobot-setup-motors \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM0
```

**ロボットアームのサーボ ID 設定-Linux システム.mp4**（机械臂舵机设置ID-Linux系统.mp4，体积超过站点单文件上限，可向 support@juxitech.com 索取）

## ステップ 2：組み立て

- フォロワーアームの組み立て手順はリーダーアームとほぼ同じです。唯一の違いは、ステップ 12 以降のエンドエフェクタ（グリッパとハンドル）の取り付け方法が異なることです。

**SO-ARM101ロボットアーム組立チュートリアル.mp4**（SO-ARM101机械臂组装教程.mp4，体积超过站点单文件上限，可向 support@juxitech.com 索取）

サーボドライバ基板の取り付け：まず 4 本の銅スペーサーを取り付け、次に 4 本の M2.5*8 ネジでドライバ基板を固定します

![1768467962506.webp](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/9.webp)

![1768467970234.webp](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/10.webp)

![截图_20260115170850.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/11.png)

**Pro 版では、黒いリーダーアームは 5V6A 電源アダプタ、白いフォロワーアームは 12V5A 電源アダプタを使用します**

## ウェブページでのサーボ ID 設定と中位キャリブレーション

https://bambot.org/feetech.js?lang=zh

1、サーボの型番に応じて 0 または 1 を入力し、「接続」をクリックします

![截图_20260413125622.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/12.png)

2、ID 1~6 のサーボをスキャンします。スキャン結果の FOUND から対応する ID のサーボを確認できます。たとえば画像ではサーボ ID 1 がスキャンされています

![截图_20260413125712.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/13.png)

3、ID 設定と中位キャリブレーション

①現在のサーボ ID に、スキャンされたサーボ ID を入力します

②「ID 管理」に数字を入力し、「ID の変更」をクリックすると ID を設定できます

③中位キャリブレーション（STS3215 サーボの中位は 2047、SCS0009 サーボの中位は 511）

STS サーボ：「位置制御」に 2047 を入力し、「Set」をクリックします

SCS サーボ：「位置制御」に 511 を入力し、「Set」をクリックします

![截图_20260413125748.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/14.png)
