---
title: SO-ARM101 开源七自由度机械臂
category: robot
description: "钜犀科技 SO-ARM101 开源七自由度机械臂——90° 腕部滚转、12V 30kg.cm 总线舵机、深度集成 LeRobot、工厂组装并附完整教程系列"
keywords: [so-arm101, 7-dof, 7轴, 机械臂, leRobot, 遥操作, 模仿学习]
---

# SO-ARM101 开源七自由度机械臂

> **[商店购买](https://www.juxitech.com/products/so-arm101-open-source-7-dof-robotic-arm)**

## 产品概述

SO-ARM101 是在 SO-ARM100 基础上进行深度优化的开源机械臂。改进后的电缆布线和电机/齿轮搭配消除了关节电缆断裂的问题，性能升级支持实时主从跟随。**这是 7 自由度版本**：它在 6 轴模型基础上增加了一个腕部滚转（偏航）舵机，使得腕部具有更大的姿态自由度、更多的可达点和多角度精确抓取能力。

它完美适配 Hugging Face **LeRobot** 工具包，并直接连接 PyTorch 模型和共享数据集，使得模仿学习和强化学习易于实践。产品包含完整的组装教程和 DIY 套件——学生、研究人员和创客都可以使用智能机器人进行学习、研究和创造。

**一览**：7 自由度，90° 腕部滚转 · 12V 30kg.cm 高扭矩舵机 · 可选 TPU 柔性夹爪 · 双视角数据采集 · NVIDIA 和 D-Robotics RDK 板载推理 · 工厂组装，开箱即用 · 支持 ACT / SmolVLA / Pi0 / Pi0.5 / GR00T N1.5 模型训练。

## 主要优势

### 7 自由度，90° 腕部滚转

7 自由度版本在 6 轴设计上增加了左/右腕部滚转（偏航）舵机，因此腕部可以从更多角度接近目标，并覆盖工作空间内的更多点。这种额外的自由度使得多角度、精细抓取成为可能。

### 主从遥操作与模仿学习

机械臂集成了 Hugging Face AI 框架。遥操作主动臂录制演示动作，然后一次性训练模仿学习模型并部署优化后的策略。它能够执行复杂任务并适应环境，实现端到端的自动化闭环。

### 双视角全局覆盖

SO-ARM101 臂载摄像头近距离捕捉目标的空间位置、角度和表面纹理，以实现更高保真度的数据采集，而桌面场景摄像头则实时读取工作空间环境。两者协同工作，确保操作精确，快速响应变化，并防止漂移或停滞。

### 30kg.cm 高扭矩 12V 总线舵机

从动臂统一采用 7 个 Feetech STS3215-C018（12V，30kg.cm，1:345），以确保在多轴负载下有足够的抓取扭矩，而主动臂保持 7.4V 以平衡手感和成本。12 位磁编码器在每个轴上提供 0.088° 的精度。

### 多模型训练支持

在同一硬件上训练和部署 ACT、SmolVLA、Pi0、Pi0.5 和 GR00T N1.5 策略，并直接从 LeRobot 模型中心复用 `lerobot/smolvla_base`、`lerobot/pi0_base`、`lerobot/pi05_base` 和 `lerobot/xvla-widowx` 等预训练模型。

### NVIDIA 和 D-Robotics RDK 板载推理

只需一根线缆连接树莓派、D-Robotics RDK 或 NVIDIA Jetson 控制器，即可在机械臂上进行推理，并获得实时电机控制和编码器反馈。

### 工厂组装，开箱即用

每台设备均已组装、接线和校准——连接电源和 USB，即可用于遥操作和数据采集。

### 可升级柔性夹爪

柔性夹爪是标准刚性夹爪的升级版，采用柔性 TPU 材料 3D 打印。它采用中空设计，内部有加强筋，并基于鳍型夹爪原理工作：它能适应被抓取物体的形状，减少施加在其上的接触力——非常适合抓取传统刚性夹爪无法安全处理的柔软或易损坏物品（水果、玻璃器皿、鸡蛋、食品加工）。

## 产品规格

| 类别 | 规格 |
|----------|------|
| 类型 | 主从遥操作机械臂 |
| 自由度 | 7（在 6 轴模型基础上增加腕部滚转/偏航轴） |
| 从动臂舵机 | 7 × Feetech STS3215-C018（12V，30kg.cm，1:345） |
| 主动臂舵机 | 7 × 7.4V STS3215——阻尼版：1 × C001（1:345）+ 2 × C044（1:191）+ 3 × C046（1:147）；零阻尼版：7 × C066 |
| 编码器 | 12 位磁编码器（0.088° 精度） |
| 电源 | 主动臂 5V6A / 从动臂 12V5A |
| 主控 | PC（Linux）/ 树莓派 / D-Robotics RDK / NVIDIA Jetson |
| 生态 | Hugging Face LeRobot（ACT / SmolVLA / Pi0 / Pi0.5 / GR00T N1.5） |
| 夹爪 | 刚性 PLA（标配）或柔性 TPU（升级） |
| 组装 | 工厂组装、接线并校准 |

*舵机布局与可选套餐配置见商店页面。*

## 相关教程

- **[SO-ARM101 7 自由度完整课程](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/)**——环境搭建、7DOF 文件替换、校准、遥操作、数据采集、训练与推理，逐步讲解
- [替换文件（让官方 lerobot 克隆适配 7DOF）](/zh-hans/tutorials/robot-arms/so-arm101/lerobot-7dof/02-Replace-Files-7DOF)
- [SO-ARM101 使用教程（6 轴）](/zh-hans/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [机械臂选型指南](/zh-hans/tutorials/robot-arms/select-guide)
- [具身智能入门（LeRobot）](/zh-hans/topics/embodied-ai-intro)

## 技术支持

- 📧 邮箱：support@juxitech.com
- 🌐 官方网站：[www.juxitech.com](https://www.juxitech.com)
