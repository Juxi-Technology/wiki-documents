---
title: 문제 해결
sidebar_label: 문제 해결
slug: /support/troubleshooting
description: >-
  NVIDIA Jetson Orin Nano Super 개발자 키트(8GB)를 위한 증상 기반 문제 해결 —
  설치 함정, 전원 모드, NVMe 스토리지, GPU 가속, 알려진 문제를 명확한
  출처 등급과 함께 다룹니다.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-missing-25w-power-mode-qspi-firmware-mismatch-after-missed-capsule-update/377553
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-in-jetpack-7-2-r39-2-nvme-ssd-on-pcie-c7-is-not-detected-bootable-in-uefi-stage-but-works-normally-after-linux-boots/383858
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-repeated-ext4-nvme-filesystem-corruption-and-attempting-recovery-boot-on-jetpack-7-2/379702
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269
    checked: 2026-09-26
review_owner: cheny
---

# 문제 해결

아래 색인에서 증상을 찾은 다음 해당 섹션을 읽으십시오. 등급: **A** = NVIDIA 공식 문서; **B** = NVIDIA 개발자 포럼(직원 또는 커뮤니티 보고). 커뮤니티에만 있는 항목은 *미확인*으로 표시했습니다. Juxi에는 이 시리즈의 실물 장치가 없습니다 — 이 페이지는 문서 검증만 완료했으며, 하드웨어 테스트는 하지 않았습니다.

## NVIDIA 공식 문제 해결 가이드부터 시작하십시오

이 키트를 위해 NVIDIA가 첫 번째로 안내하는 곳: [문제 해결 가이드](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html). 정확히 다섯 가지 설정 문제를 다룹니다: (1) Jetson ISO가 부팅되지 않음, (2) 화면 출력 없음, (3) 설치 프로그램이 대상 스토리지를 표시하지 않음, (4) 펌웨어 업데이트 필요, (5) docker 권한 오류. 관련 공식 페이지: [임시 해결책(Interim Solutions)](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/interim_solutions.html) 페이지는 현재 어떤 우회 방법도 담고 있지 않으며(JetPack 6.x 업데이트 경로로 안내합니다), [추가 문서(Additional Docs)](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) 페이지에는 NVIDIA의 에스컬레이션 채널이 나열되어 있습니다. (등급 A)

## 증상 색인

| 증상 | 섹션 |
|---|---|
| 설치 프로그램이 언어/네트워크/사용자 화면을 건너뛴 뒤 시스템이 커서만 있는 검은 화면에서 멈춤; 어떤 암호도 동작하지 않음 | QSPI 캡슐 프롬프트를 놓침 |
| 설치는 정상으로 보였지만 나중에 실패 | QSPI 캡슐 프롬프트를 놓침 |
| USB 허브나 동글을 연결한 상태에서 설치 또는 플래싱이 실패 | USB 주변 기기 |
| 전원 메뉴에 7W와 15W만 있고 `nvpmodel -m 2`가 오류 | 25W / MAXN SUPER 없음 |
| MAXN SUPER에서도 GPU가 624.75 MHz에 고정 | GPU가 624.75 MHz에 고정 |
| 전원 모드 변경이 재부팅을 요구; 재부팅이 검은 화면으로 멈출 수 있음 | 전원 모드 변경과 검은 화면 재부팅 |
| 설치 프로그램이 NVMe 드라이브를 제공하지 않음; 100% 이후 설치가 멈춤 | NVMe 스토리지 문제 |
| UEFI 단계에서 NVMe가 보이지 않음 | NVMe 스토리지 문제 |
| "Step 9/13 Updating boot firmware"에서 설치가 중단 | Step 9/13의 보드 이름 불일치 |
| ISO로 플래싱한 Super 장치에서 `jetson-io.py` 실패 | Jetson-IO DTB 불일치 |
| Ollama가 CPU로 실행됨; "Unsupported JetPack version" 경고 | Ollama와 GPU 가속 |
| JetPack 7.2용 Python 휠이 필요 | Python 휠 |
| Wi-Fi가 네트워크를 찾지 못함; 6 GHz MBSSID 라우터 미지원 | Wi-Fi가 네트워크를 찾지 못함 |
| 화면 출력 없음; 설치 프로그램이 부팅되지 않음 | 공식 문제 해결 가이드(위) |
| Docker 소켓 권한 오류 | Docker 권한 오류 |
| 디스플레이 없이 부트 로그가 필요 | 시리얼 콘솔 |

