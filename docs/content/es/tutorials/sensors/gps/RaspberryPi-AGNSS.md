---
title: "Raspberry Pi: posicionamiento AGNSS"
description: "En esta lección aprenderemos principalmente a utilizar la Raspberry Pi, el módulo GPS y un servidor agnss par…"
---

# Raspberry Pi: posicionamiento AGNSS

**1. Objetivos de aprendizaje**

En esta lección aprenderemos principalmente a utilizar la Raspberry Pi, el módulo GPS y un servidor agnss para implementar la lectura y el análisis de la información de posición en condiciones de señal débil.

**2. Descripción de AGNSS**

2.1. **Por qué usar AGNSS**

• Las condiciones para el posicionamiento de un receptor GNSS autónomo incluyen:

- Capturar y seguir las señales de satélite, y resolver el tiempo

- Obtener el mensaje de navegación del satélite

• En un entorno de señal fuerte, un receptor GNSS autónomo puede realizar un arranque en frío y posicionarse en unos 30 segundos; sin embargo, en un entorno de señal débil, un receptor sin asistencia externa captura los satélites muy lentamente y le resulta muy difícil obtener el mensaje de navegación de los satélites, por lo que puede tardar mucho en posicionarse o incluso no lograrlo.

• AGNSS puede proporcionar al receptor la información de asistencia necesaria para el posicionamiento, como el mensaje de navegación, la posición aproximada y el tiempo. Tanto en entornos de señal fuerte como débil, esta información puede reducir notablemente el tiempo hasta el primer posicionamiento.

2.2. **Solución AGNSS**

• El servidor AGNSS obtiene y gestiona la información de asistencia AGNSS a partir de múltiples fuentes de datos GNSS. El servidor está permanentemente a la escucha y responde a las solicitudes AGNSS de los clientes (se requieren nombre de usuario y contraseña).

• El usuario obtiene la información de asistencia del servidor AGNSS mediante el protocolo TCP/IP; la información de asistencia obtenida puede transmitirse directamente al receptor GNSS.

• El usuario también puede establecer su propio servidor proxy.

![Imagen 1](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/1.png) 

2.3. **Flujo de AGNSS**

• Conectar con el servidor AGNSS

–La dirección del servidor es 121.41.40.95 (nombre de dominio: www.gnss-aide.com)

–El número de puerto es 2621

• Enviar la solicitud AGNSS

–Sentencia de solicitud: (los campos de nombre de usuario y contraseña son obligatorios)

–user=pm@juxi.com;pwd=juxi;cmd=full;gnss=gps+bd;lat=60.0;lon=55.0;alt=0;

• Obtener la información de asistencia AGNSS

• Enviar la información de asistencia AGNSS al receptor

2.4. **Parámetros de la solicitud AGNSS**

• El cliente envía la solicitud al servidor AGNSS; el formato de la sentencia de solicitud es el siguiente

–La sentencia de solicitud es una combinación de varios grupos key=value;, por ejemplo: key=value;key=value;

• Ejemplo: user=pm@juxi.com;pwd=juxi;cmd=full;gnss=gps+bd;lat=60.0;lon=55.0;alt=0;

• La definición concreta de key y value se muestra en la siguiente tabla

