---
title: "Parts-Kit Assembly"
description: "XLeRobot parts-kit assembly guide: build two SO101 follower arms, configure the Feetech servo IDs, and set up the omni-wheel chassis car."
---

# Parts-Kit Assembly

![Image 1](../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/1.jpg)

Tip

If you would rather skip the fun of tightening screws, you can also buy the [pre-assembled kit](https://item.taobao.com/item.htm?id=1002551208989&skuId=6088534920039) for the SO101 follower arms compatible with Xlerobot.



## 🦾 SO101 Robotic Arm

![Image 2](../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/2.jpg)

> If you already have 2 assembled SO101 robotic arms with servos configured, please skip this.
> 
> 

- Build 2 SO101 robotic arms following the [SO101 step-by-step assembly instructions](https://juxitech.feishu.cn/wiki/HllBwhjJ1iayMdkUTGgcyKbgn8g), making 2 identical follower arms, equipped with 2 sets of servos (all previously with ID 1-6) for the 2 servo driver boards.

- Add the wrist camera following this [installation guide](https://juxitech.feishu.cn/wiki/LjJywf5ILihuwkkOboGcFx1Qnkc).

- If you have anti-slip pads, you can stick them onto the gripper.

## 1. Configure the Servos

||Quantity|Servo ID|Purpose|
|---|---|---|---|
|Feetech STS3215-C018 servo|3|7、8、9|Omni-wheel chassis car|
|Feetech STS3215-C018 servo|2|7、8|Upper-limb kit-camera tower|
|90CM servo extension cable|2||Connect the chassis car and camera tower to the servo driver board|

![Image 3](../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/3.jpg)

> Because the official lerobot code repository currently does not support servo configurations other than the robotic arm, we use [Bambot](https://bambot.org/) instead (it works on Windows and Mac; on Linux you need to first run sudo chmod 666 /dev/ttyACM0).
> 
> 

```Plain Text
sudo chmod 666 /dev/ttyACM0
```

- Connect the servos you want to configure (one by one) to the servo driver board, and connect the servo driver board directly to your computer.

- Navigate to the [Bambot servo configuration page](https://bambot.org/feetech.js), establish a connection and scan your servos. 

![Image 4](../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/4.png)

- Rename the servo IDs according to the instructions below. 

![Image 5](../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/5.png)

- In addition to the SO101 robotic arms, you also need to configure two sets of servos for the 2 servo driver boards:

    - one set for the **camera tower** (servo IDs: 7, 8)

    - the other set for the **omni-wheel chassis car** (servo IDs: 7, 8, 9).

- Tip: use a marker pen to write numbers on the servos, and distinguish the servos of different boards (e.g. L1-L8 and R1-R9).

## 🛒 Cart

- In case you accidentally threw away the manual, [here is a copy](https://github.com/Vector-Wangel/XLeRobot/blob/main/others/Manuals_raskog_utility_cart.pdf).

![Image 6](../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/6.png)

## 🧑🦼➡ Wheeled Base

> If you already have a Lekiwi base, please remove the battery, servo brackets, etc. The bottom plate only needs 3 servos with wheels installed (keep the wiring).
> 
> 

![Image 7](../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/7.png)

**Note**

Do not choose the wrong board; each board has a specific order.

- Install the omni wheels onto the board according to the figure above.

    - The specific servo IDs should be installed accordingly.

- Note that the omni wheel connectors require 3 M4 screws.

- Wire the servos normally according to the [tutorial](https://github.com/SIGRobotics-UIUC/LeKiwi/blob/main/Assembly.md#2-bottom-plate-assembly); afterwards, do not connect the servo cables to the servo driver board — instead use the **90CM servo extension cable** to connect to the servo driver board.

![Image 8](../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/8.png)

- Install the top plate according to the figure above.

- Leave the **90CM servo extension cable** hanging; do not pull it out of the top plate hole for now.

![Image 9](../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/9.jpg)

- Install 3 connectors (risers) on the top plate according to the figure above.

Tip

Place the Lekiwi base with connectors under the cart and see whether it puts enough pressure on the cart so that the cart's four wheels still touch the ground. If not, try modifying the connector's 3D model by slightly adjusting the Z-axis scale directly in the slicing software (keeping the X and Y axis scale unchanged) and reprinting it.

![Image 10](../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/10.png)

Tip

Flip the cart over to perform the following assembly.

- Now install the Lekiwi base with connectors onto the bottom of the cart, with the thinner plate on the other side.

- Refer to the figures to find the required assembly orientation based on the servo index.

Note

This new hardware version is compatible with the cart's metal mesh; all 12 M3 screws should fit in easily.

![Image 11](../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/11.jpg)

- Then, route the previously extended cables upward from below through the cart.

## 🦾 Robotic Arm Base

### Top Base Assembly

14 M3\*12 hex screws

4 M3\*16 hex screws

![Image 12](../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/12.png)

- Assembly is easier when the base is flipped over.

### Head Assembly

①First use the 90CM servo extension cable (black and white alternating) and the servo cable (white, red and black alternating) plugged into servo No. 7.



②Use four M2\*6 washer screws to fix the camera

![Image 13](../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/13.png)

- Note that when installing the servo horn, do not put a screw in the middle hole of the servo horn.

- This should be the same as the first two steps of the [SO101 robotic arm assembly](https://huggingface.co/docs/lerobot/so101#joint-1).

## 🧵 Wiring

Important

Before clamping the top base onto the cart, complete all wiring and cable management for the top base, and place the Raspberry Pi into its enclosure.

![Image 14](../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/14.png)

- Connect the 90CM servo extension cable from the **Lekiwi base** to the **left SO101 robotic arm** (this makes the base and arm into a Lekiwi).

- Connect 2 **USB-C to USB-A data cables ** from the 2 **servo driver boards** to the **Raspberry Pi** (the remaining 2 USB-A slots are for the cameras) or a Jetson mainboard.

- Connect all 3 **power cables**: 2 **USB-C to DC (12V)** cables from the 2 servo driver boards and 1 **USB-C to USB-C** cable from the **Raspberry Pi**, to the PD fast-charging ports of the power supply. Each port provides up to 100W when charging simultaneously, which has been tested to be sufficient to support operation of the 12V version.

### 🔋 Placing the Battery 🛒

- Place it anywhere on the middle or lower layer of the cart to keep the center of gravity low. The battery has a non-slip bottom and does not slide easily during normal operation.

- Keep it upright for safety.

- In case you also accidentally threw away the battery manual, [here is a copy](https://github.com/Vector-Wangel/XLeRobot/blob/main/others/Manual_Anker_SOLIX_C300_DC_Portable_Power_Station.pdf).

Important

To protect the servo driver boards, make sure to connect the power cables last. Always disconnect the power cables when plugging or unplugging other cables.

## 📸 Final Assembly

### Installing the Base into the Cart

Important

Before clamping the top base onto the cart, complete all wiring and cable management for the top base, and place the Raspberry Pi into its enclosure.

![Image 15](../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/15.jpg)

- Be careful not to damage the enclosure when pushing the cart edge into the enclosure socket.

- To make testing easier, the SO101 robotic arms are clamped directly onto the cart. Position the [robotic arm base](https://github.com/Vector-Wangel/XLeRobot/blob/main/3D_Models/3D_models_for_printing/XLeRobot_special/SO_5DOF_ARM100_Assemblybases.stl) at the two corners of the top layer of the cart, then fix it with **F-type clamps**.

- If you have a Bambu Lab filament cardboard spool, don't forget to put it inside to provide stable structural support.

![Image 16](../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/16.jpg)

After completing these steps, the XLeRobot should be physically well assembled and ready to do some housework.

![Image 17](../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/17.jpg)

![Image 18](../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/18.jpg)

Important

Once the XLeRobot is fully assembled, do not push it around like a cart, as this may damage the servo gears. Instead, lift the robot (~12kg) when you need to move it manually.

<RelatedProducts slugs="xlerobot" />
