---
title: "05 · Leader-Arm Digital Twin (Physical Arm Driving the Simulated Arm)"
description: "Drag the physical leader arm by hand and make the simulated follower arm in the MuJoCo window mirror it in real time—the correct way to run digital-twin demo…"
---

# 05 · Leader-Arm Digital Twin (Physical Arm Driving the Simulated Arm)

Drag the **physical leader arm** by hand and make the **simulated follower arm in the MuJoCo window** mirror it in real time—the correct way to run digital-twin demos
and simulation data collection.

## Prerequisites

The leader arm is calibrated (see [03](/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration)); the example port is `COM124` (the measured value for the leader arm currently in use on this machine;
the number may change on every replug, so check and replace it as described in chapter 03).

## Command

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'
uv run --frozen --with mujoco python examples/so101_mujoco/teleoperate.py \
    --robot.type=so101_mujoco \
    --teleop.type=so101_leader_trim --teleop.port=COM124 --teleop.id=juxi_leader \
    --teleop.use_degrees=false
```

- `--robot.type=so101_mujoco`: the controlled target is the simulated arm, and the window opens automatically;
- `--teleop.*`: the controlling device is the physical leader arm (read-only, never applies torque, zero risk to the leader arm);
- `--teleop.use_degrees=false`: **required**. Makes the units output by the leader arm (travel-ratio convention) match those of the simulated arm.

Replacing `--robot.type` with `so101_follower --robot.port=COM172 --robot.id=juxi_so101 --robot.max_relative_target=5`
gives the conventional kit setup of "physical leader arm → real follower arm"; the same leader-arm calibration applies.

## What If the Zero Point Is Off: Automatic Center Fine-Tuning (`so101_leader_trim`)

**Symptom**: the leader arm is posed at the "visually centered" position, but the simulated arm is off by a few degrees.

**Principle**: lerobot's normalized zero point = **the midpoint of the range recorded during the calibration sweep** `(min+max)/2`; the
"mid-position pose" at the moment Enter is pressed during calibration is recorded as the raw value 2048. As long as a joint's mechanical travel is itself asymmetric, the two "midpoints" are permanently offset by a fixed amount
(measured on servo #1: recorded range 776–3457, midpoint 2116, 68 counts off from 2048 ≈ **5.6°**).
**This offset cannot be eliminated by recalibration** (travel asymmetry is determined by the mechanical structure), so it must be compensated in software.

**Solution**: the `so101_leader_trim` plugin automatically computes each joint's compensation from the calibration file using the formula below and subtracts it in real time;
after recalibration it adapts automatically, with no manual tuning:

```
补偿ᵢ = (2048 − minᵢ) / (maxᵢ − minᵢ) × 200 − 100
```

Values measured as effective on this machine (printed in the startup log):

| Joint | Compensation (units) |
| --- | --- |
| shoulder_pan | −5.11 |
| shoulder_lift | −0.92 |
| elbow_flex | +2.54 |
| wrist_flex | +0.69 |

The remaining joints deviate by <0.05 and need no compensation; the gripper (0 to 100) and degree mode do not take part in fine-tuning.

> Developer note: this plugin's `name` must stay `"so_leader"`—`name` is the directory key used to look up calibration files;
> a custom type name would make the calibration file unfindable and mistakenly trigger the recalibration flow.

<RelatedProducts slugs="so-arm101" />
