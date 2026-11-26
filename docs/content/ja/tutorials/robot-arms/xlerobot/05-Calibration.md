---
title: "ロボットアームのキャリブレーション"
description: "XLeRobot の両腕と頭部のキャリブレーション：Windows / macOS / Linux の lerobot-calibrate コマンド、中間姿勢、リミット確認、左右アームの検証。"
---

# ロボットアームのキャリブレーション

![両腕と頭部のキャリブレーション手順](/images/tutorials/robot-arms/xlerobot/05-calibration/01.png)

## 両腕と頭部のキャリブレーション手順

> お使いの OS のコマンドを 1 つコピーして実行してください。`port1` は左腕の制御ボード、`port2` は右腕の制御ボードです。実際のポート番号は先に `lerobot-find-port` で確認してください。
>
> Linux では `ls /dev/ttyACM*` でポートをすばやく確認できます。

**Windows**

```bash
lerobot-calibrate \
    --robot.type=xlerobot --robot.id=juxi_xlerobot \
    --robot.port1=COM3 \
    --robot.port2=COM4
```

**macOS**

```bash
lerobot-calibrate \
    --robot.type=xlerobot --robot.id=juxi_xlerobot \
    --robot.port1=/dev/tty.usbmodem58546521551 \
    --robot.port2=/dev/tty.usbmodem58546521552
```

**Linux**

```bash
lerobot-calibrate \
    --robot.type=xlerobot --robot.id=juxi_xlerobot \
    --robot.port1=/dev/ttyACM0 \
    --robot.port2=/dev/ttyACM1
```

キャリブレーションコマンドを実行すると、まず Middle Position の入力を求められます。両腕を中間姿勢（可動爪を上、固定爪を下）にして Enter を押してください。その後、各関節を最大・最小リミットまで動かします。

::: warning キャリブレーションの注意

Enter キーでキャリブレーションを開始する前に、ロボットアームを中間位置（各関節が可動範囲の中央）に合わせてください。

各関節の最小値と最大値を確認してください。最小値が 0 を越えて突然 4095 から減少する場合、または最大値が 4095 を越えて 0 から増加する場合は、Feetech の上位ソフトで中間位置キャリブレーションを行ってから、ロボットアームのキャリブレーションをやり直してください。

:::

カメラタワーの 2 つのサーボも同様に、それぞれ最大・最小リミットまで一度動かしてください。

ターミナルに次の行が表示されると、左腕と頭部のキャリブレーションが始まります：

![両腕と頭部のキャリブレーション手順](/images/tutorials/robot-arms/xlerobot/05-calibration/02.png)

![両腕と頭部のキャリブレーション手順](/images/tutorials/robot-arms/xlerobot/05-calibration/03.png)

ターミナルに次の行が表示されると、右腕のキャリブレーションが始まります。ベースのホイールはキャリブレーション不要です。

![両腕と頭部のキャリブレーション手順](/images/tutorials/robot-arms/xlerobot/05-calibration/04.png)

![両腕と頭部のキャリブレーション手順](/images/tutorials/robot-arms/xlerobot/05-calibration/05.png)
