---
title: 教程首页
titleTemplate: 产品教程与指南
description: "钜犀科技产品教程总入口，汇总 SO-ARM101、XLeRobot 机械臂与 GPS 北斗、IMU 传感器等模块的使用教程与文档。"
head:
  - [ meta, { property: "og:title", content: "教程首页 | 产品教程与指南" } ]
  - [ meta, { property: "og:description", content: "钜犀科技产品教程总入口，汇总 SO-ARM101、XLeRobot 机械臂与 GPS 北斗、IMU 传感器等模块的使用教程与文档。" } ]
---

# 产品教程首页

欢迎访问产品教程页面！在这里，您可以找到所有产品的使用教程、配置指南和最佳实践，帮助您快速上手并充分发挥产品的功能。

## 主题分类

### 快速开始

- [常见问题 FAQ](/zh-hans/tutorials/faq)
- [ROS 入门](/zh-hans/tutorials/ros-intro)
- [飞书文档](/zh-hans/tutorials/lark-wiki)



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

### Jetson AGX Orin 开发者套件

- [快速开始](/zh-hans/tutorials/jetson-agx-orin/quick-start)
- [刷机与更新](/zh-hans/tutorials/jetson-agx-orin/flashing-and-updates)
- [验证你的系统](/zh-hans/tutorials/jetson-agx-orin/verify-your-system)
- [接口与硬件布局](/zh-hans/tutorials/jetson-agx-orin/interfaces)
- [产品概述](/zh-hans/tutorials/jetson-agx-orin/overview)
- [本地 LLM 推理](/zh-hans/tutorials/jetson-agx-orin/local-llm)
- [智能体 AI (NemoClaw)](/zh-hans/tutorials/jetson-agx-orin/agentic-ai)
- [DeepStream 视频分析](/zh-hans/tutorials/jetson-agx-orin/deepstream)
- [机器人(现状)](/zh-hans/tutorials/jetson-agx-orin/robotics)
- [内存效率](/zh-hans/tutorials/jetson-agx-orin/memory-efficiency)
- [从 JetPack 6.x 迁移](/zh-hans/tutorials/jetson-agx-orin/jetpack-6-to-7)
- [下载](/zh-hans/tutorials/jetson-agx-orin/downloads)
- [常见问题 FAQ](/zh-hans/tutorials/jetson-agx-orin/faq)
- [故障排查](/zh-hans/tutorials/jetson-agx-orin/troubleshooting)
- [术语表](/zh-hans/tutorials/jetson-agx-orin/glossary)
- [更新日志](/zh-hans/tutorials/jetson-agx-orin/changelog)

### Jetson Orin Nano 开发者套件

- [快速开始](/zh-hans/tutorials/jetson-orin-nano/quick-start)
- [刷机与更新](/zh-hans/tutorials/jetson-orin-nano/flashing-and-updates)
- [验证你的系统](/zh-hans/tutorials/jetson-orin-nano/verify-your-system)
- [接口与硬件布局](/zh-hans/tutorials/jetson-orin-nano/interfaces)
- [产品概述](/zh-hans/tutorials/jetson-orin-nano/overview)
- [本地 LLM 推理](/zh-hans/tutorials/jetson-orin-nano/local-llm)
- [智能体 AI (NemoClaw)](/zh-hans/tutorials/jetson-orin-nano/agentic-ai)
- [DeepStream 视频分析](/zh-hans/tutorials/jetson-orin-nano/deepstream)
- [机器人(现状)](/zh-hans/tutorials/jetson-orin-nano/robotics)
- [内存效率](/zh-hans/tutorials/jetson-orin-nano/memory-efficiency)
- [从 JetPack 6.x 迁移](/zh-hans/tutorials/jetson-orin-nano/jetpack-6-to-7)
- [下载](/zh-hans/tutorials/jetson-orin-nano/downloads)
- [常见问题 FAQ](/zh-hans/tutorials/jetson-orin-nano/faq)
- [故障排查](/zh-hans/tutorials/jetson-orin-nano/troubleshooting)
- [术语表](/zh-hans/tutorials/jetson-orin-nano/glossary)
- [更新日志](/zh-hans/tutorials/jetson-orin-nano/changelog)

### 学习资源

- [学习资源首页](/zh-hans/tutorials/learning-resources/)
- [Jetson Orin PyTorch 兼容性](/zh-hans/tutorials/learning-resources/jetson-orin-pytorch-compatibility)

