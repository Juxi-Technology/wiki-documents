---
title: "Arduino: Location Reading"
description: "Arduino GPS raw data reading tutorial: print the unprocessed output from the GPS/BeiDou module on the Arduino UNO serial monitor at 9600 baud."
---

# Arduino: Location Reading

**1. Learning Objectives**

In this lesson, we will mainly learn to use Arduino and a GPS module to implement the position information reading function.

**2. Preparation**

The GPS module uses UART and USB communication. Here, the Arduino UNO's UART port is used to read information. Connect the module's TX to the Arduino UNO board's D0 pin. Connect VCC and GND to 5V and GND respectively.

![Image 1](../../../../public/images/tutorials/sensors/gps/Arduino-Location-Reading/1.png)

**3.** **Program**

Initialize the serial port.

![Image 2](../../../../public/images/tutorials/sensors/gps/Arduino-Location-Reading/2.jpg) 

Print out the received data.


**4. Compile and Download the Program**

4.1 We need to open the file with the Arduino IDE software, then click the "√" in the menu bar to compile the program, and wait for the text "Compilation successful" to appear in the lower-left corner.

 ![Image 3](../../../../public/images/tutorials/sensors/gps/Arduino-Location-Reading/3.jpg)

4.2 In the Arduino IDE menu bar, we need to select [Tools] --- [Port] --- and select the port number just shown in Device Manager, as shown in the figure below.

![Image 4](../../../../public/images/tutorials/sensors/gps/Arduino-Location-Reading/4.jpg) 

4.3 After the selection is complete, click the "→" in the menu bar to upload the code to the UNO board.  When the text "Upload complete" appears in the lower-left corner, it means the program has been successfully uploaded to the UNO board, as shown in the figure below.

![Image 5](../../../../public/images/tutorials/sensors/gps/Arduino-Location-Reading/5.jpg) 

 

**5. Experimental Results**

After the module is powered on, it takes about 32s to start up. After that, the serial print status LED on the module will keep blinking, and data can be received normally.

After the program is downloaded and running, open the serial monitor window, open the serial software, set the baud rate to 9600, and the serial port will print the current position information in a loop. This information is raw, unprocessed data; you can refer to  CASIC多模卫星导航接收机协议规范.pdf  to view the specific content of each message.

![Image 6](../../../../public/images/tutorials/sensors/gps/Arduino-Location-Reading/6.jpg) 

Note: the module antenna needs to be outdoors; otherwise, the GPS signal may not be found.

<RelatedProducts slugs="gps-beidou-module" />
