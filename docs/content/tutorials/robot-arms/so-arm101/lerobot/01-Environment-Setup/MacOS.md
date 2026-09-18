---
title: "Step 1: Environment Setup (macOS)"
description: "Set up the LeRobot environment on macOS, grant permissions, install Miniconda, configure mirrors, install ffmpeg and verify LeRobot and PyTorch."
---

# Step 1: Environment Setup (macOS)

The black leader arm uses a 5V6A power adapter

The white follower arm uses a 12V5A power adapter

## Grant permissions

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-MacOS/1.png)

## Install Miniconda

https://www.anaconda.com/download

## Change the pip mirror

```Shell
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
```

## Change the conda mirror

```Shell
# Clear the existing .condarc configuration (optional, to avoid conflicts)
echo "" > ~/.condarc

# Write the Tsinghua mirror configuration
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

# Clear the cache to apply the configuration
conda clean -i
```

## Create a virtual environment

```Shell
conda create -y -n lerobot python=3.12
```

## Enter the virtual environment

```Shell
conda activate lerobot
```

## Install ffmpeg

```Shell
conda install ffmpeg=7.1.1 -c conda-forge -y
```

Verify the installation succeeded

```Shell
ffmpeg
```

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-MacOS/2.png)

## Download LeRobot

- Download the official LeRobot code repository

```Shell
git clone https://github.com/huggingface/lerobot.git
```

## Install the code repository

```Shell
# cd lerobot-main
cd lerobot
pip install -e ".[feetech]"
```

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-MacOS/3.png)

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-MacOS/4.jpg)

## Verify the installation succeeded

```Shell
lerobot-info

python

import lerobot
import torch
torch.cuda.is_available()
import scservo_sdk
```

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-MacOS/5.png)

![image.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-MacOS/6.png)

<RelatedProducts slugs="so-arm101" />
