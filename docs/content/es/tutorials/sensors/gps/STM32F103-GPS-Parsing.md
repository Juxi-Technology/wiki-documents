---
title: "STM32F103: salida de análisis GPS"
description: "En esta lección aprenderemos principalmente a utilizar el STM32F103C8T6 y el módulo GPS para implementar la f…"
---

# STM32F103: salida de análisis GPS

**1. Objetivos de aprendizaje**

En esta lección aprenderemos principalmente a utilizar el STM32F103C8T6 y el módulo GPS para implementar la función de salida del análisis de la información de posición.

**2. Preparación previa**

El módulo GPS utiliza comunicación UART y USB. Aquí se utiliza el puerto UART del STM32 para leer la información; conecte el TXD del módulo al pin PA10 de la placa STM32F103C8T6. VCC y GND se conectan a 5V y GND del STM32F103C8T6 respectivamente; el GND y el RXD del módulo TTL se conectan al GND y al PA9 del STM32 respectivamente.

![Imagen 1](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/1.png)

**3.** **Programa**

La velocidad en baudios del módulo es 9600.

![Imagen 2](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/2.jpg) 

Leer y analizar los datos recibidos.

![Imagen 3](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/3.jpg) 

Convertir la unidad de la información de latitud y longitud a grados

![Imagen 4](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/4.jpg) 

Imprimir por el puerto serie los datos recibidos.

![Imagen 5](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/5.jpg) 

Nota: en realidad, el valor del sistema de coordenadas del posicionamiento GPS/BeiDou no guarda una simple relación de 100 veces, sino que requiere una conversión de grados, minutos y segundos. Así, los valores de coordenadas GPS/BeiDou que obtenemos, como la latitud norte 2429.53531 y la longitud este 11810.78036, requieren el siguiente cálculo: 24+（29.53531/60）≈ 24.49225517 118+（10.78036/60）≈118.17967267. Además, distintos microcontroladores pueden presentar cierto error debido a problemas de precisión en la conversión de datos.

**4. Fenómeno experimental**

Tras encender el módulo, este tarda unos 32 s en arrancar; después, el LED indicador de impresión por el puerto serie del módulo parpadeará de forma continua, momento en el que se pueden recibir datos con normalidad.

Una vez descargado y ejecutado el programa, abra el software de puerto serie y configure la velocidad en baudios a 9600; el puerto serie imprimirá de forma cíclica la información de posición actual.

![Imagen 6](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/6.jpg) 

Tenga en cuenta que la antena del módulo debe estar en el exterior; de lo contrario, es posible que no se encuentre la señal GPS.

<RelatedProducts slugs="gps-beidou-module" />
