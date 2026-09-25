---
title: "Mac電腦"
description: "本頁說明如何在 macOS 設定連接埠權限並回顧連接埠號後執行遙操作，也說明改用另一個連接埠的方式。"
---

# Mac電腦

## 給端口賦予權限

讓所有用戶都有權限讀寫這些串口設備

```Shell
chmod 666 /dev/tty.*
```

## 回顧端口號

從動臂：

/dev/tty\.usbmodem5AAF2193061

/dev/tty\.wchusbserial5AAF2193061

主動臂：

/dev/tty\.usbmodem5AAF2194741

/dev/tty\.wchusbserial5AAF2194741

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

## 用另一個端口也行

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.wchusbserial5AAF2193061 \
    --robot.id=my_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.wchusbserial5AAF2194741 \
    --teleop.id=my_leader_arm
```



