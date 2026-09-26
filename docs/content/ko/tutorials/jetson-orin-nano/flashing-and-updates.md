---
title: 플래싱 및 업데이트 — BSP 설치 방식
sidebar_label: 플래싱 및 업데이트
slug: /getting-started/flashing-and-updates
description: >-
  Jetson Orin Nano Super 개발자 키트에 BSP를 설치하거나 업데이트하는 세 가지 공식
  방식 — Jetson ISO(권장), NVIDIA SDK Manager, Linux_for_Tegra 플래시 스크립트 —
  과 함께 스토리지 선택, 구형 키트를 위한 JetPack 6.x 펌웨어 업데이트 경로,
  Force Recovery 모드를 다룹니다.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_bsp.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/DeveloperGuide/IN/QuickStart.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://developer.nvidia.com/w/sdkmanager/resources/instructions/monitor_mode_installation_orin.html
    checked: 2026-09-26
review_owner: cheny
---

# 플래싱 및 업데이트 — BSP 설치 방식

NVIDIA는 Jetson Orin Nano Super 개발자 키트에 BSP(Jetson Linux)를 설치하거나 업데이트하는 세 가지 공식 방식을 지원합니다. 두 가지 하드웨어 사실이 이 모두를 규정합니다: **박스에 스토리지가 없고**(eMMC도, microSD 카드도, SSD도 없음), JetPack 7.2에서 **SD 카드 이미지가 제거**되었습니다 — USB 스틱에 담긴 통합 ISO가 이를 대체하며, microSD 카드 자체는 여전히 유효한 설치 대상입니다.

| | Jetson ISO(권장) | NVIDIA SDK Manager | Linux_for_Tegra 플래시 스크립트 |
|---|---|---|---|
| 간단 요약 | 아무 PC에서나 만든 USB 설치 프로그램으로 키트를 부팅; 대상 스토리지는 키트에서 선택 | 호스트 PC의 GUI 도구; USB-C를 통해 선택한 스토리지에 BSP를 플래싱 | 호스트 PC의 명령줄 플래싱 도구; 대상에 대한 직접 제어 |
| Ubuntu 호스트 PC | 불필요 | 필요(x86_64) | 필요(x86_64) |
| 일반적인 소요 시간 | 미공개; 설치 프로그램이 "몇 분간" 출력을 표시 | 미공개; 호스트가 먼저 BSP와 루트 파일 시스템을 다운로드 | 구성에 따라 다름 |
| 대상 사용자 | 새 키트의 최초 설정; 대부분의 사용자 | Ubuntu PC가 있는 사용자; NVMe SSD에 직접 플래싱할 때 NVIDIA가 선호하는 경로; 펌웨어 업데이트에도 사용 | 고급 사용자 및 제품 개발자 |

NVIDIA는 설치 시간을 공개하지 않습니다. 포럼 보고는 약 15분에서 2시간까지 분포합니다(미확인).

> **Juxi 참고:** 현재 릴리스는 **JetPack 7.2.1 (L4T r39.2.1)**입니다. 새 키트라면 **[빠른 시작](/ko/tutorials/jetson-orin-nano/quick-start)**부터 시작하십시오 — 권장 ISO 경로를 처음부터 끝까지 안내합니다. 경로를 비교하거나, 스토리지를 고르거나, 구형 키트를 업데이트하려면 이 페이지로 돌아오십시오.

## 방법 1 — Jetson ISO(권장)

Jetson ISO는 NVIDIA가 권장하는 최초 설정 경로이며 Ubuntu 호스트 PC가 필요 없는 유일한 방식입니다: 아무 컴퓨터에서나 ISO 파일 하나를 USB 스틱에 기록하고, 스틱에서 키트를 부팅한 뒤, 준비한 스토리지에 설치합니다. 다음 항목을 준비하십시오:

