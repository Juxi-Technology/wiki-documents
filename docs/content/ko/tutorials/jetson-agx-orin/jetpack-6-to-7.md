---
title: JetPack 6.x에서 JetPack 7.2로 마이그레이션
sidebar_label: JetPack 6.x에서 마이그레이션
slug: /migration/jetpack-6-to-7
description: >-
  Jetson AGX Orin 개발자 키트에서 JetPack 6.x와 JetPack 7.2.1 사이에 무엇이
  바뀌는지, 무엇을 다시 빌드해야 하는지, 권장 마이그레이션 순서를 정리합니다.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-23
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
    note: its component table lags on some rows (VPI/PVA still show 7.2 values)
  - source: https://wiki.seeedstudio.com/jetpack_7_2_resource_hub/
    checked: 2026-09-23
    note: secondary source — used for migration-topic organization only
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
    note: Isaac ROS support status — supersedes the "coming soon" note in the migration checklist
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: CUDA 13.2.2 (not the 13.2.1 shown on the JetPack downloads page) per the nvidia-jetpack 7.2.1 dependency chain
review_owner: cheny
---

# JetPack 6.x에서 JetPack 7.2로 마이그레이션

이 페이지는 AGX Orin 개발자 키트에서 기존 JetPack 6.x를 사용하는 분들을 위한 것입니다.
새 키트라면 대신 [빠른 시작](/ko/tutorials/jetson-agx-orin/quick-start)부터 시작하십시오.

## 무엇이 바뀌는가

| 계층 | JetPack 6.x 시기 | JetPack 7.2.1 |
|---|---|---|
| Jetson Linux (L4T) | 36.x (6.2는 36.4.x 사용) | **39.2.1** |
| OS / 루트 파일시스템 | Ubuntu 22.04 | **Ubuntu 24.04** |
| Linux 커널 | 5.15 | **6.8** |
| CUDA | 12.x | **13.2.2** |
| TensorRT | 10.x (6.x 시기) | **10.16.2** |

