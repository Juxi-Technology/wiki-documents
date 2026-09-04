---
title: Lerobot ロボットアーム組立ガイド
description: "Pro版 主動腕は5V6A電源アダプタ、從動腕は12V5A電源アダプタを使用"
---

# Lerobot ロボットアーム組立ガイド

> **[ストアで購入](https://www.juxitech.com/ja/products/so-arm101-developers-kit)**

![image – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/1.jpg)

**Pro版:能動アーム(リーダー)は 5V6A 電源アダプター、従動アーム(フォロワー)は 12V5A 電源アダプターを使用**

サーボ ID の設定、サーボ角度のキャリブレーション、組立は事前に完了しておいてください。[公式組立ガイド](https://huggingface.co/docs/lerobot/so101) を参照できます。

# ステップ1: サーボ ID の設定とサーボホーンの取付け(5番サーボを除く)

![image – 2](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/2.png)

重ねて確認してください。サーボ関節の ID とギア比は **SO-ARM101** に厳密に対応している必要があります。

バス上の各モーターには一意の ID があります。新品のモーターには通常、デフォルト ID `1` が設定されています。モーターとコントローラー間の正常な通信を確保するため、まず各モーターに一意の ID を設定する必要があります。また、バス上のデータ転送速度はボーレートによって決まります。相互に通信できるようにするには、コントローラーとすべてのモーターに同じボーレートを設定する必要があり、このロボットアームサーボのボーレートは 100000 です。

このため、まずコントローラーを各モーターに個別に接続して設定を行います。これらのパラメータはモーター内部メモリの不揮発領域(EEPROM)に書き込まれるため、操作は1回だけで済みます。

他のロボットのモーターを再利用する予定がある場合も、ID やボーレートが一致していない可能性があるため、この手順の実行が必要になる場合があります。

以下のビデオは、モーター ID の設定手順を示しています。

## Windows システム

[飞特舵机上位机.zip]

飞特(Feite)サーボコントローラーを使用してサーボ ID を設定し、中間点をキャリブレーションします。ID の設定範囲は 1〜6 です!

[机械臂舵机设置ID-Windows系统.mp4]

## Linux/Ubuntu システム

FTServo 上位機については https://gitee.com/ftservo/FTServo_Linux を参照してください。

まず [LeRobot Manipulator Tutorial](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc) に従って、**ポート権限**・**ポートを見つけるスクリプトの実行**の項目から **C. Manipulator Control** まで進めてください。

従動アームのサーボドライバ基板を USB データケーブルでコンピューターに接続し、電源を入れます。次に、以下のコマンドを実行します。コマンド内の --robot.port=/dev/ttyACM0 を、検出したポート番号に変更してください。検出したポートが /dev/ttyACM1 の場合は --robot.port=/dev/ttyACM1 に変更します。

```Python
lerobot-setup-motors \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0
```

以下のような出力が表示されます。

```Python
Connect the controller board to the 'gripper' motor only and press enter.
```

指示に従って gripper サーボを接続します。サーボドライバ基板に接続されているのがこのサーボ1台だけであること、またこのサーボに他のサーボが接続されていないことを必ず確認してください。**[Enter]** キーを押すと、スクリプトがこのサーボの ID とボーレートを自動的に設定します。ID は 6 から 1 の順に設定されます!

その後、以下のメッセージが表示されます。

```Python
'gripper' motor id set to 6
```

次に、次の項目の出力が表示されます。

```Python
Connect the controller board to the 'wrist_roll' motor only and press enter.
```

**注意**: 各サーボについて、指示に従って上記の操作を繰り返します。

前のサーボと同様に、ドライバ基板に接続されているのがこのサーボ1台だけであること、またサーボ自体に他のサーボが接続されていないことを確認してください。

**Enter** キーを押すたびに、ケーブル接続を確認してください。たとえば、基板を操作しているときに電源ケーブルが外れてしまうことがあります。

すべての手順が完了すると、スクリプトは自動的に終了し、この時点でサーボは使用可能な状態になります。これで、各サーボの 3 ピンインターフェースを順番に接続し、最初のサーボ(ID 1 の "shoulder pan" サーボ)のケーブルをドライバ基板に接続できます。これでドライバ基板をロボットアームのベースに取り付けることができます。

能動アームについても同じ手順を繰り返します。

```Python
lerobot-setup-motors \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM0
```

[机械臂舵机设置ID-Linux系统.mp4]

# ステップ2: 組立

- 従動アームの組立手順は、能動アームと基本的に同じです。唯一の違いは、ステップ 12 以降のエンドエフェクタ(グリッパーとハンドル)の取付方法が異なる点です。

[SO-ARM101机械臂组装教程.mp4]

サーボドライバ基板の取付け: まず銅製スタンド 4 本を取り付け、4 本の M2.5*8 ネジでドライバ基板を固定します

![Linux/Ubuntu システム – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/7.png)

![Linux/Ubuntu システム – 2](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/8.png)

![Linux/Ubuntu システム – 3](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/9.png)

**Pro版の黑色の能動アームは5V6A電源アダプター、白色の従動アームは12V5A電源アダプターを使用**
