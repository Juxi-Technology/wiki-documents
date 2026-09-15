---
title: "Sensor de Frequência Cardíaca e SpO2"
description: "Módulo sensor de batimentos cardíacos e SpO2 MAX30102 da Juxi Technology — Tutorial para Arduino / Python"
---

# Sensor de Frequência Cardíaca e SpO2

## Visão geral

O sensor de batimentos cardíacos e SpO2 da Juxi Technology é baseado no chip MAX30102, com suporte aos modos de comunicação IIC e UART para coleta em tempo real de batimentos cardíacos e saturação de oxigênio no sangue. Inclui uma biblioteca para Arduino e um SDK Python (Raspberry Pi / Windows / Jetson), além de um aplicativo gráfico de host.

**Características**:
- Chip MAX30102 de alta precisão para batimentos cardíacos e SpO2
- Dois modos de comunicação: IIC e UART
- Biblioteca Arduino + SDK Python
- Aplicativo gráfico de host para Windows
- Open source: [GitHub](https://github.com/Juxi-Technology/JUXI_HeartRate_SPO2)

## Especificações

| Parâmetro | Detalhe |
|-----------|--------|
| Chip | MAX30102 |
| Medições | Batimentos cardíacos (FC) / Saturação de oxigênio no sangue (SpO2) |
| Comunicação | IIC (0x57) / UART (9600 bps) |
| Tensão de operação | 3.3V - 5V |
| Suporte de desenvolvimento | Arduino / Python (RPi / Windows / Jetson) |

## Início rápido

### Fiação

**Fiação IIC**:

![Diagrama de fiação IIC](../../../public/images/tutorials/accessories/heart-rate-spo2/IIC.png)

| MAX30102 | Arduino / Raspberry Pi |
|----------|------------------------|
| VCC | 3.3V / 5V |
| GND | GND |
| SCL | SCL (Clock I2C) |
| SDA | SDA (Dados I2C) |

**Fiação UART**:

![Diagrama de fiação UART](../../../public/images/tutorials/accessories/heart-rate-spo2/UART.png)

| MAX30102 | Arduino UNO |
|----------|-------------|
| VCC | VCC |
| GND | GND |
| TX | Pino 4 |
| RX | Pino 5 |

### Exemplo para Arduino

Instale a biblioteca: copie `JUXI_HeartRate_SPO2.h` e `.cpp` do diretório `src/` do repositório para a pasta de bibliotecas do seu Arduino.

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

### Exemplo em Python (Raspberry Pi / Jetson)

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

## Aplicativo de host

A Juxi Technology fornece um aplicativo gráfico de host para Windows com exibição em tempo real das formas de onda de batimentos cardíacos e SpO2:

![Captura de tela do aplicativo de host](../../../public/images/tutorials/accessories/heart-rate-spo2/心率模块上位机.png)

- Caminho no repositório: `HeartRateOximeter/上位机源代码/HeartRateOximeter.py`
- Download: [GitHub Releases](https://github.com/Juxi-Technology/JUXI_HeartRate_SPO2)

## Perguntas frequentes

**P: A inicialização falha (init fail)?**

**R:** Verifique se a fiação está correta. No modo IIC, confira o endereço do dispositivo (padrão 0x57). No modo UART, confirme se a taxa de transmissão é 9600.

**P: Leituras instáveis?**

**R:** Garanta um bom contato do sensor com a pele. Mantenha o dedo firme sobre o sensor e evite movimentos.

**P: Como usar no Windows?**

**R:** Consulte o código de exemplo e a documentação no diretório `python/windows/` do repositório.

## Suporte

- E-mail: support@juxitech.com
- Site: [www.juxitech.com](https://www.juxitech.com)
- Repositório open source: [GitHub](https://github.com/Juxi-Technology/JUXI_HeartRate_SPO2)
