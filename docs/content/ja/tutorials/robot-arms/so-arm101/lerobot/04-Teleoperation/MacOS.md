---
title: "ステップ4:テレオペレーション（macOS）"
description: "Macでポート番号の確認と権限の付与を行い、テレオペレーションを実行する手順を、別のポートを使う場合も含めて説明します。"
---

# ステップ4:テレオペレーション（macOS）

## ポートに権限を付与する

すべてのユーザーがこれらのシリアルデバイスを読み書きできるようにします

```Shell
chmod 666 /dev/tty.*
```

## ポート番号の確認

フォロワーアーム：

/dev/tty.usbmodem5AAF2193061

/dev/tty.wchusbserial5AAF2193061

リーダーアーム：

/dev/tty.usbmodem5AAF2194741

/dev/tty.wchusbserial5AAF2194741

## テレオペレーション

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm
```

## 別のポートを使っても構いません

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.wchusbserial5AAF2193061 \
    --robot.id=my_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.wchusbserial5AAF2194741 \
    --teleop.id=my_leader_arm
```

<RelatedProducts slugs="so-arm101" />
