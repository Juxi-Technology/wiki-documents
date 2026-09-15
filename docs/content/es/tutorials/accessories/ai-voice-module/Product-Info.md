---
title: "Información del producto"
description: "CI1302 es un chip de voz inteligente con red neuronal de alto rendimiento de nueva generación desarrollado po…"
---

# Información del producto

## 1. Introducción al módulo de interacción por voz

CI1302 es un chip de voz inteligente con red neuronal de alto rendimiento de nueva generación desarrollado por Chipintelli. Integra el procesador de red neuronal BNPU V3, desarrollado por Chipintelli, y un núcleo de CPU; su frecuencia de sistema puede alcanzar los 220MHz, incluye hasta 640KByte de SRAM integrada, integra una unidad de gestión de energía PMU y un oscilador RC, e integra un Audio Codec de doble canal de alto rendimiento y bajo consumo, así como múltiples interfaces de control periférico como UART, IIC, IIS, PWM, GPIO y PDM. El chip solo necesita unos pocos componentes periféricos, como resistencias y condensadores, para implementar las soluciones de hardware de diversos productos de voz inteligente, con una relación calidad-precio extremadamente alta.

Adopta tecnología BNPU de tercera generación por hardware y admite redes neuronales como DNN\\TDNN\\RNN\\CNN, así como operaciones vectoriales en paralelo, lo que permite funciones como reconocimiento de voz, reconocimiento de huella de voz, autoaprendizaje de palabras de comando, detección de voz y reducción de ruido mediante aprendizaje profundo. Esta solución de chip también admite varios idiomas globales como chino, inglés y japonés, y puede aplicarse ampliamente en campos de productos como electrodomésticos, iluminación, juguetes, dispositivos portátiles, industria y automoción, para lograr interacción y control por voz y diversas aplicaciones de soluciones de voz inteligente.

El chip CI1302 dispone de un núcleo de procesador de red neuronal (BNPU), admite computación acelerada NN sin conexión y aceleración por hardware del procesamiento de señales de voz, etc.; la frecuencia de CPU puede alcanzar los 220MHz, puede realizar reconocimiento de voz en campo lejano sin conexión, incluye 2MB de almacenamiento FLASH integrado y puede admitir 300 palabras de comando.

## 2. Características del producto

- Incorpora 110+ instrucciones de voz predefinidas y admite palabras de instrucción personalizadas en chino e inglés.

El usuario puede modificar las palabras de instrucción a través de la página web que proporcionamos, generar un nuevo archivo de firmware y grabar el firmware en el módulo mediante el software de PC; el módulo podrá entonces reconocer las nuevas instrucciones. Con 2M de espacio de almacenamiento integrado, se pueden grabar hasta unas 120 palabras de instrucción.

- Altavoz de alta fidelidad y micrófono de alto rendimiento integrados.

Integra algoritmos avanzados y tecnología de reducción de ruido a nivel de circuito, puede filtrar eficazmente el ruido de fondo ambiental y alcanza una tasa de reconocimiento de hasta el 99% en un rango de 5 metros, lo que permite la conversación natural y la cancelación de eco. Proporciona una salida de audio clara y restaura con precisión los detalles de la voz.

- Coprocesador integrado en placa e interfaces IIC/puerto serie/Type-C.

Integra un chip STC8H, que puede convertir automáticamente los datos de voz al formato de datos de puerto serie o IIC, lo que simplifica el proceso de comunicación con dispositivos controladores anfitriones externos. Se proporcionan varios cables de conexión de forma gratuita, para que el usuario pueda conectarlo a placas de desarrollo MCU y dispositivos controladores anfitriones integrados, lograr la comunicación y crear sus propios proyectos DIY.

- Se proporcionan tutoriales de uso basados en diversas placas de desarrollo

Se proporciona información de placas de desarrollo, como STM32, ESP32, MSPM0, Raspberry Pi, placas de desarrollo de la serie Jetson, RDK, etc. También se proporcionan archivos SDK para los sistemas ROS1 y ROS2.

## 3. Principio de funcionamiento

El módulo utiliza la activación por modo de comando: el usuario debe decir la palabra de activación configurada para activar primero el módulo de interacción por voz, y tras la activación se puede realizar el reconocimiento de voz. La palabra de activación predeterminada del firmware de fábrica es “你好，小犀”. Si no se reconoce voz después de 15 segundos, el módulo entrará en modo de reposo y deberá activarse de nuevo antes de volver a usarlo.

Cuando el chip CI1302 reconoce la entrada de voz correspondiente, la envía a través del puerto serie o la interfaz IIC y proporciona la reproducción de respuesta; el chip IIC almacena la instrucción de voz recibida y la envía mediante el protocolo de esclavo IIC.

El módulo admite la modificación de la palabra de activación, la modificación de palabras de comando y las entradas personalizadas; puede aprender cómo hacerlo en los tutoriales «[Modificar la palabra de activación y las palabras de comando](https://juxitech.feishu.cn/wiki/Po6bw8OtLiDNonklg7ZcBbGknyc)» y «[Personalización de entradas de protocolo](https://juxitech.feishu.cn/wiki/CIHLwo8qNiVBtKkhuTtcZIeNnAb)».

## 4. Precauciones

1、Alimente con un voltaje de 5v; superar los 5v dañará el módulo

2、El entorno de uso debe ser silencioso; un entorno ruidoso afectará el rendimiento de reconocimiento

3、Al pronunciar una entrada, la voz debe ser fuerte y clara y la velocidad del habla no debe ser demasiado rápida; se recomienda mantenerse a menos de 5 metros del módulo

## 5. Descripción de las interfaces de hardware

![Imagen 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Product-Info/1.png)





