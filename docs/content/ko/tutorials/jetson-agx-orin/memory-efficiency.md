---
title: 메모리 효율 — 64GB에서 더 큰 워크로드 실행
sidebar_label: 메모리 효율
slug: /tutorials/memory-efficiency
description: >-
  AGX Orin 개발자 키트에서 메모리 사용을 줄이기 위해 문서화된 수단 — 플랫폼
  수준의 에이전트 스킬, TensorRT Edge-LLM의 모델 수준 최적화, 그리고 결과를
  측정하는 방법.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2
    checked: 2026-09-24
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/
    checked: 2026-09-24
review_owner: cheny
---

# 메모리 효율 — 64GB에서 더 큰 워크로드 실행

엣지 디바이스에서 어떤 모델을 실행할 수 있는지를 제한하는 것은 보통 연산
능력이 아니라 메모리입니다. JetPack 7.2는 메모리 효율을 대표 주제로 내걸고
출시되었으며, 문서화된 세 가지 최적화 계층이 있습니다: **플랫폼**, **모델**,
그리고 **측정**입니다. 이 페이지는 각 수단을 정리한 것이며, 모든 항목은
권위 있는 출처로 연결됩니다.

## 수단 1 — 플랫폼 수준(NVIDIA 에이전트 스킬)

NVIDIA에 따르면, JetPack 7.2의 **메모리 최적화 에이전트 스킬**은 AI
에이전트가 스택 전반의 메모리 소비를 감사하고 줄여 나가도록 안내합니다:

- **부트로더 메모리 카브아웃** — Linux가 시작되기 전에 예약된 메모리를 회수
- **커널 메모리 예약** — 커널이 확보해 두는 메모리를 조정
- **사용자 공간 오버헤드** — 중복된 프로세스와 서비스를 찾아 제거

NVIDIA가 제시하는 목표는 다음과 같습니다: 더 강력한 워크로드를 더 작은
메모리 풋프린트에 담는 것(이것이 동일한 하드웨어가 소프트웨어 릴리스가
거듭될수록 계속 더 유용해지는 방식입니다). 여기서 시작하십시오:

- [Jetson device-side skills](https://github.com/jetson-device-skills) · [Jetson BSP skills](https://github.com/jetson-bsp-skills)
- 배경 자료: [NVIDIA의 JetPack 7.2 메모리 효율 블로그](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2)

> **주의:** 카브아웃 및 예약 변경은 부팅 동작에 영향을 줍니다. 변경은 한 번에
> 하나씩 적용하고, 복구 경로를 마련해 두며( [플래싱 및 업데이트](/ko/tutorials/jetson-agx-orin/flashing-and-updates) 참조),
> 프로덕션으로 전환하기 전에 다시 검증하십시오.

## 수단 2 — 모델 수준(TensorRT Edge-LLM 기능)

LLM/VLM 워크로드에서 메모리를 가장 많이 소비하는 것은 가중치와 KV
캐시입니다. TensorRT Edge-LLM은 이러한 수단들을 문서화하고 있습니다(Jetson
Orin은 FP16/INT8/INT4 엔진을 실행합니다 — [로컬 LLM 추론](/ko/tutorials/jetson-agx-orin/local-llm) 참조):

| 수단 | 기능 | 문서 |
|---|---|---|
| **양자화**(Orin의 INT8/INT4) | 가중치 축소, 대역폭 절감 | [양자화 가이드](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/quantization.html) |
| **어휘 축소** | 출력 어휘/임베딩 테이블 축소 | [어휘 축소](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html) |
| **KV 캐시 재사용** | 관련 요청 간에 캐시를 재사용해 재계산을 피함 | [KV 캐시 재사용](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) |
| **DART 비주얼 토큰 프루닝** | VLM의 중복 이미지 토큰을 제거 | [DART 프루닝](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html) |

*(FP8 KV 캐시는 문서에 존재하지만 Thor용입니다. 공식 지원 매트릭스에 따르면
Orin은 FP16/INT8/INT4 엔진으로 제한됩니다.)*

## 수단 3 — 추측하지 말고 측정하십시오

- **시스템 뷰:** 실시간 CPU/GPU/메모리 확인에는 `tegrastats`(Jetson Linux 내장)를 사용합니다 — [시스템 확인](/ko/tutorials/jetson-agx-orin/verify-your-system) 참조.
- **모델 뷰:** TensorRT Edge-LLM에는 [메모리 모니터링 설계와 도구](https://nvidia.github.io/TensorRT-Edge-LLM/developer_guide/software-design/memory-monitoring.html)가 포함되어 있으며, [릴리스별 성능 벤치마크](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html)를 공개합니다.
- **방법:** 기준선(유휴 시와 부하 시의 메모리 사용량)을 기록하고, **하나의** 수단만 변경한 뒤 다시 측정하십시오. 공개할 수 있는 수치는 항상 자체 워크로드에서 나와야 합니다.

## 실무에서의 의미

- 64GB 모듈은 이미 30B급 모델을 실행합니다([로컬 LLM 추론](/ko/tutorials/jetson-agx-orin/local-llm)의 공개 수치 참조). 메모리 최적화는 그 위에 *더 많은 것*을 얹을 수 있게 해 줍니다 — 멀티 모델 파이프라인, 더 긴 컨텍스트, 상시 구동 에이전트([에이전트 AI](/ko/tutorials/jetson-agx-orin/agentic-ai)), 추론과 병행하는 영상 파이프라인([DeepStream](/ko/tutorials/jetson-agx-orin/deepstream)) 등입니다.
- 워크로드가 지금은 간신히 들어간다면 수단 2(모델 수준)부터 시작하십시오 — 위험이 가장 낮고 문서화가 가장 잘 되어 있습니다. 플랫폼 자체를 짜내야 할 때는 수단 1을 사용하십시오.

## 출처

- [NVIDIA 기술 블로그 — JetPack 7.2의 메모리 효율과 에이전트 스킬](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2) (2026-09-24 확인)
- [TensorRT Edge-LLM 문서](https://nvidia.github.io/TensorRT-Edge-LLM/) (기능과 지원 매트릭스, 2026-09-24 확인)

*상태: 2026-10-11 검토 완료. 기재된 날짜 기준 NVIDIA 공식 문서에 근거하며,
아직 Juxi Technology가 실제 하드웨어에서 검증하지 않았습니다.*

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 이 페이지는 Juxi
Technology가 게시하며 NVIDIA의 공식 발행물이 아닙니다.
