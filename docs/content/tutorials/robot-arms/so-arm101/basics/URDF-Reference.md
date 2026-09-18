---
title: "URDF Files and Reference Materials"
description: "Reference materials for the SO-ARM101 including the official URDF file, URDF Studio, the LeRobot web interface and servo ID tools."
---

# URDF Files and Reference Materials

## Lerbot's official [URDF file](https://github.com/TheRobotStudio/SO-ARM100/blob/main/Simulation/SO101/so101_new_calib.urdf)

### URDF Studio

https://urdf.d-robotics.cc/

### ROS2 Simulation Control (you can implement it yourself)

https://github.com/holmsslk/so-arm-moveit-hardware

### LeRobot's official graphical interface

https://github.com/huggingface/leLab

LeLab is a web application that integrates LeRobot's entire workflow—calibration, teleoperation, recording, training, and playback—into a single browser interface. Just connect the robot arm, open the app, and you can start operating. No tedious command-line operations and no keyboard input are required.

🤗 LeRobot's native web entry point, designed to let new users complete the entire process from "unboxing" to "training their first policy" in just a few minutes.

🤗 Install and run everything with just one command.

## Control the follower arm with a phone

https://huggingface.co/docs/lerobot/main/en/phone_teleop

### Cloud robotics development: implementing Lerobot simulation and data flow between ROS 2 devices and Isaac Sim on AWS

https://github.com/ti/ti.github.io/blob/95261efa4f8bdb4c8571920762318a532e58c7fd/%E5%BC%80%E5%8F%91/isaac/aws-ros2-isaac.md

### Set servo IDs and center calibration in the browser

https://bambot.org/feetech.js?lang=zh

1. Enter 0 or 1 depending on the servo model, and click "Connect"

![截图_20260413125622.png](../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/1.png)

2. Scan servos with IDs 1~6. You can confirm the corresponding servo ID from the FOUND result in the scan output. For example, in the figure, servo ID 1 was scanned

![截图_20260413125712.png](../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/2.png)

3. ID setting and center calibration

① The current servo ID input is the scanned servo ID

② Enter a number in "ID Management" and click "Change ID" to set the ID

③ Center calibration (the center of the STS3215 servo is 2047, and the center of the SCS0009 servo is 511)

STS servo: enter 2047 in "Position Control" and click "Set"

SCS servo: enter 511 in "Position Control" and click "Set"

![截图_20260413125748.png](../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/3.png)

<RelatedProducts slugs="so-arm101" />
