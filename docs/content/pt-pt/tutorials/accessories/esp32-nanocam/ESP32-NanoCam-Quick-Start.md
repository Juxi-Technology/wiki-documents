---
title: Início rápido do ESP32-NanoCam
description: "Início rápido do módulo de transmissão de vídeo / visão por IA ESP32-NanoCam: gravar o firmware, configurar o WiFi, ver a imagem em tempo real."
---

# Início rápido do ESP32-NanoCam

> **[Comprar na loja](https://www.juxitech.com/products/esp32-s3-wifi-video-module)**


O ESP32-NanoCam é o módulo de transmissão de vídeo / visão por IA ESP32-S3 da Juxi Technology (página do produto: [Módulo de Vídeo WiFi ESP32-S3](/pt-pt/products/esp32-s3-wifi-module)), com arquitetura de duas placas (placa de núcleo + placa base). Este guia apresenta, em cinco passos, a gravação do firmware, a ligação ao WiFi, a visualização da imagem e a alternância dos modos de IA.

## Preparação

- Placa de núcleo NanoCam + placa base (ESP32-S3 N16R8 + CH340K)
- Cabo USB Type-C (com suporte a transferência de dados)
- Computador (Windows / Mac / Linux)
- Módulo de câmara GC2145 (ligado de fábrica)

![Figura 1: frente da placa de núcleo do ESP32-NanoCam](../../../../../public/images/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start/1.png)

![Figura 2: placa base do ESP32-NanoCam (alimentação USB-C e gravação pela porta serial)](../../../../../public/images/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start/2.png)

## Passo 1: gravar o firmware (3 minutos)

### Método A: sem ambiente de desenvolvimento (recomendado)

1. Instale o [controlador de porta serial CH340K](https://www.wch.cn/download/CH341SER_EXE.html)
2. Abra o navegador e aceda ao [esptool-js](https://espressif.github.io/esptool-js/)
3. Ligue o NanoCam ao computador com um cabo Type-C
4. Selecione a porta serial, à taxa de transmissão de 115200
5. Localize o ficheiro de firmware `nanocam_xxx.bin` dentro do pacote descomprimido
6. Selecione o ficheiro de firmware `nanocam_xxx.bin` no endereço `0x0`
7. Clique em "START" e aguarde a conclusão

### Método B: linha de comandos (avançado)

```Bash
pip install esptool
esptool.py --chip esp32s3 --port COM3 write_flash 0x0 nanocam.bin
```

## Passo 2: ligar ao WiFi (2 minutos)

O NanoCam funciona por predefinição em **modo duplo AP+STA em simultâneo**, sem necessidade de alternar:

- O **hotspot AP** está sempre ativo; ligue o telemóvel diretamente a `NanoCam-AP` (palavra-passe `12345678`) e abra `http://192.168.4.1` no navegador
- A **ligação STA ao router** requer uma configuração única do WiFi

Use uma ferramenta de porta serial (taxa de transmissão **115200 8N1**) para ligar à porta Type-C do NanoCam:

```Plaintext
sta_ssid:你的WiFi名称
sta_pd:你的WiFi密码
```

> Ao receber `OK`, a configuração foi bem-sucedida. Após a alteração da palavra-passe, o dispositivo reinicia automaticamente.

Se precisar de alternar o modo WiFi (normalmente não é necessário):

|Comando|Modo|Descrição|
|---|---|---|
|`wifi_mode:0`|Apenas AP|Desativa o STA e mantém apenas o hotspot|
|`wifi_mode:1`|Apenas STA|Desativa o hotspot e liga-se apenas ao router|
|`wifi_mode:2`|AP+STA|Predefinição, ambos funcionam em simultâneo|

## Passo 3: abrir a imagem (1 minuto)

1. Envie `sta_ip` pela porta serial para obter o IP do STA
2. Introduza `http://<endereço IP>` no navegador (ou `http://192.168.4.1` em modo AP)
3. A página web mostra a imagem em tempo real

## Passo 4: explorar a IA (2 minutos)

Envie os seguintes comandos pela porta serial para alternar os modos:

|Comando|Modo|Efeito|
|---|---|---|
|`ai_mode:0`|Transmissão normal|Imagem MJPEG em tempo real|
|`ai_mode:1`|Deteção de rosto de gato|Aparece a caixa de deteção de rosto de gato na imagem|
|`ai_mode:2`|Deteção de rosto|Aparece a caixa de deteção de rosto na imagem|
|`ai_mode:3`|Reconhecimento de cor|Selecione a cor com uma caixa → rastreamento em tempo real|
|`ai_mode:4`|Reconhecimento facial|Registar → identificar → eliminar|
|`ai_mode:5`|Leitura de QR code|Aponte para o QR code → conteúdo enviado pela porta serial|
|`ai_mode:6`|Agente LLM|Ativação por voz "你好小智" (XiaoZhi AI)|
|`ai_mode:7`|ESP-Claw|ESP-Claw AI Agent (estrutura oficial da Espressif)|

> Cada mudança de modo requer um reinício manual; pode reiniciar premindo o botão RST do módulo. O novo modo fica ativo após o reinício.

## Passo 5: integrar no seu projeto

### Controlo com Arduino

```C++
Serial.begin(115200);
Serial.print("ai_mode:2");  // 切换到人脸检测
```

### Controlo com Python

```Python
import serial
ser = serial.Serial("COM3", 115200)
ser.write(b"ai_mode:1\r\n")  # 切换到猫脸检测
```

### Ver todos os comandos

Referência completa dos comandos: [Manual do protocolo serial](./ESP32-NanoCam-Serial-Protocol.md).

## Perguntas frequentes

|Problema|Solução|
|---|---|
|Falha na gravação|Verifique se o cabo Type-C suporta dados; mantenha o botão S2 (BOOT) da placa base premido e volte a ligar a alimentação|
|Sem imagem|Envie `sta_ip` pela porta serial para confirmar o IP; verifique se está na mesma sub-rede|
|Câmara não funciona|Verifique se os contactos metálicos do cabo FPC estão virados para baixo e bem encaixados; verifique PWDN(IO12)/RESET(IO14)|
|WiFi não liga|Envie `wifi_reset` para restaurar as definições de fábrica e configure novamente|

## Próximos passos

- 📖 [Manual do protocolo serial](./ESP32-NanoCam-Serial-Protocol.md) — referência completa dos comandos AT
- 🎓 [Programa do tutorial](./Ch01-Environment-Setup.md) — tutorial progressivo (11 capítulos neste wiki)
- 🔧 [Especificações de hardware](./ESP32-NanoCam-Hardware-Spec.md) — mapeamento completo dos pinos GPIO
- 🤖 [Guia de integração ROS2](/pt-pt/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop) — tutorial de teleoperação sem fios com micro-ROS

<RelatedProducts slugs="esp32-s3-wifi-module" />
