---
title: 다운로드 및 공식 링크
sidebar_label: 다운로드
slug: /downloads
description: >-
  JetPack 7.2.1 / L4T r39.2.1 기반 Jetson Orin Nano Super 개발자 키트(8GB)를
  위한 NVIDIA 공식 다운로드와 문서의 검증된 색인, 그리고 파트너 리소스와
  Juxi Technology 진입점.
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
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack-archive
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html
    checked: 2026-09-26
    note: target of the "NVIDIA SDK Manager Documentation" entry on the kit user guide's Additional Docs page
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/overview.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/
    checked: 2026-09-26
  - source: https://pypi.jetson-ai-lab.io/sbsa/cu130
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
  - source: https://wiki.juxitech.com/
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
review_owner: cheny
---

# 다운로드 및 공식 링크

이 페이지는 **JetPack 7.2.1 / Jetson Linux (L4T) r39.2.1** 기반 **Jetson Orin Nano Super 개발자 키트(8GB)**를 위한 NVIDIA 공식 다운로드와 문서의 색인이며, 몇 가지 파트너 리소스와 Juxi Technology 진입점도 담고 있습니다. 모든 링크는 **2026-09-26**에 확인했습니다.

무엇이든 다운로드하기 전에 알아 두어야 할 Orin Nano 특유의 사실 두 가지:

- **SD 카드 이미지가 없습니다.** JetPack 7.2부터 이 키트는 USB 플래시 드라이브에 기록한 Jetson ISO로 설치합니다. SD 카드 이미지는 없으며, ISO를 microSD 카드에 기록해서도 안 됩니다.
- **펌웨어 관문.** JetPack 7.2.1은 키트에 JetPack 6.x 세대의 UEFI/QSPI 펌웨어를 요구합니다. 키트에 여전히 구형 출하 펌웨어가 들어 있다면 JetPack 6.x 업데이트 경로를 먼저 완료하십시오.

> **Juxi 팁:** 전체 설정 흐름은 [빠른 시작](/ko/tutorials/jetson-orin-nano/quick-start)에 있습니다. 플래싱 및 업데이트 옵션 비교는 [플래싱 및 업데이트](/ko/tutorials/jetson-orin-nano/flashing-and-updates)를 참조하십시오.

## JetPack 7.2.1 / Jetson Linux r39.2.1

