---
title: Flasheo y actualizaciones — Opciones de instalación del BSP
sidebar_label: Flasheo y actualizaciones
slug: /getting-started/flashing-and-updates
description: >-
  Las tres formas oficiales de instalar o actualizar el BSP en el kit de
  desarrollo Jetson AGX Orin — Jetson ISO (recomendada), NVIDIA SDK Manager y
  el script de flasheo Linux_for_Tegra — además de cómo entrar en el modo
  Force Recovery.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-23
review_owner: cheny
---

# Flasheo y actualizaciones — Opciones de instalación del BSP

NVIDIA admite tres formas oficiales de instalar o actualizar el BSP en el kit
de desarrollo. Elija según su situación:

| | 💾 Comenzar con la eMMC | 🛠️ SDK Manager | 📜 Script de flasheo |
|---|---|---|---|
| Resumen breve | Arrancar desde la eMMC flasheada de fábrica y actualizar con Jetson ISO | Herramienta con GUI en un PC host; flashea el BSP y puede instalar paquetes de JetPack | Script `flash.sh` en un PC host |
| PC host con Ubuntu | **No requerido** | Requerido | Requerido |
| Tiempo típico | Primer arranque inmediato; la actualización por ISO tarda ~15 min | ~30 min para flashear | Depende de la configuración |
| Dirigido a | Todos (opción recomendada por defecto) | Cualquiera con un PC con Ubuntu; necesario para flashear NVMe/microSD/USB o cuando el kit no tiene internet | Desarrolladores de producto, usuarios avanzados |

> **Nota de Juxi:** la versión actual es **JetPack 7.2.1 (L4T r39.2.1)**. Si su
> kit es nuevo, empiece por **[Inicio rápido](/es/tutorials/jetson-agx-orin/quick-start)** — le guía de
> principio a fin por la ruta recomendada.

## Opción 1 — Comenzar con la eMMC y actualizar con Jetson ISO (recomendada)

Su kit de desarrollo viene con un BSP L4T flasheado de fábrica en la eMMC y
arranca en el escritorio de Ubuntu nada más sacarlo de la caja. La ruta de
actualización recomendada es la **Jetson ISO** — una memoria USB de arranque
que actualiza el kit **sin necesidad de un PC host con Ubuntu**.

**Requisito previo:** el BSP instalado debe ser **L4T r35.5 o posterior**
(compruébelo con `cat /etc/nv_tegra_release`). Los kits más antiguos necesitan
primero un método con PC host (opción 2 u opción 3 a continuación).

El procedimiento completo paso a paso (creación del USB con Balena Etcher,
arranque UEFI, el aviso de la cápsula QSPI, el menú GRUB, la selección del
almacenamiento, el primer arranque) está en
**[Inicio rápido → Paso 2](/es/tutorials/jetson-agx-orin/quick-start)**.

Puntos destacados de la documentación de NVIDIA:

- En el menú GRUB se elige el destino de la instalación: **eMMC** o **NVMe** (recomendado si ha instalado un SSD).
- Si se le solicita, confirme la **actualización de la cápsula QSPI** con `Y`: es necesaria para la compatibilidad y se ejecuta dos veces. Omitirla provoca problemas de instalación (también figura en las notas de la versión de L4T como problema conocido 6266271).
- Se admite reinstalar sobre un sistema que ya ejecuta JetPack 7.2.1; siga las instrucciones oficiales con atención.

## Opción 2 — NVIDIA SDK Manager (PC host)

Elija SDK Manager cuando quiera:

- flashear el BSP L4T base a un **medio de almacenamiento distinto** de la eMMC (SSD NVMe, unidad USB o tarjeta microSD), o
- flashear un kit que **no pueda conectarse directamente a internet**.

**Requisitos del PC host** (según la documentación de SDK Manager de NVIDIA):
Ubuntu Desktop **20.04 o 22.04** en x86_64, 8 GB de memoria del sistema, 25 GB
de espacio libre en disco y una **membresía del NVIDIA Developer Program**
(gratuita) para descargar la herramienta e iniciar sesión. Nota: las notas de
la versión de L4T 39.2 indican como distribución de Linux del host para el
flasheo Ubuntu **24.04 y 22.04** — consulte la página de requisitos del sistema
de SDK Manager de NVIDIA para ver la lista vigente, ya que este apartado
cambia con frecuencia.

