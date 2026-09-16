---
title: Início rápido do ESP32-NanoCam
description: "Início rápido do módulo ESP32-NanoCam de transmissão de vídeo / visão por IA: grave o firmware, configure o WiFi, veja o vídeo em tempo real."
---

# Início rápido do ESP32-NanoCam

> **[Comprar na loja](https://www.juxitech.com/products/esp32-s3-wifi-video-module)**


O ESP32-NanoCam é o módulo ESP32-S3 de transmissão de vídeo / visão por IA da Juxi Technology (página do produto: [Módulo de Vídeo WiFi ESP32-S3](/pt-br/products/esp32-s3-wifi-module)), com arquitetura de duas placas: placa principal + placa base. Este guia conduz você, em cinco passos, pela gravação do firmware, conexão WiFi, visualização do vídeo e troca de modos de IA.

## Preparação

- Placa principal + placa base do NanoCam (ESP32-S3 N16R8 + CH340K)
- Cabo USB Type-C (com suporte a transferência de dados)
- Computador (Windows / Mac / Linux)
- Módulo de câmera GC2145 (conectado de fábrica)

![Figura 1: Frente da placa principal do ESP32-NanoCam](../../../../../public/images/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start/1.png)

![Figura 2: Placa base do ESP32-NanoCam (alimentação USB-C e gravação via serial)](../../../../../public/images/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start/2.png)

## Passo 1: Gravar o firmware (3 minutos)

### Método A: sem ambiente de desenvolvimento (recomendado)

1. Instale o [driver de porta serial do CH340K](https://www.wch.cn/download/CH341SER_EXE.html)
2. Abra o navegador e acesse o [esptool-js](https://espressif.github.io/esptool-js/)
3. Conecte o NanoCam ao computador com um cabo Type-C
4. Selecione a porta serial, baud rate 115200
5. Localize o arquivo de firmware `nanocam_xxx.bin` dentro do pacote descompactado
6. Selecione o arquivo de firmware `nanocam_xxx.bin`, endereço `0x0`
7. Clique em "START" e aguarde a conclusão

### Método B: linha de comando (avançado)

```Bash
pip install esptool
esptool.py --chip esp32s3 --port COM3 write_flash 0x0 nanocam.bin
```

## Passo 2: Conectar ao WiFi (2 minutos)

O NanoCam opera por padrão em **modo duplo AP+STA simultâneo**, sem necessidade de troca:

- O **hotspot AP** fica sempre ativo; conecte o celular diretamente a `NanoCam-AP` (senha `12345678`) e abra `http://192.168.4.1` no navegador
- **STA com roteador**: configure o WiFi uma única vez

Conecte a porta Type-C do NanoCam com uma ferramenta de porta serial (baud rate **115200 8N1**):

```Plaintext
sta_ssid:MinhaWiFi
sta_pd:MinhaSenha
```

> O retorno `OK` indica que a configuração foi bem-sucedida. Após alterar a senha, o dispositivo reinicia automaticamente.

Para trocar o modo WiFi (normalmente não é necessário):

|Comando|Modo|Descrição|
|---|---|---|
|`wifi_mode:0`|Somente AP|Desativa o STA e mantém apenas o hotspot|
|`wifi_mode:1`|Somente STA|Desativa o hotspot e conecta apenas ao roteador|
|`wifi_mode:2`|AP+STA|Padrão; ambos operam simultaneamente|

## Passo 3: Ver o vídeo (1 minuto)

1. Envie `sta_ip` pela porta serial para obter o IP do STA
2. Digite `http://<endereço IP>` no navegador (ou use `http://192.168.4.1` no modo AP)
3. A página exibe o vídeo em tempo real

## Passo 4: Experimentar a IA (2 minutos)

Envie os comandos a seguir pela porta serial para trocar de modo:

|Comando|Modo|Efeito|
|---|---|---|
|`ai_mode:0`|Transmissão normal|Vídeo MJPEG em tempo real|
|`ai_mode:1`|Detecção de rosto de gato|Caixa de detecção de rosto de gato na imagem|
|`ai_mode:2`|Detecção de rostos|Caixa de detecção de rostos na imagem|
|`ai_mode:3`|Reconhecimento de cor|Selecione a cor → rastreamento em tempo real|
|`ai_mode:4`|Reconhecimento facial|Cadastro → identificação → exclusão|
|`ai_mode:5`|Leitura de QR code|Aponte para o QR code → conteúdo na porta serial|
|`ai_mode:6`|Agente LLM|Ativação por voz "你好小智" (XiaoZhi AI)|
|`ai_mode:7`|ESP-Claw|ESP-Claw AI Agent (framework oficial da Espressif)|

> Cada troca de modo exige reinício manual: pressione o botão RST do módulo — o novo modo entra em vigor após o reinício.

## Passo 5: Integrar ao seu projeto

### Controle com Arduino

```C++
Serial.begin(115200);
Serial.print("ai_mode:2");  // alternar para detecção de rostos
```

### Controle com Python

```Python
import serial
ser = serial.Serial("COM3", 115200)
ser.write(b"ai_mode:1\r\n")  # alternar para detecção de rosto de gato
```

### Ver os comandos completos

Referência completa dos comandos: [Manual do protocolo serial](./ESP32-NanoCam-Serial-Protocol.md).

## Perguntas frequentes

|Problema|Solução|
|---|---|
|Falha na gravação|Verifique se o cabo Type-C suporta dados; segure S2(BOOT) na placa base e ligue|
|Sem imagem|Envie `sta_ip` pela porta serial para confirmar o IP; verifique se estão na mesma rede|
|Câmera não funciona|Verifique se o cabo FPC está bem encaixado com os contatos metálicos para baixo; verifique PWDN(IO12)/RESET(IO14)|
|Não conecta ao WiFi|Envie `wifi_reset` para restaurar os padrões de fábrica e reconfigure|

## Próximos passos

- 📖 [Manual do protocolo serial](./ESP32-NanoCam-Serial-Protocol.md) — referência completa dos comandos AT
- 🎓 [Programa do tutorial](./Ch01-Environment-Setup.md) — tutorial progressivo (11 capítulos neste wiki)
- 🔧 [Especificações de hardware](./ESP32-NanoCam-Hardware-Spec.md) — mapeamento completo dos pinos GPIO
- 🤖 [Guia de integração ROS2](/pt-br/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop) — tutorial de teleoperação sem fio com micro-ROS

<RelatedProducts slugs="esp32-s3-wifi-module" />
