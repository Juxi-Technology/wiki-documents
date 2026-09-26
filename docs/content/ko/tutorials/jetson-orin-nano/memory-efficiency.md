---
title: 메모리 효율 — 8 GB에서 모델 실행
sidebar_label: 메모리 효율
slug: /tutorials/memory-efficiency
description: >-
  Jetson Orin Nano Super 개발자 키트의 8 GB 통합 메모리에 LLM, VLM, 비전
  워크로드를 담기 위해 문서화된 수단 — 플랫폼, 모델, 측정.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/FP8KV.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html
    checked: 2026-09-26
  - source: https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/ram-optimization/
    checked: 2026-09-26
review_owner: cheny
---

# 메모리 효율 — 8 GB에서 모델 실행

Orin Nano Super 키트에서 8 GB 통합 메모리는 OS, 데스크톱, 서비스, 그리고 모델
자체까지 모든 것에 대한 엄격한 한계입니다. 문서화된 수단은 **플랫폼**, **모델**,
**측정**의 세 계층으로 나뉘며, 이 페이지는 어떤 기법이 더 큰 모듈에 대해서만
문서화되어 있는지도 표시합니다.

## 숫자로 보는 8 GB 예산

- 펌웨어와 커널 예약을 제외하면 **8 GB 중 약 7.6 GB를 사용할 수 있습니다** —
  NVIDIA의 메모리 효율 블로그가 모든 "available memory" 수치에 사용하는
  기준입니다.
- CPU 메모리와 GPU 메모리(CUDA, 멀티미디어 버퍼)는 **동일한 물리 풀**에서
  나옵니다. 하나를 줄이면 다른 쪽에도 도움이 됩니다.
- 블로그의 대표 데모 — 2B 파라미터 VLM 파이프라인 — 는 **4.5 / 7.6 GB(~60%)**에서
  실행됩니다.

## 수단 1 — 플랫폼 계층: OS와 서비스가 차지하는 것

아래 절감 수치는 NVIDIA의 메모리 효율 블로그에서 가져온 것입니다.

| 수단 | 문서화된 절감량 | 방법 |
|---|---|---|
| 그래픽 데스크톱 비활성화(헤드리스) | 최대 865 MB | `sudo systemctl set-default multi-user.target` |
| 네트워킹 및 저널링 서비스 비활성화 | 최대 32 MB | `sudo systemctl disable <service-name>` |
| 디스플레이 및 카메라 카브아웃 | 합계 약 100 MB | BSP 디바이스 트리 편집 후 재플래싱 |
| SWIOTLB 예약 | 약 4 MB | 커널 인자 `swiotlb=2048`, DMA 문제가 나타날 때만 |
| DeepStream 방식 파이프라인 | 최대 412 MB | 컨테이너에서 베어 메탈로(70 MB); Python에서 C++로(84 MB); Tiler/OSD 비활성화 후 FakeSink 사용(258 MB) — [DeepStream](/ko/tutorials/jetson-orin-nano/deepstream) 참조 |
| 추론 프레임워크 선택 | 2.7 GB 초과 오버헤드 방지 | 경량 런타임(C++ 런타임, llama.cpp); 무거운 프레임워크는 초기화만으로 2.7 GB 이상을 추가할 수 있음 |

> **Juxi 참고:** 카브아웃 편집은 BSP 소스 변경입니다: 재플래싱이 필요하고
> 절감량은 적습니다. 한 번에 하나씩 변경하고, 동작하는 플래시 이미지를
> 보관하십시오 — [플래싱 및 업데이트](/ko/tutorials/jetson-orin-nano/flashing-and-updates)를
> 참조하십시오.

**스왑은 절감이 아니라 압력 배출구입니다.** 벤더의 RAM 최적화 튜토리얼은
ZRAM을 **NVMe의 16 GB 스왑 파일**로 대체합니다(먼저
`sudo systemctl disable nvzramconfig`). NVIDIA의 8 GB 데모는 피크 시
**약 2 GB의 스왑 사용**을 가정했습니다.

### 서버를 중지한 후에는 캐시를 해제하십시오

vLLM이나 SGLang 서버, 또는 Docker 컨테이너를 중지한 후에도 메모리 사용량이
높게 유지될 수 있습니다(L4T r39.2.1 알려진 문제 5661165). NVIDIA의 명령:

```bash
sudo sh -c "sync; echo 3 > /proc/sys/vm/drop_caches"
```

Edge-LLM 엔진 빌드에서 메모리가 부족할 때도 같은 해결책이 적용됩니다:
`sudo sysctl -w vm.drop_caches=3`와 더 작은 빌드 제한입니다(벤더 튜토리얼).

### 전원 모드는 용량이 아니라 클록을 바꿉니다

| 전원 모드 | 모드 ID | CPU 최대 클록 | GPU 최대 클록 | 메모리 최대 클록 |
|---|---|---|---|---|
| 15W | 0 | 1497.6 MHz | 612 MHz | 2133 MHz |
| 25W(기본) | 1 | 1344 MHz | 918 MHz | 3199 MHz |
| MAXN_SUPER | 2 | 1728 MHz | 1020 MHz | 3199 MHz |

위 클록 최대치는 NVIDIA의 r39.2 Power and Performance 표에서 가져온 것입니다.
전원 모드는 클록 주파수를 바꿀 뿐 메모리 크기는 바꾸지 않습니다 — 들어가지
않는 모델은 더 빠른 모드에서도 들어가지 않습니다. `sudo nvpmodel -q`(목록)와
`sudo nvpmodel -m <mode_id>`로 전환하십시오. MAXN_SUPER는 Super 플래싱 구성이
필요하며 실험적입니다(위 표 기준). 25W 또는 MAXN SUPER가 없다면
[문제 해결](/ko/tutorials/jetson-orin-nano/troubleshooting)을 참조하십시오.

> **주의:** 지나치게 큰 CUDA 메모리 할당은 **디바이스를 재부팅**시킬 수
> 있습니다(L4T r39.2.1 알려진 문제 5699079). 같은 릴리스 노트의 지침: CUDA
> 및 기타 애플리케이션이 물리적으로 사용 가능한 것보다 많은 메모리를 요청하지
> 않도록 하고, 시스템 프로세스가 종료되지 않도록 더 높은 OOM 점수로 CUDA
> 프로세스를 실행하십시오.

## 수단 2 — 모델 계층: 모델과 캐시가 차지하는 것

### 양자화가 가장 큰 단일 수단입니다

Orin은 **FP16, INT8, INT4 엔진만 실행합니다**. FP8과 FP4는 Orin에서 실행되지
않습니다(Thor/Blackwell급). TensorRT Edge-LLM에서는 **INT4 AWQ 또는 INT4
GPTQ** checkpoint를 사용하고, INT8 GPTQ를 피하며, FP8, MXFP8, FP4, NVFP4
checkpoint는 절대 선택하지 마십시오.
[로컬 LLM 추론](/ko/tutorials/jetson-orin-nano/local-llm)을 참조하십시오.

자체 공개 수치: Qwen3 8B를 FP16에서 W4A16으로 전환하면 약 **10 GB**를
회수하고, Qwen3 4B를 BF16에서 INT4로 전환하면 약 **5.6 GB**를 회수합니다.
4B 사례에 대한 NVIDIA의 차트에는 "Jetson Orin NX 16 GB"라는 캡션이 붙어
있습니다 — 더 큰 모듈이므로 이 수치는 참고로 취급하고 8 GB에 대한 약속으로
받아들이지 마십시오.

4비트 양자화와 효율적인 런타임을 사용할 때, NVIDIA가 문서화한 이 예산의
범위는 **LLM 최대 ~10B 파라미터, VLM 최대 ~4B 파라미터**입니다.

### NVIDIA가 8 GB에서 실제로 벤치마크하는 것

TensorRT Edge-LLM은 0.6B에서 2B 파라미터 모델(Qwen3 및 Qwen3.5 계열)에 대한
Orin Nano 8 GB 행을 공개합니다. **2B가 NVIDIA가 이 모듈에서 벤치마크하는
가장 큰 모델입니다.** 4B INT4 AWQ 워크스루가 벤더 튜토리얼로 존재하지만
(가중치 약 2 GB), 공식 4B 수치는 공개되지 않았습니다.

### 엔진 빌드 메모리(TensorRT Edge-LLM)

- `--externalize-weights int4_ffn`(dense) 또는 `--externalize-weights
  int4_ffn int4_moe`(MoE)는 시스템 메모리가 적은 Orin 디바이스에서 엔진 빌드
  메모리를 줄입니다.
