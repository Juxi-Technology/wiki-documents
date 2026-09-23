---
title: JetPack 7.2에서의 로보틱스 — 현재 작동하는 것
sidebar_label: 로보틱스(현황)
slug: /tutorials/robotics
description: >-
  JetPack 7.2를 사용하는 AGX Orin 개발자 키트에서의 로보틱스 개발을 위한
  솔직한 현황 페이지 — ROS 2, Isaac ROS 제공 여부, 로봇 학습 스택, 그리고
  생태계가 따라잡을 때까지 무엇을 사용할지 다룹니다.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-24
review_owner: cheny
---

# JetPack 7.2에서의 로보틱스 — 현재 작동하는 것

JetPack 7.2는 Orin을 새로운 플랫폼 세대(Ubuntu 24.04, 커널 6.8, CUDA 13)로
이끌었습니다. 로보틱스는 *생태계*가 아직 플랫폼을 따라잡지 못한 유일한
영역입니다 — 그래서 이 페이지는 의도적으로 튜토리얼이 아닌 현황 페이지입니다.
아키텍처를 확정하기 전에 확인하십시오.

## 현황 표(2026-09-24 확인)

| 필요한 항목 | JetPack 7.2 / AGX Orin에서의 상태 | 비고 |
|---|---|---|
| **ROS 2(코어)** | ✅ 작동 | Ubuntu 24.04는 ROS 2 **Jazzy**의 대상 플랫폼입니다. [ROS 2 설치 문서](https://docs.ros.org/en/jazzy/Installation.html)에 따라 설치하십시오. Docker 기반 ROS 2도 선택지입니다. |
| **Isaac ROS**(하드웨어 가속 ROS 2 패키지) | ⛔ **아직 미지원 — NVIDIA는 JetPack 7용으로 "출시 예정"이라고 표기** | 이것이 가장 큰 공백입니다. 오늘 Isaac ROS가 핵심 경로에 있다면 **JetPack 6.x**에 머무르면서 릴리스가 나오는지 NVIDIA의 [다운로드 페이지](https://developer.nvidia.com/embedded/jetpack/downloads)를 지켜보십시오. |
| **로컬 LLM / VLM / VLA 모델** | ✅ 작동 | TensorRT Edge-LLM은 JP7.2에서 Orin을 공식 지원하며 **비전-언어-액션** 예제도 포함합니다 — [로컬 LLM 추론](/ko/tutorials/jetson-agx-orin/local-llm) 참조. |
| **다중 카메라 비디오 파이프라인** | ✅ 작동 | DeepStream 9.1이 JP7.2에 포함되어 있습니다 — [DeepStream 비디오 분석](/ko/tutorials/jetson-agx-orin/deepstream) 참조. |
| **에이전틱 동작 / 오케스트레이션** | ✅ 작동 | NemoClaw + Jetson 에이전트 스킬 — [에이전틱 AI](/ko/tutorials/jetson-agx-orin/agentic-ai) 참조. |
| **로봇 학습 스택(LeRobot 스타일 Python 프레임워크)** | ⚠️ 확정 전 검증 필요 | 이러한 스택은 Python 비중이 높습니다. Ubuntu 24.04는 Python 3.12로 전환했고 일부 의존성은 뒤처질 수 있습니다. 이를 전제로 설계하기 전에 JP7.2에서 해당 스택을 테스트하십시오 — 그리고 **당사가 이를 하드웨어에서 검증하지 않았음**을 유의하십시오. |
| **GR00T(휴머노이드 파운데이션 모델)** | ⚠️ 공식 소스 확인 | 플랫폼 지원 여부는 NVIDIA 공식 Isaac GR00T 저장소와 발표를 따르십시오. 파트너가 게시한 워크스루에서는 AGX Orin + JP7.2에서 전체 가중치 TensorRT 배포를 보고합니다 *(제3자 정보, 당사 미검증)*. |
| **커스텀 캐리어 보드 / BSP 작업** | ✅ 새 도구 | JetPack 7.2의 **Jetson Linux 커스터마이징 에이전트 스킬**은 BSP 브링업 작업을 자동화합니다 — [에이전트 스킬 저장소](https://github.com/jetson-bsp-skills) 참조. |

## 권장 사항

- **Isaac ROS 의존성이 없는 신규 프로젝트:** JetPack 7.2 기반으로 구축하십시오 —
  Ubuntu 24.04 LTS 지원, CUDA 13, DeepStream 9.1, 온디바이스 LLM, 에이전트
  도구를 사용할 수 있습니다.
- **오늘 Isaac ROS에 의존하는 프로젝트:** 당분간 JetPack 6.x를 계획하십시오.
  Isaac ROS가 출시되면 JP7.x를 마이그레이션 대상으로 삼으십시오(그때가 되면
  당사의 [마이그레이션 가이드](/ko/tutorials/jetson-agx-orin/jetpack-6-to-7)가
  재빌드 작업을 다룹니다).
- **하나의 키트, 여러 모듈:** 개발자 키트는 재플래싱으로 다른 Jetson Orin
  모듈을 에뮬레이션할 수 있습니다 — 양산 부품을 선택하기 전에 모듈 라인업
  전반에서 로봇 워크로드를 검증할 때 유용합니다
  ([제품 개요](/ko/tutorials/jetson-agx-orin/overview)).

## 출처

- [JetPack 7.2.1 다운로드 페이지 — JetPack 7용 Isaac ROS "출시 예정"](https://developer.nvidia.com/embedded/jetpack/downloads) (2026-09-24 확인)
- [Jetson AGX Orin Developer Kit 사용자 가이드 — 소개](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (모듈 에뮬레이션; 2026-09-24 확인)
- [ROS 2 Jazzy 설치 문서](https://docs.ros.org/en/jazzy/Installation.html)

*상태: 초안, cheny 검토 대기 중. 생태계 가용성은 빠르게 변합니다 — 이 표에
의존하기 전에 링크된 NVIDIA 페이지를 다시 확인하십시오. 아직 Juxi Technology가
실제 하드웨어에서 검증하지 않았습니다.*

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 본 페이지는 Juxi
Technology가 게시한 것으로, NVIDIA의 공식 발행물이 아닙니다.
