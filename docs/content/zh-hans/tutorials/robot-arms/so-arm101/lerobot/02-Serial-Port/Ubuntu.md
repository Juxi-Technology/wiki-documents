---
title: "第二步:查看串口设备端口号(Ubuntu)"
description: "在 Ubuntu 下查看串口设备端口号:用命令行列出串口设备或 LeRobot 官方工具查找,记录从动臂与主动臂端口号并赋予读写权限。"
---

# 第二步:查看串口设备端口号(Ubuntu)

## 方法一：Linux命令行直接查看

### 查看串口设备端口

```Shell
ls /dev/ttyACM*
```

### 连接电脑和机械臂的USB口

先插上Follower从动臂，再继续插上Leader主动臂

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/1.png)

## 方法二：Lerobot官方工具

```Shell
lerobot-find-port
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/3.png)

## 记录我的端口

`/dev/ttyACM0`为Follower从动臂的串口设备端口号

`/dev/ttyACM1`为Leader主动臂的串口设备端口号

## 给端口赋予权限

让所有用户都有权限读写这些串口设备

```Shell
sudo chmod 666 /dev/ttyACM*
```

<RelatedProducts slugs="so-arm101" />
