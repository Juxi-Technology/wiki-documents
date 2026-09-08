---
title: Módulo de Vídeo WiFi ESP32-S3
category: compute-vision
description: Módulo de vídeo WiFi ESP32-S3 da Juxi Technology — câmera de 2MP, streaming WiFi em tempo real, visão por IA (cor/rosto/QR), modo duplo AP+STA
keywords: [esp32, wifi, câmera, vídeo, visão por ia]
---

# Módulo de Vídeo WiFi ESP32-S3

> **[Comprar na loja](https://www.juxitech.com/products/esp32-s3-wifi-video-module)**

## Visão Geral

Uma solução compacta e econômica de visão por IA, com arquitetura modular de duas placas (placa de processamento principal + placa de expansão de comunicação). A placa principal conta com o processador **ESP32-S3** e uma câmera HD de 2MP, suportando streaming de vídeo WiFi, reconhecimento facial e reconhecimento de cores — o firmware pré-instalado funciona de fábrica.

**Principais recursos**:

- Câmera HD de 2MP (1600×1200@30FPS)
- Streaming em tempo real com **modo duplo AP + STA** WiFi
- Visão por IA: segmentação por limiar de cor + CNN leve (cor/rosto/QR)
- Atualização de firmware com um clique via Type-C
- Interfaces padrão PH2.0 I2C / UART

---

## Especificações

| Categoria | Especificação |
|----------|------|
| MCU | ESP32-S3 (Espressif oficial, dual-core) |
| Câmera | CMOS de 2MP (1600×1200@30FPS) |
| FOV | Diagonal 68°, horizontal 49,5° |
| Sem fio | WiFi (BT modo duplo) AP/STA + antena de alto ganho |
| Interface | Type-C / I2C / UART (PH2.0) |
| Botões | Reset + tecla customizável programável |
| Reconhecimento | Cor, rosto, QR code |

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

Type-C ao PC para atualização de firmware com um clique; alterne os alvos de reconhecimento por comandos UART/I2C.

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
