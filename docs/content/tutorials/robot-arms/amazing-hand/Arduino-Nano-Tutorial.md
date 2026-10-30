---
title: "Arduino Nano Tutorial"
description: "Run the AmazingHand '02 demo program' with an Arduino Nano (328P) and servo driver board: wiring, library installation, compiling and uploading, and the running result."
---

# Arduino Nano Tutorial

## Wiring (Servo Driver Board + Nano Board)

**Look carefully at the pin positions on the Nano board (i.e., the 328P development board)!**

![Illustration](../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/01.png)

![Illustration](../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/02.png)

![Illustration](../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/03.png)

![Illustration](../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/04.png)

The following describes the debugging process using the microcontroller. The microcontroller itself runs the demo program in a loop; just disconnect the data cable to stop it.

## Running the "02 Demo Program"

1. Install the Arduino IDE.

2. Depending on whether it is the **left hand or the right hand**, open the corresponding `.ino` file.

   ![Illustration](../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/05.png)

3. Before compiling and uploading the Arduino program to the Nano board, install the **FTServo library** and the **SCServo library** in the "Library Manager".

   ![Illustration](../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/06.png)

4. Select "**Arduino Nano**" as the board type.

   ![Illustration](../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/07.png)

5. Compile and upload.

> **Note:** At this point the computer is connected only to the Nano board; do not connect the Nano board to the servo driver board yet (i.e., do not connect it to the dexterous hand).

After a successful upload, connect the Nano board to the servo driver board with three jumper wires, and connect the servos to the servo driver board; refer to [the wiring for debugging with the MEGA328P Nano board](https://juxitech.feishu.cn/wiki/Wt46wtt26imdWkkQlxTcL87qnHd#share-HdS4dNgwyo2seVxRZ9PcZ1R3nuc).

The dexterous hand keeps running the "02 demo program" in a loop; the result is as follows:

![Illustration](../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/08.png)
