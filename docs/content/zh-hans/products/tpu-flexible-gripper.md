---
title: SO-ARM101 TPU 柔性夹爪
description: 钜犀科技 SO-ARM101 TPU 柔性夹爪——软 TPU 材质安全抓取不规则/易碎物品,支持臂载相机,可选 30FPS 变焦或 60FPS 定焦
keywords: [gripper, 夹爪, tpu, 柔性, so-arm101, 抓取]
---

# SO-ARM101 TPU 柔性夹爪

> **[淘宝购买](https://item.taobao.com/item.htm?id=1016135072975)**

## 产品概述

这款 SO-ARM101 TPU 柔性夹爪专为 XLerobot 机械臂设计,支持安装 SO-ARM101 臂载相机支架/套件。采用柔软的 **TPU 材质**,非常适合抓取不规则和易碎物品而不造成损坏;配合可选相机配置(变焦 30FPS / 定焦 60FPS),满足机器人抓取开发与视觉引导应用。

**核心特性**:

- 直接安装到 XLerobot 机械臂,无需额外修改
- 软 TPU:柔韧、耐磨、防滑,安全抓取易碎/不规则物品
- 兼容 SO-ARM101 臂载相机支架/套件(视觉引导抓取)
- 螺丝直连固定,即插即用,无需复杂接线

---

## 产品规格

| 类别 | 规格 |
|------|------|
| 兼容机械臂 | SO-ARM101(XLerobot 系列) |
| 材质 | 软 TPU(热塑性聚氨酯,柔韧耐磨防滑) |
| 驱动方式 | 舵机驱动 |
| 可选相机 | 变焦 30FPS / 定焦 60FPS |
| 安装方式 | 螺丝直连固定,即插即用 |

## 套件内容

| 套件 | 内容 |
|------|------|
| **基础夹爪** | 1× TPU 柔性夹爪 |
| **变焦相机套件** | 夹爪 + 30FPS 自动对焦变焦相机 |
| **定焦相机套件** | 夹爪 + 60FPS 定焦相机 |

---

## 快速开始

1. 将夹爪螺丝孔与机械臂末端对齐
2. 螺丝直连固定(无需接线改动)
3. 如需视觉引导,加装 SO-ARM101 臂载相机支架

### 视觉抓取开发

配合臂载相机与 LeRobot 框架:

```bash
# 录制视觉抓取数据
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras='{ front: {type: opencv, index_or_path: 0} }' \
  --dataset.repo_id=juxi/gripper_test \
  --dataset.num_episodes=50
```

---

## 常见问题

**Q: 为什么不规则/易碎物品也能抓?**

TPU 柔性材质会自适应物体形状,受力均匀,有效避免损坏被夹持物体。

**Q: 如何选相机?**

- 变焦 30FPS:焦距灵活,适合变距视觉应用
- 定焦 60FPS:高帧率,适合快速运动捕捉

**Q: 支持哪些平台?**

SO-ARM101 / XLerobot 机械臂系列,与 ACT、Smolvla、Pi0 等 LeRobot 训练框架兼容。

---

## 技术支持

- 📧 邮箱：support@juxitech.com
- 🌐 官方网站：[www.juxitech.com](https://www.juxitech.com)
- 💬 [问题反馈](https://github.com/Juxi-Technology/wiki-documents/issues)
