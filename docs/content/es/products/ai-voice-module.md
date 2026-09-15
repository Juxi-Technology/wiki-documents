---
title: Módulo de interacción de voz IA
category: accessory
description: Módulo de interacción de voz IA de Juxi Technology (CI1302) — 110+ instrucciones de voz sin conexión, 99% de reconocimiento a 5 m, palabras de comando personalizadas en chino e inglés, comunicación por puerto serie/IIC, compatible con Arduino/Jetson/RDK/Raspberry Pi/PC
keywords: [voz ia, módulo de interacción de voz, ci1302, reconocimiento de voz sin conexión, palabra de activación, palabras de comando, puerto serie, iic, ros1, ros2]
---

# Módulo de interacción de voz IA

## Descripción general

El módulo de interacción de voz IA se basa en el chip de voz inteligente de red neuronal de alto rendimiento **CI1302** de Chipintelli e integra el procesador de red neuronal BNPU V3, con soporte de reconocimiento de voz en campo lejano sin conexión; su **coprocesador STC8H** integrado en placa convierte automáticamente los resultados del reconocimiento de voz en datos de puerto serie o IIC, lo que simplifica la comunicación con dispositivos controladores anfitriones externos. Todo el reconocimiento se realiza localmente en el módulo, sin necesidad de conexión a la red.

**Características clave**:

- Reconocimiento de voz 100% sin conexión, sin necesidad de red (privacidad + baja latencia)
- **110+ instrucciones de voz** predefinidas de fábrica; admite palabras de comando personalizadas en chino e inglés (hasta unas 120 entradas)
- Palabra de activación “你好，小犀”; pasa a reposo automáticamente tras 15 segundos sin comandos y se reanuda al activarla de nuevo
- Altavoz de alta fidelidad y micrófono de alto rendimiento integrados, con reducción de ruido y cancelación de eco; tasa de reconocimiento de hasta el 99% en un rango de 5 metros
- Coprocesador STC8H integrado en placa; los resultados del reconocimiento se emiten como datos de puerto serie / IIC
- Dos modos de reproducción: activa y pasiva
- SDK de ROS1 / ROS2, además de tutoriales de comunicación para Arduino / Jetson / RDK / Raspberry Pi / PC

---

## Especificaciones

| Categoría | Especificación |
|------|------|
| Chip de voz | CI1302 de Chipintelli (procesador de red neuronal BNPU V3, frecuencia de hasta 220MHz) |
| Memoria | 640KB SRAM + 2MB Flash |
| Instrucciones de voz | 110+ predefinidas; palabras de comando personalizadas en chino e inglés, hasta unas 120 grabables |
| Activación | Palabra de activación “你好，小犀” (personalizable) |
| Distancia de reconocimiento | Dentro de 5 m (entorno silencioso, tasa de reconocimiento de hasta el 99%) |
| Audio | Altavoz de alta fidelidad + micrófono de alto rendimiento integrados (reducción de ruido + cancelación de eco) |
| Interfaces de comunicación | Puerto serie / IIC / Type-C (coprocesador STC8H integrado en placa) |
| Alimentación | 5V (Type-C) |
| Plataformas compatibles | Arduino, Jetson, RDK, Raspberry Pi, PC (STM32 / ESP32 / MSPM0 y otros MCU) |
| Soporte de software | SDK de ROS1 / ROS2, herramienta de grabación de firmware, herramienta web de entradas personalizadas |

---

## Inicio rápido

El firmware de reconocimiento de voz ya viene grabado de fábrica, por lo que se puede usar directamente sin grabarlo:

1. Alimente el módulo con un cable de datos Type-C (5V)
2. Diga la palabra de activación “你好，小犀”; cuando el módulo responda “我在”, podrá dar comandos (por ejemplo, “avanzar”)
3. Si no se reconoce ninguna palabra de comando en 15 segundos, el módulo reproduce “我去休息了” y entra en modo de reposo; para volver a usarlo, basta con decir de nuevo la palabra de activación

Para añadir otras entradas de reconocimiento, modifique las palabras de comando con la herramienta web para generar un nuevo firmware y grábela en el módulo con el software de PC. Consulte [Grabación del firmware del módulo](/es/tutorials/accessories/ai-voice-module/Firmware-Flashing) y [Creación de entradas de protocolo personalizadas](/es/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries).

