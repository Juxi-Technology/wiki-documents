---
title: "ROS: GPS 데이터 읽기"
description: "ROS GPS 데이터 읽기 — nmea 드라이버를 실행하고 토픽으로 위도, 경도와 해발고도 데이터를 터미널에서 확인하는 방법."
---

# ROS: GPS 데이터 읽기

**이 기능은 터미널을 통해 GPS 모듈 데이터를 읽고 GPS 데이터를 분석하여 위도 경도와 해발고도 데이터를 얻는 것입니다.**

#### 1、터미널을 통한 GPS 데이터 읽기

터미널에 입력하고,

```
ros2 launch nmea_navsat_driver nmea_serial_driver.launch.py
```

![그림 1](../../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/1.png)

그런 다음 토픽 데이터를 확인합니다. 터미널에 입력하고,

```
ros2 topic list
```

![그림 2](../../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/2.png)

GPS의 이 몇 가지 토픽 데이터에 대해 여기서 설명합니다.

| 토픽            | 유형                       | 설명                                                 |
| --------------- | -------------------------- | ----------------------------------- |
| /extend_fix     | gps_common/GPSFix          | GPSFix 메시지는 GPS 위성 상태와 측위 정보를 포함합니다 |
| /fix            | sensor_msgs/NavSatFix      | GPS 측위 정보                                        |
| /time_reference | sensor_msgs/TimeReferencd  | GPS 시간 정보                                        |
| /vel            | geometry_msgs/TwistStamped | GPS 속도 정보                                        |

각 토픽의 메시지 유형은 아래 공식 웹사이트를 참조할 수 있습니다.

[sensor_msgs/NavSatFix Documentation (ros.org)](http://docs.ros.org/en/api/sensor_msgs/html/msg/NavSatFix.html)

[sensor_msgs/TimeReference Documentation (ros.org)](http://docs.ros.org/en/api/sensor_msgs/html/msg/TimeReference.html)

[geometry_msgs/TwistStamped Documentation (ros.org)](http://docs.ros.org/en/api/geometry_msgs/html/msg/TwistStamped.html)

이러한 토픽 메시지를 터미널에서 출력하면 그것이 GPS 데이터입니다. /fix 출력을 예로 들면, 터미널에 입력하면

```
ros2 topic echo /fix
```

터미널에는 다음 데이터가 출력됩니다.

![그림 3](../../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/3.png)

여기서 latitude, longitude, altitude는 각각 위도, 경도, 해발고도를 나타냅니다.

#### 2、GPS 데이터의 위도 경도와 해발고도 읽기

터미널에서 실행하고,

```
ros2 launch nmea_navsat_driver nmea_serial_driver.launch.py
```

다른 터미널에서 실행하고,

```
ros2 run nmea_navsat_driver read_lat_long.py 
```

![그림 4](../../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/4.png)

터미널에 출력되는 데이터가 현재 GPS 모듈의 위도 경도와 해발고도입니다. 소스 코드 read_lat_long.py를 살펴보겠습니다

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

프로그램은 /fix 토픽의 데이터를 구독한 후, 콜백 함수에서 분석을 수행하고, 최종적으로 터미널에 출력합니다.

<RelatedProducts slugs="gps-beidou-module" />
