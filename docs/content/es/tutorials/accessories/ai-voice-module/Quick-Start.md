---
title: "Inicio rápido"
description: "Inicio rápido del módulo de voz IA: con el firmware de fábrica, conecta el dispositivo y prueba el reconocimiento de voz y la reproducción."
---

# Inicio rápido

El firmware con función de reconocimiento de voz ya viene grabado de fábrica, por lo que el usuario puede experimentarlo rápidamente sin necesidad de grabarlo. Si necesita añadir otras entradas de reconocimiento, si necesita volver a grabar otro firmware o personalizar entradas, puede consultar el tutorial «3. Personalización de entradas de protocolo» para ver cómo personalizar entradas.

## 1. Preparación antes del uso

1. Un cable de datos type-c  

2. Módulo de interacción por voz

## 2. Conexión del dispositivo

![Imagen 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Quick-Start/1.png)

## 3. Implementación del reconocimiento de voz y la reproducción

Después de alimentar el módulo de interacción por voz mediante type-c, puede activar el módulo con la palabra de activación “你好，小犀”; un módulo activado correctamente responderá “我在”, lo que indica que en ese momento se encuentra en estado de reconocimiento de voz. Si no se reconoce ninguna entrada de comando en 15 segundos, el módulo entrará en modo de reposo y reproducirá al mismo tiempo “我去休息了”. Si desea volver a activar el módulo, basta con decir de nuevo la palabra de activación.

El firmware de fábrica incluye palabras de comando y frases de reproducción; la lista de protocolo se puede consultar en los archivos adjuntos proporcionados. La siguiente figura muestra un extracto del contenido de la lista de protocolo de palabras de comando y frases de reproducción. Puede consultar qué función representa la palabra de comando correspondiente según el tipo de función. Las frases de reproducción que deben reproducirse son frases de reproducción pasivas, y solo se pueden activar enviando la instrucción correspondiente al módulo de interacción por voz desde el puerto serie de un ordenador u otro microcontrolador o dispositivo controlador anfitrión; consulte la figura siguiente para más detalles.

Palabras de función:

Palabras de comando:

Frases de reproducción:

Existen dos modos de reproducción: uno activo y otro pasivo

Reproducción activa: después de que decimos una palabra de comando según la tabla, el módulo reproduce activamente la frase correspondiente. Después de activarlo, cuando decimos “小车前进”, el módulo, tras reconocerlo, reproduce activamente “好的，正在前进” 

Reproducción pasiva: es necesario enviar la instrucción de la tabla de protocolo al módulo de voz a través del puerto serie para que el módulo reproduzca la frase correspondiente. También puede escribir los datos de reproducción correspondientes en el registro de reproducción pasiva según el protocolo IIC. Para más detalles, consulte «Comunicación multi-controlador».

<RelatedProducts slugs="ai-voice-module" />
