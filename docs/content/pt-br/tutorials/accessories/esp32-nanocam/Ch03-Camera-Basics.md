---
title: "Capítulo 3: Fundamentos da câmera"
description: "Capítulo 3 do tutorial do ESP32-NanoCam: entenda a interface de câmera DVP, a transmissão MJPEG e o buffer de quadros em PSRAM, veja a imagem padrão e conheça os modos ai_mode integrados ao firmware."
---

# Capítulo 3: Fundamentos da câmera

> **[Comprar na loja](https://www.juxitech.com/products/esp32-s3-wifi-video-module)**

**Objetivo do capítulo**: entender o caminho dos dados da câmera do NanoCam e conhecer os modos de IA integrados ao firmware.

## Princípio

O NanoCam conecta a câmera pela interface DVP (vídeo paralelo digital). O sensor GC2145 envia dados de pixel paralelos de 8 bits; o periférico LCD_CAM do ESP32-S3 os armazena diretamente na PSRAM via DMA, e o servidor HTTP transmite o fluxo em formato MJPEG para o navegador.

### Conceitos-chave

- **DVP**: dados paralelos de 8 linhas + 3 linhas de sincronização (VSYNC/HREF/PCLK)

- **MJPEG**: cada quadro é uma imagem JPEG independente; o navegador as carrega em sequência para produzir o efeito de vídeo

- **PSRAM**: 8 MB de PSRAM usados como buffer de quadros, com capacidade para 2-4 quadros

## Passos

### 3.1 Ver a imagem padrão

Após gravar o firmware, o modo padrão é o de transmissão de imagem; abra `http://<IP>` no navegador para ver a imagem.

|Comando|Função|
|---|---|
|`ai_mode:0\r`|Módulo de transmissão de imagem|
|`ai_mode:1\r`|Detecção de rosto de gato|
|`ai_mode:2\r`|Detecção de rosto|
|`ai_mode:3\r`|Reconhecimento de cores|
|`ai_mode:4\r`|Reconhecimento facial|
|`ai_mode:5\r`|Leitura de código QR|

> Consulte o [manual do protocolo serial](./ESP32-NanoCam-Serial-Protocol.md) para todos os modos de IA e comandos seriais.

Próximo capítulo: [Capítulo 4: Detecção de rosto](./Ch04-Face-Detection.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
