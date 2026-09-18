---
title: "ステップ7:訓練コマンドライン-pi0"
description: "最も効果が高いpi0アルゴリズムの訓練コマンドを、推奨インスタンス構成と専用の環境インストール手順とあわせて説明します。"
---

# ステップ7:訓練コマンドライン-pi0

## 実行の前に

- **環境**：先に[クラウドGPU訓練環境の設定](/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU)に従ってインスタンスを開設し、データセットを転送してから、本記事に戻って「環境のインストール」と「コマンドライン」の2節を実行してください
- **データセット**：コマンド内の `--dataset.root=~/lerobot_my_dataset_shake_hands` は第六步で収集した握手データセットを指します。自分で収集したタスクを訓練する場合は、自分のデータセット名に置き換えてください
- **出力ディレクトリ**：`--output_dir` がすでに存在する場合は、まず上の `sudo rm -rf` のコマンドで削除するか、新しい名前に変更してください
- **訓練中はいつでも wandb で曲線を確認できます**。[wandbでリアルタイム訓練曲線を確認](/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)を参照してください

## 参考ドキュメント

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/pi0.mdx

## 推奨クラウドGPUインスタンス

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0/1.png)

## 環境のインストール

```Shell
conda create -y -n lerobot-pi python=3.10 -y
conda activate lerobot-pi
conda install ffmpeg=7.1.1 -c conda-forge -y

cd lerobot
pip install -e ".[pi]"
```

## コマンドライン

```Shell
sudo rm -rf output_lerobot_train/shake/pi0_A

lerobot-train \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=pi0 \
  --output_dir=~/output_lerobot_train/shake/pi0_A \
  --job_name=shake_pi0_A \
  --policy.pretrained_path=lerobot/pi0_base \
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

コマンドラインを実行して20分後、訓練が正式に開始されます

モデルの圧縮パッケージは5G程度、解凍後は7Gです

<RelatedProducts slugs="so-arm101" />
