---
title: Glosario
sidebar_label: Glosario
slug: /appendix/glossary
description: >-
  Términos clave del kit de desarrollo Jetson AGX Orin: desde el versionado de
  JetPack y L4T hasta el flasheo, la pila de IA y la terminología de
  alimentación.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-24
review_owner: cheny
---

# Glosario

Los términos por los que más preguntan los clientes, agrupados por tema. Los
números de versión reflejan la versión actual (**JetPack 7.2.1 / L4T 39.2.1**,
comprobados el 2026-09-24).

## Plataforma y hardware

| Término | Significado |
|---|---|
| **Jetson AGX Orin** | La familia de módulos de IA en el borde de NVIDIA; este kit de desarrollo incorpora el módulo de **64GB**. |
| **Módulo** | La placa pequeña con el SoC, la memoria y la eMMC que realiza el cómputo. |
| **Placa portadora** | La placa más grande con todos los puertos y conectores; el módulo se inserta en ella (conector de 699 pines, J3). |
| **Kit de desarrollo** | Módulo + placa portadora de referencia + módulo Wi-Fi + fuente de alimentación — la plataforma de prototipado. Los productos de producción usan módulos sobre placas portadoras propias o de socios. |
| **SoC** | System-on-chip (sistema en un chip): CPU, GPU y aceleradores integrados en un solo chip (NVIDIA denomina "Tegra" a la línea). |
| **TOPS** | Billones de operaciones por segundo — una medida del rendimiento de IA (la familia AGX Orin alcanza hasta 275 TOPS). |
| **Tensor Core** | Núcleos de GPU especializados en las operaciones matriciales que hay detrás de las redes neuronales. |
| **eMMC** | Almacenamiento flash integrado en el módulo; el almacenamiento de sistema predeterminado. |
| **NVMe** | SSD rápido sobre PCIe, instalado en la ranura M.2 M-Key (J1); puede alojar el sistema. |
| **M.2 (M-Key / E-Key)** | Tipos de ranura: **M-Key** = SSD NVMe, **E-Key** = módulo Wi-Fi. |
| **CSI / GMSL** | Interfaces de cámara (CSI en el conector de cámara J509; GMSL para cámaras de grado automotriz). |
| **DisplayPort (DP)** | La **única** salida de video del kit; admite MST (hasta 2 pantallas) y DSC. |

## Software y versiones

| Término | Significado |
|---|---|
| **JetPack** | El paquete de SDK de NVIDIA para Jetson: sistema operativo, controladores, pila CUDA y bibliotecas. **Actual: 7.2.1.** |
| **Jetson Linux (L4T)** | El paquete de soporte de placa (BSP) subyacente a JetPack: cargador de arranque, kernel, controladores y el sistema de archivos raíz de Ubuntu. **Actual: r39.2.1.** |
| **BSP** | "Board support package" (paquete de soporte de placa): todo lo necesario para arrancar y ejecutar la placa. |
| **Sistema de archivos raíz (rootfs)** | La parte del sistema operativo en el espacio de usuario (aquí: Ubuntu 24.04). |
| **oem-config** | El asistente de configuración del primer arranque (idioma, cuenta de usuario, red). |
| **UEFI** | El firmware y menú de arranque del kit; use su gestor de arranque para elegir un dispositivo de arranque. |
| **QSPI** | Flash pequeña que contiene el firmware de arranque temprano. Durante la instalación desde ISO puede aparecer un aviso de "**actualización de la cápsula QSPI**": pulse `Y` (obligatorio). |
| **Modo Force Recovery** | Modo de arranque especial para flashear desde un PC host. Para entrar: mantenga pulsado el botón central Force Recovery mientras conecta la alimentación. |
| **Jetson ISO** | La imagen de instalación en memoria USB; la vía de actualización recomendada por NVIDIA (no requiere PC host). |
| **SDK Manager** | La herramienta con GUI de NVIDIA (PC host) para flashear el BSP e instalar componentes de JetPack. |
| **Linux_for_Tegra / flash.sh** | Las herramientas de flasheo basadas en scripts, para uso avanzado o de producto. |
| **OTA** | Over-the-air update — actualizaciones remotas de software y de seguridad para dispositivos desplegados. |
| **Árbol de dispositivos (device tree)** | La estructura de datos que indica al kernel qué hardware está conectado; los árboles de dispositivos personalizados deben recompilarse para cada versión de L4T. |

