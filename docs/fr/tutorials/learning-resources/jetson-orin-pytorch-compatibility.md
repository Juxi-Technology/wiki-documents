---
title: Incompatibilités PyTorch sur Jetson Orin
description: Solutions pour les problèmes GPU PyTorch sur Jetson Orin
---

# Incompatibilités PyTorch sur Jetson Orin

## Problème 1 : GPU indisponible

Installer la version Jetson de PyTorch :

```bash
export TORCH_INSTALL=torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl
pip install --no-cache $TORCH_INSTALL
```

Versions : https://developer.download.nvidia.com/compute/redist/jp/

## Problème 2 : Erreur libcusparseLt

`ImportError: libcusparseLt.so.0` — installer cuSPARSELt pour la version CUDA du Jetson Orin.

## Problème 3 : torchvision manquant

torch 2.5 → torchvision 0.20.0 :

```bash
git clone --branch v0.20.0 https://github.com/pytorch/vision.git
cd vision
export BUILD_VERSION=0.20.0
python3 setup.py install --user
```