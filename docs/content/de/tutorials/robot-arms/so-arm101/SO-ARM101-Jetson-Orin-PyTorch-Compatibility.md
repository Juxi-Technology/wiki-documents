---
title: PyTorch-Inkompatibilität auf Jetson Orin
description: "PyTorch in der Jetson-Version installieren"
---

# PyTorch-Inkompatibilität auf Jetson Orin

Mögliches Problem 1:
`GPU nicht nutzbar`

PyTorch in der Jetson-Version installieren
Tutorial: https://docs.nvidia.com/deeplearning/frameworks/install-pytorch-jetson-platform/index.html

Version frei wählbar: https://developer.download.nvidia.com/compute/redist/jp/

Verwendete Version:
torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl

Nach dem Download ausführen:
```Plain Text
export TORCH_INSTALL=torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl
pip install --no-cache $TORCH_INSTALL
```

Test:
```Python
import torch
torch.cuda.is_available()
```
