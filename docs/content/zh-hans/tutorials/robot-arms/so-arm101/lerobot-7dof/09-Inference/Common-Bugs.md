---
title: "常见Bug及解决"
description: "模型推理常见问题及解决:汇总摄像头获取失败、摄像头断连与舵机通信报错等现场问题的排查和处理办法。"
---

# 常见Bug及解决

## 摄像头获取失败

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/1.png)

检查一下腕部摄像头的接线是否松动，特别是靠近摄像头那端的接线，非常容易接触不良

## 摄像头断连

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/2.png)

重新启动一下命令行

## 舵机通信问题1

ConnectionError: Failed to sync read 'Present\_Position' on ids=\[1, 2, 3, 4, 5, 6\] after 1 tries\. \[TxRxResult\] There is no status packet\!

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/3.png)

解决方案，把`lerobot/src/lerobot/motors/motors_bus.py`代码中所有`num_retry`都改成99，特别是报错行对应的

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/4.png)

## 舵机通信问题2

ConnectionError: Failed to write 'Torque\_Enable' on id\_=1 with '0' after 6 tries\. \[TxRxResult\] There is no status packet\!

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/5.png)

![53823bc8797beb0cd2899d6c65ee9f63\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/6.png)

解决方法：重新校准机械臂



