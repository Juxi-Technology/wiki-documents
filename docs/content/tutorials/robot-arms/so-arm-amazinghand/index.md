---
title: "SO-ARM101 + AmazingHand Tutorial"
description: "SO-ARM101 + AmazingHand tutorial overview: the full LeRobot workflow from teleoperation and data collection to training, for Windows and Linux."
---


# SO-ARM101 + AmazingHand Tutorial

This tutorial covers the full workflow of teleoperation, data collection, and training for reproducing the **SO-ARM101 follower arm + AmazingHand dexterous hand**, based on LeRobot (a customized version of the official repository).

The tutorial is organized by **stage**, with each stage in its own directory, split internally by operating system into two documents: Windows and Linux. Choose the document that matches your operating system.

---

## Hardware and Software Overview

|Device|Serial port (example, must be replaced)|Servo model|Notes|
|---|---|---|---|
|Leader arm|`COM54` / `/dev/ttyACM1`|Mixed models<br>`sts3125-C001, sts3215-C044, sts3215-C046`|Teleoperation input, keeps gripper #6|
|Follower arm|`COM58` / `/dev/ttyACM0`|`sts3215-C018` (No. 1-5)|Execution side, gripper #6 removed|
|AmazingHand dexterous hand|`COM11` / `/dev/ttyACM2`|`scs0009` (8 units, ID 1-8)|Follower arm end effector, dedicated serial port|

> **⚠️ Serial port names vary by machine**: The table above is only an example. The COM number/device path differs on every computer, so be sure to use `lerobot-find-port` to confirm your machine's actual values and replace all placeholder parameters in the commands.

> The three devices must each have **their own serial port and their own power supply**. SCS0009 (protocol 1) and STS3215 (protocol 0) are not compatible on the same bus.

---

## Tutorial Directory Structure

```Plaintext
tutorials/robot-arms/so-arm-amazinghand/
├── index.md
├── Linux
│   ├── 01-Environment-Setup-Linux.md
│   ├── 02-Hand-Arm-Calibration-Linux.md
│   ├── 03-Teleoperation-Linux.md
│   ├── 04-Data-Collection-Linux.md
│   ├── 05-Model-Training-Linux.md
│   └── 06-Model-Deployment-Linux.md
└── Windows
    ├── 01-Environment-Setup-Windows.md
    ├── 02-Hand-Arm-Calibration-Windows.md
    ├── 03-Teleoperation-Windows.md
    ├── 04-Data-Collection-Windows.md
    ├── 05-Model-Training-Windows.md
    └── 06-Model-Deployment-Windows.md
```

---

## Recommended Reading Path

|Step|Stage|Linux|Windows|
|---|---|---|---|
|1|Environment setup|[01-Environment-Setup-Linux.md](./01-Environment-Setup-Linux.md)|[01-Environment-Setup-Windows.md](./01-Environment-Setup-Windows.md)|
|2|Calibration|[02-Hand-Arm-Calibration-Linux.md](./02-Hand-Arm-Calibration-Linux.md)|[02-Hand-Arm-Calibration-Windows.md](./02-Hand-Arm-Calibration-Windows.md)|
|3|Teleoperation|[03-Teleoperation-Linux.md](./03-Teleoperation-Linux.md)|[03-Teleoperation-Windows.md](./03-Teleoperation-Windows.md)|
|4|Data collection|[04-Data-Collection-Linux.md](./04-Data-Collection-Linux.md)|[04-Data-Collection-Windows.md](./04-Data-Collection-Windows.md)|
|5|Model training|[05-Model-Training-Linux.md](./05-Model-Training-Linux.md)|[05-Model-Training-Windows.md](./05-Model-Training-Windows.md)|
|6|Deployment and evaluation|[06-Model-Deployment-Linux.md](./06-Model-Deployment-Linux.md)|[06-Model-Deployment-Windows.md](./06-Model-Deployment-Windows.md)|

---

## Quick Reference: Core Differences by Stage

|Aspect|Linux|Windows|
|---|---|---|
|Python environment|Miniforge + the same command|Miniconda + `conda create -n lerobot python=3.12`|
|Serial port name|`/dev/ttyACM0/1/2` (examples)|`COM54` / `COM58` / `COM11` (examples)|
|Serial port permissions|Requires `sudo chmod 666 /dev/ttyACM*` or a udev rule|No special configuration needed|
|Command invocation|`lerobot-xxx` after activating conda|`lerobot-xxx` after activating conda|
|CUDA training|Officially supported, resolves smoothly|CUDA torch must be installed manually|

---

## General Notes

1. **Get stage 1 working first, then move on to the later stages**—the environment is the prerequisite for every subsequent command.

2. **Every computer must be recalibrated**: especially the hand angles (`lerobot-calibrate-amazing-hand`). The angles in the config are AmazingHand's official generic defaults and serve only as a fallback; when `hand_angles.json` exists, the locally measured values are loaded in preference.

3. **Calibration file location**: `~/.cache/huggingface/lerobot/calibration/`. When switching machines, migrate the file or recalibrate.

4. **Always verify the directions on the first teleoperation**: gripper open ↔ hand open, pinch ↔ hand close.

5. Each stage's Windows / Linux includes **platform-specific notes**; please read them in full.

---

## Troubleshooting Entry Point

The stage documents include a troubleshooting table for each platform. Common issues:

- conda not initialized / command not found

- Insufficient serial port permissions (Linux)

- Incorrect hand/arm direction mapping

- Hand angles not calibrated, causing abnormal opening/closing

See the individual stage documents for details.

## Related Links

- [AmazingHand Dexterous Hand Tutorial](https://juxitech.feishu.cn/wiki/PR1JwkQxaiDAn1k85e2cZIi5nTf)
- [SO-ARM101 Robotic Arm Tutorial](https://juxitech.feishu.cn/wiki/NOWXw9NOJiDTs2kRr7RcdIrKnvg)

<RelatedProducts slugs="so-arm101,amazinghand" />
