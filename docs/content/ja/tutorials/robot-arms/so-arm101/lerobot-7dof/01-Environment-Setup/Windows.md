---
title: "Windowsコンピューター"
description: "WindowsパソコンでMinicondaを導入し、condaのソースをミラーに変更してから仮想環境を作成し、LeRobotをインストールする手順です。"
---

# Windowsコンピューター

黒色のリーダーアーム（Leader）は 5V6A 電源アダプターを使用します

白色のフォロワーアーム（Follower）は 12V5A 電源アダプターを使用します

## Minicondaのインストール

anaconda\.com/download/success

または、このリンクを直接クリックしてインストールパッケージをダウンロードします

https://repo\.anaconda\.com/miniconda/Miniconda3\-latest\-Windows\-x86\_64\.exe

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Windows/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Windows/2.png)

## condaのソース変更

```Shell
# まず既存のソース設定をクリア（競合を回避）
conda config --remove-key channels

# conda のデフォルトソースと常用サードパーティソースを清華ミラーに置き換える
# デフォルトパッケージソースを追加（main/r/msys2）
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2/

# 常用サードパーティソースを追加
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/menpo/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/

# ダウンロードソースの表示を有効にする。パッケージインストール時に具体的なダウンロード先が表示されます
conda config --set show_channel_urls yes

# インデックスキャッシュをクリアして新しいソースを反映させる
conda clean -i

# 現在の設定を表示（ソースが正常に追加されたか確認）
conda config --show-sources
```

## 仮想環境の作成

```Shell
conda create -y -n lerobot python=3.12
```

## 仮想環境のアクティベート

```Shell
conda activate lerobot
```

## ffmpegのインストール

```Shell
conda install *ffmpeg*=7.1.1 *-c* conda-forge -y
```

インストール成功の確認

```Shell
ffmpeg
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Windows/3.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/2.png)

## LeRobotのダウンロード

### 方法 A：本リポジトリのコードをそのまま使用（推奨）

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### 方法 B：公式コードリポジトリをダウンロードし、対応するファイルを手動で置き換え

```Shell
git clone https://github.com/huggingface/lerobot.git
```

## コードリポジトリのインストール

```Shell
cd lerobot
```

```Plain Text
pip install -e ".[feetech]"
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Windows/6.png)

## インストール成功の確認

```Shell
python

import lerobot
import scservo_sdk
import torch
torch.cuda.is_available()
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Windows/7.png)



