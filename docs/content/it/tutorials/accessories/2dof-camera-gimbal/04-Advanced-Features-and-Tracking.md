---
title: Funzioni avanzate e tracking
---

# Funzioni avanzate e tracking

> **[Acquista nel negozio](https://www.juxitech.com/it/products/2-dof-servo-pan-tilt-unit)**

Questo capitolo descrive in dettaglio le funzioni di tracking automatico del sistema: tracking del colore, tracking del volto, tracking dei QR code, il meccanismo di blocco del target e la messa a punto dei parametri.

---

## Panoramica delle modalità di tracking automatico

Il sistema supporta tre modalità di tracking automatico:
1. Tracking del colore: insegue oggetti di un colore specificato
2. Tracking del volto: insegue i volti
3. Tracking dei QR code: insegue i QR code

---

## Tracking del colore

### Selezione del colore

Il sistema supporta il tracking di diversi colori:
- Rosso
- Verde
- Blu
Nel programma puoi cambiare colore con i tasti:
- `X`: seleziona il rosso
- `Y`: seleziona il verde
- `Z`: seleziona il blu

### Flusso d'uso del tracking del colore

1. Premi `C` per connettere il gimbal
2. Premi `2` per entrare nella modalità tracking del colore
3. Posiziona l'oggetto del colore scelto al centro dell'immagine
4. Premi `T` per bloccare il target
5. Sposta il target e osserva come il gimbal lo segue

### Esempio semplice di tracking del colore

Puoi anche usare il programma di esempio di tracking del colore semplice:

```python
python examples/04_color_track_simple.py --camera 0 --port COM3 --color red
```

Questo programma fornisce la funzione di tracking del colore più elementare ed è adatto all'apprendimento.

---

## Tracking del volto

### Principio del tracking del volto

Il sistema usa il classificatore a cascata Haar di OpenCV per il rilevamento dei volti. Una volta rilevato un volto, il sistema calcola automaticamente la posizione del target e controlla il gimbal per seguirlo.

### Flusso d'uso del tracking del volto

1. Premi `C` per connettere il gimbal
2. Premi `1` per entrare nella modalità tracking del volto
3. Posiziona il volto al centro dell'immagine
4. Premi `T` per bloccare il target
5. Muovi il volto: il gimbal lo seguirà automaticamente

### Consigli per migliorare il tasso di successo del rilevamento dei volti

- Assicura un'illuminazione sufficiente, evita il controluce
- Il volto deve essere rivolto frontalmente verso la camera
- Mantieni una distanza adeguata (consigliati 1-3 metri)
- Evita scene con più volti oppure usa il meccanismo di blocco per fissare il target da inseguire

---

## Tracking dei QR code

La modalità di tracking dei QR code utilizza il QRCodeDetector di OpenCV per riconoscere e localizzare i QR code. L'uso è simile alle due modalità precedenti:
1. Connetti il gimbal ed entra nella modalità tracking dei QR code
2. Posiziona il QR code al centro dell'immagine e premi `T` per bloccare
3. Sposta il QR code e osserva come il gimbal lo segue

---

## Meccanismo di blocco del target

### A cosa serve il blocco

Il meccanismo di blocco del target è una funzione chiave del sistema; i suoi compiti includono:
- Registrare la posizione centrale e le dimensioni del target al momento del blocco
- Quando compaiono più target, dare priorità a quello più vicino al punto di blocco
- Evitare che il target salti continuamente, mantenendo stabile il tracking

### Procedura di blocco

1. Posiziona l'oggetto target al centro dell'immagine
2. Premi `T` per bloccare
3. Dopo il blocco, il sistema darà priorità al target più simile a quello del momento del blocco
4. Premi `S` per annullare il blocco e interrompere il tracking

### Logica di selezione dopo il blocco

Nella selezione del target dopo il blocco, il sistema considera due fattori:
- Distanza: quanto il centro del target è vicino o lontano dal punto di blocco (peso 70%)
- Dimensioni: quanto le dimensioni del target somigliano a quelle del momento del blocco (peso 30%)
- Il sistema sceglie di inseguire il target con il punteggio complessivo più alto

---

## Messa a punto dei parametri di controllo del tracking

In `src/trackers/tracking_controller.py` sono disponibili i seguenti parametri regolabili:

|Parametro|Valore predefinito|Descrizione|
|---|---|---|
|kp_pan|0.08|guadagno proporzionale del tracking orizzontale (pan)|
|kp_tilt|0.12|guadagno proporzionale del tracking verticale (tilt)|
|dead_zone|30|zona morta (pixel): entro questo intervallo il gimbal non si muove|
|min_move_interval|0.15|intervallo minimo di movimento (secondi): limita la frequenza di movimento del gimbal|


### Come regolare i parametri

- **Tracking troppo lento**: aumenta `kp_pan` e `kp_tilt`
- **Tracking troppo sensibile con vibrazioni**: riduci `kp_pan` e `kp_tilt`, oppure aumenta `min_move_interval`, oppure aumenta `dead_zone`
- **Vibrazioni dovute a continue micro-regolazioni**: aumenta `dead_zone`
- **Direzione invertita**: modifica il segno di `delta_pan` o `delta_tilt` nel metodo `calculate_move`

---

## Esempio completo di utilizzo del tracking

Di seguito un esempio completo di flusso d'uso:
1. Avvia il programma:

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3 --color red
```

1. Premi `C` per connettere il gimbal
2. Premi `2` per selezionare la modalità tracking del colore
3. Posiziona l'oggetto rosso al centro dell'immagine
4. Premi `T` per bloccare il target
5. Sposta l'oggetto e osserva come il gimbal lo segue
6. Per passare al verde, premi `Y` e poi di nuovo `T` per bloccare
7. Premi `S` per interrompere il tracking e `R` per centrare il gimbal
8. Premi `Q` per uscire

---

## Suggerimenti per lo sviluppo avanzato

Per personalizzare le funzioni o sviluppare ulteriormente il progetto, puoi consultare:
- `src/sc_servo.py`: livello di comunicazione dei servo
- `src/gimbal.py`: controllo del gimbal
- `src/trackers/tracking_controller.py`: controller del tracking
- `src/detectors/`: i vari rilevatori di target
