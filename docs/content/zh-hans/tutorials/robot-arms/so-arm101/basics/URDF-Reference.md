---
title: "URDF 文件及资料参考"
description: "URDF 文件及资料参考:汇总官方 URDF 文件、URDF 查看工具、LeRobot 图形界面与手机控制从动臂等参考资料。"
---

# URDF 文件及资料参考

## Lerbot官方的[URDF文件](https://github.com/TheRobotStudio/SO-ARM100/blob/main/Simulation/SO101/so101_new_calib.urdf)

### URDF Studio

https://urdf.d-robotics.cc/

### ROS2 仿真控制（可自行实现）

https://github.com/holmsslk/so-arm-moveit-hardware

### LeRobot的官方图形界面

https://github.com/huggingface/leLab

LeLab是一款网页应用，它将 LeRobot 的全部工作流程——校准、远程操控、记录、训练、回放——整合到一个浏览器界面中。只需连接机械臂，打开应用，即可开始操作。无需繁琐的命令行操作，也无需键盘输入。

🤗 LeRobot 的原生网页入口，旨在让新用户在几分钟内完成从“开箱”到“训练他们的第一个保单”的整个过程。

🤗 只需一条命令即可安装并运行所有程序。

## 手机控制从动臂

https://huggingface.co/docs/lerobot/main/en/phone_teleop

### 云端机器人研发：基于 AWS 实现 ROS 2 设备与 Isaac Sim 的 Lerobot 仿真及数据流

https://github.com/ti/ti.github.io/blob/95261efa4f8bdb4c8571920762318a532e58c7fd/%E5%BC%80%E5%8F%91/isaac/aws-ros2-isaac.md

### 网页端设置舵机ID和中位校准

https://bambot.org/feetech.js?lang=zh

1、根据舵机型号输入0或1，点击“连接”

![截图_20260413125622.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/1.png)

2、扫描ID 1~6 的舵机，可以根据扫描结果里的FOUND确认对应ID舵机。例如图片里舵机 ID 1 被扫描到了

![截图_20260413125712.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/2.png)

3、ID设置和中位校准

①当前舵机ID输入为被扫描到的舵机ID

②在“ID管理”中输入数字，点击“更改ID”即可设置ID

③中位校准（STS3215舵机中位是2047，SCS0009舵机中位是511）

STS舵机：在“位置控制”输入2047，并点击“Set”

SCS舵机：在“位置控制”输入511，并点击“Set”

![截图_20260413125748.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/3.png)

<RelatedProducts slugs="so-arm101" />
