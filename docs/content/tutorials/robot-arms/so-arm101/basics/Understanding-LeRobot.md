---
title: "Understanding LeRobot"
description: "What embodied intelligence, LeRobot, the SO-ARM101 arm and imitation learning with VLA models are, and what computer you need."
---

# Understanding LeRobot

## What is embodied intelligence?

Intelligence with a body. Connecting AI to various hardware entities, such as:

Quadruped robot dogs, bipedal humanoid robots, wheeled-legged robots, drones, self-driving cars

## What is LeRobot?

LeRobot is the `embodied intelligence robot software framework` open-sourced by HuggingFace

Github address: https://github.com/huggingface/lerobot

Low-barrier implementation of: reinforcement learning and **imitation learning (VLA)** **data collection, algorithm training, and inference deployment**, among which **imitation learning (VLA)** is the most important

- Which robots can be developed with LeRobot?

From the thousand-yuan-level SO-ARM 101 robot arm and the LeKiwi car, to the tens-of-thousands Songling piper arm, the Huaxinjing StarAI arm, and the Hope-JR dexterous hand, to the hundred-thousand-plus Unitree G1 humanoid robot. LeRobot has become the standard for data collection and algorithm training in the embodied intelligence industry.

You can also adapt your own robot to the LeRobot framework.

- LeRobot datasets and models

LeRobot defines its own imitation learning dataset format. You can view, use, download, and train on all public datasets and models on HuggingFace, and you can also upload your own datasets to HuggingFace

## What is the SO-ARM 101 robot arm?

This tutorial takes the SO-ARM 101 robot arm as an example. It uses 3D-printed structural parts and Feetech servos, and the cost is very low.

This is an embodied intelligence platform that even a poor student can afford, and it is one of the platforms officially recommended by LeRobot.

The robot arm consists of two arms: a leader arm (Leader) and a follower arm (Follower). Each arm has 6 degrees of freedom (5 joint degrees of freedom + 1 gripper degree of freedom).

## What computer configuration do I need

An ordinary Windows laptop can handle everything before training

An ordinary Mac can handle all operations

An Ubuntu computer with an NVIDIA GPU can handle all operations

In this tutorial, models are trained using a [cloud GPU platform](https://featurize.cn?s=d7ce99f842414bfcaea5662a97581bd1), so your own computer does not need a high-end configuration

## What is **imitation learning and VLA**?

A human drags the robot to teach it and collect a dataset, forming a dataset. This dataset is then used to train an imitation learning algorithm, which is finally deployed on the robot, letting the robot autonomously imitate human actions and generalize to real environments. No teleoperation or remote control is needed.

For example, in the video above, a human drags the SO-ARM robot arm to grab a crayfish, dip it in seasoning, and put it into the hot oil, ultimately letting the robot arm perform this action autonomously. Even if a new crayfish comes along, it can react at any time and complete the action.

Imitation learning also has a cutting-edge, fashionable name: VLA (Vision-Language-Action large model). This is also the embodied intelligence research field that is currently developing the fastest, has the hottest investment, the fiercest competition between China and the US, the most prosperous open-source ecosystem, intense media attention, and where countless master's and doctoral students are rushing to enter.

The algorithm that LeRobot is mainly adapted for is imitation learning. For example, ACT, Diffusion Policy, SmolVLA, Pi0, Pi0.5, Wall-OSS, etc.

In this tutorial, imitation learning refers only to VLA.

<RelatedProducts slugs="so-arm101" />
