---
title: Verificación del sistema — versiones, modo Super y alimentación
sidebar_label: Verificación del sistema
slug: /getting-started/verify-your-system
description: >-
  Compruebe que su kit de desarrollo Jetson Orin Nano Super ejecuta JetPack
  7.2.1 con la pila de componentes completa, la configuración de placa del modo
  Super y los modos de alimentación correctos.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
review_owner: cheny
---

# Verificación del sistema

Después del primer arranque de su sistema JetPack 7.2.1, siga esta lista de comprobación. Confirma la
**versión de L4T**, los **componentes de JetPack instalados**, la **configuración de placa del
modo Super** y los **modos de alimentación**. Si el sistema aún no está configurado, empiece por el
**[Inicio rápido](/es/tutorials/jetson-orin-nano/quick-start)**.

## Paso 1 — Compruebe la versión de L4T (BSP)

```bash
cat /etc/nv_tegra_release
```

Un sistema con **JetPack 7.2.1** informa de **R39** con **REVISION: 2.1**:

```
# R39 (release), REVISION: 2.1, GCID: 46758480, BOARD: generic, EABI: aarch64, DATE: Fri Aug 7 05:54:22 AM UTC 2026
# KERNEL_VARIANT: oot
TARGET_USERSPACE_LIB_DIR=nvidia
TARGET_USERSPACE_LIB_DIR_PATH=usr/lib/aarch64-linux-gnu/nvidia
```

> **Nota de Juxi:** NVIDIA no publica una salida de ejemplo para este archivo. El bloque anterior es
> una salida de r39.2.1 observada por la comunidad en un dispositivo Orin; sus valores de `GCID` y
> `DATE` serán distintos. Lo que importa es `REVISION: 2.1`.

Si la salida muestra una versión más antigua (por ejemplo, R36 de JetPack 6.x), su sistema no
ejecuta JetPack 7.2.1 — consulte **[Flasheo y actualizaciones](/es/tutorials/jetson-orin-nano/flashing-and-updates)** y la
**[migración de JetPack 6 a 7](/es/tutorials/jetson-orin-nano/jetpack-6-to-7)**.

## Paso 2 — Compruebe los componentes y las versiones de JetPack

Los componentes de JetPack como CUDA, cuDNN y TensorRT se instalan como paquetes de Debian.
El comando oficial de NVIDIA para listarlos es:

```bash
apt list --installed | grep nvidia-jetpack
```

El metapaquete `nvidia-jetpack` debe aparecer en la salida. Para comprobar un componente en
concreto, consulte `dpkg` directamente — por ejemplo, cuDNN con `dpkg -l | grep cudnn`. Si falta el
metapaquete, ejecute `sudo apt update` y luego `sudo apt install nvidia-jetpack`, y reinicie si se le
solicita.

La tabla siguiente muestra las versiones oficiales de los componentes de NVIDIA para **JetPack
7.2.1 / Jetson Linux 39.2.1** (consultadas el 2026-09-26 en la página de descargas de JetPack):

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
| Isaac ROS | **Lanzado** — Isaac ROS 4.6.0 (agosto de 2026) añadió compatibilidad con Jetson Orin y con JetPack 7.2; la tabla de componentes de NVIDIA sigue diciendo «próximamente» |

> **Nota de Juxi:** la página de 7.2.1 de NVIDIA muestra una sola matriz para toda la línea JetPack 7
> (Thor y Orin juntos), no por plataforma. `dpkg` puede mostrar versiones con un sufijo de
> compilación — compare el número de versión, no la cadena completa. La tabla de NVIDIA no incluye
> versiones de OpenCV, DLA ni Python, así que esta página tampoco.

> **Sobre la versión de VPI:** la página de descargas de NVIDIA no se ha actualizado del todo
> para 7.2.1 — su fila de VPI todavía lleva el valor de JetPack 7.2 (4.1.3). JetPack 7.2.1 en
> realidad incluye **VPI 4.1.4**, confirmado a partir del propio repositorio de paquetes de
> NVIDIA: `nvidia-jetpack-runtime (= 7.2.1-b49)` depende de `nvidia-vpi (= 7.2.1-b49)`, que
> fija `libnvvpi4 (= 4.1.4)`. Tanto 4.1.3 como 4.1.4 existen en el pool de paquetes, así que
> solo el bloqueo de dependencias es decisivo. (consultado el 2026-09-26)

