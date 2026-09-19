---
title: "Arduino: Comunicazione della porta seriale"
description: "Modulo di interazione vocale IA e Arduino via porta seriale: cablaggio incrociato RX e TX e codice di esempio per ricevere le parole di comando riconosciute."
---

# Arduino: Comunicazione della porta seriale

## 📁 Struttura dei file

```Plain Text
UART_Voice/
├── UART_Voice.ino    # Programma principale
├── bsp_uart.hpp         # Header (frame di protocollo e dichiarazioni delle funzioni)
├── bsp_uart.cpp         # File di implementazione
└── README.md              # Questo tutorial
```

---

## 🔌 Connessione hardware

### Connessione al modulo vocale

> 💡 **Attenzione:** RX e TX devono essere collegati in modo incrociato!
> 
> 

![Immagine 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication/1.png)

---

## 🔧 Compilazione e caricamento

### Primo passo: aprire Arduino IDE

1. Aprire il file `UART_Voice.ino`

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

```Plain Text
UART Voice Module Initialized
```

Pronunciando al modulo la parola di attivazione e una parola di comando, viene emesso l'ID corrispondente:

```Plain Text
ID: 1
ID: 2
ID: 10
```

---

## 📚 Formato del frame di protocollo

**Esempio:** lettura del comando con ID=10

```Plain Text
FE EF 00 0A EE
```

**Esempio:** invio della riproduzione di una parola di comando

```Plain Text
FE EF D3 00 EE
```

---

## 📚 Descrizione dell'interfaccia BSP

### UART_Init()

```Plain Text
void UART_Init(void);
```

**Funzione**: inizializza la porta seriale (baud rate 115200)

**Esempio**:

```Plain Text
void setup() {
  UART_Init();
}
```

---

### UART_ReadCommand()

int UART_ReadCommand(void);

**Funzione**: legge l'ID del comando riconosciuto dal modulo vocale

**Valore restituito**:

- `0` - nessun comando riconosciuto

- `1~254` - ID del comando

- `-1` - nessun nuovo dato

**Esempio**:

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

**Funzione**: imposta la voce di riproduzione passiva

**Parametri**:

- `0x00` - tipo di frase di riproduzione passiva

**Esempio**:

```Plain Text
UART_SetPassiveVoice(0x00);
delay(200);
```

---

### UART_SetFunctionVoice()

```Plain Text
void UART_SetFunctionVoice(uint8_t voiceID);
```

**Funzione**: imposta la voce di riproduzione della parola di funzione

**Parametri**:

- `0x00` - tipo di frase di riproduzione della parola di funzione

**Esempio**:

```Plain Text
UART_SetFunctionVoice(0x00);
delay(200);
```

---

### UART_SetCommandVoice()

```Plain Text
void UART_SetCommandVoice(uint8_t voiceID);
```

**Funzione**: imposta la voce di riproduzione della parola di comando

**Parametri**:

- `0x00` - tipo di frase di riproduzione della parola di comando

**Esempio**:

```Plain Text
UART_SetCommandVoice(0x00);
delay(200);
```

---

## 🎯 Descrizione della logica del programma principale

```JavaScript
void setup() {
  Serial.begin(115200);
  UART_Init();

  Serial.println("UART Voice Module Initialized");

  UART_SetCommandVoice(0x00);  // All'accensione riproduce la voce della parola di comando
  delay(200);
}

void loop() {
  int commandId = UART_ReadCommand();

  if (commandId >= 0) {
    // Filtra i valori non validi per evitare output duplicati
    if (commandId != 0 && commandId != 255 && commandId != lastCommandId) {
      Serial.print("ID: ");
      Serial.println(commandId);
      lastCommandId = commandId;

      // Esempio: controlla la riproduzione in base al comando riconosciuto
      if (commandId == 1) {
        UART_SetCommandVoice(0x00);  // Comando 1 riconosciuto, riproduci la voce della parola di comando
      } else if (commandId == 2) {
        UART_SetCommandVoice(0x00);  // Comando 2 riconosciuto, riproduci la voce della parola di comando
      }
    } else if (commandId == 0 || commandId == 255) {
      if (lastCommandId != 0) {
        lastCommandId = 0;  // Reimposta lo stato
      }
    }
  }

  delay(50);
}
```

---

## 🔍 Risoluzione dei problemi

### Q1: nessun output

**Possibili cause:**

1. RX/TX invertiti

2. GND non in comune

3. Modulo non alimentato

4. Baud rate errato

**Soluzione:**

- Confermare che D10 sia collegato al TX del modulo e D11 al RX del modulo (collegamento incrociato)

- Confermare il collegamento di GND

- Confermare che l'alimentazione a 5V sia corretta

- Confermare che il baud rate della porta seriale sia 115200

---

### Q2: la porta seriale mostra solo caratteri illeggibili

**Possibili cause:**

1. Baud rate non corrispondente

2. Alimentazione del modulo anomala

**Soluzione:**

- Confermare che il baud rate del monitor seriale sia 115200

- Premere una volta il pulsante di reset del modulo

---

### Q3: viene emesso "ID: 255" o "ID: 0"

**Nota:** è un fenomeno normale

- `0` = nessun comando riconosciuto

- `255` = nessun nuovo dato

Il codice filtra già questi valori, quindi normalmente non viene emesso alcun output. Se compare un output, significa che il codice non è attivo.

---

## 💡 Vantaggi dell'architettura BSP

### Chiara stratificazione del codice

- **bsp_uart.hpp** - si vedono solo le dichiarazioni, non l'implementazione

- **bsp_uart.cpp** - dettagli dell'implementazione concreta

- **UART_Voice.ino** - si occupa solo della logica applicativa

### Facilità di porting

Se si passa a un'altra piattaforma (ad esempio STM32, ESP32), è sufficiente modificare l'implementazione di `bsp_uart.cpp`, senza modificare il programma principale.

### Facilità di manutenzione

La modifica del codice relativo a UART avviene solo in `bsp_uart.cpp`: una sola modifica ha effetto ovunque.

---

## 🚀 Esempi di funzionalità estese

### Esempio 1: attivare riproduzioni diverse in base ai comandi

```Plain Text
if (commandId == 1) {
  UART_SetCommandVoice(0x00);      // Riproduci la parola di comando
} else if (commandId == 2) {
  UART_SetFunctionVoice(0x00);     // Riproduci la voce funzionale
} else if (commandId == 3) {
  UART_SetPassiveVoice(0x00);      // Riproduci la frase passiva
}
```

### Esempio 2: controllo di un LED

```Plain Text
if (commandId == 10) {
  digitalWrite(LED_PIN, LOW);    // Spegni la luce
  UART_SetCommandVoice(0x00);     // Riproduci la conferma
}
```

### Esempio 3: controllo di un motore

```Plain Text
if (commandId == 11) {
  motor_stop();
  UART_SetCommandVoice(0x00);     // Riproduci la conferma
}
```

<RelatedProducts slugs="ai-voice-module" />
