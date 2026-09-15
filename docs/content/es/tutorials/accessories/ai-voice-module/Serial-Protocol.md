---
title: "Protocolo de puerto serie"
description: "Abra el archivo de lista de protocolo de palabras de comando y frases de reproducción V1中文 en los archivos ad…"
---

# Protocolo de puerto serie

Abra el archivo de lista de protocolo de palabras de comando y frases de reproducción V1_中文 en los archivos adjuntos; podrá ver el protocolo de envío y el protocolo de recepción,

## 1. Análisis de entradas funcionales

Según el archivo, puede ver los protocolos de envío y recepción de 10 entradas funcionales,

![Imagen 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/1.png)

Podemos distinguir las entradas funcionales analizando el tercer byte del protocolo

![Imagen 2](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/2.png)

Entre ellos, el primer y el segundo byte (EF EF) representan la cabecera de trama, el tercer byte representa el ID de la palabra de función, el cuarto byte representa el ID de la palabra de comando y el quinto byte (EE) representa el final de trama

## 2. Entradas de comando

A continuación se muestra un ejemplo de una entrada de comando; el cuarto byte de la palabra de comando representa el ID

![Imagen 3](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/3.png)

Ejemplo:

Por ejemplo, si decimos 小车停止 al módulo, este enviará los cinco bytes FE EF 00 01 EE a través del puerto serie. Podemos obtener este grupo de datos mediante la función de servicio de puerto serie del controlador anfitrión y, a continuación, analizar el cuarto byte para obtener ID:01, con lo que sabremos que se trata de 小车停止.

## 3. Entradas de frases de reproducción

Las entradas de frases de reproducción no se reproducen activamente; el controlador anfitrión debe enviar un comando a través del puerto serie para que se reproduzcan (las frases de reproducción de las entradas de comando también se pueden reproducir).

![Imagen 4](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/4.png)

Entre ellos, el primer y el segundo byte (FE EF) representan la cabecera de trama, el tercer byte representa la función de reproducción FF, el cuarto byte representa el ID del contenido que debe reproducirse y el quinto byte (EE) representa el final de trama

Ejemplo:

Cuando necesitamos reproducir “初始化完成”, el controlador anfitrión debe enviar FE EF FF 67 EE al módulo de interacción por voz a través del puerto serie; una vez completado el envío, el módulo de interacción por voz podrá reproducir “初始化完成”

![Imagen 5](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/5.png)

