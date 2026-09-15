---
title: "Desenhar a trajetória de GPS"
description: "Não é possível visualizar diretamente as informações de GPS; precisamos converter o sistema de coordenadas, c…"
---

# Desenhar a trajetória de GPS

**Esta função desenha informações de dados de GPS em tempo real e as exibe no rviz2.**

#### 1. Princípio de implementação

Não é possível visualizar diretamente as informações de GPS; precisamos converter o sistema de coordenadas, convertendo a trajetória de GPS das coordenadas de latitude e longitude WGS-84 para o sistema de coordenadas xyz do mundo real. Com as coordenadas xyz no mundo real, podemos exibir o caminho através do rviz2, simulando a trajetória do GPS. A trajetória é o acúmulo da posição de cada coordenada de gps em relação à primeira coordenada; somando-se, obtém-se a trajetória.

#### 2. Etapas de inicialização

No terminal, digite,

```
ros2 launch nmea_navsat_driver gps_path_to_rviz.launch.py
```

![Imagem 1](../../../../../public/images/tutorials/sensors/gps/ROS-Draw-GPS-Track/1.png)

Na interface exibida no rviz2, podemos ver que a linha verde se estende lenta e continuamente, como mostra a figura abaixo,

![Imagem 2](../../../../../public/images/tutorials/sensors/gps/ROS-Draw-GPS-Track/2.png)

#### 3. Análise do código de launch

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

Foram iniciados três nós: nmea_serial_driver_node, que lê os dados de GPS, gps_path_node, que desenha a trajetória dos dados de GPS, e o nó rviz2.

Além disso, o código-fonte gps_path.cpp do nó gps_path_node está em nmea_navsat_driver/src, e pode ser consultado.

<RelatedProducts slugs="gps-beidou-module" />
