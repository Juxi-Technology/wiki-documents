---
title: "SO-ARM101 Robotic Arm Tutorials"
description: "Tutorial home for the SO-ARM101: what embodied intelligence and LeRobot are, what the arm is, which computer you need and what imitation learning (VLA) means, plus the full course navigation."
---

# SO-ARM101 Robotic Arm Tutorials

![image.png](../../../../public/images/tutorials/robot-arms/so-arm101/so-arm101-index/d02-03.png)

## What Is Embodied Intelligence?

Intelligence with a body. It connects AI to various physical hardware entities, such as:

Quadruped robot dogs, bipedal humanoid robots, wheeled-legged robots, drones, self-driving cars

## What Is LeRobot?

LeRobot is HuggingFace's open-source `embodied intelligent robot software framework`

GitHub address: https://github.com/huggingface/lerobot

It lowers the barrier to **data collection, algorithm training and inference deployment** for reinforcement learning and **imitation learning (VLA)**, with **imitation learning (VLA)** being the main focus

- Which robots can be developed with LeRobot?

From the thousand-yuan-class SO-ARM 101 robotic arm and the LeKiwi cart, up to the tens-of-thousands-yuan AgileX piper arm, the Huaxinjing StarAI arm and the Hope-JR dexterous hand, and on to the hundreds-of-thousands-yuan Unitree G1 humanoid robot. LeRobot has become the standard for data collection and algorithm training in the embodied intelligence industry.

You can also adapt your own robot to the LeRobot framework.

- LeRobot datasets and models

LeRobot defines its own imitation-learning dataset format. You can view, use, download and train on all public datasets and models on HuggingFace, and you can also upload your own datasets to HuggingFace.

## What Is the SO-ARM 101 Robotic Arm?

This tutorial takes the SO-ARM 101 robotic arm as an example; it uses 3D-printed structural parts and Feetech servos, at a very low cost.

This is an embodied-intelligence body even a poor student can afford, and it is one of the bodies officially recommended by LeRobot.

The arm consists of two arms: a Leader arm and a Follower arm. Each arm has 5 degrees of freedom plus 1 gripper degree of freedom.

## What Computer Configuration Do I Need

An ordinary Windows laptop can handle everything up to training.

An ordinary Mac can handle everything.

An Ubuntu machine with an NVIDIA GPU can handle everything.

In this tutorial we use a [cloud GPU platform](https://featurize.cn?s=d7ce99f842414bfcaea5662a97581bd1) to train models, so your own computer does not need a high-end configuration.

## What Is **Imitation Learning and VLA**?

Humans drag the robot to demonstrate and collect a dataset. That dataset is then used to train an imitation-learning algorithm, which is finally deployed on the robot, letting it imitate human actions autonomously and generalize to the real environment. No teleoperation or remote control is needed.

For example, in the video above, a human drags the SO-ARM robotic arm to grab a crayfish, dip it in seasoning and drop it into hot oil, and the arm ultimately performs this action on its own. Even with a new crayfish, it can react and complete the action at any time.

Imitation learning also has a cutting-edge, fashionable name: VLA (Vision-Language-Action large model). This is also the embodied-intelligence research field that is currently developing fastest, attracting the hottest investment, seeing the fiercest China-US competition, enjoying the most prosperous open-source ecosystem, drawing intense media attention, and drawing in countless master's and doctoral students.

The algorithms LeRobot mainly adapts are imitation-learning ones, such as ACT, Diffusion Policy, SmolVLA, Pi0, Pi0.5, Wall-OSS and others.

The imitation learning in this tutorial is exclusively VLA.


## Tutorial Navigation

### Complete Courses

- [LeRobot Course Overview](/tutorials/robot-arms/so-arm101/lerobot/)
- [SO-ARM101 Robotic Arm 7-DOF Tutorial](/tutorials/robot-arms/so-arm101/lerobot-7dof/)

### Assembly & Extension Tutorials

- [SO-ARM101 Tutorial](/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [SO-ARM101 Assembly](/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [Arm Mount & Camera Kit Installation](/tutorials/robot-arms/so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation)
- [Overhead Camera Mount Installation](/tutorials/robot-arms/so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation)
- [Parallel Finger Gripper Installation](/tutorials/robot-arms/so-arm101/Parallel-Finger-Gripper-Installation)
- [SO-ARM101 Bi-Arm (Dual Follower) Tutorial](/tutorials/robot-arms/so-arm101/SO-ARM101-Bi-Arm-Tutorial)
- [SO-ARM101 Wireless Teleoperation (ESP32-NanoCam Version)](/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop)
- [Wireless Teleoperation Troubleshooting](/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Troubleshooting)
- [SoARM Series Servo Calibration Tool Tutorial](/tutorials/robot-arms/so-arm101/SO-ARM101-Servo-Calibration-Tool)
- [ROS2 Simulation Control](/tutorials/robot-arms/so-arm101/ROS2-Simulation-Control)
- [SO-ARM101 Jetson Orin PyTorch Compatibility](/tutorials/robot-arms/so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility)

### Basics

- [Understanding LeRobot](/tutorials/robot-arms/so-arm101/basics/Understanding-LeRobot)
- [LeRobot Datasets on Hugging Face](/tutorials/robot-arms/so-arm101/basics/HF-Datasets)
- [Model Training Resources](/tutorials/robot-arms/so-arm101/basics/Training-Resources)
- [SO-ARM100 Official 3D Print Files](/tutorials/robot-arms/so-arm101/basics/Official-3D-Print-Files)
- [URDF Files and Reference Materials](/tutorials/robot-arms/so-arm101/basics/URDF-Reference)
- [Recommended Camera Brackets and Mounts](/tutorials/robot-arms/so-arm101/basics/Camera-Mounts-Recommended)

### LeLab Tutorial

- [1 · Overview](/tutorials/robot-arms/so-arm101/lelab/01-Overview)
- [2 · Install and run](/tutorials/robot-arms/so-arm101/lelab/02-Install)
- [3 · Connect and calibrate](/tutorials/robot-arms/so-arm101/lelab/03-Calibration)
- [4 · Teleoperation](/tutorials/robot-arms/so-arm101/lelab/04-Teleoperation)
- [5 · Record a dataset](/tutorials/robot-arms/so-arm101/lelab/05-Record-Dataset)
- [6 · Train and run inference](/tutorials/robot-arms/so-arm101/lelab/06-Train-and-Inference)
- [7 · Troubleshooting](/tutorials/robot-arms/so-arm101/lelab/07-Troubleshooting)

### XLeRobot Docker Image Tutorial

- [XLeRobot Docker Tutorial — Jetson AGX Orin](/tutorials/jetson-agx-orin/xlerobot-docker/deployment/01-Overview)
- [XLeRobot Docker Tutorial — Jetson Orin Nano](/tutorials/jetson-orin-nano/xlerobot-docker/deployment/01-Overview)

<RelatedProducts slugs="so-arm101" />
