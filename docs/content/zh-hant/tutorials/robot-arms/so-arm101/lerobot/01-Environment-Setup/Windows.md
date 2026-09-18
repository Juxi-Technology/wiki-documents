---
title: "第一步:安裝 LeRobot 環境(Windows)"
description: "本頁說明如何在 Windows 電腦安裝 LeRobot 環境，包含 Miniconda 安裝、conda 套件來源設定、建立虛擬環境與安裝驗證。"
---

# 第一步:安裝 LeRobot 環境(Windows)

黑色主動臂使用 5V6A 電源適配器

白色從動臂使用 12V5A 電源適配器

## 安裝Miniconda

anaconda.com/download/success

或者直接點這個鏈接下載安裝包

https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Windows/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Windows/2.png)

## conda換源

```Shell
# 先清空原有源配置（避免衝突）
conda config --remove-key channels

# 將 conda 的預設源和常用第三方源替換為清華鏡像
# 添加預設包源（main/r/msys2）
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2/

# 添加常用第三方源
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/menpo/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/

# 開啟顯示下載源，安裝包時會顯示具體的下載地址
conda config --set show_channel_urls yes

# 清除索引緩存，使新源生效
conda clean -i

# 查看當前配置（驗證源是否添加成功）
conda config --show-sources
```

## 建立虛擬環境

```Shell
conda create -y -n lerobot python=3.12
```

## 激活虛擬環境

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

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Windows/3.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Windows/4.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Windows/5.png)

## 下載LeRobot

- 下載LeRobot官方代碼庫

```Shell
git clone https://github.com/huggingface/lerobot.git
```

## 安裝代碼倉庫

```Shell
cd lerobot
```

```Plain Text
pip install -e ".[feetech]"
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Windows/6.png)

## 驗證安裝成功

```Shell
python

import lerobot
import scservo_sdk
import torch
torch.cuda.is_available()
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-Windows/7.png)

<RelatedProducts slugs="so-arm101" />
