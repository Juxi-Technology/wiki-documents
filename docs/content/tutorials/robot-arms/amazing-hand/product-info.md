---
title: "AmazingHand Dexterous Hand Product Information"
description: "AmazingHand is a high-precision, lightweight, gesture-tracking dexterous hand, designed specifically for embodied intelligence research."
---

# AmazingHand Dexterous Hand Product Information

## Product Introduction

AmazingHand is a **high-precision, lightweight, gesture-tracking dexterous hand**, designed specifically for embodied intelligence research, robotics education, and human-computer interaction applications. The product is controlled by 8 high-precision SCS0009 TTL serial bus servos and supports right-hand, left-hand, and dual-hand robot operation, enabling complex gestures and real-time tracking functions.

### 1. Hardware Design: High Precision and Lightweight, Easy to Debug and Scalable

- **Servo configuration**: A single dexterous hand uses **8 SCS0009 TTL serial bus servos**; 2 servos work together to control the same finger, providing precise motion control and stable gripping capability.

- **Lightweight structure**: The dexterous hand weighs only 0.416kg in total, with a compact structure that is easy to install on various robot platforms.

- **Convenient connection**: It communicates through a Type-C interface and, together with a servo driver board and a MEGA328P development board, is plug-and-play, simplifying the hardware connection process.

- **Modular design**: It supports separate right-hand and left-hand configurations, and can also work as a dual-hand robot in coordination, flexibly adapting to different application scenarios.

### 2. Software Ecosystem: Integrated Gesture Tracking, Easy to Get Started with AI Development

- **Real-time gesture tracking**: Based on MediaPipe's real-time hand tracking technology, gestures are captured through a webcam, enabling imitation learning and follow control of the dexterous hand.

- **Distributed data flow**: It adopts the **DORA distributed data flow engine** to achieve low-latency interaction between hardware and algorithms, supporting a complete link from gesture data to servo control.

- **Unified simulation and hardware**: It provides a virtual simulation environment, supporting verification of control algorithms in simulation before seamless migration to real hardware.

- **Open-source ecosystem**: Control code, training scripts, and tutorials are open source, supporting secondary development and feature expansion.

### 3. Core Application Scenarios: Full Coverage from Teaching to Research

1. **Getting started with robotics education**: It provides a full-process tutorial covering dexterous hand assembly, servo debugging, basic control, and gesture tracking, along with demo programs and example code, so that users with no prior experience can get started quickly.

2. **Embodied intelligence research**: It focuses on **gesture imitation learning and human-computer interaction** research and supports training the dexterous hand by capturing human hand movements through a camera; typical applications: gesture control, object grasping, human-robot collaboration, and other tasks.

3. **Human-computer interaction prototypes**: Low-cost validation of human-computer interaction solutions, adapting to scenarios such as **gesture control, teleoperation, and VR/AR interaction**, enabling rapid prototype validation.

### 4. Product Advantages

- **High cost-effectiveness**: It adopts a mature serial bus servo solution with controllable cost, suitable for batch deployment by individuals, laboratories, and educational institutions.

- **Gesture tracking**: With built-in gesture tracking capability, no additional complex equipment is required, and an ordinary camera can achieve real-time follow control of the dexterous hand.

- **Developer-friendly**: It provides complete debugging tutorials, demo programs, and development interfaces, enabling quick onboarding from hardware debugging to software control.

- **Dual-hand coordination**: It supports independent operation of a single-hand robot and also supports coordinated work of dual-hand robots, flexibly adapting to different experimental and application needs.

### 5. Product Parameters

#### Basic Parameters

|Parameter|Specification|
|---|---|
|**Weight**|0.416kg|
|**Number of fingers**|4|
|**Degrees of freedom per finger**|2DoF|
|**Servo configuration**|8 SCS0009 servos (2 servos control 1 finger)|

#### Dimensions

|Parameter|Specification|
|---|---|
|**Height (after extension, excluding base)**|195mm|
|**Palm width**|105mm|
|**Palm thickness**|Approx. 90mm|
|**Maximum spread distance between index finger and thumb**|180mm|

#### Electrical Parameters

|Parameter|Specification|
|---|---|
|**Operating voltage**|5-6V|
|**Power supply**|Driven by a 5V 5A power adapter|
|**Communication interface**|Type-C|

#### Performance Parameters

|Parameter|Specification|
|---|---|
|**Load capacity per finger**|0.2kg|
|**Maximum load with 4 fingers tightly gripped**|0.5kg|

