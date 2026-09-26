---
title: 빠른 시작 — 개봉부터 동작하는 JetPack 7.2.1 시스템까지
sidebar_label: 빠른 시작
slug: /getting-started/quick-start
description: >-
  NVIDIA Jetson Orin Nano Super 개발자 키트(8GB)의 최초 설정: 펌웨어 확인,
  Jetson 7.2.1 ISO를 USB 플래시 드라이브에 기록하기, 그리고 JetPack 7.2.1
  (L4T r39.2.1)을 microSD 카드 또는 NVMe SSD에 설치하기.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
review_owner: cheny
---

# 빠른 시작

이 페이지에서는 NVIDIA Jetson Orin Nano Super 개발자 키트(8 GB)를 개봉한 상태에서 동작하는 **JetPack 7.2.1** 시스템(Jetson Linux / L4T r39.2.1)으로 만드는 과정을 안내합니다. NVIDIA가 권장하는 최초 설정 경로인 **Jetson ISO** 방식(USB 플래시 드라이브에서 설치)을 따릅니다. Ubuntu 호스트 PC는 필요하지 않습니다.

**3단계 경로:**

1. **펌웨어 관문을 통과합니다.** 구형 출하 펌웨어는 JetPack 7.2를 설치하기 전에 먼저 업데이트해야 합니다(1단계).
2. **설치 USB를 만듭니다.** Jetson ISO를 다운로드하고 Balena Etcher로 USB 플래시 드라이브에 기록합니다(2~3단계).
3. **설치하고 설정합니다.** microSD 카드 또는 NVMe SSD에 설치하고, Ubuntu 초기 설정을 완료한 다음, JetPack 구성 요소를 추가합니다(4~7단계).

> **중요**
> JetPack 7.2부터 NVIDIA는 이 키트용 microSD 카드 이미지를 더 이상 배포하지
> 않습니다. **플래싱할 SD 카드 이미지가 없습니다**. 설치 매체는 USB 스틱입니다.
> microSD 카드(또는 NVMe SSD)는 **설치 대상**일 뿐입니다.
> "이미지를 microSD 카드에 기록하십시오"로 시작하는 구형 튜토리얼은 더 이상
> 적용되지 않습니다.

## 박스에 들어 있는 것

- 레퍼런스 캐리어 보드에 장착된, 방열판이 포함된 Jetson Orin Nano 8 GB 모듈
- 19 V 전원 공급 장치
- 802.11ac/ab/gn 무선 네트워크 인터페이스 컨트롤러(M.2 Key-E 슬롯에 장착됨)
- 빠른 시작 및 지원 카드

**저장 매체는 포함되어 있지 않습니다.** 박스에는 microSD 카드도 NVMe SSD도 없으며, 모듈에는 내장 eMMC 저장소가 없습니다. 모든 스토리지는 사용자가 설치하는 카드나 드라이브에서 나옵니다.

## 직접 준비할 것

- **스토리지 — 다음 중 하나:**
  - **microSD 카드, 64 GB UHS-1 이상**(권장). **모듈 하단면**의 슬롯에 넣습니다. 설치 프로그램을 부팅하기 전에 삽입하십시오.
  - 캐리어 보드의 M.2 Key-M 슬롯 중 하나에 장착하는 **NVMe SSD**. 선택 사항이지만, 더 큰 용량과 더 나은 스토리지 성능을 위해 권장합니다.
- **USB 플래시 드라이브, 16 GB 이상** — 이것이 설치 USB가 됩니다.
- 최소 **25 GB의 여유 공간**이 있는 **노트북 또는 PC**(Windows, Mac, Linux) — ISO를 다운로드하고 USB 플래시 드라이브를 기록하기 위한 것입니다.
- **DisplayPort 모니터**, 그리고 USB 키보드와 마우스. DisplayPort는 이 키트의 유일한 디스플레이 출력입니다. HDMI 출력과 USB-C를 통한 DisplayPort 출력은 지원되지 않습니다. 액티브 DisplayPort→HDMI 어댑터를 사용하면 HDMI 모니터와 함께 쓸 수 있습니다.
- 모니터 없이 사용한다면: 헤드리스 시리얼 콘솔용 **USB-to-TTL 시리얼 케이블**(1단계 참조).

