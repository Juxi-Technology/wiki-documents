---
title: Glosario
sidebar_label: Glosario
slug: /appendix/glossary
description: >-
  Términos clave del kit de desarrollo NVIDIA Jetson Orin Nano Super (8 GB) —
  del versionado de JetPack y L4T al flasheo, los modos de alimentación y la
  pila de IA.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
review_owner: cheny
---

# Glosario

Los términos que un usuario nuevo de Jetson encuentra primero, en orden
alfabético. Los números de versión reflejan la versión actual de este kit
(**JetPack 7.2.1 / L4T r39.2.1**, comprobados el 2026-09-26).

## Términos

| Término | Significado |
|---|---|
| **BSP** | "Board support package" (paquete de soporte de placa): la capa de software que arranca la placa — gestor de arranque, kernel, controladores y el sistema de archivos raíz. En JetPack, el BSP es Jetson Linux (L4T). Durante una instalación con la Jetson ISO, el instalador escribe el BSP en el dispositivo de almacenamiento que seleccione. |
| **Actualización de cápsula (capsule update)** | Una actualización del firmware de arranque QSPI. Durante una instalación con la Jetson ISO en un kit con firmware QSPI más antiguo, el instalador le pide ejecutar una actualización de cápsula: pulse `Y` en un plazo de 30 segundos, o la instalación fallará más tarde. La actualización se ejecuta en dos pasadas, y el kit puede reiniciar entre ambas — eso es lo esperado. |
| **Carveout** | Una región de memoria que el firmware de arranque reserva para un bloque de hardware concreto, como la ruta de pantalla o de cámara. El sistema operativo no puede usarla. En Orin Nano estas reservas están documentadas, y puede reducirlas editando el BSP y reflasheando el kit (véase [Eficiencia de memoria](/es/tutorials/jetson-orin-nano/memory-efficiency)). |
| **CUDA** | La plataforma de computación en paralelo y el conjunto de herramientas de NVIDIA para ejecutar código en la GPU. JetPack 7.2.1 incluye CUDA 13.2.2. La compute capability de la GPU de Orin es 8.7 (`sm_87`); los binarios de GPU que no incluyen `sm_87` recurren a la ejecución en CPU (véase [Inferencia LLM local](/es/tutorials/jetson-orin-nano/local-llm)). |
| **cuDNN** | La biblioteca de primitivas de aprendizaje profundo optimizadas de NVIDIA, como convolución y funciones de activación. Los frameworks de aprendizaje profundo y TensorRT la usan para sus operaciones centrales. JetPack 7.2.1 incluye cuDNN 9.20.0. |
| **DeepStream** | El SDK de NVIDIA para analítica de video con múltiples flujos: decodifica video, ejecuta inferencia, rastrea objetos y emite resultados. DeepStream 9.1 admite la familia Jetson Orin en JetPack 7.2. NVIDIA recomienda el contenedor Docker como la vía de instalación más rápida para usuarios nuevos (véase [Análisis de video con DeepStream](/es/tutorials/jetson-orin-nano/deepstream)). |
| **DLA** | Deep Learning Accelerator: un motor de inferencia de función fija integrado en algunos módulos Jetson. El módulo Orin Nano no tiene DLA, así que la inferencia en este kit se ejecuta en la GPU. |
| **Edge-LLM** | TensorRT Edge-LLM: el runtime en el dispositivo de NVIDIA para modelos de lenguaje grandes (LLM) y modelos de visión-lenguaje (VLM). En Orin solo admite motores FP16, INT8 e INT4 — los motores FP8 y FP4 no se ejecutan — y los motores se compilan en el propio dispositivo (véase [Inferencia LLM local](/es/tutorials/jetson-orin-nano/local-llm)). |
| **eMMC** | Almacenamiento flash integrado usado como disco de sistema en algunos módulos Jetson. El kit de desarrollo se envía sin almacenamiento: aporte una tarjeta microSD o un SSD NVMe antes de empezar (véase [Inicio rápido](/es/tutorials/jetson-orin-nano/quick-start)). |
| **Modo Force Recovery** | Un modo de arranque especial usado para flashear el kit desde un PC host. Entre desde el sistema en ejecución con `sudo reboot --force forced-recovery`, o con el kit apagado puenteando los pines 9 y 10 de la cabecera de botones (Button Header) y conectando después la alimentación. En este modo, el puerto USB-C lleva la conexión de flasheo al PC host. |
| **JetPack** | El paquete de SDK de NVIDIA para Jetson: el sistema operativo, los controladores, la pila CUDA y las bibliotecas. La versión actual para este kit es JetPack 7.2.1, que incluye Jetson Linux (L4T) r39.2.1. |
| **Ruta de actualización de JetPack 6.x** | El procedimiento puente de firmware para kits cuyo firmware UEFI/QSPI de fábrica sea anterior a 36.0. Arranca una imagen puente de JetPack 5.1.3 en microSD y programa una actualización del gestor de arranque (firmware); después, el kit puede arrancar JetPack 6.x o la Jetson ISO de JetPack 7.2.1. Los kits con firmware más antiguo deben completar esta ruta antes de una instalación por ISO (véase [Inicio rápido](/es/tutorials/jetson-orin-nano/quick-start)). |
| **Jetson ISO** | La imagen de instalación unificada en USB para JetPack 7.2 y posteriores. Escríbala en una unidad flash USB con una herramienta como Balena Etcher — no la escriba en una tarjeta microSD — y tenga en cuenta que es solo de instalación, no un USB en vivo. Durante la instalación, seleccione el destino: la tarjeta microSD o el SSD NVMe. |
| **L4T** | Jetson Linux: el paquete de soporte de placa que hay debajo de JetPack — el gestor de arranque UEFI, el kernel, los controladores y el sistema de archivos raíz de Ubuntu. Para JetPack 7.2.1 es r39.2.1, con kernel de Linux 6.8 y un sistema de archivos raíz Ubuntu 24.04. |
| **MAXN SUPER** | El modo de alimentación máximo del kit (modo 2): CPU 1,728 MHz, GPU 1,020 MHz, memoria 3,199 MHz. Es un modo experimental y solo existe cuando el kit se flasheó con la configuración Super. Selecciónelo en el menú Power Mode del escritorio, o ejecute `sudo /usr/sbin/nvpmodel -m 2`. |
| **microSD (UHS-1)** | El formato de tarjeta usado como almacenamiento de sistema predeterminado del kit. UHS-1 es una clase de velocidad SD; NVIDIA recomienda una tarjeta microSD UHS-1 de 64 GB o más. La ranura está en la parte inferior del módulo, así que inserte la tarjeta antes de arrancar el instalador. |
| **nv_boot_control.conf / TNSPEC** | El archivo en el dispositivo `/etc/nv_boot_control.conf`, que registra la configuración de la placa como una cadena TNSPEC. El personal de NVIDIA señala que una configuración Super muestra un sufijo `-super`, por ejemplo `TNSPEC 3767-300-0005-S.1-1-1-jetson-orin-nano-devkit-super-`; si falta el sufijo, los modos de alimentación superiores no están disponibles. Tras una instalación por ISO, NVIDIA remite a esta entrada TNSPEC como referencia de la información correcta de la placa. |
| **NVMe** | Un SSD en el bus PCIe, instalado en una de las ranuras M.2 Key-M de la placa portadora: tamaño 2280 (PCIe 3.0 x4) o tamaño 2230 (PCIe 3.0 x2). Un SSD NVMe puede alojar el sistema y se recomienda cuando necesita más capacidad y mejor rendimiento de almacenamiento. |
| **nvpmodel** | La herramienta de modos de alimentación del kit. Ejecute `sudo /usr/sbin/nvpmodel -q` para listar los modos disponibles en su sistema, y `sudo /usr/sbin/nvpmodel -m <mode_id>` para cambiar de modo. Los mismos modos están en el menú Power Mode del escritorio. |
| **oem-config** | El asistente de configuración del primer arranque: aceptación de la licencia, idioma y teclado, red, y el nombre de usuario y la contraseña iniciales. Se ejecuta una vez, tras el primer arranque del sistema instalado. |
| **QSPI** | La pequeña memoria flash NOR del kit que almacena el firmware de arranque UEFI. JetPack 7.2 y posteriores requieren firmware QSPI de la generación de JetPack 6.x (posterior a la versión 36.0); con firmware más antiguo, el instalador puede fallar o el kit puede arrancar a una pantalla negra. Véase [Flasheo y actualizaciones](/es/tutorials/jetson-orin-nano/flashing-and-updates). |
| **SDK Manager** | La herramienta de PC host de NVIDIA para flashear el BSP e instalar los componentes de JetPack por USB. El host documentado es un PC x86 con Ubuntu. Es la alternativa al método Jetson ISO en el propio dispositivo. |
| **SO-DIMM** | El formato de conector del módulo: un SO-DIMM de 260 pines, 69.6 mm x 45 mm. El módulo se inserta en la ranura SO-DIMM de la placa portadora, y esa misma ranura también acepta un módulo Jetson Orin NX. |
| **Modo Super** | La configuración de software de alimentación y frecuencias de NVIDIA para el Orin Nano — no es hardware distinto. Los kits existentes obtienen el impulso «Super» con una actualización de software de JetPack, y en este kit los modos de alimentación superiores aparecen solo cuando se flasheó con la configuración Super. |
| **TensorRT** | El optimizador y runtime de inferencia de NVIDIA. Compila un modelo entrenado en un motor TensorRT — un archivo específico del dispositivo, creado para la GPU de destino — y ejecuta ese motor de forma eficiente. JetPack 7.2.1 incluye TensorRT 10.16.2. |
| **TOPS** | Billones de operaciones por segundo, la unidad habitual para el rendimiento de IA. Este kit está valorado en hasta 67 TOPS INT8 dispersos (33 INT8 densos). NVIDIA publica tanto una valoración dispersa como una densa para el mismo módulo. |
| **UEFI** | El firmware de arranque del kit y su menú de configuración. Pulse Esc mientras se muestra la pantalla de bienvenida de NVIDIA para entrar en la configuración; en el menú, Boot Manager es donde se selecciona la unidad USB del instalador como dispositivo de arranque. La versión del firmware se muestra ahí, y JetPack 7.2 y posteriores necesitan una versión posterior a 36.0. |
| **Memoria unificada** | El único pool de memoria LPDDR5 de 8 GB compartido por la CPU y la GPU — el kit no tiene memoria de video separada. Unos 7.6 GB son utilizables tras las reservas de firmware y kernel, y el sistema operativo, sus modelos y sus cachés KV se alimentan todos de este único pool. Véase [Eficiencia de memoria](/es/tutorials/jetson-orin-nano/memory-efficiency). |
| **VPI** | Vision Programming Interface: la biblioteca de NVIDIA para el procesamiento de imágenes acelerado por hardware en Jetson. JetPack 7.2.1 incluye VPI 4.1.4. |

