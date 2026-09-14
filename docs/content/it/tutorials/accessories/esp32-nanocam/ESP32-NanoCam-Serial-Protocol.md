---
title: ESP32-NanoCam Manuale del protocollo seriale
description: "Manuale del protocollo seriale AT dell'ESP32-NanoCam: riferimento completo dei comandi per configurazione WiFi, cambio della modalità AI, interrogazione delle informazioni, controllo di sistema e riconoscimento facciale."
---

# ESP32-NanoCam Manuale del protocollo seriale

> **[Acquista nel negozio](https://www.juxitech.com/it/products/esp32-s3-wifi-video-module)**


> Baud rate: 115200 | Bit di dati: 8 | Parità: Nessuna | Bit di stop: 1 | Controllo di flusso: Nessuno

> Compatibile con il set di comandi AT dei principali moduli fotocamera; aggiunge i comandi estesi NanoCam.

## 1. Regole generali

- I comandi **non sono sensibili** a maiuscole/minuscole (`STA_SSID` = `sta_ssid`)
- Dopo il comando va inserito **un segno di punteggiatura qualsiasi** (`,` `.` `:` `;` ecc.) come terminatore
- Alcuni comandi, una volta modificati, provocano un **riavvio automatico**
- Ogni comando termina con `\r\n` (gli assistenti seriali lo aggiungono di solito automaticamente)

## 2. Configurazione WiFi

### Modalità STA (collegamento al router)

|Comando|Descrizione|Esempio|Valore restituito|
|---|---|---|---|
|`sta_ssid:名称`|Imposta il nome WiFi|`sta_ssid:MyWiFi`|`OK`|
|`sta_pd:密码`|Imposta la password WiFi (riavvio dopo la modifica)|`sta_pd:12345678`|`OK` (riavvio)|

> Il nome e la password WiFi possono contenere al massimo 30 caratteri; i caratteri cinesi non sono supportati.

### Modalità AP (hotspot autonomo)

|Comando|Descrizione|Esempio|Valore restituito|
|---|---|---|---|
|`ap_ssid:名称`|Imposta il nome dell'hotspot|`ap_ssid:NanoCam-AP`|`OK`|
|`ap_pd:密码`|Imposta la password dell'hotspot (riavvio dopo la modifica)|`ap_pd:12345678`|`OK` (riavvio)|

### Modalità WiFi

|Comando|Descrizione|Parametro|Valore restituito|
|---|---|---|---|
|`wifi_mode:X`|Cambia modalità|0=AP 1=STA 2=AP+STA|`OK` (riavvio in caso di modifica)|

## 3. Cambio della modalità AI

|Comando|Modalità|Descrizione|Riavvio|
|---|---|---|---|
|`ai_mode:0`|Normale|Trasmissione MJPEG, senza AI|✅|
|`ai_mode:1`|Rilevamento muso del gatto|Riquadro del muso del gatto in tempo reale + confidenza|✅|
|`ai_mode:2`|Rilevamento volti|Riquadro del volto in tempo reale + coordinate|✅|
|`ai_mode:3`|Riconoscimento colori|Selezione del colore→rilevamento in tempo reale|✅|
|`ai_mode:4`|Riconoscimento facciale|Registrazione→identificazione→eliminazione|✅|
|`ai_mode:5`|Codici QR|Decodifica in tempo reale→output seriale|✅|
|`ai_mode:6`|Agente LLM|Dialogo vocale XiaoZhi AI + visione AI|✅|
|`ai_mode:7`|ESP-Claw|Controllo vocale + analisi visiva con foto + OpenAI Vision|✅|

> Valori validi di `ai_mode`: 0-7. Fuori intervallo il valore predefinito diventa 0. Dopo la modifica il modulo si riavvia automaticamente e la nuova modalità diventa effettiva.

## 4. Interrogazione delle informazioni

|Comando|Descrizione|Esempio di valore restituito|
|---|---|---|
|`sta_ip`|Interroga l'IP STA|`sta_ip:192.168.1.100`|
|`ap_ip`|Interroga l'IP AP|`ap_ip:192.168.4.1`|
|`wifi_ver`|Interroga la versione del firmware|`NanoCam Board Ver:0.2.0`|

## 5. Controllo di sistema

|Comando|Descrizione|Valore restituito|
|---|---|---|
|`wifi_reset`|Ripristino delle impostazioni di fabbrica (riavvio)|`Reset_OK`|
|`nano_reboot`|Soft reset|`Rebooting...`|
|`nano_info`|Informazioni complete del dispositivo (JSON)|Vedi sotto|

### Esempio di risposta di nano_info

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

## 6. Comandi dedicati al riconoscimento facciale

> Valido solo in ai_mode:4 (modalità riconoscimento facciale).

|Comando|Descrizione|Comportamento delle etichette|Esempio di risposta|
|---|---|---|---|
|`face_eril`|Registra il volto rilevato nell'immagine corrente|"Enroll: ID N" blu, lampeggia per 0.5s|`>>> face enroll triggered`|
|`face_rz`|Entra in modalità riconoscimento facciale continuo|"ID: N" verde / "who?" rosso, **visualizzazione persistente senza scomparire**|`>>> face recognize triggered`|
|`face_del`|Elimina l'ultimo ID volto registrato|"N IDs left" rosso, lampeggia per 0.5s|`>>> face delete triggered`|
|`face_detect`|Esce dalla modalità riconoscimento, torna al solo rilevamento volti|Rimuove tutte le etichette|`>>> face detect mode`|

### Flusso operativo del riconoscimento facciale

```Plaintext
ai_mode:4          # 进入人脸识别模式 (设备自动重启)
face_eril          # 注册人脸 (确保只有一张脸在画面中)
face_rz            # 开始持续识别 — 标签持续显示不消失
face_detect        # 退出识别模式 — 标签清除
face_del           # 删除最后注册的人脸
```

### Avvertenze sul riconoscimento facciale

1. Durante la registrazione assicurarsi che nell'immagine ci sia **un solo volto**, a una distanza di 30-50cm
2. In modalità riconoscimento (`face_rz`) l'etichetta **rimane visualizzata** e non scompare dopo 0.5 secondi — è il nuovo comportamento della versione 0.3.0
3. Per uscire dalla modalità riconoscimento è necessario inviare `face_detect`, altrimenti l'etichetta continua a essere visualizzata
4. I dati biometrici dei volti sono memorizzati nella partizione Flash `fr`, non vanno persi in caso di interruzione dell'alimentazione, per un massimo di 47 ID
5. Il riconoscimento adotta una strategia a salto di frame (inferenza MFN una volta ogni 10 frame)

## 7. Comandi estesi (esclusivi NanoCam)

|Comando|Descrizione|Stato|
|---|---|---|
|`nano_server:url`|Imposta l'indirizzo del server LLM (salvato in NVS)|✅|
|`nano_api_key:key`|Imposta la chiave API LLM (salvata in NVS)|✅|
|`nano_mqtt:broker,port,topic`|Configura il server MQTT|🔨|
|`nano_led:R,G,B`|Imposta il LED RGB (WS2812, GPIO18 DIN)|📋|
|`nano_snap`|Scatta e salva una foto (SPIFFS)|✅|
|`nano_stream:on/off`|Avvia/ferma la trasmissione video|📋|

### nano_server / nano_api_key

|Comando|Descrizione|Esempio|Valore restituito|
|---|---|---|---|
|`nano_server:URL`|Imposta l'indirizzo del server LLM|`nano_server:https://api.openai.com`|`OK server=https://api.openai.com`|
|`nano_api_key:KEY`|Imposta la chiave API|`nano_api_key:sk-xxxx`|`OK`|

> Supporta qualsiasi API compatibile con OpenAI (vLLM / Ollama / modelli locali).
> La modalità ESP-Claw (ai_mode:7) supporta `nano_server`; XiaoZhi AI (ai_mode:6) utilizza una configurazione server separata.

## 8. Avvertenze

1. `sta_pd` / `ap_pd` provocano un riavvio automatico dopo la modifica; al riavvio la nuova password diventa effettiva
2. `ai_mode` provoca un riavvio automatico dopo la modifica (solo se la modalità cambia)
3. In modalità riconoscimento facciale (mode 4) la configurazione via seriale Type-C potrebbe non funzionare (memoria insufficiente)
4. Il nome/la password WiFi non possono superare i 30 caratteri e non possono contenere caratteri cinesi
5. Dopo il comando è necessario un segno di punteggiatura come terminatore

## Prossimi passi

- [Avvio rapido](./ESP32-NanoCam-Quick-Start.md) — flusso completo dal flashing del firmware al cambio della modalità AI

<RelatedProducts slugs="esp32-s3-wifi-module" />