![microSD 카드](/images/jetson-orin-nano/microsd_64gb.png)
*설치 대상 스토리지 옵션 1: 64 GB UHS-1 microSD 카드.*

![NVMe SSD](/images/jetson-orin-nano/ssd_nvme_1tb.png)
*설치 대상 스토리지 옵션 2: M.2 Key-M 슬롯에 장착한 NVMe SSD.*

> **Juxi 참고:** 이 키트의 Juxi 스토어 번들에는 64 GB microSD 카드와 M.2 Wi-Fi
> 모듈이 추가로 포함되어 있습니다. 카드는 **이미지가 미리 기록되지 않은**(빈)
> 상태로 출고되므로, 시스템을 카드에 설치하려면 이 페이지의 ISO 절차를
> 따르십시오.

## 1단계 — 펌웨어 관문 확인

JetPack 7.2 이상을 설치하려면 개발자 키트에 **JetPack 6.x 세대의 UEFI/QSPI 펌웨어**가 **필요합니다**. 키트에 여전히 구형 출하 펌웨어가 들어 있다면 **JetPack 6.x 업데이트 경로**를 먼저 완료하십시오.

모니터를 연결한 경우:

1. DisplayPort 모니터와 USB 키보드를 연결합니다. 19 V 전원 공급 장치를 연결하면 키트가 자동으로 켜지고, USB-C 커넥터 옆의 녹색 LED가 점등됩니다.
2. **NVIDIA 부팅 스플래시가 나타난 후 `Esc`를 반복해서 누릅니다.** UEFI 설정 메뉴가 열립니다.
3. 화면 상단 근처의 **펌웨어 버전** 줄을 확인합니다:

| 펌웨어 버전 | 할 일 |
|---|---|
| 36.x 이상 | 2단계를 계속 진행 |
| 36.0보다 오래됨 | JetPack 6.x 업데이트 경로를 먼저 완료(아래 참조) |

![펌웨어 버전이 표시된 UEFI 메뉴](/images/jetson-orin-nano/firmware-version-check.png)
*펌웨어 버전은 UEFI 설정 메뉴 상단 근처에 표시됩니다.*

헤드리스 대안: USB-to-TTL 시리얼 케이블을 버튼 헤더에 연결하고(어댑터 TX 선 → 핀 3 / RXD, 어댑터 RX 선 → 핀 4 / TXD, 어댑터 접지 선 → 핀 7 / GND), PC에서 시리얼 콘솔을 연 다음, 부팅 전 옵션이 표시되는 동안 콘솔에서 `Esc`를 누릅니다.

![버튼 헤더에 연결한 USB-to-TTL 시리얼 케이블](/images/jetson-orin-nano/jon_adafruit_uart_cable.jpg)
*헤드리스 경로: 버튼 헤더에 연결한 USB-to-TTL 시리얼 케이블.*

### 펌웨어가 너무 오래된 경우

**JetPack 6.x 업데이트 경로**로 펌웨어를 최신으로 올립니다. 요약하면(전체 단계는 [플래싱 및 업데이트](/ko/tutorials/jetson-orin-nano/flashing-and-updates) 참조):

1. microSD 카드에서 **JetPack 5.1.3** 브리지 이미지(파일 이름 `JP513-orin-nano-sd-card-image_b29.zip`)로 부팅합니다.
2. 백그라운드 서비스가 부트로더 업데이트를 예약합니다(`sudo systemctl status nv-l4t-bootloader-config`로 확인).
3. 재부팅합니다. 이 부팅 중에 펌웨어 업데이트가 실행됩니다(`sudo nvbootctrl dump-slots-info`로 확인).
4. QSPI 업데이터를 설치합니다: `sudo apt update` 실행 후 `sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater`, 그다음 재부팅합니다.
5. 전원을 끄고 브리지 카드를 제거한 뒤, 대상 스토리지를 삽입하고 2단계를 계속 진행합니다.

