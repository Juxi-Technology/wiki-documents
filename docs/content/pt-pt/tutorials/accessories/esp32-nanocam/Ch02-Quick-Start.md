---
title: "Capítulo 2: Início rápido"
description: "Tutorial ESP32-NanoCam, Capítulo 2: gravar o firmware e configurar a rede WiFi (pela porta serial ou pelo hotspot AP)."
---

# Capítulo 2: Início rápido

> **[Comprar na loja](https://www.juxitech.com/products/esp32-s3-wifi-video-module)**

**Objetivo deste capítulo**: gravar o firmware, configurar a rede WiFi e ver o primeiro fotograma da imagem em tempo real do NanoCam no navegador.

## 2.1 Gravação do firmware

### Passos

1. Descomprima a pasta → `nanocam_xxx.bin`

2. Abra o [esptool-js](https://espressif.github.io/esptool-js/)

3. Ligue o NanoCam por Type-C

4. Clique em Connect → selecione a porta serial

5. Escolha o ficheiro de firmware e preencha o endereço com `0x0`

6. Clique em START → aguarde a conclusão

### Verificação

Ligue a ferramenta de porta serial (115200 8N1) ao NanoCam; deverá ver:

```Plain
NanoCam Board Ver:0.3.0
```

---

## 2.2 Configuração da rede WiFi

> Resultado: **NanoCam ligado ao WiFi, com IP atribuído**

### Método A: configuração da rede pela porta serial (o mais comum)

```Plain
sta_ssid:o_nome_da_tua_rede_WiFi
sta_pd:a_palavra_passe_da_tua_rede_WiFi
```

Receber `OK` → configuração bem-sucedida. Após a alteração da palavra-passe, o dispositivo reinicia automaticamente.

> Consulte o [manual do protocolo da porta serial](./ESP32-NanoCam-Serial-Protocol.md) para a lista completa de comandos da porta serial.

### Método B: ligação direta ao hotspot AP

O NanoCam tem o seu próprio hotspot: `NanoCam-AP`, palavra-passe `12345678`
Depois de o telemóvel se ligar, abra `http://192.168.4.1` no navegador

### Verificação

```Plain
sta_ip
```

Devolve: `sta_ip:192.168.x.x` ✅

---

## 2.3 O primeiro fotograma

> Resultado: **imagem em tempo real do NanoCam visível no navegador**

1. Escreva `http://<endereço IP>` no navegador

2. Verá a imagem MJPEG em tempo real

3. Envie `ai_mode:1` pela porta serial → muda para deteção de caras de gato → aparece a caixa de deteção na imagem

### Descrição dos endpoints

|URL|Utilização|
|---|---|
|`http://<IP>/`|Imagem em tempo real (HTML)|
|`http://<IP>/stream`|Fluxo MJPEG puro (legível por OpenCV/VLC)|
|`http://<IP>/status`|Estado do dispositivo em JSON|
|`http://<IP>/admin`|Painel de administração web|

Próximo capítulo: [Capítulo 3: Noções básicas da câmara](./Ch03-Camera-Basics.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
