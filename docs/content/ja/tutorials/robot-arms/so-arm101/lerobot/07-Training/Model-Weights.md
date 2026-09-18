---
title: "ステップ7:モデルの重みファイルを取得"
description: "クラウドGPUで訓練したモデルを圧縮パッケージにまとめ、ローカルパソコンへダウンロードして解凍する方法を説明します。"
---

# ステップ7:モデルの重みファイルを取得

クラウドGPUで訓練が完了したら、モデルをパッケージ化してローカルにダウンロードできます：

```Shell
cd ~/output_lerobot_train/a/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

20K ステップごとに、モデルの重みファイルが一度保存されます

右クリックで`ckpt.zip`圧縮パッケージをダウンロードし、ローカルのパソコンに解凍します

> モデルを他の人に渡す場合や、別のパソコンで推論する予定の場合は、パッケージ化してダウンロードするよりも Hugging Face に直接アップロードする方が手間が少なくて済みます。[モデルをHuggingFaceにアップロードする（任意）](/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload)を参照してください。

## 握手

```Shell
# 指定した訓練ステップ数で保存されたモデル
# cd ~/output_lerobot_train/shake/diffusion/checkpoints/005000

# 最新のモデル
cd ~/output_lerobot_train/shake/wallx/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

<RelatedProducts slugs="so-arm101" />