- [JetPack SDK 다운로드](https://developer.nvidia.com/embedded/jetpack/downloads) — 메인 JetPack 페이지: 릴리스 노트, 공식 구성 요소 버전 표, 그리고 모든 JetPack 7.2.1 다운로드 링크.

> ⚠️ **그 구성 요소 표를 행마다 믿지 마십시오.** NVIDIA는 7.2.1에 맞게 표를 완전히 갱신하지 않았습니다: CUDA 행은 업데이트되었지만 바로 옆의 두 행은 갱신되지 않았습니다 — VPI는 여전히 JetPack 7.2 값(**4.1.3이며, 7.2.1이 실제로 포함하는 값은 4.1.4입니다**)을 표시하고, Isaac ROS 행은 Isaac ROS가 2026년 8월 릴리스 이후 JetPack 7.2에서 Orin을 지원해 왔음에도 여전히 "출시 예정"이라고 표기합니다. 구성 요소 버전은 NVIDIA의 패키지 저장소를 권위 있는 출처로 삼으십시오: 메타패키지가 의존성 체인을 통해 각 구성 요소를 고정합니다 — [r39.2 arm64 Packages](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages), 여기서 `nvidia-jetpack-runtime (= 7.2.1-b49)` → `nvidia-vpi (= 7.2.1-b49)` → `libnvvpi4 (= 4.1.4)` (2026-09-26 확인). 구성 요소 버전은 [시스템 검증](/ko/tutorials/jetson-orin-nano/verify-your-system)에도 나열되어 있습니다.
- [r39.2.1용 Jetson ISO(직접 다운로드)](https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso/jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso) — JetPack 7.2.1용 설치 프로그램 이미지로, 키트의 빠른 시작 페이지가 "Direct Download Link: Jetson ISO (r39.2.1)"로 링크합니다. 16 GB 이상의 USB 플래시 드라이브에 기록하십시오. 이 다운로드에는 체크섬이 함께 게시되지 않습니다.
- [NVIDIA SDK Manager 문서](https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html) — 키트 플래싱, 펌웨어 업데이트, JetPack 구성 요소 설치를 위한 호스트 PC 도구의 설치와 사용법(NVIDIA Developer Program 계정 필요); 키트 워크플로는 [BSP 설정](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_bsp.html)에 있습니다.
- [JetPack 아카이브](https://developer.nvidia.com/embedded/jetpack-archive) — 이전 JetPack 릴리스로, Orin 제품군을 지원하는 첫 7.x 릴리스인 JetPack 7.2와 JetPack 6.x 라인이 포함됩니다.

## 문서

- [Jetson Orin Nano 개발자 키트 사용자 가이드](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) — 이 키트의 기본 참고 자료.
  - [빠른 시작](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) · [JetPack 6.x 업데이트 경로](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) · [하드웨어 레이아웃](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html)
- [Jetson Linux r39.2.1 릴리스 노트(PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) — JetPack 7.2.1의 새로운 기능, GA 상태, 알려진 문제 목록.
- [Jetson Linux r39.2 릴리스 노트(PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — JetPack 7.2의 릴리스 노트.
- [Jetson Linux 개발자 가이드(r39.2)](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html) — 플래싱 대상, 파티션 구성, 플랫폼 전력 및 성능 표.
- [추가 문서(Additional Docs)](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) — 이 키트를 위한 NVIDIA의 추가 리소스 목록(JetPack SDK, 개발자 가이드, SDK Manager 문서, Jetson 다운로드 센터, Jetson AI Lab, 개발자 포럼, Jetson 에코시스템).
- [Jetson 다운로드 센터](https://developer.nvidia.com/embedded/downloads) — NVIDIA의 Jetson 다운로드 색인; 키트 가이드가 캐리어 보드 사양서와 지원 구성 요소 목록을 위해 이곳을 가리킵니다. 일부 항목은 NVIDIA 로그인이 필요합니다.

## AI 프레임워크 및 튜토리얼

- [TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/overview.html) — Jetson용 NVIDIA의 온디바이스 LLM 추론 스택. Orin은 FP16, INT8, INT4만 지원하는 공식 타깃입니다([지원 매트릭스](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html) · [지원 모델](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html)).
- [DeepStream 9.1 설치 가이드](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) — Jetson에서의 영상 분석; DeepStream 9.1이 JetPack 7.2에서 Orin 제품군을 지원하는 릴리스입니다([빠른 시작 가이드](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html) · [Docker 컨테이너](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html)).
- [Jetson AI Lab](https://www.jetson-ai-lab.com/) — Jetson에서 AI 모델을 실행하기 위한 실습 튜토리얼을 모아 둔 파트너 운영 허브로, [Orin Nano 8 GB용 TensorRT Edge-LLM 워크스루](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/)가 포함됩니다.
- [SBSA 휠 인덱스(CUDA 13)](https://pypi.jetson-ai-lab.io/sbsa/cu130) — JetPack 7.2 / CUDA 13.2용 aarch64 Python 휠을 제공하는 파트너 호스팅 인덱스; NVIDIA 직원이 이 릴리스의 Python 휠로 이 인덱스를 가리킵니다.

## Juxi Technology

- **위키:** [wiki.juxitech.com](https://wiki.juxitech.com/) — 이 문서 시리즈; [제품 카탈로그](https://wiki.juxitech.com/products/)에는 Jetson 키트용 카메라, 센서, 액세서리가 나열되어 있습니다.
- **스토어:** [Jetson Orin Nano Super 개발자 키트](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) — 이 키트의 Juxi 스토어 등록 정보(SKU JX00110).
- **연락처:** 기술 지원 — support@juxitech.com · 영업 — sales@juxitech.com · 제품 문의 — pe@juxitech.com.

## 출처

- [Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/index.html) — [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html), [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) (2026-09-26 확인)
- [JetPack SDK 다운로드](https://developer.nvidia.com/embedded/jetpack/downloads) 및 [JetPack 아카이브](https://developer.nvidia.com/embedded/jetpack-archive) (2026-09-26 확인) — ⚠️ 구성 요소 표가 행마다 뒤처져 있으므로, 구성 요소 버전은 [NVIDIA 패키지 저장소](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages)를 기준으로 삼으십시오(위의 경고 참조)
- [NVIDIA 패키지 저장소 — r39.2 arm64 Packages 색인](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) — 메타패키지의 의존성 잠금을 통해 구성 요소 버전을 확인할 수 있는 권위 있는 출처 (2026-09-26 확인)
- Jetson Linux 릴리스 노트 — [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf), [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (2026-09-26 확인)
- [Jetson Linux 개발자 가이드](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/index.html) (2026-09-26 확인)
- [NVIDIA SDK Manager 문서](https://docs.nvidia.com/sdk-manager/install-with-sdkm-jetson/index.html) (2026-09-26 확인)
- [TensorRT Edge-LLM 문서](https://nvidia.github.io/TensorRT-Edge-LLM/overview.html) · [DeepStream 9.1 설치 가이드](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) · [Jetson AI Lab](https://www.jetson-ai-lab.com/) · [SBSA 휠 인덱스](https://pypi.jetson-ai-lab.io/sbsa/cu130) (2026-09-26 확인)
- [Juxi Technology 스토어 제품 페이지](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) 및 [위키](https://wiki.juxitech.com/) (2026-09-26 확인)

*상태: 초안, cheny 검토 대기 중.*

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 이 페이지는 Juxi Technology가 게시하며 NVIDIA의 공식 발행물이 아닙니다.
