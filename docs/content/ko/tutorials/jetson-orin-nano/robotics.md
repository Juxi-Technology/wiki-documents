---
title: JetPack 7.2에서의 로보틱스 — Orin Nano에서 동작하는 것
sidebar_label: 로보틱스(현황)
slug: /tutorials/robotics
description: >-
  JetPack 7.2.1에서 Jetson Orin Nano Super 개발자 키트(8GB)의 로보틱스에 대한
  솔직한 현황 페이지 — ROS 2, Isaac ROS, Isaac Sim, LeRobot 스타일 스택,
  그리고 아직 계획에 넣지 말아야 할 것을 다룹니다.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://nvidia-isaac-ros.github.io/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/v/release-5.0/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/performance/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/getting_started/isaac_ros_buildfarm_cdn.html
    checked: 2026-09-26
  - source: https://docs.isaacsim.omniverse.nvidia.com/6.0.0/installation/requirements.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/learning/physical-ai/gr00t-e2e-workflow/latest/getting-started/prerequisites.html
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/is-ros2-jazzy-the-correct-version-to-use-with-jetpack-7-2-1-ubuntu-24-04/382439
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/Ubuntu-Install-Debs.rst
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/_Apt-Repositories.rst
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/huggingface/lerobot/main/docs/source/installation.mdx
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/huggingface/lerobot/main/pyproject.toml
    checked: 2026-09-26
  - source: https://packages.ubuntu.com/noble/python3
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx
    checked: 2026-09-26
  - source: https://www.nvidia.com/en-us/ai/build-a-claw/
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
review_owner: cheny
---

# JetPack 7.2에서의 로보틱스 — Orin Nano에서 동작하는 것

JetPack 7.2는 이 키트를 새로운 플랫폼 세대로 이끌었습니다: Ubuntu 24.04,
CUDA 13, 그리고 모든 AI 워크로드를 규정하는 8 GB 메모리 상한입니다. 로보틱스
생태계는 아직 이 변화를 따라잡는 중입니다. 오늘 동작하는 부분도 있고,
그렇지 않은 부분도 있으며, 아직 어떤 공식 페이지에서도 확인할 수 없는 부분도
있습니다.

이 페이지는 튜토리얼이 아닌 현황 페이지입니다. 여기의 모든 내용은 문서로만
확인된 것입니다 — Juxi는 이 스택들을 하드웨어에서 테스트하지 않았습니다.
읽는 로보틱스 페이지마다 날짜를 확인하십시오: 이 생태계의 여러 부분이
2026년 8월과 9월에 바뀌었습니다. 아래 다이어그램에서 오른쪽의 큰 블록이
키트에서 실행되며, Isaac Sim과 Isaac Lab은 왼쪽의 Omniverse 블록에 속하는데,
이는 별도의 호스트입니다.

![NVIDIA Jetson 소프트웨어 스택, 왼쪽에 DGX 및 Omniverse 호스트](/images/jetson-orin-nano/robotics-diagram-jetpack7.2.png)

## 현황 표(2026-09-26 확인)

