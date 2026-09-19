---
title: 機器人機械臂系列
description: "鉅犀科技機械臂系列教程首頁——SO-ARM101、AmazingHand、Lekiwi、XLeRobot"
---

# 機器人機械臂系列

歡迎來到機器人機械臂系列教程！這裡包含各類開源機器人機械臂和靈巧手的完整使用指南。

---

## 產品列表

- [選型指南](./select-guide.md)

### SO-ARM101

6軸桌面開源機器人機械臂，支持LeRobot等AI框架。

- [SO-ARM101 使用教程](./so-arm101/SO-ARM101-Tutorial.md)
- [SO-ARM101 組裝指南](./so-arm101/SO-ARM101-Assembly.md)
- [SO-ARM101 Jetson Orin PyTorch 兼容性](./so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility.md)
- [SO-ARM101 無線遙操作(ESP32-NanoCam 版)](./so-arm101/SO-ARM101-NanoCam-Wireless-Teleop.md)
- [SO-ARM101 雙臂(雙從動臂)教程](./so-arm101/SO-ARM101-Bi-Arm-Tutorial.md)
- [SO-ARM101 7-DOF 改造與 LeRobot 使用](./so-arm101/SO-ARM101-7DOF-LeRobot.md)
- [SoARM 系列舵機校準工具](./so-arm101/SO-ARM101-Servo-Calibration-Tool.md)

#### SO-ARM101 系列
- [臂載支架與環境相機套件安裝](./so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation.md)
- [頂置攝像頭安裝](./so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation.md)

#### 1. 安裝 LeRobot 環境
- [第一步:安裝 LeRobot 環境(Ubuntu)](./so-arm101/lerobot/01-Environment-Setup/Ubuntu.md)
- [第一步:安裝 LeRobot 環境(Windows)](./so-arm101/lerobot/01-Environment-Setup/Windows.md)
- [第一步:安裝 LeRobot 環境(macOS)](./so-arm101/lerobot/01-Environment-Setup/MacOS.md)

#### 2. 查看串列埠編號
- [第二步:查看串列埠編號(Ubuntu)](./so-arm101/lerobot/02-Serial-Port/Ubuntu.md)
- [第二步:查看串列埠編號(Windows)](./so-arm101/lerobot/02-Serial-Port/Windows.md)
- [第二步:查看串列埠編號(macOS)](./so-arm101/lerobot/02-Serial-Port/MacOS.md)

#### 3. 校準機械臂
- [第三步:校準機械臂(Ubuntu)](./so-arm101/lerobot/03-Calibration/Ubuntu.md)
- [第三步:校準機械臂(Windows)](./so-arm101/lerobot/03-Calibration/Windows.md)
- [第三步:校準機械臂(macOS)](./so-arm101/lerobot/03-Calibration/MacOS.md)

#### 4. 遙操作
- [第四步:遙操作(Ubuntu)](./so-arm101/lerobot/04-Teleoperation/Ubuntu.md)
- [第四步:遙操作(Windows)](./so-arm101/lerobot/04-Teleoperation/Windows.md)
- [第四步:遙操作(macOS)](./so-arm101/lerobot/04-Teleoperation/MacOS.md)

#### 5. 連接攝像頭的遙操作
- [第五步:連接攝像頭的遙操作(Ubuntu)](./so-arm101/lerobot/05-Camera-Teleoperation/Ubuntu.md)
- [第五步:連接攝像頭的遙操作(Windows)](./so-arm101/lerobot/05-Camera-Teleoperation/Windows.md)
- [第五步:連接攝像頭的遙操作(macOS)](./so-arm101/lerobot/05-Camera-Teleoperation/MacOS.md)

#### 6. 採集數據集(實機)
- [第六步:示教採集數據集](./so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording.md)
- [第六步:數據集採集注意事項](./so-arm101/lerobot/06-Data-Collection/Collection-Notes.md)
- [第六步:註冊 Hugging Face 帳號(可選)](./so-arm101/lerobot/06-Data-Collection/HF-Account.md)
- [第六步:上傳數據集到 Hugging Face(可選)](./so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload.md)

#### 7. 訓練模型
- [第七步:本機 Ubuntu 訓練](./so-arm101/lerobot/07-Training/Local-Ubuntu.md)
- [第七步:雲端 GPU 訓練環境設定](./so-arm101/lerobot/07-Training/Cloud-GPU.md)
- [第七步:wandb 查看實時訓練曲線](./so-arm101/lerobot/07-Training/WandB-Curves.md)
- [第七步:上傳模型到 Hugging Face(可選)](./so-arm101/lerobot/07-Training/HF-Model-Upload.md)
- [第七步:取得模型權重檔案](./so-arm101/lerobot/07-Training/Model-Weights.md)
- [第七步:ACT 訓練命令列](./so-arm101/lerobot/07-Training/Command-ACT.md)
- [第七步:pi0 訓練命令列](./so-arm101/lerobot/07-Training/Command-pi0.md)
- [第七步:pi0.5 訓練命令列](./so-arm101/lerobot/07-Training/Command-pi0.5.md)
- [第七步:pi0fast 訓練命令列](./so-arm101/lerobot/07-Training/Command-pi0fast.md)
- [第七步:SmolVLA 訓練命令列](./so-arm101/lerobot/07-Training/Command-smolvla.md)

