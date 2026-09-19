---
title: "Arduino: IIC 통신"
description: "AI 음성 인터랙션 모듈 Arduino IIC 통신 튜토리얼 — IIC 배선과 빌드·업로드, 레지스터와 BSP 인터페이스를 설명합니다."
---

# Arduino: IIC 통신

## 📁 파일 구조

```Plain Text
IIC_Voice/
├── IIC_Voice.ino    # 메인 프로그램
├── bsp_iic.hpp         # 헤더 파일(주소 및 함수 선언)
├── bsp_iic.cpp         # 구현 파일
└── README.md            # 본 튜토리얼
```

---

## 🔌 하드웨어 연결

![그림 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication/1.png)

---

## 🔧 빌드 및 업로드

### 1단계: Arduino IDE 열기

1. `IIC_Voice.ino` 파일 열기

2. 사용하는 개발 보드 모델 선택 (예: Arduino Uno)

3. 해당하는 시리얼 포트 선택

### 2단계: 빌드 및 업로드

1. ✔️ 버튼을 클릭하여 빌드

2. ➡️ 버튼을 클릭하여 개발 보드에 업로드

---

## 📡 시리얼 테스트

### Arduino IDE 의 시리얼 모니터 열기

- 보드레이트: **115200**

- 종료 문자: **없음**

### 예상 출력

전원을 켜면 다음이 표시되어야 합니다:

`IIC Voice Module Initialized`

모듈에 웨이크 워드와 명령어를 말하면 해당하는 ID 가 출력됩니다:

```Plain Text
ID: 1
ID: 2
ID: 10
```

---

## 📚 레지스터 매핑

---

## 📚 BSP 인터페이스 설명

### IIC_Init()

```Plain Text
void IIC_Init(void);
```

**기능**: I2C 버스 초기화

**예시**:

```Plain Text
void setup() {
  IIC_Init();
}
```

---

### IIC_ReadCommand()

```Plain Text
int IIC_ReadCommand(void);
```

**기능**: 음성 모듈이 인식한 명령 ID 읽기

**반환값**:

- `0` - 명령이 인식되지 않음

- `1~254` - 명령 ID

- `-1` - 통신 오류

**예시**:

```Plain Text
int id = IIC_ReadCommand();
if (id > 0) {
  Serial.print("识别到命令: ");
  Serial.println(id);
}
```

---

### IIC_SetPassiveVoice()

```Plain Text
void IIC_SetPassiveVoice(uint8_t voiceID);
```

**기능**: 수동 재생 음성 설정

**매개변수**:

- `0x00` - 수동 재생 문구 유형

**예시**:

```Plain Text
IIC_SetPassiveVoice(0x00);
delay(200);
```

---

### IIC_SetFunctionVoice()

```Plain Text
void IIC_SetFunctionVoice(uint8_t voiceID);
```

**기능**: 기능어 재생 음성 설정

**매개변수**:

- `0x00` - 기능어 재생 문구 유형

**예시**:

```Plain Text
IIC_SetFunctionVoice(0x00);
delay(200);
```

---

### IIC_SetCommandVoice()

```Plain Text
void IIC_SetCommandVoice(uint8_t voiceID);
```

**기능**: 명령어 재생 음성 설정

**매개변수**:

- `0x00` - 명령어 재생 문구 유형

**예시**:

```Plain Text
IIC_SetCommandVoice(0x00);
delay(200);
```

---

## 🎯 메인 프로그램 로직 설명

```JavaScript
void setup() {
  Serial.begin(115200);
  IIC_Init();

  Serial.println("IIC Voice Module Initialized");

  IIC_SetCommandVoice(0x00);  // 전원 투입 시 명령어 음성 재생
  delay(200);
}

void loop() {
  int commandId = IIC_ReadCommand();

  if (commandId >= 0) {
    // 잘못된 값 필터링, 중복 출력 방지
    if (commandId != 0 && commandId != 255 && commandId != lastCommandId) {
      Serial.print("ID: ");
      Serial.println(commandId);
      lastCommandId = commandId;

      // 예시: 인식된 명령에 따라 재생 제어
      if (commandId == 1) {
        IIC_SetCommandVoice(0x00);  // 명령 1 인식 시 명령어 음성 재생
      } else if (commandId == 2) {
        IIC_SetCommandVoice(0x00);  // 명령 2 인식 시 명령어 음성 재생
      }
    } else if (commandId == 0 || commandId == 255) {
      if (lastCommandId != 0) {
        lastCommandId = 0;  // 상태 초기화
      }
    }
  } else {
    Serial.println("IIC Read Error");
    delay(1000);
  }

  delay(50);
}
```

---

## 🔍 자주 묻는 질문

### Q1: 시리얼 포트에 "IIC Read Error" 만 표시됨

**가능한 원인:**

1. 배선 오류, 연결되지 않음

2. 모듈 전원이 켜지지 않음

3. I2C 주소가 올바르지 않음

**해결 방법:**

- SDA/SCL 이 반대로 연결되지 않았는지 확인

- GND 가 공통 접지되었는지 확인

- 5V 전원 공급이 정상인지 확인

- I2C 스캔 프로그램으로 장치 주소 확인

---

### Q2: 출력이 전혀 없음

**가능한 원인:**

1. 시리얼 포트 보드레이트가 올바르지 않음

2. 모듈이 웨이크되지 않음

**해결 방법:**

- 시리얼 포트 보드레이트가 115200 인지 확인

- 먼저 웨이크 워드를 말하고, 그다음 명령어를 말하기

---

### Q3: "ID: 255" 또는 "ID: 0" 이 출력됨

**설명:** 이는 정상적인 현상입니다

- `0` = 명령이 인식되지 않음

- `255` = 새로운 데이터 없음

코드에서 이미 이러한 값을 필터링하므로 정상적으로는 출력되지 않습니다. 출력된다면 코드가 적용되지 않은 것입니다.

---

## 💡 BSP 아키텍처의 장점

### 코드 계층이 명확함

- **bsp_iic.hpp** - 선언만 보고 구현은 보지 않음

- **bsp_iic.cpp** - 구체적인 구현 세부 사항

- **IIC_Voice.ino** - 비즈니스 로직에만 집중

### 이식이 용이함

다른 플랫폼 (예: STM32, ESP32) 으로 교체하는 경우 `bsp_iic.cpp` 의 구현만 수정하면 되고, 메인 프로그램은 수정할 필요가 없습니다.

### 유지보수가 용이함

I2C 관련 코드를 수정할 때는 `bsp_iic.cpp` 에서만 수정하면 되며, 한 곳만 고치면 모든 곳에 적용됩니다.

---

## 🚀 확장 기능 예시

### 예시 1: 명령에 따라 다른 재생 트리거

```Plain Text
if (commandId == 1) {
  IIC_SetCommandVoice(0x00);      // 명령어 재생
} else if (commandId == 2) {
  IIC_SetFunctionVoice(0x00);     // 기능어 재생
} else if (commandId == 3) {
  IIC_SetPassiveVoice(0x00);      // 수동 재생
}
```

### 예시 2: LED 제어

```Plain Text
if (commandId == 10) {
  digitalWrite(LED_PIN, LOW);    // 조명 끄기
  IIC_SetCommandVoice(0x00);     // 확인 음성 재생
}
```

### 예시 3: 모터 제어

```Plain Text
if (commandId == 11) {
  motor_stop();
  IIC_SetCommandVoice(0x00);     // 확인 음성 재생
}
```

<RelatedProducts slugs="ai-voice-module" />
