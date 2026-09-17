---
title: Módulo de Vídeo WiFi ESP32-S3
category: compute-vision
description: "Módulo de vídeo WiFi ESP32-S3 da Juxi Technology — câmera de 2MP, streaming WiFi em tempo real, visão por IA (cor/rosto/QR), modo duplo AP+STA"
keywords: [esp32, wifi, câmera, vídeo, visão por ia]
---

# Módulo de Vídeo WiFi ESP32-S3

> **[Comprar na loja](https://www.juxitech.com/products/esp32-s3-wifi-video-module)**

## Visão Geral

O módulo de vídeo WiFi ESP32-S3 (modelo **ESP32-NanoCam**) é uma solução compacta e econômica de visão por IA, com arquitetura modular de duas placas (placa de processamento principal + placa de expansão de comunicação). A placa principal conta com o processador **ESP32-S3** e uma câmera HD de 2MP, suportando streaming de vídeo WiFi, visão por IA e interação por voz — o firmware pré-instalado funciona de fábrica.

**Principais recursos**:

- Câmera HD de 2MP (1600×1200@30FPS)
- Streaming em tempo real com **modo duplo AP + STA** WiFi
- 8 modos de IA: detecção de rosto de gato, detecção de rostos, reconhecimento de cor, reconhecimento facial, leitura de QR code, diálogo por voz com LLM (XiaoZhi AI), controle por voz ESP-Claw
- Áudio ES8311 integrado (microfone + alto-falante), com suporte a interação por voz
- LED de status RGB WS2812
- Atualização de firmware com um clique via Type-C
- Interfaces padrão PH2.0 I2C / UART

---

## Especificações

| Categoria | Especificação |
|----------|------|
| MCU | ESP32-S3 N16R8 (Espressif oficial, dual-core 240MHz) |
| Armazenamento | 16MB Flash + 8MB PSRAM |
| Câmera | CMOS de 2MP GC2145 (1600×1200@30FPS) |
| FOV | Diagonal 68°, horizontal 49,5° |
| Áudio | Codec ES8311 + microfone MEMS + alto-falante com amplificador classe D |
| LED de status | WS2812 RGB |
| Sem fio | WiFi (BT modo duplo) AP/STA + antena de alto ganho |
| Interface | Type-C / I2C / UART (PH2.0) |
| Botões | Reset + botão BOOT |
| Reconhecimento | Rosto de gato, detecção de rostos, reconhecimento facial, cor, QR code, diálogo por voz |

## Início Rápido

### 1. Ligar

Firmware pré-instalado — o módulo cria seu próprio hotspot WiFi ao ligar:

- Conecte o celular/PC ao hotspot do módulo
- Abra a página/App fornecida para ver o vídeo ao vivo

### 2. Dois Modos

| Modo | Descrição |
|------|-------------|
| **Modo AP** | O módulo cria seu próprio hotspot; os terminais se conectam diretamente |
| **Modo STA** | O módulo se conecta a um roteador WiFi existente, na mesma rede dos terminais |

### 3. Conexão ao Host

**UART** (Raspberry Pi / Jetson Orin):

```
ESP32 RX → Host TX
ESP32 TX → Host RX
```

**I2C**: I2C padrão PH2.0 — fornece **dados de coordenadas** da detecção de rosto/cor.

### 4. Desenvolvimento

Type-C ao PC para atualização de firmware com um clique; alterne os modos de IA por comandos seriais (rosto de gato/detecção de rostos/cor/reconhecimento facial/QR code/diálogo por voz); consulte o [Manual do protocolo serial](/pt-br/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Serial-Protocol) para a referência completa dos comandos.

---

## Tutoriais completos

- [Início rápido — grave o firmware, conecte ao WiFi e veja o vídeo em 3 minutos](/pt-br/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start)
- [Especificações de hardware — mapeamento completo de GPIO e projeto de alimentação](/pt-br/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Hardware-Spec)
- [Manual do protocolo serial — comandos AT completos para configuração de WiFi e modos de IA](/pt-br/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Serial-Protocol)
- [Tutorial de visão por IA — 11 capítulos progressivos (rostos/rosto de gato/cor/QR code/voz)](/pt-br/tutorials/accessories/esp32-nanocam/Ch01-Environment-Setup)
- [ESP32-NanoCam como controlador de braço escravo sem fio SO-ARM101](/pt-br/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop)

---

## Aplicações

- Streaming de vídeo sem fio (AP/STA)
- Desenvolvimento de visão por IA (cor/rosto/QR)
- Projetos IoT AIoT
- Expansão de visão para robôs

---

## FAQ

**P: Como assistir ao vídeo ao vivo?**

**R:** O módulo cria um hotspot AP — conecte e abra a página/App fornecida.

**P: Quais reconhecimentos são suportados?**

**R:** Segmentação por limiar de cor + CNN leve: cor, rosto, QR code, alternáveis por comandos.

**P: Ele consegue retornar coordenadas de detecção?**

**R:** Sim — por interfaces I2C/UART para desenvolvimento secundário.

**P: Como atualizar o firmware?**

**R:** Type-C ao PC, atualização com um clique.

---

## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Reportar problemas](https://github.com/Juxi-Technology/wiki-documents/issues)
