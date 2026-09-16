---
title: "PC 通信"
description: "IMU 姿态传感器 PC 通信教程：通过 Type-C 连接电脑，使用串口助手查看 IMU 输出的原始姿态数据。"
---

# PC 通信

**注意：如果无法识别串口，请安装ch34x驱动**

1. IMU姿态传感器通过type-c数据线连接电脑端

![image – 1](../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/pc-communication/1.png)

2. 查看串口数据

将串口助手配置如下图所示，

![image – 2](../../../../../../public/images/tutorials/sensors/imu/multi-board-examples/pc-communication/2.png)

串口打印的是没有经过处理的数据，具体数据含义可参考 "**通信协议**" 文档。

IMU模块-串口与I2C通信协议.xlsx

