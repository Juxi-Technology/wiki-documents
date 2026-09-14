---
title: "Chapitre 7 : Scan de QR codes"
description: "Tutoriel ESP32-NanoCam chapitre 7 : décoder en temps réel les codes-barres / QR codes avec la bibliothèque esp-code-scanner ; résultats affichés simultanément sur le port série et à l'écran web."
---

# Chapitre 7 : Scan de QR codes

> **[Acheter en boutique](https://www.juxitech.com/fr/products/esp32-s3-wifi-video-module)**

**Objectif de ce chapitre** : faire scanner les QR codes / codes-barres par le NanoCam et afficher le résultat du décodage sur le port série et à l'écran web.

## Principe

Utilise la bibliothèque précompilée esp-code-scanner pour décoder en temps réel les codes-barres et QR codes (QR Code / Barcode) présents à l'image. La trame RGB565 fournie par la caméra est transmise directement au scanner, sans conversion en niveaux de gris. Un objet scanner neuf est créé à chaque trame et détruit aussitôt après le scan, ce qui évite l'accumulation d'état interne.

Le résultat du décodage est diffusé simultanément par :

1. **Les journaux du port série**

2. **Le tampon partagé** `g_last_code`, qui conserve le dernier résultat pour la superposition sur le flux HTTP/MJPEG

3. **Le bas de la page web**, où une annotation en texte vert est superposée

## Étapes

### 7.1 Changer de mode

```Plain
ai_mode:5
```

> Pour la liste complète des commandes, voir le [Manuel du protocole série](./ESP32-NanoCam-Serial-Protocol.md).

### 7.2 Scan

Placez le QR code devant la caméra ; le port série affiche :

```Plain
I (xxxxx) qrcode: Decoded [QR-Code]: https://example.com
```

En parallèle, une annotation en texte vert indiquant le contenu décodé apparaît en bas de la page `http://<IP>/`.

### 7.3 Scan continu

Visez le code suivant : le décodage est automatique. Le scanner étant reconstruit à chaque trame, le fonctionnement en continu ne plante pas.

## Code

### Logique de scan principale

`main/ai/nano_qrcode.cpp` :

```C++
// Créer un objet scanner neuf à chaque trame
esp_image_scanner_t *scn = esp_code_scanner_create();
esp_code_scanner_config_t cfg = {
    ESP_CODE_SCANNER_MODE_FAST,
    ESP_CODE_SCANNER_IMAGE_RGB565,
    fb->width, fb->height
};
esp_code_scanner_set_config(scn, cfg);
int count = esp_code_scanner_scan_image(scn, fb->buf);
// Décodage réussi
const esp_code_scanner_symbol_t result = esp_code_scanner_result(scn);
ESP_LOGI(TAG, "Decoded [%s]: %s", result.type_name, result.data);
// Sauvegarder dans le tampon partagé pour la superposition web
snprintf(g_last_code, sizeof(g_last_code), "%s: %s",
         result.type_name, result.data);
esp_code_scanner_destroy(scn);
```

## Résultat

Visez un QR code → sortie du contenu décodé sur le port série + superposition sur la page web.

Chapitre suivant : [Chapitre 8 : Reconnaissance faciale](./Ch08-Face-Recognition.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