이 경로에는 microSD 카드와 카드 리더기가 필요합니다. 이것이 없다면 Ubuntu 호스트의 SDK Manager가 대안입니다([플래싱 및 업데이트](/ko/tutorials/jetson-orin-nano/flashing-and-updates) 참조). 한 가지 사례가 더 있습니다: 펌웨어가 BSP 36.2(JetPack 5.0 DP)에서 온 경우, 설치 프로그램 내부의 캡슐 업데이트가 이를 지원하지 않습니다 — JetPack 7.2.1 ISO 설치를 실행하기 전에 키트를 이후 릴리스로 먼저 올리십시오.

그래도 설치 프로그램을 부팅했는데 화면이 계속 검은색이거나 UEFI 셸로 떨어진다면, 펌웨어가 너무 오래된 것일 가능성이 높습니다. 부팅을 반복해서 다시 시도하지 마십시오. 전원을 끄고 업데이트 경로를 완료한 뒤 다시 시도하십시오.

![UEFI 대화형 셸](/images/jetson-orin-nano/uefi_interactive_shell.png)
*설치 프로그램 대신 UEFI 셸(또는 검은 화면)이 나타난다면 보통 대상 JetPack 릴리스에 비해 펌웨어가 너무 오래된 것입니다.*

## 2단계 — Jetson ISO 다운로드

