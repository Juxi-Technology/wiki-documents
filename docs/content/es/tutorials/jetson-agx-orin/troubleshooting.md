---
title: Solución de problemas
sidebar_label: Solución de problemas
slug: /support/troubleshooting
description: >-
  Solución de problemas guiada por síntomas para el kit de desarrollo
  Jetson AGX Orin — arranque y pantalla, alimentación, flasheo y problemas
  conocidos, con base en la documentación oficial de NVIDIA.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-23
review_owner: cheny
---

# Solución de problemas

Los problemas están agrupados por síntoma: localice el suyo y siga las
comprobaciones en orden. Todo lo que figura aquí se basa en la documentación
oficial de NVIDIA (las fuentes están al final). Para lo que no se cubra en esta
página, consulte *Cómo obtener ayuda* al final.

## El kit no se enciende

1. La fuente de alimentación USB-C incluida debe conectarse al **puerto USB-C
   situado encima del conector DC** (J24), no al puerto que está junto al
   conector de 40 pines.
2. El kit se enciende automáticamente al conectar la alimentación; si no lo
   hace, pulse el **botón de encendido**.
3. Si utiliza su propia fuente de alimentación a través del conector de barril
   (J41): 5.5 mm OD, 2.5 mm ID, **centro positivo**.

## Sin salida de video / la pantalla se queda en negro

- **DisplayPort es la única salida de video.** No hay puerto HDMI ni
  DisplayPort sobre USB-C. Para un monitor HDMI, utilice un adaptador o cable
  DP→HDMI **activo**.
- El primer arranque puede tardar **hasta un minuto** antes de que aparezca la
  imagen en pantalla.
- Si utiliza un **conmutador KVM**, conecte el monitor directamente al kit: los
  dispositivos KVM son una fuente conocida de problemas de pantalla negra tanto
  durante el arranque normal como durante la instalación por ISO (NVIDIA lo
  indica en la guía de configuración).
- ¿Va a arrancar con una configuración de alimentación problemática? Consulte
  *El sistema se bloquea al reiniciar con una pantalla conectada* más abajo:
  pruebe a arrancar **sin** la pantalla conectada y vuelva a conectarla después
  del arranque.

## Tras la instalación por ISO, el kit arranca el sistema antiguo

Retire la memoria USB de instalación después de la instalación. Si la memoria
permanece insertada, el kit puede volver a arrancar desde ella en lugar del
sistema recién instalado. (Indicación oficial.)

## Flasheo — problemas con Jetson ISO

- **El kit no arranca desde la memoria USB:** abra el **administrador de
  arranque UEFI** durante el arranque y seleccione la unidad USB.
- **Aparece un aviso de la cápsula QSPI:** pulse **`Y`**. Esta actualización de
  la cápsula es necesaria para la compatibilidad y se ejecuta dos veces. Si
  omite el aviso o no está seguro de que se haya completado, **reinicie la
  instalación** y confírmela. Omitir este paso provoca problemas de instalación
  (problema conocido 6266271 de las notas de la versión de NVIDIA).
- **Mi kit es más antiguo que L4T r35.5:** la ruta de la ISO requiere un BSP
  instalado de r35.5 o posterior. Utilice primero los métodos con PC host (SDK
  Manager o `flash.sh`) para actualizar a r35.5+; consulte [Flasheo y
  actualizaciones](/es/tutorials/jetson-agx-orin/flashing-and-updates).

## Flasheo — problemas con SDK Manager

- **Dispositivo no detectado:** compruebe, en orden:
  1. El cable conectado al **puerto USB-C que está junto al conector de 40
     pines** (puerto 10 / J40), no el puerto de alimentación;
  2. El kit ha entrado en **modo Force Recovery**: mantenga pulsado el **botón
     central Force Recovery** mientras inserta el conector de alimentación;
  3. El host cumple los requisitos: Ubuntu Desktop 20.04/22.04 (x86_64), 8 GB
     de RAM, 25 GB de disco libre y una cuenta del NVIDIA Developer Program con
     la sesión iniciada. (Las notas de la versión de L4T 39.2 indican las
     distribuciones de host 24.04/22.04 para el flasheo; consulte la página de
     requisitos del sistema de SDK Manager para ver la lista vigente.)
- **Quiero flashear a NVMe / microSD / unidad USB:** el instalador ISO cubre
  eMMC y NVMe; otros destinos requieren SDK Manager o el script de flasheo (PC
  host).

## El sistema se bloquea al reiniciar con una pantalla conectada (AGX Orin 64GB, modo 15W)

Problema conocido **6236259** de las notas de la versión de NVIDIA: en las
plataformas AGX Orin, reducir la frecuencia de EMC por debajo del máximo (algo
que ocurre en los modos de bajo consumo, como 15W) durante la inicialización de
systemd puede bloquear el sistema al reiniciar, especialmente si hay una
pantalla conectada. Solución alternativa según NVIDIA:

1. Antes de reiniciar, cambie al modo de alimentación **MAXN** (restaura la EMC
   a Fmax).
2. Después de que el sistema se reinicie, aplique el modo de alimentación que
   desee.
3. Si se reinició mientras estaba en el modo problemático: desconecte la
   pantalla, arranque y vuelva a conectar la pantalla después de la
   inicialización.

## Redes y conectividad inalámbrica (notas posteriores al flasheo)

- **No se puede conectar a 6 GHz / WPA3 justo después de flashear:** restablezca
  el dispositivo y vuelva a intentarlo (figura como corregido en L4T 39.2.0; la
  nota sobre el restablecimiento sigue siendo aplicable a las unidades
  flasheadas con imágenes anteriores).
- **Algunos puntos de acceso Wi-Fi no aparecen en los escaneos (entornos con
  mucho tráfico):** aumente el búfer de escaneo —
  `wpa_cli set bss_max_count 500` (de la sección de problemas corregidos de las
  notas de la versión).

## Problemas conocidos más allá de esta página

Antes de depurar a fondo, consulte la sección **Problemas conocidos** de las
notas de la versión vigentes, que abarca elementos generales del sistema,
cámara, multimedia, gráficos, conectividad, pantalla y la pila de computación:

- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)

## Cómo obtener ayuda

- **[Foro de desarrolladores de NVIDIA Jetson](https://forums.developer.nvidia.com/c/robotics-edge-computing/jetson-embedded-systems/70)** — comunidad oficial; busque antes de publicar e incluya la salida de `cat /etc/nv_tegra_release`.
- **Soporte de Juxi Technology** — **support@juxitech.com** para soporte técnico, y para asuntos de pedidos, garantía y RMA. Para agilizar la gestión, incluya su número de pedido y la salida de `cat /etc/nv_tegra_release`. (Ventas: sales@juxitech.com · Preguntas sobre productos: pe@juxitech.com)

## Fuentes

- [Quick Start](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) · [BSP Installation](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html) · [Hardware Layout](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html) — Jetson AGX Orin Developer Kit User Guide (consultado el 2026-09-23)
- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (consultado el 2026-09-23)

*Estado: borrador, pendiente de revisión por cheny. El comportamiento
específico del hardware que notifiquen los clientes puede variar; actualice
esta página a medida que lleguen informes de campo.*

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página es
publicada por Juxi Technology y no es una publicación de NVIDIA.
