---
title: Lekiwi 이동 로봇 사용 튜토리얼
description: "LeRobot 기반 Lekiwi 이동 로봇의 설정, 모터 구성, 원격 조작, 데이터 수집, 훈련, 평가 전체 가이드"
---

# Lekiwi 이동 로봇 사용 튜토리얼

> [!참고] 이 튜토리얼은 LeRobot 공식 문서를 기반으로 합니다. 해결할 수 없는 소프트웨어 문제나 환경 의존 문제는 [LeRobot 플랫폼](https://github.com/huggingface/lerobot) 또는 [LeRobot Discord 채널](https://discord.gg/8TnwDdjFGU)에 보고해 주세요.

## 주요 특징

1. **오픈소스이면서 저비용**: [Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi)는 오픈소스 저비용 로봇 카 솔루션을 제공합니다.
2. **LeRobot 통합**: [LeRobot 플랫폼](https://github.com/huggingface/lerobot) 통합을 위해 설계되었습니다.
3. **풍부한 학습 리소스**: 조립·캘리브레이션 가이드와 테스트, 데이터 수집, 훈련, 배포 튜토리얼을 포함한 포괄적인 오픈소스 학습 리소스를 제공하여 사용자가 빠르게 시작해 로봇 애플리케이션을 개발할 수 있습니다.
4. **Nvidia 호환**: reComputer Mini J4012 Orin NX 16 GB와 함께 사용할 수 있습니다.
5. **다양한 응용 시나리오**: 교육, 과학 연구, 자동화 생산, 로보틱스 분야에 적합하며, 다양한 복잡한 작업에서 효율적이고 정확한 로봇 조작을 실현합니다.

JUXI는 하드웨어 자체의 품질에만 책임을 집니다. 튜토리얼은 공식 문서에 따라 엄격히 업데이트됩니다.

**주의**
- Lekiwi 섀시 내 모든 서보는 12V 전원이 필요합니다. 5V 로봇팔을 사용하는 사용자를 위해 12V→5V 강압 변환 모듈을 제공합니다. 회로 수정은 직접 하셔야 합니다.
- 12V 전원 - 필요 시 결제 시 이 옵션을 선택할 수 있습니다. 이미 12V 전원이 있다면 출력 인터페이스를 5521 DC 플러그로 변환하면 됩니다.
- 라즈베리파이 컨트롤러와 카메라 - 주문 화면에서 별도 구매해야 합니다.

## 부품 목록 (BOM)



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
- 라즈베리파이5 4G~16G

### SSH 설정

라즈베리파이 설정 후 [SSH](https://www.raspberrypi.com/news/coding-on-raspberry-pi-remotely-with-visual-studio-code/)(보안 셸 프로토콜)를 활성화하고 구성하면, 라즈베리파이에 화면·키보드·마우스를 연결하지 않고 노트북에서 로그인할 수 있습니다.[여기](https://www.raspberrypi.com/documentation/computers/remote-access.html#ssh)에 훌륭한 튜토리얼이 있습니다. 명령 프롬프트(cmd)로 라즈베리파이에 로그인하거나, VSCode를 사용한다면 [이](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) 확장 프로그램을 사용할 수 있습니다.

## 3D 프린팅 가이드

### 부품

다음 3D 프린팅 부품의 인쇄 가능한 STL 파일을 제공합니다. 이 부품들은 일반 PLA 필라멘트로 소비자용 FDM 프린터에서 인쇄할 수 있습니다. Bambu Lab P1S 프린터에서 테스트했습니다. 모든 구성 요소는 bambuslicer에 로드하면 자동 회전·배치되고, 권장 서포트를 활성화한 후 인쇄할 수 있습니다.

### 인쇄 파라미터

제공된 STL 파일은 많은 FDM 프린터에서 직접 인쇄할 수 있습니다. 다음은 테스트 및 권장 설정입니다. 다른 설정도 유효할 수 있습니다.

- 재질: PLA+
- 노즐 직경 및 정밀도: 0.2mm 노즐 직경, 층 높이 0.2mm
- 채우기 밀도: 15%
- 인쇄 속도: 150 mm/s
- 필요 시 G코드(슬라이스 파일)를 프린터에 업로드하여 인쇄

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

셸에 다음을 복사해 붙여넣습니다: `source ~/.bashrc` 또는 Mac 사용자: `source ~/.bash_profile` 또는 `source ~/.zshrc`(zshell 사용 시)

### 3. LeRobot용 새 Conda 환경 생성 및 활성화

```Python
conda create -y -n lerobot python=3.10
```

그다음 Conda 환경을 활성화합니다(LeRobot을 사용할 때마다 셸을 열 때마다 필요!):

```Bash
conda activate lerobot
```

### 4. LeRobot 클론:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. 환경에 ffmpeg 설치:

`miniconda` 사용 시 환경에 `ffmpeg`를 설치합니다:

```PowerShell
conda install ffmpeg -c conda-forge
```

이렇게 하면 일반적으로 libsvtav1 인코더로 컴파일된 ffmpeg 7.X가 설치됩니다. libsvtav1을 지원하지 않는 경우(`ffmpeg -encoders`로 지원 인코더 확인 가능):

【모든 플랫폼】ffmpeg 7.X를 명시적으로 설치:
`conda install ffmpeg=7.1.1 -c conda-forge`

【Linux만】ffmpeg의 빌드 의존성을 설치하고 libsvtav1 지원 ffmpeg를 소스에서 컴파일하며, 사용하는 ffmpeg 실행 파일이 올바른지 `which ffmpeg`로 확인하세요.

아래 오류가 발생해도 위 명령으로 해결할 수 있습니다.



### 6. feetech 모터 의존성을 포함한 LeRobot 설치:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install *-e* ".[lekiwi]"
```

### 7. 연결 시간 설정

`lerobot\src\lerobot\robots\lekiwi` 디렉터리에서 config_lekiwi.py를 찾습니다
connection_time_s: int = 7200 # 즉 2시간



## C. 노트북에 LeRobot 설치

노트북에 이미 LeRobot을 설치했다면 이 단계를 건너뛸 수 있습니다. 그 외에는 라즈베리파이에서의 **동일한 절차**를 따르세요.

> [!힌트] 명령 프롬프트(cmd)를 자주 사용합니다. cmd에 익숙하지 않다면 [명령줄 입문 코스](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line)를 참고하세요.

컴퓨터에서:

### 1. [Miniconda 설치](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

### 2. 셸 재시작

셸에 다음을 복사해 붙여넣습니다: `source ~/.bashrc` 또는 Mac 사용자: `source ~/.bash_profile` 또는 `source ~/.zshrc`(zshell 사용 시)



### 3. LeRobot용 Conda 환경 생성 및 활성화

```Python
conda create -y -n lerobot python=3.10
```

그다음 Conda 환경을 활성화합니다(LeRobot 사용 시마다 필요!):

```Bash
conda activate lerobot
```

### 4. LeRobot 클론:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. 환경에 ffmpeg 설치:

`miniconda` 사용 시 환경에 `ffmpeg`를 설치합니다:

```PowerShell
conda install ffmpeg -c conda-forge
```

이렇게 하면 일반적으로 libsvtav1 인코더로 컴파일된 ffmpeg 7.X가 설치됩니다. libsvtav1 미지원 시(`ffmpeg -encoders`로 확인):

【모든 플랫폼】ffmpeg 7.X 명시적 설치:
`conda install ffmpeg=7.1.1 -c conda-forge`

【Linux만】ffmpeg 빌드 의존성 설치 후 libsvtav1 지원 ffmpeg를 소스에서 컴파일, `which ffmpeg`로 확인하세요.

아래 오류가 발생해도 위 명령으로 해결할 수 있습니다.



### 6. feetech 모터 의존성을 포함한 LeRobot 설치:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install *-e* ".[lekiwi]"
```

# 모터 설정





### **1.로봇팔과 연결된 USB 포트 찾기**

개별 모터의 올바른 포트를 찾으려면 다음 유틸리티 스크립트를 두 번 실행합니다:

```Bash
lerobot-find-port
```

출력 예(Mac에서는 `/dev/tty.usbmodem575E0031751`, Linux에서는 `/dev/ttyACM0`일 수 있음):

출력 예(Mac에서는 `/dev/tty.usbmodem575E0032081`, Linux에서는 `/dev/ttyACM1`일 수 있음):

트러블슈팅: Linux에서는 다음 명령으로 USB 포트 접근 권한을 부여해야 할 수 있습니다:

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

### **2.모터 설정(완성품은 건너뛰기 가능)**

섀시의 각 모터를 순서대로 삽입하고 아래 스크립트를 실행합니다. 먼저 로봇팔(ID 6..1)의 서보를 초기화한 후, 섀시 서보를 초기화하여 ID(ID 9..7)를 설정합니다. 이미 캘리브레이션했다면 Enter를 계속 눌러 덮어쓰며 건너뛸 수 있습니다:

```Bash
lerobot-setup-motors \
    *--robot.type*=lekiwi \
    *--robot.port*=/dev/tty.usbmodem58760431551 # <- paste here the port found at previous step
```



### 3.HuggingFace 국내 미러 설정

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

#### ①토큰 생성

https://huggingface.co/settings/tokens







#### ②토큰 기록

예를 들어, 제 것:

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### ③토큰 바인딩

```Shell
hf auth login
hf auth whoami
```



## 원격 조작

라즈베리파이에 SSH로 접속하고 환경을 활성화한 후 호스트 스크립트를 시작합니다:

```Bash
python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```



다음으로 노트북에서도 `conda activate lerobot`으로 환경을 활성화하고 아래 스크립트를 실행합니다:

```Bash
python examples/lekiwi/teleoperate.py
```

노트북 화면에 다음과 같은 인터페이스가 표시되어야 합니다: `[INFO] Connected to remote robot at tcp://172.17.133.91:5555 and video stream at tcp://172.17.133.91:5556.`이제 컨트롤 암을 움직이고 키보드의 (W, A, S, D) 키로 로봇의 전진, 좌회전, 후진, 우회전을 제어할 수 있습니다. (Z, X) 키로 좌회전 또는 우회전. (R, F) 키로 이동 로봇의 속도를 증가 또는 감소시킬 수 있습니다. 속도 모드는 세 가지이며 아래 표를 참조하세요:

다른 키보드를 사용하는 경우 [`LeKiwiClientConfig`](https://github.com/huggingface/lerobot/blob/main/src/lerobot/robots/lekiwi/config_lekiwi.py)에서 각 명령의 키 설정을 변경할 수 있습니다.

## 통신 트러블슈팅

이동 로봇 SO101 연결에 문제가 있다면 다음 단계로 진단·해결하세요.

### 1.IP 주소 설정 확인

설정 파일에 올바른 라즈베리파이 IP 주소가 설정되었는지 확인합니다. IP 주소 확인 명령(Pi의 명령줄에서):

```Bash
hostname *-I*
```

### 2.노트북/PC가 Pi에 접근 가능한지 확인

노트북에서 라즈베리파이에 ping을 시도합니다:

```Bash
ping <your_pi_ip_address>
```

ping이 실패하면:
- Pi가 켜져 있고 같은 네트워크에 연결되어 있는지 확인.
- Pi에서 SSH가 활성화되어 있는지 확인.

### 3.SSH 연결 시도

SSH로 Pi에 로그인할 수 없다면 연결이 올바르지 않을 수 있습니다. 다음 명령 사용:

```Bash
ssh <your_pi_user_name>@<your_pi_ip_address>
```

예: `ssh pi@192.168.0.106`

연결 오류 발생 시:
- Pi에서 SSH가 활성화되어 있는지 확인. 다음 명령 실행:

```Bash
sudo raspi-config
```

- 그다음 이동: **Interfacing Options -\> SSH** 활성화.

### 4.설정 파일 일치!!!

노트북/PC와 라즈베리파이의 설정 파일이 완전히 일치하는지 확인하세요.

# G. 데이터세트 기록

원격 조작에 익숙해지면 LeKiwi로 첫 데이터세트를 기록할 수 있습니다.

LeKiwi에서 프로그램을 시작하려면 SSH로 라즈베리파이에 접속하고 환경을 활성화한 후 스크립트를 시작합니다:

```Bash
python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

Hugging Face hub 기능으로 데이터세트를 업로드하려면, 이전에 로그인하지 않았다면 [Hugging Face 설정](https://huggingface.co/settings/tokens)에서 생성할 수 있는 쓰기 권한 토큰으로 로그인하세요:

```Shell
hf auth login
hf auth whoami
```

Hugging Face 저장소 이름을 변수에 저장하여 명령을 실행합니다:

```Bash
hostname *-I*
```

그다음 노트북에서 다음 명령으로 2 에피소드를 기록하고 데이터세트를 hub에 업로드합니다:

```Bash
python examples/lekiwi/record.py
```

# H. 데이터세트 시각화

데이터세트를 업로드했다면 [온라인으로 시각화](https://huggingface.co/spaces/lerobot/visualize_dataset)할 수 있습니다. 다음 명령으로 생성된 저장소 ID를 복사해 붙여넣으세요:

```Bash
echo *${HF_USER}*/my_lekiwi_dataset
```

업로드하지 않았다면 로컬에서도 시각화할 수 있습니다(브라우저 창은 `http://127.0.0.1:9090`으로 열 수 있습니다):

```Bash
python lerobot/scripts/visualize_dataset_html.py \
  --repo-id *${HF_USER}*/lekiwi_test \
  --local-files-only 1
```

### 데이터세트 시각화(건너뛰기 가능, 시도 가능)

```Bash
echo *${HF_USER}*/my_lekiwi_dataset
```

업로드한 경우 로컬에서도 다음 명령으로 시각화할 수 있습니다:

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/my_lekiwi_dataset \
```

업로드하지 않은 경우 로컬에서 다음 명령으로도 시각화할 수 있습니다:

```Python
lerobot-dataset-viz \
  --repo-id juxi/my_lekiwi_dataset \
```

여기서 `juxi`는 데이터 수집 시 커스터마이즈한 `repo_id` 이름입니다.

#### 데이터 수집 팁

데이터 기록에 익숙해지면 훈련용 더 큰 데이터세트를 만들 수 있습니다. 좋은 입문 태스크는 여러 위치의 물체를 잡아 컨테이너에 넣는 것입니다. 최소 50 에피소드, 각 위치 10 에피소드 녹화를 권장합니다. 카메라 위치를 고정하고 녹화 전체에서 일관된 잡기 동작을 유지하세요. 또한 조작하는 물체가 카메라 화면에 선명하게 보이도록 하세요. 간단한 판단 기준은 카메라 화면만 보고도 태스크를 완료할 수 있어야 한다는 것입니다.

다음 장에서는 신경망을 훈련합니다. 신뢰할 수 있는 잡기 성능을 얻은 후, 데이터 수집에 다양성을 도입할 수 있습니다(잡는 위치 추가, 다른 잡기 기술 사용, 카메라 위치 변경 등).

다양성을 너무 빨리 많이 추가하지 마세요. 결과에 영향을 줄 수 있습니다.

이 중요한 주제에 대해 더 알고 싶다면 훌륭한 데이터세트의 구성 요소에 대한 [블로그 글](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset)을 확인하세요.

#### 트러블슈팅:
