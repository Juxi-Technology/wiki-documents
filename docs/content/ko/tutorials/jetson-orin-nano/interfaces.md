---
title: 인터페이스 및 하드웨어 레이아웃
sidebar_label: 인터페이스 & 하드웨어 레이아웃
slug: /product/interfaces
description: >-
  NVIDIA Jetson Orin Nano Super 개발자 키트의 라벨이 표시된 레이아웃 및 커넥터
  레퍼런스 — 모든 포트, 슬롯, 헤더, 컨트롤과 모듈 하단면의 microSD 슬롯, 카메라
  커넥터, 전원, 시리얼 콘솔.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/slow-wi-fi-on-orin-nano-devkit-rtl8822ce-802-11ac/368697
    checked: 2026-09-26
review_owner: cheny
---

# 인터페이스 및 하드웨어 레이아웃

이 키트는 두 개의 보드로 이루어져 있습니다: **레퍼런스 캐리어 보드**(P3768)에 장착된 **Jetson Orin Nano 모듈**(P3767)이며, 완성된 키트는 P3766입니다. 이 페이지는 NVIDIA의 공식 마크(1–12)를 사용하여 커넥터와 컨트롤을 다룹니다.

## 번호 레이아웃 — 라벨이 표시된 부품

![개발자 키트의 번호 레이아웃](/images/jetson-orin-nano/jetson-orin-nano-qtr_numbered.png)
*공식 번호 레이아웃 — NVIDIA의 마크 1–12.*

| # | 부품 | 비고 |
|---|---|---|
| 1 | microSD 카드 슬롯 | **모듈 하단면**에 있음 — 아래 참조 |
| 2 | 40핀 확장 헤더 | UART, SPI, I2S, I2C, GPIO |
| 3 | 전원 표시 LED | 녹색; 키트에 전원이 들어오면 점등 |
| 4 | USB-C 포트 | 호스트, 장치, USB 복구 모드; 비디오 출력 없음 |
| 5 | 기가비트 이더넷 포트 | RJ45 |
| 6 | USB 3.2 Type-A ×4 | 10 Gbps; 2단 적층 커넥터 2개 |
| 7 | DisplayPort 출력 | **키트의 유일한 디스플레이 출력** |
| 8 | DC 전원 잭 | 5.5 mm × 2.5 mm 배럴 잭 |
| 9 | MIPI CSI 카메라 커넥터 ×2 | 22핀, 0.5 mm 피치 |
| 10 | M.2 Key-M 슬롯(2280) | PCIe 3.0 ×4 — NVMe SSD용 |
| 11 | M.2 Key-M 슬롯(2230) | PCIe 3.0 ×2 — NVMe SSD용 |
| 12 | M.2 Key-E 슬롯(2230) | 동봉된 무선 모듈이 장착되어 있음 |

> **먼저 알아야 할 세 가지:**
> - **스토리지:** eMMC가 없고 **박스에 스토리지가 없습니다**. microSD 카드나 NVMe SSD를 추가하십시오.
> - **microSD 슬롯:** **모듈 하단면**에 있습니다 — 아래 참조.
> - **디스플레이:** DisplayPort가 *유일한* 디스플레이 출력입니다 — HDMI도, USB-C를 통한 비디오 출력도 없습니다.

## microSD 슬롯 — 모듈 하단면

![모듈 하단면의 microSD 슬롯](/images/jetson-orin-nano/jetson-orin-nano-dev-kit-sd-slot.jpg)
*카드는 **모듈 하단면**에 삽입합니다 — NVIDIA 이미지(확대 부분 포함).*

> **주의:** microSD 슬롯(마크 1)은 캐리어 보드가 아니라 **모듈 하단면**에
> 있습니다. 이 키트에서 가장 많이 놓치는 물리적 세부 사항입니다. 설치
> 프로그램을 부팅하기 전에 카드를 삽입하십시오.

- 키트는 microSD 카드가 있으면 그 카드에서 부팅합니다. 64 GB UHS-1 이상을 권장합니다.
- 설치 프로그램이 카드를 표시하지 않는다면, NVIDIA의 문제 해결 안내에 따라 카드가 모듈 슬롯에 완전히 삽입되었는지 확인하십시오.
- JetPack 7.2 이상에는 SD 카드 이미지가 없습니다. 설치된 내용을 바꾸려면 지원되는 설치 경로를 사용하십시오 — **[플래싱 및 업데이트](/ko/tutorials/jetson-orin-nano/flashing-and-updates)**를 참조하십시오.

## 스토리지 옵션

- **microSD**(모듈 하단면, 마크 1) — 모듈의 주 스토리지.
- **NVMe SSD** — M.2 Key-M 슬롯(아래 마크 10과 11)에 2280 또는 2230 크기.
- **USB 드라이브** — USB-C 또는 Type-A에 연결; 부팅 순서는 UEFI 부트 관리자에서 설정합니다.

무엇을 구매해야 하는지와 최초 부팅 흐름은 **[빠른 시작](/ko/tutorials/jetson-orin-nano/quick-start)**을 참조하십시오.

## USB

| 포트 | 속도 | 모드 | 비고 |
|---|---|---|---|
| USB 3.2 Type-A ×4(마크 6) | USB 3.2 Gen 2, 10 Gbps | 호스트 전용 | 2단 적층 커넥터 2개; 스택당 VBUS 3 A로 제한 |
| USB-C(마크 4) | USB 3.2 Type-C | 호스트, 장치, USB 복구 | 데이터 전용 — 이 포트는 비디오를 출력하지 않음 |

**장치 모드**에서 USB-C 포트는 키트를 호스트 PC에 다음과 같이 표시합니다:

- **L4T-README** 파일이 있는 대용량 저장 장치;
- USB 시리얼 장치;
- USB 이더넷(RNDIS) 링크 — Jetson은 **192.168.55.1**에 있습니다.

## DisplayPort 출력

- 출력은 하나뿐입니다(마크 7): **MST를 지원하는 DisplayPort 1.2**. HDMI 포트가 없고, USB-C 포트는 비디오를 전달하지 않습니다.
- HDMI 모니터를 사용하려면 DisplayPort-to-HDMI 어댑터를 사용하십시오.
- 디스플레이 출력이 없다면 모니터를 키트에 직접 연결하십시오 — KVM 스위치나 어댑터 체인을 거치지 마십시오.

## 이더넷

- 1× 기가비트 이더넷(RJ45), 마크 5. 이 키트에는 10 GbE 포트가 없습니다.

## M.2 슬롯

| 마크 | 슬롯 | 크기 | 전기적 사양 | 장착 대상 |
|---|---|---|---|---|
| 10 | M.2 Key-M | 2280 | PCIe 3.0 ×4 | NVMe SSD |
| 11 | M.2 Key-M | 2230 | PCIe 3.0 ×2 | NVMe SSD |
| 12 | M.2 Key-E | 2230 | — | 동봉된 무선 모듈(장착됨) |

### 무선 모듈

- Key-E 슬롯은 **모듈이 장착된 상태**로 출고됩니다. NVIDIA는 이 카드를 "802.11ac/ab/gn wireless network interface controller"로만 설명하며 칩 이름은 밝히지 않습니다.
- 커뮤니티 보고(미확인)는 기본 제공 카드를 **Realtek RTL8822CE**(AzureWave 모듈, PCI ID 10ec:c822)로 식별합니다. 이는 NVIDIA의 발표가 아닌 커뮤니티 정보입니다.
- 공식 지원 NVMe 모델과 Key-E 모듈은 공개 페이지가 아니라 Jetson Download Center의 "Jetson supported components information" 목록에 있습니다. 구매 전에 그곳에서 부품을 확인하십시오.
- 카드가 네트워크를 찾지 못한다면 — 예를 들어 MBSSID를 사용하는 6 GHz 라우터 — **[문제 해결 → Wi-Fi가 네트워크를 찾지 못함](/ko/tutorials/jetson-orin-nano/troubleshooting)**을 참조하십시오.

## CSI 카메라 커넥터

- 커넥터 2개(마크 9): 22핀, 0.5 mm 피치, 하단 접점 플렉스.
- **CAM0:** CSI 1×2 레인. **CAM1:** CSI 1×2 레인 또는 1×4 레인.
- 15핀 카메라(예: Raspberry Pi Camera Module v2)에는 15-to-22핀 케이블이 필요합니다.

## 40핀 확장 헤더(마크 2)

- GPIO 및 주변기기 인터페이스: UART, SPI, I2S, I2C, GPIO.
- 핀 할당, 전압 레벨, 전기적 한계는 NVIDIA가 *Jetson Orin Nano Developer Kit Carrier Board Specification*(Jetson Download Center)을 참조하도록 안내합니다. 이 문서는 이 페이지 작성 시 접근할 수 없었습니다.

## 버튼 헤더(12핀)

버튼 헤더는 시리얼 콘솔, 리셋, Force Recovery 기능을 담당합니다.

| 핀 | 기능 |
|---|---|
| 3 (RXD), 4 (TXD), 7 (GND) | 시리얼 콘솔(UART) |
| 9 + 10 | Force Recovery 모드 — 핀을 단락(쇼트)한 다음 전원 켜기 |
| 7 + 8 | 리셋 — 시스템에 전원이 들어온 상태에서 핀을 단락 |
| 점퍼 | 자동 전원 켜기 동작을 설정 |

