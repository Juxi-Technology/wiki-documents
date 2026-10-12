---
title: XLeRobot 실행 명령
---

# XLeRobot 실행 명령

> **소속**: [xlerobot/](01-Operation.md) —— XLeRobot 일체형(양팔 + 베이스)
> **선행**: [deployment/](../deployment/01-Overview.md)를 먼저 읽고 컨테이너에 들어와 있어야 합니다
> **다른 경로**: [lerobot/](../lerobot/01-Operation.md)(단일 SO-101 암 / LeKiwi)
> **다음**: [troubleshooting/](../troubleshooting/01-Troubleshooting.md)

🎯 **이 문서는 XLeRobot 일체형**(양팔 + 베이스) 실행 방법만 다룹니다.

**단일 SO-101 암** 또는 **LeKiwi**를 `lerobot-*` 명령줄로 조작하려면
[lerobot/](../lerobot/01-Operation.md)으로 가세요 — 두 경로는 다릅니다.

이 문서의 내용: 캘리브레이션, 원격 조작, 키 표, 데이터 녹화, 학습, 추론.

---

## 0. 먼저 경로 선택 ⚠️

이미지에는 **두 개의 프로젝트**가 있고 실행 방식이 다릅니다. **먼저 이 표를 보고 어느 경로를 탈지 정하세요**:

| 하드웨어 | 경로 | 진입점 |
|---|---|---|
| **XLeRobot 일체형**(양팔 + 베이스) | ✅ **이 문서** | `examples/` 아래의 예제 스크립트 |
| **단일 SO-101 / SO-100 암** | ➡️ [lerobot/](../lerobot/01-Operation.md) | `lerobot-*` 명령줄 |
| **LeKiwi** | ➡️ [lerobot/](../lerobot/01-Operation.md) | `lerobot-*` 명령줄 |

**왜 두 경로로 나뉘는가**: `lerobot-calibrate`, `lerobot-record`, `lerobot-teleoperate`
같은 명령줄 도구는 **각자 명시적으로 import한 로봇 유형만 인식합니다**(원본 로봇 14종, **`xlerobot`은 없음**).
억지로 지정하면 다음 오류가 발생합니다:

```
lerobot-calibrate: error: argument --robot.type: invalid choice: 'xlerobot'
```

**XLeRobot의 진입점은 `examples/` 아래의 예제 스크립트입니다**(`XLerobot`을 직접 import합니다).

두 경로는 **같은 환경을 공유합니다** — 언제든 전환할 수 있고, 아무것도 다시 설치할 필요가 없습니다.

> 예제 파일에는 host/client 두 프로세스 사용법이 적혀 있지만 **그 부분은 주석 처리되어 있고**,
> 실제로 실행되는 것은 **직접 연결 모드**입니다 — 터미널 하나면 충분하며 host를 따로 띄울 필요가 없습니다.

---

## 1. 처음 원격 조작을 실행하기 전: X11 라이브러리 두 개 설치 ⚠️

이미지에 X11 라이브러리 두 개가 빠져 있어, **설치하지 않으면 rerun 시각화 창이 크래시합니다**:

```
Failed loading libxkbcommon-x11.so.0
thread 'main' panicked at 'Library libxkbcommon-x11.so could not be loaded.'
```

**로봇 자체에는 영향이 없습니다**(원격 조작은 정상 동작하고 키도 반응합니다). 다만 시각화 창이 보이지 않고,
rerun의 데이터 채널이 막혀 WARN을 계속 출력하며 원격 조작을 느리게 만듭니다.

**터미널을 하나 더 열어** 컨테이너에 설치하세요:

```bash
docker exec -u root -it xlerobot bash -c "apt-get update && apt-get install -y libxkbcommon-x11-0 libxinerama1"
```

⚠️ **`-u root`는 생략할 수 없습니다** — 이미지는 기본적으로 `jetson` 사용자로 실행되고, `docker exec`로 들어가도
기본은 같은 사용자입니다. apt 패키지 설치에는 root 권한이 필요하므로, 이 파라미터를 빼면 다음 오류가 발생합니다:

```
E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock — are you root?
```

