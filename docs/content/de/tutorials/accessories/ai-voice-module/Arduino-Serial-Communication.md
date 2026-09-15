---
title: "Serielle Kommunikation"
description: "1. Öffnen Sie die Datei UARTVoice.ino"
---

# Serielle Kommunikation

## 📁 Dateistruktur

```Plain Text
UART_Voice/
├── UART_Voice.ino    # 主程序
├── bsp_uart.hpp         # 头文件（协议帧和函数声明）
├── bsp_uart.cpp         # 实现文件
└── README.md              # 本教程
```

---

## 🔌 Hardwareanschluss

### Verbindung mit dem Sprachmodul

> 💡 **Hinweis:** RX und TX müssen überkreuz verbunden werden!
> 
> 

![Abb. 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication/1.png)

---

## 🔧 Kompilieren und Hochladen

### Erster Schritt: Arduino IDE öffnen

1. Öffnen Sie die Datei `UART_Voice.ino`

2. Wählen Sie Ihr Entwicklungsboard-Modell (z. B. Arduino Uno)

3. Wählen Sie die entsprechende serielle Schnittstelle

### Zweiter Schritt: Kompilieren und Hochladen

1. Klicken Sie auf die Schaltfläche ✔️, um zu kompilieren

2. Klicken Sie auf die Schaltfläche ➡️, um auf das Board hochzuladen

---

## 📡 Serieller Test

### Seriellen Monitor in der Arduino IDE öffnen

- Baudrate: **115200**

- Abschlusszeichen: **Keine**

### Erwartete Ausgabe

Nach dem Einschalten sollte Folgendes zu sehen sein:

```Plain Text
UART Voice Module Initialized
```

Wenn Sie das Weckwort und das Befehlswort zum Modul sprechen, wird die entsprechende ID ausgegeben:

```Plain Text
ID: 1
ID: 2
ID: 10
```

---

## 📚 Format des Protokollrahmens

**Beispiel:** Befehl mit ID=10 gelesen

```Plain Text
FE EF 00 0A EE
```

**Beispiel:** Befehlswort-Ansage senden

```Plain Text
FE EF D3 00 EE
```

---

## 📚 BSP-Schnittstellenbeschreibung

### UART_Init()

```Plain Text
void UART_Init(void);
```

**Funktion**: Initialisiert die serielle Schnittstelle (Baudrate 115200)

**Beispiel**:

```Plain Text
void setup() {
  UART_Init();
}
```

---

### UART_ReadCommand()

int UART_ReadCommand(void);

**Funktion**: Liest die von dem Sprachmodul erkannte Befehls-ID

**Rückgabewert**:

- `0` - kein Befehl erkannt

- `1~254` - Befehls-ID

- `-1` - keine neuen Daten

**Beispiel**:

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

**Funktion**: Legt die Ansagephrase für die passive Wiedergabe fest

**Parameter**:

- `0x00` - Typ der passiven Ansagephrase

**Beispiel**:

```Plain Text
UART_SetPassiveVoice(0x00);
delay(200);
```

---

### UART_SetFunctionVoice()

```Plain Text
void UART_SetFunctionVoice(uint8_t voiceID);
```

**Funktion**: Legt die Ansagephrase für die Funktionswort-Wiedergabe fest

**Parameter**:

- `0x00` - Typ der Funktionswort-Ansagephrase

**Beispiel**:

```Plain Text
UART_SetFunctionVoice(0x00);
delay(200);
```

---

### UART_SetCommandVoice()

```Plain Text
void UART_SetCommandVoice(uint8_t voiceID);
```

**Funktion**: Legt die Ansagephrase für die Befehlswort-Wiedergabe fest

**Parameter**:

- `0x00` - Typ der Befehlswort-Ansagephrase

**Beispiel**:

```Plain Text
UART_SetCommandVoice(0x00);
delay(200);
```

---

## 🎯 Beschreibung der Hauptprogrammlogik

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

## 🔍 Häufig gestellte Fragen

### Q1: Keine Ausgabe

**Mögliche Ursachen:**

1. RX/TX vertauscht

2. GND nicht gemeinsam verbunden

3. Modul nicht mit Strom versorgt

4. Falsche Baudrate

**Lösung:**

- Vergewissern Sie sich, dass D10 mit dem TX des Moduls und D11 mit dem RX des Moduls verbunden ist (überkreuzte Verbindung)

- Vergewissern Sie sich, dass GND verbunden ist

- Vergewissern Sie sich, dass die 5V-Stromversorgung in Ordnung ist

- Vergewissern Sie sich, dass die Baudrate der seriellen Schnittstelle 115200 beträgt

---

### Q2: Die serielle Ausgabe zeigt nur unlesbare Zeichen

**Mögliche Ursachen:**

1. Baudrate stimmt nicht überein

2. Modul wird nicht korrekt mit Strom versorgt

**Lösung:**

- Vergewissern Sie sich, dass die Baudrate des seriellen Monitors 115200 beträgt

- Drücken Sie die Reset-Taste des Moduls

---

### Q3: Ausgabe "ID: 255" oder "ID: 0"

**Erläuterung:** Dies ist ein normales Phänomen

- `0` = kein Befehl erkannt

- `255` = keine neuen Daten

Diese Werte werden im Code bereits herausgefiltert und normalerweise nicht ausgegeben. Wenn Sie eine Ausgabe sehen, bedeutet das, dass der Code nicht wirksam ist.

---

## 💡 Vorteile der BSP-Architektur

### Klare Codeschichtung

- **bsp_uart.hpp** - nur Deklarationen ansehen, nicht die Implementierung

- **bsp_uart.cpp** - konkrete Implementierungsdetails

- **UART_Voice.ino** - nur die Geschäftslogik betreffen

### Einfache Portierung

Wenn Sie auf eine andere Plattform wechseln (z. B. STM32, ESP32), müssen Sie nur die Implementierung in `bsp_uart.cpp` ändern; das Hauptprogramm muss nicht geändert werden.

### Einfache Wartung

Änderungen am UART-bezogenen Code erfolgen nur in `bsp_uart.cpp` – eine Änderung wirkt überall.

---

## 🚀 Beispiele für Erweiterungsfunktionen

### Beispiel 1: Unterschiedliche Ansagen je nach Befehl auslösen

```Plain Text
if (commandId == 1) {
  UART_SetCommandVoice(0x00);      // 播报命令词
} else if (commandId == 2) {
  UART_SetFunctionVoice(0x00);     // 播报功能词
} else if (commandId == 3) {
  UART_SetPassiveVoice(0x00);      // 播报被动语
}
```

### Beispiel 2: LED steuern

```Plain Text
if (commandId == 10) {
  digitalWrite(LED_PIN, LOW);    // 关灯
  UART_SetCommandVoice(0x00);     // 播报确认
}
```

### Beispiel 3: Motor steuern

```Plain Text
if (commandId == 11) {
  motor_stop();
  UART_SetCommandVoice(0x00);     // 播报确认
}
```

<RelatedProducts slugs="ai-voice-module" />
