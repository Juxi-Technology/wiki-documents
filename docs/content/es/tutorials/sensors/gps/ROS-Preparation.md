---
title: "ROS: preparación"
description: "Preparación del entorno ROS2 para el módulo GPS/BeiDou: compila los paquetes del espacio de trabajo y vincula el puerto serie del módulo."
---

# ROS: preparación

#### 1、Compilación del módulo GPS

（1）Una vez creado el espacio de trabajo, copie el contenido de la carpeta gps_src en el directorio src del espacio de trabajo y, a continuación, compile con colcon build; si no aparecen errores, la compilación se considera correcta;

Ejecute en el directorio ~/gps_ros2

```
colcon build
```

Ejecute en el directorio ~/gps_ros2 

```
source install/setup.bash
```

（2）Descripción del contenido de los paquetes:

- nmea_navsat_driver: funciones como el arranque del módulo GPS, la lectura de los datos del módulo GPS y el trazado de los datos GPS;
- nmea_msgs: almacena algunos archivos msg de mensajes GPS
- imu_gps_localization: función de fusión de datos de IMU y GPS
- gps_goal: convierte los datos de latitud y longitud en datos de navegación de destino de Nav2

#### 2、Vinculación del puerto del GPS

El módulo GPS se conecta al ordenador o al controlador principal a través del puerto serie, por lo que debemos vincular correctamente el puerto del GPS para evitar que problemas con el número de puerto impidan que el ordenador o el controlador principal reconozcan el módulo GPS.

（1）Consulte los dispositivos USB conectados, localice el módulo GPS e introduzca **lsusb** en la terminal para buscar el ID del dispositivo al que está conectado el GPS; como se muestra en la siguiente figura, ese es el ID de identificación del módulo GPS,

![Imagen 1](../../../../../public/images/tutorials/sensors/gps/ROS-Preparation/1.png)

（2）Una vez conocido el ID del dispositivo, a continuación hay que escribir el archivo rules y vincular el puerto; introduzca en la terminal,

```
sudo gedit /etc/udev/rules.d/my_serial.rules 
```

Copie el siguiente contenido dentro:

```
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="myserial"
```

Guarde y salga; a continuación, asígnele permisos de ejecución e introduzca en la terminal,

```
sudo chmod 777 /etc/udev/rules.d/my_serial.rules 
```

（3）Vuelva a conectar y desconectar el módulo GPS e introduzca ll /dev/myserial en la terminal para comprobar si la vinculación se ha realizado correctamente; si aparece la siguiente pantalla, la vinculación se ha realizado correctamente,

```
ll /dev/myserial
```

![Imagen 2](../../../../../public/images/tutorials/sensors/gps/ROS-Preparation/2.png)

<RelatedProducts slugs="gps-beidou-module" />
