---
title: "Auslesen der GPS-Moduldaten"
description: "Geben Sie im Terminal ein,"
---

# Auslesen der GPS-Moduldaten

**Diese Funktion liest über das Terminal die GPS-Moduldaten aus und analysiert die GPS-Daten, um Längen- und Breitengrad sowie Höhendaten zu erhalten.**

#### 1. Auslesen der GPS-Daten über das Terminal

Geben Sie im Terminal ein,

```
ros2 launch nmea_navsat_driver nmea_serial_driver.launch.py
```

![Abb. 1](../../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/1.png)

Sehen wir uns dann die Topic-Daten an; geben Sie im Terminal ein,

```
ros2 topic list
```

![Abb. 2](../../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/2.png)

Zu den Daten dieser GPS-Topics hier eine Erläuterung,

| Topic            | Typ                       | Beschreibung                                |
| --------------- | -------------------------- | ----------------------------------- |
| /extend_fix     | gps_common/GPSFix          | Die GPSFix-Nachricht enthält den Status der GPS-Satelliten und die Positionsinformationen |
| /fix            | sensor_msgs/NavSatFix      | GPS-Positionsinformationen                         |
| /time_reference | sensor_msgs/TimeReferencd  | GPS-Zeitinformationen                         |
| /vel            | geometry_msgs/TwistStamped | Geschwindigkeitsinformationen des GPS                       |

Für die Nachrichtentypen der einzelnen Topics können Sie die folgende offizielle Website konsultieren,

[sensor_msgs/NavSatFix-Dokumentation (ros.org)](http://docs.ros.org/en/api/sensor_msgs/html/msg/NavSatFix.html)

[sensor_msgs/TimeReference-Dokumentation (ros.org)](http://docs.ros.org/en/api/sensor_msgs/html/msg/TimeReference.html)

[geometry_msgs/TwistStamped-Dokumentation (ros.org)](http://docs.ros.org/en/api/geometry_msgs/html/msg/TwistStamped.html)

Wir können diese Topic-Nachrichten im Terminal ausgeben; was wir erhalten, sind die GPS-Daten. Nehmen wir die Ausgabe von /fix als Beispiel, geben Sie im Terminal ein

```
ros2 topic echo /fix
```

Das Terminal gibt die folgenden Daten aus,

![Abb. 3](../../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/3.png)

Dabei stehen latitude, longitude und altitude jeweils für Breitengrad, Längengrad und Höhe.

#### 2. Auslesen von Längengrad, Breitengrad und Höhe aus den GPS-Daten

Führen Sie im Terminal aus,

```
ros2 launch nmea_navsat_driver nmea_serial_driver.launch.py
```

Führen Sie in einem anderen Terminal aus,

```
ros2 run nmea_navsat_driver read_lat_long.py 
```

![Abb. 4](../../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/4.png)

Die im Terminal ausgegebenen Daten sind der aktuelle Längen- und Breitengrad sowie die Höhe des GPS-Moduls. Sehen wir uns den Quellcode an, read_lat_long.py

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

Das Programm abonniert die Daten des /fix-Topics, führt in der Callback-Funktion eine Analyse durch und gibt das Ergebnis schließlich im Terminal aus.

<RelatedProducts slugs="gps-beidou-module" />
