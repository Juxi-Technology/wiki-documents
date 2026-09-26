---
title: 시스템 검증 — 버전, Super Mode 및 전원 체크리스트
sidebar_label: 시스템 검증
slug: /getting-started/verify-your-system
description: >-
  Jetson Orin Nano Super 개발자 키트가 전체 구성 요소 스택, Super Mode 보드
  구성, 올바른 전원 모드와 함께 JetPack 7.2.1을 실행하는지 확인하십시오.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
review_owner: cheny
---

# 시스템 검증

JetPack 7.2.1 시스템을 처음 부팅한 후 이 체크리스트를 실행하십시오. **L4T 릴리스**, **설치된 JetPack 구성 요소**, **Super Mode 보드 구성**, **전원 모드**를 확인합니다. 아직 시스템을 설정하지 않았다면 **[빠른 시작](/ko/tutorials/jetson-orin-nano/quick-start)**부터 시작하십시오.

## 1단계 — L4T(BSP) 릴리스 확인

```bash
cat /etc/nv_tegra_release
```

**JetPack 7.2.1** 시스템은 **R39**, **REVISION: 2.1**을 보고합니다:

```
# R39 (release), REVISION: 2.1, GCID: 46758480, BOARD: generic, EABI: aarch64, DATE: Fri Aug 7 05:54:22 AM UTC 2026
# KERNEL_VARIANT: oot
TARGET_USERSPACE_LIB_DIR=nvidia
TARGET_USERSPACE_LIB_DIR_PATH=usr/lib/aarch64-linux-gnu/nvidia
```

> **Juxi 참고:** NVIDIA는 이 파일의 예시 출력을 공개하지 않습니다. 위 블록은 Orin 장치에서 커뮤니티가 관찰한 r39.2.1 출력이며, `GCID`와 `DATE` 값은 사용자마다 다릅니다. 중요한 부분은 `REVISION: 2.1`입니다.

출력이 더 오래된 릴리스(예: JetPack 6.x의 R36)를 보여 준다면 시스템이 JetPack 7.2.1을 실행하는 것이 아닙니다 — **[플래싱 및 업데이트](/ko/tutorials/jetson-orin-nano/flashing-and-updates)**와 **[JetPack 6.x → 7.2 마이그레이션](/ko/tutorials/jetson-orin-nano/jetpack-6-to-7)**을 참조하십시오.

## 2단계 — JetPack 구성 요소와 버전 확인

CUDA, cuDNN, TensorRT 같은 JetPack 구성 요소는 Debian 패키지로 설치됩니다. NVIDIA의 공식 목록 명령은 다음과 같습니다:

```bash
apt list --installed | grep nvidia-jetpack
```

출력에 `nvidia-jetpack` 메타패키지가 나타나야 합니다. 구성 요소 하나를 간단히 점검하려면 `dpkg`를 직접 조회하십시오 — 예를 들어 cuDNN은 `dpkg -l | grep cudnn`. 메타패키지가 없다면 `sudo apt update` 실행 후 `sudo apt install nvidia-jetpack`을 실행하고, 안내가 나타나면 재부팅하십시오.

아래 표는 **JetPack 7.2.1 / Jetson Linux 39.2.1**에 대한 NVIDIA의 공식 구성 요소 버전입니다(JetPack 다운로드 페이지에서 2026-09-26 확인):

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
| Isaac ROS | **출시됨** — Isaac ROS 4.6.0(2026년 8월)이 Jetson Orin과 JetPack 7.2 지원을 추가했습니다; NVIDIA의 구성 요소 표는 여전히 "출시 예정"이라고 표기합니다 |

> **Juxi 참고:** NVIDIA의 7.2.1 페이지는 플랫폼별이 아니라 JetPack 7 라인 전체(Thor와 Orin 통합)에 대해 하나의 매트릭스를 제시합니다. `dpkg`는 버전에 빌드 접미사를 붙여 표시할 수 있습니다 — 전체 문자열이 아니라 버전 번호를 맞추십시오. NVIDIA의 표에는 OpenCV, DLA, Python 버전이 없으므로 이 페이지에도 없습니다.

> **VPI 버전 관련:** NVIDIA의 다운로드 페이지는 7.2.1에 맞게 완전히 갱신되지 않았습니다 — VPI 행에는 여전히 JetPack 7.2 값(4.1.3)이 담겨 있습니다. JetPack 7.2.1은 실제로 **VPI 4.1.4**를 포함하며, 이는 NVIDIA 자체 패키지 저장소에서 확인했습니다: `nvidia-jetpack-runtime (= 7.2.1-b49)`는 `nvidia-vpi (= 7.2.1-b49)`에 의존하고, 이는 `libnvvpi4 (= 4.1.4)`를 고정합니다. 4.1.3과 4.1.4가 모두 패키지 풀에 존재하므로, 결정적인 것은 의존성 잠금뿐입니다. (2026-09-26 확인)

