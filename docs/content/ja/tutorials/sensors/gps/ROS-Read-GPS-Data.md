---
title: "ROS:GPS データの読み取り"
description: "ROS で GPS モジュールのデータを読み取るチュートリアル。NMEA ドライバを起動し、緯度経度や標高などのトピックを確認する手順を解説します。"
---

# ROS:GPS データの読み取り

**この機能は、ターミナルを通じてGPSモジュールデータを読み取り、GPSデータを解析して緯度経度と標高データを得るものです。**

#### 1、ターミナルによるGPSデータの読み取り

ターミナルに入力し、

```
ros2 launch nmea_navsat_driver nmea_serial_driver.launch.py
```

![図 1](../../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/1.png)

次にトピックデータを確認します。ターミナルに入力し、

```
ros2 topic list
```

![図 2](../../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/2.png)

GPSのこれらのトピックのデータについて、ここで説明します。

| トピック       | タイプ                     | 説明                                                |
| --------------- | -------------------------- | ----------------------------------- |
| /extend_fix     | gps_common/GPSFix          | GPSFixメッセージはGPS衛星の状態と測位情報を含みます |
| /fix            | sensor_msgs/NavSatFix      | GPS測位情報                                         |
| /time_reference | sensor_msgs/TimeReferencd  | GPS時刻情報                                         |
| /vel            | geometry_msgs/TwistStamped | GPSの速度情報                                       |

各トピックのメッセージタイプは以下の公式サイトを参照できます。

[sensor_msgs/NavSatFix Documentation (ros.org)](http://docs.ros.org/en/api/sensor_msgs/html/msg/NavSatFix.html)

[sensor_msgs/TimeReference Documentation (ros.org)](http://docs.ros.org/en/api/sensor_msgs/html/msg/TimeReference.html)

[geometry_msgs/TwistStamped Documentation (ros.org)](http://docs.ros.org/en/api/geometry_msgs/html/msg/TwistStamped.html)

これらのトピックメッセージをターミナルで出力すると、それがGPSデータになります。/fixを出力する場合を例にすると、ターミナルに入力し

```
ros2 topic echo /fix
```

ターミナルには以下のデータが出力されます。

![図 3](../../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/3.png)

このうち、latitude、longitude、altitudeはそれぞれ緯度、経度、標高を表します。

#### 2、GPSデータの緯度経度と標高の読み取り

ターミナルで実行し、

```
ros2 launch nmea_navsat_driver nmea_serial_driver.launch.py
```

別のターミナルで実行し、

```
ros2 run nmea_navsat_driver read_lat_long.py 
```

![図 4](../../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/4.png)

ターミナルに出力されるデータが現在のGPSモジュールの緯度経度と標高です。ソースコードread_lat_long.pyを見てみましょう

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

プログラムは/fixトピックのデータを購読し、その後コールバック関数で解析を行い、最終的にターミナルに出力します。

<RelatedProducts slugs="gps-beidou-module" />
