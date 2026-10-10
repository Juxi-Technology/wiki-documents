---
title: 변경 이력
sidebar_label: 변경 이력
slug: /appendix/changelog
description: >-
  이 문서 세트의 업데이트 내역과 NVIDIA Jetson Orin Nano Super 개발자
  키트의 JetPack 릴리스 이력입니다.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
review_owner: cheny
---

# 변경 이력

## 문서 업데이트

| 날짜 | 변경 내용 |
|---|---|
| 2026-09-26 | 최초 문서 세트를 초안으로 게시: 빠른 시작, 플래싱 및 업데이트, 시스템 검증, 제품 개요, 인터페이스 및 하드웨어 레이아웃, FAQ, 문제 해결, 다운로드, JetPack 6.x → 7.2 마이그레이션 가이드, 다섯 개의 튜토리얼(로컬 LLM, 메모리 효율, DeepStream, 로보틱스, 에이전틱 AI), 용어집, 그리고 이 변경 이력입니다. JetPack 7.2.1용 NVIDIA 공식 문서를 기준으로 작성했으며, 아직 실제 하드웨어에서 검증하지 않았습니다. |

## 이 키트의 JetPack 릴리스

| JetPack | Jetson Linux (L4T) | 날짜 | 비고 |
|---|---|---|---|
| **7.2.1** | **39.2.1** | 2026-08 | **현재 버전.** ISO가 이제 Orin Nano 개발자 키트를 기본적으로 Super Mode 구성으로 플래싱하여, ISO로 업데이트한 장치가 이전 전력 프로파일을 유지하던 r39.2 문제를 해결합니다. |
| 7.2 | 39.2.0 | 2026-06 | Orin 제품군을 위한 첫 JetPack 7 릴리스(Ubuntu 24.04, 커널 6.8, CUDA 13.x). 이 릴리스의 알려진 문제: Jetson ISO로 업데이트한 장치는 기본적으로 Super 모드가 되지 않았습니다 — [문제 해결](/ko/tutorials/jetson-orin-nano/troubleshooting)을 참조하십시오. |
| 6.2.x | 36.x | 2025 | 이 키트를 위한 JetPack 6 라인(Ubuntu 22.04). "Super" 전원 모드가 도입된 곳입니다 — 동일한 하드웨어에 더 높은 CPU/GPU/메모리 클록과 25 W 모드를 제공합니다. |
| 6.0 / 6.1 | 36.x | 2024–2025 | 이전 JetPack 6 릴리스입니다. |
| 5.1.3 | 35.x | 2023–2024 | 오늘날에도 여전히 참조되는 가장 오래된 펌웨어 라인: JetPack 6.x 업데이트 경로는 5.1.3 브리지 이미지를 사용해 아주 오래된 키트를 JetPack 6.x 세대 펌웨어로 끌어올린 뒤에야 JetPack 7을 설치할 수 있습니다. |

전체 이력: [JetPack 아카이브](https://developer.nvidia.com/embedded/jetpack-archive) · [Jetson Linux 아카이브](https://developer.nvidia.com/embedded/jetson-linux-archive)

키트를 업데이트하려면 **[플래싱 및 업데이트](/ko/tutorials/jetson-orin-nano/flashing-and-updates)**를 참조하고,
현재 실행 중인 버전을 확인하려면 **[시스템 검증](/ko/tutorials/jetson-orin-nano/verify-your-system)**을 참조하십시오.

## 출처

- [JetPack SDK 다운로드](https://developer.nvidia.com/embedded/jetpack/downloads) (2026-09-26 확인)
- [Jetson Linux 39.2.1 릴리스 노트(PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (2026-09-26 확인)
- [NVIDIA JetPack 6.2 발표 — Jetson Orin Nano용 Super 모드](https://developer.nvidia.com/blog/nvidia-jetpack-6-2-brings-super-mode-to-nvidia-jetson-orin-nano-and-jetson-orin-nx-modules/) (Super 전원 모드의 벤더 발표로 링크됨)

*상태: 2026-10-11 검토 완료. 기재된 날짜 기준 NVIDIA 공식 문서에 근거하며, 아직 Juxi Technology가 실제 하드웨어에서 검증하지 않았습니다.*

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 이 페이지는 Juxi Technology가 게시하며 NVIDIA의 공식 발행물이 아닙니다.
