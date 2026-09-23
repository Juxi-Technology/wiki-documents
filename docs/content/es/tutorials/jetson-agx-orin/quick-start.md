---
title: Inicio rápido — Del desembalaje a un sistema JetPack 7.2.1 funcional
sidebar_label: Inicio rápido
slug: /getting-started/quick-start
description: >-
  Guía paso a paso para el kit de desarrollo NVIDIA Jetson AGX Orin (64GB):
  primer arranque, actualización del BSP a JetPack 7.2.1 (L4T r39.2.1) con el
  método de la Jetson ISO e instalación de los componentes de JetPack.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
review_owner: cheny
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-23
---

# Inicio rápido

Esta página lleva su kit de desarrollo Jetson AGX Orin (64GB) desde la caja
hasta un sistema **JetPack 7.2.1** totalmente actualizado. La ruta que se
describe a continuación sigue el flujo de configuración actual recomendado por
NVIDIA; cada paso se ha verificado con la documentación oficial del kit de
desarrollo de NVIDIA en la fecha indicada al final de esta página.

**La ruta en tres pasos:**

1. **Arranque el kit nada más sacarlo de la caja** y complete la configuración inicial de Ubuntu (`oem-config`).
2. **Actualice el BSP** a L4T r39.2.1 (JetPack 7.2.1) con el método de la **Jetson ISO** — una unidad USB de arranque, sin necesidad de un PC host con Ubuntu.
3. **Instale los componentes de JetPack** (CUDA, cuDNN, TensorRT, ...) con un solo comando `apt`.

> **¿Por qué una actualización con Jetson ISO en lugar de SDK Manager?**
> NVIDIA recomienda ahora el método de la Jetson ISO para el kit de desarrollo:
> actualiza la placa directamente desde una unidad USB y **no** requiere una
> máquina host con Ubuntu aparte. SDK Manager sigue disponible como alternativa
> (véase el paso 3b).

## Qué necesita

En la caja:

- Módulo Jetson AGX Orin y placa portadora de referencia
- Módulo Wi-Fi
- Fuente de alimentación USB Type-C
- Cable USB Type-C a USB Type-A

Usted aporta:

- Un monitor con entrada DisplayPort y un cable DisplayPort, además de un teclado y un ratón USB — **o** un segundo ordenador (Windows/Mac/Linux) si prefiere una configuración headless
- Conexión a Internet (cable Ethernet o Wi-Fi configurado durante la configuración inicial)
- Una unidad USB con capacidad suficiente para la imagen ISO (consulte el tamaño indicado en la página de descarga cuando llegue a ella) — necesaria para la actualización por ISO del paso 2
- Un PC para escribir la unidad USB de instalación (Balena Etcher funciona en Windows/Mac/Linux)

## Paso 1 — Primer arranque y configuración inicial de Ubuntu

Su kit de desarrollo se entrega con una imagen BSP de L4T preflasheada en la
eMMC y arranca en el escritorio de Ubuntu nada más sacarlo de la caja. Es
posible que las unidades recién enviadas traigan una versión de L4T **más
antigua** (por ejemplo, r35.x / JetPack 5.x); el paso 2 lleva cualquier unidad
a la versión más reciente.

Con un monitor conectado:

1. Conecte un monitor DisplayPort, un teclado y un ratón USB y (opcionalmente) un cable Ethernet.
2. Conecte la fuente de alimentación incluida al **puerto USB Type-C situado encima del conector DC**. El kit se enciende automáticamente: el LED blanco junto al botón de encendido se ilumina. Si no es así, pulse el botón de encendido.
3. En aproximadamente un minuto aparece la pantalla de Ubuntu. El primer arranque le guía por `oem-config`: aceptar el EULA del software de NVIDIA, elegir idioma/teclado/zona horaria, crear su cuenta de usuario y configurar la red.
4. Cuando `oem-config` termina, el kit se reinicia y arranca en el escritorio de Ubuntu.

![Escritorio de Ubuntu después de la configuración inicial](/images/jetson-agx-orin/ubuntu_initial_desktop_1280x720.png)

La configuración headless desde otro ordenador también es posible: consulte la
Quick Start Guide de NVIDIA (enlace al final) para ver el conexionado exacto.

