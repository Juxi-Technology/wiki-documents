---
title: "訓練コマンドライン-ACT（入門に推奨）"
description: "入門に最適なACTアルゴリズムの訓練コマンドを、主要なパラメータの意味と実行時の注意点とあわせて説明します。"
---

# 訓練コマンドライン\-ACT（入門に推奨）

## 参考ドキュメント

https://github\.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/act\.mdx

https://github\.com/huggingface/lerobot/blob/main/src/lerobot/scripts/lerobot\_train\.py

https://github\.com/huggingface/lerobot/blob/main/src/lerobot/configs/train\.py

## なぜACTアルゴリズムから始めるのか

ACTはLeRobotを扱う上で最初に訓練することが最も推奨されるモデルです。そのメリットは以下のとおりです：

- モデルが非常に軽量で、学習可能なパラメータがわずか八千万個です

- 訓練の収束が非常に速く、推論速度も速いです

- シングルGPUで訓練して 1 時間で効果が確認できます

- ACTモデルのダウンロード圧縮パッケージはおよそ 200MB 程度で、保存と転送が非常に便利です

- データセットは 30 回のデータ収集でほぼ十分です

- Ubuntu ホスト、Macコンピューター、Windowsコンピューター、さらには Raspberry Pi 上でもデプロイして推論できます

- 実機ロボットでの推論効果もかなり良く、掴み取り、握手、ペン置きといった簡単なタスクには十分です

- LeRobot ライブラリの基本環境にはすでに ACT アルゴリズムが含まれており、他のライブラリをインストールする必要はありません

## コマンドライン

```Shell
lerobot-train \
  --dataset.repo_id=Tommymy/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=act \
  --output_dir=~/output_lerobot_train/shake/act/ \
  --job_name=shake_act_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=20000 \
  --batch_size=8
```

## コマンドラインの説明

改行文字 `\` の前にはスペースを 1 つだけ入れ、後ろにはスペースを入れてはいけません

赤色は、実行のたびに確認または変更が必要なパラメータです

|コマンドラインパラメータ|説明|
|---|---|
|\-\-dataset\.repo\_id|HuggingFaceデータセットのRepo\_ID|
|\-\-dataset\.root|データセットのローカルパス|
|\-\-dataset\.revision|データセットのバージョン。HuggingFace にデータセットをアップロードした際に指定したものです|
|\-\-dataset\.streaming|データセットがローカルにある場合は、`false`でなければなりません。データセットがすでにローカルにあり、ストリーミング読み込みが不要だからです|
|\-\-dataset\.split|デフォルトは`train`、つまり全量データを訓練セットとして使用します|
|\-\-policy\.type|訓練するアルゴリズム。例えばact、smolvla、diffusion、pi0、wallx|
|\-\-output\_dir|訓練出力を保存するディレクトリ|
|\-\-job\_name|今回の訓練タスクの名前|
|\-\-policy\.device|計算デバイス|
|\-\-wandb\.enable|wandb の可視化を有効にする|
|\-\-wandb\.project|wandb のプロジェクト名|
|\-\-policy\.push\_to\_hub|訓練したモデルをHuggingFace のクラウドに送信する|
|\-\-steps|訓練ステップ数|
|\-\-batch\_size|1 ステップで入力するデータ量。VRAM が足りない場合は小さくする必要があります|
|||

## 訓練プロセス

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/2.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-ACT/3.png)

モデルの圧縮パッケージはおよそ 300MB です

