---
title: 문제 해결 및 빠른 참조
---

# 문제 해결 및 빠른 참조

> **소속**: [troubleshooting/](01-Troubleshooting.md)
> **관련**: [deployment/](../deployment/01-Overview.md) ·
> [xlerobot/](../xlerobot/01-Operation.md) ·
> [lerobot/](../lerobot/01-Operation.md)

---

## 자주 발생하는 문제

### 컨테이너에서 로봇의 시리얼 포트가 보이지 않음

```bash
# 호스트에서 디바이스 존재 확인
ls /dev/ttyACM*
# 사용자가 dialout 그룹에 있는지 확인
groups | grep dialout
```

그룹에 없다면 `sudo usermod -aG dialout $USER`를 실행한 뒤 **다시 로그인**하세요.

### 이미지 다운로드가 멈춤 / 타임아웃

미러 가속기를 설정하지 않은 경우입니다. [deployment/02-Environment-Setup](../deployment/02-Environment-Setup.md) 2절을 참고하세요.

### 모델 다운로드 실패 / huggingface에 연결할 수 없음

`-e HF_ENDPOINT=https://hf-mirror.com`을 설정하세요.
[deployment/02-Environment-Setup](../deployment/02-Environment-Setup.md) 4절을 참고하세요.

### rerun 시각화 창이 크래시함

```
thread 'main' panicked at 'Library libxkbcommon-x11.so could not be loaded.'
```

X11 라이브러리가 없기 때문입니다. **로봇 자체에는 영향이 없고**, 창이 보이지 않을 뿐입니다.
라이브러리 설치 명령과 주의 사항은 [xlerobot/](../xlerobot/01-Operation.md) 1절을 참고하세요 —
핵심은 `docker exec`에 **반드시 `-u root`를 붙여야 한다**는 것입니다.

### 컨테이너에서 `torch.cuda.is_available()`이 False임

- `cpu` / `cpu-slim` 이미지를 사용 중 → 정상입니다, 이 버전들은 애초에 GPU가 없습니다
- `jetson` 이미지를 사용 중 → `--runtime nvidia`를 사용했는지 확인하세요
  (**반드시 `--device nvidia.com/gpu=all`을 사용해야 합니다**), 그리고 CDI 스펙이 생성되었는지도 확인하세요

### 컨테이너가 시작되지 않고 CDI 오류가 발생함

```
CDI device injection failed: failed to stat CDI host device "/dev/dri/card0"
```

호스트의 자동 새로 고침 서비스가 존재하지 않는 `card0`을 참조하는 스펙을 생성했습니다. 해결 방법:

```bash
sudo systemctl disable --now nvidia-cdi-refresh.path nvidia-cdi-refresh.service
sudo rm -f /var/run/cdi/nvidia.yaml
sudo systemctl restart docker
```

(이 문제는 자체 보드에서 재부팅할 때마다 재현됩니다. 자세한 내용은
developer/03-Board-Remote-Testing.md를 참고하세요.)

### 캘리브레이션을 매번 다시 해야 함

캘리브레이션 파일이 컨테이너 안에 저장되어, 컨테이너를 삭제하면 사라집니다. 시작할 때 캐시 디렉터리를 마운트하세요:

```bash
-v ~/.cache/huggingface:/home/jetson/.cache/huggingface
```

`scripts/run.sh`가 이미 이 작업을 수행합니다.

### 캘리브레이션 명령에서 `invalid choice: 'xlerobot'` 오류 발생

고장이 아니라 원래 그렇게 설계된 것입니다. `lerobot-calibrate` 명령줄 도구는 XLeRobot을 지원하지 않으며,
캘리브레이션은 예제 스크립트에서 자동으로 시작됩니다. [xlerobot/](../xlerobot/01-Operation.md) 0절과 3절을 참고하세요.

### 데이터셋 작업 시 torchcodec 오류가 잔뜩 출력됨

이미지가 아니라 **직접 설치한** 환경을 사용하는 경우,
`libnvrtc.so.13: cannot open shared object file`이 나타날 수 있습니다. 이는 torchcodec이 순수 CPU
환경에서 로드되지 못하는 것인데, lerobot이 자동으로 pyav로 폴백하므로 기능에는 영향이 없습니다.
이미지에서는 이미 제거되어 있어 이 오류가 나타나지 않습니다.

### 컨테이너에서 로봇 변형 두 개를 `import`하면 오류 발생

