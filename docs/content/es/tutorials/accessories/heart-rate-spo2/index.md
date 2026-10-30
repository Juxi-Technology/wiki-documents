---
title: "Tutorial de uso del módulo sensor de frecuencia cardíaca y SpO2 MAX30102"
description: "Tutorial completo del módulo sensor de frecuencia cardíaca y SpO2 MAX30102: información del producto, versión web, Arduino, Raspberry Pi y software de PC."
---

# Tutorial de uso del módulo sensor de frecuencia cardíaca y SpO2 MAX30102

Este tutorial presenta el uso del módulo sensor de frecuencia cardíaca y SpO2 MAX30102 de Juxi Technology. El módulo incorpora el chip dedicado de detección de frecuencia cardíaca y SpO2 MAX30102 de Maxim, incluye un algoritmo propio de frecuencia cardíaca y SpO2 y puede entregar directamente la frecuencia cardíaca, la saturación de oxígeno y la temperatura de la placa; admite dos modos de comunicación: I2C y UART.

## Índice de tutoriales

| Contenido | Descripción |
|---|---|
| [Información del producto](./product-info.md) | Descripción general, principio de detección, especificaciones técnicas, definición de pines y escenarios de aplicación típicos |
| [Tutorial de la versión web](./web-console.md) | Conexión directa mediante Web Serial en el navegador, sin instalar software |
| [Tutorial de Arduino](./arduino.md) | Cableado, instalación de la biblioteca, código de ejemplo, API y preguntas frecuentes |
| [Tutorial de Raspberry Pi](./raspberry-pi.md) | Cableado I2C / UART, configuración del entorno, código de ejemplo y API |
| [PC · Ejecución con Python](./pc/python.md) | Adaptador USB a TTL + script de Python para leer los datos |
| [Software de PC](./pc/upper-computer.md) | Software gráfico para PC: configuración del puerto serie, adquisición y monitorización en tiempo real |

## Inicio rápido

1. Lea primero la [información del producto](./product-info.md) y confirme la alimentación (3,3–5 V) y la definición de pines;
2. Si solo quiere ver datos rápidamente: use el [tutorial de la versión web](./web-console.md); basta con abrir la página en Chrome / Edge;
3. Para conectarlo a un microcontrolador: consulte el [tutorial de Arduino](./arduino.md);
4. Para conectarlo a una Raspberry Pi: consulte el [tutorial de Raspberry Pi](./raspberry-pi.md);
5. Para conectarlo a un ordenador: consulte [PC · Ejecución con Python](./pc/python.md) o el [software de PC](./pc/upper-computer.md).

> Este producto es un módulo de detección electrónico de consumo y no es un dispositivo médico profesional; los datos de medición solo sirven como referencia de salud cotidiana.

<RelatedProducts slugs="heart-rate-spo2" />