### 시리얼 콘솔

- USB-TTL 시리얼 어댑터를 연결합니다: 어댑터 TX → 핀 3(RXD), RX → 핀 4(TXD), GND → 핀 7.
- 이것이 헤드리스 대체 경로입니다. 부팅 로그를 캡처하는 방법은 **[문제 해결](/ko/tutorials/jetson-orin-nano/troubleshooting)**을 참조하십시오.

### Force Recovery와 리셋

- **Force Recovery 모드:** 핀 9와 10을 연결한 다음 키트의 전원을 켭니다.
- **리셋:** 키트가 켜져 있는 동안 핀 7과 8을 단락시킵니다.
- Force Recovery 모드는 플래싱 흐름에 사용됩니다 — **[플래싱 및 업데이트](/ko/tutorials/jetson-orin-nano/flashing-and-updates)**를 참조하십시오.

## 전원

- **DC 전원 잭(마크 8):** 5.5 mm × 2.5 mm 배럴 잭; 동봉된 19 V 전원 공급 장치를 사용하십시오.
- **자동 전원 켜기:** 기본적으로 DC 전원이 연결되면 키트가 곧바로 켜집니다. 버튼 헤더의 점퍼로 이 동작을 바꿀 수 있습니다.
- **전원 LED(마크 3):** USB-C 커넥터 옆의 녹색 LED가 키트에 전원이 들어오면 점등됩니다.
- 확인한 NVIDIA 페이지에는 동봉 전원 공급 장치의 정격 전류나 잭 극성이 명시되어 있지 않습니다. 서드파티 전원 공급 장치를 사용할 경우, 두 가지 모두 공급업체에 확인하십시오.

## 팬 커넥터

- 캐리어 보드에는 4핀 팬 헤더가 있습니다.
- 모듈에는 방열판이 포함되어 출고되며, 공식 이미지에서 팬은 방열판 슈라우드에 통합되어 있습니다. 이 헤더는 교체용 열 솔루션을 위한 것입니다.
- 확인한 NVIDIA 페이지에는 모듈의 동작 온도 범위나 Tj 한계가 명시되어 있지 않습니다 — 해당 내용은 Jetson Orin Nano Series Data Sheet와 Orin NX/Orin Nano Thermal Design Guide에 있으며, 두 문서 모두 로그인이 필요한 Download Center에 있습니다.

## 치수

- **모듈:** 69.6 mm × 45 mm, 260핀 SO-DIMM 커넥터.
- **키트:** 두 공식 수치가 서로 다릅니다 — 데이터시트(2024년 12월)는 **103 mm × 90.5 mm × 34.77 mm**라고 하고, NVIDIA의 제품군 표는 **100 mm × 79 mm × 21 mm**라고 합니다. 두 수치 모두 높이에 받침대, 캐리어 보드, 모듈, 열 솔루션을 포함합니다.
- NVIDIA는 이 불일치에 대한 해명을 공개하지 않았습니다. 판매처의 설명(받침대에 올린 키트 vs. 캐리어 보드 단독)은 **미검증**입니다.

> **Juxi 참고:** 인클로저를 설계하기 전에 NVIDIA의 최신 데이터시트에서 치수를 확인하십시오.

## 출처

- [Hardware Layout — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (2026-09-26 확인)
- [Quick Start — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (2026-09-26 확인)
- [How-To — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (2026-09-26 확인)
- [Troubleshooting — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html) (2026-09-26 확인)
- [Jetson Orin Nano Super Developer Kit datasheet (PDF, Dec 2024)](https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf) (2026-09-26 확인)
- [Jetson Orin NX/Nano Series — Module Adaptation and Bring-Up, L4T r39.2 Developer Guide](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html) (2026-09-26 확인)
- [Jetson Orin product family — developer.nvidia.com](https://developer.nvidia.com/embedded/jetson-orin) (2026-09-26 확인)
- [NVIDIA Developer Forums — "Slow Wi-Fi on Orin Nano DevKit (RTL8822CE)", community thread](https://forums.developer.nvidia.com/t/slow-wi-fi-on-orin-nano-devkit-rtl8822ce-802-11ac/368697) (2026-09-26 확인)

*상태: 초안, cheny 검토 대기 중. 기재된 날짜 기준 NVIDIA 공식 문서에 근거하며, 아직 Juxi Technology가 실제 하드웨어에서 검증하지 않았습니다.*

**이미지 출처:** 레이아웃 이미지는 NVIDIA 공식 *Jetson Orin Nano Developer Kit User Guide*(2026-09-26 다운로드)에서 가져온 것이며, 저작권은 © NVIDIA Corporation에 있습니다.

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 이 페이지는 Juxi Technology가 게시하며 NVIDIA의 공식 발행물이 아닙니다.