**Instalación e inicio de sesión:**

1. Descargue el paquete `.deb` de SDK Manager desde NVIDIA e instálelo:
   `sudo apt install ./sdkmanager_*-*_amd64.deb`
2. Ejecútelo con `sdkmanager`, haga clic en la pestaña **NVIDIA DEVELOPER** e inicie sesión.

**Preparación del hardware y modo Force Recovery:**

1. Conecte el kit al PC host con el cable USB-A↔USB-C incluido, enchufado en el **puerto USB-C junto al conector de 40 pines** (etiquetado como puerto 10 / J40).
2. Mientras **mantiene pulsado el botón central Force Recovery** (botón 2, entre Power y Reset), conecte la fuente de alimentación USB-C en el puerto USB-C situado encima del conector DC. El kit se enciende en **modo Force Recovery**.
3. En el host, SDK Manager debería detectar el kit. *(Si no es así, consulte [Solución de problemas](/es/tutorials/jetson-agx-orin/troubleshooting).)*

**Pasos de flasheo en SDK Manager** (resumen: siga las instrucciones en pantalla):

1. **Paso 01:** seleccione **Jetson** como categoría de producto, desmarque "Host Machine", seleccione el módulo **Jetson AGX Orin** y continúe.
2. **Paso 02:** para un BSP base, seleccione únicamente **Jetson OS** (desmarque "Jetson SDK Components"). Acepte la licencia.
3. **Paso 03:** introduzca su contraseña de sudo; espere a que termine la descarga. En el cuadro de diálogo de flasheo elija **"Manual Setup – Jetson AGX Orin"**, omita la configuración OEM, seleccione el **Storage Device** al que desea flashear y haga clic en **Flash**.
4. Cuando termine el flasheo, el kit se reinicia con el nuevo BSP. Complete el `oem-config` de Ubuntu y, a continuación, instale los componentes de JetPack (consulte [Inicio rápido → Paso 3](/es/tutorials/jetson-agx-orin/quick-start)).

## Opción 3 — Script de flasheo Linux_for_Tegra

Para usuarios avanzados y desarrolladores de producto: los scripts `flash.sh`
(o initrd flash) del paquete Jetson Linux flashean un dispositivo Jetson desde
un PC host. Consulte la sección **Flashing Support** de la
[Jetson Linux Developer Guide](https://docs.nvidia.com/jetson/archives/DeveloperGuide).

Datos del host y de la cadena de herramientas según las notas de la versión de
L4T 39.2: distribución de Linux del host para el flasheo — Ubuntu 24.04 / 22.04;
cadena de herramientas de compilación cruzada — GCC 13.2; etiqueta de la
versión del código fuente — `jetson_39.2_GA`.

## Modo Force Recovery — cómo entrar

El mismo procedimiento que arriba; no se necesita ningún host para realizarlo:

1. Con el kit apagado y el cable de datos USB-C conectado a un host (si lo necesita),
2. **Mantenga pulsado el botón central Force Recovery** y, a continuación, conecte la fuente de alimentación USB-C: el kit se inicia en modo Force Recovery.

Para salir del modo de recuperación, apague y vuelva a encender el kit, o
reinícielo. En el host, el modo de recuperación suele aparecer como un
dispositivo USB de NVIDIA (`lsusb`).

## Después del flasheo

Verifique el resultado: **[Verifique su sistema](/es/tutorials/jetson-agx-orin/verify-your-system)** — comprobaciones de versión de L4T, CUDA y todo el conjunto de componentes de JetPack.

## Fuentes

- [BSP Installation — Jetson AGX Orin Developer Kit User Guide](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html) (consultado el 2026-09-23)
- [Quick Start — la misma guía](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) (consultado el 2026-09-23)
- [Jetson Linux 39.2.0 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (consultado el 2026-09-23)
- [NVIDIA SDK Manager](https://developer.nvidia.com/sdk-manager)

*Estado: revisado el 2026-10-11. Basado en la documentación
oficial de NVIDIA en la fecha indicada; aún no verificado en hardware físico
por Juxi Technology.*

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página la
publica Juxi Technology y no es una publicación oficial de NVIDIA.