**Correspondencia de versiones** (la tabla más útil para memorizar):

| JetPack | Jetson Linux (L4T) | Ubuntu | Kernel | CUDA |
|---|---|---|---|---|
| **7.2.1** (actual) | **39.2.1** | **24.04** | **6.8** | **13.2.1** |
| 6.x (generación anterior) | 36.x | 22.04 | 5.15 | 12.x |

Compruebe siempre qué ejecuta realmente un sistema concreto: `cat /etc/nv_tegra_release`.

## Pila de IA

| Término | Significado |
|---|---|
| **CUDA** | El conjunto de herramientas de computación con GPU de NVIDIA (13.2.1 en esta versión). |
| **cuDNN** | Biblioteca de primitivas de aprendizaje profundo optimizadas (9.20.0). |
| **TensorRT** | Optimizador y entorno de ejecución de inferencia (10.16.2). |
| **Motor TensorRT** | Un archivo de modelo compilado y específico del hardware y de la versión. Los motores **no** sobreviven a las actualizaciones de versión: recompílelos. |
| **DeepStream** | SDK para analítica de video con múltiples flujos (9.1). |
| **VPI** | Vision Programming Interface — procesamiento de imágenes acelerado por hardware (4.1.3). |
| **Holoscan** | Framework de IA en streaming para el procesamiento de sensores en tiempo real (3.9.0). |
| **NGC** | El catálogo de contenedores y modelos preentrenados de NVIDIA (catalog.ngc.nvidia.com). |
| **Contenedor** | Entorno de ejecución aislado y empaquetado (Docker); la forma estándar de distribuir software de IA en Jetson. |

## Alimentación y monitorización

| Término | Significado |
|---|---|
| **nvpmodel** | Herramienta para cambiar de modo de alimentación. Ejecute `sudo nvpmodel -q` para ver los modos de su sistema. |
| **MAXN** | Modo de alimentación de "máximo rendimiento" (sin límite de potencia). |
| **jetson_clocks** | Fija las frecuencias al máximo — para benchmarks, no para el uso predeterminado sostenido. |
| **tegrastats** | Monitor integrado en tiempo real del uso de CPU/GPU/memoria. |

## La era de JetPack 7

| Término | Significado |
|---|---|
| **NemoClaw** | El framework de IA agéntica de NVIDIA para Jetson; instalable con un solo comando desde JetPack 7.2. |
| **Jetson agent skills** | Flujos de trabajo de agentes reutilizables que NVIDIA publica para tareas del lado del dispositivo y del BSP. |
| **Yocto / OpenEmbedded (OE4T)** | El sistema de compilación de imágenes Linux de producción personalizadas y reproducibles; con soporte oficial desde 7.2. |
| **SBSA** | Server Base System Architecture — el modelo de servidor Arm al que se alinea la línea **Thor** de Jetson (no este kit). |
| **MIG** | Multi-Instance GPU — particionar una GPU en instancias aisladas (Jetson Thor, vista previa tecnológica). |

## Fuentes

- [JetPack SDK Downloads — component versions](https://developer.nvidia.com/embedded/jetpack/downloads) (consultado el 2026-09-24)
- [Jetson AGX Orin Developer Kit User Guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (consultado el 2026-09-24)

*Estado: borrador, pendiente de revisión por cheny. Definiciones recopiladas a
partir de la documentación de NVIDIA y del uso habitual del sector; los números
de versión se comprobaron en la fecha indicada.*

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página la
publica Juxi Technology y no es una publicación de NVIDIA.
