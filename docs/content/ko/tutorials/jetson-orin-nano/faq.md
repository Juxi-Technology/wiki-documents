---
title: FAQ
sidebar_label: FAQ
slug: /support/faq
description: >-
  NVIDIA Jetson Orin Nano Super 개발자 키트(8GB)에 관한 자주 묻는 질문 —
  스토리지, 최초 설정, 펌웨어, 전원 모드, AI 워크로드, 지원을 다룹니다.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit
    checked: 2026-09-26
review_owner: cheny
---

# FAQ

## 시작하기 전에

**박스에는 무엇이 들어 있나요?**
Jetson Orin Nano 개발자 키트, 19 V 전원 공급 장치, 빠른 시작 및 지원 카드입니다. **NVIDIA 박스에는 스토리지가 없습니다**: microSD 카드나 NVMe SSD, 설치 프로그램용 USB 플래시 드라이브, 모니터와 키보드는 직접 준비해야 합니다 — 다만 이 키트의 Juxi 스토어 번들에는 64 GB microSD 카드가 추가됩니다(스토어 등록 정보 기준). [빠른 시작](/ko/tutorials/jetson-orin-nano/quick-start)을 참조하십시오.

**스토리지를 따로 사야 하나요?**
예 — 64 GB microSD 카드가 이미 포함된 Juxi 스토어 번들을 구매한 경우가 아니라면요. 번들의 카드가 대상 스토리지 요구 사항을 충족하므로, 더 큰 용량을 원할 때만 NVMe SSD를 사면 됩니다. (동봉 카드는 이미지가 미리 기록되지 않은 빈 상태로 출고됩니다 — Jetson ISO로 카드에 시스템을 설치하십시오.) NVIDIA는 이렇게 밝힙니다:
"Jetson Orin Nano Developer Kit does not include removable storage in the box,
so choose either a microSD card or a NVMe SSD before starting setup." NVIDIA 박스만 받았다면 64GB UHS-1 이상의 microSD 카드(NVIDIA 권장)를, 또는 캐리어 보드의 M.2 Key-M 슬롯 중 하나에 쓸 PCIe NVMe SSD를 구매하십시오. 이 키트에는 eMMC가 없습니다: 카드나 SSD가 시스템의 주 스토리지가 됩니다. [빠른 시작](/ko/tutorials/jetson-orin-nano/quick-start)과
[인터페이스 및 하드웨어 레이아웃](/ko/tutorials/jetson-orin-nano/interfaces)을 참조하십시오.

**이전 JetPack 릴리스처럼 SD 카드 이미지를 플래싱할 수 있나요?**
아니요. JetPack 7.2부터 SD 카드 이미지는 더 이상 지원되지 않습니다. NVIDIA의 지침: "Jetson ISO를 microSD 카드에 플래싱하지 마십시오 — USB 플래시 드라이브에 기록한 다음, 이를 사용해 microSD 카드나 NVMe SSD에 Jetson Linux를 설치하십시오." microSD 카드는 여전히 유효한 설치 대상입니다; 다만 더 이상 이미지를 기록하는 매체가 아닐 뿐입니다. ISO USB 스틱은 설치 프로그램이며 라이브 USB가 아닙니다 — 데스크톱을 실행할 수 없고 시스템만 설치합니다. [플래싱 및 업데이트](/ko/tutorials/jetson-orin-nano/flashing-and-updates)와
[JetPack 6에서 7로 마이그레이션](/ko/tutorials/jetson-orin-nano/jetpack-6-to-7)을 참조하십시오.

**시작하기 전에 정확히 무엇이 필요한가요?**
필요한 것:

- 키트와 동봉된 19 V 전원 공급 장치.
- 최소 25GB의 여유 공간이 있는 노트북 또는 PC(Windows, Mac, Linux).
- 설치 프로그램 이미지를 담을 16GB 이상의 USB 플래시 드라이브.
- 대상 스토리지: microSD 카드(64GB UHS-1 이상 권장) 및/또는 NVMe SSD — Juxi 스토어 번들에는 이미 64 GB microSD 카드가 포함되어 있습니다.
- DisplayPort 모니터와 USB 키보드·마우스, 또는 헤드리스 설정용 USB-to-TTL 시리얼 케이블.

