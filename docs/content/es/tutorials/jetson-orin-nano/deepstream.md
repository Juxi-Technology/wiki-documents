---
title: Pipelines de análisis de video — DeepStream 9.1
sidebar_label: Análisis de video con DeepStream
slug: /tutorials/deepstream
description: >-
  Ejecute NVIDIA DeepStream 9.1 en el kit de desarrollo Jetson Orin Nano
  Super (8GB) — combinación de versiones, instalación, límites de
  decodificación, memoria y salida RTSP sin monitor.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvvideo4linux2.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvinfer.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://docs.ultralytics.com/guides/nvidia-jetson/
    checked: 2026-09-26
review_owner: cheny
---

# Pipelines de análisis de video — DeepStream 9.1

DeepStream es el SDK de NVIDIA para construir pipelines acelerados de análisis
de video inteligente (IVA), y DeepStream 9.1 es la versión que se ejecuta en
Jetson Orin con JetPack 7.2. Esta página cubre la combinación de versiones, las
rutas de instalación, los límites de decodificación, lo que debe esperar en la
primera ejecución, la salida RTSP sin monitor y las notas de memoria para el
kit de desarrollo Orin Nano Super de 8 GB.

## 1. Combinación de versiones

**DeepStream 9.1 ↔ JetPack 7.2 GA ↔ L4T 39.2 ↔ CUDA 13.2 ↔ TensorRT
10.16.1.7 ↔ GStreamer 1.24.2** (imagen Docker `deepstream:9.1`), tal como
figura en la tabla *Platform and OS Compatibility* de la
[Guía de instalación de DeepStream](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html).

DeepStream 8.0 y 9.0 solo listaban **AGX Thor**; la 9.1 es la primera versión
de la serie 9.x cuya fila incluye Jetson Orin («AGX Thor, Jetson Orin») — la
fila dice **«Jetson Orin»** como grupo; las filas anteriores (DS 6.3 a DS 7.1)
nombraban «Orin nano» explícitamente. No se encontró ninguna nota de la
versión 9.1 que confirme el Orin Nano en concreto — considere la
compatibilidad como implícita por la etiqueta de grupo (aún sin confirmar).
Kit de referencia: JetPack 7.2.1 / L4T r39.2.1.

## 2. Qué puede decodificar este kit

El decodificador [Gst-nvvideo4linux2](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvvideo4linux2.html)
usa el motor de hardware NVDEC y admite **H.264, H.265, AV1, JPEG y MJPEG**.
Capacidades publicadas del módulo Orin Nano:

| Capacidad | Especificación |
|---|---|
| Decodificación de video (H.265) | 1x 4K60 · 2x 4K30 · 5x 1080p60 · 11x 1080p30 |
| Codificación de video | Sin codificador de hardware — «1080p30 admitido por 1-2 núcleos de CPU» |
| DLA · PVA | Ninguno |

La inferencia se ejecuta en el plugin [Gst-nvinfer](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvinfer.html)
sobre motores TensorRT: modelos FP16, FP32 e INT8 (FP16 e INT8 dependen de la
plataforma); INT8 necesita un archivo de calibración. La opción `enable-dla`
del plugin no tiene motor al que apuntar en este módulo — la página de producto
del Orin Nano indica «DL Accelerator: -» y «Vision Accelerator: -».

**Con 8 GB:** los fotogramas decodificados, los motores y la memoria de la
aplicación comparten un mismo pool, y no hay DLA al que descargar trabajo. La
muestra de «30 transmisiones» de más abajo decodifica 30 transmisiones de
1080p; la capacidad de decodificación publicada de este módulo es 11x 1080p30
(H.265), así que planifique menos transmisiones o menor resolución. Además,
**no hay codificador de video por hardware** — la salida codificada (por
ejemplo, el streaming RTSP) se ejecuta en la CPU.

## 3. Instalación — Docker primero

La guía de NVIDIA dice: «Recomendado para usuarios nuevos: use el método 4
(contenedor Docker) para la configuración más rápida y sin dependencias». Los
cuatro métodos para Jetson:

| Método | Qué es |
|---|---|
| 1 — SDK Manager | Seleccione **DeepStreamSDK** en «Additional SDKs» junto con los componentes de JetPack 7.2 GA. |
| 2 — paquete tar | `deepstream_sdk_v9.1.0_jetson.tbz2`, un recurso de la release de GitHub. |
| 3 — paquete Debian | `deepstream-9.1_9.1.0-1_arm64.deb`. |
| 4 — Docker (recomendado) | Contenedores Jetson en NGC (`nvcr.io`). |