## QSPI 캡슐 프롬프트를 놓쳤습니다(가장 흔한 설치 함정)

ISO 설치 중에 키트가 QSPI 펌웨어 캡슐 업데이트 확인을 요청합니다. NVIDIA는 이를 "가장 많이 놓치는 단계"라고 부릅니다: 프롬프트는 30초만 기다립니다. **Y를 누르십시오.**

- 시간이 초과되면 "the install fails later". NVIDIA의 지침은 설치를 다시 시작하고 Y를 누르라는 것입니다. (등급 A; [빠른 시작](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) 5.1절; 릴리스 노트 이슈 6266271, [r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)와 [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf): "Skipping this step causes installation issues due to incompatibility of new ISO images with older QSPI images.")
- 업데이트는 두 번 실행되며, 키트는 그 사이에 재부팅될 수 있습니다. 이는 정상입니다. NVIDIA는 자동 부팅에 의존하지 말고 UEFI Boot Manager에서 USB 설치 프로그램을 명시적으로 선택하는 것도 권장합니다. (등급 A, [빠른 시작](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html); 직원이 사용자의 우회 방법으로 가이드가 업데이트되었다고 확인 — 등급 B, [스레드 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))
- 실패 양상(등급 B, 사용자 보고와 직원 확인, [스레드 380410](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410)): 설치 프로그램이 언어, 네트워크, 사용자 이름 화면을 건너뛰고 "Finished installation and reboot"로 넘어간 뒤, 시스템이 커서만 있는 검은색 또는 회색 화면에서 멈춥니다. 어떤 기본 자격 증명도 동작하지 않습니다(nvidia/nvidia, ubuntu/ubuntu, root/빈 암호). 원인: 캡슐 프롬프트가 확인되지 않았습니다. Y를 누른 뒤에는 설정 화면이 나타나고 설치가 완료되었습니다. 같은 스레드의 다른 사용자는 SDK Manager로 플래싱해 해결했습니다. (등급 B)
- 키트가 설치 프로그램에 도달하지 못한다면(검은 화면이거나 UEFI 셸로 떨어짐), QSPI 펌웨어가 너무 오래된 것일 가능성이 높습니다: JetPack 7.2/7.2.1은 JetPack 6.x 세대의 UEFI/QSPI 펌웨어를 요구합니다. [플래싱 및 업데이트](/ko/tutorials/jetson-orin-nano/flashing-and-updates)와 [JetPack 6에서 7로](/ko/tutorials/jetson-orin-nano/jetpack-6-to-7)를 참조하십시오. (등급 A, [빠른 시작](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html))

## 특정 USB 주변 기기에서 설치 또는 플래싱이 실패합니다

공식 이슈 **5424568**과 **5460707**([r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)와 [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) 노트에 존재): 설치 USB 드라이브를 **"USB3.0 4-port Portable Hub Model UH400"** 허브에 꽂으면 ISO 설치가 실패합니다 — "Other USB sticks or hubs work as expected" — 그리고 **TRENDnet TU2-ET100** USB-to-Ethernet 동글을 연결한 상태에서는 플래싱이 때때로 실패합니다. 다시 시도하기 전에 다른 스틱/허브나 직접 USB 포트를 사용하고 동글을 제거하십시오. (등급 A)

## 25W와 MAXN SUPER가 없습니다

증상: 7W와 15W만 나타나거나, `nvpmodel -m 2`가 bad-power-mode 오류를 반환합니다. 원인 — 공식 알려진 문제 **6279443**([r39.2 노트](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)): ISO로 업데이트한 장치는 "will not default to 'Super' mode after the update. To use 'Super' mode, you must flash the target using a Linux host or SDKM." (등급 A)

징후 — `/etc/nv_boot_control.conf`에 `-super` 접미사가 없습니다. 직원: "When Super Mode is enabled, the configuration should include the -super suffix … Currently, the ISO image cannot upgrade a device from non-Super Mode to Super Mode. Please use an x86 host to reflash the device with the Super Mode configuration." (등급 B, [스레드 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627))

