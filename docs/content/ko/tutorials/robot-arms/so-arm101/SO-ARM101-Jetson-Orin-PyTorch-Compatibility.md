---
title: Jetson Orin에서 PyTorch 비호환 문제
description: "jetson 버전 pytorch 설치"
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