```
Cannot register ... as xlerobot because ... is already registered
```

**`xlerobot`과 `xlerobot_mecanum`, 이 한 쌍**에서만 발생합니다 — 둘 다 소스 코드에서
`"xlerobot"`으로 등록되기 때문입니다(mecanum 쪽 config는 복사해 온 것이라 등록 이름을 바꾸지 않았습니다). XLeRobot 업스트림의 버그입니다.

**다른 조합은 충돌하지 않습니다**: 원본 LeRobot의 모든 로봇 + XLeRobot이 **같은 프로세스에서 공존할 수 있습니다**
(실측에서 8개 유형이 동시에 등록 성공). `xlerobot_2wheels`도 충돌하지 않습니다.

로봇 한 대에는 변형 하나만 사용하므로 실제 사용에는 영향이 없습니다. 정말로 동시에 써야 한다면(예: 비교 스크립트 작성)
프로세스를 분리해 실행하세요.

---

## 원본 `lerobot-*` 명령을 쓸 때의 문제

### `lerobot-record`에서 카메라 관련 오류가 발생 / 녹화된 데이터에 이미지가 없음

카메라는 `--robot.cameras` **중첩 딕셔너리**로 전달해야 하며, 별도의 최상위 파라미터가 아닙니다:

```bash
--robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }"
```

`index`가 아니라 `index_or_path`라는 점에 주의하세요. `front`는 카메라 이름이며 여러 개를 지정할 수 있습니다.
전체 예제는 [lerobot/](../lerobot/01-Operation.md) 6절을 참고하세요.

### `lerobot-eval`이 실제 로봇에서 작동하지 않음

`lerobot-eval`은 **시뮬레이션 benchmark**용입니다(`--env.type=aloha/pusht/libero/metaworld...`).
**실제 로봇 배포 도구가 아닙니다**.

실제 로봇에서 학습된 정책을 실행하려면 **`lerobot-rollout`**을 사용하세요:

```bash
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<사용자이름>/<모델이름> --strategy.type=base
```

### `examples/`를 쓸지 `lerobot-*`를 쓸지 구분이 안 될 때

| 하드웨어 | 사용할 것 |
|---|---|
| XLeRobot 일체형(양팔 + 베이스) | `examples/` 스크립트 → [xlerobot/](../xlerobot/01-Operation.md) |
| 단일 SO-101 / SO-100 암, LeKiwi | `lerobot-*` 명령줄 → [lerobot/](../lerobot/01-Operation.md) |

판별 기준은 간단합니다: `lerobot-*`의 로봇 화이트리스트에 **`xlerobot`이 없습니다**(전체 목록은
[lerobot/](../lerobot/01-Operation.md) 11절 참고).

### `--robot.type`을 지정했는데 `invalid choice` 오류 발생

[lerobot/](../lerobot/01-Operation.md) 11절의 전체 목록과 대조해 보세요 —
그 14종의 원본 유형만 사용할 수 있습니다. `xlerobot`은 목록에 없으므로 `examples/` 스크립트를 사용해야 합니다.

---

## 치트시트

### 공통 (두 경로 모두)

```bash
# 이미지 받기
docker pull chenyang310/xlerobot:cpu-slim

# 시작(범용)
bash scripts/run.sh cpu

# 시작(Jetson, GPU 포함)
bash scripts/run.sh jetson

# 컨테이너 진입 후 — 최초 설정
lerobot-find-port                     # 시리얼 포트 찾기(대화형, 안내에 따라 서보 케이블 뽑았다 꽂기)

# rerun에 필요한 X11 라이브러리 두 개 설치(터미널을 따로 열고, -u root는 생략 불가)
docker exec -u root -it xlerobot bash -c "apt-get update && apt-get install -y libxkbcommon-x11-0 libxinerama1"

# 학습(두 경로 공용: robot.type 불필요)
lerobot-train --policy.type=act --dataset.repo_id=<사용자이름>/<데이터셋이름>

# 자체 점검
python -c "import torch, lerobot; print(torch.__version__, lerobot.__version__)"
python -c "import torch; print('GPU:', torch.cuda.is_available())"
```

### A · XLeRobot 일체형 (양팔 + 베이스)