NVIDIA의 가이드는 Balena Etcher로 ISO를 USB 스틱에 기록합니다 — 파일을 스틱에 복사하는 것만으로는 충분하지 않습니다. 단계별 안내:
[빠른 시작](/ko/tutorials/jetson-orin-nano/quick-start).

**Ubuntu PC가 필요한가요?**
아니요, 권장 경로에서는 필요하지 않습니다. Jetson ISO 설치는 키트 자체에서 실행됩니다; PC는 ISO를 USB 플래시 드라이브에 기록할 때만 쓰이며, Windows, Mac, Linux 모두 가능합니다. Ubuntu x86_64 호스트 PC는 대체 방식 — SDK Manager 또는 플래시 스크립트 — 에만 필요합니다. 예를 들어 Super 구성으로 키트를 다시 플래싱하려는 경우입니다. 참고: SDK Manager 페이지에는 Ubuntu 20.04 / 22.04 x86_64 호스트가 문서화되어 있지만, NVIDIA 직원은 Windows에서도 플래싱에 성공했다고 보고합니다. [플래싱 및 업데이트](/ko/tutorials/jetson-orin-nano/flashing-and-updates)를 참조하십시오.

**microSD 슬롯은 어디에 있나요?**
Jetson Orin Nano 모듈의 하단면에 있으며, 캐리어 보드 가장자리가 아닙니다. ISO 설치 프로그램을 부팅하기 전에 카드를 삽입하십시오; 설치 프로그램은 이미 장착된 스토리지만 제공합니다. 나중에 카드를 바꾸려면: 전원을 끄고 새 카드로 교체한 뒤, 카드를 꽂은 상태로 JetPack 7.2.1 ISO 설치 프로그램을 다시 실행하십시오 — JetPack 7.2 이상에는 기록할 카드 이미지가 없습니다. [인터페이스 및 하드웨어 레이아웃](/ko/tutorials/jetson-orin-nano/interfaces)과
[빠른 시작](/ko/tutorials/jetson-orin-nano/quick-start)을 참조하십시오.

## 설정

**새 키트인데 왜 가이드에서 펌웨어를 먼저 업데이트하라고 하나요?**
JetPack 7.2 이상을 설치하려면 키트에 JetPack 6.x 세대의 UEFI/QSPI 펌웨어가 있어야 합니다 — 버전 36.x 이상. 구형 출하 펌웨어로 출고된 키트는 JetPack 7.2.1 ISO가 부팅되기 전에 NVIDIA의 "JetPack 6.x Update Path"를 완료해야 합니다. 버전 확인 방법: 모니터를 연결한 상태로 전원을 켜고 부팅 스플래시에서 Esc를 반복해서 누르십시오; UEFI 메뉴 상단 근처에 펌웨어 버전이 표시됩니다. 36.x 이상이면 계속 진행하고, 36.0보다 오래되었으면 업데이트 경로를 먼저 수행하십시오. [빠른 시작](/ko/tutorials/jetson-orin-nano/quick-start),
[플래싱 및 업데이트](/ko/tutorials/jetson-orin-nano/flashing-and-updates), 그리고 QSPI와 캡슐 업데이트 같은 용어는 [용어집](/ko/tutorials/jetson-orin-nano/glossary)을 참조하십시오.

**설정에는 얼마나 걸리나요?**
NVIDIA는 총 설정 시간을 공개하지 않습니다. 공식 지침에 따르면 화면에 흰색 텍스트가 몇 분간 흘러갈 수 있으며, 설치 프로그램이 완료될 때까지 기다렸다가 안내가 나타나면 재부팅하라고 되어 있습니다. microSD 카드 설치의 사용자 보고는 약 15분에서 약 2시간까지이며(사용자 보고, 미확인), 이후 첫 부팅에서 Ubuntu 설정 화면(언어, 네트워크, 사용자 이름)이 추가됩니다. [빠른 시작](/ko/tutorials/jetson-orin-nano/quick-start)을 참조하십시오.

