---
title: 로컬에서 LLM 실행 — 8 GB Orin Nano에서의 TensorRT Edge-LLM
sidebar_label: 로컬 LLM 추론
slug: /tutorials/local-llm
description: >-
  8 GB Jetson Orin Nano에서 대규모 언어 모델을 로컬 실행 — TensorRT Edge-LLM
  지원, 정밀도 제한, 무엇이 들어가는지, 그리고 공식 수치를 다룹니다.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/llms-full.txt
    checked: 2026-09-26
  - source: https://github.com/dusty-nv/jetson-containers
    checked: 2026-09-26
  - source: https://pypi.jetson-ai-lab.io/sbsa/cu130
    checked: 2026-09-26
review_owner: cheny
---

# 로컬에서 LLM 실행 — 8 GB Orin Nano에서의 TensorRT Edge-LLM

Jetson Orin Nano Super 개발자 키트(8 GB)는 언어 모델을 로컬에서 실행할 수
있습니다. NVIDIA가 이를 위해 제공하는 최적화 경로가 **TensorRT Edge-LLM**이며,
**JetPack 7.2 라인에서 Jetson Orin을 공식 지원합니다**. 이 페이지는 8 GB에
무엇이 들어가는지와 오늘 어떤 런타임이 동작하는지를 다룹니다. 지침은 아래에
링크된 NVIDIA 문서에 있습니다.

## 먼저 읽어보십시오 — 이 키트의 네 가지 제약