| Palabra clave (Key) | Valor (value) | Opcionalidad | Notas                                                        |
| ----------- | ----------- | ------ | ------------------------------------------------------------ |
| **user**    | Cadena      | Obligatorio   | Nombre de usuario. Se recomienda encarecidamente que el nombre de usuario sea una dirección de correo electrónico válida; la información importante de mantenimiento del servidor AGNSS se enviará a esa dirección de correo. |
| **pwd**     | Cadena      | Obligatorio   | Contraseña de usuario                                                     |
| **gnss**    | Cadena      | Opcional   | Lista de GNSS separada por comas; actualmente admite GPS. Los valores válidos son: gps,bds,glo. "gnss=gps;" indica solicitar información de asistencia de GPS; "gnss=gps,bds;" indica solicitar información de asistencia de GPS y BDS; |
| **cmd**     | Cadena      | Opcional   | full: toda la información, incluidas las efemérides, el tiempo y la posición estimados. eph: solo proporciona información de efemérides. aid: información de tiempo y posición asistidos. Si no se rellena, el valor predeterminado es full |
| **lat**     | Valor numérico        | Opcional   | Valor estimado de la latitud de la posición del usuario. Unidad de la latitud: grados. El rango de valores es de -90 a 90 grados. Los formatos de asistencia de posición son dos: formato de latitud, longitud y altitud y formato ECEF; se elige uno de los dos. El formato válido de asistencia de posición de latitud, longitud y altitud es "lat=30;lon=120.3;alt=100;"; los tres campos deben estar completos. |
| **lon**     | Valor numérico        | Opcional   | Valor estimado de la longitud de la posición del usuario. Unidad de la longitud: grados. El rango de valores es de -180 a 180 grados. |
| **alt**     | Valor numérico        | Opcional   | Valor estimado de la altitud de la posición del usuario. Unidad: metros.                              |
| **x**       | Valor numérico        | Opcional   | Valor estimado de la posición del usuario (X, Y, Z en el sistema de coordenadas ECEF). Unidad: metros. El formato válido de asistencia de posición ECEF es "x=30000;y=1111120.3;z=3345100;"; los tres campos deben estar completos. |
| **y**       | Valor numérico        | Opcional   | Valor estimado de la posición del usuario (X, Y, Z en el sistema de coordenadas ECEF). Unidad: metros.           |
| **z**       | Valor numérico        | Opcional   | Valor estimado de la posición del usuario (X, Y, Z en el sistema de coordenadas ECEF). Unidad: metros.           |
| **pacc**    | Valor numérico        | Opcional   | Precisión de la posición del usuario. Unidad: metros.                                 |

2.5. **Información devuelta por el servidor**

![Imagen 2](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/2.png) 

• Ejemplo de los datos devueltos por el servidor AGNSS: cabecera de datos + contenido de los datos de asistencia

• Los datos binarios son los datos de asistencia que necesita el receptor GNSS; estos datos binarios ya incluyen de por sí la verificación de datos. Para el formato de los datos binarios, consulte la especificación de protocolo del receptor de 中科微.

• Si la cabecera de datos también se envía al receptor GNSS, no producirá ningún efecto en el receptor GNSS.

2.6. **Comparación de rendimiento de AGNSS**

• En comparación con un receptor GNSS independiente normal, el receptor AGNSS presenta una mejora notable en el rendimiento TTFF, especialmente en condiciones de señal débil.

![Imagen 3](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/3.jpg) 

2.7. **Precauciones**

• La asistencia de posición aproximada debe obtenerla el cliente por otros medios, por ejemplo

–Módulos de comunicación GSM/GPRS/3G: estos módulos pueden obtener la posición aproximada actual mediante el CELL ID

–Módulos inalámbricos como el WiFi también pueden realizar un posicionamiento aproximado

• La precisión de la posición aproximada debe estar dentro de 15 km; una asistencia de posición errónea afectará al rendimiento del receptor

• Si no se puede obtener la posición aproximada, omita los campos de posición (lat,lon,alt,x,y,z) en la sentencia de solicitud AGNSS; el receptor seleccionará automáticamente una posición válida del historial de posicionamiento

• No es necesario tomar como posición aproximada la posición que el propio receptor GNSS genera

2.8. **Cuándo se necesita AGNSS**

• No es necesario descargar del servidor en cada encendido, lo que ahorra tráfico

–El chip de 中科微 dispone internamente de una SRAM con respaldo por batería, así como de una FLASH de respaldo permanente, que pueden guardar automáticamente los datos de efemérides recibidos, etc.

–Durante el funcionamiento normal, el chip descarga continuamente de los satélites los datos de efemérides más recientes

• Consultando el estado del receptor se decide si es necesario descargar datos AGNSS del servidor

