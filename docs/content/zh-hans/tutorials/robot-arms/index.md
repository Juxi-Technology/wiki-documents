---
title: 机器人机械臂系列
description: "钜犀科技机械臂系列教程首页——SO-ARM101、AmazingHand、Lekiwi、XLeRobot"
---

# 机器人机械臂系列

欢迎来到机器人机械臂系列教程！这里包含各类开源机器人机械臂和灵巧手的完整使用指南。

---

## 产品列表

- [选型指南](./select-guide.md)

### SO-ARM101

6轴桌面开源机器人机械臂，支持LeRobot等AI框架。

- [SO-ARM101 使用教程](./so-arm101/SO-ARM101-Tutorial.md)
- [SO-ARM101 组装指南](./so-arm101/SO-ARM101-Assembly.md)
- [SO-ARM101 Jetson Orin PyTorch 兼容性](./so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility.md)
- [SO-ARM101 无线遥操作(ESP32-NanoCam 版)](./so-arm101/SO-ARM101-NanoCam-Wireless-Teleop.md)
- [SO-ARM101 双臂(双从臂)教程](./so-arm101/SO-ARM101-Bi-Arm-Tutorial.md)
- [SoARM 系列舵机校准工具](./so-arm101/SO-ARM101-Servo-Calibration-Tool.md)

#### SO-ARM101 系列
- [臂载支架与环境相机套件安装](./so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation.md)
- [顶置摄像头安装](./so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation.md)

#### 1. 安装 LeRobot 环境
- [第一步:安装 LeRobot 环境(Ubuntu)](./so-arm101/lerobot/01-Environment-Setup/Ubuntu.md)
- [第一步:安装 LeRobot 环境(Windows)](./so-arm101/lerobot/01-Environment-Setup/Windows.md)
- [第一步:安装 LeRobot 环境(macOS)](./so-arm101/lerobot/01-Environment-Setup/MacOS.md)

#### 2. 查看串口设备端口号
- [第二步:查看串口设备端口号(Ubuntu)](./so-arm101/lerobot/02-Serial-Port/Ubuntu.md)
- [第二步:查看串口设备端口号(Windows)](./so-arm101/lerobot/02-Serial-Port/Windows.md)
- [第二步:查看串口设备端口号(macOS)](./so-arm101/lerobot/02-Serial-Port/MacOS.md)

#### 3. 校准机械臂
- [第三步:校准机械臂(Ubuntu)](./so-arm101/lerobot/03-Calibration/Ubuntu.md)
- [第三步:校准机械臂(Windows)](./so-arm101/lerobot/03-Calibration/Windows.md)
- [第三步:校准机械臂(macOS)](./so-arm101/lerobot/03-Calibration/MacOS.md)

#### 4. 遥操作
- [第四步:遥操作(Ubuntu)](./so-arm101/lerobot/04-Teleoperation/Ubuntu.md)
- [第四步:遥操作(Windows)](./so-arm101/lerobot/04-Teleoperation/Windows.md)
- [第四步:遥操作(macOS)](./so-arm101/lerobot/04-Teleoperation/MacOS.md)

#### 5. 连接摄像头的遥操作
- [第五步:连接摄像头的遥操作(Ubuntu)](./so-arm101/lerobot/05-Camera-Teleoperation/Ubuntu.md)
- [第五步:连接摄像头的遥操作(Windows)](./so-arm101/lerobot/05-Camera-Teleoperation/Windows.md)
- [第五步:连接摄像头的遥操作(macOS)](./so-arm101/lerobot/05-Camera-Teleoperation/MacOS.md)

#### 6. 采集数据集(真机)
- [第六步:采集数据集(真机)——示教采集](./so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording.md)
- [第六步:采集数据集(真机)——注意事项](./so-arm101/lerobot/06-Data-Collection/Collection-Notes.md)
- [第六步:采集数据集(真机)——注册 Hugging Face 账号(可选)](./so-arm101/lerobot/06-Data-Collection/HF-Account.md)
- [第六步:采集数据集(真机)——上传数据集到 Hugging Face(可选)](./so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload.md)

#### 7. 训练模型
- [第七步:训练模型——本地 Ubuntu 训练](./so-arm101/lerobot/07-Training/Local-Ubuntu.md)
- [第七步:训练模型——云 GPU 训练环境配置](./so-arm101/lerobot/07-Training/Cloud-GPU.md)
- [第七步:训练模型——wandb 查看实时训练曲线](./so-arm101/lerobot/07-Training/WandB-Curves.md)
- [第七步:训练模型——上传模型到 Hugging Face(可选)](./so-arm101/lerobot/07-Training/HF-Model-Upload.md)
- [第七步:训练模型——获得模型权重文件](./so-arm101/lerobot/07-Training/Model-Weights.md)
- [第七步:训练模型——ACT 训练命令](./so-arm101/lerobot/07-Training/Command-ACT.md)
- [第七步:训练模型——pi0 训练命令](./so-arm101/lerobot/07-Training/Command-pi0.md)
- [第七步:训练模型——pi0.5 训练命令](./so-arm101/lerobot/07-Training/Command-pi0.5.md)
- [第七步:训练模型——pi0fast 训练命令](./so-arm101/lerobot/07-Training/Command-pi0fast.md)
- [第七步:训练模型——smolvla 训练命令](./so-arm101/lerobot/07-Training/Command-smolvla.md)