7.2.1에서 설계로 수정됨 — 직원: "This would be fixed in jp7.2.1"; [r39.2.1 노트](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)는 "ISO now flashes the Jetson Orin Nano Developer Kit with Super Mode flashing configuration by default"라고 하며, 이슈 6279443은 알려진 문제 목록에 없습니다. (등급 A)

해결 방법:

1. Linux 호스트 또는 SDK Manager로 다시 플래싱합니다. (등급 A, 이슈 6279443, [r39.2 노트](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf))
2. 직원이 제시한 QSPI 전용 플래시 — QSPI 부트로더만 플래싱하고 시스템 이미지는 건드리지 않습니다(등급 B, [스레드 377553](https://forums.developer.nvidia.com/t/jetson-orin-nano-missing-25w-power-mode-qspi-firmware-mismatch-after-missed-capsule-update/377553)). 첫 번째 명령이 직원 명령이고, 두 번째는 보고자가 성공한 Super 타깃과 EEPROM 오버라이드를 추가한 것입니다:

```
sudo ./flash.sh --no-systemimg -c bootloader/generic/cfg/flash_t234_qspi.xml jetson-orin-nano-devkit internal

sudo SKIP_EEPROM_CHECK=1 BOARDID=3767 BOARDSKU=0005 FAB=300 ./flash.sh --no-systemimg -c bootloader/generic/cfg/flash_t234_qspi.xml jetson-orin-nano-devkit-super internal
```

3. 커뮤니티의 제자리 수정 — *미확인*, NVIDIA가 보증하지 않음(등급 B, [스레드 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627), [스레드 375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435)). NVIDIA 직원은 그 파일을 편집하기 **전에** 상태를 캡처해 두라고 사용자에게 요청했습니다(`cat /etc/nv_tegra_release`, `cat /etc/nv_boot_control.conf`, `sudo /usr/sbin/nvpmodel -q --verbose`) — 편집은 점검에 필요한 실패 상태를 제거하므로("would remove the failed state we need to inspect"). 보고된 절차: `sudo -i`; `perl -i -0777 -pe 's/nano-devkit-\n/nano-devkit-super-\n/g' /etc/nv_boot_control.conf`; `dpkg-reconfigure nvidia-l4t-bootloader`; `rm /etc/nvpmodel.conf`; `reboot`; 그다음 `sudo nvpmodel -m 2 --verbose --force`. 여러 사용자가 이후 25W와 MAXN SUPER가 나타났다고 확인했습니다; SD 카드 설치 사용자 한 명은 부팅 루프를 겪고 재설치했습니다.

맥락: 7.2 non-Super 설치에서는 `/etc/nvpmodel/nvpmodel_p3767_0003_super.conf`(15W, 25W, MAXN_SUPER)가 존재하지만, `/etc/nvpmodel.conf`는 15W와 7W만 있는 non-Super 파일을 가리킵니다. (등급 B, 커뮤니티, [스레드 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151)). 전원 모드 확인 명령: [시스템 검증](/ko/tutorials/jetson-orin-nano/verify-your-system).

## GPU가 624.75 MHz에 고정됩니다

MAXN_SUPER가 활성화되어 있어도 GPU가 624,750,000 Hz(`bpmp/debug/clk/nafll_gpc0/max_rate` = 624750000)에 계속 고정될 수 있습니다; 보고된 사례에서는 Super 캡슐만 플래싱하는 것으로는 해결되지 않았습니다 — Super 펌웨어가 적용되지 않았던 것입니다. 직원: SDK Manager로 플래싱하거나 Ubuntu 호스트에서 수동으로 플래싱하십시오; 7.2.1에서 수정되었다고 밝혔습니다. (등급 B, [스레드 377003](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003)) 커뮤니티 참고: L4T 39.2에는 `nvpmodel_p3767_0005.conf`가 없으며, P3767-0005 모듈은 0003 구성을 사용합니다(직원은 확인하지 않음). (등급 B, 커뮤니티, 위와 같은 스레드)

## 전원 모드 변경과 검은 화면 재부팅

- 전원 모드 변경 후의 재부팅 프롬프트는 GPU를 한 번 사용한 뒤에는 정상입니다("golden image context"). (등급 B, 직원, [스레드 375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435))
- 재부팅이 검은 화면으로 멈춘다면 이슈 **6236259**와 일치합니다([r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf); [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)에서 수정됨으로 기재): systemd 초기화 중에 EMC를 Fmax 아래로 낮추면 재부팅 시 시스템이 충돌할 수 있으며, 특히 디스플레이를 연결한 상태에서 그렇습니다. (등급 A)
- 우회 방법: 모니터를 분리한 채로 재부팅한 다음, 부팅 후에 다시 연결하십시오 — 한 사용자가 이 방법으로 전원 모드 문제가 해소되었다고 확인했습니다. (등급 B, 직원 및 사용자, [스레드 375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435))
- NVIDIA의 완화책: 재부팅하기 전에 MAXN으로 전환하고(EMC가 Fmax로 복원됩니다), 이미 문제 모드에 있다면 디스플레이 없이 한 번 부팅하십시오. (등급 A, 이슈 6236259, [r39.2 노트](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf))

## NVMe 스토리지 문제

**설치 프로그램이 드라이브를 제공하지 않음 / 파티션 단계 실패** — *미확인*: 설치 프로그램이 4K 섹터로 포맷된 NVMe 드라이브를 지원하지 않을 수 있습니다; 512n/512e가 필요합니다. `nvme id-ns -H /dev/nvme0n1`로 확인하십시오; `nvme format --lbaf=ID /dev/nvme0n1`로 변경합니다 — **데이터 파괴적**입니다; 게시글은 데이터 보존을 다루지 않습니다. NVIDIA는 이를 공식적으로 확인하지 않았습니다. (등급 B, 미확인, [스레드 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))

**설치는 정상으로 보이지만 부팅이 멈춤** — *미확인*: 설치 프로그램이 100%에 도달한 뒤 검은 화면이나 깜빡이는 커서가 나타난다는 보고가 여러 건 있습니다. 한 사용자는 복구 모드 직접 플래싱으로만 해결했고, 다른 사용자는 위의 4K 섹터 문제로 추적했습니다. 확인된 근본 원인은 없습니다. (등급 B, 미확인, [스레드 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))

**UEFI 단계에서 NVMe가 감지되지 않음(r39.2)** — PCIe C7의 드라이브가 R36.4에서는 동작했는데 UEFI 부팅 단계에서 보이지 않았습니다; 보고자는 기본 구성으로 복원하고 다시 플래싱해 해결했습니다. 직원: "for NV devkit, everything is already configured correctly in the default BSP. The more items you try to configure, it has more chance you make something not work." (등급 B, [스레드 383858](https://forums.developer.nvidia.com/t/jetson-orin-nano-in-jetpack-7-2-r39-2-nvme-ssd-on-pcie-c7-is-not-detected-bootable-in-uefi-stage-but-works-normally-after-linux-boots/383858)). 참고: JetPack 7.2부터 SD 카드 이미지는 없어졌습니다 — ISO를 USB 드라이브에 기록한 다음 microSD나 NVMe에 설치하십시오. (등급 A, [빠른 시작](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html))

## "Step 9/13 Updating boot firmware"에서 설치가 중단됩니다(보드 이름 불일치)

*미확인.* 설치가 다음과 같이 중단될 수 있습니다:

```
ERROR. 3767--0005--1--jetson-orin-nx-devkit-16gb- does not match any known boards.
```

원인: `/etc/nv_boot_control.conf`에 부트로더 패키지의 보드 목록과 일치하지 않는 오래된 COMPATIBLE_SPEC이 들어 있고, 그러면 oem-config/사용자 생성 단계가 실행되지 않습니다 — 이 경우의 "사용자 이름/암호 건너뜀" 메커니즘입니다. 부팅된 r39.2 시스템에서의 재현: `sudo apt-get install --reinstall nvidia-l4t-bootloader`. NVIDIA는 이를 확인하지 않았습니다. Orin NX 16GB에서도 재현되었고, 2026-09-18에 제3자가 재현했습니다(subiquity `command_34 … returned non-zero exit status 100`); SDK Manager 7.2.x가 "Step 9"에서 실패하는 변형도 보고되었습니다. (등급 B, 미확인, [스레드 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))

커뮤니티 우회 방법, *미확인*: `/target`으로 chroot한 뒤 `/var/lib/dpkg/info/nvidia-l4t-bootloader.postinst` 안의 `select_3767_payload`에서 보드 글로브 분기를 확장하고, `rm -f /opt/nvidia/l4t-packages/.nv-l4t-disable-boot-fw-update-in-preinstall`을 실행한 다음, `dpkg --configure -a`를 실행하고, `apt-mark hold nvidia-l4t-bootloader`를 실행합니다. NVIDIA는 이 실패에 대한 수정을 게시하지 않았습니다; 위의 커뮤니티 우회 방법은 여전히 미확인입니다. (등급 B)

## ISO로 플래싱한 Super 장치의 Jetson-IO DTB 불일치

공식 이슈 **6236205**([r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)와 [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)에 존재): ISO로 플래싱한 Orin Nano Super 장치에서 `jetson-io.py`가 실패합니다. 공식 우회 방법: `/boot` 아래에서 `fdtget` 루프로 `/compatible`과 `/model`을 비교해 일치하는 DTB를 찾고; `/boot/dtb/`에 `kernel_<name>.dtb`로 복사한 다음; `sudo /opt/nvidia/jetson-io/jetson-io.py`를 다시 실행합니다. 다른 방식으로 플래싱한 장치는 영향을 받지 않습니다. (등급 A)

## Ollama와 GPU 가속

이력: JetPack 7.2의 초기 Ollama 빌드는 Ollama의 사전 빌드 CUDA 라이브러리에 sm_87(Orin 컴퓨트 성능 8.7)이 없어서 CPU로 폴백했습니다. 직원이 로그 "skipping CUDA device — compute capability not in compiled architectures … device=Orin cc=870"을 인용하며 이렇게 밝혔습니다: "This is a known issue … We're working directly with the Ollama team to get native JP 7.2 support added." (등급 B, 직원, [스레드 372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521))

현재 상태: 최신 업스트림 Ollama는 동작합니다. 직원이 JetPack 7.2.1에서 확인했습니다(2026-09-21): `curl -fsSL https://ollama.com/install.sh | sh`로 설치하고, 모델을 실행한 다음, `ollama ps`를 확인하십시오 — `100% GPU`가 표시되어야 합니다. "WARNING: Unsupported JetPack version detected" 줄은 무해한 메시지이며, 예전 `override.conf` 우회 방법은 "is no longer needed"입니다. (등급 B, 직원, [스레드 383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350))

오래된 빌드 수정: `find /usr/local/lib/ollama ... | grep -Ei 'cuda|cudart|runner'` 결과에 `cuda_v12`와 `cuda_v13` 트리가 모두 보이면 오래된 것을 삭제하십시오 — `sudo rm -rf /usr/local/lib/ollama/cuda_v12`. 그러면 로그에 "load_backend: loaded CUDA backend from /usr/local/lib/ollama/cuda_v13/libggml-cuda.so … compute capability 8.7"이 표시되었습니다. (등급 B, 직원 및 사용자, [스레드 372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521))

8 GB 참고: `free -h`가 여유 메모리를 보여도 더 큰 모델은 `cudaMalloc failed: out of memory … failed to allocate buffer for kv cache`로 실패할 수 있습니다 — GPU 메모리가 공유되기 때문입니다. 더 작거나 양자화된 모델을 사용하십시오. (등급 B, 커뮤니티, [스레드 383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350)). 자세히: [8 GB에서의 로컬 LLM](/ko/tutorials/jetson-orin-nano/local-llm).

## JetPack 7.2용 Python 휠

JP 7.2 / CUDA 13.2에 대한 직원 답변: `https://pypi.jetson-ai-lab.io/sbsa/cu130`을 사용하십시오. (등급 B, 직원, [스레드 372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521)). 주의: 인덱스 루트를 확인했을 때(2026-09-26), `jp6/cu126`, `jp6/cu128`, `jp6/cu129`, `sbsa/cu130`, `sbsa/dev`가 나열되어 있었고 `jp7` 항목은 보이지 않았습니다; 커뮤니티 스레드는 `https://pypi.jetson-ai-lab.io/jp7/cu132`도 인용하는데, 그 목록에서는 보이지 않았습니다. (등급 C). 직원: "Downgrade: Yes, you can flash back to JP 6.2.2 via SDK Manager if needed." (등급 B)

## Wi-Fi가 네트워크를 찾지 못합니다

공식 Wi-Fi 알려진 문제([r39.2.1 노트](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)): **MBSSID를 사용하는 Wi-Fi 6 GHz 라우터는 지원되지 않습니다**(이슈 **5226667**), 그리고 **혼잡한 환경에서는 Wi-Fi 스캔이 AP를 놓칠 수 있습니다** — 버퍼 우회 방법으로 `wpa_cli set bss_max_count 500`을 실행하십시오(이슈 **5426982**). (등급 A)

## 시리얼 콘솔(헤드리스 디버깅)

배선(등급 A, [빠른 시작](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)): 버튼 헤더에 USB-to-TTL 시리얼 케이블 — RXD 핀 3은 어댑터의 TX 선, TXD 핀 4는 어댑터의 RX 선, GND 핀 7은 어댑터의 접지 선에 연결합니다. 그다음 "Open a serial console on your PC". 부팅 중 **Esc**를 반복해서 눌러 UEFI로 들어갑니다. 헤드리스 ISO 설치라면 부팅 전 옵션에서 Esc를 누르고 **Boot Manager**를 선택한 뒤 USB 디스크를 고르십시오.

- NVIDIA의 페이지에는 보드 레이트나 터미널 프로그램이 없습니다 — "Open a serial console on your PC"뿐입니다. (*확인하지 못한 것* 참조)
- DisplayPort 디스플레이나 Debug UART가 없으면 헤드리스 ISO 설치는 실용적이지 않습니다 — 직원: "You'd need to use either the DP display output or the Debug UART … so if you don't have either it's practically impossible." (등급 B, 직원, [스레드 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))
- 헤드리스 ISO 설치에서 UEFI 콘솔은 `/dev/ttyACM1`이며, QSPI가 GA(38.2)로 업데이트될 때까지 출력이 쏟아집니다; 디스플레이를 연결하면 나타나지 않습니다([이슈 5463861](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)). (등급 A)
- 디버그 케이블을 다시 꽂으면 minicom에 접근할 수 없게 될 수 있습니다 — minicom을 재시작하십시오([이슈 5437763](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf), 두 릴리스 모두). (등급 A)

## Docker 권한 오류

공식 수정(등급 A, [문제 해결 가이드](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html)) — 그룹 변경이 적용되지 않으면 터미널을 재시작하십시오:

```
sudo usermod -aG docker $USER
newgrp docker
```

## 도움 받기

- **NVIDIA Jetson 개발자 포럼**(forums.developer.nvidia.com) — 공식 커뮤니티로, NVIDIA의 Additional Docs 페이지에 나열되어 있습니다. 먼저 검색한 다음 `cat /etc/nv_tegra_release` 출력과 함께 게시하십시오; 전원이나 펌웨어 문제라면 `/etc/nv_boot_control.conf`와 `sudo /usr/sbin/nvpmodel -q --verbose`도 포함하십시오. (나열에 대한 등급 A)
- **주의:** "NVIDIA-STAFF"로 표시된 일부 답변은 자동 생성된 LLM 답변입니다 — "— 🤖 This is an automated AI response. I'm here to help, but please verify important details! —" 또는 "*** Please note that this reply is generated by LLM automatically ***" 같은 표시로 시작합니다. 신뢰할 수 없는 것으로 취급하십시오. (등급 B, [스레드 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627), [스레드 372269](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269))
- **Juxi Technology** — 기술 지원은 support@juxitech.com, 주문·보증·RMA 관련도 같은 주소로(주문 번호를 포함하십시오). 영업: sales@juxitech.com · 제품 문의: pe@juxitech.com.

## 아직 업스트림에서 열려 있는 문제

NVIDIA의 릴리스 노트에는 예기치 않은 리셋을 일으킬 수 있는 이 키트의 열린 이슈가 하나 있습니다: **SC7 suspend/resume 중 DCE 중단이 watchdog 리셋을 유발**(이슈 6235055, r39.2와 r39.2.1 모두에서 열려 있음). 키트를 절대 suspend하지 않는다면 영향이 없습니다; 한다면 구성 수정을 찾기보다 업스트림에서 추적하십시오. (등급 A, [r39.2.1 릴리스 노트](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf))

## 확인하지 못한 것

출처에서 열려 있는 질문들:

- 시리얼 콘솔의 보드 레이트와 터미널 프로그램 — NVIDIA는 "Open a serial console on your PC"라고만 합니다.
- 보드 이름 불일치(`command_34` 종료 코드 100)가 r39.2.1에서 수정되었는지; 스레드에 NVIDIA 답변이 없으며, 마지막 커뮤니티 재현은 2026-09-18입니다.
- 7.2.1 ISO 설치가 원래 7.2 ISO로 플래싱된 장치의 Super 모드를 복원하는지 — 노트에는 7.2.1이 기본적으로 Super 구성으로 플래싱한다고만 적혀 있습니다.
- 4K 섹터 NVMe 제한이 실제이며 공식 문서화되었는지 — 커뮤니티 보고뿐이며, 릴리스 노트나 사용자 가이드에는 없습니다.
- 오래된 COMPATIBLE_SPEC/TNSPEC을 다시 각인하는 공식 절차는 없습니다; NVIDIA에 보낸 포럼 질문은 답변되지 않았습니다.
- JP 7.2의 정본 휠 인덱스가 무엇인지: `/sbsa/cu130`(직원) 또는 `/jp7/cu132`(커뮤니티 인용).
- 플래싱 호스트 요구 사항이 공식 출처마다 다릅니다: 릴리스 노트는 "Ubuntu 24.04 and 22.04"(아키텍처 없음)라고 하고; BSP 페이지는 SDK Manager에 x86_64라고 하며; 사용자는 Windows SDK Manager로 7.2.1 플래싱에 성공했다고도 보고합니다.
- 커뮤니티의 `nv_boot_control.conf` 편집이 안전한지 — NVIDIA는 제자리 경로를 보증하지도, 수정하지도 않았습니다.
- non-Super 설치에서 `sudo nvpmodel -m 2`가 재부팅 후에도 유지될 수 있는지(커뮤니티 보고는 아니라고 합니다).
- EXT4/NVMe 손상 보고(저널 복구 실패, I/O 태그 타임아웃, "Attempting recovery boot") — 미해결; 스레드는 답변 없이 닫혔습니다.
- 소스 빌드나 컨테이너를 통한 Ollama — 어느 경로도 권위 있지 않습니다; 최신 업스트림 설치 프로그램만 7.2.1에서 NVIDIA 직원 확인을 받았습니다.
- "7.2.1-b49 vs b184" 빌드 주장과 누락된 "Agent Skills" — 미검증이며 혼동으로 보입니다; r39.2.1의 새로운 기능에는 "Agent skills for video pipelines"가 실제로 나열됩니다.

## 출처

- NVIDIA Jetson Orin Nano Developer Kit User Guide: [Troubleshooting Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html) · [Quick Start](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) · [JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) · [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) · [Hardware Layout](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) — 2026-09-26 확인
- 릴리스 노트: [JetPack 7.2 / L4T r39.2 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) · [JetPack 7.2.1 / L4T r39.2.1 (PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) — 2026-09-26 확인
- NVIDIA 개발자 포럼 스레드(2026-09-26 확인): [372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151) · [380410](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410) · [372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) · [377003](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003) · [377553](https://forums.developer.nvidia.com/t/jetson-orin-nano-missing-25w-power-mode-qspi-firmware-mismatch-after-missed-capsule-update/377553) · [375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435) · [372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) · [383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) · [383858](https://forums.developer.nvidia.com/t/jetson-orin-nano-in-jetpack-7-2-r39-2-nvme-ssd-on-pcie-c7-is-not-detected-bootable-in-uefi-stage-but-works-normally-after-linux-boots/383858) · [379702](https://forums.developer.nvidia.com/t/jetson-orin-nano-repeated-ext4-nvme-filesystem-corruption-and-attempting-recovery-boot-on-jetpack-7-2/379702) · [372269](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269)

*상태: 초안, cheny 검토 대기 중. 미확인으로 표시된 항목은 커뮤니티 포럼 보고에서 나온 것으로 바뀔 수 있습니다. 이 페이지는 문서 검증만 완료했습니다 — Juxi는 이 키트를 하드웨어에서 테스트하지 않았습니다.*

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 이 페이지는 Juxi Technology가 게시하며 NVIDIA의 공식 발행물이 아닙니다.
