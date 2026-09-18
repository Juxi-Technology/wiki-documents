---
title: "ステップ7:ローカルUbuntuでの訓練"
description: "NVIDIAグラフィックスカードを搭載したパソコンで、収集済みのデータセットを使いローカルUbuntu上でモデルを訓練する手順です。"
---

# ステップ7:ローカルUbuntuでの訓練

本記事は、お使いのパソコンに NVIDIA グラフィックスカードが搭載されている場合に適用され、クラウドGPUは不要です。

## 実行の前に

- **環境**：[第一步：Lerobot環境のインストール](/ja/tutorials/robot-arms/so-arm101/lerobot/01-Environment-Setup/Ubuntu)に従ってインストールすればOKです。ローカルマシンでの訓練ではデータセットを別の場所に転送する必要はありません
- **データセット**：以下の例では第六步の1番目の記事で収集したみかん掴みデータセット `lerobot_my_dataset_a` を使用しており、パスは絶対パスで書かれています。ご自身のユーザー名に置き換えてください
- **Mac で訓練する場合**：コマンド内の `/home/<你的用户名>/` を `/Users/<你的用户名>/` に置き換えてください
- **出力ディレクトリ**：`--output_dir` がすでに存在する場合は、そのまま `FileExistsError` が報告されます。新しいディレクトリ名に変更するか、`--resume=true` を追加して訓練を続行してください

## 参考ドキュメント

https://github.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot_train.py

https://github.com/huggingface/lerobot/blob/main/src/lerobot/configs/train.py

- 注意

``の前には半角スペースを1つだけ、後ろにはスペースを入れてはいけません

データセットがローカルにある場合、`--dataset.streaming`は`false`でなければなりません。ストリーミング読み込みが不要だからです

```Shell
lerobot-train \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_a \
  --dataset.root=/home/<你的用户名>/.cache/huggingface/lerobot/<用户名>/lerobot_my_dataset_a \
  --dataset.revision=v0.4.0 \
  --dataset.streaming=false \
  --policy.type=act \
  --output_dir=output_lerobot_train/a \
  --job_name=orange_job \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=300000 \
  --batch_size=8
  
lerobot-train --dataset.repo_id=<用户名>/lerobot_my_dataset_a --dataset.root=/home/<你的用户名>/.cache/huggingface/lerobot/<用户名>/lerobot_my_dataset_a --dataset.revision=v0.4.0 --dataset.streaming=false --policy.type=act --output_dir=output_lerobot_train/a --job_name=orange_job --policy.device=cuda --wandb.enable=true --wandb.project=Lerobot_my_Project --policy.push_to_hub=false --steps=300000 --batch_size=8
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Local-Ubuntu/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Local-Ubuntu/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Local-Ubuntu/3.png)

<RelatedProducts slugs="so-arm101" />