> **Consejo de Juxi:** Si piensa ejecutar el sistema desde un SSD NVMe, téngalo
> en cuenta para el paso 2: el instalador ISO puede instalar directamente en la
> unidad NVMe.

## Paso 2 — Actualizar el BSP con la Jetson ISO (recomendado)

**Requisito previo:** el BSP instalado debe ser **L4T r35.5 o posterior** para
que funcione el método de la Jetson ISO. Compruébelo primero:

```bash
cat /etc/nv_tegra_release
```

Un sistema con JetPack 7.2.1 informa de `# R39 (release), REVISION: 2.1`. Si la
salida muestra una versión anterior, actualice primero a L4T r35.5 o posterior
(véase *Advertencias y problemas conocidos* más abajo).

1. **Descargue la Jetson ISO** para JetPack 7.2.1 / L4T r39.2.1:
   <https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso>
2. **Cree la unidad USB de instalación.** Escriba la Jetson ISO en una unidad USB con
   [Balena Etcher](https://etcher.balena.io) ("Flash from file" → seleccione la ISO
   → seleccione la unidad USB).
   > **No** se limite a copiar el archivo ISO en la unidad con un gestor de archivos —
   > debe escribirse como imagen de disco, o no arrancará.
3. **Inserte la unidad USB** en el kit de desarrollo y enciéndalo. Si no arranca
   desde el USB automáticamente, abra el gestor de arranque UEFI durante el
   arranque y seleccione la unidad USB.
4. **Arranque e instalación:**
   - Si se le pide confirmar una **actualización de cápsula QSPI**, pulse `Y`. Esta
     actualización de firmware se ejecuta *antes* de la instalación de la Jetson
     ISO y se ejecuta **dos veces**. No la omita: es necesaria para la
     compatibilidad. Si deja pasar el aviso, reinicie la instalación y confírmela
     cuando se le solicite.
   - En el menú GRUB, seleccione **Install Jetson ISO r39.2.1** y pulse Enter.
   - Elija el destino de almacenamiento con las teclas de flecha: **eMMC**
     (almacenamiento interno predeterminado) o **NVMe** (recomendado si ha
     instalado un SSD).
   - La instalación tarda unos 15 minutos, con la salida de texto desplazándose
     por la pantalla.
5. **Retire la unidad USB** cuando termine la instalación y el sistema se
   reinicie; de lo contrario, el kit podría volver a arrancar desde la unidad en
   lugar del nuevo sistema.
6. El sistema actualizado inicia su `oem-config` de primer arranque: complete la
   configuración de Ubuntu de nuevo para crear la cuenta de usuario de la nueva
   instalación.

### Lo que verá (en orden)

![Escritura de la ISO en una unidad USB con Balena Etcher](/images/jetson-agx-orin/jetson-iso_etcher-flash-start.gif)
*Escritura de la Jetson ISO en una unidad USB con Balena Etcher.*

![Gestor de arranque UEFI con la unidad USB seleccionada](/images/jetson-agx-orin/jetson-iso_uefi_boot-manager-menu.png)
*Si el kit no arranca automáticamente desde la unidad USB, selecciónela en el gestor de arranque UEFI.*

![Aviso de confirmación de la actualización de cápsula QSPI](/images/jetson-agx-orin/jetson-iso__qspi_update_options.png)
*El aviso de actualización de cápsula QSPI — pulse `Y`. Es necesario para la compatibilidad y se ejecuta dos veces.*

![Menú GRUB de la Jetson ISO](/images/jetson-agx-orin/jetson-iso_grub-menu-r39-top.png)
*Seleccione "Install Jetson ISO r39.2.1".*

![Opciones de destino de almacenamiento en el menú GRUB](/images/jetson-agx-orin/jetson-iso_grub-menu-options.png)
*Elija eMMC o NVMe como destino de la instalación.*

![Pantalla de progreso del instalador](/images/jetson-agx-orin/jetson-iso_wait-for-15min.png)
*El instalador tarda unos 15 minutos.*

![Pantalla de bienvenida de oem-config después de la actualización](/images/jetson-agx-orin/oem-config_welcome.png)
*Después de la actualización, `oem-config` se ejecuta de nuevo para configurar el nuevo sistema.*

