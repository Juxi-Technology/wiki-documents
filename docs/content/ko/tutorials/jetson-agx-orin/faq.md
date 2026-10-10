---
title: FAQ
sidebar_label: FAQ
slug: /support/faq
description: >-
  NVIDIA Jetson AGX Orin 개발자 키트(64GB)에 관한 자주 묻는 질문 — 박스 구성품,
  설정, 디스플레이와 전원, 소프트웨어, 지원을 다룹니다.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-23
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: CUDA 13.2.2 / component versions per the nvidia-jetpack 7.2.1 dependency chain
review_owner: cheny
---

# FAQ

## 설정

**박스에는 무엇이 들어 있나요?**
Jetson AGX Orin 모듈과 레퍼런스 캐리어 보드, Wi-Fi 모듈, USB Type-C
전원 어댑터, USB Type-C to USB Type-A 케이블이 포함되어 있습니다. 모니터
(DisplayPort), 키보드/마우스, 그리고 선택적으로 이더넷 케이블은 직접
준비해야 합니다 — [빠른 시작](/ko/tutorials/jetson-agx-orin/quick-start)을
참조하십시오.

**키트에 운영 체제가 포함되어 있나요?**
예 — eMMC가 사전 플래싱되어 있어 키트가 곧바로 Ubuntu 데스크톱으로
부팅됩니다. 구형 L4T 버전으로 출하될 수 있으며, 권장 업데이트 경로는
Jetson ISO입니다(호스트 PC 불필요). [빠른 시작](/ko/tutorials/jetson-agx-orin/quick-start)을
참조하십시오.

**설정에 별도의 PC가 필요한가요?**
아니요, 권장 경로에서는 필요하지 않습니다 — Jetson ISO는 USB 스틱에서
설치합니다. 호스트 PC(Ubuntu)는 대체 설치 방식(SDK Manager / 플래시
스크립트)이나 헤드리스 최초 설정에만 필요합니다.
[플래싱 및 업데이트](/ko/tutorials/jetson-agx-orin/flashing-and-updates)를
참조하십시오.

**현재 소프트웨어 버전은 무엇인가요?**
JetPack **7.2.1**(Jetson Linux **39.2.1**, Ubuntu 24.04, CUDA 13.2.2,
TensorRT 10.16.2)입니다. 키트가 실행 중인 버전은
[시스템 확인](/ko/tutorials/jetson-agx-orin/verify-your-system)에서
확인하십시오.

## 디스플레이 및 전원

**HDMI 모니터를 연결할 수 있나요?**
**액티브** DisplayPort→HDMI 어댑터나 케이블을 통해서만 가능합니다 —
키트에는 DisplayPort 출력만 있습니다(HDMI 포트 없음, USB-C를 통한 DP
출력 없음). MST는 최대 2대의 디스플레이까지 지원됩니다. 자세한 내용:
[인터페이스 및 하드웨어 레이아웃](/ko/tutorials/jetson-agx-orin/interfaces).

**키트에 전원을 어떻게 공급하나요?**
동봉된 USB-C 전원 어댑터를 DC 잭(J24) 위의 USB-C 포트에 연결하여
사용하십시오. 배럴 잭(J41)을 통해 직접 전원을 공급하는 경우: 외경
5.5 mm, 내경 2.5 mm, 센터 플러스.

## 키트 사용

**이 개발자 키트로 다른 Jetson 모듈을 에뮬레이션할 수 있나요?**
예. 개발자 키트는 모든 Jetson Orin 모듈과 SoC 아키텍처를 공유하므로,
다시 플래싱하여 AGX Orin, Orin NX, Orin Nano의 성능과 전력 특성을
에뮬레이션할 수 있습니다. 출하 시 AGX Orin 시리즈로 구성되어 있습니다.

**이것이 양산 제품에 사용하는 모듈인가요?**
아니요. 양산 제품은 자체 제작 또는 파트너사의 캐리어 보드에 장착된
Jetson Orin **모듈**(64GB / 32GB / 산업용)을 기반으로 제작됩니다. 개발자
키트는 개발 및 프로토타이핑 수단입니다.

**대규모 언어 모델 / 에이전틱 AI를 실행할 수 있나요?**
예 — 이는 Orin 플랫폼의 핵심 용도입니다. JetPack 7.2에서는 로컬 및
클라우드 모델 오케스트레이션을 위해 NVIDIA NemoClaw를 개발자 키트에
단일 명령으로 설치할 수 있으며,
[Jetson AI Lab](https://www.jetson-ai-lab.com)에서 실습 튜토리얼을
공개하고 있습니다.

**로보틱스: Isaac ROS를 JetPack 7.2에서 사용할 수 있나요?**
예 — Isaac ROS는 릴리스 **4.6.0**(2026-08-18)부터 JetPack 7.2에서 Jetson
Orin을 지원해 왔으며, 공식 AGX Orin 설정 워크스루도 제공됩니다. NVIDIA의
JetPack 다운로드 페이지에는 여전히 "출시 예정"으로 표시되어 있습니다:
Isaac ROS는 JetPack과 독립적으로 릴리스되므로 자체 릴리스 노트가
기준이 되는 출처입니다. 버전과 ROS 2 배포판 선택(4.6.x = Jazzy,
5.0 = Lyrical) 및 알려진 제약 사항은
[JetPack 7.2에서의 로보틱스](/ko/tutorials/jetson-agx-orin/robotics)를
참조하십시오.

## 지원 및 서비스

**기술 지원은 어디에서 받을 수 있나요?**
- 플랫폼 관련 질문: [NVIDIA Jetson Developer Forums](https://forums.developer.nvidia.com/c/robotics-edge-computing/jetson-embedded-systems/70) — 먼저 검색하고, `cat /etc/nv_tegra_release` 출력을 포함하십시오.
- Juxi Technology 기술 지원: **support@juxitech.com**
- 주문, 보증, RMA: **support@juxitech.com** (처리를 빠르게 하려면 주문 번호를 포함하십시오)
- 영업 및 견적: **sales@juxitech.com**
- 제품 관련 질문(선정, 호환성): **pe@juxitech.com**

**액세서리(NVMe 저장 장치, 카메라, 전원)는 어디에서 구할 수 있나요?**
**<https://wiki.juxitech.com/products/>**에서 Juxi Technology 제품
카탈로그를 살펴보십시오 — [IMX219 CSI 카메라](https://wiki.juxitech.com/products/imx219-csi-camera)
(NVIDIA Jetson용으로 제작), USB 자동 초점 카메라,
[RealSense 깊이 카메라](https://wiki.juxitech.com/products/realsense-depth-camera) 등
Jetson 관련 액세서리가 포함되어 있습니다. 상담이 필요하면
sales@juxitech.com으로 문의하십시오.

## 출처

- Jetson AGX Orin Developer Kit User Guide — [Introduction](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html), [Quick Start](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) (2026-09-23 확인)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (2026-09-23 확인)

*상태: 2026-10-11 검토 완료.*

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 이 페이지는 Juxi
Technology가 게시한 것이며, NVIDIA의 공식 발행물이 아닙니다.
