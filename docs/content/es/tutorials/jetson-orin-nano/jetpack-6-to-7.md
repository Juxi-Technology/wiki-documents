---
title: Migración de JetPack 6.x a JetPack 7.2.1
sidebar_label: Migrar desde JetPack 6.x
slug: /migration/jetpack-6-to-7
description: >-
  Qué cambia entre JetPack 6.x y JetPack 7.2.1 en el kit de desarrollo Jetson
  Orin Nano Super (8GB): el requisito previo de firmware, la trampa del modo
  Super, la lista de comprobación de la migración y la reversión.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack-sdk-623
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
review_owner: cheny
---

# Migración de JetPack 6.x a JetPack 7.2.1

Esta página está dirigida a los propietarios de un kit de desarrollo Jetson
Orin Nano (Super) que pasan de JetPack 6.x a JetPack 7.2.1. Kits nuevos:
empiece por [Inicio rápido](/es/tutorials/jetson-orin-nano/quick-start) en su
lugar.

JetPack 7.2.1 es un salto grande: cuente con un reflasheo completo, un
requisito previo de firmware y algunas recompilaciones de software.

## Qué cambia

| Capa | Época de JetPack 6.x | JetPack 7.2.1 |
|---|---|---|
| Jetson Linux (L4T) | 36.x (JetPack 6.2.3 = 36.5.2) | **39.2.1** |
| SO / sistema de archivos raíz | Ubuntu 22.04 | **Ubuntu 24.04** |
| Kernel de Linux | 5.15 | **6.8** |
| CUDA | 12.6 (JetPack 6.2.3 = 12.6.10) | **13.2.2** |
| TensorRT | 10.3.0 | **10.16.2** |
| cuDNN | 9.3.0 | **9.20.0** |
| VPI | 3.2 | **4.1.4** |

> **Nota de Juxi:** La columna de 6.x usa JetPack 6.2.3, la última versión de
> producción de JetPack 6. Compruebe sus propias versiones con
> `cat /etc/nv_tegra_release`. El valor de VPI de 7.2.1 se toma del repositorio
> de paquetes de NVIDIA y no de su página de descarga, que todavía muestra el
> valor de JetPack 7.2 — consulte la nota en
> [Verificación del sistema](/es/tutorials/jetson-orin-nano/verify-your-system).

- **Se acabaron las imágenes de tarjeta SD.** «A partir de JetPack 7.2, las
  imágenes de tarjeta SD ya no son compatibles.» El instalador es una única
  ISO para una unidad USB; una tarjeta microSD sigue siendo un destino de
  instalación válido.
- **Un requisito previo de firmware.** Las instalaciones de JetPack 7.2 y
  posteriores requieren firmware UEFI/QSPI de Jetson de la generación de
  JetPack 6.x; los kits con firmware de fábrica más antiguo deben completar
  primero la ruta de actualización de JetPack 6.x. JetPack 7.0 y 7.1 no listan
  ningún hardware Orin, así que 7.2 es la primera versión 7.x para la familia.
- **Un flujo de instalación distinto.** La ISO se instala desde una unidad USB
  a la microSD o al NVMe del dispositivo. Es solo de instalación, no un «USB
  en vivo».

## No actualice todavía si...

- **Su robot depende de Isaac ROS.** La matriz de componentes de 7.2.1 lista
  Isaac ROS como «próximamente», pero el personal de NVIDIA afirma que Isaac
  ROS 4.6 admite JetPack 7.2 — las fuentes no coinciden. Consulte
  [Robótica](/es/tutorials/jetson-orin-nano/robotics).
- **Su código de cámara está fijado a la API SIPL antigua.** La SIPL API
  v2.0.0 en Jetson Linux 39.2.1 trae «cambios de ruptura que afectan a la API,
  la ABI, el esquema JSON, la disposición de los paquetes y la carga de
  controladores». Un informe de la comunidad (no confirmado por NVIDIA) dice
  que la configuración de cámara NITO es ahora la predeterminada y que el modo
  heredado `NVCAMERA_NITO_PATH=CONFIG` ya no funciona.
- **No puede volver a validar su pila.** Los wheels de CUDA 13, los paquetes
  de Python y las bibliotecas de terceros deben existir para Ubuntu 24.04 y
  CUDA 13.2. Las páginas de 7.2.1 de NVIDIA no listan versiones de Python ni
  de OpenCV; para los wheels de CUDA 13.2, el personal de NVIDIA remite al
  índice SBSA de Jetson AI Lab — consulte
  [Inferencia LLM local](/es/tutorials/jetson-orin-nano/local-llm).

## Lo que no se puede conservar — planifique una recompilación

- **Motores TensorRT.** TensorRT pasa de 10.3.0 a 10.16.2. Los motores
  serializados están vinculados a la versión de TensorRT. Recompile en el
  destino.
