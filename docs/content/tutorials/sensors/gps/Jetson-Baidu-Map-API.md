---
title: "Jetson: Baidu Map API"
description: "1. Registration Method"
---

# Jetson: Baidu Map API

**1.** **Registration Method**

Go to the Baidu Maps Open Platform https://lbsyun.baidu.com/

Scroll to the bottom of the page

Click Register Now

![Image 1](../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/18.jpg) 

It is recommended to choose to become an individual developer (because it can be used on the day you apply)

Just complete it step by step following the prompts

![Image 2](../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/19.jpg) 

**2. Obtain the ak**

We use the Regular IP Location in the web service; the documentation can be found at the link below.

https://lbsyun.baidu.com/index.php?title=webapi/ip-api

Click Console, select My Applications, and select Create Application.

![Image 3](../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/20.jpg) 

Write any application name; for the application type, select Server-side, enable the service, and enter 0.0.0.0/0 in the whitelist.

![Image 4](../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/21.jpg) 

Click Submit to generate an application.

![Image 5](../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/22.jpg) 

Copy the ak value of our application

![Image 6](../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/23.jpg) 

Paste it into the program and save, and then you can read the position information through Baidu Maps.

![Image 7](../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/24.jpg)

<RelatedProducts slugs="gps-beidou-module" />
