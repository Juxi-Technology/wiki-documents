---
title: Descargas y enlaces oficiales
sidebar_label: Descargas
slug: /downloads
description: >-
  Un índice verificado de descargas y documentación oficiales de NVIDIA para el
  kit de desarrollo Jetson Orin Nano Super (8GB) con JetPack 7.2.1 / L4T
  r39.2.1, además de recursos de socios y los puntos de entrada de Juxi
  Technology.
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
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack-archive
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html
    checked: 2026-09-26
    note: target of the "NVIDIA SDK Manager Documentation" entry on the kit user guide's Additional Docs page
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/overview.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/
    checked: 2026-09-26
  - source: https://pypi.jetson-ai-lab.io/sbsa/cu130
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
  - source: https://wiki.juxitech.com/
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
review_owner: cheny
---

# Descargas y enlaces oficiales

Esta página es un índice de las descargas y la documentación oficiales de
NVIDIA para el **kit de desarrollo Jetson Orin Nano Super (8GB)** con
**JetPack 7.2.1 / Jetson Linux (L4T) r39.2.1**, además de algunos recursos de
socios y los puntos de entrada de Juxi Technology. Todos los enlaces se
comprobaron el **2026-09-26**.

Antes de descargar nada, importan dos hechos específicos del Orin Nano:

- **Sin imagen de tarjeta SD.** A partir de JetPack 7.2, el kit se instala
  desde la Jetson ISO escrita en una unidad flash USB. No hay imagen de
  tarjeta SD, y la ISO no debe escribirse en una tarjeta microSD.
- **Control de firmware.** JetPack 7.2.1 requiere firmware UEFI/QSPI de la
  generación de JetPack 6.x en el kit. Si su kit aún tiene firmware de fábrica
  más antiguo, complete primero la ruta de actualización de JetPack 6.x.

> **Consejo de Juxi:** El flujo completo de configuración está en [Inicio rápido](/es/tutorials/jetson-orin-nano/quick-start). Las opciones de flasheo y actualización se comparan en [Flasheo y actualizaciones](/es/tutorials/jetson-orin-nano/flashing-and-updates).

## JetPack 7.2.1 / Jetson Linux r39.2.1

- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) — la página principal de JetPack: notas de la versión, la tabla oficial de versiones de los componentes y todos los enlaces de descarga de JetPack 7.2.1.

> ⚠️ **No confíe en esa tabla de componentes fila por fila.** NVIDIA no la ha actualizado del todo para 7.2.1: la fila de CUDA sí se actualizó, pero las dos filas contiguas no — VPI todavía muestra el valor de JetPack 7.2 (**4.1.3, mientras que 7.2.1 incluye 4.1.4**) y la fila de Isaac ROS sigue diciendo «próximamente», aunque Isaac ROS admite Orin en JetPack 7.2 desde su lanzamiento de agosto de 2026. Para las versiones de los componentes, tome el repositorio de paquetes de NVIDIA como la fuente autorizada: el metapaquete fija cada componente a través de su cadena de dependencias — [r39.2 arm64 Packages](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages), donde `nvidia-jetpack-runtime (= 7.2.1-b49)` → `nvidia-vpi (= 7.2.1-b49)` → `libnvvpi4 (= 4.1.4)` (consultado el 2026-09-26). Las versiones de los componentes también figuran en [Verificación del sistema](/es/tutorials/jetson-orin-nano/verify-your-system).
- [Imagen ISO de Jetson para r39.2.1 (descarga directa)](https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso/jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso) — la imagen del instalador de JetPack 7.2.1; la página Quick Start del kit la enlaza como «Direct Download Link: Jetson ISO (r39.2.1)». Escríbala en una unidad flash USB de 16 GB o más. No se publica ninguna suma de comprobación junto a la descarga.
- [Documentación de NVIDIA SDK Manager](https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html) — instale y use la herramienta de PC host para flashear el kit, actualizar el firmware e instalar los componentes de JetPack (se requiere una cuenta del NVIDIA Developer Program); el flujo del kit está en [BSP Setup](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_bsp.html).
- [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive) — versiones anteriores de JetPack, incluidas JetPack 7.2 (la primera versión 7.x que admite la familia Orin) y la línea JetPack 6.x.

