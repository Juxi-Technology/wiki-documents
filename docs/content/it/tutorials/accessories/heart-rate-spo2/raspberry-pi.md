---
title: "Tutorial Raspberry Pi"
description: "Collegare il modulo di frequenza cardiaca e SpO2 MAX30102 a una Raspberry Pi tramite I2C o UART; include configurazione dell'ambiente, codice di esempio, API e domande frequenti."
---

# Tutorial Raspberry Pi

## Introduzione al progetto

JUXI_HeartRate_SPO2 è un modulo sensore di frequenza cardiaca e SpO2 basato sul chip MAX30102; l'algoritmo integrato può restituire direttamente i valori di frequenza cardiaca e saturazione di ossigeno.

**Funzioni principali:**

- Misura della saturazione di ossigeno (SPO2)
- Misura della frequenza cardiaca (battiti/minuto)
- Misura della temperatura a bordo
- Supporto di due modalità di comunicazione: UART e I2C

---

## Preparazione dell'hardware

| Materiale necessario | Descrizione |
|---|---|
| Raspberry Pi (2/3/4/Zero) | Si consiglia Raspberry Pi 3B+ o 4B |
| Sensore JUXI_HeartRate_SPO2 | Modulo sensore di frequenza cardiaca e SpO2 |
| Cavi Dupont (vari) | 4 cavi Dupont femmina-femmina |
| Alimentatore | Alimentatore dedicato per Raspberry Pi |

---

## Cablaggio

### Opzione 1: comunicazione I2C (consigliata)

Il cablaggio I2C è semplice; se ne consiglia l'uso.

![Illustrazione](../../../../../public/images/tutorials/accessories/heart-rate-spo2/raspberry-pi/01.png)

| Pin del sensore | Pin fisico Raspberry Pi | Numero BCM | Descrizione |
|---|---|---|---|
| VCC | 1 o 17 | - | Alimentazione 3,3V (è possibile anche 5V) |
| GND | 6 o 9 o 14 | - | Massa |
| SDA | 3 | GPIO2 | Linea dati I2C |
| SCL | 5 | GPIO3 | Linea di clock I2C |

**Importante:** spostare l'interruttore sul sensore in posizione **IIC**!

### Opzione 2: comunicazione seriale UART

La comunicazione UART richiede un collegamento incrociato.

![Illustrazione](../../../../../public/images/tutorials/accessories/heart-rate-spo2/raspberry-pi/02.png)

| Pin del sensore | Pin fisico Raspberry Pi | Numero BCM | Descrizione |
|---|---|---|---|
| VCC | 2 o 4 | - | Alimentazione 5V (è possibile anche 3,3V) |
| GND | 6 o 9 o 14 | - | Massa |
| RX | 8 | GPIO14 | RX del sensore collegato al TX della Raspberry Pi |
| TX | 10 | GPIO15 | TX del sensore collegato al RX della Raspberry Pi |

**Importante:** spostare l'interruttore sul sensore in posizione **UART**!

![Illustrazione](../../../../../public/images/tutorials/accessories/heart-rate-spo2/raspberry-pi/03.png)

---

## Configurazione dell'ambiente

### 1. Abilitare I2C (necessario in modalità I2C)

```bash
sudo raspi-config
```

Selezionare `Interface Options` → `I2C` → selezionare `Yes` per abilitarlo

Riavviare la Raspberry Pi:

```bash
sudo reboot
```

### 2. Abilitare la porta seriale (necessario in modalità UART)

```bash
sudo raspi-config
```

Selezionare `Interface Options` → `Serial`

- Prima domanda: "Would you like a login shell to be accessible over serial?" → selezionare `No`
- Seconda domanda: "Would you like the serial port hardware to be enabled?" → selezionare `Yes`

Riavviare la Raspberry Pi:

```bash
sudo reboot
```

### 3. Installare le librerie dipendenti

