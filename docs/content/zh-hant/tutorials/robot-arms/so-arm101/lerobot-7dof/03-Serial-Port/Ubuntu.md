---
title: "Ubuntu"
description: "本頁說明如何在 Ubuntu 用命令列與官方工具查看兩支機械臂的串列埠編號並設定權限，再記錄下來供後續使用。"
---

# Ubuntu

# 方法一：Linux命令行直接查看

## 查看串口設備端口

```Shell
ls /dev/ttyACM*
```

## 連接電腦和機械臂的USB口

先插上Follower從動臂，再繼續插上Leader主動臂

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/1.png)

# 方法二：Lerobot官方工具

```Shell
lerobot-find-port
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/2.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/3.png)

# 記錄我的端口

`/dev/ttyACM0`為Follower從動臂的串口設備端口號

`/dev/ttyACM1`為Leader主動臂的串口設備端口號

# 給端口賦予權限

讓所有用戶都有權限讀寫這些串口設備

```Shell
sudo chmod 666 /dev/ttyACM*
```











































