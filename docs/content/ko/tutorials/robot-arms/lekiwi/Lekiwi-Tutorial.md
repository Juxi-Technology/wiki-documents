---
title: Lekiwi 이동 로봇 사용 튜토리얼
description: "LeRobot 기반 Lekiwi 이동 로봇의 설정, 모터 구성, 원격 조작, 데이터 수집, 훈련, 평가 전체 가이드"
---

# Lekiwi 이동 로봇 사용 튜토리얼

> **[스토어에서 구매](https://www.juxitech.com/ko/products/lekiwi-embodied-intelligence-mobile-robotic-car)**

검은색 리더 암은 5V 6A 전원 어댑터를 사용하고, 흰색 팔로워 암은 12V 5A 전원 어댑터를 사용합니다.

[lerobot-Lekiwi.zip](/downloads/lerobot-Lekiwi.zip)

이 튜토리얼 저장소의 코드는 2026년 10월 1일 이전의 테스트를 거친 안정 버전 LeRobot을 기준으로 유지되고 있습니다. 이후 Hugging Face에서 LeRobot을 대규모로 업그레이드하여 매우 많은 새로운 기능이 추가되었습니다. 최신 튜토리얼을 사용해 보려면 [공식 문서](https://huggingface.co/docs/lerobot/lekiwi)를 참고하십시오.



[Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi)는 [SIGRobotics-UIUC](https://github.com/SIGRobotics-UIUC)가 시작한 완전 오픈소스 로봇 자동차 프로젝트입니다. 상세한 3D 프린팅 파일과 작동 지침을 포함하고 있으며, [LeRobot](https://github.com/huggingface/lerobot/tree/main) 모방 학습 프레임워크와 호환되도록 설계되었습니다. SO101 로봇 암을 지원하여 완전한 모방 학습 워크플로를 구현할 수 있습니다.

[*Fusion360 온라인 CAD*](https://a360.co/4k1P8yO)*에서 각 부품의 정확한 위치를 확인할 수 있습니다.*

[URDF 파일](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)

온라인 URDF 미리보기 https://urdf.d-robotics.cc/

![image – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-01.png)

## 주요 특징

1. **오픈소스 및 저비용**: [Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi)는 오픈소스 저비용 로봇 자동차 솔루션을 제공합니다.
2. **LeRobot 통합**: [LeRobot 플랫폼](https://github.com/huggingface/lerobot)과의 통합을 위해 설계되었습니다.
3. **풍부한 학습 자료**: 조립 및 캘리브레이션 가이드와 테스트, 데이터 수집, 학습, 배포 튜토리얼을 포함한 포괄적인 오픈소스 학습 자료를 제공하여 사용자가 빠르게 시작하고 로봇 애플리케이션을 구축할 수 있도록 돕습니다.
4. **Nvidia 호환**: reComputer Mini J4012 Orin NX 16 GB와 함께 사용할 수 있습니다.
5. **다양한 시나리오 적용**: 교육, 과학 연구, 자동화 생산, 로봇 공학에 적합하며, 사용자가 다양한 복잡한 작업에서 효율적이고 정밀한 로봇 운용을 달성할 수 있도록 돕습니다.

JUXI는 하드웨어 자체의 품질에 대해서만 책임을 집니다. 이 튜토리얼은 공식 문서에 따라 엄격하게 업데이트됩니다. 스스로 해결할 수 없는 소프트웨어 또는 환경 의존성 문제가 발생하면 [LeRobot 플랫폼](https://github.com/huggingface/lerobot) 또는 [LeRobot Discord 채널](https://discord.gg/8TnwDdjFGU)에 신속히 보고해 주십시오.

**참고**
- Lekiwi 섀시의 모든 서보는 12V 전원 공급이 필요합니다. 5V 로봇 암을 사용하는 분들을 위해 12V-to-5V 강압 컨버터 모듈을 제공합니다. 이 경우 배선을 직접 수정해야 한다는 점에 유의하십시오.
- 12V 전원 공급 장치 – 필요하면 결제 시 이 옵션을 선택할 수 있습니다. 이미 12V 전원 공급 장치가 있다면 전원 출력 커넥터를 5521 DC 플러그로 변환하기만 하면 됩니다.
- Raspberry Pi 컨트롤러와 카메라 – 주문 페이지에서 별도로 구매해야 합니다.

## 자재 명세서 (BOM)


## 초기 시스템 환경

**Ubuntu x86의 경우:**

- Ubuntu 22.04
- CUDA 12+
- Python 3.10
- Torch 2.6

**Jetson Orin의 경우:**

- Jetson JetPack 6.0
- Python 3.10
- Torch 2.3+

**Raspberry Pi의 경우:**

- Raspberry Pi 5, 4G\~16G

### SSH 설정

Raspberry Pi 설정 후에는 [SSH](https://www.raspberrypi.com/news/coding-on-raspberry-pi-remotely-with-visual-studio-code/) (Secure Shell)를 활성화하고 구성하여 모니터, 키보드, 마우스를 Pi에 연결하지 않고도 노트북에서 Raspberry Pi에 로그인할 수 있도록 해야 합니다. 훌륭한 튜토리얼은 [여기](https://www.raspberrypi.com/documentation/computers/remote-access.html#ssh)에서 확인할 수 있습니다. 명령 프롬프트(cmd)를 통해 Raspberry Pi에 로그인할 수 있으며, VSCode를 사용하는 경우 [이](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) 확장 프로그램을 사용할 수 있습니다.

## 3D 프린팅 가이드

### 부품

다음 3D 프린팅 부품에 대한 인쇄 가능한 STL 파일을 제공합니다. 이 부품들은 범용 PLA 필라멘트를 사용하여 소비자용 FDM 프린터에서 인쇄할 수 있습니다. 저희는 Bambu Lab P1S 프린터에서 테스트했습니다. 모든 부품은 Bambu Studio에 불러와 자동 회전 및 배치하고, 권장 서포트를 활성화한 뒤 인쇄하면 됩니다.


### 인쇄 설정

제공된 STL 파일은 대부분의 FDM 프린터에서 바로 인쇄할 수 있습니다. 아래는 테스트를 거친 권장 설정이며, 다른 설정도 작동할 수 있습니다.

- 재료: PLA+
- 노즐 직경 및 정밀도: 0.2mm 노즐 직경, 0.2mm 레이어 높이
- 채움 밀도: 15%
- 인쇄 속도: 150 mm/s
- 필요하면 G-code(슬라이싱된 파일)를 프린터에 업로드하여 인쇄합니다

## A. Raspberry Pi에 LeRobot 설치

Raspberry Pi에서:

### 1. [Miniconda 설치](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

```Python
mkdir -p ~/miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
```

### 2. 셸 재시작

다음 명령을 복사하여 셸에 붙여 넣습니다: `source ~/.bashrc`, Mac 사용자의 경우: `source ~/.bash_profile` 또는 `source ~/.zshrc`(zshell을 사용하는 경우).

### 3. LeRobot용 새 Conda 환경 생성 및 활성화

```Python
conda create -y -n lerobot python=3.10
```

그런 다음 Conda 환경을 활성화합니다(LeRobot을 사용하려면 셸을 열 때마다 이 작업을 수행해야 합니다!):

```Bash
conda activate lerobot
```

### 4. LeRobot 클론:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. 환경에 ffmpeg 설치:

`miniconda`를 사용하는 경우 환경에 `ffmpeg`를 설치합니다:

```PowerShell
conda install ffmpeg -c conda-forge
```

일반적으로 이 명령은 해당 플랫폼용으로 libsvtav1 인코더와 함께 빌드된 ffmpeg 7.X를 설치합니다. libsvtav1이 지원되지 않는 경우(`ffmpeg -encoders`로 지원되는 인코더를 확인할 수 있습니다) 다음과 같이 할 수 있습니다:
[모든 플랫폼] ffmpeg 7.X를 명시적으로 설치:
`conda install ffmpeg=7.1.1 -c conda-forge`
[Linux 전용] ffmpeg의 빌드 의존성을 설치하고 소스에서 libsvtav1 지원을 포함하도록 ffmpeg을 컴파일한 다음, 사용 중인 ffmpeg 실행 파일이 올바른 것인지 확인합니다. 이는 `which ffmpeg`로 확인할 수 있습니다.
아래 오류가 발생하는 경우 위 명령으로도 해결할 수 있습니다.

![image – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-02.png)

### 6. feetech 모터 의존성과 함께 LeRobot 설치:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install -e ".[lekiwi]"
```

### 7. 연결 시간 설정

`lerobot\src\lerobot\robots\lekiwi` 디렉터리에서 config_lekiwi.py를 찾습니다.

 connection_time_s: int = 7200 # i.e. 2 hours

![image – 3](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-03.png)

## B. 노트북에 LeRobot 설치

노트북에 LeRobot을 이미 설치했다면 이 단계를 건너뛰어도 됩니다. 그렇지 않으면 Raspberry Pi에서 사용한 것과 **동일한 단계**를 따르십시오.

> [!Tip] 앞으로 명령 프롬프트(cmd)를 자주 사용하게 됩니다. cmd에 익숙하지 않거나 명령줄 사용법을 복습하고 싶다면 다음을 참고하십시오: [명령줄 집중 강좌](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line)

컴퓨터에서:

### 1. [Miniconda 설치](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

anaconda.com/download/success

또는 이 링크를 클릭하여 설치 프로그램을 직접 다운로드하십시오

https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe

![image – 4](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-04.png)
![image – 5](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-05.png)

## conda 패키지 소스 변경

```Shell
# 먼저 기존 소스 구성을 삭제합니다(충돌 방지)
conda config --remove-key channels

# conda의 기본 소스와 주요 서드파티 소스를 칭화대 미러로 교체합니다
# 기본 패키지 소스 추가 (main/r/msys2)
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2/

# 주요 서드파티 소스 추가
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/menpo/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/

# 다운로드 소스를 표시하여 패키지 설치 시 구체적인 다운로드 URL이 출력되도록 합니다
conda config --set show_channel_urls yes

# 새 소스가 적용되도록 인덱스 캐시를 지웁니다
conda clean -i

# 현재 구성을 표시합니다(소스가 정상적으로 추가되었는지 확인)
conda config --show-sources
```

### 2. 셸 재시작

다음 명령을 복사하여 셸에 붙여 넣습니다: `source ~/.bashrc`, Mac 사용자의 경우: `source ~/.bash_profile` 또는 `source ~/.zshrc`(zshell을 사용하는 경우).

![image – 6](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-06.png)

### 3. LeRobot용 새 Conda 환경 생성 및 활성화

```Bash
conda create -y -n lerobot python=3.10
```

그런 다음 Conda 환경을 활성화합니다(LeRobot을 사용하려면 셸을 열 때마다 이 작업을 수행해야 합니다!):

```Bash
conda activate lerobot
```

### 4. LeRobot 클론:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. 환경에 ffmpeg 설치:

`miniconda`를 사용하는 경우 환경에 `ffmpeg`를 설치합니다:

```PowerShell
conda install ffmpeg -c conda-forge
```

일반적으로 이 명령은 해당 플랫폼용으로 libsvtav1 인코더와 함께 빌드된 ffmpeg 7.X를 설치합니다. libsvtav1이 지원되지 않는 경우(`ffmpeg -encoders`로 지원되는 인코더를 확인할 수 있습니다) 다음과 같이 할 수 있습니다:
[모든 플랫폼] ffmpeg 7.X를 명시적으로 설치:
`conda install ffmpeg=7.1.1 -c conda-forge`
[Linux 전용] ffmpeg의 빌드 의존성을 설치하고 소스에서 libsvtav1 지원을 포함하도록 ffmpeg을 컴파일한 다음, 사용 중인 ffmpeg 실행 파일이 올바른 것인지 확인합니다. 이는 `which ffmpeg`로 확인할 수 있습니다.
아래 오류가 발생하는 경우 위 명령으로도 해결할 수 있습니다.

![image – 7](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-07.png)

### 6. feetech 모터 의존성과 함께 LeRobot 설치:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install -e ".[lekiwi]"
```

## C. 모터 구성

![image – 8](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-08.png)
![image – 9](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-09.png)

### **1. 로봇 암과 연결된 USB 포트 찾기**

개별 모터의 올바른 포트를 찾으려면 다음 유틸리티 스크립트를 두 번 실행합니다:

```Bash
lerobot-find-port
```

출력 예시(Mac의 경우 `/dev/tty.usbmodem575E0031751`, Linux의 경우 `/dev/ttyACM0`일 수 있습니다):

출력 예시(Mac의 경우 `/dev/tty.usbmodem575E0032081`, Linux의 경우 `/dev/ttyACM1`일 수 있습니다):

문제 해결: Linux에서는 다음 명령으로 USB 포트에 대한 접근 권한을 부여해야 할 수 있습니다:

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

### **2. 모터 구성 (완성품을 사용하는 경우 이 단계를 건너뜁니다)**

섀시의 각 모터를 하나씩 연결하고 다음 스크립트를 실행합니다. 먼저 로봇 암의 서보(ID 6..1)를 초기화한 다음, 섀시 서보를 초기화하면서 ID를 (ID 9..7)로 설정합니다. 이미 로봇 암을 캘리브레이션한 경우 Enter를 계속 눌러 덮어쓰고 건너뛸 수 있습니다:

```Bash
lerobot-setup-motors \
    --robot.type=lekiwi \
    --robot.port=/dev/tty.usbmodem58760431551 # <- paste here the port found at previous step
```

![image – 10](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-10.png)

### 3. Hugging Face 중국 미러 설정

- Ubuntu

```Shell
sudo nano ~/.bashrc

# 파일 끝에 추가
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.bashrc
echo $HF_ENDPOINT

# 출력
# https://hf-mirror.com
```

- Mac

```Shell
sudo nano ~/.zshrc

# 파일 끝에 추가
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.zshrc

# 출력
# https://hf-mirror.com
```

#### ① 토큰 생성

https://huggingface.co/settings/tokens

![image – 11](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-11.png)

![image – 12](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-12.png)

#### ② 토큰 기록

![image – 13](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-13.png)

#### ③ 토큰 바인딩

```Shell
hf auth login

hf auth whoami
```

![image – 14](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-14.png)

#### ④ 데이터셋 저장소 생성

**Owner와 Dateset name, 즉 나중에 필요한 <hf_username>과 <dateset_repo_id>를 기록해 두십시오**

![image – 15](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-15.png)
![image – 16](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-16.png)

![image – 17](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-17.png)

### 4. 구성 업데이트!!!

LeKiwi LeRobot과 노트북의 구성 파일은 일치해야 합니다. 먼저 모바일 암을 구동하는 Raspberry Pi의 **IP 주소**를 찾아야 합니다. 이는 SSH에 사용하는 것과 동일한 IP 주소입니다. 또한 노트북에서 리더 암의 서보 드라이버 보드 **USB 포트**와 **LeKiwi의 서보 드라이버 보드 포트**를 찾아야 합니다. 다음 스크립트로 이 포트들을 찾을 수 있습니다.

Linux에서는 다음 명령을 실행하여 USB 포트에 대한 접근 권한을 부여해야 할 수 있습니다:

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

중요: 이제 리더 암의 포트와 Lekiwi 암의 IP 주소를 확인했으므로, 네트워크 구성의 **ip**, 리더 암 구성의 **port**, LeKiwi 구성의 **port, remote_ip**를 업데이트하십시오.

example\lekiwi 디렉터리에서 다음 네 개의 파일을 수정합니다

![image – 18](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-18.png)

#### ① teleoperate.py 수정

remote_ip: Raspberry Pi의 IP 주소

port: 리더 암이 컴퓨터 또는 Linux에 연결될 때의 포트 번호

![image – 19](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-19.png)

#### ② record.py 수정

HF_REPO_ID: [Hugging Face 사용자 이름 및 데이터셋 이름](https://juxitech.feishu.cn/wiki/A2orwQ9xzidMCjk10SVcAAWVnhd?fromScene=spaceOverview#share-TYrIdHmPPobd1mx9xB7c75WEn0d)

remote_ip: Raspberry Pi의 IP 주소

port: 리더 암이 컴퓨터 또는 Linux에 연결될 때의 포트 번호

![image – 20](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-20.png)

#### ③ replay.py 수정

remote_ip: Raspberry Pi의 IP 주소

<hf_username>/<dataset_repo_id>, 즉 [Hugging Face 사용자 이름 및 데이터셋 이름](https://juxitech.feishu.cn/wiki/A2orwQ9xzidMCjk10SVcAAWVnhd?fromScene=spaceOverview#share-TYrIdHmPPobd1mx9xB7c75WEn0d)

![image – 21](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/fix-01.png)

## D. 캘리브레이션

이제 리더 암과 팔로워 암을 캘리브레이션해야 합니다. 옴니휠 서보는 캘리브레이션이 필요하지 않습니다.

### 팔로워 암 캘리브레이션 (Lekiwi 베이스에 장착)

컴퓨터에서 다음 명령을 실행하여 리더 암을 캘리브레이션합니다. 참고: 여기에 표시된 이미지는 SO101 모델의 예시입니다.

```Bash
lerobot-calibrate \
    --teleop.type=so100_leader \
    --teleop.port=/dev/tty.usbmodem58760431551 \ # change to the port you found
    --teleop.id=my_awesome_leader_arm
```

이제 Raspberry Pi에서 다음 명령을 실행하여 LeKiwi의 팔로워 암을 캘리브레이션합니다. 테이블 위의 현재 위치는 무시하십시오. 올바른 캘리브레이션은 Lekiwi 섀시에 장착한 상태에서 수행해야 합니다.

```Bash
lerobot-calibrate \
    --robot.type=lekiwi \
    --robot.id=my_awesome_kiwi
```

저희는 대부분의 로봇에서 캘리브레이션 방법을 표준화했습니다. 먼저 모든 관절이 **가동 범위의 중간**에 오도록 로봇을 움직인 다음 버튼을 누릅니다. 다음으로 모든 관절을 **전체 가동 범위**까지 한 번 움직입니다. SO101의 동일한 캘리브레이션 과정을 담은 영상은 [여기](https://huggingface.co/docs/lerobot/en/so101#calibration-video)에서 확인할 수 있습니다 `Enter`.

## E. 원격 조작

새 Anaconda Prompt를 엽니다

![image – 22](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-21.png)

> Mac을 사용하는 경우 원격 조작을 위해 키보드에 접근할 수 있도록 "터미널" 권한을 부여해야 할 수 있습니다. "시스템 환경설정" > "보안 및 개인 정보 보호" > "입력 모니터링"으로 이동하여 "터미널" 체크박스를 선택하십시오.

원격 조작을 하려면 SSH로 Raspberry Pi에 로그인한 후 다음 명령을 실행하여 환경 `conda activate lerobot`을 활성화하고, 다음 스크립트를 실행합니다:

```Bash
python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

![image – 23](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-22.png)

다음으로 노트북에서도 다음 명령을 실행하여 환경 `conda activate lerobot`을 활성화하고, 다음 스크립트를 실행합니다:

```Bash
python examples/lekiwi/teleoperate.py
```

노트북 화면에 다음과 같은 내용이 표시되어야 합니다: `[INFO] Connected to remote robot at tcp://172.17.133.91:5555 and video stream at tcp://172.17.133.91:5556.` 이제 제어 암을 움직이고 키보드의 (W, A, S, D) 키로 로봇을 앞, 왼쪽, 뒤, 오른쪽으로 구동할 수 있습니다. (Z, X) 키로 로봇을 왼쪽이나 오른쪽으로 회전시킵니다. (R, F) 키로 로봇 속도를 높이거나 낮춥니다. 세 가지 속도 모드가 있으며 아래 표를 참고하십시오:



다른 키보드를 사용하는 경우 [`LeKiWiClientConfig`](https://github.com/huggingface/lerobot/blob/main/src/lerobot/robots/lekiwi/config_lekiwi.py)에서 각 명령의 키 바인딩을 변경할 수 있습니다.

## 통신 문제 해결

SO101 모바일 로봇 연결에 문제가 있는 경우 아래 단계에 따라 문제를 진단하고 해결하십시오.

### 1. IP 주소 구성 확인

구성 파일에 올바른 Raspberry Pi IP 주소가 설정되어 있는지 확인하십시오. Raspberry Pi의 IP 주소를 확인하려면 다음 명령을 실행합니다(Pi의 명령줄에서):

```Bash
hostname -I
```

### 2. 노트북/PC에서 Pi에 접근할 수 있는지 확인

노트북에서 Raspberry Pi에 ping을 시도합니다:

```Bash
ping <your_pi_ip_address>
```

ping이 실패하면:

- Pi에 전원이 켜져 있고 동일한 네트워크에 연결되어 있는지 확인하십시오.
- Pi에서 SSH가 활성화되어 있는지 확인하십시오.

### 3. SSH 연결 시도

SSH로 Pi에 로그인할 수 없다면 연결이 올바르지 않을 수 있습니다. 다음 명령을 사용하십시오:

```Bash
ssh <your_pi_user_name>@<your_pi_ip_address>
```

예: `ssh pi@192.168.0.106`

연결 오류가 발생하면:

- Pi에서 SSH가 활성화되어 있는지 확인하십시오. 다음 명령을 실행하면 됩니다:

```Bash
sudo raspi-config
```

- 그런 다음 **Interfacing Options -> SSH**로 이동하여 활성화합니다.

### 4. 구성 파일 일관성!!!

노트북/PC와 Raspberry Pi의 구성 파일이 완전히 동일한지 확인하십시오.

## F. 데이터셋 기록

원격 조작에 익숙해지면 LeKiwi로 첫 번째 데이터셋을 기록할 수 있습니다.

LeKiwi에서 프로그램을 시작하려면 SSH로 Raspberry Pi에 연결하고 다음 명령을 실행하여 환경을 활성화하고 스크립트를 시작합니다:

```Bash
conda activate lerobot

python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

Hugging Face Hub를 사용하여 데이터셋을 업로드하고 싶고 이전에 로그인한 적이 없다면 쓰기 권한 토큰으로 로그인해야 합니다. 토큰은 [Hugging Face 설정](https://huggingface.co/settings/tokens)에서 생성할 수 있습니다:

```Bash
hf auth login
```

다음 명령을 실행하기 위해 Hugging Face 저장소 이름을 변수에 저장합니다:

```Bash
hf auth whoami
```

그런 다음 노트북에서 다음 명령을 실행하여 2개의 에피소드를 기록하고 데이터셋을 Hub에 업로드합니다:

```Bash
python examples/lekiwi/record.py
```

## G. 데이터셋 시각화

데이터셋을 업로드했다면 [데이터셋을 온라인으로 시각화](https://huggingface.co/spaces/lerobot/visualize_dataset)할 수 있습니다. 다음 명령으로 생성되는 저장소 ID를 복사하여 붙여 넣으십시오:

```Bash
echo ${HF_USER}/my_lekiwi_dataset
```

데이터셋을 업로드하지 않았다면 로컬에서도 시각화할 수 있습니다(시각화 도구는 브라우저 창에서 `http://127.0.0.1:9090`으로 열립니다):

```Bash
python lerobot/scripts/visualize_dataset_html.py \
  --repo-id ${HF_USER}/lekiwi_test \
  --local-files-only 1
```

### 데이터셋 시각화 (선택 사항, 시도해 볼 만함)

```Bash
echo ${HF_USER}/my_lekiwi_dataset
```

데이터셋을 업로드했다면 다음 명령으로 로컬에서도 시각화할 수 있습니다:

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/my_lekiwi_dataset \
```

데이터셋을 업로드하지 않았다면 다음 명령으로 로컬에서도 시각화할 수 있습니다:

```Python
lerobot-dataset-viz \
  --repo-id juxi/my_lekiwi_dataset \
```

여기서 `juxi`는 데이터 수집 중에 설정한 사용자 지정 `repo_id` 이름입니다.



#### 데이터 수집 팁

데이터 기록에 익숙해지면 학습용으로 더 큰 데이터셋을 만들 수 있습니다. 좋은 시작 과제는 여러 위치에서 물체를 집어 컨테이너에 넣는 것입니다. 최소 50개의 에피소드, 즉 위치당 10개를 기록할 것을 권장합니다. 기록하는 동안 카메라 위치를 고정하고 집는 동작을 일관되게 유지하십시오. 또한 조작하는 물체가 카메라 화면에 선명하게 보이는지 확인하십시오. 간단한 경험 법칙은 카메라 화면만 보고도 과제를 완료할 수 있어야 한다는 것입니다.

다음 섹션에서는 신경망을 학습시킵니다. 안정적인 집기 성능을 얻으면 집는 위치 추가, 다양한 집기 기술 사용, 카메라 위치 변경 등 데이터 수집에 더 많은 변화를 도입할 수 있습니다.

너무 빠르게 많은 변화를 추가하면 결과에 악영향을 줄 수 있으므로 피하십시오.

이 중요한 주제를 더 깊이 파고들고 싶다면 [좋은 데이터셋이란 무엇인가에 대한 블로그 글](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset)을 확인해 보십시오.

#### 문제 해결:

Linux에서 데이터 기록 중에 좌/우 화살표 키와 Esc 키가 작동하지 않으면 `$DISPLAY` 환경 변수가 설정되어 있는지 확인하십시오. [pynput의 제한 사항](https://pynput.readthedocs.io/en/latest/limitations.html#linux)을 참고하십시오

## H. 에피소드 재생

이제 로봇에서 첫 번째 에피소드를 재생해 보십시오:

```Bash
python examples/lekiwi/replay.py
```

축하합니다 🎉 — 이제 로봇이 스스로 작업을 학습할 준비가 되었습니다. 이 튜토리얼의 학습 섹션을 따라 학습을 시작하십시오: [실제 로봇 시작하기](https://huggingface.co/docs/lerobot/il_robots)

## I. 정책 평가

remote_ip, port, HF_MODEL_ID를 반드시 변경하십시오

### evaluate.py 수정

HF_MODEL_ID="<hf_username>/<model_repo_id>" 는 학습 후 Hugging Face에 업로드한 데이터셋 이름(Hugging Face에 업로드한 경우), 또는 학습 후 모델을 내보낸 로컬 디렉터리로 변경하십시오

HF_DATASET_ID="<hf_username>/<eval_dataset_id>" 는 생성한 사용자 이름과 eval_ 데이터셋 이름으로 변경하십시오

remote_ip: Raspberry Pi IP 주소

![image – 24](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-23.png)

그런 다음 다음 명령을 실행합니다:

```Bash
python examples/lekiwi/evaluate.py
```

1. 데이터셋 이름은 추론을 실행 중임을 나타내기 위해 `eval`로 시작합니다(예: `${HF_USER}/eval_act_lekiwi_test`).
2. 평가 중 `File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'` 오류가 발생하면 이름이 `eval_`로 시작하는 폴더를 먼저 삭제하고 프로그램을 다시 실행하십시오.



시뮬레이션 학습은 다음을 참고하십시오

https://github.com/Ekumen-OS/lekiwi/tree/main

https://github.com/SIGRobotics-UIUC/LeKiwi-sim



## 도움말 🙋

하드웨어 문제는 고객 서비스에 문의하십시오. 사용 관련 질문은 Discord에 참여하십시오.

[LeRobot 플랫폼](https://github.com/huggingface/lerobot)

[LeRobot Discord 채널](https://discord.gg/8TnwDdjFGU)

##   
  
Mac에 Miniconda 설치

## 권한 부여

![image – 25](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/d01-24.png)

## Miniconda 설치

https://www.anaconda.com/download

## pip 패키지 소스 변경

```Shell
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
```

## conda 패키지 소스 변경

```Shell
# 기존 .condarc 구성을 삭제합니다(선택 사항, 충돌 방지)
echo "" > ~/.condarc

# 칭화대 미러 구성을 작성합니다
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

# 구성을 적용하기 위해 캐시를 지웁니다
conda clean -i
```

<RelatedProducts slugs="lekiwi,so-arm101,servo-driver-board" />

