---
title: Incompatibilité PyTorch sur Jetson Orin
description: "Installer la version Jetson de PyTorch"
---

# Incompatibilité PyTorch sur Jetson Orin

Problème possible 1 :
`GPU inutilisable`

Installer la version Jetson de PyTorch
Tutoriel : https://docs.nvidia.com/deeplearning/frameworks/install-pytorch-jetson-platform/index.html

Version au choix : https://developer.download.nvidia.com/compute/redist/jp/

Version utilisée :
torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl

Après téléchargement, exécuter :
```Plain Text
export TORCH_INSTALL=torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl
pip install --no-cache $TORCH_INSTALL
```

Test :
```Python
import torch
torch.cuda.is_available()
```

Problème possible 2 :

`ImportError: libcusparseLt.so.0: cannot open shared object file: No such file or directory`

Solution :

Installer la bibliothèque cuSPARSELt correspondant à la version CUDA supportée par la plateforme Jetson Orin.

Lien de téléchargement :

[https://developer.nvidia.com/cuda-12-6-0-download-archive?target_os=Linux&target_arch=aarch64-jetson&Compilation=Native&Distribution=Ubuntu&target_version=22.04&target_type=deb_local](https://developer.nvidia.com/cuda-12-6-0-download-archive?target_os=Linux&target_arch=aarch64-jetson&Compilation=Native&Distribution=Ubuntu&target_version=22.04&target_type=deb_local)

[https://developer.nvidia.com/cusparselt-downloads](https://developer.nvidia.com/cusparselt-downloads)

Problème possible 3 :

`torchvision n'est pas disponible`

Solution :

Installer manuellement la version de torchvision correspondante. torch 2.5 → torchvision 0.20.0

```Python
git clone --branch v0.20.0 https://github.com/pytorch/vision.git
```

Compiler après téléchargement :

```Plain Text
export BUILD_VERSION=0.20.0
python3 setup.py install --user
```

Lien de référence : https://zhuanlan.zhihu.com/p/1933164131969659101
