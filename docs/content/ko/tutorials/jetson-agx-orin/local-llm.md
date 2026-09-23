---
title: 로컬에서 LLM 실행 — JetPack 7.2에서의 TensorRT Edge-LLM
sidebar_label: 로컬 LLM 추론
slug: /tutorials/local-llm
description: >-
  AGX Orin 개발자 키트에서 NVIDIA TensorRT Edge-LLM으로 대규모 언어 모델과
  멀티모달 모델을 로컬 실행 — 지원 모델, Orin 제약, 워크플로, 예상 성능을
  다룹니다.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html
    checked: 2026-09-24
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/
    checked: 2026-09-24
  - source: https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2
    checked: 2026-09-24
review_owner: cheny
---

# 로컬에서 LLM 실행 — JetPack 7.2에서의 TensorRT Edge-LLM

AGX Orin 64GB는 대규모 언어 모델을 로컬에서 실행할 수 있습니다. 클라우드도,
네트워크도 필요하지 않습니다. NVIDIA가 이를 위해 제공하는 최적화 경로가
바로 **TensorRT Edge-LLM**이며, 이는 **JetPack 7.2에서 Jetson Orin을 공식
지원합니다**. 이 페이지는 방향을 잡아 드립니다. 키트로 할 수 있는 것과 할 수
없는 것, 워크플로의 형태, 예상 성능을 다룹니다. 권위 있는 단계별 안내는
NVIDIA 문서에 있습니다(본문 곳곳에 링크).

## 먼저 읽어보십시오 — Orin에 특화된 세 가지 사실

1. **Orin은 FP16, INT8, INT4 엔진만 실행합니다. FP8과 FP4는 Orin에서 지원되지
   않습니다** (Thor급 기능입니다). NVIDIA의 지원 매트릭스가 이를 명시하고
   있으니, 이에 맞게 양자화 방식을 계획하십시오.
2. **Orin 배포 경로에서는 엔진을 디바이스에서 직접 빌드합니다** (PC에서
   크로스 컴파일하지 않습니다).
3. **JetPack 7.2가 지원 소프트웨어 스택입니다** — CUDA 13.2와 플랫폼 TensorRT
   (이 릴리스에서는 10.16.2) 조합입니다. aarch64 wheel은 Jetson Orin(SM87)과
   Python 3.10–3.12를 대상으로 합니다.

*(출처: TensorRT Edge-LLM 공식 지원 매트릭스, 2026-09-24 확인.)*

## TensorRT Edge-LLM이 다루는 범위

NVIDIA 문서에 따르면, Edge-LLM은 엣지 플랫폼에서 **텍스트, 비전, 오디오,
음성, 액션 모델**에 최적화된 추론을 제공합니다:

| 기능 | 문서의 예시 |
|---|---|
| 텍스트 생성 | Qwen, Gemma, Nemotron을 비롯한 LLM 계열 |
| 멀티모달(VLM) | Phi-4 Multimodal 예시 |
| 음성 인식(ASR) | 전용 예시 워크플로 |
| 음성 생성(TTS) | 전용 예시 워크플로 |
| 비전-언어-액션 | VLA 예시(로보틱스) |
| Omni(오디오 + 비전 + 음성 I/O) | 전용 예시 워크플로 |

주요 기능: 양자화(Orin의 INT8/INT4), 추측 디코딩(EAGLE3, DFlash 등),
**KV 캐시 재사용**, **어휘 축소**, VLM용 **DART 비주얼 토큰 프루닝**,
스트리밍 출력, LoRA 지원.

## 워크플로(문서 기준)

TensorRT Edge-LLM 문서에는 두 가지 Quick Start 경로가 있습니다:

1. **ONNX + C++ 런타임** — checkpoint를 내보내기/양자화하고(일반적으로 x86 호스트에서), 디바이스로 전송한 뒤, 디바이스에서 엔진을 빌드하고 C++ 런타임을 실행합니다.
2. **한 줄 Python 서버** — 서빙 엔드포인트를 더 빠르게 확보하는 경로입니다.

여기서 시작하십시오: **[TensorRT Edge-LLM Quick Start](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html)**

Quick Start 외 추가 자료:

- [설치 옵션 →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html)(소스 C++ 런타임, 내보내기/양자화 워크플로, 실험적 로컬 wheel)
- [지원 모델 →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html)
- [양자화 가이드 →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/quantization.html) · [KV 캐시 재사용 →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) · [DART 프루닝 →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html)

> **Juxi 팁:** 내보내기/양자화 도구는 x86 Linux 호스트에서 가장 잘 동작합니다
> (문서의 x86 개발자 항목 기준). **엔진 빌드와 추론은 여러분의 키트에서
> 실행됩니다**. 모델 checkpoint용 디스크 공간을 확보해 두십시오. 모델당 수 GB가
> 일반적입니다.

## 서빙: OpenAI 호환 엔드포인트(그리고 Claude Code)

문서에는 OpenAI 호환 채팅 인터페이스를 제공하는 **실험적 Python API 및
서버**가 포함되어 있습니다. OpenAI 스타일 클라이언트용 예시는 물론
**"Anthropic과 Claude Code" 연동 예시**까지 문서화되어 있습니다(Claude Code를
Jetson에서 호스팅하는 엔드포인트로 연결하는 방법).

- [실험적 Python API 및 서버 →](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/examples/experimental-server.html)

## 예상 성능(AGX Orin 64GB)

NVIDIA는 64GB 모듈의 JetPack 7.2 기준으로 다음과 같은 tokens/sec 수치를
공개했습니다(2026년 6월, 전체 배경과 방법론은 출처 블로그 참조):

| 모델 | AGX Orin 64GB |
|---|---|
| Nemotron3 Nano 30B A3B | ~40 tok/s |
| Qwen 3.5 4B | ~28 tok/s |
| Qwen 3.5 9B | ~17 tok/s |
| Qwen 3.6 27B | ~7 tok/s |
| Gemma 4 E4B | ~32 tok/s |

실제 수치는 모델, 양자화, 컨텍스트 길이, 전원 모드에 따라 달라집니다. 이 값은
보장이 아니라 벤더가 공개한 참고치로 받아들이십시오.

## 더 간단한 대안

지금은 Edge-LLM의 내보내기/빌드 워크플로가 필요 이상으로 느껴진다면, NVIDIA의
[Jetson AI Lab](https://www.jetson-ai-lab.com)에서 다른 런타임(llama.cpp,
vLLM 등)을 위한 실습 튜토리얼을 공개하고 있습니다. 오래된 튜토리얼을 따라
하기 전에 JetPack 버전 관련 안내를 먼저 확인하십시오.

## 문제 해결

- **첫 실행이 느림:** 엔진 빌드는 첫 실행 시 몇 분 걸릴 수 있습니다. 이후 실행에서는 엔진을 재사용합니다(DeepStream도 동일한 동작입니다. [DeepStream 튜토리얼](/ko/tutorials/jetson-agx-orin/deepstream) 참조).
- **FP8/FP4 명령이 동작하지 않음:** 정상입니다. Orin은 FP16/INT8/INT4 엔진만 지원합니다.
- **버전이 잘못됨:** 먼저 JetPack 7.2.1인지 확인하십시오 — [시스템 확인](/ko/tutorials/jetson-agx-orin/verify-your-system).

## 출처

- [TensorRT Edge-LLM — 공식 지원 매트릭스](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html)(2026-09-24 확인)
- [TensorRT Edge-LLM 문서 홈](https://nvidia.github.io/TensorRT-Edge-LLM/)(v0.10.1, 2026-09-24 확인)
- [NVIDIA 기술 블로그 — Deploy Agentic-Ready AI at the Edge with Memory Efficiency in JetPack 7.2](https://developer.nvidia.com/blog/deploy-agentic-ready-ai-at-the-edge-with-memory-efficiency-in-nvidia-jetpack-7-2)(성능 수치, 2026-09-24 확인)

*상태: 초안, cheny의 검토 대기 중. 명시된 날짜 기준 NVIDIA 공식 문서에
근거하며, 아직 Juxi Technology가 실물 하드웨어에서 검증하지 않았습니다.*

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 이 페이지는 Juxi
Technology가 게시한 것이며, NVIDIA의 공식 발행물이 아닙니다.