Los contenedores Jetson son `nvcr.io/nvidia/deepstream:9.1-samples-multiarch`
(aplicaciones de referencia, modelos y configuraciones de ejemplo) y
`nvcr.io/nvidia/deepstream:9.1-triton-multiarch` (además de bibliotecas de
desarrollo y backends de Triton). Requisitos previos: `docker-ce`, el NVIDIA
Container Toolkit, una cuenta de NGC y `docker login nvcr.io` (usuario
`$oauthtoken`, contraseña = su clave de API de NGC).

> **Importante**: NVIDIA afirma: «Los contenedores Docker para Jetson son
> solo para despliegue. No admiten el desarrollo de software de DeepStream
> dentro de un contenedor». Compile las aplicaciones de forma nativa en el
> kit y añada sus binarios a su propia imagen.

En Docker, ejecute `user_additional_install.sh` en su lugar (véase la nota
sobre EOS más abajo). El mensaje «Failed to detect NVIDIA driver version» del
contenedor de Triton es inofensivo.

> **Consejo de Juxi:** para una instalación mínima del host, seleccione solo
> «Jetson OS» en SDK Manager y después ejecute `sudo apt install docker.io`,
> `sudo apt install nvidia-container`, `sudo apt install nvidia-l4t-gstreamer`
> y `sudo service docker restart`.

## 4. Poner los relojes al máximo — con un modo de alimentación específico del kit

```bash
sudo nvpmodel -m 2
sudo jetson_clocks
```

Citado del inicio rápido: «Para los módulos Jetson Orin Nano, use sudo
nvpmodel -m 2 en lugar de -m 0 para habilitar el modo MAXN SUPER. Para todos
los demás módulos Jetson Orin (incluido Orin NX), use -m 0». Ejecute estos
comandos antes de ejecutar aplicaciones de DeepStream. En un kit de 8 GB
configurado como Super, los modos de alimentación son **15W (modo 0)**,
**25W (modo 1, predeterminado)** y **MAXN_SUPER (modo 2)**; MAXN_SUPER solo
existe en unidades flasheadas como Super.

> **Atención**: si falta 25W / MAXN SUPER, o `nvpmodel -m 2` informa de un
> modo de alimentación no válido, la unidad no se flasheó con la configuración
> Super. Consulte [Solución de problemas](/es/tutorials/jetson-orin-nano/troubleshooting).

## 5. Primera ejecución — los motores TensorRT se compilan en el primer uso

```bash
cd /opt/nvidia/deepstream/deepstream-9.1/samples/configs/deepstream-app
deepstream-app -c source30_1080p_dec_infer-resnet_tiled_display.txt
```

Citado del inicio rápido: para un modelo sin archivo de motor existente, «la
generación del archivo y el lanzamiento de la aplicación pueden tardar hasta
unos minutos (según la plataforma y el modelo). En ejecuciones posteriores,
estos archivos de motor generados pueden reutilizarse para cargar más rápido».
Las métricas de FPS se desplazan por la terminal. El «(~30 FPS para esta
configuración)» del inicio rápido es la cifra genérica de la documentación —
**no es una medición del Orin Nano**. Si la aplicación no puede crear elementos
Gst, limpie la caché y vuelva a intentarlo:
`rm ${HOME}/.cache/gstreamer-1.0/registry.aarch64.bin`. Otras configuraciones
de ejemplo cubren cámaras USB y CSI y seguimiento con inferencia secundaria.

## 6. Funcionamiento sin monitor (headless) con salida RTSP

El inicio rápido documenta cómo ejecutar sin pantalla: las configuraciones
predeterminadas usan el renderizador `nveglglessink` basado en EGL (`type=2`
en los grupos `[sink]`), que requiere un servidor X en ejecución. Añada en su
lugar un grupo sink de salida RTSP — el grupo `[sink2]` de
`source30_1080p_dec_infer-resnet_tiled_display.txt` es el ejemplo — y ponga
`enable=0` en el grupo sink EGL. La salida RTSP codificada se ejecuta en la
CPU (sección 2: sin codificador de hardware).

> **Nota de Juxi:** con transmisiones RTSP, la aplicación puede quedarse
> atascada al llegar a EOS (un problema de `rtpjitterbuffer`). En bare metal,
> ejecute `update_rtpmanager.sh` en `/opt/nvidia/deepstream/deepstream/` una
> vez, después de instalar los paquetes de dependencias del inicio rápido. En
> Docker, ejecute `user_additional_install.sh` en su lugar.