- **대상 스토리지**(키트에는 없음; 아래 스토리지 섹션 참조): 설치 프로그램을 부팅하기 전에 **모듈 하단면**의 슬롯에 삽입하는 **microSD 카드, 64 GB UHS-1 이상(권장)**, 또는 **NVMe SSD**(선택 사항, 더 큰 용량과 더 나은 스토리지 성능을 위해 권장).
- **USB 플래시 드라이브, 16 GB 이상** — 이것이 설치 USB가 됩니다.
- **최소 25 GB의 여유 공간이 있는 노트북 또는 PC(Windows, Mac, Linux)**, ISO를 기록하기 위한 것입니다.
- **DisplayPort 모니터와 USB 키보드**(또는 헤드리스 설정용 USB-to-TTL 시리얼 케이블; HDMI는 지원되지 않음), 그리고 동봉된 19 V 전원 공급 장치.

성패를 가르는 두 가지 주의 사항이 있습니다: 펌웨어가 JetPack 6.x 세대여야 하며 — 화면이 계속 검은색이거나 UEFI 셸이 나타나면 아래의 JetPack 6.x 업데이트 경로를 먼저 실행하십시오 — QSPI 캡슐 프롬프트에서 30초 안에 `Y`를 눌러야 합니다. 프롬프트가 시간 초과되면 나중에 설치가 실패하므로, 설치를 다시 시작하고 `Y`를 누르십시오.

> **중요** — ISO는 **USB 플래시 드라이브에 기록하고 microSD 카드에는 기록하지 마십시오**("Do not flash the Jetson ISO to a microSD card"). 설치는 또한 **선택한 대상 스토리지를 지웁니다**. 시작하기 전에 어떤 장치를 선택했는지 확인하십시오.

전체 단계별 절차 — ISO 다운로드, Balena Etcher, UEFI 부트 관리자, GRUB 메뉴, 스토리지 선택, 최초 부팅 시 Ubuntu 설정 — 는 **[빠른 시작](/ko/tutorials/jetson-orin-nano/quick-start)**에 있습니다. 설치 USB는 **"Live USB"가 아니며**(설치만 함), 설치 후 안내가 나타나면 제거하십시오.

## 방법 2 — NVIDIA SDK Manager(호스트 PC)

SDK Manager는 호스트 PC 방식입니다: USB-C를 통해 BSP를 플래싱하며, 키트의 펌웨어도 업데이트할 수 있습니다(아래 업데이트 경로 섹션 참조).

**호스트 PC 요구 사항**(키트의 BSP 설정 페이지 기준): **Ubuntu 22.04 또는 Ubuntu 20.04를 실행하는 x86 PC**; **인터넷 연결과 무료 NVIDIA Developer Program 계정**; 키트의 USB-C 포트용 **USB 케이블**과 "a jumper pin or metal paper clip"; 그리고 키트용 디스플레이 또는 USB-to-TTL 시리얼 케이블.

> **Juxi 참고:** NVIDIA의 출처가 서로 다릅니다. 키트 설정 페이지에는 Ubuntu 22.04 또는 20.04가 적혀 있고; L4T r39.2.1 릴리스 노트에는 플래싱용 호스트 배포판으로 "Ubuntu 24.04 and 22.04"가 적혀 있습니다. 호스트 PC를 준비하기 전에 NVIDIA의 SDK Manager 요구 사항을 확인하십시오.

**호스트에 SDK Manager를 설치합니다.** NVIDIA의 설정 페이지에 Ubuntu 22.04와 20.04용 정확한 명령이 나와 있습니다. `sdkmanager`로 실행한 뒤 NVIDIA Developer 자격 증명으로 로그인합니다(브라우저 창이 열리며, 2단계 인증이 나타날 수 있습니다).

**BSP를 플래싱합니다**(요약 — 화면의 지침을 따르십시오). SDK Manager는 USB를 통해 플래싱하므로, 키트를 먼저 Force Recovery 모드로 전환합니다(아래 참조):

1. **Jetson Orin Nano [8GB developer kit version]**을 선택하고 **OK**를 클릭합니다. **Host Machine** 선택을 해제하여 Jetson 타깃만 선택된 상태로 둡니다. **Continue**를 클릭합니다. 다음 단계에서는 **Jetson Linux**만 선택된 상태로 둡니다. 라이선스에 동의하고 호스트의 sudo 암호를 입력합니다.
2. 플래싱 프롬프트에서(SDK Manager가 먼저 패키지를 다운로드합니다): **Runtime for OEM Configuration**을 선택하고, 스토리지로 **NVMe** 또는 **SD Card**를 선택한 뒤, **Flash**를 클릭합니다.
3. 플래싱이 끝나면 J14 헤더에서 점퍼를 제거하고, 키트의 전원을 껐다 켠 뒤, Ubuntu 초기 설정(oem-config)을 완료합니다.

