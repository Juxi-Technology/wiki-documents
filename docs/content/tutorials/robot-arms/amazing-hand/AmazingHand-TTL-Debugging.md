---
title: "TTL Debugging Tutorial"
description: "First, download the \" Amazing Debugging.zip \" Compressed Packet. After decompression, you can use the \"Debugging Dexterous Hand Process with Arduio Pr"
---

# TTL Debugging Tutorial

> **[Buy in Store](https://www.juxitech.com/products/amazinghand)**


First, download the " [Amazing Debugging.zip ](https://juxitech.feishu.cn/wiki/I4K0w3W0Ri7u7EkY1qfcVoGon6e)" Compressed Packet. After decompression, you can use the "Debugging Dexterous Hand Process with Arduio Program (TTL Servo) " document to set the servo ID, calibrate, calibrate the median, and run the demonstration program, or refer to the [official open source code ](https://github.com/pollen-robotics/AmazingHand/tree/main/ArduinoExample).

**Without disassembling the finished product ** (the factory servo ID settings, calibration, and calibration of the neutral position have been adjusted), you can directly skip to **[** Point 6 Run "02 Demo Program" **](https://juxitech.feishu.cn/docx/OmmSdaXt7oZXBUxIwUacAI3Jnrc#doxcn2d0kH1XOXx1SlxvsF1x5df)** and Point 7 **[** Hand Tracking **](https://juxitech.feishu.cn/docx/OmmSdaXt7oZXBUxIwUacAI3Jnrc#doxcnjsmqox3aQVF6pVKanOCRng)**. **

![image – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/1.png)

## 1. Debug the wiring method of the dexterous hand

One way is to use a computer to run host computer software such as Python, for example, the Feite Servo Host Computer or running Python code 

One is to use single-chip microcomputers such as MEGA328P, or self-purchased development boards or main controllers, etc.

The wiring method is as follows: 

(1)Wiring method during Python debugging(only connect the servo driver board): 

![1. Debug the wiring method of the dexterous hand – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/2.png)

(2)Wiring method during debugging of MEGA328P development board(Servo Driver Board + 328P Development Board):

**Take a good look at the pin positions of the MEGA328P development board! **

![1. Debug the wiring method of the dexterous hand – 2](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/3.png)

![1. Debug the wiring method of the dexterous hand – 3](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/4.png)

![1. Debug the wiring method of the dexterous hand – 4](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/5.png)

![1. Debug the wiring method of the dexterous hand – 5](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/6.png)

The following describes the debugging process of using a microcontroller. The microcontroller itself will continuously loop through the demonstration program, and it can be stopped simply by disconnecting the data cable. 

## 2. Set Servo ID

A single dexterous hand uses a total of 8 servos, with the right hand ID needing to be set to 1-8 and the left hand ID needing to be set to 11-18 

Median calibration, finished product default, right hand [451,571,451,571,451,571,451,571], left hand [571,451,571,451,571,451,571,451] 

1. Wiring: Connect the **single** servo motor and servo driver board in sequence.

![2. Set Servo ID – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/7.jpg)

2. Use the upper computer software FD1.9.8.2 provided by the servo manufacturer for configuration

FD.rar

![2. Set Servo ID – 2](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/8.png)

![2. Set Servo ID – 3](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/9.png)

![2. Set Servo ID – 4](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/10.png)

## 3.**Fix the servo horn**

1. Upload the code program "used when installing the white servo horn" to the development board

Function of this program: Position the gear of the servo motor at a roughly centered position, and subsequent action angles are all based on this centered position.

(1) Install the software Arduino by yourself, and refer to the [installation tutorial](https://blog.csdn.net/weixin_35509395/article/details/156188274) according to your own system. If you want to compile and download the Arduino program, you need to first install the FTServo library and SCServo library in the Library Manager.

![3.Fix the servo horn – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/11.png)

(2) Development board type selection: Select "Arduino Nano" 

![3.Fix the servo horn – 2](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/12.png)

2. Debug Servos 1 and 2

(1) Edit: Modify the following positions according to the ID of the servo to be debugged. For example, if you want to debug the index finger, set the ID values to 1 and 2.

![3.Fix the servo horn – 3](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/13.png)

(2) Upload the program to the development board 

(3) Wiring: Connect the development board to the servo driver board, **servos No. 1 and 2**, and you can hear the servo gears rotate a certain angle and then stop.

![3.Fix the servo horn – 4](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/14.png)

(4) Install the servo horn on the gear, keeping the position as parallel as possible.

![3.Fix the servo horn – 5](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/15.png)

3. Debug servos 3 and 4

(1)**Disconnect the wiring between the 328P development board and the servo driver board (otherwise uploading will not be possible)**

(2) Edit: Set ID values to 3, 4

![3.Fix the servo horn – 6](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/16.png)

(3) Upload the program to the development board 

(4) Connection: Connect the development board with the servo drive board, **3 and 4 **servos, and you can hear the servo gear rotate at a certain angle and stop.

(5) Install the servo horn on the gear, keeping the position as parallel as possible

4. Debug servos 5 and 6

The steps are the same as above 

5. Debug servos 7 and 8

The steps are the same as above 

## 4.**Fine-tune intermediate values**

1. Upload the code program "01 Used when fine-tuning MiddlePos value" to the development board

2. When the finger is in the closed position, immediately stop the program (simply disconnect the data cable), and check whether the servo horn is correctly aligned (as shown in the figure below). If it is not aligned, adjust the values of MiddlePos_1 and MiddlePos_2 in the program until it is aligned. Record these values (8 values corresponding to 8 servos), which will be used in the final program.

![4.Fine-tune intermediate values – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/17.png)

![4.Fine-tune intermediate values – 2](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/18.png)

## 5.**Run the test program**

1. Fill the values of MiddlePos_1 and MiddlePos_2 saved above into the following array, and then download the program.

![5.Run the test program – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/19.png)

## 6.**Run "02 Demo Program"**

(1) Install the software arduino by yourself, referring to the [installation tutorial according to your own system](https://blog.csdn.net/weixin_35509395/article/details/156188274)

(2) Under the ` Dexterous Hand Debugging \00 TTL Serial Servo \ Arduino Program (MEGA328P Development Board) \02 Demo Program ` directory, open the corresponding ino file based on whether it is the left or right hand 

![6.Run "02 Demo Program" – 1](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/20.png)

(3) If you upload the Arduino program to the development board, you need to install the FTServo library and SCServo library in the library manager

![6.Run "02 Demo Program" – 2](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/21.png)

(4) Select the development board type: Choose "Arduino Nano"

![6.Run "02 Demo Program" – 3](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/22.png)

(5) Compile and upload

Note that at this time, the computer is only connected to the development board alone, and the development board is not connected to the servo driver board (i.e., not connected to the dexterous hand) for the time being.

After successful upload, connect the development board to the servo driver board via three jumpers, and connect the servo to the servo driver board, referring to the wiring method in [ MEGA328P Development Board Debugging ](https://juxitech.feishu.cn/docx/OmmSdaXt7oZXBUxIwUacAI3Jnrc#doxcniHLi7JvMCniati2Mrgr6ne)[ ](https://juxitech.feishu.cn/docx/OmmSdaXt7oZXBUxIwUacAI3Jnrc#doxcniHLi7JvMCniati2Mrgr6ne)

The dexterous hand will continuously loop and run ** "02 Demo Program" **

The running results are as follows 

![6.Run "02 Demo Program" – 4](../../../../public/images/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging/23.png)

## [7. Hand Tracking](https://juxitech.feishu.cn/wiki/ZpHmwYARQiN2fwkqFJecqUFZnQg)



