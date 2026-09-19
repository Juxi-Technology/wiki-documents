---
title: "Capítulo 7: Leitura de código QR"
description: "Capítulo 7 do tutorial do ESP32-NanoCam: use a biblioteca esp-code-scanner para decodificar códigos QR/códigos de barras em tempo real."
---

# Capítulo 7: Leitura de código QR

> **[Comprar na loja](https://www.juxitech.com/products/esp32-s3-wifi-video-module)**

**Objetivo do capítulo**: fazer o NanoCam ler códigos QR/códigos de barras e enviar o resultado decodificado para a porta serial e para a imagem da página web.

## Princípio

Usa a biblioteca pré-compilada esp-code-scanner para decodificar em tempo real códigos QR (QR Code / Barcode) na imagem. O quadro RGB565 da câmera é enviado diretamente ao scanner, sem conversão para escala de cinza. A cada quadro um novo objeto scanner é criado e destruído em seguida, evitando acúmulo de estado interno.

O resultado da decodificação é disponibilizado simultaneamente por:

1. **Log na porta serial**

2. **Buffer compartilhado** `g_last_code`, que guarda o resultado mais recente para sobreposição no fluxo HTTP/MJPEG

3. Sobreposição de texto verde na **parte inferior da imagem da página web**

## Passos

### 7.1 Alternar o modo

```Plain
ai_mode:5
```

> Consulte o [manual do protocolo serial](./ESP32-NanoCam-Serial-Protocol.md) para todos os comandos.

### 7.2 Ler o código

Coloque o código QR diante da câmera; a porta serial exibe:

```Plain
I (xxxxx) qrcode: Decoded [QR-Code]: https://example.com
```

Ao mesmo tempo, um texto verde com o conteúdo decodificado aparece na parte inferior da imagem da página `http://<IP>/`.

### 7.3 Leitura contínua

Aponte para o próximo código e a decodificação é feita automaticamente; o scanner é recriado a cada quadro, funcionando continuamente sem travar.

## Código

### Lógica central de leitura

`main/ai/nano_qrcode.cpp`:

```C++
// Criar um novo objeto scanner a cada quadro
esp_image_scanner_t *scn = esp_code_scanner_create();
esp_code_scanner_config_t cfg = {
    ESP_CODE_SCANNER_MODE_FAST,
    ESP_CODE_SCANNER_IMAGE_RGB565,
    fb->width, fb->height
};
esp_code_scanner_set_config(scn, cfg);
int count = esp_code_scanner_scan_image(scn, fb->buf);
// Decodificação bem-sucedida
const esp_code_scanner_symbol_t result = esp_code_scanner_result(scn);
ESP_LOGI(TAG, "Decoded [%s]: %s", result.type_name, result.data);
// Salvar no buffer compartilhado para sobreposição na página web
snprintf(g_last_code, sizeof(g_last_code), "%s: %s",
         result.type_name, result.data);
esp_code_scanner_destroy(scn);
```

## Resultado

Aponte para o código QR → conteúdo decodificado na porta serial + sobreposição na imagem da página web.

Próximo capítulo: [Capítulo 8: Reconhecimento facial](./Ch08-Face-Recognition.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
