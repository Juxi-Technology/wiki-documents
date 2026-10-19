---
title: "03 · Bluetooth"
description: "El dispositivo incorpora un módulo Bluetooth (el lado inalámbrico del mismo canal serie que el puerto TTL de 6 pines): al conectar una placa de desarrollo o …"
---

# 03 · Bluetooth

> [← Volver a la descripción general](/es/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Producto aplicable: JUXI Technology KVM&HUB&TTL

## Para qué sirve el Bluetooth

El dispositivo incorpora un módulo Bluetooth (**el lado inalámbrico del mismo canal serie que el puerto TTL de 6 pines**): al conectar una placa de desarrollo o un sensor al puerto TTL, sus datos se emiten no solo por el puerto serie del PC, sino **también simultáneamente por Bluetooth**; conecte un móvil y podrá enviar y recibir datos de forma inalámbrica.

> Para el cableado, consulte [04 - Puerto serie TTL](/es/tutorials/accessories/kvm-switch/04-TTL-Serial-Port). La conexión Bluetooth y la transferencia de datos **no se ven afectadas por el cambio de ordenador** (el enlace se mantiene sea cual sea el ordenador seleccionado).

## Cómo funciona (lea esto primero)

⚠️ **El Bluetooth no es un «mando a distancia»** — es un **cable serie inalámbrico**: transporta datos serie entre el «dispositivo conectado al conector de 6 pines» y su «móvil/ordenador». **Sin un dispositivo externo conectado, una conexión Bluetooth no muestra ningún dato: es normal.**

```
【Dispositivo externo】     【Este producto】            【Usted】
 Placa/sensor ──6 pines──> paso de serie ──┬─ cable → serie del PC (USB-BLE-SERIAL CH9143)
 (genera/recibe datos)                     └─ inalámbrico → Bluetooth del móvil/PC (app BleUart)
```

**Ejemplo 1: ver datos de actitud de una IMU de forma inalámbrica**

1. Conecte TX/RX/GND/5V del módulo IMU al conector de 6 pines (cruzado, con alimentación — ver 04); la IMU empieza a emitir datos;
2. Mantenga pulsado el botón de cambio unos 3 segundos para entrar en modo Bluetooth (el LED se enciende);
3. Conecte la app BleUart del móvil a `CH9143BLE2U`;
4. En el móvil aparecen inmediatamente tramas de datos continuas (unos 80 fotogramas por segundo de datos de actitud en nuestra prueba);
5. Al mismo tiempo, una herramienta serie del PC que abra `USB-BLE-SERIAL CH9143` muestra exactamente los mismos datos.

**Ejemplo 2: depuración inalámbrica de Raspberry Pi / Jetson**

1. Conecte Pin8(TXD)/Pin10(RXD)/GND de la Raspberry Pi al conector de 6 pines (cruzado);
2. Arranque la Raspberry Pi; el registro de arranque se emite por el puerto serie;
3. Conecte la app BleUart del móvil para **ver el registro de arranque de forma inalámbrica**;
4. Lo que escriba y envíe en la app sale por TXD del conector de 6 pines hacia la Raspberry Pi — el móvil se convierte en una **consola serie inalámbrica** (iniciar sesión, enviar comandos).

## Pasos de conexión del móvil (4 pasos)

1. **Mantenga pulsado el botón de cambio unos 3 segundos** hasta que el LED se encienda — modo Bluetooth (nombre anunciado: `CH9143BLE2U`);
2. Instale en el móvil la app oficial de WCH **«BleUart»** (búsquela en la tienda de aplicaciones; gratuita);
3. Abra la app → toque «Conectar Bluetooth» → seleccione **CH9143BLE2U** en la lista;
4. Conexión correcta (**sin contraseña**) — ya puede enviar y recibir datos.

(Ilustración: material del tutorial 04 – Pulsación larga para entrar en modo Bluetooth)

## ⚠️ Avisos importantes

- **No utilice el «emparejamiento» Bluetooth de los ajustes del sistema del móvil**: pedirá un PIN y ningún PIN funcionará — conecte siempre los dispositivos BLE directamente con la **app BleUart**;
- El módulo Bluetooth **solo admite un dispositivo anfitrión a la vez** (mientras un móvil está conectado, un ordenador no puede conectarse por Bluetooth, y viceversa). El **puerto serie** (USB) del PC no está afectado y puede usarse al mismo tiempo.

## Solución de problemas

| Problema | Solución |
|---|---|
| No aparece CH9143BLE2U | Mantenga pulsado el botón de nuevo hasta que el LED se encienda; compruebe que está a menos de 10 m |
| Pide PIN / no conecta | Cancele el emparejamiento del sistema y use la app BleUart |
| La app no conecta | Puede estar ocupado por otro dispositivo (p. ej., un ordenador); desconecte la otra conexión primero |
| Conectado pero sin datos | El Bluetooth transporta los datos serie del conector de 6 pines — compruebe primero que el dispositivo externo está conectado al puerto TTL (ver 04) |

<RelatedProducts slugs="kvm-switch" />
