---
title: "03 · 실기 연결과 캘리브레이션"
description: "CH343 칩의 드라이버 보드를 꽂으면 COM 포트가 하나 나타납니다; 번호는 연결/해제나 USB 포트 변경에 따라 달라지므로, 연결 전에 매번 확인하세요:"
---

# 03 · 실기 연결과 캘리브레이션

> 사전 조건: [01 환경 준비](/ko/tutorials/robot-arms/so-arm101/mujoco/01-Environment)를 완료하세요(`feetech` extra가 시리얼 통신을 제공합니다).
> 이 장의 예시 포트: 팔로워 암 `COM172`, 리더 암 `COM124`(이 머신에서 현역 리더 암의 실측값)——**연결할 때마다 번호가 바뀔 수 있으므로,
> 항상 첫 단계에서 확인한 실제 포트를 기준으로 하세요**, 아래 명령의 포트는 여러분의 번호로 바꾸기만 하면 됩니다.

## 시리얼 포트 식별

CH343 칩의 드라이버 보드를 꽂으면 COM 포트가 하나 나타납니다; 번호는 연결/해제나 USB 포트 변경에 따라 달라지므로, 연결 전에 매번 확인하세요:

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'
uv run --frozen python -c "import serial.tools.list_ports as lp; [print(p.device, '|', p.description, '|', p.hwid) for p in lp.comports()]"
```

출력에서 `CH343`(또는 유사한 USB 시리얼 장치)가 나타나는 줄이 드라이버 보드입니다; 그 `COM` 번호를 기록하세요.

## 첫 단계: 읽기 전용 초기 점검(배선/전원/서보 점검)

**아무것도 쓰지 않고**, 먼저 여섯 개 서보를 하나씩 ping한 뒤 전압과 온도를 읽습니다(토크 상태는 그대로 유지):

```bash
uv run --frozen python examples/so101_mujoco/hardware_check.py --port COM172   # 换成你查到的端口
```

`--port`는 첫 단계에서 확인한 번호입니다; 점검할 암이 어느 쪽이든 해당 포트를 입력하세요(팔로워/리더 암 모두 같은 스크립트로 점검할 수 있습니다).

정상 출력은 대략 이렇습니다: 관절 여섯 줄, 온도 20–30 °C, 토크 0(암이 자유로운 상태). **전압은 전원 공급 방식에 따라 다릅니다**: 팔로워 암을 외부
전원에 연결하면 약 11V, 리더 암을 드라이버 보드 전원만으로 구동하면 약 5V입니다——서보 여섯 개를 모두 읽을 수 있으면 배선이 정상입니다. 누락/모델 불일치가
있으면 바로 오류가 보고됩니다.

## 두 번째 단계: 캘리브레이션

캘리브레이션은 "각 관절의 스트로크 범위 + 중간 기준"을 서보 EEPROM에 기록하고 로컬 파일로 저장합니다; **팔로워 암과 리더 암을 각각 한 번씩 캘리브레이션해야 합니다**.
두 암의 캘리브레이션 파일은 따로 저장되어 서로 영향을 주지 않습니다:

| 장치 | 명령 | 캘리브레이션 파일 위치 |
| --- | --- | --- |
| 팔로워 암 | `uv run --frozen lerobot-calibrate --robot.type=so101_follower --robot.port=COM172 --robot.id=juxi_so101` | `~/.cache/huggingface/lerobot/calibration/robots/so_follower/juxi_so101.json` |
| 리더 암 | `uv run --frozen lerobot-calibrate --teleop.type=so101_leader --teleop.port=COM124 --teleop.id=juxi_leader` | `.../calibration/teleoperators/so_leader/juxi_leader.json` |

명령의 각 매개변수 의미:

| 매개변수 | 설명 |
| --- | --- |
| `--robot.type=so101_follower` / `--teleop.type=so101_leader` | 캘리브레이션 대상 역할: 팔로워 암 / 리더 암(역할을 바꿔 쓰지 마세요, 캘리브레이션 파일은 역할별 디렉터리에 저장됩니다) |
| `--robot.port` / `--teleop.port` | 첫 단계에서 확인한 시리얼 포트 번호 |
| `--robot.id` / `--teleop.id` | 이 암에 붙이는 이름(이 예시에서는 `juxi_so101` / `juxi_leader`); **이후 텔레오퍼레이션/녹화에서 반드시 같은 id를 사용해야 합니다**, 그렇지 않으면 다시 캘리브레이션하라는 안내가 나옵니다 |

`id`는 임의로 정할 수 있지만, 두 암의 캘리브레이션은 각각 독립적이며 서로 덮어쓰지 않습니다.

### 물리적 단계(터미널에 안내 그림이 출력됩니다)

1. **중간 자세로 놓은 뒤 Enter**: 베이스를 책상 가장자리에 평평하게 놓고, 상완은 수직 위로, 전완은 수평 앞으로, 어깨 회전과 손목은 중앙에 맞춥니다
   (리더 암의 "그리퍼"는 핸들/트리거입니다). 이 순간의 위치가 해당 암의 "중간 기준"으로 기록됩니다.
2. Enter를 누른 뒤 **관절을 하나씩 천천히 전체 가동 범위로 움직이세요**(`wrist_roll`은 스윕할 필요 없이 자동으로 전 회전을 처리합니다), 다시 Enter를 눌러 저장합니다.

주의 사항:

- 팔로워 암은 캘리브레이션 중 토크가 0입니다(암이 힘이 빠진 상태). 손으로 받쳐 가며 움직이세요; 리더 암은 원래 토크가 없습니다.
- 캘리브레이션 과정에서 서보에 EEPROM을 씁니다(이는 캘리브레이션의 일부이며 정상입니다).
- 이번 실측 캘리브레이션 결과(참고용): 팔로워 암 각 관절 스트로크는 약 1474–2688 카운트, 손목 회전(`wrist_roll`)은 4095 카운트;
  리더 암은 약 2208–2681 카운트입니다. 스트로크가 뚜렷이 비대칭인 것은 정상입니다(원인과 보상은
  [05 영점 미세 조정](/ko/tutorials/robot-arms/so-arm101/mujoco/05-Leader-Digital-Twin) 참조).

<RelatedProducts slugs="so-arm101" />
