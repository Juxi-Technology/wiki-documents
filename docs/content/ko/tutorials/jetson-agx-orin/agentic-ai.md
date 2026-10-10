---
title: 에이전트 AI — JetPack 7.2에서의 NemoClaw
sidebar_label: 에이전트 AI (NemoClaw)
slug: /tutorials/agentic-ai
description: >-
  AGX Orin 개발자 키트에 NVIDIA NemoClaw 배포 — 단일 명령 설치,
  Jetson 에이전트 스킬, 상시 가동 에이전트를 위한 실전 참고 사항.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2
    checked: 2026-09-24
  - source: https://www.nvidia.com/en-us/ai/nemoclaw
    checked: 2026-09-24
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
review_owner: cheny
---

# 에이전트 AI — JetPack 7.2에서의 NemoClaw

JetPack 7.2는 키트를 **에이전트 레디**로 만들어 줍니다. NVIDIA NemoClaw가 단일 명령으로 설치되고, NVIDIA의 에이전트 스킬이 그동안 수동으로 처리해야 했던 플랫폼 작업의 상당 부분을 자동화합니다.

## NemoClaw란

NVIDIA에 따르면 NemoClaw는 **자율 에이전트** — 추론하고 계획하고 행동하는 상시 가동 AI 시스템 — 를 구축하기 위한 오픈 스택/블루프린트 모음입니다. OpenClaw 에이전트 생태계에 개인정보 보호 및 보안 제어(**OpenShell** 런타임 정책 제어를 통해)를 추가하고, Nemotron 모델과 NeMo 등 NVIDIA 구성 요소를 패키징합니다. JetPack 7.2에는 **필요한 종속성이 미리 구성되어** 있으므로 키트에서 수동 환경 설정이 필요하지 않습니다.

- NemoClaw 제품 페이지: <https://www.nvidia.com/en-us/ai/nemoclaw>
- GitHub의 NemoClaw: <https://github.com/NemoClaw> · 커뮤니티 예제: <https://github.com/nemoclaw-community>

## 설치(단일 명령, 공식)

키트(JetPack 7.2 이상)에서 다음을 실행합니다:

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash
```

> **보안 주의 — 실행 전에 읽어 보십시오:** 상시 가동 에이전트 프레임워크를 설치하는 명령입니다. 활성화하기 *전에* 에이전트가 접근할 수 있는 대상과 사용할 수 있는 자격 증명을 검토하고, 범위가 한정된 폐기 가능한 토큰을 우선 사용하며, OpenShell의 정책 제어를 활용하십시오. 회수할 수 없는 권한을 가진 에이전트를 무인으로 방치하지 마십시오.

## 설치 후 — 다음 단계

NVIDIA는 설치 안내, 클라우드 체험판, 학습 자료를 제공하는 **Build-a-Claw 리소스 허브**를 운영합니다: <https://www.nvidia.com/en-us/ai/build-a-claw>

함께 보면 좋은 자료:

- NVIDIA Deep Learning Institute 과정: *Securing Agents With NemoClaw and OpenShell*(리소스 허브 참조)
- NVIDIA Developer Discord — `#nemoclaw` 채널
- 서드파티 안내 자료(예: Jetson Thor 로봇 암용으로 작성된 [Seeed Studio의 NemoClaw 가이드](https://wiki.seeedstudio.com/control_rebot_arm_with_nemoclaw_on_nvidia_jetson_thor_bk/))에서는 `nemoclaw onboard`와 같은 설치 후 절차를 설명합니다 — 이는 커뮤니티 안내로 취급하고, 공식적인 절차는 NVIDIA의 허브를 따르십시오.

## Jetson 에이전트 스킬 — 플랫폼 작업 자동화

JetPack 7.2에는 **에이전트 스킬**이 포함되어 있습니다. Jetson 개발을 위한 반복 가능하고 에이전트가 실행할 수 있는 워크플로입니다. NVIDIA에 따르면 세 가지 범주가 있습니다:

| 스킬 범주 | 자동화하는 작업 |
|---|---|
| **Jetson Linux 커스터마이징** | 커스텀 캐리어 보드용 BSP 빌드/커스터마이징 — I/O 구성, 클록, 팬 제어, 전원 프로파일 |
| **메모리 최적화** | 부트로더 카브아웃, 커널 예약 영역, 사용자 공간 메모리를 감사하여 더 적은 메모리로 더 강력한 워크로드를 실행할 수 있게 합니다 |
| **모델 벤치마킹** | 기기에 가장 적합한 모델 구성과 진단 정보 찾기 |

생태계의 다른 에이전트 스킬:

- [Jetson 디바이스 측 스킬](https://github.com/jetson-device-skills) · [Jetson BSP 스킬](https://github.com/jetson-bsp-skills)
- [DeepStream Coding Agent](https://github.com/DeepStream_Coding_Agent) — 에이전트 보조 비전 파이프라인 구축([저희 DeepStream 튜토리얼](/ko/tutorials/jetson-agx-orin/deepstream) 참조)
- [Metropolis VSS 블루프린트 스킬](https://github.com/NVIDIA-AI-Blueprints/video-search-and-summarization/tree/main/skills) — 영상 검색 및 요약 워크플로

## AGX Orin 키트를 위한 실전 참고 사항

- **상시 가동 에이전트에는 전용 연산 자원이 필요합니다** — 잠자기 상태에 들어가는 노트북이 아니라 키트에서 실행하는 이유가 바로 여기에 있습니다. 이에 맞춰 전원과 발열을 계획하십시오([문제 해결](/ko/tutorials/jetson-agx-orin/troubleshooting)의 전원 모드 관련 설명 참조).
- **메모리 측면에서 모델 선택이 중요합니다** — Orin의 로컬 모델은 64GB 안에서 여유롭게 실행되지만, 상시 가동 에이전트는 컨텍스트를 누적합니다. 조정 수단은 [메모리 효율](/ko/tutorials/jetson-agx-orin/memory-efficiency), 온디바이스 모델 성능은 [로컬 LLM 추론](/ko/tutorials/jetson-agx-orin/local-llm)을 참조하십시오.
- **이 분야는 변화가 빠릅니다.** 위 명령은 현재의 공식 경로로 취급하고, 배포를 스크립트로 작성하기 전에 리소스 허브에서 업데이트를 확인하십시오.

## 출처

- [NVIDIA 기술 블로그 — JetPack 7.2 에이전트 AI(설치 명령, 에이전트 스킬, 릴리스 기능)](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2) (2026-09-24 확인)
- [NVIDIA NemoClaw 제품 페이지](https://www.nvidia.com/en-us/ai/nemoclaw) (2026-09-24 확인)
- [JetPack 7.2.1 다운로드 페이지](https://developer.nvidia.com/embedded/jetpack/downloads) (2026-09-24 확인)

*상태: 2026-10-11 검토 완료. 기재된 날짜 기준 NVIDIA 공식 문서에 근거하며, 아직 Juxi Technology가 실제 하드웨어에서 검증하지 않았습니다.*

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 이 페이지는 Juxi Technology가 게시하며 NVIDIA의 공식 발행물이 아닙니다.
