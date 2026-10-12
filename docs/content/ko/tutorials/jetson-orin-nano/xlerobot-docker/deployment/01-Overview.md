---
title: 01 · 개요
---

# 01 · 개요

> **이전**: 없음, 첫 번째 문서입니다
> **다음**: [02-Environment-Setup](02-Environment-Setup.md)

이 문서에서는 **XLeRobot의 전체 워크플로가 무엇인지, 어떤 하드웨어가 필요한지, 내 머신이 지원되는지**를 명확히 설명합니다.

---

## 워크플로

XLeRobot의 전체 흐름은 4단계입니다:

```
① 로봇 캘리브레이션  →  ② 원격 조작 데이터 수집  →  ③ 모델 학습  →  ④ 모델 배포 및 자율 실행
   calibrate                record                       train            eval / rollout
```

Docker 이미지에는 이 4단계에 필요한 **소프트웨어 환경**이 모두 설치되어 있습니다 — Python, PyTorch,
LeRobot, XLeRobot 로봇 코드, 서보와 카메라 드라이버. 버전 충돌로 고생할 필요가 없습니다.

**직접 준비해야 하는 것**은 로봇 한 대(또는 소프트웨어를 먼저 실행), 컴퓨터 한 대, USB 케이블 하나뿐입니다.

---

## 하드웨어 지원

| 플랫폼 | 지원 여부 |
|---|---|
| **Jetson Orin 시리즈**(JetPack 7.2) | ✅ **현재 정식 지원 플랫폼**, GPU 가속 사용 가능 |
| Jetson Nano(2019 원판) | ❌ 미지원 — 연산 능력이 너무 낮음, 아래 참고 |
| 라즈베리 파이 / 일반 Ubuntu / x86 PC | ⏳ **아직 미지원**, 아래 참고 |
| Windows / macOS | ❌ 미지원(시리얼 포트와 카메라 패스스루는 Linux에서만 원활합니다) |

> 💡 **현재 이 이미지는 Jetson Orin 기기만 대상으로 합니다.**
>
> - **Jetson Orin Nano / Orin NX / AGX Orin**: **JetPack 7.2**가 필요합니다
>   (L4T 39.2 / CUDA 13.2). AGX Orin 64GB도 7.2에서 완전히 지원됩니다.
> - **Jetson Nano(2019 원판)**: ❌ 절대 불가능합니다. Maxwell 아키텍처(연산 능력 5.3)인데,
>   CUDA 13에서 Maxwell 지원이 통째로 삭제되었고, torch도 최소 sm_80을 요구합니다.
> - **라즈베리 파이 / x86 PC**: 이미지 설계상으로는 지원합니다(범용 CPU 버전은 `python:3.12-slim` 기반이며,
>   이 베이스 이미지는 공식적으로 amd64와 arm64 두 버전이 있습니다).
>   하지만 **현재 배포된 CPU 버전은 아직 멀티 아키텍처가 아닙니다**.
>   받아 보면 amd64만 있거나 arm64만 있을 수 있습니다. 멀티 아키텍처 빌드를 만든 뒤 열겠습니다.
>
> 메모리는 4 GB 이상을 권장합니다. Jetson Orin Nano의 3.4 GB에서도 원격 조작은 가능하지만,
> 학습에는 무리가 있습니다.

### 시스템 요구 사항

- Ubuntu 20.04 / 22.04 / 24.04, 또는 Debian 12+
- 라즈베리 파이: 64비트 시스템 필요(`uname -m`이 `aarch64`로 표시)
- 커널의 USB 시리얼 포트 지원(일반적으로 기본 지원됩니다)

### 아키텍처 확인

```bash
uname -m
```

- `aarch64` → 라즈베리 파이, Jetson(arm64 이미지 사용)
- `x86_64` → 일반 컴퓨터(amd64 이미지 사용)

---

## 읽어야 할 폴더

| # | 폴더 | 내용 | 언제 보는가 |
|:---:|---|---|---|
| **1** | [**deployment/**](01-Overview.md)(바로 여기) | **이미지 받기, 이미지 실행** | 처음 사용할 때, `01` → `02` → `03` 순서로 읽기 |
| **2** | [**xlerobot/**](../xlerobot/01-Operation.md) | **XLeRobot 일체형 실행 명령** | 일체형(양팔 + 베이스)이 있을 때 |
| **3** | [**lerobot/**](../lerobot/01-Operation.md) | **원본 LeRobot 실행 명령** | 단일 SO-101 / SO-100 암 또는 LeKiwi만 있을 때 |
| **4** | [**troubleshooting/**](../troubleshooting/01-Troubleshooting.md) | 자주 발생하는 문제와 빠른 참조 | 문제가 생겼을 때 |

> ⚠️ **2번째와 3번째 폴더는 둘 중 하나만** — 하드웨어를 보고 선택하세요:
> - **XLeRobot 일체형**(양팔 + 베이스) → `xlerobot/`으로
> - **단일 SO-101 / SO-100 암**, **LeKiwi** → `lerobot/`으로
>
> 이미지는 같은 환경이며, 두 경로는 언제든 전환할 수 있고 아무것도 다시 설치할 필요가 없습니다.

---

## 최단 경로 (일단 실행만 해보고 싶다면)

**Jetson에서(JetPack 7.2)**, 몇 개의 명령으로 먼저 로봇이 움직이는 것을 확인하고, 나중에 돌아와 세부 내용을 읽으세요:

```bash
# 1. Docker 설치(이미 설치했다면 건너뛰기)
curl -fsSL https://get.docker.com | sudo sh && sudo usermod -aG docker $USER

# 2. 컨테이너에 GPU 채널 열기(Jetson 전용, 한 번만 하면 됨)
sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml --disable-hook enable-cuda-compat
sudo systemctl restart docker

# 3. 이미지 받기(약 3.6 GB)
docker pull chenyang310/xlerobot:jetson

# 4. 컨테이너 시작
docker run -it --rm --device nvidia.com/gpu=all \
  --privileged --network host -v /dev:/dev \
  -v ~/.cache/huggingface:/home/jetson/.cache/huggingface \
  -e HF_ENDPOINT=https://hf-mirror.com \
  chenyang310/xlerobot:jetson

# 5. 컨테이너에서 원격 조작 실행(처음에는 자동으로 캘리브레이션 안내 시작)
python examples/4_xlerobot_teleop_keyboard.py
```

> ⚠️ 최단 경로는 **언젠가는 반드시 해야 할** 두 가지를 건너뜁니다. 막히면 해당 섹션을 다시 확인하세요:
> - **중국 본토용 미러 가속기**(3단계에서 막힐 수 있음) → [02-Environment-Setup §2](02-Environment-Setup.md)
> - **`--disable-hook enable-cuda-compat`는 생략할 수 없습니다**(이 훅은
>   JetPack 7.2에서 버그가 있어 컨테이너가 시작되지 않습니다) → [03-Deployment §4](03-Deployment.md)
>
> 위 5단계에서 실행하는 것은 **XLeRobot 일체형**의 예제입니다. 단일 SO-101 암만 있다면
> `lerobot-*` 명령줄로 바꿔서 사용하세요 — [lerobot/](../lerobot/01-Operation.md)을 참고하세요.

---

> **다음**: [02-Environment-Setup](02-Environment-Setup.md) — Docker 설치, 중국 본토 미러 설정, 하드웨어 연결
