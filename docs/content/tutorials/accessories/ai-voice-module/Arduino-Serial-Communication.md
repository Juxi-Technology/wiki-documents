---
title: "Serial Port Communication"
description: "1. Open the UARTVoice.ino file"
---

# Serial Port Communication

## 📁 File Structure

```Plain Text
UART_Voice/
├── UART_Voice.ino    # 主程序
├── bsp_uart.hpp         # 头文件（协议帧和函数声明）
├── bsp_uart.cpp         # 实现文件
└── README.md              # 本教程
```

---

## 🔌 Hardware Connection

### Connecting to the Voice Module

> 💡 **Note:** RX and TX need to be cross-connected!
> 
> 

![Image 1](../../../../public/images/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication/1.png)

---

## 🔧 Build and Upload

### Step 1: Open the Arduino IDE

1. Open the `UART_Voice.ino` file

2. Select your development board model (e.g. Arduino Uno)

3. Select the corresponding serial port

### Step 2: Build and Upload

1. Click the ✔️ button to build

2. Click the ➡️ button to upload to the development board

---

## 📡 Serial Port Test

### Open the serial monitor in the Arduino IDE

- Baud rate: **115200**

- Line ending: **None**

### Expected Output

After power-on you should see:

```Plain Text
UART Voice Module Initialized
```

Say the wake word and command words to the module, and the corresponding IDs will be output:

```Plain Text
ID: 1
ID: 2
ID: 10
```

---

## 📚 Protocol Frame Format

**Example:** reading the command ID = 10

```Plain Text
FE EF 00 0A EE
```

**Example:** sending a command word playback

```Plain Text
FE EF D3 00 EE
```

---

## 📚 BSP Interface Description

### UART_Init()

```Plain Text
void UART_Init(void);
```

**Function**: Initialize the serial port (baud rate 115200)

**Example**:

```Plain Text
void setup() {
  UART_Init();
}
```

---

### UART_ReadCommand()

int UART_ReadCommand(void);

**Function**: Read the command ID recognized by the voice module

**Return value**:

- `0` - no command recognized

- `1~254` - command ID

- `-1` - no new data

**Example**:

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

**Function**: Set the passive playback voice

**Parameter**:

- `0x00` - passive response phrase type

**Example**:

```Plain Text
UART_SetPassiveVoice(0x00);
delay(200);
```

---

### UART_SetFunctionVoice()

```Plain Text
void UART_SetFunctionVoice(uint8_t voiceID);
```

**Function**: Set the function word playback voice

**Parameter**:

- `0x00` - function word playback phrase type

**Example**:

```Plain Text
UART_SetFunctionVoice(0x00);
delay(200);
```

---

### UART_SetCommandVoice()

```Plain Text
void UART_SetCommandVoice(uint8_t voiceID);
```

**Function**: Set the command word playback voice

**Parameter**:

- `0x00` - command word playback phrase type

**Example**:

```Plain Text
UART_SetCommandVoice(0x00);
delay(200);
```

---

## 🎯 Main Program Logic Description

```JavaScript
void setup() {
  Serial.begin(115200);
  UART_Init();

  Serial.println("UART Voice Module Initialized");

  UART_SetCommandVoice(0x00);  // 上电播报命令词语音
  delay(200);
}

void loop() {
  int commandId = UART_ReadCommand();

  if (commandId >= 0) {
    // 过滤无效值，防止重复输出
    if (commandId != 0 && commandId != 255 && commandId != lastCommandId) {
      Serial.print("ID: ");
      Serial.println(commandId);
      lastCommandId = commandId;

      // 示例：根据识别到的命令控制播报
      if (commandId == 1) {
        UART_SetCommandVoice(0x00);  // 识别到命令1，播报命令词语音
      } else if (commandId == 2) {
        UART_SetCommandVoice(0x00);  // 识别到命令2，播报命令词语音
      }
    } else if (commandId == 0 || commandId == 255) {
      if (lastCommandId != 0) {
        lastCommandId = 0;  // 重置状态
      }
    }
  }

  delay(50);
}
```

---

## 🔍 Troubleshooting

### Q1: No output at all

**Possible causes:**

1. RX/TX are reversed

2. GND is not common

3. The module is not powered

4. Wrong baud rate

**Solutions:**

- Confirm that D10 connects to the module TX and D11 to the module RX (cross connection)

- Confirm the GND connection

- Confirm the 5V supply is normal

- Confirm that the serial port baud rate is 115200

---

### Q2: The serial port only shows garbled characters

**Possible causes:**

1. Baud rate mismatch

2. The module is not powering up properly

**Solutions:**

- Confirm that the serial monitor baud rate is 115200

- Press the module reset button once

---

### Q3: It outputs "ID: 255" or "ID: 0"

**Note:** this is normal

- `0` = no command recognized

- `255` = no new data

These values are already filtered out in the code and normally will not be output. If you see them output, the code is not taking effect.

---

## 💡 Advantages of the BSP Architecture

### Clear Code Layering

- **bsp_uart.hpp** - view the declarations only, not the implementation

- **bsp_uart.cpp** - the concrete implementation details

- **UART_Voice.ino** - concerned only with business logic

### Easy to Port

If you switch to another platform (such as STM32 or ESP32), you only need to modify the implementation of `bsp_uart.cpp`; the main program does not need to change.

### Easy to Maintain

Changes to UART-related code are made only in `bsp_uart.cpp`; change once, effective everywhere.

---

## 🚀 Extended Function Examples

### Example 1: Trigger Different Playback Based on Different Commands

```Plain Text
if (commandId == 1) {
  UART_SetCommandVoice(0x00);      // 播报命令词
} else if (commandId == 2) {
  UART_SetFunctionVoice(0x00);     // 播报功能词
} else if (commandId == 3) {
  UART_SetPassiveVoice(0x00);      // 播报被动语
}
```

### Example 2: Control an LED

```Plain Text
if (commandId == 10) {
  digitalWrite(LED_PIN, LOW);    // 关灯
  UART_SetCommandVoice(0x00);     // 播报确认
}
```

### Example 3: Control a Motor

```Plain Text
if (commandId == 11) {
  motor_stop();
  UART_SetCommandVoice(0x00);     // 播报确认
}
```

<RelatedProducts slugs="ai-voice-module" />
