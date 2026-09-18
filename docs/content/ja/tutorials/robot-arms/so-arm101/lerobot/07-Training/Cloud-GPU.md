---
title: "ステップ7:クラウドGPU訓練環境の設定"
description: "クラウドGPUプラットフォームで訓練用インスタンスを開設し、環境構築、データセットの転送、アルゴリズムの選び方までを説明します。"
---

# ステップ7:クラウドGPU訓練環境の設定

## 訓練の前に、まずこちらをお読みください

データセットは第六步で収集済みです。次はモデルの訓練です。このステップには3つのことが含まれ、本記事では前の2つを扱います：

1. **訓練環境の準備**：クラウドGPUプラットフォームでインスタンスを開設し、LeRobot、ffmpeg、wandb などをインストールする（本記事）
2. **データセットをクラウドGPUに転送する**：第六步で収集したデータはまだあなたのパソコン内にあります（本記事の「データセットのマウント」の節）
3. **訓練コマンドの実行**：アルゴリズムの選び方、パラメータの調整方法は以下の各記事を参照

## チュートリアルで使用するデータセット

訓練と推論のコマンドでは、データセットは**握手タスク `lerobot_my_dataset_shake_hands`** を使用します（第六步の3番目の記事で実演しているものです）。ローカルパスは `~/lerobot_my_dataset_shake_hands` です。訓練コマンドを実行する前に、このディレクトリが実際に存在し、名前が完全に一致していることを確認してください。

自分で収集したタスクを訓練する場合は、コマンド内のすべての `lerobot_my_dataset_shake_hands` を自分のデータセット名に置き換えるだけです。

## 訓練アルゴリズムの選び方

| アルゴリズム | ドキュメント | 特徴 |
|---|---|---|
| ACT | [訓練コマンドライン-ACT](/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-ACT) | 入門におすすめ。モデルが小さく訓練が速く、シングルGPUで1時間で効果が確認できる |
| SmolVLA | [訓練コマンドライン-smolvla](/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-smolvla) | 次のステップにおすすめ。事前学習済みモデルをベースにファインチューニングできる |
| pi0 | [訓練コマンドライン-pi0](/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0) | 最も効果が高いが、VRAM使用量が多く訓練が遅い |
| pi0.5 | [訓練コマンドライン-pi0.5](/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0.5) | pi0 の改良版 |
| pi0fast | [訓練コマンドライン-pi0fast](/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/Command-pi0fast) | 推論速度がより速い |

まず ACT で一通り完全なフローを動かし、慣れてから他のアルゴリズムに切り替えることをおすすめします。

## 訓練の後

- 訓練したモデルを Hugging Face にアップロードしたい場合（バックアップ、マシンの変更、他の人との共有）は、[モデルをHuggingFaceにアップロードする（任意）](/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload)を参照
- モデルをローカルのパソコンにダウンロードしたい場合は、[モデルの重みファイルを取得する](/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/Model-Weights)を参照

## ローカルマシンでの訓練

お使いのパソコンに NVIDIA グラフィックスカードが搭載されている場合は、クラウドGPUを使わずに直接ローカルマシンで訓練することもできます。[ローカルUbuntuでの訓練](/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu)を参照してください。

## 自分のパソコンのネットワークプロキシをオフにする

そうしないと Jupyter のコマンドラインを開けない場合があります

## クラウドGPUプラットフォーム Featurize にログイン

https://featurize.cn?s=d7ce99f842414bfcaea5662a97581bd1

## クラウドGPUインスタンスを起動する

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/3.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/4.png)

> 下部の「JupyterLab」をクリックすると、左上にアップロードボタンがあり、ここでコードとデータセットをアップロードできます
> 
> 

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

# Huggingface にアップロードせず wandb も不要な場合はインストール不要
```

> モデルのインストール時に training が不足している場合は、追加でインストールする必要があります
> 
> `pip install -e ".[training]"`
> 
> 

## wandb にログイン

```Shell
wandb login
复制粘贴API Key，回车
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Cloud-GPU/5.png)

## データセットのマウント

第一步として、第六步で収集したデータセットを zip に圧縮し、クラウドGPUプラットフォームの「データセット」にアップロードします（JupyterLab の左上にアップロードボタンがあります）。プラットフォームの処理が完了すると、ダウンロードコマンドが表示されます。

第二步として、インスタンスのコマンドラインでこのダウンロードコマンドを実行し、解凍します：

```Shell
复制实例下载命令，类似：
featurize dataset download 7f40bdaa-b1a4-4c00-9652-ff26fd079109

unzip lerobot_my_dataset_shake_hands.zip
```

データセットは`~`ディレクトリに展開されます。

解凍後は `ls ~` で確認できます。ディレクトリ名は訓練コマンド内の `--dataset.root` と完全に一致させる必要があります（本記事および以降の各記事では `~/lerobot_my_dataset_shake_hands` を使用しています）。解凍後に同名のディレクトリがもう一層できた場合、例えば `~/lerobot_my_dataset_shake_hands/lerobot_my_dataset_shake_hands` のようになった場合は、内側の層の内容を外側に移動するか、`--dataset.root` を実際の階層に直接指定してください。

## 重みの保存頻度を変更する（任意）

`lerobot/src/lerobot/configs/train.py` を開く

save_freq を 20_000 から 5_000 に変更する

これにより、訓練のより早い段階でモデルの重みファイルを取得できます

<RelatedProducts slugs="so-arm101" />
