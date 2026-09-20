---
title: "Arduino: IIC通訊"
description: "AI 語音互動模組教程(Arduino 平台)——IIC 接線、程式編譯上傳與命令詞 ID 讀取測試。"
---

# Arduino: IIC通訊

## 📁 檔案結構

```Plain Text
IIC_Voice/
├── IIC_Voice.ino    # 主程序
├── bsp_iic.hpp         # 頭文件（地址和函數聲明）
├── bsp_iic.cpp         # 實現文件
└── README.md            # 本教程
```

---

## 🔌 硬體連接

![圖 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication/1.png)

---

## 🔧 編譯上傳

### 第一步：開啟 Arduino IDE

1. 開啟 `IIC_Voice.ino` 檔案

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

`IIC Voice Module Initialized`

對模組說出喚醒詞和命令詞，會輸出對應的ID：

```Plain Text
ID: 1
ID: 2
ID: 10
```

---

## 📚 暫存器對映

---

## 📚 BSP 介面說明

### IIC_Init()

```Plain Text
void IIC_Init(void);
```

**功能**：初始化 I2C 匯流排

**範例**：

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

**功能**：讀取語音模組辨識到的命令ID

**傳回值**：

- `0` - 未辨識到命令

- `1~254` - 命令ID

- `-1` - 通訊錯誤

**範例**：

```Plain Text
int id = IIC_ReadCommand();
if (id > 0) {
  Serial.print("識別到命令: ");
  Serial.println(id);
}
```

---

### IIC_SetPassiveVoice()

```Plain Text
void IIC_SetPassiveVoice(uint8_t voiceID);
```

**功能**：設定被動播報語音

**參數**：

- `0x00` - 被動播報語類型

**範例**：

```Plain Text
IIC_SetPassiveVoice(0x00);
delay(200);
```

---

### IIC_SetFunctionVoice()

```Plain Text
void IIC_SetFunctionVoice(uint8_t voiceID);
```

**功能**：設定功能詞播報語音

**參數**：

- `0x00` - 功能詞播報語類型

**範例**：

```Plain Text
IIC_SetFunctionVoice(0x00);
delay(200);
```

---

### IIC_SetCommandVoice()

```Plain Text
void IIC_SetCommandVoice(uint8_t voiceID);
```

**功能**：設定命令詞播報語音

**參數**：

- `0x00` - 命令詞播報語類型

**範例**：

```Plain Text
IIC_SetCommandVoice(0x00);
delay(200);
```

---

## 🎯 主程式邏輯說明

```JavaScript
void setup() {
  Serial.begin(115200);
  IIC_Init();

  Serial.println("IIC Voice Module Initialized");

  IIC_SetCommandVoice(0x00);  // 上電播報命令詞語音
  delay(200);
}

void loop() {
  int commandId = IIC_ReadCommand();

  if (commandId >= 0) {
    // 過濾無效值，防止重複輸出
    if (commandId != 0 && commandId != 255 && commandId != lastCommandId) {
      Serial.print("ID: ");
      Serial.println(commandId);
      lastCommandId = commandId;

      // 示例：根據識別到的命令控制播報
      if (commandId == 1) {
        IIC_SetCommandVoice(0x00);  // 識別到命令1，播報命令詞語音
      } else if (commandId == 2) {
        IIC_SetCommandVoice(0x00);  // 識別到命令2，播報命令詞語音
      }
    } else if (commandId == 0 || commandId == 255) {
      if (lastCommandId != 0) {
        lastCommandId = 0;  // 重置狀態
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

## 🔍 常見問題

### Q1: 串列埠只顯示 "IIC Read Error"

**可能原因：**

1. 接線錯誤、沒接上

2. 模組未上電

3. I2C 位址不對

**解決方法：**

- 檢查 SDA/SCL 是否接反

- 檢查 GND 是否共地

- 檢查 5V 是否供電正常

- 用 I2C 掃描程式確認裝置位址

---

### Q2: 沒有任何輸出

**可能原因：**

1. 串列埠鮑率不對

2. 模組沒喚醒

**解決方法：**

- 確認串列埠鮑率是 115200

- 先說喚醒詞，再說命令詞

---

### Q3: 輸出 "ID: 255" 或 "ID: 0"

**說明：** 這是正常現象

- `0` = 未辨識到命令

- `255` = 無新資料

程式碼裡已經過濾掉這些值了，正常不會輸出。如果看到輸出，說明程式碼沒生效。

---

## 💡 BSP 架構的優點

### 程式碼分層清晰

- **bsp_iic.hpp** - 只看宣告，不看實作

- **bsp_iic.cpp** - 具體實作細節

- **IIC_Voice.ino** - 只關心業務邏輯

### 易於移植

如果換其他平台（如 STM32、ESP32），只需要修改 `bsp_iic.cpp` 的實作，主程式不用改。

### 易於維護

修改 I2C 相關程式碼只在 `bsp_iic.cpp` 裡，一處修改，處處生效。

---

## 🚀 擴充功能範例

### 範例1：根據不同命令觸發不同播報

```Plain Text
if (commandId == 1) {
  IIC_SetCommandVoice(0x00);      // 播報命令詞
} else if (commandId == 2) {
  IIC_SetFunctionVoice(0x00);     // 播報功能詞
} else if (commandId == 3) {
  IIC_SetPassiveVoice(0x00);      // 播報被動語
}
```

### 範例2：控制 LED

```Plain Text
if (commandId == 10) {
  digitalWrite(LED_PIN, LOW);    // 關燈
  IIC_SetCommandVoice(0x00);     // 播報確認
}
```

### 範例3：控制馬達

```Plain Text
if (commandId == 11) {
  motor_stop();
  IIC_SetCommandVoice(0x00);     // 播報確認
}
```

<RelatedProducts slugs="ai-voice-module" />
