---
title: 빠른 시작 — 개봉부터 동작하는 JetPack 7.2.1 시스템까지
sidebar_label: 빠른 시작
slug: /getting-started/quick-start
description: >-
  NVIDIA Jetson AGX Orin 개발자 키트(64GB) 워크스루: 첫 부팅, Jetson ISO
  방식으로 BSP를 JetPack 7.2.1(L4T r39.2.1)로 업데이트, 그리고
  JetPack 구성 요소 설치.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
review_owner: cheny
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html
    checked: 2026-09-23
---

# 빠른 시작

이 페이지에서는 Jetson AGX Orin 개발자 키트(64GB)를 개봉한 상태에서 완전히 업데이트된 **JetPack 7.2.1** 시스템으로 만드는 과정을 안내합니다. 아래 경로는 NVIDIA가 권장하는 현재의 설정 흐름을 따르며, 모든 단계는 이 페이지 하단에 명시된 날짜 기준으로 NVIDIA 공식 개발자 키트 문서와 대조하여 확인했습니다.

**3단계 경로:**

1. **개봉 즉시 부팅**하고 Ubuntu 초기 설정(`oem-config`)을 완료합니다.
2. **Jetson ISO** 방식으로 BSP를 L4T r39.2.1(JetPack 7.2.1)로 **업데이트**합니다 — 부팅 가능한 USB 메모리 하나면 되고, Ubuntu 호스트 PC는 필요하지 않습니다.
3. `apt` 명령 하나로 **JetPack 구성 요소**(CUDA, cuDNN, TensorRT 등)를 **설치**합니다.

> **SDK Manager 대신 USB ISO 업데이트를 사용하는 이유는?**
> NVIDIA는 이제 개발자 키트에 Jetson ISO 방식을 권장합니다. 이 방식은 USB
> 메모리에서 보드를 직접 업데이트하며, 별도의 Ubuntu 호스트 머신이 **필요하지
> 않습니다**. SDK Manager는 대안으로 계속 사용할 수 있습니다(3b단계 참조).

## 준비물

박스에 들어 있는 것:

- Jetson AGX Orin 모듈과 레퍼런스 캐리어 보드
- Wi-Fi 모듈
- USB Type-C 전원 어댑터
- USB Type-C - USB Type-A 케이블

직접 준비할 것:

- DisplayPort 입력이 있는 모니터와 DisplayPort 케이블, USB 키보드와 마우스 — **또는** 헤드리스 설정을 원한다면 두 번째 컴퓨터(Windows/Mac/Linux)
- 인터넷 연결(이더넷 케이블, 또는 설정 중 구성하는 Wi-Fi)
- ISO 이미지를 담을 수 있을 만큼 큰 USB 플래시 드라이브(다운로드 페이지에 표시된 용량을 확인하십시오) — 2단계의 ISO 업데이트에 필요합니다
- 설치 USB를 기록할 PC(Balena Etcher는 Windows/Mac/Linux에서 실행됩니다)

## 1단계 — 첫 부팅과 Ubuntu 초기 설정

개발자 키트에는 L4T BSP 이미지가 eMMC에 미리 플래싱된 상태로 출고되어 개봉 즉시 Ubuntu 데스크톱으로 부팅됩니다. 최근 출고된 제품에는 **더 오래된** L4T 버전(예: r35.x / JetPack 5.x)이 들어 있을 수 있으며, 2단계를 거치면 어떤 제품이든 최신 릴리스로 업데이트됩니다.

디스플레이를 연결한 경우:

1. DisplayPort 모니터, USB 키보드와 마우스를 연결하고 (선택 사항으로) 이더넷 케이블을 연결합니다.
2. 동봉된 전원 어댑터를 **DC 잭 위쪽의 USB Type-C 포트**에 연결합니다. 키트는 자동으로 전원이 켜지며, 전원 버튼 근처의 흰색 LED가 점등됩니다. 켜지지 않으면 전원 버튼을 누르십시오.
3. 약 1분 이내에 Ubuntu 화면이 나타납니다. 첫 부팅에서는 `oem-config`가 NVIDIA 소프트웨어 EULA 동의, 언어/키보드/시간대 선택, 사용자 계정 생성, 네트워크 구성 순으로 안내합니다.
4. `oem-config`가 끝나면 키트가 재부팅되어 Ubuntu 데스크톱으로 진입합니다.

![초기 설정을 마친 Ubuntu 데스크톱](/images/jetson-agx-orin/ubuntu_initial_desktop_1280x720.png)

다른 컴퓨터에서 헤드리스 설정도 가능합니다 — 정확한 연결 방법은 NVIDIA의 Quick Start Guide(하단 링크)를 참조하십시오.

