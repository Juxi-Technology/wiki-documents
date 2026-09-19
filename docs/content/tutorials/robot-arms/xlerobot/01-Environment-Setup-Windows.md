---
title: "Environment Setup (Windows)"
description: "XLeRobot Windows environment setup: install Miniconda, replace the conda channels with mirrors, and prepare Python for the LeRobot toolchain."
---

# Environment Setup (Windows)

The black leader arm uses a 5V6A power adapter

The white follower arm uses a 12V5A power adapter

## Install Miniconda

anaconda.com/download/success

Or click this link directly to download the installer

https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe

![Image 1](../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/1.png)

![Image 2](../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/2.png)

## Change the conda Source

```Shell
# Clear the existing channel configuration first (to avoid conflicts)
conda config --remove-key channels

# Replace conda's default channels and common third-party channels with the Tsinghua mirror
# Add the default package channels (main/r/msys2)
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2/

# Add common third-party channels
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/menpo/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/

# Enable channel URL display; the specific download address is shown when installing packages
conda config --set show_channel_urls yes

# Clear the index cache so the new channels take effect
conda clean -i

# View the current configuration (verify the channels were added successfully)
conda config --show-sources
```

## Create a Virtual Environment

```Shell
conda create -y -n lerobot python=3.12
```

## Activate the Virtual Environment

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

![Image 3](../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/3.png)

![Image 4](../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/4.png)

![Image 5](../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/5.png)

## Download LeRobot

- Download the official LeRobot code repository

```Shell
git clone https://github.com/huggingface/lerobot.git
```

## Install the Code Repository

```Shell
cd lerobot
```

```Plain Text
pip install -e ".[feetech]"
```

![Image 6](../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/6.png)

## Verify Successful Installation

```Shell
python

import lerobot
import scservo_sdk
import torch
torch.cuda.is_available()
```

![Image 7](../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/7.png)

<RelatedProducts slugs="xlerobot" />
