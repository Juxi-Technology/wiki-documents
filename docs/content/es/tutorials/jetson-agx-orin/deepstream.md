---
title: Análisis de video multicanal — DeepStream 9.1
sidebar_label: Análisis de video con DeepStream
slug: /tutorials/deepstream
description: >-
  Instale DeepStream 9.1 en el kit de desarrollo AGX Orin y ejecute la
  aplicación de referencia de análisis de video — con las opciones de
  instalación oficiales, las configuraciones de ejemplo y las notas
  específicas de JP7.2.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-24
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html
    checked: 2026-09-24
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
    note: its component table lags on some rows (VPI/PVA still show 7.2 values) — see the Sources caveat
review_owner: cheny
---

# Análisis de video multicanal — DeepStream 9.1

DeepStream es el framework de NVIDIA para construir pipelines acelerados de
análisis de video inteligente (IVA), y **DeepStream 9.1 se incluye con JetPack
7.2** en Jetson Orin. Este tutorial sigue la documentación oficial de
instalación y de inicio rápido de NVIDIA; cada comando a continuación proviene
de esas páginas (o se resume directamente de ellas).

**Combinación de versiones:** DeepStream 9.1 ↔ JetPack 7.2 GA ↔ L4T 39.2 ↔
CUDA 13.2 ↔ TensorRT 10.16.1.7 ↔ Ubuntu 24.04 ↔ GStreamer 1.24.2 *(según la
tabla de compatibilidad de NVIDIA)*.

## 1. Instalación

NVIDIA ofrece cuatro métodos de instalación en Jetson; la nota oficial
recomienda **Docker para usuarios nuevos** (el más rápido, sin dependencias):

