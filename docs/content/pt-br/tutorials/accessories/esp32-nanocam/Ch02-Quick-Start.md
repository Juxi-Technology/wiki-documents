---
title: "Capítulo 2: Início rápido"
description: "Capítulo 2 do tutorial do ESP32-NanoCam: grave o firmware e conclua a configuração de rede WiFi (porta serial ou ponto de acesso AP), veja o primeiro quadro MJPEG ao vivo no navegador e conheça os endpoints HTTP."
---

# Capítulo 2: Início rápido

> **[Comprar na loja](https://www.juxitech.com/products/esp32-s3-wifi-video-module)**

**Objetivo do capítulo**: gravar o firmware, concluir a configuração de rede WiFi e ver o primeiro quadro ao vivo do NanoCam no navegador.

## 2.1 Gravação do firmware

### Passos

1. Extraia a pasta → `nanocam_xxx.bin`

2. Abra o [esptool-js](https://espressif.github.io/esptool-js/)

3. Conecte o NanoCam via Type-C

4. Clique em Connect → selecione a porta serial

5. Escolha o arquivo de firmware e preencha o endereço com `0x0`

6. Clique em START → aguarde a conclusão

### Verificação

Conecte o NanoCam com uma ferramenta de porta serial (115200 8N1); você deve ver:

```Plain
NanoCam Board Ver:0.3.0
```

---

## 2.2 Configuração de rede WiFi

> Resultado: **NanoCam conectado ao WiFi, com IP obtido**

### Método A: configuração pela porta serial (mais comum)

```Plain
sta_ssid:你的WiFi名
sta_pd:你的WiFi密码
```

Ao receber `OK` → configuração bem-sucedida. Após alterar a senha, o dispositivo reinicia automaticamente.

> Os comandos seriais completos estão no [manual do protocolo serial](./ESP32-NanoCam-Serial-Protocol.md).

### Método B: conexão direta via ponto de acesso AP

O NanoCam cria seu próprio ponto de acesso: `NanoCam-AP`, senha `12345678`
Conecte o celular e abra `http://192.168.4.1` no navegador

### Verificação

```Plain
sta_ip
```

Retorno: `sta_ip:192.168.x.x` ✅

---

## 2.3 Primeiro quadro

> Resultado: **imagem ao vivo do NanoCam visível no navegador**

1. Digite `http://<IP>` no navegador

2. Veja a imagem MJPEG ao vivo

3. Envie `ai_mode:1` pela porta serial → alterna para a detecção de rosto de gato → a caixa de detecção aparece na imagem

### Descrição dos endpoints

|URL|Uso|
|---|---|
|`http://<IP>/`|Imagem ao vivo (HTML)|
|`http://<IP>/stream`|Fluxo MJPEG puro (legível no OpenCV/VLC)|
|`http://<IP>/status`|Status do dispositivo em JSON|
|`http://<IP>/admin`|Painel de administração web|

Próximo capítulo: [Capítulo 3: Fundamentos da câmera](./Ch03-Camera-Basics.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
