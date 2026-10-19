---
title: "SO-ARM101 機械臂教程總覽"
description: "SO-ARM101 教程首頁:從具身智慧與 LeRobot 講起,介紹機械臂本體、電腦配置要求與模仿學習(VLA),並給出完整課程導覽。"
---

# SO-ARM101 機械臂教程總覽

![image.png](../../../../../public/images/tutorials/robot-arms/so-arm101/so-arm101-index/d02-03.png)

## 什麼是具身智慧？

具備身體的智慧。把AI接入各種硬體實體，比如：

四足機器狗、雙足人形機器人、輪足機器人、無人機、自動駕駛車

## LeRobot是什麼？

LeRobot是HuggingFace開源的`具身智慧機器人軟體框架`

Github位址：https://github.com/huggingface/lerobot

低門檻實現：強化學習和**模仿學習（VLA）**的**資料採集、演算法訓練、推論部署**，其中最主要是**模仿學習（VLA）**

- 哪些機器人可以用LeRobot開發？

從千元級別的SO-ARM 101機械手臂、LeKiwi小車、到幾萬的松靈piper機械手臂、華馨京StarAI機械手臂、Hope-JR靈巧手，到十幾萬的宇樹G1人形機器人。LeRobot已經成為具身智慧產業，資料採集和演算法訓練的規範。

你也可以讓你自己的機器人適配LeRobot框架。

- LeRobot資料集和模型

LeRobot定義了自己的模仿學習資料集格式，你可以查看、使用、下載、訓練所有HuggingFace上的公開資料集和模型，也可以上傳自己的資料集到HuggingFace上

## SO-ARM 101機械手臂是什麼？

本教學以SO-ARM 101機械手臂為例，採用3D列印結構件和飛特伺服馬達，成本非常低。

這是窮學生也能買得起的具身智慧本體，也是LeRobot官方推薦的本體之一。

機械手臂包含主動臂（Leader）和從動臂（Follower）兩個機械手臂。每個機械手臂都包含5個自由度+1個夾爪自由度。

## 我需要什麼電腦規格

一臺普通Windows筆記型電腦可以完成訓練之前的所有操作

一臺普通的Mac電腦，可以完成所有操作

一臺帶輝達顯示卡的Ubuntu電腦，可以完成所有操作

