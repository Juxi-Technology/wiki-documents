---
title: "Protocolo IIC"
description: "Nota: la fuente de alimentación del dispositivo anfitrión y la del módulo de interacción por voz pueden ser d…"
---

# Protocolo IIC

Nota: la fuente de alimentación del dispositivo anfitrión y la del módulo de interacción por voz pueden ser diferentes, pero al conectarlas deben compartir una tierra común para poder proporcionar un nivel de comunicación estable

## 1. El módulo de interacción por voz como esclavo

Recibir y analizar la señal enviada por el anfitrión:

Esperar una interrupción de señal IIC; si se reciben datos por IIC, llamar a la función correspondiente según la información de dirección del registro recibida por IIC.

Procesamiento y retroalimentación de datos:

Cuando el módulo de interacción por voz recibe un comando de lectura de registro, debe llamar a la función de envío correspondiente para enviar los datos reconocidos al dispositivo anfitrión.

## 2. Dirección de dispositivo IIC y funciones de registro

La dirección de dispositivo del esclavo IIC del módulo de interacción por voz es 0x2A.

## 3. Obtener entradas de comando.

Abra el archivo de lista de protocolo de palabras de comando y frases de reproducción V1_中文 en los archivos adjuntos; podrá ver que el protocolo de comunicación comienza con 0xFE, 0xED y termina con 0xEE, con 2 bytes intermedios que son el tipo de función y el número de ID respectivamente.

![Imagen 1](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/1.png)

Cuando el módulo de interacción por voz reconoce la palabra de comando “停车”, responde “好的，已停止”. El controlador anfitrión puede leer un byte de datos, 0x02, en el registro de resultado de reconocimiento (0xDA); este dato es igual al 4.º byte del protocolo de envío de “停车”.

![Imagen 2](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/2.png)

## 4. Entradas de frases de reproducción

Las entradas de frases de reproducción no se reproducen activamente; el controlador anfitrión debe configurarlas mediante IIC para que se reproduzcan (las frases de reproducción de las entradas de comando también se pueden reproducir).

El controlador anfitrión escribe un byte —el número de ID de la palabra de comando— en la dirección del registro de reproducción (0xD1) mediante IIC, y el módulo de reproducción de voz reproducirá la frase correspondiente; 0xFF es la frase de reproducción común.

![Imagen 3](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/3.png)

Por ejemplo:

Cuando el usuario necesita reproducir “这是红色”, el controlador anfitrión debe escribir “0x5F” en el registro de reproducción (0xD1) mediante IIC, y el módulo de interacción por voz reproducirá “这是红色”.

![Imagen 4](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/4.png)

## 5. Reproducción de entradas de palabras de función

Las entradas de palabras de función se pueden reproducir cuando se reconoce una palabra de comando, o bien reproducirse escribiendo un byte específico mediante IIC.

El controlador anfitrión escribe un byte —el número de ID de la palabra de comando— en la dirección del registro de reproducción (0xD2) mediante IIC, y el módulo de reproducción de voz reproducirá la frase correspondiente; 0xFF es la frase de reproducción común.

![Imagen 5](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/5.png)

Por ejemplo:

Cuando el usuario necesita reproducir “这是红色”, el controlador anfitrión debe escribir “0x01” en el registro de reproducción (0xD2) mediante IIC, y el módulo de interacción por voz reproducirá “欢迎使用小犀”.

![Imagen 6](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/6.png)

## 5. Reproducción de entradas de palabras de comando

Las entradas de palabras de comando se pueden reproducir cuando se reconoce una palabra de comando, o bien reproducirse escribiendo un byte específico mediante IIC.

El controlador anfitrión escribe un byte —el número de ID de la palabra de comando— en la dirección del registro de reproducción (0xD3) mediante IIC, y el módulo de reproducción de voz reproducirá la frase correspondiente; 0xFF es la frase de reproducción común.

![Imagen 7](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/7.png)

Por ejemplo:

Cuando el usuario necesita reproducir “好的，正在前进”, el controlador anfitrión debe escribir “0x04” en el registro de reproducción (0xD3) mediante IIC, y el módulo de interacción por voz reproducirá “好的，正在前进”.

![Imagen 8](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/8.png)