[JetPack 다운로드 페이지](https://developer.nvidia.com/embedded/jetpack/downloads)에서 JetPack 7.2.1 설치 프로그램 ISO(레이블: **Jetson ISO (r39.2.1)**)를 다운로드하거나, 다음 직접 링크를 사용하십시오:

<https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso/jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso>

ISO 파일 이름은 `jetsoninstaller-r<L4T version>-<timestamp>-arm64.iso` 패턴을 따릅니다(이 릴리스: `jetsoninstaller-r39.2.1-2026-08-07-18-30-47-arm64.iso`). NVIDIA의 다운로드 페이지에는 ISO 파일 크기나 체크섬이 표시되지 않습니다.

## 3단계 — ISO를 USB 플래시 드라이브에 기록

1. <https://etcher.balena.io/#download-etcher>에서 **Balena Etcher**를 설치합니다(Windows, Mac, Linux).
2. USB 플래시 드라이브를 PC에 삽입합니다.
3. Etcher에서 ISO 파일을 선택하고, USB 드라이브를 선택한 뒤 기록을 시작합니다.

![Balena Etcher로 Jetson ISO를 USB 플래시 드라이브에 기록하는 모습](/images/jetson-orin-nano/jetson-iso_etcher-flash-start.gif)
*Balena Etcher로 Jetson ISO를 USB 플래시 드라이브에 기록하는 모습.*

> **주의**
> **ISO를 microSD 카드에 기록하지 마십시오.** JetPack 7.2부터 SD 카드 이미지는
> 더 이상 지원되지 않습니다. ISO를 USB 플래시 드라이브에 기록한 다음, 이를
> 사용해 microSD 카드나 NVMe SSD에 Jetson Linux를 설치하십시오.

파일 관리자로 ISO 파일을 스틱에 복사하는 방식은 동작하지 않습니다 — 반드시 디스크 이미지로 기록해야 합니다. 완성된 스틱은 설치 프로그램일 뿐이며, 사용 가능한 데스크톱으로 부팅할 수 없습니다.

## 4단계 — 설치 프로그램 부팅 및 설치

1. 키트의 전원을 끈 다음 **대상 스토리지**를 설치합니다:
   - microSD 카드: **모듈 하단면**의 슬롯에 삽입합니다.
   - NVMe SSD: 캐리어 보드의 M.2 Key-M 슬롯에 장착합니다.
   설치 프로그램을 부팅하기 전에 대상 스토리지를 설치하십시오.
2. 설치 USB 플래시 드라이브를 삽입합니다. 모니터, 키보드, 마우스를 연결한 다음 전원 공급 장치를 연결합니다. 설치 드라이브는 허브를 거치지 말고 키트에 **직접** 꽂으십시오: NVIDIA는 ISO 설치를 깨뜨리는 USB 3.0 허브 한 종(모델 UH400)과 플래싱을 실패하게 만들 수 있는 USB-to-Ethernet 어댑터 한 종(TRENDnet TU2-ET100)을 문서화해 두었습니다. **[문제 해결](/ko/tutorials/jetson-orin-nano/troubleshooting)**을 참조하십시오.
3. **NVIDIA 로고 부팅 스플래시가 나타나면 `Esc`를 누릅니다.** **Boot Manager**를 선택하고 USB 디스크를 선택한 뒤 Enter를 눌러 부팅합니다. NVIDIA는 USB 디스크를 명시적으로 선택하도록 권장합니다 — 올바른 설치 프로그램이 실행 중인지 알 수 있기 때문입니다.
4. **QSPI 캡슐 업데이트 프롬프트가 나타나면 30초 안에 `Y`를 누릅니다.** 가장 많이 놓치는 단계입니다. 이 프롬프트는 실시간으로 놓치기 쉽습니다. 시간이 초과되어 업데이트 없이 설치가 계속되면 나중에 설치가 실패합니다 — 설치를 다시 시작하고 프롬프트가 나타났을 때 `Y`를 누르십시오. 캡슐 업데이트는 **두 번** 실행되며, 키트는 그 사이 또는 이후에 재부팅될 수 있습니다. 이는 정상이므로 두 번 모두 끝날 때까지 기다리십시오. 현재 QSPI 펌웨어가 r38.2.0/r38.2.1인 키트는 첫 번째 실행이 끝난 뒤 펌웨어 업데이트를 한 번 더 확인해야 합니다(r39.2.1 릴리스 노트 이슈 6480645) — 프롬프트가 나타나면 `Y`를 다시 누르십시오.
5. **Jetson BSP 설치 GRUB 메뉴**에서 **Install Jetson ISO r39.2.1**을 선택합니다. 대상 스토리지 장치(microSD 카드 또는 NVMe SSD)를 선택하고 확인합니다. **설치는 선택한 장치를 지웁니다** — 확인하기 전에 선택 항목을 점검하십시오.
6. 설치가 완료될 때까지 기다립니다. NVIDIA의 지침에 따르면 흰색 텍스트가 몇 분간 화면에서 흘러갑니다. 안내가 나타나면 재부팅하십시오. 설치 시간에 대한 커뮤니티 보고는 약 15분에서 훨씬 더 긴 시간까지 크게 엇갈립니다(미확인, 포럼 보고).
7. **USB 플래시 드라이브를 제거**하여 키트가 설치 프로그램이 아니라 대상 스토리지의 새 시스템으로 부팅되게 하십시오.

포럼의 NVIDIA 직원은 ISO 설치 중에 디스플레이를 연결해 두는 것도 권장합니다.

## 5단계 — 최초 부팅과 Ubuntu 초기 설정

설치 프로그램이 재부팅되면 키트가 Ubuntu 초기 설정(`oem-config`)을 시작합니다:

1. NVIDIA Jetson 소프트웨어 EULA를 검토하고 동의합니다.
2. 시스템 언어, 키보드 레이아웃, 시간대를 선택합니다.
3. 네트워크에 연결합니다.
4. 사용자 이름, 암호, 컴퓨터 이름을 만듭니다.
5. Ubuntu 데스크톱에 로그인합니다.

## 6단계 — JetPack 구성 요소 설치

ISO는 기본 시스템(Jetson Linux)을 설치합니다. CUDA, cuDNN, TensorRT 및 나머지 JetPack 스택은 최초 부팅 후에 추가됩니다. 키트의 데스크톱에서 터미널을 열고 다음을 실행합니다:

```bash
sudo apt update
sudo apt install nvidia-jetpack
```

설치 후 안내가 나타나면 재부팅합니다.

결과를 확인합니다:

```bash
cat /etc/nv_tegra_release
apt list --installed | grep nvidia-jetpack
```

`/etc/nv_tegra_release`는 R39 릴리스, 리비전 2.1을 보고해야 합니다. 전체 체크리스트는 [시스템 검증](/ko/tutorials/jetson-orin-nano/verify-your-system)을 참조하십시오.

## 7단계 — 전원 모드 확인

기본 전원 모드는 일반적으로 **25W**입니다. 최대 성능을 원하면 Ubuntu 데스크톱 상단 표시줄에서 현재 전원 모드를 클릭하고, **Power Mode**를 선택한 뒤 **MAXN SUPER**를 고르십시오. 명령줄에서는 `sudo /usr/sbin/nvpmodel -q`로 현재 모드를 표시할 수 있습니다. JetPack 7.2.1 ISO 설치에는 기본적으로 Super Mode 플래싱 구성이 사용되므로 25W와 MAXN SUPER를 사용할 수 있어야 합니다 — 없다면 [문제 해결](/ko/tutorials/jetson-orin-nano/troubleshooting)을 참조하십시오.

![전원 모드 메뉴에서 MAXN SUPER를 선택하는 모습](/images/jetson-orin-nano/jons_power-mode-to-maxn-super.png)
*최대 성능을 위해서는 Power Mode → MAXN SUPER를 선택하십시오.*

## 빠른 문제 해결

| 증상 | 먼저 확인할 것 |
|---|---|
| 키트에 전원이 켜지지 않음 | 19 V 전원 공급 장치가 DC 잭에 연결되어 있어야 합니다. 키트는 자동으로 켜지며, USB-C 커넥터 옆의 녹색 LED가 점등되어야 합니다. |
| USB 설치 프로그램이 부팅되지 않음 | UEFI 부트 관리자에서 USB 디스크를 명시적으로 선택합니다(스플래시에서 `Esc`). 펌웨어가 36.x 이상인지 확인합니다. |
| 설치 프로그램 대신 검은 화면 또는 UEFI 셸 | 펌웨어가 너무 오래되었을 수 있습니다. JetPack 6.x 업데이트 경로를 먼저 완료하십시오. |
| 설치 프로그램이 언어/네트워크/사용자 이름 설정을 건너뜀; 최초 부팅이 검은 화면에서 멈춤 | QSPI 캡슐 프롬프트를 놓쳤습니다. 설치를 다시 시작하고 30초 안에 `Y`를 누르십시오. |
| 설치 프로그램이 대상 스토리지를 표시하지 않음 | microSD: 모듈 하단면의 슬롯에 완전히 삽입되었는지 확인합니다. NVMe: 드라이브를 다시 장착하고 설치 프로그램을 재시작합니다. |
| 7W/15W 전원 모드만 있음; 25W와 MAXN SUPER가 없음 | [문제 해결](/ko/tutorials/jetson-orin-nano/troubleshooting)을 참조하십시오. |

## 출처

- [Jetson Orin Nano Developer Kit User Guide — Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (2026-09-26 확인)
- [Jetson Orin Nano Developer Kit User Guide — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) (2026-09-26 확인)
- [Jetson Orin Nano Developer Kit User Guide — JetPack SDK Setup](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/setup_jetpack.html) (2026-09-26 확인)
- [Jetson Orin Nano Developer Kit User Guide — Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (2026-09-26 확인)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (2026-09-26 확인)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (2026-09-26 확인)

*상태: 초안, cheny 검토 대기 중. 기재된 날짜 기준 NVIDIA 공식 문서에 근거하며, 아직 Juxi Technology가 실제 하드웨어에서 검증하지 않았습니다.*

**이미지 출처:** 이 페이지의 이미지는 NVIDIA 공식 *Jetson Orin Nano Developer Kit User Guide*(2026-09-26 다운로드)에서 가져온 것이며 저작권은 © NVIDIA Corporation에 있습니다. 공식 설정 흐름을 설명하기 위해 여기에 수록했습니다.

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 이 페이지는 Juxi Technology가 게시하며 NVIDIA의 공식 발행물이 아닙니다.
