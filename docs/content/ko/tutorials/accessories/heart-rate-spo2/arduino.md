---
title: "Arduino 사용 튜토리얼"
description: "Arduino에서 JUXI_HeartRate_SPO2 라이브러리로 심박수, 혈중 산소, 기판 온도를 읽는 방법. 배선, 예제 코드, API 및 자주 묻는 질문 포함."
---

# Arduino 사용 튜토리얼

## 센서 소개

JUXI_HeartRate_SPO2는 MAX30102 칩 기반의 심박·혈중 산소 센서 모듈로, 내장 알고리즘이 심박수와 혈중 산소 포화도 값을 직접 출력할 수 있습니다.

**주요 기능:**

- 혈중 산소 포화도(SPO2) 측정
- 심박수 측정(회/분)
- 기판 온도 측정
- I2C 통신 방식 지원

---

## Arduino 사용 튜토리얼

### 하드웨어 준비

| 필요한 재료 |
|---|
| Arduino 보드(Uno/ESP32 등) |
| JUXI_HeartRate_SPO2 센서 |
| 점퍼 와이어 약간 |
| USB 데이터 케이블(Arduino를 컴퓨터에 연결) |

### 라이브러리 설치

1. 라이브러리 파일[JUXI_HeartRate_SPO2.zip](https://juxitech.feishu.cn/wiki/W2IwwDop5i4BVlk98EacfyJvnrh)을 다운로드합니다
1. 압축 파일을 풀고 Arduino 라이브러리 디렉터리에 복사합니다:
  - Windows: `C:\Users\사용자 이름\Documents\Arduino\libraries\`
  - Mac: `~/Documents/Arduino/libraries/`
  - Linux: `~/Arduino/libraries/`

1. Arduino IDE를 재시작합니다

### 예제 코드 업로드

> 코드를 업로드할 때는 Arduino만 컴퓨터에 연결하고, Arduino에 심박·혈중 산소 모듈을 연결하지 마십시오!

#### 방법 1: UART 모드 예제

`#define I2C_COMMUNICATION`을 주석 처리하고 Arduino에 코드를 업로드합니다

```cpp
#include "JUXI_HeartRate_SPO2.h"

// I2C 地址
#define I2C_ADDRESS 0x57

// 创建传感器对象，I2C模式
JUXI_HeartRate_SPO2_I2C sensor(&Wire, I2C_ADDRESS);

void setup() {
  Serial.begin(9600);

  // 初始化传感器
  while (!sensor.begin()) {
    Serial.println("传感器初始化失败，请检查连接！");
    delay(1000);
  }
  Serial.println("传感器初始化成功！");

  // 启动数据采集
  sensor.sensorStartCollect();
}

void loop() {
  // 读取心率和血氧数据
  sensor.getHeartbeatSPO2();

  // 输出血氧饱和度
  Serial.print("血氧饱和度: ");
  Serial.print(sensor._sHeartbeatSPO2.SPO2);
  Serial.println(" %");

  // 输出心率
  Serial.print("心率: ");
  Serial.print(sensor._sHeartbeatSPO2.Heartbeat);
  Serial.println(" 次/分钟");

  // 读取并输出温度
  Serial.print("板载温度: ");
  Serial.print(sensor.getTemperature_C());
  Serial.println(" ℃");

  Serial.println("------------------------");

  // 传感器每4秒更新一次数据
  delay(4000);
}
```

##### 하드웨어 연결

I2C 통신

![그림](../../../../../public/images/tutorials/accessories/heart-rate-spo2/arduino/01.png)

![그림](../../../../../public/images/tutorials/accessories/heart-rate-spo2/arduino/02.png)

| 센서 핀 | Arduino |
|---|---|
| VCC | 5V/3.3V |
| GND | GND |
| SDA | SDA/A4 |
| SCL | SCL/A5 |

- 심박·혈중 산소 모듈의 스위치를 IIC로 전환하십시오!!!
- 데이터 케이블로 Arduino를 컴퓨터에 연결합니다

#### 실행 결과:

1. Arduino의 「툴」→「시리얼 모니터」를 엽니다

보레이트를 9600으로 설정합니다

![그림](../../../../../public/images/tutorials/accessories/heart-rate-spo2/arduino/03.png)

2. 시리얼 디버그 어시스턴트를 엽니다

[시리얼 디버그 어시스턴트 uartassist5.15.zip](https://juxitech.feishu.cn/wiki/BJlfwSQydi7u5lkRDQ6cV4dvnBd)

시리얼 포트 번호를 선택합니다

보레이트를`9600`으로 설정합니다

데이터 비트`8`, 스톱 비트`1`, 패리티`NONE`, 흐름 제어`NONE`

수신 설정과 송신 설정에서`ASCII`를 선택합니다

![그림](../../../../../public/images/tutorials/accessories/heart-rate-spo2/arduino/04.png)

### API 설명

| 함수 | 설명 |
|---|---|
| begin() | 센서를 초기화하고 true/false를 반환합니다 |
| getHeartbeatSPO2() | 심박수와 혈중 산소 데이터를 읽어 _sHeartbeatSPO2 구조체에 저장합니다 |
| getTemperature_C() | 기판 온도(섭씨)를 읽습니다 |
| sensorStartCollect() | 데이터 수집을 시작합니다(센서 LED 켜짐) |
| sensorEndCollect() | 데이터 수집을 중지합니다(센서 LED 꺼짐) |

### 데이터 설명

- **SPO2(혈중 산소 포화도)**: 정상 범위 95% - 100%, 값이 -1이면 무효
- **Heartbeat(심박수)**: 정상 범위 60 - 100 회/분, 값이 -1이면 무효
- **무효값 원인**: 손가락이 제대로 놓이지 않았거나 데이터가 안정되지 않음

---

## 사용 시 주의사항

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

---

## 자주 묻는 질문

### Q1: 센서 초기화에 실패하면 어떻게 하나요?

**A:**

1. 배선이 올바른지 확인합니다(SDA는 GPIO2/A4, SCL은 GPIO3/A5)
1. 전원이 정상인지 확인합니다(3.3V 또는 5V)
1. `i2cdetect -y 1` 명령으로 장치를 감지합니다
1. 센서 스위치가 IIC 위치에 있는지 확인합니다

### Q2: 데이터가 계속 -1로 표시되면 어떻게 하나요?

**A:**

1. 손가락이 센서 위에 올바르게 놓였는지 확인합니다
1. 몇 초 기다려 데이터를 안정시킵니다
1. `sensorStartCollect()`를 호출해 수집을 시작했는지 확인합니다
1. 센서 표시등이 켜져 있는지 확인합니다

### Q3: 데이터가 정확하지 않으면 어떻게 하나요?

**A:**

1. 손가락이 센서 광학 영역을 완전히 덮도록 합니다
1. 손가락을 움직이지 말고 정지 상태로 유지합니다
1. 30초 이상 기다려 데이터를 안정시킵니다
1. 여러 번 측정하여 평균값을 구합니다

### Q4: 센서는 어떤 Arduino 보드를 지원하나요?

**A:** 다음을 지원합니다:

- Arduino Uno/Mega
- ESP8266
- ESP32
- 기타 Arduino 환경을 지원하는 보드

---

## 예제 파일 위치

### Arduino 예제

```text
JUXI_HeartRate_SPO2/
└── examples/
    └── gainHeartbeatSPO2/
        └── gainHeartbeatSPO2.ino
```
