---
title: "Jetson: API de Baidu Maps"
description: "Módulo GPS/BeiDou con NVIDIA Jetson Orin: registra la API de Baidu Maps y muestra en el mapa la ubicación obtenida por el módulo."
---

# Jetson: API de Baidu Maps

**1.** **Método de registro**

Acceda a la plataforma abierta de Baidu Maps https://lbsyun.baidu.com/

Desplace la página hasta el final

Haga clic en Registrarse ahora

![Imagen 1](../../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/18.jpg) 

Se recomienda elegir la opción de desarrollador individual (ya que la solicitud puede utilizarse el mismo día)

Siga las indicaciones y complete los pasos uno a uno

![Imagen 2](../../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/19.jpg) 

**2. Obtener la ak**

Utilizamos la ubicación por IP normal del servicio web; la documentación puede consultarse en el siguiente enlace.

https://lbsyun.baidu.com/index.php?title=webapi/ip-api

Haga clic en Consola, seleccione Mis aplicaciones y seleccione Crear aplicación.

![Imagen 3](../../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/20.jpg) 

El nombre de la aplicación puede ser cualquiera; seleccione Servidor como tipo de aplicación, habilite el servicio e introduzca 0.0.0.0/0 en la lista blanca.

![Imagen 4](../../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/21.jpg) 

Haga clic en Enviar para generar una aplicación.

![Imagen 5](../../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/22.jpg) 

Copie el valor de ak de nuestra aplicación

![Imagen 6](../../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/23.jpg) 

Péguelo en el programa y guárdelo; así podrá leer la información de posición mediante Baidu Maps.

![Imagen 7](../../../../../public/images/tutorials/sensors/gps/Jetson-Baidu-Map-API/24.jpg)

<RelatedProducts slugs="gps-beidou-module" />
