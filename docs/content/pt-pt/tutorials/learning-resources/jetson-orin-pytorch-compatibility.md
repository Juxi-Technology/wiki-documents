---
title: "Compatibilidade PyTorch no Jetson Orin"
description: "Compatibilidade do PyTorch no Jetson Orin: instalar a versão específica para Jetson, resolver a cuSPARSELt em falta e instalar a torchvision correspondente."
---

# Compatibilidade PyTorch no Jetson Orin

> **[Comprar na Loja](https://www.juxitech.com/products/nvidia-jetson-orin-nx-super-developer-kit)**


## Possível Problema 1: GPU Indisponível

Instale a versão do PyTorch específica para Jetson.

Tutorial: https://docs.nvidia.com/deeplearning/frameworks/install-pytorch-jetson-platform/index.html

Escolha sua própria versão: https://developer.download.nvidia.com/compute/redist/jp/

A versão usada aqui:

torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl

Após o download, execute:

```Plain Text
export TORCH_INSTALL=torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl
pip install --no-cache $TORCH_INSTALL
```

Teste:

```Python
import torch
```

```Python
torch.cuda.is_available()
```

## Possível Problema 2: Biblioteca cuSPARSELt Ausente

Erro: `ImportError: libcusparseLt.so.0: cannot open shared object file: No such file or directory`

Solução:

Instale a biblioteca cuSPARSELt compatível com a versão do CUDA suportada pela plataforma Jetson Orin.

Links de download:

[https://developer.nvidia.com/cuda-12-6-0-download-archive?target_os=Linux&target_arch=aarch64-jetson&Compilation=Native&Distribution=Ubuntu&target_version=22.04&target_type=deb_local](https://link.zhihu.com/?target=https%3A//developer.nvidia.com/cuda-12-6-0-download-archive%3Ftarget_os%3DLinux%26target_arch%3Daarch64-jetson%26Compilation%3DNative%26Distribution%3DUbuntu%26target_version%3D22.04%26target_type%3Ddeb_local)

[https://developer.nvidia.com/cusparselt-downloads](https://link.zhihu.com/?target=https%3A//developer.nvidia.com/cusparselt-downloads)

## Possível Problema 3: torchvision Não Instalado

Solução:

Instale manualmente a versão correspondente do torchvision. torch 2.5 → torchvision 0.20.0

```Python
git clone --branch v0.20.0 https://github.com/pytorch/vision.git
```

Após o download, compile:

```Plain Text
export BUILD_VERSION=0.20.0
python3 setup.py install --user
```

Referência: https://zhuanlan.zhihu.com/p/1933164131969659101
