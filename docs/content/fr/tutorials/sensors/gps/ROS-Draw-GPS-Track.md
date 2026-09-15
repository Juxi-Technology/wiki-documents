---
title: "Tracé de la trajectoire GPS"
description: "La visualisation directe des informations GPS est impossible ; nous devons convertir le système de coordonnée…"
---

# Tracé de la trajectoire GPS

**Cette fonction trace les informations de données GPS en temps réel et les affiche dans rviz2.**

#### 1. Principe de mise en œuvre

La visualisation directe des informations GPS est impossible ; nous devons convertir le système de coordonnées et transformer la trajectoire GPS du système de coordonnées WGS-84 (latitude/longitude) vers le système de coordonnées xyz du monde réel. Avec les coordonnées xyz dans le monde réel, nous pouvons afficher le chemin via rviz2 et simuler la trajectoire GPS. La trajectoire consiste à cumuler la position de chaque coordonnée gps par rapport à la première coordonnée, puis à additionner pour obtenir la trajectoire.

#### 2. Étapes de démarrage

Saisissez dans le terminal,

```
ros2 launch nmea_navsat_driver gps_path_to_rviz.launch.py
```

![Image 1](../../../../../public/images/tutorials/sensors/gps/ROS-Draw-GPS-Track/1.png)

Dans l'interface affichée par rviz2, nous pouvons voir que la ligne verte s'étend lentement en continu, comme le montre l'illustration ci-dessous,

![Image 2](../../../../../public/images/tutorials/sensors/gps/ROS-Draw-GPS-Track/2.png)

#### 3. Analyse du code launch

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

Trois nœuds ont été démarrés, à savoir nmea_serial_driver_node qui lit les données GPS, gps_path_node qui trace la trajectoire des données GPS et le nœud rviz2.

Parmi eux, le code source gps_path.cpp du nœud gps_path_node se trouve sous nmea_navsat_driver/src ; vous pouvez aller le consulter.

<RelatedProducts slugs="gps-beidou-module" />
