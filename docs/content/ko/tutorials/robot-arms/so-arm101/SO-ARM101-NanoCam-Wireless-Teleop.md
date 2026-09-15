---
title: SO-ARM101 무선 텔레오퍼레이션(ESP32-NanoCam 버전)
description: "경기 시연을 위한 무선 텔레오퍼레이션 방안: 리더 암은 LeRobot으로 Ubuntu 컴퓨터에 연결하고, 팔로워 암은 ESP32-NanoCam 모듈로 micro-ROS WiFi를 통해 제어하며, 배선, 전원 공급, 플래싱, 캘리브레이션과 카메라 FPV의 전체 흐름을 다룹니다."
---

# SO-ARM101 무선 텔레오퍼레이션(ESP32-NanoCam 버전)

> **[스토어에서 구매](https://www.juxitech.com/ko/products/so-arm101-developers-kit)**

본 튜토리얼은 경기 시연용 드론에 탑재한 SO-ARM101 로봇 암 무선 텔레오퍼레이션 시나리오를 대상으로 합니다: 리더 암은 LeRobot으로 Ubuntu 컴퓨터에 연결하고, 팔로워 암은 자체 개발한 [ESP32-S3 WiFi 영상 모듈](/ko/products/esp32-s3-wifi-module)(ESP32-NanoCam, ESP32-S3 N16R8)로 제어하며, micro-ROS WiFi UDP로 명령을 수신하고 온보드 카메라 FPV, 마이크, 스피커와 RGB 상태 LED를 통합했습니다. 문제가 발생하면 [문제 해결 가이드](./SO-ARM101-NanoCam-Troubleshooting.md)를 참조하세요.

## 소개와 시스템 아키텍처

```text
SO-ARM101 리더 암(leader) → USB 서보 드라이버 보드 → Ubuntu 22.04 (LeRobot + ROS2 Humble + micro-ROS Agent)
                                            │  2.4 GHz Wi-Fi(동일 LAN)
                                            ▼
                              ESP32-NanoCam 팔로워 암 컨트롤러(ESP32-S3)
                                            │  1 Mbps UART(서보 드라이버 보드 UART 핀으로 중계)
                                            ▼
                              SO-ARM101 팔로워 암(follower) 6 × STS3215
```

- 리더 암 조작자의 동작 → LeRobot이 리더 암을 읽음 → ROS2 토픽 `/joint_command` → micro-ROS Agent가 UDP 8888로 전송 → ESP32-NanoCam이 수신하여 서보 6개를 구동;
- 팔로워 암은 `/joint_states`(20Hz)를 역방향으로 회신하며, 폐루프와 워치독으로 사용;
- 온보드 카메라가 MJPEG 스트림 `http://<IP>/stream`(FPV)을 게시하며, PC 측에서 ROS 토픽으로 변환 가능.

역할 분담: 리더 암은 Ubuntu 컴퓨터에 연결하고, 팔로워 암은 ESP32-NanoCam으로 제어하며, 둘은 무선으로 연결됩니다. 펌웨어 전원 투입 후의 온보드 기능:

| 기능 | 구현 | 설명 |
|---|---|---|
| micro-ROS 텔레오퍼레이션 | `main.cpp` + `servo_bus.cpp` | `/joint_states` 20Hz 피드백, `/joint_command` 명령 수신, 완전한 안전 메커니즘 내장 |
| 카메라 FPV | `camera_stream.cpp` | `http://<IP>/stream` MJPEG 스트림(QVGA) |
| 마이크 | `audio_es8311.cpp` | 환경 음량 레벨 → `/follower_audio/level`(Float32, 5Hz) |
| 스피커 | `audio_es8311.cpp` | 시작/준비/잠금 해제/오류 알림음 |
| RGB 상태 LED | `rgb_status.cpp` | 시작 빨강 → WiFi 주황 → micro-ROS 초록 → 잠금 해제 파랑; WiFi 끊김 빨강 |

## 하드웨어 목록

| 하드웨어 | 수량 | 설명 |
|---|---|---|
| SO-ARM101 리더 암 | 1 | 6×STS3215 서보 포함 |
| SO-ARM101 팔로워 암 | 1 | 6×STS3215 서보 포함 |
| ESP32-NanoCam 모듈 | 1 | ESP32-S3 N16R8, 온보드 카메라/오디오/RGB |
| USB 서보 드라이버 보드 | 2 | 캘리브레이션 + 리더/팔로워 암 버스 중계(UART 핀) |
| Ubuntu 22.04 컴퓨터 | 1 | LeRobot + ROS2 + Agent 실행 |
| 2.4GHz 공유기 또는 휴대폰 핫스팟 | 1 | 리더 암 컴퓨터와 NanoCam이 같은 LAN |
| 12V 5A 외부 전원 | 1 | **팔로워 암 전원 공급**(USB로는 서보 6개를 구동할 수 없음) |
| 5V 6A 외부 전원 | 1 | **리더 암 전원 공급**(Ubuntu 컴퓨터에 연결) |
| USB-C 데이터 케이블 | 2 | NanoCam 전원 공급/디버깅 + 리더 암 드라이버 보드-컴퓨터 연결 |

> NanoCam 온보드 주변장치: 카메라 GC2145(DVP); 오디오 ES8311(I2S 24kHz, AP2718AT 마이크 + NS4150B 스피커); RGB WS2812 @ GPIO18.

## 배선 방식

ESP32-NanoCam과 팔로워 암 사이는 **서보 드라이버 보드의 UART 핀을 통해 중계**합니다:

```text
서보 드라이버 보드 UART:   RX ←── NanoCam TX (P2-8 / GPIO20)
                   TX ──→ NanoCam RX (P2-7 / GPIO19)
                  GND ──→ NanoCam GND
```

- **TX는 RX에, RX는 TX에 연결(교차)**, GND 공통 접지, 1 Mbps 보레이트;
- NanoCam 서보 버스는 UART1을 사용하며 모듈의 **P2-7 / P2-8**에 연결(디버그 시리얼은 USB-C, CH340K → UART0으로, 둘은 완전히 독립적이라 동시에 사용 가능);
- 서보 버스와 서보 전원은 공통 접지(팔로워 암 12V 5A 전원).

### NanoCam 주요 핀

| 주변장치 | 핀 |
|---|---|
| 서보 버스(UART1) | TX=GPIO20(P2-8 ESP_P), RX=GPIO19(P2-7 ESP_N), 모듈 P2 헤더 |
| 디버그 시리얼(UART0) | GPIO43/44 → 온보드 CH340K → USB-C(네이티브 USB CDC 없음) |
| 카메라 DVP(GC2145) | D0~D7=GPIO4/2/1/3/5/7/8/10, PCLK=6, VSYNC=13, HREF=11, XCLK=9(24MHz), PWDN=12, RESET=14, SCCB SDA/SCL=41/42 |
| 오디오 ES8311(I2S) | MCLK=39, BCLK=38, WS=47, DIN(ADC)=40, DOUT(DAC)=48; I2C SDA/SCL=41/42, 주소 0x30 |
| 마이크 | AP2718AT 아날로그 MEMS(ES8311 ADC 경유) |
| 스피커 | NS4150B 클래스 D 앰프(ES8311 DAC 경유), 보드에 PA 인에이블 핀 없음 |
| RGB | WS2812 @ GPIO18(1개, GRB, RMT 구동) |
| BOOT | GPIO0 |

> 핀 정의는 `docs/reference/nano_config.h`와 하드웨어 회로도 문서에서 가져왔습니다.

## 전원 공급

| 장치 | 전원 공급 방식 |
|---|---|
| ESP32-NanoCam | **USB 데이터 케이블 전원 공급**(CH340K 디버그 시리얼 동시 동작) |
| 팔로워 암(6×STS3215) | **12V 5A** 외부 전원 |
| 리더 암(Ubuntu 컴퓨터 연결) | **5V 6A** 외부 전원 |

> ⚠️ USB로는 서보 6개를 구동할 수 없으므로 팔로워 암은 반드시 12V 5A 외부 전원을 사용해야 합니다; ESP32는 USB 데이터 케이블로 전원을 공급하면 됩니다.

## 환경 요구 사항

### 컴파일·플래싱 측(Windows / Linux / macOS 모두 가능)

| 항목 | 요구 사항 |
|---|---|
| 운영체제 | Windows 10/11 또는 Linux(macOS도 가능) |
| Python | 3.8+(`python --version`으로 확인) |
| PlatformIO | Core 6.x(esp32s3 툴체인 + Arduino 프레임워크 포함) |
| 디스크 공간 | 최소 3 GB 여유 |
| 네트워크 | GitHub / Espressif CDN 접속 가능(최초 툴체인 다운로드 약 1-2 GB) |

### 실행 측(Ubuntu 22.04 컴퓨터, 최종적으로 텔레오퍼레이션을 실행하는 곳)

| 항목 | 요구 사항 |
|---|---|
| 운영체제 | Ubuntu 22.04(64비트) |
| ROS 2 | Humble(Hawksbill) |
| LeRobot | Feetech SO-101 지원 포함(`so101_leader` / `so101_follower`) |
| micro-ROS Agent | `snap run micro-ros-agent` 또는 소스 설치 |
| 의존 명령 | `nmcli`, `ip`, `flock`(NetworkManager, iproute2, util-linux 기본 포함) |
| Python 환경 | `lerobot_so101` 가상 환경(conda/miniforge) |

> 디버그 시리얼 인식: NanoCam의 USB 인터페이스는 CH340K → UART0 변환이며, Linux에서 장치 이름은 보통 `/dev/ttyUSB0`(또는 `/dev/serial/by-id/...CH340*`)이고, PlatformIO가 자동으로 인식합니다(보드 정의에 CH340의 HWID 0x1A86:0x7523이 구성됨); 시리얼 모니터 보레이트 115200. 더 완전한 LeRobot/Ubuntu 환경 설치는 [SO-ARM101 사용 튜토리얼](./SO-ARM101-Tutorial.md)을 참조하세요.

## 설치 단계

### 1. PlatformIO 설치(컴파일·플래싱 측)

**방식 A: VSCode 확장(권장)**

1. [VSCode](https://code.visualstudio.com/) 설치;
2. 확장 마켓에서 **PlatformIO IDE**를 검색해 설치하면, 설치 후 자동으로 재시작되고 PlatformIO Core를 다운로드합니다;
3. VSCode 터미널에서 `pio --version`으로 확인.

**방식 B: 명령줄 설치**

```bash
pip install platformio
```

> Windows에서 Git Bash 안에서 `pio` 명령을 찾을 수 없다면 PowerShell/CMD 터미널로 바꾸거나, `C:\Users\<사용자 이름>\.platformio\penv\Scripts`를 PATH에 추가하세요.

### 2. 최초 빌드(툴체인 자동 다운로드)

펌웨어 디렉터리로 이동해 한 번 컴파일합니다(플래싱 없음):

```bash
cd firmware/nanocam_soarm
pio run
```

최초 실행 시 순서대로 다운로드합니다:

1. espressif32 플랫폼(`espressif32@7.0.1`);
2. **툴체인** `toolchain-xtensa-esp32s3`(약 100 MB, Espressif CDN 제공);
3. Arduino 프레임워크 `framework-arduinoespressif32`(약 200 MB).

다운로드가 느리거나 멈출 때의 처리:

- PlatformIO의 남은 시간 추정은 부정확하여, 한동안 멈춘 듯하다가 갑자기 완료되는 경우가 많으니 5분 동안 퍼센트가 진행되는지 관찰하세요;
- 프록시/VPN 사용(시스템 프록시 경유);
- 툴체인 수동 다운로드: 브라우저에서 `https://dl.espressif.com/dl/xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-win32.zip`(Linux는 `-linux-amd64.tar.gz`)을 다운로드하고, 압축 해제 후 디렉터리 이름을 `toolchain-xtensa-esp32s3`로 바꿔 `C:\Users\<사용자 이름>\.platformio\packages\`에 넣은 뒤 `pio run`을 다시 실행;
- 중간에 Ctrl+C로 중단해도 환경이 손상되지 않으며, 재실행하면 이어받습니다.

### 3. Ubuntu 실행 환경 설치

```bash
# 1. ROS 2 Humble(공식 문서에 따라 설치)
#    https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debs.html
source /opt/ros/humble/setup.bash

# 2. LeRobot(Feetech 지원 포함)
conda create -n lerobot_so101 python=3.10 -y
conda activate lerobot_so101
pip install lerobot[feetech]

# 3. micro-ROS Agent
sudo snap install micro-ros-agent
snap run micro-ros-agent udp4 --port 8888   # 시작 가능한지 테스트

# 4. PlatformIO(Ubuntu 측에서도 컴파일·플래싱이 필요할 경우)
pip install platformio
```

## WiFi 구성

PC와 NanoCam은 반드시 같은 LAN(2.4GHz Wi-Fi, 휴대폰 핫스팟 가능)이어야 하며, 공유기/핫스팟에서 클라이언트 격리가 켜져 있으면 안 됩니다. WiFi 구성은 두 가지 방식 중 하나를 선택합니다.

### 방식 1: 컴파일 시점 구성(기본)

```bash
cd firmware/nanocam_soarm
cp src/wifi_config.example.h src/wifi_config.h
# wifi_config.h 편집: WIFI_SSID / WIFI_PASS / AGENT_IP(Ubuntu 컴퓨터 LAN IP)
```

### 방식 2: 시리얼 명령 구성(권장, 재플래싱 불필요)

펌웨어에 런타임 구성(NVS 저장)이 내장되어 있어 디버그 시리얼(115200 보레이트)로 언제든 입력할 수 있습니다:

| 명령 | 작용 |
|---|---|
| `wifi_ssid:핫스팟이름` | WiFi 이름을 설정하고 저장 |
| `wifi_pass:비밀번호` | WiFi 비밀번호를 설정하고 저장 |
| `agent_ip:Ubuntu컴퓨터IP` | micro-ROS Agent IP를 설정하고 저장 |
| `wifi_show` | 현재 적용 중인 구성 확인 |
| `wifi_clear` | 저장된 구성을 삭제하고 컴파일 시점 기본값으로 복원 |

설정 명령은 저장 후 **3초 뒤 자동 재시작하여 적용**됩니다. 우선순위: 시리얼로 저장한 구성 > 컴파일 시점 기본값. 핫스팟/컴퓨터를 바꿀 때는 USB를 꽂고 명령 세 줄만 입력하면 되며, 코드를 수정해 다시 플래싱할 필요가 없습니다.

> 컴파일 시점 기본값(`wifi_config.h`)은 항상 유지되어 시리얼 구성이 없을 때의 대체값이 됩니다; `wifi_show`는 "NVS에서 온 값"과 "컴파일 시점 기본값"을 구분해 표시합니다. 비밀번호는 NVS에 평문으로 저장되며 LAN 데모 시나리오에서는 허용할 수 있습니다; `wifi_config.h`에는 WiFi 비밀번호가 포함되어 있고 `.gitignore`에 제외되어 있으니 저장소에 커밋하지 마세요.

## 플래싱과 시작

```bash
cd firmware/nanocam_soarm
pio run --target upload
```

**다운로드 모드 진입(핵심)**: NanoCam은 CH340K → UART0 시리얼 다운로드 방식입니다(USB CDC 자동 다운로드 아님). 먼저 upload를 바로 실행하세요. 보드에 자동 다운로드 회로가 있으면 바로 성공합니다; 연결할 수 없다는 메시지가 나오면: **BOOT 키(GPIO0)를 누른 상태에서 USB를 꽂고(또는 리셋 누름) → BOOT를 놓은 뒤**, 즉시 upload를 다시 실행하세요. Windows에서 시리얼 포트가 자동 인식되지 않으면 `platformio.ini`의 `[env:nano_cam]`에 `upload_port = COM3` 한 줄을 추가하세요(장치 관리자에서 CH340의 실제 COM 번호로 교체).

시리얼 로그 확인:

```bash
pio device monitor --baud 115200
```

플래싱 후 순서대로 다음이 보여야 합니다:

```text
audio: ES8311 ready @24000Hz      ← 오디오 초기화 성공
Servo Ping mask: 0x3f             ← 서보 6개 모두 온라인
Servo calibration match: YES      ← 캘리브레이션 배열과 서보 EEPROM 일치
IP: 192.168.x.x  RSSI: -xx        ← WiFi 연결됨
Waiting for micro-ROS Agent...    ← Agent 대기(다음 단계를 시작하면 사라짐)
```

> 서보 버스는 플래싱 시 비어 있어도 되며, 플래싱과 서보 동작은 서로 간섭하지 않습니다(UART0 디버그 / UART1 서보 독립). 프로젝트에 ESP32-S3(xtensa-lx7)용 micro-ROS 정적 라이브러리가 포함되어 있어 일상적인 사용에서는 직접 컴파일할 필요가 없습니다.

## 캘리브레이션 설명

프로젝트 `cali/` 디렉터리에 리더 암/팔로워 암 캘리브레이션 파일이 포함되어 있고, 펌웨어 내 캘리브레이션 배열도 팔로워 암 캘리브레이션(즉 `cali/follower_recal.json`)과 정렬되어 있습니다. **팔로워 암/리더 암 하드웨어를 교체할 때만 재캘리브레이션이 필요합니다.**

```bash
# 팔로워 암
python -m lerobot.scripts.lerobot_calibrate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --robot.id=follower_recal --robot.calibration_dir="$PWD/cali"

# 리더 암
python -m lerobot.scripts.lerobot_calibrate \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM0 \
  --teleop.id=leader_recal --teleop.calibration_dir="$PWD/cali"
```

팔로워 암을 재캘리브레이션한 후에는 반드시 `firmware/nanocam_soarm/src/servo_bus.cpp`를 열어 `kHomingOffsets` / `kRangeMin` / `kRangeMax` 세 배열을 자신의 `cali/follower_recal.json` 값으로 교체하고(순서: shoulder_pan, shoulder_lift, elbow_flex, wrist_flex, wrist_roll, gripper), 다시 컴파일·플래싱해야 합니다.

## 무선 텔레오퍼레이션 실행

### 시작 전 점검

```bash
# 1. Ubuntu 컴퓨터를 NanoCam과 동일한 2.4GHz WiFi에 연결
# 2. 리더 암 USB 서보 드라이버 보드가 연결되고 인식됨
ls -l /dev/ttyACM*   # 리더 암 시리얼 포트 찾기
# 3. 팔로워 암 NanoCam이 전원 투입되고 네트워크에 연결됨(시리얼 또는 브라우저로 MJPEG 스트림 접근 확인)
```

### 원클릭 시작

```bash
# 환경 설정(start_soarm_demo.sh 상단의 기본값을 직접 편집해도 됨)
export SOARM_WIFI_SSID="2.4G 핫스팟"
export SOARM_AGENT_IP="Ubuntu 컴퓨터 IP"
export SOARM_LEADER_PORT="/dev/ttyACM*"
export SOARM_PYTHON="$(command -v python)"   # lerobot_so101 환경

./start_soarm_demo.sh --check    # 비행 전 점검: 네트워크/리더 암/Agent/팔로워 암 온라인
./start_soarm_demo.sh            # 텔레오퍼레이션 정식 시작, Ctrl+C로 중지
```

스크립트는 순서대로 다음을 수행합니다:

1. 네트워크(SSID가 `EXPECTED_WIFI_SSID`와 일치해야 함), 리더 암 시리얼 포트, 캘리브레이션 파일 존재 확인;
2. micro-ROS Agent 시작(실행 중이 아니면, 로그는 `logs/micro_ros_agent.log`);
3. 팔로워 암 `/joint_states` 온라인 대기(15초 타임아웃);
4. 리더 암 동작 → 팔로워 암 추종, 30Hz 명령 주기, **`--mapping-mode absolute`(절대 매핑)**.

**absolute 매핑에 대하여**: 리더 암 자세와 팔로워 암 자세가 각자의 캘리브레이션 좌표계에서 일대일로 대응하며, 장점은 **연결이 끊겼다 다시 연결해도 누적 편차가 없다는 것**입니다——재연결 시 팔로워 암이 8초 이내에 리더 암의 현재 자세로 부드럽게 정렬되고(startup_blend), 이후 리더 암이 영점으로 돌아가면 팔로워 암도 자신의 영점으로 돌아갑니다. 이전에는 relative(상대) 매핑을 사용했지만, 연결이 끊겼다 다시 연결하면 팔로워 암이 끊긴 위치에 머물러 영점으로 돌아간 리더 암과 영구적인 편차가 생기므로 absolute로 변경했습니다.

**Agent 연결 끊김 시 자동 재시작**(펌웨어 2026-08-19 이후): Ctrl+C로 텔레오퍼레이션을 중지하면 팔로워 암이 약 10초 이내에 자동 재시작하여 `Waiting for micro-ROS Agent...` 상태로 돌아가므로, 팔로워 암을 수동으로 리셋할 필요 없이 이 스크립트를 바로 다시 실행할 수 있습니다(재연결 동안 팔로워 암은 영점으로 복귀, 즉 재전원).

링크가 수립되면 팔로워 암 시리얼에 `micro-ROS ready`가 출력되고(RGB가 초록으로 바뀌고 스피커에서 준비 알림음이 울림), `Waiting for micro-ROS Agent...`가 사라집니다.

### 토픽 수동 검증

```bash
ros2 topic echo /joint_states --once           # 팔로워 암 피드백
ros2 topic hz /joint_states                    # 약 20 Hz여야 함
ros2 topic echo /follower_audio/level --once   # 마이크 레벨(말할 때 상승)
```

## 카메라 FPV

펌웨어는 전원 투입 후 네트워크에 연결되면 자동으로 MJPEG 스트리밍 서비스를 시작합니다(온보드 GC2145, DVP 인터페이스, 기본 HTTP 포트 80):

```text
http://<NANOCAM_IP>/         정보 페이지
http://<NANOCAM_IP>/jpg      단일 프레임 JPEG(스냅샷)
http://<NANOCAM_IP>/stream   연속 MJPEG 스트림(FPV)
```

### 매개변수와 튜닝

- 해상도 **QVGA 320×240**(정식 구성), **RGB565 캡처 + `frame2jpg` 소프트웨어 인코딩**(GC2145에는 하드웨어 JPEG 인코더가 없고 OV2640/OV5640에만 있음), JPEG 품질 12, 더블 버퍼는 **8MB Octal PSRAM**에 배치;
- **QVGA를 사용하는 이유**: 실측 결과 VGA(640×480) RGB565는 이 보드의 DVP에서 데이터 레이트가 너무 높아 화면 하단 약 2/3가 깨짐(XCLK 24/20/16MHz × 단일/더블 버퍼 조합 모두 재현); QVGA는 완전하고 부드러움(프레임 레이트가 하드웨어 JPEG보다 낮은 것은 정상);
- 스트리밍은 독립된 httpd 태스크에서 실행되며(스택을 16KB로 조정해 소프트웨어 인코딩을 수용), micro-ROS 텔레오퍼레이션, 오디오 캡처와 서로 간섭하지 않음;
- 기본 HTTP 포트 80(펌웨어 `HTTPD_DEFAULT_CONFIG()`);
- 해상도/품질을 바꾸려면: `firmware/nanocam_soarm/src/camera_stream.cpp`의 `config.frame_size` / `kJpegQuality`를 편집; 화면 방향은 `set_vflip` / `set_hmirror`로 조정(같은 파일);
- esp_http_server는 단일 태스크이므로 `/stream`과 `/jpg`를 **동시에 접근할 수 없음**(스트림이 켜져 있으면 `/jpg`가 멈춤);
- 카메라 초기화에 실패하면 펌웨어는 한 줄의 안내를 출력한 뒤 계속 정상 동작하며, 텔레오퍼레이션에는 영향이 없음.

PC 측 수신(ROS 2 토픽으로 게시, 메시지 유형 `sensor_msgs/CompressedImage`):

```bash
# 터미널 1: 평소처럼 텔레오퍼레이션 시작
./start_soarm_demo.sh

# 터미널 2: 영상을 수신하고 토픽으로 게시
source /opt/ros/humble/setup.bash
python3 tools/follower_camera.py --stream http://<NANOCAM_IP>/stream
# 선택: --topic /사용자정의토픽  --max-fps 10

# 검증
ros2 topic hz /follower_camera/image_raw/compressed   # 약 10~15 Hz여야 함
rviz2    # Add → By topic → Camera, /follower_camera/image_raw/compressed 선택
```

ROS를 설치하지 않고도 먼저 링크를 검증할 수 있습니다: 브라우저에서 `http://<NANOCAM_IP>/stream`을 열거나 `curl -s http://<NANOCAM_IP>/jpg -o snap.jpg`를 실행하세요.

## 오디오(마이크와 스피커)

**마이크**: AP2718AT 아날로그 MEMS(ES8311 ADC 경유). 펌웨어가 200ms마다 환경 음량 레벨(RMS, 0~1로 정규화)을 읽어 `/follower_audio/level`(`std_msgs/Float32`, best-effort)로 게시합니다. 음성 활동 감지, 환경 청취를 직접 구현하거나 "말할 때만 캡처"하는 간단한 트리거 신호로 사용할 수 있습니다.

```bash
ros2 topic echo /follower_audio/level
```

**스피커**: ES8311 DAC → NS4150B 클래스 D 앰프(보드에 PA 인에이블 핀 없음), 네 가지 알림음 내장(아래 절 참조); 알림음을 사용자 정의하려면 `audio_es8311.cpp`의 `play_tone()` 호출을 수정하세요. 음량은 ES8311 레지스터 0x32(`R_DAC32`, 현재 펌웨어에서 최대 0xFF로 설정됨).

### 오디오 매개변수와 튜닝

- 샘플링 레이트 24 kHz, 16-bit, 스테레오 슬롯(NanoCam 원본 펌웨어와 동일), MCLK = 256×FS = 6.144 MHz;
- **MCLK는 LEDC로 생성**(GPIO39, 80MHz÷13≈6.154MHz, 오차 0.16%로 허용 범위 내): legacy I2S 드라이버는 ESP32-S3에서 MCLK를 출력하지 않아 스피커 무음 + 마이크 레벨이 계속 0이 되는데, `audio_es8311.cpp`의 `start_ledc_mclk()`에서 LEDC로 수정했습니다;
- ES8311 제어는 I2C1 사용(GPIO41/42 물리 버스는 카메라 SCCB와 공유하되, 카메라는 시작 시에만 SCCB를 사용하므로 런타임 충돌 없음); `init()` 끝에서 `Wire1.end()`로 I2C를 카메라에 양보;
- 마이크 게인 기본값은 NanoCam 원본과 동일(레지스터 0x16 = 0x24), 감도를 높이려면 `audio_es8311.cpp`의 `R_ADC16` 값을 조정하세요.

## RGB 상태 LED와 알림음

### RGB 상태 의미

| 색상 | 상태 |
|---|---|
| 빨강 | 시작 중 / micro-ROS 초기화 실패 / WiFi 끊김 |
| 주황 | WiFi 연결됨, micro-ROS Agent 대기 중 |
| 초록 | micro-ROS 준비 완료(텔레오퍼레이션 링크 연결) |
| 파랑 | 서보 제어 잠금 해제(ARMED) |
| 보라 | 제어 명령 거부됨(핸드셰이크/리밋/스텝 불일치) |

### 스피커 알림음

| 이벤트 | 알림음 |
|---|---|
| 전원 투입 | 짧은 "삐삐" 두 번(시작음) |
| micro-ROS 준비 완료 | 상승하는 두 음 |
| 서보 잠금 해제 | 상승하는 두 음 |
| 초기화 실패 | 낮은 음 한 번 |

> 알림음은 이벤트 구동 방식입니다: 시작음은 전원 투입 즉시 재생되고, 준비음은 Agent 통신이 수립될 때, 잠금 해제음은 제어 명령을 받을 때 재생되므로, 전원만 켜고 텔레오퍼레이션을 실행하지 않으면 시작음만 들립니다.

## 안전 메커니즘

펌웨어에 다음 안전 메커니즘이 내장되어 있으며 수동 구성이 필요 없습니다:

- 서보 신원 확인, EEPROM 캘리브레이션 확인;
- 현재 자세 핸드셰이크(0.05 rad);
- 소프트 리밋; 단일 명령 스텝 제한 0.25 rad;
- 피드백 워치독 0.5 s;
- WiFi 끊김 10 s 타임아웃 시 자동 재시작.

> 비행 시연 주의: 거꾸로(역방향) 장착한 뒤에는 관절 방향, 무게 중심, 전원(BEC) 방식을 다시 확인하고 EMI 간섭 테스트를 수행해야 합니다.

## 검증 상태

### 테스트 결과(예상)

- 팔로워 서보 여섯 개가 모두 인식됨(`servo_mask=0x3f`);
- `/joint_states` 약 20 Hz 게시;
- 메인 브리지 30 Hz 명령 게시;
- 카메라 스트림 `http://<IP>/stream` QVGA 부드러움;
- `/follower_audio/level` 5 Hz 게시, 말할 때 레벨이 뚜렷이 상승;
- RGB 상태 LED가 시작→네트워크 연결→준비→잠금 해제 순으로 단계적으로 변화;
- USB 데이터 케이블을 뽑아도(ESP32 독립 전원, 팔로워 암 외부 12V 전원) 계속 동작.

### 개발 상태

**보드 검증 통과(2026-08-19):**

- 오디오 `ES8311 ready @24000Hz`(MCLK 출력 정상 + 스피커/마이크 모두 정상, MCLK 누락 + 음량 과소 문제 수정);
- WiFi 연결 + micro-ROS 통신(`/joint_states` 20Hz 안정, `/follower_audio/level` 정상);
- GC2145 카메라 FPV: QVGA `/stream` 완전하고 부드러움(I2C 충돌 / 소프트 인코딩 / httpd 스택 / multipart 경계 수정);
- 전체 텔레오퍼레이션 체인(리더 암 동작 → 팔로워 암 추종);
- **absolute 매핑 + Agent 연결 끊김 자동 재시작**: 연결이 끊겼다 재연결한 뒤 리더·팔로워 암 정렬에 편차 없음; Ctrl+C 후 팔로워 암이 자동 재시작하여 재연결 대기.

**아직 검증 필요:**

- 비행 시나리오: 역방향 장착 방향, 무게 중심, 전원(BEC), EMI 간섭.

## 프로젝트 구조와 펌웨어 심화

본 프로젝트의 팔로워 암 컨트롤러는 ESP32-S3에서 자체 개발한 ESP32-NanoCam 모듈(ESP32-S3 N16R8, 온보드 DVP 카메라 / ES8311 오디오 / WS2812 RGB)로 발전했습니다.

### 디렉터리 구조

```text
firmware/nanocam_soarm/   ESP32-NanoCam 팔로워 암 펌웨어 (PlatformIO)
  ├─ boards/nano_cam.json 자체 보드 정의 (16MB Flash / 8MB Octal PSRAM)
  ├─ src/                 펌웨어 소스 (micro-ROS 텔레오퍼레이션 + 카메라 + 오디오 + RGB)
  ├─ lib/microros/        micro-ROS 정적 라이브러리 (xtensa-lx7)
  └─ lib/scservo/         SCServo 서보 라이브러리 (로컬화, 네트워크 의존 없음)
tools/                    PC 측 스크립트 (wireless_teleoperate.py 텔레오퍼레이션 브리지, follower_camera.py FPV 수신)
start_soarm_demo.sh       원클릭 시작 스크립트 (네트워크/Agent/캘리브레이션 사전 점검 + 텔레오퍼레이션)
cali/                     리더 암/팔로워 암 캘리브레이션 파일
docs/                     프로젝트 진행과 실험 기록 + 하드웨어 참고 (docs/reference/)
```

### 초기 버전과의 차이

| 항목 | 본 프로젝트 (ESP32-NanoCam) |
|---|---|
| 보드 정의 | 자체 제작 `boards/nano_cam.json`(16MB Flash / 8MB Octal PSRAM, qio_opi) |
| 서보 버스 | Serial1/UART1, TX=20/RX=19(UART0은 CH340K 디버그가 점유) |
| 디버그 시리얼 | UART0 (43/44) → CH340K → USB-C |
| 카메라 | NanoCam DVP GC2145(GPIO1~14 + 41/42), XCLK 24MHz |
| 오디오 | ES8311 + AP2718AT 마이크 + NS4150B 스피커(신규) |
| RGB | WS2812 상태 LED(신규) |
| micro-ROS 라이브러리 | xtensa-lx7——NanoCam도 ESP32-S3이므로 S3 버전과 호환 |
| PC 측 스크립트 | 변경 없음(tools/, start_soarm_demo.sh는 하드웨어와 무관) |

### micro-ROS 헤더 경로와 build_flags

micro-ROS 헤더 트리는 평면 구조(`include/<pkg>/<header>.h`)이며 `-Ilib/microros/include` 루트 경로만 유지합니다. 패키지별 `-Ilib/microros/include/<pkg>/` 경로를 **추가하지 마세요**——그러면 `<string.h>`가 `rosidl_runtime_c/string.h`로, WiFi 라이브러리의 `<Client.h>`가 `rcl/Client.h`로 해석되어 컴파일이 실패합니다.

### libmicroros.a 재빌드(ESP32-S3 / xtensa-lx7)

> 본 프로젝트의 `firmware/nanocam_soarm/lib/microros/`에는 ESP32-S3 버전 정적 라이브러리가 포함되어 있습니다(NanoCam은 ESP32-S3이므로 라이브러리가 호환됨). **일반 사용자는 이 절을 건너뛰세요.** micro-ROS 구성을 사용자 정의할 때(메시지 유형, QoS, 메모리 풀 등)만 재빌드가 필요합니다——일상 개발에서는 `libmicroros.a`를 재컴파일할 필요가 없습니다.

**방식 A: 공식 Docker 빌더(권장, 어떤 머신에서든 실행 가능)**

micro-ROS 공식 `micro_ros_arduino` 라이브러리의 생성 스크립트에는 **esp32s3 타깃**이 내장되어 있습니다:

```bash
git clone -b humble https://github.com/micro-ROS/micro_ros_arduino.git
cd micro_ros_arduino
docker pull microros/micro_ros_static_library_builder:humble
docker run -it --rm -v $(pwd):/project \
  --env MICROROS_LIBRARY_FOLDER=extras \
  microros/micro_ros_static_library_builder:humble -p esp32s3
```

산출물은 `src/esp32s3/libmicroros.a`에, 헤더는 `src/` 아래 각 패키지 디렉터리에 있습니다:

```bash
cp src/esp32s3/libmicroros.a <프로젝트>/firmware/nanocam_soarm/lib/microros/
# 헤더 전체 교체(해당 디렉터리의 default_transport.cpp / wifi_transport.cpp /
# micro_ros_arduino.h 세 사용자 정의 파일은 유지)
rsync -a src/* <프로젝트>/firmware/nanocam_soarm/lib/microros/include/ \
  --exclude esp32s3 --exclude '*.cpp' --exclude micro_ros_arduino.h
```

**툴체인 관련**: 공식 스크립트의 esp32s3 구간은 기본적으로 `xtensa-esp32-elf`(LX6) 툴체인으로 컴파일하며, LX6/LX7은 일반 C 코드 명령어 집합이 호환되어 실행 가능합니다. 본 프로젝트에 포함된 `libmicroros.a`는 **순정 LX7 툴체인**(`xtensa-esp32s3-elf` gcc 8.4.0, PlatformIO 내장 버전과 동일)으로 컴파일했으며, 방법은 다음과 같습니다: `xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-linux-amd64.tar.gz`를 다운로드(Espressif crosstool-NG releases)한 뒤 압축을 풀고, `library_generation.sh`의 esp32s3 구간 `TOOLCHAIN_PREFIX`를 `/uros_ws/xtensa-esp32s3-elf/bin/xtensa-esp32s3-elf-`로 바꾸고, 컨테이너에 마운트해 다시 실행:

```bash
docker run --platform linux/amd64 -it --rm \
  -v $(pwd):/project \
  -v <압축 해제 디렉터리>/xtensa-esp32s3-elf:/uros_ws/xtensa-esp32s3-elf \
  --env MICROROS_LIBRARY_FOLDER=extras \
  microros/micro_ros_static_library_builder:humble -p esp32s3
```

> 주의: Apple Silicon에서는 반드시 `--platform linux/amd64`를 추가해야 합니다(이미지에 내장된 esp32 툴체인은 x86_64 바이너리라 arm64 컨테이너 안에서 실행할 수 없음).

**방식 B: Ubuntu 22.04 + ROS 2 Humble + PlatformIO 툴체인**

1. PlatformIO가 S3 툴체인을 이미 다운로드했는지 확인(펌웨어 디렉터리에서 `pio run`을 한 번 실행하면 됨):

   ```bash
   ls ~/.platformio/packages/toolchain-xtensa-esp32s3/bin/xtensa-esp32s3-elf-gcc
   ls ~/.platformio/packages/framework-arduinoespressif32/tools/sdk/esp32s3
   ```

2. micro_ros_setup으로 micro-ROS 소스를 가져옵니다(`build_microros.sh`의 `/tmp/firmware/mcu_ws` 레이아웃과 동일):

   ```bash
   mkdir -p /tmp/firmware && cd /tmp/firmware
   git clone -b humble https://github.com/micro-ROS/micro_ros_setup.git src/micro_ros_setup
   # micro_ros_setup 의존성 설치 후:
   source /opt/ros/humble/setup.bash
   colcon build && source install/local_setup.bash
   ros2 run micro_ros_setup create_firmware_ws.sh generate_lib
   ```

3. 본 프로젝트의 S3 빌드 스크립트를 실행:

   ```bash
   cd <프로젝트>/firmware/nanocam_soarm
   chmod +x build_microros_s3.sh
   ./build_microros_s3.sh
   ```

   스크립트는 이미 riscv32 → xtensa-esp32s3, `-march=rv32imc` → `-mlongcalls`, `esp32c3` SDK → `esp32s3` SDK로 변경되어 있습니다. 산출물은 스크립트 끝의 안내에 따라 프로젝트에 복사하면 됩니다.

### 참고 자료

- NanoCam 하드웨어 참고 문서(회로도/사양서/핀 정의/ES8311 드라이버): 저장소 `docs/reference/`
- [micro-ROS](https://micro.ros.org/) / [micro_ros_arduino](https://github.com/micro-ROS/micro_ros_arduino)
- [LeRobot](https://github.com/huggingface/lerobot)

<RelatedProducts slugs="so-arm101,esp32-s3-wifi-module" />
