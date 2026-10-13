---
title: "1 · 总览"
description: "LeLab 用浏览器完成 LeRobot 全流程——校准、遥操作、录制、训练、回放:能做什么、环境要求与文件存放位置。"
---

# 1 · 总览

> **下一篇**：[02 安装与启动](02-Install.md)

LeLab 把 LeRobot 的流程——校准、遥操作、录制、训练、回放——放进一个浏览器窗口。

## 能做什么

| 页面 | 作用 |
|---|---|
| **Calibration 校准** | 两条臂的引导式校准 |
| **Teleoperation 遥操作** | 拖动主臂，从臂跟随，关节位置实时回传 |
| **Recording 录制** | 带摄像头把演示录成 LeRobotDataset |
| **Datasets 数据集** | 逐帧查看本地数据集，附关节运动曲线 |
| **Training 训练** | 启动 LeRobot 训练任务，实时看日志 |
| **Inference 推理** | 在从臂上跑训练好的策略 |
| **Upload 上传** | 把数据集推到 Hugging Face Hub |

## LeLab 和 LeRobot

LeRobot 是底层的库——机械臂驱动、数据格式、训练代码。LeLab 是调用它的 FastAPI 服务，加上一个通过 HTTP 和 WebSocket 通信的 React 前端。

- LeLab 界面里没有的功能，`lerobot-*` 命令行一样能用。
- LeLab 不打包 LeRobot，**装 LeLab 会连 LeRobot 一起装**。

## 需要什么

| | |
|---|---|
| 机器人 | **SO-101 主臂 + 从臂**，目前只支持这一种 |
| 电脑 | Linux / macOS / Windows |
| Python | **3.12 或更高** |
| Node.js | 22，只有 `lelab --dev` 需要 |
| USB | 两个空闲口，一条臂一个 |

校准、遥操作、录制在笔记本上够用。训练是重活，可以交给 Hugging Face 云端——见[第 6 篇](06-Train-and-Inference.md)。

## 文件存在哪

都在 `~/.cache/huggingface/lerobot/` 下：

| 路径 | 存什么 |
|---|---|
| `calibration/teleoperators/so101_leader/*.json` | 主臂校准文件 |
| `calibration/robots/so101_follower/*.json` | 从臂校准文件 |
| `ports/leader_port.txt` · `ports/follower_port.txt` | 上次用的串口 |
| `saved_configs/*.txt` | 上次选的校准配置 |

数据集在 LeRobot 默认的位置，通常就是同一棵树下面。

清掉这个缓存或重装 LeLab，两条臂都要重新校准。见[常见问题](07-Troubleshooting.md)。

## 关于叫法

LeRobot 按角色称呼两条臂，LeLab 的接口对同样两条臂用了另一套名字：

| 你说 | LeRobot / LeLab 说 |
|---|---|
| 你用手拖着动的那条 | **leader** · **teleop** |
| 跟着动的那条 | **follower** · **robot** |

---

> **下一篇**：[02 安装与启动](02-Install.md)

<RelatedProducts slugs="so-arm101" />