> **Juxi 팁:** 시스템을 NVMe SSD에서 실행할 계획이라면 2단계에서 이 점을 염두에
> 두십시오 — ISO 설치 프로그램은 NVMe 드라이브에 직접 설치할 수 있습니다.

## 2단계 — Jetson ISO로 BSP 업데이트(권장)

**전제 조건:** ISO 방식을 사용하려면 설치된 BSP가 **L4T r35.5 이상**이어야 합니다. 먼저 확인합니다:

```bash
cat /etc/nv_tegra_release
```

JetPack 7.2.1 시스템은 `# R39 (release), REVISION: 2.1`을 보고합니다. 출력이 더 오래된 릴리스라면 먼저 L4T r35.5 이상으로 업데이트하십시오(아래 *주의 사항* 참조).

1. JetPack 7.2.1 / L4T r39.2.1용 **Jetson ISO를 다운로드**합니다:
   <https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso>
2. **설치 USB를 만듭니다.** [Balena Etcher](https://etcher.balena.io)로 ISO를 USB 플래시 드라이브에 기록합니다("Flash from file" → ISO 선택 → USB 드라이브 선택).
   > 파일 관리자로 ISO 파일을 드라이브에 단순히 복사하면 **안 됩니다** —
   > 반드시 디스크 이미지로 기록해야 하며, 그렇지 않으면 부팅되지 않습니다.
3. **USB 드라이브를 개발자 키트에 삽입**하고 전원을 켭니다. USB에서 자동으로 부팅되지 않으면 부팅 중에 UEFI 부트 관리자를 열고 USB 드라이브를 선택하십시오.
4. **부팅 및 설치:**
   - **QSPI capsule 업데이트** 확인 메시지가 표시되면 `Y`를 누릅니다. 이 펌웨어 업데이트는 ISO 설치 *이전에* 실행되며 **두 번** 실행됩니다. 건너뛰지 마십시오 — 호환성을 위해 반드시 필요합니다. 메시지를 놓쳤다면 설치를 다시 시작하고 다시 표시될 때 확인하십시오.
   - GRUB 메뉴에서 **Install Jetson ISO r39.2.1**을 선택하고 Enter를 누릅니다.
   - 화살표 키로 저장 대상을 선택합니다: **eMMC**(기본 내장 스토리지) 또는 **NVMe**(SSD를 설치했다면 권장).
   - 설치는 약 15분이 걸리며, 화면에 텍스트 출력이 계속 흐릅니다.
5. 설치가 완료되고 시스템이 재부팅된 후 **USB 드라이브를 제거**합니다 — 그렇지 않으면 키트가 새 시스템이 아니라 USB 스틱에서 다시 부팅될 수 있습니다.
6. 업데이트된 시스템은 첫 부팅 시 `oem-config`를 시작합니다 — Ubuntu 설정을 다시 완료하여 새 설치의 사용자 계정을 만드십시오.

### 순서대로 보게 되는 화면

![Balena Etcher로 ISO를 USB 드라이브에 기록하는 모습](/images/jetson-agx-orin/jetson-iso_etcher-flash-start.gif)
*Balena Etcher로 Jetson ISO를 USB 드라이브에 기록하는 모습.*

![USB 드라이브를 선택한 UEFI 부트 관리자](/images/jetson-agx-orin/jetson-iso_uefi_boot-manager-menu.png)
*키트가 USB 드라이브에서 자동으로 부팅되지 않으면 UEFI 부트 관리자에서 해당 드라이브를 선택하십시오.*

![QSPI capsule 업데이트 확인 프롬프트](/images/jetson-agx-orin/jetson-iso__qspi_update_options.png)
*QSPI capsule 업데이트 프롬프트 — `Y`를 누르십시오. 호환성을 위해 반드시 필요하며 두 번 실행됩니다.*

![Jetson ISO GRUB 메뉴](/images/jetson-agx-orin/jetson-iso_grub-menu-r39-top.png)
*"Install Jetson ISO r39.2.1"을 선택합니다.*

![GRUB 메뉴의 저장 대상 옵션](/images/jetson-agx-orin/jetson-iso_grub-menu-options.png)
*설치 대상으로 eMMC 또는 NVMe를 선택합니다.*

![설치 프로그램 진행 화면](/images/jetson-agx-orin/jetson-iso_wait-for-15min.png)
*설치 프로그램은 약 15분간 실행됩니다.*

![업데이트 후의 oem-config 환영 화면](/images/jetson-agx-orin/oem-config_welcome.png)
*업데이트가 끝나면 `oem-config`가 다시 실행되어 새 시스템을 설정합니다.*

### 주의 사항과 알려진 문제

- **구형 제품(< L4T r35.5):** Jetson ISO 방식은 설치된 BSP가 r35.5 이상이어야 합니다. 구형 키트를 먼저 업데이트하려면 호스트 PC 방식(SDK Manager 또는 `flash.sh` 스크립트) 중 하나를 사용하십시오 — [플래싱 및 업데이트](/ko/tutorials/jetson-agx-orin/flashing-and-updates)를 참조하십시오.
- **QSPI capsule 프롬프트를 놓쳤습니까?** ISO 설치를 다시 시작하고 `Y`를 누르십시오.
- **설치 중 검은 화면:** 일부 KVM 스위치는 ISO 설치 중 AGX Orin의 영상 출력을 제대로 처리하지 못합니다. 모니터를 개발자 키트에 직접 연결하고 다시 시도하십시오.

## 3단계 — JetPack 구성 요소 설치

### 3a. `apt` 사용(가장 간단 — 호스트 PC 불필요)

키트의 데스크톱에서 터미널을 열고(`Ctrl`+`Alt`+`T`) 다음을 실행합니다:

```bash
sudo apt update
sudo apt dist-upgrade
sudo reboot
sudo apt install nvidia-jetpack
```

이 명령은 CUDA, cuDNN, TensorRT를 비롯한 나머지 JetPack 스택을 설치합니다. 연결 속도에 따라 **약 1시간**이 걸릴 수 있습니다.

결과를 확인합니다: `cat /etc/nv_tegra_release`가 R39 / REVISION 2.1을 보고해야 하고, CUDA 툴킷을 사용할 수 있게 됩니다(`nvcc --version`). 전체 체크리스트는 [시스템 검증](/ko/tutorials/jetson-agx-orin/verify-your-system)을 참조하십시오.

### 3b. SDK Manager 사용(대안)

SDK Manager는 USB를 통해 호스트 PC에서 JetPack 구성 요소를 설치합니다:

1. 키트의 전원을 켠 상태에서 동봉된 USB Type-C - Type-A 케이블로 키트를 호스트 PC에 연결합니다. 케이블은 키트의 **40핀 커넥터 옆에 있는 USB Type-C 포트**에 꽂습니다.
2. SDK Manager에서 Jetson AGX Orin 타깃을 선택하고 **Jetson SDK Components**를 선택한 뒤("Jetson OS"를 다시 플래싱하는 대신) 화면의 단계(USB 연결, 주소 `192.168.55.1`)를 따릅니다.

전체 SDK Manager 설명은 NVIDIA가 관리하며(아래 링크 참조), 플래싱 가이드에서 자세히 다룰 예정입니다.

## 빠른 문제 해결

| 증상 | 먼저 확인할 것 |
|---|---|
| 키트에 전원이 켜지지 않음 | 전원 어댑터가 **DC 잭 위쪽** USB-C 포트에 꽂혀 있는지 확인하고, 전원 버튼을 누릅니다 |
| 화면 출력 없음 | DisplayPort 케이블(HDMI 모니터에는 액티브 DP→HDMI 어댑터 사용), ISO USB를 꽂지 않고 부팅해 보십시오 |
| ISO 설치 프로그램이 시작되지 않음 | Etcher로 기록한 USB인지(파일 복사가 아닌지) 확인하고, UEFI 부트 관리자에서 USB를 선택합니다 |
| QSPI 프롬프트가 나타남 | `Y`를 누릅니다 — 필수이며, 업데이트는 두 번 실행됩니다 |
| 설치 중 화면이 검게 변함 | KVM 스위치 간섭 — 모니터를 직접 연결하십시오 |

## 출처와 검증

이 페이지는 Juxi Technology가 NVIDIA 공식 문서와 대조하여 작성하고 확인했습니다:

- [Jetson AGX Orin Developer Kit User Guide — Quick Start](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) (2026-09-23 확인)
- [Jetson AGX Orin Developer Kit User Guide — JetPack SDK Setup](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html) (2026-09-23 확인)
- [BSP Installation (SDK Manager / flash script)](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html)

*상태: 2026-10-11 검토 완료. 이 단계들은 아직 Juxi Technology가 실제 하드웨어에서 검증하지 않았으며, 위 날짜 기준 NVIDIA 공식 문서에 근거합니다.*

**이미지 출처:** 이 페이지의 모든 스크린샷은 NVIDIA 공식 *Jetson AGX Orin Developer Kit User Guide*(2026-09-23 다운로드)에서 가져온 것이며 저작권은 © NVIDIA Corporation에 있습니다. 공식 설정 흐름을 설명하기 위해 여기에 수록했습니다.

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 본 가이드는 Juxi Technology가 발행하며, NVIDIA 공식 출판물이 아닙니다.
