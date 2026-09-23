---
title: 제품 개요 — Jetson AGX Orin 개발자 키트
sidebar_label: 제품 개요
slug: /product/overview
description: >-
  NVIDIA Jetson AGX Orin 개발자 키트(64GB)가 무엇이고 무엇에 사용되는지, 그리고
  Jetson Orin 라인업에서 어떤 위치에 있는지 설명합니다.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
todo: add full module specification table from NVIDIA's official data sheet
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-23
  - source: https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/
    checked: 2026-09-23
review_owner: cheny
---

# 제품 개요

![Jetson AGX Orin 개발자 키트](/images/jetson-agx-orin/jaodk_1024px.png)

NVIDIA® Jetson AGX Orin™ 개발자 키트는 Jetson Orin 제품군의 플래그십 개발자 키트입니다.
엣지에서 로보틱스, 컴퓨터 비전, 생성형 AI 애플리케이션을 개발하고 프로토타이핑하기 위한 소형
AI 컴퓨터입니다. 본 가이드는 **64GB** 개발자 키트를 다룹니다.

## 주요 사실(NVIDIA 공식 문서로 확인)

- 개발자 키트는 **모든 Jetson Orin 모듈과 동일한 SoC 아키텍처를 공유**하므로, 다시 플래싱하는
  것만으로 AGX Orin, Orin NX, Orin Nano 모듈의 **성능과 전력을 에뮬레이션**할 수 있습니다.
  출하 시 기본값은 **Jetson AGX Orin 시리즈**로 설정되어 있습니다. *(Developer Kit User Guide)*
- NVIDIA는 AGX Orin 모듈 제품군의 AI 성능을 **최대 275 TOPS**로 표기하며, 전력은
  **15W~60W** 사이에서 설정할 수 있습니다. *(NVIDIA 제품 페이지)*
- 64GB 모듈의 GPU는 **64 Tensor 코어를 갖춘 2048코어 NVIDIA Ampere 아키텍처 GPU**입니다.
  *(NVIDIA 제품 페이지, 비교표)*
- 함께 제공되는 레퍼런스 캐리어 보드는 DisplayPort, 10GBASE-T 이더넷, USB 3.2,
  M.2(NVMe 및 Wi-Fi), 40핀 헤더, PCIe, 카메라 커넥터 등 표준 인터페이스를 제공합니다.
  자세한 내용은 **[인터페이스 및 하드웨어 레이아웃](/ko/tutorials/jetson-agx-orin/interfaces)**을 참조하십시오.

## 개발자 키트의 용도

- **개발 및 프로토타이핑** — 이 키트는 최종적으로 프로덕션 환경에서 Jetson Orin 모듈로
  실행될 애플리케이션을 위한 레퍼런스 플랫폼입니다.
- **성능과 전력 탐색** — 다른 Orin 모듈을 에뮬레이션할 수 있으므로, 양산 부품을 확정하기
  전에 키트 한 대로 모듈 라인업 전반에 걸쳐 워크로드를 테스트할 수 있습니다.
- **엣지 AI 워크로드** — 컴퓨터 비전, 로보틱스, 로컬 생성형 AI(확장 중인 튜토리얼 섹션을
  참고하십시오).

> **Juxi 참고:** 양산 제품은 자체 제작 또는 파트너사의 캐리어 보드에 장착된 Jetson Orin
> *모듈*(64GB / 32GB / 산업용 버전)을 기반으로 제작됩니다. 개발자 키트는 개발용 수단이며,
> 양산 부품이 아닙니다.

## 구성품

Jetson AGX Orin 모듈과 레퍼런스 캐리어 보드, Wi-Fi 모듈, USB Type-C 전원 어댑터,
USB Type-C to USB Type-A 케이블이 포함되어 있습니다. 직접 준비해야 하는 항목은
**[빠른 시작](/ko/tutorials/jetson-agx-orin/quick-start)**을 참조하십시오.

## 다음 단계

- **[빠른 시작](/ko/tutorials/jetson-agx-orin/quick-start)** — 개봉부터 JetPack 7.2.1이 동작하는 시스템 구축까지
- **[인터페이스 및 하드웨어 레이아웃](/ko/tutorials/jetson-agx-orin/interfaces)** — 모든 포트와 커넥터
- **[다운로드](/ko/tutorials/jetson-agx-orin/downloads)** — 공식 이미지, 도구, 문서 링크 *(페이지 준비 중)*

## 출처

- [Jetson AGX Orin Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html) (2026-09-23 확인)
- [NVIDIA Jetson Orin 제품 페이지](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/) (2026-09-23 확인)

*상태: 초안, cheny의 검토 대기 중. 전체 모듈 사양 표는 NVIDIA 공식 데이터시트에서 추가될
예정입니다. 그때까지는 NVIDIA 제품 페이지를 사양에 관한 권위 있는 출처로 간주하십시오.*

**이미지 출처:** 제품 이미지는 NVIDIA 공식 *Jetson AGX Orin Developer Kit User Guide*에서
가져왔으며(2026-09-23 다운로드), © NVIDIA Corporation.

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 본 페이지는 Juxi Technology가 게시한
것으로, NVIDIA의 공식 출판물이 아닙니다.
