---
title: "Environment Setup (macOS)"
description: "XLeRobot macOS environment setup: grant permissions, install Miniconda, and point pip and conda at mirror sources for LeRobot development."
---

# Environment Setup (macOS)

The black leader arm uses a 5V6A power adapter

The white follower arm uses a 12V5A power adapter

## Grant Permissions

![Image 1](../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS/1.png)

## Install Miniconda

https://www.anaconda.com/download

## Change the pip Source

```Shell
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
```

## Change the conda Source

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

## Create a Virtual Environment

```Shell
conda create -y -n lerobot python=3.12
```

## Enter the Virtual Environment

```Shell
conda activate lerobot
```

## Install ffmpeg

```Shell
conda install *ffmpeg*=7.1.1 *-c* conda-forge -y
```

Verify the installation was successful

```Shell
ffmpeg
```

![Image 2](../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS/2.png)

## Download LeRobot

- Download the official LeRobot code repository

```Shell
git clone https://github.com/huggingface/lerobot.git
```

## Install the Code Repository

```Shell
# cd lerobot-main
cd lerobot
pip install -e ".[feetech]"
```

![Image 3](../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS/3.png)

![Image 4](../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS/4.jpg)

## Verify Successful Installation

```Shell
lerobot-info

python

import lerobot
import torch
torch.cuda.is_available()
import scservo_sdk
```

![Image 5](../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS/5.png)

![Image 6](../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS/6.png)

<RelatedProducts slugs="xlerobot" />
