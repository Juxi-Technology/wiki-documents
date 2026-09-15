---
title: "ROS: dibujar trayectoria GPS"
description: "No es posible visualizar directamente la información del GPS; necesitamos convertir el sistema de coordenadas…"
---

# ROS: dibujar trayectoria GPS

**Esta función traza la información de datos GPS en tiempo real y la muestra en rviz2.**

#### 1、Principio de implementación

No es posible visualizar directamente la información del GPS; necesitamos convertir el sistema de coordenadas, transformando la trayectoria GPS desde las coordenadas de latitud y longitud WGS-84 al sistema de coordenadas xyz del mundo real. Con las coordenadas xyz en el mundo real, podemos mostrar la ruta mediante rviz2 y simular la trayectoria del GPS. La trayectoria consiste en acumular la posición de cada coordenada gps respecto a la primera coordenada; sumándolas se obtiene la trayectoria.

#### 2、Pasos de inicio

Introduzca en la terminal,

```
ros2 launch nmea_navsat_driver gps_path_to_rviz.launch.py
```

![Imagen 1](../../../../../public/images/tutorials/sensors/gps/ROS-Draw-GPS-Track/1.png)

En la interfaz que muestra rviz2 podemos ver que la línea verde se va extendiendo poco a poco de forma continua, como se muestra en la siguiente figura,

![Imagen 2](../../../../../public/images/tutorials/sensors/gps/ROS-Draw-GPS-Track/2.png)

#### 3、Análisis del código launch

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

Se inician tres nodos: nmea_serial_driver_node, que lee los datos GPS; gps_path_node, que traza la trayectoria de los datos GPS; y el nodo rviz2.

El código fuente gps_path.cpp de este nodo gps_path_node se encuentra en nmea_navsat_driver/src; puede echarle un vistazo.

<RelatedProducts slugs="gps-beidou-module" />
