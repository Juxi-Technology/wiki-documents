---
title: "ROS : lecture des données GPS"
description: "Lire les données du module GPS BeiDou sous ROS2 : lancer le pilote NMEA, consulter les topics et récupérer latitude, longitude et altitude."
---

# ROS : lecture des données GPS

**Cette fonction lit via le terminal les données du module GPS et analyse les données GPS pour obtenir les données de latitude, de longitude et d'altitude.**

#### 1. Lecture des données GPS via le terminal

Saisissez dans le terminal,

```
ros2 launch nmea_navsat_driver nmea_serial_driver.launch.py
```

![Image 1](../../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/1.png)

Nous allons ensuite consulter les données des topics ; saisissez dans le terminal,

```
ros2 topic list
```

![Image 2](../../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/2.png)

Concernant les données de ces topics GPS, voici une explication,

| Topic            | Type                       | Description                                |
| --------------- | -------------------------- | ----------------------------------- |
| /extend_fix     | gps_common/GPSFix          | Le message GPSFix contient l'état des satellites GPS et les informations de position |
| /fix            | sensor_msgs/NavSatFix      | Informations de position GPS                         |
| /time_reference | sensor_msgs/TimeReferencd  | Informations de temps GPS                         |
| /vel            | geometry_msgs/TwistStamped | Informations de vitesse GPS                       |

Pour les types de messages de chaque topic, vous pouvez consulter le site officiel ci-dessous,

[Documentation sensor_msgs/NavSatFix (ros.org)](http://docs.ros.org/en/api/sensor_msgs/html/msg/NavSatFix.html)

[Documentation sensor_msgs/TimeReference (ros.org)](http://docs.ros.org/en/api/sensor_msgs/html/msg/TimeReference.html)

[Documentation geometry_msgs/TwistStamped (ros.org)](http://docs.ros.org/en/api/geometry_msgs/html/msg/TwistStamped.html)

Nous pouvons imprimer ces messages de topics dans le terminal ; ce que nous obtenons correspond aux données GPS. Prenons l'impression de /fix comme exemple, saisissez dans le terminal

```
ros2 topic echo /fix
```

Le terminal imprime les données suivantes,

![Image 3](../../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/3.png)

Parmi elles, latitude, longitude et altitude représentent respectivement la latitude, la longitude et l'altitude.

#### 2. Lecture de la latitude, de la longitude et de l'altitude des données GPS

Exécutez dans le terminal,

```
ros2 launch nmea_navsat_driver nmea_serial_driver.launch.py
```

Exécutez dans un autre terminal,

```
ros2 run nmea_navsat_driver read_lat_long.py 
```

![Image 4](../../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/4.png)

Les données imprimées dans le terminal sont la latitude, la longitude et l'altitude actuelles du module GPS. Regardons le code source, read_lat_long.py

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

Le programme s'abonne aux données du topic /fix, effectue l'analyse dans la fonction de rappel, puis imprime le résultat dans le terminal.

<RelatedProducts slugs="gps-beidou-module" />
