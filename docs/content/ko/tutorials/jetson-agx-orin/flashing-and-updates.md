---
title: 플래싱 및 업데이트 — BSP 설치 방식
sidebar_label: 플래싱 및 업데이트
slug: /getting-started/flashing-and-updates
description: Jetson AGX Orin 개발자 키트에 BSP를 설치하거나 업데이트하는 세 가지 공식 방식 — Jetson ISO(권장), NVIDIA SDK Manager, Linux_for_Tegra 플래시 스크립트 — 및 Force Recovery 모드 진입 방법.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-23
review_owner: cheny
---

# 플래싱 및 업데이트 — BSP 설치 방식

NVIDIA는 개발자 키트에 BSP를 설치하거나 업데이트하는 세 가지 공식 방식을 지원합니다. 상황에 따라 선택하십시오:

| | 💾 eMMC로 시작 | 🛠️ SDK Manager | 📜 플래시 스크립트 |
|---|---|---|---|
| 간단 요약 | 사전 플래싱된 eMMC로 부팅하고 Jetson ISO로 업데이트 | 호스트 PC의 GUI 도구; BSP를 플래싱하고 JetPack 패키지를 설치할 수 있음 | 호스트 PC의 `flash.sh` 스크립트 |
| Ubuntu 호스트 PC | **불필요** | 필요 | 필요 |
| 일반적인 소요 시간 | 최초 부팅은 즉시; ISO 업데이트는 약 15분 | 플래싱에 약 30분 | 구성에 따라 다름 |
| 대상 사용자 | 모든 사용자(권장 기본 방식) | Ubuntu PC가 있는 사용자; NVMe/microSD/USB에 플래싱해야 하거나 키트에 인터넷을 연결할 수 없을 때 | 제품 개발자, 고급 사용자 |

> **Juxi 참고:** 현재 릴리스는 **JetPack 7.2.1 (L4T r39.2.1)**입니다. 키트가 신품이라면 **[퀵 스타트](/ko/tutorials/jetson-agx-orin/quick-start)**부터 시작하십시오 — 권장 경로를 처음부터 끝까지 안내합니다.

## 방법 1 — eMMC로 시작, Jetson ISO로 업데이트(권장)

개발자 키트는 eMMC에 L4T BSP가 사전 플래싱된 상태로 출하되며, 개봉 즉시 Ubuntu 데스크톱으로 부팅됩니다. 권장 업데이트 경로는 **Jetson ISO**입니다 — **Ubuntu 호스트 PC 없이** 키트를 업데이트하는 부팅 가능한 USB 스틱입니다.

**전제 조건:** 설치된 BSP가 **L4T r35.5 이상**이어야 합니다(`cat /etc/nv_tegra_release`로 확인). 구형 키트는 먼저 호스트 PC 방식(아래 방법 2 또는 3)이 필요합니다.

전체 단계별 절차(Balena Etcher로 USB 생성, UEFI 부팅, QSPI 캡슐 프롬프트, GRUB 메뉴, 저장 장치 선택, 최초 부팅)는 **[퀵 스타트 → 2단계](/ko/tutorials/jetson-agx-orin/quick-start)**에 있습니다.

NVIDIA 문서의 주요 내용:

- GRUB 메뉴에서 설치 대상을 선택합니다: **eMMC** 또는 **NVMe**(SSD를 장착했다면 NVMe 권장).
- 프롬프트가 나타나면 `Y`로 **QSPI 캡슐 업데이트**를 확인하십시오 — 호환성을 위해 반드시 필요하며 두 번 실행됩니다. 건너뛰면 설치 문제가 발생합니다(이 문제는 L4T 릴리스 노트에 알려진 문제 6266271로도 기재되어 있습니다).
- 이미 JetPack 7.2.1이 실행 중인 시스템에 재설치하는 것도 지원됩니다 — 공식 지침을 주의 깊게 따르십시오.

## 방법 2 — NVIDIA SDK Manager(호스트 PC)

다음과 같은 경우 SDK Manager를 선택하십시오:

- 기본 L4T BSP를 eMMC가 아닌 **다른 저장 매체**(NVMe SSD, USB 드라이브 또는 microSD 카드)에 플래싱하거나,
- **인터넷에 직접 연결할 수 없는** 키트를 플래싱할 때.

**호스트 PC 요구 사항**(NVIDIA SDK Manager 문서 기준): x86_64의 Ubuntu Desktop **20.04 또는 22.04**, 8 GB 시스템 메모리, 25 GB의 여유 디스크 공간, 그리고 도구를 다운로드하고 로그인하기 위한 **NVIDIA Developer Program 멤버십**(무료)입니다. 참고: L4T 39.2 릴리스 노트에는 플래싱용 호스트 Linux 배포판이 Ubuntu **24.04 및 22.04**로 기재되어 있습니다 — 이 분야는 변화가 빠르므로 현재 목록은 NVIDIA SDK Manager 시스템 요구 사항 페이지에서 확인하십시오.

