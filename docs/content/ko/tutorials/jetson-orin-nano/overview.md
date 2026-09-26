---
title: 제품 개요 — Jetson Orin Nano Super 개발자 키트
sidebar_label: 제품 개요
slug: /product/overview
description: >-
  NVIDIA Jetson Orin Nano Super 개발자 키트(8GB)가 무엇이고 무엇에 사용되는지,
  그리고 Jetson Orin 라인업에서 어떤 위치에 있는지 설명합니다.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
review_owner: cheny
---

# 제품 개요

![Jetson Orin Nano Super 개발자 키트](/images/jetson-orin-nano/jetson-orin-nano-super-developer-kit-hero.jpg)

NVIDIA® Jetson Orin Nano™ Super 개발자 키트는 Jetson Orin 제품군의 엔트리 키트입니다: 엣지에서 컴퓨터 비전, 로보틱스, 로컬 생성형 AI 애플리케이션을 프로토타이핑하기 위한 소형 AI 컴퓨터입니다. 이 키트의 현재 릴리스인 JetPack 7.2.1(Jetson Linux / L4T r39.2.1)을 실행합니다.

## 주요 사실(NVIDIA 공식 문서로 확인)

- "Super"는 새 하드웨어가 아니라 소프트웨어 구성입니다: 이전 "Jetson Orin Nano Developer Kit"과 동일한 모듈(P3767)과 캐리어 보드(P3768)이며, Super 업데이트에서 이름이 바뀌었습니다. *(Developer Kit User Guide; NVIDIA Super Boost 발표)*
- 키트의 대표 수치: 최대 **67 INT8 TOPS**, 최대 **102 GB/s** 메모리 대역폭, 전력 **7W~25W**, 이전 세대 대비 **1.7배의 생성형 AI** 개선. *(Developer Kit User Guide — Introduction)*
- **1,024 CUDA 코어와 32 Tensor 코어**를 갖춘 Ampere GPU; 최대 1.7 GHz의 **6코어 Arm Cortex-A78AE** 64비트 CPU; **8GB 128비트 LPDDR5**. *(데이터시트; Jetson Orin 사양 페이지)*
- 스토리지: **모듈 하단면의 microSD 카드 슬롯**과 **외장 NVMe** 지원; eMMC가 없고 박스에 스토리지가 없습니다. *(데이터시트; 빠른 시작)*
- USB 플래시 드라이브에서 Jetson ISO 방식으로 JetPack **7.2.1**(L4T **r39.2.1**; Ubuntu 24.04, 커널 6.8, CUDA 13.2.2, TensorRT 10.16.2)을 실행합니다. 지원 범위: JetPack 6.x 또는 7.2/7.2.1(7.0/7.1은 Orin을 지원하지 않았습니다). *(빠른 시작; JetPack 다운로드; JetPack 아카이브)*
- 캐리어 보드: DisplayPort, 기가비트 이더넷, USB 3.2 Type-A 포트 4개, USB-C, MIPI CSI 커넥터 2개, M.2 슬롯 3개, 40핀 헤더. **[인터페이스 및 하드웨어 레이아웃](/ko/tutorials/jetson-orin-nano/interfaces)**을 참조하십시오. *(Developer Kit User Guide — Hardware Layout)*

## "Super"의 의미

Super 성능 향상은 같은 하드웨어에서 GPU, 메모리, CPU 클록을 끌어올리는 소프트웨어 전원 모드로 제공되며, NVIDIA는 기존 키트도 JetPack을 업그레이드하면 얻을 수 있다고 말합니다: "Existing Jetson Orin Nano Developer Kit users can get the 'Super' performance boost with a software upgrade." *(Developer Kit User Guide; NVIDIA Super Boost 발표)*

아래 표는 원래 키트와 Super 구성을 비교합니다. *(NVIDIA Super Boost 발표)*