## 7. Planificación de memoria para 8 GB

El blog de eficiencia de memoria de NVIDIA afirma: «módulo Jetson Orin Nano
8 GB: de los 8 GB de DRAM física, unos 7.6 GB son utilizables tras las
reservas del firmware y del kernel». La CPU y la GPU comparten este pool.
Palancas documentadas para pipelines estilo DeepStream:

| Palanca | Memoria que puede recuperarse |
|---|---|
| Ejecutar en bare metal en lugar de un contenedor | Hasta 70 MB |
| Pasar de aplicaciones Python a C++ | Hasta 84 MB |
| Desactivar Tiler/OSD y usar FakeSink | Hasta 258 MB |
| **Total** | **412 MB** |

Desactivar Tiler/OSD y usar FakeSink «elimina etapas de visualización
necesarias para la representación en pantalla pero innecesarias en despliegues
headless o de producción. Esto ahorra memoria, reduce la carga de la GPU y
mejora el rendimiento». Esto se combina con la ruta RTSP sin monitor anterior;
desactivar el escritorio gráfico puede liberar hasta 865 MB. Para la guía
completa de 8 GB, consulte
[Eficiencia de memoria en 8 GB](/es/tutorials/jetson-orin-nano/memory-efficiency).

## Lo que NVIDIA no publica para este kit

La página oficial de rendimiento de DeepStream 9.1 para Jetson cubre solo dos
plataformas: **Jetson AGX Thor** y **Jetson AGX Orin**. No se publican cifras
de FPS del Orin Nano; no interprete las filas del AGX Orin como rendimiento
del Orin Nano. Para dimensionar, parta de la capacidad de decodificación
(sección 2) y baje el número de transmisiones y la resolución hasta que el
pipeline quepa.

Como dato publicado más cercano, los [benchmarks de Jetson de
Ultralytics](https://docs.ultralytics.com/guides/nvidia-jetson/) informan de
YOLO26n en el Orin Nano Super a ~4.57 ms/imagen (~219 FPS) con un motor
TensorRT FP16 y ~3.80 ms/imagen (~263 FPS) con INT8, con entrada de 640 —
**datos del proveedor, medidos con software de la era JetPack 6.1, no con la
pila 7.2.1 de este kit**; el tiempo de inferencia excluye el
pre/postprocesamiento. Según la misma fuente, solo los formatos de exportación
PyTorch, TorchScript y TensorRT usan la GPU — los demás formatos de
exportación se ejecutan en la CPU.

## Solución de problemas y lecturas adicionales

- Problemas a nivel de sistema (modos de alimentación, almacenamiento,
  pantalla): [Solución de problemas](/es/tutorials/jetson-orin-nano/troubleshooting) ·
  [Eficiencia de memoria en 8 GB](/es/tutorials/jetson-orin-nano/memory-efficiency).
- Modelos fuera de DeepStream: [Inferencia LLM local](/es/tutorials/jetson-orin-nano/local-llm) ·
  referencia oficial de rendimiento:
  [Rendimiento de DeepStream](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html).

## Fuentes

- [Guía de instalación de DeepStream](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) (consultado el 2026-09-26)
- [Guía de inicio rápido de DeepStream](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html) (consultado el 2026-09-26)
- [Contenedores Docker de DeepStream](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html) (consultado el 2026-09-26)
- [Rendimiento de DeepStream](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html) (consultado el 2026-09-26)
- [Gst-nvvideo4linux2 (decodificador de hardware)](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvvideo4linux2.html) (consultado el 2026-09-26)
- [Gst-nvinfer](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvinfer.html) (consultado el 2026-09-26)
- [Módulos Jetson Orin — especificaciones de decodificación, codificación y aceleradores](https://developer.nvidia.com/embedded/jetson-orin) (consultado el 2026-09-26)
- [Maximizar la eficiencia de memoria para ejecutar modelos más grandes en NVIDIA Jetson (blog de desarrolladores)](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (consultado el 2026-09-26)
- [Guía para desarrolladores de Jetson Linux r39.2 — Alimentación y rendimiento](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (consultado el 2026-09-26)
- [Ultralytics — guía de NVIDIA Jetson (benchmarks del proveedor)](https://docs.ultralytics.com/guides/nvidia-jetson/) (consultado el 2026-09-26)

*Estado: revisado el 2026-10-11. Basado en la documentación
oficial de NVIDIA a la fecha indicada; aún no verificado en hardware físico
por Juxi Technology.*

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página es
publicada por Juxi Technology y no es una publicación de NVIDIA.
