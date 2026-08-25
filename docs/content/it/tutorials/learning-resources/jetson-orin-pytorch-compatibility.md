---
title: Incompatibilità PyTorch su Jetson Orin
description: Soluzioni per problemi GPU PyTorch su Jetson Orin
---

# Incompatibilità PyTorch su Jetson Orin

## Problema 1: GPU non disponibile

Installare la versione Jetson di PyTorch:

```bash
export TORCH_INSTALL=torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl
pip install --no-cache $TORCH_INSTALL
```

Versioni: https://developer.download.nvidia.com/compute/redist/jp/

## Problema 2: Errore libcusparseLt

`ImportError: libcusparseLt.so.0` — installare cuSPARSELt per la versione CUDA di Jetson Orin.

## Problema 3: torchvision mancante

torch 2.5 → torchvision 0.20.0:

```bash
git clone --branch v0.20.0 https://github.com/pytorch/vision.git
cd vision
export BUILD_VERSION=0.20.0
python3 setup.py install --user
```