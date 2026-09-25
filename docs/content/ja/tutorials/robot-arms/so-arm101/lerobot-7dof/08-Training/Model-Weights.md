---
title: "モデルの重みファイルを取得"
description: "クラウドGPUで訓練したモデルを圧縮パッケージにまとめ、ローカルパソコンへダウンロードして解凍する方法を説明します。"
---

# モデルの重みファイルを取得



```Shell
cd ~/output_lerobot_train/a/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

20K ステップごとに、モデルの重みファイルが一度保存されます



右クリックで`ckpt.zip`圧縮パッケージをダウンロードし、ローカルのパソコンに解凍します















## 握手

```Shell
# 指定した訓練ステップ数で保存されたモデル
# cd ~/output_lerobot_train/shake/diffusion/checkpoints/005000

# 最新のモデル
cd ~/output_lerobot_train/shake/wallx/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```



