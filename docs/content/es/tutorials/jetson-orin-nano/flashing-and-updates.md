---
title: Flasheo y actualizaciones — Opciones de instalación del BSP
sidebar_label: Flasheo y actualizaciones
slug: /getting-started/flashing-and-updates
description: >-
  Las tres formas oficiales de instalar o actualizar el BSP en el kit de
  desarrollo Jetson Orin Nano Super — Jetson ISO (recomendada), NVIDIA SDK
  Manager y el script de flasheo Linux_for_Tegra — además de la decisión de
  almacenamiento, la ruta de actualización de firmware JetPack 6.x para kits
  más antiguos y el modo Force Recovery.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_bsp.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/DeveloperGuide/IN/QuickStart.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://developer.nvidia.com/w/sdkmanager/resources/instructions/monitor_mode_installation_orin.html
    checked: 2026-09-26
review_owner: cheny
---

# Flasheo y actualizaciones — Opciones de instalación del BSP

NVIDIA admite tres formas oficiales de instalar o actualizar el BSP (Jetson Linux) en el kit
de desarrollo Jetson Orin Nano Super. Dos hechos de hardware condicionan todas ellas: **no hay
almacenamiento en la caja** (ni eMMC, ni tarjeta microSD, ni SSD), y JetPack 7.2 **eliminó las
imágenes de tarjeta SD** — la ISO unificada en una unidad USB las sustituye, mientras que la
tarjeta microSD en sí sigue siendo un destino de instalación válido.

| | Jetson ISO (recomendada) | NVIDIA SDK Manager | Script de flasheo Linux_for_Tegra |
|---|---|---|---|
| Resumen breve | Arranque el kit desde un instalador USB creado en cualquier PC; elija el almacenamiento de destino en el kit | Herramienta con GUI en un PC host; flashea el BSP al almacenamiento elegido a través de USB-C | Herramientas de flasheo de línea de comandos en un PC host; control directo del destino |
| PC host con Ubuntu | No requerido | Requerido (x86_64) | Requerido (x86_64) |
| Tiempo típico | No publicado; el instalador muestra salida «durante varios minutos» | No publicado; el host descarga primero el BSP y el sistema de archivos raíz | Depende de su configuración |
| Dirigido a | Configuración inicial en un kit nuevo; la mayoría de los usuarios | Usuarios con un PC con Ubuntu; la ruta preferida de NVIDIA para flashear directamente a un SSD NVMe; también se usa para actualizaciones de firmware | Usuarios avanzados y desarrolladores de producto |

NVIDIA no publica tiempos de instalación; los informes del foro van de unos 15 minutos a dos horas
(sin confirmar).

> **Nota de Juxi:** la versión actual es **JetPack 7.2.1 (L4T r39.2.1)**. Si su kit es nuevo,
> empiece por el **[Inicio rápido](/es/tutorials/jetson-orin-nano/quick-start)** — le guía de
> principio a fin por la ruta de la ISO recomendada. Vuelva aquí para comparar rutas, elegir
> almacenamiento o actualizar un kit más antiguo.

## Opción 1 — Jetson ISO (recomendada)

La Jetson ISO es la ruta de configuración inicial recomendada por NVIDIA y la única que no
necesita un PC host con Ubuntu: escriba un archivo ISO en una unidad USB desde cualquier
ordenador, arranque el kit desde la unidad e instale en el almacenamiento que haya preparado.
Prepare estos elementos:

- **Almacenamiento de destino** (el kit no incluye ninguno; véase la sección de almacenamiento
  más abajo): una **tarjeta microSD de 64 GB UHS-1 o más (recomendada)**, insertada en la ranura
  de la **parte inferior del módulo** antes de arrancar el instalador, o un **SSD NVMe**
  (opcional; recomendado para más capacidad y mejor rendimiento de almacenamiento).
- **Una unidad USB de 16 GB o más** — se convertirá en la unidad de instalación.
- **Un portátil o PC (Windows, Mac o Linux) con al menos 25 GB libres**, para escribir la ISO.
- **Un monitor con DisplayPort y un teclado USB** (o un cable serie USB-TTL para una
  configuración headless; HDMI no es compatible), además de la fuente de alimentación de 19 V
  incluida.

Dos precauciones deciden el éxito: el firmware debe ser de la generación JetPack 6.x — si la
pantalla se queda negra o aparece un shell de la UEFI, ejecute primero la ruta de actualización
de JetPack 6.x que figura más abajo — y en el aviso de la cápsula QSPI pulse `Y` en un plazo de
30 segundos; un aviso que se agota hace que la instalación falle más adelante, así que reinicie
la instalación y pulse `Y`.

