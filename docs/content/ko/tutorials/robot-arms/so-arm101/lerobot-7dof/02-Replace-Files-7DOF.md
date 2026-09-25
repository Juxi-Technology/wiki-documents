---
title: "2단계: 파일 교체(7DOF 적응)"
description: "공식 lerobot 클론에서 7축 개조에 필요한 파일 교체를 방안 A와 B로 나눠 정리하고, 버전 차이 시 수동 수정 두 곳까지 안내합니다."
---

# 2단계: 파일 교체(7DOF 적응)

## 1\. 공식 코드 저장소에서 클론한 경우, 교체/수정해야 하는 파일

### 방안 A: 본 저장소 코드를 직접 사용(권장)

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### 방안 B: 공식 lerobot git clone 후 수동 교체

본 저장소에서 공식 clone의 **3개 파일**을 덮어씁니다:

|본 저장소 파일(원본)|덮어쓸 위치(대상)|
|---|---|
|`src/lerobot/robots/so_follower/so_follower.py`|공식 clone의 동일 이름 파일|
|`src/lerobot/teleoperators/so_leader/so_leader.py`|공식 clone의 동일 이름 파일|

[so\_follower\.py](/downloads/so_follower.py)

[so\_leader\.py](/downloads/so_leader.py)

> 전제: 공식 clone이 본 저장소 베이스라인(lerobot 2026\-09 버전)과 구조가 일치해야 합니다.
> 
> 버전 차이가 크다면 **파일 전체를 덮어쓰지 말고**, 아래 “수동 수정” 두 곳만 적용하세요.
> 
> 

### 버전이 다를 때의 수동 수정(두 곳만 수정)

**① 모터 딕셔너리**(`so_follower.py`와 `so_leader.py`에 각각 하나씩, 내용 동일)——기존의

```Python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_roll": Motor(5, "sts3215", norm_mode_body),
"gripper": Motor(6, "sts3215", MotorNormMode.RANGE_0_100),
```

를 다음과 같이 변경합니다

```Python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_yaw": Motor(5, "sts3215", norm_mode_body),   # 신규 서보, 좌우 회전
"wrist_roll": Motor(6, "sts3215", norm_mode_body),  # 기존 5번 롤 모터, ID 5→6
"gripper": Motor(7, "sts3215", MotorNormMode.RANGE_0_100),
```

**② 캘리브레이션 로직**(두 파일 각각의 `calibrate()`)——"한 바퀴 회전 관절" 특수 처리를 제거합니다: 기존의

```Python
full_turn_motor = "wrist_roll"
unknown_range_motors = [motor for motor in self.bus.motors if motor != full_turn_motor]
range_mins, range_maxes = self.bus.record_ranges_of_motion(unknown_range_motors)
range_mins[full_turn_motor] = 0
range_maxes[full_turn_motor] = 4095
```

를 다음 한 줄로 교체하여, 모든 관절의 실제 범위를 기록하도록 합니다:

```Python
range_mins, range_maxes = self.bus.record_ranges_of_motion()
```

> 이유: 기존 버전은 `wrist_roll`(전완 축 롤)을 한 바퀴(0\~4095) 회전 가능한 관절로 간주하여 하드코딩했습니다. 7\-DOF 개조 후에는 5/6번 손목 관절(yaw / roll)**모두 기계적 리미트가 걸려 한 바퀴 회전이 불가능**하므로, 한 바퀴 회전을 하드코딩하면 코드가 기계적으로 도달할 수 없는 각도로 관절 명령을 보내 파손 위험이 있습니다. 이제 캘리브레이션 시 모든 모터의 실제 min/max를 수동으로 기록합니다.
> 
> 

### 양팔(듀얼 팔로워 암) 설명

`bi_so_follower` / `bi_so_leader`(`src/lerobot/robots/bi_so_follower/`, `src/lerobot/teleoperators/bi_so_leader/`)는 단일 암을 한 겹 감싸 `left_`/`right_` 접두사를 붙이는 것뿐이며, **모터 정의를 포함하지 않습니다**. **위의 단일 암 파일**만 수정하면 양팔 명령(`--robot.type=bi_so_follower`)도 자동으로 7\-DOF가 됩니다.

