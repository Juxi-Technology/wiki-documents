---
title: "PC · Esecuzione con Python"
description: "Leggere i dati di frequenza cardiaca e SpO2 del MAX30102 su Windows tramite un adattatore USB-TTL e uno script Python; include driver, porta COM, passaggi di esecuzione e registri Modbus."
---

# PC · Esecuzione con Python

## Indice

1. Preparazione dell'hardware
1. Collegamento hardware
1. Configurazione dell'ambiente software
1. Esecuzione del programma di esempio
1. Domande frequenti

---

## Preparazione dell'hardware

### Materiale necessario

| Materiale | Descrizione |
|---|---|
| Sensore JUXI_HeartRate_SPO2 | Modulo di frequenza cardiaca e SpO2 |
| Modulo USB-TTL | CH340 / CP2102 / FT232, ecc. |
| Cavi Dupont | 4 (femmina-femmina) |
| Computer Windows | Win7/Win10/Win11 |

---

## Collegamento hardware

### Schema di collegamento

| Pin del sensore | Pin del modulo USB-TTL | Descrizione |
|---|---|---|
| VCC | 3.3V o 5V | Polo positivo dell'alimentazione |
| GND | GND | Polo negativo dell'alimentazione |
| TX | RX | Il sensore trasmette → il modulo riceve |
| RX | TX | Il sensore riceve → il modulo trasmette |

![Illustrazione](../../../../../../public/images/tutorials/accessories/heart-rate-spo2/pc-python/01.png)

⚠️ **Avviso importante**:

1. Spostare l'interruttore del modulo su UART!
1. **TX e RX devono essere collegati in modo incrociato!**
1. Il sensore supporta 3,3V e 5V; non collegare una tensione errata
1. Collegare prima tutti i cavi, poi inserire l'USB nel computer

### Schema di cablaggio

```text
传感器        USB转TTL模块
┌──────┐      ┌──────────┐
│ VCC  │──────│ 3.3V/5V  │
│ GND  │──────│ GND      │
│ TX   │──────│ RX       │  ← 交叉连接
│ RX   │──────│ TX       │  ← 交叉连接
└──────┘      └──────────┘
```

---

## Configurazione dell'ambiente software

### Installare il driver

In base al modello di chip del proprio adattatore USB-TTL, installare il driver corrispondente:

- **CH340**: [https://sparks.gogo.co.nz/ch340.html](https://sparks.gogo.co.nz/ch340.html)
- **CP2102**: [https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers)
- **FT232**: [https://ftdichip.com/drivers/vcp-drivers/](https://ftdichip.com/drivers/vcp-drivers/)

Al termine dell'installazione, inserire il modulo USB-TTL.

### Visualizzare la porta COM

#### Metodo 1: Gestione dispositivi

1. Premere `Win + X` e selezionare "Gestione dispositivi"
1. Espandere "Porte (COM e LPT)"
1. Controllare il numero di porta COM corrispondente all'adattatore USB-TTL (ad esempio COM3)

#### Metodo 2: rilevamento automatico del programma

Durante l'esecuzione del programma di esempio viene mostrato automaticamente l'elenco di tutte le porte seriali disponibili.

### Installare le dipendenze Python

Aprire il prompt dei comandi (CMD) o PowerShell ed eseguire:

```bash
pip install pyserial
```

---

## Esecuzione del programma di esempio

Scaricare e decomprimere l'archivio [JUXI_HeartRate_SPO2.zip](https://juxitech.feishu.cn/wiki/W2IwwDop5i4BVlk98EacfyJvnrh)

### Posizione dei file

```text
JUXI_HeartRate_SPO2/python/windows/
├── gain_heartbeat_SPO2.py  ← 主程序（直接运行这个）
├── JUXI_HeartRate_SPO2_Windows.py
├── JUXI_RTU_Windows.py
└── README_CN.md        ← 本文件
└── README.md
```

### Passaggi di esecuzione

1. **Verificare che il collegamento hardware sia corretto**
  - VCC → 3.3V/5V
  - GND → GND
  - TX → RX (incrociato)
  - RX → TX (incrociato)

1. **Inserire l'USB nel computer**
1. **Eseguire il programma**

```bash
cd D:\JUXI_HeartRate_SPO2\python\windows
```

```bash
python gain_heartbeat_SPO2.py
```

1. **Seguire le indicazioni**
  - Il programma elenca tutte le porte seriali disponibili
  - Inserire il numero della propria porta COM (ad esempio COM3)
  - Il programma rileva automaticamente il sensore e avvia la misurazione

### Output previsto

```python
==================================================
JUXI Blood Oxygen Sensor - Windows Test
==================================================
Available serial ports:
  COM3

Please enter the COM port number (e.g., COM3):

Connecting to COM3 at 9600 baud...
Initializing sensor...
Sensor initialized successfully!

Starting data collection...
Sensor LED should be ON now!

Place your finger on the sensor...

SPO2 (血氧): 97 %
Heart Rate (心率): 82 BPM
Temperature (温度): 26.5 °C
SPO2 (血氧): 98 %
Heart Rate (心率): 78 BPM
Temperature (温度): 26.6 °C
...
```

Premere `Ctrl + C` per arrestare il programma.

---

## Descrizione delle funzioni del programma

### API principali

```bash
# 创建传感器对象
sensor = BloodOxygenSensor("COM3", 9600)

# 初始化传感器
sensor.begin()

# 开始采集（LED亮起）
sensor.sensor_start_collect()

# 读取心率血氧
sensor.get_heartbeat_SPO2()
print(f"SPO2: {sensor.SPO2}%")
print(f"Heart Rate: {sensor.heartbeat} BPM")

# 读取温度
temp = sensor.get_temperature_c()

# 停止采集（LED熄灭）
sensor.sensor_end_collect()

# 关闭串口
sensor.close()
```

---

## Domande frequenti

### D1: Cosa fare se non si trova la porta COM?

**R:**

1. Verificare che l'adattatore USB-TTL sia inserito correttamente
1. Reinstallare il driver
1. Provare con un'altra porta USB
1. In Gestione dispositivi, controllare se compare un "dispositivo sconosciuto"

### D2: Cosa fare se l'inizializzazione del sensore fallisce?

**R:**

1. Controllare il cablaggio:
  - VCC e GND sono collegati correttamente?
  - **TX e RX sono collegati in modo incrociato?** (il problema più comune)

1. Verificare che il baud rate sia 9600
1. Controllare che il modulo USB-TTL funzioni correttamente
1. Ricollegare l'USB

### D3: Cosa fare se i dati mostrano sempre -1?

**R:**

1. Verificare che il dito sia posizionato correttamente sul sensore (coprendo completamente l'area del LED)
1. Mantenere il dito stabile, senza muoverlo
1. Attendere qualche secondo per la stabilizzazione dei dati
1. Controllare se il LED del sensore è acceso

### D4: Il LED non si accende ma la comunicazione funziona?

**R:**

- Potrebbe essere un problema hardware del LED, ma il sensore funziona correttamente
- Se i dati sono normali, è possibile ignorare il LED spento

### D5: Cosa fare se la porta seriale è occupata?

**R:**

1. Chiudere gli altri programmi per la porta seriale (assistente di porta seriale, Arduino IDE, ecc.)
1. Controllare se sono in esecuzione altri programmi Python
1. Ricollegare l'USB

### D6: Cosa fare se i dati non sono accurati?

**R:**

1. Assicurarsi che il dito copra completamente l'area ottica del sensore
1. Mantenere un ambiente tranquillo durante la misurazione; non parlare e non muoversi
1. Attendere più di 30 secondi per la stabilizzazione dei dati
1. Effettuare più misurazioni e calcolare la media

---

## Specifiche tecniche

| Parametro | Specifica |
|---|---|
| Modalità di comunicazione | UART (livello TTL) |
| Baud rate | 9600 bps (predefinito) |
| Formato dei dati | 8N1 (8 bit di dati, nessuna parità, 1 bit di stop) |
| Tensione di alimentazione | 3.3V / 5V |
| Intervallo di misura SPO2 | 35% - 100% |
| Intervallo di misura della frequenza cardiaca | 30 - 250 BPM |
| Indirizzo del dispositivo Modbus | 0x20 |

---

## Descrizione dei registri Modbus

| Indirizzo del registro | Funzione | Descrizione |
|---|---|---|
| 0x02 | ID del dispositivo | Lettura: restituisce 0x0020 |
| 0x06-0x09 | Dati di frequenza cardiaca e SpO2 | Lettura: SPO2 + frequenza cardiaca |
| 0x0A | Temperatura | Lettura: temperatura a bordo |
| 0x10 | Controllo acquisizione | Scrittura: 0x0001=avvia, 0x0002=arresta |
