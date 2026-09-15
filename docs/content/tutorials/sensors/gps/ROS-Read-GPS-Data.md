---
title: "ROS: Reading GPS Data"
description: "In the terminal, enter,"
---

# ROS: Reading GPS Data

**This function reads GPS module data through the terminal and parses the GPS data to obtain latitude, longitude, and altitude data.**

#### 1. Reading GPS Data Through the Terminal

In the terminal, enter,

```
ros2 launch nmea_navsat_driver nmea_serial_driver.launch.py
```

![Image 1](../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/1.png)

Then let's check the topic data. In the terminal, enter,

```
ros2 topic list
```

![Image 2](../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/2.png)

Here is a description of the data of these GPS topics,

| Topic            | Type                       | Description                                |
| --------------- | -------------------------- | ----------------------------------- |
| /extend_fix     | gps_common/GPSFix          | The GPSFix message contains the GPS satellite status and positioning information |
| /fix            | sensor_msgs/NavSatFix      | GPS positioning information                         |
| /time_reference | sensor_msgs/TimeReferencd  | GPS time information                         |
| /vel            | geometry_msgs/TwistStamped | GPS speed information                       |

For the message types of each topic, refer to the official website URLs below,

[sensor_msgs/NavSatFix Documentation (ros.org)](http://docs.ros.org/en/api/sensor_msgs/html/msg/NavSatFix.html)

[sensor_msgs/TimeReference Documentation (ros.org)](http://docs.ros.org/en/api/sensor_msgs/html/msg/TimeReference.html)

[geometry_msgs/TwistStamped Documentation (ros.org)](http://docs.ros.org/en/api/geometry_msgs/html/msg/TwistStamped.html)

We can print these topic messages in the terminal, and what we get is the GPS data. Taking printing /fix as an example, enter in the terminal

```
ros2 topic echo /fix
```

The terminal will print the following data,

![Image 3](../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/3.png)

Here, latitude, longitude, and altitude represent the latitude, longitude, and altitude respectively.

#### 2. Reading the Latitude, Longitude, and Altitude of the GPS Data

Run in the terminal,

```
ros2 launch nmea_navsat_driver nmea_serial_driver.launch.py
```

In another terminal, run,

```
ros2 run nmea_navsat_driver read_lat_long.py 
```

![Image 4](../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/4.png)

The data printed in the terminal is the current latitude, longitude, and altitude of the GPS module. Let's look at the source code, read_lat_long.py

```python
#! /usr/bin/env python3
# -*- coding: utf-8 -*-
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import NavSatFix

class GPSSubscriber(Node):
    def __init__(self):
        super().__init__('GPS_subscriber')
        self.subscription = self.create_subscription(
            NavSatFix,
            '/fix',
            self.gps_callback,
            10)
        self.subscription

    def gps_callback(self, msg):
        self.get_logger().info(f"latitude:{msg.latitude:.6f}, longitude:{msg.longitude:.6f}, altitude:{msg.altitude:.6f}")

def main(args=None):
    rclpy.init(args=args)
    gps_subscriber = GPSSubscriber()
    rclpy.spin(gps_subscriber)
    gps_subscriber.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

The program subscribes to the data of the /fix topic, then performs parsing in the callback function, and finally prints to the terminal.

<RelatedProducts slugs="gps-beidou-module" />
