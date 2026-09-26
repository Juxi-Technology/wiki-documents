---
title: Video Analytics Pipelines — DeepStream 9.1
sidebar_label: DeepStream Video Analytics
slug: /tutorials/deepstream
description: >-
  Run NVIDIA DeepStream 9.1 on the Jetson Orin Nano Super Developer Kit
  (8GB) — version pairing, install, decode limits, memory, and headless
  RTSP output.
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

# Video Analytics Pipelines — DeepStream 9.1

DeepStream is NVIDIA's SDK for building accelerated intelligent video
analytics (IVA) pipelines, and DeepStream 9.1 is the release that runs on
Jetson Orin under JetPack 7.2. This page covers version pairing, install
routes, decode limits, first-run expectations, headless RTSP output, and
memory notes for the 8 GB Orin Nano Super Developer Kit.

## 1. Version pairing

**DeepStream 9.1 ↔ JetPack 7.2 GA ↔ L4T 39.2 ↔ CUDA 13.2 ↔ TensorRT
10.16.1.7 ↔ GStreamer 1.24.2** (Docker image `deepstream:9.1`), as listed
in the *Platform and OS Compatibility* table of the
[DeepStream Installation Guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html).

DeepStream 8.0 and 9.0 listed **AGX Thor only**; 9.1 is the first 9.x
release whose row includes Jetson Orin ("AGX Thor, Jetson Orin") — the
row says **"Jetson Orin"** as a group; earlier rows (DS 6.3 to DS 7.1)
named "Orin nano" explicitly. No 9.1 release note confirming Orin Nano
specifically was found — treat support as implied by the group label (not
yet confirmed). Baseline kit: JetPack 7.2.1 / L4T r39.2.1.

## 2. What this kit can decode

The [Gst-nvvideo4linux2](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvvideo4linux2.html)
decoder uses the NVDEC hardware engine and supports **H.264, H.265, AV1,
JPEG, and MJPEG**. Published Orin Nano module capabilities:

| Capability | Specification |
|---|---|
| Video decode (H.265) | 1x 4K60 · 2x 4K30 · 5x 1080p60 · 11x 1080p30 |
| Video encode | No hardware encoder — "1080p30 supported by 1-2 CPU cores" |
| DLA · PVA | None |

Inference runs in the [Gst-nvinfer](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvinfer.html)
plugin on TensorRT engines: FP16, FP32, and INT8 models (FP16 and INT8
are platform dependent); INT8 needs a calibration file. The plugin's
`enable-dla` option has no engine to target on this module — the Orin Nano
product page lists "DL Accelerator: -" and "Vision Accelerator: -".

**At 8 GB:** decoded frames, engines, and application memory share one
pool, with no DLA to offload work to. The "30-stream" sample below
decodes 30 1080p streams; this module's published decode capacity is
11x 1080p30 (H.265), so plan for fewer streams or lower resolution. There
is also **no hardware video encoder** — encoded output (for example,
RTSP streaming) runs on the CPU.

## 3. Install — Docker first

NVIDIA's guide says: "Recommended for new users: use Method 4 (Docker
container) for the quickest, dependency-free setup." The four Jetson
methods:

| Method | What it is |
|---|---|
| 1 — SDK Manager | Select **DeepStreamSDK** under "Additional SDKs" with the JetPack 7.2 GA components. |
| 2 — tar package | `deepstream_sdk_v9.1.0_jetson.tbz2`, a GitHub release asset. |
| 3 — Debian package | `deepstream-9.1_9.1.0-1_arm64.deb`. |
| 4 — Docker (recommended) | Jetson containers on NGC (`nvcr.io`). |

The Jetson containers are `nvcr.io/nvidia/deepstream:9.1-samples-multiarch`
(reference applications, sample models and configs) and
`nvcr.io/nvidia/deepstream:9.1-triton-multiarch` (plus devel libraries and
Triton backends). Prerequisites: `docker-ce`, the NVIDIA Container
Toolkit, an NGC account, and `docker login nvcr.io` (username
`$oauthtoken`, password = your NGC API key).

> **Important**: NVIDIA states: "The Jetson Docker containers are for
> deployment only. They do not support DeepStream software development
> within a container." Build applications natively on the kit and add your
> binaries to your own image.

In Docker, run `user_additional_install.sh` instead (see the EOS note
below). The Triton container's "Failed to detect NVIDIA driver version"
message is harmless.

> **Juxi tip:** For a minimal host install, select only "Jetson OS" in SDK
> Manager, then run `sudo apt install docker.io`, `sudo apt install
> nvidia-container`, `sudo apt install nvidia-l4t-gstreamer`, and
> `sudo service docker restart`.

## 4. Boost the clocks — with a kit-specific power mode

```bash
sudo nvpmodel -m 2
sudo jetson_clocks
```

Quoted from the quickstart: "For Jetson Orin Nano modules, use sudo
nvpmodel -m 2 instead of -m 0 to enable MAXN SUPER mode. For all other
Jetson Orin modules (including Orin NX), use -m 0." Run these before
running DeepStream applications. On a Super-configured 8 GB kit, the
power modes are **15W (mode 0)**, **25W (mode 1, default)**, and
**MAXN_SUPER (mode 2)**; MAXN_SUPER exists only on Super-flashed units.

> **Attention**: If 25W / MAXN SUPER is missing, or `nvpmodel -m 2`
> reports a bad power mode, the unit was not flashed with the Super
> configuration. See [Troubleshooting](/tutorials/jetson-orin-nano/troubleshooting).

