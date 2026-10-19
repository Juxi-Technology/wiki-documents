---
title: "02 · Simulation Model Verification (MJCF Loading and Driving)"
description: "The three public MJCF models for the SO-ARM101 have all been verified to work in this project:"
---

# 02 · Simulation Model Verification (MJCF Loading and Driving)

> Prerequisite: complete [01 Environment Setup](/tutorials/robot-arms/so-arm101/mujoco/01-Environment). This chapter is entirely simulation verification; no hardware connection is needed.

## Model Sources

The three public MJCF models for the SO-ARM101 have all been verified to work in this project:

| Short name | File | Source |
| --- | --- | --- |
| Official – new calibration | `SO101/so101_new_calib.xml` | TheRobotStudio/SO-ARM100 official repository (the comparison verification in this tutorial uses it; this repository does not include the original zip) |
| Official – old calibration | `SO101/so101_old_calib.xml` | Same repository (not in the zip; download required) |
| ROS2 description package | `so_arm101_description/mjcf/so_arm101.xml` | Tutorial attachment `SO-ARM101_ROS2.zip` in this repository |

Note: the zip extraction procedure was provided by an early version of `so101_assets.py` and is kept for reference; since 2026-10-16 the simulated
robot has migrated to the **mujoco_menagerie SO-ARM100 model** (vendored under `assets/menagerie_so_arm100/`;
see the design notes in [07](/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting) for the migration rationale and key points).

## Drive and Render Verification

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'

# 仓库自带、可直接运行的是 menagerie 模型（仿真机器人默认也用它）
uv run --frozen --with mujoco python examples/so101_mujoco/load_and_drive.py \
    --model examples/so101_mujoco/assets/menagerie_so_arm100/so_arm100.xml \
    --out-dir examples/so101_mujoco/outputs/renders/model_check
```

| Parameter | Description |
| --- | --- |
| `--model` | MJCF model path. The model bundled with the repository and directly runnable is `examples/so101_mujoco/assets/menagerie_so_arm100/so_arm100.xml` (to re-verify the three historical models in the table above, first obtain them from the corresponding repositories in the "Source" column, then swap the path) |
| `--out-dir` | Output directory: the verification video, still frames, and structural summary txt are all written here (default `out`) |
| `--tag` | Prefix for output filenames; defaults to the model filename |
| `--settle` / `--fps` / `--width` / `--height` | Settling time per pose (seconds), video frame rate, render resolution; defaults are 25 fps, 960×720, generally no need to change |

The script outputs a structural summary (joints/actuators/gains/ranges) and renders a verification video of "six joints swept one by one + coordinated sine motion" plus still frames.
A sample structural summary is in `reports/` (shipped with the repository); the comparison videos (`media/`) are large and are not distributed with the repository—they can be regenerated at any time with the command above.

## Key Differences Between the Three Models (Measured)

| Item | Official – new calibration | Official – old calibration | ROS2 description package |
| --- | --- | --- | --- |
| Zero-position semantics | Joint **travel midpoint** | Horizontal **fully extended** position | Travel midpoint |
| Joint names | `shoulder_pan` | Same as the left column | `shoulder_pan_joint` (suffix) |
| Position gains | kp=998.22, kv=2.731 | **kp=17.8, kv=0** | kp=998.22 |
| Gripper units | Radian hinge | Radian hinge | **0–1 normalized** |
| Self-collision exclusion | None | None | Yes (6 pairs) |

**Measured tracking error**: the new calibration and the description package hold a static pose with 0.0005 rad error, while the old calibration shows 0.03 rad (about 1.7° of droop; kp is 56× weaker).
Evaluating the same policy in simulation with a different model yields different dynamics—note which model was used for recording.

## Model Behaviors to Remember

1. **The `shoulder_lift` positive direction points down**: in the drive torque, a "downward swing" uses a positive angle; verify the sign first when doing teleoperation mapping or data conversion.
2. **Ground contact blocks motion**: at the downward-swing limit, the fingertips contact the ground and are stopped (the script has a built-in 8cm ground-clearance guard that automatically clips the amplitude).
3. The official model has no camera and no keyframes; a camera-equipped variant `so101_new_calib_camera.xml` exists and can be used for recording visual data later.

<RelatedProducts slugs="so-arm101" />
