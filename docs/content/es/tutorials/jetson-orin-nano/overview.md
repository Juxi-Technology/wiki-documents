---
title: Descripción general del producto — Kit de desarrollo Jetson Orin Nano Super
sidebar_label: Descripción general del producto
slug: /product/overview
description: >-
  Qué es el kit de desarrollo NVIDIA Jetson Orin Nano Super (8GB), para qué se
  utiliza y qué lugar ocupa en la familia Jetson Orin.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
review_owner: cheny
---

# Descripción general del producto

![Jetson Orin Nano Super Developer Kit](/images/jetson-orin-nano/jetson-orin-nano-super-developer-kit-hero.jpg)

El kit de desarrollo NVIDIA® Jetson Orin Nano™ Super es el kit de entrada de la
familia Jetson Orin: un pequeño ordenador de IA para prototipar aplicaciones de
visión por computador, robótica e IA generativa local en el borde. Ejecuta JetPack
7.2.1 (Jetson Linux / L4T r39.2.1), la versión actual para este kit.

## Datos clave (verificados con la documentación de NVIDIA)

- «Super» es una configuración de software, no hardware nuevo: el mismo módulo
  (P3767) y la misma placa portadora (P3768) que el anterior «Jetson Orin Nano Developer
  Kit», renombrados con la actualización Super. *(Developer Kit User Guide; anuncio
  Super Boost de NVIDIA)*
- Cifras destacadas del kit: hasta **67 INT8 TOPS**, hasta **102 GB/s** de ancho
  de banda de memoria, potencia de **7W a 25W** y una mejora de **1.7x en IA
  generativa** respecto a la generación anterior. *(Developer Kit User Guide — Introduction)*
- GPU Ampere con **1,024 núcleos CUDA y 32 Tensor Cores**; CPU **Arm
  Cortex-A78AE de 6 núcleos** de 64 bits hasta 1.7 GHz; **8GB LPDDR5 de 128 bits**. *(Hoja de datos;
  página de especificaciones de Jetson Orin)*
- Almacenamiento: una **ranura para tarjeta microSD en la parte inferior del módulo** y
  compatibilidad con **NVMe externo**; sin eMMC y sin almacenamiento en la caja. *(Hoja de datos;
  Inicio rápido)*
- Ejecuta JetPack **7.2.1** (L4T **r39.2.1**; Ubuntu 24.04, kernel 6.8, CUDA
  13.2.2, TensorRT 10.16.2) mediante el método de la Jetson ISO desde una unidad USB.
  Rango compatible: JetPack 6.x o 7.2/7.2.1 (7.0/7.1 no admitían Orin).
  *(Inicio rápido; descargas de JetPack; archivo de JetPack)*
- Placa portadora: DisplayPort, Ethernet Gigabit, cuatro puertos USB 3.2 Type-A,
  USB-C, dos conectores MIPI CSI, tres ranuras M.2 y conector de 40 pines. Consulte
  **[Interfaces y disposición del hardware](/es/tutorials/jetson-orin-nano/interfaces)**. *(Developer Kit User
  Guide — Hardware Layout)*

## Qué significa «Super»

El aumento de rendimiento Super se consigue con un modo de alimentación por
software que eleva las frecuencias de la GPU, la memoria y la CPU en el mismo
hardware, y NVIDIA afirma que los kits existentes lo obtienen actualizando JetPack: «Los
usuarios actuales del Jetson Orin Nano Developer Kit pueden obtener el aumento de
rendimiento "Super" con una actualización de software.» *(Developer Kit User Guide; anuncio
Super Boost de NVIDIA)*

La tabla siguiente compara el kit original con la configuración Super.
*(anuncio Super Boost de NVIDIA)*

| Elemento | Kit de desarrollo Orin Nano original | Configuración Super |
|---|---|---|
| Frecuencia de GPU | 635 MHz | 1,020 MHz |
| Frecuencia de CPU | 1.5 GHz | 1.7 GHz |
| Ancho de banda de memoria | 68 GB/s | 102 GB/s |
| Rendimiento de IA (INT8 disperso) | 40 TOPS | 67 TOPS |
| Cómputo FP16 | 10 TFLOPs | 17 TFLOPs |
| Modos de alimentación | 7W, 15W | 7W, 15W, 25W |
| Precio (en el lanzamiento de Super, dic. 2024) | $499 | $249 |

*En una cifra, los propios materiales de NVIDIA difieren: el anuncio de Super describe
el ancho de banda de memoria anterior como «65 GB/s», mientras que las tablas de
especificaciones de módulos de NVIDIA indican 68 GB/s para la configuración original
de 8 GB. La tabla anterior usa la cifra de las especificaciones; ambas se refieren al
mismo hardware previo a Super.*

Para conocer el precio actual, consulte la [ficha del producto en la tienda Juxi](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit)
(SKU JX00110).

A partir de JetPack 7.2.1, la Jetson ISO flashea el kit con la configuración
Super de forma predeterminada *(página de descargas de JetPack)*. Las unidades instaladas
por primera vez con la ISO de JetPack 7.2 pueden conservar un perfil sin Super; si falta
25W o MAXN SUPER, consulte **[Solución de problemas](/es/tutorials/jetson-orin-nano/troubleshooting)**.

