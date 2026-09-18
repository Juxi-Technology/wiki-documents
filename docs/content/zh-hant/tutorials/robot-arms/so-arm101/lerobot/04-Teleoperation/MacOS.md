---
title: "第四步:遙操作(macOS)"
description: "本頁說明如何在 macOS 設定連接埠權限並回顧連接埠號後執行遙操作，也說明改用另一個連接埠的方式。"
---

# 第四步:遙操作(macOS)

## 給連接埠賦予權限

讓所有使用者都有權限讀寫這些串口裝置

```Shell
chmod 666 /dev/tty.*
```

## 回顧連接埠號

從動臂：

/dev/tty.usbmodem5AAF2193061

/dev/tty.wchusbserial5AAF2193061

主動臂：

/dev/tty.usbmodem5AAF2194741

/dev/tty.wchusbserial5AAF2194741

## 遙操作

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm
```

## 用另一個連接埠也行

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
