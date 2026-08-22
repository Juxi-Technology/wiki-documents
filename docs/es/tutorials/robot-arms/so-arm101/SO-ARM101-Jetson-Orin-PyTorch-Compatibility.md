---
title: Incompatibilidad de PyTorch en Jetson Orin
description: "Instalar la versión de jetson de PyTorch"
---

# Incompatibilidad de PyTorch en Jetson Orin

Posible problema 1:
`GPU no utilizable`

Instalar la versión de jetson de PyTorch
Tutorial: https://docs.nvidia.com/deeplearning/frameworks/install-pytorch-jetson-platform/index.html

Puede elegir la versión: https://developer.download.nvidia.com/compute/redist/jp/

Versión utilizada:
torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl

Tras la descarga, ejecutar:
```Plain Text
export TORCH_INSTALL=torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl
pip install --no-cache $TORCH_INSTALL
```

Prueba:
```Python
import torch
torch.cuda.is_available()
```
