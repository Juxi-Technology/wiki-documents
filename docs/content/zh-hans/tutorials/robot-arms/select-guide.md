---
title: 机械臂选型指南
description: SO-ARM101 vs AmazingHand vs Lekiwi 机械臂对比与选型建议
---

# 机械臂选型指南

钜犀科技提供多款机械臂产品，分别面向不同的应用场景。本文档帮助你快速对比并选择适合的型号。

> 注：具体参数以各产品官方文档为准，本表用于选型参考。

## 三款机械臂对比

| 特性 | SO-ARM101 | AmazingHand | Lekiwi |
|------|-----------|-------------|--------|
| **类型** | 双臂遥操作机器人 | 灵巧手 | 低成本教学机械臂 |
| **自由度** | 双臂各 6 DOF | 4 指灵巧手 | 6 DOF |
| **控制方式** | LeRobot 生态 / Python API | TTL 串行总线 | 舵机控制 |
| **主控平台** | PC(Linux) / Jetson | 主控板 | PC / 单片机 |
| **适用场景** | AI 模仿学习、遥操作研究 | 抓取操作、手势复现 | 教学、入门学习 |
| **开源生态** | [LeRobot](https://github.com/Juxi-Technology/lerobot) | [AmazingHand](https://github.com/Juxi-Technology/AmazingHand) | 官方文档 |
| **适合人群** | 研究者、AI 开发者 | 机器人操作研究者 | 学生、爱好者 |

## 如何选择？

### 🎓 学生 / 教学入门 → Lekiwi

- 结构简单、成本低，适合课堂教学和入门学习
- 舵机控制方式直观，上手快

### 🤖 抓取与操作研究 → AmazingHand

- 4 指灵巧手，适合抓取策略、手势控制研究
- TTL 串行总线控制，与主流主控兼容

### 🧠 AI 模仿学习 / 遥操作 → SO-ARM101

- 双臂设计，支持 leader-follower 遥操作
- 深度集成 LeRobot 生态，适合模仿学习研究
- 支持 Jetson 平台，与 AI 工作流无缝衔接

## 组合推荐

| 需求 | 推荐组合 |
|------|---------|
| AI 遥操作研究 | SO-ARM101 + AmazingHand(灵巧手操作) |
| 教学实验室 | Lekiwi × N(批量部署) |
| 完整机器人系统 | SO-ARM101 + IMU 模块 + 视觉配件 |

## 相关教程

- [SO-ARM101 使用教程](/zh-hans/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [AmazingHand 界面控制教程](/zh-hans/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control)
- [Lekiwi 使用教程](/zh-hans/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial)

## 技术支持

- 📧 邮箱：support@juxitech.com
- 🌐 官方网站：[www.juxitech.com](https://www.juxitech.com)
