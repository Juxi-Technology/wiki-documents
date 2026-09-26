---
title: Registro de cambios
sidebar_label: Registro de cambios
slug: /appendix/changelog
description: >-
  Actualizaciones de este conjunto de documentación, y el historial de
  versiones de JetPack para el kit de desarrollo NVIDIA Jetson Orin Nano Super.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
review_owner: cheny
---

# Registro de cambios

## Actualizaciones de la documentación

| Fecha | Cambio |
|---|---|
| 2026-09-26 | Conjunto de documentación inicial publicado como borrador: Inicio rápido, Flasheo y actualizaciones, Verificación del sistema, Descripción general del producto, Interfaces y disposición del hardware, FAQ, Solución de problemas, Descargas y la guía de migración de JetPack 6.x → 7.2, cinco tutoriales (Inferencia LLM local, Eficiencia de memoria, DeepStream, Robótica, IA agéntica), el Glosario y este Registro de cambios. Redactado a partir de la documentación oficial de NVIDIA para JetPack 7.2.1; aún no verificado en hardware físico. |

## Versiones de JetPack para este kit

| JetPack | Jetson Linux (L4T) | Fecha | Notas |
|---|---|---|---|
| **7.2.1** | **39.2.1** | 2026-08 | **Actual.** La ISO ahora flashea el kit de desarrollo Orin Nano con la configuración de modo Super de forma predeterminada, lo que resuelve el problema de r39.2 por el que las unidades actualizadas por ISO se quedaban en su perfil de alimentación anterior. |
| 7.2 | 39.2.0 | 2026-06 | Primera versión de JetPack 7 para la familia Orin (Ubuntu 24.04, kernel 6.8, CUDA 13.x). Problema conocido de esta versión: las unidades actualizadas mediante la Jetson ISO no adoptaban el modo Super de forma predeterminada — véase [Solución de problemas](/es/tutorials/jetson-orin-nano/troubleshooting). |
| 6.2.x | 36.x | 2025 | La línea JetPack 6 para este kit (Ubuntu 22.04). Aquí es donde se introdujo el modo de alimentación «Super» — el mismo hardware, con frecuencias de CPU/GPU/memoria más altas y el modo de 25 W. |
| 6.0 / 6.1 | 36.x | 2024–2025 | Versiones anteriores de JetPack 6. |
| 5.1.3 | 35.x | 2023–2024 | La línea de firmware más antigua aún referenciada hoy: la ruta de actualización de JetPack 6.x usa una imagen puente 5.1.3 para llevar kits muy antiguos al firmware de la generación de JetPack 6.x antes de que pueda instalarse JetPack 7. |

Historiales completos: [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive) · [Jetson Linux Archive](https://developer.nvidia.com/embedded/jetson-linux-archive)

Para actualizar su kit, consulte **[Flasheo y actualizaciones](/es/tutorials/jetson-orin-nano/flashing-and-updates)**;
para comprobar qué está ejecutando, consulte **[Verificación del sistema](/es/tutorials/jetson-orin-nano/verify-your-system)**.

## Fuentes

- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (consultado el 2026-09-26)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (consultado el 2026-09-26)
- [NVIDIA JetPack 6.2 announcement — Super mode for Jetson Orin Nano](https://developer.nvidia.com/blog/nvidia-jetpack-6-2-brings-super-mode-to-nvidia-jetson-orin-nano-and-jetson-orin-nx-modules/) (enlazado como el anuncio del fabricante del modo de alimentación Super)

*Estado: borrador, pendiente de revisión por cheny. Basado en la documentación
oficial de NVIDIA a las fechas indicadas; aún no verificado en hardware físico
por Juxi Technology.*

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página es
publicada por Juxi Technology y no es una publicación de NVIDIA.
