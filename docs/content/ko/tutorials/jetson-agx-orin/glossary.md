---
title: 용어집
sidebar_label: 용어집
slug: /appendix/glossary
description: >-
  Jetson AGX Orin 개발자 키트의 핵심 용어 — JetPack과 L4T 버전 체계부터
  플래싱, AI 스택, 전력 관련 용어까지.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
    note: its component table lags on some rows (VPI/PVA still show 7.2 values) — component versions per the apt repository below
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-24
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: component versions verified through the nvidia-jetpack 7.2.1-b49 dependency chain
review_owner: cheny
---

# 용어집

고객이 가장 자주 묻는 용어를 주제별로 묶었습니다. 버전 번호는 현재
릴리스(**JetPack 7.2.1 / L4T 39.2.1**; 구성 요소 버전은 2026-09-26 재확인)를 기준으로 합니다.

## 플랫폼 및 하드웨어

| 용어 | 의미 |
|---|---|
| **Jetson AGX Orin** | NVIDIA의 엣지 AI 모듈 제품군이며, 이 개발자 키트에는 **64GB** 모듈이 탑재되어 있습니다. |
| **모듈(Module)** | SoC, 메모리, eMMC를 탑재하고 실제 연산을 담당하는 소형 보드입니다. |
| **캐리어 보드(Carrier board)** | 모든 포트와 커넥터를 갖춘 더 큰 보드로, 모듈을 여기에 장착합니다(699핀 커넥터, J3). |
| **개발자 키트(Developer Kit)** | 모듈 + 레퍼런스 캐리어 보드 + Wi-Fi 모듈 + 전원 공급 장치로 구성된 프로토타이핑 플랫폼입니다. 양산 제품에는 자체 제작 또는 파트너사 캐리어 보드에 장착한 모듈을 사용합니다. |
| **SoC** | System-on-chip(시스템 온 칩): CPU, GPU, 가속기를 하나의 칩에 통합한 것입니다(NVIDIA는 이 제품군을 "Tegra"라고 부릅니다). |
| **TOPS** | 초당 1조 회 연산(Trillion operations per second) — AI 처리량의 지표입니다(AGX Orin 제품군은 최대 275 TOPS). |
| **Tensor 코어** | 신경망을 뒷받침하는 행렬 연산에 특화된 GPU 코어입니다. |
| **eMMC** | 모듈에 내장된 플래시 저장 장치이며, 기본 시스템 저장소입니다. |
| **NVMe** | PCIe 기반의 고속 SSD로, M.2 M-Key 슬롯(J1)에 장착하며 시스템 저장소로도 사용할 수 있습니다. |
| **M.2 (M-Key / E-Key)** | 슬롯 유형: **M-Key** = NVMe SSD, **E-Key** = Wi-Fi 모듈. |
| **CSI / GMSL** | 카메라 인터페이스입니다(CSI는 카메라 커넥터 J509, GMSL은 차량용 등급 카메라용). |
| **DisplayPort (DP)** | 키트의 **유일한** 디스플레이 출력입니다. MST(최대 2대 디스플레이)와 DSC를 지원합니다. |

## 소프트웨어 및 버전

| 용어 | 의미 |
|---|---|
| **JetPack** | Jetson용 NVIDIA SDK 번들 — OS, 드라이버, CUDA 스택, 라이브러리를 포함합니다. **현재: 7.2.1.** |
| **Jetson Linux (L4T)** | JetPack의 토대가 되는 보드 지원 패키지: 부트로더, 커널, 드라이버, Ubuntu 루트 파일 시스템. **현재: r39.2.1.** |
| **BSP** | "Board support package"(보드 지원 패키지) — 보드를 부팅하고 실행하는 데 필요한 모든 것입니다. |
| **루트 파일 시스템(rootfs)** | OS의 사용자 공간 부분입니다(여기서는 Ubuntu 24.04). |
| **oem-config** | 최초 부팅 시의 설정 마법사입니다(언어, 사용자 계정, 네트워크). |
| **UEFI** | 키트의 펌웨어/부팅 메뉴입니다. 부트 매니저에서 부팅 장치를 선택할 수 있습니다. |
| **QSPI** | 초기 부팅 펌웨어가 들어 있는 소형 플래시입니다. ISO 설치 중 "**QSPI 캡슐 업데이트**" 프롬프트가 나타날 수 있으며 — `Y`를 누르십시오(필수). |
| **Force Recovery 모드** | 호스트 PC에서 플래싱하기 위한 특수 부팅 모드입니다. 진입 방법: 가운데 Force Recovery 버튼을 누른 채 전원을 연결합니다. |
| **Jetson ISO** | USB 스틱 설치 이미지로, NVIDIA가 권장하는 업데이트 경로입니다(호스트 PC 불필요). |
| **SDK Manager** | BSP를 플래싱하고 JetPack 구성 요소를 설치하는 NVIDIA의 GUI 도구입니다(호스트 PC). |
| **Linux_for_Tegra / flash.sh** | 스크립트 기반 플래싱 도구로, 고급 사용자/양산 용도입니다. |
| **OTA** | Over-the-air update(무선 업데이트) — 배포된 기기에 소프트웨어/보안 업데이트를 원격으로 적용하는 것입니다. |
| **디바이스 트리(Device tree)** | 커널에 어떤 하드웨어가 연결되어 있는지 알려 주는 데이터 구조입니다. 커스터마이즈한 디바이스 트리는 L4T 버전마다 다시 빌드해야 합니다. |

