---
title: "SO-ARM101 로봇 암 7축 튜토리얼"
description: "7축 과정을 시작하기 전에 서보 ID와 관절 대응을 확인하고, 6 서보 암에서 달라지는 점과 파일 교체 방법 선택을 안내합니다."
---

# SO\-ARM101 로봇 암 7축 튜토리얼

# SO\-ARM101 7\-DOF · 실행 전 준비

> 이 설명은 **SO\-ARM101을 6 서보에서 7 서보로 개조**한 뒤, LeRobot으로 전체 흐름(캘리브레이션 → 녹화 → 훈련 → 배포)을 실행하려는 분을 대상으로 합니다.
> 대응 코드: 본 저장소(`lerobot-7dof`)는 공식 lerobot의 fork이며, SO 관련 모터 구성만 변경했습니다.
> 
> 

---

## 0\. 먼저 자신의 로봇 암을 확인하세요

7 서보(모두 STS3215), 서보 ID와 관절의 대응 관계:

|**서보 ID**|**관절 이름**|**설명**|
|---|---|---|
|1|`shoulder_pan`|어깨 수평 회전|
|2|`shoulder_lift`|어깨 들어올림|
|3|`elbow_flex`|팔꿈치 굽힘|
|4|`wrist_flex`|손목 피치(상하 굽힘)|
|5|`wrist_yaw`|손목 요(좌우 회전 약 90°) · **이번에 새로 추가된 서보**(기존 4·5번 사이에 삽입)|
|6|`wrist_roll`|손목 롤 · 기존 5번 롤 모터, ID 5→6, 프린트 부품 변경 없음, 이름 동일|
|7|`gripper`|그리퍼 · 기존 ID=6, 개조 후 7번으로 이동|

관절 데이터 순서(녹화 후 Parquet에서 `action` / `observation.state`의 관절 차원 순서):
`shoulder_pan → shoulder_lift → elbow_flex → wrist_flex → wrist_yaw → wrist_roll → gripper`.

⚠️ 주의: **6 서보 버전의 데이터, 캘리브레이션 파일, 이미 훈련된 모델은 모두 본 저장소와 호환되지 않습니다**, 반드시 아래 절차에 따라 처음부터 다시 해야 합니다.

---

## 1\. 공식 코드 저장소에서 클론한 경우, 교체/수정해야 하는 파일

### 방안 A: 본 저장소 코드를 직접 사용(권장)

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### 방안 B: 공식 lerobot git clone 후 수동 교체

본 저장소에서 공식 clone의 **3개 파일**을 덮어씁니다:

|본 저장소 파일(원본)|덮어쓸 위치(대상)|
|---|---|
|`src/lerobot/robots/so_follower/so_follower.py`|공식 clone의 동일 이름 파일|
|`src/lerobot/teleoperators/so_leader/so_leader.py`|공식 clone의 동일 이름 파일|
|`src/lerobot/robots/so_follower/robot_kinematic_processor.py`|공식 clone의 동일 이름 파일(**주석 수정만 있으며**, 기능에 영향 없음, 교체하지 않아도 됨)|

```Bash
cp src/lerobot/robots/so_follower/so_follower.py          <官方clone>/src/lerobot/robots/so_follower/so_follower.py
cp src/lerobot/teleoperators/so_leader/so_leader.py       <官方clone>/src/lerobot/teleoperators/so_leader/so_leader.py
```

> 전제: 공식 clone이 본 저장소 베이스라인(lerobot 2026\-08 버전)과 구조가 일치해야 합니다. 버전 차이가 크다면 **파일 전체를 덮어쓰지 말고**, 아래 "수동 수정" 두 곳만 적용하세요.
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

`bi_so_follower / bi_so_leader(src/lerobot/robots/bi_so_follower/, src/lerobot/teleoperators/bi_so_leader/)는 단일 암을 한 겹 감싸 left_/right_ 접두사를 붙이는 것뿐이며, `**`모터 정의를 포함하지 않습니다`**`. 위의 `**`단일 암 파일`**`만 수정하면 양팔 명령(--robot.type=bi_so_follower)도 자동으로 7-DOF가 됩니다.`

## 1. LeRobot 환경 설치

- [Ubuntu 컴퓨터](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Ubuntu)
- [Windows 컴퓨터](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Windows)
- [Mac 컴퓨터](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/MacOS)

## 2. 2단계: 파일 교체(7DOF 적응)

- [2단계: 파일 교체(7DOF 적응)](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/02-Replace-Files-7DOF)

## 3. 시리얼 포트 확인

- [Ubuntu](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Ubuntu)
- [Windows 컴퓨터](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Windows)
- [Mac 컴퓨터](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/MacOS)

## 4. 로봇 암 캘리브레이션

- [Ubuntu 컴퓨터](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Ubuntu)
- [Windows 컴퓨터](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Windows)
- [Mac 컴퓨터](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/MacOS)

## 5. 원격조작

- [Ubuntu 컴퓨터](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Ubuntu)
- [Windows 컴퓨터](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Windows)
- [Mac 컴퓨터](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/MacOS)

## 6. 카메라 원격조작

- [Ubuntu 컴퓨터](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Ubuntu)
- [Windows 컴퓨터](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Windows)
- [Mac 컴퓨터](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/MacOS)

## 7. 데이터셋 수집

- [데이터셋 다시 보기, 재생](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Browse-and-Replay)
- [데이터셋 수집 주의 사항](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Collection-Notes)
- [Hugging Face 계정 등록(선택 사항)](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Account)
- [HuggingFace에 데이터셋 업로드(선택 사항)](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Dataset-Upload)
- [시연 데이터셋 수집-악수 200](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording-Handshake-200)
- [시연 데이터셋 수집](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording)

## 8. 모델 학습

- [클라우드 GPU 학습 환경 설정](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Cloud-GPU)
- [학습 커맨드라인-ACT(입문 추천)](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-ACT)
- [학습 커맨드라인-Diffusion](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-Diffusion)
- [학습 커맨드라인-pi0.5](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0.5)
- [학습 커맨드라인-pi0(효과 최고)](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0)
- [학습 커맨드라인-pi0fast](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0fast)
- [학습 커맨드라인-smolvla(심화 추천)](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-smolvla)
- [HuggingFace에 모델 업로드(선택 사항)](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/HF-Model-Upload)
- [LeRobot이 지원하는 모방학습 알고리즘](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Imitation-Learning-Algorithms)
- [로컬 Ubuntu 학습](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Local-Ubuntu)
- [모델 가중치 파일 얻기](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Model-Weights)
- [학습 파라미터 제안](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Training-Parameter-Tips)
- [wandb 실시간 학습 곡선 확인](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/WandB-Curves)

## 9. 모델 배포

- [커맨드라인 설명](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/CLI-Reference)
- [추론 커맨드라인-ACT](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-ACT)
- [추론 커맨드라인-Diffusion](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-Diffusion)
- [추론 커맨드라인-pi0.5](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0.5)
- [추론 커맨드라인-pi0](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0)
- [추론 커맨드라인-smolvla](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-smolvla)
- [자주 발생하는 Bug 및 해결](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Common-Bugs)
- [NVIDIA DGX Spark 추론](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/DGX-Spark)
- [D-Robotics RDK S100 추론](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/RDK-S100)
