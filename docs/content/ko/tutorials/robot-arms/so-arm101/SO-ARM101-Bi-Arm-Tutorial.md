---
title: SO-ARM101 양팔(듀얼 팔로워 암) 튜토리얼
description: "SO-ARM101 양팔 튜토리얼: 리더·팔로워 4개 암의 배선과 캘리브레이션, 양팔 텔레오퍼레이션, 데이터셋 기록, ACT 학습과 실제 배포 전 과정을 다룹니다."
---

# SO-ARM101 양팔(듀얼 팔로워 암) 튜토리얼

> **[스토어에서 구매](https://www.juxitech.com/ko/products/so-arm101-developers-kit)**

본 가이드는 LeRobot으로 양팔 SO-ARM 로봇 시스템을 학습시키는 전체 흐름을 소개합니다: 하드웨어 연결, 양팔 캘리브레이션, 양팔 텔레오퍼레이션, 데이터셋 녹화와 관리, ACT 정책 학습 및 실제 로봇 배포를 포함합니다. 본 가이드대로 진행하면 리더 암 두 개와 팔로워 암 두 개로 시연 데이터를 수집하고, 모방 학습 정책을 학습시켜 실제 로봇 암에서 실행할 수 있습니다.

먼저 다음과 같이 케이블을 연결합니다:

| 역할 | 포트 |
| --- | --- |
| 왼쪽 팔로워 암 | `/dev/ttyACM0` |
| 오른쪽 팔로워 암 | `/dev/ttyACM1` |
| 왼쪽 리더 암 | `/dev/ttyACM2` |
| 오른쪽 리더 암 | `/dev/ttyACM3` |

팔로워 암 유형은 `so101_follower`, 리더 암 유형은 `so101_leader`입니다(LeRobot에서 `so100_leader`와 `so101_leader`는 같은 구현을 공유).

## 사전 준비

### 의존성 설치

환경 설치는 [SO-ARM101 사용 튜토리얼](./SO-ARM101-Tutorial.md)을 참조하세요.

### USB 권한

```bash
sudo chmod 666 /dev/ttyACM0 /dev/ttyACM1 /dev/ttyACM2 /dev/ttyACM3
```

## 1. 캘리브레이션(핵심 단계)

### 1.1 왼쪽 팔로워 암 캘리브레이션

```bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_so101_bi_follower_left
```

### 1.2 오른쪽 팔로워 암 캘리브레이션

```bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower_right
```

### 1.3 왼쪽 리더 암 캘리브레이션

```bash
lerobot-calibrate \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM2 \
  --teleop.id=my_so101_bi_leader_left
```

### 1.4 오른쪽 리더 암 캘리브레이션

```bash
lerobot-calibrate \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader_right
```

캘리브레이션이 완료되면 파일은 다음 위치에 저장됩니다:

```text
~/.cache/huggingface/lerobot/calibration/robots/so_follower/my_so101_bi_follower_left.json
~/.cache/huggingface/lerobot/calibration/robots/so_follower/my_so101_bi_follower_right.json
~/.cache/huggingface/lerobot/calibration/teleoperators/so_leader/my_so101_bi_leader_left.json
~/.cache/huggingface/lerobot/calibration/teleoperators/so_leader/my_so101_bi_leader_right.json
```

> 디렉터리 이름 설명: `so101_follower`과 `so100_follower`, `so101_leader`와 `so100_leader`는 같은 구현을 공유하므로 디렉터리는 `so_follower` / `so_leader`로 통일됩니다; 리더 암은 teleoperator에 속하므로 캘리브레이션 파일이 `robots/`가 아니라 `teleoperators/` 아래에 있습니다.

### (선택) 이전에 다른 ID로 캘리브레이션한 경우

예를 들어 이전에 `my_awesome_follower_arm1`, `my_awesome_follower_arm2` 등을 사용했다면 캘리브레이션 파일을 복사할 수 있습니다:

```bash
CAL_DIR=~/.cache/huggingface/lerobot/calibration

cp $CAL_DIR/robots/so_follower/my_awesome_follower_arm1.json \
   $CAL_DIR/robots/so_follower/my_so101_bi_follower_left.json

cp $CAL_DIR/robots/so_follower/my_awesome_follower_arm2.json \
   $CAL_DIR/robots/so_follower/my_so101_bi_follower_right.json

cp $CAL_DIR/teleoperators/so_leader/my_awesome_leader_arm3.json \
   $CAL_DIR/teleoperators/so_leader/my_so101_bi_leader_left.json

cp $CAL_DIR/teleoperators/so_leader/my_awesome_leader_arm4.json \
   $CAL_DIR/teleoperators/so_leader/my_so101_bi_leader_right.json
```

## 2. 양팔 텔레오퍼레이션

### 2.1 카메라 없이

```bash
lerobot-teleoperate \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --display_data=true
```

### 2.2 카메라 포함

`lerobot-find-cameras opencv`로 카메라 인덱스를 확인할 수 있으며, 카메라는 직접 추가하거나 줄일 수 있습니다.

```bash
lerobot-teleoperate \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --display_data=true
```

### 안전 수칙

- 주변 환경에 주의하여 팔로워 암의 충돌을 피하세요.

## 3. 데이터셋 녹화

### 3.1 로컬에 저장(Hub에 업로드하지 않음)

`--dataset.root`(데이터가 기록될 디렉터리)와 `--dataset.push_to_hub=false`를 추가하고, `--dataset.no_stamp=true`를 넣어 데이터셋 이름을 안정적으로 유지하세요(그렇지 않으면 `repo_id`에 타임스탬프가 자동으로 추가되어 이후 이어서 녹화/재생/학습 시 찾을 수 없게 됩니다).

> 참고: `repo_id`에는 `/`를 포함하는 것을 권장합니다(`사용자이름/데이터셋이름` 형태), 로컬 데이터셋은 실제로 업로드되지 않습니다.

```bash
lerobot-record \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --dataset.push_to_hub=false \
  --dataset.no_stamp=true \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.num_episodes=50 \
  --dataset.fps=30 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=10 \
  --dataset.video=true \
  --display_data=true
```

> 비디오 인코딩은 기본값이 이미 `libsvtav1`이라 지정할 필요가 없습니다; 사용자 정의가 필요하면 `--dataset.rgb_encoder.vcodec=h264` 같은 중첩 매개변수를 사용하세요.

데이터는 `./datasets/bi_so101_task/`에 저장되며 구조는 다음과 같습니다:

```text
├── meta/
│   ├── info.json         # 데이터셋 정보(fps, 특성 형상 등)
│   ├── episodes/         # 에피소드별 메타데이터(chunk-000/...)
│   ├── stats.json        # 각 특성의 정규화 통계
│   └── tasks.parquet     # 작업 텍스트 → task_index
├── data/                 # 프레임별 특성 데이터(chunk-*.parquet)
└── videos/               # 카메라마다 하위 디렉터리 하나(chunk-*.mp4)
```

### 3.2 Hugging Face Hub에 업로드

자동 업로드를 원하면 `HF_USER`를 유지하고 `root`와 `push_to_hub=false`를 제거하세요(기본적으로 업로드됩니다). 포트와 카메라 인덱스는 배선 표와 일치하게 유지하세요:

```bash
export HF_USER=your_hf_username

lerobot-record \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --dataset.repo_id=${HF_USER}/bi_so101_task \
  --dataset.no_stamp=true \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.num_episodes=50 \
  --dataset.fps=30 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=10 \
  --dataset.video=true \
  --display_data=true
```

> 업로드된 Hub 저장소 이름은 `${HF_USER}/bi_so101_task`이며, 아래 4.2에서 Hub로 학습할 때 사용하는 `repo_id`와 일치합니다. 로컬 사본은 먼저 `~/.cache/huggingface/lerobot/${HF_USER}/bi_so101_task/`에 저장됩니다.

### 3.3 계속 수집(이어서 녹화)

녹화 도중 예기치 않게 종료되었거나(예: 우클릭으로 종료할 때 reset 단계에 있었던 경우), 여러 번에 나누어 수집을 완료하고 싶다면 `--resume`을 사용해 같은 데이터셋에 에피소드를 계속 추가할 수 있습니다.

**참고**:

- `--resume=true`를 반드시 추가해야 합니다. 그렇지 않으면 `LeRobotDataset.create()`가 디렉터리가 이미 존재한다는 오류를 냅니다.
- 이어서 녹화하는 명령의 `--dataset.root`와 `--dataset.repo_id`는 최초 녹화(3.1)와 완전히 일치해야 합니다(`resume`은 명시적 `root`를 강제 요구).
- `--dataset.num_episodes`는 **이번에 몇 조를 녹화할지**를 의미하며, 전체 목표가 아닙니다. 예를 들어 15조를 이미 녹화했고 50조를 채우고 싶다면 `35`라고 씁니다.
- 종료할 때는 가능한 한 에피소드 녹화 중이거나 자연스럽게 끝난 뒤에 종료하여, "Reset the environment" 단계에서 종료하지 마세요(빈 에피소드 저장 실패를 유발).

```bash
lerobot-record \
  --resume=true \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --teleop.type=bi_so_leader \
  --teleop.left_arm_config.port=/dev/ttyACM2 \
  --teleop.right_arm_config.port=/dev/ttyACM3 \
  --teleop.id=my_so101_bi_leader \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --dataset.push_to_hub=false \
  --dataset.no_stamp=true \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.num_episodes=35 \
  --dataset.fps=30 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=10 \
  --dataset.video=true \
  --display_data=true
```

### 3.4 에피소드 재생과 삭제

#### 지정 에피소드 재생

```bash
lerobot-replay \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --dataset.episode=24
```

> `episode`는 0-based 인덱스이며, `24`는 25번째 에피소드를 의미합니다.

#### 지정 에피소드 삭제

```bash
python -m lerobot.scripts.lerobot_edit_dataset \
  --repo_id=juxi/bi_so101_task \
  --root=./datasets/bi_so101_task \
  --operation.type=delete_episodes \
  --operation.episode_indices="[24]"
```

삭제하면 데이터셋이 제자리에서 다시 쓰이고, 원본 데이터는 `./datasets/bi_so101_task_old/`로 백업됩니다. 새 데이터셋에 문제가 없는지 확인한 뒤 백업을 수동으로 삭제할 수 있습니다:

```bash
rm -rf ./datasets/bi_so101_task_old
```

#### 전체 데이터셋 삭제

```bash
rm -rf ./datasets/bi_so101_task
```

## 4. ACT 학습

### 4.1 로컬 데이터셋에서 학습

```bash
lerobot-train \
  --dataset.repo_id=juxi/bi_so101_task \
  --dataset.root=./datasets/bi_so101_task \
  --policy.type=act \
  --policy.device=cuda \
  --steps=60000 \
  --output_dir=outputs/train/act_bi_so101 \
  --wandb.enable=false \
  --policy.push_to_hub=false
```

> `--dataset.root`는 3.1에서 녹화한 데이터셋 디렉터리를 가리킵니다(`repo_id`는 녹화 시와 일치해야 함). `--output_dir` 디렉터리가 이미 존재하면 곧바로 `FileExistsError`가 나므로, 새로운 출력 디렉터리로 바꾸거나 `--resume=true`로 이어서 학습하세요.

### 4.2 Hugging Face Hub에서 학습

```bash
export HF_USER=your_hf_username

lerobot-train \
  --dataset.repo_id=${HF_USER}/bi_so101_task \
  --policy.type=act \
  --policy.device=cuda \
  --steps=100000 \
  --output_dir=outputs/train/act_bi_so101 \
  --wandb.enable=false \
  --policy.push_to_hub=false
```

> 위에서는 ACT의 기본 매개변수(`chunk_size=100`, `dim_model=512` 등)를 사용했습니다.

> `repo_id`는 3.2에서 업로드한 저장소 이름과 일치해야 합니다(3.2에서 `--dataset.no_stamp=true`를 추가했으므로 저장소 이름은 `${HF_USER}/bi_so101_task`로 고정). 학습 시에는 `--dataset.root`가 필요 없으며, Hub에서 자동으로 다운로드합니다.

## 5. 실제 로봇 배포

> 주의: `lerobot-record`는 시연 데이터 수집에만 사용합니다. 학습된 정책 배포에는 `lerobot-rollout`을 사용하세요——현재 버전의 `lerobot-record`는 `--policy.path`를 더 이상 받지 않고, `eval_` 접두사가 붙은 데이터셋 이름도 거부합니다.

### 5.1 현장 평가(데이터 녹화 없음)

```bash
lerobot-rollout \
  --strategy.type=base \
  --policy.path=outputs/train/act_bi_so101/checkpoints/last/pretrained_model \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --task="Pick the cube with left arm and hand it to right arm" \
  --duration=60 \
  --display_data=true
```

- `--duration`은 실행 초 수이며, `0`은 시간 제한 없음을 의미합니다.
- 중간에 개입/중지하려면 `--interactive=true`를 추가하고 터미널에서 `/stop`, `/reset` 등의 명령으로 제어하세요.

### 5.2 평가와 데이터 녹화(로컬)

`episodic` 전략 사용(동작은 구버전 `lerobot-record`와 유사하게 에피소드 단위로 녹화하고 reset 단계 포함):

```bash
lerobot-rollout \
  --strategy.type=episodic \
  --policy.path=outputs/train/act_bi_so101/checkpoints/last/pretrained_model \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --dataset.repo_id=juxi/rollout_bi_so101_task \
  --dataset.root=./datasets/rollout_bi_so101_task \
  --dataset.no_stamp=true \
  --dataset.num_episodes=10 \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.fps=30 \
  --display_data=true
```

> 배포 데이터셋 이름은 반드시 `rollout_`으로 시작해야 합니다(현재 버전의 강제 규칙). 로컬에 녹화할 때는 `--dataset.root`와 `--dataset.no_stamp=true`를 추가해 디렉터리 이름에 타임스탬프가 붙는 것을 피하는 것을 권장합니다.

### 5.3 평가 데이터를 Hugging Face Hub에 업로드

```bash
export HF_USER=your_hf_username

lerobot-rollout \
  --strategy.type=episodic \
  --policy.path=outputs/train/act_bi_so101/checkpoints/last/pretrained_model \
  --robot.type=bi_so_follower \
  --robot.left_arm_config.port=/dev/ttyACM0 \
  --robot.right_arm_config.port=/dev/ttyACM1 \
  --robot.id=my_so101_bi_follower \
  --robot.left_arm_config.cameras='{
    left_wrist: {"type": "opencv", "index_or_path": 2, "width": 640, "height": 480, "fps": 30}
  }' \
  --robot.right_arm_config.cameras='{
    right_wrist: {"type": "opencv", "index_or_path": 4, "width": 640, "height": 480, "fps": 30}
  }' \
  --dataset.repo_id=${HF_USER}/rollout_bi_so101_task \
  --dataset.no_stamp=true \
  --dataset.num_episodes=10 \
  --dataset.single_task="Pick the cube with left arm and hand it to right arm" \
  --dataset.fps=30 \
  --display_data=true
```

## 6. 자주 묻는 질문

| 문제 | 원인 | 해결 방법 |
| --- | --- | --- |
| 텔레오퍼레이션 시 재캘리브레이션 안내 | `bi_so_follower`가 `_left` / `_right` 접미사의 캘리브레이션 파일을 찾지 못함 | `_left` / `_right`가 붙은 ID로 다시 캘리브레이션하거나 기존 캘리브레이션 파일을 복사 |
| 리더 암을 끌 수 없음 | leader 토크가 꺼지지 않음 | 다시 캘리브레이션하거나 모터 점검 |
| 이어서 수집할 때 디렉터리 존재 오류 | `--resume=true`를 추가하지 않음 | `lerobot-record` 명령에 `--resume=true` 추가 |
| `--resume=true` 시 `root`를 요구하는 오류 | 이어서 녹화는 데이터셋 디렉터리를 명시적으로 지정해야 함 | 이어서 녹화 명령에 `--dataset.root=./datasets/bi_so101_task` 추가, 최초 녹화와 일치시킬 것 |
| 데이터셋 디렉터리 이름에 타임스탬프가 붙어 재생/학습이 찾지 못함 | 녹화 시 `no_stamp`를 설정하지 않아 `repo_id`에 타임스탬프가 자동 추가됨 | 녹화/이어서 녹화 시 `--dataset.no_stamp=true` 추가 |
| `--dataset.vcodec=...` 매개변수 없음 오류 | 구버전 매개변수로, 현재 비디오 인코딩 매개변수가 중첩형으로 변경됨 | `--dataset.rgb_encoder.vcodec=h264` 사용(기본값은 이미 `libsvtav1`) |
| 배포 시 `lerobot-record`가 `--policy.path` / `eval_` 오류를 냄 | 현재 버전 `lerobot-record`에 정책 배포 기능이 없음 | 배포에는 `lerobot-rollout --strategy.type=episodic` 사용, 데이터셋 이름은 `rollout_`으로 시작 |
| 좌우 암이 뒤바뀜 | 포트 구성 오류 | `left_arm_config.port`와 `right_arm_config.port`를 교환 |
| 학습 시 데이터셋을 찾지 못함 | 로컬 데이터셋에 `root`를 지정하지 않음 | 학습 시 `--dataset.root=./datasets/xxx` 추가 |
| 데이터셋이 자동 업로드됨 | `push_to_hub=false`를 설정하지 않음 | 녹화 시 `--dataset.push_to_hub=false` 추가 |
| 종료 시 `You must add one or several frames before calling add_episode` | reset 단계에서 종료하여 현재 에피소드에 프레임이 없음 | 이미 녹화된 데이터에는 영향 없음, `--resume=true`로 계속 수집 |

<RelatedProducts slugs="so-arm101" />
