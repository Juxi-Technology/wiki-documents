---
title: Interfaces y disposición del hardware
sidebar_label: Interfaces y disposición del hardware
slug: /product/interfaces
description: >-
  Disposición etiquetada y referencia de conectores del kit de desarrollo
  NVIDIA Jetson Orin Nano Super — todos los puertos, ranuras, conectores y
  controles, la ranura microSD de la parte inferior, los conectores de cámara,
  la alimentación y la consola serie.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/slow-wi-fi-on-orin-nano-devkit-rtl8822ce-802-11ac/368697
    checked: 2026-09-26
review_owner: cheny
---

# Interfaces y disposición del hardware

El kit son dos placas: el **módulo Jetson Orin Nano** (P3767) sobre la
**placa portadora de referencia** (P3768); el kit completo es P3766. Esta página
cubre los conectores y controles, usando las marcas oficiales de NVIDIA (1–12).

## Disposición numerada — partes etiquetadas

![Disposición numerada del kit de desarrollo](/images/jetson-orin-nano/jetson-orin-nano-qtr_numbered.png)
*La disposición numerada oficial — marcas 1–12 de NVIDIA.*

| # | Parte | Notas |
|---|---|---|
| 1 | Ranura para tarjeta microSD | En la **parte inferior del módulo** — véase más abajo |
| 2 | Conector de expansión de 40 pines | UART, SPI, I2S, I2C, GPIO |
| 3 | LED indicador de alimentación | Verde; se ilumina cuando el kit recibe alimentación |
| 4 | Puerto USB-C | Modos host, dispositivo y recuperación USB; sin salida de video |
| 5 | Puerto Ethernet Gigabit | RJ45 |
| 6 | USB 3.2 Type-A ×4 | 10 Gbps; dos conectores de doble pila |
| 7 | Salida DisplayPort | **La única salida de visualización del kit** |
| 8 | Conector de alimentación DC | Conector de barril de 5.5 mm × 2.5 mm |
| 9 | Conectores de cámara MIPI CSI ×2 | 22 pines, paso de 0.5 mm |
| 10 | Ranura M.2 Key-M (2280) | PCIe 3.0 ×4 — para un SSD NVMe |
| 11 | Ranura M.2 Key-M (2230) | PCIe 3.0 ×2 — para un SSD NVMe |
| 12 | Ranura M.2 Key-E (2230) | Poblada con el módulo inalámbrico incluido |

> **Tres cosas que conviene saber primero:**
> - **Almacenamiento:** sin eMMC y **sin almacenamiento en la caja**. Añada una tarjeta microSD o un SSD NVMe.
> - **Ranura microSD:** en la **parte inferior del módulo** — véase más abajo.
> - **Visualización:** DisplayPort es la *única* salida de visualización — sin HDMI, sin video por USB-C.

## Ranura microSD — parte inferior del módulo

![La ranura microSD en la parte inferior del módulo](/images/jetson-orin-nano/jetson-orin-nano-dev-kit-sd-slot.jpg)
*La tarjeta se inserta en la **parte inferior del módulo** — imagen de NVIDIA, con un recuadro ampliado.*

> **Atención:** la ranura microSD (marca 1) está en la **parte inferior del
> módulo**, no en la placa portadora. Es el detalle físico que más se pasa por
> alto en este kit. Inserte la tarjeta antes de arrancar el instalador.

- El kit arranca desde la tarjeta microSD cuando hay una insertada; se recomienda UHS-1 de 64 GB o más.
- Si el instalador no muestra la tarjeta, la guía de solución de problemas de
  NVIDIA indica confirmar que la tarjeta esté insertada del todo en la ranura del módulo.
- JetPack 7.2 y posteriores no tienen imágenes de tarjeta SD. Para cambiar lo que está instalado,
  use una ruta de instalación compatible — consulte **[Flasheo y actualizaciones](/es/tutorials/jetson-orin-nano/flashing-and-updates)**.

## Opciones de almacenamiento

- **microSD** (parte inferior del módulo, marca 1) — el almacenamiento principal del módulo.
- **SSD NVMe** — tamaño 2280 o 2230 en las ranuras M.2 Key-M (marcas 10 y 11, más abajo).
- **Unidad USB** — en USB-C o Type-A; el orden de arranque se configura en el gestor de arranque de la UEFI.

