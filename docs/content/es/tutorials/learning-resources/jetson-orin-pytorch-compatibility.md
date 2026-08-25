---
title: Incompatibilidades de PyTorch en Jetson Orin
description: Soluciones para problemas de GPU de PyTorch en Jetson Orin
---

# Incompatibilidades de PyTorch en Jetson Orin

## Problema 1: GPU no disponible

Instalar la versión de PyTorch para Jetson:

```bash
export TORCH_INSTALL=torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl
pip install --no-cache $TORCH_INSTALL
```

Versiones: https://developer.download.nvidia.com/compute/redist/jp/

## Problema 2: Error libcusparseLt

`ImportError: libcusparseLt.so.0` — instalar cuSPARSELt para la versión CUDA de Jetson Orin.

## Problema 3: falta torchvision

torch 2.5 → torchvision 0.20.0:

```bash
git clone --branch v0.20.0 https://github.com/pytorch/vision.git
cd vision
export BUILD_VERSION=0.20.0
python3 setup.py install --user
```