| 항목 | 원래 Orin Nano 개발자 키트 | Super 구성 |
|---|---|---|
| GPU 클록 | 635 MHz | 1,020 MHz |
| CPU 클록 | 1.5 GHz | 1.7 GHz |
| 메모리 대역폭 | 68 GB/s | 102 GB/s |
| AI 성능(sparse INT8) | 40 TOPS | 67 TOPS |
| FP16 연산 | 10 TFLOPs | 17 TFLOPs |
| 전원 모드 | 7W, 15W | 7W, 15W, 25W |
| 가격(Super 출시 당시, 2024년 12월) | $499 | $249 |

*한 가지 수치에 대해 NVIDIA 자체 자료가 다릅니다: Super 발표는 이전 메모리 대역폭을 "65 GB/s"로 설명하는 반면, NVIDIA의 모듈 사양 표는 원래 8 GB 구성에 대해 68 GB/s를 기재합니다. 위 표는 사양 수치를 사용했습니다. 두 수치 모두 같은 pre-Super 하드웨어를 가리킵니다.*

현재 가격은 Juxi 스토어의 [이 키트 판매 페이지](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit)(SKU JX00110)를 참조하십시오.

JetPack 7.2.1부터 Jetson ISO는 기본적으로 키트를 Super 구성으로 플래싱합니다 *(JetPack 다운로드 페이지)*. JetPack 7.2 ISO로 처음 설치된 장치는 non-Super 프로파일을 유지할 수 있습니다; 25W나 MAXN SUPER가 없다면 **[문제 해결](/ko/tutorials/jetson-orin-nano/troubleshooting)**을 참조하십시오.

L4T r39.2 전원 모드 표에서 Super 구성은 15W(모드 0), 25W(모드 1, 기본값), MAXN SUPER(모드 2, 실험적; Super 구성으로 플래싱된 키트에서만)를 기재합니다. MAXN SUPER는 CPU를 최대 1.7 GHz, GPU를 최대 1,020 MHz, 메모리 컨트롤러를 3,199 MHz로 동작시킵니다. 모드는 `sudo /usr/sbin/nvpmodel -q`로 확인하고, `sudo /usr/sbin/nvpmodel -m <mode_id>`로 설정하십시오. NVIDIA의 키트 페이지는 "7W to 25W"라고 표기하지만, r39.2 표에는 위의 세 가지 모드가 나옵니다 — **[시스템 검증](/ko/tutorials/jetson-orin-nano/verify-your-system)**에서 사용 중인 장치를 확인하십시오. *(L4T r39.2 Power and Performance 페이지)*

## 모듈 사양

| 항목 | 사양 |
|---|---|
| AI 성능 | Super 구성에서 최대 67 sparse INT8 TOPS(33 dense) |
| GPU | NVIDIA Ampere 아키텍처, 1,024 CUDA 코어, 32 Tensor 코어, 최대 1,020 MHz |
| CPU | 6코어 Arm Cortex-A78AE v8.2(64비트), 1.5MB L2 + 4MB L3, 최대 1.7 GHz |
| 메모리 | 8GB 128비트 LPDDR5, 102 GB/s |
| 스토리지 | 모듈 하단면의 microSD 카드 슬롯; 외장 NVMe SSD 지원 |
| 비디오 디코드 | 1x 4K60(H.265), 2x 4K30, 5x 1080p60, 11x 1080p30 |
| 비디오 인코드 | CPU 코어 1–2개로 1080p30(전용 인코더 하드웨어 없음) |
| AI 가속기 | DLA 없음, PVA 없음 — 추론은 GPU Tensor 코어에서 실행 |
| 모듈 폼 팩터 | 260핀 SO-DIMM, 69.6 mm x 45 mm |

*출처: Jetson Orin Nano Super Developer Kit 데이터시트(2024년 12월); NVIDIA Jetson Orin 사양 페이지; L4T r39.2 Power and Performance 페이지.*

## 부품 번호

| 부품 번호 | 지정 대상 |
|---|---|
| P3766 | 완성된 Jetson Orin Nano 개발자 키트 |
| P3767 | 시스템 온 모듈(SOM) |
| P3768 | 레퍼런스 캐리어 보드 |
| P3767-0005 | 개발자 키트에 들어 있는 모듈 SKU(Jetson Orin Nano 8GB, "for development only") |

