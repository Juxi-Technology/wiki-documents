---
title: "Capítulo 9: Conversa por voz"
description: "Capítulo 9 do tutorial do ESP32-NanoCam: conecte-se ao serviço de nuvem xiaozhi.me pelo framework XiaoZhi AI e experimente a conversa por voz full-duplex ASR→LLM→TTS, incluindo servidor auto-hospedado e solução de problemas."
---

# Capítulo 9: Conversa por voz

> **[Comprar na loja](https://www.juxitech.com/products/esp32-s3-wifi-video-module)**

**Objetivo do capítulo**: conectar o serviço de nuvem XiaoZhi AI e conversar naturalmente por voz com o NanoCam.

## Sobre este capítulo

Este capítulo aborda o modo XiaoZhi AI (`ai_mode:6`). **Importante**: o modo 6 (conversa por voz) e o modo 7 (ESP-Claw) **compartilham o mesmo firmware** (`nanocam_espclaw/`); a diferença é que, ao iniciar, o dispositivo carrega conjuntos diferentes de ferramentas MCP conforme o valor de `ai_mode` armazenado na NVS.

|Aspecto|XiaoZhi AI (mode 6)|ESP-Claw (mode 7)|
|---|---|---|
|Conversa por voz|✅ ASR→LLM→TTS|✅ O mesmo pipeline de voz|
|Ferramentas MCP|Ferramentas gerais (volume/foto etc.)|**Ferramentas gerais + 5 ferramentas dedicadas ao hardware**|
|Compreensão visual|`self.camera.take_photo`|**`self.camera.inspect_image`** (visão multimodal)|
|Controle do LED|❌|✅ Ajuste de cor por voz|
|Cenários de uso|Conversa geral com IA, educação infantil|Controle de hardware, inspeção visual, casa inteligente|

> Este capítulo foca na função central de conversa por voz do **XiaoZhi AI (modo 6)**. Para conhecer os recursos de controle de hardware do ESP-Claw, leia o [Capítulo 11: Controle por voz do ESP-Claw](./Ch11-ESP-Claw-Voice-Control.md).

## Princípio

O NanoCam integra o framework de código aberto XiaoZhi AI e se conecta ao servidor LLM pelos protocolos WebSocket / MQTT para implementar um pipeline completo de interação por voz:

```Plain
用户说话 → ES8311 麦克风采集 → Opus 编码
  → WebSocket → 云端 ASR 语音识别
  → LLM 大模型生成回复
  → TTS 语音合成 → Opus 解码
  → NS4150B 功放 → 扬声器播放
```

Design full-duplex: o usuário pode interromper (barge-in) enquanto a IA fala, proporcionando uma experiência próxima de uma conversa real.

## Requisitos de hardware

Este capítulo envolve funções de áudio e requer o seguinte hardware:

- Placa principal do NanoCam (com codec ES8311 + microfone AP2718AT)

- Placa base do NanoCam (com amplificador NS4150B + CH340K)

- Alto-falante (conectado à interface de alto-falante da placa base, VON/VOP)

> Também é possível testar apenas com a placa principal (monitorando pela saída de fone do ES8311). O microfone é um MEMS de silício analógico AP2718AT, conectado ao MIC1P do ES8311 através do capacitor de bloqueio C26.

## Passos

### 9.1 Gravar o firmware XiaoZhi AI

O XiaoZhi AI usa o projeto de firmware independente `nanocam_espclaw/`:

```Bash
cd nanocam_espclaw
idf.py set-target esp32s3
idf.py build
idf.py -p COMx flash monitor
```

Após iniciar, o modo XiaoZhi AI já é o padrão.

### 9.2 Conectar ao serviço de nuvem xiaozhi.me

De fábrica, o NanoCam se conecta por padrão ao serviço oficial de nuvem [xiaozhi.me](https://xiaozhi.me) (gratuito); não é preciso montar um servidor próprio.

1. Crie uma conta em [xiaozhi.me](https://xiaozhi.me)

2. Ao ligar, o dispositivo anuncia automaticamente um código de ativação de 6 dígitos

3. Insira o código de ativação no console do xiaozhi.me → vincule o dispositivo

4. Escolha o modelo LLM no console (Qwen / DeepSeek etc.)

A ativação é necessária apenas uma vez; depois, a conexão é automática a cada vez que o dispositivo é ligado.

### 9.3 Primeira conversa

Após ouvir o tom de aviso, você já pode conversar:

```Plain
你: "你好小智，今天天气怎么样？"
NanoCam: "我帮你查一下今天的天气..."
```

A palavra de ativação é **"你好小智"** (Olá, XiaoZhi; padrão).

### 9.4 Cenários comuns de conversa

```Plain
💬 "讲个笑话"              → AI 语音回答
💬 "帮我设个5分钟的闹钟"    → 闹钟功能
💬 "现在几点了"             → 报时
💬 "播放一首轻音乐"         → 联网播放音乐
💬 "什么是黑洞"             → 知识问答
```

## Servidor auto-hospedado (opcional)

Se você tem exigências de privacidade ou quer usar um LLM próprio, pode implantar o servidor de código aberto do XiaoZhi AI:

```Bash
git clone https://github.com/xinnan-tech/xiaozhi-esp32-server
cd xiaozhi-esp32-server
pip install -r requirements.txt
python app.py
```

O endereço do servidor do firmware é entregue pelo sistema OTA (`CONFIG_OTA_URL` no sdkconfig); ao ligar, o dispositivo solicita o endereço do servidor automaticamente.

> O XiaoZhi AI usa o servidor de código aberto do XiaoZhi AI (protocolo proprietário WebSocket + pipeline ASR/LLM/TTS). Sobre essa base, no modo ESP-Claw a função de análise visual tem a URL e o token da Vision API entregues pelo servidor durante o handshake MCP, sem necessidade de configuração no firmware.

## Solução de problemas

|Sintoma|Causa possível|Solução|
|---|---|---|
|Sem som|Alto-falante não conectado|Verifique a interface de alto-falante da placa base|
|Reconhecimento de voz impreciso|Ruído ambiente alto|Fale perto do microfone (distância < 1m)|
|Não conecta|WiFi não configurado|Configure a rede primeiro pela porta serial: `sta_ssid:xxx`|
|Sem código de ativação|Primeira inicialização não concluída|Aguarde 30 segundos; o dispositivo o anunciará automaticamente|
|Respostas lentas|Latência do servidor LLM|Escolha um modelo mais rápido no xiaozhi.me ou use um servidor próprio|

> Os comandos completos, incluindo a configuração de rede pela porta serial, estão no [manual do protocolo serial](./ESP32-NanoCam-Serial-Protocol.md).

Próximo capítulo: [Capítulo 10: Compreensão visual por IA](./Ch10-AI-Vision-Understanding.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