Consulte el **[Inicio rápido](/es/tutorials/jetson-orin-nano/quick-start)** para saber qué comprar y el flujo del primer arranque.

## USB

| Puerto | Velocidad | Modos | Notas |
|---|---|---|---|
| USB 3.2 Type-A ×4 (marca 6) | USB 3.2 Gen 2, 10 Gbps | Solo host | Dos conectores de doble pila; VBUS limitado a 3 A por pila |
| USB-C (marca 4) | USB 3.2 Type-C | Host, dispositivo, USB Recovery | Solo datos — este puerto no emite video |

En **modo dispositivo**, el puerto USB-C presenta el kit a un PC host como:

- un dispositivo de almacenamiento masivo con el archivo **L4T-README**;
- un dispositivo serie USB;
- un enlace Ethernet por USB (RNDIS) — el Jetson está en **192.168.55.1**.

## Salida DisplayPort

- Una sola salida (marca 7): **DisplayPort 1.2 con MST**. No hay puerto HDMI
  y el puerto USB-C no transporta video.
- Para un monitor HDMI, use un adaptador DisplayPort a HDMI.
- Si no hay salida de visualización, conecte el monitor directamente — sin conmutador KVM
  ni cadena de adaptadores.

## Ethernet

- 1× Ethernet Gigabit (RJ45), marca 5. El kit no tiene puerto 10 GbE.

## Ranuras M.2

| Marca | Ranura | Tamaño | Eléctrico | Compatible con |
|---|---|---|---|---|
| 10 | M.2 Key-M | 2280 | PCIe 3.0 ×4 | SSD NVMe |
| 11 | M.2 Key-M | 2230 | PCIe 3.0 ×2 | SSD NVMe |
| 12 | M.2 Key-E | 2230 | — | El módulo inalámbrico incluido (poblada) |

### Módulo inalámbrico

- La ranura Key-E se envía **poblada**. NVIDIA describe la tarjeta solo como
  «un controlador de interfaz de red inalámbrica 802.11ac/ab/gn» — sin nombre de chip.
- Informes de la comunidad (sin confirmar) identifican la tarjeta de serie como una **Realtek
  RTL8822CE** (módulo AzureWave, ID PCI 10ec:c822). Esta es información de la
  comunidad, no una declaración de NVIDIA.
- Los modelos de NVMe y módulos Key-E con soporte oficial están en la lista «Jetson
  supported components information» del Centro de Descargas de Jetson, no en
  una página pública. Compruebe el componente allí antes de comprar.
- Si la tarjeta no detecta su red — por ejemplo, un router de 6 GHz con
  MBSSID — consulte **[Solución de problemas → Wi-Fi no detecta la red](/es/tutorials/jetson-orin-nano/troubleshooting)**.

## Conectores de cámara CSI

- Dos conectores (marca 9): 22 posiciones, paso de 0.5 mm, flex de contacto inferior.
- **CAM0:** CSI de 1×2 carriles. **CAM1:** CSI de 1×2 carriles o 1×4 carriles.
- Una cámara de 15 pines (por ejemplo, el Raspberry Pi Camera Module v2) necesita un cable de 15 a 22 pines.

## Conector de expansión de 40 pines (marca 2)

- GPIO e interfaces de periféricos: UART, SPI, I2S, I2C, GPIO.
- Para asignaciones de pines, niveles de tensión y límites eléctricos, NVIDIA remite
  a la *Jetson Orin Nano Developer Kit Carrier Board Specification* (Centro de
  Descargas de Jetson). No se pudo acceder a ese documento para esta página.

## Conector de botones (12 pines)

El conector de botones incluye las funciones de consola serie, reinicio y recuperación forzada.

| Pines | Función |
|---|---|
| 3 (RXD), 4 (TXD), 7 (GND) | Consola serie (UART) |
| 9 + 10 | Modo Force Recovery — puentee los pines y luego encienda |
| 7 + 8 | Reinicio — puentee los pines con el sistema encendido |
| puente | Define el comportamiento de encendido automático |

### Consola serie

