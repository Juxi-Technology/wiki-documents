---
title: Jetson Orin에서 PyTorch 비호환 문제
description: Jetson Orin에서 PyTorch GPU가 안 될 때 해결법
---

# Jetson Orin에서 PyTorch 비호환 문제

> **[스토어에서 구매](https://www.juxitech.com/ko/products/nvidia-jetson-orin-nx-super-developer-kit)**


## 문제 1: GPU 사용 불가

Jetson용 PyTorch 설치:

튜토리얼: https://docs.nvidia.com/deeplearning/frameworks/install-pytorch-jetson-platform/index.html

```bash
export TORCH_INSTALL=torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl
pip install --no-cache $TORCH_INSTALL
```

버전 선택: https://developer.download.nvidia.com/compute/redist/jp/

테스트:

```Python
import torch
torch.cuda.is_available()
```

## 문제 2: libcusparseLt 오류

`ImportError: libcusparseLt.so.0: cannot open shared object file: No such file or directory`

해결 방법:

Jetson Orin 플랫폼이 지원하는 CUDA 버전과 일치하는 cuSPARSELt 라이브러리를 설치합니다.

다운로드 링크:

[https://developer.nvidia.com/cuda-12-6-0-download-archive?target_os=Linux&target_arch=aarch64-jetson&Compilation=Native&Distribution=Ubuntu&target_version=22.04&target_type=deb_local](https://link.zhihu.com/?target=https%3A//developer.nvidia.com/cuda-12-6-0-download-archive%3Ftarget_os%3DLinux%26target_arch%3Daarch64-jetson%26Compilation%3DNative%26Distribution%3DUbuntu%26target_version%3D22.04%26target_type%3Ddeb_local)

[https://developer.nvidia.com/cusparselt-downloads](https://link.zhihu.com/?target=https%3A//developer.nvidia.com/cusparselt-downloads)

## 문제 3: torchvision 없음

torch 2.5 → torchvision 0.20.0:

```bash
git clone --branch v0.20.0 https://github.com/pytorch/vision.git
cd vision
export BUILD_VERSION=0.20.0
python3 setup.py install --user
```

참조: https://zhuanlan.zhihu.com/p/1933164131969659101
