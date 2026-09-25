---
title: "常見Bug及解決"
description: "本頁整理模型推論時的常見錯誤與排解方式，包含攝像頭取得失敗、攝像頭斷線與伺服馬達通訊問題。"
---

# 常見Bug及解決

## 攝像頭獲取失敗

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/1.png)

檢查一下腕部攝像頭的接線是否鬆動，特別是靠近攝像頭那端的接線，非常容易接觸不良

## 攝像頭斷連

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/2.png)

重新啟動一下命令行

## 舵機通信問題1

ConnectionError: Failed to sync read 'Present\_Position' on ids=\[1, 2, 3, 4, 5, 6\] after 1 tries\. \[TxRxResult\] There is no status packet\!

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/3.png)

解決方案，把`lerobot/src/lerobot/motors/motors_bus.py`代碼中所有`num_retry`都改成99，特別是報錯行對應的

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/4.png)

## 舵機通信問題2

ConnectionError: Failed to write 'Torque\_Enable' on id\_=1 with '0' after 6 tries\. \[TxRxResult\] There is no status packet\!

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/5.png)

![53823bc8797beb0cd2899d6c65ee9f63\.png](/images/tutorials/robot-arms/so-arm101/lerobot-08-Inference-Common-Bugs/6.png)

解決方法：重新校準機械臂



