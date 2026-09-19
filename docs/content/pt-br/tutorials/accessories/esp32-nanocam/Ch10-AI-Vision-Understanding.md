---
title: "Capítulo 10: Compreensão visual por IA"
description: "Capítulo 10 do tutorial do ESP32-NanoCam: tire fotos no modo ESP-Claw e chame APIs de visão multimodal para o NanoCam descrever por voz o que vê."
---

# Capítulo 10: Compreensão visual por IA

> **[Comprar na loja](https://www.juxitech.com/products/esp32-s3-wifi-video-module)**

**Objetivo do capítulo**: fazer o NanoCam tirar uma foto e enviá-la a um modelo multimodal de grande porte para "narrar" a cena que ele vê.

## Sobre este capítulo

A compreensão visual por IA é uma função exclusiva do **ESP-Claw (modo 7)** e não é usada no XiaoZhi AI (modo 6).

> Para as ferramentas `self.camera.take_photo` e `self.camera.inspect_image` usadas neste capítulo, o endereço da API de análise visual é entregue automaticamente pelo servidor durante o handshake MCP, pelo campo `capabilities.vision`. O firmware não precisa configurar a URL da API manualmente — isso significa que a configuração da API é feita no console do xiaozhi.me ou no servidor auto-hospedado; para detalhes, consulte o [Capítulo 11: Controle por voz do ESP-Claw](./Ch11-ESP-Claw-Voice-Control.md).

## Princípio

O fluxo completo da análise visual:

```Plain
用户语音 "看看桌上有什么"
  → ASR 语音识别
  → LLM 决策：需要拍照分析 → 调用 self.camera.take_photo 或 self.camera.inspect_image
  → 固件：esp_camera_fb_get() 抓帧 (VGA RGB565)
  → JPEG 压缩
  → 通过 Explain() 发送到服务端下发的 Vision API
  → 多模态 LLM 返回文字描述
  → TTS 语音播报
```

### Diferença entre as duas ferramentas de captura

|Ferramenta|Uso|Quem envia a Vision API|
|---|---|---|
|`self.camera.take_photo`|Tira a foto e usa a capacidade de visão integrada do LLM para descrever|Servidor|
|`self.camera.inspect_image` (exclusiva do NanoCam)|Tira a foto e chama `camera->Explain()` → HTTP POST para uma API multimodal independente|Firmware|

A diferença entre as duas: `take_photo` usa a visão do LLM do servidor XiaoZhi (implementação genérica), enquanto `inspect_image` é a implementação dedicada deste projeto, na qual o firmware chama diretamente uma API multimodal independente (endereço entregue pelo servidor).

## Passos

### 10.1 Garantir o modo ESP-Claw

```Plain
ai_mode:7
```

Após o reinício, o dispositivo entra no modo ESP-Claw.

> Consulte o [manual do protocolo serial](./ESP32-NanoCam-Serial-Protocol.md) para todos os comandos.

### 10.2 Foto + análise por IA

Após a ativação, basta fazer a pergunta em voz alta:

```Plain
💬 "看看这里有什么"
💬 "我面前有杯子吗"
💬 "这本书是什么颜色的"
💬 "桌上放了几个苹果"
💬 "帮我看看这张纸上面写了什么字"
```

O NanoCam tira a foto, faz o upload, analisa e responde o resultado por voz.

### 10.3 Exemplos de reconhecimento de cena

|Entrada de voz|Exemplo de resposta da IA|
|---|---|
|"这是什么" (o que é isto)|"É um notebook preto; ao lado há uma caneca branca de café"|
|"有苹果吗" (tem maçãs?)|"Não vejo maçãs. Há dois livros e uma caneta na mesa"|
|"什么颜色" (de que cor é?)|"O que você está apontando é uma caneca vermelha"|
|"几个杯子" (quantas canecas?)|"Há 2 canecas na imagem"|

## Código

### Callback central de foto + análise

`nanocam_espclaw/main/boards/nanocam/nanocam_board.cc` — registro da ferramenta MCP:

```C++
mcp.AddTool("self.camera.inspect_image",
    "Take a photo with the camera and send it to the vision AI for analysis.",
    PropertyList({ Property("prompt", kPropertyTypeString) }),
    [this](const PropertyList &props) -> ReturnValue {
        auto camera = GetCamera();
        if (!camera->Capture()) {
            return std::string("{\"error\":\"Camera capture failed\"}");
        }
        std::string prompt = props["prompt"].value<std::string>();
        return camera->Explain(prompt);
    });
```

`nanocam_espclaw/main/boards/common/esp32_camera.cc` — implementação do Explain():

```C++
std::string Esp32Camera::Explain(const std::string &question) {
    // explain_url_ é enviado pelo servidor durante o handshake MCP via capabilities.vision.url
    // Capturar quadro → compressão JPEG → HTTP POST para a API multimodal
    // Retornar o resultado da análise do LLM
}
```

### Handshake MCP do servidor (entrega da Vision API)

```json
{
  "capabilities": {
    "vision": {
      "url": "https://api.openai.com/v1/chat/completions",
      "token": "sk-..."
    }
  }
}
```

Ao receber isso, o firmware chama `camera->SetExplainUrl(url, token)` para guardar o endereço da API, usado diretamente nas chamadas seguintes de `inspect_image`.

## Modelos multimodais compatíveis

Ao entregar diferentes valores de `vision.url` pelo servidor, é possível usar qualquer API compatível com OpenAI:

|Modelo|Exemplo de endereço da API|Cenário de uso|
|---|---|---|
|`gpt-4o`|`https://api.openai.com/v1/chat/completions`|Capacidade geral mais forte|
|`gpt-4o-mini`|`https://api.openai.com/v1/chat/completions`|Melhor custo-benefício|
|`qwen-vl-max`|`https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions`|Melhor compreensão de chinês|
|`llava:13b` (Ollama)|`http://localhost:11434/v1/chat/completions`|Totalmente offline|
|`claude-fable-5`|Requer configuração de proxy|Descrições de cena detalhadas|

## Resultado

"看看这里有什么" (veja o que tem aqui) → foto enviada → análise da IA → resposta por voz "I see a red cup on a wooden table" — olhos de IA de verdade.

Próximo capítulo: [Capítulo 11: Controle por voz do ESP-Claw](./Ch11-ESP-Claw-Voice-Control.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