기타 Orin Nano 모듈 SKU: P3767-0003(8GB, 상용)과 P3767-0004(4GB). 개발자 키트 캐리어는 SKU 0, 1, 3, 4, 5의 P3767 모듈을 지원합니다. *(L4T r39.2 Developer Guide; L4T r38.2.1 Developer Guide)*

## Orin 제품군에서의 위치

- **Jetson Orin Nano 8GB — 이 키트.** Orin 제품군의 엔트리 포인트: 67 INT8 TOPS, 8GB 통합 메모리, 7W~25W.
- **Jetson Orin NX.** 같은 캐리어로 Orin NX 모듈에 전원을 공급하고, 테스트하고, 개발할 수 있습니다(별도의 방열판과 팬 필요; 신품 모듈은 Ubuntu 호스트에서 SDK Manager로 플래싱해야 합니다). *(Developer Kit User Guide — How-To)*
- **Jetson AGX Orin — 플래그십 등급.** AGX Orin 32GB 모듈은 Super Mode에서 241 TOPS에 도달합니다 *(JetPack 7.2 릴리스 하이라이트)*. Juxi의 [Jetson AGX Orin 시리즈](/ko/tutorials/jetson-agx-orin/quick-start)를 참조하십시오.

계획 시 고려해야 할 주요 제약은 **8GB 통합 메모리**입니다; DLA와 PVA가 없어 AI 워크로드는 GPU에서만 실행됩니다 — **[메모리 효율](/ko/tutorials/jetson-orin-nano/memory-efficiency)**과 **[로컬 LLM](/ko/tutorials/jetson-orin-nano/local-llm)**을 참조하십시오.

## 개발자 키트의 용도

- **양산을 위한 프로토타이핑.** JetPack 7.2.1은 Orin 제품군 전체를 지원하므로, 키트에서 한 작업이 제품에 쓰이는 Orin 모듈로 이어집니다. *(JetPack 다운로드 페이지)*
- **컴퓨터 비전.** MIPI CSI 카메라 커넥터 2개; DeepStream SDK 9.1이 JetPack 7.2.1 구성 요소 매트릭스에 포함 — **[DeepStream](/ko/tutorials/jetson-orin-nano/deepstream)**을 참조하십시오.
- **로컬 생성형 AI.** 대표적인 주장은 1.7배의 생성형 AI 개선입니다; 8GB 한계가 무엇이 들어가는지를 결정합니다 — **[로컬 LLM](/ko/tutorials/jetson-orin-nano/local-llm)**을 참조하십시오.
- **로보틱스.** NVIDIA 직원은 JetPack 7.2.1에 ROS 2 Jazzy를 권장합니다 — **[로보틱스](/ko/tutorials/jetson-orin-nano/robotics)**를 참조하십시오.

> **Juxi 참고:** 양산 제품은 자체 제작 캐리어 보드에 장착한 Jetson Orin 모듈 —
> Orin Nano 8GB 또는 4GB, 혹은 Orin NX — 을 기반으로 제작됩니다. 개발자
> 키트는 개발용 수단이며, 양산 부품이 아닙니다.

## 구성품

박스에는 개발자 키트(레퍼런스 캐리어 보드에 장착된, 방열판 포함 Orin Nano 8GB 모듈), 19 V 전원 공급 장치, 동봉된 802.11ac/ab/gn 무선 카드, 빠른 시작 및 지원 카드가 들어 있습니다. NVIDIA는 이 키트가 "does not include removable storage in the box"라고 밝힙니다. *(데이터시트; 빠른 시작)*

직접 준비해야 하는 것:

- **스토리지** — microSD 카드(64GB, UHS-1 이상) 또는 NVMe SSD. microSD 슬롯은 **모듈 하단면**에 있습니다; 전원을 켜기 전에 삽입하십시오. Juxi 스토어 번들에는 64 GB microSD 카드가 이미 포함되어 있으므로, NVIDIA 박스만 받은 경우나 NVMe SSD를 원하는 경우에만 스토리지를 구매하십시오.
- **설치 USB 드라이브** — 16GB 이상. JetPack ISO는 microSD 카드가 아니라 이 USB 드라이브에 기록하십시오: SD 카드 이미지는 JetPack 7.2에서 제거되었습니다.
- **호스트 컴퓨터**: 25GB 이상의 여유 공간, 데스크톱 설정을 위한 DisplayPort 모니터와 USB 키보드/마우스. *(빠른 시작; Supported Hardware)*

> **중요** 아주 오래된 출하 펌웨어는 먼저 업데이트해야 합니다 — JetPack
> 7.2.1에는 JetPack 6.x 세대의 UEFI/QSPI 펌웨어가 필요합니다. **[빠른
> 시작](/ko/tutorials/jetson-orin-nano/quick-start)**과 **[플래싱 및
> 업데이트](/ko/tutorials/jetson-orin-nano/flashing-and-updates)**를 참조하십시오.

## 다음 단계

- **[빠른 시작](/ko/tutorials/jetson-orin-nano/quick-start)** — 개봉부터 JetPack 7.2.1이 동작하는 시스템까지
- **[인터페이스 및 하드웨어 레이아웃](/ko/tutorials/jetson-orin-nano/interfaces)** — 모든 포트, 슬롯, 커넥터
- **[다운로드](/ko/tutorials/jetson-orin-nano/downloads)** — 공식 이미지, 도구, 문서 링크

## 출처

- [Jetson Orin Nano Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) (2026-09-26 확인)
- [Jetson Orin Nano Developer Kit User Guide — Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (2026-09-26 확인)
- [Jetson Orin Nano Developer Kit User Guide — Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (2026-09-26 확인)
- [Jetson Orin Nano Developer Kit User Guide — How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (2026-09-26 확인)
- [Jetson Orin Nano Developer Kit User Guide — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (2026-09-26 확인)
- [Jetson Orin Nano Developer Kit User Guide — Supported Hardware](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/supported_hardware.html) (2026-09-26 확인)
- [NVIDIA Super Boost: Jetson Orin Nano Developer Kit gets a Super boost](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/) (2026-09-26 확인)
- [NVIDIA JetPack 6.2 brings Super Mode to Jetson Orin Nano and Jetson Orin NX modules](https://developer.nvidia.com/blog/nvidia-jetpack-6-2-brings-super-mode-to-nvidia-jetson-orin-nano-and-jetson-orin-nx-modules/) (Super 전원 모드 발표로 링크됨)
- [NVIDIA Jetson Orin module and developer kit spec page](https://developer.nvidia.com/embedded/jetson-orin) (2026-09-26 확인)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (2026-09-26 확인)
- [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive) (2026-09-26 확인)
- [L4T r39.2 Developer Guide — Jetson Orin NX and Orin Nano series: module adaptation and bring-up](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html) (2026-09-26 확인)
- [L4T r39.2 Developer Guide — Platform Power and Performance](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (2026-09-26 확인)
- [L4T r38.2.1 Developer Guide — Partition Configuration (module SKUs)](https://docs.nvidia.com/jetson/archives/r38.2.1/DeveloperGuide/AR/BootArchitecture/PartitionConfiguration.html) (2026-09-26 확인)
- [Jetson Orin Nano Super Developer Kit Datasheet (PDF, linked from nvidia.com)](https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf) (2026-09-26 확인)
- [Juxi Technology store listing for this kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) (2026-09-26 확인)

*상태: 초안, cheny 검토 대기 중. 기재된 날짜 기준 NVIDIA 공식 문서에 근거하며, 아직 Juxi Technology가 실제 하드웨어에서 검증하지 않았습니다.*

**이미지 출처:** 제품 이미지는 NVIDIA 공식 *Jetson Orin Nano Developer Kit User Guide*(2026-09-26 다운로드)에서 가져왔으며, © NVIDIA Corporation.

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 이 페이지는 Juxi Technology가 게시하며 NVIDIA의 공식 발행물이 아닙니다.