```bash
# 원격 조작: 터미널 하나면 충분, 처음 실행 시 자동으로 캘리브레이션 안내 시작
python examples/4_xlerobot_teleop_keyboard.py

# 2륜 베이스 버전
python examples/4_xlerobot_2wheels_teleop_keyboard.py

# ⚠️ lerobot-calibrate / lerobot-record / lerobot-teleoperate에 xlerobot을 전달하지 마세요.
#    화이트리스트에 없어서 invalid choice만 출력합니다. XLeRobot은 examples/ 스크립트를 사용합니다.
```

자세한 내용은 [xlerobot/](../xlerobot/01-Operation.md)을 참고하세요.

### B · 단일 SO-101 / LeKiwi (`lerobot-*` CLI)

```bash
# 디바이스 찾기
lerobot-find-port
lerobot-find-cameras opencv

# 새 서보에 ID 쓰기(새로 조립한 암에만 필요)
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0

# 캘리브레이션
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower

# 원격 조작(키보드, 리더 암 불필요)
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard

# 데이터셋 녹화
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=keyboard \
  --dataset.repo_id=<사용자이름>/<데이터셋이름> --dataset.num_episodes=10 \
  --dataset.single_task="pick up the cube"

# 재생 확인
lerobot-replay --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --dataset.repo_id=<사용자이름>/<데이터셋이름> --dataset.episode=0

# 학습된 정책을 실제 로봇에 배포(⚠️ lerobot-eval이 아닙니다, 그것은 시뮬레이션용)
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<사용자이름>/<모델이름> --strategy.type=base
```

자세한 내용은 [lerobot/](../lerobot/01-Operation.md)을 참고하세요.

### 키 빠른 참조

| 부위 | 키 | 동작 |
|---|---|---|
| 베이스 | `i` `k` `j` `l` | 전 / 후 / 좌 / 우 |
| 베이스 | `u` `o` `n` `m` | 좌회전 / 우회전 / 가속 / 감속 |
| 베이스 | `b` | 종료 |
| 왼팔 | `q/e` `w/s` `a/d` `z/x` | pan / x / y / pitch |
| 왼팔 | `r/f` `t/g` `c` `y` | wrist / 그리퍼 / 원점 복귀 / 사각형 궤적 |
| 왼팔 | `<` `>` `,` `.` | 헤드 서보 1 / 2 |
| 오른팔 | `7/9` `8/2` `4/6` `1/3` | pan / x / y / pitch |
| 오른팔 | `/` `*` `+` `-` `0` | wrist / 그리퍼 / 원점 복귀 |
| 오른팔 | `Y`(**대문자**) | 사각형 궤적 |
| 기타 | `?` | 헤드 원점 복귀 |

전체 설명은 [xlerobot/](../xlerobot/01-Operation.md) 4절을 참고하세요.

---

## 부록: 이 튜토리얼에서 언급한 것들이 왜 이렇게 되어 있는가

| 결정 | 이유 |
|---|---|
| Python 3.12가 필수 | lerobot 0.6.2가 PEP 695 문법(`type X = ...`, `class Foo[T]:`)을 사용해서 3.10/3.11에서는 컴파일조차 되지 않습니다 |
| 중국 본토에서는 미러 가속기 필수 | Docker Hub 직접 연결이 타임아웃되며, 실측에서 `context deadline exceeded`가 발생합니다 |
| HF_ENDPOINT 필수 | 중국 본토에서는 `huggingface.co`에 전혀 접속할 수 없고, `hf-mirror.com`은 접속 가능합니다 |
| Jetson은 `--runtime nvidia` 대신 CDI 사용 | JetPack 6/7의 cgroup v2 환경에서는 `--runtime nvidia`가 디바이스 노드를 주입하지 않습니다 |
| placo 운동학 라이브러리를 설치하지 않음 | cp312/aarch64용 휠이 없습니다. XLeRobot은 자체 내장 해석적 IK를 사용하며 이 라이브러리에 의존하지 않습니다 |

더 자세한 기술 내용은 developer/01-Jetson-Environment.md를 참고하세요.

---

## 관련 링크

- [XLeRobot 프로젝트](https://github.com/Vector-Wangel/XLeRobot)
- [LeRobot 공식 문서](https://huggingface.co/docs/lerobot)
- [Docker Hub 사용량과 제한](https://docs.docker.com/docker-hub/usage/)
- [Juxi Technology Wiki](https://wiki.juxitech.com)

---

> **처음으로**: [deployment/01-Overview](../deployment/01-Overview.md)
> **다른 경로**: [xlerobot/](../xlerobot/01-Operation.md) ·
> [lerobot/](../lerobot/01-Operation.md)
