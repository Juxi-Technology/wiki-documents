---
title: 에이전트 AI — 8 GB Orin Nano에서의 NemoClaw
sidebar_label: 에이전트 AI (NemoClaw)
slug: /tutorials/agentic-ai
description: >-
  8 GB Jetson Orin Nano Super 개발자 키트에 상시 가동 에이전트 스택인 NVIDIA
  NemoClaw 설치 및 실행 — 공식 설치, 8 GB에 대한 솔직한 기대치, 보안 참고
  사항.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://www.nvidia.com/en-us/ai/nemoclaw
    checked: 2026-09-26
  - source: https://www.nvidia.com/en-us/ai/build-a-claw/
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://www.jetson-ai-lab.com/tutorials/nemoclaw/
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/getting_started/index.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
review_owner: cheny
---

# 에이전트 AI — 8 GB Orin Nano에서의 NemoClaw

이 키트는 명령 하나로 설치되는 상시 가동 자율 에이전트, NVIDIA NemoClaw를
실행할 수 있습니다. 이 페이지는 NemoClaw가 무엇인지, 공식 설치, 주변의
에이전트 스킬, 8 GB에 대한 솔직한 기대치, 그리고 필요한 보안 결정을
다룹니다.

## NemoClaw란

NVIDIA는 NemoClaw를 "a collection of open blueprints for building autonomous
agents"라고 설명합니다 — 추론하고 계획하고 실제 워크플로 전반에서 행동하는
상시 가동 AI 시스템입니다. 에이전트 하네스(OpenClaw, Hermes, LangChain Deep
Agents)와 NVIDIA Agent Toolkit 구성 요소(Nemotron 모델, NeMo, OpenShell
런타임 정책 제어)를 함께 묶습니다.

OpenShell은 보안 계층입니다: "the secure runtime inside it that enforces what
the agent can access: files, networks, credentials, and tools."

NemoClaw는 알파 소프트웨어입니다 — NVIDIA는 "Early preview"로
표기합니다(2026-03-16부터). 제품 페이지:
<https://www.nvidia.com/en-us/ai/nemoclaw> · Build-a-Claw 허브:
<https://www.nvidia.com/en-us/ai/build-a-claw/>

## 설치 — 공식 단일 명령

키트에서 NVIDIA의 설치 프로그램을 실행합니다:

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash
```

이 명령은 기본 하네스인 **OpenClaw**를 설치합니다. 환경 변수로 다른 두
가지를 선택할 수 있습니다:

```bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | NEMOCLAW_AGENT=hermes bash
curl -fsSL https://www.nvidia.com/nemoclaw.sh | NEMOCLAW_AGENT=langchain-deepagents-code bash
```

이 키트에서 설치 프로그램은 Jetson(Orin 및 Thor)을 자동 감지하고 JetPack
호스트 구성을 먼저 적용합니다. L4T 39.x에서는 `br_netfilter` 모듈이 없을
때만 로드합니다(이것이 없으면 샌드박스의 DNS 확인이 실패하고 온보딩이
"Setting up OpenClaw inside sandbox"에서 멈춥니다). Ollama를 선택하면 설치
프로그램이 Ollama도 설치합니다: "The script also installs ollama (if ollama
is selected) so you don't need to manually install it first"(NVIDIA 직원).
NVIDIA 사이트는 이 디바이스를 문서화합니다: "Install OpenClaw on Your NVIDIA
Jetson Orin Nano" — "a fully local AI personal assistant on Jetson … no cloud
APIs needed."

> **중요** — NemoClaw의 플랫폼 지원 매트릭스(v1.1, 2026-09-04)에는 Jetson
> 행이 없으며, 테스트된 플랫폼은 Linux(Ubuntu 24.04)와 DGX OS Spark입니다.
> Orin Nano 지원은 실제로 동작합니다 — 설치 프로그램이 보드를 감지하고
> NVIDIA가 흐름을 문서화합니다 — 하지만 공식 지원으로 게시된 것은
> 아니므로 거친 부분을 각오하십시오.

여기서 중요한 요구 사항(NVIDIA의 NemoClaw 전제 조건 페이지 기준):

| 요구 사항 | 최소 / 권장 | 이 키트에서 |
|---|---|---|
| RAM | 8 GB / 16 GB | 총 8 GB — 최소선 |
| 여유 디스크 | 20 GB | 내장 스토리지 없음. microSD 또는 NVMe 사용([빠른 시작](/ko/tutorials/jetson-orin-nano/quick-start)) |
| Node.js / npm | 22.19+ / 10+ | 별도 설치 |
| 컨테이너 런타임 | Docker Engine / Desktop / Colima | 소켓 수정: `sudo usermod -aG docker $USER` 후 `newgrp docker` |

## 설치 후 — 첫 세션

NVIDIA 직원은 Orin 흐름에 대해 [Jetson AI Lab
워크스루](https://www.jetson-ai-lab.com/tutorials/nemoclaw/)(벤더 가이드)를
안내합니다:

1. `curl -fsSL https://ollama.com/install.sh | sh` — 건너뛰어도 됩니다.
   NemoClaw 설치 프로그램이 Ollama도 설치할 수 있습니다.
