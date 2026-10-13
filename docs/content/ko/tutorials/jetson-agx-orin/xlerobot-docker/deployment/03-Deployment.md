---
title: 03 · 배포
---

# 03 · 배포

> **이전**: [02-Environment-Setup](02-Environment-Setup.md)
> **다음은 두 경로 중 하나 선택**: [xlerobot/](../xlerobot/01-Operation.md)(일체형)
> 또는 [lerobot/](../lerobot/01-Operation.md)(단일 암 / LeKiwi)

이미지를 로컬로 받아 컨테이너를 시작합니다. 이 문서를 마치면 모든 환경이 갖춰진 셸에 들어가게 됩니다.

---

## 1. 이미지 받기

이미지는 단 하나입니다:

```bash
docker pull chenyang310/xlerobot:jetson
```

| | |
|---|---|
| 아키텍처 | `arm64` |
| 실행 환경 | Jetson + JetPack 7.2 |
| 다운로드 크기 | 약 3.6 GB(압축 해제 후에는 더 큼 — 20 GB의 여유 공간을 확보하세요) |
| 포함 내용 | 원격 조작, 캘리브레이션, 데이터 녹화, 학습, 추론, **GPU 가속** |

받았는지 확인:

```bash
docker images | grep xlerobot
```

`chenyang310/xlerobot`에 `jetson` 태그가 붙어 있어야 합니다.

> **중국 본토**: 그대로 받으면 됩니다 — 미러 가속기가 필요하지 않습니다. 느리다면
> [02-Environment-Setup](02-Environment-Setup.md) 2절을 참고하세요.

### 직접 빌드하기 (메인테이너용)

수정이 필요하거나 최신 소스 코드로 빌드하고 싶은 경우에 적합합니다.

```bash
git clone <이 저장소 주소> xlerobot-docker
cd xlerobot-docker

bash scripts/build.sh jetson
```

빌드 스크립트에는 이미 중국 본토용 소스(알리바바 클라우드 PyPI, 알리바바 클라우드 Ubuntu 미러)가 설정되어 있어,
**추가 설정 없이 중국 본토 네트워크에서 빌드할 수 있습니다**.

> 첫 빌드에서는 약 2 GB의 의존성을 다운로드하며, 느린 네트워크에서는 한두 시간이 걸립니다.
> `scripts/sync.sh`와 보드의 `wheels/` 캐시를 사용하면 이미 다운로드한 패키지를 재사용할 수 있습니다.

---

## 2. 이미지에 포함된 것

이미지 하나에 모든 것이 들어 있습니다:

- **원격 조작과 캘리브레이션** — 손으로 로봇을 움직이고 그 캘리브레이션을 저장
- **데이터 녹화와 재생**
- **학습** — ACT, Diffusion Policy, SmolVLA, π₀, π₀.₅, Wall-OSS
- **추론** — 학습된 정책을 로봇에서 실행, **GPU 가속**

---

## 3. 컨테이너 시작

### 3.1 스크립트로 시작 (권장)

저장소를 클론했다면:

```bash
bash scripts/run.sh jetson
```

스크립트에는 다음이 이미 설정되어 있습니다:

- **GPU** — `--device nvidia.com/gpu=all`(CDI)
- **디바이스 패스스루** — 시리얼 포트, 카메라, USB
- **네트워크** — `--network host`, VR 원격 조작과 웹 제어에 필요
- **소스 마운트** — 코드를 수정해도 이미지를 다시 빌드할 필요 없음
- **캐시 마운트** — 캘리브레이션 파일과 모델 다운로드가 유지됨

### 3.2 수동 시작

스크립트를 사용하지 않는다면, 최소한의 사용 가능한 명령:

```bash
docker run -it --rm \
  --name xlerobot \
  --device nvidia.com/gpu=all \
  --privileged \
  --network host \
  -v /dev:/dev \
  -v ~/.cache/huggingface:/home/jetson/.cache/huggingface \
  -v /tmp/.X11-unix:/tmp/.X11-unix \
  -e DISPLAY=$DISPLAY \
  -e HF_ENDPOINT=https://hf-mirror.com \
  chenyang310/xlerobot:jetson
```

**각 파라미터의 역할:**

| 파라미터 | 필요한 이유 |
|---|---|
| `--device nvidia.com/gpu=all` | **컨테이너에 GPU를 넘겨줍니다**(CDI를 통해). 이것이 없으면 GPU가 전혀 없습니다 |
| `--privileged` + `-v /dev:/dev` | 시리얼 포트(SO-101 서보), 카메라, USB 패스스루 |
| `--network host` | host/client 두 프로세스 통신(ZMQ) 및 VR 제어 |
| `-v ~/.cache/huggingface` | **캘리브레이션 파일**과 모델 캐시. 마운트하지 않으면 컨테이너를 다시 열 때마다 재캘리브레이션해야 함 |
| `-v /tmp/.X11-unix` + `-e DISPLAY` | 시각화를 실행할 때 사용(rerun 창 열기) |
| `-e HF_ENDPOINT` | 중국 본토에서는 `huggingface.co`에 전혀 접속할 수 없어 미러를 거쳐야 함 |

> 마운트 경로의 `/home/jetson`은 **이미지 내부**의 사용자 디렉터리입니다 — 하드코딩해도 맞습니다.
> 그 이미지의 사용자 이름이 `jetson`이기 때문입니다.

들어가면 bash 셸이 열리고, 작업 디렉터리는 `/opt/xlerobot`입니다.

---

## 4. GPU 파라미터 —— CDI 방식

