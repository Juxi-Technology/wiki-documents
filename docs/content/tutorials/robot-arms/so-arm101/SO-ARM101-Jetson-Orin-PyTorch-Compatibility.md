---
title: "SO-ARM101 Jetson Orin PyTorch Compatibility"
description: "SO-ARM101 Jetson Orin PyTorch compatibility: fix GPU unavailable errors and missing cuSPARSELt library problems when training LeRobot on Jetson."
---

# SO-ARM101 Jetson Orin PyTorch Compatibility

Possible Problem 1: 

`GPU is unavailable`

Install the Jetson version of PyTorch 

Tutorial:  https://docs.nvidia.com/deeplearning/frameworks/install-pytorch-jetson-platform/index.html

You can choose the version yourself:  https://developer.download.nvidia.cn/compute/redist/jp/

The version I am using: 

torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl

After downloading, run: 

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



Possible Problem 2: 

`ImportError: libcusparseLt.so.0: cannot open shared object file: No such file or directory`

Solution: 

Install the [ CUDA version ](https://zhida.zhihu.com/search?content_id=260919926&content_type=Article&match_order=1&q=CUDA+%E7%89%88%E6%9C%AC&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3NTg2NzU1OTAsInEiOiJDVURBIOeJiOacrCIsInpoaWRhX3NvdXJjZSI6ImVudGl0eSIsImNvbnRlbnRfaWQiOjI2MDkxOTkyNiwiY29udGVudF90eXBlIjoiQXJ0aWNsZSIsIm1hdGNoX29yZGVyIjoxLCJ6ZF90b2tlbiI6bnVsbH0.r3avEgICriFd9LzNma06NoECFbsmadH2Z9SnIG3M3G8&zhida_source=entity) corresponding to the [ cuSPARSELt ](https://zhida.zhihu.com/search?content_id=260919926&content_type=Article&match_order=1&q=cuSPARSELt&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3NTg2NzU1OTAsInEiOiJjdVNQQVJTRUx0IiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjYwOTE5OTI2LCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.fZ1o2yYSDWTelKbzIGc6sROSRrQPDmjLSpTziU42Q_M&zhida_source=entity) library  compatible with the Jetson Orin platform

Download Link:

[https://developer.nvidia.com/cuda-12-6-0-download-archive?target_os=Linux&amp;target_arch=aarch64-jetson&amp;Compilation=Native&amp;Distribution=Ubuntu&amp;target_version=22.04&amp;target_type=deb_local](https://link.zhihu.com/?target=https%3A//developer.nvidia.com/cuda-12-6-0-download-archive%3Ftarget_os%3DLinux%26target_arch%3Daarch64-jetson%26Compilation%3DNative%26Distribution%3DUbuntu%26target_version%3D22.04%26target_type%3Ddeb_local)

[https://developer.nvidia.com/cusparselt-downloads](https://link.zhihu.com/?target=https%3A//developer.nvidia.com/cusparselt-downloads)



Possible Problem 3: 

`torchvision is not available`

Solution: 

Manually install the matching vision version, torch 2.5 -\> torchvision 0.20.0 

```bash
git clone --branch v0.20.0 https://github.com/pytorch/vision.git
```

Compile after downloading:

```Plain Text
export BUILD_VERSION=0.20.0
python3 setup.py install --user
```





Reference Link: https://zhuanlan.zhihu.com/p/1933164131969659101



