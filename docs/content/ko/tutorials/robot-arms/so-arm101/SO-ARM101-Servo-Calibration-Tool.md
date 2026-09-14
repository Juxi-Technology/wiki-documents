---
title: SoARM 시리즈 서보 캘리브레이션 도구 사용 튜토리얼
description: "SoARM 10X 시리즈 로봇팔용 FTServo 서보 공장 캘리브레이션 및 LeRobot 캘리브레이션 도구로, 중앙값 캘리브레이션, 단일 서보 제어, FT 디버거 파라미터 읽기/쓰기, xdat 파라미터 백업/복원을 지원합니다."
---

# SoARM 시리즈 서보 캘리브레이션 도구 사용 튜토리얼

> **[스토어에서 구매](https://www.juxitech.com/ko/products/so-arm101-developers-kit)**


**SoARM 시리즈 캘리브레이션 도구**는 SoARM 10X 시리즈 로봇팔(예: [SO-ARM101 개발자 키트](/ko/products/so-arm101)) 전용으로 설계된 FTServo 서보 공장 캘리브레이션 및 LeRobot 캘리브레이션 도구 모음입니다. 그래픽 인터페이스만으로 서보 중앙값 캘리브레이션, 단일 서보 제어, 파라미터 읽기/쓰기, xdat 파라미터 백업/복원, 듀얼 포트 동기 원격 제어 등의 작업을 완료할 수 있으며, LeRobot 형식의 JSON 캘리브레이션 파일 생성도 지원합니다. 로봇팔 조립과 서보 설치는 먼저 [Lerobot 로봇팔 조립 튜토리얼](./SO-ARM101-Assembly.md)을 참고하세요.

본 도구는 [Seeed Studio의 Seeed_RoboController](https://github.com/Seeed-Studio) 프로젝트를 기반으로 개조·업그레이드한 것입니다. 원 프로젝트는 MIT 라이선스로 공개되었습니다. 본 프로젝트는 기존 핵심 기능을 유지한 채 GUI 인터페이스를 재구성했으며, FT 디버거, xdat 파라미터 백업/복원, 크로스 플랫폼 지원 등 강화된 기능을 새로 추가했습니다.

## 호환성 안내

> ⚠️ **본 도구는 현재 Feetech(STS3215 시리즈) 서보만 지원합니다**. 레지스터 테이블, xdat 파라미터 형식, 보레이트 테이블은 모두 Feetech STS3215 시리즈에 맞춰 설계되었으며, 다른 브랜드/모델의 서보는 호환성을 보장하지 않습니다.

## 주요 기능

| 기능 | 설명 |
| ---- | ---- |
| 자동 포트 감지 | USB 시리얼 포트를 지능적으로 인식하고 가상 장치를 자동으로 필터링 |
| 크로스 플랫폼 지원 | Windows / Ubuntu / macOS 전 플랫폼 호환 |
| 듀얼 포트 동기화 | 좌우 두 시리얼 포트를 독립적으로 조작하며, 마스터-슬레이브 듀얼 포트 동기 원격 제어 지원 |
| 중국어-영어 전환 | 인터페이스에서 클릭 한 번으로 중국어/영어 전환, 선택 자동 기억 |
| 중앙값 캘리브레이션 | 서보의 현재 위치를 2048 중앙값으로 기록(EEPROM 영구 저장) |
| 중앙값 테스트 | 토크를 켜고 서보를 중앙값으로 이동시켜 캘리브레이션 결과 검증 |
| 모터 토크 해제 | 클릭 한 번으로 모든 서보 토크를 꺼서 수동 조정 용이 |
| 자동 스캔 | ID 1–20 범위의 모든 온라인 서보를 자동 감지 |
| 단일 서보 제어 | 슬라이더로 단일 서보의 위치와 토크 스위치를 실시간 제어 |
| FT 디버거 | 시리얼 연결, 스캔, 파라미터 읽기/쓰기, 위치 제어, 보레이트 변경, 공장 초기화, xdat 파라미터 백업 |
| xdat 파라미터 | 현재 서보 EEPROM 파라미터 저장 / 백업 열기 및 복원 |
| LeRobot 캘리브레이션 | LeRobot 형식의 JSON 캘리브레이션 파일 생성 |
| 캘리브레이션 파일 중앙값 실행 | 캘리브레이션 파일에 따라 로봇팔을 중앙값으로 이동 |

## 인터페이스 소개

메인 프로그램은 세 개의 탭 페이지로 구성됩니다:

```
┌─────────────────────────────────────────────────────────────┐
│  SoARM 系列校准工具         [串口1▾] [串口2▾] [🔄]  [🎮遥控][EN]│  ← 顶栏
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────┬──────────────────────────────┐ │
│  │ 串口1 - 舵机标定        │ 串口2 - 舵机标定            │ │
│  │  [🔴未连接] 当前舵机:…   │  [🔴未连接] 当前舵机:…      │ │
│  │  舵机1~6 状态表格        │  舵机1~6 状态表格           │ │
│  │  [中位校准][中位测试]…   │  [中位校准][中位测试]…      │ │
│  └─────────────────────────┴──────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

- **상단 바**: 애플리케이션 제목, 시리얼 포트 선택 드롭다운, 새로 고침 버튼, 원격 제어 버튼, 언어 전환 버튼.
- **🦾 Tab1 서보 캘리브레이션**: 좌우 패널의 빠른 작업(중앙값 캘리브레이션, 중앙값 테스트, 모터 토크 해제)과 실시간 상태.
- **🎚️ Tab2 단일 서보 제어**: 온라인 서보마다 슬라이더로 위치를 미세 조정하고 토크를 켜고 끕니다.
- **🔬 Tab3 FT 디버거**: 시리얼 연결, 스캔, 파라미터 읽기/쓰기(레지스터 56개), 위치 제어, 보레이트/공장 초기화, xdat 파라미터 백업/복원.

## 설치 및 시작

환경 요구 사항:

| 의존성 | 버전 | 설명 |
| ---- | ---- | ---- |
| Python | >= 3.8 | 3.10+ 권장, [python.org](https://www.python.org/downloads/)에서 다운로드 |
| PySide6 | >= 6.0 | GUI 프레임워크 |
| pyserial | >= 3.5 | 시리얼 통신 |
| 운영 체제 | Windows 10 / 11, Ubuntu 20.04+ / Debian 11+, macOS 11+ | macOS 11+는 Apple Silicon / Intel 지원 |

하드웨어 연결: USB-시리얼 변환 어댑터(예: CH340 / CP2102)로 로봇팔 제어 보드에 연결하고, 서보에 전원을 공급합니다(표준판은 DC 5V 5A, Pro판은 DC 12V 5A 권장).

### Windows

1. [Python 3.10+](https://www.python.org/downloads/) 설치(설치 시 **Add Python to PATH**를 반드시 체크해야 합니다. 그렇지 않으면 명령줄에서 `python`을 찾을 수 없습니다). 설치 확인:

```bash
python --version
```

2. 가상 환경을 만들고 의존성을 설치합니다:

```bash
cd Juxi_ServoController
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

> 참고: 활성화하면 명령줄 프롬프트 앞에 `(.venv)`가 표시됩니다.

3. 환경을 확인하고 시작합니다:

```bash
python setup.py
python -m src.gui.factory_calibration_tool
```

`[OK] 环境检查通过，可以运行项目`가 표시되면 환경이 올바른 것입니다.

4. 장치 관리자(`Win+X` → 장치 관리자)의 "포트 (COM 및 LPT)"에서 COM 포트 번호를 확인합니다:

```
端口 (COM 和 LPT)
  └─ USB-SERIAL CH340 (COM3)     ← 你的舵机串口
```

> **COM 번호를 기록**해 두고 시작 후 상단 바에서 선택하세요. 포트를 수동으로 지정할 수도 있습니다(시리얼 포트가 사용 중일 때):

```bash
python -m src.gui.factory_calibration_tool --port1 COM3 --port2 COM4
```

사용 가능한 포트 확인:

```bash
python -m src.gui.factory_calibration_tool --list-ports
```

### Linux(Ubuntu / Debian)

1. 중국어 글꼴과 의존성을 설치합니다(중국어 글꼴은 중국어 인터페이스 표시에 필수이며, emoji 글꼴은 로그의 ✅⚠️ 등의 아이콘에 사용됩니다):

```bash
sudo apt install python3-venv fonts-noto-cjk fonts-noto-color-emoji
```

2. **⚠️ 시리얼 포트 권한(dialout 그룹) 추가【필수】**(Linux는 기본적으로 일반 사용자가 `/dev/ttyUSB*` / `/dev/ttyACM*`에 접근할 수 없습니다):

```bash
sudo usermod -a -G dialout $USER
# 注销并重新登录后生效
```

확인(출력에 `dialout`이 포함되어야 합니다):

```bash
groups
```

> 적용되지 않으면 컴퓨터를 재부팅하세요. 일부 배포판에서는 그룹 이름이 `uucp`(Arch) 또는 `tty`입니다.

3. 가상 환경을 만들고 의존성을 설치한 뒤 시작합니다:

```bash
cd Juxi_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

> pip에서 externally managed environment 오류가 발생하면 `pip install --break-system-packages -r requirements.txt`를 대신 사용하거나 가상 환경을 사용하세요.

4. USB-시리얼 장치를 확인합니다(어댑터를 꽂은 후):

```bash
ls /dev/ttyUSB* /dev/ttyACM* 2>/dev/null
```

일반적인 출력:

```
/dev/ttyUSB0   # CH340 / CP2102 / PL2303
/dev/ttyACM0   # 原生 USB 串口（Arduino / ESP32 板载）
```

자세한 제조사 정보 확인:

```bash
dmesg | tail -20 | grep -i tty
# 或
lsusb
```

> 장치가 여러 개면 연결 순서에 따라 `ttyUSB0` / `ttyUSB1`이 할당되어 불안정할 수 있습니다. `/dev/ttyACM*`를 사용하거나 제조사별로 고정하는 것을 권장합니다(아래 udev 항목 참조).

포트 수동 지정:

```bash
python -m src.gui.factory_calibration_tool --port1 /dev/ttyUSB0 --port2 /dev/ttyUSB1
```

> 시리얼 포트가 하나뿐이면 도구가 두 번째 포트를 자동으로 "사용 안 함"으로 설정합니다.

5. 선택 사항: udev로 장치 이름을 고정합니다(연결할 때마다 번호가 바뀌는 것을 방지). `/etc/udev/rules.d/99-servo.rules`를 생성하고 USB ID로 고정합니다:

```
SUBSYSTEM=="tty", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", SYMLINK+="ttyServo"
```

이후 `ls -l /dev/ttyServo`로 고정된 이름으로 접근할 수 있으며, 제조사 ID는 `lsusb`로 확인합니다.

### macOS

1. Homebrew로 Python을 설치합니다(시스템 기본 Python 버전이 너무 오래된 것을 방지):

```bash
# 安装 Homebrew（如果没有）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Python
brew install python
```

확인:

```bash
python3 --version
```

2. 가상 환경을 만들고 의존성을 설치한 뒤 시작합니다(`source`로 활성화하며 `.bat`이 아닙니다):

```bash
cd Juxi_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

3. **⚠️ 시리얼 포트 이름**: macOS는 USB-시리얼 장치를 `/dev` 아래에 배치하며 **두 가지 명명 방식**이 있습니다:

| 접두사 | 의미 | 사용 가능 여부 |
| ---- | ---- | -------- |
| `/dev/tty.usbserial-*` | 모뎀 스타일(블로킹 방식) | 멈출 수 있음, 권장하지 않음 |
| `/dev/cu.usbserial-*` | 콜아웃/터미널 스타일(**논블로킹**) | ✅ 사용 권장 |

사용 중인 시리얼 포트 이름 확인:

```bash
ls /dev/cu.*
```

일반적인 출력:

```
/dev/cu.usbserial-0001      # CP2102 / FTDI
/dev/cu.usbmodem141101      # 板载 USB 串口（Arduino / ESP32）
/dev/cu.wchusbserial1420    # CH340
```

> 프로그램은 자동으로 `cu.*` 장치를 우선 선택합니다. 포트를 수동 지정할 때는 `tty.`가 아닌 `cu.`를 사용하세요.

포트 수동 지정:

```bash
python -m src.gui.factory_calibration_tool --port1 /dev/cu.usbserial-0001 --port2 /dev/cu.usbmodem141101
```

4. USB 드라이버: 대부분의 일반 칩(CH340, CP2102, FTDI)은 macOS에 드라이버가 내장되어 있어 바로 사용할 수 있습니다. 장치가 인식되지 않으면:

```bash
system_profiler SPUSBDataType | grep -A5 -i "serial\|CH340\|CP210"
```

- **CH340**: 비교적 오래된 배치는 WCH 공식 드라이버를 설치해야 합니다.
- 일반적으로 `ls /dev/cu.*`에서 장치가 보이면 됩니다.

5. 사용 팁:
   - **시리얼 포트 이름이 바뀜**: USB 포트를 바꿔 꽂으면 `cu.*` 이름이 달라질 수 있으므로, 시작할 때마다 상단 바 드롭다운에서 선택하면 됩니다.
   - **절전**: macOS가 잠자기 상태에 들어가면 시리얼 연결이 끊길 수 있으니, 작업 중에는 깨어 있게 유지하거나 잠자기 시간을 늘리세요.
   - **개인정보 보호 권한**: 처음 실행할 때 "이동식 디스크 접근" 알림이 표시되면 허용을 클릭하세요.

## 사용 단계

### 1. 연결 및 서보 인식

1. USB-시리얼 변환 어댑터로 로봇팔 제어 보드에 연결하고 서보에 전원을 공급합니다.
2. GUI를 열고 상단 바 시리얼 포트 드롭다운에서 해당 포트를 선택합니다(또는 `🔄`를 클릭해 새로 고침).
3. 패널 상단에 `🟢 已连接`가 표시되고, ID 1–20 범위의 온라인 서보(일반적으로 1–6)가 자동으로 스캔됩니다.

> 시리얼 포트가 사용 중이라는 안내가 나오면 다른 프로그램(시리얼 모니터, 종료되지 않은 이전 도구)이 해당 포트를 점유하고 있지 않은지 확인하세요.

### 2. 중앙값 캘리브레이션(현재 위치를 2048로 설정)

> 캘리브레이션 전에 로봇팔 자세를 물리적으로 먼저 잡아 각 관절이 원하는 "영점 / 중앙 위치"에 오도록 하세요.

1. 패널에서 **시리얼X 중앙값 캘리브레이션** 버튼을 클릭합니다.
2. 프로그램이 먼저 서보 토크를 해제하고, 서보를 원하는 중앙 위치로 수동 조정하라고 안내합니다.
3. 확인하면 프로그램이 각 서보에 대해 다음을 수행합니다: EEPROM 잠금 해제 → 캘리브레이션 명령 쓰기(값 128을 주소 40에) → EEPROM 다시 잠금.
4. 캘리브레이션 후 "중앙값 테스트"로 검증할 수 있습니다: 서보가 원래 위치를 유지하면(변위가 매우 작으면) 캘리브레이션 성공입니다.

### 3. 중앙값 테스트

1. **시리얼X 중앙값 테스트**를 클릭합니다.
2. 프로그램이 토크를 켜고 모든 서보를 2048로 이동시킵니다.
3. 서보가 현재 위치에서 거의 움직이지 않으면 캘리브레이션이 올바른 것이고, 크게 움직이면 해당 캘리브레이션 값이 신뢰할 수 없다는 뜻이므로 다시 캘리브레이션해야 합니다.

### 4. 모터 토크 해제(수동 조정)

- **시리얼X 모터 토크 해제**를 클릭하면 해당 포트의 모든 서보 토크가 꺼져 자유롭게 수동으로 회전할 수 있습니다.
- 개별 서보는 **단일 서보 제어** 페이지에서 슬라이더 아래의 토크 스위치로 따로 켜고 끌 수 있습니다.

### 5. 단일 서보 제어(Tab2)

1. **🎚️ 단일 서보 제어** 페이지에서 온라인 서보마다 위치 슬라이더 하나와 토크 스위치 하나가 대응됩니다.
2. **슬라이더를 드래그한 뒤 놓으면** 서보가 목표 위치로 이동합니다.
3. 슬라이더 아래의 토크 스위치로 해당 서보의 토크를 개별적으로 켜고 끌 수 있습니다.

### 6. FT 디버거(파라미터 읽기/쓰기와 위치 제어)

**🔬 FT 디버거** 페이지에서:

1. **시리얼 연결**: 포트, 보레이트(기본 1M)를 선택하고 연결한 후 **서보 스캔**으로 온라인 서보를 감지합니다.
2. **파라미터 읽기**: 전체 레지스터(EEPROM + SRAM)를 읽습니다.
3. **파라미터 테이블**: 5개 열로 전체 56개 레지스터를 표시하며, 행을 클릭하면 "쓰기 주소"가 자동으로 연동됩니다.
4. **위치 제어**: 목표 위치 / 속도를 설정한 후 실행하고, 이동이 완료되면 토크를 끄라는 안내가 표시됩니다.
5. 보레이트 변경, 공장 초기화와 xdat 파라미터 백업/복원은 아래 각 절을 참조하세요.

### 7. 서보 ID 변경

1. **🔬 FT 디버거** 페이지에서 시리얼 포트를 연결하고 서보를 스캔합니다.
2. 대상 서보를 선택하고 파라미터 테이블에서 "서보 ID"(주소 0x05) 값을 수정한 뒤 쓰기를 클릭합니다.
3. 프로그램이 수행하는 순서: 잠금 해제 → 주소 5에 쓰기 → 새 ID 검증 → 다시 잠금.

> ⚠️ ID를 변경하기 전에 버스에 이 서보 하나만 있는지 반드시 확인하여 ID 충돌을 피하세요.

### 8. 보레이트 변경 / 공장 초기화 설정

- **보레이트 변경**: FT 디버거 페이지의 "보레이트 / 공장 초기화" 영역에서 새 보레이트(38400 – 1000000 bps)를 선택한 후 변경합니다. 쓰기 후 시리얼 보레이트를 자동으로 전환하고 ping으로 검증하며, 실패하면 자동으로 롤백합니다.
- **공장 초기화 설정**: 서보가 출하 시 기본값(ID=1, 보레이트=1000000)으로 복원되며, 이후 다시 스캔해야 합니다.

### 9. xdat 파라미터 백업과 복원

FT 디버거 페이지의 "xdat 파라미터(EEPROM만 저장)" 영역에서:

1. **💾 현재 서보 저장**: 현재 선택된 서보의 EEPROM 파라미터를 xdat 파일로 저장(백업)합니다.
2. 서보 파라미터를 마음대로 수정한 뒤 복원하고 싶다면:
3. **📂 xdat 열기**: 백업 파일을 불러옵니다.
4. **📤 파라미터를 서보로 복원**: 백업을 현재 서보의 EEPROM에 다시 씁니다.

### 10. 듀얼 포트 동기 원격 제어

> ⚠️ **방향 설명: 시리얼1이 시리얼2를 제어합니다**. 시리얼1(마스터)은 서보 각도만 읽고, 시리얼2(슬레이브)가 동기화되어 제어됩니다.

1. 상단 바에서 **🎮 원격 제어**를 클릭합니다(시리얼1이 각도를 읽어 → 시리얼2가 같은 ID의 서보를 동기 제어).
2. 두 포트의 서보 ID가 일치해야 하며, 교집합에 있는 서보만 동기화됩니다.
3. 같은 버튼을 다시 클릭하면 중지되고, 이후 좌우 패널의 스캔 스레드가 자동으로 복구됩니다.

### 11. LeRobot 캘리브레이션(명령줄)

```bash
# 校准从动臂（保存到 ~/.cache/huggingface/lerobot/calibration/robots/so_follower/）
python -m src.tools.lerobot_calibrate --arm-type follower

# 校准领导臂
python -m src.tools.lerobot_calibrate --arm-type leader
```

흐름: 서보 토크 해제 → 각 관절을 중앙 위치에 맞추고 `homing_offset` 기록 → 전체 가동 범위를 천천히 움직이며 `range_min/max` 기록(`wrist_roll`은 연속 회전 관절로 범위가 `[0,4095]`로 고정) → JSON 저장.

캘리브레이션 파일에 따라 중앙값으로 실행:

```bash
python -m src.tools.run_calibration_middle <校准文件.json> --mode zero
```

LeRobot 환경 설치와 데이터 수집 흐름은 [LeRobot 로봇팔 튜토리얼](./SO-ARM101-Tutorial.md)을 참조하세요.

## 명령줄 도구

그래픽 인터페이스 외에도 도구는 다음과 같은 명령줄 진입점을 제공합니다(GUI 불필요):

```bash
# 扫描舵机
python -m src.tools.scan_id

# 舵机快速中位校准
python -m src.tools.servo_quick_calibration

# 舵机中位测试
python -m src.tools.servo_center_test

# 失能全部舵机
python -m src.tools.servo_disable

# LeRobot 风格校准
python -m src.tools.lerobot_calibrate

# LeRobot 风格校准（指定串口）
python -m src.tools.lerobot_calibrate /dev/ttyACM0

# 双端口同步遥控
python -m src.tools.servo_remote_control
```

## 주의사항

1. **안전 제일**: 중앙값 캘리브레이션은 EEPROM에 영구 저장됩니다. 캘리브레이션 전에 전원 공급이 안정적이고 로봇팔이 사람이나 물체에 부딪히지 않는지 확인하세요.
2. **전원 공급**: SoARM 101 표준판은 DC 5V 5A, Pro판은 DC 12V 5A를 권장합니다. 전원 공급이 부족하면 서보가 스텝을 놓치거나 통신이 실패할 수 있습니다.
3. **시리얼 포트 독점**: Windows에서는 시리얼 포트가 프로그램에 독점되므로 같은 포트를 GUI 스캔 스레드와 캘리브레이션 하위 프로세스가 동시에 점유할 수 없습니다. 도구가 자동으로 스캔 스레드를 먼저 중지하고 이전 프로세스를 종료한 뒤 작업하므로, 수동으로 반복 클릭하지 마세요.
4. **Linux 시리얼 권한**: `/dev/ttyUSB*` / `/dev/ttyACM*`에 접근하려면 사용자를 `dialout` 그룹에 추가해야 합니다(위 "Linux" 절 참조).
5. **macOS 시리얼 이름**: `/dev/tty.*`(블로킹, 멈출 수 있음)가 아닌 `/dev/cu.*`(논블로킹)를 사용하세요. 위 "macOS" 절 참조.
6. **핫플러그**: USB를 뽑으면 프로그램이 자동 재연결을 시도합니다. 다시 꽂은 후 `🔄`를 클릭해 포트 목록을 새로 고침하세요.
7. **과열 / 과전압 보호**: 프로그램이 전압과 온도를 모니터링합니다(온도 > 60°C 경고). 서보가 계속 고온이면 작동을 멈추고 열을 식히세요.
8. **중앙값 캘리브레이션은 되돌릴 수 없음**: 기록 후 기존 오프셋이 덮어써져 취소할 수 없습니다. 먼저 원래 위치를 기록해 두고 캘리브레이션하는 것을 권장합니다.
9. **ID 변경 위험**: 기록 실패나 검증 실패 시 프로그램이 오류를 보고하고 스캔을 복구하지만, 극단적인 경우 서보 연결이 끊길 수 있습니다. 끊긴 경우 "공장 초기화"를 시도해 보세요(초기화 후 ID가 1로 돌아갑니다).
10. **인코딩 문제**: Windows 콘솔에서 emoji가 깨져 보이면 `PYTHONIOENCODING=utf-8`을 설정한 후 명령줄 도구를 실행하세요. Linux / macOS는 기본 UTF-8이라 일반적으로 이 문제가 없습니다.

## 문제 해결

| 증상 | 가능한 원인 | 해결 방법 |
| ---- | -------- | -------- |
| 시리얼 포트를 열 수 없음 / 포트 사용 중 | 다른 프로그램이 점유 | 시리얼 모니터 등 프로그램을 닫거나, 포트를 교체한 후 도구 재시작 |
| Windows에서 시리얼 포트 열 때 PermissionError | 다른 프로세스가 해당 COM 포트 점유 | 해당 COM 포트를 점유하는 다른 프로세스가 없는지 확인 |
| 서보를 스캔할 수 없음 | 전원 부족 / 배선 오류 / 보레이트 불일치 | 전원과 배선을 확인하고 서보가 1M 보레이트인지 확인 |
| 중앙값 캘리브레이션 후 서보가 제멋대로 움직임 | 캘리브레이션 전에 자세를 잡지 않음 | "토크 해제 → 수동 배치 → 중앙값 캘리브레이션" 재실행 |
| 온도 상승이 너무 빠름 | 부하 과다 또는 스톨 | 기구 걸림 확인, 속도/가속도 저하 |
| ID 변경 후 서보를 찾을 수 없음 | ID 충돌 또는 쓰기 실패 | 공장 초기화 후 다시 스캔 |
| 원격 제어가 동기화되지 않음 | 두 포트의 ID 불일치 | 마스터-슬레이브 포트에 같은 ID의 서보가 온라인인지 확인 |
| Windows에서 시리얼 포트를 찾을 수 없음 | 드라이버 누락 | 장치 관리자에서 드라이버 확인; USB 포트 교체; CH340 드라이버 설치 |
| Linux에서 시리얼 포트를 찾을 수 없음 | 장치 미인식 | `ls /dev/ttyUSB* /dev/ttyACM*`; `lsusb`로 장치 확인 |
| Permission denied: /dev/ttyUSB0 | dialout 그룹 미가입 | `sudo usermod -a -G dialout $USER` 실행 후 다시 로그인; 또는 `sudo chmod 666 /dev/ttyUSB0`(임시) |
| Linux 장치 이름 변경 | 연결 순서가 ttyUSB 번호에 영향 | udev 규칙으로 고정(위 "Linux" 절 참조)하거나 시작할 때마다 선택 |
| macOS 시리얼 이름에 `tty.`가 있어 멈춤 | 블로킹 방식 장치 이름 사용 | `cu.` 접두사 장치로 변경 |
| macOS에서 장치를 찾을 수 없음 | 장치 미인식 | `ls /dev/cu.*`; 뽑았다 다시 꽂기; `system_profiler SPUSBDataType`으로 확인 |
| macOS 권한 문제 | 시스템 접근 제어 | 일반적으로 추가 권한 불필요; 접근 제어 팝업이 뜨면 터미널 접근 허용 |
| 중국어 인터페이스가 비어 있음 | 중국어 글꼴 누락 | Linux는 `fonts-noto-cjk` 설치; macOS에서 이상하면 Noto Sans CJK 설치 |
| emoji가 네모로 표시됨 | emoji 글꼴 누락 | `fonts-noto-color-emoji` 설치 |
| pip 설치 실패 | 시스템 Python 보호(externally managed environment) | 가상 환경 사용; 또는 `pip install --break-system-packages -r requirements.txt` |
| 프로그램이 시작되지 않음 | 의존성 누락 또는 버전 불일치 | `python3 --version`으로 버전 확인; `pip list`로 의존성 확인 |
| macOS 가상 환경 활성화 실패 | 잘못된 활성화 스크립트 사용 | `source .venv/bin/activate` 사용(`.bat` 아님) |
| macOS Apple Silicon 컴파일 오류 | Rosetta의 구형 Python 사용 | Python 3.10+ 사용(Apple Silicon 네이티브 지원) |

## 디렉터리 구조

```
Juxi_ServoController/
├── docs/                    # 分系统教程
│   ├── Windows教程.md
│   ├── Linux教程.md
│   └── macOS教程.md
├── src/
│   ├── gui/                  # PySide6 图形界面
│   │   ├── factory_calibration_tool.py   # 主工具（双串口标定 + 遥控 + 语言切换）
│   │   ├── ft_debugger.py                # FT 调试器（参数读写 / xdat 备份）
│   │   ├── calibration_wizard.py         # LeRobot 校准向导
│   │   ├── theme_utils.py                # 浅色主题
│   │   └── language_dialog.py            # 语言选择对话框
│   ├── tools/                # 命令行工具
│   ├── xdat_utils.py         # xdat 参数文件读写
│   ├── i18n*.py / i18n_translations/     # 中英文国际化
│   ├── port_utils.py         # 串口检测
│   └── calibration_manager.py# LeRobot 校准文件管理
├── scservo_sdk/              # FTServo 舵机通信 SDK
├── requirements.txt
└── setup.py                  # 环境检查脚本
```

본 도구 저장소는 `src/gui`(PySide6 그래픽 인터페이스), `src/tools`(명령줄 도구), `scservo_sdk`(FTServo 서보 통신 SDK), `setup.py`(환경 확인 스크립트) 등의 모듈로 구성됩니다.

<RelatedProducts slugs="so-arm101,servo-driver-board" />