이미지는 GPU를 **반드시** CDI로 할당해야 하며, **`--runtime nvidia`는 사용할 수 없습니다**:

```bash
docker run -it --rm \
  --device nvidia.com/gpu=all \
  --privileged --network host -v /dev:/dev \
  ... \
  chenyang310/xlerobot:jetson
```

처음 사용하기 전에 **호스트**에서 CDI 스펙을 생성해야 합니다:

```bash
sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml
sudo systemctl restart docker
```

> **겪었던 함정**: JetPack 7.2에서 `nvidia-container-toolkit 1.19.1`의
> `enable-cuda-compat` 훅이 크래시(`slice bounds out of range`)를 일으켜
> 컨테이너가 아예 시작되지 않습니다. 파라미터를 추가해 비활성화하면 됩니다:
> ```bash
> sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml \
>   --disable-hook enable-cuda-compat
> ```
> 컨테이너의 CUDA 버전이 호스트와 일치하면 이 훅은 필요하지 않습니다.

### GPU 사용 가능 여부 확인

```bash
python -c "import torch; print('GPU:', torch.cuda.is_available())"
```

---

## 5. 플랫폼별 참고 사항

### Jetson Orin 시리즈 —— ✅ 현재 정식 지원

| 모델 | 필요 | 설명 |
|---|---|---|
| **Orin Nano** | JetPack **7.2** | 우리가 실측에 사용한 보드(3.4 GB 메모리에서도 원격 조작 가능) |
| **Orin NX** | JetPack **7.2** | 위와 동일 |
| **AGX Orin / AGX Orin 64GB** | JetPack **7.2** | ⚠️ 7.0 / 7.1은 AGX Orin 64GB를 **지원하지 않으며**, 7.2가 필수입니다 |

**유일한 필수 요구 사항은 JetPack 버전입니다**: 이미지의 torch는 CUDA 13.0으로 컴파일되었고,
CUDA 13.x는 드라이버 **≥ 580**을 요구합니다.

| JetPack | L4T | CUDA | 드라이버 | 사용 가능? |
|---|---|---|---|---|
| 6.2 | 36.4.3 | 12.6 | 540.4.0 | ❌ 드라이버가 너무 오래됨 |
| **7.2** | 39.2 | 13.2 | 595 계열 | ✅ |

버전 확인:

```bash
cat /etc/nv_tegra_release
dpkg -l | grep nvidia-jetpack
```

> ⚠️ JetPack 6.x에서 7.x로 업그레이드할 때는 **`apt upgrade` / OTA를 사용할 수 없습니다**(OTA는 같은
> L4T 메이저 버전 안에서만 사용 가능). 반드시 전체 재플래시가 필요합니다.

### Jetson Nano(2019 원판) —— ❌ 영구 미지원

세 가지 독립적인 이유가 있으며, 셋 다 빠져나갈 수 없는 막다른 길입니다:

1. **CUDA 13에서 Maxwell 아키텍처가 통째로 삭제되었습니다**. 드라이버 R580이
   Maxwell / Pascal / Volta를 지원하는 마지막 브랜치이고, CUDA 13이 요구하는 것이 바로 580+입니다.
   Jetson Nano는 최대 JetPack 4.6.6 / CUDA 10.2까지만 가능합니다.
2. **연산 능력 5.3이 torch가 지원하는 하한보다 낮습니다**. 이 이미지에서 torch가 컴파일된 아키텍처는
   `sm_80 / sm_90 / sm_100 / sm_110 / sm_120` — 최소 sm_80인데,
   Jetson Nano는 sm_53이라 네이티브 kernel도 없고 PTX 즉시 컴파일도 닿지 않습니다.
3. **플랫폼이 EOL되었습니다**(JetPack 4는 2024년 11월에 유지보수가 종료되었습니다).

### 기타 플랫폼 —— ❌ 미지원

라즈베리 파이, 일반 x86 PC, Windows, macOS는 **이 이미지를 실행할 수 없습니다**. 이 이미지는
JetPack 7.2의 CUDA 스택을 기준으로 빌드되었고 `arm64`로만 배포되므로,
대신 사용할 수 있는 CPU 버전이 없습니다. Jetson Orin 보드를 사용하세요.

> 현재 환경을 확인: `uname -m`이 `aarch64`를 출력하고, `cat /etc/nv_tegra_release`가
> **R39**를 보고해야 합니다.

---

## 컨테이너에 들어간 후

먼저 자체 점검을 실행하세요:

```bash
python -c "import torch, lerobot; print('torch', torch.__version__); print('lerobot', lerobot.__version__)"
```

예상 출력:

```
torch 2.11.0+cu130
lerobot 0.6.2
```

> ⚠️ **`xlerobot`과 `xlerobot_mecanum`은 같은 프로세스에 함께 둘 수 없습니다** — 둘 다 소스 코드에서
> `"xlerobot"`으로 등록되기 때문입니다(XLeRobot 업스트림의 버그). 그러면 다음 오류가 발생합니다:
> `Cannot register ... as xlerobot because ... already registered`.
>
> 다른 조합은 모두 문제없습니다: **원본 LeRobot의 로봇과 XLeRobot은 같은 프로세스에 공존할 수 있습니다**
> (실측에서 8개 유형이 동시에 등록 성공). `xlerobot_2wheels`도 충돌하지 않습니다.
> 로봇 한 대에는 변형 하나만 사용하므로, 정상적인 사용에는 영향이 없습니다.

---

> **다음은 두 경로 중 하나 선택**: [xlerobot/](../xlerobot/01-Operation.md) 일체형 ·
> [lerobot/](../lerobot/01-Operation.md) 단일 암 / LeKiwi