- **Binarios de CUDA.** CUDA pasa de 12.6 a 13.2.2, un salto mayor. No espere
  que los binarios de CUDA 12.x se conserven; recompile con el nuevo toolkit.
- **Módulos de kernel fuera del árbol (out-of-tree).** El kernel pasa de 5.15
  a 6.8. Recompile los módulos con las nuevas cabeceras del kernel.
- **Controladores de cámara y device tree.** Se aplican los cambios de API y
  de ABI de SIPL 2.0 (véase arriba).
- **Contenedores.** Las imágenes creadas para JetPack 6 / L4T r36 se quedan en
  la pila antigua; la ISO incluye NVIDIA Container Toolkit 1.19. El personal
  de NVIDIA afirma que Orin Nano puede ahora ejecutar contenedores
  «arm64-SBSA» convencionales de Arm64.
- **Entornos de Python.** Ubuntu 24.04 usa un Python más nuevo que 22.04.
  Recree los entornos virtuales; compruebe `python3 --version`.

## Lista de comprobación de la migración

1. **Haga primero una copia de seguridad.** La instalación borra el
   almacenamiento de destino que seleccione. Copie fuera del kit: datos de la
   aplicación, archivos de configuración, calibración de cámaras, volúmenes de
   contenedores, scripts de compilación de TensorRT y modelos ONNX, y fuentes
   personalizadas de controladores o device tree. Registre las versiones con
   `cat /etc/nv_tegra_release` y `apt list --installed | grep nvidia-jetpack`.
2. **Supere el control de firmware.** Encienda, pulse Esc repetidamente en la
   pantalla de bienvenida de NVIDIA y lea la versión de firmware en el menú
   UEFI. El firmware 36.x o más reciente está listo para 7.2.1. Si es anterior
   a 36.0, complete primero la «ruta de actualización de JetPack 6.x»: arranque
   la imagen de tarjeta SD de JetPack 5.1.3 actualizada
   (`JP513-orin-nano-sd-card-image_b29.zip`) como puente, deje que programe la
   actualización del gestor de arranque, reinicie, instale el actualizador de
   QSPI (`sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater`), reinicie
   de nuevo. Cuente con varios reinicios; JetPack 6.2.x puede programar una
   actualización más tras el primer arranque. Las unidades con BSP 36.2 /
   JetPack 5.0 DP deben actualizarse primero a una versión posterior. Compruebe
   la programación con `sudo systemctl status nv-l4t-bootloader-config`, y el
   firmware con `sudo nvbootctrl dump-slots-info`.
3. **Cree la unidad USB del instalador.** Escriba la Jetson ISO r39.2.1 en una
   unidad flash USB (16 GB o más) con Balena Etcher. No escriba la ISO en una
   tarjeta microSD. Instale el almacenamiento de destino (microSD o NVMe) antes
   de arrancar — el instalador solo ofrece dispositivos ya instalados.
4. **Instale JetPack 7.2.1.** Arranque desde el gestor de arranque UEFI: pulse
   Esc en la pantalla de bienvenida, seleccione Boot Manager, seleccione el
   disco USB (NVIDIA recomienda esta selección explícita).

   > **Importante** — Pulse **Y** en el aviso de actualización de la cápsula
   > QSPI en un plazo de 30 segundos («el paso que más se omite»). Si se agota
   > el tiempo, la instalación falla más tarde. La actualización de la cápsula
   > se ejecuta en dos pasadas y puede reiniciar el kit — eso es lo esperado.

   En el menú GRUB, seleccione Install Jetson ISO r39.2.1, seleccione el
   almacenamiento de destino y confirme (la instalación borra el
   almacenamiento que seleccione). Retire la unidad USB después de la
   instalación cuando se le indique, y complete la configuración inicial de
   Ubuntu (licencia, idioma, red, usuario) y ejecute `sudo apt update` y
   `sudo apt install nvidia-jetpack`.
5. **Confirme el perfil Super.** `sudo /usr/sbin/nvpmodel -q` lista los modos
   de alimentación; en el escritorio, use la barra superior: Power Mode, MAXN
   SUPER. Con el modo Super habilitado, `cat /etc/nv_boot_control.conf` muestra
   un sufijo `-super` en la línea TNSPEC. Si faltan, lea la sección siguiente.
6. **Vuelva a validar sus cargas de trabajo.** Recompile los motores TensorRT
   y las aplicaciones CUDA en el destino. Recree los entornos de Python,
   actualice los contenedores, vuelva a probar las cámaras. Ejecute las
   comprobaciones de
   [Verificación del sistema](/es/tutorials/jetson-orin-nano/verify-your-system)
   — para r39.2.1, `cat /etc/nv_tegra_release` debería mostrar R39, revisión
   2.1.

## La trampa del modo Super (corregida en 7.2.1)

