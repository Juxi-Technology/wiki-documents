---
title: "讀取GPS模組數據"
description: "然後我們查看下話題數據，終端輸入，"
---

# 讀取GPS模組數據

**該功能是通過終端讀取GPS模組數據以及解析GPS數據得到經緯度和海拔數據。**

#### 1、通過終端讀取GPS數據

終端輸入，

```
ros2 launch nmea_navsat_driver nmea_serial_driver.launch.py
```

![圖 1](../../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/1.png)

然後我們查看下話題數據，終端輸入，

```
ros2 topic list
```

![圖 2](../../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/2.png)

關於GPS這幾個話題的數據，這裏做個説明，

| 話題            | 類型                       | 説明                                |
| --------------- | -------------------------- | ----------------------------------- |
| /extend_fix     | gps_common/GPSFix          | GPSFix訊息包含GPS衞星狀態和定位資訊 |
| /fix            | sensor_msgs/NavSatFix      | GPS定位資訊                         |
| /time_reference | sensor_msgs/TimeReferencd  | GPS時間資訊                         |
| /vel            | geometry_msgs/TwistStamped | GPS的速度資訊                       |

各個話題訊息類型可以參考以官網網址，

[sensor_msgs/NavSatFix Documentation (ros.org)](http://docs.ros.org/en/api/sensor_msgs/html/msg/NavSatFix.html)

[sensor_msgs/TimeReference Documentation (ros.org)](http://docs.ros.org/en/api/sensor_msgs/html/msg/TimeReference.html)

[geometry_msgs/TwistStamped Documentation (ros.org)](http://docs.ros.org/en/api/geometry_msgs/html/msg/TwistStamped.html)

我們可以在在終端列印出這些話題訊息，得到的就是GPS數據，以列印/fix為例，終端輸入

```
ros2 topic echo /fix
```

終端會列印出以下數據，

![圖 3](../../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/3.png)

其中，latitude，longitude，altitude分別代表的是緯度、經度和海拔。

#### 2、讀取GPS數據的經緯度和海拔

終端執行，

```
ros2 launch nmea_navsat_driver nmea_serial_driver.launch.py
```

在另一個終端執行，

```
ros2 run nmea_navsat_driver read_lat_long.py 
```

![圖 4](../../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/4.png)

終端列印的數據就是當前GPS模組的經緯度和海拔，看看源碼，read_lat_long.py

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

程式訂閲了/fix話題的數據，然後在回調函數裏邊做了解析，最終列印到終端上。

<RelatedProducts slugs="gps-beidou-module" />
