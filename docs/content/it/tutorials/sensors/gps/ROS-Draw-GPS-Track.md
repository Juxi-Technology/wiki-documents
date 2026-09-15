---
title: "ROS: tracciare il percorso GPS"
description: "Tracciare il percorso GPS con ROS: convertire latitudine e longitudine nel sistema xyz e visualizzare la traiettoria del robot in tempo reale su RViz2."
---

# ROS: tracciare il percorso GPS

**Questa funzione traccia le informazioni dei dati GPS in tempo reale e le visualizza in rviz2.**

#### 1、Principio di implementazione

Non è possibile visualizzare direttamente le informazioni del GPS; è necessario convertire il sistema di coordinate, trasformando la traiettoria GPS dalle coordinate di latitudine e longitudine WGS-84 al sistema di coordinate xyz del mondo reale. Una volta ottenute le coordinate xyz nel mondo reale, possiamo visualizzare il percorso tramite rviz2 e simulare la traiettoria del GPS. La traiettoria consiste nell'accumulare la posizione di ciascuna coordinata gps rispetto alla prima coordinata; sommandole si ottiene la traiettoria.

#### 2、Passaggi di avvio

Digitare nel terminale,

```
ros2 launch nmea_navsat_driver gps_path_to_rviz.launch.py
```

![Immagine 1](../../../../../public/images/tutorials/sensors/gps/ROS-Draw-GPS-Track/1.png)

Nell'interfaccia mostrata da rviz2 possiamo vedere che la linea verde si estende lentamente e in modo continuo, come mostrato nella figura seguente,

![Immagine 2](../../../../../public/images/tutorials/sensors/gps/ROS-Draw-GPS-Track/2.png)

#### 3、Analisi del codice launch

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

Sono stati avviati tre nodi: nmea_serial_driver_node, che legge i dati GPS; gps_path_node, che traccia la traiettoria dei dati GPS; e il nodo rviz2.

Il codice sorgente gps_path.cpp di questo nodo gps_path_node si trova in nmea_navsat_driver/src; vale la pena dargli un'occhiata.

<RelatedProducts slugs="gps-beidou-module" />
