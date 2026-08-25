---
title: Incompatibilità PyTorch su Jetson Orin
description: "Installare la versione jetson di PyTorch"
---

# Incompatibilità PyTorch su Jetson Orin

Possibile problema 1:
`GPU non utilizzabile`

Installare la versione jetson di PyTorch
Tutorial: https://docs.nvidia.com/deeplearning/frameworks/install-pytorch-jetson-platform/index.html

Si può scegliere la versione: https://developer.download.nvidia.com/compute/redist/jp/

Versione usata:
torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl

Dopo il download, eseguire:
```Plain Text
export TORCH_INSTALL=torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl
pip install --no-cache $TORCH_INSTALL
```

Test:
```Python
import torch
torch.cuda.is_available()
```
