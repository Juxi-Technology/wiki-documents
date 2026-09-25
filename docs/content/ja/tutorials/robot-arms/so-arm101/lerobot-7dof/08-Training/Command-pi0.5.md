---
title: "訓練コマンドライン-pi0.5"
description: "pi0を改良したpi0.5アルゴリズムの訓練コマンドを、専用の環境インストールと実行手順に沿って説明します。"
---

# 訓練コマンドライン\-pi0\.5

## 参考ドキュメント

https://github\.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/pi0\.mdx

https://www\.pi\.website/blog/pi05

## 推奨クラウドGPUインスタンス

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0fast/1.png)

## 環境のインストール

```Shell
cd lerobot
pip install -e ".[pi0]"
```

## コマンドライン

- 以前の訓練が中断されたoutput以下のファイルを削除する

```Shell
sudo rm -rf output_lerobot_train/shake/pi05_A
```

- 訓練

```Shell
lerobot-train \
    --dataset.repo_id=Tommymy/lerobot_my_dataset_shake_hands \
    --dataset.root=~/lerobot_my_dataset_shake_hands \
    --dataset.revision=v0.1.0 \
    --policy.type=pi05 \
    --output_dir=~/output_lerobot_train/shake/pi05_A \
    --job_name=shake_pi05_A \
    --policy.pretrained_path=lerobot/pi05_base \
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

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0.5/2.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0.5/3.png)

コマンドラインを実行して 20 分後、訓練が正式に開始されます

モデルの圧縮パッケージは 5GB 程度、解凍後は 7GB です

