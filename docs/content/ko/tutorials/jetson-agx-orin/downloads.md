---
title: 다운로드 및 공식 링크
sidebar_label: 다운로드
slug: /downloads
description: >-
  Jetson AGX Orin 개발자 키트를 위한 공식 JetPack 7.2.1 / Jetson Linux 39.2.1
  리소스로의 직링크 — 이미지, 도구, 문서, 커뮤니티 리소스.
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-23
    note: component table lags on some rows (VPI/PVA still show 7.2 values) — see the caveat in the body
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: authoritative source for installed component versions
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-23
review_owner: cheny
---

# 다운로드 및 공식 링크

이 페이지의 모든 항목은 **NVIDIA 공식 리소스**로 연결되며, **2026-09-23**에 확인되었습니다(구성 요소 버전 관련 주의 사항은 2026-09-26에 추가되었습니다). 업데이트는 처음 두 링크를 정본 시작점으로 삼으십시오.

## JetPack 7.2.1 / Jetson Linux 39.2.1

- [JetPack SDK 다운로드 및 릴리스 노트](https://developer.nvidia.com/embedded/jetpack/downloads) — 릴리스 정보와 다운로드를 위한 **정본 허브**. ⚠️ **해당 페이지의 구성 요소 표는 행마다 갱신이 뒤처져 있습니다**: 2026-09-26 기준으로 VPI와 PVA에는 여전히 JetPack **7.2** 값이 실려 있고, Isaac ROS 행은 여전히 "출시 예정"으로 표기되어 있습니다(4.6.0부터 출시됨). JetPack 7.2.1 시스템이 실제로 설치하는 버전은 NVIDIA의 [Jetson apt 저장소](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages)에서 확인하십시오 — [시스템 검증](/ko/tutorials/jetson-agx-orin/verify-your-system)을 참조하십시오.
- [JetPack ISO 이미지(r39.2.1)](https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/iso) — 저희 [퀵 스타트](/ko/tutorials/jetson-agx-orin/quick-start)에서 사용하는 USB 설치 이미지
- [NVIDIA SDK Manager](https://developer.nvidia.com/sdk-manager) — 호스트 PC용 플래싱 도구
- [Jetson AGX Orin용 Yocto 이미지](https://developer.nvidia.com/downloads/embedded/l4t/r39_release_v2.1/yocto2) — 공식 Yocto/OpenEmbedded 레시피와 이미지
- [JetPack 아카이브](https://developer.nvidia.com/embedded/jetpack-archive) · [Jetson Linux 아카이브](https://developer.nvidia.com/embedded/jetson-linux-archive) — 이전 릴리스

## 문서

- [Jetson AGX Orin 개발자 키트 사용자 가이드](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) — 이 키트의 기본 참고 자료
  - [퀵 스타트](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) · [BSP 설치](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html) · [JetPack SDK 설정](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_jetpack.html) · [하드웨어 레이아웃](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html)
- [Jetson Linux 39.2.0 릴리스 노트(PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) — 새로운 기능과 **알려진 문제**
- [Jetson Linux 개발자 가이드](https://docs.nvidia.com/jetson/archives/DeveloperGuide) — 플래싱 지원, 보안, 카메라 개발, OTA
- [Jetson Linux API 레퍼런스](https://docs.nvidia.com/jetson/archives/ApiReference/index.html)
- [카메라 개발 가이드](https://docs.nvidia.com/jetson/archives/DeveloperGuide/SD/CameraDevelopment.html)
- 캐리어 보드 사양: *NVIDIA Jetson AGX Orin Developer Kit Carrier Board Specification* — NVIDIA [다운로드 페이지](https://developer.nvidia.com/embedded/downloads)에 게재됨

## 도구 및 계정

- [Balena Etcher](https://etcher.balena.io) — Jetson ISO를 USB 드라이브에 기록(Windows / macOS / Linux)
- [NVIDIA Developer Program](https://developer.nvidia.com/developer-program) — SDK Manager를 다운로드하려면 멤버십(무료)이 필요합니다
- [NVIDIA Jetson 개발자 포럼](https://forums.developer.nvidia.com/c/robotics-edge-computing/jetson-embedded-systems/70) — 공식 커뮤니티 지원

## 학습 및 에이전트 AI (JetPack 7)

- [Jetson AI Lab](https://www.jetson-ai-lab.com) — Jetson에서 AI 모델을 실행하기 위한 실습 튜토리얼
- [NVIDIA NemoClaw](https://www.nvidia.com/en-us/ai/nemoclaw) — Jetson의 에이전트 AI; JetPack 7.2부터 단일 명령 설치 지원
- [Jetson 디바이스 측 스킬](https://github.com/jetson-device-skills) · [Jetson BSP 스킬](https://github.com/jetson-bsp-skills) — NVIDIA가 제공하는 재사용 가능한 에이전트 스킬

## Juxi Technology

- **제품 카탈로그 및 액세서리:** <https://wiki.juxitech.com/products/> — 키트용 애드온(카메라, 로봇 암, 센서 등), 사양과 구매 링크 포함
- **연락처:** 기술 지원 — support@juxitech.com · 영업 — sales@juxitech.com · 제품 문의 — pe@juxitech.com
- Juxi의 시작하기 스크립트와 예제 코드는 준비되는 대로 여기에 추가됩니다.

## 출처

- [JetPack SDK 다운로드 및 릴리스 노트](https://developer.nvidia.com/embedded/jetpack/downloads)(2026-09-23 확인, 구성 요소 표 주의 사항 2026-09-26)
- [NVIDIA Jetson apt 저장소 — Packages 색인](https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages) — 설치된 구성 요소 버전의 권위 있는 출처(2026-09-26 확인)

*상태: 2026-10-11 검토 완료.*

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 이 페이지는 Juxi
Technology가 게시한 것이며, NVIDIA의 공식 발행물이 아닙니다.
