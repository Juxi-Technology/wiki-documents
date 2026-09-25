---
title: "Mac 컴퓨터"
description: "macOS에서 폴더 권한을 부여한 뒤 Miniconda를 설치하고 가상 환경과 ffmpeg를 준비해 LeRobot 코드 저장소까지 설치합니다."
---

# Mac 컴퓨터

검은색 리더 암은 5V6A 전원 어댑터를 사용합니다

흰색 팔로워 암은 12V5A 전원 어댑터를 사용합니다

## 권한 부여

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-MacOS/1.png)

## Miniconda 설치

https://www\.anaconda\.com/download

## pip 미러 소스 변경

```Shell
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
```

## conda 미러 소스 변경

```Shell
# 기존 .condarc 설정 비우기 (선택 사항, 충돌 방지)
echo "" > ~/.condarc

# 칭화(Tsinghua) 미러 소스 설정 작성
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

# 캐시를 지워 설정 적용
conda clean -i
```

## 가상 환경 생성

```Shell
conda create -y -n lerobot python=3.12
```

## 가상 환경 진입

```Shell
conda activate lerobot
```

## ffmpeg 설치

```Shell
conda install *ffmpeg*=7.1.1 *-c* conda-forge -y
```

설치 성공 확인

```Shell
ffmpeg
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-MacOS/2.png)

## LeRobot 코드 다운로드

### 방안 A: 본 저장소 코드를 직접 사용(권장)

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### 방안 B: 공식 코드 저장소를 다운로드하고, 해당 파일을 수동으로 교체

```Shell
git clone https://github.com/huggingface/lerobot.git
```

## 코드 저장소 설치

```Shell
# cd lerobot-main
cd lerobot
pip install -e ".[feetech]"
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-01-Environment-Setup-MacOS/3.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/01-environment-setup/5.png)

## 설치 성공 확인

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



