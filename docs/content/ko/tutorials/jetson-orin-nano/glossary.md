---
title: 용어집
sidebar_label: 용어집
slug: /appendix/glossary
description: >-
  NVIDIA Jetson Orin Nano Super 개발자 키트(8GB)의 핵심 용어 — JetPack과
  L4T 버전 체계부터 플래싱, 전원 모드, AI 스택까지.
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
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
review_owner: cheny
---

# 용어집

새로운 Jetson 사용자가 가장 먼저 만나는 용어를 알파벳순으로 정리했습니다. 버전 번호는 이 키트의 현재 릴리스(**JetPack 7.2.1 / L4T r39.2.1**, 2026-09-26 확인)를 기준으로 합니다.

## 용어

| 용어 | 의미 |
|---|---|
| **BSP** | Board support package(보드 지원 패키지): 보드를 부팅하는 소프트웨어 계층으로, 부트로더, 커널, 드라이버, 루트 파일 시스템을 포함합니다. JetPack에서 BSP는 Jetson Linux (L4T)입니다. Jetson ISO 설치 중에 설치 프로그램이 선택한 스토리지 장치에 BSP를 기록합니다. |
| **캡슐 업데이트(capsule update)** | QSPI 부트 펌웨어의 업데이트입니다. 구형 QSPI 펌웨어가 있는 키트에서 Jetson ISO를 설치하는 동안, 설치 프로그램이 캡슐 업데이트를 실행하라고 안내합니다: 30초 안에 `Y`를 누르십시오, 그렇지 않으면 나중에 설치가 실패합니다. 업데이트는 두 번 실행되며 키트는 그 사이에 재부팅될 수 있습니다 — 이는 정상입니다. |
| **carveout** | 부트 펌웨어가 디스플레이나 카메라 파이프라인 같은 특정 하드웨어 블록을 위해 예약하는 메모리 영역입니다. 운영 체제는 이를 사용할 수 없습니다. Orin Nano에서는 이러한 예약 영역이 문서화되어 있으며, BSP를 편집하고 키트를 다시 플래싱하여 줄일 수 있습니다([메모리 효율](/ko/tutorials/jetson-orin-nano/memory-efficiency) 참조). |
| **CUDA** | GPU에서 코드를 실행하기 위한 NVIDIA의 병렬 컴퓨팅 플랫폼 겸 툴킷입니다. JetPack 7.2.1에는 CUDA 13.2.2가 포함됩니다. Orin의 GPU 컴퓨트 성능은 8.7(`sm_87`)입니다; `sm_87`을 포함하지 않는 GPU 바이너리는 CPU 실행으로 폴백합니다([로컬 LLM](/ko/tutorials/jetson-orin-nano/local-llm) 참조). |
| **cuDNN** | 컨볼루션과 활성화 함수 같은 최적화된 딥러닝 기본 연산 라이브러리입니다. 딥러닝 프레임워크와 TensorRT가 핵심 연산에 이를 사용합니다. JetPack 7.2.1에는 cuDNN 9.20.0이 포함됩니다. |
| **DeepStream** | 다중 스트림 영상 분석용 NVIDIA SDK입니다: 영상을 디코딩하고, 추론을 실행하고, 객체를 추적하고, 결과를 출력합니다. DeepStream 9.1은 JetPack 7.2에서 Jetson Orin 제품군을 지원합니다. NVIDIA는 초보자에게 가장 빠른 설치 경로로 Docker 컨테이너를 권장합니다([DeepStream](/ko/tutorials/jetson-orin-nano/deepstream) 참조). |
| **DLA** | Deep Learning Accelerator(딥러닝 가속기): 일부 Jetson 모듈에 내장된 고정 기능 추론 엔진입니다. Orin Nano 모듈에는 DLA가 없으므로, 이 키트의 추론은 GPU에서 실행됩니다. |
| **Edge-LLM** | TensorRT Edge-LLM: 대규모 언어 모델(LLM)과 비전-언어 모델(VLM)을 위한 NVIDIA의 온디바이스 런타임입니다. Orin에서는 FP16, INT8, INT4 엔진만 지원합니다 — FP8과 FP4 엔진은 실행되지 않습니다 — 그리고 엔진은 장치 자체에서 빌드합니다([로컬 LLM](/ko/tutorials/jetson-orin-nano/local-llm) 참조). |
| **eMMC** | 일부 Jetson 모듈에서 시스템 디스크로 사용되는 내장 플래시 저장 장치입니다. 이 개발자 키트는 스토리지 없이 출고됩니다: 시작하기 전에 microSD 카드나 NVMe SSD를 준비하십시오([빠른 시작](/ko/tutorials/jetson-orin-nano/quick-start) 참조). |
| **Force Recovery 모드(Force Recovery mode)** | 호스트 PC에서 키트를 플래싱할 때 사용하는 특수 부팅 모드입니다. 실행 중인 시스템에서 `sudo reboot --force forced-recovery`로 진입하거나, 키트 전원이 꺼진 상태에서 버튼 헤더의 핀 9와 10을 단락시킨 다음 전원을 연결해 진입합니다. 이 모드에서 USB-C 포트가 호스트 PC로의 플래싱 연결을 담당합니다. |
| **JetPack** | Jetson용 NVIDIA SDK 번들: 운영 체제, 드라이버, CUDA 스택, 라이브러리를 포함합니다. 이 키트의 현재 릴리스는 JetPack 7.2.1이며, Jetson Linux (L4T) r39.2.1을 포함합니다. |
| **JetPack 6.x 업데이트 경로** | 출하 UEFI/QSPI 펌웨어가 36.0보다 오래된 키트를 위한 펌웨어 브리지 절차입니다. JetPack 5.1.3 microSD 브리지 이미지로 부팅해 부트로더(펌웨어) 업데이트를 예약합니다; 그 뒤에는 키트가 JetPack 6.x나 JetPack 7.2.1 Jetson ISO를 부팅할 수 있습니다. 구형 펌웨어가 있는 키트는 ISO 설치 전에 이 경로를 완료해야 합니다([빠른 시작](/ko/tutorials/jetson-orin-nano/quick-start) 참조). |
| **Jetson ISO** | JetPack 7.2 이상을 위한 통합 USB 설치 이미지입니다. Balena Etcher 같은 도구로 USB 플래시 드라이브에 기록하십시오 — microSD 카드에는 기록하지 마십시오 — 그리고 이것이 라이브 USB가 아니라 설치 전용임을 기억하십시오. 설치 중에 대상을 선택합니다: microSD 카드 또는 NVMe SSD. |
| **L4T** | Jetson Linux: JetPack 아래의 보드 지원 패키지로, UEFI 부트로더, 커널, 드라이버, Ubuntu 루트 파일 시스템을 포함합니다. JetPack 7.2.1에서는 r39.2.1이며, Linux 커널 6.8과 Ubuntu 24.04 루트 파일 시스템을 사용합니다. |
| **MAXN SUPER** | 이 키트의 최상위 전원 모드(모드 2): CPU 1,728 MHz, GPU 1,020 MHz, 메모리 3,199 MHz. 실험적 모드이며, 키트가 Super 구성으로 플래싱된 경우에만 존재합니다. 데스크톱 Power Mode 메뉴에서 선택하거나 `sudo /usr/sbin/nvpmodel -m 2`를 실행하십시오. |
| **microSD (UHS-1)** | 이 키트의 기본 시스템 스토리지로 사용되는 카드 형식입니다. UHS-1은 SD 속도 등급이며, NVIDIA는 64 GB 이상의 UHS-1 microSD 카드를 권장합니다. 슬롯이 모듈 하단면에 있으므로 설치 프로그램을 부팅하기 전에 카드를 삽입하십시오. |
| **nv_boot_control.conf / TNSPEC** | 보드 구성을 TNSPEC 문자열로 기록하는 기기 내 파일 `/etc/nv_boot_control.conf`입니다. NVIDIA 직원에 따르면 Super 구성에는 `-super` 접미사가 붙습니다, 예: `TNSPEC 3767-300-0005-S.1-1-1-jetson-orin-nano-devkit-super-`; 접미사가 없으면 상위 전원 모드를 사용할 수 없습니다. ISO 설치 후 NVIDIA는 올바른 보드 정보의 기준으로 이 TNSPEC 항목을 가리킵니다. |
| **NVMe** | 캐리어 보드의 M.2 Key-M 슬롯 중 하나에 장착하는 PCIe 버스 기반 SSD입니다: 2280 크기(PCIe 3.0 x4) 또는 2230 크기(PCIe 3.0 x2). NVMe SSD는 시스템을 담을 수 있으며, 더 큰 용량과 더 나은 스토리지 성능이 필요할 때 권장합니다. |
| **nvpmodel** | 키트의 전원 모드 도구입니다. `sudo /usr/sbin/nvpmodel -q`를 실행하면 시스템에서 사용 가능한 모드가 나열되고, `sudo /usr/sbin/nvpmodel -m <mode_id>`로 모드를 전환합니다. 같은 모드들이 데스크톱 Power Mode 메뉴에도 있습니다. |
| **oem-config** | 최초 부팅 설정 마법사: 라이선스 동의, 언어와 키보드, 네트워크, 최초 사용자 이름과 암호를 설정합니다. 설치된 시스템의 첫 부팅 후 한 번 실행됩니다. |
| **QSPI** | UEFI 부트 펌웨어를 저장하는 키트의 소형 NOR 플래시 메모리입니다. JetPack 7.2 이상은 JetPack 6.x 세대의 QSPI 펌웨어(버전 36.0보다 최신)를 요구합니다; 구형 펌웨어에서는 설치 프로그램이 실패하거나 키트가 검은 화면으로 부팅될 수 있습니다. [플래싱 및 업데이트](/ko/tutorials/jetson-orin-nano/flashing-and-updates)를 참조하십시오. |
| **SDK Manager** | USB를 통해 BSP를 플래싱하고 JetPack 구성 요소를 설치하는 NVIDIA의 호스트 PC 도구입니다. 문서화된 호스트는 Ubuntu를 실행하는 x86 PC입니다. 기기 내 Jetson ISO 방식의 대안입니다. |
| **SO-DIMM** | 모듈의 커넥터 폼팩터: 260핀 SO-DIMM, 69.6 mm x 45 mm. 모듈은 캐리어 보드의 SO-DIMM 소켓에 꽂히며, 같은 소켓에 Jetson Orin NX 모듈도 장착할 수 있습니다. |
| **Super Mode** | Orin Nano를 위한 NVIDIA의 소프트웨어 전원 및 클록 구성입니다 — 다른 하드웨어가 아닙니다. 기존 키트도 JetPack 소프트웨어 업그레이드로 "Super" 부스트를 얻으며, 이 키트에서는 Super 구성으로 플래싱된 경우에만 상위 전원 모드가 나타납니다. |
| **TensorRT** | NVIDIA의 추론 최적화기 겸 런타임입니다. 훈련된 모델을 TensorRT 엔진 — 타깃 GPU용으로 빌드된 장치별 파일 — 으로 컴파일하고 그 엔진을 효율적으로 실행합니다. JetPack 7.2.1에는 TensorRT 10.16.2가 포함됩니다. |
| **TOPS** | 초당 1조 회 연산(Trillion operations per second)으로, AI 처리량의 일반적인 단위입니다. 이 키트는 최대 67 sparse INT8 TOPS(33 dense INT8)입니다. NVIDIA는 같은 모듈에 대해 sparse와 dense 등급을 모두 공개합니다. |
| **UEFI** | 키트의 부트 펌웨어와 그 설정 메뉴입니다. NVIDIA 부팅 스플래시가 표시될 때 Esc를 누르면 설정으로 들어갑니다; 메뉴에서 Boot Manager는 USB 설치 프로그램을 부팅 장치로 선택하는 곳입니다. 펌웨어 버전도 여기에 표시되며, JetPack 7.2 이상은 36.0보다 최신 버전이 필요합니다. |
| **통합 메모리(unified memory)** | CPU와 GPU가 공유하는 단일 8 GB LPDDR5 메모리 풀입니다 — 이 키트에는 별도의 비디오 메모리가 없습니다. 펌웨어와 커널 예약분을 제외하면 약 7.6 GB를 사용할 수 있으며, 운영 체제와 모델, KV 캐시가 모두 이 하나의 풀에서 할당됩니다. [메모리 효율](/ko/tutorials/jetson-orin-nano/memory-efficiency)을 참조하십시오. |
| **VPI** | Vision Programming Interface: Jetson에서 하드웨어 가속 이미지 처리를 위한 NVIDIA 라이브러리입니다. JetPack 7.2.1에는 VPI 4.1.4이 포함됩니다. |

