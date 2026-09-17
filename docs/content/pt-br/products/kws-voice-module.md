---
title: Módulo de Interação por Voz KWS
category: accessory
description: "Módulo de reconhecimento de voz KWS da Juxi Technology — palavras de ativação CN/EN, UART, visualização RViz2, Jetson/Raspberry Pi"
keywords: [kws, reconhecimento de voz, palavra de ativação, voz por ia]
---

# Módulo de Interação por Voz KWS

> **[Comprar na loja](https://www.juxitech.com/products/ai-voice-recognition-module)**

## Visão Geral

O módulo de interação por voz KWS (Keyword Spotting) suporta gravação de firmware com palavras de reconhecimento em chinês/inglês. Comunica-se via serial com hosts como Jetson e Raspberry Pi, com visualização ROS2 RViz2.

**Principais recursos**:

- Firmware de palavras de reconhecimento CN/EN (download e gravação)
- Comunicação serial (PC/Jetson/Pi/Jetson Nano)
- Visualização ROS2 + RViz2
- Repositório open source com exemplos de serial Python
- 100% de reconhecimento offline, sem necessidade de internet (privacidade + baixa latência)
- Precisão >95% em ambientes normais, resposta em até 300ms
- Até 100 comandos de voz personalizados, palavras de ativação customizáveis
- Baixo consumo: corrente média <50mA

## Especificações

| Categoria | Especificação |
|----------|------|
| Interface | Serial (UART) |
| Reconhecimento | Palavras de ativação CN/EN |
| Plataformas | Jetson, Nano, Raspberry Pi, PC |
| Visualização | ROS2 RViz2 |
| Firmware | Ferramenta de gravação open source |

## Início Rápido

```bash
import serial
ser = serial.Serial('/dev/ttyUSB0', 115200)
while True:
    if ser.in_waiting:
        data = ser.readline().decode().strip()
        print(f"Recognition: {data}")
```

## Tutoriais

- [Série de Reconhecimento de Fala KWS](/pt-br/tutorials/accessories/KWS-speech-recognition-module/)
- [Download e Gravação de Firmware](/pt-br/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words)
- [Visualização ROS2 RViz2](/pt-br/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization)

## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
