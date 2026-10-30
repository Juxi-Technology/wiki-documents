---

title: "AmazingHand Dexterous Hand Usage Tutorial"

description: "Complete tutorial for the AmazingHand open-source dexterous hand: product information, camera kit, web gesture recognition, MuJoCo gesture tracking, interface control, Arduino Nano, and TTL / PWM debugging."

---



# AmazingHand Dexterous Hand Usage Tutorial



AmazingHand is an open-source humanoid hand project that costs under US$250, aimed at robotics enthusiasts, researchers and developers.



## Project Overview



- **Mechanical design**: 8 degrees of freedom across 4 fingers, with 2 linked knuckle joints per finger; the fingers use a parallel-linkage drive with no external cables, and all actuators are built into the hand; 3D-printed parts, about 400 g in weight and under 200 euros in cost.

- **Control solutions**: Python serial-bus driver (supports Waveshare and other hardware); choose between the Arduino + Feetech TTL Linker solutions; Python and Arduino example code provided; supports feedback such as servo torque enable/disable, position sensing and temperature monitoring.

- **Complete resources**: full BOM, CAD files and Onshape online documents, assembly tutorials and calibration scripts, basic and advanced demo examples, with inverse/forward kinematics support.

- **Highlights**: fits robot wrists such as Reachy2; open design, community-driven; the roadmap includes tactile sensing, compliant joints, multiple finger lengths and a 5-finger version.



## Tutorial Contents



| Content | Description |
|---|---|
| [Product Information](./product-info.md) | Product specifications, BOM, structure and downloads |
| [Environment Camera Kit Installation](./Camera-Kit-Installation.md) | Camera kit bracket installation steps |
| [Web Gesture Recognition](./AmazingHand-Web-Control.md) | Online web control and local deployment |
| [Gesture Tracking (MuJoCo Simulation)](./gesture-tracking/02-Windows.md) | One-click deployment and run on Windows / Linux / Mac |
| [Interface Control Tutorial](./AmazingHand-Interface-Control.md) | Python GUI / command-line control, left/right hand calibration and protocol |
| [Arduino Nano Tutorial](./Arduino-Nano-Tutorial.md) | Nano board wiring, library installation and demo program |
| [TTL Serial Bus Servo Debugging: Assembly](./AmazingHand-TTL-Debugging.md) | TTL serial bus servo assembly and debugging |
| [PWM Servo Debugging](./pwm-debugging/01-GUI-Visual-Control.md) | GUI visualization, gesture tracking and user manual |



## Downloads



- [AmazingHand.zip](https://juxitech.feishu.cn/wiki/EoLawIK31i3xNNkVX8WcENGfn2d) — one-click gesture-tracking deployment (Windows / Linux / Mac)

- [SCS0009_ServoController.zip](https://juxitech.feishu.cn/wiki/Qp06wpL4HiALsMkWHsKchxvKnJc) — Feetech SCS0009 servo calibration tool

- [AmazingHand Official Repository](https://github.com/pollen-robotics/AmazingHand)
- [delivery_package.zip](/downloads/delivery_package.zip) — PWM delivery package（GUI / hand tracking / firmware / docs）
- [Amazinghand-web.zip](/downloads/Amazinghand-web.zip) — Local deployment package
- [Juxi_ServoController.zip](/downloads/Juxi_ServoController.zip) — Servo controller tool


### All pages

- [AmazingHand Dexterous Hand Product Information](./product-info.md)
- [Environment Camera Kit Installation](./Camera-Kit-Installation.md)
- [AmazingHand Web Control](./AmazingHand-Web-Control.md)
- [Windows One-Click Deployment and Run](./gesture-tracking/02-Windows.md)
- [Linux (Ubuntu) One-Click Deployment and Run](./gesture-tracking/01-Ubuntu.md)
- [Mac One-Click Deployment and Run](./gesture-tracking/03-macOS.md)
- [Official Example Tutorial](./AmazingHand-Official-Example.md)
- [Interface Control Tutorial](./AmazingHand-Interface-Control.md)
- [Arduino Nano Tutorial](./Arduino-Nano-Tutorial.md)
- [TTL Debugging Tutorial](./AmazingHand-TTL-Debugging.md)
- [01-GUI Visual Control](./pwm-debugging/01-GUI-Visual-Control.md)
- [02-Gesture Tracking Tutorial](./pwm-debugging/02-Gesture-Tracking.md)
- [03-PWM Servo Version-User Manual](./pwm-debugging/03-PWM-Servo-Manual.md)
- [04-Serial Bus Servo Version-User Instructions](./pwm-debugging/04-Serial-Servo-Guide.md)
- [Full Workflow Tutorial](./pwm-debugging/05-Full-Workflow-Tutorial.md)


<RelatedProducts slugs="amazinghand" />