| 필요한 항목 | JetPack 7.2.1 / Orin Nano(8GB)에서의 상태 | 비고 |
|---|---|---|
| **ROS 2(코어)** | ✅ 작동 | JetPack은 어떤 ROS 배포판도 설치하거나 요구하지 않습니다. ROS 2 **Jazzy**에는 공식 Ubuntu 24.04 arm64 패키지가 있습니다. NVIDIA 직원의 포럼 답변(2026-09-07)은 Jazzy를 "the recommended ROS distribution for JetPack 7.2.1"이라고 부릅니다. 포럼 답변은 공식 문서가 아닙니다. 설치 단계는 아래에 있습니다. |
| **Isaac ROS**(하드웨어 가속 ROS 2) | ⚠️ 2026년 8월 출시 — 실질적인 공백 있음 | Isaac ROS 4.6.0 릴리스 노트: "Added support for Jetson Orin", "Added support for JetPack 7.2". Orin Nano Super 8GB는 NVIDIA의 공식 벤치마크 표에 등장합니다. 하지만 워크스루에는 Orin Nano 섹션이 없고, 지원 표는 NVMe SSD를 전제로 하며, NVIDIA의 JetPack 페이지는 여전히 "출시 예정"이라고 표기합니다. 자세한 내용은 아래에 있습니다. |
| **Isaac Sim / Isaac Lab**(시뮬레이션) | ⛔ 이 키트에서는 실행되지 않음 | RTX GPU를 갖춘 x86_64 호스트가 필요합니다(최소 GeForce RTX 4080, 16 GB VRAM, 32 GB RAM). RT 코어가 없는 GPU는 지원되지 않습니다. aarch64 빌드는 DGX Spark용으로만 존재합니다. 시뮬레이션 워크플로에서 시뮬레이터는 Jetson이 아니라 x86_64 머신에서 실행됩니다. |
| **GR00T(휴머노이드 파운데이션 모델)** | ⛔ 이 키트에는 해당 없음 | GR00T 1.7 포스트 트레이닝에는 최소 48 GB VRAM의 GPU가 필요합니다. NVIDIA의 레퍼런스 워크플로는 Jetson AGX Thor를 실제 로봇의 엣지 컴퓨터로 사용합니다. 같은 워크플로가 시연 데이터를 LeRobot 형식으로 변환합니다 — 소프트웨어 방향은 맞지만 연산은 여기에 없습니다. |
| **LeRobot 스타일 Python 스택**(SO-ARM101, LeKiwi, 비전 키트) | ⚠️ 검증 필요 | Python 버전 하한은 충족합니다(Ubuntu 24.04는 Python 3.12.3을 제공하며, LeRobot은 3.12 이상을 요구합니다). 하지만 업스트림에는 공식 JetPack 7.2 경로가 없고, 문서화된 Jetson 경로는 JetPack 6.2용으로 커뮤니티가 유지 관리합니다. 확정하기 전에 사용할 스택을 정확히 테스트하십시오. |
| **DeepStream** | — 이 검토에서 확인하지 않음 | 별도 페이지에서 다룹니다 — [DeepStream 영상 분석](/ko/tutorials/jetson-orin-nano/deepstream)을 참조하십시오. 이 로보틱스 검토에서는 DeepStream 지원 매트릭스를 다시 확인하지 않았습니다. |
| **TensorRT Edge-LLM** | — 이 검토에서 확인하지 않음 | 별도 페이지에서 다룹니다 — [로컬 LLM 추론](/ko/tutorials/jetson-orin-nano/local-llm)을 참조하십시오. 로보틱스에는 주로 VLA 스타일 모델을 통해 관련됩니다. |
| **NemoClaw(에이전트 스택)** | ⚠️ 동작 — 사실상 지원 | 설치 프로그램이 Jetson(Orin 및 Thor)을 자동 감지하며, NVIDIA 사이트는 "Install OpenClaw on Your NVIDIA Jetson Orin Nano™"를 홍보합니다. 하지만 공식 플랫폼 매트릭스에는 Jetson 행이 없고, 프로젝트는 알파 단계("Early preview")입니다. 8 GB가 명시된 최소 RAM(16 GB 권장)이며, 메모리 부족 위험이 문서화되어 있습니다. [에이전트 AI](/ko/tutorials/jetson-orin-nano/agentic-ai)를 참조하십시오. |

## JetPack 7.2에서의 Isaac ROS — 공식 페이지가 오늘 말하는 것

**NVIDIA의 페이지들은 서로 모순됩니다.** JetPack 7.2.1 다운로드 페이지는
여전히 "NVIDIA Isaac™ ROS — 출시 예정"으로 기재하고 있습니다. Isaac ROS
프로젝트 페이지는 지원이 출시되었다고 말합니다. Isaac ROS 자체에 대해서는
프로젝트 페이지가 더 구체적인 출처이고 더 최신입니다:

- **Isaac ROS 4.6.0(2026-08-18)** — 릴리스 노트: "Added support for Jetson
  Orin", "Added support for JetPack 7.2". 이 조합을 갖춘 최초의 4.x
  릴리스입니다.
- **지원 플랫폼:** "The platforms defined in this table are the only
  hardware and software combinations that Isaac ROS tests and officially
  supports." Jetson 행: "Jetson Thor (T5000 and T4000) and Jetson Orin",
  JetPack 7.2, 스토리지 "128+ GB NVMe SSD". 표는 "Orin Nano"가 아니라 "Jetson
  Orin"(제품군)이라고 표기합니다.
