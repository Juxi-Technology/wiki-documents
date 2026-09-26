---
title: Descargas y enlaces oficiales
sidebar_label: Descargas
slug: /downloads
description: >-
  Enlaces directos a los recursos oficiales de JetPack 7.2.1 / Jetson Linux
  39.2.1 para el kit de desarrollo Jetson AGX Orin — imágenes, herramientas,
  documentación y recursos de la comunidad.
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
    note: component table lags on some rows (VPI/PVA still show 7.2 values) — see the caveat in the body
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: authoritative source for installed component versions
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-23
review_owner: cheny
---

# Descargas y enlaces oficiales

Todo lo que encontrará en esta página enlaza con **recursos oficiales de
NVIDIA** y se verificó el **2026-09-23** (se añadió una advertencia sobre las
versiones de los componentes el 2026-09-26). Para las actualizaciones, tome los
dos primeros enlaces como los puntos de partida de referencia.

## JetPack 7.2.1 / Jetson Linux 39.2.1

- [JetPack SDK Downloads and Release Notes](https://developer.nvidia.com/embedded/jetpack/downloads) — **centro de referencia** para la información de la versión y las descargas. ⚠️ **Su tabla de componentes va con retraso fila por fila**: a fecha de 2026-09-26 todavía muestra valores de JetPack **7.2** para VPI y PVA, y su fila de Isaac ROS sigue figurando como «próximamente» (ya publicado desde la 4.6.0). Para conocer las versiones que realmente instala un sistema JetPack 7.2.1, utilice el [repositorio apt de NVIDIA Jetson](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) — consulte [Verificación del sistema](/es/tutorials/jetson-agx-orin/verify-your-system).
- [Imagen ISO de JetPack (r39.2.1)](https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso) — la imagen de instalación USB utilizada en nuestro [Inicio rápido](/es/tutorials/jetson-agx-orin/quick-start)
- [NVIDIA SDK Manager](https://developer.nvidia.com/sdk-manager) — herramienta de flasheo desde el PC host
- [Imágenes Yocto para Jetson AGX Orin](https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/yocto2) — recetas e imágenes oficiales de Yocto/OpenEmbedded
- [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive) · [Jetson Linux Archive](https://developer.nvidia.com/embedded/jetson-linux-archive) — versiones anteriores

## Documentación

- [Jetson AGX Orin Developer Kit User Guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) — la referencia principal para este kit
  - [Quick Start](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) · [BSP Installation](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html) · [JetPack SDK Setup](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html) · [Hardware Layout](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html)
- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — novedades y **problemas conocidos**
- [Jetson Linux Developer Guide](https://docs.nvidia.com/jetson/archives/DeveloperGuide) — soporte de flasheo, seguridad, desarrollo de cámaras, OTA
- [Jetson Linux API Reference](https://docs.nvidia.com/jetson/archives/ApiReference/index.html)
- [Camera Development Guide](https://docs.nvidia.com/jetson/archives/DeveloperGuide/SD/CameraDevelopment.html)
- Especificación de la placa portadora: *NVIDIA Jetson AGX Orin Developer Kit Carrier Board Specification* — incluida en la [página de descargas](https://developer.nvidia.com/embedded/downloads) de NVIDIA

## Herramientas y cuentas

- [Balena Etcher](https://etcher.balena.io) — escribe la imagen ISO de Jetson en una unidad USB (Windows / macOS / Linux)
- [NVIDIA Developer Program](https://developer.nvidia.com/developer-program) — se requiere membresía (gratuita) para descargar el SDK Manager
- [NVIDIA Jetson Developer Forums](https://forums.developer.nvidia.com/c/robotics-edge-computing/jetson-embedded-systems/70) — soporte comunitario oficial

## Aprendizaje e IA agéntica (JetPack 7)

- [Jetson AI Lab](https://www.jetson-ai-lab.com) — tutoriales prácticos para ejecutar modelos de IA en Jetson
- [NVIDIA NemoClaw](https://www.nvidia.com/en-us/ai/nemoclaw) — IA agéntica en Jetson; instalación con un solo comando admitida desde JetPack 7.2
- [Habilidades del lado del dispositivo Jetson](https://github.com/jetson-device-skills) · [Habilidades BSP de Jetson](https://github.com/jetson-bsp-skills) — habilidades de agente reutilizables de NVIDIA

## Juxi Technology

- **Catálogo de productos y accesorios:** <https://wiki.juxitech.com/products/> — complementos para su kit (cámaras, brazos robóticos, sensores y mucho más), con especificaciones y enlaces de compra
- **Contactos:** soporte técnico — support@juxitech.com · ventas — sales@juxitech.com · consultas sobre productos — pe@juxitech.com
- Los scripts de inicio y el código de ejemplo de Juxi se añadirán aquí a medida que estén disponibles.

## Fuentes

- [JetPack SDK Downloads and Release Notes](https://developer.nvidia.com/embedded/jetpack/downloads) (consultado el 2026-09-23; advertencia sobre la tabla de componentes el 2026-09-26)
- [Repositorio apt de NVIDIA Jetson — índice Packages](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) — fuente de referencia para las versiones de los componentes instalados (consultado el 2026-09-26)

*Estado: borrador, pendiente de revisión por cheny.*

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página es
publicada por Juxi Technology y no es una publicación de NVIDIA.
