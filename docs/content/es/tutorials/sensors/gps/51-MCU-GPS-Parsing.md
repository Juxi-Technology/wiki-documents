---
title: "51 MCU: análisis GPS"
description: "Módulo GPS/BeiDou con el microcontrolador 51 STC89C52RC: lee y analiza las tramas del módulo para obtener latitud, longitud y altitud."
---

# 51 MCU: análisis GPS

**1. Objetivos de aprendizaje**

En esta lección aprenderemos principalmente a utilizar el microcontrolador 51 modelo STC89C52RC y el módulo GPS para implementar la función de análisis de la información de posición.

**2. Preparación previa**

El módulo GPS utiliza comunicación UART y USB. Aquí se utiliza el puerto UART de C51 para leer la información; conecte el TX del módulo al pin P3.0 de la placa 51. VCC y GND se conectan a 5V y GND respectivamente.

![Imagen 1](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/1.png)

**3.** **Programa**

Inicializar el puerto serie y el array de datos

![Imagen 2](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/2.jpg) 

Leer y analizar los datos recibidos.

![Imagen 3](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/3.jpg) 

Imprimir por el puerto serie los datos recibidos.

![Imagen 4](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/4.jpg) 

**4****. Fenómeno experimental**

Tras encender el módulo, este tarda unos 32 s en arrancar; después, el LED indicador de impresión por el puerto serie del módulo parpadeará de forma continua, momento en el que se pueden recibir datos con normalidad.

Una vez descargado y ejecutado el programa, abra el software de puerto serie y configure la velocidad en baudios a 9600; el puerto serie imprimirá de forma cíclica la información de posición actual.

![Imagen 5](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/5.jpg) 

Tenga en cuenta que la antena del módulo debe estar en el exterior; de lo contrario, es posible que no se encuentre la señal GPS.

<RelatedProducts slugs="gps-beidou-module" />
