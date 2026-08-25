---
title: PyTorch-Inkompatibilitäten auf Jetson Orin
description: Lösungen für PyTorch-GPU-Probleme auf Jetson Orin
---

# PyTorch-Inkompatibilitäten auf Jetson Orin

## Problem 1: GPU nicht verfügbar

Jetson-Version von PyTorch installieren:

```bash
export TORCH_INSTALL=torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl
pip install --no-cache $TORCH_INSTALL
```

Versionen: https://developer.download.nvidia.com/compute/redist/jp/

## Problem 2: libcusparseLt-Fehler

`ImportError: libcusparseLt.so.0` — cuSPARSELt für CUDA-Version von Jetson Orin installieren.

## Problem 3: torchvision fehlt

torch 2.5 → torchvision 0.20.0:

```bash
git clone --branch v0.20.0 https://github.com/pytorch/vision.git
cd vision
export BUILD_VERSION=0.20.0
python3 setup.py install --user
```