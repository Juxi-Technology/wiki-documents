---
title: "Step 2: Replace Files (7-DOF Adaptation)"
description: "Which files to replace or modify to turn an official lerobot clone into the 7-DOF version — use this repository's code directly (Option A) or replace the files manually (Option B), plus the two manual edits needed when versions differ."
---

# Step 2: Replace Files (7-DOF Adaptation)

## 1\. If You Cloned from the Official Code Repository, Which Files Need to Be Replaced/Modified

### Option A: Use This Repository's Code Directly (Recommended)

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### Option B: Manually Replace Files in an Official lerobot git clone

Copy **3 files** from this repository over the official clone:

|This repository's file (source)|Overwrite to (target)|
|---|---|
|`src/lerobot/robots/so_follower/so_follower.py`|The same-named file in the official clone|
|`src/lerobot/teleoperators/so_leader/so_leader.py`|The same-named file in the official clone|

[so\_follower\.py](/downloads/so_follower.py)

[so\_leader\.py](/downloads/so_leader.py)

> Prerequisite: your official clone has the same structure as this repository's baseline (lerobot 2026\-09 version).
> 
> If the versions differ greatly, **do not overwrite the whole file**; instead make the two "manual changes" below.
> 
> 

### Manual Changes When Versions Differ (Only Two Places)

**① Motor dictionary** (one copy each in `so_follower.py` and `so_leader.py`, identical content) — change the original

```Python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_roll": Motor(5, "sts3215", norm_mode_body),
"gripper": Motor(6, "sts3215", MotorNormMode.RANGE_0_100),
```

to

```Python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_yaw": Motor(5, "sts3215", norm_mode_body),   # new servo, left/right rotation
"wrist_roll": Motor(6, "sts3215", norm_mode_body),  # original #5 roll motor, ID 5→6
"gripper": Motor(7, "sts3215", MotorNormMode.RANGE_0_100),
```

**② Calibration logic** (the `calibrate()` in each of the two files) — remove the "full-turn joint" special case: change

```Python
full_turn_motor = "wrist_roll"
unknown_range_motors = [motor for motor in self.bus.motors if motor != full_turn_motor]
range_mins, range_maxes = self.bus.record_ranges_of_motion(unknown_range_motors)
range_mins[full_turn_motor] = 0
range_maxes[full_turn_motor] = 4095
```

to a single line, changing it to record the real range of all joints:

```Python
range_mins, range_maxes = self.bus.record_ranges_of_motion()
```

> Why: the original code hardcodes `wrist_roll` (rolling around the forearm axis) as a joint that can turn full circle (0\~4095) and sets the full range. After the 7\-DOF modification, wrist joints #5/#6 (yaw / roll) **both have mechanical limits and cannot turn full circle**; forcing the full range would make the code send joint commands to angles the mechanism cannot reach, with a risk of damage. Now calibration records the actual min/max of every motor manually.
> 
> 

### Bi-Arm (Dual Follower) Notes

`bi_so_follower` / `bi_so_leader` (`src/lerobot/robots/bi_so_follower/`, `src/lerobot/teleoperators/bi_so_leader/`) merely wrap the single-arm classes with a `left_`/`right_` prefix and **contain no motor definitions**. As long as **the single-arm files above** are modified, the bi-arm commands (`--robot.type=bi_so_follower`) are automatically 7\-DOF.