> **Importante** — escriba la ISO en la **unidad USB, no en una tarjeta microSD** («No flashee
> la Jetson ISO a una tarjeta microSD»). La instalación también **borra el almacenamiento de
> destino seleccionado**; confirme qué dispositivo ha seleccionado antes de empezar.

El procedimiento completo paso a paso — descarga de la ISO, Balena Etcher, gestor de arranque
UEFI, el menú GRUB, selección del almacenamiento, configuración inicial de Ubuntu al primer
arranque — está en el **[Inicio rápido](/es/tutorials/jetson-orin-nano/quick-start)**. La unidad
USB del instalador **no es un «Live USB»** (solo instala), así que retírela después de la
instalación cuando se le solicite.

## Opción 2 — NVIDIA SDK Manager (PC host)

SDK Manager es la ruta con PC host: flashea el BSP a través de USB-C y también puede actualizar
el firmware del kit (véase la sección de la ruta de actualización más abajo).

**Requisitos del PC host** (según la página de configuración del BSP del kit): un **PC x86 con
Ubuntu 22.04 o Ubuntu 20.04**; **acceso a internet y una cuenta gratuita del NVIDIA Developer
Program**; un **cable USB** para el puerto USB-C del kit, además de «un pin de puente o un clip
metálico»; y un monitor o un cable serie USB-TTL para el kit.

> **Nota de Juxi:** las fuentes de NVIDIA no coinciden aquí. La página de configuración del kit
> indica Ubuntu 22.04 o 20.04; las notas de la versión de L4T r39.2.1 indican «Ubuntu 24.04 y
> 22.04» como distribución del host para el flasheo. Consulte los requisitos de SDK Manager de
> NVIDIA antes de preparar un PC host.

**Instale SDK Manager en el host.** La página de configuración de NVIDIA ofrece los comandos
exactos para Ubuntu 22.04 y 20.04; ejecútelo con `sdkmanager` e inicie sesión con sus
credenciales de NVIDIA Developer (se abre una ventana del navegador; puede aparecer la
autenticación de dos factores).

**Flashee el BSP** (resumen; siga las instrucciones en pantalla). SDK Manager flashea a través
de USB, así que ponga primero el kit en modo Force Recovery (véase más abajo):

1. Seleccione **Jetson Orin Nano [8GB developer kit version]** y haga clic en **OK**; desmarque
   **Host Machine** para que solo quede seleccionado el destino Jetson; haga clic en
   **Continue**; en el siguiente paso, deje seleccionado únicamente **Jetson Linux**; acepte la
   licencia e introduzca la contraseña de sudo del host.
2. En el cuadro de diálogo de flasheo (SDK Manager descarga antes los paquetes): seleccione
   **Runtime for OEM Configuration**; seleccione **NVMe** o **SD Card** como almacenamiento;
   haga clic en **Flash**.
3. Cuando termine el flasheo, retire el puente del conector J14, apague y vuelva a encender el
   kit, y complete la configuración inicial de Ubuntu (oem-config).

> **Nota de Juxi — el SKU del módulo:** este kit contiene el módulo **P3767-0005**, que NVIDIA
> documenta como «Jetson Orin Nano 8GB (P3767-0005, solo para desarrollo)». El módulo comercial
> Orin Nano de 8GB es **P3767-0003** — un SKU distinto que no forma parte de este kit. Use la
> entrada de destino que NVIDIA nombra para este kit: **Jetson Orin Nano [8GB developer kit
> version]**.

## Opción 3 — Script de flasheo Linux_for_Tegra

Para usuarios avanzados y desarrolladores de producto: flasheo por línea de comandos con el
Driver Package de Jetson Linux. Según la página de configuración de NVIDIA: descargue el Driver
Package y el sistema de archivos raíz de ejemplo para su versión de JetPack; extraiga el Driver
Package en un host Ubuntu x86_64; extraiga el sistema de archivos raíz de ejemplo en
`Linux_for_Tegra/rootfs` y ejecute `apply_binaries.sh` desde `Linux_for_Tegra`; ponga el kit en
modo Force Recovery (más abajo); y después ejecute el comando de flasheo adecuado para el
destino Jetson Orin Nano Developer Kit. Los nombres de destino y los comandos detallados están
en la Jetson Linux Developer Guide.

- Los nombres de destino del kit son `jetson-orin-nano-devkit` y `jetson-orin-nano-devkit-super`;
  NVIDIA señala que la configuración Super tiene «un mayor presupuesto de energía y pasos de
  frecuencia de reloj ampliados».
- El ejemplo de la Developer Guide para este kit — NVMe con la configuración Super:
  `sudo ./l4t_initrd_flash.sh --erase-all jetson-orin-nano-devkit-super internal`
  (la opción `--erase-all` borra los datos del almacenamiento de destino).
