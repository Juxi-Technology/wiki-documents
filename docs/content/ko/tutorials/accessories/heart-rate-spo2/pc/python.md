---
title: "PC 측 · Python 실행"
description: "Windows에서 USB-TTL 변환과 Python 스크립트로 MAX30102 심박·혈중 산소 데이터를 읽는 방법. 드라이버, COM 포트, 실행 단계 및 Modbus 레지스터 포함."
---

# PC 측 · Python 실행

## 목차

1. 하드웨어 준비
1. 하드웨어 연결
1. 소프트웨어 환경 구성
1. 예제 프로그램 실행
1. 자주 묻는 질문

---

## 하드웨어 준비

### 필요한 재료

| 재료 | 설명 |
|---|---|
| JUXI_HeartRate_SPO2 센서 | 심박·혈중 산소 모듈 |
| USB-TTL 변환 모듈 | CH340 / CP2102 / FT232 등 |
| 점퍼 와이어 | 4개(암-암) |
| Windows 컴퓨터 | Win7/Win10/Win11 |

---

## 하드웨어 연결

### 배선 방식

| 센서 핀 | USB-TTL 변환 핀 | 설명 |
|---|---|---|
| VCC | 3.3V 또는 5V | 전원 양극 |
| GND | GND | 전원 음극 |
| TX | RX | 센서 송신 → 모듈 수신 |
| RX | TX | 센서 수신 → 모듈 송신 |

![그림](../../../../../../public/images/tutorials/accessories/heart-rate-spo2/pc-python/01.png)

⚠️ **중요 안내**:

1. 모듈 스위치를 UART로 전환하십시오!!!
1. **TX와 RX는 반드시 교차 연결해야 합니다!**
1. 센서는 3.3V와 5V를 지원하므로 전압을 잘못 연결하지 마십시오
1. 모든 배선을 먼저 연결한 후 USB를 컴퓨터에 꽂으십시오

### 배선 개념도

```text
传感器        USB转TTL模块
┌──────┐      ┌──────────┐
│ VCC  │──────│ 3.3V/5V  │
│ GND  │──────│ GND      │
│ TX   │──────│ RX       │  ← 交叉连接
│ RX   │──────│ TX       │  ← 交叉连接
└──────┘      └──────────┘
```

---

## 소프트웨어 환경 구성

### 드라이버 설치

USB-TTL 변환 칩 모델에 따라 해당 드라이버를 설치하십시오:

- **CH340**: [https://sparks.gogo.co.nz/ch340.html](https://sparks.gogo.co.nz/ch340.html)
- **CP2102**: [https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers)
- **FT232**: [https://ftdichip.com/drivers/vcp-drivers/](https://ftdichip.com/drivers/vcp-drivers/)

설치가 완료되면 USB-TTL 변환 모듈을 꽂습니다.

### COM 포트 확인

#### 방법 1: 장치 관리자

1. `Win + X`를 누르고 "장치 관리자"를 선택합니다
1. "포트(COM 및 LPT)"를 확장합니다
1. USB-TTL 변환에 해당하는 COM 포트 번호(예: COM3)를 확인합니다

#### 방법 2: 프로그램 자동 감지

예제 프로그램을 실행하면 사용 가능한 모든 시리얼 포트가 자동으로 나열됩니다.

### Python 종속 패키지 설치

명령 프롬프트(CMD) 또는 PowerShell을 열고 실행합니다:

```bash
pip install pyserial
```

---

## 예제 프로그램 실행

압축 파일[JUXI_HeartRate_SPO2.zip](https://juxitech.feishu.cn/wiki/W2IwwDop5i4BVlk98EacfyJvnrh)을 다운로드하고 압축을 풉니다

### 파일 위치

```text
JUXI_HeartRate_SPO2/python/windows/
├── gain_heartbeat_SPO2.py  ← 主程序（直接运行这个）
├── JUXI_HeartRate_SPO2_Windows.py
├── JUXI_RTU_Windows.py
└── README_CN.md        ← 本文件
└── README.md
```

### 실행 단계

1. **하드웨어 연결이 올바른지 확인**
  - VCC → 3.3V/5V
  - GND → GND
  - TX → RX(교차)
  - RX → TX(교차)

1. **USB를 컴퓨터에 삽입**
1. **프로그램 실행**

```bash
cd D:\JUXI_HeartRate_SPO2\python\windows
```

```bash
python gain_heartbeat_SPO2.py
```

1. **안내에 따라 조작**
  - 프로그램이 사용 가능한 모든 시리얼 포트를 나열합니다
  - COM 포트 번호(예: COM3)를 입력합니다
  - 프로그램이 센서를 자동 감지하고 측정을 시작합니다

### 예상 출력

```python
==================================================
JUXI Blood Oxygen Sensor - Windows Test
==================================================
Available serial ports:
  COM3

Please enter the COM port number (e.g., COM3):

Connecting to COM3 at 9600 baud...
Initializing sensor...
Sensor initialized successfully!

Starting data collection...
Sensor LED should be ON now!

Place your finger on the sensor...

SPO2 (血氧): 97 %
Heart Rate (心率): 82 BPM
Temperature (温度): 26.5 °C
SPO2 (血氧): 98 %
Heart Rate (心率): 78 BPM
Temperature (温度): 26.6 °C
...
```

`Ctrl + C`를 눌러 프로그램을 중지합니다.

---

## 프로그램 기능 설명

### 주요API

```bash
# 创建传感器对象
sensor = BloodOxygenSensor("COM3", 9600)

# 初始化传感器
sensor.begin()

# 开始采集（LED亮起）
sensor.sensor_start_collect()

# 读取心率血氧
sensor.get_heartbeat_SPO2()
print(f"SPO2: {sensor.SPO2}%")
print(f"Heart Rate: {sensor.heartbeat} BPM")

# 读取温度
temp = sensor.get_temperature_c()

# 停止采集（LED熄灭）
sensor.sensor_end_collect()

# 关闭串口
sensor.close()
```

---

## 자주 묻는 질문

### Q1: COM 포트를 찾을 수 없으면 어떻게 하나요?

**A:**

1. USB-TTL 변환이 제대로 꽂혀 있는지 확인합니다
1. 드라이버를 다시 설치합니다
1. 다른 USB 포트를 시도합니다
1. 장치 관리자에 "알 수 없는 장치"가 있는지 확인합니다

### Q2: 센서 초기화에 실패하면 어떻게 하나요?

**A:**

1. 배선 확인:
  - VCC와 GND가 올바르게 연결되었는지
  - **TX와 RX가 교차 연결되었는지**(가장 흔한 문제)

1. 보레이트가 9600인지 확인합니다
1. USB-TTL 변환 모듈이 정상 작동하는지 확인합니다
1. USB를 다시 꽂습니다

### Q3: 데이터가 계속 -1로 표시되면 어떻게 하나요?

**A:**

1. 손가락이 센서 위에 올바르게 놓였는지 확인합니다(LED 영역 완전히 덮기)
1. 손가락을 안정적으로 유지하고 움직이지 않습니다
1. 몇 초 기다려 데이터를 안정시킵니다
1. 센서 LED가 켜져 있는지 확인합니다

### Q4: LED가 켜지지 않지만 통신은 정상인가요?

**A:**

- LED 하드웨어 문제일 수 있지만 센서 기능은 정상입니다
- 데이터가 정상이라면 LED가 켜지지 않는 문제는 무시해도 됩니다

### Q5: 시리얼 포트가 점유되어 있으면 어떻게 하나요?

**A:**

1. 다른 시리얼 소프트웨어(시리얼 어시스턴트, Arduino IDE 등)를 닫습니다
1. 다른 Python 프로그램이 실행 중인지 확인합니다
1. USB를 다시 꽂습니다

### Q6: 데이터가 정확하지 않으면 어떻게 하나요?

**A:**

1. 손가락이 센서 광학 영역을 완전히 덮도록 합니다
1. 측정 중에는 조용히 하고 말하거나 움직이지 마십시오
1. 30초 이상 기다려 데이터를 안정시킵니다
1. 여러 번 측정하여 평균값을 구합니다

---

## 기술 사양

| 매개변수 | 사양 |
|---|---|
| 통신 방식 | UART (TTL 레벨) |
| 보레이트 | 9600 bps(기본) |
| 데이터 형식 | 8N1 (8 데이터 비트, 패리티 없음, 1 스톱 비트) |
| 공급 전압 | 3.3V / 5V |
| SPO2 측정 범위 | 35% - 100% |
| 심박수 측정 범위 | 30 - 250 BPM |
| Modbus 장치 주소 | 0x20 |

---

## Modbus 레지스터 설명

| 레지스터 주소 | 기능 | 설명 |
|---|---|---|
| 0x02 | 장치 ID | 읽기: 0x0020 반환 |
| 0x06-0x09 | 심박·혈중 산소 데이터 | 읽기: SPO2 + 심박수 |
| 0x0A | 온도 | 읽기: 기판 온도 |
| 0x10 | 수집 제어 | 쓰기: 0x0001=시작, 0x0002=중지 |