En la tabla de modos de alimentación de L4T r39.2, la configuración Super incluye
15W (modo 0), 25W (modo 1, predeterminado) y MAXN SUPER (modo 2, experimental; solo en kits
flasheados con la configuración Super). MAXN SUPER lleva la CPU hasta 1.7 GHz,
la GPU hasta 1,020 MHz y el controlador de memoria a 3,199 MHz. Lea el modo
con `sudo /usr/sbin/nvpmodel -q`; configúrelo con
`sudo /usr/sbin/nvpmodel -m <mode_id>`. Las páginas del kit de NVIDIA citan «7W a 25W»;
la tabla de r39.2 incluye los tres modos anteriores — compruebe su unidad en **[Verificación
del sistema](/es/tutorials/jetson-orin-nano/verify-your-system)**. *(página Platform Power
and Performance de L4T r39.2)*

## Especificaciones del módulo

| Elemento | Especificación |
|---|---|
| Rendimiento de IA | Hasta 67 TOPS INT8 dispersos (33 densos) en la configuración Super |
| GPU | Arquitectura NVIDIA Ampere, 1,024 núcleos CUDA, 32 Tensor Cores, hasta 1,020 MHz |
| CPU | Arm Cortex-A78AE de 6 núcleos v8.2 (64 bits), 1.5MB L2 + 4MB L3, hasta 1.7 GHz |
| Memoria | 8GB LPDDR5 de 128 bits, 102 GB/s |
| Almacenamiento | Ranura para tarjeta microSD en la parte inferior del módulo; compatibilidad con SSD NVMe externo |
| Decodificación de video | 1x 4K60 (H.265), 2x 4K30, 5x 1080p60, 11x 1080p30 |
| Codificación de video | 1080p30 usando 1–2 núcleos de CPU (sin hardware de codificación dedicado) |
| Aceleradores de IA | Sin DLA ni PVA — la inferencia se ejecuta en los Tensor Cores de la GPU |
| Factor de forma del módulo | SO-DIMM de 260 pines, 69.6 mm x 45 mm |

*Fuentes: hoja de datos del Jetson Orin Nano Super Developer Kit (diciembre de 2024);
página de especificaciones de NVIDIA Jetson Orin; página Platform Power and Performance de L4T r39.2.*

## Números de pieza

| Número de pieza | Qué designa |
|---|---|
| P3766 | El kit de desarrollo Jetson Orin Nano completo |
| P3767 | El System on Module (SOM) |
| P3768 | La placa portadora de referencia |
| P3767-0005 | SKU del módulo del kit de desarrollo (Jetson Orin Nano 8GB, «solo para desarrollo») |

Esta serie de documentación cubre **solo el kit de desarrollo de 8GB**. El módulo Orin Nano 8GB comercial es otra referencia (**P3767-0003**) y un objetivo aparte en las herramientas de flasheo — véase la nota sobre el SKU del módulo en [Flasheo y actualizaciones](/es/tutorials/jetson-orin-nano/flashing-and-updates).

## Su lugar en la familia Orin

- **Jetson Orin Nano 8GB — este kit.** El punto de entrada de la familia Orin:
  67 INT8 TOPS, 8GB de memoria unificada, 7W a 25W.
- **Jetson Orin NX.** La misma placa portadora puede alimentar, probar y desarrollar con módulos Orin
  NX (se requieren su propio disipador de calor y ventilador; un módulo nuevo de fábrica debe
  flashearse desde un host con Ubuntu con SDK Manager). *(Developer Kit User Guide —
  How-To)*
- **Jetson AGX Orin — la gama insignia.** El módulo AGX Orin 32GB alcanza
  241 TOPS en modo Super *(novedades de la versión JetPack 7.2)*. Consulte la
  [serie Jetson AGX Orin](/es/tutorials/jetson-agx-orin/quick-start) de Juxi.

La principal limitación que debe prever es la **memoria unificada de 8GB**; sin DLA
ni PVA, las cargas de trabajo de IA se ejecutan solo en la GPU — consulte **[Eficiencia de
memoria](/es/tutorials/jetson-orin-nano/memory-efficiency)** y **[Inferencia LLM
local](/es/tutorials/jetson-orin-nano/local-llm)**.

## Para qué sirve el kit de desarrollo

- **Prototipado para producción.** JetPack 7.2.1 sirve a toda la familia Orin,
  por lo que el trabajo en el kit es transferible a los módulos Orin usados en productos. *(página
  de descargas de JetPack)*
- **Visión por computador.** Dos conectores de cámara MIPI CSI; el DeepStream SDK 9.1 está
  en la matriz de componentes de JetPack 7.2.1 — consulte
  **[DeepStream](/es/tutorials/jetson-orin-nano/deepstream)**.
