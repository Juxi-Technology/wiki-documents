---
title: Multi-Stream Video Analytics — DeepStream 9.1
sidebar_label: DeepStream Video Analytics
slug: /tutorials/deepstream
description: >-
  Install DeepStream 9.1 on the AGX Orin Developer Kit and run the reference
  video-analytics application — with the official install options, sample
  configs, and JP7.2-specific notes.
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
review_owner: cheny
---

# Multi-Stream Video Analytics — DeepStream 9.1

DeepStream is NVIDIA's framework for building accelerated intelligent
video-analytics (IVA) pipelines, and **DeepStream 9.1 ships with JetPack 7.2**
on Jetson Orin. This tutorial follows NVIDIA's official installation and
quickstart documentation; every command below is taken from (or directly
summarized from) those pages.

**Version pairing:** DeepStream 9.1 ↔ JetPack 7.2 GA ↔ L4T 39.2 ↔ CUDA 13.2 ↔
TensorRT 10.16.1.7 ↔ Ubuntu 24.04 ↔ GStreamer 1.24.2 *(per NVIDIA's
compatibility table)*.

## 1. Install

NVIDIA offers four install methods on Jetson; the official note recommends
**Docker for new users** (fastest, dependency-free):

- **Method 4 — Docker (recommended for new users):** use the NGC DeepStream containers — see [Docker Containers](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html).
- **Method 1 — SDK Manager:** select **DeepStreamSDK** under "Additional SDKs" together with the JetPack 7.2 GA components.
- **Method 2 — tar package:** download `deepstream_sdk_v9.1.0_jetson.tbz2` (from [NVIDIA/DeepStream releases](https://github.com/DeepStream/releases/tag)), then:
  ```bash
  sudo tar -xvf deepstream_sdk_v9.1.0_jetson.tbz2 -C /
  cd /opt/nvidia/deepstream/deepstream-9.1
  sudo ./install.sh
  sudo ldconfig
  ```
- **Method 3 — Debian package:** install `deepstream-9.1_9.1.0-1_arm64.deb` with `sudo apt-get install ./deepstream-9.1_9.1.0-1_arm64.deb`.

**Prerequisite packages** (official dependency list for the native install):

```bash
sudo apt install \
libssl3 libssl-dev libcurl4-openssl-dev \
libgstreamer1.0-0 gstreamer1.0-tools gstreamer1.0-plugins-good \
gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gstreamer1.0-libav \
libgstreamer-plugins-base1.0-dev libgstrtspserver-1.0-0 \
libjansson4 libyaml-cpp-dev libmosquitto1
```

> **Juxi note:** if you hit the documented RTSP issue (applications stuck at
> EOS with RTSP streams), run the `update_rtpmanager.sh` script in
> `/opt/nvidia/deepstream/deepstream/` after installing the packages above.

## 2. Boost the clocks (before running anything)

```bash
sudo nvpmodel -m 0
sudo jetson_clocks
```

NVIDIA notes one exception: **Jetson Orin Nano** uses `-m 2` for MAXN SUPER;
all other Orin modules (including AGX Orin) use `-m 0`. Run these before
running DeepStream applications.

## 3. Run the reference application

```bash
cd /opt/nvidia/deepstream/deepstream-9.1/samples/configs/deepstream-app
deepstream-app -c source30_1080p_dec_infer-resnet_tiled_display.txt
```

What to expect (per NVIDIA): a tiled display of 30 simulated 1080p streams
with ResNet inference, and performance metrics — **~30 FPS for this
configuration** — printed in the terminal. Click a tile to zoom in; right-click
to return to the tiled view.

Useful config files to explore (all in that directory):

| Config | Use case |
|---|---|
| `source30_1080p_dec_infer-resnet_tiled_display.txt` | 30-stream benchmark |
| `source4_1080p_dec_infer-resnet_tracker_sgie_tiled_display.txt` | Tracking + secondary inference |
| `source1_usb_dec_infer_resnet.txt` | **Single USB camera** |
| `source1_csi_dec_infer_resnet.txt` · `source2_csi_usb_dec_infer_resnet.txt` | **CSI camera** setups (driver support depends on your camera) |
| `source2_1080p_dec_infer-resnet_demux.txt` | Demux example |

Notes from the official quickstart:

- **First run with a new model takes minutes** while the TensorRT engine is generated; later runs reuse it.
- If GStreamer elements fail to initialize, clear the cache: `rm ${HOME}/.cache/gstreamer-1.0/registry.aarch64.bin`
- **Headless operation (no monitor):** the default EGL sink needs a display. Configs support an **RTSP output sink** instead (see the `[sink2]` group in the 30-stream config) — stream the results to another machine.
- All precompiled sample apps live under `/opt/nvidia/deepstream/deepstream-9.1/samples/` — each has a README.

## 4. What's new around DeepStream 9.1 on JetPack 7.2

- **Agent-assisted pipelines:** NVIDIA documents a *DeepStream Coding Agent* (AI agent support for building pipelines) — [docs](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_AI_Agent.html) · [GitHub](https://github.com/DeepStream_Coding_Agent).
- **LLM/VLM in the pipeline:** the reference apps include a **deepstream-vllm-plugin** for combining video pipelines with large-model reasoning — see [the docs](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_ref_app_vllm_plugin.html). For on-device model inference outside DeepStream, see [Local LLM Inference](/tutorials/jetson-agx-orin/local-llm).
- **Triton on device:** to run Triton Inference Server natively (without Docker), run `sudo ./triton_backend_setup.sh` in the samples directory (installs Triton 2.68.0 for Jetson).

## Troubleshooting & further reading

- [DeepStream Troubleshooting & FAQ](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_troubleshooting.html)
- [Performance tuning](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html) — needed once you go beyond the reference configs
- [Sample Configurations explained](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_sample_configs_streams.html)
- System-level issues (display, power, storage): see [Troubleshooting](/tutorials/jetson-agx-orin/troubleshooting)

## Sources

- [DeepStream Installation Guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) (checked 2026-09-24)
- [DeepStream Quickstart Guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html) (checked 2026-09-24)
- [JetPack 7.2.1 component list](https://developer.nvidia.com/embedded/jetpack/downloads) (checked 2026-09-24)

*Status: draft, pending review by cheny. Grounded in NVIDIA's official
documentation as of the date listed; not yet verified on physical hardware by
Juxi Technology.*

---

NVIDIA® and Jetson™ are trademarks of NVIDIA Corporation. This page is published
by Juxi Technology and is not an NVIDIA publication.