## Correspondencia de versiones

La correspondencia de versiones más útil para memorizar:

| JetPack | Jetson Linux (L4T) | Ubuntu | Kernel | CUDA |
|---|---|---|---|---|
| **7.2.1** (actual) | **r39.2.1** | **24.04** | **6.8** | **13.2.2** |
| 6.2.3 (última versión de JetPack 6) | r36.5.2 | 22.04 | 5.15 | 12.6 |

Para comprobar qué ejecuta realmente un sistema concreto: `cat /etc/nv_tegra_release`
(véase [Verificación del sistema](/es/tutorials/jetson-orin-nano/verify-your-system)).

## Fuentes

- [Jetson Orin Nano Developer Kit — Introduction](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) (consultado el 2026-09-26)
- [Jetson Orin Nano Developer Kit — Quick Start Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (consultado el 2026-09-26)
- [Jetson Orin Nano Developer Kit — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (consultado el 2026-09-26)
- [Jetson Orin Nano Developer Kit — How-to Guides](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (consultado el 2026-09-26)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) — ⚠️ su tabla de componentes va con retraso fila por fila (las filas de VPI y PVA todavía llevan los valores de JetPack 7.2); para las versiones de los componentes, use el [repositorio de paquetes de NVIDIA](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) en su lugar (consultado el 2026-09-26)
- [Jetson Linux r39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (consultado el 2026-09-26)
- [TensorRT Edge-LLM — matriz de compatibilidad](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html) (consultado el 2026-09-26)
- [Maximizing memory efficiency to run bigger models on NVIDIA Jetson (NVIDIA Technical Blog)](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (consultado el 2026-09-26)
- [Jetson Orin Nano Series — Power and Performance (L4T r39.2 Developer Guide)](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (consultado el 2026-09-26)
- [NVIDIA Jetson Orin family — specifications](https://developer.nvidia.com/embedded/jetson-orin) (consultado el 2026-09-26)
- [DeepStream SDK — Installation](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) (consultado el 2026-09-26)
- [Foro de NVIDIA — «25W and MAXN_SUPER not seen in JetPack 7.2» (respuesta del personal de NVIDIA)](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) (consultado el 2026-09-26)

*Estado: borrador, pendiente de revisión por cheny. Definiciones recopiladas a
partir de la documentación de NVIDIA y del uso habitual del sector; los números
de versión se comprobaron en las fechas indicadas. No verificado en hardware
físico por Juxi Technology.*

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página es
publicada por Juxi Technology y no es una publicación de NVIDIA.
