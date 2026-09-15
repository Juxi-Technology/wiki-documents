---
title: "Arduino: lectura de posición"
description: "En esta lección aprenderemos principalmente a utilizar Arduino y el módulo GPS para implementar la función de…"
---

# Arduino: lectura de posición

**1. Objetivos de aprendizaje**

En esta lección aprenderemos principalmente a utilizar Arduino y el módulo GPS para implementar la función de lectura de la información de posición.

**2. Preparación previa**

El módulo GPS utiliza comunicación UART y USB. Aquí se utiliza el puerto UART de Arduino UNO para leer la información; conecte el TX del módulo al pin D0 de la placa Arduino UNO. VCC y GND se conectan a 5V y GND respectivamente.

![Imagen 1](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Reading/1.png)

**3.** **Programa**

Inicializar el puerto serie.

![Imagen 2](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Reading/2.jpg) 

Imprimir los datos recibidos.


**4. Compilar y descargar el programa**

4.1 Necesitamos abrir el archivo con el software Arduino IDE y, a continuación, hacer clic en la "√" de la barra de menú para compilar el programa, y esperar a que aparezca el texto "compilación correcta" en la esquina inferior izquierda.

 ![Imagen 3](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Reading/3.jpg)

4.2 En la barra de menú de Arduino IDE, debemos seleccionar 【Herramientas】---【Puerto】--- seleccionar el número de puerto que se acaba de mostrar en el Administrador de dispositivos, como se muestra en la siguiente figura.

![Imagen 4](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Reading/4.jpg) 

4.3 Una vez realizada la selección, haga clic en la "→" situada bajo la barra de menú para cargar el código en la placa UNO. Cuando aparezca el texto "carga completada" en la esquina inferior izquierda, significa que el programa se ha cargado correctamente en la placa UNO, como se muestra en la siguiente figura.

![Imagen 5](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Reading/5.jpg) 

 

**5. Fenómeno experimental**

Tras encender el módulo, este tarda unos 32 s en arrancar; después, el LED indicador de impresión por el puerto serie del módulo parpadeará de forma continua, momento en el que se pueden recibir datos con normalidad.

Una vez descargado y ejecutado el programa, abra la ventana del monitor serie y abra el software de puerto serie, configure la velocidad en baudios a 9600; el puerto serie imprimirá de forma cíclica la información de posición actual. Esta información son datos sin procesar, por lo que puede consultar  CASIC多模卫星导航接收机协议规范.pdf  para ver el contenido específico de cada mensaje.

![Imagen 6](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Reading/6.jpg) 

Tenga en cuenta que la antena del módulo debe estar en el exterior; de lo contrario, es posible que no se encuentre la señal GPS.

<RelatedProducts slugs="gps-beidou-module" />
