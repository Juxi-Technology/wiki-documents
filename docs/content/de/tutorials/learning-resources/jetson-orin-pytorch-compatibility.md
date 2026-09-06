---
title: PyTorch-Inkompatibilitäten auf Jetson Orin
description: Lösungen für PyTorch-GPU-Probleme auf Jetson Orin
---

# PyTorch-Inkompatibilitäten auf Jetson Orin

> **[Im Shop kaufen](https://www.juxitech.com/de/products/nvidia-jetson-orin-nx-super-developer-kit)**


## Problem 1: GPU nicht verfügbar

Jetson-Version von PyTorch installieren.

Tutorial: https://docs.nvidia.com/deeplearning/frameworks/install-pytorch-jetson-platform/index.html

Versionen: https://developer.download.nvidia.com/compute/redist/jp/

Verwendete Version:

torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl

Nach dem Download ausführen:

```bash
export TORCH_INSTALL=torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl
pip install --no-cache $TORCH_INSTALL
```

Test:

```python
import torch
```

```python
torch.cuda.is_available()
```

## Problem 2: libcusparseLt-Fehler

Fehler: `ImportError: libcusparseLt.so.0: cannot open shared object file: No such file or directory`

Lösung:

Die zur CUDA-Version, die von der Jetson-Orin-Plattform unterstützt wird, passende cuSPARSELt-Bibliothek installieren.

Download-Links:

[https://developer.nvidia.com/cuda-12-6-0-download-archive?target_os=Linux&amp;target_arch=aarch64-jetson&amp;Compilation=Native&amp;Distribution=Ubuntu&amp;target_version=22.04&amp;target_type=deb_local](https://link.zhihu.com/?target=https%3A//developer.nvidia.com/cuda-12-6-0-download-archive%3Ftarget_os%3DLinux%26target_arch%3Daarch64-jetson%26Compilation%3DNative%26Distribution%3DUbuntu%26target_version%3D22.04%26target_type%3Ddeb_local)

[https://developer.nvidia.com/cusparselt-downloads](https://link.zhihu.com/?target=https%3A//developer.nvidia.com/cusparselt-downloads)

## Problem 3: torchvision fehlt

Lösung:

Passende torchvision-Version manuell installieren. torch 2.5 → torchvision 0.20.0

```bash
git clone --branch v0.20.0 https://github.com/pytorch/vision.git
```

Nach dem Download kompilieren:

```bash
export BUILD_VERSION=0.20.0
python3 setup.py install --user
```

Referenz: https://zhuanlan.zhihu.com/p/1933164131969659101
