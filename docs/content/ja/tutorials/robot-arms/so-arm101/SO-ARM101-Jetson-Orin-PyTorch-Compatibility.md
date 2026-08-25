---
title: Jetson Orin での PyTorch 非互換問題
description: "jetson 版の pytorch をインストール"
---

# Jetson Orin での PyTorch 非互換問題

発生しうる問題1：
`GPUが使用できない`

jetson 版の pytorch をインストールします
チュートリアル：https://docs.nvidia.com/deeplearning/frameworks/install-pytorch-jetson-platform/index.html

バージョンは自分で選べます：https://developer.download.nvidia.com/compute/redist/jp/

私が使用したバージョン：
torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl

ダウンロード後、実行：
```Plain Text
export TORCH_INSTALL=torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl
pip install --no-cache $TORCH_INSTALL
```

テスト：
```Python
import torch
torch.cuda.is_available()
```
