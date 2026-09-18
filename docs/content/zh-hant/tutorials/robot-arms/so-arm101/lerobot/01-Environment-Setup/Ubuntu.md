---
title: "第一步:安裝 LeRobot 環境(Ubuntu)"
description: "本頁說明如何在 Ubuntu 電腦安裝 LeRobot 環境，包含 Miniconda 安裝、套件來源設定、ffmpeg 安裝與安裝驗證。"
---

# 第一步:安裝 LeRobot 環境(Ubuntu)

黑色主動臂使用 5V6A 電源適配器

白色從動臂使用 12V5A 電源適配器

## 安裝Miniconda

https://www.anaconda.com/download

## pip換源

```Shell
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
```

## conda換源

```Shell
# 清空原有 .condarc 配置（可選，避免衝突）
echo "" > ~/.condarc

# 寫入清華源配置
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

# 清除緩存使配置生效
conda clean -i
```

## 建立虛擬環境

```Shell
conda create -y -n lerobot python=3.12 -y
```

## 進入虛擬環境

```Shell
conda activate lerobot
```

## 安裝ffmpeg

```Shell
conda install ffmpeg=7.1.1 -c conda-forge -y
```

驗證安裝成功

```Shell
ffmpeg
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/2.png)

## 下載LeRobot官方代碼庫

```Shell
git clone https://github.com/huggingface/lerobot.git
```

## 安裝代碼倉庫

```Shell
#cd lerobot-main
cd lerobot

pip install -e ".[feetech]"
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/3.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/4.png)

## 驗證安裝成功

```Shell
lerobot-info

python

import lerobot
lerobot.__version__

import torch
torch.cuda.is_available()
import scservo_sdk
```

## 在4090主機上運行的結果

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/5.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/6.png)

## 在英偉達DGX Spark上運行的結果

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Ubuntu/7.png)

<RelatedProducts slugs="so-arm101" />
