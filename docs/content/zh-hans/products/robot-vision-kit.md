---
title: SO-ARM101 机械臂视觉套件
category: robot
description: "钜犀科技 SO-ARM101 机械臂视觉套件:支持腕部、侧方与俯视三种安装,可选 60FPS 定焦或 30FPS 自动对焦变焦相机,兼容 ACT、GR00T 等训练框架。"
keywords: [camera mount, 视觉套件, 相机支架, so-arm101, 机械臂视觉]
---

# SO-ARM101 机械臂视觉套件

> **[淘宝购买](https://item.taobao.com/item.htm?id=912105917442)**

## 产品概述

SO-ARM101 机械臂视觉套件是专为机械臂设计的相机配件,提供双摄像头选择:**60FPS 定焦**和**30FPS 自动对焦变焦**。支持 SO-ARM101、LeKiwi 和 XLerobot 平台,兼容 **ACT、Smolvla、Pi0、Pi0.5、GR00T N1.5** 等主流具身智能训练框架。

**核心特性**:

- 三种安装位置:**腕部 / 侧方 / 俯视**
- 双相机选择:60FPS 定焦(快速运动捕捉)/ 30FPS 自动对焦变焦(灵活视觉开发)
- 与 SO-ARM101 完美匹配,无需额外修改
- 附赠防滑夹持垫

---

## 产品规格

| 类别 | 规格 |
|------|------|
| 兼容平台 | SO-ARM101、LeKiwi、XLerobot、M3 安装孔兼容平台 |
| 安装位置 | 腕部 / 侧方 / 俯视 |
| 相机选择 | 60FPS 定焦 / 30FPS 自动对焦变焦 |
| 训练框架兼容 | ACT、Smolvla、Pi0、Pi0.5、GR00T N1.5 |

## 相机对比

| 相机 | 适用场景 |
|------|---------|
| **60FPS 定焦** | 高帧率,成像稳定清晰,快速运动捕捉、固定距离视觉 |
| **30FPS 自动对焦变焦** | 焦距调节灵活,变距视觉应用场景 |

---

## 快速开始

### 1. 选择安装位置

- **腕部**:抓取操作视角(推荐抓取任务)
- **侧方**:全局环境视角
- **俯视**:桌面操作俯视视角(适合数据采集)

### 2. 安装

将相机模块固定到对应支架,通过 USB 连接主控(Jetson/树莓派)。

### 3. 训练框架集成

以 LeRobot 数据采集为例:

```bash
# 查找相机
python -m lerobot.find_cameras

# 采集带视觉数据
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras='{ front: {type: opencv, index_or_path: 0, width: 640, height: 480} }' \
  --dataset.repo_id=juxi/vision_test \
  --dataset.num_episodes=50
```

---

## 常见问题

**Q: 怎么选相机?**

**A:** 快速运动捕捉(如抓取)选 60FPS 定焦;变距视觉开发选 30FPS 自动对焦变焦。

**Q: 支持哪些训练框架?**

**A:** ACT、Smolvla、Pi0、Pi0.5、GR00T N1.5,全面覆盖主流具身智能模型训练框架。

**Q: 其他机械臂能用吗?**

**A:** SO-ARM101、LeKiwi、XLerobot 及其他带 M3 安装孔的兼容平台。

---

## 技术支持

- 📧 邮箱：support@juxitech.com
- 🌐 官方网站：[www.juxitech.com](https://www.juxitech.com)
- 💬 [问题反馈](https://github.com/Juxi-Technology/wiki-documents/issues)
