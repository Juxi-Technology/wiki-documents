---
title: 인터페이스 및 하드웨어 레이아웃
sidebar_label: 인터페이스 & 하드웨어 레이아웃
slug: /product/interfaces
description: >-
  NVIDIA Jetson AGX Orin 개발자 키트의 라벨이 표시된 레이아웃 및 커넥터 레퍼런스 —
  버튼, 포트, 캐리어 보드 커넥터, 디스플레이 및 스토리지 옵션, 40핀 헤더와 자동화
  헤더.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-23
review_owner: cheny
---

# 인터페이스 및 하드웨어 레이아웃

개발자 키트에는 두 가지 참조 체계가 있습니다. NVIDIA 공식 가이드와 이 페이지에서 사용하는 **측면도의 번호 라벨(0–12)**과, PCB에 인쇄된 **캐리어 보드 커넥터 번호(J 번호)**입니다. 나머지 가이드들도 이 번호들을 참조하므로 두 가지 모두 숙지해 두세요.

## 측면도 — 라벨이 표시된 부품

![개발자 키트 — 버튼과 DC 입력부 각도](/images/jetson-agx-orin/jaodk_labeled_01.png)
![개발자 키트 — PCIe 커버와 40핀 각도](/images/jetson-agx-orin/jaodk_labeled_02.png)

| # | 부품 | 비고 |
|---|---|---|
| 0 | 흰색 LED | 전원 표시등 |
| 1 | 전원 버튼 | |
| 2 | Force Recovery 버튼 | 복구 / 플래시 모드에 사용 |
| 3 | 리셋 버튼 | |
| 4 | USB Type-C 포트 | DFP 전용(주변기기 연결) |
| 5 | DC 전원 잭 | 배럴 잭 — 사양은 J41 참조 |
| 6 | 이더넷 포트 | |
| 7 | USB Type-A ×2 | USB 3.2 Gen 2 |
| 8 | DisplayPort 출력 | **키트의 유일한 디스플레이 인터페이스** |
| 9 | USB micro-B 포트 | 디버그용 |
| 10 | USB Type-C 포트 | 플래싱 및 데이터(UFP 및 DFP) |
| 11 | 40핀 커넥터 | |
| 12 | USB Type-A ×2 | USB 3.2 Gen 1 |

## 캐리어 보드 — 커넥터

| 마크 | 커넥터 | 사양 / 비고 |
|---|---|---|
| DS2 | 흰색 LED | |
| S1 / S2 / S3 | 전원 / 리셋 / Force Recovery 버튼 | |
| J24 | USB Type-C(DC 잭 위) | DFP 전용, USB 3.2 Gen 2 — **동봉된 USB-C 전원 공급 장치를 연결하는 곳입니다** |
| J41 | DC 전원 잭 | 5.5 mm OD, 2.5 mm ID, 센터 플러스(center positive) |
| J17 | 이더넷 | 최대 10GBASE-T |
| J33 | USB Type-A ×2(이더넷 옆) | USB 3.2 Gen 2 |
| J18 | DisplayPort 출력 | MST 지원 |
| J26 | USB micro-B | 디버그 UART |
| J40 | USB Type-C(40핀 헤더 옆) | UFP 및 DFP — **SDK Manager용으로 호스트 PC에 연결할 때 사용하는 포트입니다** |
| J30 | 40핀 커넥터 | PCB에서 핀 1에 흰색 삼각형이 표시되어 있습니다 |
| J42 | 자동화 헤더 | 자동 전원 켜기, wake-on-LAN, 스로틀링 트리거(핀 설명은 아래) |
| J13 | RTC 백업 배터리 커넥터 | |
| J509 | 카메라 커넥터 | |
| J502 | JTAG 디버그 커넥터 | |
| J505 | M.2 E-Key 슬롯 | 일반적으로 Wi-Fi 모듈 장착 |
| J511 | HD Audio 헤더 | |
| J1 | M.2 M-Key 슬롯 | NVMe SSD용 |
| J10 | microSD 카드 슬롯 | UHS-1 |
| J3 | Jetson 모듈 커넥터 | 699핀 |
| J6 | PCIe x16 커넥터 | 전기적으로 PCIe 4.0 ×8 |
| J9 | 팬 커넥터 | 4핀, 1.25 mm 피치 |

