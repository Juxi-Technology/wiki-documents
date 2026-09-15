---
title: "IIC Communication"
description: "1. Open the IICVoice.ino file"
---

# IIC Communication

## 📁 File Structure

```Plain Text
IIC_Voice/
├── IIC_Voice.ino    # 主程序
├── bsp_iic.hpp         # 头文件（地址和函数声明）
├── bsp_iic.cpp         # 实现文件
└── README.md            # 本教程
```

---

## 🔌 Hardware Connection

![Image 1](../../../../public/images/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication/1.png)

---

## 🔧 Build and Upload

### Step 1: Open the Arduino IDE

1. Open the `IIC_Voice.ino` file

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

`IIC Voice Module Initialized`

Say the wake word and command words to the module, and the corresponding IDs will be output:

```Plain Text
ID: 1
ID: 2
ID: 10
```

---

## 📚 Register Map

---

## 📚 BSP Interface Description

### IIC_Init()

```Plain Text
void IIC_Init(void);
```

**Function**: Initialize the I2C bus

**Example**:

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

**Function**: Read the command ID recognized by the voice module

**Return value**:

- `0` - no command recognized

- `1~254` - command ID

- `-1` - communication error

**Example**:

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

**Function**: Set the passive playback voice

**Parameter**:

- `0x00` - passive response phrase type

**Example**:

```Plain Text
IIC_SetPassiveVoice(0x00);
delay(200);
```

---

### IIC_SetFunctionVoice()

```Plain Text
void IIC_SetFunctionVoice(uint8_t voiceID);
```

**Function**: Set the function word playback voice

**Parameter**:

- `0x00` - function word playback phrase type

**Example**:

```Plain Text
IIC_SetFunctionVoice(0x00);
delay(200);
```

---

### IIC_SetCommandVoice()

```Plain Text
void IIC_SetCommandVoice(uint8_t voiceID);
```

**Function**: Set the command word playback voice

**Parameter**:

- `0x00` - command word playback phrase type

**Example**:

```Plain Text
IIC_SetCommandVoice(0x00);
delay(200);
```

---

## 🎯 Main Program Logic Description

```JavaScript
void setup() {
  Serial.begin(115200);
  IIC_Init();

  Serial.println("IIC Voice Module Initialized");

  IIC_SetCommandVoice(0x00);  // 上电播报命令词语音
  delay(200);
}

void loop() {
  int commandId = IIC_ReadCommand();

  if (commandId >= 0) {
    // 过滤无效值，防止重复输出
    if (commandId != 0 && commandId != 255 && commandId != lastCommandId) {
      Serial.print("ID: ");
      Serial.println(commandId);
      lastCommandId = commandId;

      // 示例：根据识别到的命令控制播报
      if (commandId == 1) {
        IIC_SetCommandVoice(0x00);  // 识别到命令1，播报命令词语音
      } else if (commandId == 2) {
        IIC_SetCommandVoice(0x00);  // 识别到命令2，播报命令词语音
      }
    } else if (commandId == 0 || commandId == 255) {
      if (lastCommandId != 0) {
        lastCommandId = 0;  // 重置状态
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

## 🔍 Troubleshooting

### Q1: The serial port only shows "IIC Read Error"

**Possible causes:**

1. Incorrect wiring, not connected

2. The module is not powered

3. Wrong I2C address

**Solutions:**

- Check whether SDA/SCL are reversed

- Check whether the grounds are common

- Check whether the 5V supply is normal

- Use an I2C scanner program to confirm the device address

---

### Q2: No output at all

**Possible causes:**

1. Wrong serial port baud rate

2. The module is not woken up

**Solutions:**

- Confirm that the serial port baud rate is 115200

- Say the wake word first, then the command words

---

### Q3: It outputs "ID: 255" or "ID: 0"

**Note:** this is normal

- `0` = no command recognized

- `255` = no new data

These values are already filtered out in the code and normally will not be output. If you see them output, the code is not taking effect.

---

## 💡 Advantages of the BSP Architecture

### Clear Code Layering

- **bsp_iic.hpp** - view the declarations only, not the implementation

- **bsp_iic.cpp** - the concrete implementation details

- **IIC_Voice.ino** - concerned only with business logic

### Easy to Port

If you switch to another platform (such as STM32 or ESP32), you only need to modify the implementation of `bsp_iic.cpp`; the main program does not need to change.

### Easy to Maintain

Changes to I2C-related code are made only in `bsp_iic.cpp`; change once, effective everywhere.

---

## 🚀 Extended Function Examples

### Example 1: Trigger Different Playback Based on Different Commands

```Plain Text
if (commandId == 1) {
  IIC_SetCommandVoice(0x00);      // 播报命令词
} else if (commandId == 2) {
  IIC_SetFunctionVoice(0x00);     // 播报功能词
} else if (commandId == 3) {
  IIC_SetPassiveVoice(0x00);      // 播报被动语
}
```

### Example 2: Control an LED

```Plain Text
if (commandId == 10) {
  digitalWrite(LED_PIN, LOW);    // 关灯
  IIC_SetCommandVoice(0x00);     // 播报确认
}
```

### Example 3: Control a Motor

```Plain Text
if (commandId == 11) {
  motor_stop();
  IIC_SetCommandVoice(0x00);     // 播报确认
}
```

