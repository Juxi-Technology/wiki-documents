---
title: "Capitolo 8: Riconoscimento facciale"
description: "Tutorial ESP32-NanoCam, capitolo 8: registrare i volti e riconoscere le persone in tempo reale, con gestione dei volti noti e risoluzione dei problemi."
---

# Capitolo 8: Riconoscimento facciale

> **[Acquista nel negozio](https://www.juxitech.com/it/products/esp32-s3-wifi-video-module)**

**Obiettivo del capitolo**: registrare le caratteristiche del volto, far riconoscere a NanoCam "chi sei" e costruire una soluzione completa di controllo accessi.

## Come funziona

Riconoscimento facciale = **rilevamento del volto** (pipeline a due stadi MSR01+MNP01) + **estrazione delle caratteristiche** (rete neurale MFN FaceRecognition112V1S8) + **confronto per similarità coseno**.

```Plain
Frame RGB565 dalla fotocamera
  → rilevamento grossolano MSR01 (320×240, soglia 0.3F)
  → rilevamento fine MNP01 (sui candidati del rilevamento grossolano, soglia 0.4F)
  → estrazione di 10 keypoint del volto (occhi/estremità del naso/angoli della bocca)
  → allineamento sui keypoint → ritaglio volto 112×112
  → rete convoluzionale MFN → vettore di caratteristiche a 512 dimensioni
  → normalizzazione L2
  → calcolo della distanza coseno con i vettori di tutti gli ID registrati nel Flash
  → similarità coseno massima > soglia (0.55) → corrispondenza trovata → output ID
  → tutte le similarità < soglia → sconosciuto → output "who?"
```

### Ottimizzazione delle prestazioni

L'estrazione delle caratteristiche MFN e il confronto con l'intera libreria sono onerosi in termini di calcolo; eseguirli a ogni frame causerebbe scatti nell'immagine. L'implementazione attuale adotta una **strategia di salto dei frame**: il rilevamento del volto viene eseguito a ogni frame (economico), il riconoscimento MFN ogni 10 frame (costoso), e l'etichetta usa l'ultimo risultato di riconoscimento, sovrapposto in modo continuo. Così l'immagine resta fluida e l'etichetta ID non lampeggia.

### Memorizzazione delle caratteristiche del volto

Le caratteristiche registrate (id + embedding a 512 dimensioni) sono memorizzate in modo persistente nella partizione `fr` del Flash (96 KB, massimo 47 ID volto). Non si perdono allo spegnimento.

## Preparazione hardware

- Scheda core NanoCam + scheda base

- Cavo dati USB-C (collegato al computer per alimentazione + seriale)

- Terminale seriale (baud rate 115200)

## Passaggi

### 8.1 Entrare in modalità riconoscimento facciale

```Plain
ai_mode:4
```

Il dispositivo si riavvia automaticamente entrando in modalità FaceID; il LED RGB WS2812 (GPIO18 DIN, alimentazione VDD50) mostra il colore viola. Dopo il riavvio sulla seriale si dovrebbe vedere:

```Plain
I (5526) MFN: fr partition size: 98304 bytes, maxminum 47 IDs can be stored
I (5526) MFN: No face ID in flash
```

`No face ID in flash` significa che nessun volto è ancora stato registrato: è normale.

### 8.2 Registrare un volto

Mettere il volto davanti alla fotocamera (distanza 30-50cm, illuminazione uniforme) e assicurarsi che nell'immagine ci sia **un solo volto**. Inviare dalla seriale:

```Plain
face_eril
```

Dopo aver rilevato il volto, il dispositivo estrae automaticamente le caratteristiche e le registra nel Flash:

```Plain
I (xxxx) ENROLL: ID 1 is enrolled
```

Nell'immagine viene sovrapposto il testo blu `Enroll: ID 1`, che scompare dopo circa 0,5 secondi.

> **Attenzione**: il comando è `face_eril` (abbreviazione di enroll), non `face_enroll`. Se appare `fail: unknown command`, controllare l'ortografia.

### 8.3 Riconoscere un volto

Dopo la registrazione inviare il comando di riconoscimento:

```Plain
face_rz
```

Il sistema entra in modalità riconoscimento continuo. Il volto attuale viene confrontato con tutti gli ID registrati nel Flash:

- **Corrispondenza trovata**: la seriale emette `Similarity: 0.85, Match ID: 1` e nell'immagine resta sovrapposto in verde `ID: 1`

- **Sconosciuto**: la seriale emette `Similarity: 0.32, Match ID: 0` e nell'immagine resta sovrapposto in rosso `who?`

> L'etichetta **resta visualizzata** e non scompare. Per uscire dalla modalità riconoscimento inviare `face_detect` per tornare alla modalità di solo rilevamento.

### 8.4 Eliminare un volto

```Plain
face_del
```

Elimina l'ultimo ID volto registrato; la seriale restituisce `N IDs left` e nell'immagine compare brevemente il numero di ID rimanenti. Le caratteristiche nel Flash vengono cancellate contemporaneamente.

### 8.5 Uscire dalla modalità riconoscimento

```Plain
face_detect
```

Torna alla modalità di solo rilevamento del volto (solo riquadro + keypoint, senza riconoscimento); le etichette ID vengono cancellate.

> **Sulla modalità DETECT**: sull'ESP32-S3 la stampa seriale delle coordinate in modalità di solo rilevamento del volto è disabilitata (`#if !CONFIG_IDF_TARGET_ESP32S3`), per evitare che la seriale venga inondata dai log di rilevamento. Solo entrando in modalità riconoscimento (`face_rz`) vengono emessi i log delle coordinate `detection_result`.

## Riferimento rapido dei comandi

|Comando|Funzione|Comportamento dell'etichetta|Persistenza|
|---|---|---|---|
|`face_eril`|Registra il volto attualmente rilevato|Blu "Enroll: ID N"|Lampeggia per 0,5 s|
|`face_rz`|Entra in modalità riconoscimento continuo|Verde "ID: N" / rossa "who?"|✅ Persistente|
|`face_del`|Elimina l'ultimo ID registrato|Rossa "N IDs left"|Lampeggia per 0,5 s|
|`face_detect`|Esce dal riconoscimento, torna al solo rilevamento|Cancella tutte le etichette|—|

> Per tutti i comandi vedi il [manuale del protocollo seriale](./ESP32-NanoCam-Serial-Protocol.md).

## Esempio di flusso operativo

```Plain
ai_mode:4                          # entra in modalità riconoscimento facciale
[il dispositivo si riavvia, LED viola]

face_eril                          # registra il primo volto (Mario)
→ ID 1 is enrolled

face_eril                          # registra il secondo volto (Luca)
→ ID 2 is enrolled

face_rz                            # avvia il riconoscimento continuo
→ Mario davanti alla fotocamera: l'immagine mostra in continuo "ID: 1"
→ Luca davanti alla fotocamera: l'immagine mostra in continuo "ID: 2"
→ Sconosciuto davanti alla fotocamera: l'immagine mostra in continuo "who?"

face_detect                        # esce dalla modalità riconoscimento
→ le etichette scompaiono, resta solo il riquadro di rilevamento

face_del                           # elimina Luca (ID 2)
→ 1 IDs left

face_rz                            # nuovo riconoscimento
→ Mario davanti alla fotocamera: "ID: 1"
→ Luca davanti alla fotocamera: "who?" (eliminato)
```

> La modalità riconoscimento facciale occupa molta memoria (modello MFN + doppio modello di rilevamento del volto); la seriale Type-C (UART0) funziona normalmente. Se la seriale non risponde, controllare prima che il baud rate sia 115200.

## Codice

### Logica di riconoscimento principale

`components/modules/ai/who_human_face_recognition.cpp` — strategia di riconoscimento con salto dei frame:

```C++
case RECOGNIZE:
{
    // salto dei frame: 1 riconoscimento MFN ogni 10 rilevamenti
    static int recog_skip = 0;
    if (recog_skip <= 0) {
        recognize_result = recognizer->recognize(
            (uint16_t *)frame->buf,
            {(int)frame->height, (int)frame->width, 3},
            detect_results.front().keypoint);
        recog_skip = 10;
    }
    recog_skip--;
    frame_show_state = SHOW_STATE_RECOGNIZE;
    break;
}
```

## Risoluzione dei problemi

|Sintomo|Causa possibile|Soluzione|
|---|---|---|
|`No face ID in flash`|Normale, nessuna registrazione effettuata|Inviare `face_eril` per registrare|
|Il risultato del riconoscimento è sempre `who?`|Illuminazione insufficiente / angolazione sfavorevole / similarità sotto la soglia|Registrare di nuovo, davanti alla fotocamera, con illuminazione uniforme|
|Nessuna reazione durante la registrazione|Nell'immagine i volti non sono esattamente 1|Assicurarsi che ci sia un solo volto, a 30-50cm di distanza|
|Scatti nell'immagine durante il riconoscimento|Normale, l'inferenza MFN richiede tempo|Già ottimizzato con il salto dei frame: esecuzione ogni 10 frame|
|Etichetta che lampeggia|—|Già risolto: l'etichetta resta visualizzata senza sparire|
|`fail: unknown command`|Errore di ortografia del comando|Controllare il comando: è `face_eril`, non `face_enroll`|

## Risultato

Registrare il volto → riconoscimento continuo con visualizzazione dell'ID → output dei risultati via I2C/seriale → controllo di relè e servomotori: soluzione completa di controllo accessi.

Capitolo successivo: [Capitolo 9: Conversazione vocale](./Ch09-Voice-Chat.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