本教學中，使用[雲GPU平臺](https://featurize.cn?s=d7ce99f842414bfcaea5662a97581bd1)訓練模型，不需要自己電腦有很高的規格

## 什麼是**模仿學習和VLA**？

人類拖拽機器人示教採集資料集，形成資料集。然後用這個資料集訓練模仿學習演算法，最終部署在機器人上，讓機器人自主模仿人類動作，泛化到真實環境。無需遙操作和遙控。

比如上面的影片中，人類拖拽SO-ARM機械手臂抓小龍蝦、蘸調料、下油鍋，最終讓機械手臂自主完成這一動作。就算來一隻新的小龍蝦也能隨時反應並完成動作。

模仿學習也有一個前沿時髦的名字：VLA（視覺語言動作大模型）。這也是現在發展最迅速、投資最火爆、中美競爭最激烈、開源生態最繁榮、媒體高度關注、無數碩博爭相進入的具身智慧研究領域。

LeRobot最主要適配的演算法就是模仿學習。比如ACT、Diffusion Policy、SmolVLA、Pi0、Pi0.5、Wall-OSS等。

教學中的模仿學習只有VLA。


## 教程導覽

### 完整課程

- [LeRobot 完整課程](/zh-hant/tutorials/robot-arms/so-arm101/lerobot/)
- [SO-ARM101機械臂 7軸 教程](/zh-hant/tutorials/robot-arms/so-arm101/lerobot-7dof/)

### 組裝與擴充教程

- [SO-ARM101 使用教程](/zh-hant/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [SO-ARM101 組裝教程](/zh-hant/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [臂載支架與環境相機套件安裝](/zh-hant/tutorials/robot-arms/so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation)
- [頂置攝像頭安裝](/zh-hant/tutorials/robot-arms/so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation)
- [平行指夾爪安裝](/zh-hant/tutorials/robot-arms/so-arm101/Parallel-Finger-Gripper-Installation)
- [SO-ARM101 雙臂(雙從動臂)教程](/zh-hant/tutorials/robot-arms/so-arm101/SO-ARM101-Bi-Arm-Tutorial)
- [SO-ARM101 無線遙操作(ESP32-NanoCam 版)](/zh-hant/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop)
- [無線遙操作排障指南](/zh-hant/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Troubleshooting)
- [SoARM 系列舵機校準工具使用教程](/zh-hant/tutorials/robot-arms/so-arm101/SO-ARM101-Servo-Calibration-Tool)
- [ROS2 模擬控制](/zh-hant/tutorials/robot-arms/so-arm101/ROS2-Simulation-Control)
- [SO-ARM101 Jetson Orin PyTorch 相容性](/zh-hant/tutorials/robot-arms/so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility)

### 基礎知識

- [了解 LeRobot](/zh-hant/tutorials/robot-arms/so-arm101/basics/Understanding-LeRobot)
- [Hugging Face 上的 LeRobot 數據集](/zh-hant/tutorials/robot-arms/so-arm101/basics/HF-Datasets)
- [模型訓練資源](/zh-hant/tutorials/robot-arms/so-arm101/basics/Training-Resources)
- [SO-ARM 100 機械臂官方 3D 列印檔案](/zh-hant/tutorials/robot-arms/so-arm101/basics/Official-3D-Print-Files)
- [URDF 檔案及資料參考](/zh-hant/tutorials/robot-arms/so-arm101/basics/URDF-Reference)
- [攝影機支架和安裝座推薦](/zh-hant/tutorials/robot-arms/so-arm101/basics/Camera-Mounts-Recommended)

### LeLab 教程

- [1 · 總覽](/zh-hant/tutorials/robot-arms/so-arm101/lelab/01-Overview)
- [2 · 安裝與啟動](/zh-hant/tutorials/robot-arms/so-arm101/lelab/02-Install)
- [3 · 連接與校準](/zh-hant/tutorials/robot-arms/so-arm101/lelab/03-Calibration)
- [4 · 遙操作](/zh-hant/tutorials/robot-arms/so-arm101/lelab/04-Teleoperation)
- [5 · 錄製資料集](/zh-hant/tutorials/robot-arms/so-arm101/lelab/05-Record-Dataset)
- [6 · 訓練與推論](/zh-hant/tutorials/robot-arms/so-arm101/lelab/06-Train-and-Inference)
- [7 · 疑難排解](/zh-hant/tutorials/robot-arms/so-arm101/lelab/07-Troubleshooting)
,### MuJoCo 仿真教程,,- [SO-ARM101 × MuJoCo 全流程教學（索引）](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/),- [01 · 環境準備](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/01-Environment),- [02 · 模擬模型驗證（MJCF 載入與驅動）](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/02-Sim-Model-Verification),- [03 · 實機連線與校正](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration),- [04 · 鍵盤遙控操作](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/04-Keyboard-Teleop),- [05 · 主動臂數位孿生（實體手臂驅動模擬手臂）](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/05-Leader-Digital-Twin),- [06 · 資料錄製與回放](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/06-Record-and-Replay),- [07 · 常見問題與經驗](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting),- [08 · 後續路線](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/08-Roadmap),- [09 · 完整使用教學（開臂 → 資料集 → 看影片 → 訓練 → 部署）](/zh-hant/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial)

### XLeRobot Docker 映像教程

- [XLeRobot Docker 教程 — Jetson AGX Orin 開發套件](/zh-hant/tutorials/jetson-agx-orin/xlerobot-docker/deployment/01-Overview)
- [XLeRobot Docker 教程 — Jetson Orin Nano 開發套件](/zh-hant/tutorials/jetson-orin-nano/xlerobot-docker/deployment/01-Overview)

<RelatedProducts slugs="so-arm101" />
