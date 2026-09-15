---
title: Jetson Orin での PyTorch 非互換問題
description: "Jetson Orin 環境で PyTorch を使うときの非互換問題まとめ。GPU が認識されない場合やライブラリ不足の対処法を解説します。"
---

# Jetson Orin での PyTorch 非互換問題

> **[ストアで購入](https://www.juxitech.com/ja/products/nvidia-jetson-orin-nx-super-developer-kit)**


## 問題 1: GPU が使えない

Jetson 版 PyTorch をインストールします。

チュートリアル: https://docs.nvidia.com/deeplearning/frameworks/install-pytorch-jetson-platform/index.html

バージョンは自分で選べます: https://developer.download.nvidia.com/compute/redist/jp/

ここで使用したバージョン:

torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl

ダウンロード後、実行:

```bash
export TORCH_INSTALL=torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl
pip install --no-cache $TORCH_INSTALL
```

テスト:

```python
import torch
```

```python
torch.cuda.is_available()
```

## 問題 2: libcusparseLt エラー

エラー: `ImportError: libcusparseLt.so.0: cannot open shared object file: No such file or directory`

解決方法:

Jetson Orin プラットフォームが対応する CUDA バージョンと一致する cuSPARSELt ライブラリをインストールします。

ダウンロードリンク:

[https://developer.nvidia.com/cuda-12-6-0-download-archive?target_os=Linux&target_arch=aarch64-jetson&Compilation=Native&Distribution=Ubuntu&target_version=22.04&target_type=deb_local](https://link.zhihu.com/?target=https%3A//developer.nvidia.com/cuda-12-6-0-download-archive%3Ftarget_os%3DLinux%26target_arch%3Daarch64-jetson%26Compilation%3DNative%26Distribution%3DUbuntu%26target_version%3D22.04%26target_type%3Ddeb_local)

[https://developer.nvidia.com/cusparselt-downloads](https://link.zhihu.com/?target=https%3A//developer.nvidia.com/cusparselt-downloads)

## 問題 3: torchvision がない

解決方法:

対応する torchvision バージョンを手動でインストールします。torch 2.5 → torchvision 0.20.0

```python
git clone --branch v0.20.0 https://github.com/pytorch/vision.git
```

ダウンロード後、ビルド:

```bash
export BUILD_VERSION=0.20.0
python3 setup.py install --user
```

参考: https://zhuanlan.zhihu.com/p/1933164131969659101
