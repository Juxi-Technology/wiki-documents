---
title: "シリアルポート通信"
description: "1. UARTVoice.ino ファイルを開く"
---

# シリアルポート通信

## 📁 ファイル構成

```Plain Text
UART_Voice/
├── UART_Voice.ino    # 主程序
├── bsp_uart.hpp         # 头文件（协议帧和函数声明）
├── bsp_uart.cpp         # 实现文件
└── README.md              # 本教程
```

---

## 🔌 ハードウェア接続

### 音声モジュールへの接続

> 💡 **注意：** RX と TX はクロス接続が必要です！
> 
> 

![図 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication/1.png)

---

## 🔧 ビルドとアップロード

### ステップ 1：Arduino IDE を開く

1. `UART_Voice.ino` ファイルを開く

2. お使いの開発ボードの型番を選択する（例：Arduino Uno）

3. 対応するシリアルポートを選択する

### ステップ 2：ビルドとアップロード

1. ✔️ ボタンをクリックしてビルド

2. ➡️ ボタンをクリックして開発ボードにアップロード

---

## 📡 シリアルポートテスト

### Arduino IDE のシリアルモニタを開く

- ボーレート：**115200**

- 終端文字：**なし**

### 期待される出力

電源投入後に以下のように表示されるはずです：

```Plain Text
UART Voice Module Initialized
```

モジュールにウェイクワードとコマンドワードを話しかけると、対応する ID が出力されます：

```Plain Text
ID: 1
ID: 2
ID: 10
```

---

## 📚 プロトコルフレームのフォーマット

**例：** コマンド ID=10 を読み取った場合

```Plain Text
FE EF 00 0A EE
```

**例：** コマンドワードの再生を送信

```Plain Text
FE EF D3 00 EE
```

---

## 📚 BSP インターフェースの説明

### UART_Init()

```Plain Text
void UART_Init(void);
```

**機能**：シリアルポートを初期化する（ボーレート 115200）

**例**：

```Plain Text
void setup() {
  UART_Init();
}
```

---

### UART_ReadCommand()

int UART_ReadCommand(void);

**機能**：音声モジュールが認識したコマンド ID を読み取る

**戻り値**：

- `0` - コマンドが認識されていない

- `1~254` - コマンド ID

- `-1` - 新しいデータがない

**例**：

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

**機能**：パッシブ再生音声を設定する

**パラメータ**：

- `0x00` - パッシブ再生フレーズのタイプ

**例**：

```Plain Text
UART_SetPassiveVoice(0x00);
delay(200);
```

---

### UART_SetFunctionVoice()

```Plain Text
void UART_SetFunctionVoice(uint8_t voiceID);
```

**機能**：機能ワードの再生音声を設定する

**パラメータ**：

- `0x00` - 機能ワード再生フレーズのタイプ

**例**：

```Plain Text
UART_SetFunctionVoice(0x00);
delay(200);
```

---

### UART_SetCommandVoice()

```Plain Text
void UART_SetCommandVoice(uint8_t voiceID);
```

**機能**：コマンドワードの再生音声を設定する

**パラメータ**：

- `0x00` - コマンドワード再生フレーズのタイプ

**例**：

```Plain Text
UART_SetCommandVoice(0x00);
delay(200);
```

---

## 🎯 メインプログラムのロジック説明

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

## 🔍 よくある問題

### Q1: 何も出力されない

**考えられる原因：**

1. RX/TX が逆に接続されている

2. GND が共通接地されていない

3. モジュールに電源が入っていない

4. ボーレートが正しくない

**解決方法：**

- D10 がモジュールの TX に、D11 がモジュールの RX に接続されていることを確認する（クロス接続）

- GND の接続を確認する

- 5V が正常に供給されていることを確認する

- シリアルポートのボーレートが 115200 であることを確認する

---

### Q2: シリアルに文字化けしか表示されない

**考えられる原因：**

1. ボーレートが一致していない

2. モジュールの電源投入が正常でない

**解決方法：**

- シリアルモニタのボーレートが 115200 であることを確認する

- モジュールのリセットボタンを一度押す

---

### Q3: "ID: 255" または "ID: 0" が出力される

**説明：** これは正常な現象です

- `0` = コマンドが認識されていない

- `255` = 新しいデータがない

コード内でこれらの値はすでにフィルタリングされているため、通常は出力されません。出力が見られる場合は、コードが反映されていないことを示します。

---

## 💡 BSP アーキテクチャの利点

### コードの階層化が明確

- **bsp_uart.hpp** - 宣言のみを見て、実装は見ない

- **bsp_uart.cpp** - 具体的な実装の詳細

- **UART_Voice.ino** - ビジネスロジックのみを扱う

### 移植が容易

他のプラットフォーム（STM32、ESP32 など）に変更する場合、`bsp_uart.cpp` の実装を変更するだけでよく、メインプログラムを変更する必要はありません。

### 保守が容易

UART 関連のコードの変更は `bsp_uart.cpp` 内だけで完結し、1 か所の変更で全体に反映されます。

---

## 🚀 拡張機能の例

### 例 1：コマンドに応じて異なる再生をトリガーする

```Plain Text
if (commandId == 1) {
  UART_SetCommandVoice(0x00);      // 播报命令词
} else if (commandId == 2) {
  UART_SetFunctionVoice(0x00);     // 播报功能词
} else if (commandId == 3) {
  UART_SetPassiveVoice(0x00);      // 播报被动语
}
```

### 例 2：LED を制御する

```Plain Text
if (commandId == 10) {
  digitalWrite(LED_PIN, LOW);    // 关灯
  UART_SetCommandVoice(0x00);     // 播报确认
}
```

### 例 3：モーターを制御する

```Plain Text
if (commandId == 11) {
  motor_stop();
  UART_SetCommandVoice(0x00);     // 播报确认
}
```

<RelatedProducts slugs="ai-voice-module" />
