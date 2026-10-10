---
title: JetPack 6.x에서 JetPack 7.2.1로 마이그레이션
sidebar_label: JetPack 6.x에서 마이그레이션
slug: /migration/jetpack-6-to-7
description: >-
  NVIDIA Jetson Orin Nano Super 개발자 키트(8GB)에서 JetPack 6.x와 JetPack
  7.2.1 사이에 무엇이 바뀌는지: 펌웨어 전제 조건, Super 모드 함정,
  마이그레이션 체크리스트, 롤백.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack-sdk-623
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
review_owner: cheny
---

# JetPack 6.x에서 JetPack 7.2.1로 마이그레이션

이 페이지는 JetPack 6.x에서 JetPack 7.2.1로 옮겨 가는 Jetson Orin Nano
(Super) 개발자 키트 사용자를 위한 것입니다. 새 키트라면 대신
[빠른 시작](/ko/tutorials/jetson-orin-nano/quick-start)부터 시작하십시오.

JetPack 7.2.1은 큰 도약입니다: 전체 재플래싱, 펌웨어 전제 조건, 그리고
일부 소프트웨어 재빌드를 계획하십시오.

## 무엇이 바뀌는가

| 계층 | JetPack 6.x 시기 | JetPack 7.2.1 |
|---|---|---|
| Jetson Linux (L4T) | 36.x (JetPack 6.2.3 = 36.5.2) | **39.2.1** |
| OS / 루트 파일 시스템 | Ubuntu 22.04 | **Ubuntu 24.04** |
| Linux 커널 | 5.15 | **6.8** |
| CUDA | 12.6 (JetPack 6.2.3 = 12.6.10) | **13.2.2** |
| TensorRT | 10.3.0 | **10.16.2** |
| cuDNN | 9.3.0 | **9.20.0** |
| VPI | 3.2 | **4.1.4** |

> **Juxi 참고:** 6.x 열은 JetPack 6의 마지막 프로덕션 릴리스인 JetPack
> 6.2.3을 사용합니다. `cat /etc/nv_tegra_release`로 본인 시스템의 버전을
> 확인하십시오. 7.2.1의 VPI 값은 NVIDIA의 다운로드 페이지가 아니라 패키지
> 저장소에서 가져온 것이며, 다운로드 페이지에는 여전히 JetPack 7.2 값이
> 표시됩니다 — [시스템 검증](/ko/tutorials/jetson-orin-nano/verify-your-system)의
> 참고 사항을 보십시오.

- **더 이상 SD 카드 이미지가 없습니다.** "Starting with JetPack 7.2, SD Card images are
  no longer supported." 설치 프로그램은 USB 스틱용 ISO 하나입니다; microSD
  카드는 여전히 유효한 설치 대상입니다.
- **펌웨어 전제 조건.** JetPack 7.2 이상 설치는 JetPack 6.x 세대의 Jetson
  UEFI/QSPI 펌웨어를 요구합니다; 구형 출하 펌웨어가 있는 키트는 JetPack 6.x
  업데이트 경로를 먼저 완료해야 합니다. JetPack 7.0과 7.1에는 Orin 하드웨어가
  나열되지 않으므로, 7.2가 이 제품군의 첫 7.x 릴리스입니다.
- **다른 설치 흐름.** ISO는 USB 스틱에서 장치의 microSD 또는 NVMe로
  설치합니다. 설치 전용이며 "live USB"가 아닙니다.

## 다음 경우에는 아직 업그레이드하지 마십시오

- **로봇이 Isaac ROS에 의존하는 경우.** 7.2.1 구성 요소 매트릭스는 Isaac ROS를
  "Coming soon"으로 나열하지만, NVIDIA 직원은 Isaac ROS 4.6이 JetPack 7.2를
  지원한다고 밝힙니다 — 출처가 서로 다릅니다. [로보틱스](/ko/tutorials/jetson-orin-nano/robotics)를
  참조하십시오.
