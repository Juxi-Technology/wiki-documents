---
title: "MAC電腦"
description: "本頁說明如何在 macOS 電腦安裝 LeRobot 環境，包含目錄權限設定、Miniconda 安裝、套件來源設定與安裝驗證。"
---

# MAC電腦

黑色主動臂使用 5V6A 電源適配器

白色從動臂使用 12V5A 電源適配器

## 加權限

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-MacOS/1.png)

## 安裝Miniconda

https://www\.anaconda\.com/download

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

## 創建虛擬環境

```Shell
conda create -y -n lerobot python=3.12
```

## 進入虛擬環境

```Shell
conda activate lerobot
```

## 安裝ffmpeg

```Shell
conda install *ffmpeg*=7.1.1 *-c* conda-forge -y
```

驗證安裝成功

```Shell
ffmpeg
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-MacOS/2.png)

## 下載LeRobot代碼

### 方案 A：直接用本倉庫代碼（推薦）

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### 方案 B：下載官方代碼倉庫，並手動替換對應文件

```Shell
git clone https://github.com/huggingface/lerobot.git
```

## 安裝代碼倉庫

```Shell
# cd lerobot-main
cd lerobot
pip install -e ".[feetech]"
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-MacOS/3.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/01-environment-setup/5.png)

## 驗證安裝成功

```Shell
lerobot-info

python

import lerobot
import torch
torch.cuda.is_available()
import scservo_sdk
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-MacOS/5.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-MacOS/6.png)



