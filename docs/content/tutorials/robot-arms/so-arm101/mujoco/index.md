---
title: "SO-ARM101 × MuJoCo Full Workflow Tutorial (Index)"
---

# SO-ARM101 × MuJoCo Full Workflow Tutorial (Index)


> This tutorial documents and reproduces the **complete simulation + real-robot workflow** of the SO-ARM101: from environment setup, model verification, and hardware calibration,
> to keyboard/leader-arm teleoperation, data recording, and replay. All commands were verified in real-robot + simulation sessions on 2026-10-15.
>
> Intended audience: Juxi SO-ARM101 kit users and internal engineers. No prior knowledge of MuJoCo or LeRobot is required.

## Full Workflow Map (Two Tracks, One Shared Set of Components)

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

| Chapter | Content | What You Get |
| --- | --- | --- |
| [01 Environment Setup](/tutorials/robot-arms/so-arm101/mujoco/01-Environment) | uv environment, dependency extras, Windows notes | A runnable environment |
| [02 Simulation Model Verification](/tutorials/robot-arms/so-arm101/mujoco/02-Sim-Model-Verification) | Loading/comparing/drive-rendering the three MJCF models | Confidence in the models and simulation behavior |
| [03 Real-Robot Connection and Calibration](/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration) | Serial port identification, read-only initial check, follower/leader calibration | Two arms recognized by the software |
| [04 Keyboard Teleoperation](/tutorials/robot-arms/so-arm101/mujoco/04-Keyboard-Teleop) | Keyboard-driven real robot/simulation, rate tuning, safe speed limiting | The fastest manual control method |
| [05 Leader-Arm Digital Twin](/tutorials/robot-arms/so-arm101/mujoco/05-Leader-Digital-Twin) | Physical leader arm driving the simulated follower, zero-point fine-tuning | Digital-twin demos and data collection |
| [06 Data Recording and Replay](/tutorials/robot-arms/so-arm101/mujoco/06-Record-and-Replay) | Real-robot/simulation recording, episode control, replay, inspection script | A trainable dataset |
| [07 Troubleshooting and Lessons Learned](/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting) | Every pitfall encountered in this workflow, with solutions | A troubleshooting handbook |
| [08 Roadmap](/tutorials/robot-arms/so-arm101/mujoco/08-Roadmap) | Cameras, object scenes, automatic data generation, training | The next steps |
| [09 Complete Usage Tutorial](/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial) | Arm bring-up → recording → inspection → watching videos → training → simulation deployment, all in one; includes a conda environment alternative | From zero to a qualified dataset, then a policy on stage |

**Suggested order for first use**: 01 (environment) → 03 (only needed when connecting the real robot) → follow [09 Complete Usage Tutorial](/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial)
for the main line (record → inspect → watch videos → train → deploy); 02 and 04–08 are reference manuals, to be consulted as needed.
Every command in 09 can be copied and run directly, with no need to return to other chapters midway to install anything.

## Three Conventions to Remember

1. **Unit system** (aligned across all three): the five body joints use **−100 to 100** (travel ratio, 0 = travel midpoint), and the gripper uses
   **0 to 100** (0 = closed). The real robot (`use_degrees=false`), simulation, and leader arm all follow this convention; recorded datasets have the same
   structure as official real-robot datasets such as `lerobot/svla_so101_pickplace` (6-dimensional vector + joint names).
2. **Role mapping**: the controlled target (real robot or simulation) always takes `--robot.*`; the controlling device (keyboard/leader arm) always takes `--teleop.*`.
3. **Local command prefix**: on this development machine, all `uv` commands require the cache directory to be set first (reason in [07](/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)):

   ```bash
   export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'
   ```

## Tested Environment

| Item | Version |
| --- | --- |
| OS | Windows 11 |
| Python / uv | 3.12.9 / 0.12.5 |
| lerobot | 0.6.2 (this repository, isolated in the project `.venv`, does not affect conda) |
| MuJoCo | 3.16.0 |
| PyTorch | 2.11.0 (CPU build) |
| Hardware | SO-ARM101 leader arm (COM124) + follower arm (COM172), CH343 serial chip |

<RelatedProducts slugs="so-arm101" />