## Documentación

- [Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) — la referencia principal para este kit.
  - [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) · [JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) · [Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html)
- [Jetson Linux r39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) — las novedades de JetPack 7.2.1, la declaración de GA y la lista de problemas conocidos.
- [Jetson Linux r39.2 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — notas de la versión de JetPack 7.2.
- [Jetson Linux Developer Guide (r39.2)](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html) — destinos de flasheo, configuración de particiones y las tablas de potencia y rendimiento de la plataforma.
- [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) — la propia lista de NVIDIA con más recursos para este kit (JetPack SDK, Developer Guide, documentación de SDK Manager, Jetson Download Center, Jetson AI Lab, foros de desarrolladores, Jetson Ecosystem).
- [Jetson Download Center](https://developer.nvidia.com/embedded/downloads) — el índice de descargas de NVIDIA para Jetson; la guía del kit remite aquí para la Carrier Board Specification y la lista de componentes compatibles. Algunas partes requieren iniciar sesión en NVIDIA.

## Frameworks de IA y tutoriales

- [TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/overview.html) — la pila de inferencia LLM en el dispositivo de NVIDIA para Jetson. Orin es un destino con soporte oficial, solo con FP16, INT8 e INT4 ([matriz de compatibilidad](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html) · [modelos compatibles](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html)).
- [Guía de instalación de DeepStream 9.1](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) — analítica de video en Jetson; DeepStream 9.1 es la versión que admite la familia Orin en JetPack 7.2 ([Guía de inicio rápido](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html) · [Contenedores Docker](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html)).
- [Jetson AI Lab](https://www.jetson-ai-lab.com/) — un centro gestionado por un socio con tutoriales prácticos para ejecutar modelos de IA en Jetson, incluido un [recorrido de TensorRT Edge-LLM para Orin Nano 8 GB](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/).
- [Índice de wheels SBSA (CUDA 13)](https://pypi.jetson-ai-lab.io/sbsa/cu130) — índice alojado por un socio con wheels de Python para aarch64 de JetPack 7.2 / CUDA 13.2; el personal de NVIDIA remite a este índice para los wheels de Python de la versión.

## Juxi Technology

- **Wiki:** [wiki.juxitech.com](https://wiki.juxitech.com/) — esta serie de documentación; el [catálogo de productos](https://wiki.juxitech.com/products/) lista cámaras, sensores y accesorios para kits Jetson.
- **Tienda:** [Jetson Orin Nano Super Developer Kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) — la ficha de la tienda de Juxi para este kit (SKU JX00110).
- **Contactos:** soporte técnico — support@juxitech.com · ventas — sales@juxitech.com · preguntas sobre productos — pe@juxitech.com.

## Fuentes

- [Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) — [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html), [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) (consultado el 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) y [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive) (consultado el 2026-09-26)
- [Repositorio de paquetes de NVIDIA — índice Packages de r39.2 arm64](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) — la fuente autorizada de las versiones de los componentes, mediante los bloqueos de dependencias de los metapaquetes (consultado el 2026-09-26)
- Notas de la versión de Jetson Linux — [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf), [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (consultado el 2026-09-26)
- [Jetson Linux Developer Guide](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html) (consultado el 2026-09-26)
- [Documentación de NVIDIA SDK Manager](https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html) (consultado el 2026-09-26)
- [Documentación de TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/overview.html) · [Guía de instalación de DeepStream 9.1](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) · [Jetson AI Lab](https://www.jetson-ai-lab.com/) · [Índice de wheels SBSA](https://pypi.jetson-ai-lab.io/sbsa/cu130) (consultado el 2026-09-26)
- [Ficha de producto de la tienda de Juxi Technology](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) y [wiki](https://wiki.juxitech.com/) (consultado el 2026-09-26)

*Estado: revisado el 2026-10-11.*

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página es
publicada por Juxi Technology y no es una publicación de NVIDIA.
