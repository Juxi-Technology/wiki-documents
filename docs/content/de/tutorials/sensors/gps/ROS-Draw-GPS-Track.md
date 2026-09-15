---
title: "ROS: GPS-Spur zeichnen"
description: "ROS: GPS-Spur in Echtzeit zeichnen und mit RViz2 anzeigen, mit Implementierungsprinzip, Startschritten und Analyse des Launch-Codes."
---

# ROS: GPS-Spur zeichnen

**Diese Funktion zeichnet die Echtzeit-GPS-Dateninformationen und zeigt sie in rviz2 an.**

#### 1. Implementierungsprinzip

Eine direkte Visualisierung der GPS-Informationen ist nicht möglich; wir müssen das Koordinatensystem umrechnen und die GPS-Spur vom WGS-84-Koordinatensystem (Längen- und Breitengrad) in das reale xyz-Koordinatensystem umwandeln. Mit den realen xyz-Koordinaten können wir den Pfad über rviz2 anzeigen und so die GPS-Spur simulieren. Die Spur ergibt sich, indem die Position jeder gps-Koordinate relativ zur ersten Koordinate kumuliert und dann aufsummiert wird.

#### 2. Startschritte

Geben Sie im Terminal ein,

```
ros2 launch nmea_navsat_driver gps_path_to_rviz.launch.py
```

![Abb. 1](../../../../../public/images/tutorials/sensors/gps/ROS-Draw-GPS-Track/1.png)

In der von rviz2 angezeigten Oberfläche können wir sehen, dass sich die grüne Linie langsam weiter ausdehnt, wie in der folgenden Abbildung gezeigt,

![Abb. 2](../../../../../public/images/tutorials/sensors/gps/ROS-Draw-GPS-Track/2.png)

#### 3. Analyse des launch-Codes

```python
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node
from ament_index_python.packages import get_package_share_directory
import os

def generate_launch_description():
    port_arg = DeclareLaunchArgument('port', default_value='/dev/myserial')
    baud_arg = DeclareLaunchArgument('baud', default_value='9600')
    frame_id_arg = DeclareLaunchArgument('frame_id', default_value='gps')
    time_ref_source_arg = DeclareLaunchArgument('time_ref_source', default_value='gps')
    useRMC_arg = DeclareLaunchArgument('useRMC', default_value='False')

    port = LaunchConfiguration('port')
    baud = LaunchConfiguration('baud')
    frame_id = LaunchConfiguration('frame_id')
    time_ref_source = LaunchConfiguration('time_ref_source')
    useRMC = LaunchConfiguration('useRMC')

    nmea_serial_driver_node = Node(
        package='nmea_navsat_driver',
        executable='nmea_serial_driver',
        name='nmea_serial_driver_node',
        output='screen',
        parameters=[{
            'port': port,
            'baud': baud,
            'frame_id': frame_id,
            'time_ref_source': time_ref_source,
            'useRMC': useRMC
        }]
    )

    gps_path_node = Node(
        package='nmea_navsat_driver',
        executable='Draw_GPS_Path',
        name='gps_path_node',
        output='screen'
    )

    rviz_config = os.path.join(
        get_package_share_directory('nmea_navsat_driver'),
        'rviz',
        'gps_path.rviz'
    )

    rviz_node = Node(
        package='rviz2',
        executable='rviz2',
        name='rviz2',
        arguments=['-d', rviz_config]
    )

    return LaunchDescription([
        port_arg,
        baud_arg,
        frame_id_arg,
        time_ref_source_arg,
        useRMC_arg,
        nmea_serial_driver_node,
        gps_path_node,
        rviz_node
    ])
```

Es werden drei Knoten gestartet, nämlich nmea_serial_driver_node zum Auslesen der GPS-Daten, gps_path_node zum Zeichnen der GPS-Datenspur und der rviz2-Knoten.

Der Quellcode gps_path.cpp dieses Knotens gps_path_node befindet sich unter nmea_navsat_driver/src und kann dort eingesehen werden.

<RelatedProducts slugs="gps-beidou-module" />
