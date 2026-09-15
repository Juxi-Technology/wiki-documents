---
title: "환경 구축(Ubuntu)"
description: "XLeRobot 양팔 이동 로봇 환경 구축 가이드의 Ubuntu 편 — Miniconda 설치, pip와 conda 미러 설정, LeRobot 코드 설치 절차."
---

# 환경 구축(Ubuntu)

검정색 리더 암은 5V6A 전원 어댑터를 사용합니다

흰색 팔로워 암은 12V5A 전원 어댑터를 사용합니다

## Miniconda 설치

https://www.anaconda.com/download

## pip 소스 변경

```Shell
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
```

## conda 소스 변경

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

## 가상 환경 생성

```Shell
conda create -y -n lerobot python=3.12 -y
```

## 가상 환경 진입

```Shell
conda activate lerobot
```

## ffmpeg 설치

```Shell
conda install *ffmpeg*=7.1.1 *-c* conda-forge -y
```

설치가 성공했는지 확인

```Shell
ffmpeg
```

![그림 1](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/1.png)

![그림 2](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/2.png)

## LeRobot 공식 코드 저장소 다운로드

```Shell
git clone https://github.com/huggingface/lerobot.git
```

## 코드 저장소 설치

```Shell
#cd lerobot-main
cd lerobot

pip install -e ".[feetech]"
```

![그림 3](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/3.png)

![그림 4](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/4.png)

## 설치 성공 확인

```Shell
lerobot-info

python

import lerobot
lerobot.__version__

import torch
torch.cuda.is_available()
import scservo_sdk
```

## 4090 호스트에서 실행한 결과

![그림 5](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/5.png)

![그림 6](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/6.png)

## NVIDIA DGX Spark 에서 실행한 결과

![그림 7](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu/7.png)

<RelatedProducts slugs="xlerobot" />
