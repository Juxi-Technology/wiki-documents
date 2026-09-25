---
title: "MAC电脑"
description: "在 Mac 上安装 LeRobot 环境:先给终端加权限,安装 Miniconda 并配置国内镜像源,创建 Python 虚拟环境,装好 ffmpeg 后克隆代码库。"
---

# MAC电脑

黑色主动臂使用 5V6A 电源适配器

白色从动臂使用 12V5A 电源适配器

## 加权限

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-MacOS/1.png)

## 安装Miniconda

https://www\.anaconda\.com/download

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
conda create -y -n lerobot python=3.12
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

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-MacOS/2.png)

## 下载LeRobot代码

### 方案 A：直接用本仓库代码（推荐）

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### 方案 B：下载官方代码仓库，并手动替换对应文件

```Shell
git clone https://github.com/huggingface/lerobot.git
```

## 安装代码仓库

```Shell
# cd lerobot-main
cd lerobot
pip install -e ".[feetech]"
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-MacOS/3.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/01-environment-setup/5.png)

## 验证安装成功

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



