---
title: "URDF 檔案及資料參考"
description: "本頁彙整 URDF 模型檔案與相關資源，包含 URDF Studio、LeRobot 網頁介面與手機控制從動臂等參考資料。"
---

# URDF 檔案及資料參考

## Lerbot官方的[URDF檔案](https://github.com/TheRobotStudio/SO-ARM100/blob/main/Simulation/SO101/so101_new_calib.urdf)

### URDF Studio

https://urdf.d-robotics.cc/

### ROS2 仿真控制（可自行實現）

https://github.com/holmsslk/so-arm-moveit-hardware

### LeRobot的官方圖形介面

https://github.com/huggingface/leLab

LeLab是一款網頁應用，它將 LeRobot 的全部工作流程——校準、遠程操控、記錄、訓練、回放——整合到一個瀏覽器介面中。只需連接機械臂，打開應用，即可開始操作。無需繁瑣的命令列操作，也無需鍵盤輸入。

🤗 LeRobot 的原生網頁入口，旨在讓新使用者在幾分鐘內完成從“開箱”到“訓練他們的第一個保單”的整個過程。

🤗 只需一條命令即可安裝並運行所有程式。

## 手機控制從動臂

https://huggingface.co/docs/lerobot/main/en/phone_teleop

### 雲端機器人研發：基於 AWS 實現 ROS 2 裝置與 Isaac Sim 的 Lerobot 仿真及數據流

https://github.com/ti/ti.github.io/blob/95261efa4f8bdb4c8571920762318a532e58c7fd/%E5%BC%80%E5%8F%91/isaac/aws-ros2-isaac.md

### 網頁端設定舵機ID和中位校準

https://bambot.org/feetech.js?lang=zh

1、根據舵機型號輸入0或1，點擊“連接”

![截图_20260413125622.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/1.png)

2、掃描ID 1~6 的舵機，可以根據掃描結果裡的FOUND確認對應ID舵機。例如圖片裡舵機 ID 1 被掃描到了

![截图_20260413125712.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/2.png)

3、ID設定和中位校準

①當前舵機ID輸入為被掃描到的舵機ID

②在“ID管理”中輸入數字，點擊“更改ID”即可設定ID

③中位校準（STS3215舵機中位是2047，SCS0009舵機中位是511）

STS舵機：在“位置控制”輸入2047，並點擊“Set”

SCS舵機：在“位置控制”輸入511，並點擊“Set”

![截图_20260413125748.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/3.png)

<RelatedProducts slugs="so-arm101" />
