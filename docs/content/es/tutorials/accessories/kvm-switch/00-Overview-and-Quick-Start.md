---
title: "Conmutador KVM · Descripción general del tutorial"
description: "Conmutador USB de teclado/ratón 2 entradas y 3 salidas: un teclado y un ratón (y periféricos) cambian entre dos ordenadores con solo pulsar un botón; HUB USB…"
---

# Conmutador KVM · Descripción general del tutorial

> Producto aplicable: conmutador de teclado/ratón para dos ordenadores **KVM&HUB&TTL** de JUXI Technology (USB 2.0)
> Versión v1.0 (2026-10-14) | El tutorial está dividido por módulos funcionales; consulte solo lo que necesite

---

## Buscar por módulo

| Lo que quiero hacer | Leer |
|---|---|
| Poner el dispositivo en marcha primero | Esta página → «Inicio rápido» |
| Cambiar teclado/ratón y periféricos entre dos ordenadores | [01 - Cambio entre dos ordenadores (botón y mando IR)](/es/tutorials/accessories/kvm-switch/01-Switching-Between-Two-Computers) |
| Usarlo como HUB USB (uno a tres) | [02 - Función HUB (uno a tres)](/es/tutorials/accessories/kvm-switch/02-HUB-Function-One-to-Three) |
| **Conectarme por Bluetooth del móvil, enviar/recibir datos** | [03 - Bluetooth](/es/tutorials/accessories/kvm-switch/03-Bluetooth) |
| **Cablear el puerto serie TTL de 6 pines, ver datos en el PC** | [04 - Puerto serie TTL (serie inalámbrica)](/es/tutorials/accessories/kvm-switch/04-TTL-Serial-Port) |
| **Conocer el conector de expansión de 10 pines** | [05 - Conector de expansión de 10 pines](/es/tutorials/accessories/kvm-switch/05-10-Pin-Expansion-Header) |
| Controlar una placa de desarrollo/equipo sin monitor | [06 - Equipo sin monitor (tarjeta capturadora + OBS)](/es/tutorials/accessories/kvm-switch/06-Headless-Host-Capture-Card-and-OBS) |
| Preguntas frecuentes y precauciones | [07 - Preguntas frecuentes y precauciones](/es/tutorials/accessories/kvm-switch/07-FAQ-and-Precautions) |

## El producto en una frase

**Conmutador USB de teclado/ratón 2 entradas y 3 salidas**: un teclado y un ratón (y periféricos) cambian entre dos ordenadores con solo pulsar un botón; HUB USB de 3 puertos integrado; además, una **función de serie inalámbrica**: conecte el puerto serie de una placa de desarrollo o sensor al conector de 6 pines y los datos se transmiten simultáneamente al puerto serie del PC y al móvil por Bluetooth.

## Interfaces de un vistazo

| Ubicación | Nombre | Descripción |
|---|---|---|
| Lado izquierdo / derecho | Puertos PC1 / PC2 (Type-C) | Conectan los dos ordenadores |
| Parte inferior | USB-A × 3 | Teclado/ratón, memoria USB, impresora, etc. — cambian en bloque |
| Parte superior | Puerto de alimentación (Type-C) | Alimentación auxiliar (cuando la del equipo no basta) |
| Centro | Botón de cambio | Pulsación corta = cambiar; pulsación larga = modo Bluetooth |
| Arriba a la izquierda | Receptor infrarrojo | Funciona con el mando a distancia IR |
| Abajo a la derecha | Puerto serie TTL (6 pines) | Función de serie inalámbrica (ver 04) |
| Abajo a la derecha | Conector de 10 pines | Interfaz de expansión (ver 05) |
| Arriba a la derecha | Módulo Bluetooth (integrado) | Función de serie inalámbrica (ver 03) |

**Indicadores LED**: PC1/PC2 (canal actual) | Alimentación | UART serie (parpadea al transmitir) | Bluetooth (se enciende tras pulsación larga)

## Inicio rápido (5 minutos)

1. Ordenador A → cable Type-C → puerto **PC1**; ordenador B → puerto **PC2** (también vale con uno solo; entonces es simplemente un HUB USB);
2. Conecte el teclado/ratón (o receptor inalámbrico) a cualquier puerto **USB-A**;
3. Pulse el botón de cambio y compruebe con el **LED PC1/PC2** a qué ordenador está conectado;
4. Si la alimentación del equipo no basta, conecte también alimentación Type-C al **puerto de alimentación**.

(Ilustración: material del tutorial 01 – Distribución de funciones)

## Dos avisos importantes

- Este producto **no conmuta vídeo**: cada ordenador usa su propio monitor. Para un equipo sin monitor, utilice la solución con tarjeta capturadora (ver 06);
- Este producto es **USB 2.0**: suficiente para teclado/ratón, impresoras, memorias USB y dongles; para almacenamiento rápido, recomendamos conectarlo directamente al ordenador.

---

*(Para los detalles de cada módulo funcional, pulse la entrada correspondiente en la tabla «Buscar por módulo».)*

<RelatedProducts slugs="kvm-switch" />