## Paso 3 — Instale jtop y consulte la actividad del sistema (opcional)

`jtop` forma parte de **jetson-stats**, un proyecto de la comunidad — no un producto de NVIDIA. NVIDIA
no lo documenta para esta versión, y NVIDIA no ha verificado su compatibilidad con L4T r39.

Instálelo siguiendo las instrucciones de la comunidad de la
[página del proyecto jetson-stats](https://pypi.org/project/jetson-stats/).

Después, ejecute `jtop` — un monitor interactivo del sistema y visor de procesos. Vigile los 8 GB
compartidos de memoria unificada antes de iniciar una carga de trabajo de IA grande. Una alternativa
oficial es `sudo tegrastats` (actividad en vivo de CPU, GPU, memoria, temperatura y energía;
`Ctrl`+`C` lo detiene). La página How-To de NVIDIA recomienda `tegrastats` en lugar de `nvidia-smi`
para la monitorización en Jetson.

## Paso 4 — Compruebe la configuración de placa del modo Super (TNSPEC)

Las instalaciones por ISO de JetPack 7.2.1 flashean la configuración del **modo Super** de forma predeterminada. Confírmela en el dispositivo:

```bash
cat /etc/nv_boot_control.conf
```

En un kit configurado como Super, la línea `TNSPEC` lleva un sufijo `-super`. El personal de NVIDIA
publicó este ejemplo:

```
TNSPEC 3767-300-0005-S.1-1-1-jetson-orin-nano-devkit-super-
```

En un kit sin Super, la misma línea termina sin `-super` — por ejemplo, según el informe de un usuario
de un sistema afectado: `TNSPEC 3767-300-0005-X.1-1-1-jetson-orin-nano-devkit-`

> **Nota de Juxi:** los caracteres del medio de la cadena TNSPEC varían según la unidad y el estado
> del firmware. Lo que importa es el sufijo `-super` al final de la línea TNSPEC.

Problema **6480645** de las notas de la versión: después de una instalación por ISO, la variable de la
UEFI `TegraPlatformSpec` puede no reflejar con exactitud la especificación de la placa. NVIDIA indica
que se lea la entrada `TNSPEC` de `/etc/nv_boot_control.conf` para obtener la información correcta de
la placa.

## Paso 5 — Compruebe los modos de alimentación

El modo de alimentación predeterminado suele ser **25W**. Desde el escritorio: haga clic en el modo de
alimentación de la barra superior de Ubuntu, seleccione **Power Mode** y elija **MAXN SUPER**. Desde
la línea de comandos, imprima el modo activo y su ID de modo:

```bash
sudo /usr/sbin/nvpmodel -q
```

Para cambiar de modo, use el ID que muestra la consulta (`sudo /usr/sbin/nvpmodel -m <mode_id>`).
Cómo distinguir un kit con Super de uno sin Super:

| | Configuración Super | Configuración sin Super |
|---|---|---|
| Modos disponibles | 15W, 25W, **MAXN SUPER** | Solo 7W, 15W |
| ID de modos (observados por la comunidad) | 0 = 15W, 1 = 25W, 2 = MAXN_SUPER; predeterminado 25W | 0 = 15W, 1 = 7W |
| `sudo nvpmodel -m 2` | selecciona MAXN SUPER | falla: `NVPM ERROR: request for bad power mode 2` |

> **Consejo de Juxi:** los ID de modo provienen de un informe de la comunidad sobre los archivos de
> perfil de un sistema 7.2; el menú de energía del escritorio lista directamente los modos
> disponibles. Después de que la GPU se haya usado, un cambio de modo de alimentación puede pedir un
> reinicio — el personal de NVIDIA dice que ese aviso es lo esperado.

## Si solo aparecen 7W y 15W

Este es un problema conocido de JetPack 7.2, corregido por diseño en 7.2.1.

- En **JetPack 7.2 (L4T 39.2)**, el problema conocido **6279443** dice que las unidades actualizadas
  mediante el instalador ISO «no se predeterminarán al modo Super»; la indicación de NVIDIA era
  flashear el destino con un host Linux o con SDK Manager.
- **JetPack 7.2.1** cambia esto: «La ISO ahora flashea el Jetson Orin Nano Developer Kit con
  la configuración de flasheo del modo Super de forma predeterminada.» El problema 6279443 no
  figura en la lista de problemas conocidos de 7.2.1, y el personal de NVIDIA afirmó: «Esto se
  corregiría en jp7.2.1.»

Una instalación nueva por ISO de 7.2.1 debería mostrar 25W y MAXN SUPER. Si su kit no lo hace:

1. Para un sistema instalado con la ISO 7.2, vuelva a flashear con la configuración Super desde un
   host Linux o con SDK Manager — consulte **[Flasheo y actualizaciones](/es/tutorials/jetson-orin-nano/flashing-and-updates)**.
2. NVIDIA no indica si una reinstalación por ISO de 7.2.1 convierte una placa que se instaló con
   la ISO 7.2. Si siguen faltando los modos Super, use las opciones de reflasheo de
   **[Solución de problemas](/es/tutorials/jetson-orin-nano/troubleshooting)**.

La misma pregunta está indexada en las **[Preguntas frecuentes](/es/tutorials/jetson-orin-nano/faq)**.

## Cómo se ve un sistema correcto

| Comprobación | Comando | Lo que muestra un sistema correcto |
|---|---|---|
| Versión de L4T | `cat /etc/nv_tegra_release` | `R39 (release), REVISION: 2.1` |
| Paquetes de JetPack | `apt list --installed \| grep nvidia-jetpack` | Paquetes de JetPack instalados, incluido el metapaquete `nvidia-jetpack` |
| Comprobación puntual de cuDNN | `dpkg -l \| grep cudnn` | Versión 9.20.0 |
| Configuración de la placa | `cat /etc/nv_boot_control.conf` | La línea `TNSPEC` termina en `jetson-orin-nano-devkit-super-` |
| Modos de alimentación | `sudo /usr/sbin/nvpmodel -q` | El modo activo es 25W de forma predeterminada; 15W, 25W y MAXN SUPER son seleccionables |

## Si algo sigue mal

Componentes que faltan: vuelva a ejecutar los dos comandos del paso 2. Para problemas de configuración
Super o de modos de alimentación, consulte **[Flasheo y actualizaciones](/es/tutorials/jetson-orin-nano/flashing-and-updates)** y **[Solución de problemas](/es/tutorials/jetson-orin-nano/troubleshooting)**.
Antes de pedir ayuda, recoja `cat /etc/nv_tegra_release` y `cat /etc/nv_boot_control.conf`
— el personal de NVIDIA solicita este estado (además de `sudo /usr/sbin/nvpmodel -q --verbose`) antes de cualquier
solución alternativa con archivos de configuración. Soporte de Juxi: **support@juxitech.com** con su número de pedido.

## Fuentes

- [JetPack SDK Setup](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html) · [How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) — Jetson Orin Nano Developer Kit User Guide (consultado el 2026-09-26)
- [JetPack SDK Downloads and Release Notes](https://developer.nvidia.com/embedded/jetpack/downloads) (consultado el 2026-09-26)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) · [39.2 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (consultado el 2026-09-26)
- [Foro de NVIDIA — 25W y MAXN SUPER no aparecen en JetPack 7.2](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) · [problemas de modo de alimentación continuos](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435) · [el modo Super no se desbloquea](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003) (consultado el 2026-09-26; incluye respuestas del personal de NVIDIA)
- [jetson-stats (jtop) en PyPI](https://pypi.org/project/jetson-stats/) · [Jetson AI Lab](https://www.jetson-ai-lab.com/) (consultado el 2026-09-26; fuentes de la comunidad para la instalación de jtop)

*Estado: revisado el 2026-10-11. Basado en la documentación oficial de NVIDIA y en fuentes
del foro de NVIDIA en las fechas indicadas; aún no verificado en hardware físico por Juxi Technology.*

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página es publicada
por Juxi Technology y no es una publicación de NVIDIA.
