---
title: SO-ARM101 7-DOF Modification and LeRobot Tutorial
description: "SO-ARM101 7-DOF modification and LeRobot tutorial: servo ID mapping, code changes, calibration notes, and the workflow for the added wrist yaw joint."
---

# SO-ARM101 7-DOF Modification and LeRobot Tutorial

> **[Buy in Store](https://www.juxitech.com/products/so-arm101-developers-kit)**

This tutorial is for users who have **modified the SO-ARM101 from 6 servos to 7 servos** and want to run the complete workflow in LeRobot (calibrate → record → train → deploy). The corresponding modified code is copied and adapted from the official LeRobot source, supporting the **SO-ARM101 7-DOF robotic arm** (7 STS3215 servos).

**Core differences from the official SO-101 (6 servos):**

| Servo ID | Joint name | Official SO-101 (6-DOF) | Notes |
| :---: | :--- | :--- | :--- |
| 1 | `shoulder_pan` | shoulder_pan | Shoulder pan (horizontal rotation) |
| 2 | `shoulder_lift` | shoulder_lift | Shoulder lift |
| 3 | `elbow_flex` | elbow_flex | Elbow flexion |
| 4 | `wrist_flex` | wrist_flex | Wrist pitch (up/down bending) |
| 5 | `wrist_yaw` | — (new) | Wrist yaw (left/right rotation of about 90°), **the newly added servo** (inserted between the original #4 and #5) |
| 6 | `wrist_roll` | wrist_roll (ID 5→6) | Wrist roll; the original #5 roll motor, whose printed part is unchanged and whose name stays the same |
| 7 | `gripper` | gripper (ID 6→7) | Gripper; originally ID=6, shifted to 7 after the modification |

> ⚠️ Note: **6-servo data, calibration files, and trained models are all incompatible with the 7-DOF modification** — you must redo them all following this tutorial.

## Joint Data Order

After recording, the joint-dimension order of `action` / `observation.state` in the Parquet files is:

`shoulder_pan → shoulder_lift → elbow_flex → wrist_flex → wrist_yaw → wrist_roll → gripper`

## Mechanical Assembly Changes

The new `wrist_yaw` servo and one printed part are inserted between the original #4 (`wrist_flex`) and #5 (`wrist_roll`); the motors after it all shift one position: the original #5 roll motor → position 6, the gripper → position 7 (the printed parts of these two older motors are unchanged).

## Core Code Changes

1. **Motor definitions change to 7**: add `wrist_yaw(5)` (left/right rotation); the original `wrist_roll` motor moves to **ID 6** (still roll, name unchanged); the gripper goes from `gripper(6)` → `gripper(7)`. The gripper still uses `RANGE_0_100` (0~100 opening), and the other joints use `DEGREES`.
   - `src/lerobot/robots/so_follower/so_follower.py`
   - `src/lerobot/teleoperators/so_leader/so_leader.py`
2. **Calibration no longer has a "full-turn joint"**: the original code hardcoded `wrist_roll` as a full-turn joint (0~4095); after the 7-DOF modification the wrist yaw/roll both have mechanical limits and cannot turn full circle, so calibration now uses `record_ranges_of_motion()` to record the real motion range of **all** joints.
   - `src/lerobot/robots/so_follower/so_follower.py` (`calibrate()`)
   - `src/lerobot/teleoperators/so_leader/so_leader.py` (`calibrate()`)

## Use the Modified Repository or Replace Files Manually

If you cloned from the official code repository, you need to replace/modify the following files.

### Option A: Use the Modified Repository Directly (Recommended)

Use the code repository already adapted for 7-DOF; no manual modification is needed.

### Option B: Manually Replace Files in an Official lerobot git clone

Copy **3 files** from the modified repository over the official clone:

| Modified-repo file (source) | Overwrite (target) |
| :--- | :--- |
| `src/lerobot/robots/so_follower/so_follower.py` | The same-named file in the official clone |
| `src/lerobot/teleoperators/so_leader/so_leader.py` | The same-named file in the official clone |
| `src/lerobot/robots/so_follower/robot_kinematic_processor.py` | The same-named file in the official clone (**comment fixes only**; functionality is unaffected, optional) |

```bash
cp src/lerobot/robots/so_follower/so_follower.py          <official_clone>/src/lerobot/robots/so_follower/so_follower.py
cp src/lerobot/teleoperators/so_leader/so_leader.py       <official_clone>/src/lerobot/teleoperators/so_leader/so_leader.py
```

> Prerequisite: your official clone has the same structure as the modified repository's baseline (lerobot 2026-08 version). If the versions differ greatly, **do not overwrite whole files** — instead make the two manual changes below.

### Manual Changes When Versions Differ (Only Two Places)

**① Motor dictionary** (one copy each in `so_follower.py` and `so_leader.py`, identical content) — change the original

```python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_roll": Motor(5, "sts3215", norm_mode_body),
"gripper": Motor(6, "sts3215", MotorNormMode.RANGE_0_100),
```

to

```python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_yaw": Motor(5, "sts3215", norm_mode_body),   # new servo, left/right rotation
"wrist_roll": Motor(6, "sts3215", norm_mode_body),  # original #5 roll motor, ID 5→6
"gripper": Motor(7, "sts3215", MotorNormMode.RANGE_0_100),
```

**② Calibration logic** (the `calibrate()` in each of the two files) — remove the "full-turn joint" special case; change

```python
full_turn_motor = "wrist_roll"
unknown_range_motors = [motor for motor in self.bus.motors if motor != full_turn_motor]
range_mins, range_maxes = self.bus.record_ranges_of_motion(unknown_range_motors)
range_mins[full_turn_motor] = 0
range_maxes[full_turn_motor] = 4095
```

to a single line that records the real range of all joints:

```python
range_mins, range_maxes = self.bus.record_ranges_of_motion()
```

See the next section, "Calibration Notes", for the reason and the risk.

## Calibration Notes

- **No more "full-turn joint"**: the original official code hardcodes `wrist_roll` (rolling around the forearm axis) as a joint that can turn full circle (0~4095) with the full range. After the 7-DOF modification, wrist joints #5/#6 (`wrist_yaw` / `wrist_roll`) both have mechanical limits and cannot turn full circle.
- **Risk note**: if the official full-turn hardcoding is kept, the code will send joint commands to angles the mechanism cannot reach, with a risk of damage; that is why calibration now records the actual min/max of every motor manually (code change ② above).
- **Calibration files from the 6-servo version are incompatible with 7-DOF**; you must recalibrate after the modification.
- For the bi-arm (dual follower) calibration and usage workflow, see the [SO-ARM101 Bi-Arm (Dual Follower) Tutorial](./SO-ARM101-Bi-Arm-Tutorial.md).

## Bi-Arm (bi_so_follower) Notes

`bi_so_follower` / `bi_so_leader` (`src/lerobot/robots/bi_so_follower/`, `src/lerobot/teleoperators/bi_so_leader/`) merely wrap the single-arm classes with a `left_`/`right_` prefix and **contain no motor definitions**. As long as the single-arm files above are modified, the bi-arm commands (`--robot.type=bi_so_follower`) are automatically 7-DOF. For the complete bi-arm workflow (calibration, teleoperation, dataset recording, training, deployment), see the [SO-ARM101 Bi-Arm (Dual Follower) Tutorial](./SO-ARM101-Bi-Arm-Tutorial.md).

<RelatedProducts slugs="so-arm101" />
