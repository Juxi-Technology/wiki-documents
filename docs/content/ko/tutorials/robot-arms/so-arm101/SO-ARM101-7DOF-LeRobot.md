---
title: SO-ARM101 7-DOF 개조와 LeRobot 사용 튜토리얼
description: "SO-ARM101을 6 서보에서 7 자유도(wrist_yaw 추가)로 개조한 후의 서보 ID 대조표, 코드 변경과 교체 방법, 캘리브레이션 주의사항, 그리고 LeRobot에서의 사용 방법."
---

# SO-ARM101 7-DOF 개조와 LeRobot 사용 튜토리얼

> **[스토어에서 구매](https://www.juxitech.com/ko/products/so-arm101-developers-kit)**

본 튜토리얼은 **SO-ARM101을 6 서보에서 7 서보로 개조**한 후 LeRobot으로 전체 흐름(캘리브레이션 → 녹화 → 훈련 → 배포)을 실행하려는 사용자를 대상으로 합니다. 대응하는 개조 버전 코드는 LeRobot 공식 소스를 복사해 개조한 것으로, **SO-ARM101 7 자유도 로봇 암**(STS3215 서보 7개)에 맞게 적용되었습니다.

**공식 SO-101(6 서보)과의 핵심 차이:**

| 서보 ID | 관절 이름 | 공식 SO-101(6-DOF) | 설명 |
| :---: | :--- | :--- | :--- |
| 1 | `shoulder_pan` | shoulder_pan | 어깨 수평 회전 |
| 2 | `shoulder_lift` | shoulder_lift | 어깨 상승 |
| 3 | `elbow_flex` | elbow_flex | 팔꿈치 굽힘 |
| 4 | `wrist_flex` | wrist_flex | 손목 피치(상하 굽힘) |
| 5 | `wrist_yaw` | —(신규 추가) | 손목 요(좌우 회전 약 90°), **이번에 새로 추가된 서보**(기존 4·5번 사이에 삽입) |
| 6 | `wrist_roll` | wrist_roll(ID 5→6) | 손목 롤, 기존 5번 롤 모터, 프린트 부품은 변경되지 않았고 이름도 동일 |
| 7 | `gripper` | gripper(ID 6→7) | 그리퍼, 기존 ID=6, 개조 후 7로 순연 |

> ⚠️ 주의: **6 서보 버전의 데이터, 캘리브레이션 파일, 기학습 모델은 모두 7-DOF 개조와 호환되지 않으므로**, 본 튜토리얼에 따라 처음부터 다시 해야 합니다.

## 관절 데이터 순서

녹화 후 Parquet에서 `action` / `observation.state`의 관절 차원 순서는 다음과 같습니다:

`shoulder_pan → shoulder_lift → elbow_flex → wrist_flex → wrist_yaw → wrist_roll → gripper`

## 기계 설치 변화

기존 4번(`wrist_flex`)과 5번(`wrist_roll`) 사이에 새로 추가된 `wrist_yaw` 서보와 프린트 부품 하나를 삽입하고, 그 뒤의 모터는 전체적으로 한 자리씩 뒤로 이동합니다: 기존 5번 롤 모터 → 6번 자리, 그리퍼 → 7번 자리(이 두 기존 모터의 프린트 부품은 변경되지 않았습니다).

## 핵심 코드 변경

1. **모터 정의를 7개로 변경**: `wrist_yaw(5)`(좌우 회전) 추가; 기존 `wrist_roll` 모터는 **ID 6**으로 이동(여전히 롤, 이름 동일); 그리퍼 `gripper(6)` → `gripper(7)`. 그리퍼는 여전히 `RANGE_0_100`(0~100 개폐도)을 사용하고, 나머지 관절은 `DEGREES`를 사용합니다.
   - `src/lerobot/robots/so_follower/so_follower.py`
   - `src/lerobot/teleoperators/so_leader/so_leader.py`
2. **캘리브레이션에서 더 이상 "한 바퀴 회전 관절"을 설정하지 않음**: 기존 코드는 `wrist_roll`을 한 바퀴 회전(0~4095) 관절로 하드코딩했습니다; 7-DOF 개조 후에는 손목 yaw/roll 모두 기계적 리미트가 있어 한 바퀴 회전이 불가능하므로, 캘리브레이션 시 `record_ranges_of_motion()`으로 **모든** 관절의 실제 동작 범위를 기록하도록 변경했습니다.
   - `src/lerobot/robots/so_follower/so_follower.py`(`calibrate()`)
   - `src/lerobot/teleoperators/so_leader/so_leader.py`(`calibrate()`)

## 개조 버전 저장소 사용 또는 파일 수동 교체

공식 코드 저장소에서 클론한 경우, 다음 파일을 교체/수정해야 합니다.

### 방안 A: 개조 버전 저장소를 직접 사용(권장)

7-DOF 적용이 완료된 코드 저장소를 그대로 사용하며, 수동 수정이 필요 없습니다.

### 방안 B: 공식 lerobot git clone 후 수동 교체

개조 버전 저장소에서 공식 clone의 **파일 3개**를 덮어씁니다:

| 개조 버전 저장소 파일(원본) | 덮어쓸 위치(대상) |
| :--- | :--- |
| `src/lerobot/robots/so_follower/so_follower.py` | 공식 clone의 동일 이름 파일 |
| `src/lerobot/teleoperators/so_leader/so_leader.py` | 공식 clone의 동일 이름 파일 |
| `src/lerobot/robots/so_follower/robot_kinematic_processor.py` | 공식 clone의 동일 이름 파일(**주석 수정만 있고 기능에는 영향 없음, 교체하지 않아도 됨**) |

```bash
cp src/lerobot/robots/so_follower/so_follower.py          <공식 clone>/src/lerobot/robots/so_follower/so_follower.py
cp src/lerobot/teleoperators/so_leader/so_leader.py       <공식 clone>/src/lerobot/teleoperators/so_leader/so_leader.py
```

> 전제: 공식 clone이 개조 버전 저장소의 베이스라인(lerobot 2026-08 버전)과 구조가 일치해야 합니다. 버전 차이가 크다면 **파일 전체를 덮어쓰지 말고**, 아래 "수동 수정" 두 곳만 적용하세요.

### 버전이 다를 때의 수동 수정(두 곳만 수정)

**① 모터 딕셔너리**(`so_follower.py`와 `so_leader.py`에 각각 하나씩, 내용 동일)——기존의

```python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_roll": Motor(5, "sts3215", norm_mode_body),
"gripper": Motor(6, "sts3215", MotorNormMode.RANGE_0_100),
```

를 다음과 같이 변경합니다

```python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_yaw": Motor(5, "sts3215", norm_mode_body),   # 추가된 서보, 좌우 회전
"wrist_roll": Motor(6, "sts3215", norm_mode_body),  # 기존 5번 롤 모터, ID 5→6
"gripper": Motor(7, "sts3215", MotorNormMode.RANGE_0_100),
```

**② 캘리브레이션 로직**(두 파일 각각의 `calibrate()`)——"한 바퀴 회전 관절" 특수 처리를 제거하고, 다음을

```python
full_turn_motor = "wrist_roll"
unknown_range_motors = [motor for motor in self.bus.motors if motor != full_turn_motor]
range_mins, range_maxes = self.bus.record_ranges_of_motion(unknown_range_motors)
range_mins[full_turn_motor] = 0
range_maxes[full_turn_motor] = 4095
```

한 줄로 교체하여 모든 관절의 실제 범위를 기록하도록 합니다:

```python
range_mins, range_maxes = self.bus.record_ranges_of_motion()
```

수정 이유와 위험은 아래 "캘리브레이션 주의사항" 절을 참조하세요.

## 캘리브레이션 주의사항

- **더 이상 "한 바퀴 회전 관절"이 없음**: 기존 공식 코드는 `wrist_roll`(전완 축 롤)을 한 바퀴(0~4095) 회전 가능한 관절로 하드코딩했습니다. 7-DOF 개조 후에는 5/6번 손목 관절(`wrist_yaw` / `wrist_roll`) 모두 기계적 리미트가 걸려 한 바퀴 회전이 불가능합니다.
- **위험 설명**: 공식의 한 바퀴 하드코딩을 그대로 사용하면 코드가 기계적으로 도달할 수 없는 각도로 관절 명령을 보내 파손 위험이 있습니다; 따라서 캘리브레이션 시 모든 모터의 실제 min/max를 수동으로 기록하도록 변경했습니다(위 코드 수정 ②에 해당).
- **6 서보 버전의 캘리브레이션 파일은 7-DOF와 호환되지 않으므로**, 개조 후 반드시 다시 캘리브레이션해야 합니다.
- 양팔(듀얼 팔로워 암)의 캘리브레이션과 사용 흐름은 [SO-ARM101 양팔(듀얼 팔로워 암) 튜토리얼](./SO-ARM101-Bi-Arm-Tutorial.md)을 참조하세요.

## 양팔(bi_so_follower) 설명

`bi_so_follower` / `bi_so_leader`(`src/lerobot/robots/bi_so_follower/`, `src/lerobot/teleoperators/bi_so_leader/`)는 단일 암을 한 겹 감싸 `left_`/`right_` 접두사를 붙이는 것뿐이며, **모터 정의를 포함하지 않습니다**. 위의 단일 암 파일만 수정하면 양팔 명령(`--robot.type=bi_so_follower`)도 자동으로 7-DOF가 됩니다. 전체 양팔 흐름(캘리브레이션, 텔레오퍼레이션, 데이터셋 녹화, 훈련, 배포)은 [SO-ARM101 양팔(듀얼 팔로워 암) 튜토리얼](./SO-ARM101-Bi-Arm-Tutorial.md)을 참조하세요.

<RelatedProducts slugs="so-arm101" />