- **벤치마크:** 성능 표에는 실제 항목이 있는 "Orin Nano Super 8GB" 전용 열이
  있습니다 — 예를 들어 AprilTag Node는 720p에서 104 fps, Mobile SAM 그래프는
  720p에서 4.80 fps입니다. 이는 Juxi의 측정값이 아니라 NVIDIA가 이
  디바이스에 대해 공개한 수치입니다. 더 무거운 워크로드는 대시("–")로
  표시됩니다: FoundationPose, Grounding DINO, 전체 SAM은 실행 가능으로
  기재되지 않았습니다.
- **Isaac ROS 5.0.0 (2026-09-21)**는 ROS 2 Lyrical Luth로 이동했습니다. 공개
  ROS 2 apt 저장소는 Ubuntu 24.04용 ROS 2 Lyrical 패키지를 제공하지
  않습니다. NVIDIA는 자체 Isaac ROS Buildfarm CDN에 이를 게시합니다. Isaac
  ROS 4.6은 ROS 2 Jazzy에 머무릅니다. 주류 Jazzy 스택을 원한다면 4.6을
  선택하십시오.

**확정하기 전에 알아야 할 공백:**

- **Orin Nano 설정 섹션 없음.** Jetson 워크스루는 Jetson AGX Thor와 Jetson
  AGX Orin만 다룹니다. Orin Nano와 관련된 유일한 링크는 전원 설정
  가이드입니다.
- **NVMe SSD가 전제됩니다.** 스토리지 열은 "128+ GB NVMe SSD"라고 표기합니다.
  이 키트는 스토리지 없이 출고되므로, microSD만 사용하는 구성은 명시된
  전제를 벗어납니다([빠른 시작](/ko/tutorials/jetson-orin-nano/quick-start) 참조).
- **버전 불일치.** 4.6 설정 페이지는 `cat /etc/nv_tegra_release`에서 "R39
  (release), REVISION: 2.0"(L4T r39.2.0)을 확인하라고 요구합니다. 이 키트는
  JetPack 7.2.1 = L4T r39.2.1로 출고됩니다. 프로덕션 로봇을 마이그레이션하기
  전에 Docker에서 검증하십시오.
- **카메라와 OpenCV.** Intel RealSense 카메라는 "supported only in Docker
  mode. Virtual Environment and Bare Metal modes are not supported." 또한
  JetPack 7.2는 OpenCV 4.8.0을 설치하지만 Isaac ROS는 4.6.0으로
  테스트되었습니다 — 해결 방법은 아래 설치 단계에 있습니다.
- **5.0의 회귀.** Isaac ROS 5.0에서 DNN 이미지 인코더의 처리량이 4.6보다
  낮을 수 있습니다. 이 노드가 중요하다면 4.6을 고려하십시오.

> **중요**: Isaac ROS가 핵심 경로에 있다면 시점을 따져 보십시오. JetPack
> 7.2에서의 지원은 실제하지만 최근(2026년 8월)이며, Orin Nano 문서는
> 빈약합니다. 이 키트는 JetPack 6.2 시대(Isaac ROS 3.2 Update 1, 2025년
> 1월)에도 이미 Isaac ROS 지원 대상이었습니다. 가장 오래 검증된 조합이
> 필요하고 첫 릴리스의 변동을 감당할 수 없는 팀이라면 JetPack 6.2 시대
> 구성에 머무르는 합리적 근거가 있습니다. 그 외에는 7.2.1로 이동하되,
> 확정하기 전에 이 키트의 Docker에서 정확한 파이프라인을 검증하십시오.

## 시뮬레이션과 트레이닝 — 다른 머신

Isaac Sim 6.0은 이 키트에서 실행할 수 없습니다. Linux x86_64 경로의 공개된
최소 사양: GeForce RTX 4080, 16 GB VRAM, 32 GB RAM, 50 GB SSD. "GPUs without
RT Cores (A100, H100) are not supported." aarch64 빌드는 "is currently only
supported on DGX Spark system." Isaac ROS 시뮬레이션 워크플로에서 "Isaac Sim
runs on a x86_64 machine providing sensor data and world information" —
Jetson은 배포 대상입니다.

