---
title: "D-Robotics RDK S100 추론"
description: "D-Robotics RDK S100에서 ACT 모델을 ONNX 내보내기·양자화 컴파일·보드 실행 순서로 배포해 7축 추론을 완성하는 방법을 안내합니다."
---

# D-Robotics RDK S100 추론

구체적인 구현 흐름은 이 링크[LeRobot ACT Policy 전체 프로세스 문서](https://horizonrobotics.feishu.cn/docx/HSr8dBdZ0oQ5OwxPQvBcsuyZnWe)를 참고하세요



## RDK S100/S100P에서 ACT 모델 엔드투엔드 배포

이 섹션에서는 D-Robotics RDK S100 시리즈 하드웨어에서 ACT 모델의 완전한 배포 사이클을 완성합니다. 전체 과정은 **모델 내보내기**, **양자화 컴파일**, **보드 단 실행**의 세 가지 핵심 단계로 나뉩니다.

**사전 설명:**

- **개발 머신 \(Host\)：**단계 1과 단계 2를 실행하는 데 사용되며, 일반적으로 모델 학습 머신입니다(어느 정도 성능이 필요하고 Docker가 설치되어 있어야 합니다).

- **보드 단 \(Edge\)：**D-Robotics RDK S100/S100P로, 단계 3을 실행합니다.

- **툴체인：**이 문서는 `rdk_LeRobot_tools` 저장소에 의존하며, 자세한 내용은 [GitHub 저장소 주소](https://github.com/D-Robotics/rdk_LeRobot_tools)를 참고하세요.

**버전 호환성 중요 안내 \(필독\)：** 현재 버전의 `rdk_LeRobot_tools` ONNX 내보내기 흐름은 **LeRobot datasets v2\.1** 버전과 완벽하게 호환됩니다. 최신 v3\.0 버전은 데이터 구조가 변경되었으므로, 이 장의 작업을 진행하기 전에 원본 `lerobot` 메인 저장소를 v2\.1 호환 특정 commit으로 전환하여 내보내기 흐름이 원활하도록 **강력히 권장**합니다. 

*권장 Commit ID:* `8cfab3882480bdde38e42d93a9752de5ed42cae2`



### 단계 1: 모델 ONNX 형식 내보내기 💻 \(개발 머신에서 진행\)

먼저, ** PyTorch로 훈련된 **모델을 중간 형식(ONNX)으로 내보내야 합니다.



#### **1\. 툴체인 저장소 가져오기** 

`lerobot` 작업 디렉터리로 이동하여 RDK 전용 툴체인을 클론합니다:

```Bash
cd lerobot

# 1. v2.1 datasets와 호환되는 안정 버전으로 전환
git checkout 8cfab3882480bdde38e42d93a9752de5ed42cae2

# 2. D-Robotics RDK 전용 툴체인 클론
git clone https://github.com/D-Robotics/rdk_LeRobot_tools.git
```



#### **2\. 내보내기 파라미터 설정** 

`rdk_LeRobot_tools/bpu_export_config.yaml` 파일을 편집하여 실제 경로에 맞게 설정을 수정합니다:

```YAML
dataset:
  root: "data/so101_pick_place" # 데이터셋의 절대 또는 상대 경로
act_path: "outputs/train/act_so101/checkpoints/050000/pretrained_model" # 원본 PyTorch 모델 가중치 경로
type: "nash-e" # 대상 하드웨어 아키텍처, RDK S100은 nash-e / S100P는 nash-m
```



#### 3\. 내보내기 스크립트 실행

```Bash
# ONNX 내보내기 (개발 머신)
python export_bpu_actpolicy.py --config bpu_export_config.yaml
```

✅ **성공 표시**：현재 디렉터리에 `bpu_export_output` 폴더가 생성되며, 그 안에 이후에 필요한 `build_all.sh` 스크립트와 양자화 캘리브레이션 데이터가 포함되어 있습니다.



### 단계 2: BPU 모델 컴파일 🐳 \(개발 머신 Docker 환경에서 진행\)

D-Robotics의 BPU 모델 양자화와 컴파일은 OpenExplorer \(OE\) 환경에 의존합니다. 환경을 격리하기 위해 Docker 사용을 권장합니다.



#### **1\.** **Docker 환경과 이미지 준비** 

개발 머신에 Docker가 설치되어 있는지 확인합니다([공식 설치 가이드](https://docs.docker.com/engine/install/)). 권장 CPU 이미지를 다운로드하고 로드합니다:

```Bash
# 다운로드한 오프라인 이미지 압축 파일 로드
sudo docker load -i ai_toolchain_ubuntu_22_s100_xxx.tar
```



#### **2\. 컴파일 컨테이너 시작**

**실수 방지 가이드**：모델 컴파일에는 큰 공유 메모리가 필요합니다. 반드시 `--shm-size=15g` 파라미터를 추가하세요. 그렇지 않으면 IPC 메모리 오류가 발생하기 쉽습니다.

개발 머신의 작업 디렉터리(방금 내보낸 폴더 포함)를 컨테이너에 마운트합니다:

```Bash
sudo docker run -it --rm \
  --network host \
  --shm-size=15g \
  -v "$(pwd)":/workspace \
  --workdir /workspace \
  <docker-image-name> /bin/bash
```

\(참고: `<docker-image-name>`을 `sudo docker images`로 확인한 실제 이미지 이름으로 교체하세요.\)



#### **3\.** **컨테이너 내부에서 컴파일 실행** 

컨테이너 내부에 진입한 후 원클릭 컴파일 스크립트를 실행합니다:

```Bash
cd /workspace/bpu_export_output
bash build_all.sh
```



#### **4\.** **컴파일 산출물 확인** 

컴파일이 완료되면 `bpu_export_output` 아래에 `bpu_output/` 폴더가 생성됩니다. 여기에는 RDK 보드에서 실행하는 데 필요한 모든 핵심 파일이 포함되어 있습니다: 

- 클릭하여 `bpu_output/` 디렉터리 구조 확인

    - `BPU_ACTPolicy_TransformerLayers.hbm` \(양자화된 모델 파일\)

    - `BPU_ACTPolicy_VisionEncoder.hbm` \(양자화된 모델 파일\)

    - `action_mean.npy` 등 데이터셋 정규화 파라미터

    - `camera1_mean.npy` 등 카메라 통계 파라미터

---

### 단계 3: 보드 배포와 추론 🤖 \(RDK S100에서 진행\)

**사전 조건 확인:**

1. RDK 보드에 `D-Robotics/lerobot` 실행 환경이 구성되어 있고 `hbm_runtime`이 설치되어 있어야 합니다.

2. `scp`, USB 메모리 등의 방법으로 이전 단계에서 생성한 `bpu_output/` 폴더 전체를 RDK 보드에 완전히 복사했습니다.

3. 기본 원격조작 구성이 완료되어, 로봇 암의 시리얼 포트, 카메라 USB 포트 및 캘리브레이션 파일 구성이 올바른지 확인합니다.



#### **1\.** **BPU 가속 추론 실행**

RDK 보드 터미널에서 툴체인 디렉터리로 이동하여 제어 스크립트를 실행합니다:

```Bash
cd rdk_LeRobot_tools

python bpu_control_robot.py \
  --bpu-act-path ../bpu_output \
  --fps 30 \
  --inference-time 60
```



---

### 🛠️ 자주 발생하는 문제 해결 \(Troubleshooting\)

실제 배포 중 문제가 발생하면 다음 목록을 참고하여 점검하세요:

- **로봇 암이 움직이지 않나요?**

    - 장치 마운트 상태 확인: 터미널에 `ls /dev/ttyACM*`를 입력하여 로봇 암에 해당하는 시리얼 포트 번호가 올바른지 확인합니다.

    - 권한 확인: `sudo`로 추론 스크립트를 실행해 보거나, 현재 사용자를 `dialout` 그룹에 추가합니다.

- **카메라 스트림 오류 / 화면 이상 / 로봇 암이 제자리에서 떨림?**

    - 카메라 인덱스(Camera Index)가 핫플러그로 인해 밀리지 않았는지 확인하고, 코드의 카메라 파라미터 설정이 실제 `/dev/video*`와 대응하는지 점검합니다.

- **개발 머신에서 컨테이너가 생성한 파일을 복사할 때 “권한이 부족합니다”라는 메시지가 나오나요?**

    - Docker 마운트 디렉터리에서 생성된 파일의 소유자는 기본적으로 root이므로, 개발 머신에서 `sudo chown -R $USER:$USER bpu_export_output`을 실행하면 해결됩니다.