1. **Orin은 FP16, INT8, INT4 엔진만 실행합니다. FP8과 FP4 엔진은 이
   디바이스에서 실행되지 않습니다** — Thor/Blackwell급 기능입니다("Jetson
   Orin does not run FP8 or FP4 model engines" — 지원 매트릭스).
2. **엔진은 C++ 런타임이 디바이스에서 직접 빌드합니다.** ONNX 내보내기와
   양자화는 x86-64 Linux 호스트에서 실행되며 Orin에서는 실행되지 않습니다.
   엔진은 SM 단위로 정확히 일치해야 합니다: Thor(SM110)에서 빌드한 엔진은
   Orin Nano(sm_87)에 로드되지 않습니다.
3. **지원 스택은 JetPack 7.2.1(L4T r39.2.1)입니다** — CUDA 13.2.2,
   TensorRT 10.16.2. Edge-LLM은 JetPack에 포함된 이 플랫폼 TensorRT를
   사용합니다.
4. **8 GB 통합 메모리는 OS 및 데스크톱과 공유됩니다.** 실제 사용 가능한
   용량은 약 7.6 GB입니다. 제약이 되는 것은 TOPS가 아니라 모델 크기이며,
   KV 캐시도 같은 메모리 안에 들어가야 합니다.

> **중요:** 이 키트에는 **INT4 AWQ** 또는 **INT4 GPTQ** checkpoint를
> 선택하십시오. FP8, MXFP8, FP4, NVFP4 checkpoint는 선택하지 마십시오. INT8
> GPTQ는 지원되지 않습니다.

## TensorRT Edge-LLM이 다루는 범위

TensorRT Edge-LLM은 엣지 플랫폼에서 LLM과 VLM을 위한 NVIDIA의 공식
런타임입니다. 지원 매트릭스는 JetPack 7.2에 대해 Jetson Orin을 "Official"로
기재하며, 엔진은 디바이스에서 빌드되고 정밀도는 FP16, INT8, INT4입니다.

- **모델 범위:** 지원 checkpoint에는 Llama 3.2 1B/3B, Llama 3.1 8B,
  Qwen2.5(0.5B–14B), Qwen3(0.6B–8B), 그리고 Qwen2.5-VL 3B/7B와
  InternVL3/3.5(1B–14B) 같은 VLM이 포함됩니다 — 30B 파라미터 미만의 dense
  checkpoint입니다. 이것은 검증 매트릭스가 아닙니다: "not every listed
  checkpoint has been fully verified on every supported platform and
  precision."
- **8 GB용 빌드 플래그:** Orin Nano에서 INT4 엔진을 빌드할 때는
  `--externalize-weights int4_ffn`(dense) 또는 `--externalize-weights
  int4_ffn int4_moe`(MoE)를 전달하여 엔진 빌드 메모리를 줄이십시오.
- **디스크 공간:** ONNX 파일과 엔진용으로 모델 워크플로당 ~20–50 GB를
  확보하십시오. 이 키트에는 내장 스토리지가 없습니다([빠른 시작](/ko/tutorials/jetson-orin-nano/quick-start)).
- **두 가지 Quick Start 경로:** C++ 경로(호스트에서 내보내기/양자화,
  디바이스에서 엔진 빌드, 실행)와 서버 경로 — `tensorrt-edgellm-serve
  Qwen/Qwen3.5-0.8B`(첫 실행 시 checkpoint를 다운로드)입니다.

> **Juxi 팁:** 권위 있는 단계는 NVIDIA의 문서에 있습니다 — [Quick Start](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html),
> [설치](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html),
> [지원 모델](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html).
> 0.10.1 설치 페이지에는 이렇게 명시되어 있습니다: "Wheels are not published or the
> default installation path in 0.10.1."

## 8 GB에 실제로 들어가는 것

- **NVIDIA가 이 모듈에서 벤치마크한 최대치는 2B 파라미터입니다.** Edge-LLM
  벤치마크 페이지에서 Orin Nano(8GB)의 가장 큰 행은 4,692 MB의 Qwen3.5-2B입니다:
  "2B is the largest model NVIDIA benchmarked on Orin Nano 8 GB."
- **벤더 워크스루에서는 4B 모델을 실행합니다.** Jetson AI Lab 튜토리얼은
  Qwen3-4B-Instruct INT4 AWQ(가중치 ~2 GB)가 "within Orin Nano's 8 GB unified
  memory"에 들어간다고 보고합니다. InternVL3 1B/2B도 INT4 AWQ로 들어가며, 더 큰
  변형은 AGX Orin 또는 Thor를 대상으로 합니다. (벤더 자료.)
- **NVIDIA 메모리 블로그가 제시하는 실용적 범위: LLM은 최대 ~10B, VLM은 최대
  ~4B 파라미터** — 4비트 양자화와 효율적인 런타임을 사용하는, 튜닝된 구성
  기준입니다.
- **파일 크기만으로는 적합성을 판단할 수 없습니다 — KV 캐시도 함께 들어가야
  합니다.** 커뮤니티 보고에 따르면 12B/26B급 GGUF 모델(gemma4:12b 7.4 GB,
  gemma4:26b 16 GB)이 8 GB 보드의 Ollama에서 실패합니다: `cudaMalloc failed: out of
  memory ... failed to allocate buffer for kv cache`. (미확인.)

## 이 키트의 공식 성능 수치

NVIDIA는 **Jetson Orin Nano (8GB)**의 벤치마크 표를 공개합니다 — v0.10.0,
JetPack 7.2 / CUDA 13.2 / TensorRT 10.16. MTBench(LLM)와 COCO(VLM)에서의 런타임
결과이며, 최대 GPU 메모리도 함께 표시됩니다:

| 모델 | 유형 | 처리량 | 최대 GPU 메모리 |
|---|---|---|---|
| Qwen3-0.6B | LLM | 77.0 tok/s | 1,917 MB |
| Qwen3-1.7B | LLM | 36.5 tok/s | 2,992 MB |
| Qwen3-VL-2B | VLM | 36.1 tok/s | 4,486 MB |
| Qwen3.5-0.8B | LLM | 59.1 tok/s | 2,127 MB |
| Qwen3.5-0.8B | VLM | 59.0 tok/s | 2,760 MB |
| Qwen3.5-2B | LLM | 29.6 tok/s | 3,642 MB |
| Qwen3.5-2B | VLM | 29.6 tok/s | 4,692 MB |

Orin 행은 batch 1과 externalized INT4 가중치를 사용하며, 빌드 제한은
maxInputLen 2048, maxKVCacheCapacity 2200입니다. "Production performance may vary
with system-level tuning (power mode, memory configuration, thermal management)."

> **중요:** NVIDIA가 공개한 **AGX Orin 64 GB**의 tokens/sec 표는 이 키트에
> **적용되지 않습니다** — 모듈, 메모리 대역폭, 전력 범위가 다릅니다. AGX Orin에서
> Orin Nano 수치를 추정하지 마십시오. 여기서 Ollama나 llama.cpp 경로에 대한
> 자체 공개 수치는 존재하지 않습니다.

## 이 키트의 다른 런타임

### Ollama

현재 상태 — NVIDIA 직원이 개발자 포럼에서 JetPack 7.2.1(2026년 9월) 기준으로
확인했습니다: 기본 설치 스크립트가 동작하며 —
`curl -fsSL https://ollama.com/install.sh | sh` — `ollama ps`는 `100% GPU`를
보고해야 합니다. "Unsupported JetPack version detected" 경고는 무해합니다.

구형 빌드는 미리 빌드된 CUDA 라이브러리에 Orin의 컴퓨트 능력인 sm_87이 없어서
CPU로 폴백했습니다. 커뮤니티 보고에 따르면 Ollama 0.30.11에서 "CC 87 for CUDA
v13"이 추가되었고, NVIDIA 직원이 수정을 확인했습니다. 일부 커뮤니티 문제
보고는 남아 있습니다(2026년 8–9월) — 사용 중인 기기에서 `ollama ps`를
확인하십시오. CUDA v13 소스 빌드가 여전히 대안입니다.

### JetPack 7.2용 Python wheel

JetPack 7.2 / CUDA 13.2용 CUDA 지원 Python 패키지(PyTorch 등)는 NVIDIA 직원이
안내하는 Jetson AI Lab SBSA 인덱스에서 제공됩니다:

```
https://pypi.jetson-ai-lab.io/sbsa/cu130
```

이 인덱스를 pip 인덱스로 사용하십시오(`--index-url https://pypi.jetson-ai-lab.io/sbsa/cu130`).
torch 2.11.0, torchvision 0.25.0, vllm 0.20.0+cu130 같은 aarch64 wheel을
제공합니다. `jp7/*` 인덱스는 없으며, JetPack 6 시대의 인덱스는 `jp6/cu126`입니다.
CUDA 13.2는 Orin을 Arm SBSA 툴킷(R595+ 드라이버)으로 통합합니다.

### jetson-containers와 Jetson AI Lab(대안 경로)

[jetson-containers](https://github.com/dusty-nv/jetson-containers)는
JetPack 6.2(CUDA 12.6)와 JetPack 7(CUDA 13.x)을 지원합니다. 주요 서빙 경로용으로
미리 빌드된 `-jetson-orin` 이미지가 있으며,
`ghcr.io/nvidia-ai-iot/llama_cpp:latest-jetson-orin`과 `ghcr.io/nvidia-ai-iot/vllm:latest-jetson-orin`이
포함됩니다.

벤더 자료의 8 GB 주의 사항: vLLM 예제는 `--shm-size=16g`를 사용하며(이 키트를
위한 크기 권장이 아닙니다), 권장 설정은 Docker 데이터 루트를 NVMe로 옮기고
16 GB 스왑 파일을 추가하는 것입니다(먼저 ZRAM을 비활성화).

## 8 GB를 위한 튜닝

모델이 들어가지 않을 때: 플랫폼 메모리를 확보하고(헤드리스 모드는 최대
~865 MB를 회수), 4비트로 양자화하고, KV 캐시와 컨텍스트 크기를 의도적으로
정하십시오 — [8 GB에서의 메모리 효율](/ko/tutorials/jetson-orin-nano/memory-efficiency)을
참조하십시오.

## 문제 해결

- **로드 시 메모리 부족** — `cudaMalloc failed: out of memory ... failed to
  allocate buffer for kv cache`는 모델과 KV 캐시가 8 GB 통합 메모리를
  초과했다는 뜻입니다. 더 작거나 더 많이 양자화된 모델을 사용하거나
  컨텍스트를 줄이십시오. Edge-LLM 엔진 빌드에서는
  `--externalize-weights int4_ffn`을 추가하고 `--maxInputLen` /
  `--maxKVCacheCapacity`를 줄이십시오.
- **Ollama CPU 폴백 또는 "Unsupported JetPack version detected" 경고** —
  먼저 Ollama를 업데이트하십시오(구형 빌드에는 sm_87이 없었습니다). NVIDIA
  직원에 따르면 7.2.1에서는 이 경고가 무해합니다. `ollama ps`(`100% GPU`)로
  확인하십시오.
- **버전 또는 설정 문제** — [시스템 확인](/ko/tutorials/jetson-orin-nano/verify-your-system)과
  [문제 해결](/ko/tutorials/jetson-orin-nano/troubleshooting)을 참조하십시오.

## 출처

- [TensorRT Edge-LLM](https://nvidia.github.io/TensorRT-Edge-LLM/): [지원 매트릭스](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/support-matrix.html), [지원 모델](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html), [설치](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/installation.html), [Quick Start](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html), [성능 벤치마크](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html) (2026-09-26 확인)
- [JetPack 7.2.1 다운로드 페이지](https://developer.nvidia.com/embedded/jetpack/downloads) (2026-09-26 확인)
- [NVIDIA 기술 블로그 — Maximizing Memory Efficiency to Run Bigger Models on NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (2026-09-26 확인)
- [NVIDIA 개발자 포럼 — Ollama on Jetson (JetPack 7.2.1에서 직원 확인)](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) (2026-09-26 확인)
- [NVIDIA 개발자 포럼 — JetPack 7.2 GPU acceleration issue (wheel 인덱스, sm_87)](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) (2026-09-26 확인)
- [NVIDIA 개발자 포럼 — AI models that run on Jetson Orin Nano Super 8GB (커뮤니티)](https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412) (2026-09-26 확인)
- [Jetson AI Lab — TensorRT Edge-LLM 튜토리얼](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/) (2026-09-26 확인)
- [Jetson AI Lab — 전체 문서 텍스트(컨테이너 이미지 표)](https://www.jetson-ai-lab.com/llms-full.txt) (2026-09-26 확인)
- [jetson-containers (GitHub)](https://github.com/dusty-nv/jetson-containers) (2026-09-26 확인)
- [Jetson AI Lab PyPI 인덱스 — sbsa/cu130](https://pypi.jetson-ai-lab.io/sbsa/cu130) (2026-09-26 확인)

*상태: 초안, cheny 검토 대기 중. 기재된 날짜 기준 NVIDIA 공식 문서에
근거하며, 아직 Juxi Technology가 실제 하드웨어에서 검증하지 않았습니다.*

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 이 페이지는 Juxi Technology가 게시하며 NVIDIA의 공식 발행물이 아닙니다.
