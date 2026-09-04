---
title: Lekiwi 이동 로봇 사용 튜토리얼
description: "LeRobot 기반 Lekiwi 이동 로봇의 설정, 모터 구성, 원격 조작, 데이터 수집, 훈련, 평가 전체 가이드"
---

# Lekiwi 이동 로봇 사용 튜토리얼

> **[스토어에서 구매](https://www.juxitech.com/ko/products/lekiwi-embodied-intelligence-mobile-robotic-car)**


검은색 액티브 암은 5V 6A 전원 어댑터를, 흰색 패시브 암은 12V 5A 전원 어댑터를 사용합니다

[lerobot-Lekiwi.zip]

이 튜토리얼 저장소의 코드는 2026년 3월 1일 이전에 테스트된 LeRobot 안정 버전으로 유지됩니다. 현재 Huggingface는 LeRobot을 대폭 업그레이드하여 다수의 신규 기능을 추가했습니다. 최신 튜토리얼을 체험하려면 [공식 문서](https://huggingface.co/docs/lerobot/lekiwi)에 따라 진행하세요.



[Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi)는 [SIGRobotics-UIUC](https://github.com/SIGRobotics-UIUC)가 시작한 완전 오픈소스 로봇 카 프로젝트입니다. 상세한 3D 프린팅 파일과 조작 가이드를 포함하며, [LeRobot](https://github.com/huggingface/lerobot/tree/main) 모방 학습 프레임워크와 호환되도록 설계되었습니다. SO101 로봇 암을 지원하여 완전한 모방 학습 과정을 가능하게 합니다.

[*정확한 부품 위치는 Fusion360 온라인 CAD에서 확인할 수 있습니다*](https://a360.co/4k1P8yO).

[URDF 파일](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)

온라인 URDF 미리보기 https://urdf.d-robotics.cc/

![image – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

## 주요 특징

1. **오픈소스이면서 저비용**: [Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi)는 오픈소스 저비용 로봇 카 솔루션을 제공합니다.

2. **LeRobot 통합**: [LeRobot 플랫폼](https://github.com/huggingface/lerobot) 통합을 위해 특별히 설계되었습니다.

3. **풍부한 학습 리소스**: 조립·캘리브레이션 가이드와 테스트, 데이터 수집, 훈련, 배포 튜토리얼을 포함한 포괄적인 오픈소스 학습 리소스를 제공하여 사용자가 빠르게 시작하고 로봇 애플리케이션을 개발할 수 있도록 돕습니다.

4. **Nvidia 호환**: reComputer Mini J4012 Orin NX 16 GB와 함께 사용할 수 있습니다.

5. **다양한 응용 시나리오**: 교육, 과학 연구, 자동화 생산, 로보틱스 분야에 적합하며, 다양한 복잡한 작업에서 효율적이고 정확한 로봇 조작을 실현하도록 돕습니다.

JUXI는 하드웨어 자체의 품질에만 책임을 집니다. 튜토리얼은 공식 문서에 따라 엄격히 업데이트됩니다. 해결할 수 없는 소프트웨어 문제나 환경 의존성 문제가 발생하면 즉시 [LeRobot 플랫폼](https://github.com/huggingface/lerobot) 또는 [LeRobot Discord 채널](https://discord.gg/8TnwDdjFGU)에 문제를 보고해 주세요.

**주의**

- Lekiwi 섀시의 모든 서보는 12V 전원이 필요합니다. 5V 로봇 암을 사용하는 사용자를 위해 12V→5V 강압 변환 모듈을 제공합니다. 회로는 직접 수정해야 합니다.

- 12V 전원 - 필요 시 결제 시 이 옵션을 선택할 수 있습니다. 이미 12V 전원이 있다면 전원 출력 인터페이스를 5521 DC 플러그로 변환하면 됩니다.

- 라즈베리파이 컨트롤러와 카메라 - 주문 인터페이스를 통해 별도 구매해야 합니다.

## 부품 목록(BOM)

## 초기 시스템 환경

**Ubuntu x86:**

- Ubuntu 22.04

- CUDA 12+

- Python 3.10

- Torch 2.6

**Jetson Orin:**

- Jetson JetPack 6.0

- Python 3.10

- Torch 2.3+

**라즈베리파이:**

- 라즈베리파이 5 4G~16G

### SSH 설정

라즈베리파이 설정 후 [SSH](https://www.raspberrypi.com/news/coding-on-raspberry-pi-remotely-with-visual-studio-code/)(보안 셸 프로토콜)를 활성화하고 구성하면, 라즈베리파이에 화면·키보드·마우스를 연결하지 않고도 노트북에서 라즈베리파이에 로그인할 수 있습니다. 훌륭한 [튜토리얼은 여기](https://www.raspberrypi.com/documentation/computers/remote-access.html#ssh)에서 찾을 수 있습니다. 명령 프롬프트(cmd)를 통해 라즈베리파이에 로그인하거나, VSCode를 사용한다면 [이](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) 확장 프로그램을 사용할 수 있습니다.

## 3D 프린팅 가이드

### 부품

다음 3D 프린팅 부품에 대해 인쇄 가능한 STL 파일을 제공합니다. 이 부품들은 일반 PLA 필라멘트를 사용하여 소비자용 FDM 프린터에서 인쇄할 수 있습니다. Bambu Lab P1S 프린터에서 테스트했습니다. 모든 부품은 bambuslicer에 로드한 후 자동 회전·배치하고, 권장 서포트를 활성화한 다음 인쇄했습니다.

### 인쇄 파라미터

제공된 STL 파일은 많은 FDM 프린터에서 직접 인쇄할 수 있습니다. 다음은 테스트 및 권장 설정이며, 다른 설정도 유효할 수 있습니다.

- 재질: PLA+

- 노즐 지름 및 정밀도: 0.2mm 노즐 지름, 층 높이 0.2mm

- 채우기 밀도: 15%

- 인쇄 속도: 150 mm/s

- 필요 시 G코드(슬라이스 파일)를 프린터에 업로드하여 인쇄합니다

# LeRobot 설치

라즈베리파이에서:

### 1. [Miniconda 설치](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

```Python
mkdir *-p* ~/miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh *-O* ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh *-b* *-u* *-p* ~/miniconda3
rm ~/miniconda3/miniconda.sh
```

### 2. 셸 재시작

셸에서 다음 명령을 복사해 붙여넣으세요: `source ~/.bashrc` 또는 Mac 사용자: `source ~/.bash_profile` 또는 `source ~/.zshrc`(zshell 사용 시)

### 3. LeRobot용 새 Conda 환경 생성 및 활성화

```Python
conda create -y -n lerobot python=3.10
```

그다음 Conda 환경을 활성화합니다(LeRobot을 사용하기 위해 셸을 열 때마다 수행해야 합니다!):

```Bash
conda activate lerobot
```

### 4. LeRobot 클론:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. 환경에 ffmpeg 설치:

`miniconda`를 사용할 때 환경에 `ffmpeg`를 설치합니다:

```PowerShell
conda install ffmpeg -c conda-forge
```

이렇게 하면 일반적으로 플랫폼용 libsvtav1 인코더로 컴파일된 ffmpeg 7.X가 설치됩니다. libsvtav1이 지원되지 않는 경우(`ffmpeg -encoders`로 지원 인코더 확인 가능):

【모든 플랫폼】ffmpeg 7.X를 명시적으로 설치:

`conda install ffmpeg=7.1.1 -c conda-forge`

[Linux만] ffmpeg의 빌드 의존성을 설치하고 libsvtav1 지원으로 ffmpeg를 소스에서 컴파일하며, 사용하는 ffmpeg 실행 파일이 올바른지 `which ffmpeg`로 확인하세요.

다음 오류가 발생하면 위 명령으로도 해결할 수 있습니다.

![5. 환경에 ffmpeg 설치: – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

### 6. feetech 모터 의존성을 포함한 LeRobot 설치:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install *-e* ".[lekiwi]"
```

### 7. 연결 시간 설정

`lerobot\src\lerobot\robots\lekiwi` 디렉터리에서 config_lekiwi.py를 찾으세요

connection_time_s: int = 7200 # 也就是2小时

![7. 연결 시간 설정 – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)



## C. 노트북에 LeRobot 설치

노트북에 이미 LeRobot을 설치했다면 이 단계를 건너뛸 수 있습니다. 그렇지 않으면 라즈베리파이에서 했던 것과 동일한 절차를 **따라 진행**하세요.

> [!Tip] 명령 프롬프트(cmd)를 자주 사용할 것입니다. cmd 사용에 익숙하지 않거나 명령줄 사용법을 복습하고 싶다면 이것을 참고하세요: [명령줄 입문 코스](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line)
> 
> 

컴퓨터에서:

### 1. [Miniconda 설치](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

### 2. 셸 재시작

셸에서 다음 명령을 복사해 붙여넣으세요: `source ~/.bashrc` 또는 Mac 사용자: `source ~/.bash_profile` 또는 `source ~/.zshrc`(zshell 사용 시)

![2. 셸 재시작 – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)

### 3. LeRobot용 새 Conda 환경 생성 및 활성화

```Bash
conda create *-y* *-n* lerobot *python*=3.10
```

그다음 Conda 환경을 활성화합니다(LeRobot을 사용하기 위해 셸을 열 때마다 수행해야 합니다!):

```Bash
conda activate lerobot
```

### 4. LeRobot 클론:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. 환경에 ffmpeg 설치:

`miniconda`를 사용할 때 환경에 `ffmpeg`를 설치합니다:

```PowerShell
conda install ffmpeg -c conda-forge
```

이렇게 하면 일반적으로 플랫폼용 libsvtav1 인코더로 컴파일된 ffmpeg 7.X가 설치됩니다. libsvtav1이 지원되지 않는 경우(`ffmpeg -encoders`로 지원 인코더 확인 가능):

【모든 플랫폼】ffmpeg 7.X를 명시적으로 설치:

`conda install ffmpeg=7.1.1 -c conda-forge`

[Linux만] ffmpeg의 빌드 의존성을 설치하고 libsvtav1 지원으로 ffmpeg를 소스에서 컴파일하며, 사용하는 ffmpeg 실행 파일이 올바른지 `which ffmpeg`로 확인하세요.

다음 오류가 발생하면 위 명령으로도 해결할 수 있습니다.

![5. 환경에 ffmpeg 설치: – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/4.png)

### 6. feetech 모터 의존성을 포함한 LeRobot 설치:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install *-e* ".[lekiwi]"
```

# 모터 설정

![6. feetech 모터 의존성을 포함한 LeRobot 설치: – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/5.png)

![6. feetech 모터 의존성을 포함한 LeRobot 설치: – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/6.png)

### **1. 로봇 암에 연결된 USB 포트 찾기**

단일 모터의 올바른 포트를 찾으려면 다음 유틸리티 스크립트를 두 번 실행합니다:

```Bash
lerobot-find-port
```

출력 예(Mac에서는 `/dev/tty.usbmodem575E0031751`, Linux에서는 `/dev/ttyACM0`):

출력 예(Mac에서는 `/dev/tty.usbmodem575E0032081`, Linux에서는 `/dev/ttyACM1`):

트러블슈팅: Linux에서는 다음 명령으로 USB 포트 접근을 허용해야 할 수 있습니다:

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

### **2. 모터 설정(완성품은 이 단계 생략 가능)**

섀시의 각 모터를 순서대로 삽입하고 다음 스크립트를 실행합니다. 먼저 로봇 암의 서보(ID 6..1)를 초기화한 후, 섀시 서보를 초기화하여 그 ID를 (ID 9..7)로 설정합니다. 로봇 암을 이미 캘리브레이션했다면 Enter를 계속 눌러 덮어쓰며 건너뛸 수 있습니다:

```Bash
lerobot-setup-motors \
    *--robot.type*=lekiwi \
    *--robot.port*=/dev/tty.usbmodem58760431551 # <- paste here the port found at previous step
```

![2. 모터 설정완성품은 이 단계 생략 가능 – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/8.png)

### 3. HuggingFace 국내 미러 설정

- Ubuntu

```Shell
sudo nano ~/.bashrc

# 在文件末尾加入
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.bashrc
echo $HF_ENDPOINT

# 输出
# https://hf-mirror.com
```

- Mac

```Shell
sudo nano ~/.zshrc

# 在文件末尾加入
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.zshrc

# 输出
# https://hf-mirror.com
```

#### ① 토큰 생성

https://huggingface.co/settings/tokens

![① 토큰 생성 – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

![① 토큰 생성 – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

![① 토큰 생성 – 3](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)

#### ② 토큰 기록

예를 들어, 제 토큰은:

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### ③ 토큰 바인딩

```Shell
hf auth login

hf auth whoami
```

![③ 토큰 바인딩 – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/4.png)

#### ④ 데이터세트 저장소 생성

**Owner와 Dataset 이름을 기록해 두세요. 이는 나중에 필요한 \<hf_username\>과 \<dateset_repo_id\>입니다.**

![④ 데이터세트 저장소 생성 – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/5.png)

![④ 데이터세트 저장소 생성 – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/6.png)

![④ 데이터세트 저장소 생성 – 3](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/8.png)

### 4. 설정 업데이트!!!

LeKiwi LeRobot과 노트북의 구성 파일은 일치해야 합니다. 먼저 이동 로봇 암의 라즈베리파이 **IP 주소**를 찾아야 합니다. 이는 SSH에 사용한 IP 주소와 동일합니다. 또한 노트북에서 액티브 암 서보 드라이버 보드의 **USB 포트**와 LeKiwi의 **서보 드라이버 보드 포트**를 찾아야 합니다. 이 포트들은 다음 스크립트로 찾을 수 있습니다.

Linux에서는 다음 명령을 실행하여 USB 포트 접근을 허용해야 할 수 있습니다:

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

중요한 참고: 이제 액티브 암의 포트 번호와 Lekiwi 로봇 암의 IP 주소를 확보했습니다. 네트워크 구성의 **ip**를 업데이트하고, 액티브 암 구성의 **port**를 업데이트하며, LeKiwi 구성의 **port, remote_ip**를 업데이트하세요.

example\\lekiwi 디렉터리 아래의 다음 네 파일을 수정합니다

![4. 설정 업데이트!!! – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

#### ① teleoperate.py 수정

remote_ip: 라즈베리파이의 IP 주소

port: 액티브 암을 컴퓨터 또는 Linux에 연결했을 때의 포트 번호

![① teleoperate.py 수정 – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

#### ② record.py 수정

HF_REPO_ID:[Hugging Face의 사용자 이름과 데이터세트 이름](https://juxitech.feishu.cn/docx/DXtPd0iF1oO3aGxRChBcL3LSnFh?fromScene=spaceOverview#doxcnsAUzU1e1l6XIM07OE8grYg)

remote_ip: 라즈베리파이의 IP 주소

port: 액티브 암을 컴퓨터 또는 Linux에 연결했을 때의 포트 번호

![② record.py 수정 – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)

#### ③ replay.py 수정

remote_ip: 라즈베리파이의 IP 주소

\<hf_username\>/\<dataset_repo_id\>, 즉 [Hugging Face의 사용자 이름과 데이터세트 이름](https://juxitech.feishu.cn/docx/DXtPd0iF1oO3aGxRChBcL3LSnFh?fromScene=spaceOverview#doxcnsAUzU1e1l6XIM07OE8grYg)

![③ replay.py 수정 – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/4.png)

## 캘리브레이션

이제 액티브 암과 패시브 암을 캘리브레이션해야 합니다. 전방향 바퀴의 조향 서보는 캘리브레이션이 필요하지 않습니다.

### 팔로워 암 캘리브레이션(Lekiwi 베이스에 장착됨)

컴퓨터에서 다음 명령을 실행하여 액티브 암을 캘리브레이션합니다. 참고: 여기 표시된 이미지는 SO101 모델의 예시입니다.

```Bash
lerobot-calibrate \
    --teleop.type=so100_leader \
    --teleop.port=/dev/tty.usbmodem58760431551 \ #修改为找到的端口号
    --teleop.id=my_awesome_leader_arm
```

이제 라즈베리파이에서 다음 명령을 실행하여 LeKiwi에 장착된 슬레이브 암을 캘리브레이션합니다. 테이블 위의 현재 위치는 무시하세요. Lekiwi 섀시에 설치된 상태에서 정상적인 캘리브레이션을 수행해야 합니다.

```Bash
lerobot-calibrate \
    --robot.type=lekiwi \
    --robot.id=my_awesome_kiwi
```

대부분의 로봇에 대해 캘리브레이션 방법을 통일했습니다. 먼저 로봇을 각 조인트가 **가동 범위의 미드포인트**에 오는 위치로 이동한 다음 버튼을 누릅니다. 둘째, 모든 조인트를 각자의 가동 범위 전체를 통해 이동시킵니다. SO101의 동일한 캘리브레이션 과정 영상은 [여기](https://huggingface.co/docs/lerobot/en/so101#calibration-video)에서 참고할 수 있습니다.

# F. 원격 조작

새 Anaconda Prompt를 엽니다

![팔로워 암 캘리브레이션Lekiwi 베이스에 장착됨 – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/5.png)

> Mac을 사용한다면 원격 조작을 위해 "터미널"에 키보드 접근 권한을 허용해야 할 수 있습니다. "시스템 설정(System Preferences)" \> "보안 및 개인 정보(Security &amp; Privacy)" \> "입력 모니터링(Input Monitoring)"으로 이동한 다음 "터미널" 체크박스를 선택하세요.
> 
> 

원격 조작을 수행하려면 SSH로 라즈베리파이에 로그인하고 환경을 활성화하는 다음 명령 `conda activate lerobot`을 실행한 후, 다음 스크립트를 실행합니다:

```Bash
python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

![팔로워 암 캘리브레이션Lekiwi 베이스에 장착됨 – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/6.png)

다음으로 노트북에서도 환경을 활성화하는 다음 명령 `conda activate lerobot`을 실행한 후, 다음 스크립트를 실행합니다:

```Bash
python examples/lekiwi/teleoperate.py
```

노트북 화면에 다음과 유사한 인터페이스가 표시될 것입니다: `[INFO] Connected to remote robot at tcp://172.17.133.91:5555 and video stream at tcp://172.17.133.91:5556.` 이제 컨트롤 암을 움직이고, 키보드의 (W, A, S, D) 키로 로봇의 전진, 좌회전, 후진, 우회전을 제어할 수 있습니다. (Z, X) 키로 로봇을 좌회전 또는 우회전시킬 수 있습니다. (R, F) 키로 이동 로봇의 속도를 높이거나 낮출 수 있습니다. 속도 모드는 총 세 가지이며, 다음 표를 참조하세요:

다른 키보드를 사용한다면 각 명령의 키 설정을 [`LeKiwiClientConfig`](https://github.com/huggingface/lerobot/blob/main/src/lerobot/robots/lekiwi/config_lekiwi.py)에서 변경할 수 있습니다.

## 통신 오류 트러블슈팅

이동 로봇 SO101에 연결할 때 문제가 발생하면 다음 단계에 따라 진단하고 해결하세요.

### 1. IP 주소 설정 확인

구성 파일에 올바른 라즈베리파이 IP 주소가 설정되었는지 확인합니다. 라즈베리파이의 IP 주소를 확인하려면 다음 명령을 실행합니다(Pi의 명령줄에서):

```Bash
hostname *-I*
```

### 2. 노트북/PC에서 Pi에 접근 가능한지 확인

노트북에서 라즈베리파이에 ping을 시도합니다:

```Bash
ping <your_pi_ip_address>
```

ping이 실패하면:

- Pi가 켜져 있고 같은 네트워크에 연결되어 있는지 확인합니다.

- Pi에서 SSH가 활성화되어 있는지 확인합니다.

### 3. SSH 연결 시도

SSH로 Pi에 로그인할 수 없다면 연결이 잘못되었을 수 있습니다. 다음 명령을 사용하세요:

```Bash
ssh <your_pi_user_name>@<your_pi_ip_address>
```

예를 들어 `ssh pi@192.168.0.106`

연결 오류가 발생하면:

- Pi에서 SSH가 활성화되어 있는지 확인하려면 다음 명령을 실행할 수 있습니다:

```Bash
sudo raspi-config
```

- 그다음 이동: **인터페이스 옵션(Interfacing Options) -\> SSH** 로 이동하여 활성화합니다.

### 4. 구성 파일 일치!!!

노트북/PC와 라즈베리파이의 구성 파일이 정확히 동일한지 확인합니다.

# G. 데이터세트 기록

원격 조작에 익숙해지면 LeKiwi로 첫 데이터세트를 기록할 수 있습니다.

LeKiwi에서 프로그램을 시작하려면 SSH로 라즈베리파이에 접속하고, 다음 명령을 실행하여 환경을 활성화하고 스크립트를 시작합니다:

```Bash
conda activate lerobot

python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

Hugging Face hub 기능을 사용하여 데이터세트를 업로드하려면, 이전에 로그인한 적이 없다면 쓰기 권한이 있는 토큰으로 로그인해야 합니다. 이 토큰은 [Hugging Face 설정](https://huggingface.co/settings/tokens)에서 생성할 수 있습니다:

```Bash
hf auth login
```

Hugging Face 저장소 이름을 변수에 저장하여 다음 명령을 실행합니다:

```Bash
*hf auth whoami*
```

그다음 노트북에서 다음 명령을 실행하여 2라운드를 기록하고 데이터세트를 hub에 업로드합니다:

```Bash
python examples/lekiwi/record.py
```

# H. 데이터세트 시각화

데이터세트를 업로드했다면 [데이터세트를 온라인에서 시각화](https://huggingface.co/spaces/lerobot/visualize_dataset)할 수 있습니다. 다음 명령으로 생성된 저장소 ID를 복사해 붙여넣으세요:

```Bash
echo *${HF_USER}*/my_lekiwi_dataset
```

데이터세트를 업로드하지 않았다면 로컬에서도 시각화할 수 있습니다(브라우저 창은 `http://127.0.0.1:9090`으로 시각화 도구를 열 수 있습니다):

```Bash
python lerobot/scripts/visualize_dataset_html.py \
  --repo-id *${HF_USER}*/lekiwi_test \
  --local-files-only 1
```

### 데이터세트 시각화(선택 사항, 시도 가능)

```Bash
echo ${HF_USER}/my_lekiwi_dataset
```

데이터세트를 업로드했다면 다음 명령으로 로컬에서도 시각화할 수 있습니다:

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/my_lekiwi_dataset \
```

데이터세트를 업로드하지 않았다면 다음 명령으로 로컬에서도 시각화할 수 있습니다:

```Python
lerobot-dataset-viz \
  --repo-id juxi/my_lekiwi_dataset \
```

여기서 `juxi`는 데이터 수집 중 사용자 정의 `repo_id` 이름입니다.



#### 데이터 수집 팁

데이터 기록에 익숙해지면 훈련에 사용할 더 큰 데이터세트를 만들 수 있습니다. 좋은 시작 태스크는 여러 위치에서 물체를 잡아 컨테이너에 넣는 것입니다. 최소 50세그먼트를 기록하고, 각 위치에 대해 10세그먼트씩 기록하는 것을 권장합니다. 카메라 위치를 고정하고, 녹화 전체에 걸쳐 일관된 잡기 동작을 유지하세요. 또한 조작하는 물체가 카메라 프레임에 선명하게 보이도록 하세요. 간단한 기준은 카메라 화면만 관찰해도 이 태스크를 완료할 수 있어야 한다는 것입니다.

다음 장에서는 신경망을 훈련할 것입니다. 신뢰할 수 있는 잡기 성능을 달성한 후에는 데이터 수집 과정에서 더 많은 변형을 도입할 수 있습니다(잡는 위치 늘리기, 다른 잡기 기법 사용, 카메라 위치 변경 등).

너무 빨리 많은 변경을 추가하지 마세요. 결과에 영향을 줄 수 있습니다.

이 중요한 주제를 더 깊이 알고 싶다면 훌륭한 데이터세트를 만드는 방법에 대한 [블로그 글](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset)을 확인하세요.

#### 트러블슈팅:

Linux 시스템에서 데이터 수집 중 왼쪽/오른쪽 화살표 키와 Esc 키가 작동하지 않으면 `$DISPLAY` 환경 변수가 설정되어 있는지 확인하세요. [pynput의 제한 사항](https://pynput.readthedocs.io/en/latest/limitations.html#linux) 참조

# I. 한 라운드 재생

이제 로봇에서 첫 라운드를 재생해 보세요:

```Bash
python examples/lekiwi/replay.py
```

축하합니다 🎉, 로봇이 자율 학습 태스크를 위한 준비를 마쳤습니다. 본 튜토리얼의 훈련 섹션에 따라 훈련을 시작하세요: [실제 세계 로봇 입문](https://huggingface.co/docs/lerobot/il_robots)

## K. 전략 평가

remote_ip, port, HF_MODEL_ID를 반드시 변경하세요

#### evaluate.py 수정

HF_MODEL_ID="\<hf_username\>/\<model_repo_id\>" 는 훈련 후 Hugging Face에 업로드한 데이터세트(Hugging Face에 업로드한 경우) 또는 훈련 후 로컬로 내보낸 모델 디렉터리 이름으로 수정해야 합니다.

HF_DATASET_ID = "\< hf_username \>/\< eval_dataset_id \>" 생성한 사용자 이름과 eval_ 데이터세트 이름으로 변경합니다.

remote_ip: 라즈베리파이 IP 주소

![evaluate.py 수정 – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/8.png)

그다음 다음 명령을 실행합니다:

```Bash
python examples/lekiwi/evaluate.py
```

1. 데이터세트의 이름은 `eval`로 시작하여 추론을 실행하고 있음을 나타냅니다(예: `${HF_USER}/eval_act_lekiwi_test`).

2. 평가 단계에서 `File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'` 오류가 발생하면 먼저 `eval_`로 시작하는 폴더를 삭제한 후 프로그램을 다시 실행합니다.



시뮬레이션 훈련은 다음을 참고할 수 있습니다:

https://github.com/Ekumen-OS/lekiwi/tree/main

https://github.com/SIGRobotics-UIUC/LeKiwi-sim



## 도움말 🙋

하드웨어 문제는 고객 서비스에 문의하세요. 사용 문제는 Discord에 가입하세요.

[LeRobot 플랫폼](https://github.com/huggingface/lerobot)

[LeRobot Discord 채널](https://discord.gg/8TnwDdjFGU)
