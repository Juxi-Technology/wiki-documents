---
title: Interfaces y disposición del hardware
sidebar_label: Interfaces y disposición del hardware
slug: /product/interfaces
description: >-
  Distribución etiquetada y referencia de conectores del kit de desarrollo
  NVIDIA Jetson AGX Orin: botones, puertos, conectores de la placa portadora,
  opciones de visualización y almacenamiento, el conector de 40 pines y el
  conector de automatización.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-23
review_owner: cheny
---

# Interfaces y disposición del hardware

El kit de desarrollo tiene dos sistemas de referencia: las **etiquetas numeradas
(0–12) de las vistas laterales**, que utilizan la guía oficial de NVIDIA y esta
página, y los **números de conector de la placa portadora (números J)** impresos
en la PCB. Tenga ambos a mano: el resto de nuestras guías los mencionan.

## Vistas laterales — partes etiquetadas

![Kit de desarrollo, vista del botón y la entrada DC](/images/jetson-agx-orin/jaodk_labeled_01.png)
![Kit de desarrollo, vista de la cubierta PCIe y el conector de 40 pines](/images/jetson-agx-orin/jaodk_labeled_02.png)

| # | Parte | Notas |
|---|---|---|
| 0 | LED blanco | Indicador de encendido |
| 1 | Botón de encendido | |
| 2 | Botón de recuperación forzada | Se utiliza para los modos de recuperación y flasheo |
| 3 | Botón de reinicio | |
| 4 | Puerto USB Type-C | Solo DFP (conectar periféricos) |
| 5 | Conector de alimentación DC | Conector de barril — consulte J41 para las especificaciones |
| 6 | Puerto Ethernet | |
| 7 | USB Type-A ×2 | USB 3.2 Gen 2 |
| 8 | Salida DisplayPort | **La única interfaz de visualización del kit** |
| 9 | Puerto USB micro-B | Para depuración |
| 10 | Puerto USB Type-C | Flasheo y datos (UFP y DFP) |
| 11 | Conector de 40 pines | |
| 12 | USB Type-A ×2 | USB 3.2 Gen 1 |

## Placa portadora — conectores

| Marca | Conector | Especificación / notas |
|---|---|---|
| DS2 | LED blanco | |
| S1 / S2 / S3 | Botones de encendido / reinicio / recuperación forzada | |
| J24 | USB Type-C (encima del conector DC) | Solo DFP, USB 3.2 Gen 2 — **aquí se conecta la fuente de alimentación USB-C incluida** |
| J41 | Conector de alimentación DC | 5.5 mm OD, 2.5 mm ID, centro positivo |
| J17 | Ethernet | Hasta 10GBASE-T |
| J33 | USB Type-A ×2 (junto a Ethernet) | USB 3.2 Gen 2 |
| J18 | Salida DisplayPort | Compatible con MST |
| J26 | USB micro-B | UART de depuración |
| J40 | USB Type-C (junto al conector de 40 pines) | UFP y DFP — **el puerto que se usa para conectar con un PC host para SDK Manager** |
| J30 | Conector de 40 pines | El pin 1 está marcado con un triángulo blanco en la PCB |
| J42 | Conector de automatización | Encendido automático, wake-on-LAN, activador de throttling (pines abajo) |
| J13 | Conector de batería de respaldo del RTC | |
| J509 | Conector de cámara | |
| J502 | Conector de depuración JTAG | |
| J505 | Ranura M.2 E-Key | Normalmente aloja el módulo Wi-Fi |
| J511 | Conector de audio HD | |
| J1 | Ranura M.2 M-Key | Para una SSD NVMe |
| J10 | Ranura para tarjeta microSD | UHS-1 |
| J3 | Conector del módulo Jetson | 699 pines |
| J6 | Conector PCIe x16 | PCIe 4.0 ×8 eléctricos |
| J9 | Conector del ventilador | 4 pines, paso de 1.25 mm |

> **Las tres cosas que la gente pregunta primero:**
> - **Visualización:** DisplayPort (J18) es la *única* salida de visualización — no
>   hay puerto HDMI ni DisplayPort sobre USB-C. Para un monitor HDMI, use un
>   adaptador o cable activo DP→HDMI.
> - **Alimentación:** la fuente de alimentación USB-C incluida se conecta a **J24**
>   (el puerto USB-C situado encima del conector DC). También dispone de una
>   entrada de barril independiente (J41) si utiliza su propia fuente de
>   alimentación.
> - **Conexión con el PC host:** para SDK Manager o una consola serie, use **J40**
>   (el puerto USB-C junto al conector de 40 pines), no J24.

## Salida DisplayPort

- Compatible con DP SST, DP MST (hasta 2 pantallas externas) y DP DSC
- Resolución máxima: 8K@30 / 4K@120 (con o sin DSC)
- Formatos de salida: RGB 8/10 bpc, YUV444 8/10 bpc

## Opciones de almacenamiento

- **Predeterminado:** memoria flash eMMC en el módulo
- **Opcional:** SSD NVMe (M.2 M-Key, J1) · tarjeta microSD (J10, UHS-1) · unidad USB

El instalador ISO de Jetson puede instalar el sistema en la eMMC o en una NVMe;
SDK Manager puede flashear el BSP L4T base en cualquiera de los medios de
almacenamiento compatibles.

## Conector de 40 pines (J30)

![Distribución de pines del conector de 40 pines](/images/jetson-agx-orin/jao_cbspec_figure_3-4_black-bg.png)
*Distribución de pines del conector de 40 pines — de la Carrier Board Specification de NVIDIA.*

![Marca del pin 1 en el conector de 40 pines](/images/jetson-agx-orin/jao_40pin_pin1_marking.png)
*El pin 1 está marcado con un triángulo blanco en la PCB.*

## Conector de automatización (J42)

Se utiliza para el cableado de producción y automatización:

- Pines 1, 12: GND
- Pines 2, 3, 4: entradas, con la misma función que los botones de recuperación, reinicio y encendido
- Pines 5–6: abierto = encendido automático deshabilitado; puenteado = encendido automático habilitado
- Pin 7: salida CVB_STBY — indica si el módulo está en suspensión
- Pin 8: entrada SYSTEM_OC — activa el throttling de Tegra
- Pines 9–10: abierto = wake/boot-on-LAN desde apagado deshabilitado; puenteado = habilitado
- Pin 11: JTAG_TRST — reinicio de prueba de JTAG

## Fuentes

- [Hardware Layout — Jetson AGX Orin Developer Kit User Guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html) (consultado el 2026-09-23)
- Para obtener más detalles sobre la placa portadora, consulte la *NVIDIA Jetson AGX Orin Developer Kit Carrier Board Specification* (enlazada desde la [página de descargas](https://developer.nvidia.com/embedded/downloads) de NVIDIA)

*Estado: revisado el 2026-10-11. Los pasos y valores anteriores
se basan en la documentación oficial de NVIDIA a la fecha indicada; aún no han
sido verificados en hardware físico por Juxi Technology.*

**Créditos de las imágenes:** los diagramas de distribución y las imágenes de
pinout son de la *Jetson AGX Orin Developer Kit User Guide* y la *Carrier Board
Specification* oficiales de NVIDIA (descargadas el 2026-09-23) y siguen siendo
© NVIDIA Corporation.

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página es
publicada por Juxi Technology y no es una publicación de NVIDIA.
