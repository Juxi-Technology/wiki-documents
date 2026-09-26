---
title: 시스템 검증 — 버전 및 구성 요소 체크리스트
sidebar_label: 시스템 검증
slug: /getting-started/verify-your-system
description: >-
  Jetson AGX Orin 개발자 키트가 JetPack 7.2.1과 전체 구성 요소 스택으로
  동작하는지 확인하십시오 — 버전 확인 명령과 예상 구성 요소 목록.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-23
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
    note: still lists Isaac ROS as "coming soon"; see the note under Step 3
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: component versions verified through the nvidia-jetpack 7.2.1-b49 dependency chain
review_owner: cheny
---

# 시스템 검증

키트를 설정하거나 업데이트한 후에는 두 가지를 확인하십시오: **BSP 버전**과 **설치된 JetPack 구성 요소 스택**. 두 점검 모두 1분이면 끝납니다.

## 1단계 — L4T(BSP) 버전 확인

```bash
cat /etc/nv_tegra_release
```

**JetPack 7.2.1** 시스템은 다음을 보고합니다:

```
# R39 (release), REVISION: 2.1, ...
```

출력이 더 오래된 릴리스(예: R35)를 표시하면 먼저 BSP를 업데이트하십시오 — **[플래싱 및 업데이트](/ko/tutorials/jetson-agx-orin/flashing-and-updates)**를 참조하십시오.

## 2단계 — JetPack 구성 요소 확인

JetPack 구성 요소(CUDA, cuDNN, TensorRT, ...)는 Debian 패키지로 설치됩니다. 메타패키지가 설치되어 있는지 확인하십시오:

```bash
dpkg -l | grep -i nvidia-jetpack
```

그리고 CUDA 툴킷을 사용할 수 있는지 확인하십시오:

```bash
nvcc --version
```

이 릴리스의 예상 출력: **CUDA 13.2**. `nvcc`가 없거나 메타패키지가 없다면 다음 명령으로 구성 요소를 설치하십시오:

```bash
sudo apt update
sudo apt install nvidia-jetpack
```

(연결 속도에 따라 약 1시간이 걸립니다 — [빠른 시작 → 3단계](/ko/tutorials/jetson-agx-orin/quick-start)를 참조하십시오.)

## 3단계 — JetPack 7.2.1의 예상 버전

아래 표는 **JetPack 7.2.1 / Jetson Linux 39.2.1**이 실제로 설치하는 내용을 보여줍니다 — 2026-09-26에 [NVIDIA의 Jetson apt 저장소](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages)의 `nvidia-jetpack` 7.2.1 의존성 체인을 통해 확인했습니다:

| 구성 요소 | 버전 |
|---|---|
| Jetson Linux (L4T) | 39.2.1 |
| 운영 체제 | Ubuntu 24.04 (L4T) |
| 커널 | 6.8 |
| CUDA | 13.2.2 |
| cuDNN | 9.20.0 |
| TensorRT | 10.16.2 |
| VPI(컴퓨터 비전) | 4.1.4 |
| V4L2 | 1.22.1 |
| DeepStream SDK | 9.1 |
| Holoscan SDK | 3.9.0 |
| Nsight Systems | 2026.3 |
| NVIDIA Container Toolkit | 1.19(ISO 이미지 포함) |
| Isaac ROS | *JetPack 페이지에서는 "출시 예정"* — 별도로 릴리스됨, 아래 참고 사항 참조 |

> **Juxi 참고:** `dpkg`는 패키지 버전을 빌드 또는 리비전 접미사와 함께 표시할 수 있습니다(예: `13.2.2-1`, L4T 패키지의 경우 `7.2.1-b49`). 이는 정상입니다 — 접미사가 아니라 버전 번호를 맞추십시오.
>
> **JetPack 다운로드 페이지가 뒤처진 부분(2026-09-26 확인):** 해당 페이지의 요약 표에는 여전히 CUDA **13.2.1**과 VPI **4.1.3**이 실려 있습니다 — 이는 JetPack **7.2**의 값입니다. `nvidia-jetpack` 7.2.1이 설치하는 것은 CUDA **13.2.2**(빌드 13.2.86)이며 VPI **4.1.4**입니다. 위의 apt 저장소가 권위 있는 출처입니다.
>
> **Isaac ROS(2026-09-26 재확인):** JetPack 다운로드 페이지에는 여전히 "출시 예정"으로 표시되어 있지만, Isaac ROS는 릴리스 **4.6.0**(2026-08-18)부터 Jetson Orin + JetPack 7.2를 지원해 왔습니다. Isaac ROS는 JetPack과 독립적으로 릴리스되므로 자체 릴리스 노트가 기준이 되는 출처입니다. 로보틱스 사용자는 Isaac ROS에 의존하는 작업을 계획하기 전에 [JetPack 7.2에서의 로보틱스](/ko/tutorials/jetson-agx-orin/robotics)를 참조하십시오.

## 선택 사항 — 시스템 활동을 간단히 살펴보기

`tegrastats`(Jetson Linux에 포함)는 CPU/GPU/메모리 사용량을 실시간으로 출력합니다:

```bash
tegrastats
```

중지하려면 `Ctrl`+`C`를 누르십시오.

## 무언가 빠져 있다면

1. `sudo apt update && sudo apt install nvidia-jetpack`을 다시 실행하십시오.
2. 설정 과정의 `apt dist-upgrade` + 재부팅이 완료되었는지 확인하십시오([빠른 시작 → 3단계](/ko/tutorials/jetson-agx-orin/quick-start) 참조).
3. 디스크 공간(`df -h`)과 인터넷 연결을 확인하십시오.
4. 그래도 해결되지 않습니까? **[문제 해결](/ko/tutorials/jetson-agx-orin/troubleshooting)**을 참조하십시오.

## 참고 자료

- [JetPack SDK 설정 — Jetson AGX Orin Developer Kit 사용자 가이드](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html) (2026-09-23 확인)
- [JetPack SDK 다운로드 및 릴리스 노트](https://developer.nvidia.com/embedded/jetpack/downloads) (2026-09-23 확인)

*상태: 초안, cheny 검토 대기 중. 기재된 날짜 기준 NVIDIA 공식 문서에 근거하며, 아직 Juxi Technology가 실제 하드웨어에서 검증하지 않았습니다.*

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 이 페이지는 Juxi Technology가 게시하며 NVIDIA의 공식 발행물이 아닙니다.
