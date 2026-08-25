---
title: Jetson Orin での PyTorch 非互換問題
description: Jetson Orin で PyTorch の GPU が使えない場合の対処法
---

# Jetson Orin での PyTorch 非互換問題

> **[ストアで購入](https://www.juxitech.com/ja/products/nvidia-jetson-orin-nx-super-developer-kit)**


## 問題 1: GPU が使えない

Jetson 版 PyTorch をインストール:

```bash
export TORCH_INSTALL=torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl
pip install --no-cache $TORCH_INSTALL
```

バージョン選択: https://developer.download.nvidia.com/compute/redist/jp/

## 問題 2: libcusparseLt エラー

`ImportError: libcusparseLt.so.0` — Jetson Orin 対応 CUDA の cuSPARSELt をインストール。

## 問題 3: torchvision がない

torch 2.5 → torchvision 0.20.0:

```bash
git clone --branch v0.20.0 https://github.com/pytorch/vision.git
cd vision
export BUILD_VERSION=0.20.0
python3 setup.py install --user
```