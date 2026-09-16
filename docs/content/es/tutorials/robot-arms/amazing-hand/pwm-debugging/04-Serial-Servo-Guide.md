---
title: "04-Versión con servos de puerto serie - Instrucciones de uso"
description: "Versión con servos de bus oficiales SCS0009 — Instrucciones de uso"
---

# 04-Versión con servos de puerto serie - Instrucciones de uso

Versión con servos de bus oficiales SCS0009 — Instrucciones de uso

> **Si ha comprado la versión con servos PWM (ESP32-S3 + 8 canales PWM), ignore este directorio**,
utilice `..\01_gui_control` o `..\02_hand_tracking`.

Este directorio describe la situación de soporte de los **servos de bus SCS0009 originales oficiales** de AmazingHand.

## Estado actual

El `..\02_hand_tracking\Demo` de este delivery_package admite simultáneamente dos backends de servos, que pueden cambiarse sin problemas mediante configuración:

|Versión|Tipo de servo|Velocidad en baudios|Archivo de configuración|
|---|---|---|---|
|**PWM** (entrega principal de este paquete)|ESP32-S3 accionamiento directo PWM|115200|`{l,r}_hand_pwm.toml`|
|**SCS0009** (original oficial)|Servos de bus oficiales|1,000,000|`{l,r}_hand.toml`|

- **Versión PWM**: seleccione en el menú `3 - PWM 舵机(ESP32 直驱)` y use el tutorial de este paquete.

- **Versión SCS0009**: seleccione en el menú `2 - 真实硬件(SCS0009 总线舵机)`.

## Método de uso de la versión SCS0009

1. Hardware: servos de bus oficiales + adaptador de puerto serie (velocidad en baudios 1M).

2. Despliegue: `Demo\Windows_Scripts_CN\3-部署代码.bat` (o el script correspondiente de Linux).

3. Ejecución: 4-运行代码.bat → seleccione `2 - 真实硬件(SCS0009 总线舵机)` → elija el tipo de mano.

4. Para una descripción detallada, consulte `..\02_hand_tracking\Demo\双版本舵机并存说明.md`
y `Demo\Windows_Scripts_CN\Windows使用教程.md` (tutorial oficial).

## Notas

- SCS0009 requiere la configuración oficial de id de servo (ya incorporada en `{l,r}_hand.toml`); la versión PWM no la utiliza.

- Los dos tipos de servos **solo pueden conectarse de a un conjunto a la vez**; basta con cambiar el hardware + la opción del menú.

- Este paquete tiene la versión PWM como entrega principal; para el tutorial oficial de SCS0009, tome como referencia el Demo oficial.