> **Juxi 참고 — 모듈 SKU:** 이 키트에는 **P3767-0005** 모듈이 들어 있으며, NVIDIA는 이를 "Jetson Orin Nano 8GB (P3767-0005, for development only)"로 문서화하고 있습니다. 상용 8GB Orin Nano 모듈은 **P3767-0003**으로, 별도의 SKU이며 이 키트의 구성품이 아닙니다. 이 키트에 대해 NVIDIA가 지정한 타깃 항목(**Jetson Orin Nano [8GB developer kit version]**)을 사용하십시오.

## 방법 3 — Linux_for_Tegra 플래시 스크립트

고급 사용자와 제품 개발자용: Jetson Linux Driver Package를 사용한 명령줄 플래싱입니다. NVIDIA의 설정 페이지 기준: JetPack 릴리스에 맞는 Driver Package와 샘플 루트 파일 시스템을 다운로드하고; Ubuntu x86_64 호스트에서 Driver Package의 압축을 풀고; 샘플 루트 파일 시스템을 `Linux_for_Tegra/rootfs`에 풀어 넣은 뒤 `Linux_for_Tegra`에서 `apply_binaries.sh`를 실행하고; 키트를 Force Recovery 모드(아래)로 전환한 다음; Jetson Orin Nano Developer Kit 타깃에 맞는 플래시 명령을 실행합니다. 타깃 이름과 자세한 명령은 Jetson Linux Developer Guide에 있습니다.

- 이 키트의 타깃 이름은 `jetson-orin-nano-devkit`과 `jetson-orin-nano-devkit-super`입니다. NVIDIA는 Super 구성이 "a higher power budget and extended clock-frequency steps"를 갖는다고 설명합니다.
- 이 키트에 대한 Developer Guide의 예시 — Super 구성의 NVMe: `sudo ./l4t_initrd_flash.sh --erase-all jetson-orin-nano-devkit-super internal` (`--erase-all` 옵션은 대상 스토리지의 데이터를 지웁니다).
- L4T r39.2.1 릴리스 노트: 플래싱 호스트 — Ubuntu 24.04 / 22.04; 툴체인 — GCC 13.2; 소스 태그 — `jetson_39.2.1_GA`. JetPack 다운로드 페이지: BSP 패키지 — `Jetson_Linux_R39.2.1_aarch64.tbz2`.

## 대상 스토리지 선택: microSD vs NVMe SSD

설치 프로그램은 부팅 시점에 **이미 연결되어 있는** 스토리지만 제시합니다. 먼저 결정하고, 스토리지를 설치한 다음, 설치 프로그램을 시작하십시오.

| | microSD 카드 | NVMe SSD |
|---|---|---|
| 사양 | 64 GB UHS-1 이상 권장 | M.2 Key-M 슬롯에 장착하는 PCIe NVMe 드라이브 |
| 장착 위치 | **모듈 하단면**의 슬롯 | M.2 Key-M 2280 슬롯(PCIe 3.0 x4) 또는 2230 슬롯(PCIe 3.0 x2) |
| 선택 이유 | 모듈의 기본 스토리지; 가장 간단하고 가장 저렴한 옵션 | 더 큰 용량과 더 나은 스토리지 성능; AI 모델, 컨테이너, 데이터셋, 프로젝트 파일에 권장 |