## 버전 대응

가장 유용하게 외워 둘 버전 대응:

| JetPack | Jetson Linux (L4T) | Ubuntu | 커널 | CUDA |
|---|---|---|---|---|
| **7.2.1** (현재) | **r39.2.1** | **24.04** | **6.8** | **13.2.2** |
| 6.2.3 (마지막 JetPack 6 릴리스) | r36.5.2 | 22.04 | 5.15 | 12.6 |

특정 시스템이 실제로 무엇을 실행하는지 확인하려면: `cat /etc/nv_tegra_release`
([시스템 검증](/ko/tutorials/jetson-orin-nano/verify-your-system) 참조).

## 출처

- [Jetson Orin Nano Developer Kit — Introduction](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) (2026-09-26 확인)
- [Jetson Orin Nano Developer Kit — Quick Start Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (2026-09-26 확인)
- [Jetson Orin Nano Developer Kit — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (2026-09-26 확인)
- [Jetson Orin Nano Developer Kit — How-to Guides](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (2026-09-26 확인)
- [JetPack SDK 다운로드](https://developer.nvidia.com/embedded/jetpack/downloads) — ⚠️ 구성 요소 표가 행마다 뒤처져 있습니다(VPI 및 PVA 행에는 여전히 JetPack 7.2 값이 담겨 있습니다); 구성 요소 버전은 대신 [NVIDIA 패키지 저장소](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages)를 사용하십시오 (2026-09-26 확인)
- [Jetson Linux r39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (2026-09-26 확인)
- [TensorRT Edge-LLM — Support Matrix](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html) (2026-09-26 확인)
- [Maximizing memory efficiency to run bigger models on NVIDIA Jetson (NVIDIA Technical Blog)](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (2026-09-26 확인)
- [Jetson Orin Nano Series — Power and Performance (L4T r39.2 Developer Guide)](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (2026-09-26 확인)
- [NVIDIA Jetson Orin family — specifications](https://developer.nvidia.com/embedded/jetson-orin) (2026-09-26 확인)
- [DeepStream SDK — Installation](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) (2026-09-26 확인)
- [NVIDIA forum — "25W and MAXN_SUPER not seen in JetPack 7.2" (NVIDIA staff answer)](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) (2026-09-26 확인)

*상태: 2026-10-11 검토 완료. 정의는 NVIDIA 문서와 업계 표준 용례를
바탕으로 정리했으며, 버전 번호는 명시된 날짜에 확인했습니다. 아직 Juxi
Technology가 실제 하드웨어에서 검증하지 않았습니다.*

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 이 페이지는 Juxi Technology가 게시하며 NVIDIA의 공식 발행물이 아닙니다.
