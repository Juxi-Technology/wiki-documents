---
title: "SO-ARM101 Assembly"
description: "The Pro version's active arm uses a 5V6A power adapter, while the passive arm uses a 12V5A power adapter"
---

# SO-ARM101 Assembly

> **[Buy in Store](https://www.juxitech.com/products/so-arm101-developers-kit)**


![image – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/1.jpg)

**The Pro version's active arm uses a 5V6A power adapter, while the passive arm uses a 12V5A power adapter **

Servo ID setting, servo angle calibration, and assembly should be completed in advance, and you can refer to [ the official assembly tutorial ](https://huggingface.co/docs/lerobot/so101)

# Step 1: Set the servo ID and install the servo horn (excluding servo No. 5) 

![image – 2](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/2.png)

Once again, please ensure that the steering gear joint ID and gear ratio strictly correspond to those of **SO-ARM101**.

Each motor on the bus has a unique ID. New motors usually come with a default ID ` 1 `. To ensure normal communication between the motor and the controller, we first need to set a unique ID for each motor. In addition, the data transmission speed on the bus is determined by the baud rate. To be able to communicate with each other, the controller and all motors need to be configured with the same baud rate, and the baud rate of this robotic arm servo is 100000. 

To this end, we first need to connect the controller to each motor separately for setup. Since we will write these parameters to the non-volatile area of the motor's internal memory (EEPROM),only one operation is required.

If you plan to reuse the motors of other robots, you may also need to perform this step, as the ID and baud rate may not match. 

The following video shows the sequential steps for setting the motor ID. 

## Windows System

飞特舵机上位机.zip

Use the Feite servo controller to set the servo ID and calibrate the midpoint,  the ID setting ranges from 1 to 6! 

机械臂舵机设置ID-Windows系统.mp4

## Linux/Ubuntu System

For the FTServo Host Computer, please refer to  https://gitee.com/ftservo/FTServo_Linux

Please first follow the [LeRobot Manipulator Tutorial](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc) up to **C. Manipulator Control** under **Port Authorization **Run Script to Find Port**

Connect the servo driver board of the slave arm to the computer using a USB data cable and turn on the power. Then, run the following command. Please modify --robot.port=/dev/ttyACM0 in the command to the found Port Number. If the found port is /dev/ttyACM1, then modify it to --robot.port=/dev/ttyACM1

```Python
lerobot-setup-motors \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0
```

You will see the following output.

```Python
Connect the controller board to the 'gripper' motor only and press enter.
```

Connect the servo of the gripper as instructed. Please ensure it is the only servo connected to the servo driver board, and that this servo has not been connected to any other servos. After you press the **[Enter]** key, the script will automatically set the ID and baud rate of this servo, with the ID set from 6 to 1!

After that, you should see the following message: 

```Python
'gripper' motor id set to 6
```

Next, the output of the next item is:

```Python
Connect the controller board to the 'wrist_roll' motor only and press enter.
```

**Note**Repeat the above operations for each servo according to the instructions.

As with the previous servo, please ensure that it is the only servo connected to the driver board, and that the servo itself is not connected to any other servos. 

Before each press of the **Enter** key, please make sure to check your cable connections. For example, when operating the circuit board, the power cord may become disconnected.

After you have completed all the steps, the script will automatically end, at which point the servos will be ready for use. Now, you can connect the 3-pin interface of each servo in sequence, and connect the cable of the first servo (the "shoulder pan" servo with ID 1) to the driver board. Now the driver board can be installed on the base of the robotic arm. 

Repeat the same steps for the active arm. 

```Python
lerobot-setup-motors \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM0
```

机械臂舵机设置ID-Linux系统.mp4

# Step 2: Assembly

- The assembly steps of the follower arm are basically the same as those of the active arm. The only difference is that after Step 12, the installation method of the end effector (gripper and handle) is different. 

SO-ARM101机械臂组装教程.mp4

Installation of the servo driver board: First install 4 copper pillars, then secure the driver board with four M2.5\*8 screws

![Linux/Ubuntu System – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/7.png)

![Linux/Ubuntu System – 2](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/8.png)

![Linux/Ubuntu System – 3](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/9.png)

**The Pro version's black active arm uses a 5V6A power adapter, while the white passive arm uses a 12V5A power adapter **

<RelatedProducts slugs="so-arm101,servo-driver-board,overhead-camera-mount" />
