---
title: "3 · 接线与校准"
description: "接线与校准:两条臂的 USB 接线注意事项、Linux 串口权限,以及记录每个关节零点与行程范围的引导式校准。"
---

# 3 · 接线与校准

> **上一篇**：[02 安装与启动](02-Install.md)
> **下一篇**：[04 遥操作](04-Teleoperation.md)

校准记录每个关节的零点和行程范围。每条臂做一次；拆装过或校准文件丢了就要重做。

## 开始之前

- 两条臂都装好，舵机 ID 已写。
- 两条臂都上电。
- 一条臂一根 USB 线，插**两个独立的 USB 口**——共用一个集线器有时会枚举不稳定。

### Linux：串口权限

```bash
sudo usermod -aG dialout $USER
```

改完**注销重新登录**。不加的话 LeLab 能找到机械臂，但每次读取都报权限错误。Windows 和 macOS 不用做。

## 哪条臂是哪条

| 机械臂 | LeRobot 名字 | LeLab 叫 |
|---|---|---|
| 你用手拖着动的那条 | `so101_leader` | **teleop** |
| 跟着动的那条 | `so101_follower` | **robot** |

先校准主臂。两条弄混，是刚校准完却表现异常的常见原因。

## 流程

打开 **Calibration** 页，一次一条臂：

1. **选设备**——主臂（teleop）还是从臂（robot）。
2. **选串口。** LeLab 列出能看到的 USB 串口设备。分不清就拔掉一条臂看哪一项消失。选过的会记住。
3. **选校准配置**——已有的，或新建。配置存的是零点位置；这条臂以前校过就复用它的配置。
4. **跟着引导走。** LeLab 逐个关节引导，把关节摆到要求的位置并确认。不需要键盘输入。
5. **另一条臂重复**——它自己的配置和串口。

> 每份配置绑定一条物理臂。两条臂互换位置就必须重新校准。

## 摄像头

摄像头在同一个页面配置。每个摄像头的名字（`front`、`wrist`……）就是策略看到的键，取一个在训练日志里能认出来的名字。

摄像头可以在校准前后装，校准不依赖它。但**绑定关系要保持稳定**——录制时叫 `wrist` 的物理摄像头，到推理时换成另一个，策略会表现得毫无道理。

### 旋转

摄像头装反或侧着装，设置 **Rotation**：0°、90°、180°、270°（顺时针）。腕部摄像头装反是 180°。

旋转按摄像头保存，应用到设置预览、遥操作预览、录制的帧和推理。没设置过旋转的按 0° 处理。

- **90° 和 270° 会交换输出尺寸。** 640 × 480 变成 480 × 640。
- **从 checkpoint 的图片尺寸看不出朝向。** 0° 和 180° 尺寸相同、画面相反。推理前设成录制时用的那个，见[第 6 篇](06-Train-and-Inference.md)。

## 存到哪了

| 文件 | 内容 |
|---|---|
| `~/.cache/huggingface/lerobot/calibration/teleoperators/so101_leader/*.json` | 主臂配置 |
| `~/.cache/huggingface/lerobot/calibration/robots/so101_follower/*.json` | 从臂配置 |
| `~/.cache/huggingface/lerobot/ports/leader_port.txt` | 主臂串口 |
| `~/.cache/huggingface/lerobot/ports/follower_port.txt` | 从臂串口 |

这些都在 `~/.cache/` 下，会被清理缓存的工具删掉。校准好的臂忽然又要重新校准，先查这里——见[常见问题](07-Troubleshooting.md)。

---

> **下一篇**：[04 遥操作](04-Teleoperation.md)

<RelatedProducts slugs="so-arm101" />
