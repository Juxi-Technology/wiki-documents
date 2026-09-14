---
title: "Capitolo 7: Scansione dei codici QR"
description: "Tutorial ESP32-NanoCam capitolo 7: decodificare in tempo reale codici QR e codici a barre con esp-code-scanner; il risultato della decodifica viene emesso sia nel log seriale sia nell'immagine della pagina web."
---

# Capitolo 7: Scansione dei codici QR

> **[Acquista nel negozio](https://www.juxitech.com/it/products/esp32-s3-wifi-video-module)**

**Obiettivo del capitolo**: far scansionare a NanoCam codici QR e codici a barre, inviando il risultato della decodifica alla seriale e all'immagine della pagina web.

## Come funziona

Usa la libreria precompilata esp-code-scanner per decodificare in tempo reale i codici QR (QR Code / Barcode) presenti nell'immagine. Il frame RGB565 emesso dalla fotocamera viene passato direttamente allo scanner, senza conversione in scala di grigi. A ogni frame viene creato un nuovo oggetto scanner, distrutto subito dopo la scansione, per evitare l'accumulo di stato interno.

Il risultato della decodifica viene fornito contemporaneamente tramite:

1. **Log seriale**

2. **Buffer condiviso** `g_last_code` che salva l'ultimo risultato, per la sovrapposizione nello stream HTTP/MJPEG

3. **Testo verde sovrapposto in fondo all'immagine della pagina web**

## Passaggi

### 7.1 Cambiare modalità

```Plain
ai_mode:5
```

> Per tutti i comandi vedi il [manuale del protocollo seriale](./ESP32-NanoCam-Serial-Protocol.md).

### 7.2 Scansione

Mettere il codice QR davanti alla fotocamera; la seriale emette:

```Plain
I (xxxxx) qrcode: Decoded [QR-Code]: https://example.com
```

Contemporaneamente, in fondo alla pagina `http://<IP>/` compare il testo verde con il contenuto decodificato.

### 7.3 Scansione continua

Puntare al codice successivo: la decodifica avviene automaticamente; lo scanner viene ricreato a ogni frame e può lavorare in continuo senza crash.

## Codice

### Logica di scansione principale

`main/ai/nano_qrcode.cpp`:

```C++
// crea un nuovo oggetto scanner a ogni frame
esp_image_scanner_t *scn = esp_code_scanner_create();
esp_code_scanner_config_t cfg = {
    ESP_CODE_SCANNER_MODE_FAST,
    ESP_CODE_SCANNER_IMAGE_RGB565,
    fb->width, fb->height
};
esp_code_scanner_set_config(scn, cfg);
int count = esp_code_scanner_scan_image(scn, fb->buf);
// decodifica riuscita
const esp_code_scanner_symbol_t result = esp_code_scanner_result(scn);
ESP_LOGI(TAG, "Decoded [%s]: %s", result.type_name, result.data);
// salva nel buffer condiviso per la sovrapposizione nella pagina web
snprintf(g_last_code, sizeof(g_last_code), "%s: %s",
         result.type_name, result.data);
esp_code_scanner_destroy(scn);
```

## Risultato

Puntare al codice QR → la seriale emette il contenuto decodificato + sovrapposizione nell'immagine della pagina web.

Capitolo successivo: [Capitolo 8: Riconoscimento facciale](./Ch08-Face-Recognition.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