> **사람들이 가장 먼저 묻는 세 가지:**
> - **디스플레이:** DisplayPort(J18)가 *유일한* 디스플레이 출력입니다 — HDMI 포트도, USB-C를 통한 DisplayPort 출력도 없습니다. HDMI 모니터를 사용하려면 액티브 DP→HDMI 어댑터나 케이블을 사용하세요.
> - **전원:** 동봉된 USB-C 전원 공급 장치는 **J24**(DC 잭 위의 USB-C 포트)에 연결합니다. 별도의 배럴 잭 입력(J41)은 전원을 직접 공급할 경우 사용할 수 있습니다.
> - **호스트 PC 연결:** SDK Manager나 시리얼 콘솔에는 **J40**(40핀 헤더 옆의 USB-C 포트)을 사용하세요 — J24가 아닙니다.

## DisplayPort 출력

- DP SST, DP MST(외부 디스플레이 최대 2대), DP DSC를 지원합니다
- 최대 해상도: 8K@30 / 4K@120(DSC 사용 여부 무관)
- 출력 포맷: RGB 8/10 bpc, YUV444 8/10 bpc

## 스토리지 옵션

- **기본:** 모듈에 내장된 eMMC 플래시 메모리
- **옵션:** NVMe SSD(M.2 M-Key, J1) · microSD 카드(J10, UHS-1) · USB 드라이브

Jetson ISO 설치 프로그램은 시스템을 eMMC 또는 NVMe에 설치할 수 있으며, SDK Manager는 기본 L4T BSP를 지원되는 모든 저장 매체에 플래시할 수 있습니다.

## 40핀 헤더(J30)

![40핀 헤더 핀 배열](/images/jetson-agx-orin/jao_cbspec_figure_3-4_black-bg.png)
*40핀 헤더 핀 배열 — NVIDIA의 Carrier Board Specification에서 발췌.*

![40핀 헤더의 핀 1 표시](/images/jetson-agx-orin/jao_40pin_pin1_marking.png)
*PCB에서 핀 1에 흰색 삼각형이 표시되어 있습니다.*

## 자동화 헤더(J42)

생산 및 자동화 배선에 사용됩니다:

- 핀 1, 12: GND
- 핀 2, 3, 4: 입력 — Force Recovery / 리셋 / 전원 버튼과 동일한 기능
- 핀 5–6: 오픈 = 자동 전원 켜기 비활성화, 단락(쇼트) = 자동 전원 켜기 활성화
- 핀 7: CVB_STBY 출력 — 모듈이 슬립 상태인지 여부를 나타냅니다
- 핀 8: SYSTEM_OC 입력 — Tegra 스로틀링을 트리거합니다
- 핀 9–10: 오픈 = 전원 꺼진 상태에서 wake/boot-on-LAN 비활성화, 단락 = 활성화
- 핀 11: JTAG_TRST — JTAG 테스트 리셋

## 출처

- [하드웨어 레이아웃 — Jetson AGX Orin Developer Kit 사용자 가이드](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html) (2026-09-23 확인)
- 캐리어 보드 세부 사항은 *NVIDIA Jetson AGX Orin Developer Kit Carrier Board Specification* 문서를 참조하세요(NVIDIA [다운로드 페이지](https://developer.nvidia.com/embedded/downloads)에서 내려받을 수 있습니다)

*상태: 초안, cheny의 검토 대기 중. 위 단계와 값은 명시된 날짜 기준 NVIDIA 공식 문서에 근거하며, 아직 Juxi Technology의 실제 하드웨어에서 검증되지 않았습니다.*

**이미지 출처:** 레이아웃 다이어그램과 핀 배열 이미지는 NVIDIA 공식 *Jetson AGX Orin Developer Kit User Guide* 및 *Carrier Board Specification*(2026-09-23 다운로드)에서 가져온 것이며, 저작권은 © NVIDIA Corporation에 있습니다.

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 이 페이지는 Juxi Technology가 게시하며 NVIDIA의 공식 발행물이 아닙니다.
