---
title: "SO-ARM101 Robotic Arm 7-DOF Tutorial"
description: "Before you start the 7-DOF course: confirm your servo and joint mapping, understand what changes from the 6-servo arm, and pick the right way to replace files."
---

# SO\-ARM101 Robotic Arm 7-DOF Tutorial

# SO\-ARM101 7\-DOF · Preparation Before You Start

> This guide is for users who have modified the **SO\-ARM101 from 6 servos to 7 servos** and want to run the complete workflow in LeRobot (calibrate → record → train → deploy).
> Corresponding code: this repository (`lerobot-7dof`), a fork of the official lerobot with only the SO-related motor configuration changed.
> 
> 

---

## 0\. First, Confirm Your Robotic Arm

7 servos (all STS3215); the mapping between servo ID and joint:

|**Servo ID**|**Joint Name**|**Notes**|
|---|---|---|
|1|`shoulder_pan`|Shoulder pan (horizontal rotation)|
|2|`shoulder_lift`|Shoulder lift|
|3|`elbow_flex`|Elbow flexion|
|4|`wrist_flex`|Wrist pitch (up/down bending)|
|5|`wrist_yaw`|Wrist yaw (left/right rotation of about 90°) · **the newly added servo** (inserted between the original #4 and #5)|
|6|`wrist_roll`|Wrist roll · the original #5 roll motor, ID 5→6, printed part unchanged, name unchanged|
|7|`gripper`|Gripper · originally ID=6, shifted to 7 after the modification|

Joint data order (the joint-dimension order of `action` / `observation.state` in the Parquet files after recording):
`shoulder_pan → shoulder_lift → elbow_flex → wrist_flex → wrist_yaw → wrist_roll → gripper`.

⚠️ Note: **6-servo data, calibration files, and trained models are all incompatible with this repository**; you must redo everything following the steps below.

---

## 1\. If You Cloned from the Official Code Repository, Which Files Need to Be Replaced/Modified

### Option A: Use This Repository's Code Directly (Recommended)

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### Option B: Manually Replace Files in an Official lerobot git clone

Copy **3 files** from this repository over the official clone:

|This repository's file (source)|Overwrite to (target)|
|---|---|
|`src/lerobot/robots/so_follower/so_follower.py`|The same-named file in the official clone|
|`src/lerobot/teleoperators/so_leader/so_leader.py`|The same-named file in the official clone|
|`src/lerobot/robots/so_follower/robot_kinematic_processor.py`|The same-named file in the official clone (**comment fixes only**; functionality is unaffected, so you may skip it)|

```Bash
cp src/lerobot/robots/so_follower/so_follower.py          <official_clone>/src/lerobot/robots/so_follower/so_follower.py
cp src/lerobot/teleoperators/so_leader/so_leader.py       <official_clone>/src/lerobot/teleoperators/so_leader/so_leader.py
```

> Prerequisite: your official clone has the same structure as this repository's baseline (lerobot 2026\-08 version). If the versions differ greatly, **do not overwrite whole files**; instead make the two "manual changes" below.
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

`bi_so_follower / bi_so_leader (src/lerobot/robots/bi_so_follower/, src/lerobot/teleoperators/bi_so_leader/) merely wrap the single-arm classes with a left_/right_ prefix,`**`contain no motor definitions`**`. As long as `**`the single-arm files above`**` are modified, the bi-arm commands (--robot.type=bi_so_follower) are automatically 7-DOF.`

## 1. Environment Setup

- [Ubuntu](/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Ubuntu)
- [Windows](/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Windows)
- [Mac](/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/MacOS)

## 2. Replace Files (7-DOF Adaptation)

- [Replace Files (7-DOF Adaptation)](/tutorials/robot-arms/so-arm101/lerobot-7dof/02-Replace-Files-7DOF)

## 3. Serial Port Check

- [Ubuntu](/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Ubuntu)
- [Windows](/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Windows)
- [Mac](/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/MacOS)

## 4. Arm Calibration

- [Ubuntu](/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Ubuntu)
- [Windows](/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Windows)
- [Mac](/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/MacOS)

## 5. Teleoperation

- [Ubuntu](/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Ubuntu)
- [Windows](/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Windows)
- [Mac](/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/MacOS)

## 6. Camera Teleop

- [Ubuntu](/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Ubuntu)
- [Windows](/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Windows)
- [Mac](/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/MacOS)

## 7. Data Collection

- [Browse and Replay the Dataset](/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Browse-and-Replay)
- [Dataset Collection Notes](/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Collection-Notes)
- [Register a Hugging Face Account (Optional)](/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Account)
- [Upload Dataset to HuggingFace (Optional)](/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Dataset-Upload)
- [Teaching and Recording a Dataset - Handshake 200](/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording-Handshake-200)
- [Teaching and Recording a Dataset](/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording)

## 8. Model Training

- [Cloud GPU Training Environment Setup](/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Cloud-GPU)
- [Training Command Line - ACT (Recommended for Beginners)](/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-ACT)
- [Training Command Line - Diffusion](/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-Diffusion)
- [Training Command Line - pi0.5](/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0.5)
- [Training Command Line - pi0 (Best Results)](/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0)
- [Training Command Line - pi0fast](/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0fast)
- [Training Command Line - smolvla (Recommended for Advanced Users)](/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-smolvla)
- [Upload the Model to HuggingFace (Optional)](/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/HF-Model-Upload)
- [Imitation Learning Algorithms Supported by LeRobot](/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Imitation-Learning-Algorithms)
- [Local Ubuntu Training](/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Local-Ubuntu)
- [Obtain the Model Weight File](/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Model-Weights)
- [Training Parameter Recommendations](/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Training-Parameter-Tips)
- [View Real-Time Training Curves on wandb](/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/WandB-Curves)

## 9. Model Inference

- [Command Line Reference](/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/CLI-Reference)
- [Inference Command Line - ACT](/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-ACT)
- [Inference Command Line - Diffusion](/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-Diffusion)
- [Inference Command Line - pi0.5](/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0.5)
- [Inference Command Line - pi0](/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0)
- [Inference Command Line - smolvla](/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-smolvla)
- [Common Bugs and Fixes](/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Common-Bugs)
- [NVIDIA DGX Spark Inference](/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/DGX-Spark)
- [D-Robotics RDK S100 Inference](/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/RDK-S100)
