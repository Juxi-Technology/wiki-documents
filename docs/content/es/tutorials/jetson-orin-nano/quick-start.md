---
title: Inicio rápido — Del desembalaje a un sistema JetPack 7.2.1 funcional
sidebar_label: Inicio rápido
slug: /getting-started/quick-start
description: >-
  Configuración inicial del kit de desarrollo NVIDIA Jetson Orin Nano Super
  (8GB): la comprobación del firmware, la escritura de la ISO de Jetson 7.2.1 en
  una unidad USB y la instalación de JetPack 7.2.1 (L4T r39.2.1) en una tarjeta
  microSD o un SSD NVMe.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
review_owner: cheny
---

# Inicio rápido

Esta página lleva su kit de desarrollo NVIDIA Jetson Orin Nano Super (8 GB) desde la caja hasta un sistema **JetPack 7.2.1** funcional (Jetson Linux / L4T r39.2.1). Sigue la ruta de configuración inicial recomendada por NVIDIA: el método de la **Jetson ISO**, instalado desde una unidad USB. No se necesita ningún PC host con Ubuntu.

**La ruta en tres fases:**

1. **Supere el requisito del firmware.** El firmware de fábrica más antiguo debe actualizarse antes de poder instalar JetPack 7.2 (paso 1).
2. **Cree la unidad USB de instalación.** Descargue la Jetson ISO y escríbala en una unidad USB con Balena Etcher (pasos 2 y 3).
3. **Instale y configure.** Instale en una tarjeta microSD o un SSD NVMe, complete la configuración inicial de Ubuntu y luego añada los componentes de JetPack (pasos 4 a 7).

> **Importante**
> A partir de JetPack 7.2, NVIDIA ya no publica imágenes de tarjeta microSD
> para este kit. **No hay ninguna imagen de tarjeta SD que flashear**. El medio
> de instalación es una unidad USB. La tarjeta microSD (o el SSD NVMe) es solo
> el **destino de instalación**. Los tutoriales antiguos que empiezan por
> «escriba la imagen en una tarjeta microSD» ya no son aplicables.

## Contenido de la caja

- El módulo Jetson Orin Nano de 8 GB con disipador de calor, montado en la placa portadora de referencia
- Una fuente de alimentación de 19 V
- Un controlador de interfaz de red inalámbrica 802.11ac/ab/gn (instalado en la ranura M.2 Key-E)
- Una tarjeta de inicio rápido y soporte

**No se incluye ningún medio de almacenamiento.** La caja no contiene tarjeta microSD ni SSD NVMe, y el módulo no tiene almacenamiento eMMC integrado. Todo el almacenamiento proviene de la tarjeta o la unidad que instale usted.

## Qué debe aportar usted

- **Almacenamiento — una de las siguientes opciones:**
  - Una **tarjeta microSD de 64 GB UHS-1 o más** (recomendada). Se inserta en la ranura de la **parte inferior del módulo**. Insértela antes de arrancar el instalador.
  - Un **SSD NVMe** para una de las ranuras M.2 Key-M de la placa portadora. Opcional, pero recomendado para más capacidad y mejor rendimiento de almacenamiento.
- Una **unidad USB de 16 GB o más** — se convertirá en la unidad de instalación.
- Un **portátil o PC** (Windows, Mac o Linux) con al menos **25 GB libres** — para descargar la ISO y escribir en la unidad USB.
- Un **monitor con DisplayPort**, además de un teclado y un ratón USB. DisplayPort es la única salida de visualización de este kit; no se admiten la salida HDMI ni DisplayPort sobre USB-C. Un adaptador activo DisplayPort a HDMI funciona con un monitor HDMI.
- Sin monitor: un **cable serie USB-TTL** para una consola serie headless (véase el paso 1).

![Tarjeta microSD](/images/jetson-orin-nano/microsd_64gb.png)
*Opción de almacenamiento de destino 1: una tarjeta microSD UHS-1 de 64 GB.*

![SSD NVMe](/images/jetson-orin-nano/ssd_nvme_1tb.png)
*Opción de almacenamiento de destino 2: un SSD NVMe en la ranura M.2 Key-M.*

