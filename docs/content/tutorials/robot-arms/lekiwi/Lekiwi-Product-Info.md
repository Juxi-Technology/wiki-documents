---
title: Product Information
---

# Product Information

> **[Buy in Store](https://www.juxitech.com/products/lekiwi-embodied-intelligence-mobile-robotic-car)**

## Product Overview

LeKiwi is developed under the leadership of SIGRobotics-UIUC (the robotics interest group at the University of Illinois Urbana-Champaign). It provides a low-cost, highly flexible open-source robot platform that promotes the spread of robotics technology in education, research, and industrial automation. Its hardware design (3D-printing files), software stack (compatible with the LeRobot framework), and tutorials are all open source, and it supports user-defined extensions.

LeKiwi consists of a mobile platform and a leader-follower arm. The leader-follower arm uses 3D-printed parts as its structure and 6 12V Feetech servos as its drive joints. The leader arm sits on a fixed platform, uses one servo driver board, and connects to a computer via USB-C. The follower arm is mounted on the mobile platform, which is driven by 3 12V Feetech servos; it uses one servo driver board and is controlled via USB-C connected to a Raspberry Pi.

LeKiwi deeply integrates LeRobot (Hugging Face's open-source robot ML framework), supporting imitation learning, data collection, and policy training. It is implemented on PyTorch and includes pretrained models, datasets, and a simulation environment, and it is compatible with well-known open-source datasets such as Stanford ALOHA. It uses the DORA framework (a distributed dataflow engine) to achieve low-latency hardware-algorithm communication (Python performance is 17 times faster than ROS2) and supports hot reloading, so code can be adjusted in real time without restarting.

LeKiwi is very well suited to education and entry-level research: introductory robotics teaching, with end-to-end tutorials covering everything from assembly and programming to AI policy deployment; research validation: it supports imitation-learning research (for example, training a robot from human-operation videos recorded via VR), with the case of the pollen robot Ready2 learning tasks such as folding clothes and inserting keys after just 2 hours of training on 50 15-second videos; industrial prototyping: low-cost validation of automation solutions (such as material handling and precision assembly).