로봇 학습의 무거운 쪽도 구도는 같습니다: GR00T 1.7 포스트 트레이닝에는
최소 48 GB의 VRAM이 필요하고, NVIDIA의 레퍼런스 워크플로는 Jetson AGX Thor를
실제 로봇의 엣지 컴퓨터로 사용합니다. 원칙: 시뮬레이션과 트레이닝은 PC에서,
배포와 추론은 키트에서. Isaac Sim이 Orin Nano를 고려한 이유였다면, 그
작업에는 잘못된 머신입니다.

## LeRobot과 Python 로봇 스택 — 호환성 문제

1. **Python 버전 문제는 답이 명확합니다: 3.12면 됩니다.** Ubuntu 24.04의
   시스템 Python은 3.12.3이고, LeRobot(0.6.2)은 Python 3.12 이상을
   요구합니다. 이번 업그레이드는 Python 버전 때문에 LeRobot을 막지 않습니다.
2. **하지만 업스트림에는 JetPack 7.2 경로가 없습니다.** LeRobot의 공식 설치
   페이지는 Jetson에서 기본적으로 GPU 가속 비디오 디코드가 없고(라이브러리가
   pyav로 폴백), aarch64 torchcodec wheel에는 PyTorch 2.11 이상이 필요하며,
   Jetson Docker 빌드는 **JetPack 6.2**를 대상으로 하고 커뮤니티가 유지
   관리한다고 밝힙니다. 현재 LeRobot에 JetPack 7.2의 CUDA 13용 aarch64 CUDA
   wheel이 준비되어 있다는 공식 발표는 없습니다.
3. **따라서 판정은 "검증 필요" — "지원됨"도 "고장"도 아닙니다.** 이 키트에서
   LeRobot을 전제로 설계하기 전에 정확한 스택을 테스트하십시오: 설치하고,
   작은 policy를 실행하고, 추론이 GPU를 사용하는지 확인하십시오.

> **Juxi 참고:** 저희 로봇 키트(SO-ARM101, LeKiwi, 비전 키트)는 LeRobot을
> 기반으로 합니다. JetPack 7.2.1의 이 키트에서는 업스트림과 Juxi 어느
> 쪽에서도 아직 테스트된 경로가 없습니다. 커뮤니티 유지 관리 경로의 기준
> 플랫폼은 JetPack 6.2입니다. 이 키트에서 LeRobot에 프로젝트 일정을
> 확정하기 전에 Juxi 지원팀에 문의하십시오([다운로드](/ko/tutorials/jetson-orin-nano/downloads) 참조).

## 오늘 실행되는 것

### ROS 2 Jazzy — 기반

JetPack에는 ROS가 포함되어 있지 않습니다. 동작하는 경로는 Ubuntu
24.04(arm64)용 공식 ROS 2 Jazzy deb 설치이며, ROS 2 문서에서 요약한
것입니다:

```bash
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo apt update && sudo apt install curl -y
export ROS_APT_SOURCE_VERSION=$(curl -s https://api.github.com/repos/ros-infrastructure/ros-apt-source/releases/latest | grep -F "tag_name" | awk -F'"' '{print $4}')
curl -L -o /tmp/ros2-apt-source.deb "https://github.com/ros-infrastructure/ros-apt-source/releases/download/${ROS_APT_SOURCE_VERSION}/ros2-apt-source_${ROS_APT_SOURCE_VERSION}.$(. /etc/os-release && echo ${UBUNTU_CODENAME:-${VERSION_CODENAME}})_all.deb"
sudo dpkg -i /tmp/ros2-apt-source.deb
sudo apt update
sudo apt install ros-jazzy-ros-base    # or: ros-jazzy-desktop
source /opt/ros/jazzy/setup.bash
```

### Isaac ROS 4.6 — 가속 인지가 필요할 때

NVIDIA의 apt 저장소에서 설치합니다(공식 페이지에 정확한 keyring 명령이
있습니다): 저장소
`https://isaac.download.nvidia.com/isaac-ros/release-4.6`, 채널
`noble-jetpack`; 중국 미러 `isaac.download.nvidia.cn`. 그런 다음:

```bash
sudo apt-get install isaac-ros-cli
mkdir -p ~/workspaces/isaac_ros-dev/src
echo 'export ISAAC_ROS_WS="${ISAAC_ROS_WS:-${HOME}/workspaces/isaac_ros-dev/}"' >> ~/.bashrc
```

미리 설치된 OpenCV 4.8.0을 한 번 제거하십시오(위의 공백 목록 참조). 그러면
Isaac ROS가 고정 버전인 OpenCV 4.6.0을 자동으로 설치합니다:

```bash
sudo apt-get remove -y libopencv* opencv*
```

NVIDIA는 Docker를 권장합니다: "Docker is the recommended option for most
users. It provides the highest level of isolation from your host system." 이는
RealSense 카메라 요구 사항(Docker 전용)과도 맞습니다.

### NemoClaw와 에이전트 스택

설치 프로그램은 NVIDIA Jetson 디바이스(Orin 및 Thor)를 자동 감지하고
JetPack 전용 호스트 구성을 적용합니다. 두 가지 주의 사항: 프로젝트는 알파
단계("Early preview")이고, 공식 플랫폼 매트릭스에 Jetson 행이 없으므로
지원은 사실상의 것이지 공식 주장이 아닙니다. 8 GB가 명시된 최소 RAM(16 GB
권장)이며, 약 2.4 GB의 샌드박스 이미지와 관련된 메모리 부족 위험이
문서화되어 있습니다. [에이전트 AI](/ko/tutorials/jetson-orin-nano/agentic-ai)를
참조하십시오.

## 권장 사항

- **ROS 2만 사용:** 지금은 JetPack 7.2.1과 ROS 2 Jazzy로 구축하십시오. 이
  조합은 동작합니다.
- **Isaac ROS가 핵심:** 2026년 8월부터 지원되지만 최근이고 Orin Nano 문서가
  빈약합니다. Docker에서 검증하고 NVMe를 계획하십시오. 가장 오래 검증된
  조합이 필요하다면 JetPack 6.2 시대 구성이 여전히 합리적입니다 — 어느
  쪽이든 재빌드 비용은 [마이그레이션
  가이드](/ko/tutorials/jetson-orin-nano/jetpack-6-to-7)를 참조하십시오.
- **시뮬레이션 또는 트레이닝이 필요:** 별도의 RTX PC(Isaac Sim)와 GR00T급
  작업용 Thor급 디바이스를 예산에 넣으십시오. 이 키트는 둘 다 할 수
  없습니다.
- **LeRobot 기반:** 검증이 필요합니다. 먼저 테스트하십시오. 문서화된 경로의
  기준은 JetPack 6.2입니다.
- **다음을 위해 이 키트를 구매하지 마십시오:** Isaac Sim, GR00T 포스트
  트레이닝, 또는 실시간 전체 SAM / Grounding DINO / FoundationPose급
  워크로드 — 마지막 세 가지는 NVIDIA의 이 디바이스 벤치마크 표에 실행
  가능으로 기재되지 않았습니다.

## 아직 불분명한 것

- **micro-ROS:** Jetson 전용 공식 페이지를 찾지 못했습니다(공식
  micro.ros.org URL 두 개가 오늘 404를 반환). 이 조합은 미검증으로
  취급하십시오.
- **Isaac ROS 5.0 이후의 ROS 배포판:** Jazzy를 권장한 포럼 답변은
  5.0(2026-09-21)보다 앞선 것입니다. 5.0 이후의 발표는 찾지 못했습니다.
- **JetPack 7.2에서의 LeRobot:** 공식 발표가 없습니다. 확정하기 전에 CUDA
  13용 PyTorch aarch64 wheel 제공 여부를 확인하십시오.
- **Isaac ROS와 microSD 전용 구성:** 지원 표는 NVMe를 말하지만, Orin Nano에
  대해 구체적으로 다시 명시되지는 않았습니다.
- **"Jetson Orin" 대 "Orin Nano":** 플랫폼 표는 제품군 이름을 사용하고,
  "Orin Nano Super 8GB"는 벤치마크 표에만 등장합니다. NVIDIA가 이 둘을
  별개의 지원 주장으로 취급하는지는 확인되지 않았습니다.