- **IA generativa local.** La principal promesa es una mejora de 1.7x en IA
  generativa; el límite de 8GB condiciona lo que cabe — consulte
  **[Inferencia LLM local](/es/tutorials/jetson-orin-nano/local-llm)**.
- **Robótica.** El personal de NVIDIA recomienda ROS 2 Jazzy para JetPack 7.2.1 — consulte
  **[Robótica](/es/tutorials/jetson-orin-nano/robotics)**.

> **Nota de Juxi:** los productos de producción se construyen sobre módulos Jetson Orin —
> el Orin Nano de 8GB o un Orin NX — sobre una placa portadora personalizada. El
> kit de desarrollo es el vehículo de desarrollo, no el componente de producción.

## Contenido de la caja

La caja contiene el kit de desarrollo (módulo Orin Nano de 8GB con disipador de calor, sobre
la placa portadora de referencia), una fuente de alimentación de 19 V, la tarjeta inalámbrica
802.11ac/ab/gn incluida y una tarjeta de inicio rápido y soporte. NVIDIA indica que el kit «no
incluye almacenamiento extraíble en la caja». *(Hoja de datos; Inicio rápido)*

Usted debe aportar:

- **Almacenamiento** — una tarjeta microSD (64GB, UHS-1 o más) o un SSD NVMe. La
  ranura microSD está en la **parte inferior del módulo**; insértela antes de encender.
  El paquete de la tienda Juxi ya incluye una tarjeta microSD de 64 GB, así que compre
  almacenamiento solo si recibió la caja básica de NVIDIA o si prefiere un SSD NVMe.
- **Una unidad USB de instalación** — de 16GB o más. Escriba la ISO de JetPack en esta
  unidad USB, no en una tarjeta microSD: las imágenes de tarjeta SD se eliminaron en JetPack
  7.2.
- **Un ordenador host** con 25GB o más de espacio libre, un monitor DisplayPort y
  teclado/ratón USB para la configuración de escritorio. *(Inicio rápido; Supported Hardware)*

> **Importante** El firmware de fábrica muy antiguo debe actualizarse primero — JetPack
> 7.2.1 requiere firmware UEFI/QSPI de la generación JetPack 6.x. Consulte el **[Inicio
> rápido](/es/tutorials/jetson-orin-nano/quick-start)** y **[Flasheo y
> actualizaciones](/es/tutorials/jetson-orin-nano/flashing-and-updates)**.

## Próximos pasos

- **[Inicio rápido](/es/tutorials/jetson-orin-nano/quick-start)** — de la caja a un
  sistema JetPack 7.2.1 funcional
- **[Interfaces y disposición del hardware](/es/tutorials/jetson-orin-nano/interfaces)** — todos los puertos, ranuras y
  conectores
- **[Descargas](/es/tutorials/jetson-orin-nano/downloads)** — imágenes oficiales, herramientas y enlaces de documentación

## Fuentes

- [Jetson Orin Nano Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) (consultado el 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (consultado el 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (consultado el 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (consultado el 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (consultado el 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — Supported Hardware](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/supported_hardware.html) (consultado el 2026-09-26)
- [NVIDIA Super Boost: Jetson Orin Nano Developer Kit gets a Super boost](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/) (consultado el 2026-09-26)
- [NVIDIA JetPack 6.2 brings Super Mode to Jetson Orin Nano and Jetson Orin NX modules](https://developer.nvidia.com/blog/nvidia-jetpack-6-2-brings-super-mode-to-nvidia-jetson-orin-nano-and-jetson-orin-nx-modules/) (enlazado como el anuncio del modo de alimentación Super)
- [Página de especificaciones del módulo y kit de desarrollo NVIDIA Jetson Orin](https://developer.nvidia.com/embedded/jetson-orin) (consultado el 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (consultado el 2026-09-26)
- [Archivo de JetPack](https://developer.nvidia.com/embedded/jetpack-archive) (consultado el 2026-09-26)
- [L4T r39.2 Developer Guide — Jetson Orin NX and Orin Nano series: module adaptation and bring-up](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html) (consultado el 2026-09-26)
- [L4T r39.2 Developer Guide — Platform Power and Performance](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (consultado el 2026-09-26)
- [L4T r38.2.1 Developer Guide — Partition Configuration (module SKUs)](https://docs.nvidia.com/jetson/archives/r38.2.1/DeveloperGuide/AR/BootArchitecture/PartitionConfiguration.html) (consultado el 2026-09-26)
- [Jetson Orin Nano Super Developer Kit Datasheet (PDF, linked from nvidia.com)](https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf) (consultado el 2026-09-26)
- [Ficha del producto en la tienda de Juxi Technology](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) (consultado el 2026-09-26)

*Estado: revisado el 2026-10-11. Basado en la documentación oficial
de NVIDIA en las fechas indicadas; aún no verificado en hardware físico por
Juxi Technology.*

**Créditos de la imagen:** Imagen del producto procedente de la *Jetson Orin Nano
Developer Kit User Guide* oficial de NVIDIA (descargada el 2026-09-26), © NVIDIA Corporation.

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página es publicada
por Juxi Technology y no es una publicación de NVIDIA.
