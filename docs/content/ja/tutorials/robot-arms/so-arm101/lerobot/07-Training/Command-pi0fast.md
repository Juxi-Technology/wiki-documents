---
title: "ステップ7:訓練コマンドライン-pi0fast"
description: "推論がより速いpi0fastアルゴリズムの訓練コマンドを、環境インストールとデータセット指定の違いに触れながら説明します。"
---

# ステップ7:訓練コマンドライン-pi0fast

## 実行の前に

- **環境**：先に[クラウドGPU訓練環境の設定](/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU)に従ってインスタンスを開設し、データセットを転送してから、本記事に戻って「環境のインストール」と「コマンドライン」の2節を実行してください
- **データセット**：以下の訓練コマンドには `--dataset.root` が書かれていません。HuggingFace Hub からデータセットを取得するため、データセットがすでに Hub にアップロードされている必要があります。データセットがローカルにしかない場合は、本記事末尾の「以前の内容」の段落を参考に、`--dataset.root=~/lerobot_my_dataset_shake_hands` を追加してください
- **出力ディレクトリ**：`--output_dir` がすでに存在する場合は、まず上の `sudo rm -rf` のコマンドで削除するか、新しい名前に変更してください
- **訓練中はいつでも wandb で曲線を確認できます**。[wandbでリアルタイム訓練曲線を確認](/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)を参照してください

## 参考ドキュメント

https://huggingface.co/docs/lerobot/pi0fast

## Issue

https://github.com/huggingface/lerobot/pull/2203

## 推奨クラウドGPUインスタンス

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0fast/1.png)

## 環境のインストール

```Shell
cd lerobot
pip install -e ".[pi0]"
pip install "lerobot[pi]@git+https://github.com/huggingface/lerobot.git"
```

## コマンドライン

- 以前の訓練が中断された output 以下のファイルを削除する

```Shell
sudo rm -rf output_lerobot_train/shake/pi0_fast_A
```

- 訓練

```Shell
lerobot-train \
    --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
    --dataset.revision=v0.1.0 \
    --policy.type=pi0_fast \
    --output_dir=output_lerobot_train/shake/pi0_fast_A \
    --job_name=shake_pi0_fast_A \
    --policy.pretrained_path=lerobot/pi0_fast_base \
    --policy.dtype=bfloat16 \
    --policy.gradient_checkpointing=true \
    --policy.chunk_size=10 \
    --policy.n_action_steps=10 \
    --policy.max_action_tokens=256 \
    --steps=50000 \
    --batch_size=8 \
    --policy.device=cuda \
    --policy.push_to_hub=false \
    --wandb.enable=true \
    --wandb.project=Lerobot_my_Project
```

## 以前の内容

```Shell
lerobot-train \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=pi0_fast \
  --output_dir=output_lerobot_train/shake/pi0_fast_A \
  --job_name=shake_pi0_fast_A \
  --policy.pretrained_path=lerobot/pi0_fast_base \
  --policy.compile_model=true \
  --policy.gradient_checkpointing=true \
  --policy.dtype=bfloat16 \
  --policy.freeze_vision_encoder=false \
  --policy.train_expert_only=false \
  --steps=50000 \
  --policy.device=cuda \
  --policy.push_to_hub=false \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --batch_size=8
```

実行して10分程度後、訓練が正式に開始されます

モデルの圧縮パッケージは5G程度、解凍後は7Gです

<RelatedProducts slugs="so-arm101" />
