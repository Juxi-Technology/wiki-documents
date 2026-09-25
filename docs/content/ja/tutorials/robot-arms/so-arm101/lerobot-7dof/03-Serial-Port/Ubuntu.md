---
title: "Ubuntu"
description: "Ubuntuでシリアルポートデバイスを一覧表示し、フォロワーアームとリーダーアームのポート番号を確認して、書き込み権限を付与する手順です。"
---

# Ubuntu

# 方法1：Linuxコマンドラインで直接確認する

## シリアルポートデバイスのポートを確認する

```Shell
ls /dev/ttyACM*
```

## パソコンとロボットアームのUSBポートを接続する

先にフォロワーアーム（Follower）を接続し、続けてリーダーアーム（Leader）を接続します

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/1.png)

# 方法2：Lerobot公式ツール

```Shell
lerobot-find-port
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/2.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/3.png)

# 自分のポートを記録する

`/dev/ttyACM0`はフォロワーアーム（Follower）のシリアルポートデバイスのポート番号です

`/dev/ttyACM1`はリーダーアーム（Leader）のシリアルポートデバイスのポート番号です

# ポートに権限を付与する

すべてのユーザーがこれらのシリアルポートデバイスを読み書きできるようにします

```Shell
sudo chmod 666 /dev/ttyACM*
```











