- **Método 4 — Docker (recomendado para usuarios nuevos):** use los contenedores NGC DeepStream — consulte [Contenedores Docker](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html).
- **Método 1 — SDK Manager:** seleccione **DeepStreamSDK** en «Additional SDKs» junto con los componentes de JetPack 7.2 GA.
- **Método 2 — paquete tar:** descargue `deepstream_sdk_v9.1.0_jetson.tbz2` (desde [NVIDIA/DeepStream releases](https://github.com/DeepStream/releases/tag)) y, a continuación:
  ```bash
  sudo tar -xvf deepstream_sdk_v9.1.0_jetson.tbz2 -C /
  cd /opt/nvidia/deepstream/deepstream-9.1
  sudo ./install.sh
  sudo ldconfig
  ```
- **Método 3 — paquete Debian:** instale `deepstream-9.1_9.1.0-1_arm64.deb` con `sudo apt-get install ./deepstream-9.1_9.1.0-1_arm64.deb`.

**Paquetes de requisitos previos** (lista oficial de dependencias para la
instalación nativa):

```bash
sudo apt install \
libssl3 libssl-dev libcurl4-openssl-dev \
libgstreamer1.0-0 gstreamer1.0-tools gstreamer1.0-plugins-good \
gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gstreamer1.0-libav \
libgstreamer-plugins-base1.0-dev libgstrtspserver-1.0-0 \
libjansson4 libyaml-cpp-dev libmosquitto1
```

> **Nota de Juxi:** si se encuentra con el problema de RTSP documentado
> (aplicaciones atascadas en EOS con transmisiones RTSP), ejecute el script
> `update_rtpmanager.sh` en `/opt/nvidia/deepstream/deepstream/` después de
> instalar los paquetes anteriores.

## 2. Poner los relojes al máximo (antes de ejecutar nada)

```bash
sudo nvpmodel -m 0
sudo jetson_clocks
```

NVIDIA señala una excepción: **Jetson Orin Nano** usa `-m 2` para MAXN SUPER;
todos los demás módulos Orin (incluido AGX Orin) usan `-m 0`. Ejecute estos
comandos antes de ejecutar las aplicaciones de DeepStream.

## 3. Ejecutar la aplicación de referencia

```bash
cd /opt/nvidia/deepstream/deepstream-9.1/samples/configs/deepstream-app
deepstream-app -c source30_1080p_dec_infer-resnet_tiled_display.txt
```

Qué esperar (según NVIDIA): una vista en mosaico de 30 transmisiones de 1080p
simuladas con inferencia ResNet, y métricas de rendimiento — **~30 FPS para
esta configuración** — impresas en la terminal. Haga clic en un mosaico para
ampliar; haga clic con el botón derecho para volver a la vista en mosaico.

Archivos de configuración útiles para explorar (todos en ese directorio):

| Configuración | Caso de uso |
|---|---|
| `source30_1080p_dec_infer-resnet_tiled_display.txt` | Prueba de rendimiento con 30 transmisiones |
| `source4_1080p_dec_infer-resnet_tracker_sgie_tiled_display.txt` | Seguimiento + inferencia secundaria |
| `source1_usb_dec_infer_resnet.txt` | **Una sola cámara USB** |
| `source1_csi_dec_infer_resnet.txt` · `source2_csi_usb_dec_infer_resnet.txt` | Configuraciones con **cámara CSI** (la compatibilidad del controlador depende de su cámara) |
| `source2_1080p_dec_infer-resnet_demux.txt` | Ejemplo de demux |

Notas del inicio rápido oficial:

- **La primera ejecución con un modelo nuevo tarda varios minutos** mientras se genera el motor TensorRT; las ejecuciones posteriores lo reutilizan.
- Si los elementos de GStreamer no se inicializan, limpie la caché: `rm ${HOME}/.cache/gstreamer-1.0/registry.aarch64.bin`
- **Funcionamiento sin monitor (headless):** el sink EGL predeterminado necesita una pantalla. Las configuraciones admiten en su lugar un **sink de salida RTSP** (véase el grupo `[sink2]` en la configuración de 30 transmisiones) — transmita los resultados a otra máquina.
- Todas las aplicaciones de ejemplo precompiladas están en `/opt/nvidia/deepstream/deepstream-9.1/samples/` — cada una tiene un README.

## 4. Novedades en torno a DeepStream 9.1 en JetPack 7.2

- **Pipelines asistidos por agentes:** NVIDIA documenta un *DeepStream Coding Agent* (soporte de agentes de IA para construir pipelines) — [documentación](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_AI_Agent.html) · [GitHub](https://github.com/DeepStream_Coding_Agent).
- **LLM/VLM en el pipeline:** las aplicaciones de referencia incluyen un **deepstream-vllm-plugin** para combinar pipelines de video con razonamiento de grandes modelos — consulte [la documentación](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_ref_app_vllm_plugin.html). Para la inferencia de modelos en el propio dispositivo fuera de DeepStream, consulte [Inferencia de LLM local](/es/tutorials/jetson-agx-orin/local-llm).
- **Triton en el dispositivo:** para ejecutar Triton Inference Server de forma nativa (sin Docker), ejecute `sudo ./triton_backend_setup.sh` en el directorio de ejemplos (instala Triton 2.68.0 para Jetson).

## Solución de problemas y lecturas adicionales

- [Preguntas frecuentes y solución de problemas de DeepStream](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_troubleshooting.html)
- [Ajuste del rendimiento](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html) — necesario cuando vaya más allá de las configuraciones de referencia
- [Explicación de las configuraciones de ejemplo](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_sample_configs_streams.html)
- Problemas a nivel de sistema (pantalla, alimentación, almacenamiento): consulte [Solución de problemas](/es/tutorials/jetson-agx-orin/troubleshooting)

## Fuentes

- [Guía de instalación de DeepStream](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) (consultado el 2026-09-24)
- [Guía de inicio rápido de DeepStream](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html) (consultado el 2026-09-24)
- [Página de descargas de JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads) (consultado el 2026-09-24) — ⚠️ su tabla de componentes va con retraso en algunas filas; para las versiones realmente instaladas, consulte [Descargas](/es/tutorials/jetson-agx-orin/downloads)

*Estado: borrador, pendiente de revisión por cheny. Basado en la documentación
oficial de NVIDIA a la fecha indicada; aún no verificado en hardware físico por
Juxi Technology.*

---

NVIDIA® y Jetson™ son marcas comerciales de NVIDIA Corporation. Esta página es
publicada por Juxi Technology y no es una publicación de NVIDIA.