- **카메라 코드가 이전 SIPL API에 고정된 경우.** Jetson Linux 39.2.1의 SIPL API
  v2.0.0에는 "breaking changes that affect API, ABI, JSON
  schema, package layout, and driver loading"이 포함되어 있습니다. 커뮤니티
  보고(NVIDIA 미확인)에 따르면 NITO 카메라 구성이 이제 기본이며 레거시
  `NVCAMERA_NITO_PATH=CONFIG` 모드는 더 이상 동작하지 않습니다.
- **스택을 재검증할 수 없는 경우.** CUDA 13 휠, Python 패키지, 서드파티
  라이브러리가 Ubuntu 24.04와 CUDA 13.2용으로 존재해야 합니다. NVIDIA의 7.2.1
  페이지에는 Python이나 OpenCV 버전이 나열되어 있지 않습니다; CUDA 13.2
  휠은 NVIDIA 직원이 Jetson AI Lab SBSA 인덱스를 가리킵니다 —
  [로컬 LLM](/ko/tutorials/jetson-orin-nano/local-llm)을 참조하십시오.

## 그대로 이어올 수 없는 항목 — 재빌드 계획

- **TensorRT 엔진.** TensorRT가 10.3.0에서 10.16.2로 올라갑니다. 직렬화된
  엔진은 TensorRT 버전에 종속됩니다. 타깃에서 다시 빌드하십시오.
- **CUDA 바이너리.** CUDA가 12.6에서 13.2.2로, 큰 폭으로 올라갑니다.
  CUDA 12.x 바이너리가 그대로 이어질 것이라 기대하지 마십시오; 새 툴킷으로
  다시 빌드하십시오.
- **out-of-tree 커널 모듈.** 커널이 5.15에서 6.8로 올라갑니다. 새 커널
  헤더에 맞춰 모듈을 다시 빌드하십시오.
- **카메라 드라이버와 디바이스 트리.** SIPL 2.0 API 및 ABI 변경이 적용됩니다
  (위 참조).
- **컨테이너.** JetPack 6 / L4T r36용으로 빌드한 이미지는 구 스택에 남습니다;
  ISO에는 NVIDIA Container Toolkit 1.19가 포함됩니다. NVIDIA 직원에 따르면
  Orin Nano는 이제 주류 Arm64 "arm64-SBSA" 컨테이너를 실행할 수 있습니다.
- **Python 환경.** Ubuntu 24.04는 22.04보다 새로운 Python을 사용합니다.
  가상 환경을 다시 만들고 `python3 --version`을 확인하십시오.

## 마이그레이션 체크리스트

1. **먼저 백업하십시오.** 설치는 선택한 대상 스토리지를 지웁니다. 키트
   밖으로 복사해 두십시오: 애플리케이션 데이터, 구성 파일, 카메라
   캘리브레이션, 컨테이너 볼륨, TensorRT 빌드 스크립트와 ONNX 모델,
   그리고 사용자 정의 드라이버나 디바이스 트리 소스. 버전은
   `cat /etc/nv_tegra_release`와 `apt list --installed | grep nvidia-jetpack`으로
   기록하십시오.
2. **펌웨어 관문을 통과하십시오.** 전원을 켜고 NVIDIA 스플래시에서 Esc를
   반복해서 눌러 UEFI 메뉴의 펌웨어 버전을 확인하십시오. 펌웨어 36.x
   이상이면 7.2.1을 설치할 준비가 된 것입니다. 36.0보다 오래되었다면
   먼저 "JetPack 6.x 업데이트 경로"를 완료하십시오: 브리지로 JetPack 5.1.3
   SD 카드 이미지(`JP513-orin-nano-sd-card-image_b29.zip`)를 부팅하고,
   부트로더 업데이트가 예약되게 한 뒤, 재부팅하고, QSPI 업데이터를 설치하고
   (`sudo apt install nvidia-l4t-jetson-orin-nano-qspi-updater`), 다시
   재부팅합니다. 재부팅이 여러 번 발생합니다; JetPack 6.2.x는 첫 부팅 후
   업데이트를 한 번 더 예약할 수 있습니다. BSP 36.2 / JetPack 5.0 DP인
   장치는 먼저 이후 릴리스로 업데이트해야 합니다. 예약 상태는
   `sudo systemctl status nv-l4t-bootloader-config`로, 펌웨어는
   `sudo nvbootctrl dump-slots-info`로 확인하십시오.
