---
title: "環境構築(Ubuntu)"
description: "XLeRobot の環境構築チュートリアル(Ubuntu 版)。Miniconda と仮想環境の準備から LeRobot コードの導入、動作確認までの流れを解説します。"
---

# 環境構築(Ubuntu)

黒いリーダーアームは 5V6A 電源アダプタを使用します

白いフォロワーアームは 12V5A 電源アダプタを使用します

## Miniconda のインストール

https://www.anaconda.com/download

## pip のミラーソース変更

```Shell
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
```

## conda のミラーソース変更

```Shell
# 清空原有 .condarc 配置（可选，避免冲突）
echo "" > ~/.condarc

# 写入清华源配置
cat << EOF > ~/.condarc
channels:
  - defaults
show_channel_urls: true
default_channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
custom_channels:
  conda-forge: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  msys2: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  bioconda: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  menpo: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch-lts: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  simpleitk: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
EOF

# 清除缓存使配置生效
conda clean -i
```

## 仮想環境の作成

```Shell
conda create -y -n lerobot python=3.12 -y
```

## 仮想環境への入り方

```Shell
conda activate lerobot
```

## ffmpeg のインストール

```Shell
conda install *ffmpeg*=7.1.1 *-c* conda-forge -y
```

インストールの成功を確認します

```Shell
ffmpeg
```

![図 1](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/1.png)

![図 2](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/2.png)

## LeRobot 公式コードリポジトリのダウンロード

```Shell
git clone https://github.com/huggingface/lerobot.git
```

## コードリポジトリのインストール

```Shell
#cd lerobot-main
cd lerobot

pip install -e ".[feetech]"
```

![図 3](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/3.png)

![図 4](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/4.png)

## インストール成功の確認

```Shell
lerobot-info

python

import lerobot
lerobot.__version__

import torch
torch.cuda.is_available()
import scservo_sdk
```

## 4090 マシン上で実行した結果

![図 5](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/5.png)

![図 6](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/6.png)

## NVIDIA DGX Spark 上で実行した結果

![図 7](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/7.png)

<RelatedProducts slugs="xlerobot" />
