---
title: 원본 LeRobot 실행 명령
---

# 원본 LeRobot 실행 명령

> **소속**: [lerobot/](01-Operation.md) —— 단일 SO-101 / SO-100 암, LeKiwi
> **선행**: [deployment/](../deployment/01-Overview.md)를 먼저 읽고 컨테이너에 들어와 있어야 합니다
> **다른 경로**: [xlerobot/](../xlerobot/01-Operation.md)(XLeRobot 일체형)
> **다음**: [troubleshooting/](../troubleshooting/01-Troubleshooting.md)

`lerobot-*` 명령줄로 **단일 SO-101 / SO-100 암** 또는 **LeKiwi**를 조작합니다.

> ⚠️ **XLeRobot 일체형**을 실행하려면 [xlerobot/](../xlerobot/01-Operation.md)로 돌아가세요.
> 이 명령줄 도구들은 **`xlerobot`을 지원하지 않습니다** — 원인은 아래 0절을 참고하세요.

---

## 0. 어떤 경우에 이 경로를 쓰나

| 하드웨어 | 경로 | 이유 |
|---|---|---|
| **단일 SO-101 / SO-100 암** | ✅ **이 문서**(`lerobot-*` CLI) | 원본 도구가 직접 지원 |
| **LeKiwi** | ✅ **이 문서**(`lerobot-*` CLI) | 원본 도구가 직접 지원 |
| **XLeRobot 일체형**(양팔 + 베이스) | ❌ [04](../xlerobot/01-Operation.md)로 | CLI 화이트리스트에 `xlerobot`이 없음 |

**왜 두 경로로 나뉘는가**: `lerobot-calibrate` 같은 명령줄 도구는 소스 코드에 로봇 import 목록이
하드코딩되어 있습니다(원본 로봇 14종, 전체 목록은 11절 참고). **그 안에 `xlerobot`이 없습니다**.
억지로 지정하면 다음 오류가 발생합니다:

```
lerobot-calibrate: error: argument --robot.type: invalid choice: 'xlerobot'
```

반대로 `examples/` 아래의 스크립트는 XLeRobot 일체형을 위해 작성된 것이라 단일 암에는 쓸 수 없습니다.

**두 경로는 같은 환경을 공유합니다** — 이미지에 설치된 패키지 이름이 그냥 `lerobot`이고, XLeRobot은
`robots/` 디렉터리에 코드 세 벌을 더 추가했을 뿐입니다. 따라서 **언제든 전환할 수 있고 아무것도 다시 설치할 필요가 없으며**,
같은 프로세스에서 둘 다 함께 import할 수 있습니다.

---

## 1. 전체 흐름

```
준비          캘리브레이션  사용                    학습         배포
────          ────────────  ────                    ────         ────
find-port  →  calibrate  →  teleoperate  ┐
find-cameras              record        ┴→  train  →  rollout
                          replay
```

각 단계가 명령 하나씩이며, 아래에서 하나씩 설명합니다.

---

## 2. 준비: 시리얼 포트와 카메라 찾기

```bash
lerobot-find-port          # 대화형: 안내에 따라 서보 케이블을 뽑았다 꽂고, 시리얼 포트 이름 출력
lerobot-find-cameras opencv   # 카메라를 하나씩 시험하고 스크린샷 저장
```

`lerobot-find-cameras`는 스크린샷을 `outputs/captured_images/`에 저장합니다. 화면이 보이면
카메라를 사용할 수 있다는 뜻입니다. **실측 확인 완료**(`/dev/video0`을 인식하고 캡처에 성공).

> 두 명령 모두 **대화형**이라 `--help`를 바로 붙이면 EOF 오류가 납니다. 정상적인 동작입니다.

---

## 3. 새 서보를 처음 쓸 때: ID 쓰기

새 서보의 출고 시 ID는 모두 1이므로, 같은 버스에 연결하려면 하나씩 1~6으로 바꿔야 합니다:

```bash
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0
```

'서보를 하나만 연결하고 Enter를 누르세요'라고 안내하며, 하나를 바꾼 뒤 다음 것을 꽂으면 됩니다.

> 새로 조립했거나 서보를 교체했을 때만 필요합니다. 이미 정상적으로 통신되는 암은 이 단계를 건너뛰세요.

---

## 4. 캘리브레이션

```bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_arm
```

- **캘리브레이션 파일이 없는 경우** → 안내 시작: 먼저 암을 가동 범위 중간 지점에 맞추고 Enter를 누른 뒤, 관절을 하나씩 전체 가동 범위까지 움직입니다
- **캘리브레이션 파일이 있는 경우** → 복원할지 다시 캘리브레이션할지 묻습니다

