---
title: "Arduino: 串列埠通訊"
description: "AI 語音互動模組教程(Arduino 平台)——串列埠接線、程式上傳與 UART 訊框格式解析。"
---

# Arduino: 串列埠通訊

## 📁 檔案結構

```Plain Text
UART_Voice/
├── UART_Voice.ino    # 主程序
├── bsp_uart.hpp         # 头文件（协议帧和函数声明）
├── bsp_uart.cpp         # 实现文件
└── README.md              # 本教程
```

---

## 🔌 硬體連接

### 連接到語音模組

> 💡 **注意：** RX 和 TX 需要交叉連接！
> 
> 

![圖 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication/1.png)

---

## 🔧 編譯上傳

### 第一步：開啟 Arduino IDE

1. 開啟 `UART_Voice.ino` 檔案

2. 選擇你的開發板型號（如 Arduino Uno）

3. 選擇對應的串列埠

### 第二步：編譯上傳

1. 點擊 ✔️ 按鈕編譯

2. 點擊 ➡️ 按鈕上傳到開發板

---

## 📡 串列埠測試

### 開啟Arduino IDE裡的串列埠監視器

- 鮑率：**115200**

- 結束符：**無**

### 預期輸出

上電後應該看到：

```Plain Text
UART Voice Module Initialized
```

對模組說出喚醒詞和命令詞，會輸出對應的ID：

```Plain Text
ID: 1
ID: 2
ID: 10
```

---

## 📚 協定訊框格式

**範例：** 讀取到命令ID=10

```Plain Text
FE EF 00 0A EE
```

**範例：** 發送命令詞播報

```Plain Text
FE EF D3 00 EE
```

---

## 📚 BSP 介面說明

### UART_Init()

```Plain Text
void UART_Init(void);
```

**功能**：初始化串列埠（鮑率 115200）

**範例**：

```Plain Text
void setup() {
  UART_Init();
}
```

---

### UART_ReadCommand()

int UART_ReadCommand(void);

**功能**：讀取語音模組辨識到的命令ID

**傳回值**：

- `0` - 未辨識到命令

- `1~254` - 命令ID

- `-1` - 無新資料

**範例**：

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

**功能**：設定被動播報語音

**參數**：

- `0x00` - 被動播報語類型

**範例**：

```Plain Text
UART_SetPassiveVoice(0x00);
delay(200);
```

---

### UART_SetFunctionVoice()

```Plain Text
void UART_SetFunctionVoice(uint8_t voiceID);
```

**功能**：設定功能詞播報語音

**參數**：

- `0x00` - 功能詞播報語類型

**範例**：

```Plain Text
UART_SetFunctionVoice(0x00);
delay(200);
```

---

### UART_SetCommandVoice()

```Plain Text
void UART_SetCommandVoice(uint8_t voiceID);
```

**功能**：設定命令詞播報語音

**參數**：

- `0x00` - 命令詞播報語類型

**範例**：

```Plain Text
UART_SetCommandVoice(0x00);
delay(200);
```

---

## 🎯 主程式邏輯說明

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
    // 過濾無效值，防止重複輸出
    if (commandId != 0 && commandId != 255 && commandId != lastCommandId) {
      Serial.print("ID: ");
      Serial.println(commandId);
      lastCommandId = commandId;

      // 示例：根據識別到的命令控制播報
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

## 🔍 常見問題

### Q1: 沒有任何輸出

**可能原因：**

1. RX/TX 接反了

2. GND 沒共地

3. 模組沒上電

4. 鮑率不對

**解決方法：**

- 確認 D10 接 模組 TX，D11 接 模組 RX（交叉連接）

- 確認 GND 連接

- 確認 5V 供電正常

- 確認串列埠鮑率是 115200

---

### Q2: 串列埠只顯示亂碼

**可能原因：**

1. 鮑率不匹配

2. 模組上電不正常

**解決方法：**

- 確認串列埠監視器鮑率是 115200

- 按一下模組復位鍵

---

### Q3: 輸出 "ID: 255" 或 "ID: 0"

**說明：** 這是正常現象

- `0` = 未辨識到命令

- `255` = 無新資料

程式碼裡已經過濾掉這些值了，正常不會輸出。如果看到輸出，說明程式碼沒生效。

---

## 💡 BSP 架構的優點

### 程式碼分層清晰

- **bsp_uart.hpp** - 只看宣告，不看實作

- **bsp_uart.cpp** - 具體實作細節

- **UART_Voice.ino** - 只關心業務邏輯

### 易於移植

如果換其他平台（如 STM32、ESP32），只需要修改 `bsp_uart.cpp` 的實作，主程式不用改。

### 易於維護

修改 UART 相關程式碼只在 `bsp_uart.cpp` 裡，一處修改，處處生效。

---

## 🚀 擴充功能範例

### 範例1：根據不同命令觸發不同播報

```Plain Text
if (commandId == 1) {
  UART_SetCommandVoice(0x00);      // 播报命令词
} else if (commandId == 2) {
  UART_SetFunctionVoice(0x00);     // 播报功能词
} else if (commandId == 3) {
  UART_SetPassiveVoice(0x00);      // 播报被动语
}
```

### 範例2：控制 LED

```Plain Text
if (commandId == 10) {
  digitalWrite(LED_PIN, LOW);    // 关灯
  UART_SetCommandVoice(0x00);     // 播报确认
}
```

### 範例3：控制馬達

```Plain Text
if (commandId == 11) {
  motor_stop();
  UART_SetCommandVoice(0x00);     // 播报确认
}
```

<RelatedProducts slugs="ai-voice-module" />
