---
title: Incompatibilidades de PyTorch en Jetson Orin
description: "Guía de referencia para resolver las incompatibilidades de PyTorch en Jetson Orin: GPU no disponible, error libcusparseLt y torchvision ausente."
---

# Incompatibilidades de PyTorch en Jetson Orin

> **[Comprar en la tienda](https://www.juxitech.com/es/products/nvidia-jetson-orin-nx-super-developer-kit)**


## Problema 1: GPU no disponible

Instalar la versión de PyTorch para Jetson.

Tutorial: https://docs.nvidia.com/deeplearning/frameworks/install-pytorch-jetson-platform/index.html

Elige tu propia versión: https://developer.download.nvidia.com/compute/redist/jp/

Versión utilizada aquí:

torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl

Tras la descarga, ejecutar:

```bash
export TORCH_INSTALL=torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl
pip install --no-cache $TORCH_INSTALL
```

Prueba:

```python
import torch
torch.cuda.is_available()
```

## Problema 2: Error libcusparseLt

Error: `ImportError: libcusparseLt.so.0: cannot open shared object file: No such file or directory`

Solución:

Instalar la biblioteca cuSPARSELt que coincida con la versión de CUDA compatible con la plataforma Jetson Orin.

Enlaces de descarga:

[https://developer.nvidia.com/cuda-12-6-0-download-archive?target_os=Linux&target_arch=aarch64-jetson&Compilation=Native&Distribution=Ubuntu&target_version=22.04&target_type=deb_local](https://link.zhihu.com/?target=https%3A//developer.nvidia.com/cuda-12-6-0-download-archive%3Ftarget_os%3DLinux%26target_arch%3Daarch64-jetson%26Compilation%3DNative%26Distribution%3DUbuntu%26target_version%3D22.04%26target_type%3Ddeb_local)

[https://developer.nvidia.com/cusparselt-downloads](https://link.zhihu.com/?target=https%3A//developer.nvidia.com/cusparselt-downloads)

## Problema 3: falta torchvision

Solución:

Instalar manualmente la versión de torchvision que coincida. torch 2.5 → torchvision 0.20.0

```bash
git clone --branch v0.20.0 https://github.com/pytorch/vision.git
```

Tras la descarga, compilar:

```bash
export BUILD_VERSION=0.20.0
python3 setup.py install --user
```

Referencia: https://zhuanlan.zhihu.com/p/1933164131969659101
