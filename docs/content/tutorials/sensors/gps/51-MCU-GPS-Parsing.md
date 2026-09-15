---
title: "51 MCU: GPS Parsing"
description: "51 microcontroller GPS parsing tutorial: use an STC89C52RC board and the GPS/BeiDou module to read and print position information over UART."
---

# 51 MCU: GPS Parsing

**1. Learning Objectives**

In this lesson, we will mainly learn to use an STC89C52RC 51 microcontroller and a GPS module to implement the position information parsing function.

**2. Preparation**

The GPS module uses UART and USB communication. Here, the C51's UART port is used to read information. Connect the module's TX to the 51 board's P3.0 pin. Connect VCC and GND to 5V and GND respectively.

![Image 1](../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/1.png)

**3.** **Program**

Initialize the serial port and the data array

![Image 2](../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/2.jpg) 

Read and parse the received data.

![Image 3](../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/3.jpg) 

Print the received data via the serial port.

![Image 4](../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/4.jpg) 

**4****. Experimental Results**

After the module is powered on, it takes about 32s to start up. After that, the serial print status LED on the module will keep blinking, and data can be received normally.

After the program is downloaded and running, open the serial software, set the baud rate to 9600, and the serial port will print the current position information in a loop.

![Image 5](../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/5.jpg) 

Note: the module antenna needs to be outdoors; otherwise, the GPS signal may not be found.

<RelatedProducts slugs="gps-beidou-module" />
