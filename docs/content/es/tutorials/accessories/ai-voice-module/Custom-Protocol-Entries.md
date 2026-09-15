---
title: "Creación de entradas de protocolo personalizadas"
description: "El módulo ya viene con el firmware de reconocimiento de voz grabado de fábrica, y el firmware de fábrica tamb…"
---

# Creación de entradas de protocolo personalizadas

## 1. Creación del firmware del chip de voz

## 1.1 Precauciones

El módulo ya viene con el firmware de reconocimiento de voz grabado de fábrica, y el firmware de fábrica también se proporciona en el paquete de recursos. Si necesita volver a crear el firmware, puede seguir los pasos que se indican a continuación para crearlo.

## 1.2 Creación del firmware

Primero debe abrir el enlace «[Plataforma de voz con IA de Chipintelli](https://aiplatform.chipintelli.com/)» para acceder al sitio web de creación de firmware.  Haga clic en “Desarrollo de funciones” en la barra de menús y, a continuación, haga clic en “Aplicación de modelo grande de reconocimiento de voz sin conexión” bajo la columna de desarrollo de productos.

![Imagen 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/1.png)

En este momento se le pedirá que inicie sesión; debe registrar una cuenta de la plataforma con su propia información (la cuenta de este tutorial se registró de antemano). Después de iniciar sesión, haga clic de nuevo en “Desarrollo de firmware y SDK de reconocimiento de voz”.

![Imagen 2](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/2.png)

Una vez que se cargue la nueva página, haga clic en Nuevo proyecto a la izquierda y cree un producto como se muestra en la figura siguiente. El nombre y la descripción del producto se pueden personalizar; el resto de la información debe seleccionarse según el contenido del recuadro rojo, y el tipo de producto debe seleccionarse como “General->Control central inteligente”. Cuando termine, haga clic en Crear.

![Imagen 3](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/3.png)

A continuación debe rellenar la información básica del proyecto. Necesitamos reconocer chino, por lo que debe seleccionar “chino” como tipo de idioma; si necesita reconocer inglés, también puede modificarlo en consecuencia. Para el resto de la información, basta con seleccionar como se muestra en la figura siguiente y, cuando termine, hacer clic en Continuar.

![Imagen 4](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/4.png)

A continuación debe configurar el firmware; aquí solo explicamos las partes que deben modificarse. Active la cancelación de eco en los parámetros del algoritmo.

![Imagen 5](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/5.png)

En los parámetros de hardware, debe seleccionar “Internal RC” como fuente del oscilador de cristal.

![Imagen 6](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/6.png)

En la configuración del puerto serie de impresión, configure el nivel de UART0 como función de drenaje abierto, compatible con una pull-up externa de 5V.

![Imagen 7](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/7.png)

Modifique la configuración del puerto serie de comunicación: establezca la velocidad en baudios en 115200 y configure el nivel de UART1 como función de drenaje abierto, compatible con una pull-up externa de 5V. Cuando termine la configuración, haga clic en “Continuar” para pasar al siguiente paso.

![Imagen 8](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/8.png)

A continuación entramos en la función de edición de palabras de comando. Primero debe seleccionar la voz de reproducción; aquí seleccionamos “小蝶-清新女声 Ver.3”.

![Imagen 9](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/9.png)

A continuación subimos el archivo adjunto de palabras de comando. Localice la hoja de cálculo “命令词播报词协议列表V1_中文” en la misma ruta que este documento y arrástrela directamente a la página web para subirla.

![Imagen 10](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/10.png)

Después de subir el archivo, podrá ver nuestros datos de palabras de comando en la tabla situada debajo.

![Imagen 11](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/11.png)

Active la función de autoaprendizaje y seleccione aprendizaje especificado; el sistema generará automáticamente 4 instrucciones de autoaprendizaje, que aquí no modificamos.

![Imagen 12](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/12.png)

Después de enviar, espere unos minutos para que finalice la creación del firmware; cuando termine, haga clic en Descargar firmware para obtener el firmware creado.

![Imagen 13](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/13.png)

Para consultar los pasos de grabación del firmware, consulte «[Grabación del firmware del módulo](https://juxitech.feishu.cn/wiki/FfE8wbL1wipUWgkUKW6cbsw2nOe)».

## 2. Modificar entradas funcionales

Abra el archivo de lista de protocolo de palabras de comando y frases de reproducción V1_中文 en los archivos adjuntos.

![Imagen 14](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/14.png)

Localice las entradas funcionales de la tabla, es decir, los primeros 10 elementos. Tenga en cuenta que estas primeras 10 entradas funcionales son entradas fijas; no se pueden añadir, solo modificar.

![Imagen 15](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/15.png)

Aquí tomamos como ejemplo la modificación de la frase de reproducción de la palabra de activación: cambie la reproducción tras reconocer “你好，小犀” de “在的” a “我在”.

![Imagen 16](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/16.png)

Cuando termine de modificarlo, guarde. A continuación, siga los pasos de “1.2 Creación del firmware” para importar la tabla al sitio web. Si ya ha creado un firmware una vez, puede hacer clic en el botón “Heredar” del proyecto anterior para omitir los pasos de configuración de parámetros.

![Imagen 17](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/17.png)

Después de volver a crear el firmware, también debe grabar el firmware en el módulo de interacción por voz; de este modo podrá modificar las entradas funcionales.

## 3. Añadir nuevas entradas de comando

Abra el archivo de lista de protocolo de palabras de comando y frases de reproducción V1_中文 en los archivos adjuntos.

![Imagen 18](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/18.png)

En la parte inferior de la tabla, añada una nueva entrada de comando; aquí tomamos como ejemplo añadir una palabra de comando “打扫房间”.

![Imagen 19](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/19.png)

Aquí debe seleccionar “命令词” como tipo de función y establecer el modo de reproducción en “主”, para que tras reconocer “打扫房间” se reproduzca activamente “好的”.

![Imagen 20](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/20.png)

A continuación vamos a conocer el protocolo de envío. La 1.ª y la 2.ª posición de los datos son la cabecera de trama de datos y no necesitan modificarse. Cuando seleccionamos el tipo de función como palabra de comando, según el protocolo de envío, la 3.ª posición de datos debe ser “00”; esto sirve para distinguir si la instrucción es una “命令词” o una “播报语”.

![Imagen 21](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/21.png)

La 4.ª posición de datos es el ID de datos de la palabra de comando; se trata de un dato hexadecimal. Como el ID de la palabra de comando anterior es “8B”, esta posición debe establecerse en “8C”. En casos especiales, los ID de datos también pueden ser iguales, por ejemplo cuando el resultado devuelto por las dos palabras de comando siguientes es idéntico.

![Imagen 22](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/22.png)

La 5.ª posición del protocolo está fijada como “EE” y tampoco necesita modificarse. En la tabla, el protocolo de envío y el protocolo de recepción deben mantenerse coherentes.

![Imagen 23](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/23.png)

Cuando termine de modificarlo, guarde. A continuación, siga los pasos de “1.2 Creación del firmware” para importar la tabla al sitio web. Si ya ha creado un firmware una vez, puede hacer clic en el botón “Heredar” del proyecto anterior para omitir los pasos de configuración de parámetros

![Imagen 24](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/24.png)

Después de volver a crear el firmware, también debe grabar el firmware en el módulo de interacción por voz; de este modo podrá añadir nuevas entradas de comando.

## 4. Añadir una nueva frase de reproducción

Abra el archivo de lista de protocolo de palabras de comando y frases de reproducción V1_中文 en los archivos adjuntos.

![Imagen 25](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/25.png)

En la parte inferior de la tabla, añada una nueva entrada de comando; aquí tomamos como ejemplo añadir una frase de reproducción “现在是晚上”.

![Imagen 26](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/26.png)

Aquí debe seleccionar “播报语” como tipo de función y establecer el modo de reproducción en “被”.

![Imagen 27](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/27.png)

A continuación vamos a conocer el protocolo de envío. La 1.ª y la 2.ª posición de los datos son la cabecera de trama de datos y no necesitan modificarse. Cuando seleccionamos el tipo de función como frase de reproducción, según el protocolo de envío, la 3.ª posición de datos debe ser “FF”; esto sirve para distinguir que la instrucción es una “播报语”.

![Imagen 28](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/28.png)

La 4.ª posición de datos es el ID de datos de la palabra de comando; se trata de un dato hexadecimal. Como el ID de la frase de reproducción anterior es “8B”, esta posición debe establecerse en “8C”.

La 5.ª posición del protocolo está fijada como “EE” y tampoco necesita modificarse. En la tabla, el protocolo de envío y el protocolo de recepción deben mantenerse coherentes.

![Imagen 29](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/29.png)

Cuando termine de modificarlo, guarde. A continuación, siga los pasos de “1.2 Creación del firmware” para importar la tabla al sitio web. Si ya ha creado un firmware una vez, puede hacer clic en el botón “Heredar” del proyecto anterior para omitir los pasos de configuración de parámetros.

![Imagen 30](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/30.png)

Después de volver a crear el firmware, también debe grabar el firmware en el módulo de interacción por voz; de este modo podrá añadir nuevas entradas de comando.

<RelatedProducts slugs="ai-voice-module" />
