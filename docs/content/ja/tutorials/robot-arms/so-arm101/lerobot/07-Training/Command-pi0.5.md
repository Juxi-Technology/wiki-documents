---
title: "ステップ7:訓練コマンドライン-pi0.5"
description: "pi0を改良したpi0.5アルゴリズムの訓練コマンドを、専用の環境インストールと実行手順に沿って説明します。"
---

# ステップ7:訓練コマンドライン-pi0.5

## 実行の前に

- **環境**：先に[クラウドGPU訓練環境の設定](/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU)に従ってインスタンスを開設し、データセットを転送してから、本記事に戻って「環境のインストール」と「コマンドライン」の2節を実行してください
- **データセット**：コマンド内の `--dataset.root=~/lerobot_my_dataset_shake_hands` は第六步で収集した握手データセットを指します。自分で収集したタスクを訓練する場合は、自分のデータセット名に置き換えてください
- **出力ディレクトリ**：`--output_dir` がすでに存在する場合は、まず上の `sudo rm -rf` のコマンドで削除するか、新しい名前に変更してください
- **訓練中はいつでも wandb で曲線を確認できます**。[wandbでリアルタイム訓練曲線を確認](/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)を参照してください

## 参考ドキュメント

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/pi0.mdx

https://www.pi.website/blog/pi05

## 推奨クラウドGPUインスタンス

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0.5/1.png)

## 環境のインストール

```Shell
cd lerobot
pip install -e ".[pi0]"
```

## コマンドライン

- 以前の訓練が中断された output 以下のファイルを削除する

```Shell
sudo rm -rf output_lerobot_train/shake/pi05_A
```

- 訓練

```Shell
lerobot-train \
    --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
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

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0.5/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0.5/3.png)

コマンドラインを実行して20分後、訓練が正式に開始されます

モデルの圧縮パッケージは5G程度、解凍後は7Gです

<RelatedProducts slugs="so-arm101" />
