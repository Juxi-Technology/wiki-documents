---
title: "Mac电脑"
description: "在 Mac 下做遥操作:先给端口赋权限并确认端口号,运行遥操作命令让主动臂带动从动臂,两个串口驱动端口任选其一均可。"
---

# Mac电脑

## 给端口赋予权限

让所有用户都有权限读写这些串口设备

```Shell
chmod 666 /dev/tty.*
```

## 回顾端口号

从动臂：

/dev/tty\.usbmodem5AAF2193061

/dev/tty\.wchusbserial5AAF2193061

主动臂：

/dev/tty\.usbmodem5AAF2194741

/dev/tty\.wchusbserial5AAF2194741

## 遥操作

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm
```

## 用另一个端口也行

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.wchusbserial5AAF2193061 \
    --robot.id=my_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.wchusbserial5AAF2194741 \
    --teleop.id=my_leader_arm
```