- De las notas de la versión de L4T r39.2.1: host de flasheo — Ubuntu 24.04 / 22.04; cadena de
  herramientas — GCC 13.2; etiqueta de la versión del código fuente — `jetson_39.2.1_GA`. De la
  página de descargas de JetPack: paquete del BSP — `Jetson_Linux_R39.2.1_aarch64.tbz2`.

## Elección del almacenamiento de destino: microSD frente a SSD NVMe

El instalador solo ofrece el almacenamiento que está **ya conectado** cuando arranca. Decídalo
primero, instale el almacenamiento y luego inicie el instalador.

| | Tarjeta microSD | SSD NVMe |
|---|---|---|
| Especificación | 64 GB UHS-1 o más, recomendada | Una unidad PCIe NVMe en una ranura M.2 Key-M |
| Dónde va | Ranura en la **parte inferior del módulo** | Ranura M.2 Key-M 2280 (PCIe 3.0 x4) o ranura 2230 (PCIe 3.0 x2) |
| Por qué elegirla | El almacenamiento predeterminado del módulo; la opción más sencilla y económica | Más capacidad y mejor rendimiento de almacenamiento; recomendado para modelos de IA, contenedores, conjuntos de datos y archivos de proyecto |

**La microSD sigue siendo un destino de instalación válido.** JetPack 7.2 eliminó el *archivo
de imagen* de tarjeta SD — no el *destino* microSD: con el flujo de la ISO, arranque el
instalador USB con la tarjeta insertada y selecciónela (SDK Manager también puede flashear una
tarjeta microSD desde el host). La ranura microSD está en la **parte inferior del módulo**.
Todas las rutas de instalación **borran el almacenamiento de destino seleccionado**, así que no
seleccione una unidad que contenga datos que necesite. Si el instalador no ofrece su unidad
NVMe, consulte **[Solución de problemas](/es/tutorials/jetson-orin-nano/troubleshooting)**;
para consejos de compra, consulte las **[Preguntas frecuentes](/es/tutorials/jetson-orin-nano/faq)**.

## Kits más antiguos: la ruta de actualización de JetPack 6.x

**Cuándo es necesario:** JetPack 7.2 y posteriores requieren firmware UEFI/QSPI de la generación
JetPack 6.x. La regla de NVIDIA: firmware **36.x o posterior** — el kit está listo; **anterior
a 36.0** — complete primero esta ruta (compruebe la versión en el menú de la UEFI; pasos en el
[Inicio rápido](/es/tutorials/jetson-orin-nano/quick-start)). Dos rutas oficiales: el **flujo
puente con microSD** (más abajo) necesita una tarjeta microSD pero ningún PC host con Ubuntu;
**SDK Manager** (opción 2) necesita un PC host con Ubuntu y es la alternativa que NVIDIA nombra
para la actualización de firmware/QSPI.

El flujo puente, en el orden documentado por NVIDIA:

1. Escriba la **imagen puente de JetPack 5.1.3** (`JP513-orin-nano-sd-card-image_b29.zip` — use
   la imagen actualizada) en una tarjeta microSD, arranque el kit desde ella, complete la
   configuración inicial de Ubuntu del primer arranque y conecte el kit a internet.
2. Un servicio en segundo plano programa entonces una actualización del gestor de arranque
   (puede aparecer una notificación en el escritorio). Confírmelo con
   `sudo systemctl status nv-l4t-bootloader-config` — «Una ejecución de programación completada
   muestra el servicio como inactivo con un estado de salida correcto».

   ![Notificación de actualización del gestor de arranque en el escritorio de Jetson Linux](/images/jetson-orin-nano/nvidia-l4t-bootloader-post-install-notification.png)

3. Reinicie; la actualización de firmware se ejecuta durante el arranque. Compruebe después el
   estado con `sudo nvbootctrl dump-slots-info` — la salida de ejemplo de NVIDIA en esta etapa
   es «Current version: 35.5.0».

   ![Progreso de la actualización de firmware desde el firmware de JetPack 6.x](/images/jetson-orin-nano/fw-update_from_36-4.3.jpg)

4. Instale el actualizador de QSPI: `sudo apt update`, luego
   `sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater`; reinicie y deje que la
   actualización se complete.
5. El firmware ya está listo para la generación JetPack 6.x, y la tarjeta 5.1.3 ya no es el
   medio de arranque de destino. Apague y, a continuación, ejecute la instalación de JetPack
   7.2.1 desde la unidad USB del instalador (véase el
   [Inicio rápido](/es/tutorials/jetson-orin-nano/quick-start)).