**설치 프로그램이 사용자 이름/암호 화면을 건너뛰면 어떻게 하나요?**
알려진 보고와 일치합니다: QSPI 캡슐 프롬프트가 시간 초과된 것입니다. 설치 프로그램은 펌웨어(QSPI) 업데이트 확인을 요청하면서 30초만 기다립니다 — 프롬프트를 놓치면 이후 단계가 실패할 수 있고, 언어·네트워크·사용자 이름 화면이 아예 나타나지 않을 수 있으며, 다음 부팅이 커서만 있는 검은 화면에서 멈출 수 있습니다. 공식 가이드의 해결 방법: 설치를 다시 시작하고 캡슐 프롬프트가 나타나면 Y를 누르십시오. 일부 사용자는 다시 시도하기 전에 잔여 파티션을 정리했거나, 대신 SDK Manager로 설치했습니다(사용자 보고; NVIDIA 직원이 해당 스레드를 확인). [문제 해결](/ko/tutorials/jetson-orin-nano/troubleshooting)을 참조하십시오.

> **중요** 설치 프로그램이 QSPI 캡슐 업데이트 프롬프트를 표시하면 30초 안에
> **Y**를 누르십시오. NVIDIA는 이를 "가장 많이 놓치는 단계"라고 부릅니다.

**시리얼 콘솔은 어떻게 사용하나요?**
USB-to-TTL 시리얼 케이블을 버튼 헤더에 연결합니다: RXD 핀 3은 어댑터의 TX 선, TXD 핀 4는 어댑터의 RX 선, GND 핀 7은 어댑터의 접지 선에 연결합니다. 그런 다음 PC에서 시리얼 콘솔을 열고, 전원을 켜고, 부팅 전 화면에서 Esc를 눌러 UEFI / Boot Manager로 들어갑니다 — 이렇게 하면 ISO 설치 전체를 완료할 수 있습니다. 솔직히 말하면 한 가지 빈틈이 있습니다: NVIDIA의 페이지는 "open a serial console on your PC"라고만 하고 보드 레이트나 터미널 프로그램을 명시하지 않습니다. 키트를 USB-C로 PC에 장치 모드로 연결하면 "USB Serial device for serial terminal access"도 나타납니다.
[인터페이스 및 하드웨어 레이아웃](/ko/tutorials/jetson-orin-nano/interfaces)과
[문제 해결](/ko/tutorials/jetson-orin-nano/troubleshooting)을 참조하십시오.

## 전원 및 성능

**왜 25W / MAXN SUPER 옵션이 없나요?**
키트가 non-Super 부팅 구성으로 플래싱되어 7W와 15W 모드만 나타납니다. 이는 JetPack 7.2 ISO의 알려진 문제 6279443으로 문서화되어 있습니다: ISO 설치는 "Super"로 전환하지 않고 업데이트 이전 프로파일을 유지했습니다. JetPack 7.2.1은 새 설치에 대해 이를 수정합니다 — ISO가 "now flashes the Jetson Orin Nano Developer Kit with Super Mode flashing configuration by default"; NVIDIA는 7.2.1 재설치가 7.2.0 ISO로 설치한 키트를 전환하는지 밝히지 않았습니다. `/etc/nv_boot_control.conf`를 확인하십시오: Super 구성에는 `-super` 접미사가 붙습니다. 기존 7.2 설치를 고치려면 Ubuntu 호스트(SDK Manager 또는 플래시 스크립트)에서 Super 구성으로 다시 플래싱하십시오; 그러면 Power Mode 메뉴가 15W, 25W(기본), MAXN SUPER를 제공합니다. [시스템 검증](/ko/tutorials/jetson-orin-nano/verify-your-system),
[문제 해결](/ko/tutorials/jetson-orin-nano/troubleshooting),
[플래싱 및 업데이트](/ko/tutorials/jetson-orin-nano/flashing-and-updates)를 참조하십시오.