## 3단계 — jtop 설치 및 시스템 활동 확인(선택 사항)

`jtop`은 커뮤니티 프로젝트인 **jetson-stats**의 일부이며 NVIDIA 제품이 아닙니다. NVIDIA는 이 릴리스에 대해 이를 문서화하지 않았고, L4T r39와의 호환성도 NVIDIA가 검증하지 않았습니다.

[jetson-stats 프로젝트 페이지](https://pypi.org/project/jetson-stats/)의 커뮤니티 지침에 따라 설치하십시오.

그런 다음 `jtop`을 실행하십시오 — 대화형 시스템 모니터이자 프로세스 뷰어입니다. 큰 AI 워크로드를 시작하기 전에 공유 8 GB 통합 메모리를 지켜보십시오. 공식 대안은 `sudo tegrastats`입니다(CPU, GPU, 메모리, 온도 및 전력 관련 활동을 실시간으로 표시; `Ctrl`+`C`로 중지). NVIDIA의 How-To 페이지는 Jetson에서의 모니터링에 `nvidia-smi`보다 `tegrastats`를 권장합니다.

## 4단계 — Super Mode 보드 구성 확인(TNSPEC)

JetPack 7.2.1 ISO 설치에는 기본적으로 **Super Mode** 구성이 플래싱됩니다. 장치에서 확인하십시오:

```bash
cat /etc/nv_boot_control.conf
```

Super 구성 키트에서는 `TNSPEC` 줄에 `-super` 접미사가 붙습니다. NVIDIA 직원이 게시한 예시입니다:

```
TNSPEC 3767-300-0005-S.1-1-1-jetson-orin-nano-devkit-super-
```

non-Super 키트에서는 같은 줄이 `-super` 없이 끝납니다 — 예를 들어, 영향을 받은 시스템에 대한 사용자 보고에서: `TNSPEC 3767-300-0005-X.1-1-1-jetson-orin-nano-devkit-`

> **Juxi 참고:** TNSPEC 문자열 중간의 문자들은 장치와 펌웨어 상태에 따라 다릅니다. 중요한 것은 TNSPEC 줄 끝의 `-super` 접미사입니다.

릴리스 노트 이슈 **6480645**: ISO 설치 후 UEFI 변수 `TegraPlatformSpec`이 보드 사양을 정확히 반영하지 않을 수 있습니다. NVIDIA는 정확한 보드 정보를 위해 `/etc/nv_boot_control.conf`의 `TNSPEC` 항목을 읽으라고 안내합니다.

## 5단계 — 전원 모드 확인

기본 전원 모드는 일반적으로 **25W**입니다. 데스크톱에서는 Ubuntu 상단 표시줄의 전원 모드를 클릭하고 **Power Mode**를 선택한 뒤 **MAXN SUPER**를 고르십시오. 명령줄에서는 활성 모드와 모드 ID를 다음과 같이 출력합니다:

```bash
sudo /usr/sbin/nvpmodel -q
```

모드를 전환하려면 조회에서 표시된 ID를 사용하십시오(`sudo /usr/sbin/nvpmodel -m <mode_id>`). Super와 non-Super를 구별하는 방법:

| | Super 구성 | non-Super 구성 |
|---|---|---|
| 사용 가능한 모드 | 15W, 25W, **MAXN SUPER** | 7W, 15W만 |
| 모드 ID(커뮤니티 관찰) | 0 = 15W, 1 = 25W, 2 = MAXN_SUPER; 기본값 25W | 0 = 15W, 1 = 7W |
| `sudo nvpmodel -m 2` | MAXN SUPER를 선택 | 실패: `NVPM ERROR: request for bad power mode 2` |

> **Juxi 팁:** 모드 ID는 7.2 시스템의 프로파일 파일에 대한 커뮤니티 보고에서 나온 것입니다. 데스크톱 전원 메뉴에는 사용 가능한 모드가 직접 나열됩니다. GPU를 사용한 뒤에는 전원 모드 변경 시 재부팅을 요구할 수 있습니다 — NVIDIA 직원은 이 프롬프트가 정상이라고 말합니다.

## 7W와 15W만 나타나는 경우

이것은 알려진 JetPack 7.2 문제이며, 7.2.1에서 설계상 수정되었습니다.

- **JetPack 7.2 (L4T 39.2)**에서는 알려진 문제 **6279443**에 따르면 ISO 설치 프로그램으로 업데이트한 장치는 "will not default to 'Super' mode"입니다. NVIDIA의 안내는 Linux 호스트나 SDK Manager로 대상을 플래싱하라는 것이었습니다.
- **JetPack 7.2.1**은 이를 바꿉니다: "ISO now flashes the Jetson Orin Nano Developer Kit with Super Mode flashing configuration by default." 이슈 6279443은 7.2.1 알려진 문제 목록에 없으며, NVIDIA 직원은 "This would be fixed in jp7.2.1."라고 밝혔습니다.

새로 7.2.1 ISO로 설치한 시스템은 25W와 MAXN SUPER를 표시해야 합니다. 그렇지 않다면:

1. 7.2 ISO로 설치한 시스템이라면 Linux 호스트나 SDK Manager에서 Super 구성으로 다시 플래싱하십시오 — **[플래싱 및 업데이트](/ko/tutorials/jetson-orin-nano/flashing-and-updates)**를 참조하십시오.
2. NVIDIA는 7.2.1 ISO 재설치가 7.2 ISO로 설치된 보드를 전환하는지 밝히지 않았습니다. Super 모드가 여전히 없다면 **[문제 해결](/ko/tutorials/jetson-orin-nano/troubleshooting)**의 재플래싱 옵션을 사용하십시오.

같은 질문이 **[FAQ](/ko/tutorials/jetson-orin-nano/faq)**에 정리되어 있습니다.

## 정상적인 모습

| 점검 항목 | 명령 | 정상 시스템이 보여 주는 것 |
|---|---|---|
| L4T 릴리스 | `cat /etc/nv_tegra_release` | `R39 (release), REVISION: 2.1` |
| JetPack 패키지 | `apt list --installed \| grep nvidia-jetpack` | `nvidia-jetpack` 메타패키지를 포함한 설치된 JetPack 패키지 |
| cuDNN 점검 | `dpkg -l \| grep cudnn` | 버전 9.20.0 |
| 보드 구성 | `cat /etc/nv_boot_control.conf` | `TNSPEC` 줄이 `jetson-orin-nano-devkit-super-`로 끝남 |
| 전원 모드 | `sudo /usr/sbin/nvpmodel -q` | 기본 활성 모드는 25W; 15W, 25W, MAXN SUPER 선택 가능 |

## 그래도 문제가 있으면

구성 요소가 없다면: 2단계의 두 명령을 다시 실행하십시오. Super 구성이나 전원 모드 문제는 **[플래싱 및 업데이트](/ko/tutorials/jetson-orin-nano/flashing-and-updates)**와 **[문제 해결](/ko/tutorials/jetson-orin-nano/troubleshooting)**을 참조하십시오. 도움을 요청하기 전에 `cat /etc/nv_tegra_release`와 `cat /etc/nv_boot_control.conf`를 수집하십시오 — NVIDIA 직원은 구성 파일 우회 방법을 논의하기 전에 이 상태(추가로 `sudo /usr/sbin/nvpmodel -q --verbose`)를 요청합니다. Juxi 지원: 주문 번호와 함께 **support@juxitech.com**으로 보내주십시오.

## 출처

- [JetPack SDK Setup](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html) · [How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) — Jetson Orin Nano Developer Kit User Guide (2026-09-26 확인)
- [JetPack SDK Downloads and Release Notes](https://developer.nvidia.com/embedded/jetpack/downloads) (2026-09-26 확인)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) · [39.2 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (2026-09-26 확인)
- [NVIDIA forum — 25W and MAXN SUPER not seen in JetPack 7.2](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) · [continuing power-mode issues](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435) · [Super Mode not unlocking](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003) (2026-09-26 확인; NVIDIA 직원 답변 포함)
- [jetson-stats (jtop) on PyPI](https://pypi.org/project/jetson-stats/) · [Jetson AI Lab](https://www.jetson-ai-lab.com/) (2026-09-26 확인; jtop 설치에 대한 커뮤니티 출처)

*상태: 초안, cheny 검토 대기 중. 기재된 날짜 기준 NVIDIA 공식 문서와 NVIDIA 포럼 출처에 근거하며, 아직 Juxi Technology가 실제 하드웨어에서 검증하지 않았습니다.*

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 이 페이지는 Juxi Technology가 게시하며 NVIDIA의 공식 발행물이 아닙니다.
