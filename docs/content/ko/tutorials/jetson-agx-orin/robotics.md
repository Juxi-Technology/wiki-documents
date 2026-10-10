---
title: JetPack 7.2에서의 로보틱스 — 현재 작동하는 것
sidebar_label: 로보틱스(현황)
slug: /tutorials/robotics
description: >-
  JetPack 7.2를 사용하는 AGX Orin 개발자 키트에서의 로보틱스 개발을 위한
  솔직한 현황 페이지 — ROS 2, Isaac ROS 제공 여부, 로봇 학습 스택, 그리고
  확정하기 전에 무엇을 확인해야 하는지 다룹니다.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
    note: still lists Isaac ROS as "coming soon"; see the disagreement note below
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-24
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/getting_started/index.html
    checked: 2026-09-26
review_owner: cheny
---

# JetPack 7.2에서의 로보틱스 — 현재 작동하는 것

JetPack 7.2는 Orin을 새로운 플랫폼 세대(Ubuntu 24.04, 커널 6.8, CUDA 13)로
이끌었습니다. 로보틱스는 혼재된 상황입니다: 핵심 요소(ROS 2, Isaac ROS)는 이제
이 플랫폼에서 자리를 잡았지만, 주변 스택의 일부는 아직 안정화되는 중입니다 —
그래서 이 페이지는 의도적으로 튜토리얼이 아닌 현황 페이지입니다.
아키텍처를 확정하기 전에 확인하십시오.

## 현황 표(2026-09-24 확인; Isaac ROS 행은 2026-09-26 재확인)

