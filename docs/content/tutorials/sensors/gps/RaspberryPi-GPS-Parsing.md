---
title: "GPS Module Position Information Parsing"
description: "In this lesson, we will mainly learn to use a Raspberry Pi and a GPS module to read and parse position inform…"
---

# GPS Module Position Information Parsing

**1. Learning Objectives**

In this lesson, we will mainly learn to use a Raspberry Pi and a GPS module to read and parse position information.

**2. Preparation**

The GPS module uses UART communication or USB communication; here, USB communication is taken as an example.

![Image 1](../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/1.png)

Use a type-c cable to connect the Raspberry Pi and the GPS module, run the command ls /dev | grep 'ttyUSB' , and you can see that the voice module is recognized as USB0

![Image 2](../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/2.jpg) 

**3. Program**

For the program in this lesson, please refer to: GPS.py

Initialize USB:

![Image 3](../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/3.jpg) 

Position information acquisition and parsing function. In the figure below, the position information starting with GNGGA is filtered out from the position information, and then the data is parsed and stored in various global variables.

![Image 4](../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/4.jpg) 

![Image 5](../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/5.jpg) 

In the same way, the GNVTG heading information is obtained and parsed.

![Image 6](../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/6.jpg) 

The parsed data is printed in a loop

![Image 7](../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/7.jpg) 

**4. Run the Program**

Enter sudo python2 GPS.py in the terminal to run the program.

**5.** **Experimental Results**

After the module is powered on, it takes about 32s to start up. After that, the serial print status LED on the module will keep blinking, and data can be received normally.

After the program runs, it starts to initialize USB. If initialization succeeds, it displays "GPS Serial Opened! Baudrate=9600"; otherwise it displays "GPS Serial Open Failed!". If there is an error, check the wiring or the USB port. After that, it prints the position and heading information in a loop.

![Image 8](../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/8.jpg) 

Press Ctrl+C to exit information reading.

Note: the module antenna needs to be outdoors; otherwise, the GPS signal may not be found. When no signal is found, it prints "GPS no found".

<RelatedProducts slugs="gps-beidou-module" />
