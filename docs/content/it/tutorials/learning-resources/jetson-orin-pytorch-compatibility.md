---
title: Incompatibilità PyTorch su Jetson Orin
description: Soluzioni per problemi GPU PyTorch su Jetson Orin
---

# Incompatibilità PyTorch su Jetson Orin

> **[Acquista nel negozio](https://www.juxitech.com/it/products/nvidia-jetson-orin-nx-super-developer-kit)**


## Problema 1: GPU non disponibile

Installare la versione Jetson di PyTorch.

Tutorial: https://docs.nvidia.com/deeplearning/frameworks/install-pytorch-jetson-platform/index.html

Si può scegliere la versione: https://developer.download.nvidia.com/compute/redist/jp/

La versione usata:

torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl

Dopo il download, eseguire:

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

## Problema 2: libreria cuSPARSELt mancante

Errore: `ImportError: libcusparseLt.so.0: cannot open shared object file: No such file or directory`

Soluzione:

Installare la libreria cuSPARSELt corrispondente alla versione CUDA supportata dalla piattaforma Jetson Orin.

Link di download:

[https://developer.nvidia.com/cuda-12-6-0-download-archive?target_os=Linux&amp;target_arch=aarch64-jetson&amp;Compilation=Native&amp;Distribution=Ubuntu&amp;target_version=22.04&amp;target_type=deb_local](https://developer.nvidia.com/cuda-12-6-0-download-archive?target_os=Linux&amp;target_arch=aarch64-jetson&amp;Compilation=Native&amp;Distribution=Ubuntu&amp;target_version=22.04&amp;target_type=deb_local)

[https://developer.nvidia.com/cusparselt-downloads](https://developer.nvidia.com/cusparselt-downloads)

## Problema 3: torchvision non installato

Soluzione:

Installare manualmente la versione corrispondente di torchvision. torch 2.5 → torchvision 0.20.0

```bash
git clone --branch v0.20.0 https://github.com/pytorch/vision.git
```

Dopo il download, compilare:

```Plain Text
export BUILD_VERSION=0.20.0
python3 setup.py install --user
```

Riferimento: https://zhuanlan.zhihu.com/p/1933164131969659101
