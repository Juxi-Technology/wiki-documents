---
title: "환경 구축(Windows)"
description: "XLeRobot 양팔 이동 로봇 환경 구축 가이드의 Windows 편 — Miniconda 설치, conda 미러 설정, LeRobot 코드 설치 절차."
---

# 환경 구축(Windows)

검정색 리더 암은 5V6A 전원 어댑터를 사용합니다

흰색 팔로워 암은 12V5A 전원 어댑터를 사용합니다

## Miniconda 설치

anaconda.com/download/success

또는 이 링크를 직접 클릭하여 설치 패키지를 다운로드합니다

https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe

![그림 1](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/1.png)

![그림 2](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/2.png)

## conda 소스 변경

```Shell
# 먼저 기존 소스 설정 비우기 (충돌 방지)
conda config --remove-key channels

# conda의 기본 소스와 자주 쓰는 서드파티 소스를 칭화 미러로 교체
# 기본 패키지 소스 추가 (main/r/msys2)
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2/

# 자주 쓰는 서드파티 소스 추가
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/menpo/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/

# 다운로드 소스 표시를 켜서, 패키지 설치 시 구체적인 다운로드 주소 표시
conda config --set show_channel_urls yes

# 인덱스 캐시를 지워 새 소스 적용
conda clean -i

# 현재 설정 확인 (소스가 성공적으로 추가되었는지 검증)
conda config --show-sources
```

## 가상 환경 생성

```Shell
conda create -y -n lerobot python=3.12
```

## 가상 환경 활성화

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

![그림 3](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/3.png)

![그림 4](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/4.png)

![그림 5](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/5.png)

## LeRobot 다운로드

- LeRobot 공식 코드 저장소 다운로드

```Shell
git clone https://github.com/huggingface/lerobot.git
```

## 코드 저장소 설치

```Shell
cd lerobot
```

```Plain Text
pip install -e ".[feetech]"
```

![그림 6](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/6.png)

## 설치 성공 확인

```Shell
python

import lerobot
import scservo_sdk
import torch
torch.cuda.is_available()
```

![그림 7](../../../../../public/images/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows/7.png)

<RelatedProducts slugs="xlerobot" />
