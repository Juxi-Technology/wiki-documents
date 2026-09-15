---
title: "GPS軌跡の描画"
description: "GPSの情報を直接可視化することは不可能です。座標系を変換する必要があり、GPS軌跡を緯度経度WGS-84座標から実世界のxyz座標系に変換します。実世界のxyz座標があれば、rviz2を通じて経路を表示し、GPSの軌…"
---

# GPS軌跡の描画

**この機能はリアルタイムのGPSデータ情報を描画し、rviz2で表示します。**

#### 1、実現原理

GPSの情報を直接可視化することは不可能です。座標系を変換する必要があり、GPS軌跡を緯度経度WGS-84座標から実世界のxyz座標系に変換します。実世界のxyz座標があれば、rviz2を通じて経路を表示し、GPSの軌跡を模擬することができます。軌跡とは、各gps座標と最初の座標との相対位置を累積し、それを足し合わせることで得られるものです。

#### 2、起動手順

ターミナルに入力し、

```
ros2 launch nmea_navsat_driver gps_path_to_rviz.launch.py
```

![図 1](../../../../../public/images/tutorials/sensors/gps/ROS-Draw-GPS-Track/1.png)

rviz2に表示される画面では、緑色の線が徐々に伸びていくのが確認できます。以下の図のとおりです。

![図 2](../../../../../public/images/tutorials/sensors/gps/ROS-Draw-GPS-Track/2.png)

#### 3、launchコードの解析

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

三つのノードが起動され、それぞれnmea_serial_driver_nodeがGPSデータを読み取り、gps_path_nodeがGPSデータ軌跡を描画し、rviz2ノードが表示します。

このうち、gps_path_nodeというノードのソースコードgps_path.cppはnmea_navsat_driver/srcの下にあります。見てみるとよいでしょう。

<RelatedProducts slugs="gps-beidou-module" />
