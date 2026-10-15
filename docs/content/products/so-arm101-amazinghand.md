---
title: "SO-ARM101 & AmazingHand Open Source Dexterous Hand Robotic Arm"
category: robot
description: "The SO-ARM101 & AmazingHand is a complete open-source embodied AI platform that pairs the SO-ARM101 6-axis robotic arm with the AmazingHand 8-DOF…"
keywords: ["SO-ARM101 & AmazingHand Open Source Dexterous Hand Robotic Arm", "SO-ARM101", "AmazingHand", "LeRobot", "SCS0009", "STS3215"]
---

# SO-ARM101 & AmazingHand Open Source Dexterous Hand Robotic Arm

## Product Overview

The SO-ARM101 & AmazingHand is a complete open-source embodied AI platform that pairs the SO-ARM101 6-axis robotic arm with the AmazingHand 8-DOF four-finger dexterous hand. The stock parallel gripper is replaced by a four-finger hand driven from a single leader-arm servo, delivering synchronized four-finger grasping and extension through a simple, reliable, factory-assembled mechanism. Built on the Hugging Face LeRobot ecosystem, it supports leader-follower teleoperation, dual-view data collection and end-to-end imitation learning with ACT, SmolVLA, Pi0, Pi0.5 and GR00T N1.5 — the easiest starting point for moving from a gripper to a dexterous hand.

**SO-ARM101** is an open-source 6-axis robotic arm deeply optimized from SO-ARM100. Revised cable routing and motor/gear pairings eliminate the joint cable-breakage issue and no longer restrict the range of motion of the joints, while supporting real-time leader-follower following and seamless compatibility with the Hugging Face LeRobot toolkit.

**AmazingHand** is an open-source, low-cost, fully 3D-printable 8-DOF robotic hand development kit. Its servos are housed entirely inside the hand body with a cable-free internal design, and each finger is driven by two joints, combining dexterity with natural inter-finger collaboration.

## Key Advantages

### Four-Finger Dexterous Hand with 8 Degrees of Freedom

AmazingHand provides four fingers (thumb, index, middle and ring), two articulated phalanges per finger and 8 degrees of freedom in total. A parallel linkage mechanism lets the fingers work together for a more natural grasp, while every servo sits inside the hand body with no external cabling for a compact, clean build.

### Single-Servo Linkage Drives All Four Fingers

The No.6 servo (STS3215) on the leader arm drives all eight SCS0009 bus servos inside the hand through range mapping, so a single motion produces synchronized four-finger grasping (closed fist) or extension (open palm). Simple mechanics, reliable control, and no complex hand-side programming.

### End-to-End Imitation Learning with ACT, SmolVLA, Pi0, Pi0.5 and GR00T N1.5

Run leader-follower teleoperation to record demonstration data, then train an imitation learning policy in a single pass. A small dataset is enough for the follower arm to complete preset grasping tasks autonomously, and the whole loop can be closed without writing code from scratch.

### Dual-View Data Collection

An overhead bracket camera covers the entire workspace from above to establish the spatial position and orientation of target objects, while a desk-stand side-view camera streams workspace context in real time. Together they keep manipulation precise, respond quickly to changes in the scene, and prevent drift or stalling.

### Factory Assembled, Ready to Use Out of the Box

Each unit ships assembled, wired and calibrated — connect power and USB and the platform is ready for teleoperation and data collection. Camera options include an 86° auto-focus 30FPS module and a 100° wide-angle fixed-focus 60FPS module, USB driver-free and plug-and-play.

### Seamless Hugging Face LeRobot Integration

Reuse LeRobot's pretrained models, datasets and algorithm libraries directly, share code and experience with a global developer community, and enter embodied AI without rebuilding the toolchain yourself.

## Hardware Overview

### Available Versions (Select based on your end effector needs):

| Version | End Effector | Hand Control | Suitable For |
|---|---|---|---|
| Pro Version | TPU flexible gripper | Independent servo control | Users who need the standard SO-ARM101 two-finger gripper |
| Dexterous Hand Version | AmazingHand four-finger dexterous hand | Leader arm No.6 servo range-mapped to drive 8 bus servos in unison | Users exploring dexterous grasping and end-to-end imitation learning |

**Grasp method:** the Pro Version uses two-finger pinching, while the Dexterous Hand Version uses four-finger grasping and extension. Independent per-finger control is not supported in the current version and is on the development roadmap.

### Compatible Devices:

Raspberry Pi / D-Robotics RDK / NVIDIA Jetson series controllers, plus Windows and Linux host PCs over USB serial. Fully compatible with the LeRobot SO-ARM101 and AmazingHand open-source projects, and supports most serial bus servos on the market.

### 3-Step Easy Setup:

- Connect the servo driver board to your Raspberry Pi, RDK or Jetson controller with the supplied cable, then power the leader arm (DC5521 5V6A) and the follower arm (DC5521 12V5A).
- Power on and connect over USB serial. The arm and hand ship assembled, wired and calibrated — no mechanical assembly or servo ID setup is required.
- Follow the provided LeRobot tutorials to teleoperate the follower arm, collect dual-view datasets and train your imitation learning policy.

## Technical Specifications

### Dexterous Hand (AmazingHand)

| Finger Span | 195mm ~ 101mm |
|---|---|
| Degrees of Freedom | 8 DOF (driven by 8 bus servos) |
| Single-Finger Load Capacity | 0.2kg (maximum 0.5kg with all four fingers in a full grip) |
| Number of Fingers | 4 (thumb, index, middle, ring) |
| Phalanges per Finger | 2 |
| Hand Weight | 0.416kg |
| Finger Bending Range | First phalanx 0~86°, second phalanx 0~80° |
| Finger Side-Roll Angle | Thumb 20°, other three fingers -20°~20° |
| Supply Voltage | 6V DC |
| Control Method | Driven by the leader arm No.6 servo — synchronized four-finger grasp / extension |
| Power | Maximum 48W, rated 4.8W |

### Robotic Arm (SO-ARM101)

| Product Material | Bambu PLA+ |
|---|---|
| Product Dimensions | Leader arm: 111 x 239 x 525mm
Follower arm: 111 x 173 x 532mm |
| Product Weight | Leader arm: approx. 680g
Follower arm: approx. 690g |
| Servo Driver Board | JUXI Bus Servo Adapter |
| Camera | 2MP HD auto-focus 30FPS camera (1080P)
2MP HD fixed-focus 60FPS camera (1080P) |
| Power Supply | DC5521 5V6A (Leader arm) / DC5521 12V5A (Follower arm) |
| Operating System | Windows / Linux |
| Control Interface | USB serial communication |
| Programming Language | Python |

### Servo Configuration

| Position | Servo Model | Gear Ratio | Quantity |
|---|---|---|---|
| Leader arm — No.2 joint (7.4V) | STS3215-C001 | 1:345 | 1 |
| Leader arm — No.1 and No.3 joints (7.4V) | STS3215-C044 | 1:191 | 2 |
| Leader arm — No.4, No.5 joints and No.6 gripper / hand (7.4V) | STS3215-C046 | 1:147 | 3 |
| Follower arm — all joints, Pro Version (12V) | STS3215-C018 | 1:345 | 6 |
| Follower arm — arm joints, Dexterous Hand Version (12V) | STS3215-C018 | 1:345 | 5 |
| AmazingHand dexterous hand (6V) | SCS0009-C001 | — | 8 |

### SCS0009 Bus Servo (Dexterous Hand)

| Servo Model | Feetech SCS0009-C001 (2.3kg single-axis serial bus servo) |
|---|---|
| Rotation Speed | 0.07sec/60° (143RPM) @6V |
| Stall Torque | 2.3kg.cm @6V |
| Servo Precision | 0.293° (300/1024) |
| Sensor & Range | Potentiometer sensor, 300° controllable, supports both angle-controlled servo mode and continuous-rotation wheel mode |
| Protection | Voltage protection, stall protection, over-temperature protection |
| Data Readback | Supported — temperature, speed, voltage and position feedback |
| Deployment | Two SCS0009 servos per finger, delivering fast coordinated response and smooth finger motion |

### STS3215 Bus Servo (Robotic Arm)

| Parameter | STS3215-C001 | STS3215-C018 |
|---|---|---|
| Rotation Speed | 0.192sec/60° (52RPM) @7.4V | 0.222sec/60° (45RPM) @12V |
| Stall Torque | 19.5kg.cm @7.4V | 30kg.cm @12V |
| Servo Precision | 0.088° | 0.088° |
| Sensor & Range | 12-bit high-precision magnetic encoder, 360° controllable | 12-bit high-precision magnetic encoder, 360° controllable |
| Protection | Voltage protection, stall protection, over-temperature protection | Voltage protection, stall protection, over-temperature protection |
| Data Readback | Supported — angle, temperature, voltage and position feedback | Supported — angle, temperature, voltage and position feedback |

The STS3215 integrates two high-quality magnetic encoder motors with millisecond-level coordinated response and multiple operating modes, keeping every arm motion smooth and precise.

### JUXI Bus Servo Adapter (Driver Board)

| Power Input | 7~12V |
|---|---|
| Power Connector | DC5521 |
| Servo Interface | PH2.0 bus servo interface |
| Communication Interface | USB Type-C |
| Mounting Hole Spacing | 37.00 x 28.00mm |
| Mounting Hole Diameter | 2.5mm |
| Product Dimensions | 42.00 x 33.00mm |
| Product Weight | 15g |

