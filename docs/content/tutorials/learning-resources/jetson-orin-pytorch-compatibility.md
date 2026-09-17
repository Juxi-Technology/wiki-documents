---
title: "Jetson Orin PyTorch Compatibility"
description: "Fix PyTorch issues on Jetson Orin: install the Jetson-specific build, get the GPU working, resolve the missing cuSPARSELt library and add matching torchvision."
---

# Jetson Orin PyTorch Compatibility

> **[Buy in Store](https://www.juxitech.com/products/nvidia-jetson-orin-nx-super-developer-kit)**


## Possible Issue 1: GPU Not Available

Install the Jetson-specific build of PyTorch.

Tutorial: https://docs.nvidia.com/deeplearning/frameworks/install-pytorch-jetson-platform/index.html

Choose your own version: https://developer.download.nvidia.com/compute/redist/jp/

The version used here:

torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl

After downloading, run:

```Plain Text
export TORCH_INSTALL=torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl
pip install --no-cache $TORCH_INSTALL
```

Test:

```Python
import torch
```

```Python
torch.cuda.is_available()
```

## Possible Issue 2: Missing cuSPARSELt Library

Error: `ImportError: libcusparseLt.so.0: cannot open shared object file: No such file or directory`

Solution:

Install the cuSPARSELt library that matches the CUDA version supported by the Jetson Orin platform.

Download links:

[https://developer.nvidia.com/cuda-12-6-0-download-archive?target_os=Linux&target_arch=aarch64-jetson&Compilation=Native&Distribution=Ubuntu&target_version=22.04&target_type=deb_local](https://link.zhihu.com/?target=https%3A//developer.nvidia.com/cuda-12-6-0-download-archive%3Ftarget_os%3DLinux%26target_arch%3Daarch64-jetson%26Compilation%3DNative%26Distribution%3DUbuntu%26target_version%3D22.04%26target_type%3Ddeb_local)

[https://developer.nvidia.com/cusparselt-downloads](https://link.zhihu.com/?target=https%3A//developer.nvidia.com/cusparselt-downloads)

## Possible Issue 3: torchvision Not Installed

Solution:

Install the matching torchvision version manually. torch 2.5 → torchvision 0.20.0

```Python
git clone --branch v0.20.0 https://github.com/pytorch/vision.git
```

After downloading, build:

```Plain Text
export BUILD_VERSION=0.20.0
python3 setup.py install --user
```

Reference: https://zhuanlan.zhihu.com/p/1933164131969659101
