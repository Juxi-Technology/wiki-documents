---
title: "Capitolo 10: Comprensione visiva AI"
description: "Tutorial ESP32-NanoCam capitolo 10: in modalità ESP-Claw scattare una foto e chiamare l'API di visione multimodale per far descrivere a voce a NanoCam ciò che."
---

# Capitolo 10: Comprensione visiva AI

> **[Acquista nel negozio](https://www.juxitech.com/it/products/esp32-s3-wifi-video-module)**

**Obiettivo del capitolo**: far scattare una foto a NanoCam e affidarla all'analisi di un grande modello multimodale, che "racconta" a voce la scena che vede.

## Informazioni su questo capitolo

La comprensione visiva AI è una funzionalità esclusiva di **ESP-Claw (modalità 7)** e non viene usata in XiaoZhi AI (modalità 6).

> Gli strumenti `self.camera.take_photo` e `self.camera.inspect_image` usati in questo capitolo: l'indirizzo dell'API di analisi visiva viene fornito automaticamente dal server durante l'handshake MCP tramite il campo `capabilities.vision`. Il firmware non deve configurare manualmente l'URL dell'API — questo significa che la configurazione dell'API avviene nella console xiaozhi.me o su un server auto-ospitato; per i dettagli vedi il [Capitolo 11: Controllo vocale ESP-Claw](./Ch11-ESP-Claw-Voice-Control.md).

## Come funziona

Il flusso completo dell'analisi visiva:

```Plain
Comando vocale dell'utente "guarda cosa c'è sul tavolo"
  → riconoscimento vocale ASR
  → decisione dell'LLM: serve una foto da analizzare → chiama self.camera.take_photo o self.camera.inspect_image
  → firmware: esp_camera_fb_get() acquisisce un frame (VGA RGB565)
  → compressione JPEG
  → invio tramite Explain() alla Vision API fornita dal server
  → il LLM multimodale restituisce la descrizione testuale
  → annuncio vocale TTS
```

### Differenza tra i due strumenti di scatto

|Strumento|Uso|Chi invia la Vision API|
|---|---|---|
|`self.camera.take_photo`|Scatta e descrive con la capacità vision integrata nel LLM|Server|
|`self.camera.inspect_image` (dedicato a NanoCam)|Scatta e chiama `camera->Explain()` → HTTP POST a un'API multimodale indipendente|Firmware|

La differenza tra i due: `take_photo` passa attraverso la visione LLM del server XiaoZhi (implementazione generica), `inspect_image` è l'implementazione dedicata di questo progetto: il firmware chiama direttamente un'API multimodale indipendente (l'indirizzo è fornito dal server).

## Passaggi

### 10.1 Assicurarsi della modalità ESP-Claw

```Plain
ai_mode:7
```

Dopo il riavvio il dispositivo entra in modalità ESP-Claw.

> Per tutti i comandi vedi il [manuale del protocollo seriale](./ESP32-NanoCam-Serial-Protocol.md).

### 10.2 Scatto + analisi AI

Dopo la parola di attivazione, porre direttamente la domanda:

```Plain
💬 "Guarda cosa c'è qui"
💬 "C'è una tazza davanti a me"
💬 "Di che colore è questo libro"
💬 "Quante mele ci sono sul tavolo"
💬 "Aiutami a vedere cosa c'è scritto su questo foglio"
```

NanoCam scatterà la foto, la caricherà, la analizzerà e risponderà a voce con il risultato.

### 10.3 Esempi di riconoscimento della scena

|Input vocale|Esempio di risposta dell'AI|
|---|---|
|"Cos'è questo"|"Questo è un computer portatile nero, accanto c'è una tazza di caffè bianca"|
|"Ci sono mele"|"Non vedo mele. Sul tavolo ci sono due libri e una penna"|
|"Di che colore è"|"Quello che stai indicando è una tazza rossa"|
|"Quante tazze"|"Nell'immagine ci sono 2 tazze"|

## Codice

### Callback principale di scatto + analisi

`nanocam_espclaw/main/boards/nanocam/nanocam_board.cc` — registrazione dello strumento MCP:

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

`nanocam_espclaw/main/boards/common/esp32_camera.cc` — implementazione di Explain():

```C++
std::string Esp32Camera::Explain(const std::string &question) {
    // explain_url_ viene fornito dal server durante l'handshake MCP tramite capabilities.vision.url
    // acquisizione frame → compressione JPEG → HTTP POST all'API multimodale
    // restituisce il risultato dell'analisi LLM
}
```

### Handshake MCP del server (invio della Vision API)

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

Dopo la ricezione il firmware chiama `camera->SetExplainUrl(url, token)` per salvare l'indirizzo dell'API, usato direttamente nelle successive chiamate a `inspect_image`.

## Modelli multimodali supportati

Fornendo `vision.url` diversi dal server si può usare qualsiasi API compatibile con OpenAI:

|Modello|Esempio di indirizzo API|Scenari d'uso|
|---|---|---|
|`gpt-4o`|`https://api.openai.com/v1/chat/completions`|Massime capacità complessive|
|`gpt-4o-mini`|`https://api.openai.com/v1/chat/completions`|Buon rapporto qualità-prezzo|
|`qwen-vl-max`|`https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions`|Comprensione del cinese migliore|
|`llava:13b` (Ollama)|`http://localhost:11434/v1/chat/completions`|Completamente offline|
|`claude-fable-5`|Richiede la configurazione di un proxy|Descrizioni dettagliate delle scene|

## Risultato

"Guarda cosa c'è qui" → scatto e caricamento → analisi AI → annuncio vocale "I see a red cup on a wooden table" — un vero occhio AI.

Capitolo successivo: [Capitolo 11: Controllo vocale ESP-Claw](./Ch11-ESP-Claw-Voice-Control.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
