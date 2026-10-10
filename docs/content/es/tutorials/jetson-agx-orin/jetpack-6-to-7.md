---
title: Migración de JetPack 6.x a JetPack 7.2
sidebar_label: Migrar desde JetPack 6.x
slug: /migration/jetpack-6-to-7
description: >-
  Qué cambia entre JetPack 6.x y JetPack 7.2.1 en el kit de desarrollo
  Jetson AGX Orin, qué debe recompilarse y un orden de migración
  recomendado.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-23
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
    note: its component table lags on some rows (VPI/PVA still show 7.2 values)
  - source: https://wiki.seeedstudio.com/jetpack_7_2_resource_hub/
    checked: 2026-09-23
    note: secondary source — used for migration-topic organization only
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
    note: Isaac ROS support status — supersedes the "coming soon" note in the migration checklist
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: CUDA 13.2.2 (not the 13.2.1 shown on the JetPack downloads page) per the nvidia-jetpack 7.2.1 dependency chain
review_owner: cheny
---

# Migración de JetPack 6.x a JetPack 7.2

Esta página está dirigida a los usuarios actuales de JetPack 6.x en el kit de
desarrollo AGX Orin.
Si su kit es nuevo, es mejor empezar por [Inicio rápido](/es/tutorials/jetson-agx-orin/quick-start).

## Qué cambia

| Capa | Época de JetPack 6.x | JetPack 7.2.1 |
|---|---|---|
| Jetson Linux (L4T) | 36.x (la 6.2 usaba 36.4.x) | **39.2.1** |
| SO / sistema de archivos raíz | Ubuntu 22.04 | **Ubuntu 24.04** |
| Kernel de Linux | 5.15 | **6.8** |
| CUDA | 12.x | **13.2.2** |
| TensorRT | 10.x (época de 6.x) | **10.16.2** |

> Los valores de la columna JetPack 6.x son ilustrativos (época de JetPack 6.2).
> Compruebe **sus** versiones actuales exactas con `cat /etc/nv_tegra_release`
> antes de planificar, y consulte el [archivo JetPack](https://developer.nvidia.com/embedded/jetpack-archive)
> de NVIDIA para obtener los detalles de cada versión.

## Novedades para Orin en la serie 7.2

De las notas de la versión de Jetson Linux 39.2:

- La **familia Jetson Orin se une a la línea de software JetPack 7** (la misma generación que Thor).
- **Instalación ISO unificada** — un método de instalación desde memoria USB, sin necesidad de PC host.
- **NemoClaw**: instalación con un solo comando para flujos de trabajo de IA agéntica.
- Recetas **Yocto/OpenEmbedded** oficiales (OE4T) para imágenes de producción personalizadas.
- Pila de cámara: **SIPL API v2.0** (GMSL y CoE) — tenga en cuenta que esta versión trae **cambios de ABI**: los controladores UDDF compilados para JetPack 7.1 deben recompilarse con las cabeceras de JetPack 7.2.
- *(El modo Super / MAXN_SUPER del AGX Orin 32GB es específico de 32GB y no se aplica al kit de 64GB. Los cambios de SBSA y MIG están relacionados con Jetson Thor.)*

## Lo que no se puede conservar — planifique una recompilación

- **Módulos de kernel fuera del árbol (out-of-tree)** — el kernel pasó a la versión 6.8; los módulos deben recompilarse con las nuevas cabeceras.
- **Controladores de cámara y personalizaciones del device tree** — recompilar para 39.2; SIPL 2.0 también trae cambios de ABI para los controladores UDDF.
- **Motores TensorRT** — los motores serializados están vinculados a la versión de TensorRT; recompile con TensorRT 10.16.2 en el destino.
- **Binarios de CUDA** — recompile con CUDA 13; no espere que los binarios de 12.x sigan siendo válidos.
- **Contenedores** — cambie a imágenes compatibles con JetPack 7 (por ejemplo, los contenedores NGC actualizados).
- **Entornos de Python y servicios del sistema** — recréelos para Ubuntu 24.04 (cambiaron los nombres de los paquetes, los repositorios y las versiones del intérprete).

## Orden de migración recomendado

1. **Confirme que su pila de software es compatible** con 7.2.1 *antes* de borrar nada — compruebe cada componente del que dependa con la [lista de componentes de JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads) de NVIDIA. Esa página puede quedarse atrás en los SDK que se publican de forma independiente: todavía muestra Isaac ROS como «próximamente», aunque Isaac ROS 4.6.0 añadió compatibilidad con Jetson Orin + JetPack 7.2 (consulte [Robótica en JetPack 7.2](/es/tutorials/jetson-agx-orin/robotics)).
2. **Haga una copia de seguridad:** datos de la aplicación, archivos de calibración de sensores, volúmenes de contenedores, fuentes del device tree, scripts de compilación de TensorRT / modelos ONNX.
3. **Flashee JetPack 7.2.1** ([Flasheo y actualizaciones](/es/tutorials/jetson-agx-orin/flashing-and-updates)) y valide: el arranque, el almacenamiento, la red y que el modo Force Recovery siga funcionando.
4. **Restaure los periféricos:** Wi-Fi, cámaras, CAN o controladores de bus de campo — recompilados para el kernel 6.8.
5. **Recompile** las aplicaciones CUDA, los plugins de TensorRT y los motores TensorRT **en el destino**.
6. **Valide primero su aplicación en su modo de alimentación original**; solo después pruebe otros modos de rendimiento.
7. **Registre los valores de referencia:** uso de memoria, temperaturas, consumo de energía, latencia, rendimiento — antes de pasar a producción.

## Reversión

- Antes de borrar, conserve una **copia de referencia funcional** de su sistema actual (una imagen NVMe/eMMC de repuesto o, como mínimo, los datos del paso 2).
- El instalador ISO puede instalar cualquier versión de L4T para la que disponga de medios — conserve el USB del instalador anterior si puede que necesite volver atrás.
- Para flotas: haga el despliegue por etapas y dé prioridad a diseños con una ruta de recuperación independiente (USB de recuperación + imagen de respaldo) en lugar de actualizaciones in situ.

## Fuentes

- [Notas de la versión de Jetson Linux 39.2.0 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — *What's New*, problemas conocidos (consultado el 2026-09-23)
- [Descargas del SDK JetPack](https://developer.nvidia.com/embedded/jetpack/downloads) (consultado el 2026-09-23) — ⚠️ su tabla de componentes está desactualizada en algunas filas; para ver las versiones que realmente instala un sistema 7.2.1, consulte [Verificación del sistema](/es/tutorials/jetson-agx-orin/verify-your-system)
- [Seeed Studio JetPack 7.2 Resource Hub](https://wiki.seeedstudio.com/jetpack_7_2_resource_hub/) — fuente secundaria; utilizada para la organización de los temas de migración (consultado el 2026-09-23)

*Estado: revisado el 2026-10-11. Basado en la documentación
oficial de NVIDIA a la fecha indicada; aún no verificado en hardware físico por
Juxi Technology. La lista de recompilación describe consecuencias estándar de la
plataforma (cambios de versión de kernel/TensorRT/CUDA) — valídela con su propia
pila.*

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página es
publicada por Juxi Technology y no es una publicación de NVIDIA.