| 필요한 항목 | JetPack 7.2 / AGX Orin에서의 상태 | 비고 |
|---|---|---|
| **ROS 2(코어)** | ✅ 작동 | Ubuntu 24.04는 ROS 2 **Jazzy**의 대상 플랫폼입니다. [ROS 2 설치 문서](https://docs.ros.org/en/jazzy/Installation.html)에 따라 설치하십시오. Docker 기반 ROS 2도 선택지입니다. |
| **Isaac ROS**(하드웨어 가속 ROS 2 패키지) | ✅ **Isaac ROS 4.6.0부터 지원**(2026-08-18) | Jetson Orin에서 JetPack 7.2용으로 릴리스되었으며, 공식 AGX Orin 설정 워크스루가 제공됩니다. 실제로 결정해야 할 것은 ROS 2 배포판입니다: **Jazzy 기반의 4.6.x**와 **Lyrical 기반의 5.0** — [JetPack 7.2에서의 Isaac ROS](#jetpack-7-2에서의-isaac-ros) 참조. |
| **로컬 LLM / VLM / VLA 모델** | ✅ 작동 | TensorRT Edge-LLM은 JP7.2에서 Orin을 공식 지원하며 **비전-언어-액션** 예제도 포함합니다 — [로컬 LLM 추론](/ko/tutorials/jetson-agx-orin/local-llm) 참조. |
| **다중 카메라 비디오 파이프라인** | ✅ 작동 | DeepStream 9.1이 JP7.2에 포함되어 있습니다 — [DeepStream 비디오 분석](/ko/tutorials/jetson-agx-orin/deepstream) 참조. |
| **에이전틱 동작 / 오케스트레이션** | ✅ 작동 | NemoClaw + Jetson 에이전트 스킬 — [에이전틱 AI](/ko/tutorials/jetson-agx-orin/agentic-ai) 참조. |
| **로봇 학습 스택(LeRobot 스타일 Python 프레임워크)** | ⚠️ 확정 전 검증 필요 | 이러한 스택은 Python 비중이 높습니다. Ubuntu 24.04는 Python 3.12로 전환했고 일부 의존성은 뒤처질 수 있습니다. 이를 전제로 설계하기 전에 JP7.2에서 해당 스택을 테스트하십시오 — 그리고 **당사가 이를 하드웨어에서 검증하지 않았음**을 유의하십시오. |
| **GR00T(휴머노이드 파운데이션 모델)** | ⚠️ 공식 소스 확인 | 플랫폼 지원 여부는 NVIDIA 공식 Isaac GR00T 저장소와 발표를 따르십시오. 파트너가 게시한 워크스루에서는 AGX Orin + JP7.2에서 전체 가중치 TensorRT 배포를 보고합니다 *(제3자 정보, 당사 미검증)*. |
| **커스텀 캐리어 보드 / BSP 작업** | ✅ 새 도구 | JetPack 7.2의 **Jetson Linux 커스터마이징 에이전트 스킬**은 BSP 브링업 작업을 자동화합니다 — [에이전트 스킬 저장소](https://github.com/jetson-bsp-skills) 참조. |

## JetPack 7.2에서의 Isaac ROS

"출시 예정" 시대는 끝났습니다. Isaac ROS **4.6.0** 릴리스(2026-08-18)가
**Jetson Orin**과 **JetPack 7.2** 지원을 추가했으며, 지원 플랫폼 표는 *Jetson
Orin*을 *JetPack 7.2*(128+ GB NVMe SSD)와 함께 표시합니다. NVIDIA는 이 조합을
위한 전용 **Jetson AGX Orin** 빠른 시작 및 Docker 설정 워크스루를 게시합니다 —
이 키트는 부차적인 대상이 아니라 정식 지원 대상입니다.

실제로 중요한 결정은 어떤 **ROS 2 배포판**을 채택하느냐입니다:

| | Isaac ROS **4.6.x** | Isaac ROS **5.0** |
|---|---|---|
| 릴리스 | 2026-08-18 | 2026-09-21 |
| ROS 2 배포판 | **Jazzy** — Ubuntu 24.04의 표준 릴리스 | **Lyrical Luth** — NVIDIA가 ROS 2 Noble 패키지를 직접 빌드해 자체 buildfarm CDN에서 제공 |
| NITROS 패키지 | 있음 | **제거**되고 `rosidl::Buffer` 기반으로 네이티브 재구축됨; NITROS API나 타입을 직접 호출하는 코드에는 소스 수준 마이그레이션이 필요합니다 |
| Isaac Sim 조합 | 6.0(5.0/5.1은 레거시로 계속 지원) | 6.0 |

- 처음 시작하며 주류 경로를 원한다면: **Jazzy 기반의 4.6.x**를 선택하면 표준 ROS 2
  릴리스에 머무를 수 있습니다. **5.0**은 NVIDIA가 향하는 방향이며 Lyrical
  생태계를 가져옵니다 — 기존 노드 코드를 업그레이드하기 전에
  [5.0.0 릴리스 노트](https://nvidia-isaac-ros.github.io/releases/index.html)에
  링크된 NITROS → `rosidl::Buffer` 마이그레이션 지침을 먼저 읽으십시오.
- **이 버전들의 Orin 관련 알려진 제약:** RealSense 카메라는 **Docker 모드에서만**
  작동합니다; `isaac_ros_stereo_image_proc`에서 RGB8/BGR8 입력으로 AGX Orin에
  `backend:=JETSON`을 선택하면 VPI 오류로 노드가 중단될 수 있습니다 — 기본값인
  `backend:=CUDA`를 유지하십시오; Debian 패키지로 설치한 Teleop은 Orin에서
  `ISAAC_TELEOP_CLOUDXR_EXP=0`이 필요합니다; 그리고 5.0의
  `isaac_ros_dnn_image_encoder` 전처리는 AGX Orin에서 4.6보다 느립니다 — 이
  노드가 그래프에서 병목이라면 4.6을 선호하십시오.
- **OpenCV:** JetPack 7.2는 OpenCV **4.8.0**을 제공하는 반면, Isaac ROS는
  **4.6.0**을 기대합니다. 시스템 패키지를 제거하면
  (`sudo apt-get remove -y libopencv* opencv*`) Isaac ROS 패키지가 자체 고정
  버전을 설치합니다.

### NVIDIA 자체 페이지가 서로 어긋나는 부분

NVIDIA의 [JetPack 다운로드 페이지](https://developer.nvidia.com/embedded/jetpack/downloads)는
이 릴리스에 대해 여전히 Isaac ROS를 **"출시 예정"**으로 표시하는 반면, Isaac
ROS 릴리스 노트는 4.6.0부터 지원한다고 밝힙니다. 두 페이지는 아직 정합되지
않았습니다 — Isaac ROS는 JetPack과 독립적으로 릴리스되며, JetPack 페이지의
구성 요소 표는 JetPack에 *함께* 제공되는 항목을 추적합니다. Isaac ROS 문서가
가리키는 apt 저장소가 지원 조합의 확실한 증거입니다:
`…/isaac-ros/release-4.6 noble-jetpack` — *noble*은 Ubuntu 24.04, *jetpack*은
JetPack 빌드를 뜻합니다. 두 페이지가 어긋날 때는
[Isaac ROS 릴리스 노트](https://nvidia-isaac-ros.github.io/releases/index.html)를
기준이 되는 출처로 취급하고, 어느 쪽을 기준으로 설계하든 먼저 자체 환경에서
검증하십시오.

## 권장 사항

- **로보틱스 의존성이 없는 신규 프로젝트:** JetPack 7.2 기반으로 구축하십시오 —
  Ubuntu 24.04 LTS 지원, CUDA 13, DeepStream 9.1, 온디바이스 LLM, 에이전트
  도구를 사용할 수 있습니다.
- **Isaac ROS를 사용하는 프로젝트:** JetPack 7.2가 다시 지원 대상입니다.
  4.6.x(Jazzy)와 5.0(Lyrical) 중 하나를 신중하게 선택하고, OpenCV 교체와
  Docker 모드 전용 RealSense 지원에 대비한 계획을 세우십시오. 검증된 스택으로
  JetPack 6.x에서 프로젝트를 진행하는 중이라면 강제로 이전할 필요는 없습니다 —
  Isaac ROS 버전 선택이 확정되면 마이그레이션하십시오(당사의
  [마이그레이션 가이드](/ko/tutorials/jetson-agx-orin/jetpack-6-to-7)가
  재빌드 작업을 다룹니다).
- **하나의 키트, 여러 모듈:** 개발자 키트는 재플래싱으로 다른 Jetson Orin
  모듈을 에뮬레이션할 수 있습니다 — 양산 부품을 선택하기 전에 모듈 라인업
  전반에서 로봇 워크로드를 검증할 때 유용합니다
  ([제품 개요](/ko/tutorials/jetson-agx-orin/overview)).

## 출처

- [Isaac ROS 릴리스 — 4.6.0(2026-08-18) 및 5.0.0(2026-09-21) 릴리스 노트](https://nvidia-isaac-ros.github.io/releases/index.html) (2026-09-26 확인)
- [Isaac ROS 4.6 — 시작하기: 지원 플랫폼, Jetson AGX Orin 워크스루, apt 설치](https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html) (2026-09-26 확인)
- [Isaac ROS 5.0 — 시작하기: 지원 플랫폼, Lyrical buildfarm CDN](https://nvidia-isaac-ros.github.io/getting_started/index.html) (2026-09-26 확인)
- [JetPack 7.2.1 다운로드 페이지 — 구성 요소 목록](https://developer.nvidia.com/embedded/jetpack/downloads) — 오래된 Isaac ROS "출시 예정" 행이 여전히 남아 있습니다 (2026-09-26 확인)
- [Jetson AGX Orin Developer Kit 사용자 가이드 — 소개](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (모듈 에뮬레이션; 2026-09-24 확인)
- [ROS 2 Jazzy 설치 문서](https://docs.ros.org/en/jazzy/Installation.html)

*상태: 2026-10-11 검토 완료. 생태계 가용성은 빠르게 변합니다 — 이 표에
의존하기 전에 링크된 NVIDIA 페이지를 다시 확인하십시오. 아직 Juxi Technology가
실제 하드웨어에서 검증하지 않았습니다.*

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 본 페이지는 Juxi
Technology가 게시한 것으로, NVIDIA의 공식 발행물이 아닙니다.
