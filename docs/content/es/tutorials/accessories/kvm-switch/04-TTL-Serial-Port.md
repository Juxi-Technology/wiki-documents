---
title: "04 · Puerto serie TTL (serie inalámbrica)"
description: "El puerto TTL de 6 pines es un puerto de paso de serie: conecte una placa de desarrollo, un sensor, etc."
---

# 04 · Puerto serie TTL (serie inalámbrica)

> [← Volver a la descripción general](/es/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Producto aplicable: JUXI Technology KVM&HUB&TTL

## Qué es

El puerto TTL de 6 pines es un **puerto de paso de serie**: conecte una placa de desarrollo, un sensor, etc., y sus datos serie se emiten «simultáneamente» por dos sitios (bidireccional):

```
                ┌─→ Puerto serie del PC (USB; el sistema lo reconoce como "USB-BLE-SERIAL CH9143")
Dispositivo externo → 6 pines ┤
                └─→ Bluetooth inalámbrico (app BleUart del móvil, ver 03)
```

**Referencia medida**: con un sensor IMU conectado, el puerto serie del PC y el Bluetooth recibieron simultáneamente unos 1650 bytes/segundo de forma estable.

## Patillaje y cableado

De izquierda a derecha: `GND` `RXD` `TXD` `TNOW` `3V3` `5V`

| Pin | Descripción | Cableado |
|---|---|---|
| GND | Tierra | Conectar al GND del dispositivo externo (**obligatorio**) |
| RXD | Recepción local | Conectar al **TXD** del dispositivo externo (cruzado) |
| TXD | Transmisión local | Conectar al **RXD** del dispositivo externo (cruzado) |
| TNOW | Indicador de dirección de transmisión | **Dejar sin conectar** |
| 3V3 | Salida de alimentación 3,3 V | Puede alimentar periféricos de bajo consumo (alternativa a 5V) |
| 5V | Salida de alimentación 5 V | Puede alimentar periféricos de bajo consumo (alternativa a 3V3) |

**Puntos clave**: TX/RX deben ir **cruzados**; nivel lógico **3,3 V**; los pines de alimentación son **salidas** — nunca inyecte alimentación por ellos; alimente solo módulos de bajo consumo.

(Ilustración: material del tutorial 12 – Ejemplo de cableado TTL)

## Uso en el ordenador

1. Conecte este producto al ordenador por Type-C (PC1 o PC2, cualquiera);
2. El sistema reconoce automáticamente el puerto serie **`USB-BLE-SERIAL CH9143`** (sin controladores en Windows 10/11);
3. Ábralo con cualquier herramienta serie; parámetros: **115200, 8N1**;
4. Los datos del dispositivo externo llegan en tiempo real (también puede enviarle datos).

## Conexión a placas de desarrollo (Raspberry Pi / Jetson)

Nivel lógico 3,3 V, conexión directa posible (cableado cruzado, GND conectado):

| Este producto | Raspberry Pi | Jetson (serie Orin, 40 pines) |
|---|---|---|
| RXD | Pin8 (GPIO14 / TXD) | Pin8 (UART1_TXD) |
| TXD | Pin10 (GPIO15 / RXD) | Pin10 (UART1_RXD) |
| GND | Cualquier GND (p. ej., Pin9) | Cualquier GND (p. ej., Pin9) |

> En Raspberry Pi hay que habilitar el puerto serie en `raspi-config`; en Jetson hay que habilitar primero el UART de 40 pines.
> Escenario típico: serie de la placa → KVM → escribir comandos en el PC y ver registros, mientras el móvil también los ve por Bluetooth (depuración inalámbrica).

(Ilustración: material del tutorial 10 – Patillaje de Jetson, 11 – Patillaje de Raspberry Pi)

## Solución de problemas: ¿no hay datos serie?

Compruebe en orden:
1. ¿El TX/RX del dispositivo externo está **cruzado** y el GND conectado?
2. ¿La velocidad en baudios del dispositivo externo es **115200**?
3. ¿El dispositivo externo tiene alimentación (puede usar los pines 5V/3V3 de este producto)?
4. ¿El puerto serie del PC está ocupado por otro programa? Al cambiar el dispositivo al otro ordenador, el puerto desaparece brevemente (normal).

<RelatedProducts slugs="kvm-switch" />