**microSD는 여전히 유효한 설치 대상입니다.** JetPack 7.2에서 제거된 것은 SD 카드 *이미지 파일*이며 microSD *대상*이 아닙니다: ISO 흐름에서는 카드를 삽입한 상태로 USB 설치 프로그램을 부팅해 선택하면 됩니다(SDK Manager로 호스트에서 microSD 카드에 플래싱할 수도 있습니다). microSD 슬롯은 **모듈 하단면**에 있습니다. 모든 설치 경로는 **선택한 대상 스토리지를 지웁니다**, 따라서 필요한 데이터가 들어 있는 드라이브를 선택하지 마십시오. 설치 프로그램이 NVMe 드라이브를 제시하지 않는다면 **[문제 해결](/ko/tutorials/jetson-orin-nano/troubleshooting)**을 참조하십시오. 구매 조언은 **[FAQ](/ko/tutorials/jetson-orin-nano/faq)**를 참조하십시오.

## 구형 키트: JetPack 6.x 업데이트 경로

**언제 필요한가:** JetPack 7.2 이상에는 JetPack 6.x 세대의 UEFI/QSPI 펌웨어가 필요합니다. NVIDIA의 기준: 펌웨어가 **36.x 이상**이면 키트가 준비된 것이고, **36.0보다 오래되었으면** 이 경로를 먼저 완료하십시오(UEFI 메뉴에서 버전 확인; 단계는 [빠른 시작](/ko/tutorials/jetson-orin-nano/quick-start) 참조). 두 가지 공식 경로: **microSD 브리지 흐름**(아래)은 microSD 카드가 필요하지만 Ubuntu 호스트 PC는 필요 없습니다; **SDK Manager**(방법 2)는 Ubuntu 호스트 PC가 필요하며 펌웨어/QSPI 업데이트를 위해 NVIDIA가 명시한 대안입니다.

NVIDIA가 문서화한 순서대로의 브리지 흐름:

1. **JetPack 5.1.3 브리지 이미지**(`JP513-orin-nano-sd-card-image_b29.zip` — 업데이트된 이미지를 사용)를 microSD 카드에 기록하고, 카드에서 키트를 부팅해 최초 부팅 Ubuntu 설정을 완료한 다음, 키트를 인터넷에 연결합니다.
2. 그러면 백그라운드 서비스가 부트로더 업데이트를 예약합니다(데스크톱 알림이 나타날 수 있습니다). `sudo systemctl status nv-l4t-bootloader-config`로 확인하십시오 — "A completed scheduling run shows the service as inactive with a successful exit status."

   ![Jetson Linux 데스크톱의 부트로더 업데이트 알림](/images/jetson-orin-nano/nvidia-l4t-bootloader-post-install-notification.png)

3. 재부팅합니다. 펌웨어 업데이트는 부팅 중에 실행됩니다. 이후 `sudo nvbootctrl dump-slots-info`로 상태를 확인하십시오 — 이 단계에서 NVIDIA의 예시 출력은 "Current version: 35.5.0"입니다.

   ![JetPack 6.x 펌웨어에서의 펌웨어 업데이트 진행 화면](/images/jetson-orin-nano/fw-update_from_36-4.3.jpg)

4. QSPI 업데이터를 설치합니다: `sudo apt update` 실행 후 `sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater`; 재부팅하고 업데이트가 끝나게 둡니다.
5. 이제 펌웨어가 JetPack 6.x 세대에 맞게 준비되었고, 5.1.3 카드는 더 이상 대상 부팅 매체가 아닙니다. 전원을 끈 다음, USB 설치 프로그램으로 JetPack 7.2.1 설치를 실행하십시오([빠른 시작](/ko/tutorials/jetson-orin-nano/quick-start) 참조).

추가 참고: JetPack 6.2.x를 거치는 경우 첫 부팅 후 **또 하나의** UEFI 펌웨어 업데이트가 예약될 수 있습니다 — 안내가 나타나면 다시 재부팅하십시오. r39.2.1 릴리스 노트(알려진 문제 6379600)에 따르면, ISO 설치 중의 캡슐 업데이트는 **BSP 36.2 / JetPack 5.0 DP** 릴리스의 장치를 지원하지 않습니다 — 해당 장치는 먼저 이후 릴리스로 업데이트하십시오.

## Force Recovery 모드 — 진입 방법

Force Recovery 모드(RCM)는 호스트 PC가 플래싱에 필요로 하는 상태입니다. NVIDIA는 세 가지 방법을 문서화하고 있습니다:

1. **실행 중인 시스템의 터미널에서:** `sudo reboot --force forced-recovery`.
2. **키트 전원이 꺼진 상태:** 버튼 헤더(설정 페이지에서는 J14 헤더라고 부릅니다)의 핀 9와 핀 10을 연결한 다음, DC 전원을 꽂아 켭니다.
3. **키트 전원이 이미 켜진 상태:** 핀 9와 10을 연결한 다음, 핀 7과 8을 잠시 연결해 시스템을 리셋합니다.

RCM에 진입한 후, 호스트가 장치를 감지하면 점퍼를 제거하십시오. 플래싱 연결은 **USB-C 포트**를 통해 이루어지며(USB Recovery 모드로 동작합니다), 호스트에서 플래싱을 시작하기 전에 `lsusb`로 NVIDIA USB 장치가 보여야 합니다.

## 재설치 및 업그레이드

**실행 중인 키트에서 JetPack 구성 요소를 업데이트하려면** `sudo apt update` 실행 후 `sudo apt install nvidia-jetpack` — [빠른 시작](/ko/tutorials/jetson-orin-nano/quick-start)을 참조하십시오.

**BSP 재설치(동일하거나 더 새로운 JetPack).** 세 가지 경로 중 아무거나 다시 실행하면 됩니다; ISO 흐름이 키트 자체에서 가능한 옵션입니다. ISO 재설치에 대한 NVIDIA의 주의: "If you're re-installing JetPack 7.2.1 using ISO on an already installed system, please carefully follow the instructions in the Getting Started Guide." 재설치는 **대상 스토리지를 지우므로**(먼저 백업하십시오), QSPI 캡슐 프롬프트가 나타나면 30초 안에 `Y`를 누르십시오. 끝나면 USB 설치 프로그램을 제거하여 키트가 새 시스템으로 부팅되게 하십시오.

**재설치 후의 Super mode.** 7.2.1 ISO는 "flashes the Jetson Orin Nano Developer Kit with Super Mode flashing configuration by default"입니다. 이전 7.2 릴리스에서는 ISO로 업데이트한 키트가 이전 프로파일을 유지해 25 W / MAXN SUPER 모드가 없는 상태가 될 수 있었습니다(r39.2 알려진 문제 6279443; NVIDIA의 안내는 Linux 호스트나 SDK Manager에서 플래싱하라는 것이었습니다). NVIDIA는 7.2.1 ISO를 다시 실행하면 기존 non-Super 설치가 Super로 전환되는지 문서화하지 않았습니다. 키트에 25 W / MAXN SUPER 모드가 없다면 **[문제 해결](/ko/tutorials/jetson-orin-nano/troubleshooting)**을 참조하십시오.

**JetPack 메이저 버전 간 이동.** JetPack 6.x → 7.2.1 변경 목록과 롤백 참고 사항은 **[JetPack 6.x → 7.2.1](/ko/tutorials/jetson-orin-nano/jetpack-6-to-7)**을 참조하십시오. 설치나 업데이트 후에는 결과를 확인하십시오: **[시스템 검증](/ko/tutorials/jetson-orin-nano/verify-your-system)**.

## 출처

- [BSP Setup — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_bsp.html) (2026-09-26 확인)
- [Quick Start — same guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (2026-09-26 확인)
- [JetPack 6.x Update Path — same guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (2026-09-26 확인)
- [How-To — same guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (2026-09-26 확인)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (2026-09-26 확인)
- [Jetson Linux Developer Guide (r39.2.1) — Quick Start](https://docs.nvidia.com/jetson/archives/r39.2.1/DeveloperGuide/IN/QuickStart.html) (2026-09-26 확인)
- [JetPack Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (2026-09-26 확인)
- [SDK Manager — monitor-attached installation instructions](https://developer.nvidia.com/w/sdkmanager/resources/instructions/monitor_mode_installation_orin.html) (2026-09-26 확인)

*상태: 초안, cheny 검토 대기 중. 기재된 날짜 기준 NVIDIA 공식 문서에 근거하며, 아직 Juxi Technology가 실제 하드웨어에서 검증하지 않았습니다.*

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 이 페이지는 Juxi Technology가 게시하며 NVIDIA의 공식 발행물이 아닙니다.
