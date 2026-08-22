---
title: Sensore di frequenza cardiaca e SpO2
description: "Tutorial d'uso del modulo sensore JUXI MAX30102 (Arduino / Python)"
---

# Sensore di frequenza cardiaca e SpO2

## Panoramica del prodotto

Il sensore JUXI di frequenza cardiaca e ossimetria si basa sul chip MAX30102, supporta la comunicazione IIC e UART e acquisisce in tempo reale frequenza cardiaca e saturazione di ossigeno. Include libreria Arduino e SDK Python (Raspberry Pi / Windows / Jetson), oltre a un software di visualizzazione.

**Caratteristiche**:
- Chip di alta precisione MAX30102
- Doppia modalità di comunicazione IIC / UART
- Libreria Arduino + SDK Python
- Software di visualizzazione per Windows
- Codice open source: [GitHub](https://github.com/Juxi-Technology/JUXI_HeartRate_SPO2)

## Specifiche del prodotto

| Parametro | Specifica |
|------|------|
| Chip | MAX30102 |
| Misure | Frequenza cardiaca (HR) / Saturazione di ossigeno (SpO2) |
| Interfacce | IIC (0x57) / UART (9600 bps) |
| Tensione | 3,3 V – 5 V |
| Supporto di sviluppo | Arduino / Python (RPi / Windows / Jetson) |

## Guida rapida

### Cablaggio

**Cablaggio IIC**:

![Cablaggio IIC](../../../public/images/tutorials/accessories/heart-rate-spo2/IIC.png)

| MAX30102 | Arduino / Raspberry Pi |
|----------|-----------------|
| VCC | 3,3 V / 5 V |
| GND | GND |
| SCL | SCL (clock I2C) |
| SDA | SDA (dati I2C) |

**Cablaggio UART**:

![Cablaggio UART](../../../public/images/tutorials/accessories/heart-rate-spo2/UART.png)

| MAX30102 | Arduino UNO |
|----------|------------|
| VCC | VCC |
| GND | GND |
| TX | Pin 4 |
| RX | Pin 5 |

### Esempio di codice Arduino

Installazione libreria: copiare `JUXI_HeartRate_SPO2.h` e `.cpp` dalla cartella `src/` del repository nella directory libraries di Arduino.

```cpp
#include "JUXI_HeartRate_SPO2.h"

#define I2C_COMMUNICATION
#define I2C_ADDRESS  0x57
JUXI_HeartRate_SPO2_I2C MAX30102(&Wire, I2C_ADDRESS);

void setup() {
  Serial.begin(9600);
  while (!MAX30102.begin()) {
    Serial.println("init fail!");
    delay(1000);
  }
  Serial.println("start measuring...");
}

void loop() {
  MAX30102.sensor_read_data();
  int heartRate = MAX30102.sensor_get_heartRate();
  int spo2 = MAX30102.sensor_get_spo2();

  if (heartRate > 0 && spo2 > 0) {
    Serial.print("Heart Rate: ");
    Serial.print(heartRate);
    Serial.print(" bpm, SpO2: ");
    Serial.print(spo2);
    Serial.println(" %");
  }
  delay(100);
}
```

### Esempio di codice Python (Raspberry Pi / Jetson)

```python
import sys
import os
import time
sys.path.append(os.path.dirname(os.path.realpath(__file__)))
from JUXI_HeartRate_SPO2 import *

# Select communication mode: ctype=0 for IIC, ctype=1 for UART
ctype = 1

if ctype == 0:
    I2C_1 = 0x01
    I2C_ADDRESS = 0x57
    max30102 = JUXI_HeartRate_SPO2_i2c(I2C_1, I2C_ADDRESS)
else:
    max30102 = JUXI_HeartRate_SPO2_uart(9600)

def setup():
    while not max30102.begin():
        print("init fail!")
        time.sleep(1)
    print("start measuring...")
    max30102.sensor_start_collect()
    time.sleep(1)

def loop():
    max30102.sensor_read_data()
    hr = max30102.sensor_get_heartRate()
    spo2 = max30102.sensor_get_spo2()
    if hr > 0 and spo2 > 0:
        print(f"Heart Rate: {hr} bpm, SpO2: {spo2}%")
    time.sleep(0.1)

if __name__ == "__main__":
    setup()
    try:
        while True:
            loop()
    except KeyboardInterrupt:
        print("Program ended")
```

## Software di visualizzazione

JUXI offre un software Windows che mostra in tempo reale le curve di frequenza cardiaca e SpO2:

![Screenshot del software](../../../public/images/tutorials/accessories/heart-rate-spo2/心率模块上位机.png)

- Percorso repository: `HeartRateOximeter/上位机源代码/HeartRateOximeter.py`
- Download: [GitHub Releases](https://github.com/Juxi-Technology/JUXI_HeartRate_SPO2)

## Domande frequenti

**D: L'inizializzazione fallisce (init fail)?**
Verificare il cablaggio. In modalità IIC, controllare l'indirizzo del dispositivo (0x57 predefinito). In modalità UART, assicurarsi che la velocità sia 9600.

**D: Le letture sono instabili?**
Assicurarsi che il sensore sia ben a contatto con la pelle. Appoggiare il dito fermamente sul sensore ed evitare di muoverlo.

**D: Come si usa su Windows?**
Consultare gli esempi e la documentazione nella cartella `python/windows/` del repository.

## Supporto tecnico

- E-mail: support@juxitech.com
- Sito ufficiale: [www.juxitech.com](https://www.juxitech.com)
- Repository open source: [GitHub](https://github.com/Juxi-Technology/JUXI_HeartRate_SPO2)
