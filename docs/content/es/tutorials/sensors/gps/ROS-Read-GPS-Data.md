---
title: "Lectura de los datos del módulo GPS"
description: "Introduzca en la terminal,"
---

# Lectura de los datos del módulo GPS

**Esta función consiste en leer los datos del módulo GPS a través del terminal y analizar los datos GPS para obtener los datos de latitud, longitud y altitud.**

#### 1、Lectura de datos GPS a través del terminal

Introduzca en la terminal,

```
ros2 launch nmea_navsat_driver nmea_serial_driver.launch.py
```

![Imagen 1](../../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/1.png)

A continuación, consultemos los datos de los topics; introduzca en la terminal,

```
ros2 topic list
```

![Imagen 2](../../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/2.png)

En cuanto a los datos de estos topics de GPS, aquí se ofrece una explicación:

| Topic            | Tipo                       | Descripción                                |
| --------------- | -------------------------- | ----------------------------------- |
| /extend_fix     | gps_common/GPSFix          | El mensaje GPSFix contiene el estado de los satélites GPS y la información de posicionamiento |
| /fix            | sensor_msgs/NavSatFix      | Información de posicionamiento GPS                         |
| /time_reference | sensor_msgs/TimeReferencd  | Información de tiempo GPS                         |
| /vel            | geometry_msgs/TwistStamped | Información de velocidad del GPS                       |

Para los tipos de mensaje de cada topic, puede consultar los siguientes sitios web oficiales:

[sensor_msgs/NavSatFix Documentation (ros.org)](http://docs.ros.org/en/api/sensor_msgs/html/msg/NavSatFix.html)

[sensor_msgs/TimeReference Documentation (ros.org)](http://docs.ros.org/en/api/sensor_msgs/html/msg/TimeReference.html)

[geometry_msgs/TwistStamped Documentation (ros.org)](http://docs.ros.org/en/api/geometry_msgs/html/msg/TwistStamped.html)

Podemos imprimir estos mensajes de topic en la terminal y lo que se obtiene son los datos GPS. Tomando como ejemplo la impresión de /fix, introduzca en la terminal

```
ros2 topic echo /fix
```

La terminal imprimirá los siguientes datos,

![Imagen 3](../../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/3.png)

Entre ellos, latitude, longitude y altitude representan respectivamente la latitud, la longitud y la altitud.

#### 2、Lectura de la latitud, longitud y altitud de los datos GPS

Ejecute en la terminal,

```
ros2 launch nmea_navsat_driver nmea_serial_driver.launch.py
```

Ejecute en otra terminal,

```
ros2 run nmea_navsat_driver read_lat_long.py 
```

![Imagen 4](../../../../../public/images/tutorials/sensors/gps/ROS-Read-GPS-Data/4.png)

Los datos impresos en la terminal son la latitud, longitud y altitud actuales del módulo GPS. Veamos el código fuente, read_lat_long.py

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

El programa se suscribe a los datos del topic /fix, luego realiza el análisis en la función de callback y, finalmente, lo imprime en la terminal.

<RelatedProducts slugs="gps-beidou-module" />
