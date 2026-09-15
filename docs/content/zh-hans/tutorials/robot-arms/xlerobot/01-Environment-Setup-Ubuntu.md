---
title: "安装环境(Ubuntu)"
description: "XLeRobot 环境安装教程 Ubuntu 篇：在 Ubuntu 系统上安装 Miniconda，并完成 pip 与 conda 镜像源配置。"
---

# 安装环境(Ubuntu)

黑色主动臂使用 5V6A 电源适配器

白色从动臂使用 12V5A 电源适配器

## 安装Miniconda

https://www.anaconda.com/download

## pip换源

```Shell
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
```

## conda换源

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

## 创建虚拟环境

```Shell
conda create -y -n lerobot python=3.12 -y
```

## 进入虚拟环境

```Shell
conda activate lerobot
```

## 安装ffmpeg

```Shell
conda install *ffmpeg*=7.1.1 *-c* conda-forge -y
```

验证安装成功

```Shell
ffmpeg
```

![图 1](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/1.png)

![图 2](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/2.png)

## 下载LeRobot官方代码库

```Shell
git clone https://github.com/huggingface/lerobot.git
```

## 安装代码仓库

```Shell
#cd lerobot-main
cd lerobot

pip install -e ".[feetech]"
```

![图 3](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/3.png)

![图 4](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/4.png)

## 验证安装成功

```Shell
lerobot-info

python

import lerobot
lerobot.__version__

import torch
torch.cuda.is_available()
import scservo_sdk
```

## 在4090主机上运行的结果

![图 5](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/5.png)

![图 6](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/6.png)

## 在英伟达DGX Spark上运行的结果

![图 7](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/7.png)

<RelatedProducts slugs="xlerobot" />