> **Nota de Juxi:** el paquete de la tienda Juxi para este kit incluye además
> una tarjeta microSD de 64 GB y un módulo Wi-Fi M.2. La tarjeta se envía **sin
> imagen preinstalada** (en blanco), así que siga el procedimiento de la ISO de
> esta página para instalar el sistema en ella.

## Paso 1 — Compruebe el requisito del firmware

Las instalaciones de JetPack 7.2 y posteriores **requieren firmware UEFI/QSPI de la generación JetPack 6.x** en el kit de desarrollo. Si su kit aún tiene firmware de fábrica más antiguo, complete primero la **ruta de actualización de JetPack 6.x**.

Con un monitor conectado:

1. Conecte el monitor DisplayPort y un teclado USB. Conecte la fuente de alimentación de 19 V: el kit se enciende automáticamente y se ilumina un LED verde junto al conector USB-C.
2. **Pulse `Esc` repetidamente cuando aparezca la pantalla de arranque de NVIDIA.** Así se abre el menú de configuración de la UEFI.
3. Compruebe la línea de **versión de firmware** cerca de la parte superior de la pantalla:

| Versión de firmware | Qué hacer |
|---|---|
| 36.x o posterior | Continúe con el paso 2 |
| Anterior a 36.0 | Complete primero la ruta de actualización de JetPack 6.x (véase más abajo) |

![Menú de la UEFI con la versión de firmware](/images/jetson-orin-nano/firmware-version-check.png)
*La versión de firmware aparece cerca de la parte superior del menú de configuración de la UEFI.*

Alternativa headless: conecte un cable serie USB-TTL al conector de botones (cable TX del adaptador al pin 3 / RXD, cable RX del adaptador al pin 4 / TXD, cable de tierra del adaptador al pin 7 / GND), abra una consola serie en su PC y pulse `Esc` en la consola mientras se muestran las opciones de prearranque.

![Cable serie USB-TTL en el conector de botones](/images/jetson-orin-nano/jon_adafruit_uart_cable.jpg)
*Ruta headless: un cable serie USB-TTL conectado al conector de botones.*

### Si el firmware es demasiado antiguo

La **ruta de actualización de JetPack 6.x** pone el firmware al día. En resumen (los pasos completos están en [Flasheo y actualizaciones](/es/tutorials/jetson-orin-nano/flashing-and-updates)):

1. Arranque la **imagen puente de JetPack 5.1.3** (nombre de archivo `JP513-orin-nano-sd-card-image_b29.zip`) desde una tarjeta microSD.
2. Un servicio en segundo plano programa una actualización del gestor de arranque (compruébelo con `sudo systemctl status nv-l4t-bootloader-config`).
3. Reinicie. La actualización de firmware se ejecuta durante este arranque (compruébelo con `sudo nvbootctrl dump-slots-info`).
4. Instale el actualizador de QSPI: `sudo apt update`, luego `sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater` y, después, reinicie.
5. Apague, retire la tarjeta puente, inserte su almacenamiento de destino y continúe con el paso 2.

Esta ruta necesita una tarjeta microSD y un lector de tarjetas. Sin ellos, la alternativa es SDK Manager en un host con Ubuntu (véase [Flasheo y actualizaciones](/es/tutorials/jetson-orin-nano/flashing-and-updates)). Un caso más: si el firmware procede del BSP 36.2 (JetPack 5.0 DP), la actualización de cápsula del instalador no lo admite — lleve el kit a cualquier versión posterior antes de ejecutar la instalación de la ISO de JetPack 7.2.1.

Si arranca el instalador de todos modos y la pantalla se queda negra o cae a un shell de la UEFI, probablemente el firmware sea demasiado antiguo. No reintente el arranque repetidamente. Apague, complete la ruta de actualización y vuelva a intentarlo.

![Shell interactivo de la UEFI](/images/jetson-orin-nano/uefi_interactive_shell.png)
*Un shell de la UEFI (o una pantalla negra) en lugar del instalador suele significar que el firmware es demasiado antiguo para la versión de JetPack de destino.*

## Paso 2 — Descargue la Jetson ISO

