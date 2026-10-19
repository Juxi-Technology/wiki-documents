---
title: "09 · 전체 사용 튜토리얼(암 준비 → 데이터셋 → 영상 확인 → 학습 → 배포)"
---

# 09 · 전체 사용 튜토리얼(암 준비 → 데이터셋 → 영상 확인 → 학습 → 배포)

> 원스톱 운영 매뉴얼: 한 번 따라 하면 "리더 암 연결"부터 "학습된 정책이 시뮬레이션에서 스스로 작업"까지 갈 수 있습니다.
> 이 문서는 장 순서대로 실행하면 됩니다——모든 의존성(학습용 `training` extra 포함)이 [01](/ko/tutorials/robot-arms/so-arm101/mujoco/01-Environment)에서
> 한 번에 설치되며, 중간에 아무것도 추가 설치할 필요가 없습니다.
> 전제: 환경은 [01](/ko/tutorials/robot-arms/so-arm101/mujoco/01-Environment)대로 설치되었고, 리더 암은 [03](/ko/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration)대로 캘리브레이션되었습니다
> (이 머신은 `juxi_leader` / COM124). 녹화 관련 함정은 모두 [07](/ko/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)에 모여 있습니다.

## 0 · 일회성 준비

```bash
# 本机所有 uv 命令都要先设（跨盘缓存特例，见 07）
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'
```

리더 암을 연결하고 시리얼 포트를 확인하세요(**연결할 때마다 번호가 바뀔 수 있음**):

```bash
uv run --frozen python -c "from serial.tools import list_ports; print([p.device for p in list_ports.comports()])"
```

책상에 공간을 확보하세요: 녹화 시 **창 3개**가 뜹니다(주 시점 + `wrist camera - live` + `top camera - live`).

## 1 · 텔레오퍼레이션 워밍업(권장)

```bash
uv run --frozen --with mujoco python examples/so101_mujoco/teleoperate.py \
    --robot.type=so101_mujoco \
    --teleop.type=so101_leader_trim --teleop.port=COM124 --teleop.id=juxi_leader \
    --teleop.use_degrees=false
```

리더 암을 움직여 시뮬레이션 암이 잘 따라오는지 확인하세요; 종료(Ctrl-C) 전에 리더 암을 **중간 자세 근처**에 멈춰 두면 녹화 시작 순간 큰 수렴 구간이 생기지 않습니다.

## 2 · 녹화(핵심 명령)

```bash
uv run --frozen --with mujoco python examples/so101_mujoco/record.py \
    --robot.image_camera=sim_cam --robot.top_camera=top_cam \
    --teleop.type=so101_leader_trim --teleop.port=COM124 --teleop.id=juxi_leader \
    --teleop.use_degrees=false \
    --dataset.repo_id=local/so101_sim_vision \
    --dataset.root=examples/so101_mujoco/outputs/datasets/so101_sim_vision \
    --dataset.num_episodes=5 --dataset.episode_time_s=600 --dataset.reset_time_s=10 \
    --dataset.single_task="put the cube in the box" \
    --dataset.video=true --dataset.push_to_hub=false --play_sounds=false --dataset.no_stamp=true
```

요점(나머지 매개변수는 [06](/ko/tutorials/robot-arms/so-arm101/mujoco/06-Record-and-Replay) 매개변수 표 참조):

| 항목 | 설명 |
| --- | --- |
| `--dataset.root` | **root가 곧 데이터셋 디렉터리 자체입니다**, 세션마다 새 디렉터리로 바꾸세요(같은 이름의 디렉터리가 있으면 시작이 거부됨) |
| 자동 주입되는 기본값 | 비디오 인코딩 `h264`, 인코딩 스레드 `2`——`record.py` 시작 시 두 줄의 안내를 출력; `--dataset.rgb_encoder.vcodec=...` / `--dataset.encoder_threads=...`를 명시하면 덮어쓸 수 있음(이유는 07 참조) |
| 미리보기 창 | 기본 켜짐(15Hz, `--robot.preview_cameras=false`로 끄기 가능; `--robot.preview_fps`로 조정) |
| `--dataset.video=true` | 듀얼 카메라 화면을 데이터셋에 저장(`observation.images.wrist / top`); 손목 카메라만 원하면 `top_camera`를 제거 |

