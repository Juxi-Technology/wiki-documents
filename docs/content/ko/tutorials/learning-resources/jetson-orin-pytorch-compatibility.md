---
title: Jetson Orin에서 PyTorch 비호환 문제
description: Jetson Orin에서 PyTorch GPU가 안 될 때 해결법
---

# Jetson Orin에서 PyTorch 비호환 문제

> **[스토어에서 구매](https://www.juxitech.com/ko/products/nvidia-jetson-orin-nx-super-developer-kit)**


## 문제 1: GPU 사용 불가

Jetson용 PyTorch 설치:

```bash
export TORCH_INSTALL=torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl
pip install --no-cache $TORCH_INSTALL
```

버전 선택: https://developer.download.nvidia.com/compute/redist/jp/

## 문제 2: libcusparseLt 오류

`ImportError: libcusparseLt.so.0` — Jetson Orin 지원 CUDA용 cuSPARSELt 설치.

## 문제 3: torchvision 없음

torch 2.5 → torchvision 0.20.0:

```bash
git clone --branch v0.20.0 https://github.com/pytorch/vision.git
cd vision
export BUILD_VERSION=0.20.0
python3 setup.py install --user
```