#### 8. 模型推論
- [第八步:推論命令列說明](./so-arm101/lerobot/08-Inference/CLI-Reference.md)
- [第八步:常見錯誤與排解](./so-arm101/lerobot/08-Inference/Common-Bugs.md)
- [第八步:ACT 推論命令列](./so-arm101/lerobot/08-Inference/Command-ACT.md)
- [第八步:pi0 推論命令列](./so-arm101/lerobot/08-Inference/Command-pi0.md)
- [第八步:pi0.5 推論命令列](./so-arm101/lerobot/08-Inference/Command-pi0.5.md)
- [第八步:SmolVLA 推論命令列](./so-arm101/lerobot/08-Inference/Command-smolvla.md)

#### 基礎知識
- [了解 LeRobot](./so-arm101/basics/Understanding-LeRobot.md)
- [Hugging Face 上的 LeRobot 數據集](./so-arm101/basics/HF-Datasets.md)
- [模型訓練資源](./so-arm101/basics/Training-Resources.md)
- [SO-ARM 100 機械臂官方 3D 列印檔案](./so-arm101/basics/Official-3D-Print-Files.md)
- [URDF 檔案及資料參考](./so-arm101/basics/URDF-Reference.md)

#### 其他與進階
- [ROS2 模擬控制](./so-arm101/ROS2-Simulation-Control.md)
- [平行指夾爪安裝](./so-arm101/Parallel-Finger-Gripper-Installation.md)

### AmazingHand

開源仿生靈巧手，提供高精度的多指操作能力。

- [AmazingHand 接口控制](./amazing-hand/AmazingHand-Interface-Control.md)
- [AmazingHand 官方示例](./amazing-hand/AmazingHand-Official-Example.md)
- [AmazingHand TTL調試](./amazing-hand/AmazingHand-TTL-Debugging.md)

#### AmazingHand
- [AmazingHand靈巧手產品資料](./amazing-hand/product-info.md)

#### PWM 舵機調試教程
- [01-GUI可視化控制](./amazing-hand/pwm-debugging/01-GUI-Visual-Control.md)
- [02-手勢追蹤教程](./amazing-hand/pwm-debugging/02-Gesture-Tracking.md)
- [03-PWM舵機版本-使用手冊](./amazing-hand/pwm-debugging/03-PWM-Servo-Manual.md)
- [04-串口舵機版本-使用說明](./amazing-hand/pwm-debugging/04-Serial-Servo-Guide.md)

#### 手勢追蹤教程
- [Linux（Ubuntu）一鍵部署執行](./amazing-hand/gesture-tracking/01-Ubuntu.md)
- [Windows一鍵部署執行](./amazing-hand/gesture-tracking/02-Windows.md)
- [Mac一鍵部署執行](./amazing-hand/gesture-tracking/03-macOS.md)

### Lekiwi

完全開源的移動機器人小車，與 LeRobot 模仿學習框架兼容，支持 SO101 機械臂。

- [Lekiwi 使用教程](./lekiwi/Lekiwi-Tutorial.md)
- [Lekiwi 組裝教程](./lekiwi/Lekiwi-Assembly.md)

### SO-ARM101 + AmazingHand 教程

SO-ARM101 從動臂 + AmazingHand 靈巧手的完整工作流:環境搭建、校準、遙操作、數據採集、模型訓練與部署(Windows / Linux 分冊)。

- [課程總覽](./so-arm-amazinghand/index.md)
- [階段一:環境搭建(Linux)](./so-arm-amazinghand/01-Environment-Setup-Linux.md)
- [階段一:環境搭建(Windows)](./so-arm-amazinghand/01-Environment-Setup-Windows.md)
- [階段二:靈巧手與雙臂校準(Linux)](./so-arm-amazinghand/02-Hand-Arm-Calibration-Linux.md)
- [階段二:靈巧手與雙臂校準(Windows)](./so-arm-amazinghand/02-Hand-Arm-Calibration-Windows.md)
- [階段三:遠程遙操(Linux)](./so-arm-amazinghand/03-Teleoperation-Linux.md)
- [階段三:遠程遙操(Windows)](./so-arm-amazinghand/03-Teleoperation-Windows.md)
- [階段四:數據採集(Linux)](./so-arm-amazinghand/04-Data-Collection-Linux.md)
- [階段四:數據採集(Windows)](./so-arm-amazinghand/04-Data-Collection-Windows.md)
- [階段五:模型訓練(Linux)](./so-arm-amazinghand/05-Model-Training-Linux.md)
- [階段五:模型訓練(Windows)](./so-arm-amazinghand/05-Model-Training-Windows.md)
- [階段六:模型部署(Linux)](./so-arm-amazinghand/06-Model-Deployment-Linux.md)
- [階段六:模型部署(Windows)](./so-arm-amazinghand/06-Model-Deployment-Windows.md)

### XLeRobot 教程

XLeRobot 雙臂移動機器人教程:環境搭建(LeRobot + conda 鏡像)、文件部署、成品與散件組裝。

- [教程總覽](./xlerobot/index.md)
- [安裝環境(macOS)](./xlerobot/01-Environment-Setup-macOS.md)
- [安裝環境(Ubuntu)](./xlerobot/01-Environment-Setup-Ubuntu.md)
- [安裝環境(Windows)](./xlerobot/01-Environment-Setup-Windows.md)
- [移動 XLeRobot 文件](./xlerobot/02-Move-Xlerobot-Files.md)
- [成品組裝教程](./xlerobot/03-Assembly-Assembled-Kit.md)
- [散件組裝教程](./xlerobot/04-Assembly-Parts-Kit.md)

---

## 技術支援

如有問題，請聯繫：

- 📧 郵箱：support@juxitech.com
- 💬 GitHub Issues：[問題回饋](https://github.com/Juxi-Technology/wiki-documents/issues)