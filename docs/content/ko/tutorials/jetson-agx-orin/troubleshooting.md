---
title: 문제 해결
sidebar_label: 문제 해결
slug: /support/troubleshooting
description: >-
  Jetson AGX Orin 개발자 키트를 위한 증상 기반 문제 해결 —
  부팅과 디스플레이, 전원, 플래싱, 알려진 문제를 NVIDIA
  공식 문서에 근거하여 다룹니다.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-23
review_owner: cheny
---

# 문제 해결

문제는 증상별로 묶여 있습니다 — 해당하는 증상을 찾은 다음, 점검 사항을 순서대로
따라가십시오. 이 페이지의 모든 내용은 NVIDIA 공식 문서에 근거합니다(출처는 하단).
여기서 다루지 않는 내용은 문서 끝의 *도움 받기*를 참조하십시오.

## 키트에 전원이 켜지지 않음

1. 동봉된 USB-C 전원 어댑터는 **DC 잭 위쪽의 USB-C 포트**(J24)에 연결해야 합니다 — 40핀 헤더 옆의 포트가 아닙니다.
2. 키트는 전원이 연결되면 자동으로 켜집니다. 켜지지 않으면 **전원 버튼**을 누르십시오.
3. 배럴 잭(J41)을 통해 별도의 전원 공급 장치를 사용하는 경우: 외경 5.5 mm, 내경 2.5 mm, **센터 포지티브**.

## 화면 출력 없음 / 화면이 계속 검은색으로 유지됨

- **DisplayPort가 유일한 디스플레이 출력입니다.** HDMI 포트도, USB-C를 통한 DisplayPort(DisplayPort-over-USB-C) 출력도 없습니다. HDMI 모니터를 사용하려면 **액티브** DP→HDMI 어댑터나 케이블을 사용하십시오.
- 첫 부팅은 화면이 나타나기까지 **최대 1분**이 걸릴 수 있습니다.
- **KVM 스위치**를 사용 중이라면 모니터를 키트에 직접 연결하십시오 — KVM 장치는 일반 부팅과 ISO 설치 양쪽 모두에서 검은 화면 문제를 일으키는 것으로 알려져 있습니다(NVIDIA가 설정 가이드에 이 내용을 기재해 두었습니다).
- 문제가 있는 전원 구성으로 부팅 중입니까? 아래의 *디스플레이를 연결한 상태에서 재부팅 시 시스템 충돌*을 참조하십시오 — 디스플레이를 **연결하지 않은 채로** 부팅해 본 다음, 부팅 후에 다시 연결하십시오.

## ISO 설치 후 키트가 이전 시스템으로 부팅됨

설치가 끝나면 설치 USB 스틱을 제거하십시오. 스틱을 꽂아 두면 키트가 새로 설치된
시스템 대신 스틱에서 다시 부팅될 수 있습니다. (공식 지침.)

## 플래싱 — Jetson ISO 관련 문제

- **키트가 USB 스틱에서 부팅되지 않음:** 부팅 중에 **UEFI 부트 관리자**를 열고 USB 드라이브를 선택하십시오.
- **QSPI 펌웨어 프롬프트가 나타남:** **`Y`**를 누르십시오. 이 캡슐 업데이트는 호환성을 위해 반드시 필요하며 두 번 실행됩니다. 프롬프트를 놓쳤거나 완료 여부가 확실하지 않다면 **설치를 다시 시작**하고 확인하십시오. 이 단계를 건너뛰면 설치 문제가 발생합니다(NVIDIA 릴리스 노트 알려진 문제 6266271).
- **내 키트가 L4T r35.5보다 오래됨:** ISO 방식은 설치된 BSP가 r35.5 이상이어야 합니다. 먼저 호스트 PC 방식(SDK Manager 또는 `flash.sh`)으로 r35.5 이상으로 업데이트하십시오 — [플래싱 및 업데이트](/ko/tutorials/jetson-agx-orin/flashing-and-updates)를 참조하십시오.

## 플래싱 — SDK Manager 관련 문제

