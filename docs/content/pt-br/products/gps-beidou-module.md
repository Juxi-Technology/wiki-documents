---
title: Módulo de Posicionamento GNSS GPS e BeiDou
category: sensor
description: Módulo GNSS GPS e BeiDou da Juxi Technology — ATGM336H-5N, quatro sistemas de satélite, precisão de 2,5m, pronto para ROS
keywords: [gps, beidou, gnss, posicionamento, ros]
---

# Módulo de Posicionamento GNSS GPS e BeiDou

> **[Comprar na loja](https://www.juxitech.com/products/gps-beidou-gnss-positioning-module)**

## Visão Geral

O módulo de posicionamento GPS & BDS é baseado no chip **ATGM336H-5N**, com suporte a BeiDou B2/B3 (todos os satélites 1-63), GPS, GLONASS e QZSS — com recepção multissistema simultânea para posicionamento, navegação e sincronização de tempo conjuntos.

**Principais recursos**:

- Quatro sistemas de satélite **BDS/GPS/QZSS/GLONASS** (isolados ou em qualquer combinação)
- Receptor de alta sensibilidade com **32 canais**
- Precisão de posicionamento de **2,5m (CEP50)**, partida a frio em 32s
- Serial USB plug-and-play + serial TTL
- Tutoriais open source para Arduino/Jetson/Raspberry Pi/ROS

---

## Especificações

| Categoria | Especificação |
|----------|------|
| Chip | ATGM336H-5N |
| Sistemas de satélite | BDS / GPS / QZSS / GLONASS |
| Canais | 32, multissistema simultâneo |
| Precisão | <2,5m (CEP50) |
| Taxa de atualização | Padrão 1Hz, máx. 10Hz |
| Baud rate | 4800-115200bps (padrão 9600) |
| Sensibilidade | Partida a frio -148dBm, rastreamento -162dBm |
| Alimentação | 25mA @ 3,3V |
| Temperatura de operação | -40℃ a +85℃ |
| Interface | USB Type-C / serial TTL (PH2.0) |

## Pinagem

| Pino | Função |
|-----|----------|
| 5V | Entrada de alimentação |
| RES | Reset do módulo |
| PPS | Saída pulso-por-segundo |
| TX | Saída de dados seriais |
| RX | Entrada de dados seriais (opcional) |

---

## Início Rápido

### 1. Conectar a Antena

Conecte a antena GPS ativa de 3m, posicionando-a em área aberta (ao ar livre ou junto à janela) para aquisição rápida de satélites.

### 2. USB ao PC/Host

Conexão direta via Type-C, plug and play (9600bps padrão).

### 3. Verificar o Posicionamento

```bash
# Parse NMEA data
pip install pynmea2

import serial
import pynmea2

ser = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)
while True:
    line = ser.readline().decode(errors='ignore')
    if line.startswith(('$GPRMC', '$GNRMC')):
        msg = pynmea2.parse(line)
        print(f'Lat: {msg.latitude}, Lon: {msg.longitude}')
```

### 4. Integração ROS

Suporta nós de posicionamento ROS, combináveis com fusão IMU e navegação Move_Base.

---

## Ferramentas e Recursos

- **GnssToolKit3**: ferramenta de visualização — status dos satélites, registro de dados, exportação KML
- **Conversão de coordenadas**: solução completa WGS-84 → GCJ-02 → BD-09
- **Exemplos**: tutoriais Arduino / Python / Jetson Nano

---

## FAQ

**P: Posicionamento lento ou sem sinal?**

**R:** A antena deve estar em área aberta; verifique a conexão; a partida a frio leva 32s — tenha paciência no primeiro uso.

**P: Quantos sistemas de satélite?**

**R:** BDS, GPS, QZSS, GLONASS — isolados ou em qualquer combinação.

**P: Posso conectar a um MCU?**

**R:** Sim. A serial TTL (PH2.0) suporta placas MCU, com tutoriais para 51/Arduino/STM32.

**P: Qual o formato de saída?**

**R:** Protocolo padrão NMEA 0183.

---

## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Reportar problemas](https://github.com/Juxi-Technology/wiki-documents/issues)