> **Juxi 참고:** 커뮤니티의 제자리(in-place) 수정 방법이 있습니다
> (`/etc/nv_boot_control.conf` 편집, 부트로더 재구성, `/etc/nvpmodel.conf` 삭제,
> 재부팅). 여러 사용자가 성공했다고 보고했지만 NVIDIA는 이를 보증하지
> 않았으며, 한 사용자는 부팅 루프를 보고했습니다.

## AI 워크로드

**8 GB로 얼마나 큰 모델을 실행할 수 있나요?**
8GB LPDDR5는 CPU, GPU, 운영 체제가 공유하는 통합 메모리입니다 — 펌웨어와 커널 예약분을 제외하면 약 7.6GB를 사용할 수 있습니다. NVIDIA가 공개한 지침: 4비트 양자화와 메모리 효율적인 런타임을 사용하면 LLM은 약 10B 파라미터, VLM은 약 4B 파라미터까지 들어갑니다. TensorRT Edge-LLM의 공식 Orin Nano 8GB 벤치마크는 최대 2B 모델을 다루며, 이것이 NVIDIA가 이 키트에서 벤치마크하는 가장 큰 모델군입니다. 파일이 들어갈 것처럼 보여도 모델이 로드에 실패할 수 있습니다. KV 캐시도 메모리를 필요로 하기 때문입니다. 8GB 키트에서 7.4GB와 16GB GGUF가 로드에 실패한 사례가 있습니다(사용자 보고). [8GB에서의 로컬 LLM](/ko/tutorials/jetson-orin-nano/local-llm)과
[메모리 효율](/ko/tutorials/jetson-orin-nano/memory-efficiency)을 참조하십시오.

## 지원 및 서비스

**지원 경로는 어떻게 되나요?**
NVIDIA 공식 [문제 해결 페이지](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html)부터 시작하십시오. 다섯 가지 흔한 설정 문제를 다룹니다: ISO가 부팅되지 않음, 화면 출력 없음, 설치 프로그램이 대상 스토리지를 표시하지 않음, 펌웨어 업데이트 필요, Docker 권한 오류. 플랫폼 관련 질문은 공식 [추가 문서(Additional Docs)](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html)
페이지에 나열된 NVIDIA Jetson 개발자 포럼을 이용하십시오; 게시하기 전에 검색하고
`cat /etc/nv_tegra_release` 출력을 포함하십시오. Juxi Technology 연락처:

- 기술 지원: **support@juxitech.com**
- 주문, 보증, RMA: **support@juxitech.com** (주문 번호 포함)
- 영업 및 견적: **sales@juxitech.com**
- 제품 관련 질문(선정, 호환성): **pe@juxitech.com**

공식 다운로드 및 참조 링크: [다운로드](/ko/tutorials/jetson-orin-nano/downloads).

> **Juxi 참고:** NVIDIA 직원으로 표시된 일부 포럼 답변은 자동 생성된 AI
> 답변입니다("This is an automated AI response"로 시작합니다). 신뢰할 수 없는
> 것으로 취급하고 공식 문서를 우선하십시오.

## 출처

- Jetson Orin Nano Developer Kit User Guide — [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html), [Troubleshooting](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html), [How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html), [Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (2026-09-26 확인)
- [JetPack SDK Downloads](https://developer.nvidia.com/embedded/jetpack/downloads) (2026-09-26 확인)
- Jetson Linux Release Notes — [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf), [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (2026-09-26 확인)
- [Maximizing memory efficiency to run bigger models on NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (2026-09-26 확인)
- [TensorRT Edge-LLM performance benchmarks](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html) (2026-09-26 확인)
- NVIDIA developer forums — [boot hang / skipped username setup thread](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410), [25W / MAXN SUPER thread](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) (2026-09-26 확인)
- [Juxi Technology store listing — Jetson Orin Nano Super Developer Kit](https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit) (2026-09-26 확인)

*상태: 2026-10-11 검토 완료.*

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 이 페이지는 Juxi Technology가 게시하며 NVIDIA의 공식 발행물이 아닙니다.
