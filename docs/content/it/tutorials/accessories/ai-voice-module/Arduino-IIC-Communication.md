---
title: "Arduino: Comunicazione IIC"
description: "Modulo di interazione vocale IA e Arduino via IIC: connessione hardware e codice di esempio per leggere gli ID delle parole di comando riconosciute."
---

# Arduino: Comunicazione IIC

## 📁 Struttura dei file

```Plain Text
IIC_Voice/
├── IIC_Voice.ino    # 主程序
├── bsp_iic.hpp         # 头文件（地址和函数声明）
├── bsp_iic.cpp         # 实现文件
└── README.md            # 本教程
```

---

## 🔌 Connessione hardware

![Immagine 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication/1.png)

---

## 🔧 Compilazione e caricamento

### Primo passo: aprire Arduino IDE

1. Aprire il file `IIC_Voice.ino`

2. Selezionare il modello della scheda di sviluppo in uso (ad esempio Arduino Uno)

3. Selezionare la porta seriale corrispondente

### Secondo passo: compilazione e caricamento

1. Fare clic sul pulsante ✔️ per compilare

2. Fare clic sul pulsante ➡️ per caricare sulla scheda di sviluppo

---

## 📡 Test della porta seriale

### Aprire il monitor seriale in Arduino IDE

- Baud rate: **115200**

- Carattere di terminazione: **nessuno**

### Output previsto

Dopo l'alimentazione si dovrebbe vedere:

`IIC Voice Module Initialized`

Pronunciando al modulo la parola di attivazione e una parola di comando, viene emesso l'ID corrispondente:

```Plain Text
ID: 1
ID: 2
ID: 10
```

---

## 📚 Mappatura dei registri

---

## 📚 Descrizione dell'interfaccia BSP

### IIC_Init()

```Plain Text
void IIC_Init(void);
```

**Funzione**: inizializza il bus I2C

**Esempio**:

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

**Funzione**: legge l'ID del comando riconosciuto dal modulo vocale

**Valore restituito**:

- `0` - nessun comando riconosciuto

- `1~254` - ID del comando

- `-1` - errore di comunicazione

**Esempio**:

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

**Funzione**: imposta la voce di riproduzione passiva

**Parametri**:

- `0x00` - tipo di frase di riproduzione passiva

**Esempio**:

```Plain Text
IIC_SetPassiveVoice(0x00);
delay(200);
```

---

### IIC_SetFunctionVoice()

```Plain Text
void IIC_SetFunctionVoice(uint8_t voiceID);
```

**Funzione**: imposta la voce di riproduzione della parola di funzione

**Parametri**:

- `0x00` - tipo di frase di riproduzione della parola di funzione

**Esempio**:

```Plain Text
IIC_SetFunctionVoice(0x00);
delay(200);
```

---

### IIC_SetCommandVoice()

```Plain Text
void IIC_SetCommandVoice(uint8_t voiceID);
```

**Funzione**: imposta la voce di riproduzione della parola di comando

**Parametri**:

- `0x00` - tipo di frase di riproduzione della parola di comando

**Esempio**:

```Plain Text
IIC_SetCommandVoice(0x00);
delay(200);
```

---

## 🎯 Descrizione della logica del programma principale

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

## 🔍 Risoluzione dei problemi

### Q1: la porta seriale mostra solo "IIC Read Error"

**Possibili cause:**

1. Cablaggio errato o non collegato

2. Modulo non alimentato

3. Indirizzo I2C errato

**Soluzione:**

- Verificare se SDA/SCL sono invertiti

- Verificare che GND sia in comune

- Verificare che l'alimentazione a 5V sia corretta

- Confermare l'indirizzo del dispositivo con un programma di scansione I2C

---

### Q2: nessun output

**Possibili cause:**

1. Baud rate della porta seriale errato

2. Modulo non attivato

**Soluzione:**

- Confermare che il baud rate della porta seriale sia 115200

- Pronunciare prima la parola di attivazione, poi la parola di comando

---

### Q3: viene emesso "ID: 255" o "ID: 0"

**Nota:** è un fenomeno normale

- `0` = nessun comando riconosciuto

- `255` = nessun nuovo dato

Il codice filtra già questi valori, quindi normalmente non viene emesso alcun output. Se compare un output, significa che il codice non è attivo.

---

## 💡 Vantaggi dell'architettura BSP

### Chiara stratificazione del codice

- **bsp_iic.hpp** - si vedono solo le dichiarazioni, non l'implementazione

- **bsp_iic.cpp** - dettagli dell'implementazione concreta

- **IIC_Voice.ino** - si occupa solo della logica applicativa

### Facilità di porting

Se si passa a un'altra piattaforma (ad esempio STM32, ESP32), è sufficiente modificare l'implementazione di `bsp_iic.cpp`, senza modificare il programma principale.

### Facilità di manutenzione

La modifica del codice relativo a I2C avviene solo in `bsp_iic.cpp`: una sola modifica ha effetto ovunque.

---

## 🚀 Esempi di funzionalità estese

### Esempio 1: attivare riproduzioni diverse in base ai comandi

```Plain Text
if (commandId == 1) {
  IIC_SetCommandVoice(0x00);      // 播报命令词
} else if (commandId == 2) {
  IIC_SetFunctionVoice(0x00);     // 播报功能词
} else if (commandId == 3) {
  IIC_SetPassiveVoice(0x00);      // 播报被动语
}
```

### Esempio 2: controllo di un LED

```Plain Text
if (commandId == 10) {
  digitalWrite(LED_PIN, LOW);    // 关灯
  IIC_SetCommandVoice(0x00);     // 播报确认
}
```

### Esempio 3: controllo di un motore

```Plain Text
if (commandId == 11) {
  motor_stop();
  IIC_SetCommandVoice(0x00);     // 播报确认
}
```

<RelatedProducts slugs="ai-voice-module" />