- 벤더 튜토리얼의 Orin Nano용으로 튜닝된 제한:
  `llm_build --maxBatchSize 1 --maxInputLen 512 --maxKVCacheCapacity 1024`.
  그래도 빌드 중 메모리가 부족하면 먼저 시스템 메모리를 확보하고, 예를 들어
  `--maxInputLen 256 --maxKVCacheCapacity 512`처럼 더 줄이십시오.
  엔진은 디바이스에서 빌드되며 모듈 간에 이식되지 않습니다.

### KV 캐시: 크기 산정과 재사용

KV 캐시는 컨텍스트 길이, 배치 크기, 동시성에 따라 커집니다. 이는 메모리
예산의 일부이며 나중에 생각할 문제가 아닙니다.

- 빌드 제한이 KV 캐시의 상한을 정합니다: `--maxInputLen`과
  `--maxKVCacheCapacity`이며, Orin Nano 벤치마크 빌드는 maxInputLen 2048,
  maxKVCacheCapacity 2200, batch 1을 사용했습니다.
- **KV 캐시 재사용**은 문서화된 Edge-LLM 런타임 기능입니다: 반복되는 입력
  접두사에 대한 프로세스 로컬, 콘텐츠 주소 지정 방식 캐시로, 문서, 이전 턴,
  생성된 이어쓰기, 반복되는 이미지 접두사의 prefill 상태를 다시 계산하지 않고
  재사용합니다.
- 들어가는 모델 파일도 실패할 수 있습니다: 커뮤니티 보고에 따르면 7.4 GB와
  16 GB GGUF 파일이 8 GB 보드에서 KV 캐시 할당 오류로 실패했습니다 — 적합성을
  확인할 때 KV 캐시와 런타임 오버헤드를 함께 더하십시오.
- **어휘 축소**(생성을 작업별 토큰 하위 집합으로 제한)와 **DART 비주얼 토큰
  프루닝**(prefill 전에 중복된 비주얼 토큰 제거)은 문서화된 Edge-LLM 기능
  페이지입니다. 비주얼 엔진 빌드는 이미지 토큰 제한도 받습니다:
  `--minImageTokens`, `--maxImageTokens`, `--maxImageTokensPerImage`.

> **중요:** FP8 KV 캐시 — KV 캐시 메모리를 ~50% 절감하는 기능 — 는 SM89
> 이상(Ada Lovelace 이상)이 필요합니다. Orin은 SM87이므로 **이 키트에서는
> 사용할 수 없습니다**. FP16 KV 캐시를 사용하십시오.

### NVIDIA 자체 전/후 비교

NVIDIA의 8 GB 사례 연구(메모리 효율 블로그, 표 7): 전체 GNOME 데스크톱 대신
헤드리스 모드(1.8 GB → 1.1 GB)와 4비트 GGUF VLM(Q4_K_M, 6.6 GB → 2.2 GB)을
사용했습니다. 이 파이프라인은 이전에는 Orin Nano 8 GB에서 실행되지 않았고
(VLM만 RAM의 87%를 사용), 이제는 **4.5 / 7.6 GB(~60%)**에서 실행됩니다 —
5.1 GB 이상 절감. "before" 열은 **Orin NX 16 GB**에서 측정한 것입니다: 같은
최적화를 적용해 워크로드를 8 GB 키트로 옮긴 것입니다.

## 수단 3 — 측정 계층: 메모리가 어디로 가는지 확인

| 도구 | 보여 주는 것 | 비고 |
|---|---|---|
| `sudo tegrastats` | CPU, GPU, 메모리, 온도, 전력 | 개발자 키트 사용자 가이드: nvidia-smi는 Jetson의 기본 모니터링 도구가 아닙니다 |
| `nvidia-smi dmon` | GPU 사용률 | 릴리스 노트 5406663 기준; Jetson Power GUI의 GPU 사용률은 "still under evaluation"입니다 |
| `free -h` | 메모리에 대한 OS 관점 | GPU 워크로드가 얼마나 할당할 수 있는지는 알려 주지 않습니다 |
| procrank | 프로세스별 물리 메모리(PSS) | `git clone https://github.com/csimmonds/procrank_linux.git`, `cd procrank_linux/`, `make`, `sudo ./procrank` |
| nvmap clients | GPU/멀티미디어 버퍼를 보유한 프로세스 | `sudo cat /sys/kernel/debug/nvmap/iovmm/clients` |

### "여유 메모리"는 예산이 아닙니다

`free -h`는 OS가 보는 시스템 전체 관점을 보여 주지만, GPU 할당은 별도 회계로
같은 풀에서 나옵니다. 8 GB 보드에 대한 커뮤니티 보고에서 `free -h`가 여전히
5.7 GiB "여유"를 표시하는데도 KV 캐시용 `cudaMalloc`이 실패했습니다
[등급 B, 커뮤니티 보고]. "여유"가 아니라 ~7.6 GB 예산을 기준으로 적합성을
판단하십시오.

### 방법

1. 먼저 플랫폼 기본 사항을 확인하십시오 — [시스템 확인](/ko/tutorials/jetson-orin-nano/verify-your-system).
2. 기준선을 기록하십시오: 유휴 시와 부하 시의 메모리(`tegrastats`).
3. 수단 하나를 변경하고 다시 측정하십시오. 변화가 없으면 되돌리십시오.

## 어디서 시작할까

문서화된 효과 크기 순서:

1. **런타임과 양자화** — NVIDIA 요약에서 가장 큰 계층입니다(블로그 표 5 기준,
   추론 프레임워크와 모델 양자화에 약 5–10 GB).
2. **헤드리스** — 최대 ~865 MB, 명령 하나면 됩니다.
3. **파이프라인 튜닝** — 최대 ~412 MB(DeepStream 방식).
4. **NVMe 스왑** — 절감이 아니라 압력 완화입니다.
5. **카브아웃과 SWIOTLB** — 약 100 MB와 4 MB, 그리고 재플래싱. 마지막입니다.

그래도 모델이 들어가지 않는다면 문제는 설정이 아니라 모델입니다: 더 작게,
더 많이 양자화하고, 컨텍스트를 줄이거나 배치를 낮추십시오 —
[로컬 LLM 추론](/ko/tutorials/jetson-orin-nano/local-llm)과
[FAQ](/ko/tutorials/jetson-orin-nano/faq)를 참조하십시오.

## 출처

- [NVIDIA 기술 블로그 — Maximizing Memory Efficiency to Run Bigger Models on NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (7.6 GB 예산, 데스크톱 865 MB, 네트워킹/저널링 32 MB, 카브아웃, SWIOTLB, 파이프라인 절감, 양자화 및 전/후 표, procrank 설치 단계와 nvmap clients; 2026-09-26 확인)
- TensorRT Edge-LLM 문서: [지원 모델](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/supported-models.html) · [FP8 KV 캐시](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/FP8KV.html) · [성능 벤치마크](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/performance/performance-benchmarks.html) · [Quick Start 가이드](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/getting_started/quick-start-guide.html) · 기능 페이지: [KV 캐시 재사용](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/kv-cache-reuse.html) · [어휘 축소](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/reduce-vocab.html) · [비주얼 토큰 프루닝(DART)](https://nvidia.github.io/TensorRT-Edge-LLM/user_guide/features/visual-token-pruning.html) (2026-09-26 확인)
- Jetson Linux 문서: [r39.2.1 릴리스 노트](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (문제 5661165, 5699079, 5406663) · [Power and Performance, r39.2](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) · [Dev Kit How-To](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (2026-09-26 확인)
- Jetson AI Lab: [TensorRT Edge-LLM 튜토리얼](https://www.jetson-ai-lab.com/tutorials/tensorrt-edge-llm/) · [RAM 최적화](https://www.jetson-ai-lab.com/tutorials/ram-optimization/) (Orin Nano 빌드 제한; NVMe 스왑; 2026-09-26 확인)
- [NVIDIA 개발자 포럼 — Ollama on Jetson](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) (커뮤니티: free -h vs cudaMalloc; 등급 B; 2026-09-26 확인)

*상태: 초안, cheny 검토 대기 중. 기재된 날짜 기준 NVIDIA 공식 문서에
근거하며, 아직 Juxi Technology가 실제 하드웨어에서 검증하지 않았습니다.*

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 이 페이지는 Juxi Technology가 게시하며 NVIDIA의 공식 발행물이 아닙니다.