> JetPack 6.x 열의 값은 예시입니다(JetPack 6.2 시기). 계획을 세우기 전에
> `cat /etc/nv_tegra_release`로 **본인** 시스템의 정확한 현재 버전을 확인하고,
> 릴리스별 세부 정보는 NVIDIA의 [JetPack Archive](https://developer.nvidia.com/embedded/jetpack-archive)를
> 참조하십시오.

## 7.2 라인에서 Orin에 추가된 새로운 기능

Jetson Linux 39.2 릴리스 노트에서:

- **Jetson Orin 패밀리가 JetPack 7** 소프트웨어 라인에 합류합니다(Thor와 같은 세대).
- **통합 ISO 설치** — USB 스틱 설치 경로로, 호스트 PC가 필요하지 않습니다.
- 에이전틱 AI 워크플로를 위한 **NemoClaw** 단일 명령 설치.
- 맞춤형 프로덕션 이미지를 위한 공식 **Yocto/OpenEmbedded 레시피**(OE4T).
- 카메라 스택: **SIPL API v2.0**(GMSL 및 CoE) — 이 릴리스에는 **ABI 변경**이 있습니다: JetPack 7.1용으로 빌드한 UDDF 드라이버는 JetPack 7.2 헤더에 맞춰 다시 빌드해야 합니다.
- *(AGX Orin 32GB Super Mode / MAXN_SUPER는 32GB 전용이며 64GB 키트에는 적용되지 않습니다. SBSA 및 MIG 변경 사항은 Jetson Thor에 관련된 것입니다.)*

## 그대로 이어올 수 없는 항목 — 재빌드 계획

- **out-of-tree 커널 모듈** — 커널이 6.8로 올라갔으므로 새 헤더에 맞춰 모듈을 다시 빌드해야 합니다.
- **카메라 드라이버와 디바이스 트리 커스터마이징** — 39.2에 맞춰 다시 빌드하십시오; SIPL 2.0은 UDDF 드라이버의 ABI 변경도 가져옵니다.
- **TensorRT 엔진** — 직렬화된 엔진은 TensorRT 버전에 종속됩니다; 타깃에서 TensorRT 10.16.2로 다시 빌드하십시오.
- **CUDA 바이너리** — CUDA 13으로 다시 빌드하십시오; 12.x 바이너리가 그대로 이어질 것이라 기대하지 마십시오.
- **컨테이너** — JetPack 7 호환 이미지(예: 업데이트된 NGC 컨테이너)로 전환하십시오.
- **Python 환경과 시스템 서비스** — Ubuntu 24.04에 맞춰 다시 만드십시오(패키지 이름, 저장소, 인터프리터 버전이 바뀌었습니다).

## 권장 마이그레이션 순서

1. 무엇이든 지우기 *전에* 7.2.1에서 **소프트웨어 스택이 지원되는지 확인**하십시오 — 의존하는 각 구성 요소를 NVIDIA의 [JetPack 7.2.1 구성 요소 목록](https://developer.nvidia.com/embedded/jetpack/downloads)과 대조하십시오. 이 페이지는 독립적으로 릴리스되는 SDK의 경우 뒤처질 수 있습니다: Isaac ROS 4.6.0이 Jetson Orin + JetPack 7.2 지원을 추가했는데도 여전히 Isaac ROS를 "출시 예정"으로 기재하고 있습니다([JetPack 7.2에서의 로보틱스](/ko/tutorials/jetson-agx-orin/robotics) 참조).
2. **백업:** 애플리케이션 데이터, 센서 캘리브레이션 파일, 컨테이너 볼륨, 디바이스 트리 소스, TensorRT 빌드 스크립트/ONNX 모델.
3. **JetPack 7.2.1 플래싱**([플래싱 및 업데이트](/ko/tutorials/jetson-agx-orin/flashing-and-updates)) 후 검증: 부팅, 스토리지, 네트워킹, 그리고 Force Recovery가 여전히 동작하는지.
4. **주변 기기 복원:** Wi-Fi, 카메라, CAN 또는 필드버스 드라이버 — 커널 6.8용으로 다시 빌드한 것.
5. **타깃에서** CUDA 애플리케이션, TensorRT 플러그인, TensorRT 엔진을 **다시 빌드**하십시오.
6. **먼저 원래 전력 모드에서 애플리케이션을 검증**하고, 그다음에야 다른 성능 모드를 시도하십시오.
7. **기준값 기록:** 메모리 사용량, 발열, 전력 소비, 지연 시간, 처리량 — 프로덕션으로 전환하기 전에.

## 롤백

- 지우기 전에 현재 시스템의 **정상 동작이 확인된 사본**을 보관하십시오(여분의 NVMe/eMMC 이미지, 최소한 2단계의 데이터라도).
- ISO 설치 프로그램은 설치 미디어를 보유한 모든 L4T 버전을 설치할 수 있습니다 — 되돌아갈 필요가 있을 수 있다면 구형 설치 프로그램 USB를 보관하십시오.
- 플릿의 경우: 롤아웃을 단계적으로 진행하고, 제자리 업그레이드보다 독립적인 복구 경로(복구 USB + 백업 이미지)를 갖춘 설계를 선호하십시오.

## 참고 자료

- [Jetson Linux 39.2.0 릴리스 노트(PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — *새로운 기능*, 알려진 문제(2026-09-23 확인)
- [JetPack SDK 다운로드](https://developer.nvidia.com/embedded/jetpack/downloads) (2026-09-23 확인) — ⚠️ 구성 요소 표가 일부 행에서 뒤처져 있습니다; 7.2.1 시스템이 실제로 설치하는 버전은 [시스템 검증](/ko/tutorials/jetson-agx-orin/verify-your-system)을 참조하십시오
- [Seeed Studio JetPack 7.2 리소스 허브](https://wiki.seeedstudio.com/jetpack_7_2_resource_hub/) — 보조 자료; 마이그레이션 주제 구성에 사용(2026-09-23 확인)

*상태: 초안, cheny 검토 대기 중. 기재된 날짜 기준 NVIDIA 공식 문서에 근거하며, 아직 Juxi Technology가 실제 하드웨어에서 검증하지 않았습니다. 재빌드 목록은 일반적인 플랫폼 결과(커널/TensorRT/CUDA 버전 변경)를 설명한 것입니다 — 자체 스택과 대조해 검증하십시오.*

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 이 페이지는 Juxi Technology가 게시하며 NVIDIA의 공식 발행물이 아닙니다.