## 3 · 녹화 중 조작

| 키 | 역할 |
| --- | --- |
| `→` 또는 `n` | 현재 에피소드를 종료하고 저장 |
| `←` 또는 `r` | 현재 에피소드를 버리고 제자리에서 다시 녹화 |
| `q` | 세션 전체 종료, 데이터셋 저장 |

- 에피소드 종료 후 **블록이 자동으로 제자리로 돌아갑니다**. 리더 암만 시작 자세로 되돌리면 됩니다; `Recording episode N`이 보이면 다음 에피소드 동작을 시작하세요.
- 저장 단계(수십 초)에는 콘솔에 `[record.py] reset done; saving the episode + encoding videos now`가 출력됩니다——
  이 동안 **키 입력은 안전하게 무시**되므로(잘못 눌러도 어떤 에피소드도 망가지지 않음), 다음 줄 `Recording episode`가 나타난 뒤 조작하세요.
- 인코딩 실패에는 **자동 재시도 안전장치**가 있습니다(`video encode failed ... retrying once` 출력 후 3초 뒤 자동 재시도); 이미 저장된 에피소드는 절대 유실되지 않습니다.

## 4 · 점검

```bash
uv run --frozen python examples/so101_mujoco/inspect_dataset.py \
    --repo-id local/so101_sim_vision \
    --root examples/so101_mujoco/outputs/datasets/so101_sim_vision
```

출력 읽는 법:

- **action span이 전부 0(또는 그리퍼가 0)인 에피소드**는 빈 녹화/무효 녹화이므로 삭제하고 다시 녹화하세요;
- **에피소드 시작의 `max |act-obs|`가 큰 것**은 수렴 구간으로 정상입니다; 중후반은 ~10 단위 미만이어야 합니다.

## 5 · 영상 확인

```bash
uv run --frozen python examples/so101_mujoco/export_videos.py \
    --root examples/so101_mujoco/outputs/datasets/so101_sim_vision
```

산출물:

- `examples/so101_mujoco/outputs/videos/so101_sim_vision/epN_top.mp4`, `epN_wrist.mp4` —— **에피소드마다 카메라별로 더블클릭 재생 가능한 영상 하나**;
- `examples/so101_mujoco/outputs/renders/so101_sim_vision_epN_dual.png` —— 에피소드마다 모자이크 한 장(위쪽 줄 탑뷰, 아래쪽 줄 손목, 균일 샘플링 6프레임), 빠른 육안 점검용(`--no-strips`로 건너뛰기 가능).

데이터셋 안에도 원본 패키징 영상이 있습니다(여러 에피소드가 순서대로 한 파일에 이어짐):
`outputs/datasets/so101_sim_vision/videos/observation.images.{top,wrist}/chunk-000/file-000.mp4`.

## 6 · 리플레이(선택)

```bash
uv run --frozen --with mujoco python examples/so101_mujoco/replay.py \
    --dataset.repo_id=local/so101_sim_vision \
    --dataset.root=examples/so101_mujoco/outputs/datasets/so101_sim_vision --dataset.episode=0
```

## 7 · 학습

```bash
uv run --frozen lerobot-train \
    --policy.type=act \
    --policy.push_to_hub=false \
    --dataset.repo_id=local/so101_sim_vision \
    --dataset.root=examples/so101_mujoco/outputs/datasets/so101_sim_vision \
    --output_dir=examples/so101_mujoco/outputs/train/act_so101_sim_vision \
    --steps=100000 --batch_size=8 --save_freq=20000 --log_freq=200 \
    --num_workers=4 --wandb.enable=false --policy.device=cpu
```

