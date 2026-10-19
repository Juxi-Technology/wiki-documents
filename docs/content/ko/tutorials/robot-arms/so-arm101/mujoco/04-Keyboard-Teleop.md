---
title: "04 · 키보드 텔레오퍼레이션"
description: "키보드로 관절을 \"조깅\"하며 실기 또는 시뮬레이션 암을 수동 제어합니다——리더 암이 없을 때 가장 빠른 제어 방식이며, 시연 데이터를 녹화하는 수단 중 하나이기도 합니다."
---

# 04 · 키보드 텔레오퍼레이션

키보드로 관절을 "조깅"하며 실기 또는 시뮬레이션 암을 수동 제어합니다——리더 암이 없을 때 가장 빠른 제어 방식이며, 시연 데이터를 녹화하는 수단 중 하나이기도 합니다.

> 사전 조건: 시뮬레이션 부분은 [01](/ko/tutorials/robot-arms/so-arm101/mujoco/01-Environment)만 완료하면 됩니다; 실기 부분은 [03](/ko/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration)도 완료해야 합니다.
> 명령의 `COM172`/`juxi_so101`은 예시입니다——포트는 03장에서 확인한 값으로 바꾸고, `id`는 캘리브레이션 시 정한 이름을 사용하세요.

## 명령

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'

# 真机从动臂
uv run --frozen --with mujoco python examples/so101_mujoco/teleoperate.py \
    --robot.type=so101_follower --robot.port=COM172 --robot.id=juxi_so101 \
    --robot.use_degrees=false --robot.max_relative_target=5 \
    --teleop.type=so101_keyboard --teleop.rate=150

# 仿真从动臂（MuJoCo 窗口自动打开）
uv run --frozen --with mujoco python examples/so101_mujoco/teleoperate.py \
    --teleop.rate=150
```

(`teleoperate.py`의 기본값은 `--robot.type=so101_mujoco --teleop.type=so101_keyboard`입니다.)

## 키(누르고 있는 동안 적용, 전역 리스닝——창 포커스가 어디에 있든 동작)

| 키 | 동작 | 키 | 동작 |
| --- | --- | --- | --- |
| `w` / `s` | shoulder_lift 위 / 아래 | `a` / `z` | shoulder_pan 왼쪽 / 오른쪽 |
| `e` / `d` | elbow_flex 신전 / 굴곡 | `t` / `g` | wrist_flex + / − |
| `y` / `h` | wrist_roll + / − | `u` / `j` | 그리퍼 열기 / 닫기 |

키는 **녹화 제어 키를 의도적으로 피해서**(`n/r/q`, 방향키, `Esc`) 선택했으므로, 텔레오퍼레이션과 녹화를 동시에 실행할 수 있습니다.

## 핵심 매개변수

| 매개변수 | 역할 | 권장값 |
| --- | --- | --- |
| `--teleop.rate` | 키를 누르고 있을 때의 목표 속도(단위/초) | 기본값 60은 느린 편; 실기 감각에는 **150**이 적당 |
| `--robot.max_relative_target` | 제어 주기마다 관절을 최대 몇 단위까지 움직일지(안전 속도 제한) | 실기 **5**(60Hz 텔레오퍼레이션) / **10**(30Hz 녹화) |
| `--robot.use_degrees=false` | 각도제 대신 스트로크 비율제(−100에서 100) 사용 | **실기에서는 필수**, 그렇지 않으면 단위가 맞지 않음(시뮬레이션은 기본적으로 일치) |

## 동작 설명

- **텔레오퍼레이션 중에는 타이핑하지 마세요**: 키보드 리스닝은 **전역이며 키를 삼키지 않습니다**——컴퓨터의 어떤 창에서든 매핑된 키
  (`w a s z e d t g y h u j`, 채팅창의 자모 입력 포함)를 누르면 동시에 암이 구동됩니다. 리더 암 모드에서는 이 문제가 없습니다.
- **연결 순간 암이 움직입니다**: 실기 팔로워 암은 먼저 토크가 걸려(뻣뻣해져) "중간 자세"를 향해 이동합니다(키를 누르기 전의 목표);
  시뮬레이션 암은 곧바로 중간 지점 자세로 수렴합니다. 손 주변에 공간을 남겨 두세요.
- **종료**: 해당 터미널에서 `Ctrl-C`를 누르세요(또는 `Esc`를 누르면 키보드 리스닝이 끊기고 깨끗하게 종료됩니다). 종료 후 실기는 **토크가 풀려 힘이 빠지므로**
  손으로 받쳐 주세요——정상 동작입니다.
- **시작 로그에 연달아 찍히는 `clamped to be safe` WARNING**은 속도 제한기가 "따라잡는" 과정의 정상 출력이며, 목표에 도달하면 자동으로 멈춥니다.

<RelatedProducts slugs="so-arm101" />