### Advertencias y problemas conocidos

- **Unidades antiguas (< L4T r35.5):** la ruta de la Jetson ISO requiere un BSP
  instalado de r35.5 o posterior. Para poner al día primero un kit antiguo, use
  uno de los métodos con PC host (SDK Manager o el script `flash.sh`) — véase
  [Flasheo y actualizaciones](/es/tutorials/jetson-agx-orin/flashing-and-updates).
- **¿Se le pasó el aviso de la cápsula QSPI?** Reinicie la instalación por ISO y pulse `Y`.
- **Pantalla negra durante la instalación:** algunos conmutadores KVM gestionan
  mal la salida de video del AGX Orin durante la instalación de la Jetson ISO.
  Conecte el monitor directamente al kit de desarrollo y vuelva a intentarlo.

## Paso 3 — Instalar los componentes de JetPack

### 3a. Mediante `apt` (lo más sencillo — sin PC host)

En el escritorio del kit, abra un terminal (`Ctrl`+`Alt`+`T`) y ejecute:

```bash
sudo apt update
sudo apt dist-upgrade
sudo reboot
sudo apt install nvidia-jetpack
```

Esto instala CUDA, cuDNN, TensorRT y el resto del stack de JetPack. Puede tardar
**alrededor de una hora**, según la velocidad de la conexión.

Verifique el resultado: `cat /etc/nv_tegra_release` debe informar de R39 / REVISION 2.1,
y el CUDA Toolkit queda disponible (`nvcc --version`). Consulte
[Verifique su sistema](/es/tutorials/jetson-agx-orin/verify-your-system) para ver la lista de comprobación completa.

### 3b. Mediante SDK Manager (alternativa)

SDK Manager instala los componentes de JetPack desde un PC host a través de USB:

1. Con el kit encendido, conéctelo al PC host con el cable USB Type-C a Type-A
   incluido, enchufado en el **puerto USB Type-C situado junto al conector de 40
   pines** del kit.
2. En SDK Manager, elija el destino Jetson AGX Orin y seleccione **Jetson SDK
   Components** (en lugar de volver a flashear "Jetson OS"); después, siga los
   pasos que aparecen en pantalla (conexión USB, dirección `192.168.55.1`).

NVIDIA mantiene las instrucciones completas de SDK Manager (véanse los enlaces
más abajo) y se tratarán en profundidad en nuestra guía de flasheo.

## Solución rápida de problemas

| Síntoma | Lo primero que debe comprobar |
|---|---|
| El kit no se enciende | Fuente de alimentación conectada al puerto USB-C **situado encima del conector DC**; pulse el botón de encendido |
| No hay salida de video | Cable DisplayPort (para monitores HDMI, use un adaptador activo DP→HDMI); pruebe a arrancar sin la unidad USB del ISO insertada |
| El instalador ISO no arranca | Unidad USB escrita con Etcher (no copiada como archivo); seleccione la unidad USB en el gestor de arranque UEFI |
| Apareció el aviso QSPI | Pulse `Y` — es obligatorio; la actualización se ejecuta dos veces |
| La pantalla se queda negra a mitad de la instalación | Interferencia de un conmutador KVM — conecte el monitor directamente |

## Fuentes y verificación

Esta página ha sido redactada y verificada por Juxi Technology a partir de la
documentación oficial de NVIDIA:

- [Jetson AGX Orin Developer Kit User Guide — Quick Start](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) (consultado el 2026-09-23)
- [Jetson AGX Orin Developer Kit User Guide — JetPack SDK Setup](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html) (consultado el 2026-09-23)
- [BSP Installation (SDK Manager / flash script)](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html)

*Estado: borrador. Juxi Technology aún no ha verificado los pasos en hardware
físico; se basan en la documentación oficial de NVIDIA en las fechas indicadas
anteriormente.*

**Créditos de las imágenes:** Todas las capturas de pantalla de esta página
provienen de la *Jetson AGX Orin Developer Kit User Guide* oficial de NVIDIA
(descargada el 2026-09-23) y siguen siendo © NVIDIA Corporation. Se reproducen
aquí para ilustrar el flujo de configuración oficial.

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta guía es
publicada por Juxi Technology y no es una publicación de NVIDIA.