게다가 **패키지가 조용히 설치되지 않아** rerun은 여전히 크래시하므로, '설치했는데 소용없다'고 오해하기 쉽습니다.

설치가 끝나면 **원격 조작 스크립트를 재시작**하세요(`Ctrl+C`로 종료한 뒤 다시 실행).

> ⚠️ 이 변경은 **이번 실행에만 유효합니다** — 컨테이너가 `--rm`이므로 종료하면 사라집니다.
> 따라서 컨테이너를 다시 열 때마다 설치해야 합니다.

---

## 2. 시리얼 포트 찾기

```bash
lerobot-find-port
```

서보 케이블을 뽑았다가 다시 꽂으라고 안내한 뒤 시리얼 포트 이름(예: `/dev/ttyACM0`)을 출력합니다.

> 이 명령은 **대화형**이라 `--help`를 바로 실행하면 EOF 오류가 납니다. 정상적인 동작입니다.

**XLeRobot은 시리얼 포트 두 개를 사용합니다**(설정의 `port1`과 `port2`에 대응):

| 파라미터 | 기본값 | 연결 대상 |
|---|---|---|
| `port1` | `/dev/ttyACM0` | SO-101 양팔 + 헤드 카메라 |
| `port2` | `/dev/ttyACM1` | 베이스(바퀴) 관련 서보 |

둘 다 찾아야 합니다. 기본값은 `/dev/ttyACM0`과 `/dev/ttyACM1`이며, **실제 포트가 다르면
이후 모든 명령에서 `--robot.port1=` / `--robot.port2=`로 지정해야 합니다**(6절 참고).

---

## 3. 캘리브레이션: 예제를 실행하면 자동으로 시작되며, 별도 명령이 필요 없습니다

⚠️ **`lerobot-calibrate --robot.type=xlerobot`을 사용하지 마세요**. 그 명령줄 도구는
명시적으로 import한 로봇 목록(so100/so101/lekiwi 등)만 인식하며, XLeRobot의 설정은 **목록에 없습니다**.
`invalid choice: 'xlerobot'` 오류가 발생합니다.

XLeRobot의 캘리브레이션은 **`XLerobot.connect()`에 내장되어 있어**, 아무 예제나 실행하면 자동으로 시작됩니다:

```bash
cd /opt/xlerobot
python examples/4_xlerobot_teleop_keyboard.py
```

**다음과 같이 동작합니다:**

- **캘리브레이션 파일이 없는 경우** → 가이드 캘리브레이션이 자동으로 시작됩니다:
  1. '왼팔과 헤드 서보를 가동 범위의 중간 지점으로 옮기고 Enter를 누르세요'라고 안내합니다
  2. 이어서 '관절을 하나씩 전체 가동 범위까지 움직이고, Enter를 누르면 종료됩니다'라고 안내합니다
  3. 오른팔과 베이스도 마찬가지입니다
- **캘리브레이션 파일이 있는 경우** → Enter를 누르면 캘리브레이션을 복원할지, `c`를 입력하면 다시 캘리브레이션할지 묻습니다

캘리브레이션 파일은 다음 위치에 저장됩니다:

```
~/.cache/huggingface/lerobot/calibration/robots/xlerobot/<id>.json
```

**이 디렉터리는 반드시 호스트에 마운트해야 합니다**. 그러지 않으면 컨테이너를 다시 열 때마다 재캘리브레이션해야 합니다:

```bash
-v ~/.cache/huggingface:/home/jetson/.cache/huggingface
```

> XLeRobot 전체가 아니라 SO-101 암 하나만 단독으로 캘리브레이션하고 싶다면 원래 명령을 사용할 수 있습니다.
> `so101_follower` 유형은 CLI 화이트리스트에 있습니다:
> ```bash
> lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_arm
> ```

> 일부 예제(예: `examples/0_so100_keyboard_joint_control.py`)는 위 흐름 대신
> **코드에 하드코딩된 캘리브레이션 계수**를 사용합니다. 어떤 방식을 사용하는지는 로봇
> 변형과 사용하는 예제에 따라 다릅니다 — 해당 예제 파일 맨 위의 주석을 먼저 확인하세요.

---

## 4. 원격 조작

**터미널 하나면 충분합니다**(예제는 직접 연결 모드라 host를 따로 띄울 필요가 없습니다):

