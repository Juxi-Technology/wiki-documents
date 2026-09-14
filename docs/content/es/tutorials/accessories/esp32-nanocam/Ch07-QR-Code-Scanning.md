---
title: "Capítulo 7: Escaneo de códigos QR"
description: "Capítulo 7 del tutorial de ESP32-NanoCam: usa esp-code-scanner para decodificar códigos QR y de barras en tiempo real; el resultado de la decodificación se emite a la vez en el registro del puerto serie y en la imagen de la página web."
---

# Capítulo 7: Escaneo de códigos QR

> **[Comprar en la tienda](https://www.juxitech.com/es/products/esp32-s3-wifi-video-module)**

**Objetivo de este capítulo**: conseguir que NanoCam escanee códigos QR y de barras y emita el resultado de la decodificación en el puerto serie y en la imagen de la página web.

## Principio

Se usa la biblioteca precompilada esp-code-scanner para decodificar en tiempo real los códigos QR (QR Code / Barcode) de la imagen. El fotograma RGB565 que emite la cámara se pasa directamente al escáner, sin conversión a escala de grises. En cada fotograma se crea un objeto escáner nuevo que se destruye nada más escanear, para evitar que se acumule estado interno.

El resultado de la decodificación se emite simultáneamente:

1. En el **registro del puerto serie**

2. En el **búfer compartido** `g_last_code`, que guarda el último resultado para superponerlo en el flujo HTTP/MJPEG

3. Como **texto verde superpuesto en la parte inferior de la imagen de la página web**

## Pasos

### 7.1 Cambiar de modo

```Plain
ai_mode:5
```

> Consulta el [manual del protocolo de puerto serie](./ESP32-NanoCam-Serial-Protocol.md) para ver todos los comandos.

### 7.2 Escanear un código

Coloca un código QR delante de la cámara; el puerto serie emite:

```Plain
I (xxxxx) qrcode: Decoded [QR-Code]: https://example.com
```

A la vez, en la parte inferior de la imagen de la página web `http://<IP>/` aparece el contenido decodificado marcado con texto verde.

### 7.3 Escaneo continuo

Apunta al siguiente código y se decodifica y emite automáticamente; el escáner se recrea en cada fotograma y puede trabajar de forma continua sin caerse.

## Código

### Lógica central de escaneo

`main/ai/nano_qrcode.cpp`:

```C++
// Crear un objeto escáner nuevo en cada fotograma
esp_image_scanner_t *scn = esp_code_scanner_create();
esp_code_scanner_config_t cfg = {
    ESP_CODE_SCANNER_MODE_FAST,
    ESP_CODE_SCANNER_IMAGE_RGB565,
    fb->width, fb->height
};
esp_code_scanner_set_config(scn, cfg);
int count = esp_code_scanner_scan_image(scn, fb->buf);
// Decodificación correcta
const esp_code_scanner_symbol_t result = esp_code_scanner_result(scn);
ESP_LOGI(TAG, "Decoded [%s]: %s", result.type_name, result.data);
// Guardar en el búfer compartido para superponer en la página web
snprintf(g_last_code, sizeof(g_last_code), "%s: %s",
         result.type_name, result.data);
esp_code_scanner_destroy(scn);
```

## Resultado

Apunta al código QR → el puerto serie emite el contenido decodificado + superposición en la imagen de la página web.

Capítulo siguiente: [Capítulo 8: Reconocimiento facial](./Ch08-Face-Recognition.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
