---
title: "01-GUI 시각화 제어"
description: "시각화 제스처 명령 — 사용 튜토리얼"
---

# 01-GUI 시각화 제어

시각화 제스처 명령 — 사용 튜토리얼

이 디렉터리는 **호스트 PC 제어 도구**를 제공합니다: ESP32를 연결한 후 컴퓨터에서 버튼을 클릭하거나 명령을 입력하여 로봇 손이 제스처를 수행하도록 합니다.

> 적용 대상: ESP32-S3 + 8채널 PWM 서보(차동 구동). 펌웨어 플래싱은 `..\03_firmware_docs`의 설명을 참조하세요.

## 1. 두 가지 사용 방식

|방식|필요 사항|적합|
|---|---|---|
|**패키지 프로그램**(권장)|두 번 클릭 `AmazingHand控制台.exe`|Python 설치 불필요, 클릭 즉시 사용|
|**소스 실행**|64비트 Python 3.12|제스처 추적 또는 사용자 정의가 필요한 경우|

## 2. 방식 1: exe 두 번 클릭

1. `AmazingHand控制台.exe`를 두 번 클릭합니다.

2. **시리얼 포트 선택**: 상단 드롭다운에서 ESP32의 COM 포트를 선택합니다(장치 관리자에서 확인).

3. **「연결」**을 클릭합니다: 상태등이 녹색으로 변하고 로그에 "연결됨"이 표시됩니다.

4. 제스처 버튼을 클릭합니다: **바위 / 가위 / 보 / 엄지 척 / OK / 핀치 / 가리키기 / 펼치기 / 주먹**, 로봇 손이 실행합니다.

5. **좌우손**: 「오른손」/「왼손」을 체크하여 전환합니다(엄지 미러 방향이 다름).

6. **서보 직접 구동**: 슬라이더 8개를 드래그하여 개별 서보 각도를 실시간 제어합니다(0-180°).

7. **손가락 차동 제어**: 손가락마다 두 개의 진행 막대——

    - **굴곡◀▶신전**: 손가락을 구부리거나 폅니다(범위 -70 ~ +70).

    - **오른쪽◀▶왼쪽**: 손가락을 좌우로 흔듭니다(범위 60 ~ 120, 90=중립).

8. **반복 / 정지**: 마지막 제스처를 반복 / 즉시 중단합니다.

## 3. 방식 2: 소스 실행

### 의존성 설치

**64비트 Python 3.12**가 필요합니다(mediapipe는 64비트만 지원).

```Bash
# 1. 기본 의존성 설치
pip install -r requirements.txt

# 2. 추적 의존성 설치(제스처 추적 필요 시, 가상 환경 자동 생성)
setup_tracking.bat
```

### 실행

```Bash
# 추적 환경으로 실행(mediapipe 포함)
tracking_env\Scripts\python hand_gui.py
```

> 또는 직접 `python hand_gui.py`(pyserial이 포함된 임의의 Python).

### GUI 내장 제스처 추적

GUI에는 **제스처 추적** 패널이 내장되어 있습니다(카메라가 손 동작을 추종):

1. 시리얼 포트를 연결한 후 「제스처 추적 (MediaPipe 카메라)」 패널로 스크롤합니다.

2. 카메라 번호를 선택하고(기본 0), **「추적 시작」**을 클릭합니다.

3. 손을 카메라 화면 안에 넣으면 로봇 손이 굴곡/신전을 따라 합니다.

> 추적에는 `setup_tracking.bat`으로 mediapipe가 설치되어 있어야 합니다. 설치 불필요 exe에는 추적 기능이 포함되지 않습니다.

## 4. 명령줄 테스트(serial_test.py)

```Bash
# 링크 테스트(먼저 통신 가능 여부 확인)
python serial_test.py COM3 nop

# 제스처
python serial_test.py COM3 rock         # 石头
python serial_test.py COM3 thumbs_up    # 真棒
python serial_test.py COM3 index        # 指向
python serial_test.py COM3 open         # 张开
python serial_test.py COM3 close        # 握拳

# 단일 서보 직접 구동
python serial_test.py COM3 servo 1 90   # 舵机1 → 90°

# 모두 중앙으로 복귀
python serial_test.py COM3 mid

# 좌우 손 설정
python serial_test.py COM3 hand L
python serial_test.py COM3 hand R

# 스윕/자가 진단
python serial_test.py COM3 sweep 1      # 舵机1 扫频
python serial_test.py COM3 test         # 全部舵机逐个测试
```

## 5. 자주 묻는 질문

|증상|조치|
|---|---|
|서보가 움직이지 않음|전원(5V 3A 독립 전원), COM 포트, 배선을 확인|
|exe가 갑자기 종료됨|소스 방식으로 실행(패키지 버전은 의존성이 누락될 수 있음)|
|카메라 화면이 안 나옴|카메라 권한 허용(설정→개인 정보→카메라)|
|손 모양이 반대로 나옴|반대쪽 좌우손을 체크|

> 전체 프로토콜과 명령 설명은 `..\03_firmware_docs\用户手册.md`를 참조하세요.