| 요점 | 설명 |
| --- | --- |
| `--policy.type` | 정책 유형, **`act`로 시작**(이 데이터 규모/작업에 가장 적합); `ls src/lerobot/policies/`로 다른 선택지(diffusion / smolvla / pi0 등) 확인 가능 |
| `--policy.push_to_hub=false` | **필수**——기본값은 HuggingFace Hub 푸시를 원하며, `repo_id`가 없으면 바로 오류로 종료됩니다; 푸시하려면 `--policy.repo_id=你的用户名/模型名`으로 바꾸세요(먼저 `hf auth login` 필요) |
| `--policy.device=cpu` | 이 머신은 내장 GPU가 없어 `cpu` 사용; NVIDIA GPU가 있는 머신은 해당 매개변수를 삭제(cuda 자동 사용) |
| 산출물 | 학습 디렉터리에 `checkpoints/last/pretrained_model/`(최신, **배포 시 이곳을 가리킴**)과 저장 스텝별 이름의 이력 스냅샷(예: `checkpoints/000012/`)이 생성됩니다; 이어 학습용 `train_config.json`은 `pretrained_model/` 안에 있습니다 |
| 이어 학습 | 중단 후 원래 명령에 추가: `--resume=true --config_path=examples/so101_mujoco/outputs/train/act_so101_sim_vision/checkpoints/last/pretrained_model/train_config.json`(경로는 위 명령의 `--output_dir` 아래 위치) |

**이 머신 속도 예상**: 순수 CPU에서 약 **2초/스텝**(batch 2, 480p 듀얼 카메라; 실측 12스텝 스모크에서 loss가 70에서 22로 하강, 방향 정상).
따라서 이 머신은 소수 스텝으로 파이프라인을 검증하는 데 적합합니다——튜토리얼에 포함된 `outputs/train/smoke_act`가 바로 12스텝의 산출물입니다;
**정식 학습은 GPU가 있는 머신으로 바꾸는 것을 권장**(ACT 일반 10만 스텝 규모, 명령은 완전히 동일).

> 의존성 안내: 학습에 필요한 `training` extra(accelerate 등)는 [01](/ko/tutorials/robot-arms/so-arm101/mujoco/01-Environment)의 일회성
> 설치에 이미 포함되어 있으므로, 이 장에는 추가 설치 단계가 필요 없습니다.

## 8 · 배포(정책이 시뮬레이션에서 스스로 작업하게 하기)

```bash
uv run --frozen --with mujoco python examples/so101_mujoco/rollout.py \
    --policy.path=examples/so101_mujoco/outputs/train/act_so101_sim_vision/checkpoints/last/pretrained_model \
    --strategy.type=base \
    --robot.image_camera=sim_cam --robot.top_camera=top_cam \
    --task="put the cube in the box" --duration=30
```

| 요점 | 설명 |
| --- | --- |
| 카메라 매개변수 | `--robot.image_camera/--robot.top_camera`는 **데이터셋 녹화 시와 반드시 일치해야 합니다**(sim_cam + top_cam), 그렇지 않으면 정책이 학습한 화면을 받지 못합니다 |
| `--task` | 녹화 시의 `--dataset.single_task`와 일치 |
| `--duration` | 몇 초 동안 실행 후 자동 종료(종료 전에 로봇 암을 초기 자세로 복귀한 뒤 연결 해제); 중간에 `Ctrl-C`로도 중지 가능 |
| 링크를 먼저 시험하려면 | 튜토리얼 포함 데모 모델 사용: `--policy.path=examples/so101_mujoco/outputs/train/smoke_act/checkpoints/last/pretrained_model`(12스텝 학습, 동작이 거의 무작위에 가까워 파이프라인만 검증) |
| 순수 CPU 배포 | 정책 추론에서 간헐적으로 0.5s 스파이크가 생겨 `Control loop is running slower ... than the target FPS` 안내가 나옵니다——시뮬레이션에서 돌아가긴 하지만 끊깁니다; GPU에서는 이 문제가 없습니다(실측 20s 스모크 전 구간 실행, 정상 종료) |
| 실기 배포 | `--robot.*`을 실기로 교체: `--robot.type=so101_follower --robot.port=COMxx --robot.id=juxi_so101 --robot.use_degrees=false`(책상에 공간 확보 주의) |
| 기타 모드 | `--strategy.type=sentry / highlight / dagger / episodic`: 실행하며 녹화 / 링 버퍼 키 저장 / 인간 개입 교정 / 에피소드 단위 녹화, `lerobot-rollout --help` 참조 |

