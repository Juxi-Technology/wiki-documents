---
title: "Software per PC"
description: "Tutorial d'uso del software grafico per PC del modulo di frequenza cardiaca e SpO2 MAX30102: impostazioni della porta seriale, acquisizione, monitoraggio, interpretazione dei dati e domande frequenti."
---

# Software per PC

## 📋 Descrizione delle funzioni

Questo è un programma grafico per PC per il monitoraggio di frequenza cardiaca e SpO2, con le seguenti funzioni:

1. ✅ **Selezione della porta seriale** - scansione automatica delle porte seriali disponibili
1. ✅ **Selezione del baud rate** - supporta 9600/19200/38400/57600/115200
1. ✅ **Connetti/Disconnetti** - connessione e disconnessione del modulo con un clic
1. ✅ **Avvia/Chiudi acquisizione** - controlla l'accensione e lo spegnimento del LED del sensore
1. ✅ **Avvia/Arresta monitoraggio** - visualizzazione dei dati in tempo reale
1. ✅ **Visualizzazione dei dati in tempo reale** - SpO2, frequenza cardiaca, temperatura

---

## 🔌 Collegamento hardware

| Modulo di frequenza cardiaca e SpO2 | Modulo USB-TTL |
|---|---|
| VCC | 5V (importante! non collegare a 3,3V) |
| GND | GND |
| TX | RX (collegamento incrociato) |
| RX | TX (collegamento incrociato) |

![Illustrazione](../../../../../../public/images/tutorials/accessories/heart-rate-spo2/pc-upper-computer/01.png)

⚠️ **Avviso: spostare l'interruttore del modulo su UART e collegare TX e RX in modo incrociato!**

---

## 🚀 Esecuzione del programma

### Metodo 1: eseguire direttamente lo script Python

1. Installare le librerie dipendenti:

```bash
pip install pyserial
```

1. Eseguire il programma:

```bash
cd D:\JUXI_HeartRate_SPO2\python\windows
```

```bash
python HeartRateOximeter.py
```

---

## 📖 Passaggi d'uso

### Passo 1: collegare l'hardware

1. Collegare il sensore e l'adattatore USB-TTL secondo la tabella di cablaggio riportata sopra

```text
VCC->VCC
GND->GND
RX->TX
TX->RX
```

1. Inserire l'adattatore USB-TTL in una porta USB del computer

### Passo 2: aprire il programma

Eseguire `HeartRateOximeter.exe`

### Passo 3: impostare la porta seriale

1. Selezionare il numero di porta seriale corretto (ad esempio COM3)
1. Selezionare il baud rate **9600** (predefinito)
1. Fare clic sul pulsante [Connetti]

### Passo 4: avviare l'acquisizione

1. Dopo la connessione, fare clic su [Avvia acquisizione]
1. ✅ Il LED del sensore si accende

### Passo 5: avviare il monitoraggio

1. Mettere il dito sul sensore
1. Fare clic su [Avvia monitoraggio]
1. Consultare i dati in tempo reale

---

## 📊 Descrizione dell'interfaccia

```text
┌─────────────────────────────────────────┐
│           串口设置                       │
│  串口:  [COM3  ↓]  [刷新]               │
│  波特率:[9600  ↓]  [连接]               │
├─────────────────────────────────────────┤
│           模块控制                       │
│  [启动采集]  [开始监测]                 │
├─────────────────────────────────────────┤
│           实时数据                       │
│  血氧 (SPO2):       98 %                │
│  心率 (Heart Rate): 75 Times/min        │
│  温度 (Temperature): 36.6 °C            │
│  状态:  正在监测...                     │
├─────────────────────────────────────────┤
│           使用提示                       │
│  1. 接线：VCC->5V, GND->GND, RX->TX, TX->RX          │
│  2. 点击连接后再启动采集                               │
│  3. 启动采集后传感器LED会亮起                           │
└─────────────────────────────────────────┘
```
---

## 📋 Interpretazione dei dati

| Dato | Intervallo normale | Descrizione |
|---|---|---|
| Ossigeno nel sangue (SPO2) | 95% - 100% | Sotto il 90% si consiglia di consultare un medico |
| Frequenza cardiaca | 60 - 100 battiti/min | Intervallo normale di un adulto |
| Temperatura | 25 - 35 °C | Temperatura a bordo del modulo, non temperatura corporea |

**Nota**: appena avviato o se il dito non è posizionato bene, i dati potrebbero mostrare -1; è un fenomeno normale.

---

## ❓ Domande frequenti

### D1: Cosa fare se non si trova la porta seriale?

**R:**

1. Verificare che il driver USB-TTL sia installato correttamente
1. Ricollegare il cavo USB
1. Fare clic sul pulsante [Aggiorna] per ripetere la scansione

### D2: Cosa fare se la connessione non riesce?

**R:**

1. Verificare che la porta seriale selezionata sia corretta
1. Verificare che la porta seriale non sia occupata da altri programmi (come assistenti di porta seriale o Arduino IDE)
1. Controllare che l'adattatore USB-TTL funzioni correttamente

### D3: Il LED non si accende dopo aver fatto clic su Avvia acquisizione?

**R:**

1. Controllare che VCC sia collegato a 5V (non a 3,3V)
1. Controllare che TX/RX siano collegati in modo incrociato
1. Verificare che il modulo sensore non sia danneggiato

### D4: I dati mostrano sempre -1?

**R:**

1. Verificare di aver fatto clic su [Avvia acquisizione]
1. Posizionare correttamente il dito sul sensore, coprendo completamente l'area del LED
1. Mantenere il dito stabile e attendere qualche secondo
1. Verificare che i collegamenti non siano allentati

### D5: Il programma non risponde?

**R:**

1. Fare clic prima su [Arresta monitoraggio]
1. Poi fare clic su [Chiudi acquisizione]
1. Infine fare clic su [Disconnetti]
1. Riavviare il programma

---

## ⚠️ Precauzioni

1. **Ordine di collegamento**: collegare prima il sensore, poi l'USB
1. **Ordine di disconnessione**: arrestare prima il monitoraggio, poi chiudere l'acquisizione e infine disconnettere
1. **Requisiti di alimentazione**: il sensore deve essere alimentato a 5V; con 3,3V potrebbe non funzionare correttamente
1. **Posizionamento del dito**: durante la misurazione il dito deve coprire completamente l'area ottica, senza premere con forza
1. **Requisiti dell'ambiente**: evitare la luce intensa diretta sul sensore

---

## 📞 Supporto tecnico

In caso di problemi, verificare:

1. Se il cablaggio hardware è corretto (in particolare il collegamento incrociato TX/RX)
1. Se l'alimentazione è a 5V
1. Se il driver USB-TTL funziona correttamente
1. Se la porta seriale è occupata da altri programmi
