---
title: Manual do protocolo serial do ESP32-NanoCam
description: "Manual do protocolo AT serial do ESP32-NanoCam: referência completa de comandos para configuração de WiFi, alternância de modos de IA."
---

# Manual do protocolo serial do ESP32-NanoCam

> **[Comprar na loja](https://www.juxitech.com/products/esp32-s3-wifi-video-module)**


> Taxa de transmissão: 115200 | Bits de dados: 8 | Paridade: nenhuma | Bits de paragem: 1 | Controlo de fluxo: nenhum

> Compatível com o conjunto de comandos AT dos principais módulos de câmara, com novos comandos de extensão NanoCam.

## 1. Regras gerais

- Os comandos são **insensíveis a maiúsculas/minúsculas** (`STA_SSID` = `sta_ssid`)
- Após o comando é necessário um **sinal de pontuação** (`,` `.` `:` `;`, etc.) como terminador
- Alguns comandos provocam um **reinício automático** após a alteração
- Cada comando termina com `\r\n` (habitualmente adicionado automaticamente pelas ferramentas de porta série)

## 2. Configuração de WiFi

### Modo STA (ligação ao router)

|Comando|Descrição|Exemplo|Valor de retorno|
|---|---|---|---|
|`sta_ssid:名称`|Definir o nome do WiFi|`sta_ssid:MyWiFi`|`OK`|
|`sta_pd:密码`|Definir a palavra-passe do WiFi (reinicia após a alteração)|`sta_pd:12345678`|`OK` (reinício)|

> O nome e a palavra-passe do WiFi têm no máximo 30 caracteres e não suportam chinês.

### Modo AP (hotspot próprio)

|Comando|Descrição|Exemplo|Valor de retorno|
|---|---|---|---|
|`ap_ssid:名称`|Definir o nome do hotspot|`ap_ssid:NanoCam-AP`|`OK`|
|`ap_pd:密码`|Definir a palavra-passe do hotspot (reinicia após a alteração)|`ap_pd:12345678`|`OK` (reinício)|

### Modo WiFi

|Comando|Descrição|Parâmetro|Valor de retorno|
|---|---|---|---|
|`wifi_mode:X`|Alternar o modo|0=AP 1=STA 2=AP+STA|`OK` (reinicia ao alterar)|

## 3. Alternância de modos de IA

|Comando|Modo|Descrição|Reinício|
|---|---|---|---|
|`ai_mode:0`|Normal|Transmissão MJPEG, sem IA|✅|
|`ai_mode:1`|Deteção de rosto de gato|Caixa de deteção de rosto de gato em tempo real + confiança|✅|
|`ai_mode:2`|Deteção de rosto|Caixa de deteção de rosto em tempo real + coordenadas|✅|
|`ai_mode:3`|Reconhecimento de cor|Seleção com caixa→deteção em tempo real|✅|
|`ai_mode:4`|Reconhecimento facial|Registar→identificar→eliminar|✅|
|`ai_mode:5`|QR code|Descodificação em tempo real→saída pela porta série|✅|
|`ai_mode:6`|Agente LLM|Diálogo por voz XiaoZhi AI + visão por IA|✅|
|`ai_mode:7`|ESP-Claw|Controlo por voz + análise visual por fotografia + OpenAI Vision|✅|

> Valores válidos de `ai_mode`: 0-7. Fora do intervalo, assume 0 por predefinição. Reinicia automaticamente após a alteração; o novo modo fica ativo após o reinício.

## 4. Consulta de informações

|Comando|Descrição|Exemplo de retorno|
|---|---|---|
|`sta_ip`|Consultar o IP do STA|`sta_ip:192.168.1.100`|
|`ap_ip`|Consultar o IP do AP|`ap_ip:192.168.4.1`|
|`wifi_ver`|Consultar a versão do firmware|`NanoCam Board Ver:0.2.0`|

## 5. Controlo do sistema

|Comando|Descrição|Valor de retorno|
|---|---|---|
|`wifi_reset`|Restaurar as definições de fábrica (reinício)|`Reset_OK`|
|`nano_reboot`|Reinício por software|`Rebooting...`|
|`nano_info`|Informação completa do dispositivo (JSON)|Ver abaixo|

### Exemplo de retorno do nano_info

```JSON
{
  "device": "NanoCam",
  "ver": "0.2.0",
  "chip": "ESP32-S3",
  "flash": "16MB",
  "psram": "8MB",
  "ai_mode": 1,
  "wifi_mode": 2,
  "sta_ip": "192.168.1.100",
  "free_heap": 245760
}
```

## 6. Comandos exclusivos de reconhecimento facial

> Válido apenas em ai_mode:4 (modo de reconhecimento facial).

|Comando|Descrição|Comportamento da etiqueta|Exemplo de retorno|
|---|---|---|---|
|`face_eril`|Registar o rosto detetado na imagem atual|Azul "Enroll: ID N", pisca 0.5s|`>>> face enroll triggered`|
|`face_rz`|Entrar no modo de reconhecimento facial contínuo|Verde "ID: N" / vermelho "who?", **exibição persistente sem desaparecer**|`>>> face recognize triggered`|
|`face_del`|Eliminar o último ID de rosto registado|Vermelho "N IDs left", pisca 0.5s|`>>> face delete triggered`|
|`face_detect`|Sair do modo de reconhecimento e voltar à deteção de rosto simples|Limpa todas as etiquetas|`>>> face detect mode`|

### Fluxo de operação do reconhecimento facial

```Plaintext
ai_mode:4          # 进入人脸识别模式 (设备自动重启)
face_eril          # 注册人脸 (确保只有一张脸在画面中)
face_rz            # 开始持续识别 — 标签持续显示不消失
face_detect        # 退出识别模式 — 标签清除
face_del           # 删除最后注册的人脸
```

### Notas sobre o reconhecimento facial

1. Ao registar, certifique-se de que há **apenas um rosto** na imagem, a uma distância de 30-50cm
2. No modo de reconhecimento (`face_rz`), a etiqueta **permanece visível**, não desaparece ao fim de 0.5 segundos — este é o novo comportamento da versão 0.3.0
3. Para sair do modo de reconhecimento é necessário enviar `face_detect`; caso contrário, a etiqueta continua a ser exibida
4. As características faciais são armazenadas na partição `fr` da Flash, não se perdem com a falta de energia, até um máximo de 47 IDs
5. O reconhecimento utiliza uma estratégia de salto de frames (inferência MFN a cada 10 frames)

## 7. Comandos de extensão (exclusivos do NanoCam)

|Comando|Descrição|Estado|
|---|---|---|
|`nano_server:url`|Definir o endereço do servidor LLM (guardado na NVS)|✅|
|`nano_api_key:key`|Definir a chave API do LLM (guardada na NVS)|✅|
|`nano_mqtt:broker,port,topic`|Configurar o servidor MQTT|🔨|
|`nano_led:R,G,B`|Definir o LED RGB (WS2812, GPIO18 DIN)|📋|
|`nano_snap`|Fotografar e armazenar (SPIFFS)|✅|
|`nano_stream:on/off`|Iniciar/parar a transmissão de vídeo|📋|

### nano_server / nano_api_key

|Comando|Descrição|Exemplo|Valor de retorno|
|---|---|---|---|
|`nano_server:URL`|Definir o endereço do servidor LLM|`nano_server:https://api.openai.com`|`OK server=https://api.openai.com`|
|`nano_api_key:KEY`|Definir a chave API|`nano_api_key:sk-xxxx`|`OK`|

> Suporta qualquer API compatível com OpenAI (vLLM / Ollama / modelos locais).
> O modo ESP-Claw (ai_mode:7) suporta a utilização de `nano_server`; o XiaoZhi AI (ai_mode:6) usa uma configuração de servidor independente.

## 8. Notas

1. `sta_pd` / `ap_pd` reiniciam automaticamente após a alteração; a nova palavra-passe fica ativa após o reinício
2. `ai_mode` reinicia automaticamente após a alteração (apenas quando o modo muda)
3. No modo de reconhecimento facial (modo 4), a configuração pela porta série Type-C pode falhar (memória insuficiente)
4. O nome/palavra-passe do WiFi não pode exceder 30 caracteres nem conter chinês
5. Após o comando é necessário um sinal de pontuação como terminador

## Próximos passos

- [Início rápido](./ESP32-NanoCam-Quick-Start.md) — fluxo completo desde a gravação do firmware até à alternância de modos de IA

<RelatedProducts slugs="esp32-s3-wifi-module" />