**버전 대응**(무엇보다 통째로 외워 둘 만한 표):

| JetPack | Jetson Linux (L4T) | Ubuntu | 커널 | CUDA |
|---|---|---|---|---|
| **7.2.1** (현재) | **39.2.1** | **24.04** | **6.8** | **13.2.2** |
| 6.x (이전 세대) | 36.x | 22.04 | 5.15 | 12.x |

특정 시스템이 실제로 무엇을 실행하는지 항상 확인하십시오: `cat /etc/nv_tegra_release`.

## AI 스택

| 용어 | 의미 |
|---|---|
| **CUDA** | NVIDIA의 GPU 컴퓨팅 툴킷입니다(이 릴리스에서는 13.2.2). |
| **cuDNN** | 최적화된 딥러닝 기본 연산 라이브러리입니다(9.20.0). |
| **TensorRT** | 추론 최적화기 겸 런타임입니다(10.16.2). |
| **TensorRT 엔진** | 컴파일된 모델 파일로, 하드웨어/버전에 종속됩니다. 엔진은 버전을 업그레이드해도 **그대로 유지되지 않습니다** — 다시 빌드하십시오. |
| **DeepStream** | 다중 스트림 영상 분석용 SDK입니다(9.1). |
| **VPI** | Vision Programming Interface — 하드웨어 가속 이미지 처리입니다(4.1.4). |
| **Holoscan** | 실시간 센서 처리를 위한 스트리밍 AI 프레임워크입니다(3.9.0). |
| **NGC** | NVIDIA의 컨테이너 및 사전 학습 모델 카탈로그입니다(catalog.ngc.nvidia.com). |
| **컨테이너(Container)** | 격리된 패키징 런타임(Docker)으로, Jetson에 AI 소프트웨어를 배포하는 표준 방식입니다. |

## 전력 및 모니터링

| 용어 | 의미 |
|---|---|
| **nvpmodel** | 전력 모드를 전환하는 도구입니다. `sudo nvpmodel -q`를 실행하면 시스템의 모드를 확인할 수 있습니다. |
| **MAXN** | "최고 성능" 전력 모드입니다(전력 상한 없음). |
| **jetson_clocks** | 클록을 최대로 고정합니다 — 벤치마크용이며, 기본 설정으로 계속 사용하기 위한 것이 아닙니다. |
| **tegrastats** | CPU/GPU/메모리 사용량을 보여 주는 내장 실시간 모니터입니다. |

## JetPack 7 시대

| 용어 | 의미 |
|---|---|
| **NemoClaw** | Jetson용 NVIDIA의 에이전트 AI 프레임워크로, JetPack 7.2부터 명령 하나로 설치할 수 있습니다. |
| **Jetson 에이전트 스킬** | NVIDIA가 기기 측 및 BSP 작업용으로 공개하는 재사용 가능한 에이전트 워크플로입니다. |
| **Yocto / OpenEmbedded (OE4T)** | 맞춤형이면서 재현 가능한 양산용 Linux 이미지를 만드는 빌드 시스템으로, 7.2부터 공식 지원됩니다. |
| **SBSA** | Server Base System Architecture — Jetson **Thor** 라인이 따르는 Arm 서버 모델입니다(이 키트에는 해당하지 않습니다). |
| **MIG** | Multi-Instance GPU — 하나의 GPU를 격리된 인스턴스로 분할하는 기술입니다(Jetson Thor, 기술 프리뷰). |

## 출처

- [NVIDIA Jetson apt 저장소 — 실제 구성 요소 버전](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) (2026-09-26 확인) — `nvidia-jetpack` 7.2.1 의존성 체인을 통해 확인했으며, [JetPack 다운로드 페이지](https://developer.nvidia.com/embedded/jetpack/downloads)의 요약 표는 뒤처져 있어 아직 CUDA 13.2.1 / VPI 4.1.3이 기재되어 있습니다
- [Jetson AGX Orin 개발자 키트 사용자 가이드](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (2026-09-24 확인)

*상태: 초안, cheny 검토 대기 중. 정의는 NVIDIA 문서와 업계 표준 용례를
바탕으로 정리했으며, 버전 번호는 명시된 날짜에 확인했습니다.*

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 본 페이지는 Juxi
Technology가 게시한 것으로, NVIDIA의 공식 출판물이 아닙니다.
