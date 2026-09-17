---
title: Incompatibilités PyTorch sur Jetson Orin
description: "Résoudre les incompatibilités PyTorch sur Jetson Orin : GPU indisponible, cuSPARSELt manquant et torchvision à compiler, avec les versions compatibles."
---

# Incompatibilités PyTorch sur Jetson Orin

> **[Acheter en boutique](https://www.juxitech.com/fr/products/nvidia-jetson-orin-nx-super-developer-kit)**


## Problème 1 : GPU indisponible

Installer la version Jetson de PyTorch.

Tutoriel : https://docs.nvidia.com/deeplearning/frameworks/install-pytorch-jetson-platform/index.html

Choisissez votre version : https://developer.download.nvidia.com/compute/redist/jp/

Version utilisée ici :

torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl

Après téléchargement, exécuter :

```bash
export TORCH_INSTALL=torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl
pip install --no-cache $TORCH_INSTALL
```

Test :

```python
import torch
```

```python
torch.cuda.is_available()
```

## Problème 2 : Bibliothèque cuSPARSELt manquante

Erreur : `ImportError: libcusparseLt.so.0: cannot open shared object file: No such file or directory`

Solution :

Installer la bibliothèque cuSPARSELt correspondant à la version CUDA supportée par la plateforme Jetson Orin.

Liens de téléchargement :

[https://developer.nvidia.com/cuda-12-6-0-download-archive?target_os=Linux&target_arch=aarch64-jetson&Compilation=Native&Distribution=Ubuntu&target_version=22.04&target_type=deb_local](https://developer.nvidia.com/cuda-12-6-0-download-archive?target_os=Linux&target_arch=aarch64-jetson&Compilation=Native&Distribution=Ubuntu&target_version=22.04&target_type=deb_local)

[https://developer.nvidia.com/cusparselt-downloads](https://developer.nvidia.com/cusparselt-downloads)

## Problème 3 : torchvision non installé

Solution :

Installer manuellement la version de torchvision correspondante. torch 2.5 → torchvision 0.20.0

```bash
git clone --branch v0.20.0 https://github.com/pytorch/vision.git
```

Après téléchargement, compiler :

```bash
export BUILD_VERSION=0.20.0
python3 setup.py install --user
```

Référence : https://zhuanlan.zhihu.com/p/1933164131969659101
