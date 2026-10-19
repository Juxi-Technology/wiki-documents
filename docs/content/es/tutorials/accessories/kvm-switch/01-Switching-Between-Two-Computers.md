---
title: "01 · Cambio entre dos ordenadores (botón y mando IR)"
description: "Un teclado y un ratón (y los periféricos conectados a los puertos USB-A) cambian entre dos ordenadores; solo uno está conectado a la vez."
---

# 01 · Cambio entre dos ordenadores (botón y mando IR)

> [← Volver a la descripción general](/es/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Producto aplicable: JUXI Technology KVM&HUB&TTL

Un teclado y un ratón (y los periféricos conectados a los puertos USB-A) cambian entre **dos ordenadores**; solo uno está conectado a la vez.

## Cómo cambiar

### ① Botón
Pulse el **botón de cambio** en el centro del dispositivo para alternar PC1 ⇄ PC2. El **LED PC1/PC2** del lado correspondiente se enciende e indica a qué ordenador está conectado.

### ② Mando a distancia IR
Apunte el **mando a distancia por infrarrojos** al receptor IR (esquina superior izquierda) y pulse la tecla de cambio del mando.
(La inclusión de mando depende del paquete adquirido.)

(Ilustración: material del tutorial 05 – Cambio por botón e infrarrojos)

## Dos formas de uso

| Forma | Conexión | Notas |
|---|---|---|
| Ambos ordenadores con monitor | Cada uno con su monitor | Teclado/ratón listos tras cambiar (ver Inicio rápido en 00) |
| Un ordenador sin monitor (placa de desarrollo, etc.) | El otro con monitor + solución de tarjeta capturadora | Ver [06 - Equipo sin monitor (tarjeta capturadora + OBS)](/es/tutorials/accessories/kvm-switch/06-Headless-Host-Capture-Card-and-OBS) |

## Comportamiento normal al cambiar

- Los dispositivos de los puertos USB-A desaparecen temporalmente del ordenador «actual» y aparecen en el otro (dongles/impresoras pueden tardar unos segundos en volver a detectarse);
- **El canal inalámbrico Bluetooth no se ve afectado por el cambio** (la conexión se mantiene). El puerto serie del PC se desconecta brevemente al cambiar y se recupera automáticamente al volver (ver [03](/es/tutorials/accessories/kvm-switch/03-Bluetooth)/[04](/es/tutorials/accessories/kvm-switch/04-TTL-Serial-Port)).

## Solución de problemas

**¿No responde al pulsar?** Compruebe el LED PC1/PC2 para ver el canal actual; asegúrese de que el ordenador de destino está conectado por Type-C y encendido; pulse de nuevo para volver al ordenador original y verificar.

<RelatedProducts slugs="kvm-switch" />
