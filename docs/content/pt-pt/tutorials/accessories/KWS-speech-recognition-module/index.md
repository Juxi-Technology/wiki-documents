---
title: Módulo de reconhecimento de voz KWS
description: "Ponto de entrada dos tutoriais do módulo KWS: comunicação série com Jetson, Jetson Nano, PC e Raspberry Pi, visualização em RViz2 e gravação de firmware."
---

# Módulo de reconhecimento de voz KWS

> **[Comprar na loja](https://www.juxitech.com/products/ai-voice-recognition-module)**


Bem-vindo ao módulo de reconhecimento de voz KWS! Aqui está o índice de todos os tutoriais relacionados.

## Lista de tutoriais

- [Comunicação serial Jetson Nano](./Jetson-Nano-serial-communication.md)
- [Comunicação serial Jetson](./Jetson-serial-communication.md)
- [Comunicação serial PC](./PC-serial-communication.md)
- [Visualização ROS2 RViz2](./ROS2-rviz2-visualization.md)
- [Download e gravação de firmware de reconhecimento de palavras em chinês e inglês](./download-and-burn-firmware-for-chinese-and-english-recognition-words.md)
- [Comunicação serial Raspberry Pi](./raspberry-pi-serial-communication.md)


---

## Exemplo do repositório oficial

A Juxi Technology fornece código open source para o módulo de reconhecimento de voz KWS: [GitHub](https://github.com/Juxi-Technology/Sound-card-for-KWS-speech-recognition-module)

### Comunicação serial em Python

O exemplo em Python do repositório demonstra como se comunicar com o módulo KWS pela porta serial para receber os resultados do reconhecimento da palavra de ativação:

```python
import serial
ser = serial.Serial('/dev/ttyUSB0', 115200)
while True:
    if ser.in_waiting:
        data = ser.readline().decode().strip()
        print(f"Recognition result: {data}")
```