Descargue la ISO del instalador de JetPack 7.2.1 (etiqueta: **Jetson ISO (r39.2.1)**) desde la
[página de descargas de JetPack](https://developer.nvidia.com/embedded/jetpack/downloads), o utilice este enlace directo:

<https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso/jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso>

Los nombres de archivo de la ISO siguen el patrón `jetsoninstaller-r<L4T version>-<timestamp>-arm64.iso` (para esta versión: `jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso`). Las páginas de descarga de NVIDIA no indican el tamaño del archivo ISO ni las sumas de comprobación.

## Paso 3 — Escriba la ISO en una unidad USB

1. Instale **Balena Etcher** desde <https://etcher.balena.io/#download-etcher> (Windows, Mac o Linux).
2. Inserte la unidad USB en su PC.
3. En Etcher, seleccione el archivo ISO, seleccione la unidad USB y comience la escritura.

![Escritura de la Jetson ISO en una unidad USB con Balena Etcher](/images/jetson-orin-nano/jetson-iso_etcher-flash-start.gif)
*Escritura de la Jetson ISO en la unidad USB con Balena Etcher.*

> **Atención**
> **No escriba la ISO en una tarjeta microSD.** A partir de JetPack 7.2, ya no
> se admiten imágenes de tarjeta SD. Escriba la ISO en una unidad USB y luego
> úsela para instalar Jetson Linux en su tarjeta microSD o SSD NVMe.

Copiar el archivo ISO a la unidad con un gestor de archivos no funciona: debe escribirse como imagen de disco. La unidad resultante es solo un instalador; no puede arrancar en un escritorio utilizable.

## Paso 4 — Arranque el instalador e instale

1. Apague el kit y, a continuación, instale el **almacenamiento de destino**:
   - tarjeta microSD: insértela en la ranura de la **parte inferior del módulo**.
   - SSD NVMe: instálelo en la ranura M.2 Key-M de la placa portadora.
   Instale el almacenamiento de destino antes de arrancar el instalador.
2. Inserte la unidad USB del instalador. Conecte el monitor, el teclado y el ratón; después, conecte la fuente de alimentación. Enchufe la unidad del instalador **directamente** al kit, no a través de un hub: NVIDIA documenta un hub USB 3.0 (modelo UH400) que rompe la instalación por ISO, y un adaptador USB a Ethernet (TRENDnet TU2-ET100) que puede hacer fallar el flasheo. Consulte **[Solución de problemas](/es/tutorials/jetson-orin-nano/troubleshooting)**.
3. **Pulse `Esc` cuando aparezca la pantalla de arranque con el logotipo de NVIDIA.** Seleccione **Boot Manager**, elija su disco USB y pulse Enter para arrancar desde él. NVIDIA recomienda seleccionar el disco USB explícitamente, para que sepa que se está ejecutando el instalador correcto.
4. **Cuando aparezca el aviso de actualización de la cápsula QSPI, pulse `Y` en un plazo de 30 segundos.** Este es el paso que más se omite. El aviso es fácil de pasar por alto en tiempo real. Si se agota el tiempo y la instalación continúa sin la actualización, la instalación fallará más adelante: reinicie la instalación y pulse `Y` cuando aparezca el aviso. La actualización de la cápsula se ejecuta en **dos pasadas**, y el kit puede reiniciarse entre ellas o después. Esto es lo esperado; espere a que terminen ambas pasadas. Los kits cuyo firmware QSPI actual sea r38.2.0/r38.2.1 deben confirmar la actualización de firmware una segunda vez tras completarse la primera pasada (problema 6480645 de las notas de la versión de r39.2.1) — pulse `Y` de nuevo si se le solicita.
5. En el **menú GRUB de instalación del BSP de Jetson**, seleccione **Install Jetson ISO r39.2.1**. Elija el dispositivo de almacenamiento de destino (la tarjeta microSD o el SSD NVMe) y confirme. **La instalación borra el dispositivo seleccionado** — compruebe la selección antes de confirmar.
6. Espere a que termine la instalación. Las instrucciones de NVIDIA indican que aparece texto blanco desplazándose por la pantalla durante varios minutos; reinicie cuando se le solicite. Los informes de la comunidad sobre el tiempo de instalación varían mucho — desde unos 15 minutos hasta bastante más (sin confirmar, informes del foro).
7. **Retire la unidad USB** para que el kit arranque el nuevo sistema desde el almacenamiento de destino y no de nuevo desde el instalador.

El personal de NVIDIA en los foros también recomienda mantener un monitor conectado durante la instalación por ISO.

## Paso 5 — Primer arranque y configuración inicial de Ubuntu

Después de que el instalador se reinicie, el kit inicia la configuración inicial de Ubuntu (`oem-config`):

1. Revise y acepte el EULA del software de NVIDIA Jetson.
2. Seleccione el idioma del sistema, la distribución del teclado y la zona horaria.
3. Conéctese a una red.
4. Cree un nombre de usuario, una contraseña y un nombre de equipo.
5. Inicie sesión en el escritorio de Ubuntu.

## Paso 6 — Instale los componentes de JetPack

La ISO instala el sistema base (Jetson Linux). CUDA, cuDNN, TensorRT y el resto de la pila de JetPack se añaden después del primer arranque. En el escritorio del kit, abra un terminal y ejecute:

```bash
sudo apt update
sudo apt install nvidia-jetpack
```

Reinicie después de la instalación si se le solicita.

Compruebe el resultado:

```bash
cat /etc/nv_tegra_release
apt list --installed | grep nvidia-jetpack
```

`/etc/nv_tegra_release` debe informar de una versión R39 con revisión 2.1. Consulte [Verificación del sistema](/es/tutorials/jetson-orin-nano/verify-your-system) para ver la lista de comprobación completa.

## Paso 7 — Compruebe el modo de alimentación

El modo de alimentación predeterminado suele ser **25W**. Para obtener el máximo rendimiento, haga clic en el modo de alimentación actual en la barra superior del escritorio de Ubuntu, seleccione **Power Mode** y elija **MAXN SUPER**; en la línea de comandos, `sudo /usr/sbin/nvpmodel -q` muestra el modo actual. Las instalaciones por ISO de JetPack 7.2.1 usan la configuración de flasheo del modo Super de forma predeterminada, por lo que 25W y MAXN SUPER deberían estar disponibles — si no aparecen, consulte [Solución de problemas](/es/tutorials/jetson-orin-nano/troubleshooting).

![Selección de MAXN SUPER en el menú de modos de alimentación](/images/jetson-orin-nano/jons_power-mode-to-maxn-super.png)
*Seleccione Power Mode → MAXN SUPER para obtener el máximo rendimiento.*

## Solución rápida de problemas

| Síntoma | Lo primero que debe comprobar |
|---|---|
| El kit no se enciende | La fuente de 19 V debe estar conectada al conector de alimentación DC. El kit se enciende automáticamente; el LED verde junto al conector USB-C debería iluminarse. |
| La unidad USB del instalador no arranca | Seleccione el disco USB explícitamente en el gestor de arranque de la UEFI (`Esc` en la pantalla de arranque). Compruebe que el firmware sea 36.x o posterior. |
| Pantalla negra o shell de la UEFI en lugar del instalador | Puede que el firmware sea demasiado antiguo. Complete primero la ruta de actualización de JetPack 6.x. |
| El instalador omite la configuración de idioma/red/usuario; el primer arranque se queda en una pantalla negra | Se pasó por alto el aviso de la cápsula QSPI. Reinicie la instalación y pulse `Y` en un plazo de 30 segundos. |
| El instalador no muestra el almacenamiento de destino | microSD: compruebe que esté insertada del todo en la ranura de la parte inferior del módulo. NVMe: vuelva a colocar la unidad y reinicie el instalador. |
| Solo aparecen los modos de alimentación 7W/15W; faltan 25W y MAXN SUPER | Consulte [Solución de problemas](/es/tutorials/jetson-orin-nano/troubleshooting). |

## Fuentes

- [Jetson Orin Nano Developer Kit User Guide — Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (consultado el 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (consultado el 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — JetPack SDK Setup](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html) (consultado el 2026-09-26)
- [Jetson Orin Nano Developer Kit User Guide — Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (consultado el 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (consultado el 2026-09-26)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (consultado el 2026-09-26)

*Estado: borrador, pendiente de revisión por cheny. Basado en la documentación oficial de NVIDIA en las fechas indicadas; aún no verificado en hardware físico por Juxi Technology.*

**Créditos de las imágenes:** Las imágenes de esta página proceden de la *Jetson Orin Nano Developer Kit User Guide* oficial de NVIDIA (descargada el 2026-09-26) y siguen siendo © NVIDIA Corporation. Se reproducen aquí para ilustrar el flujo de configuración oficial.

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página es publicada por Juxi Technology y no es una publicación de NVIDIA.