캘리브레이션 파일은 `~/.cache/huggingface/lerobot/calibration/robots/so101_follower/my_arm.json`에 있습니다.
**컨테이너 시작 시 `-v ~/.cache/huggingface`를 마운트하므로**([deployment/03-Deployment](../deployment/03-Deployment.md) 참고),
컨테이너를 다시 열어도 사라지지 않습니다.

리더-팔로워 구성이라면 팔로워 암과 리더 암을 **각각 한 번씩** 캘리브레이션합니다:

```bash
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower
lerobot-calibrate --teleop.type=so101_leader --teleop.port=/dev/ttyACM1 --teleop.id=my_leader
```

---

## 5. 원격 조작

### 리더 암으로 팔로워 암 움직이기 (리더-팔로워 모드)

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader
```

### 리더 암이 없나요? 키보드로

`--teleop.type`에 `keyboard`가 있어 두 번째 하드웨어가 필요 없습니다:

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard
```

`--teleop.type=gamepad`로 Xbox 컨트롤러를 연결할 수도 있습니다(`pip install "lerobot[gamepad]"` 필요).

### 카메라로 화면 보기

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader \
  --display_data=true --display_mode=rerun
```

> rerun 시각화를 사용하려면 마찬가지로 X11 라이브러리 두 개를 먼저 설치해야 합니다.
> [xlerobot/](../xlerobot/01-Operation.md) 1절을 참고하세요.

---

## 6. 시연 데이터 수집

```bash
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader \
  --dataset.repo_id=<사용자이름>/<첫번째데이터셋> \
  --dataset.num_episodes=10 \
  --dataset.single_task="pick up the cube"
```

**파라미터 설명:**

| 파라미터 | 역할 |
|---|---|
| `--robot.cameras` | 카메라 설정, **중첩 딕셔너리 문법**, `이름: {type: opencv, index_or_path: ..., width/height/fps}` |
| `--dataset.repo_id` | Hugging Face에서의 데이터셋 ID(로컬에서 녹화한 뒤 올릴 수도 있습니다) |
| `--dataset.num_episodes` | 몇 개를 녹화할지 |
| `--dataset.single_task` | 작업 설명, 학습할 때 사용됩니다 |
| `--dataset.root` | 다른 디렉터리에 저장하려면 추가하세요, 기본값은 캐시 디렉터리 아래입니다 |

**녹화 중 키**(터미널에 안내가 표시됩니다):

| 키 | 역할 |
|---|---|
| `→`(오른쪽 방향키) | 현재 에피소드를 조기 종료하고 리셋 단계로 진입 |
| `←`(왼쪽 방향키) | 현재 에피소드를 버리고 이 항목을 다시 녹화 |
| `Esc` | 전체 녹화 중지 |

녹화가 끝나면 로컬에서 바로 사용할 수 있습니다. Hub에 올리려면:

```bash
--dataset.push_to_hub=true
```

(컨테이너 시작 시 `-e HF_ENDPOINT=https://hf-mirror.com`를 추가하는 것을 잊지 마세요.)

---

## 7. 재생 확인

녹화가 끝나면 먼저 재생해 보며 데이터에 문제가 없는지 확인한 다음 학습하세요:

```bash
lerobot-replay \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --dataset.repo_id=<사용자이름>/<첫번째데이터셋> \
  --dataset.episode=0
```

---

## 8. 학습

```bash
lerobot-train \
  --policy.type=act \
  --dataset.repo_id=<사용자이름>/<첫번째데이터셋>
```

> `lerobot-train`은 **`robot.type`이 필요 없으며**(데이터셋과 정책 유형만 사용합니다),
> 따라서 이 명령은 XLeRobot 경로와 **공용**입니다 — 녹화한 XLeRobot 데이터도 이렇게 학습할 수 있습니다.
>
> 학습은 연산량을 많이 소모합니다. CPU에서는 아주 작은 규모만 돌릴 수 있고, 실용적으로 사용하려면 Jetson의 GPU가 필요합니다.

선택 가능한 정책(`--policy.type`): `act`(가장 많이 사용), `diffusion`, `smolvla`,
`pi0` / `pi05` / `pi0_fast`, `groot`, `tdmpc`, `vqbet` 등.

---

## 9. 실제 로봇 배포: 학습된 정책 실행

```bash
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<사용자이름>/<모델이름> \
  --strategy.type=base
```

| 파라미터 | 설명 |
|---|---|
| `--policy.path` | 학습된 모델(Hub의 ID 또는 로컬 경로) |
| `--strategy.type` | `base`가 가장 많이 사용됨; 그 외 `sentry`, `highlight`, `episodic`, `dagger` |
| `--inference.type` | `sync`(기본) 또는 `rtc` |

> ⚠️ **실제 로봇에 `lerobot-eval`을 쓰지 마세요** — 그것은 **시뮬레이션 benchmark**용입니다
> (`--env.type=aloha/pusht/libero/metaworld...`). 실제 로봇 배포가 아닙니다.
> 실제 로봇에는 `lerobot-rollout`을 사용하세요.

