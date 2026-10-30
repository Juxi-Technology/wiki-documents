---
title: "인터페이스 제어 튜토리얼"
description: "AmazingHand Python GUI / 명령줄 제어 도구: 좌우손 선택, 설치, 캘리브레이션, 프로토콜 및 자주 묻는 질문."
---

# 인터페이스 제어 튜토리얼

## AmazingHand Python 제어 도구(왼손 및 오른손 지원)

Python으로 작성된 GUI 및 명령줄 도구로, 시리얼 버스 서보 드라이버 보드를 통해 8개의 Feetech SCS0009 서보를 제어하여 [Pollen Robotics의 AmazingHand](https://github.com/pollen-robotics/AmazingHand) 로봇 손을 구동합니다.

> **왼손과 오른손 모두 지원합니다.** 시작할 때 오른손(서보 ID 1-8) 또는 왼손(서보 ID 11-18)을 선택하며, --hand로 질문을 건너뛸 수 있습니다. 포즈 라이브러리는 좌우손이 공유하고, 각 손은 data/config.yaml에서 서보 매핑, 설치 오프셋, 원시값 목표를 각각 유지합니다. 자세한 내용은 좌우손 선택을 참조하세요.

![그림](../../../../../public/images/tutorials/robot-arms/amazing-hand/interface-control/01.png)

---

## 프로젝트 구조

```text
amazing_hand_gui.py   – GUI 主程序
amazing_hand_cmd.py   – 命令行工具
hand_logic.py         – 共用业务逻辑(不依赖 UI)
pyproject.toml        – 包元数据、依赖、pytest 配置
data/
  config.yaml         – 应用设置(串口、限位、原始值目标)
  hand_config.yaml    – 已保存的手势与序列
docs/
  REQUIREMENTS.md       – 需求与验收标准
  user_manual.md        – 用户手册
  CONFIG_FORMAT.md      – 配置文件格式说明
  scs_servo_protocol.md – SCS0009 寄存器参考
  优化说明.md            – 相对原版的改动说明与原因
  CHANGES.md            – 同一份文档的英文版
tests/
  test_hand_logic.py      – hand_logic 单元测试(155 项)
  test_gui_utils.py       – GUI 工具函数单元测试(51 项)
  test_cmd.py             – CLI 单元测试(42 项)
  test_integration.py     – 集成测试(14 项)
  test_system.py          – 子进程系统测试(22 项)
  test_system_hardware.py – 硬件测试(33 项,需 --hardware)
  test_cmd_hardware.py    – CLI 硬件测试(21 项,需 --hardware)
```

## 환경 요구 사항

- Python 3.10 이상(GUI에는 Tkinter 필요)
- 8개 서보용 독립 5V 외부 전원 공급
- 드라이버가 설치된 USB 시리얼 버스 어댑터

## 설치

pip 설치를 권장합니다(pyproject.toml 읽음):

```bash
pip install -e .
```

또는 의존성을 직접 설치:

```bash
pip install -r requirements.txt
```

개발 및 테스트 환경:

```bash
pip install -r requirements-dev.txt
```

---

## 캘리브레이션

서보의 각도 체계, 제스처 프리셋 및 중간 위치는 실제 기계식 손에 따라 달라집니다. 이 매개변수는 모두 data/config.yaml에 집중되어 있습니다.

### 좌우손 선택

두 손은 사용하는 서보와 기계 구조가 다르기 때문에 UI가 뜨기 전에 먼저 선택합니다:

```text
  AmazingHand — which hand?
    1 = right hand  (servo IDs 1-8)
    2 = left hand   (servo IDs 11-18)
  Enter 1 or 2 [1]:
  LEFT hand — servo IDs 11-18
    Ring (11, 12)  Middle (13, 14)  Pointer (15, 16)  Thumb (17, 18)
    middle position raw: [571, 451, 571, 451, 571, 451, 571, 451]
```

질문 건너뛰기:

```bash
python amazing_hand_gui.py --hand left
python amazing_hand_cmd.py --pose victory --hand left
```

--hand를 지정하지 않으면 data/config.yaml의 hand: 값을 사용합니다.

**왼손이 단순히 ID 그룹만 바꾸는 것이 아닌 이유.** 서보 번호(오른손 1-8, 왼손 11-18이며 왼손의 손가락 번호는 거울상 — 약지가 먼저) 외에도 왼손에는 두 가지 기계적 차이가 있으며, 프로그램이 모두 자동으로 처리합니다:

|  | 오른손 | 왼손 |
|---|---|---|
| 서보 ID | 1-8 | 11-18 |
| 손가락 → ID | 검지 1,2 / 중지 3,4 / 약지 5,6 / 엄지 7,8 | 약지 11,12 / 중지 13,14 / 검지 15,16 / 엄지 17,18 |
| 제조사 MiddlePos | [451, 571, …] | [571, 451, …] |
| 설치 오프셋 | 0° | **−35.16°**(hands.left.angle_offset) |
| 동일 손가락 2서보 | (a, b) | **(b, a)**(hands.left.mirror_pose) |

위 마지막 두 항목 중 하나라도 빠지면 제스처가 망가집니다: 설치 오프셋이 없으면 손가락마다 35°씩 어긋나고, 같은 손가락의 서보 교환이 없으면 벌어지는 방향이 완전히 반대로 바뀝니다(V자 제스처에서 두 손가락이 붙어 버리고, 붙어야 할 세 손가락이 벌어집니다).

data/hand_config.yaml은 **좌우손이 공유**하며, 항상 오른손 순서로 저장됩니다. 왼손은 읽을 때 변환되고 저장할 때 다시 되돌려집니다.

**새 손을 캘리브레이션하기.** hands.left의 값을 템플릿으로 삼은 다음, 다음 순서로 검증합니다:

1. **Middle position**을 누르고 Current (0-1023) 행에서 예상한 원시값이 읽히는지 확인합니다
1. **Open All** / **Close All**을 누릅니다 — 스트로크가 기계적 한계까지 도달하고 걸림(스톨)이 없어야 합니다
1. 벌림 제스처를 시험합니다(victory는 V자로 벌어지고, greeting은 세 손가락이 붙습니다)

어느 항목이 잘못되었을 때 어떤 매개변수를 조정해야 하는지:

| 증상 | 수정 위치 |
|---|---|
| Middle position 판독값이 잘못됨 | hands.<이름>.raw_positions.middle |
| 벌어지는 방향이 반대임 | hands.<이름>.mirror_pose |
| 스트로크가 부족하거나 과함 | hands.<이름>.raw_positions.open / close |

### 각도 체계

GUI와 CLI 모두 **각도 값**을 사용하며, rustypot 드라이버가 서보 내부의 원시값으로 변환합니다:

```text
raw = 1024 × angle / 300° + 511        (0.29297°/step,原始值范围 0–1023)
```

| 각도 | 의미 |
|---|---|
| **−35°** | 완전히 벌림(폄) |
| **0°** | 중간 위치, 손가락이 자연스럽게 살짝 굽음 |
| **+75°** | 완전히 쥠(주먹) |

짝수 ID 서보는 홀수 ID에 대해 **부호가 반전**되므로, 포즈 값 하나로 같은 손가락의 두 서보를 반대 방향으로 움직일 수 있습니다. 이는 프로그램이 자동으로 처리하므로 직접 환산할 필요가 없습니다.

### 리밋

```text
limits:
  servo_min: -75      # 任何舵机指令的绝对行程上下限
  servo_max: 75
  base_min: -75       # 开合滑块范围
  base_max: 75
  side_min: -35       # 左右滑块范围
  side_max: 35
```

side_min/side_max는 **좌우 벌림**을 제어합니다. 프로그램이 정규화(u = |side_offset| / |side_min|)를 수행하므로 **이 범위만 변경해도 실제 벌림 폭은 변하지 않습니다** — 슬라이더 눈금만 압축될 뿐입니다. 손가락이 벌어지는 각도를 실제로 바꾸려면 auto_extremes도 함께 수정해야 합니다.

### 원시값 목표

세 개의 전역 위치 버튼은 각도 모델을 거치지 않고 서보를 **정확한 원시값**으로 구동합니다:

```text
raw_positions:              # 下标 0 -> 舵机 ID 1 …… 下标 7 -> 舵机 ID 8
  open:   [260, 760, 260, 760, 260, 760, 260, 760]
  close:  [760, 260, 760, 260, 760, 260, 760, 260]
  middle: [451, 571, 451, 571, 451, 571, 451, 571]
```

- open / close — 기계적 스트로크의 양 끝. 제조사의 Feetech 디버깅 도구로 서보를 개별 구동하여 측정합니다.
- middle — **캘리브레이션된 기계적 중간 위치**(제조사 Arduino 데모 프로그램의 MiddlePos). open과 close의 중간점이 **아니라** raw 511에서 약 **±60 raw(±17.6°)** 벗어나 있다는 점에 주의하세요.

> 이 값들은 **손마다 개별적인 캘리브레이션 값**입니다. 제조사 원문은 *"replace values by your calibration results"* 입니다.

**검증 방법:** Servo Feedback 패널에 Current (0-1023) 행이 있어 원시 위치를 실시간으로 표시합니다. **Middle position** 버튼을 누른 후 이 행에서 451, 571, 451, 571, … 이 읽혀야 합니다.

### 컨트롤 범위 요약

| 컨트롤 | 범위 |
|---|---|
| 개폐 슬라이더(세로) | −75 … +75 |
| 좌우 슬라이더(가로) | −35 … +35 |
| 속도 | 1(느림) … 6(빠름) |

속도 값은 드라이버가 rad/s로 서보에 전달하므로 1–6은 대략 **57–344 °/s**에 해당합니다. 부하가 걸리면 실제 속도는 그 값의 약 **70%**가 됩니다 — 시퀀스 지연을 정할 때 이를 감안해야 합니다.

---

## GUI 실행 (amazing_hand_gui.py)

pip 설치 후 바로 호출할 수 있습니다:

```text
amazing-hand-gui
amazing-hand-gui --port /dev/ttyUSB0
```

또는 직접 실행:

```bash
python amazing_hand_gui.py
python amazing_hand_gui.py --port /dev/ttyUSB0
```

포트 드롭다운에는 이 컴퓨터에 **실제로 존재하는** 시리얼 포트가 나열됩니다(pyserial 우선, 없으면 Windows 레지스트리 읽기). 따라서 번호가 뒤인 어댑터도 표시됩니다. 드롭다운에 포트 번호를 직접 입력할 수 있습니다. 설정의 기본 포트가 꽂혀 있지 않으면 GUI는 자동으로 첫 번째 실제 포트로 시작합니다. 포트를 고정하려면 --port를 명시적으로 전달하세요.

### 기능

- 손가락별 슬라이더로 개폐와 좌우를 제어하며, **Auto**(개폐 + 좌우)와 **Raw**(두 서보 각도를 직접 제어) 두 가지 모드를 지원
- 손가락별 Open / Close / Center 단축 버튼
- 손가락별 속도 선택(1–6), 전역 속도 동기화 드롭다운 별도 제공
- 정밀 미세 조정을 위한 키보드 단축키
- **전역 위치 버튼**: Open All, Close All, Center All, Middle position
- data/hand_config.yaml 기반 제스처 및 시퀀스 관리
- 저장된 제스처를 UI에서 직접 삭제 가능(🗑 Delete 버튼)
- 실시간 서보 텔레메트리 곡선(위치, 부하, 온도, 전압)
- Servo Feedback 표. 실시간 **원시 위치**(0–1023)를 포함하며 캘리브레이션 검증에 사용 가능

### 키보드 조작

- **1-4**: 손가락 선택(Ring 약지, Middle 중지, Pointer 검지, Thumb 엄지)
- **방향키**: 선택한 손가락 이동
  - 위/아래: 쥐기 / 펴기
  - 왼쪽/오른쪽: 좌우 이동
- **보조 키**:
  - 없음: 1°씩(정밀 조정)
  - Shift: 5°씩(일반)
  - Ctrl: 10°씩(빠르게)
- **빠른 동작**:
  - Q: 선택한 손가락 완전히 쥐기
  - E: 선택한 손가락 완전히 펴기
  - C: 좌우 위치 중앙 복귀

### 전역 버튼

| 버튼 | 개폐 | 좌우 |
|---|---|---|
| ✋ **Open All** | 모든 손가락을 원시값 open으로 | 중앙 복귀 |
| ✊ **Close All** | 모든 손가락을 원시값 close로 | 중앙 복귀 |
| ⊙ **Center All** | **변경 없음** | 중앙 복귀 |
| ⊙ **Middle position** | 모든 손가락을 원시값 middle로 | 중앙 복귀 |

**Global Speed** 드롭다운(1–6)은 선택한 속도를 모든 손가락 컨트롤에 즉시 적용하고 각 손가락의 슬라이더 표시도 동기화합니다.

세 개의 원시값 버튼(Open All, Close All, Middle position)은 각도 모델을 우회하므로 **실행 후 슬라이더에는 정확한 값이 아니라 가장 가까운 표현 가능한 값이 표시됩니다**. 그 후 슬라이더를 건드리면 손이 원시값 목표에서 최대 약 0.3° 벗어납니다 — 이는 캘리브레이션 위치를 정확히 맞추기 위한 의도적인 트레이드오프입니다.

> 알려진 문제: Center All은 **Raw** 모드인 손가락을 **건너뛰지 않고** 수동으로 설정한 원시 각도를 덮어씁니다. 단일 손가락의 ⊙ Center 버튼은 덮어쓰지 않습니다.

---

## CLI 실행 (amazing_hand_cmd.py)

독립적인 명령줄 도구로, GUI를 시작하지 않고도 제스처를 적용하고 시퀀스를 재생할 수 있습니다. GUI와 동일한 data/hand_config.yaml을 읽고 저장된 포즈 값을 **그대로 전송**합니다 — GUI가 보내는 것과 완전히 동일합니다.

### Linux: 시리얼 포트 권한

USB 시리얼 어댑터는 일반적으로 /dev/ttyACM0(Waveshare / CDC-ACM) 또는 /dev/ttyUSB0(FTDI / CH340)로 나타납니다.

확인 방법:

```bash
ls /dev/ttyACM* /dev/ttyUSB* 2>/dev/null
# 或者
dmesg | grep -E 'ttyACM|ttyUSB' | tail -5
```

**Permission denied**가 발생하면 현재 사용자를 dialout 그룹에 추가한 후 다시 로그인하세요:

```bash
sudo usermod -aG dialout $USER
```

### pip 설치 후

```text
amazing-hand-cmd --list
amazing-hand-cmd --pose open
amazing-hand-cmd --sequence demo --loop
amazing-hand-cmd --pose open --speed 6
# 需要时覆盖串口:
amazing-hand-cmd --pose open --port /dev/ttyUSB0
```

### 직접 실행

```bash
python amazing_hand_cmd.py --list
python amazing_hand_cmd.py --pose open
python amazing_hand_cmd.py --pose close --speed 6
python amazing_hand_cmd.py --sequence demo
python amazing_hand_cmd.py --sequence wave --loop
python amazing_hand_cmd.py --port /dev/ttyUSB0 --pose open
python amazing_hand_cmd.py --list --config /path/to/hand_config.yaml
```

### 매개변수

| 매개변수 | 기본값 | 설명 |
|---|---|---|
| --pose NAME | – | 지정한 이름의 제스처 적용 |
| --sequence NAME | – | 지정한 이름의 시퀀스 재생 |
| --list | – | 모든 제스처와 시퀀스 나열 |
| --loop | 끔 | Ctrl+C까지 시퀀스 반복 재생 |
| --speed N | 3 | 서보 속도 1(느림)… 6(빠름) |
| --port PORT | Linux /dev/ttyACM0<br>Windows COM9 | 시리얼 포트 번호 |
| --baudrate N | 1000000 | 보드레이트 |
| --config PATH | data/hand_config.yaml | 다른 설정 파일 지정 |
| --hand {right,left} | config.yaml의 hand | 사용할 손 지정(오른손 1-8, 왼손 11-18) |

스크립트 종료 시(Ctrl+C 포함) 모든 서보의 토크가 자동으로 해제됩니다.

> CLI에는 data/config.yaml에 대응하는 --config 매개변수가 없으며, 이 파일은 항상 프로젝트 디렉터리에서 로드됩니다.

---

## 설정 파일

### data/config.yaml

| 섹션 | 용도 |
|---|---|
| serial | 플랫폼별 기본 시리얼 포트, 보드레이트, 선택 가능한 보드레이트 목록 |
| servos | 손가락별 대응 서보 ID |
| limits | 서보와 두 슬라이더의 각도 범위 |
| speeds | 1–6 속도 스케일의 기본값/최솟값/최댓값 |
| auto_extremes | 좌우 슬라이더가 한계에 도달했을 때의 서보 위치 |
| raw_positions | 전역 위치 버튼의 정확한 원시값 목표 |
| paths | 제스처/시퀀스 파일 위치 |

### 서보와 손가락의 대응 관계

| 손가락 | 서보 ID | 포즈 배열 인덱스 |
|---|---|---|
| Pointer 검지 | 1, 2 | 4, 5 |
| Middle 중지 | 3, 4 | 2, 3 |
| Ring 약지 | 5, 6 | 0, 1 |
| Thumb 엄지 | 7, 8 | 6, 7 |

**포즈 배열의 순서는 약지, 중지, 검지, 엄지이며, 서보 ID 순서가 아닙니다.** hand_config.yaml을 직접 편집할 때 가장 헷갈리기 쉬운 부분입니다.

> amazing_hand_cmd.py 상단의 주석에는 "index 0→servo1 … 7→servo8"이라고 적혀 있지만, **그 주석은 잘못된 것**이며 위 표가 코드의 실제 동작입니다.

---

## 제스처와 시퀀스

모든 제스처와 시퀀스는 data/hand_config.yaml에 저장됩니다. 파일이 없으면 GUI가 자동으로 생성합니다.

### 제스처 저장

1. 슬라이더나 키보드로 손을 목표 포즈로 움직입니다
1. "Name:" 입력란에 이름을 입력합니다
1. Pose Management 영역의 "➕ Add New"를 클릭합니다

속도는 슬라이더의 이동 속도에만 영향을 줍니다. 저장된 제스처는 8개 서보 위치만 기록합니다.

### 제스처 불러오기 / 삭제

- 드롭다운에서 선택한 후 **✓ Apply**를 클릭하면 손이 해당 포즈로 이동합니다
- Apply 오른쪽의 **🗑 Delete**를 클릭하고 확인하면 영구 삭제됩니다

### 시퀀스 관리

1. Sequence Player에서 "🔧 Manage"를 클릭하여 시퀀스 관리자를 엽니다
1. **Saved Sequences**(왼쪽 열)
  - 기존 시퀀스 조회, 실행, 편집 또는 삭제
  - 더블 클릭 또는 "▶ Execute" 클릭으로 1회 실행

1. **Sequence Builder**(오른쪽 열)
  - "Available Poses"의 제스처를 더블 클릭하면 한 단계로 추가됩니다
  - 각 단계마다 8개 서보의 속도와 지연을 개별 설정할 수 있습니다. 단계는 "pose:s1,s2,...,s8|delay" 형식으로 저장됩니다
  - ↑/↓로 순서를 조정하거나 "⏱ Delay" 버튼으로 독립 일시정지를 삽입합니다
  - 이름을 입력한 후 "💾 Save Sequence"를 클릭하여 저장합니다. "▶ Execute"를 클릭하면 저장하지 않고 먼저 시험 실행할 수 있습니다

1. 메인 창으로 돌아가 연속 재생이 필요하면 Sequence Player의 **Loop**를 체크합니다

### 단계 형식

```text
pose_name:speed1,speed2,...,speed8|delay
```

- speed1..speed8 — 포즈 순서대로 나열된 8개 서보 속도(1–6)
- delay — 다음 단계까지의 대기 시간(예: 0.6s). **생략 가능**하며, 생략 시 GUI는 고정 자동 대기로 대체합니다
- 독립 일시정지는 SLEEP:1.0s로 표기합니다(쉼표로 구분된 속도 목록 없음)

**지연 선택 방법.** 드라이버 자체는 서보가 정지했는지 읽을 수 있지만, 시퀀스 재생은 고정 지연을 사용합니다. 대략 스트로크 각도 / (속도 × 57.3 × 0.7) 초로 추정하고 여유를 두세요 — 부하가 걸린 손에서는 약 130°를 넘는 동작이 속도 3에서 1.0초 이상 걸립니다.

### YAML 형식 예시

```text
poses:
  open:
    positions: [-35, -35, -35, -35, -35, -35, -35, -35]
  close:
    positions: [75, 75, 75, 75, 75, 75, 75, 75]
  ring_close:                 # 无名指握紧,其余张开
    positions: [75, 75, -35, -35, -35, -35, -35, -35]

sequences:
  demo:
    steps:
      - "open:3,3,3,3,3,3,3,3|2.0s"
      - "close:6,6,6,6,6,6,6,6|2.0s"
      - "ok:3,3,3,3,3,3,3,3|1.0s"
      - "victory:3,3,3,3,3,3,3,3|1.0s"
      - "greeting:3,3,3,3,3,3,3,3|1.5s"
      - "close:6,6,6,6,6,6,6,6|2.0s"
  wave:
    steps:
      - "open:6,6,6,6,6,6,6,6|0.8s"
      - "wave_r:5,5,5,5,5,5,5,5|0.6s"
      - "wave_l:5,5,5,5,5,5,5,5|0.6s"
      - "open:5,5,5,5,5,5,5,5|0.8s"
  finger_roll:
    steps:
      - "open:6,6,6,6,6,6,6,6|0.5s"
      - "ring_close:5,5,5,5,5,5,5,5|0.6s"
      - "open:5,5,5,5,5,5,5,5|0.5s"
      - "middle_close:5,5,5,5,5,5,5,5|0.6s"
      - "open:5,5,5,5,5,5,5,5|0.5s"
```

반복 재생은 런타임에 제어되며(GUI 체크박스), 더 이상 YAML에 기록되지 않습니다.

---

## 테스트

프로젝트에는 284개의 단위/통합/시스템 테스트와 54개의 하드웨어 테스트가 포함되어 있습니다.

### 전체 테스트 실행(하드웨어 불필요)

```text
pytest
```

### GUI + CLI 하드웨어 테스트 실행(서보 연결 필요)

```text
pytest tests/test_system_hardware.py --hardware --port /dev/ttyACM0
pytest tests/test_cmd_hardware.py --hardware --port /dev/ttyACM0
# 或两个一起:
pytest tests/test_system_hardware.py tests/test_cmd_hardware.py --hardware
```

test_system_hardware.py는 연결, 제스처 적용, 텔레메트리 읽기, 단일 손가락 개폐/흔들기, 속도 제어, 시퀀스 실행 및 모션 감지를 검증합니다.

test_cmd_hardware.py는 CLI 계층을 엔드투엔드로 검증합니다: 포즈 위치, 속도 매개변수, 시퀀스 단계, wait_for_motion, --list 출력, 그리고 종료 시 토크 해제.

전체 인수 기준은 docs/REQUIREMENTS.md를 참조하세요.

> 주의: 비하드웨어 테스트가 검증하는 것은 hand_logic.py의 **폴백 기본값**이며, 그 기본값은 여전히 원본의 −40…110 스케일입니다. 실행 시 data/config.yaml이 이를 덮어쓰므로 아무리 캘리브레이션해도 테스트는 통과합니다 — 하지만 이는 **테스트가 현재 캘리브레이션 매개변수를 검증하지 않는다**는 뜻이기도 합니다.

---

## 서보 ID 설정

Feetech 공식 소프트웨어와 시리얼 버스 드라이버로 서보 ID를 설정하는 튜토리얼: [https://www.robot-maker.com/forum/tutorials/article/168-brancher-et-controler-le-servomoteur-feetech-sts3032-360/](https://www.robot-maker.com/forum/tutorials/article/168-brancher-et-controler-le-servomoteur-feetech-sts3032-360/)

Feetech 소프트웨어 다운로드: [https://github.com/Robot-Maker-SAS/FeetechServo](https://github.com/Robot-Maker-SAS/FeetechServo)

---

## 감사의 말

원본 프로젝트: [Betatester777](https://github.com/Betatester777/AmazingHandControl) 하드웨어 및 참조 펌웨어: [Pollen Robotics](https://github.com/pollen-robotics/AmazingHand)
