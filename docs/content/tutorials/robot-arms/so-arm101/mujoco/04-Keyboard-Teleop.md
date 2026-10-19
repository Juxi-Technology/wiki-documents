---
title: "04 · Keyboard Teleoperation"
description: "Use the keyboard to \"jog\" the joints and manually control the real or simulated arm—the fastest control method when no leader arm is available, and also one …"
---

# 04 · Keyboard Teleoperation

Use the keyboard to "jog" the joints and manually control the real or simulated arm—the fastest control method when no leader arm is available, and also one of the ways to record demonstration data.

> Prerequisite: for the simulation part, only [01](/tutorials/robot-arms/so-arm101/mujoco/01-Environment) is needed; for the real-robot part, [03](/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration) is also required.
> The `COM172`/`juxi_so101` in the commands are examples—check and replace the port as described in chapter 03, and use the name you chose when calibrating for `id`.

## Commands

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'

# 真机从动臂
uv run --frozen --with mujoco python examples/so101_mujoco/teleoperate.py \
    --robot.type=so101_follower --robot.port=COM172 --robot.id=juxi_so101 \
    --robot.use_degrees=false --robot.max_relative_target=5 \
    --teleop.type=so101_keyboard --teleop.rate=150

# 仿真从动臂（MuJoCo 窗口自动打开）
uv run --frozen --with mujoco python examples/so101_mujoco/teleoperate.py \
    --teleop.rate=150
```

(`teleoperate.py` defaults to `--robot.type=so101_mujoco --teleop.type=so101_keyboard`.)

## Keys (Hold to Act; Global Listener—Works Regardless of Which Window Is Focused)

| Key | Action | Key | Action |
| --- | --- | --- | --- |
| `w` / `s` | shoulder_lift up / down | `a` / `z` | shoulder_pan left / right |
| `e` / `d` | elbow_flex extend / flex | `t` / `g` | wrist_flex + / − |
| `y` / `h` | wrist_roll + / − | `u` / `j` | gripper open / close |

The keys were **deliberately chosen to avoid the recording control keys** (`n/r/q`, arrow keys, `Esc`), so teleoperation and recording can run simultaneously.

## Key Parameters

| Parameter | Purpose | Recommended value |
| --- | --- | --- |
| `--teleop.rate` | Target speed while a key is held (units/second) | The default of 60 is rather slow; **150** feels right on real hardware |
| `--robot.max_relative_target` | Maximum units a joint may move per control cycle (safety speed limit) | Real robot **5** (60Hz teleoperation) / **10** (30Hz recording) |
| `--robot.use_degrees=false` | Use the travel-ratio convention (−100 to 100) instead of degrees | **Required for real hardware**, otherwise the units do not match (simulation already matches by default) |

## Behavior Notes

- **Do not type during teleoperation**: the keyboard listener is **global and does not swallow keys**—pressing a mapped key in any window
  on the computer (`w a s z e d t g y h u j`, including pinyin in a chat box) will also drive the arm. Leader-arm mode does not have this problem.
- **The arm moves at the moment of connection**: the real follower arm first engages torque (becomes stiff), then moves toward the "mid-position pose" (the target before any key is pressed);
  the simulated arm converges directly to the mid-position pose. Leave some space around it.
- **Exiting**: press `Ctrl-C` in that terminal (or press `Esc`; the keyboard listener disconnects and exits cleanly). After exit, the real robot **loses torque and goes limp**—
  support it by hand; this is normal behavior.
- **Strings of `clamped to be safe` WARNINGs in the startup log** are normal output while the speed limiter "catches up"; they stop automatically once the target is reached.

<RelatedProducts slugs="so-arm101" />