2. Nemotron3 Nano 4B 같은 4B급 도구 호출 모델을 내려받습니다(가이드의
   `nemotron-3-nano:30b` 예시는 더 큰 디바이스를 대상으로 합니다).
3. `curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash`
4. 온보딩: 모델 소스로 Ollama를 선택하고, 동작하는 범위에서 가장 엄격한
   샌드박스 정책 등급을 고르십시오.
5. `source ~/.bashrc` 후 `nemoclaw my-assistant connect`; `openclaw tui`로
   에이전트를 시작합니다.

## 에이전트 스킬

NVIDIA는 **에이전트 스킬**도 제공합니다 — AI 코딩 어시스턴트(Claude Code,
Cursor, Codex)를 디바이스별 자동화로 확장하는, 개방형 Agent Skills 형식의
패키지 워크플로입니다. 이 시대에 대해 문서화된 두 영역:

- **피지컬 AI(로보틱스).** Isaac ROS는 에이전트 스킬 카탈로그를 제공합니다 —
  NVIDIA에 따르면 Isaac ROS 개발 컨테이너 활성화, Mission Control 클라우드
  스택 구동 등의 작업입니다. 카탈로그는
  <https://github.com/nvidia/skills>("Physical AI" 범주)에 있으며 `npx`로
  설치합니다(Node.js는 표준 Isaac ROS 환경에 포함되지 않습니다). Isaac ROS
  5.0은 `isaac-ros-activate` CLI와 얼리 액세스
  `migrate-node-to-rosidl-buffer` 스킬을 추가합니다.
  [로보틱스](/ko/tutorials/jetson-orin-nano/robotics)를 참조하십시오.
- **비디오 파이프라인.** L4T r39.2.1 릴리스 노트는 "Agent skills for video
  pipelines"를 What's New 항목에 포함합니다.

솔직한 공백 하나: 이 페이지의 출처들은 Isaac ROS(피지컬 AI)와 비디오
파이프라인용 NVIDIA 에이전트 스킬을 문서화하지만, NemoClaw 전용 스킬
카탈로그를 문서화한 출처는 없습니다.

## 8 GB에 대한 현실적인 기대치

상시 가동 에이전트, 로컬 모델, Ubuntu 데스크톱이 이 키트에서 동시에 편안하게
들어가지 않습니다. 문서화된 예산:

- **사용 가능한 메모리는 8 GB가 아니라 ~7.6 GB입니다.** NVIDIA: "of the 8 GB
  physical DRAM, roughly 7.6 GB is usable after firmware and kernel
  reservations."
- **8 GB는 NemoClaw의 최소선이지 편안한 영역이 아닙니다.** 전제 조건은 8 GB를
  최소, 16 GB를 권장으로 기재합니다: "On machines with less than 8 GB of RAM,
  this combined usage can trigger the OOM killer. If you cannot add memory,
  configure at least 8 GB of swap to work around the issue at the cost of
  slower performance." 이 키트의 메모리는 고정되어 있습니다 — 스왑 파일을
  계획하십시오([메모리 효율](/ko/tutorials/jetson-orin-nano/memory-efficiency)).
  약 2.4 GB의 샌드박스 이미지 푸시는 이미 8 GB Orin Nano에서 OOM을 유발한
  적이 있습니다.
- **에이전트와 데스크톱은 모델이 로드되기 전에 메모리를 차지합니다.** NVIDIA
  포럼의 커뮤니티 가이드는 OpenClaw 런타임을 최대 ~1 GB로 봅니다. 그래픽
  데스크톱을 비활성화하면 최대 ~865 MB가 확보되고(NVIDIA 수치), 커뮤니티
  측정에 따르면 GNOME은 600 MB가 넘습니다.
- **과대 모델 실패는 NVIDIA 포럼의 커뮤니티 보고에 문서화되어 있습니다.**
  8 GB 보드의 Ollama가 7.4 GB 모델과 16 GB 모델을 로드하지 못했습니다:
  `cudaMalloc failed: out of memory ... failed to allocate buffer for kv
  cache`. 파일 크기만으로는 적합성을 판단할 수 없습니다 — KV 캐시가 같은
  8 GB 안에 들어가야 합니다.