```bash
cd /opt/xlerobot
python examples/4_xlerobot_teleop_keyboard.py
```

**처음 실행하면 캘리브레이션 안내가 자동으로 시작됩니다**(별도의 캘리브레이션 명령이 필요하지 않습니다):

1. `Move left arm and head motors to the middle of their range of motion and press ENTER....`
   → 왼팔과 헤드 서보를 가동 범위의 중간에 맞춘 뒤, **Enter를 누릅니다**
2. `Move all left arm and head joints sequentially through their entire ranges of motion...`
   → 각 관절을 처음부터 끝까지 한 번씩 움직이고, **Enter를 누르면** 종료됩니다
3. 오른팔과 베이스도 마찬가지입니다

이후 캘리브레이션 파일이 있으면 Enter를 누르면 복원, `c`를 입력하면 재캘리브레이션한다고 묻습니다.

### 키 매핑

**베이스**

| 키 | 동작 |
|---|---|
| `i` / `k` | 전진 / 후진 |
| `j` / `l` | 좌측 이동 / 우측 이동 |
| `u` / `o` | 좌회전 / 우회전 |
| `n` / `m` | 가속 / 감속(3단계) |
| `b` | 프로그램 종료 |

**왼팔**

| 키 | 관절 |
|---|---|
| `q` / `e` | shoulder_pan(베이스 회전) ± |
| `w` / `s` | x(앞뒤) ± |
| `a` / `d` | y(좌우) ± |
| `z` / `x` | pitch(상하) ± |
| `r` / `f` | wrist_roll(손목 회전) ± |
| `t` / `g` | gripper(그리퍼) 열기 / 닫기 |
| `c` | 원점 복귀 |
| `y` | 사각형 궤적 실행(데모/테스트용) |
| `<` / `>` | head_motor_1 ± |
| `,` / `.` | head_motor_2 ± |

**오른팔**

| 키 | 관절 |
|---|---|
| `7` / `9` | shoulder_pan ± |
| `8` / `2` | x(앞뒤) ± |
| `4` / `6` | y(좌우) ± |
| `1` / `3` | pitch(상하) ± |
| `/` / `*` | wrist_roll ± |
| `+` / `-` | gripper 열기 / 닫기 |
| `0` | 원점 복귀 |
| `Y`(**대문자**) | 사각형 궤적 실행 |

**기타**: `?` → 헤드 서보 원점 복귀

> 왼팔과 오른팔은 **미러** 구조입니다: 왼쪽은 문자 키 영역(`q/e`, `w/a/s/d`)을, 오른쪽은 숫자 키패드
> (`7/9`, `4/6`, `8/2`, `1/3`)를 사용합니다. `reset` 키도 다릅니다 — 왼팔은 `c`, 오른팔은 `0`입니다.
> 사각형 궤적 키는 왼팔이 소문자 `y`, 오른팔이 **대문자** `Y`이니 주의하세요.

### 기타 예제

| 예제 | 설명 | 추가 설치 필요? |
|---|---|---|
| `4_xlerobot_2wheels_teleop_keyboard.py` | 2륜 베이스 버전 | 필요 없음(마찬가지로 위의 두 라이브러리를 먼저 설치해야 함) |
| `5_xlerobot_teleop_xbox.py` | Xbox 컨트롤러 | `pip install "lerobot[gamepad]"` 필요 |
| `7_xlerobot_teleop_joycon.py` | Joy-Con | `joyconrobotics` 모듈이 없어 사용 불가 |
| `8_xlerobot_teleop_vr.py` | VR | XLeVR 디렉터리를 추가로 마운트해야 함 |

---

## 5. 시연 데이터 수집

⚠️ `lerobot-record --robot.type=xlerobot`은 **사용할 수 없습니다**(0절과 같은 이유).

XLeRobot에는 VR 녹화 경로밖에 없는데, 그마저도 `XLeVR` 모듈에 의존하며 이미지에 포함되어 있지 않습니다.

**사용하려면 직접 스크립트를 작성해야 합니다**. LeRobotDataset API(라이브러리는 이미지에 포함)를 사용하세요:

```python
from lerobot.datasets.lerobot_dataset import LeRobotDataset

ds = LeRobotDataset.create(
    repo_id="<사용자이름>/<데이터셋이름>", fps=30,
    features={"observation.state": {"dtype": "float32", "shape": (6,), "names": None},
              "action": {"dtype": "float32", "shape": (6,), "names": None}},
    root="/data/ds")

# 원격 조작 루프 안에서:
#   ds.add_frame({"observation.state": ..., "action": ..., "task": "pick"})
#   ds.save_episode()

ds.finalize()   # 반드시 호출해야 함, 그렇지 않으면 메타데이터가 저장되지 않음
```

이미지의 `examples/8_vr_teleop_with_dataset_recording.py`를 참고해,
VR 부분을 키보드 원격 조작으로 바꾸면 됩니다.

**`-e HF_ENDPOINT=https://hf-mirror.com` 추가를 잊지 마세요**. 그러지 않으면 데이터셋을 Hub에 푸시할 때 실패합니다.

> 데이터셋을 작성할 때 함정이 하나 있습니다: `save_episode()` 이후 **반드시 `ds.finalize()`를 호출해야 합니다**.
> 그러지 않으면 에피소드 메타데이터가 디스크에 저장되지 않아 나중에 다시 읽을 수 없습니다
> (`Provided directory does not contain any parquet file` 오류가 발생합니다).

---

## 6. 시리얼 포트가 ACM0/ACM1이 아닐 때

예제에는 **argparse가 없으며**, 시리얼 포트는 `XLerobotConfig()`의 기본값을 사용합니다:

```python
robot_config = XLerobotConfig()
robot = XLerobot(robot_config)
```

포트를 명시적으로 지정하려면:

```python
robot_config = XLerobotConfig(port1="/dev/ttyACM1", port2="/dev/ttyACM2")
robot = XLerobot(robot_config)
```

수정 후 바로 다시 실행하면 됩니다(소스가 마운트되어 있어 호스트 파일을 수정하면 즉시 반영됩니다).

---

## 7. 학습된 모델 배포

ACT 정책은 **추가 의존성이 필요 없으며**, 이미지에서 바로 사용할 수 있습니다:

```python
from lerobot.policies.act.configuration_act import ACTConfig
from lerobot.policies.act.modeling_act import ACTPolicy

policy = ACTPolicy.from_pretrained("<사용자이름>/<모델이름>")
policy.eval()

# 로봇을 연결한 뒤 반복 추론
# action = policy.select_action(batch)
```

이미지에 미리 설치되어 있는 정책:

| 정책 | 의존성 | 설명 |
|---|---|---|
| **ACT** | 없음 | 가장 많이 사용되며, 실측에서 동작 확인 |
| **Diffusion** | `diffusers` | 풀 버전 이미지가 필요합니다 |
| SmolVLA / pi0 / groot | transformers | **미설치**, 패키지가 매우 크고 CPU에서는 실행 불가 |

> 같은 프로세스에서 **두 개의 로봇 변형을 동시에 import할 수 없습니다** — `xlerobot_mecanum`이
> 자신의 설정을 `"xlerobot"`으로 등록해 기본 버전과 이름이 충돌하며,
> `Cannot register ... already registered` 오류가 발생합니다. 로봇 한 대에는 변형 하나만 사용하고,
> 프로세스를 분리하면 문제없습니다.

---

## 8. 학습

```bash
lerobot-train \
  --policy.type=act \
  --dataset.repo_id=<사용자이름>/<데이터셋이름>
```

> `lerobot-train`은 **`robot.type`이 필요 없으며**(데이터셋과 정책 유형만 사용합니다),
> 따라서 이 명령은 사용할 수 있고 0절의 제한을 받지 않습니다.
>
> 학습은 연산량을 많이 소모합니다. CPU에서는 아주 작은 규모만 돌릴 수 있고, 실용적으로 사용하려면 Jetson의 GPU가 필요합니다.

---

> **다음**: [troubleshooting/](../troubleshooting/01-Troubleshooting.md) — 문제가 생기면 여기서 확인
> **다른 경로**: [lerobot/](../lerobot/01-Operation.md)(`lerobot-*` 명령줄로 단일 암 / LeKiwi 실행)
