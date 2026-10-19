---
title: "06 · Equipo sin monitor (tarjeta capturadora + OBS)"
description: "Dar teclado y ratón a una «placa de desarrollo / placa base sin monitor» — sin necesidad de darle un monitor propio: el vídeo pasa por una tarjeta capturador…"
---

# 06 · Equipo sin monitor (tarjeta capturadora + OBS)

> [← Volver a la descripción general](/es/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Producto aplicable: JUXI Technology KVM&HUB&TTL

Dar teclado y ratón a una «placa de desarrollo / placa base sin monitor» — **sin necesidad de darle un monitor propio**: el vídeo pasa por una tarjeta capturadora al ordenador y el teclado/ratón pasan por el conmutador KVM.

## Cómo funciona

```
Placa de desarrollo (sin monitor) ──vídeo──→ tarjeta capturadora ──USB──→ su ordenador (imagen en una ventana de OBS)
Placa de desarrollo (sin monitor) ──teclado/ratón──→ ←── conmutador KVM ──→ su ordenador (mismo teclado/ratón)
```

## Pasos

**① Conectar el vídeo** (lleve la salida de vídeo del equipo a una **tarjeta capturadora HDMI 4K**, cuyo extremo USB va a su ordenador):

| Salida del equipo | Cableado |
|---|---|
| HDMI | Cable HDMI → tarjeta capturadora |
| Micro HDMI (Raspberry Pi, etc.) | Adaptador Micro-HDMI → cable HDMI → tarjeta capturadora |
| DP | Adaptador DP-HDMI → cable HDMI → tarjeta capturadora |

**② Conectar teclado/ratón**: conecte el teclado/ratón (o receptor inalámbrico) al puerto USB-A de este producto y pulse el botón para **cambiarlos a la placa de desarrollo**;

**③ Ver y operar**: en su ordenador, añada un «dispositivo de captura de vídeo» en **OBS** o **PotPlayer** — vea la pantalla de la placa y escriba con el teclado.

(Ilustración: material del tutorial 06 – Montaje placa + tarjeta capturadora, 07 – cableado de la tarjeta, 08 – guía de OBS, 09 – guía de PotPlayer)

## Consejos

- Conecte la tarjeta capturadora **directamente al ordenador** (no a través de los puertos USB del KVM) para una imagen estable;
- Tras cambiar el teclado/ratón, la placa deja de responder a ellos — pulse el botón una vez para volver.

<RelatedProducts slugs="kvm-switch" />
