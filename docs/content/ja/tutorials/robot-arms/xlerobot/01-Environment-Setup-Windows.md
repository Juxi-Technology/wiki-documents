---
title: "Windows パソコン"
description: "黒いリーダーアームは 5V6A 電源アダプタを使用します"
---

# Windows パソコン

黒いリーダーアームは 5V6A 電源アダプタを使用します

白いフォロワーアームは 12V5A 電源アダプタを使用します

## Miniconda のインストール

anaconda.com/download/success

または、このリンクを直接クリックしてインストールパッケージをダウンロードします

https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe

![図 1](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/1.png)

![図 2](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/2.png)

## conda のミラーソース変更

```Shell
# 先清空原有源配置（避免冲突）
conda config --remove-key channels

# 将 conda 的默认源和常用第三方源替换为清华镜像
# 添加默认包源（main/r/msys2）
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2/

# 添加常用第三方源
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/menpo/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/

# 开启显示下载源，安装包时会显示具体的下载地址
conda config --set show_channel_urls yes

# 清除索引缓存，使新源生效
conda clean -i

# 查看当前配置（验证源是否添加成功）
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

## ffmpeg のインストール

```Shell
conda install *ffmpeg*=7.1.1 *-c* conda-forge -y
```

インストールの成功を確認します

```Shell
ffmpeg
```

![図 3](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/3.png)

![図 4](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/4.png)

![図 5](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/5.png)

## LeRobot のダウンロード

- LeRobot 公式コードリポジトリをダウンロードします

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

![図 6](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/6.png)

## インストール成功の確認

```Shell
python

import lerobot
import scservo_sdk
import torch
torch.cuda.is_available()
```

![図 7](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/7.png)

<RelatedProducts slugs="xlerobot" />