#### 8. 模型推理
- [第八步:模型推理——命令行说明](./so-arm101/lerobot/08-Inference/CLI-Reference.md)
- [第八步:模型推理——常见 Bug 及解决](./so-arm101/lerobot/08-Inference/Common-Bugs.md)
- [第八步:模型推理——ACT 推理命令](./so-arm101/lerobot/08-Inference/Command-ACT.md)
- [第八步:模型推理——pi0 推理命令](./so-arm101/lerobot/08-Inference/Command-pi0.md)
- [第八步:模型推理——pi0.5 推理命令](./so-arm101/lerobot/08-Inference/Command-pi0.5.md)
- [第八步:模型推理——smolvla 推理命令](./so-arm101/lerobot/08-Inference/Command-smolvla.md)

#### 基础知识
- [了解 LeRobot](./so-arm101/basics/Understanding-LeRobot.md)
- [Hugging Face 上的 LeRobot 数据集](./so-arm101/basics/HF-Datasets.md)
- [模型训练的资料](./so-arm101/basics/Training-Resources.md)
- [SO-ARM 100 机械臂官方 3D 打印文件](./so-arm101/basics/Official-3D-Print-Files.md)
- [URDF 文件及资料参考](./so-arm101/basics/URDF-Reference.md)

#### 专题与进阶
- [ROS2 仿真控制](./so-arm101/ROS2-Simulation-Control.md)
- [平行指夹爪安装教程](./so-arm101/Parallel-Finger-Gripper-Installation.md)


### SO-ARM101机械臂 7轴 教程

- [SO-ARM101机械臂 7轴 教程](/tutorials/robot-arms/so-arm101/lerobot-7dof/)
- **1. 安装 LeRobot 环境**
  - [Ubuntu电脑](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Ubuntu)
  - [Windows电脑](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Windows)
  - [MAC电脑](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/MacOS)
- **2. 替换文件（适配7DOF）**
  - [替换文件（适配7DOF）](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/02-Replace-Files-7DOF)
- **3. 查看串口设备端口号**
  - [Ubuntu](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Ubuntu)
  - [Windows电脑](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Windows)
  - [MAC电脑](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/MacOS)
- **4. 校准机械臂**
  - [Ubuntu电脑](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Ubuntu)
  - [Windows电脑](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Windows)
  - [Mac电脑](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/MacOS)
- **5. 遥操作**
  - [Ubuntu电脑](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Ubuntu)
  - [Windows电脑](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Windows)
  - [Mac电脑](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/MacOS)
- **6. 连接摄像头的遥操作**
  - [Ubuntu电脑](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Ubuntu)
  - [Windows电脑](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Windows)
  - [Mac电脑](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/MacOS)
- **7. 采集数据集(真机)**
  - [回看、回放数据集](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Browse-and-Replay)
  - [采集数据集注意事项](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Collection-Notes)
  - [注册Hugging Face账号（可选）](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Account)
  - [上传数据集到HuggingFace（可选）](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Dataset-Upload)
  - [示教采集数据集-握手200](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording-Handshake-200)
  - [示教采集数据集](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording)
- **8. 训练模型**
  - [云GPU训练环境配置](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Cloud-GPU)
  - [训练命令行-ACT（推荐入门）](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-ACT)
  - [训练命令行-Diffusion](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-Diffusion)
  - [训练命令行-pi0.5](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0.5)
  - [训练命令行-pi0（效果最好）](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0)
  - [训练命令行-pi0fast](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0fast)
  - [训练命令行-smolvla（推荐进阶）](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-smolvla)
  - [上传模型到HuggingFace（可选）](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/HF-Model-Upload)
  - [LeRobot支持的模仿学习算法](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Imitation-Learning-Algorithms)
  - [本地Ubuntu训练](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Local-Ubuntu)
  - [获得模型权重文件](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Model-Weights)
  - [训练参数建议](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Training-Parameter-Tips)
  - [wandb查看实时训练曲线](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/WandB-Curves)