---

## 10. 명령줄 도구 전체 표

| 명령 | 역할 | `robot.type` 필요? |
|---|---|---|
| `lerobot-find-port` | 시리얼 포트 찾기 | 아니요 |
| `lerobot-find-cameras` | 카메라 찾기 | 아니요 |
| `lerobot-setup-motors` | 새 서보에 ID 쓰기 | 예 |
| `lerobot-calibrate` | 캘리브레이션 | 예 |
| `lerobot-teleoperate` | 원격 조작 | 예 |
| `lerobot-record` | 데이터셋 녹화 | 예 |
| `lerobot-replay` | 데이터 재생 | 예 |
| `lerobot-train` | 정책 학습 | **아니요**(XLeRobot과 공용) |
| `lerobot-rollout` | **실제 로봇**에 정책 배포 | 예 |
| `lerobot-eval` | **시뮬레이션** benchmark 평가 | 아니요(`--env.type` 사용) |
| `lerobot-edit-dataset` | 데이터셋 편집 | 아니요 |
| `lerobot-dataset-viz` | 데이터셋 시각화 | 아니요 |
| `lerobot-info` | 환경과 버전 정보 출력 | 아니요 |

---

## 11. CLI가 지원하는 로봇 유형 (전체 목록)

`lerobot-*` 명령줄이 **실제로 인식하는** 전체 유형입니다(소스 코드의 화이트리스트에서 읽어온 것).
**`xlerobot`이 없습니다** — 이것이 두 경로로 나뉘는 이유입니다.

**로봇(`--robot.type`) — 14종:**

```
openarm_follower      bi_openarm_follower     rebot_b601_follower
bi_rebot_b601_follower so100_follower         so101_follower
bi_so_follower        hope_jr_hand            hope_jr_arm
koch_follower         lekiwi                  lekiwi_client
omx_follower          unitree_g1
```

**원격 조작기(`--teleop.type`) — 포함되는 것:**

```
so101_leader      so100_leader      bi_so_leader      koch_leader
openarm_leader    omx_leader        rebot_102_leader  unitree_g1
keyboard          gamepad           homunculus_arm    homunculus_glove
```

> 전체 목록은 자신의 이미지에서 `--help`로 확인하세요. 버전에 따라 추가/삭제가 있을 수 있습니다.

---

## 12. 완전한 예제 (처음부터 실행까지)

```bash
# 1. 디바이스 찾기
lerobot-find-port                          # 시리얼 포트를 기록, 아래에서는 /dev/ttyACM0 사용
lerobot-find-cameras opencv                # 카메라를 기록, 아래에서는 /dev/video0 사용

# 2. 새 서보에 ID 쓰기(새로 조립한 암에만 필요)
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0

# 3. 캘리브레이션
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower

# 4. 키보드로 움직이는지 확인
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard

# 5. 데이터 10개 녹화
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=keyboard \
  --dataset.repo_id=<사용자이름>/my-first-dataset \
  --dataset.num_episodes=10 --dataset.single_task="pick up the cube"

# 6. 학습
lerobot-train --policy.type=act --dataset.repo_id=<사용자이름>/my-first-dataset

# 7. 로봇 암이 스스로 움직이게 하기
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<사용자이름>/my-first-dataset --strategy.type=base
```

---

## 검증 상황

이 문서의 명령은 모두 JetPack 7.2의 `chenyang310/xlerobot:jetson` 이미지에서 **실제로 실행했습니다**:

| 항목 | 결과 |
|---|---|
| 14종 원본 `--robot.type` 인수 파싱 | ✅ 통과 |
| `--teleop.type`(`keyboard` 포함) 인수 파싱 | ✅ 통과 |
| `lerobot-calibrate` 전체 체인 | ✅ 시리얼 포트를 여는 단계에서 멈춤(당시 서보 미연결) |
| `lerobot-teleoperate --teleop.type=keyboard` 전체 체인 | ✅ 위와 동일 |
| `lerobot-find-cameras opencv` | ✅ **실제 하드웨어**: `/dev/video0`을 인식하고 이미지 캡처 성공 |
| `--robot.cameras` 중첩 문법 파싱 | ✅ 통과 |
| 원본 로봇과 XLeRobot **같은 프로세스에서 공존** | ✅ 8개 유형 동시 등록 성공 |

로봇 암을 연결하지 않아서 **동작 수준의 검증은 아직 하지 않았습니다**. SO-101을 연결한 뒤 12절대로 한 번 실행해 보시고,
어느 단계에서 문제가 있으면 알려주세요.

---

> **다음**: [troubleshooting/](../troubleshooting/01-Troubleshooting.md) — 문제가 생기면 여기서 확인