### 机械臂

- [机械臂总览](/zh-hans/tutorials/robot-arms/)
  - [选型指南](/zh-hans/tutorials/robot-arms/select-guide)
  - **SO-ARM101 系列**
    - [SO-ARM101 使用教程](/zh-hans/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
    - [SO-ARM101 组装教程](/zh-hans/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
    - [SO-ARM101 Jetson Orin PyTorch 兼容性](/zh-hans/tutorials/robot-arms/so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility)
    - [臂载支架与环境相机套件安装](/zh-hans/tutorials/robot-arms/so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation)
    - [顶置摄像头安装](/zh-hans/tutorials/robot-arms/so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation)
    - [SO-ARM101 无线遥操作(ESP32-NanoCam 版)](/zh-hans/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop)
    - [无线遥操作排障指南](/zh-hans/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Troubleshooting)
    - [SO-ARM101 双臂(双从臂)教程](/zh-hans/tutorials/robot-arms/so-arm101/SO-ARM101-Bi-Arm-Tutorial)
    - [SoARM 系列舵机校准工具使用教程](/zh-hans/tutorials/robot-arms/so-arm101/SO-ARM101-Servo-Calibration-Tool)
      - **LeRobot 完整课程**
        - [LeRobot 完整课程](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/)
          - **1. 安装 LeRobot 环境**
            - [第一步:安装 LeRobot 环境(Ubuntu)](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Ubuntu)
            - [第一步:安装 LeRobot 环境(Windows)](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Windows)
            - [第一步:安装 LeRobot 环境(macOS)](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/MacOS)
          - **2. 查看串口设备端口号**
            - [第二步:查看串口设备端口号(Ubuntu)](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/Ubuntu)
            - [第二步:查看串口设备端口号(Windows)](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/Windows)
            - [第二步:查看串口设备端口号(macOS)](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/02-Serial-Port/MacOS)
          - **3. 校准机械臂**
            - [第三步:校准机械臂(Ubuntu)](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/Ubuntu)
            - [第三步:校准机械臂(Windows)](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/Windows)
            - [第三步:校准机械臂(macOS)](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/03-Calibration/MacOS)
          - **4. 遥操作**
            - [第四步:遥操作(Ubuntu)](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/Ubuntu)
            - [第四步:遥操作(Windows)](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/Windows)
            - [第四步:遥操作(macOS)](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/04-Teleoperation/MacOS)
          - **5. 连接摄像头的遥操作**
            - [第五步:连接摄像头的遥操作(Ubuntu)](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/Ubuntu)
            - [第五步:连接摄像头的遥操作(Windows)](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/Windows)
            - [第五步:连接摄像头的遥操作(macOS)](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/05-Camera-Teleoperation/MacOS)
          - **6. 采集数据集(真机)**
            - [第六步:采集数据集(真机)——示教采集](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording)
            - [第六步:采集数据集(真机)——注意事项](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Collection-Notes)
            - [第六步:采集数据集(真机)——注册 Hugging Face 账号(可选)](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account)
            - [第六步:采集数据集(真机)——上传数据集到 Hugging Face(可选)](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload)
          - **7. 训练模型**
            - [第七步:训练模型——本地 Ubuntu 训练](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu)
            - [第七步:训练模型——云 GPU 训练环境配置](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU)
            - [第七步:训练模型——wandb 查看实时训练曲线](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)
            - [第七步:训练模型——上传模型到 Hugging Face(可选)](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload)
            - [第七步:训练模型——获得模型权重文件](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/Model-Weights)
            - [第七步:训练模型——ACT 训练命令](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-ACT)
            - [第七步:训练模型——pi0 训练命令](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0)
            - [第七步:训练模型——pi0.5 训练命令](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0.5)
            - [第七步:训练模型——pi0fast 训练命令](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0fast)
            - [第七步:训练模型——smolvla 训练命令](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-smolvla)
          - **8. 模型推理**
            - [第八步:模型推理——命令行说明](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/08-Inference/CLI-Reference)
            - [第八步:模型推理——常见 Bug 及解决](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Common-Bugs)
            - [第八步:模型推理——ACT 推理命令](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-ACT)
            - [第八步:模型推理——pi0 推理命令](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-pi0)
            - [第八步:模型推理——pi0.5 推理命令](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-pi0.5)
            - [第八步:模型推理——smolvla 推理命令](/zh-hans/tutorials/robot-arms/so-arm101/lerobot/08-Inference/Command-smolvla)
          - **基础知识**
            - [了解 LeRobot](/zh-hans/tutorials/robot-arms/so-arm101/basics/Understanding-LeRobot)
            - [Hugging Face 上的 LeRobot 数据集](/zh-hans/tutorials/robot-arms/so-arm101/basics/HF-Datasets)
            - [模型训练的资料](/zh-hans/tutorials/robot-arms/so-arm101/basics/Training-Resources)
            - [SO-ARM 100 机械臂官方 3D 打印文件](/zh-hans/tutorials/robot-arms/so-arm101/basics/Official-3D-Print-Files)
            - [URDF 文件及资料参考](/zh-hans/tutorials/robot-arms/so-arm101/basics/URDF-Reference)
          - **专题与进阶**
            - [ROS2 仿真控制](/zh-hans/tutorials/robot-arms/so-arm101/ROS2-Simulation-Control)
            - [平行指夹爪安装教程](/zh-hans/tutorials/robot-arms/so-arm101/Parallel-Finger-Gripper-Installation)
  - **SO-ARM101 + AmazingHand 教程**
    - [课程总览](/zh-hans/tutorials/robot-arms/so-arm-amazinghand/)
      - **Linux**
        - [阶段一：环境搭建（Linux）](/zh-hans/tutorials/robot-arms/so-arm-amazinghand/01-Environment-Setup-Linux)
        - [阶段二:灵巧手与双臂校准(Linux)](/zh-hans/tutorials/robot-arms/so-arm-amazinghand/02-Hand-Arm-Calibration-Linux)
        - [阶段三：遥操作（Linux）](/zh-hans/tutorials/robot-arms/so-arm-amazinghand/03-Teleoperation-Linux)
        - [阶段四：数据采集（Linux）](/zh-hans/tutorials/robot-arms/so-arm-amazinghand/04-Data-Collection-Linux)
        - [阶段五：模型训练（Linux）](/zh-hans/tutorials/robot-arms/so-arm-amazinghand/05-Model-Training-Linux)
        - [阶段六:模型部署(Linux)](/zh-hans/tutorials/robot-arms/so-arm-amazinghand/06-Model-Deployment-Linux)
      - **Windows**
        - [阶段一：环境搭建（Windows）](/zh-hans/tutorials/robot-arms/so-arm-amazinghand/01-Environment-Setup-Windows)
        - [阶段二:灵巧手与双臂校准(Windows)](/zh-hans/tutorials/robot-arms/so-arm-amazinghand/02-Hand-Arm-Calibration-Windows)
        - [阶段三：遥操作（Windows）](/zh-hans/tutorials/robot-arms/so-arm-amazinghand/03-Teleoperation-Windows)
        - [阶段四：数据采集（Windows）](/zh-hans/tutorials/robot-arms/so-arm-amazinghand/04-Data-Collection-Windows)
        - [阶段五：模型训练（Windows）](/zh-hans/tutorials/robot-arms/so-arm-amazinghand/05-Model-Training-Windows)
        - [阶段六:模型部署(Windows)](/zh-hans/tutorials/robot-arms/so-arm-amazinghand/06-Model-Deployment-Windows)
  - **XLeRobot 教程**
    - [教程总览](/zh-hans/tutorials/robot-arms/xlerobot/)
    - [安装环境(macOS)](/zh-hans/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS)
    - [安装环境(Ubuntu)](/zh-hans/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu)
    - [安装环境(Windows)](/zh-hans/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows)
    - [移动 XLeRobot 文件](/zh-hans/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files)
    - [成品组装教程](/zh-hans/tutorials/robot-arms/xlerobot/03-Assembly-Assembled-Kit)
    - [散件组装教程](/zh-hans/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit)
  - **AmazingHand**
    - [界面控制教程](/zh-hans/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control)
    - [AmazingHand灵巧手产品资料](/zh-hans/tutorials/robot-arms/amazing-hand/product-info)
    - [官方示例运行教程](/zh-hans/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example)
    - [TTL 调试教程](/zh-hans/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging)
      - **PWM 舵机调试教程**
        - [01-GUI可视化控制](/zh-hans/tutorials/robot-arms/amazing-hand/pwm-debugging/01-GUI-Visual-Control)
        - [02-手势追踪教程](/zh-hans/tutorials/robot-arms/amazing-hand/pwm-debugging/02-Gesture-Tracking)
        - [03-PWM舵机版本-使用手册](/zh-hans/tutorials/robot-arms/amazing-hand/pwm-debugging/03-PWM-Servo-Manual)
        - [04-串口舵机版本-使用说明](/zh-hans/tutorials/robot-arms/amazing-hand/pwm-debugging/04-Serial-Servo-Guide)
      - **手势追踪教程**
        - [Linux（Ubuntu）一键部署运行](/zh-hans/tutorials/robot-arms/amazing-hand/gesture-tracking/01-Ubuntu)
        - [Windows一键部署运行](/zh-hans/tutorials/robot-arms/amazing-hand/gesture-tracking/02-Windows)
        - [Mac一键部署运行](/zh-hans/tutorials/robot-arms/amazing-hand/gesture-tracking/03-macOS)
  - **Lekiwi**
    - [Lekiwi 使用教程](/zh-hans/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial)
    - [Lekiwi 组装教程](/zh-hans/tutorials/robot-arms/lekiwi/Lekiwi-Assembly)

### 配件

- [配件总览](/zh-hans/tutorials/accessories/)
  - **KWS 语音识别模块**
    - [系列教程首页](/zh-hans/tutorials/accessories/KWS-speech-recognition-module/)
    - [Jetson Nano 串口通信](/zh-hans/tutorials/accessories/KWS-speech-recognition-module/Jetson-Nano-serial-communication)
    - [Jetson 串口通信](/zh-hans/tutorials/accessories/KWS-speech-recognition-module/Jetson-serial-communication)
    - [PC 串口通信](/zh-hans/tutorials/accessories/KWS-speech-recognition-module/PC-serial-communication)
    - [树莓派串口通信](/zh-hans/tutorials/accessories/KWS-speech-recognition-module/raspberry-pi-serial-communication)
    - [ROS2 rviz2 可视化](/zh-hans/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization)
    - [中英文识别词固件下载与烧录](/zh-hans/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words)
  - **Feetech 舵机**
    - [STS3215 & SCS0009 调试教程](/zh-hans/tutorials/accessories/feetech/Feetech-STS3215&SCS0009-Tutorial)
    - [SCS 通信协议](/zh-hans/tutorials/accessories/feetech/Feetech-SCS_Communication_Protocol)
    - [磁编码 STS 舵机内存表解析](/zh-hans/tutorials/accessories/feetech/Feetech-Magnetic_Encoder_STS_Servo-Memory_Table_Analysis)
    - [电位器 SCSCL 舵机内存表解析](/zh-hans/tutorials/accessories/feetech/Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis)
    - [SCS0009 舵机调试工具使用教程](/zh-hans/tutorials/accessories/feetech/SCS0009-Debug-Tool)
  - **ESP32-NanoCam 图传模块**
    - [ESP32-NanoCam 快速开始](/zh-hans/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start)
    - [ESP32-NanoCam 硬件规格书](/zh-hans/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Hardware-Spec)
    - [ESP32-NanoCam 串口协议手册](/zh-hans/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Serial-Protocol)
      - **AI 视觉教程(11 章)**
        - [第 1 章:环境搭建](/zh-hans/tutorials/accessories/esp32-nanocam/Ch01-Environment-Setup)
        - [第 2 章:快速上手](/zh-hans/tutorials/accessories/esp32-nanocam/Ch02-Quick-Start)
        - [第 3 章:摄像头基础](/zh-hans/tutorials/accessories/esp32-nanocam/Ch03-Camera-Basics)
        - [第 4 章:人脸检测](/zh-hans/tutorials/accessories/esp32-nanocam/Ch04-Face-Detection)
        - [第 5 章:猫脸检测](/zh-hans/tutorials/accessories/esp32-nanocam/Ch05-Cat-Face-Detection)
        - [第 6 章:颜色识别](/zh-hans/tutorials/accessories/esp32-nanocam/Ch06-Color-Recognition)
        - [第 7 章:二维码扫描](/zh-hans/tutorials/accessories/esp32-nanocam/Ch07-QR-Code-Scanning)
        - [第 8 章:人脸识别](/zh-hans/tutorials/accessories/esp32-nanocam/Ch08-Face-Recognition)
        - [第 9 章:语音对话](/zh-hans/tutorials/accessories/esp32-nanocam/Ch09-Voice-Chat)
        - [第 10 章:AI 视觉理解](/zh-hans/tutorials/accessories/esp32-nanocam/Ch10-AI-Vision-Understanding)
        - [第 11 章:ESP-Claw 语音控制](/zh-hans/tutorials/accessories/esp32-nanocam/Ch11-ESP-Claw-Voice-Control)
  - **CSI 摄像头使用教程**
    - [Jetson CSI 摄像头配置](/zh-hans/tutorials/accessories/csi-camera/01-Jetson-CSI-Setup)
    - [自动对焦摄像头使用](/zh-hans/tutorials/accessories/csi-camera/02-Auto-Focus-Camera)
    - [Jupyter Lab 使用](/zh-hans/tutorials/accessories/csi-camera/03-JupyterLab)
    - [JetCam 使用](/zh-hans/tutorials/accessories/csi-camera/04-JetCam)
    - [IMX219(树莓派)教程](/zh-hans/tutorials/accessories/csi-camera/05-IMX219-RaspberryPi)
  - **AI 语音交互模块**
    - [快速上手](/zh-hans/tutorials/accessories/ai-voice-module/Quick-Start)
    - [产品资料](/zh-hans/tutorials/accessories/ai-voice-module/Product-Info)
    - [模块固件烧录](/zh-hans/tutorials/accessories/ai-voice-module/Firmware-Flashing)
    - [修改唤醒词和命令词](/zh-hans/tutorials/accessories/ai-voice-module/Wake-Word-Commands-Edit)
    - [自定义协议词条制作](/zh-hans/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries)
    - [ROS1语音交互](/zh-hans/tutorials/accessories/ai-voice-module/ROS1-Voice-Interaction)
    - [ROS2语音交互](/zh-hans/tutorials/accessories/ai-voice-module/ROS2-Voice-Interaction)
    - [串口协议](/zh-hans/tutorials/accessories/ai-voice-module/Serial-Protocol)
    - [IIC协议](/zh-hans/tutorials/accessories/ai-voice-module/IIC-Protocol)
    - [PC通讯](/zh-hans/tutorials/accessories/ai-voice-module/PC-Communication)
    - [Arduino: 串口通讯](/zh-hans/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication)
    - [Arduino: IIC通讯](/zh-hans/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication)
    - [Jetson: 串口通讯](/zh-hans/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication)
    - [Jetson: IIC通讯](/zh-hans/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication)
    - [RDK: 串口通讯](/zh-hans/tutorials/accessories/ai-voice-module/RDK-Serial-Communication)
    - [RDK: IIC通讯](/zh-hans/tutorials/accessories/ai-voice-module/RDK-IIC-Communication)
    - [树莓派: 串口通讯](/zh-hans/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication)
    - [树莓派: IIC通讯](/zh-hans/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication)
  - **其他配件**
    - [USB 自动对焦摄像头](/zh-hans/tutorials/accessories/usb-auto-focus-camera)
    - [Jetson CSI 摄像头](/zh-hans/tutorials/accessories/jetson-csi-camera)
    - [2 自由度相机云台](/zh-hans/tutorials/accessories/2dof-camera-gimbal)
    - [心率血氧传感器](/zh-hans/tutorials/accessories/heart-rate-spo2)
    - [0.91 寸 OLED 屏幕](/zh-hans/tutorials/accessories/0.91-oled-screen-tutorial)
    - [4K HDMI 采集器](/zh-hans/tutorials/accessories/4k-hdmi-capture-tutorial)
    - [KVM 切换器](/zh-hans/tutorials/accessories/kvm-switch-tutorial)
    - [USB 免驱声卡](/zh-hans/tutorials/accessories/usb-audio-card-tutorial)

### 传感器

- [传感器总览](/zh-hans/tutorials/sensors/)
  - **IMU 惯性导航模块**
    - [产品信息](/zh-hans/tutorials/sensors/imu/product-info)
    - [IMU 校准](/zh-hans/tutorials/sensors/imu/calibration)
    - [文件远程传输](/zh-hans/tutorials/sensors/imu/remote-file-transfer)
    - [SSH文件传输](/zh-hans/tutorials/sensors/imu/ssh-file-transfer)
      - **多板卡示例**
        - [多主控通信案例概览](/zh-hans/tutorials/sensors/imu/multi-board-examples/overview)
        - [PC 通信](/zh-hans/tutorials/sensors/imu/multi-board-examples/pc-communication)
          - **I2C 通信**
            - [Arduino](/zh-hans/tutorials/sensors/imu/multi-board-examples/i2c-communication/arduino)
            - [Jetson](/zh-hans/tutorials/sensors/imu/multi-board-examples/i2c-communication/jetson)
            - [树莓派](/zh-hans/tutorials/sensors/imu/multi-board-examples/i2c-communication/raspberry-pi)
            - [RDK](/zh-hans/tutorials/sensors/imu/multi-board-examples/i2c-communication/rdk)
            - [STM32](/zh-hans/tutorials/sensors/imu/multi-board-examples/i2c-communication/stm32)
          - **串口通信**
            - [Arduino](/zh-hans/tutorials/sensors/imu/multi-board-examples/serial-communication/arduino)
            - [Jetson](/zh-hans/tutorials/sensors/imu/multi-board-examples/serial-communication/jetson)
            - [树莓派](/zh-hans/tutorials/sensors/imu/multi-board-examples/serial-communication/raspberry-pi)
            - [RDK](/zh-hans/tutorials/sensors/imu/multi-board-examples/serial-communication/rdk)
            - [STM32](/zh-hans/tutorials/sensors/imu/multi-board-examples/serial-communication/stm32)
      - **ROS 示例**
        - [ROS1 应用](/zh-hans/tutorials/sensors/imu/ros-examples/ros1)
        - [ROS2 应用](/zh-hans/tutorials/sensors/imu/ros-examples/ros2)
  - **GPS 北斗定位模块**
    - [模块资料](/zh-hans/tutorials/sensors/gps/GPS-Module-Info)
    - [51 单片机:GPS 数据解析](/zh-hans/tutorials/sensors/gps/51-MCU-GPS-Parsing)
    - [Arduino:位置信息读取](/zh-hans/tutorials/sensors/gps/Arduino-Location-Reading)
    - [Arduino:位置信息解析](/zh-hans/tutorials/sensors/gps/Arduino-Location-Parsing)
    - [STM32F103:GPS 解析输出](/zh-hans/tutorials/sensors/gps/STM32F103-GPS-Parsing)
    - [Jetson:位置信息解析](/zh-hans/tutorials/sensors/gps/Jetson-GPS-Parsing)
    - [Jetson:AGNSS 辅助定位](/zh-hans/tutorials/sensors/gps/Jetson-AGNSS)
    - [Jetson:百度地图 API 申请](/zh-hans/tutorials/sensors/gps/Jetson-Baidu-Map-API)
    - [树莓派:位置信息解析](/zh-hans/tutorials/sensors/gps/RaspberryPi-GPS-Parsing)
    - [树莓派:AGNSS 辅助定位](/zh-hans/tutorials/sensors/gps/RaspberryPi-AGNSS)
    - [树莓派:百度地图 API 申请](/zh-hans/tutorials/sensors/gps/RaspberryPi-Baidu-Map-API)
    - [ROS:使用前准备](/zh-hans/tutorials/sensors/gps/ROS-Preparation)
    - [ROS:读取 GPS 数据](/zh-hans/tutorials/sensors/gps/ROS-Read-GPS-Data)
    - [ROS:绘制 GPS 轨迹](/zh-hans/tutorials/sensors/gps/ROS-Draw-GPS-Track)
    - [地图定位误差排查](/zh-hans/tutorials/sensors/gps/Map-Location-Error)

## 如何使用

1. **选择主题分类**：根据您的兴趣或需求，选择相应的主题分类
2. **查看教程列表**：在每个主题分类下，查看可用的教程和文档
3. **按照步骤操作**：按照教程中的步骤，逐步学习和使用产品
4. **实践与探索**：在实际操作中，尝试不同的功能和配置，积累经验
- **学习资源**
  - [学习资源首页](./learning-resources/index)
  - [Jetson Orin PyTorch 兼容性](./learning-resources/jetson-orin-pytorch-compatibility)

## 其他资源

- 如有问题或建议，请访问我们的 GitHub 仓库提交 Issue
- 关注我们的博客和社交媒体，获取最新的产品更新和教程信息