The board features a compact plug-and-play design with a TVS voltage-regulation protection module to prevent high-voltage breakdown. A single cable connects it to Raspberry Pi, D-Robotics RDK or NVIDIA Jetson controllers for real-time motor control and encoder data feedback. It supports the LeRobot SO-ARM101 arm, the AmazingHand dexterous hand and most serial bus servos on the market.

### Camera Module (Optional)

| Resolution | 1080P, 2MP |
|---|---|
| Available Options | 86° auto-focus 30FPS camera / 100° wide-angle fixed-focus 60FPS camera |
| Interface | USB, driver-free and plug-and-play |
| Mount Options | Side-view or top-view camera mount kit |

### Applications

- **University research** — teaching labs and research projects in robotics, artificial intelligence and automation, particularly dexterous grasping and imitation learning.
- **Developers and makers** — algorithm development, prototype validation, secondary development of the dexterous hand, and robotics competitions.
- **Educational institutions** — an ideal teaching aid for advanced courses in AI programming and robot vision.
- **Enthusiasts** — build a desktop robot that puts real AI techniques to work and grasps with a human-like hand.

## Open Source & Ecosystem

This product is built on the open-source LeRobot SO-ARM101 project and the AmazingHand project. The SO-ARM101 & AmazingHand platform connects seamlessly to the Hugging Face community: LeRobot's pretrained models, datasets and algorithm libraries can be reused directly, and code and experience can be shared with developers worldwide — lowering the technical barrier to entering embodied AI.

- Source code is released under the Apache License 2.0.
- Mechanical design files are released under the CC BY 4.0 license.

## Package Options

| Package | AmazingHand (Finished) | SO-ARM101 Pro Version | SO-ARM101 Dexterous Hand Kit | Dexterous Hand Kit (Dual Camera) |
|---|---|---|---|---|
| 3D Printed Parts | ✓ | ✓ | ✓ | ✓ |
| AmazingHand Dexterous Hand | ✓ | — | ✓ | ✓ |
| Scene Camera | — | — | — | ✓ |
| Dual-View Data Collection | — | — | — | ✓ |
| Leader-Follower Teleoperation | — | ✓ | ✓ | ✓ |
| End-to-End Imitation Learning | ✓ | ✓ | ✓ | ✓ |

## Part List

### SO-ARM101 Dexterous Hand Kit:

- 1 x Leader arm (assembled) — 1 x STS3215-C001 (7.4V, 1:345), 2 x STS3215-C044 (7.4V, 1:191), 3 x STS3215-C046 (7.4V, 1:147)
- 1 x Follower arm (assembled) — 5 x STS3215-C018 (12V, 1:345)
- 1 x AmazingHand four-finger dexterous hand (assembled) — 8 x SCS0009-C001 (6V) bus servos
- 2 x JUXI Bus Servo Adapter (servo driver board)
- 1 x DC5521 5V6A power supply cable (leader arm)
- 1 x DC5521 12V5A power supply cable (follower arm)
- 2 x USB Type-C cable
- 4 x Fixing clip
- 1 x USB hub

### SO-ARM101 Dexterous Hand Kit (Dual Camera):

Everything in the SO-ARM101 Dexterous Hand Kit, plus:

- 1 x Overhead (top-view) camera mount kit with 2MP 1080P camera module
- 1 x Desk-stand side-view camera kit with 2MP 1080P camera module

### SO-ARM101 Pro (TPU Gripper):

- 1 x Leader arm (assembled) — 1 x STS3215-C001 (7.4V, 1:345), 2 x STS3215-C044 (7.4V, 1:191), 3 x STS3215-C046 (7.4V, 1:147)
- 1 x Follower arm (assembled) with TPU flexible gripper — 6 x STS3215-C018 (12V, 1:345)
- 2 x JUXI Bus Servo Adapter (servo driver board)
- 1 x DC5521 5V6A power supply cable (leader arm)
- 1 x DC5521 12V5A power supply cable (follower arm)
- 2 x USB Type-C cable
- 4 x Fixing clip
- 1 x USB hub

### Amazing Hand（Right Hand）:

- 1 x AmazingHand four-finger dexterous hand, fully assembled with 8 x SCS0009-C001 (6V) bus servos
- 1 x JUXI Bus Servo Adapter (servo driver board)
- 1 x Interconnect cable


## Tutorials

- [SO-ARM101 Tutorial](/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [SO-ARM101 Assembly](/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [Robot Arm Selection Guide](/tutorials/robot-arms/select-guide)
- [Embodied AI Intro (LeRobot)](/topics/embodied-ai-intro)
- [AmazingHand Interface Control](/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control)
- [AmazingHand Official Example](/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example)
- [AmazingHand TTL Debugging](/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging)


## Support

- 📧 Email: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