## 부록 A · conda 환경으로 바꾸기(선택)

이 저장소는 기본적으로 **uv가 관리하는 프로젝트 내 `.venv`**를 사용하며([01](/ko/tutorials/robot-arms/so-arm101/mujoco/01-Environment) 참조), 실행 명령에는 모두
`uv run --frozen --with mujoco` 접두사가 필요합니다. conda가 더 익숙하다면, **환경 만들기 단계를 아래 세 명령으로 바꾸고**,
이후 **모든 명령에서 uv 접두사를 제거**하면 됩니다(`python examples/...`로 바로 실행). `UV_CACHE_DIR`도 더 이상 필요 없습니다
(그것은 uv의 크로스 드라이브 캐시 특례로, conda와 무관):

```bash
# 一次性：在仓库根目录建好环境（python 版本对齐 01 的 3.12）
conda create -n lerobot-sim python=3.12 -y
conda activate lerobot-sim
pip install -e .            # 安装本仓库 lerobot 及其依赖（含 torch，Windows 上 pip 默认就是 CPU 版）
pip install "mujoco==3.16"  # uv 路线用 --with mujoco 临时提供，conda 路线装成常驻依赖
```

이후 예를 들어 녹화는 이렇게 됩니다:

```bash
python examples/so101_mujoco/record.py --robot.image_camera=sim_cam ...
```

두 가지 주의점:

1. **버전 정렬**: `pip install -e .`는 pip이 버전을 자체 해석하므로 `uv.lock`과 완전히 일치하지 않을 수 있습니다;
   현재 실측 환경과 한 글자도 다르지 않은 조합을 원하면 uv로 conda 환경에 잠금 파일대로 설치하세요:

   ```bash
   uv pip sync uv.lock --python "$(conda run -n lerobot-sim python -c 'import sys; print(sys.executable)')"
   pip install "mujoco==3.16"
   ```

2. 리더 암의 캘리브레이션 캐시는 `~/.cache/huggingface/lerobot/calibration/`에 저장되며, 어떤 환경을 쓰든 무관하므로 환경을 옮겨도 다시 캘리브레이션할 필요가 없습니다.

## 부록 B · 자주 겪는 함정 빠른 조회

| 증상 | 한 줄 요약 |
| --- | --- |
| 시리얼 포트를 열 수 없음 | 먼저 포트를 나열하세요, 번호가 바뀌었을 수 있습니다(0단계) |
| 저장 시 콘솔이 수십 초 조용함 | 인코딩 중이며 정상입니다; `saving the episode...` 안내가 보이면 키를 누르지 마세요 |
| 녹화 중 화면이 간헐적으로 끊김 | 저장 구간의 인코딩 자원 경쟁; 제어 루프 자체는 영향 없음(cadence 수치 기준), 상세는 07 |
| 한 번 크래시했는데 복구 가능? | 저장된 에피소드는 절대 유실되지 않음; `record.py --resume=true ... --dataset.num_episodes=N`으로 이어서 녹화 |
| `lerobot-train`이 `'repo_id' argument missing` 오류 | 기본값이 Hub 푸시를 원함: `--policy.push_to_hub=false` 추가(푸시하려면 `--policy.repo_id` 설정 후 먼저 `hf auth login`) |
| 배포 시 정책이 움직이지 않거나 엉뚱하게 움직임 | 먼저 `--robot.image_camera/--robot.top_camera`와 `--task`가 녹화 시와 일치하는지 확인; 다음으로 학습 스텝이 매우 적지 않은지 확인 |

모든 함정과 해법(메모리 부족, 인코딩 OOM, 빈 에피소드 등)은 [07 · 자주 발생하는 문제](/ko/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)를 참조하세요.

<RelatedProducts slugs="so-arm101" />