출처에 따르면 들어가는 것은: NVIDIA가 검증한 Ollama 기본값(`qwen3.6:35b`,
`nemotron-3-nano:30b`, `qwen3.5:9b`)은 더 큰 머신에 맞춰져 있고, Jetson AI
Lab 가이드는 4B급 도구 호출 모델로 시작하라고 말합니다 — "It can work, but
do expect weaker performance than the 30B-class models"; NVIDIA의 메모리
블로그는 튜닝된 4비트 범위를 LLM 최대 ~10B, VLM 최대 ~4B 파라미터로
제시합니다 — 전용 구성의 상한이며, 데스크톱과 에이전트까지 함께 담는 예산은
아닙니다.

NVIDIA는 이 디바이스의 Ollama에 대한 tokens/sec 수치를 공개하지 않습니다.
외부의 속도 주장은 주의해서 다루십시오([로컬 LLM
추론](/ko/tutorials/jetson-orin-nano/local-llm) 참조).

> **Juxi 참고:** 여기서 실용적인 상시 가동 구성을 원한다면 헤드리스 모드,
> 4B급 양자화 모델, 그리고 20 GB 요구 사항과 스왑 파일을 위한 NVMe
> 스토리지를 계획하십시오. 이는 출처가 뒷받침하는 범위와 일치하며, 그보다
> 큰 것은 검증되지 않았습니다.

## Ollama 및 에이전트 참고 사항 — NVIDIA 직원 확인

NVIDIA 직원은 개발자 포럼에서 Orin Nano + JetPack 7.2 + Ollama 흐름을
디버깅했고, 2026년 9월에 JetPack 7.2.1에서 Ollama를 다시 확인했습니다.

- **먼저 GPU를 확인하십시오.** `ollama ps`는 PROCESSOR 열에 `100% GPU`를
  표시해야 합니다. CPU로 표시되면 에이전트가 매우 느려집니다.
- **문서화된 실패 사례(2026년 6월).** JetPack 7.2를 새로 플래싱한 Orin
  Nano에서 NemoClaw + Ollama를 사용할 때 `openclaw tui`가 열리지만 응답하지
  않았습니다("Autocompaction could not recover this turn"). NVIDIA가
  재현했습니다: Ollama가 GPU 검색을 건너뛰었고(CPU 폴백), 샌드박스 컨텍스트
  창이 4096 토큰에 불과했습니다. 직원의 수정은 다음 줄을
  `/etc/systemd/system/ollama.service.d/override.conf`에 기록했습니다:

  ```ini
  Environment="OLLAMA_HOST=127.0.0.1:11434"
  Environment="OLLAMA_CONTEXT_LENGTH=32768"
  Environment="OLLAMA_IGPU_ENABLE=1"
  Environment="GGML_BACKEND_PATH=/usr/local/lib/ollama/cuda_v13/libggml-cuda.so"
  Environment="LD_LIBRARY_PATH=/usr/local/lib/ollama:/usr/local/lib/ollama/cuda_v13"
  ```

  그런 다음 `sudo systemctl daemon-reload && sudo systemctl restart ollama`;
  샌드박스 안에서(`nemoclaw my-assistant connect`)
  `.openclaw/openclaw.json`의 `contextWindow`를 32768로 올리고 구성 해시를
  갱신했습니다. 신고자는 이후 Ollama가 GPU에서 실행됨을 확인했습니다.
- **현재 상태: 이 우회 방법은 필요하지 않아야 합니다.** 2026년 중반 직원:
  "the issue is fixed in the latest ollama release. The workaround
  (override.conf) is no longer needed." JetPack 7.2.1에서는 업스트림 설치
  프로그램이 동작하고 `ollama ps`가 100% GPU를 보고합니다. "WARNING:
  Unsupported JetPack version detected" 줄은 무해합니다. 먼저 기본 설치를
  테스트하십시오.
- **Ollama가 여전히 CPU로 폴백한다면:** 먼저 Ollama를 업데이트하십시오. 한
  포럼 사용자는 오래된 `/usr/local/lib/ollama/cuda_v12` 디렉터리를
  삭제하여 지속적인 폴백 문제를 해결했습니다(직원이 삭제를 확인).
  override.conf는 최후의 수단으로 남겨 두십시오 — NVIDIA가 바로 이 키트에서
  성공적으로 사용한 방법입니다.

## 상시 가동 에이전트의 보안

상시 가동 에이전트는 자격 증명과 도구 접근 권한을 가진 프로그램으로, 보지
않는 동안에도 계속 동작합니다. 데이터를 보관하는 디바이스에서 이것은 실제
위험입니다: 여기서 도구와 셸 접근 권한을 가진 에이전트는 접근할 수 있는
모든 것을 읽고, 변경하고, 전송할 수 있습니다.

**정책 계층을 사용하십시오.** NVIDIA는 OpenShell을 "the secure runtime
inside it that enforces what the agent can access: files, networks,
credentials, and tools."라고 설명합니다. 온보딩 중에는 작업을 수행하면서
가장 엄격한 샌드박스 정책 등급을 고르십시오(Jetson AI Lab 워크스루는 가장
엄격한 등급을 권장합니다).

**자격 증명.** 에이전트에는 범위가 제한되고 회수 가능한 자격 증명 — 전용
키와 계정 — 을 주고, 개인 자격 증명은 절대 주지 마십시오. 에이전트가 읽을
수 있는 것은 무엇이든 복사할 수 있고, 사용할 수 있는 것은 무엇이든 속아서
사용할 수 있습니다. 메시징 통합은 여러분의 신원으로 동작합니다: NVIDIA의
Orin Nano 페이지는 OpenClaw + WhatsApp 예시를 보여 주므로 전용 계정이나
번호를 사용하십시오.

**네트워크 노출.** 로컬 서비스는 localhost에 유지하십시오 — 여기서 NVIDIA의
직원 구성은 Ollama를 `127.0.0.1`에 바인딩합니다(`OLLAMA_HOST=127.0.0.1:11434`).
에이전트 대시보드, 제어 API, 모델 서버를 공개 인터넷에 노출하지 마십시오.
원격 접속에는 직접 관리하는 터널이나 VPN을 사용하십시오. 설치는
Docker(Engine/Desktop/Colima, 위 요구 사항 기준)와 샌드박스 컨테이너
클러스터(OpenShell 게이트웨이는 내부적으로 k3s를 실행), 그리고 sudo 접근이
필요합니다.

**운영 습관.** 감독 하에 시작하십시오 — 무인으로 두기 전에 에이전트가 하는
일을 지켜보십시오. 회수하거나 되돌릴 수 없는 접근 권한을 주지 말고, 백업과
복구 경로를 유지하십시오([플래싱 및
업데이트](/ko/tutorials/jetson-orin-nano/flashing-and-updates) 참조). NemoClaw는
알파 소프트웨어("Early preview")입니다. 샌드박스를 여러 계층 중 하나로
취급하고 유일한 계층으로 여기지 마십시오.

> **주의** — 이 스택은 로컬에서 실행되므로("no cloud APIs needed"), 보안
> 경계는 디바이스, 네트워크, 자격 증명입니다. 에이전트를 켜 두기 전에 세
> 가지를 모두 점검하십시오.

## 출처

- [NVIDIA NemoClaw 제품 페이지](https://www.nvidia.com/en-us/ai/nemoclaw) (2026-09-26 확인) — 정의, 하네스, 설치 명령, OpenShell.
- [NVIDIA Build-a-Claw 리소스 허브](https://www.nvidia.com/en-us/ai/build-a-claw/) (2026-09-26 확인) — Orin Nano 설치 섹션.
- [NemoClaw — 전제 조건](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md) 및 [플랫폼 지원](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md) (2026-09-26 확인)
- [NemoClaw — 문제 해결(Jetson 호스트 구성)](https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx) (2026-09-26 확인)
- [NVIDIA 개발자 포럼 — NemoClaw on Jetson Orin Super with JetPack 7.2(NVIDIA 직원 수정)](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269) (2026-09-26 확인)
- [NVIDIA 개발자 포럼 — Ollama on Jetson(직원 확인)](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) 및 [JetPack 7.2 GPU 가속](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) (2026-09-26 확인)
- [NVIDIA 기술 블로그 — Maximizing memory efficiency on NVIDIA Jetson](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (2026-09-26 확인)
- [NVIDIA 개발자 포럼 — AI models that run on Orin Nano Super 8GB(커뮤니티 가이드)](https://forums.developer.nvidia.com/t/ai-models-that-run-on-jetson-orin-nano-super-8gb-a-practical-guide/365412) (2026-09-26 확인)
- [Jetson AI Lab — NemoClaw 튜토리얼(벤더 가이드)](https://www.jetson-ai-lab.com/tutorials/nemoclaw/) (2026-09-26 확인)
- [Isaac ROS — Getting Started](https://nvidia-isaac-ros.github.io/getting_started/index.html) 및 [릴리스 노트](https://nvidia-isaac-ros.github.io/releases/index.html) (2026-09-26 확인)
- [Jetson Linux r39.2.1 릴리스 노트(PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) (2026-09-26 확인) — "Agent skills for video pipelines" What's New 항목.

*상태: 초안, cheny 검토 대기 중. 기재된 날짜 기준 NVIDIA 공식 문서, NVIDIA
개발자 포럼 게시물, Jetson AI Lab 벤더 가이드에 근거하며, 아직 Juxi
Technology가 실제 하드웨어에서 검증하지 않았습니다.*

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 이 페이지는 Juxi Technology가 게시하며 NVIDIA의 공식 발행물이 아닙니다.
