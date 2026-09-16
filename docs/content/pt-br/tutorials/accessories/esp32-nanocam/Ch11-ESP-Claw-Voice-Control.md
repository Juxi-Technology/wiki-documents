---
title: "Capítulo 11: Controle por voz do ESP-Claw"
description: "Capítulo 11 do tutorial do ESP32-NanoCam: as 5 ferramentas de controle de hardware do modo ESP-Claw — ajuste de cor do LED por voz, troca de modo de IA."
---

# Capítulo 11: Controle por voz do ESP-Claw

> **[Comprar na loja](https://www.juxitech.com/products/esp32-s3-wifi-video-module)**

**Objetivo do capítulo**: controlar por voz o efeito de LED, a troca de modo de IA e a análise visual por foto do NanoCam.

## Sobre este capítulo

Quando o dispositivo é alternado para `ai_mode:7`, o NanoCam entra no modo ESP-Claw. Ele **compartilha o mesmo firmware** (`nanocam_espclaw/`) com o XiaoZhi AI (`ai_mode:6`); a única diferença é que o modo ESP-Claw, além da conversa por voz, registra mais 5 ferramentas de controle de hardware.

|Aspecto|XiaoZhi AI (mode 6)|ESP-Claw (mode 7)|
|---|---|---|
|Conversa por voz|✅ ASR→LLM→TTS|✅ O mesmo pipeline de voz|
|Controle do LED|❌|✅ Ajuste de cor / ligar-desligar por voz|
|Troca de modo de IA|❌|✅ Troca por voz|
|Foto + análise visual por IA|❌|✅ Tira a foto e chama IA multimodal para entender a cena|

## Princípio

Sobre o pipeline de voz, o modo ESP-Claw registra 5 ferramentas exclusivas do NanoCam via `RegisterMcpTools()`:

```Plain
用户语音 "把灯调成蓝色"
  → ASR 语音识别（云端）
  → LLM 理解意图 → 调用 self.led.set_color({"r":0, "g":0, "b":255})
  → NanoCam WS2812 LED 变蓝
  → TTS: "好的，灯已经调成蓝色"
```

## Passos

### 11.1 Gravar o firmware

O ESP-Claw usa o projeto de firmware independente `nanocam_espclaw/`:

```Bash
cd nanocam_espclaw
idf.py set-target esp32s3
idf.py build
idf.py -p COMx flash
```

### 11.2 Alternar o modo

Após iniciar, defina o modo ESP-Claw:

```Plain
ai_mode:7
```

O dispositivo reinicia automaticamente e entra no modo. Use `ai_mode:6` para voltar ao modo XiaoZhi AI.

### 11.3 Exemplos de controle por voz

Após a ativação, basta dizer o que você precisa:

```Plain
💬 "把灯打开"              → WS2812 亮白色
💬 "把灯调成蓝色"          → LED 变蓝
💬 "关灯"                  → LED 关闭
💬 "切换到人脸检测模式"    → NVS 保存 ai_mode:2 + 重启
💬 "看看这里有什么"        → 拍照 + 上传多模态 AI 分析
💬 "我面前有杯子吗"        → 多模态 AI 识别画面
```

### 11.4 Foto + análise visual por IA

Quando o usuário diz algo como "看看..." (veja...), o firmware captura um quadro VGA RGB565, comprime em JPEG e o envia à API multimodal configurada no servidor para análise; o resultado é falado via TTS.

> A URL e o token da API multimodal são entregues automaticamente pelo servidor na fase de handshake da conexão; não é preciso digitar comandos de configuração manualmente na porta serial.

## As 5 ferramentas exclusivas do NanoCam

|Nome da ferramenta|Função|Parâmetros|
|---|---|---|
|`self.led.set_color`|Define a cor do LED RGB WS2812 (GPIO18)|`r,g,b`: 0-255|
|`self.led.turn_off`|Desliga o LED|Nenhum|
|`self.camera.set_ai_mode`|Alterna o modo de IA (salvo na NVS + reinício)|`mode`: 0-7|
|`self.camera.inspect_image`|Foto + análise visual por LLM multimodal|`prompt`: descrição da pergunta|
|`self.get_device_info`|Informações do dispositivo em JSON|Nenhum|

## Arquivos de configuração

|Conteúdo|Caminho|
|---|---|
|Registro das ferramentas MCP|`nanocam_espclaw/main/boards/nanocam/nanocam_board.cc`|
|Lógica de envio da Vision|`nanocam_espclaw/main/boards/common/esp32_camera.cc`|
|Configuração padrão do SDK|`nanocam_espclaw/sdkconfig.defaults`|

> O firmware ESP-Claw é um projeto independente e não compartilha código com o `nanocam_vision`. Os dois firmwares precisam ser compilados e gravados separadamente.

## Como escolher

|Sua necessidade|Modo recomendado|
|---|---|
|Apenas conversa por voz e perguntas|mode 6 (XiaoZhi)|
|Controle do LED por voz|mode 7 (ESP-Claw)|
|Tirar fotos e a IA "ver" a imagem|mode 7 (ESP-Claw)|
|Troca do modo de detecção por voz|mode 7 (ESP-Claw)|

> O uso completo do ESP-Claw (configuração do servidor, desenvolvimento de ferramentas MCP personalizadas etc.) ainda está em exploração; a documentação será atualizada continuamente conforme o avanço das pesquisas.

Com isso, a série completa de 11 capítulos do tutorial chega ao fim. Os comandos seriais completos (como a troca de modo via `ai_mode`) estão no [manual do protocolo serial](./ESP32-NanoCam-Serial-Protocol.md).

<RelatedProducts slugs="esp32-s3-wifi-module" />
