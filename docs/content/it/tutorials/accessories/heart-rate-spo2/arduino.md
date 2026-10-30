---
title: "Tutorial Arduino"
description: "Usare la libreria JUXI_HeartRate_SPO2 su Arduino per leggere frequenza cardiaca, SpO2 e temperatura a bordo; include cablaggio, codice di esempio, API e domande frequenti."
---

# Tutorial Arduino

## Introduzione al sensore

JUXI_HeartRate_SPO2 è un modulo sensore di frequenza cardiaca e SpO2 basato sul chip MAX30102; l'algoritmo integrato può restituire direttamente i valori di frequenza cardiaca e saturazione di ossigeno.

**Funzioni principali:**

- Misura della saturazione di ossigeno (SPO2)
- Misura della frequenza cardiaca (battiti/minuto)
- Misura della temperatura a bordo
- Supporto della comunicazione I2C

---

## Tutorial Arduino

### Preparazione dell'hardware

| Materiale necessario |
|---|
| Scheda di sviluppo Arduino (Uno/ESP32, ecc.) |
| Sensore JUXI_HeartRate_SPO2 |
| Cavi Dupont (vari) |
| Cavo dati USB (per collegare l'Arduino al computer) |

### Installazione della libreria

1. Scaricare il file della libreria [JUXI_HeartRate_SPO2.zip](https://juxitech.feishu.cn/wiki/W2IwwDop5i4BVlk98EacfyJvnrh)
1. Decomprimere l'archivio e copiarlo nella directory delle librerie di Arduino:
  - Windows: `C:\Users\用户名\Documents\Arduino\libraries\`
  - Mac: `~/Documents/Arduino/libraries/`
  - Linux: `~/Arduino/libraries/`

1. Riavviare l'Arduino IDE

### Caricamento del codice di esempio

> Quando si carica il codice, collegare solo l'Arduino al computer; non collegare il modulo di monitoraggio di frequenza cardiaca e SpO2 all'Arduino.

#### Opzione 1: esempio in modalità UART

Commentare #define I2C_COMMUNICATION e caricare il codice sull'Arduino

```cpp
#include "JUXI_HeartRate_SPO2.h"

// I2C 地址
#define I2C_ADDRESS 0x57

// 创建传感器对象，I2C模式
JUXI_HeartRate_SPO2_I2C sensor(&Wire, I2C_ADDRESS);

void setup() {
  Serial.begin(9600);

  // 初始化传感器
  while (!sensor.begin()) {
    Serial.println("传感器初始化失败，请检查连接！");
    delay(1000);
  }
  Serial.println("传感器初始化成功！");

  // 启动数据采集
  sensor.sensorStartCollect();
}

void loop() {
  // 读取心率和血氧数据
  sensor.getHeartbeatSPO2();

  // 输出血氧饱和度
  Serial.print("血氧饱和度: ");
  Serial.print(sensor._sHeartbeatSPO2.SPO2);
  Serial.println(" %");

  // 输出心率
  Serial.print("心率: ");
  Serial.print(sensor._sHeartbeatSPO2.Heartbeat);
  Serial.println(" 次/分钟");

  // 读取并输出温度
  Serial.print("板载温度: ");
  Serial.print(sensor.getTemperature_C());
  Serial.println(" ℃");

  Serial.println("------------------------");

  // 传感器每4秒更新一次数据
  delay(4000);
}
```

##### Cablaggio

Comunicazione I2C

![Illustrazione](../../../../../public/images/tutorials/accessories/heart-rate-spo2/arduino/01.png)

![Illustrazione](../../../../../public/images/tutorials/accessories/heart-rate-spo2/arduino/02.png)

| Pin del sensore | Arduino |
|---|---|
| VCC | 5V/3.3V |
| GND | GND |
| SDA | SDA/A4 |
| SCL | SCL/A5 |

- Spostare l'interruttore del modulo di monitoraggio di frequenza cardiaca e SpO2 su IIC!
- Collegare l'Arduino al computer con il cavo dati

#### Risultato di esecuzione:

1. Aprire Arduino - Strumenti - Monitor Seriale

Impostare il baud rate a 9600

![Illustrazione](../../../../../public/images/tutorials/accessories/heart-rate-spo2/arduino/03.png)

2. Aprire l'assistente di debug della porta seriale

[Assistente di debug della porta seriale uartassist5.15.zip](https://juxitech.feishu.cn/wiki/BJlfwSQydi7u5lkRDQ6cV4dvnBd)

Selezionare il numero della porta seriale

Impostare il baud rate a `9600`

Bit di dati `8`, bit di stop `1`, bit di parità `NONE`, controllo di flusso `NONE`

Selezionare `ASCII` per le impostazioni di ricezione e di invio

![Illustrazione](../../../../../public/images/tutorials/accessories/heart-rate-spo2/arduino/04.png)

### Descrizione dell'API

| Funzione | Descrizione |
|---|---|
| begin() | Inizializza il sensore; restituisce true/false |
| getHeartbeatSPO2() | Legge frequenza cardiaca e SpO2 e li memorizza nella struttura _sHeartbeatSPO2 |
| getTemperature_C() | Legge la temperatura a bordo (gradi Celsius) |
| sensorStartCollect() | Avvia l'acquisizione dei dati (il sensore si accende) |
| sensorEndCollect() | Arresta l'acquisizione dei dati (il sensore si spegne) |

### Descrizione dei dati

- **SPO2 (saturazione di ossigeno)**: intervallo normale 95% - 100%; il valore -1 indica un valore non valido
- **Heartbeat (frequenza cardiaca)**: intervallo normale 60 - 100 battiti/minuto; il valore -1 indica un valore non valido
- **Causa dei valori non validi**: dito non posizionato correttamente o dati non ancora stabilizzati

---

## Precauzioni d'uso

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

---

## Domande frequenti

### D1: Cosa fare se l'inizializzazione del sensore fallisce?

**R:**

1. Controllare che il cablaggio sia corretto (SDA su GPIO2/A4, SCL su GPIO3/A5)
1. Verificare che l'alimentazione sia corretta (3,3V o 5V)
1. Usare il comando `i2cdetect -y 1` per rilevare il dispositivo
1. Verificare che l'interruttore del sensore sia in posizione IIC

### D2: Cosa fare se i dati mostrano sempre -1?

**R:**

1. Verificare che il dito sia posizionato correttamente sul sensore
1. Attendere qualche secondo per la stabilizzazione dei dati
1. Controllare se è stata chiamata `sensorStartCollect()` per avviare l'acquisizione
1. Verificare se la spia LED del sensore è accesa

### D3: Cosa fare se i dati non sono accurati?

**R:**

1. Assicurarsi che il dito copra completamente l'area ottica del sensore
1. Mantenere il dito fermo, senza muoverlo
1. Attendere più di 30 secondi per la stabilizzazione dei dati
1. Effettuare più misurazioni e calcolare la media

### D4: Quali schede di sviluppo Arduino sono supportate dal sensore?

**R:** Sono supportate:

- Arduino Uno/Mega
- ESP8266
- ESP32
- Altre schede di sviluppo compatibili con l'ambiente Arduino

---

## Ubicazione dei file di esempio

### Esempio Arduino

```text
JUXI_HeartRate_SPO2/
└── examples/
    └── gainHeartbeatSPO2/
        └── gainHeartbeatSPO2.ino
```