–El receptor puede emitir la sentencia de estado del mensaje (no se emite de forma predeterminada; es necesario configurarlo para que se emita)

2.9. **Introducción a la sentencia de estado del mensaje**

![Imagen 4](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/4.png) 

![Imagen 5](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/5.png) 

• Esta sentencia emite el tiempo interno actual del receptor + el estado del mensaje.

• Se puede enviar el comando $PCAS03,,,,,,,,,,,1*1F para emitir una vez por segundo la sentencia de estado del mensaje

• Se puede enviar el comando $PCAS03,,,,,,,,,,,0*1E para detener la emisión de la sentencia de estado del mensaje

• Nota: cada sentencia debe terminar con \r\n (0x0D,0x0A); la sentencia contiene 11 comas

• Si el indicador de tiempo es válido (distinto de 0) y el número de efemérides válidas es elevado (más de 8), no es necesario descargar las efemérides AGNSS.

 

**3. Preparación previa**

**3.1. Conexionado**

El módulo GPS utiliza comunicación UART o comunicación USB. Aquí se toma como ejemplo la comunicación USB.

![Imagen 6](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/6.png)

Utilice un cable type-c para conectar la Raspberry Pi y el módulo GPS; ejecute el comando ls /dev | grep 'ttyUSB' y podrá ver que el módulo GPS se reconoce como USB0

![Imagen 7](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/7.png) 

**3.2. Solicitar la ak de 百度地图**

Consulte el documento [Tutorial para solicitar la api de 百度地图]()

 

**4. Programa**

Para el programa de esta lección, consulte: GPS-agnss.py

Inicializar USB:

![Imagen 8](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/8.jpg) 

En los materiales, es necesario rellenar el valor de ak que se haya solicitado; así podrá obtener mediante 百度地图 la información aproximada de latitud y longitud actual.

![Imagen 9](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/9.jpg) 

Aquí se envía al servidor la información aproximada de latitud y longitud obtenida mediante 百度地图; la cuenta de inicio de sesión que utilizamos es la cuenta oficial de 钜犀. Una vez completada la obtención, se envía todo el paquete al módulo.

![Imagen 10](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/10.jpg) 

![Imagen 11](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/11.jpg) 

Función de obtención y análisis de la información de posición. En la siguiente figura se filtran, de entre la información de posición, los mensajes que comienzan por GNGGA y, a continuación, se analizan los datos y se almacenan en las distintas variables globales.

![Imagen 12](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/12.jpg) 

![Imagen 13](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/13.jpg) 

Del mismo modo se obtuvo y analizó la información de rumbo de GNVTG.

![Imagen 14](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/14.jpg) 

Los datos analizados se imprimen de forma cíclica

![Imagen 15](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/15.jpg) 

**5. Ejecutar el programa**

En la terminal, introduzca sudo python2 GPS-agnss.py para ejecutar el programa.

**6. Fenómeno experimental**

**Nota: en el posicionamiento asistido, la Raspberry Pi debe estar conectada a la red.**

Tras encender el módulo en condiciones de señal débil, comienza la inicialización del USB; si la inicialización se realiza correctamente se muestra "GPS Serial Opened! Baudrate=9600", de lo contrario se muestra "GPS Serial Open Failed!". Si hay un error, debe comprobar el cableado o el puerto USB.

A continuación se muestra "GPS Agnss start" y comienza el envío de la información de posicionamiento asistido al servidor; una vez completado el envío se muestra "GPS Agnss success"

Si transcurrido un tiempo tras el envío aún no se ha leído la señal GPS, se muestra "GPS no found" y se imprime la información aproximada de latitud y longitud leída mediante 百度地图.

![Imagen 16](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/16.jpg) 

Tras un tiempo, una vez reconocido el GPS, se imprimen de forma cíclica la posición y la información de rumbo.

![Imagen 17](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/17.jpg) 

Pulse Ctrl+C para salir de la lectura de información.

![Imagen 18](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/18.jpg)

<RelatedProducts slugs="gps-beidou-module" />
