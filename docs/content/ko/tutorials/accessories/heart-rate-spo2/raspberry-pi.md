---
title: "라즈베리파이 사용 튜토리얼"
description: "라즈베리파이에서 I2C 또는 UART로 MAX30102 심박·혈중 산소 모듈을 연결하는 방법. 환경 설정, 예제 코드, API 및 자주 묻는 질문 포함."
---

# 라즈베리파이 사용 튜토리얼

## 프로젝트 소개

JUXI_HeartRate_SPO2는 MAX30102 칩 기반의 심박·혈중 산소 센서 모듈로, 내장 알고리즘이 심박수와 혈중 산소 포화도 값을 직접 출력할 수 있습니다.

**주요 기능:**

- 혈중 산소 포화도(SPO2) 측정
- 심박수 측정(회/분)
- 기판 온도 측정
- UART와 I2C 두 가지 통신 방식 지원

---

## 하드웨어 준비

| 필요한 재료 | 설명 |
|---|---|
| 라즈베리파이(2/3/4/Zero 모두 가능) | 라즈베리파이 3B+ 또는 4B 권장 |
| JUXI_HeartRate_SPO2 센서 | 심박·혈중 산소 센서 모듈 |
| 점퍼 와이어 약간 | 암-암 점퍼 와이어 4개 |
| 전원 어댑터 | 라즈베리파이 전용 전원 |

---

## 하드웨어 연결

### 방법 1: I2C 통신(권장)

I2C 통신은 배선이 간단하여 권장합니다.

![그림](../../../../../public/images/tutorials/accessories/heart-rate-spo2/raspberry-pi/01.png)

| 센서 핀 | 라즈베리파이 물리 핀 | BCM 번호 | 설명 |
|---|---|---|---|
| VCC | 1 또는 17 | - | 3.3V 전원(5V 연결도 가능) |
| GND | 6 또는 9 또는 14 | - | 접지 |
| SDA | 3 | GPIO2 | I2C 데이터선 |
| SCL | 5 | GPIO3 | I2C 클록선 |

**중요:** 센서의 스위치를 **IIC** 위치로 전환하십시오!

### 방법 2: UART 시리얼 통신

UART 통신은 교차 연결이 필요합니다.

![그림](../../../../../public/images/tutorials/accessories/heart-rate-spo2/raspberry-pi/02.png)

| 센서 핀 | 라즈베리파이 물리 핀 | BCM 번호 | 설명 |
|---|---|---|---|
| VCC | 2 또는 4 | - | 5V 전원(3.3V 연결도 가능) |
| GND | 6 또는 9 또는 14 | - | 접지 |
| RX | 8 | GPIO14 | 센서 RX를 라즈베리파이 TX에 연결 |
| TX | 10 | GPIO15 | 센서 TX를 라즈베리파이 RX에 연결 |

**중요:** 센서의 스위치를 **UART** 위치로 전환하십시오!

![그림](../../../../../public/images/tutorials/accessories/heart-rate-spo2/raspberry-pi/03.png)

---

## 환경 설정

### 1. I2C 활성화(I2C 모드에 필요)

```bash
sudo raspi-config
```

`Interface Options` → `I2C`를 선택하고 `Yes`를 선택하여 활성화합니다

라즈베리파이를 재부팅합니다:

```bash
sudo reboot
```

### 2. 시리얼 활성화(UART 모드에 필요)

```bash
sudo raspi-config
```

`Interface Options` → `Serial`을 선택합니다

- 첫 번째 질문: "Would you like a login shell to be accessible over serial?" → `No` 선택
- 두 번째 질문: "Would you like the serial port hardware to be enabled?" → `Yes` 선택

라즈베리파이를 재부팅합니다:

```bash
sudo reboot
```

### 3. 종속 라이브러리 설치

```bash
# 更新软件源
sudo apt-get update

# 安装 I2C 工具和 smbus2 库（I2C 模式必须使用 smbus2）
sudo apt-get install -y i2c-tools python3-smbus2

# 安装 pyserial（串口支持）
sudo pip3 install pyserial
```

