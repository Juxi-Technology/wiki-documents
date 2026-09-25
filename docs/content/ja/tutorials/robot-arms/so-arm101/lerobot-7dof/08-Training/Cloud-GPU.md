---
title: "クラウドGPU訓練環境の設定"
description: "クラウドGPUプラットフォームで訓練用インスタンスを開設し、環境構築、データセットの転送、アルゴリズムの選び方までを説明します。"
---

# クラウドGPU訓練環境の設定

## 自分のパソコンのネットワークプロキシをオフにする

そうしないと Jupyter のコマンドラインを開けない場合があります

## クラウドGPUプラットフォーム Featurize にログイン

https://featurize\.cn?s=d7ce99f842414bfcaea5662a97581bd1

ユーザーグループに参加し、カスタマーサポートに同済子豪兄のファンだと伝えると、代金券を受け取れます

## クラウドGPUインスタンスを起動する

## 環境のインストールと設定

```Shell
conda create -y -n lerobot python=3.12
conda activate lerobot
conda install ffmpeg=7.1.1 -c conda-forge -y
# git clone https://github.com/Seeed-Projects/lerobot.git ~/work/Lerobot
git clone https://github.com/huggingface/lerobot.git
cd lerobot
pip install -e ".[pi]"
pip install wandb --upgrade
# export HF_ENDPOINT=https://hf-mirror.com
hf auth login
```

## wandb にログイン

```Shell
wandb login
API Key をコピーして貼り付け、Enter を押します
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/5.png)

## データセットのマウント

```Shell
インスタンスのダウンロードコマンドをコピーする。例：
featurize dataset download 7f40bdaa-b1a4-4c00-9652-ff26fd079109

unzip lerobot_zihao_dataset_shake_hands.zip
```

データセットは`~`ディレクトリの下に現れます

## 重みの保存頻度を変更する（任意）

`lerobot/src/lerobot/configs/train.py`を開く

save\_freq を、20\_000 から 5\_000 に変更します

これにより、訓練のより早い段階でモデルの重みファイルを取得できます