- **DeepStream과 TensorRT Edge-LLM:** 이 로보틱스 검토에서 다시 확인하지
  않았습니다 — 각자의 페이지를 참조하십시오.

## 출처

- [Isaac ROS — Getting Started](https://nvidia-isaac-ros.github.io/getting_started/index.html) (지원 플랫폼, Docker, ROS 2 Lyrical; 2026-09-26 확인)
- [Isaac ROS 4.6 — Getting Started](https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html) (Jazzy 조합, apt 설치, OpenCV 참고; 2026-09-26 확인)
- [Isaac ROS 5.0 — Getting Started](https://nvidia-isaac-ros.github.io/v/release-5.0/getting_started/index.html) (x86_64에서의 Isaac Sim; 2026-09-26 확인)
- [Isaac ROS — Releases](https://nvidia-isaac-ros.github.io/releases/index.html) (4.6.0 및 5.0.0 노트; RealSense와 DNN 인코더 제한; 2026-09-26 확인)
- [Isaac ROS — Performance](https://nvidia-isaac-ros.github.io/performance/index.html) (Orin Nano Super 8GB 벤치마크 열; 2026-09-26 확인)
- [Isaac ROS Buildfarm CDN](https://nvidia-isaac-ros.github.io/getting_started/isaac_ros_buildfarm_cdn.html) (Ubuntu 24.04용 ROS 2 Lyrical 패키지; 2026-09-26 확인)
- [Isaac Sim 6.0 설치 요구 사항](https://docs.isaacsim.omniverse.nvidia.com/6.0.0/installation/requirements.html) (2026-09-26 확인)
- [GR00T 엔드투엔드 워크플로 — 전제 조건](https://docs.nvidia.com/learning/physical-ai/gr00t-e2e-workflow/latest/getting-started/prerequisites.html) (2026-09-26 확인)
- [NVIDIA 개발자 포럼 — "Is ROS2 Jazzy the correct version..." (직원 답변; 공식 문서가 아닌 포럼)](https://forums.developer.nvidia.com/t/is-ros2-jazzy-the-correct-version-to-use-with-jetpack-7-2-1-ubuntu-24-04/382439) (2026-09-26 확인)
- [ROS 2 Jazzy 설치 — deb 패키지(업스트림)](https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/Ubuntu-Install-Debs.rst) (2026-09-26 확인)
- [ROS 2 Jazzy 설치 — apt 저장소(업스트림)](https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/_Apt-Repositories.rst) (2026-09-26 확인)
- [LeRobot 설치 가이드(업스트림)](https://raw.githubusercontent.com/huggingface/lerobot/main/docs/source/installation.mdx) (2026-09-26 확인)
- [LeRobot pyproject.toml(업스트림)](https://raw.githubusercontent.com/huggingface/lerobot/main/pyproject.toml) (Python 및 torchcodec 고정; 2026-09-26 확인)
- [Ubuntu Noble — python3 패키지](https://packages.ubuntu.com/noble/python3) (Python 3.12.3; 2026-09-26 확인)
- [NemoClaw — 전제 조건](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md) (2026-09-26 확인)
- [NemoClaw — 플랫폼 지원 매트릭스](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md) (알파 단계; Jetson 행 없음; 2026-09-26 확인)
- [NemoClaw — 설치 프로그램 문제 해결(Jetson 자동 감지)](https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx) (2026-09-26 확인)
- [NVIDIA — Build a Claw("Install OpenClaw on Your NVIDIA Jetson Orin Nano™")](https://www.nvidia.com/en-us/ai/build-a-claw/) (2026-09-26 확인)
- [JetPack 7.2.1 다운로드 페이지(구성 요소 매트릭스에 Isaac ROS가 "출시 예정"으로 기재)](https://developer.nvidia.com/embedded/jetpack/downloads) (2026-09-26 확인)

*상태: 2026-10-11 검토 완료. 생태계 가용성은 빠르게 변합니다 — 이 표에
의존하기 전에 링크된 NVIDIA 및 업스트림 페이지를 다시 확인하십시오. 아직
Juxi Technology가 실제 하드웨어에서 검증하지 않았습니다.*

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 이 페이지는 Juxi Technology가 게시하며 NVIDIA의 공식 발행물이 아닙니다.