## 5. First run — TensorRT engines build on first use

```bash
cd /opt/nvidia/deepstream/deepstream-9.1/samples/configs/deepstream-app
deepstream-app -c source30_1080p_dec_infer-resnet_tiled_display.txt
```

Quoted from the quickstart: for a model without an existing engine
file, "it may take up to a few minutes (depending on the platform and the
model) for the file generation and the application launch. For later
runs, these generated engine files can be reused for faster loading."
FPS metrics scroll in the terminal. The quickstart's "(~30 FPS for this
configuration)" is the documentation's generic figure — it is **not an
Orin Nano measurement**. If the application cannot create Gst elements,
clear the cache and retry:
`rm ${HOME}/.cache/gstreamer-1.0/registry.aarch64.bin`. Other sample
configs cover USB and CSI cameras and tracking with secondary inference.

## 6. Headless operation with RTSP output

The quickstart documents how to run without a display: the default
configs use the EGL-based `nveglglessink` renderer (`type=2` in the
`[sink]` groups), which requires a running X server. Add an RTSP output
sink group instead — the `[sink2]` group in
`source30_1080p_dec_infer-resnet_tiled_display.txt` is the example — and
set `enable=0` for the EGL sink group. The encoded RTSP output runs on
the CPU (Section 2: no hardware encoder).

> **Juxi note:** With RTSP streams, the application can get stuck reaching
> EOS (an `rtpjitterbuffer` issue). On bare metal, run
> `update_rtpmanager.sh` in `/opt/nvidia/deepstream/deepstream/` once,
> after installing the Quickstart dependency packages. In Docker, run
> `user_additional_install.sh` instead.

## 7. Memory planning for 8 GB

NVIDIA's memory-efficiency blog states: "Jetson Orin Nano 8 GB module, of
the 8 GB physical DRAM, roughly 7.6 GB is usable after firmware and kernel
reservations." CPU and GPU share this pool. Documented levers for
DeepStream-style pipelines:

| Lever | Memory that may be reclaimed |
|---|---|
| Run bare metal instead of a container | Up to 70 MB |
| Switch from Python to C++ applications | Up to 84 MB |
| Disable Tiler/OSD and use FakeSink | Up to 258 MB |
| **Total** | **412 MB** |

Disabling Tiler/OSD and using FakeSink "removes display stages needed for
visualization but unnecessary in headless or production deployments. This
saves memory, reduces GPU load, and improves throughput." This pairs with
the headless RTSP path above; disabling the graphical desktop can free up
to 865 MB. For the full 8 GB playbook, see
[Memory Efficiency on 8 GB](/tutorials/jetson-orin-nano/memory-efficiency).

## What NVIDIA does not publish for this kit

The official DeepStream 9.1 performance page for Jetson covers two
platforms only: **Jetson AGX Thor** and **Jetson AGX Orin**. No Orin Nano
FPS figures are published; do not read AGX Orin rows as Orin Nano
performance. For sizing, start from the decode capacity (Section 2),
then lower stream count and resolution until the pipeline fits.

For the closest published datapoint, [Ultralytics' Jetson
benchmarks](https://docs.ultralytics.com/guides/nvidia-jetson/) report
YOLO26n on the Orin Nano Super at ~4.57 ms/image (~219 FPS) with a
TensorRT FP16 engine and ~3.80 ms/image (~263 FPS) with INT8, at 640
input — **vendor data, measured on JetPack 6.1-era software, not this
kit's 7.2.1 stack**; inference time excludes pre/post-processing. Per
the same source, only the PyTorch, TorchScript, and TensorRT export
formats use the GPU — other export formats run on the CPU.

## Troubleshooting and further reading

- System-level issues (power modes, storage, display):
  [Troubleshooting](/tutorials/jetson-orin-nano/troubleshooting) ·
  [Memory Efficiency on 8 GB](/tutorials/jetson-orin-nano/memory-efficiency).
- Models outside DeepStream: [Local LLM Inference](/tutorials/jetson-orin-nano/local-llm) ·
  official performance reference:
  [DeepStream Performance](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html).

## Sources

- [DeepStream Installation Guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) (checked 2026-09-26)
- [DeepStream Quickstart Guide](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html) (checked 2026-09-26)
- [DeepStream Docker Containers](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html) (checked 2026-09-26)
- [DeepStream Performance](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html) (checked 2026-09-26)
- [Gst-nvvideo4linux2 (hardware decoder)](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvvideo4linux2.html) (checked 2026-09-26)
- [Gst-nvinfer](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvinfer.html) (checked 2026-09-26)
- [Jetson Orin modules — decode, encode, and accelerator specifications](https://developer.nvidia.com/embedded/jetson-orin) (checked 2026-09-26)
- [Maximizing memory efficiency to run bigger models on NVIDIA Jetson (developer blog)](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (checked 2026-09-26)
- [Jetson Linux r39.2 Developer Guide — Power and Performance](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (checked 2026-09-26)
- [Ultralytics — NVIDIA Jetson guide (vendor benchmarks)](https://docs.ultralytics.com/guides/nvidia-jetson/) (checked 2026-09-26)

*Status: draft, pending review by cheny. Grounded in NVIDIA's official
documentation as of the date listed; not yet verified on physical hardware
by Juxi Technology.*

---

NVIDIA® and Jetson™ are trademarks of NVIDIA Corporation. This page is published
by Juxi Technology and is not an NVIDIA publication.