En una instalación por ISO 7.2.0, la unidad conservaba su configuración de
placa existente: faltaban los modos de alimentación de 25W y MAXN SUPER, y
`sudo nvpmodel -m 2` fallaba con «bad power mode 2». NVIDIA lo documentó en las
notas de la versión r39.2 como el problema 6279443: «Las unidades no adoptarán
el modo Super de forma predeterminada tras la actualización. Para usar el modo
Super, debe flashear el destino usando un host Linux o SDKM». Más tarde, el
personal de NVIDIA lo llamó un error de la ISO, corregido en 7.2.1.

JetPack 7.2.1 flashea la configuración Super de forma predeterminada: «la ISO
ahora flashea el Jetson Orin Nano Developer Kit con la configuración de
flasheo de modo Super de forma predeterminada». El problema 6279443 no está en
la lista de problemas conocidos de r39.2.1.

Quedan dos salvedades:

- **Seleccione el destino correcto al flashear desde un host.** En SDK
  Manager, el destino es «Jetson Orin Nano [8GB developer kit version]». Con
  el script de flasheo, use el destino `jetson-orin-nano-devkit-super`, no el
  destino simple, para habilitar los modos Super. Ejemplo (Developer Guide,
  NVMe): `sudo ./l4t_initrd_flash.sh --erase-all jetson-orin-nano-devkit-super internal`.
- **Reinstalar 7.2.1 sobre un sistema existente.** NVIDIA: «Si está
  reinstalando JetPack 7.2.1 usando la ISO en un sistema ya instalado, siga
  atentamente las instrucciones de la Getting Started Guide». NVIDIA no dice
  si una reinstalación de 7.2.1 restaura el modo Super en una unidad que una
  ISO 7.2.0 dejó en no Super; la vía documentada es un flasheo desde host con
  la configuración Super. Las soluciones comunitarias en el propio equipo
  (editar `/etc/nv_boot_control.conf`) no están respaldadas por NVIDIA; un
  usuario informó de un bucle de arranque. Consulte
  [Solución de problemas](/es/tutorials/jetson-orin-nano/troubleshooting).

## Reversión

El personal de NVIDIA afirma: «Degradación: sí, puede volver a flashear a JP
6.2.2 con SDK Manager si es necesario». Un usuario confirmó el viaje completo
(reflashear a 6.2.2 y luego volver a actualizar a 7.2). El costo, dicho con
honestidad:

- **No hay degradación in situ.** Es un reflasheo completo desde un host
  Ubuntu x86 (las páginas oficiales listan hosts Ubuntu; el personal de NVIDIA
  también informa de que SDK Manager en Windows funciona).
- **El almacenamiento de destino se borra.** Su copia de seguridad es la única
  copia.
- **No hay más garantías.** NVIDIA no publica ningún procedimiento de
  degradación, y ningún documento afirma que los medios de arranque de JetPack
  6.x funcionen garantizadamente con el firmware QSPI de r39.2.x. Trate una
  degradación como una reinstalación de la pila antigua, más el mismo trabajo
  de recompilación.

Si solo faltan los modos de alimentación Super, la corrección más acotada es
un reflasheo desde host con la configuración Super — eso conserva 7.x.
Consulte [Flasheo y actualizaciones](/es/tutorials/jetson-orin-nano/flashing-and-updates).

## Fuentes

- [JetPack SDK Downloads — JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads) — matriz de componentes, eliminación de la tarjeta SD, modo Super predeterminado, advertencia de reinstalación (consultado el 2026-09-26)
- [Jetson Orin Nano Developer Kit — Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) — flujo de instalación por ISO, control de firmware, aviso de la cápsula, MAXN SUPER (consultado el 2026-09-26)
- [Jetson Orin Nano Developer Kit — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) — puente de firmware, comprobaciones de versión (consultado el 2026-09-26)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) — estado de GA, cambios de ruptura de SIPL 2.0 (consultado el 2026-09-26)
- [Jetson Linux 39.2 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — problema 6279443, la trampa del modo Super (consultado el 2026-09-26)
- [JetPack 6.2.3](https://developer.nvidia.com/embedded/jetpack-sdk-623) — versiones de referencia de JetPack 6.x (consultado el 2026-09-26)
- [Foro de desarrolladores de NVIDIA — problema de aceleración por GPU en JetPack 7.2](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) — el personal de NVIDIA: vía de degradación e índice de wheels de CUDA 13.2 (consultado el 2026-09-26)
- [Foro de desarrolladores de NVIDIA — 25W y MAXN SUPER no aparecen en JetPack 7.2](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) — personal y usuarios de NVIDIA: comprobación del TNSPEC `-super`, reflasheo desde host (consultado el 2026-09-26)

*Estado: revisado el 2026-10-11. Basado en la documentación
oficial de NVIDIA y en declaraciones del foro de desarrolladores a la fecha
indicada; aún no verificado en hardware físico por Juxi Technology. La lista
de recompilación describe consecuencias estándar de la plataforma — valídela
con su propia pila.*

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página es
publicada por Juxi Technology y no es una publicación de NVIDIA.
