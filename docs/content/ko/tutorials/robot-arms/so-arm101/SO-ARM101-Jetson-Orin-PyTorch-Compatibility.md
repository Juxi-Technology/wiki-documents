---
title: Jetson Orin에서 PyTorch 비호환 문제
description: "NVIDIA Jetson Orin에서 SO-ARM101용 PyTorch 비호환 문제 해결 가이드 — Jetson 전용 PyTorch 설치와 오류 대응 방법."
---

# Jetson Orin에서 PyTorch 비호환 문제

발생할 수 있는 문제 1:
`GPU를 사용할 수 없음`

jetson 버전 pytorch를 설치합니다
튜토리얼: https://docs.nvidia.com/deeplearning/frameworks/install-pytorch-jetson-platform/index.html

버전은 직접 선택 가능: https://developer.download.nvidia.com/compute/redist/jp/

사용한 버전:
torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl

다운로드 후 실행:
```Plain Text
export TORCH_INSTALL=torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl
pip install --no-cache $TORCH_INSTALL
```

테스트:
```Python
import torch
torch.cuda.is_available()
```

발생할 수 있는 문제 2:

`ImportError: libcusparseLt.so.0: cannot open shared object file: No such file or directory`

해결 방법:

Jetson Orin 플랫폼과 호환되는 CUDA 버전에 해당하는 cuSPARSELt 라이브러리를 설치합니다

다운로드 링크:

[https://developer.nvidia.com/cuda-12-6-0-download-archive?target_os=Linux&target_arch=aarch64-jetson&Compilation=Native&Distribution=Ubuntu&target_version=22.04&target_type=deb_local](https://link.zhihu.com/?target=https%3A//developer.nvidia.com/cuda-12-6-0-download-archive%3Ftarget_os%3DLinux%26target_arch%3Daarch64-jetson%26Compilation%3DNative%26Distribution%3DUbuntu%26target_version%3D22.04%26target_type%3Ddeb_local)

[https://developer.nvidia.com/cusparselt-downloads](https://link.zhihu.com/?target=https%3A//developer.nvidia.com/cusparselt-downloads)

발생할 수 있는 문제 3:

`torchvision is not available`

해결 방법:

호환되는 vision 버전을 수동으로 설치합니다. torch 2.5 → torchvision 0.20.0

```Python
git clone --branch v0.20.0 https://github.com/pytorch/vision.git
```

다운로드 후 컴파일:

```Plain Text
export BUILD_VERSION=0.20.0
python3 setup.py install --user
```

참고 링크: https://zhuanlan.zhihu.com/p/1933164131969659101
