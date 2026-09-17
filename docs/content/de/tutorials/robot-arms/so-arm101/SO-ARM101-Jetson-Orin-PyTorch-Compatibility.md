---
title: PyTorch-Inkompatibilität auf Jetson Orin
description: "Teil des SO-ARM101-Tutorials: PyTorch-Probleme auf dem Jetson Orin — Lösungen für GPU-Nutzung, libcusparseLt-Fehler und torchvision-Installation."
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
```

```Python
torch.cuda.is_available()
```



Mögliches Problem 2:

`ImportError: libcusparseLt.so.0: cannot open shared object file: No such file or directory`

Lösung:

Die zur [ CUDA-Version ](https://zhida.zhihu.com/search?content_id=260919926&content_type=Article&match_order=1&q=CUDA+%E7%89%88%E6%9C%AC&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3NTg2NzU1OTAsInEiOiJDVURBIOeJiOacrCIsInpoaWRhX3NvdXJjZSI6ImVudGl0eSIsImNvbnRlbnRfaWQiOjI2MDkxOTkyNiwiY29udGVudF90eXBlIjoiQXJ0aWNsZSIsIm1hdGNoX29yZGVyIjoxLCJ6ZF90b2tlbiI6bnVsbH0.r3avEgICriFd9LzNma06NoECFbsmadH2Z9SnIG3M3G8&zhida_source=entity) passende [ cuSPARSELt ](https://zhida.zhihu.com/search?content_id=260919926&content_type=Article&match_order=1&q=cuSPARSELt&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3NTg2NzU1OTAsInEiOiJjdVNQQVJTRUx0IiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjYwOTE5OTI2LCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.fZ1o2yYSDWTelKbzIGc6sROSRrQPDmjLSpTziU42Q_M&zhida_source=entity) -Bibliothek installieren, die mit dem Jetson-Orin-System kompatibel ist.

Download-Link:

[https://developer.nvidia.com/cuda-12-6-0-download-archive?target_os=Linux&amp;target_arch=aarch64-jetson&amp;Compilation=Native&amp;Distribution=Ubuntu&amp;target_version=22.04&amp;target_type=deb_local](https://link.zhihu.com/?target=https%3A//developer.nvidia.com/cuda-12-6-0-download-archive%3Ftarget_os%3DLinux%26target_arch%3Daarch64-jetson%26Compilation%3DNative%26Distribution%3DUbuntu%26target_version%3D22.04%26target_type%3Ddeb_local)

[https://developer.nvidia.com/cusparselt-downloads](https://link.zhihu.com/?target=https%3A//developer.nvidia.com/cusparselt-downloads)



Mögliches Problem 3:

`torchvision nicht verfügbar`

Lösung:

Passende torchvision-Version manuell installieren, torch 2.5 -\> torchvision 0.20.0

```Python
git clone --branch v0.20.0 [https://github.com/pytorch/vision.git](https://link.zhihu.com/?target=https%3A//github.com/pytorch/vision.git)
```

Nach dem Download kompilieren:

```Plain Text
export BUILD_VERSION=0.20.0
python3 setup.py install --user
```




Referenz-Link: https://zhuanlan.zhihu.com/p/1933164131969659101