---

## Tutoriales completos

- [Inicio rápido — primer uso, activación y reproducción](/es/tutorials/accessories/ai-voice-module/Quick-Start)
- [Información del producto — características, principio de funcionamiento, precauciones e interfaces de hardware](/es/tutorials/accessories/ai-voice-module/Product-Info)
- [Grabación del firmware del módulo](/es/tutorials/accessories/ai-voice-module/Firmware-Flashing)
- [Modificar la palabra de activación y las palabras de comando](/es/tutorials/accessories/ai-voice-module/Wake-Word-Commands-Edit)
- [Creación de entradas de protocolo personalizadas](/es/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries)
- [Interacción por voz en ROS1](/es/tutorials/accessories/ai-voice-module/ROS1-Voice-Interaction) / [Interacción por voz en ROS2](/es/tutorials/accessories/ai-voice-module/ROS2-Voice-Interaction)
- [Protocolo de puerto serie](/es/tutorials/accessories/ai-voice-module/Serial-Protocol) / [Protocolo IIC](/es/tutorials/accessories/ai-voice-module/IIC-Protocol)
- [Comunicación con PC](/es/tutorials/accessories/ai-voice-module/PC-Communication)
- Arduino: [Comunicación por puerto serie](/es/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication) / [Comunicación IIC](/es/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication)
- Jetson: [Comunicación por puerto serie](/es/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication) / [Comunicación IIC](/es/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication)
- RDK: [Comunicación por puerto serie](/es/tutorials/accessories/ai-voice-module/RDK-Serial-Communication) / [Comunicación IIC](/es/tutorials/accessories/ai-voice-module/RDK-IIC-Communication)
- Raspberry Pi: [Comunicación por puerto serie](/es/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication) / [Comunicación IIC](/es/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication)

---

## Casos de uso

- Interacción de voz y control por comandos en robots (p. ej. “avanzar”, “detener”)
- Control por voz del hogar inteligente (iluminación, electrodomésticos)
- Productos de voz para educación y juguetes
- Control por voz de equipos industriales
- Diversos proyectos DIY de interacción de voz

---

## Preguntas frecuentes

**P: ¿Necesita conexión a la red?**

**A:** No. El CI1302 es un chip de voz sin conexión; el reconocimiento se realiza localmente en el módulo, por lo que funciona sin conexión a la red.

**P: ¿Funciona nada más sacarlo de la caja?**

**A:** Sí. El firmware de reconocimiento de voz ya viene grabado de fábrica: basta con alimentarlo por Type-C y decir la palabra de activación; solo es necesario volver a grabar el firmware al añadir palabras de comando personalizadas.

**P: ¿Admite comandos en inglés?**

**A:** Sí. Se admiten palabras de comando personalizadas en chino e inglés; modifíquelas con la herramienta web para generar el firmware y grábela en el módulo.

**P: ¿Cómo se comunica con el controlador anfitrión?**

**A:** El coprocesador STC8H integrado en placa convierte automáticamente los resultados del reconocimiento de voz en datos de puerto serie o IIC; se proporcionan tutoriales de comunicación para Arduino, Jetson, RDK, Raspberry Pi y PC, además de SDK de ROS1 / ROS2.

**P: ¿Cuál es la distancia de reconocimiento?**

**A:** Hasta el 99% de reconocimiento en un rango de 5 metros en entornos silenciosos; un entorno ruidoso afectará el reconocimiento.

---

## Precauciones

- Alimente con un voltaje de 5V; superar los 5V dañará el módulo
- El entorno de uso debe ser lo más silencioso posible; un entorno ruidoso afectará el rendimiento del reconocimiento
- Al pronunciar una entrada, hable con voz fuerte y clara y a un ritmo no demasiado rápido; se recomienda mantenerse a menos de 5 metros del módulo

---

## Soporte

- 📧 Correo: support@juxitech.com
- 🌐 Sitio oficial: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Comentarios](https://github.com/Juxi-Technology/wiki-documents/issues)
