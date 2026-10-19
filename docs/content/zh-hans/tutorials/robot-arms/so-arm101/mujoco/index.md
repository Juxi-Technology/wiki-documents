---
title: "SO-ARM101 × MuJoCo 全流程教程（索引）"
---

# SO-ARM101 × MuJoCo 全流程教程（索引）


> 本教程记录并复现 SO-ARM101 的**仿真 + 真机完整工作流**：从环境搭建、模型验证、实机标定，
> 到键盘/主动臂遥操、数据录制与回放。所有命令均在 2026-10-15 的实机 + 仿真会话中实测通过。
>
> 适用对象：Juxi SO-ARM101 套件用户与内部工程师。不要求预先了解 MuJoCo 或 LeRobot。

## 全流程地图（两条轨，共用一套组件）

```
                         ┌──────────────── 共用组件 ────────────────┐
                         │  数据集格式(LeRobotDataset) · 回放 · 未来训练  │
                         └──────────────────────────────────────────┘
                                      ▲                    ▲
        ┌── 真机轨 ──────────────────┘                    └──────────── 仿真轨 ──┐
        │  操控: 主动臂(实体) / 键盘                                      操控: 键盘 / 主动臂(实体) │
        │  被控: 真机从动臂 (COM 串口)                                    被控: MuJoCo 仿真从动臂   │
        │  命令: --robot.type=so101_follower                            命令: --robot.type=so101_mujoco │
        └───────────────────────────────────────────────────────────────────────┘
```

| 章 | 内容 | 你会得到 |
| --- | --- | --- |
| [01 环境准备](/zh-hans/tutorials/robot-arms/so-arm101/mujoco/01-Environment) | uv 环境、依赖 extras、Windows 注意事项 | 可运行的环境 |
| [02 仿真模型验证](/zh-hans/tutorials/robot-arms/so-arm101/mujoco/02-Sim-Model-Verification) | 三份 MJCF 模型加载/对比/驱动渲染 | 对模型与仿真行为的确信 |
| [03 实机连接与标定](/zh-hans/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration) | 串口识别、只读初检、从动臂/主动臂标定 | 可被软件识别的两台臂 |
| [04 键盘遥操](/zh-hans/tutorials/robot-arms/so-arm101/mujoco/04-Keyboard-Teleop) | 键盘驱动真机/仿真、速率调参、安全限速 | 最快的手动控制方式 |
| [05 主动臂数字孪生](/zh-hans/tutorials/robot-arms/so-arm101/mujoco/05-Leader-Digital-Twin) | 实体主动臂驱动仿真从动臂、零点微调 | 数字孪生演示与数据采集 |
| [06 数据录制与回放](/zh-hans/tutorials/robot-arms/so-arm101/mujoco/06-Record-and-Replay) | 录真机/录仿真/回合控制/回放/体检脚本 | 可训练的数据集 |
| [07 常见问题与经验](/zh-hans/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting) | 本流程踩过的所有坑与解法 | 排障手册 |
| [08 后续路线](/zh-hans/tutorials/robot-arms/so-arm101/mujoco/08-Roadmap) | 相机、物体场景、自动数据生成、训练 | 下一步计划 |
| [09 完整使用教程](/zh-hans/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial) | 开臂 → 录制 → 体检 → 看视频 → 训练 → 仿真部署一条龙；含 conda 环境替代方案 | 从零到合格数据集，再到策略上场 |

**首次使用顺序建议**：01（环境）→ 03（接真机时才需要）→ 按 [09 完整使用教程](/zh-hans/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial)
走主线（录制 → 体检 → 看视频 → 训练 → 部署）；02 与 04–08 是参考手册，按需查阅即可。
09 里的每条命令都可以直接复制执行，不需要中途回到其他章节补装环境。

## 三条必须记住的约定

1. **单位制**（三方对齐）：五个身体关节用 **−100 到 100**（行程比例，0 = 行程中点），夹爪用
   **0 到 100**（0 = 闭合）。真机（`use_degrees=false`）、仿真、主动臂全部对齐这一约定；录出的数据集与官方
   `lerobot/svla_so101_pickplace` 等真机数据集结构一致（6 维向量 + 关节名）。
2. **角色对应**：被控对象（真机或仿真）永远配 `--robot.*`；操控设备（键盘/主动臂）永远配 `--teleop.*`。
3. **本机命令前缀**：这台开发机上所有 `uv` 命令需要先设缓存目录（原因见 [07](/zh-hans/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)）：

   ```bash
   export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'
   ```

## 实测环境

| 项目 | 版本 |
| --- | --- |
| 系统 | Windows 11 |
| Python / uv | 3.12.9 / 0.12.5 |
| lerobot | 0.6.2（本仓库，项目 `.venv` 隔离，不影响 conda） |
| MuJoCo | 3.16.0 |
| PyTorch | 2.11.0（CPU 版） |
| 硬件 | SO-ARM101 主动臂（COM124）+ 从动臂（COM172），CH343 串口芯片 |

<RelatedProducts slugs="so-arm101" />
