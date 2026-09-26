---
title: Verificación del sistema — lista de versiones y componentes
sidebar_label: Verificación del sistema
slug: /getting-started/verify-your-system
description: >-
  Confirme que su kit de desarrollo Jetson AGX Orin ejecuta JetPack 7.2.1 con
  la pila de componentes completa — comandos de versión y la lista de
  componentes esperada.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-23
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
    note: still lists Isaac ROS as "coming soon"; see the note under Step 3
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: component versions verified through the nvidia-jetpack 7.2.1-b49 dependency chain
review_owner: cheny
---

# Verificación del sistema

Después de configurar o actualizar su kit, confirme dos cosas: la **versión
BSP** y la **pila de componentes JetPack instalada**. Ambas comprobaciones
tardan menos de un minuto.

## Paso 1 — Compruebe la versión L4T (BSP)

```bash
cat /etc/nv_tegra_release
```

Un sistema con **JetPack 7.2.1** muestra:

```
# R39 (release), REVISION: 2.1, ...
```

Si la salida muestra una versión más antigua (por ejemplo, R35), actualice
primero el BSP — consulte **[Flasheo y actualizaciones](/es/tutorials/jetson-agx-orin/flashing-and-updates)**.

## Paso 2 — Compruebe los componentes de JetPack

Los componentes de JetPack (CUDA, cuDNN, TensorRT, ...) se instalan como
paquetes de Debian. Compruebe que el metapaquete esté presente:

```bash
dpkg -l | grep -i nvidia-jetpack
```

Y confirme que el kit de herramientas CUDA esté disponible:

```bash
nvcc --version
```

Salida esperada para esta versión: **CUDA 13.2**. Si `nvcc` falta o el
metapaquete no está presente, instale los componentes con:

```bash
sudo apt update
sudo apt install nvidia-jetpack
```

(Esto tarda aproximadamente una hora según la velocidad de conexión — consulte
[Inicio rápido → Paso 3](/es/tutorials/jetson-agx-orin/quick-start).)

## Paso 3 — Versiones esperadas para JetPack 7.2.1

La tabla siguiente indica lo que **JetPack 7.2.1 / Jetson Linux 39.2.1**
instala realmente, verificado el 2026-09-26 a través de la cadena de
dependencias de `nvidia-jetpack` 7.2.1 en el [repositorio apt de NVIDIA Jetson](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages):

| Componente | Versión |
|---|---|
| Jetson Linux (L4T) | 39.2.1 |
| Sistema operativo | Ubuntu 24.04 (L4T) |
| Kernel | 6.8 |
| CUDA | 13.2.2 |
| cuDNN | 9.20.0 |
| TensorRT | 10.16.2 |
| VPI (visión por computador) | 4.1.4 |
| V4L2 | 1.22.1 |
| DeepStream SDK | 9.1 |
| Holoscan SDK | 3.9.0 |
| Nsight Systems | 2026.3 |
| NVIDIA Container Toolkit | 1.19 (con imagen ISO) |
| Isaac ROS | *«próximamente» en la página de JetPack* — se publica por separado; consulte la nota a continuación |

> **Nota de Juxi:** es posible que `dpkg` muestre versiones de paquetes con
> sufijos de compilación o de revisión (por ejemplo, `13.2.2-1`, o `7.2.1-b49`
> para los paquetes L4T); esto es normal — compare el número de versión, no el
> sufijo.
>
> **Dónde se queda atrás la página de descargas de JetPack (consultada el
> 2026-09-26):** la tabla resumen de esa página todavía muestra CUDA **13.2.1**
> y VPI **4.1.3** — esos son los valores de JetPack **7.2**. `nvidia-jetpack`
> 7.2.1 instala CUDA **13.2.2** (compilación 13.2.86) y VPI **4.1.4**. El
> repositorio apt anterior es la fuente autorizada.
>
> **Isaac ROS (revisado de nuevo el 2026-09-26):** la página de descargas de
> JetPack todavía muestra «próximamente», pero Isaac ROS admite Jetson Orin +
> JetPack 7.2 desde la versión **4.6.0** (2026-08-18). Isaac ROS se publica
> independientemente de JetPack, por lo que sus propias notas de la versión
> son la referencia que rige. Usuarios de robótica: consulten [Robótica en
> JetPack 7.2](/es/tutorials/jetson-agx-orin/robotics) antes de planificar
> trabajos que dependan de él.

## Opcional — un vistazo rápido a la actividad del sistema

`tegrastats` (incluido en Jetson Linux) imprime en tiempo real el uso de
CPU/GPU/memoria:

```bash
tegrastats
```

Pulse `Ctrl`+`C` para detenerlo.

## Si falta algo

1. Vuelva a ejecutar `sudo apt update && sudo apt install nvidia-jetpack`.
2. Asegúrese de que el `apt dist-upgrade` + reinicio del proceso de configuración se hayan completado (consulte [Inicio rápido → Paso 3](/es/tutorials/jetson-agx-orin/quick-start)).
3. Compruebe el espacio en disco (`df -h`) y la conectividad a Internet.
4. ¿Sigue atascado? Consulte **[Solución de problemas](/es/tutorials/jetson-agx-orin/troubleshooting)**.

## Fuentes

- [JetPack SDK Setup — Jetson AGX Orin Developer Kit User Guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html) (consultado el 2026-09-23)
- [JetPack SDK Downloads and Release Notes](https://developer.nvidia.com/embedded/jetpack/downloads) (consultado el 2026-09-23)

*Estado: borrador, pendiente de revisión por cheny. Basado en la documentación
oficial de NVIDIA a la fecha indicada; aún no verificado en hardware físico por
Juxi Technology.*

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página es
publicada por Juxi Technology y no es una publicación de NVIDIA.
