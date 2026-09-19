---
title: "Arduino: 시리얼 통신"
description: "AI 음성 인터랙션 모듈 Arduino 시리얼 통신 튜토리얼 — UART 배선과 프로토콜 프레임 형식, 시리얼 테스트 방법을 다룹니다."
---

# Arduino: 시리얼 통신

## 📁 파일 구조

```Plain Text
UART_Voice/
├── UART_Voice.ino    # 메인 프로그램
├── bsp_uart.hpp         # 헤더 파일(프로토콜 프레임 및 함수 선언)
├── bsp_uart.cpp         # 구현 파일
└── README.md              # 본 튜토리얼
```

---

## 🔌 하드웨어 연결

### 음성 모듈에 연결

> 💡 **주의:** RX 와 TX 는 교차 연결해야 합니다!
> 
> 

![그림 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication/1.png)

---

## 🔧 빌드 및 업로드

### 1단계: Arduino IDE 열기

1. `UART_Voice.ino` 파일 열기

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

```Plain Text
UART Voice Module Initialized
```

모듈에 웨이크 워드와 명령어를 말하면 해당하는 ID 가 출력됩니다:

```Plain Text
ID: 1
ID: 2
ID: 10
```

---

## 📚 프로토콜 프레임 형식

**예시:** 명령 ID=10 이 읽힘

```Plain Text
FE EF 00 0A EE
```

**예시:** 명령어 재생 전송

```Plain Text
FE EF D3 00 EE
```

---

## 📚 BSP 인터페이스 설명

### UART_Init()

```Plain Text
void UART_Init(void);
```

**기능**: 시리얼 포트 초기화 (보드레이트 115200)

**예시**:

```Plain Text
void setup() {
  UART_Init();
}
```

---

### UART_ReadCommand()

int UART_ReadCommand(void);

**기능**: 음성 모듈이 인식한 명령 ID 읽기

**반환값**:

- `0` - 명령이 인식되지 않음

- `1~254` - 명령 ID

- `-1` - 새로운 데이터 없음

**예시**:

```Plain Text
int id = UART_ReadCommand();
if (id > 0) {
  Serial.print("识别到命令: ");
  Serial.println(id);
}
```

---

### UART_SetPassiveVoice()

```Plain Text
void UART_SetPassiveVoice(uint8_t voiceID);
```

**기능**: 수동 재생 음성 설정

**매개변수**:

- `0x00` - 수동 재생 문구 유형

**예시**:

```Plain Text
UART_SetPassiveVoice(0x00);
delay(200);
```

---

### UART_SetFunctionVoice()

```Plain Text
void UART_SetFunctionVoice(uint8_t voiceID);
```

**기능**: 기능어 재생 음성 설정

**매개변수**:

- `0x00` - 기능어 재생 문구 유형

**예시**:

```Plain Text
UART_SetFunctionVoice(0x00);
delay(200);
```

---

### UART_SetCommandVoice()

```Plain Text
void UART_SetCommandVoice(uint8_t voiceID);
```

**기능**: 명령어 재생 음성 설정

**매개변수**:

- `0x00` - 명령어 재생 문구 유형

**예시**:

```Plain Text
UART_SetCommandVoice(0x00);
delay(200);
```

---

## 🎯 메인 프로그램 로직 설명

```JavaScript
void setup() {
  Serial.begin(115200);
  UART_Init();

  Serial.println("UART Voice Module Initialized");

  UART_SetCommandVoice(0x00);  // 전원 투입 시 명령어 음성 재생
  delay(200);
}

void loop() {
  int commandId = UART_ReadCommand();

  if (commandId >= 0) {
    // 잘못된 값 필터링, 중복 출력 방지
    if (commandId != 0 && commandId != 255 && commandId != lastCommandId) {
      Serial.print("ID: ");
      Serial.println(commandId);
      lastCommandId = commandId;

      // 예시: 인식된 명령에 따라 재생 제어
      if (commandId == 1) {
        UART_SetCommandVoice(0x00);  // 명령 1 인식 시 명령어 음성 재생
      } else if (commandId == 2) {
        UART_SetCommandVoice(0x00);  // 명령 2 인식 시 명령어 음성 재생
      }
    } else if (commandId == 0 || commandId == 255) {
      if (lastCommandId != 0) {
        lastCommandId = 0;  // 상태 초기화
      }
    }
  }

  delay(50);
}
```

---

## 🔍 자주 묻는 질문

### Q1: 출력이 전혀 없음

**가능한 원인:**

1. RX/TX 가 반대로 연결됨

2. GND 가 공통 접지되지 않음

3. 모듈 전원이 켜지지 않음

4. 보드레이트가 올바르지 않음

**해결 방법:**

- D10 은 모듈 TX 에, D11 은 모듈 RX 에 연결되었는지 확인 (교차 연결)

- GND 연결 확인

- 5V 전원 공급이 정상인지 확인

- 시리얼 포트 보드레이트가 115200 인지 확인

---

### Q2: 시리얼 포트에 깨진 문자만 표시됨

**가능한 원인:**

1. 보드레이트가 일치하지 않음

2. 모듈 전원 공급이 정상적이지 않음

**해결 방법:**

- 시리얼 모니터 보드레이트가 115200 인지 확인

- 모듈 리셋 버튼을 한 번 누르기

---

### Q3: "ID: 255" 또는 "ID: 0" 이 출력됨

**설명:** 이는 정상적인 현상입니다

- `0` = 명령이 인식되지 않음

- `255` = 새로운 데이터 없음

코드에서 이미 이러한 값을 필터링하므로 정상적으로는 출력되지 않습니다. 출력된다면 코드가 적용되지 않은 것입니다.

---

## 💡 BSP 아키텍처의 장점

### 코드 계층이 명확함

- **bsp_uart.hpp** - 선언만 보고 구현은 보지 않음

- **bsp_uart.cpp** - 구체적인 구현 세부 사항

- **UART_Voice.ino** - 비즈니스 로직에만 집중

### 이식이 용이함

다른 플랫폼 (예: STM32, ESP32) 으로 교체하는 경우 `bsp_uart.cpp` 의 구현만 수정하면 되고, 메인 프로그램은 수정할 필요가 없습니다.

### 유지보수가 용이함

UART 관련 코드를 수정할 때는 `bsp_uart.cpp` 에서만 수정하면 되며, 한 곳만 고치면 모든 곳에 적용됩니다.

---

## 🚀 확장 기능 예시

### 예시 1: 명령에 따라 다른 재생 트리거

```Plain Text
if (commandId == 1) {
  UART_SetCommandVoice(0x00);      // 명령어 재생
} else if (commandId == 2) {
  UART_SetFunctionVoice(0x00);     // 기능어 재생
} else if (commandId == 3) {
  UART_SetPassiveVoice(0x00);      // 수동 재생
}
```

### 예시 2: LED 제어

```Plain Text
if (commandId == 10) {
  digitalWrite(LED_PIN, LOW);    // 조명 끄기
  UART_SetCommandVoice(0x00);     // 확인 음성 재생
}
```

### 예시 3: 모터 제어

```Plain Text
if (commandId == 11) {
  motor_stop();
  UART_SetCommandVoice(0x00);     // 확인 음성 재생
}
```

<RelatedProducts slugs="ai-voice-module" />
