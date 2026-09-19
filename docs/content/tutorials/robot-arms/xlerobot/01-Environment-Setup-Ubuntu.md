---
title: "Environment Setup (Ubuntu)"
description: "XLeRobot Ubuntu environment setup: install Miniconda, switch pip and conda to mirror sources, and prepare the Python environment for LeRobot."
---

# Environment Setup (Ubuntu)

The black leader arm uses a 5V6A power adapter

The white follower arm uses a 12V5A power adapter

## Install Miniconda

https://www.anaconda.com/download

## Change the pip Source

```Shell
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
```

## Change the conda Source

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

## Create a Virtual Environment

```Shell
conda create -y -n lerobot python=3.12 -y
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

![Image 1](../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/1.png)

![Image 2](../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/2.png)

## Download the Official LeRobot Code Repository

```Shell
git clone https://github.com/huggingface/lerobot.git
```

## Install the Code Repository

```Shell
#cd lerobot-main
cd lerobot

pip install -e ".[feetech]"
```

![Image 3](../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/3.png)

![Image 4](../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/4.png)

## Verify Successful Installation

```Shell
lerobot-info

python

import lerobot
lerobot.__version__

import torch
torch.cuda.is_available()
import scservo_sdk
```

## Results of Running on the 4090 Host

![Image 5](../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/5.png)

![Image 6](../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/6.png)

## Results of Running on an NVIDIA DGX Spark

![Image 7](../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/7.png)

<RelatedProducts slugs="xlerobot" />
