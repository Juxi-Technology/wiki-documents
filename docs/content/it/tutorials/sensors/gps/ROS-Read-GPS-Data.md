---
title: "ROS: lettura dati GPS"
description: "Digitare nel terminale,"
---

# ROS: lettura dati GPS

**Questa funzione legge i dati del modulo GPS tramite il terminale e analizza i dati GPS per ottenere i dati di latitudine, longitudine e altitudine.**

#### 1、Lettura dei dati GPS tramite il terminale

Digitare nel terminale,

```
ros2 launch nmea_navsat_driver nmea_serial_driver.launch.py
```

![Immagine 1](../../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/1.png)

Ora esaminiamo i dati dei topic; digitare nel terminale,

```
ros2 topic list
```

![Immagine 2](../../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/2.png)

Per quanto riguarda i dati di questi topic del GPS, ecco una spiegazione:

| Topic            | Tipo                       | Descrizione                                |
| --------------- | -------------------------- | ----------------------------------- |
| /extend_fix     | gps_common/GPSFix          | Il messaggio GPSFix contiene lo stato dei satelliti GPS e le informazioni di posizionamento |
| /fix            | sensor_msgs/NavSatFix      | Informazioni di posizionamento GPS                         |
| /time_reference | sensor_msgs/TimeReferencd  | Informazioni sul tempo GPS                         |
| /vel            | geometry_msgs/TwistStamped | Informazioni sulla velocità del GPS                       |

Per i tipi di messaggio di ciascun topic è possibile fare riferimento ai seguenti siti ufficiali:

[sensor_msgs/NavSatFix Documentation (ros.org)](http://docs.ros.org/en/api/sensor_msgs/html/msg/NavSatFix.html)

[sensor_msgs/TimeReference Documentation (ros.org)](http://docs.ros.org/en/api/sensor_msgs/html/msg/TimeReference.html)

[geometry_msgs/TwistStamped Documentation (ros.org)](http://docs.ros.org/en/api/geometry_msgs/html/msg/TwistStamped.html)

Possiamo stampare questi messaggi dei topic nel terminale e ciò che si ottiene sono i dati GPS. Prendendo come esempio la stampa di /fix, digitare nel terminale

```
ros2 topic echo /fix
```

Il terminale stamperà i seguenti dati,

![Immagine 3](../../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/3.png)

Tra questi, latitude, longitude e altitude rappresentano rispettivamente la latitudine, la longitudine e l'altitudine.

#### 2、Lettura della latitudine, longitudine e altitudine dei dati GPS

Eseguire nel terminale,

```
ros2 launch nmea_navsat_driver nmea_serial_driver.launch.py
```

Eseguire in un altro terminale,

```
ros2 run nmea_navsat_driver read_lat_long.py 
```

![Immagine 4](../../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/4.png)

I dati stampati nel terminale sono la latitudine, la longitudine e l'altitudine attuali del modulo GPS. Vediamo il codice sorgente, read_lat_long.py

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

Il programma si iscrive ai dati del topic /fix, quindi esegue l'analisi nella funzione di callback e infine li stampa nel terminale.

<RelatedProducts slugs="gps-beidou-module" />
