# Jetson Orin上Pytorch不兼容问题

可能出现的问题一：

`GPU无法使用`

安装jetson版本的pytorch

教程：https://docs.nvidia.com/deeplearning/frameworks/install-pytorch-jetson-platform/index.html

可以自己选用版本：https://developer.download.nvidia.com/compute/redist/jp/

我使用的版本：

torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl

下载后，运行：

```Plain Text
export TORCH_INSTALL=torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl
pip install --no-cache $TORCH_INSTALL
```

测试：

```Python
import torch
```

```Python
torch.cuda.is_available()
```

可能出现的问题二：

报错 `ImportError: libcusparseLt.so.0: cannot open shared object file: No such file or directory`

解决方法：

安装 Jetson Orin 平台兼容的 CUDA 版本对应的 cuSPARSELt 库

下载链接：

[https://developer.nvidia.com/cuda-12-6-0-download-archive?target_os=Linux&target_arch=aarch64-jetson&Compilation=Native&Distribution=Ubuntu&target_version=22.04&target_type=deb_local](https://link.zhihu.com/?target=https%3A//developer.nvidia.com/cuda-12-6-0-download-archive%3Ftarget_os%3DLinux%26target_arch%3Daarch64-jetson%26Compilation%3DNative%26Distribution%3DUbuntu%26target_version%3D22.04%26target_type%3Ddeb_local)

[https://developer.nvidia.com/cusparselt-downloads](https://link.zhihu.com/?target=https%3A//developer.nvidia.com/cusparselt-downloads)

可能出现的问题三：

`没有torchvision`

解决方法：

手动安装匹配的vision版本，torch 2.5->torchvision 0.20.0

```Python
git clone --branch v0.20.0 [https://github.com/pytorch/vision.git](https://link.zhihu.com/?target=https%3A//github.com/pytorch/vision.git)
```

下载后编译：

```Plain Text
export BUILD_VERSION=0.20.0
python3 setup.py install --user
```

参考链接：https://zhuanlan.zhihu.com/p/1933164131969659101
