---
title: "第二步:查看串列埠編號(Ubuntu)"
description: "本頁說明如何在 Ubuntu 用命令列與官方工具查看兩支機械臂的串列埠編號並設定權限，再記錄下來供後續使用。"
---

# 第二步:查看串列埠編號(Ubuntu)

## 方法一：Linux命令列直接查看

### 查看串口裝置連接埠

```Shell
ls /dev/ttyACM*
```

### 連接電腦和機械臂的USB口

先插上Follower從動臂，再繼續插上Leader主動臂

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/1.png)

## 方法二：Lerobot官方工具

```Shell
lerobot-find-port
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/3.png)

## 記錄我的連接埠

`/dev/ttyACM0`為Follower從動臂的串口裝置連接埠號

`/dev/ttyACM1`為Leader主動臂的串口裝置連接埠號

## 給連接埠賦予權限

讓所有使用者都有權限讀寫這些串口裝置

```Shell
sudo chmod 666 /dev/ttyACM*
```

<RelatedProducts slugs="so-arm101" />