Notas adicionales: pasar por JetPack 6.2.x puede programar **otra** actualización de firmware de
la UEFI después de su primer arranque — reinicie de nuevo cuando se le solicite. Según las notas
de la versión de r39.2.1 (problema conocido 6379600), la actualización de cápsula durante una
instalación por ISO no admite unidades de la versión **BSP 36.2 / JetPack 5.0 DP** — actualice
esas unidades a una versión posterior primero.

## Modo Force Recovery — cómo entrar

El modo Force Recovery (RCM) es el estado que necesita un PC host para el flasheo. NVIDIA
documenta tres formas:

1. **Desde un terminal en un sistema en ejecución:** `sudo reboot --force forced-recovery`.
2. **Con el kit apagado:** conecte el pin 9 y el pin 10 del conector de botones (la página de
   configuración lo llama conector J14) y, a continuación, enchufe la fuente DC para encender.
3. **Con el kit ya encendido:** conecte los pines 9 y 10 y, después, conecte temporalmente los
   pines 7 y 8 para reiniciar el sistema.

Después de entrar en RCM, retire el puente (o los puentes) una vez que el host detecte el
dispositivo. El **puerto USB-C** lleva la conexión de flasheo (funciona como modo USB Recovery)
y, en el host, `lsusb` debe mostrar un dispositivo USB de NVIDIA antes de empezar a flashear.

## Reinstalación y actualización

**Actualice los componentes de JetPack en el kit en ejecución** con `sudo apt update` y luego
`sudo apt install nvidia-jetpack` — véase el
[Inicio rápido](/es/tutorials/jetson-orin-nano/quick-start).

**Reinstale el BSP (la misma versión de JetPack o una posterior).** Ejecute de nuevo cualquiera
de las tres rutas; el flujo de la ISO es la opción en el propio dispositivo. Advertencia de
NVIDIA para las reinstalaciones por ISO: «Si va a reinstalar JetPack 7.2.1 usando la ISO en un
sistema que ya está instalado, siga cuidadosamente las instrucciones de la Getting Started
Guide.» La reinstalación **borra el almacenamiento de destino** (haga una copia de seguridad
primero) y, si aparece el aviso de la cápsula QSPI, pulse `Y` en un plazo de 30 segundos. Retire
la unidad USB del instalador al terminar, para que el kit arranque el nuevo sistema.

**Modo Super después de una reinstalación.** La ISO 7.2.1 «flashea el Jetson Orin Nano Developer
Kit con la configuración de flasheo del modo Super de forma predeterminada». En la versión
anterior 7.2, un kit actualizado por ISO conservaba su perfil anterior y podía quedarse sin los
modos 25 W / MAXN SUPER (problema conocido 6279443 de r39.2; la indicación de NVIDIA era
flashear desde un host Linux o con SDK Manager). NVIDIA no ha documentado si volver a ejecutar
la ISO 7.2.1 convierte en Super una instalación existente que no lo sea. Si a su kit le faltan
los modos 25 W / MAXN SUPER, consulte
**[Solución de problemas](/es/tutorials/jetson-orin-nano/troubleshooting)**.

**Cambio entre versiones principales de JetPack.** Para ver la lista de cambios y las notas de
reversión de JetPack 6.x → 7.2.1, consulte
**[JetPack 6.x → 7.2.1](/es/tutorials/jetson-orin-nano/jetpack-6-to-7)**. Después de cualquier
instalación o actualización, verifique el resultado:
**[Verificación del sistema](/es/tutorials/jetson-orin-nano/verify-your-system)**.

## Fuentes

- [BSP Setup — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_bsp.html) (consultado el 2026-09-26)
- [Quick Start — la misma guía](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (consultado el 2026-09-26)
- [JetPack 6.x Update Path — la misma guía](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (consultado el 2026-09-26)
- [How-To — la misma guía](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (consultado el 2026-09-26)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (consultado el 2026-09-26)
- [Jetson Linux Developer Guide (r39.2.1) — Quick Start](https://docs.nvidia.com/jetson/archives/r39.2.1/DeveloperGuide/IN/QuickStart.html) (consultado el 2026-09-26)
- [JetPack Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (consultado el 2026-09-26)
- [SDK Manager — monitor-attached installation instructions](https://developer.nvidia.com/w/sdkmanager/resources/instructions/monitor_mode_installation_orin.html) (consultado el 2026-09-26)

*Estado: borrador, pendiente de revisión por cheny. Basado en la documentación oficial de NVIDIA en las
fechas indicadas; aún no verificado en hardware físico por Juxi Technology.*

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página es publicada por Juxi
Technology y no es una publicación de NVIDIA.