```bash
# 更新软件源
sudo apt-get update

# 安装 I2C 工具和 smbus2 库（I2C 模式必须使用 smbus2）
sudo apt-get install -y i2c-tools python3-smbus2

# 安装 pyserial（串口支持）
sudo pip3 install pyserial
```

> **Nota:** la modalità I2C richiede obbligatoriamente `smbus2`; non è possibile usare la vecchia versione `python-smbus`.
All'interno, la libreria usa `smbus2.i2c_msg` per realizzare transazioni I2C indipendenti in due passaggi (prima scrive l'indirizzo del registro e invia STOP, poi apre una nuova transazione di lettura per leggere consecutivamente più byte), per soddisfare i requisiti di temporizzazione I2C del chip sensore.

### 4. Verificare il collegamento I2C (modalità I2C)

Completato il cablaggio, eseguire il seguente comando per rilevare i dispositivi I2C:

```bash
i2cdetect -y 1
```

Se compare l'indirizzo `0x57`, il sensore è collegato correttamente.

---

## Uso del codice di esempio

[JUXI_HeartRate_SPO2.zip](https://juxitech.feishu.cn/wiki/W2IwwDop5i4BVlk98EacfyJvnrh)

### Struttura dei file

```bash
python/raspberry/
├── JUXI_HeartRate_SPO2.py      # 主库文件
└── examples/
    ├── i2c_example.py          # I2C 模式示例
    └── uart_example.py         # UART 模式示例
```

### Eseguire l'esempio in modalità I2C

```bash
cd python/raspberry/examples
```

```bash
sudo python3 i2c_example.py
```

### Eseguire l'esempio in modalità UART

```bash
cd python/raspberry/examples
```

```bash
sudo python3 uart_example.py
```

**Nota:** per usare la porta seriale hardware sono necessari i permessi `sudo`.

### Risultato di esecuzione

Se tutto funziona correttamente, verrà visualizzato un output simile al seguente:

```bash
==================================================
JUXI 心率血氧传感器 - I2C 模式
==================================================

正在初始化 I2C 总线 1，地址 0x57...
传感器初始化成功！

开始数据采集...
传感器 LED 已亮起！

请将手指放在传感器上...

血氧饱和度: 98 %
心率: 72 次/分钟
板载温度: 25.5 ℃
...
```

Premere `Ctrl+C` per arrestare il programma.

---

## Riferimento API

### Classe: JUXI_HeartRate_SPO2_i2c

Classe del sensore per la modalità di comunicazione I2C.

**Costruttore**

`JUXI_HeartRate_SPO2_i2c(bus_number=1, i2c_address=0x57)`

Parametri:

- `bus_number`: numero del bus I2C; su Raspberry Pi di solito è 1
- `i2c_address`: indirizzo I2C del sensore; valore predefinito 0x57

**Metodi**

| Metodo | Descrizione | Valore di ritorno |
|---|---|---|
| begin() | Inizializza il sensore e rileva la connessione | bool (True in caso di successo) |
| sensor_start_collect() | Avvia l'acquisizione dei dati (il sensore si accende) | Nessuno |
| sensor_end_collect() | Arresta l'acquisizione dei dati (il sensore si spegne) | Nessuno |
| get_heartbeat_SPO2() | Legge frequenza cardiaca e SpO2 | Nessuno (i risultati vengono memorizzati negli attributi dell'oggetto) |
| get_temperature_c() | Legge la temperatura a bordo | float (gradi Celsius) |
| close() | Chiude la connessione I2C | Nessuno |

**Attributi**

| Attributo | Descrizione |
|---|---|
| SPO2 | Saturazione di ossigeno (%), valore non valido -1 |
| heartbeat | Frequenza cardiaca (battiti/minuto), valore non valido -1 |

---

### Classe: JUXI_HeartRate_SPO2_uart

Classe del sensore per la modalità di comunicazione seriale UART.

**Costruttore**

`JUXI_HeartRate_SPO2_uart(port='/dev/serial0', baudrate=9600)`

Parametri:

- `port`: percorso del dispositivo seriale; su Raspberry Pi il valore predefinito è `/dev/serial0`
- `baudrate`: baud rate; valore predefinito 9600

**Metodi**

Uguali a `JUXI_HeartRate_SPO2_i2c`.

---

## Domande frequenti

### D1: Cosa fare se l'inizializzazione del sensore fallisce?

**R:** Seguire questi passaggi per verificare:

1. **Controllare il cablaggio**
  - Modalità I2C: verificare che SDA sia collegato a GPIO2 e SCL a GPIO3
  - Modalità UART: verificare che RX-TX siano collegati in modo incrociato

1. **Controllare l'interruttore del sensore**
  - Modalità I2C: l'interruttore deve essere in posizione IIC
  - Modalità UART: l'interruttore deve essere in posizione UART

1. **Controllare l'alimentazione**
  - Verificare che VCC sia collegato a 3,3V o 5V
  - Verificare che GND sia collegato

1. **Controllare le impostazioni di sistema**
  - Modalità I2C: verificare che I2C sia abilitato
  - Modalità UART: verificare che la porta seriale sia abilitata

1. **Usare i comandi di rilevamento**

```bash
# I2C 模式
i2cdetect -y 1

# UART 模式
ls /dev/serial*
```

### D2: Cosa fare se i dati mostrano sempre -1?

**R:**

1. Verificare che il dito sia posizionato correttamente sul sensore, coprendo completamente i due LED
1. Attendere qualche secondo per la stabilizzazione dei dati (di solito servono 10-30 secondi)
1. Controllare se è stata chiamata `sensor_start_collect()` per avviare l'acquisizione
1. Verificare se la spia LED del sensore è accesa

### D3: Cosa fare se i dati non sono accurati?

**R:**

1. Assicurarsi che il dito copra completamente l'area ottica del sensore
1. Mantenere il dito fermo, senza muoverlo
1. Attendere più di 30 secondi per la stabilizzazione dei dati
1. Effettuare più misurazioni e calcolare la media
1. Evitare la luce intensa diretta sul sensore

### D4: È possibile usare I2C e UART contemporaneamente?

**R:** No; è possibile scegliere una sola modalità di comunicazione alla volta.

### D5: È necessario eseguire con sudo?

**R:**

- Modalità I2C: si consiglia di usare sudo per evitare problemi di permessi
- Modalità UART: è obbligatorio usare sudo, altrimenti non è possibile accedere alla porta seriale

---

## Precauzioni

### Tecniche di misura

1. **Posizionare correttamente il dito**
  - Appoggiare delicatamente il dito sul sensore, coprendo i due LED
  - Non premere con forza per non compromettere la circolazione sanguigna
  - Mantenere il dito stabile, senza muoverlo

1. **Attendere la stabilizzazione dei dati**
  - All'inizio della misurazione i valori possono essere instabili
  - Si consiglia di attendere 10-30 secondi, finché i dati non si stabilizzano, prima di leggerli
  - Il sensore aggiorna i dati ogni 4 secondi

1. **Requisiti dell'ambiente**
  - Evitare la luce intensa diretta sul sensore
  - Mantenere una temperatura ambiente adeguata
  - Mantenere un ambiente tranquillo durante la misurazione

### Interpretazione dei dati

| Intervallo SPO2 | Descrizione |
|---|---|
| 95% - 100% | Normale |
| 90% - 94% | Ipossia lieve |
| < 90% | Ipossia; si consiglia di consultare un medico |

| Intervallo di frequenza cardiaca | Descrizione |
|---|---|
| 60 - 100 battiti/min | Intervallo normale di un adulto |
| < 60 battiti/min | Bradicardia |
| > 100 battiti/min | Tachicardia |

### Avviso di sicurezza

- Questo sensore è solo di riferimento e non può sostituire un dispositivo medico professionale
- In caso di problemi di salute, consultare tempestivamente un medico
- I risultati delle misurazioni sono solo di riferimento e non costituiscono base diagnostica