3. **설치 USB를 만드십시오.** r39.2.1 Jetson ISO를 Balena Etcher로 USB
   플래시 드라이브(16 GB 이상)에 기록하십시오. ISO를 microSD 카드에
   기록하지 마십시오. 부팅 전에 대상 스토리지(microSD 또는 NVMe)를
   장착하십시오 — 설치 프로그램은 장착된 장치만 제공합니다.
4. **JetPack 7.2.1을 설치하십시오.** UEFI Boot Manager로 부팅합니다:
   스플래시에서 Esc를 누르고, Boot Manager를 선택하고, USB 디스크를
   선택하십시오(NVIDIA는 이 명시적 선택을 권장합니다).

   > **중요** — QSPI 캡슐 업데이트 프롬프트가 나타나면 30초 안에 **Y**를
   > 누르십시오("가장 많이 놓치는 단계"). 시간이 초과되면 나중에 설치가
   > 실패합니다. 캡슐 업데이트는 두 번 실행되며 키트가 재부팅될 수 있습니다
   > — 이는 정상입니다.

   GRUB 메뉴에서 Install Jetson ISO r39.2.1을 선택하고, 대상 스토리지를
   선택한 뒤, 확인하십시오(설치는 선택한 스토리지를 지웁니다). 설치가
   끝나고 안내가 나타나면 USB 스틱을 제거한 다음, Ubuntu 초기 설정
   (라이선스, 언어, 네트워크, 사용자)을 완료하고 `sudo apt update`와
   `sudo apt install nvidia-jetpack`을 실행하십시오.
5. **Super 프로파일을 확인하십시오.** `sudo /usr/sbin/nvpmodel -q`가
   전원 모드를 나열합니다; 데스크톱에서는 상단 표시줄의 Power Mode,
   MAXN SUPER를 사용하십시오. Super Mode가 활성화되면
   `cat /etc/nv_boot_control.conf`의 TNSPEC 줄에 `-super` 접미사가
   표시됩니다. 없다면 다음 섹션을 읽으십시오.
6. **워크로드를 재검증하십시오.** 타깃에서 TensorRT 엔진과 CUDA
   애플리케이션을 다시 빌드하십시오. Python 환경을 다시 만들고, 컨테이너를
   갱신하고, 카메라를 다시 테스트하십시오.
   [시스템 검증](/ko/tutorials/jetson-orin-nano/verify-your-system)의 점검을
   실행하십시오 — r39.2.1에서는 `cat /etc/nv_tegra_release`가 R39,
   리비전 2.1을 보고해야 합니다.

## Super 모드 함정(7.2.1에서 수정됨)

7.2.0 ISO 설치에서는 장치가 기존 보드 구성을 유지했습니다: 25W와 MAXN
SUPER 전원 모드가 없었고, `sudo nvpmodel -m 2`는 "bad power mode 2" 오류로
실패했습니다. NVIDIA는 이를 r39.2 릴리스 노트에 알려진 문제 6279443으로
문서화했습니다: "Units will not default to 'Super' mode after the
update. To use 'Super' mode, you must flash the target using a Linux host
or SDKM." NVIDIA 직원은 나중에 이를 ISO 버그라고 부르며 7.2.1에서
수정되었다고 밝혔습니다.

JetPack 7.2.1은 기본적으로 Super 구성을 플래싱합니다: "ISO now flashes
the Jetson Orin Nano Developer Kit with Super Mode flashing configuration
by default." 이슈 6279443은 r39.2.1 알려진 문제 목록에 없습니다.

남아 있는 주의 사항 두 가지:

- **호스트에서 플래싱할 때 올바른 타깃을 선택하십시오.** SDK Manager에서
  타깃은 "Jetson Orin Nano [8GB developer kit version]"입니다. 플래시
  스크립트에서는 Super 모드를 활성화하려면 일반 타깃이 아니라
  `jetson-orin-nano-devkit-super` 타깃을 사용하십시오. 예시(개발자 가이드,
  NVMe): `sudo ./l4t_initrd_flash.sh --erase-all jetson-orin-nano-devkit-super internal`.
