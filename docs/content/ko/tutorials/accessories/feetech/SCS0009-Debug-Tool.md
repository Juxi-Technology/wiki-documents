---
title: SCS0009 서보 디버깅 도구 사용 튜토리얼
description: "Feetech SCS0009 서보(전위차계 피드백, 10비트 분해능 0–1023) 전용으로 설계된 FTServo 디버깅 도구로, 시리얼 연결, 서보 스캔, 레지스터 44개의 파라미터 읽기/쓰기, 위치 제어와 xdat 파라미터 백업/복원을 지원합니다."
---

# SCS0009 서보 디버깅 도구 사용 튜토리얼

> **[스토어에서 구매](https://www.juxitech.com/ko/products/feetech-scs0009-serial-bus-servo)**


**SCS0009 서보 디버깅 도구**는 [Feetech 버스 서보](/ko/products/feetech-servo) 중 SCS0009 서보(전위차계 피드백, 10비트 분해능 0–1023) 전용으로 설계된 FTServo 디버깅 도구입니다. 그래픽 인터페이스만으로 시리얼 연결, 서보 스캔, 파라미터 읽기/쓰기, 위치 제어, 보레이트 변경, 공장 초기화와 xdat 파라미터 백업/복원 등의 작업을 완료할 수 있습니다.

본 도구는 JUXI_Technology가 개발·유지보수하며 MIT 라이선스로 공개되었습니다. FT 디버거, xdat 파라미터 백업/복원, 크로스 플랫폼 지원 등의 기능은 모두 자체 구현입니다.

## 호환성 안내

> ⚠️ **본 도구는 현재 Feetech SCS0009 서보(SCS 시리즈, 전위차계 위치 피드백, 10비트 분해능 0–1023)만 지원합니다**. 레지스터 테이블, xdat 파라미터 형식, 보레이트 테이블은 모두 Feetech SCS0009에 맞춰 설계되었으며, 다른 브랜드/모델의 서보는 호환성을 보장하지 않습니다.

## 주요 기능

| 기능 | 설명 |
| ---- | ---- |
| 자동 포트 감지 | USB 시리얼 포트를 지능적으로 인식하고 가상 장치를 자동으로 필터링 |
| 크로스 플랫폼 지원 | Windows / Ubuntu / macOS 전 플랫폼 호환 |
| 중국어-영어 전환 | 인터페이스에서 클릭 한 번으로 중국어/영어 전환, 선택 자동 기억 |
| 시리얼 연결 | 포트 수동/자동 선택, 8단계 보레이트(38400~1M) |
| 서보 스캔 | 온라인 서보 자동 감지(ID 1–254), 실시간 표시 |
| 파라미터 읽기 | 전체 레지스터 44개 읽기(EEPROM + SRAM) |
| 파라미터 테이블 | 5개 열 표시(주소/레지스터/값/저장 영역/읽기·쓰기), 선택 시 연동 |
| 위치 제어 | 목표 위치/속도 제어, 이동 완료 시 토크 끄기 안내 |
| 보레이트 변경 | 서보 보레이트를 변경하며 실패 시 자동 롤백 |
| 공장 초기화 | 클릭 한 번으로 출하 시 기본 설정 복원 |
| xdat 파라미터 | 현재 서보 EEPROM 파라미터 저장 / 백업 열기 및 복원 |

## 인터페이스 소개

메인 프로그램은 단일 패널 레이아웃(FT 디버거)이며, 창 높이가 부족하면 스크롤 바가 자동으로 나타나고 최대화하면 화면에 맞게 늘어납니다:

```
┌─────────────────────────────────────────────────────────────┐
│  SCS0009 舵机调试工具                     [EN / English]     │  ← 顶栏
├─────────────────────────────────────────────────────────────┤
│  🔌 串口连接   [端口▾][🔄][波特率▾][连接] [🔴未连接]         │
│  🎯 舵机      [🔍扫描][舵机▾][读取参数][读取状态]            │
│               ┌ 扫描到的舵机列表 ┐                           │
│  📋 参数表    地址|寄存器|值|存储区域|读写  (44 个寄存器)      │
│  🎯 位置控制  目标位置|速度|移动|力矩开|力矩关 | 状态         │
│  🔧 波特率/恢复出厂  新波特率|修改波特率|恢复出厂            │
│  📁 xdat 参数(仅保存EEPROM) 保存当前舵机|打开xdat|恢复参数    │
│  📜 日志                                                      │
└─────────────────────────────────────────────────────────────┘
```

- **상단 바**: 애플리케이션 제목, 언어 전환 버튼.
- **🔌 시리얼 연결**: 포트, 보레이트 선택, 연결/해제.
- **🎯 서보**: 스캔, 서보 선택, 파라미터/상태 읽기.
- **📋 파라미터 테이블**: 레지스터 44개를 5개 열(주소/레지스터/값/저장 영역/읽기·쓰기)로 표시, 선택 시 쓰기 주소 자동 연동.
- **🎯 위치 제어**: 목표 위치/속도, 이동 완료 후 상태 표시줄에 토크 끄기 안내.
- **🔧 보레이트/공장 초기화**: 보레이트 변경(실패 시 롤백), 공장 초기화.
- **📁 xdat 파라미터(EEPROM만 저장)**: 현재 서보 파라미터 저장, 백업 열기, 복원.

## 설치 및 시작

환경 요구 사항:

| 의존성 | 버전 | 설명 |
| ---- | ---- | ---- |
| Python | >= 3.8 | 3.10+ 권장, [python.org](https://www.python.org/downloads/)에서 다운로드 |
| PySide6 | >= 6.0 | GUI 프레임워크 |
| pyserial | >= 3.5 | 시리얼 통신 |
| 운영 체제 | Windows 10 / 11, Ubuntu 20.04+ / Debian 11+, macOS 11+ | macOS 11+는 Apple Silicon / Intel 지원 |

하드웨어 연결: USB-시리얼 변환 어댑터(예: CH340 / CP2102)로 서보 제어 보드에 연결하고, 서보에 전원을 공급합니다(표준판은 DC 5V 5A, Pro판은 DC 12V 5A 권장).

### Windows

1. [Python 3.10+](https://www.python.org/downloads/) 설치(설치 시 **Add Python to PATH**를 반드시 체크해야 합니다. 그렇지 않으면 명령줄에서 `python`을 찾을 수 없습니다). 설치 확인:

```bash
python --version
```

2. 가상 환경을 만들고 의존성을 설치합니다:

```bash
cd SCS0009_ServoController
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

> ⚠️ **가상 환경은 한 번만 만들면 됩니다**. `python -m venv .venv`를 반복 실행하면 기존 환경이 재설정/덮어써져(설치된 의존성이 지워짐) 이후에는 매번 `activate`로 활성화하기만 하면 됩니다.

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

> **COM 번호를 기록**해 두고 시작 후 선택하세요. 포트를 수동으로 지정할 수도 있습니다(시리얼 포트가 사용 중일 때):

```bash
python -m src.gui.factory_calibration_tool --port COM3
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
cd SCS0009_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

> ⚠️ **가상 환경은 한 번만 만들면 됩니다**. `python3 -m venv .venv`를 반복 실행하면 기존 환경이 덮어써지고(설치된 의존성이 지워짐) 이후에는 매번 `source .venv/bin/activate`만 하면 됩니다.

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
python -m src.gui.factory_calibration_tool --port /dev/ttyUSB0
```

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
cd SCS0009_ServoController
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup.py
python -m src.gui.factory_calibration_tool
```

> ⚠️ **가상 환경은 한 번만 만들면 됩니다**. `python3 -m venv .venv`를 반복 실행하면 기존 환경이 덮어써지고(설치된 의존성이 지워짐) 이후에는 매번 `source .venv/bin/activate`만 하면 됩니다.

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
python -m src.gui.factory_calibration_tool --port /dev/cu.usbserial-0001
```

4. USB 드라이버: 대부분의 일반 칩(CH340, CP2102, FTDI)은 macOS에 드라이버가 내장되어 있어 바로 사용할 수 있습니다. 장치가 인식되지 않으면:

```bash
system_profiler SPUSBDataType | grep -A5 -i "serial\|CH340\|CP210"
```

- **CH340**: 비교적 오래된 배치는 WCH 공식 드라이버를 설치해야 합니다.
- 일반적으로 `ls /dev/cu.*`에서 장치가 보이면 됩니다.

5. 사용 팁:
   - **시리얼 포트 이름이 바뀜**: USB 포트를 바꿔 꽂으면 `cu.*` 이름이 달라질 수 있으므로, 시작할 때마다 "🔌 시리얼 연결" 영역에서 선택하면 됩니다.
   - **절전**: macOS가 잠자기 상태에 들어가면 시리얼 연결이 끊길 수 있으니, 작업 중에는 깨어 있게 유지하거나 잠자기 시간을 늘리세요.
   - **개인정보 보호 권한**: 처음 실행할 때 "이동식 디스크 접근" 알림이 표시되면 허용을 클릭하세요.

## 사용 단계

### 1. 연결 및 서보 인식

1. USB-시리얼 변환 어댑터로 서보 제어 보드에 연결하고 서보에 전원을 공급합니다.
2. GUI를 열고 "🔌 시리얼 연결" 영역에서 포트를 선택한 뒤(또는 `🔄`를 클릭해 새로 고침) 보레이트(기본 1M)를 설정합니다.
3. **연결**을 클릭하면 상태에 `🟢 已连接`가 표시됩니다.

> 시리얼 포트가 사용 중이라는 안내가 나오면 다른 프로그램(시리얼 모니터, 종료되지 않은 이전 도구)이 해당 포트를 점유하고 있지 않은지 확인하세요.

### 2. 서보 스캔

1. **🔍 서보 스캔**을 클릭하면 ID 1–254 범위의 온라인 서보를 감지합니다.
2. 스캔 결과는 서보 목록에 실시간으로 표시됩니다(모델명 포함).
3. 서보 목록에서 행을 클릭하면 "서보" 드롭다운에 자동으로 채워집니다.

### 3. 파라미터 읽기

1. 서보를 선택한 뒤 **📖 파라미터 읽기**를 클릭하면 전체 레지스터 44개를 순서대로 읽습니다.
2. 파라미터 테이블은 5개 열(주소/레지스터/값/저장 영역/읽기·쓰기)로 표시되며, EPROM / SRAM / DEFAULT를 색상으로 구분합니다.
3. 로그 영역에 각 레지스터의 읽기 결과와 실패 원인이 표시됩니다.

각 레지스터의 의미는 [전위차계 SCSCL 서보 - 메모리 테이블 분석](./Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis.md)을 참고하세요.

### 4. 파라미터 수정 / 쓰기

1. 파라미터 테이블에서 수정할 레지스터 행을 클릭 → "쓰기 주소", "길이", "값"이 자동으로 연동됩니다.
2. "값" 입력란에서 새 값을 수정하고 **✏️ 쓰기**를 클릭합니다.
3. 프로그램이 수행하는 순서: EEPROM 잠금 해제 → 쓰기 → 다시 잠금.
4. 쓰기 결과 팝업: 성공 시 녹색으로 "✅ 쓰기 성공", 실패 시 빨간색으로 "❌ 쓰기 실패"(원인 포함)가 표시됩니다.

### 5. 서보 ID 변경

1. 파라미터 테이블에서 "서보 ID"(주소 0x05) 행을 찾아 클릭해 선택합니다.
2. "값"을 새 ID로 수정하고 **✏️ 쓰기**를 클릭합니다.
3. 프로그램이 수행하는 순서: 잠금 해제 → 주소 5에 쓰기 → 다시 잠금.

> ⚠️ ID를 변경하기 전에 버스에 이 서보 하나만 있는지 반드시 확인하여 ID 충돌을 피하세요.

### 6. 위치 제어

1. "🎯 위치 제어" 영역에서 **슬라이더를 드래그**해 목표 위치(0–1023, 전위차계 10비트 분해능)를 조정하면 숫자 입력란에 동기 표시됩니다. 숫자 입력란에 직접 입력하면 슬라이더도 따라 움직입니다.
2. **▶ 이동**을 클릭하면 서보가 움직이기 시작하고 상태 표시줄에 "이동 중..."이 표시됩니다.
3. 이동이 완료되면 "✅ 이동 완료, 토크를 꺼주세요"가 표시되면 **⏹ 토크 끄기**를 클릭합니다.

### 7. 보레이트 변경 / 공장 초기화 설정

- **보레이트 변경**: "🔧 보레이트/공장 초기화" 영역에서 새 보레이트(38400 – 1000000 bps)를 선택한 후 **🔧 보레이트 변경**을 클릭합니다. 쓰기 후 시리얼 보레이트를 자동으로 전환하고 ping으로 검증하며, 실패하면 자동으로 롤백합니다.
- **공장 초기화 설정**: **🔄 공장 초기화**를 클릭하면 서보가 출하 시 기본값(ID=1, 보레이트=1000000)으로 복원되며, 이후 다시 스캔해야 합니다.

### 8. xdat 파라미터 백업과 복원

"📁 xdat 파라미터(EEPROM만 저장)" 영역에서:

1. **💾 현재 서보 저장**: 현재 선택된 서보의 EEPROM 파라미터를 xdat 파일로 저장(백업)합니다.
2. 서보 파라미터를 마음대로 수정한 뒤 복원하고 싶다면:
3. **📂 xdat 열기**: 백업 파일을 불러옵니다.
4. **📤 파라미터를 서보로 복원**: 백업을 현재 서보의 EEPROM에 다시 씁니다.

## 주의사항

1. **안전 제일**: 파라미터 쓰기는 EEPROM에 영구 저장됩니다. 쓰기 전에 전원 공급이 안정적이고 로봇팔이 사람이나 물체에 부딪히지 않는지 확인하세요.
2. **전원 공급**: SoARM 101 표준판은 DC 5V 5A, Pro판은 DC 12V 5A를 권장합니다. 전원 공급이 부족하면 서보가 스텝을 놓치거나 통신이 실패할 수 있습니다.
3. **시리얼 포트 독점**: Windows에서는 시리얼 포트가 프로그램에 독점되므로 같은 포트를 두 프로그램이 동시에 점유할 수 없습니다. 다른 프로그램(시리얼 모니터)이 같은 포트를 열어 둔 상태에서 본 도구를 사용하지 마세요.
4. **Linux 시리얼 권한**: `/dev/ttyUSB*` / `/dev/ttyACM*`에 접근하려면 사용자를 `dialout` 그룹에 추가해야 합니다(위 "Linux" 절 참조).
5. **macOS 시리얼 이름**: `/dev/tty.*`(블로킹, 멈출 수 있음)가 아닌 `/dev/cu.*`(논블로킹)를 사용하세요. 위 "macOS" 절 참조.
6. **핫플러그**: USB를 뽑으면 프로그램이 자동 재연결을 시도합니다. 다시 꽂은 후 `🔄`를 클릭해 포트 목록을 새로 고침하세요.
7. **과열 / 과전압 보호**: 프로그램이 전압과 온도를 모니터링합니다(온도 > 60°C 경고). 서보가 계속 고온이면 작동을 멈추고 열을 식히세요.
8. **파라미터 쓰기는 되돌릴 수 없음**: EEPROM에 쓰면 기존 값이 덮어써져 취소할 수 없습니다. 먼저 "xdat 현재 서보 저장"으로 백업한 뒤 수정하는 것을 권장합니다.
9. **ID 변경 위험**: 쓰기 실패나 검증 실패 시 프로그램이 오류를 보고하지만, 극단적인 경우 서보 연결이 끊길 수 있습니다. 끊긴 경우 "공장 초기화"를 시도해 보세요(초기화 후 ID가 1로 돌아갑니다).
10. **인코딩 문제**: Windows 콘솔에서 emoji가 깨져 보이면 `PYTHONIOENCODING=utf-8`을 설정한 후 명령줄 도구를 실행하세요. Linux / macOS는 기본 UTF-8이라 일반적으로 이 문제가 없습니다.

## 문제 해결

| 증상 | 가능한 원인 | 해결 방법 |
| ---- | -------- | -------- |
| 시리얼 포트를 열 수 없음 / 포트 사용 중 | 다른 프로그램이 점유 | 시리얼 모니터 등 프로그램을 닫거나, 포트를 교체한 후 도구 재시작 |
| Windows에서 시리얼 포트 열 때 PermissionError | 다른 프로세스가 해당 COM 포트 점유 | 해당 COM 포트를 점유하는 다른 프로세스가 없는지 확인 |
| 서보를 스캔할 수 없음 | 전원 부족 / 배선 오류 / 보레이트 불일치 | 전원과 배선을 확인하고 서보가 1M 보레이트인지 확인 |
| 파라미터 읽기 실패 | 시리얼 포트 점유 / 서보 무응답 | 다른 프로그램 종료; 재연결; 주소가 올바른지 확인 |
| 쓰기 실패 | 서보 전원 부족 또는 대상 레지스터 쓰기 불가 | 서보 전원과 연결 확인; 대상 레지스터가 쓰기 가능한지 확인 |
| 온도 상승이 너무 빠름 | 부하 과다 또는 스톨 | 기구 걸림 확인, 속도/가속도 저하 |
| ID 변경 후 서보를 찾을 수 없음 | ID 충돌 또는 쓰기 실패 | 공장 초기화 후 다시 스캔 |
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
SCS0009_ServoController/
├── docs/                    # 分系统教程（中英文）
│   ├── zh/                  # 中文教程
│   │   ├── Windows教程.md
│   │   ├── Linux教程.md
│   │   └── macOS教程.md
│   └── en/                  # 英文教程
│       ├── Windows.md
│       ├── Linux.md
│       └── macOS.md
├── src/
│   ├── gui/                  # PySide6 图形界面
│   │   ├── factory_calibration_tool.py   # 主窗口（FT 调试器 + 语言切换）
│   │   ├── ft_debugger.py                # FT 调试器面板（参数读写 / xdat 备份）
│   │   ├── theme_utils.py                # 浅色主题
│   │   └── language_dialog.py            # 语言选择对话框
│   ├── xdat_utils.py         # xdat 参数文件读写
│   ├── i18n*.py / i18n_translations/     # 中英文国际化
│   └── port_utils.py         # 串口检测
├── scservo_sdk/              # FTServo 舵机通信 SDK
├── requirements.txt
└── setup.py                  # 环境检查脚本
```

본 도구 저장소는 `src/gui`(PySide6 그래픽 인터페이스와 FT 디버거), `scservo_sdk`(FTServo 서보 통신 SDK), `setup.py`(환경 확인 스크립트) 등의 모듈로 구성됩니다.

<RelatedProducts slugs="feetech-servo" />