- **9. 模型推理**
  - [命令行说明](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/CLI-Reference)
  - [推理命令行-ACT](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-ACT)
  - [推理命令行-Diffusion](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-Diffusion)
  - [推理命令行-pi0.5](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0.5)
  - [推理命令行-pi0](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0)
  - [推理命令行-smolvla](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-smolvla)
  - [常见Bug及解决](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Common-Bugs)
  - [英伟达DGX Spark推理](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/DGX-Spark)
  - [地瓜机器人 RDK S100推理](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/RDK-S100)

### AmazingHand

开源仿生灵巧手，提供高精度的多指操作能力。

- [AmazingHand 接口控制](./amazing-hand/AmazingHand-Interface-Control.md)
- [AmazingHand 官方示例](./amazing-hand/AmazingHand-Official-Example.md)
- [AmazingHand TTL调试](./amazing-hand/AmazingHand-TTL-Debugging.md)

#### AmazingHand
- [AmazingHand灵巧手产品资料](./amazing-hand/product-info.md)

#### PWM 舵机调试教程
- [01-GUI可视化控制](./amazing-hand/pwm-debugging/01-GUI-Visual-Control.md)
- [02-手势追踪教程](./amazing-hand/pwm-debugging/02-Gesture-Tracking.md)
- [03-PWM舵机版本-使用手册](./amazing-hand/pwm-debugging/03-PWM-Servo-Manual.md)
- [04-串口舵机版本-使用说明](./amazing-hand/pwm-debugging/04-Serial-Servo-Guide.md)

#### 手势追踪教程
- [Linux（Ubuntu）一键部署运行](./amazing-hand/gesture-tracking/01-Ubuntu.md)
- [Windows一键部署运行](./amazing-hand/gesture-tracking/02-Windows.md)
- [Mac一键部署运行](./amazing-hand/gesture-tracking/03-macOS.md)

### Lekiwi

完全开源的移动机器人小车，与 LeRobot 模仿学习框架兼容，支持 SO101 机械臂。

- [Lekiwi 使用教程](./lekiwi/Lekiwi-Tutorial.md)
- [Lekiwi 组装教程](./lekiwi/Lekiwi-Assembly.md)

### SO-ARM101 + AmazingHand 教程

SO-ARM101 从动臂 + AmazingHand 灵巧手的完整工作流:环境搭建、校准、遥操作、数据采集、模型训练与部署(Windows / Linux 分册)。

- [课程总览](./so-arm-amazinghand/index.md)

#### Linux

- [阶段一:环境搭建(Linux)](./so-arm-amazinghand/01-Environment-Setup-Linux.md)
- [阶段二:灵巧手与双臂校准(Linux)](./so-arm-amazinghand/02-Hand-Arm-Calibration-Linux.md)
- [阶段三:远程遥操(Linux)](./so-arm-amazinghand/03-Teleoperation-Linux.md)
- [阶段四:数据采集(Linux)](./so-arm-amazinghand/04-Data-Collection-Linux.md)
- [阶段五:模型训练(Linux)](./so-arm-amazinghand/05-Model-Training-Linux.md)
- [阶段六:模型部署(Linux)](./so-arm-amazinghand/06-Model-Deployment-Linux.md)

#### Windows

- [阶段一:环境搭建(Windows)](./so-arm-amazinghand/01-Environment-Setup-Windows.md)
- [阶段二:灵巧手与双臂校准(Windows)](./so-arm-amazinghand/02-Hand-Arm-Calibration-Windows.md)
- [阶段三:远程遥操(Windows)](./so-arm-amazinghand/03-Teleoperation-Windows.md)
- [阶段四:数据采集(Windows)](./so-arm-amazinghand/04-Data-Collection-Windows.md)
- [阶段五:模型训练(Windows)](./so-arm-amazinghand/05-Model-Training-Windows.md)
- [阶段六:模型部署(Windows)](./so-arm-amazinghand/06-Model-Deployment-Windows.md)

### XLeRobot 教程

XLeRobot 双臂移动机器人教程:环境搭建(LeRobot + conda 镜像)、文件部署、成品与散件组装。

- [教程总览](./xlerobot/index.md)
- [安装环境(macOS)](./xlerobot/01-Environment-Setup-macOS.md)
- [安装环境(Ubuntu)](./xlerobot/01-Environment-Setup-Ubuntu.md)
- [安装环境(Windows)](./xlerobot/01-Environment-Setup-Windows.md)
- [移动 XLeRobot 文件](./xlerobot/02-Move-Xlerobot-Files.md)
- [成品组装教程](./xlerobot/03-Assembly-Assembled-Kit.md)
- [散件组装教程](./xlerobot/04-Assembly-Parts-Kit.md)

---

## 技术支持

如有问题，请联系：

- 📧 邮箱：support@juxitech.com
- 💬 GitHub Issues：[问题反馈](https://github.com/Juxi-Technology/wiki-documents/issues)