**설치 및 로그인:**

1. NVIDIA에서 SDK Manager `.deb` 패키지를 다운로드하여 설치합니다: `sudo apt install ./sdkmanager_*-*_amd64.deb`
2. `sdkmanager`로 실행하고 **NVIDIA DEVELOPER** 탭을 클릭한 뒤 로그인합니다.

**하드웨어 설정 및 Force Recovery 모드:**

1. 동봉된 USB-A↔USB-C 케이블로 키트를 호스트 PC에 연결하되, **40핀 헤더 옆의 USB-C 포트**(port 10 / J40으로 표기)에 꽂습니다.
2. **가운데 Force Recovery 버튼을 누른 상태에서**(2번 버튼, Power와 Reset 사이) USB-C 전원 공급 장치를 DC 잭 위의 USB-C 포트에 연결합니다. 키트가 **Force Recovery 모드**로 전원이 켜집니다.
3. 호스트에서 SDK Manager가 키트를 감지해야 합니다. *(감지되지 않으면 [문제 해결](/ko/tutorials/jetson-agx-orin/troubleshooting)을 참조하십시오.)*

**SDK Manager에서의 플래싱 단계**(요약 — 화면의 지침을 따르십시오):

1. **Step 01:** 제품 카테고리로 **Jetson**을 선택하고, "Host Machine" 선택을 해제한 뒤, **Jetson AGX Orin** 모듈을 선택하고 계속합니다.
2. **Step 02:** 기본 BSP만 필요하면 **Jetson OS**만 선택합니다("Jetson SDK Components" 선택 해제). 라이선스에 동의합니다.
3. **Step 03:** sudo 암호를 입력하고 다운로드를 기다립니다. 플래싱 대화 상자에서 **"Manual Setup – Jetson AGX Orin"**을 선택하고, OEM 구성을 무시한 뒤, 플래싱할 **Storage Device**를 선택하고 **Flash**를 클릭합니다.
4. 플래싱이 끝나면 키트가 새 BSP로 재부팅됩니다. Ubuntu `oem-config`를 완료한 다음 JetPack 구성 요소를 설치합니다([퀵 스타트 → 3단계](/ko/tutorials/jetson-agx-orin/quick-start) 참조).

## 방법 3 — Linux_for_Tegra 플래시 스크립트

고급 사용자와 제품 개발자용: Jetson Linux 패키지의 `flash.sh`(또는 initrd flash) 스크립트는 호스트 PC에서 Jetson 디바이스를 플래싱합니다. [Jetson Linux Developer Guide](https://docs.nvidia.com/jetson/archives/DeveloperGuide)의 **Flashing Support** 섹션을 참조하십시오.

L4T 39.2 릴리스 노트에 나온 호스트 및 툴체인 정보: 플래싱용 호스트 Linux 배포판 — Ubuntu 24.04 / 22.04; 크로스 컴파일 툴체인 — GCC 13.2; 소스 릴리스 태그 — `jetson_39.2_GA`.

## Force Recovery 모드 — 진입 방법

위와 동일한 절차이며, 진입하는 데 호스트는 필요하지 않습니다:

1. 키트 전원이 꺼진 상태에서 USB-C 데이터 케이블을 호스트에 연결하고(호스트가 필요하다면),
2. **가운데 Force Recovery 버튼을 누른 채** USB-C 전원 공급 장치를 연결합니다 — 키트가 Force Recovery 모드로 시작됩니다.

복구 모드에서 나가려면 키트의 전원을 껐다 켜거나 리셋합니다. 호스트에서는 복구 모드가 일반적으로 NVIDIA USB 장치로 표시됩니다(`lsusb`).

## 플래싱 이후

결과를 확인하십시오: **[시스템 검증](/ko/tutorials/jetson-agx-orin/verify-your-system)** — L4T, CUDA 및 전체 JetPack 구성 요소 스택의 버전을 점검합니다.

## 참고 자료

- [BSP 설치 — Jetson AGX Orin Developer Kit 사용자 가이드](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html) (2026-09-23 확인)
- [퀵 스타트 — 동일 가이드](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) (2026-09-23 확인)
- [Jetson Linux 39.2.0 릴리스 노트(PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (2026-09-23 확인)
- [NVIDIA SDK Manager](https://developer.nvidia.com/sdk-manager)

*상태: 초안, cheny 검토 대기 중. 기재된 날짜 기준 NVIDIA 공식 문서에 근거하며, 아직 Juxi Technology가 실제 하드웨어에서 검증하지 않았습니다.*

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 이 페이지는 Juxi Technology가 게시하며 NVIDIA의 공식 발행물이 아닙니다.