- Conecte un adaptador serie USB-TTL: TX del adaptador al pin 3 (RXD), RX al pin 4 (TXD), GND al pin 7.
- Esta es la alternativa headless. Consulte **[Solución de problemas](/es/tutorials/jetson-orin-nano/troubleshooting)**
  para saber cómo capturar los registros de arranque.

### Force Recovery y reinicio

- **Modo Force Recovery:** conecte los pines 9 y 10 y luego encienda el kit.
- **Reinicio:** con el kit encendido, puentee los pines 7 y 8.
- El modo Force Recovery se usa para los flujos de flasheo — consulte **[Flasheo y actualizaciones](/es/tutorials/jetson-orin-nano/flashing-and-updates)**.

## Alimentación

- **Conector de alimentación DC (marca 8):** conector de barril de 5.5 mm × 2.5 mm; use la fuente
  de alimentación de 19 V incluida.
- **Encendido automático:** de forma predeterminada, el kit se enciende en cuanto se conecta
  la alimentación DC. Un puente en el conector de botones cambia este comportamiento.
- **LED de alimentación (marca 3):** un LED verde junto al conector USB-C se ilumina cuando
  el kit recibe alimentación.
- Las páginas de NVIDIA consultadas no indican la corriente nominal de la fuente incluida ni
  la polaridad del conector. Para una fuente de terceros, confirme ambos datos con su proveedor.

## Conector del ventilador

- La placa portadora tiene un conector de ventilador de 4 pines.
- El módulo se envía con un disipador de calor; las imágenes oficiales muestran el ventilador
  integrado en la cubierta del disipador. El conector es para soluciones térmicas de repuesto.
- Las páginas de NVIDIA consultadas no indican el rango de temperatura de funcionamiento del
  módulo ni los límites de Tj — están en la *Jetson Orin Nano Series Data Sheet* y la
  *Orin NX/Orin Nano Thermal Design Guide*, ambas en el Centro de Descargas con inicio de
  sesión obligatorio.

## Dimensiones

- **Módulo:** 69.6 mm × 45 mm, conector SO-DIMM de 260 pines.
- **Kit:** dos cifras oficiales no coinciden — la hoja de datos (dic. 2024) indica
  **103 mm × 90.5 mm × 34.77 mm**; la tabla de la familia de productos de NVIDIA indica
  **100 mm × 79 mm × 21 mm**. Ambas definen la altura incluyendo las patas, la placa
  portadora, el módulo y la solución térmica.
- NVIDIA no ha publicado ninguna conciliación. Una explicación de un distribuidor (el kit
  sobre su base frente a la placa portadora por sí sola) está **sin verificar**.

> **Nota de Juxi:** confirme las dimensiones en la hoja de datos actual de NVIDIA antes de diseñar una carcasa.

## Fuentes

- [Hardware Layout — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (consultado el 2026-09-26)
- [Quick Start — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (consultado el 2026-09-26)
- [How-To — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (consultado el 2026-09-26)
- [Troubleshooting — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html) (consultado el 2026-09-26)
- [Jetson Orin Nano Super Developer Kit datasheet (PDF, Dec 2024)](https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf) (consultado el 2026-09-26)
- [Jetson Orin NX/Nano Series — Module Adaptation and Bring-Up, L4T r39.2 Developer Guide](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html) (consultado el 2026-09-26)
- [Familia de productos Jetson Orin — developer.nvidia.com](https://developer.nvidia.com/embedded/jetson-orin) (consultado el 2026-09-26)
- [Foros de desarrolladores de NVIDIA — «Slow Wi-Fi on Orin Nano DevKit (RTL8822CE)», hilo de la comunidad](https://forums.developer.nvidia.com/t/slow-wi-fi-on-orin-nano-devkit-rtl8822ce-802-11ac/368697) (consultado el 2026-09-26)

*Estado: revisado el 2026-10-11. Basado en la documentación oficial
de NVIDIA en las fechas indicadas; aún no verificado en hardware físico por
Juxi Technology.*

**Créditos de las imágenes:** las imágenes de disposición son de la *Jetson Orin
Nano Developer Kit User Guide* oficial de NVIDIA (descargada el 2026-09-26),
© NVIDIA Corporation.

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página es publicada
por Juxi Technology y no es una publicación de NVIDIA.
