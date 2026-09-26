---
title: 변경 이력
sidebar_label: 변경 이력
slug: /appendix/changelog
description: >-
  이 문서 세트의 업데이트 내역과 Jetson AGX Orin 개발자 키트의 JetPack 릴리스
  이력입니다.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-24
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://repo.download.nvidia.com/jetson/common/dists/r39.2/main/binary-arm64/Packages
    checked: 2026-09-26
    note: source for the CUDA 13.2.2 / VPI 4.1.4 correction
review_owner: cheny
---

# 변경 이력

## 문서 업데이트

| 날짜 | 변경 내용 |
|---|---|
| 2026-09-26 | **JetPack 7.2.1의 구성 요소 버전 두 개를 정정했습니다: CUDA 13.2.1 → 13.2.2, VPI 4.1.3 → 4.1.4.** 두 버전 모두 NVIDIA JetPack 다운로드 페이지에서 가져온 값이었는데, 해당 요약 표에는 아직 JetPack **7.2** 값이 실려 있습니다. 버전은 NVIDIA Jetson apt 저장소의 `nvidia-jetpack` 7.2.1 의존성 체인을 통해 확인했습니다. **시스템 검증**(표 출처 주석), **용어집**, **FAQ**, **JetPack 6.x → 7.2 마이그레이션 가이드**, 제품 페이지를 업데이트했습니다. 또한 해당 페이지가 구성 요소 버전 출처로 인용되는 모든 곳(**다운로드**, **용어집**, **DeepStream**, **마이그레이션 가이드**)에 "이 표는 뒤처져 있습니다"라는 주의 문구를 추가했습니다. |
| 2026-09-26 | **JetPack 7.2에서의 Isaac ROS 상태를 정정했습니다.** Isaac ROS 4.6.0(2026-08-18)이 Jetson Orin + JetPack 7.2 지원을 추가하여, 이전에 JetPack 다운로드 페이지에서 가져온 "출시 예정" 상태를 대체했습니다(해당 페이지에는 아직 그대로 표시되어 있습니다). **로보틱스**(새 버전 및 ROS 2 배포판 안내), **시스템 검증**, **JetPack 6.x → 7.2 마이그레이션 가이드**, **FAQ**를 업데이트했습니다. |
| 2026-09-24 | **용어집(Glossary)**과 이 **변경 이력(Changelog)**을 추가했습니다. FAQ, 문제 해결, 다운로드에 Juxi Technology 연락처 정보(기술 지원, 영업, 제품 문의)를 추가하고, 액세서리용 Juxi 제품 카탈로그를 링크했습니다. |
| 2026-09-23 | 최초 문서 세트를 초안으로 게시: 빠른 시작, 플래싱 및 업데이트, 시스템 검증, 제품 개요, 인터페이스 및 하드웨어 레이아웃, FAQ, 문제 해결, 다운로드, 그리고 JetPack 6.x → 7.2 마이그레이션 가이드. 모든 페이지는 NVIDIA 공식 문서를 기준으로 작성했습니다. |

## 이 키트의 JetPack 릴리스

| JetPack | Jetson Linux (L4T) | 날짜 | 비고 |
|---|---|---|---|
| **7.2.1** | **39.2.1** | 2026-08 | **현재 버전.** 수정 및 보안 업데이트, T3000 에뮬레이션, 영상 파이프라인용 에이전트 스킬. |
| 7.2 | 39.2.0 | 2026-06 | Jetson Orin 제품군을 JetPack 7에 포함한 첫 릴리스(Ubuntu 24.04, 커널 6.8, CUDA 13). |
| 6.x | 36.x | 2024–2025 | 이전 세대(Ubuntu 22.04, 커널 5.15, CUDA 12) — 아직 이 버전을 사용 중이라면 아카이브를 참조하고, 저희 [마이그레이션 가이드](/ko/tutorials/jetson-agx-orin/jetpack-6-to-7)를 참조하십시오. |

전체 이력: [JetPack 아카이브](https://developer.nvidia.com/embedded/jetpack-archive) · [Jetson Linux 아카이브](https://developer.nvidia.com/embedded/jetson-linux-archive)

키트를 업데이트하려면 **[플래싱 및 업데이트](/ko/tutorials/jetson-agx-orin/flashing-and-updates)**를 참조하고,
현재 실행 중인 버전을 확인하려면 **[시스템 검증](/ko/tutorials/jetson-agx-orin/verify-your-system)**을 참조하십시오.

## 출처

- [JetPack SDK 다운로드](https://developer.nvidia.com/embedded/jetpack/downloads) (2026-09-24 확인)
- [Jetson Linux 39.2.0 릴리스 노트(PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) (2026-09-24 확인)

*상태: 초안, cheny의 검토 대기 중.*

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 이 페이지는 Juxi
Technology가 게시하며 NVIDIA의 공식 발행물이 아닙니다.