> **주의:** I2C 모드에서는 `smbus2`를 반드시 설치해야 하며 구버전 `python-smbus`는 사용할 수 없습니다.
라이브러리 내부에서는 `smbus2.i2c_msg`를 사용하여 독립적인 2단계 I2C 트랜잭션(먼저 레지스터 주소를 쓰고 STOP을 전송한 뒤,
새로운 읽기 트랜잭션을 시작해 여러 바이트를 연속으로 읽음)을 구현하여 센서 칩의 I2C 타이밍 요구 사항을 충족합니다.

### 4. I2C 연결 확인(I2C 모드)

배선 완료 후 다음 명령으로 I2C 장치를 감지합니다:

```bash
i2cdetect -y 1
```

주소 `0x57`이 보이면 센서 연결에 성공한 것입니다.

---

## 예제 코드 사용

[JUXI_HeartRate_SPO2.zip](https://juxitech.feishu.cn/wiki/W2IwwDop5i4BVlk98EacfyJvnrh)

### 파일 구조

```bash
python/raspberry/
├── JUXI_HeartRate_SPO2.py      # 主库文件
└── examples/
    ├── i2c_example.py          # I2C 模式示例
    └── uart_example.py         # UART 模式示例
```

### I2C 모드 예제 실행

```bash
cd python/raspberry/examples
```

```bash
sudo python3 i2c_example.py
```

### UART 모드 예제 실행

```bash
cd python/raspberry/examples
```

```bash
sudo python3 uart_example.py
```

**주의:** 하드웨어 시리얼을 사용하려면 `sudo` 권한이 필요합니다.

### 실행 결과

모든 것이 정상이라면 다음과 유사한 출력이 표시됩니다:

```bash
==================================================
JUXI 心率血氧传感器 - I2C 模式
==================================================

正在初始化 I2C 总线 1，地址 0x57...
传感器初始化成功！

开始数据采集...
传感器 LED 已亮起！

请将手指放在传感器上...

血氧饱和度: 98 %
心率: 72 次/分钟
板载温度: 25.5 ℃
...
```

`Ctrl+C`를 눌러 프로그램을 중지합니다.

---

## API 참조

### 클래스: JUXI_HeartRate_SPO2_i2c

I2C 통신 방식의 센서 클래스입니다.

**생성자**

`JUXI_HeartRate_SPO2_i2c(bus_number=1, i2c_address=0x57)`

매개변수:

- `bus_number`: I2C 버스 번호, 라즈베리파이에서는 보통 1
- `i2c_address`: 센서 I2C 주소, 기본값 0x57

**메서드**

| 메서드 | 설명 | 반환값 |
|---|---|---|
| begin() | 센서 초기화, 연결 감지 | bool(성공 시 True) |
| sensor_start_collect() | 데이터 수집 시작(센서 LED 켜짐) | 없음 |
| sensor_end_collect() | 데이터 수집 중지(센서 LED 꺼짐) | 없음 |
| get_heartbeat_SPO2() | 심박수와 혈중 산소 데이터 읽기 | 없음(결과는 객체 속성에 저장) |
| get_temperature_c() | 기판 온도 읽기 | float(섭씨) |
| close() | I2C 연결 닫기 | 없음 |

**속성**

| 속성 | 설명 |
|---|---|
| SPO2 | 혈중 산소 포화도(%), 무효값은 -1 |
| heartbeat | 심박수(회/분), 무효값은 -1 |

---

### 클래스: JUXI_HeartRate_SPO2_uart

UART 시리얼 통신 방식의 센서 클래스입니다.

**생성자**

`JUXI_HeartRate_SPO2_uart(port='/dev/serial0', baudrate=9600)`

매개변수:

- `port`: 시리얼 장치 경로, 라즈베리파이 기본값은 `/dev/serial0`
- `baudrate`: 보레이트, 기본값 9600

**메서드**

`JUXI_HeartRate_SPO2_i2c`와 동일합니다.

---

## 자주 묻는 질문

### Q1: 센서 초기화에 실패하면 어떻게 해야 하나요?

**A:** 다음 단계에 따라 확인하십시오:

1. **배선 확인**
  - I2C 모드: SDA가 GPIO2, SCL이 GPIO3에 연결되었는지 확인
  - UART 모드: RX-TX가 교차 연결되었는지 확인

1. **센서 스위치 확인**
  - I2C 모드: 스위치는 IIC 위치
  - UART 모드: 스위치는 UART 위치

1. **전원 확인**
  - VCC가 3.3V 또는 5V에 연결되었는지 확인
  - GND가 연결되었는지 확인

1. **시스템 설정 확인**
  - I2C 모드: I2C가 활성화되었는지 확인
  - UART 모드: 시리얼이 활성화되었는지 확인

1. **감지 명령 사용**

```bash
# I2C 模式
i2cdetect -y 1

# UART 模式
ls /dev/serial*
```

### Q2: 데이터가 계속 -1로 표시되면 어떻게 해야 하나요?

**A:**

1. 손가락이 센서 위에 올바르게 놓여 두 LED를 완전히 덮었는지 확인합니다
1. 몇 초 기다려 데이터를 안정시킵니다(보통 10-30초 필요)
1. `sensor_start_collect()`를 호출해 수집을 시작했는지 확인합니다
1. 센서 표시등이 켜져 있는지 확인합니다

### Q3: 데이터가 정확하지 않으면 어떻게 해야 하나요?

**A:**

1. 손가락이 센서 광학 영역을 완전히 덮도록 합니다
1. 손가락을 움직이지 말고 정지 상태로 유지합니다
1. 30초 이상 기다려 데이터를 안정시킵니다
1. 여러 번 측정하여 평균값을 구합니다
1. 센서에 강한 빛이 직접 비치지 않도록 합니다

### Q4: I2C와 UART를 동시에 사용할 수 있나요?

**A:** 아니요, 동시에 사용할 수 있는 통신 방식은 한 가지뿐입니다.

### Q5: sudo로 실행해야 하나요?

**A:**

- I2C 모드: 권한 문제를 피하려면 sudo 사용을 권장합니다
- UART 모드: 반드시 sudo를 사용해야 하며 그렇지 않으면 시리얼 포트에 접근할 수 없습니다

---

## 주의사항

### 측정 팁

1. **손가락을 올바르게 배치**
  - 손가락을 센서 위에 가볍게 올려 두 LED를 덮습니다
  - 혈액 순환에 영향을 줄 수 있으니 힘껏 누르지 마십시오
  - 손가락을 안정적으로 유지하고 움직이지 마십시오

1. **데이터가 안정될 때까지 대기**
  - 측정 초기에는 수치가 불안정할 수 있습니다
  - 10-30초 기다린 후 데이터가 안정되면 읽는 것이 좋습니다
  - 센서는 4초마다 데이터를 갱신합니다

1. **환경 요구 사항**
  - 센서에 강한 빛이 직접 비치지 않도록 하십시오
  - 적절한 환경 온도를 유지하십시오
  - 측정 시 조용하게 하십시오

### 데이터 해석

| SPO2 범위 | 설명 |
|---|---|
| 95% - 100% | 정상 |
| 90% - 94% | 경도 저산소 |
| < 90% | 저산소, 병원 진료 권장 |

| 심박수 범위 | 설명 |
|---|---|
| 60 - 100 회/분 | 성인 정상 범위 |
| < 60 회/분 | 서맥 |
| > 100 회/분 | 빈맥 |

### 안전 안내

- 본 센서는 참고용이며 전문 의료 장비를 대체할 수 없습니다
- 건강에 문제가 있으면 즉시 병원을 방문하십시오
- 측정 결과는 참고용일 뿐 진단 근거로 사용하지 마십시오
