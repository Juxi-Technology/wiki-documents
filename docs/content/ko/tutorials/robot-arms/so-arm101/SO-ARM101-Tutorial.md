---
title: LeRobot 로봇팔 튜토리얼
description: "LeRobot 로봇팔 튜토리얼: SO-ARM101·SO-ARM100 공용 환경 설치와 사용법을 다루는 기초 가이드로 최신 공식 문서 링크를 함께 제공합니다."
---

# LeRobot 로봇팔 튜토리얼

> **[스토어에서 구매](https://www.juxitech.com/ko/products/so-arm101-developers-kit)**


본 튜토리얼은 12월 15일까지 업데이트되었습니다. 최신 버전의 [공식 문서](https://github.com/huggingface/lerobot/tree/main)를 따라도 됩니다. 구체적인 튜토리얼은 [이 링크](https://zihao-ai.feishu.cn/wiki/TS6swApHbinx01kHDi5cf5n5n8c)를 참조하세요. URDF 등 파일이 필요하면 [이 링크](https://github.com/TheRobotStudio/SO-ARM100)를 참조하세요. 9월 15일 구버전은 [이 링크](https://juxitech.feishu.cn/docx/DJkBdcwzooBqamxl0kgcvVUbngh?from=from_copylink)를 참조하세요. SO-ARM101과 SO-ARM100은 실행 코드가 상호 호환됩니다.

## A. 튜토리얼 설명

**Pro판 검은색 능동 암은 5V6A 전원 어댑터, 흰색 종동 암은 12V5A 전원 어댑터를 사용!**

서보 설치와 각도 캘리브레이션은 미리 완료해야 합니다. [공식 조립 튜토리얼](https://huggingface.co/docs/lerobot/so101)을 참조하세요. 본 튜토리얼에서는 다루지 않습니다!

조립 튜토리얼은 [Lerobot 로봇팔 조립 튜토리얼](https://juxitech.feishu.cn/wiki/IAhYwcDRQiShY1kH1oHcZzKined) 참조

서보가 미설정이거나 미조립이면 먼저 이 [README](https://github.com/TheRobotStudio/SO-ARM100)의 내용에 따라 진행하세요. 재료 목록, 부품 구매 링크, 3D 프린팅 부품 설명, 처음 프린팅하거나 3D 프린터가 없을 때의 조언이 포함되어 있습니다.

먼저 LeRobot 환경 설치부터 시작합시다.

## B. 환경 준비

For Ubuntu X86:

- Ubuntu 22.04
- CUDA 12+
- Python 3.10
- Torch 2.6+

For Jetson Orin:

- Jetson Jetpack 6.0+
- Python 3.10
- Torch 2.5.0a0+872d972e41

### LeRobot 환경 설치

#### 1. [Miniconda 설치](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

CUDA 버전에 따라 pytorch와 torchvision 등 환경을 설치해야 합니다.

1. Jetson:

```Bash
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh
chmod +x Miniconda3-latest-Linux-aarch64.sh
bash ~/Miniconda3-latest-Linux-aarch64.sh
source ~/.bashrc
```

또는 X86 Ubuntu 22.04:

```Bash
mkdir -p ~/miniconda3
cd miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
source ~/miniconda3/bin/activate
conda init --all
```

#### 2. 배포할 디렉터리(예: lerobot 생성)에 lerobot용 새 conda 환경을 생성하고 활성화:

> ~/miniconda3 디렉터리 내에 lerobot 프로젝트를 만들거나 가져오지 마세요

```PowerShell
conda create -y -n lerobot python=3.10
```

#### 3. 그다음 `conda` 환경 활성화(lerobot 사용 시마다 터미널을 열 때마다 필요!):

```PowerShell
conda activate lerobot
```

#### 4. LeRobot 클론:

```PowerShell
git clone https://github.com/Juxi-Technology/lerobot.git
```

최신 버전을 따라도 됩니다: https://github.com/huggingface/lerobot.git
참고: 최신 버전의 명령 코드가 다를 수 있습니다!

#### 5. 환경에 ffmpeg 설치:

`miniconda` 사용 시 환경에 `ffmpeg` 설치:

```PowerShell
conda install ffmpeg -c conda-forge
```

이렇게 하면 일반적으로 libsvtav1 인코더로 컴파일된 ffmpeg 7.X가 설치됩니다. libsvtav1 미지원 시(`ffmpeg -encoders`로 확인 가능):

【모든 플랫폼】ffmpeg 7.X 명시적 설치:
`conda install ffmpeg=7.1.1 -c conda-forge`

그래픽 의존성 없음(gdk-pixbuf, librsvg)일 때 이 명령 사용:
`conda install ffmpeg=7.1.1 -c conda-forge --no-deps`

【Linux만】ffmpeg 빌드 의존성 설치 후 libsvtav1 지원 ffmpeg를 소스에서 컴파일, `which ffmpeg`로 올바른 실행 파일 확인.

아래 오류가 발생해도 위 명령으로 해결할 수 있습니다.
![5. 환경에 ffmpeg 설치: – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/1.png)




#### 6. lerobot 디렉터리로 이동해 feetech 모터 의존성 포함 LeRobot 설치:

```PowerShell
cd ~/lerobot && pip install -e ".[feetech]"
```

Jetson Jetpack 6.0+ 장치(이 단계 전에 [이 링크 튜토리얼](https://pytorch.org/get-started/locally/)대로 Pytorch-gpu와 Torchvision 설치 확인):

```Plain Text
conda install -y -c conda-forge "opencv>=4.10.0.84"  # 通过 conda 安装 OpenCV 和其他依赖，仅适用于 Jetson Jetpack 6.0+
conda remove opencv   # 卸载 OpenCV
pip3 install opencv-python==4.10.0.84  # 使用 pip3 安装指定版本 OpenCV
conda install -y -c conda-forge ffmpeg
conda uninstall numpy
pip3 install numpy==1.26.0  # 该版本需与 torchvision 兼容
```

#### 7. Pytorch와 Torchvision 확인

pip로 lerobot 환경을 설치하면 기존 Pytorch와 Torchvision이 제거되고 CPU 버전이 설치되므로 Python에서 확인해야 합니다.

```Plain Text
import torch
print(torch.cuda.is_available())
```

출력이 False라면 [공식 튜토리얼](https://pytorch.org/)대로 Pytorch와 Torchvision을 다시 설치하세요.

[Jetson Orin의 Pytorch 비호환](https://juxitech.feishu.cn/wiki/AJWBwSbXiinQT5kM1SZc7N3Tn8d)

#### 8. intelRealSense 깊이 카메라 SDK 의존 환경 설치(intelRealSense 깊이 카메라가 있는 경우)

RealSense 깊이 카메라를 사용하려면 `lerobot/src/lerobot/`에 pyrealsense2 설치:

```Plain Text
pip install pyrealsense2
```

## C. 로봇팔 제어

### 포트 권한

전원 케이블을 연결합니다. 검은색 능동 암은 5V6A 전원 어댑터, 흰색 종동 암은 12V5A 전원 어댑터를 사용하고, 서보 드라이버 보드를 데이터 케이블로 호스트에 연결합니다

먼저 `lerobot/src/lerobot/` 디렉터리로 이동

```Plain Text
cd ~/lerobot/src/lerobot/
```

그다음 `conda` 환경 활성화(lerobot 사용 시마다 필요!):

```PowerShell
conda activate lerobot
```

#### 1. 포트 찾기 스크립트 실행

로봇팔에 해당하는 USB 포트를 찾으려면 유틸리티 스크립트를 두 번 실행합니다:

```Plain Text
lerobot-find-port
```

#### 2. 출력 예

Leader 로봇팔 포트 인식 시 예(Mac에서는 `/dev/tty.usbmodem575E0031751`, Linux에서는 `/dev/ttyACM0`일 수 있음):

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.
[...Disconnect corresponding leader or follower arm and press Enter...]
The port of this MotorsBus is /dev/ttyACM1
Reconnect the USB cable.
```

Follower 로봇팔 포트 인식 시 예(`/dev/tty.usbmodem575E0032081`, Linux에서는 `/dev/ttyACM1`일 수 있음):

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.
[...Disconnect corresponding leader or follower arm and press Enter...]
The port of this MotorsBus is /dev/ttyACM0
Reconnect the USB cable.
```

USB 커넥터를 뽑는 것을 잊지 마세요. 뽑지 않으면 인터페이스를 감지할 수 없습니다.

#### 3. 트러블슈팅

Linux에서는 다음 명령을 실행해 USB 포트 액세스 권한을 부여해야 합니다:

```PowerShell
sudo chmod 666 /dev/ttyACM0
```

```Plain Text
sudo chmod 666 /dev/ttyACM1
```

### 로봇팔 캘리브레이션

다음으로 SO-10x 로봇에 전원과 데이터 케이블을 연결해 캘리브레이션하여, 같은 물리적 위치에서 Leader 암과 Follower 암의 위치 정보가 일치하도록 합니다. 이 캘리브레이션은 중요합니다. 한 SO-10x 로봇에서 훈련한 신경망이 다른 로봇에서도 작동하도록 하기 때문입니다. 재캘리브레이션이 필요하면 `~/.cache/huggingface/lerobot/calibration/robots` 또는 `~/.cache/huggingface/lerobot/calibration/teleoperators` 아래 파일을 완전히 삭제하고 다시 캘리브레이션하세요. 그렇지 않으면 오류가 발생합니다. 캘리브레이션된 암 정보는 해당 디렉터리의 json 파일에 저장됩니다.

#### 1. Follower 로봇팔 수동 캘리브레이션

3핀 인터페이스로 6개 로봇 서보의 인터페이스를 연결하고, 샤시 서보를 서보 드라이버 보드에 연결한 뒤 아래 명령 또는 API 예제로 캘리브레이션합니다:

PC(linux)와 jetson 보드 기준, `첫 번째` USB 삽입은 `ttyACM0`, `두 번째` 삽입은 `ttyACM1`로 매핑됩니다.

코드 실행 전에 leader와 follower의 매핑 인터페이스를 확인하세요.

#### 2. 인터페이스 권한

먼저 인터페이스 권한을 부여합니다. 아래 명령 실행:

```Bash
sudo chmod 666 /dev/ttyACM*
```

#### 3. 그다음 Follower 로봇팔 캘리브레이션

아래 Python 명령으로 종동 암을 캘리브레이션:

```Python
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm
```

먼저 로봇을 모든 관절이 가동 범위 중앙에 오도록 이동하고 그대로 두세요. 다음, Enter 키를 누른 후 각 관절을 전체 가동 범위로 움직여야 합니다. 캘리브레이션 파일은 가동 범위의 중앙값, 최대값, 최소값을 기록하고 `~/.cache/huggingface/lerobot/calibration/robots` 또는 `~/.cache/huggingface/lerobot/calibration/teleoperators` 디렉터리의 json 파일에 저장됩니다.
![3. 그다음 Follower 로봇팔 캘리브레이션 – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/2.png)



![3. 그다음 Follower 로봇팔 캘리브레이션 – 2](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/3.png)




#### **4. Leader 로봇팔 캘리브레이션**

주 암의 캘리브레이션은 위와 동일합니다. 아래 명령 또는 API 예제 실행:

```Python
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm
```

로봇팔 중앙 캘리브레이션 동영상.mp4

### 원격 조작

#### **1. **간단한 원격 조작

이제 로봇을 원격 조작할 준비가 되었습니다! 이 간단한 스크립트를 실행하세요(카메라 연결 없음):

로봇과 연결된 **ID는 캘리브레이션 파일 저장에 사용됩니다. 동일한 설정으로 원격 조작, 녹화, 평가 시 동일한 **를 사용하는 것이 중요합니다.

먼저 직렬 포트에 권한 부여:

```Bash
sudo chmod 666 /dev/ttyACM*
```

원격 조작 실행:

```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm
```

원격 조작 명령은 다음 단계를 자동 수행합니다:

1. 누락된 캘리브레이션 파일 식별 후 캘리브레이션 프로그램 시작.
2. 로봇과 원격 장치 연결 후 원격 조작 시작.

#### 2. 카메라 표시 포함 원격 조작

카메라를 인스턴스화하려면 카메라 식별자가 필요합니다. 이 식별자는 PC 재부팅이나 카메라 재삽입 시 변경될 수 있습니다(OS에 따라 다름).

시스템에 연결된 카메라의 **카메라 인덱스**를 찾으려면 아래 스크립트 실행:

```Python
lerobot-find-cameras realsense # or realsense for Intel Realsense cameras
```

터미널에 관련 카메라 정보가 출력됩니다.
![2. 카메라 표시 포함 원격 조작 – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/4.png)




`~/lerobot/outputs/captured_images` 디렉터리에 각 카메라가 촬영한 이미지가 있습니다.

**macOS**에서 Intel RealSense 카메라를 사용하면 **"Error finding RealSense cameras: failed to set power state"** 오류가 발생할 수 있습니다. 같은 명령을 `sudo` 권한으로 실행하면 해결됩니다. 참고로 **macOS**에서 RealSense 카메라 사용은 불안정합니다.

이후 원격 조작 시 PC에 카메라 화면을 표시할 수 있습니다. 다음 코드만 실행하면 됩니다. 첫 데이터셋 녹화 전 설정 준비에 유용합니다.

```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true
```

`fourcc: "MJPG"` 형식 이미지는 압축된 이미지입니다. 더 높은 해상도를 시도할 수 있습니다. 물론 `YUYV` 형식도 시도할 수 있지만 해상도와 FPS가 낮아져 로봇팔 동작이 끊깁니다. 현재 `MJPG` 형식에서 `3`개 카메라로 `1920*1080` 해상도와 `30FPS`를 유지할 수 있지만, 2개 카메라를 같은 USB HUB로 호스트에 연결하는 것은 권장하지 않습니다.

카메라가 더 필요하면 `--robot.cameras` 파라미터를 변경해 추가할 수 있습니다. `index_or_path` 형식은 `python -m lerobot.find_cameras opencv` 명령 출력의 카메라 ID 마지막 숫자로 결정됩니다.

예: 카메라 추가 시:

```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true
```

RealSense 깊이 카메라를 추가하려면 먼저 `python -m lerobot.find_cameras realsense`로 Id를 얻고, 이 명령의 robot.cameras 파라미터에 있는 serial_number_or_name: "323622271780"을 자신의 깊이 카메라 Id로 교체하고 `use_depth: true`로 깊이 스트림 활성화:

![2. 카메라 표시 포함 원격 조작 – 2](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/5.png)



```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: intelrealsense, serial_number_or_name: "323622271780", width: 1280, height: 720, fps: 30, use_depth: true}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true
```

## D. 데이터 수집

### 데이터셋 기록

- 데이터셋을 로컬에 저장하려면 바로 실행:

```Python
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true \
    --dataset.repo_id=juxi/test \
    --dataset.num_episodes=5 \
    --dataset.single_task="Put the blue cube on the black box" \
    --dataset.push_to_hub=false \
    --dataset.episode_time_s=30 \
    --dataset.reset_time_s=30
```

`dateset.repo_id`와 `dataset.single_task`는 자유롭게 변경할 수 있습니다. `push_to_hub=false`면 데이터셋은 홈 디렉터리의 `~/.cache/huggingface/lerobot`에 위 `juxi/test` 폴더가 생성됩니다. [RealSense 깊이 카메라 사용 시 실행 명령을 직접 수정할 수 있습니다](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc#share-ByBqdibmroBp9kx1jjxc0MGWn4e)

- Hugging Face Hub 기능으로 데이터셋을 업로드하려면, 이전에 로그인하지 않았다면 [Hugging Face 설정](https://huggingface.co/settings/tokens)에서 생성할 수 있는 쓰기 권한 토큰으로 로그인하세요:

```Bash
hf auth login
```

Hugging Face 저장소 이름을 변수에 저장해 아래 명령 실행:

```Bash
hf auth whoami
```

5 에피소드를 기록하고 Hub에 업로드:

```Python
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true \
    --dataset.repo_id=${HF_USER}/record-test \
    --dataset.num_episodes=5 \
    --dataset.single_task="Put the blue cube on the black box" \
    --dataset.push_to_hub=true \
    --dataset.episode_time_s=30 \
    --dataset.reset_time_s=30
```

다음과 같은 데이터가 표시됩니다:

```Bash
INFO 2024-08-10 15:02:58 ol_robot.py:219 dt:33.34 (30.0hz) dtRlead: 5.06 (197.5hz) dtWfoll: 0.25 (3963.7hz) dtRfoll: 6.22 (160.7hz) dtRlaptop: 32.57 (30.7hz) dtRphone: 33.84 (29.5hz)
```

**파라미터 설명**
- episode_time_s: 각 회차 데이터 수집 시간.
- reset_time_s: 데이터 수집 간 준비 시간.
- num_episodes: 수집할 데이터 묶음 수.
- push_to_hub: HuggingFace Hub에 업로드 여부.

|키|동작|
|---|---|
|오른쪽 화살표 →|현재 에피소드 조기 종료/리셋 후 다음으로.|
|왼쪽 화살표 ←|현재 에피소드 취소 후 재녹화.|
|ESC|즉시 세션 중지 후 영상 인코딩 및 데이터셋 업로드.|

**데이터 수집 기법**
- **과제 제안**: 다양한 위치에 있는 물체를 집어 상자에 넣습니다.
- **규모**: 에피소드 50개 이상을 기록합니다(위치당 10개 에피소드).
- **일관성**:
    - 카메라를 고정하세요.
    - 동일한 집기 동작을 유지하세요.
    - 조작하는 물체가 카메라 프레임에 보이도록 하세요.
- **점진적 진행**:
    - 먼저 안정적인 집기부터 시작한 후, 변형(새로운 위치, 집기 기법, 카메라 조정)을 추가하세요.
    - 실패를 방지하기 위해 복잡도를 급격히 높이지 마세요.

💡 **경험 법칙**: 카메라 피드만을 가이드로 사용하고, 화면을 통해 피드백되는 영상 이미지만을 기준으로 로봇팔을 제어해 작업을 완료하세요.

이 중요한 주제를 더 깊이 파고들고 싶다면, 좋은 데이터셋이란 무엇인지에 관한 [블로그 글](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset)을 확인해 보세요.

- 이후 챕터에서는 신경망을 훈련합니다. 안정적인 집기 성능을 확보한 후에는 데이터 수집 과정에서 집기 위치 추가, 다양한 집기 기법, 카메라 위치 변경 등 더 많은 변형을 도입할 수 있습니다.
- 너무 많은 변경을 너무 빠르게 추가하면 결과에 악영향을 줄 수 있으므로 피하세요.
- 데이터를 로컬에 저장하려면(`--dataset.push_to_hub=false`), `--dataset.repo_id=${HF_USER}/so101_test`를 원하는 로컬 폴더 이름으로 변경하세요. 예: `--dataset.repo_id=juxi/so101_test`. 데이터는 시스템 홈 디렉터리의 `~/.cache/huggingface/lerobot`에 저장됩니다.
- 에피소드 녹화 과정 중 언제든지 오른쪽 화살표 →를 누르면 조기 종료하고 리셋 상태로 들어갑니다. 마찬가지로 리셋 과정에서도 조기 종료하고 다음 에피소드 녹화로 넘어갈 수 있습니다.
- 녹화나 리셋 도중 이전 단계로 돌아가려면 언제든지 왼쪽 화살표 ←를 눌러 현재 에피소드를 조기 종료하고 다시 녹화하세요.
- 녹화 과정 중 언제든지 ESC 키를 누르면 세션을 조기 종료하고 곧바로 영상 인코딩 및 데이터셋 업로드로 진행합니다.
- 동일한 명령을 다시 실행하면서 `--resume=true`를 추가하면 녹화를 재개할 수 있습니다. ⚠️ **중요 사항**: 재개할 때 `--dataset.num_episodes`는 추가로 녹화할 에피소드 수로 설정하세요(데이터셋의 전체 목표 에피소드 수가 아닙니다). 처음부터 녹화하려면 데이터셋 디렉터리를 수동으로 삭제하세요.
- Linux에서 데이터 녹화 중 왼쪽/오른쪽 화살표 키와 ESC 키가 작동하지 않으면 $DISPLAY 환경 변수가 설정되어 있는지 확인하세요. [pynput 제한 사항](https://pynput.readthedocs.io/en/latest/limitations.html#linux)을 참고하세요.

키를 눌러도 키보드가 반응하지 않으면 pynput 버전을 다운그레이드해야 할 수 있습니다. 예를 들어 1.6.8 버전을 설치하세요.

`pip install pynput==1.6.8`

### 데이터셋 시각화

데이터셋을 업로드했다면 [온라인으로 시각화](https://huggingface.co/spaces/lerobot/visualize_dataset)할 수 있습니다. 아래 명령으로 생성된 저장소 ID를 복사해 붙여넣으세요:

```Bash
python lerobot/scripts/visualize_dataset_html.py \
  --repo-id ${HF_USER}/so101_test \
  --local-files-only 1
```

업로드하지 않았다면 로컬에서 시각화:

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/so101_test
```

여기서 `juxi`는 데이터 수집 시 커스터마이즈한 `repo_id` 이름입니다.
![데이터셋 시각화 – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/6.png)


### 에피소드 리플레이(건너뛰기 가능, 시도 가능)

데이터셋에서 에피소드 하나를 재생하려면:

```Python
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_awesome_follower_arm \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
  --dataset.repo_id=${HF_USER}/so101_test \
  --dataset.single_task="Put the blue cube on the black box" \
  --dataset.num_episodes=1 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=30 \
  --dataset.push_to_hub=true \
  --replay=true
```

## E. 데이터셋 훈련 및 평가

### ACT

공식 튜토리얼 [ACT](https://huggingface.co/docs/lerobot/training#act) 참조

**훈련**

```Bash
lerobot-train \
  --dataset.repo_id=${HF_USER}/so101_test \
  --policy.type=act \
  --output_dir=outputs/train/act_so101_test \
  --job_name=act_so101_test \
  --policy.device=cuda \
  --wandb.enable=false \
  --steps=300000
```

**로컬 데이터셋으로 훈련하려면 **`repo_id`**가 데이터 수집 시 이름과 일치하는지 확인하고 **`--policy.push_to_hub=false`**를 추가하세요.**

```Python
lerobot-train \
  --dataset.repo_id=juxi/test \
  --policy.type=act \
  --output_dir=outputs/train/act_so101_test \
  --job_name=act_so101_test \
  --policy.device=cuda \
  --wandb.enable=false \
  --policy.push_to_hub=false\
  --steps=300000
```

명령 설명
- **데이터셋 지정**: `--dataset.repo_id=${HF_USER}/so101_test` 파라미터로 데이터셋을 지정했습니다.
- **훈련 스텝 수**: `--steps=300000`으로 훈련 스텝 수를 변경. 알고리즘 기본값은 800000. 작업 난이도에 따라 훈련 시 loss를 관찰해 조정하세요.
- **정책 유형**: `policy.type=act`로 정책 지정. [act,diffusion,pi0,pi0fast,pi0.5,sac,smolvla] 등으로 변경 가능. `configuration_act.py`에서 설정을 로드합니다. 중요: 이 정책은 로봇(예: `laptop`, `phone`)의 모터 상태, 모터 동작, 카메라 수에 자동 적응합니다. 이 정보는 데이터셋에 저장되어 있습니다.
- **장치 선택**: Nvidia GPU에서 훈련하므로 `policy.device=cuda`를 지정했지만, Apple Silicon에서는 `policy.device=mps`를 사용할 수 있습니다.
- **시각화 도구**: `wandb.enable=true`로 [Weights and Biases](https://docs.wandb.ai/quickstart) 훈련 그래프 시각화 사용 가능. 선택 사항이지만 사용 시 `wandb login`으로 로그인했는지 확인하세요.

아래 오류 발생 시:
![ACT – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/7.png)




다음 명령으로 해결:

```Bash
pip install datasets==2.19
```

훈련은 몇 시간 걸릴 수 있습니다. 훈련 결과 가중치 파일은 `outputs/train/act_so101_test/checkpoints` 디렉터리에 있습니다.

특정 훈련 결과 가중치 파일에서 훈련을 재개하려면, `act_so101_test` 정책의 마지막 훈련 결과 가중치 파일에서 재개하는 예:

```Bash
lerobot-train \
  --config_path=outputs/train/act_so101_test/checkpoints/last/pretrained_model/train_config.json \
  --resume=true
```

**평가**

[`lerobot/record.py`](https://github.com/huggingface/lerobot/blob/main/lerobot/record.py)의 `record` 기능을 사용할 수 있지만 정책 훈련 결과 가중치 파일을 입력으로 전달해야 합니다. 예: 10회 평가 에피소드 기록 명령:

```Python
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --robot.id=my_awesome_follower_arm \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM1 \
  --teleop.id=my_awesome_leader_arm \
  --display_data=false \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.single_task="Put the blue cube on the black box" \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=30 \
  --dataset.num_episodes=5 \
  --policy.path=outputs/train/act_so101_test/checkpoints/last/pretrained_model
  --dataset.push_to_hub=false
```

1. `--policy.path` 파라미터는 정책 훈련 결과 가중치 파일 경로를 나타냅니다(예: `outputs/train/act_so101_test/checkpoints/last/pretrained_model`). 모델 가중치 파일을 Hub에 업로드했다면 모델 저장소(예: `$\{HF_USER\}/act_so101_test`)도 사용 가능.
2. 데이터셋 이름 `dataset.repo_id`가 `eval_`로 시작하면 평가 시 평가용 영상과 데이터가 별도 녹화되어 eval_로 시작하는 폴더에 저장됩니다(예: `juxi/eval_test123`).
3. 평가 단계에서 `File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'`가 나오면 `eval_`로 시작하는 폴더를 삭제하고 다시 실행하세요.
4. `mean is infinity. You should either initialize with stats as an argument or use a pretrained model`가 나오면 `--robot.cameras` 파라미터의 front, side 등 키워드가 데이터 수집 시와 정확히 일치하는지 확인하세요.

### Smolvla

공식 튜토리얼 [SmolVLA](https://huggingface.co/docs/lerobot/smolvla) 참조

```Bash
pip install -e ".[smolvla]"
```

**훈련**

```Bash
lerobot-train \
  --policy.path=lerobot/smolvla_base \
  --dataset.repo_id=${HF_USER}/mydataset \
  --batch_size=64 \
  --steps=20000 \
  --output_dir=outputs/train/my_smolvla \
  --job_name=my_smolvla_training \
  --policy.device=cuda \
  --wandb.enable=true
```

**검증**

```Bash
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_awesome_follower_arm \ # <- Use your robot id
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --dataset.single_task="Put the blue cube on the black box" \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=30 \
  --dataset.num_episodes=5 \
  # <- Teleop optional if you want to teleoperate in between episodes \
  # --teleop.type=so101_leader \
  # --teleop.port=/dev/ttyACM0 \
  # --teleop.id=my_awesome_leader_arm \
  --policy.path=HF_USER/FINETUNE_MODEL_NAME # <- Use your fine-tuned model
```

### Pi0

공식 튜토리얼 [Pi0](https://huggingface.co/docs/lerobot/pi0) 참조

```Bash
pip install -e ".[pi]"
```

**훈련**

```Bash
lerobot-train \
  --policy.type=pi0 \
  --dataset.repo_id=juxi/eval_test123 \
  --job_name=pi0_training \
  --output_dir=outputs/pi0_training \
  --policy.pretrained_path=lerobot/pi0_base \
  --policy.compile_model=true \
  --policy.gradient_checkpointing=true \
  --policy.dtype=bfloat16 \
  --steps=20000 \
  --policy.device=cuda \
  --batch_size=32 \
  --wandb.enable=false
```

**검증**

```Bash
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --robot.id=my_awesome_follower_arm \
  --display_data=false \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.single_task="Put the blue cube on the black box" \
  --policy.path=outputs/pi0_training/checkpoints/last/pretrained_model
```

### Pi0.5

공식 튜토리얼 [Pi0.5](https://huggingface.co/docs/lerobot/pi05) 참조

```Bash
pip install -e ".[pi]"
```

**훈련**

```Bash
lerobot-train \
    --dataset.repo_id=juxi/eval_test123 \
    --policy.type=pi05 \
    --output_dir=outputs/pi05_training \
    --job_name=pi05_training \
    --policy.pretrained_path=lerobot/pi05_base \
    --policy.compile_model=true \
    --policy.gradient_checkpointing=true \
    --wandb.enable=false \
    --policy.dtype=bfloat16 \
    --steps=3000 \
    --policy.device=cuda \
    --batch_size=32
```

**검증**

```Bash
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --robot.id=my_awesome_follower_arm \
  --display_data=false \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.single_task="Put the blue cube on the black box" \
  --policy.path=outputs/pi05_training/checkpoints/last/pretrained_model
```

### GR00T N1.5

공식 튜토리얼 [GR00T](https://huggingface.co/docs/lerobot/gr00t) 참조

훈련은 Pi0과 동일하며 정책 유형을 `gr00t`로 변경합니다.

## F. 클라우드 서버 훈련 배포 및 모델 내보내기

#### **1.「AI 시장」을 클릭해 필요한 GPU 선택, 가능한 한 멀티코어 선택**
![1.「AI 시장」을 클릭해 필요한 GPU 선택, 가능한 한 멀티코어 선택 – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/8.png)


#### **2.「사용량제」선택, 기본 이미지「Miniconda/conda3/3.8(ubuntu20.04)/11.8」선택,「즉시 생성」클릭**
![2.「사용량제」선택, 기본 이미지「Miniconda/conda3/3.8ubuntu20.04/11.8」선택,「즉시 생성」클릭 – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/9.png)


#### **3.「JupyterLab」클릭해 제어 화면 진입, 터미널 열기**
![3.「JupyterLab」클릭해 제어 화면 진입, 터미널 열기 – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/10.png)


#### **4.conda 환경 초기화**

```Plain Text
conda env list
```

```Plain Text
conda activate base
```

```Plain Text
conda init
```
![4.conda 환경 초기화 – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/11.png)


#### **5.이 터미널 닫고 새 터미널 열기**

https://www.autodl.com/docs/network_turbo/ 참조

```Plain Text
source /etc/network_turbo
```
![5.이 터미널 닫고 새 터미널 열기 – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/12.png)




#### **6.lerobot 환경 생성**

```PowerShell
conda create -y -n lerobot python=3.10
```

```PowerShell
conda activate lerobot
```

```PowerShell
git clone https://github.com/Juxi-Technology/lerobot.git
```

최신 버전 가능: https://github.com/huggingface/lerobot.git
참고: 최신 버전 명령 코드가 다를 수 있습니다!

```PowerShell
conda install ffmpeg -c conda-forge
```
![6.lerobot 환경 생성 – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/13.png)


#### **7.src 디렉터리의 lerobot에 들어가 feetech 모터 의존성 포함 LeRobot 설치:**

```PowerShell
cd ~/lerobot && pip install -e ".[feetech]"
```

#### **8.데이터셋을 클라우드 서버로 가져오기**

두 가지 경우가 있습니다. 하나는 **데이터 수집 시 이미 huggingface 데이터베이스에 업로드한 경우**, 다른 하나는 아닌 경우입니다.

**①데이터 수집 시 huggingface 데이터베이스에 업로드했다면 huggingface 데이터베이스에서 얻은 key로 접근**



```Plain Text
huggingface-cli login --token ${HUGGINGFACE_TOKEN} --add-to-git-credential
```

```Plain Text
HF_USER=$(huggingface-cli whoami | head -n 1)
```

```Plain Text
echo $HF_USER
```
![8.데이터셋을 클라우드 서버로 가져오기 – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/14.png)




```Plain Text
export HYDRA_FULL_ERROR=1
```

**②FileZilla로 로컬 데이터셋 업로드.**https://www.autodl.com/docs/filezilla/ 참조

Linux 가장 간단한 설치 방법:

```Python
sudo apt install filezilla
```

```Python
filezilla
```

filezilla를 열고「파일」클릭 후「사이트 관리자」선택,「새 사이트」생성,「SFTP 프로토콜」선택
![8.데이터셋을 클라우드 서버로 가져오기 – 2](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/15.png)



![8.데이터셋을 클라우드 서버로 가져오기 – 3](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/16.png)




AutoDL AI 클라우드로 돌아가「로그인 명령」을 복사해 보기 쉬운 곳에 붙여넣고, 해당 정보를 복사 입력하고「연결」클릭
![8.데이터셋을 클라우드 서버로 가져오기 – 4](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/17.png)



![8.데이터셋을 클라우드 서버로 가져오기 – 5](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/18.png)



![8.데이터셋을 클라우드 서버로 가져오기 – 6](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/19.png)



![8.데이터셋을 클라우드 서버로 가져오기 – 7](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/20.png)



![8.데이터셋을 클라우드 서버로 가져오기 – 8](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/21.png)




클라우드 서버의 lerobot 디렉터리에 data 폴더 생성
![8.데이터셋을 클라우드 서버로 가져오기 – 9](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/22.png)




데이터셋 폴더를 오른쪽으로 끌어 전송하고 완료를 기다림
![8.데이터셋을 클라우드 서버로 가져오기 – 10](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/23.png)




#### 9.데이터셋 훈련

본 튜토리얼 [E.데이터셋 훈련 및 평가]를 참조해 클라우드 서버에서 훈련 명령 실행

#### 10.모델 파일 내보내기

훈련 완료 후 해당 train 디렉터리의 훈련 모델을 내보냅니다
![10.모델 파일 내보내기 – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/24.png)




## G. 자주 묻는 질문

본 문서 튜토리얼을 사용한다면 이 문서가 추천하는 github 저장소 https://github.com/Juxi-Technology/lerobot.git 를 git clone 하세요.

이 문서가 추천하는 저장소는 검증된 안정 버전입니다. Lerobot 공식 저장소는 실시간 업데이트되는 최신 버전으로 예상치 못한 문제(데이터셋 버전 차이, 명령 차이 등)가 발생할 수 있습니다.

- [RealSense 깊이 카메라 사용 시 직접 참고해 실행 명령을 수정하세요](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc#share-ByBqdibmroBp9kx1jjxc0MGWn4e)
- Jetson 장치에서 평가 명령 실행 후 에피소드 수와 시간을 설정하지 않고 ctrl+z로 프로세스를 중단하면 로봇팔과 카메라가 끊어지고, 재연결 시 모든 포트가 변경됩니다.

명령에 평가 에피소드 수와 시간 파라미터를 추가하세요.

예:

```Python
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --robot.id=my_awesome_follower_arm \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM1 \
  --teleop.id=my_awesome_leader_arm \
  --display_data=false \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.single_task="Put the blue cube on the black box" \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=30 \
  --dataset.num_episodes=5 \
  --policy.path=outputs/train/act_so101_test/checkpoints/last/pretrained_model
  --dataset.push_to_hub=false
```

- 서보 ID 캘리브레이션 시 다음 오류 발생:

```Bash
`Motor 'gripper' was not found, Make sure it is connected`
```

통신선이 서보에 올바르게 연결되었는지, 전원 전압이 올바른지 잘 확인하세요.

- 다음 오류 발생:

```Bash
Could not connect on port "/dev/ttyACM0"
```

`ls /dev/ttyACM*`로 ACM0이 존재하는데 연결되지 않으면 직렬 포트 권한을 잊은 것일 수 있습니다. 터미널에서 `sudo chmod 666 /dev/ttyACM*` 입력.

- 다음 오류 발생:

```Bash
No valid stream found in input file. Is -1 of the desired media type?
```
![G. 자주 묻는 질문 – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/25.png)


ffmpeg7.1.1 설치: `conda install ffmpeg=7.1.1 -c conda-forge`.



- 다음 오류 발생:

```Bash
ConnectionError: Failed to sync read 'Present_Position' on ids=[1,2,3,4,5,6] after 1 tries. [TxRxResult] There is no status packet!
```

해당 포트 번호의 로봇팔이 전원에 연결되었는지, 버스 서보 데이터선이 느슨하거나 빠졌는지 확인하세요. 어느 서보의 램프가 꺼졌는지로 어느 서보의 선이 느슨한지 알 수 있습니다.

- 로봇팔 캘리브레이션 시 다음 오류 발생:

```Bash
Magnitude 30841 exceeds 2047 (max for sign_bit_index=11)
```

로봇팔 전원을 껐다가 다시 켜고 캘리브레이션을 재시도하세요. 캘리브레이션 중 MAX 각도가 수만에 도달해도 이 방법을 사용할 수 있습니다. 안 되면 해당 서보를 재캘리브레이션(중앙 캘리브레이션과 ID 쓰기)해야 합니다.

- 평가 단계에서 다음 오류 발생:

```Bash
File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'
```

`eval_`로 시작하는 폴더를 삭제하고 다시 실행하세요.

- 평가 단계에서 다음 오류 발생:

```Bash
`mean` is infinity. You should either initialize with `stats` as an argument or use a pretrained model
```

--robot.cameras 파라미터의 front, side 등 키워드가 데이터 수집 시와 정확히 일치하는지 확인하세요.

## Windows에서 서보 찾기(Feetech 서보 상위 프로그램 디버깅 소프트웨어)

디버깅을 위해 모든 Windows PC에서 USB 연결로 서보를 프로그래밍, 디버깅 또는 테스트할 수 있습니다. 이를 위해 [Feetech 소프트웨어](https://www.feetechrc.com/software.html)를 다운로드하세요. Ubuntu 시스템에서는 [FT_SCServo_Debug_Qt 도구](https://github.com/Kotakku/FT_SCServo_Debug_Qt)를 사용할 수 있습니다.

fddebug-master.zip

포트 번호를 선택하고, 보드레이트를 1000000으로 설정한 뒤 열고 "Search"를 클릭합니다

![Windows에서 서보 찾기Feetech 서보 상위 프로그램 디버깅 소프트웨어 – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/26.png)

## ROS2 시뮬레이션 제어(독립적으로 구현 가능)

https://github.com/holmsslk/so-arm-moveit-hardware

## 웹에서 서보 ID 설정 및 중앙값 캘리브레이션

https://bambot.org/feetech.js?lang=zh

1. 서보 모델에 따라 0 또는 1을 입력한 후 "Connect"를 클릭합니다.

![웹에서 서보 ID 설정 및 중앙값 캘리브레이션 – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/27.png)

2. ID 1~6 서보를 스캔하면, 스캔 결과의 FOUND를 통해 해당 ID 서보를 확인할 수 있습니다. 예: 사진의 서보 ID 1이 스캔되었습니다.

![웹에서 서보 ID 설정 및 중앙값 캘리브레이션 – 2](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/28.png)

3. ID 설정 및 중앙값 캘리브레이션

① 현재 서보 ID 입력란에는 스캔된 서보의 ID를 입력합니다

② "ID 관리"에 숫자를 입력하고 "Change ID"를 클릭하여 ID를 설정합니다

③ 중앙값 캘리브레이션(STS3215 서보의 중앙값은 2047, SCS0009 서보는 511)

STS 서보: "Position Control"에 2047을 입력하고 "Set" 클릭

SCS 서보: "Position Control"에 511을 입력하고 "Set" 클릭.

![웹에서 서보 ID 설정 및 중앙값 캘리브레이션 – 3](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/29.png)

<RelatedProducts slugs="so-arm101,robot-vision-kit,tpu-flexible-gripper" />
