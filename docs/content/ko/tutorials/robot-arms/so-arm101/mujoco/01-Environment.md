---
title: "01 · 환경 준비"
description: "일회성 작업입니다. 이 저장소는 uv로 프로젝트 내부에 격리된 ."
---

# 01 · 환경 준비

일회성 작업입니다. 이 저장소는 **uv로 프로젝트 내부에 격리된 `.venv`를 관리**합니다——`uv run`은 이 디렉터리의 환경만 사용하며,
여러분의 conda는 건드리지 않습니다(이 설계는 의도된 것입니다. [07 자주 발생하는 문제](/ko/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting) 참조).

## 설치

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'   # 本机特例，见 07

# CPU 版 torch（本机无独显；有 NVIDIA GPU 的机器去掉 UV_TORCH_BACKEND 并参考 pyproject 注释换 CUDA 版）
UV_TORCH_BACKEND=cpu uv sync --frozen --extra core_scripts --extra feetech --extra pynput-dep --extra training
```

네 가지 extra의 용도:

| extra | 제공하는 것 | 필요한 대상 |
| --- | --- | --- |
| `core_scripts` | 공식 record / teleoperate / calibrate / replay 진입점 + 데이터셋 + 시각화 의존성 | 전체 |
| `feetech` | `scservo_sdk`(STS3215 서보 시리얼 프로토콜) | 실기 관련 작업 |
| `pynput-dep` | 전역 키보드 리스닝 | 키보드 텔레오퍼레이션, 녹화 에피소드 제어 키 |
| `training` | `accelerate` / `wandb` 등 | `lerobot-train` 학습, 정책 배포(`lerobot-rollout`) |

필요할 때 MuJoCo를 임시로 덧붙입니다(잠금 파일에는 들어가지 않고, 필요할 때 로드):

```bash
# 末尾换成你要运行的脚本；下面这条是仿真遥操的例子
uv run --frozen --with mujoco python examples/so101_mujoco/teleoperate.py
```

세 부분을 읽는 법: `uv run`은 이 저장소의 `.venv`로 명령을 실행합니다; `--frozen`은 `uv.lock`에 따라 잠긴
버전을 엄격히 사용하고 의존성을 다시 해석하지 않습니다; `--with mujoco`는 **이번 명령에만** MuJoCo 패키지를
임시로 덧붙입니다——다음 명령에 포함하지 않으면 환경에 존재하지 않으므로, 02–09의 시뮬레이션 명령에는 모두 이 접두사가 붙습니다.

이 장을 마치면 02–09의 모든 명령을 바로 실행할 수 있습니다: `training` extra(학습/배포에 필요)는 위의
`uv sync`에 이미 포함되어 있으며, 이후 **어떤 의존성도 추가 설치할 필요가 없습니다**.

**conda 환경으로 바꾸고 싶다면**? 그렇다면 실행 명령에 `uv run` 접두사가 필요 없습니다——환경을 만드는 세 명령과 주의점은
[09 전체 사용 튜토리얼 · 부록 A](/ko/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial)를 참조하세요.

## 검증

```bash
uv run --frozen --with mujoco python -c "import mujoco, scservo_sdk, pynput, lerobot, torch; print('OK')"
uv run --frozen lerobot-calibrate --help | head -3   # 官方入口可用
```

## 자주 발생하는 문제

- **`uv sync`에서 `failed to persist temporary file ... os error 17`**: 이 머신의 uv 캐시 디렉터리가
  드라이브를 넘는 Windows 특례입니다. 위의 `UV_CACHE_DIR` 접두사를 사용하면 되며, 자세한 내용은 [07](/ko/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting) 참조.
- **Microsoft Store 버전 Python을 사용하지 마세요**: uv가 자동 관리하는 Python 3.12를 선택하면 됩니다.
- 처음 `uv run --with mujoco`를 실행하면 약 5.6MB의 mujoco wheel을 다운로드하며, 이후에는 캐시를 사용합니다.

<RelatedProducts slugs="so-arm101" />