- **장치가 감지되지 않음:** 다음 순서로 확인하십시오 —
  1. 케이블이 전원 포트가 아니라 **40핀 헤더 옆의 USB-C 포트**(port 10 / J40)에 꽂혀 있는지;
  2. 키트가 **Force Recovery 모드**에 진입했는지: 전원 플러그를 꽂으면서 **가운데 Force Recovery 버튼**을 누르고 있어야 합니다;
  3. 호스트가 요구 사항을 충족하는지: Ubuntu Desktop 20.04/22.04(x86_64), 8 GB RAM, 25 GB 여유 디스크, NVIDIA Developer Program 계정 로그인. (L4T 39.2 릴리스 노트에는 플래싱용 호스트 배포판이 24.04/22.04로 기재되어 있습니다 — 최신 목록은 SDK Manager의 시스템 요구 사항 페이지에서 확인하십시오.)
- **NVMe / microSD / USB 드라이브에 플래싱하고 싶음:** ISO 설치 프로그램은 eMMC와 NVMe를 지원합니다. 다른 대상에는 SDK Manager 또는 플래시 스크립트(호스트 PC)가 필요합니다.

## 디스플레이를 연결한 상태에서 재부팅 시 시스템 충돌(AGX Orin 64GB, 15W 모드)

NVIDIA 릴리스 노트 알려진 문제 **6236259**: AGX Orin 플랫폼에서는 systemd
초기화 중에 EMC 주파수를 최대값 아래로 낮추면(15W 같은 저전력 모드에서 발생합니다)
재부팅 시 시스템이 충돌할 수 있습니다 — 특히 디스플레이를 연결한 상태에서
그렇습니다. NVIDIA가 제시한 우회 방법:

1. 재부팅하기 전에 **MAXN** 전원 모드로 전환합니다(EMC가 Fmax로 복원됩니다).
2. 시스템이 다시 시작된 후 원하는 전원 모드를 적용합니다.
3. 문제가 되는 모드에서 재부팅한 경우: 디스플레이를 분리하고 부팅한 다음, 초기화가 끝난 후 디스플레이를 다시 연결합니다.

## 네트워킹 및 무선(플래싱 후 참고 사항)

- **플래싱 직후 6 GHz / WPA3에 연결할 수 없음:** 장치를 리셋한 후 다시 시도하십시오(L4T 39.2.0에서 수정된 것으로 기재되어 있으며, 구버전 이미지로 플래싱한 장치에는 리셋 안내가 여전히 적용됩니다).
- **일부 Wi-Fi 액세스 포인트가 검색되지 않음(혼잡한 환경):** 스캔 버퍼를 늘리십시오 — `wpa_cli set bss_max_count 500`(릴리스 노트의 수정된 문제 섹션에서 발췌).

## 이 페이지에서 다루지 않는 알려진 문제

본격적인 디버깅 전에 현재 릴리스 노트의 **알려진 문제** 섹션을 확인하십시오 —
일반 시스템, 카메라, 멀티미디어, 그래픽, 연결성, 디스플레이, 컴퓨트 스택 항목을
다룹니다:

- [Jetson Linux 39.2.0 릴리스 노트(PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)

## 도움 받기

- **[NVIDIA Jetson 개발자 포럼](https://forums.developer.nvidia.com/c/robotics-edge-computing/jetson-embedded-systems/70)** — 공식 커뮤니티입니다. 게시하기 전에 검색하고, `cat /etc/nv_tegra_release` 출력을 함께 포함하십시오.
- **Juxi Technology 지원** — 기술 지원 및 주문, 보증, RMA 관련 문의는 **support@juxitech.com**으로 보내주십시오. 보다 빠른 처리를 위해 주문 번호와 `cat /etc/nv_tegra_release` 출력을 함께 적어 주십시오. (영업: sales@juxitech.com · 제품 문의: pe@juxitech.com)

## 출처

- [빠른 시작](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) · [BSP 설치](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html) · [하드웨어 레이아웃](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html) — Jetson AGX Orin Developer Kit 사용자 가이드(2026-09-23 확인)
- [Jetson Linux 39.2.0 릴리스 노트(PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (2026-09-23 확인)

*상태: 초안, cheny 검토 대기 중. 고객이 보고하는 하드웨어별 동작은 다를 수 있으니,
현장 보고가 들어오는 대로 이 페이지를 업데이트하십시오.*

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 이 페이지는 Juxi Technology가
게시하며 NVIDIA의 공식 발행물이 아닙니다.
