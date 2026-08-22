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
