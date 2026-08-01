---
title: Jetson Orin 上 PyTorch 不相容問題
description: "安裝 jetson 版本的 pytorch"
---

# Jetson Orin 上 PyTorch 不相容問題

可能出現的問題一：

`GPU無法使用`

安裝 jetson 版本的 pytorch

教程：https://docs.nvidia.com/deeplearning/frameworks/install-pytorch-jetson-platform/index.html

可以自己選用版本：https://developer.download.nvidia.com/compute/redist/jp/

我使用的版本：

torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl

下載後，執行：

```Plain Text
export TORCH_INSTALL=torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl
pip install --no-cache $TORCH_INSTALL
```

測試：

```Python
import torch
```

```Python
torch.cuda.is_available()
```

可能出現的問題二：

報錯 `ImportError: libcusparseLt.so.0: cannot open shared object file: No such file or directory`

解決方法：

安裝 Jetson Orin 平台相容的 CUDA 版本對應的 cuSPARSELt 庫

下載連結：

[https://developer.nvidia.com/cuda-12-6-0-download-archive?target_os=Linux&target_arch=aarch64-jetson&Compilation=Native&Distribution=Ubuntu&target_version=22.04&target_type=deb_local](https://link.zhihu.com/?target=https%3A//developer.nvidia.com/cuda-12-6-0-download-archive%3Ftarget_os%3DLinux%26target_arch%3Daarch64-jetson%26Compilation%3DNative%26Distribution%3DUbuntu%26target_version%3D22.04%26target_type%3Ddeb_local)

[https://developer.nvidia.com/cusparselt-downloads](https://link.zhihu.com/?target=https%3A//developer.nvidia.com/cusparselt-downloads)

可能出現的問題三：

`沒有torchvision`

解決方法：

手動安裝匹配的 vision 版本，torch 2.5->torchvision 0.20.0

```Python
git clone --branch v0.20.0 https://github.com/pytorch/vision.git
```

下載後編譯：

```Plain Text
export BUILD_VERSION=0.20.0
python3 setup.py install --user
```

參考連結：https://zhuanlan.zhihu.com/p/1933164131969659101