- **기존 시스템 위에 7.2.1을 재설치하는 경우.** NVIDIA: "If you're
  re-installing JetPack 7.2.1 using ISO on an already installed system,
  please carefully follow the instructions in the Getting Started Guide."
  NVIDIA는 7.2.1 재설치가 7.2.0 ISO로 인해 non-Super가 된 장치의 Super
  모드를 복원하는지 밝히지 않았습니다; 문서화된 경로는 Super 구성으로
  호스트에서 플래싱하는 것입니다. 커뮤니티의 제자리 수정
  (`/etc/nv_boot_control.conf` 편집)은 NVIDIA가 보증하지 않으며, 한 사용자는
  부팅 루프를 보고했습니다.
  [문제 해결](/ko/tutorials/jetson-orin-nano/troubleshooting)을 참조하십시오.

## 롤백

NVIDIA 직원은 이렇게 밝힙니다: "Downgrade: Yes, you can flash back to JP 6.2.2 via
SDK Manager if needed." 한 사용자가 왕복(6.2.2로 재플래싱 후 7.2로
재업그레이드)을 확인했습니다. 솔직히 말하면 비용은 이렇습니다:

- **제자리 다운그레이드는 없습니다.** x86 Ubuntu 호스트에서의 전체
  재플래싱입니다(공식 페이지에는 Ubuntu 호스트가 나열되어 있고; NVIDIA
  직원은 Windows SDK Manager도 동작한다고 보고합니다).
- **대상 스토리지가 지워집니다.** 백업만이 유일한 사본입니다.
- **그 이상은 보장되지 않습니다.** NVIDIA는 다운그레이드 절차를 게시하지
  않았고, JetPack 6.x 부팅 미디어가 r39.2.x QSPI 펌웨어와 동작한다고 밝힌
  문서도 없습니다. 다운그레이드는 구 스택의 재설치에 동일한 재빌드 작업이
  더해지는 것으로 취급하십시오.

Super 전원 모드만 없다면 더 좁은 해법은 Super 구성으로 호스트에서
재플래싱하는 것입니다 — 7.x를 유지합니다.
[플래싱 및 업데이트](/ko/tutorials/jetson-orin-nano/flashing-and-updates)를
참조하십시오.

## 출처

- [JetPack SDK Downloads — JetPack 7.2.1](https://developer.nvidia.com/embedded/jetpack/downloads) — 구성 요소 매트릭스, SD 카드 제거, Super 모드 기본값, 재설치 주의 (2026-09-26 확인)
- [Jetson Orin Nano Developer Kit — Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) — ISO 설치 흐름, 펌웨어 관문, 캡슐 프롬프트, MAXN SUPER (2026-09-26 확인)
- [Jetson Orin Nano Developer Kit — JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) — 펌웨어 브리지, 버전 확인 (2026-09-26 확인)
- [Jetson Linux 39.2.1 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) — GA 상태, SIPL 2.0 주요 변경 (2026-09-26 확인)
- [Jetson Linux 39.2 Release Notes (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — 이슈 6279443, Super 모드 함정 (2026-09-26 확인)
- [JetPack 6.2.3](https://developer.nvidia.com/embedded/jetpack-sdk-623) — JetPack 6.x 기준 버전 (2026-09-26 확인)
- [NVIDIA developer forum — JetPack 7.2 GPU acceleration issue](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) — NVIDIA 직원: 다운그레이드 경로와 CUDA 13.2 휠 인덱스 (2026-09-26 확인)
- [NVIDIA developer forum — 25W and MAXN SUPER not seen in JetPack 7.2](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) — NVIDIA 직원과 사용자: `-super` TNSPEC 확인, 호스트 재플래싱 (2026-09-26 확인)

*상태: 2026-10-11 검토 완료. 기재된 날짜 기준 NVIDIA 공식
문서와 개발자 포럼 진술에 근거하며, 아직 Juxi Technology가 실제 하드웨어에서
검증하지 않았습니다. 재빌드 목록은 일반적인 플랫폼 결과를 설명한 것입니다 —
자체 스택과 대조해 검증하십시오.*

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 이 페이지는 Juxi Technology가 게시하며 NVIDIA의 공식 발행물이 아닙니다.
