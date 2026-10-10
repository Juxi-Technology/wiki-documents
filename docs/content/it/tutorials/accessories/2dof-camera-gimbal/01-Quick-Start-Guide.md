---
title: Guida rapida
---

# Guida rapida

> **[Acquista nel negozio](https://www.juxitech.com/it/products/2-dof-servo-pan-tilt-unit)**

> Per gli utenti con hardware già assemblato che desiderano provare rapidamente le funzionalità

---

## Passo 0: Ricerca dei dispositivi disponibili

Prima di iniziare, dobbiamo individuare la camera e la porta seriale corrette.

### Ricerca delle camere disponibili

```python
python examples/list_cameras.py
```

Il programma elenca tutte le camere disponibili con i relativi indici; annota l'indice che ti serve (di solito 0).

### Ricerca delle porte seriali disponibili

```python
python examples/list_ports.py
```

Il programma elenca tutte le porte seriali disponibili: in Windows sono COM3, COM4 ecc., in Linux /dev/ttyUSB0 ecc.

---

## Passo 1: Installazione delle dipendenze

```python
pip install -r requirements.txt
```

---

## Passo 2: Esecuzione in ordine dei tutorial passo passo (opzionale ma consigliata)

Per comprendere meglio il sistema, ti consigliamo di eseguire questi programmi nell'ordine:
1. **01_camera_only.py** - mostra solo l'immagine della camera, senza connettere il gimbal

```python
python examples/01_camera_only.py --camera 0
```

Funzione: verifica il corretto funzionamento della camera
1. **02_gimbal_only.py** - controlla solo il gimbal, senza camera

```python
python examples/02_gimbal_only.py --port COM3
```

Funzione: verifica il collegamento tra servo e scheda driver
1. **03_simple_gimbal_camera.py** - camera e gimbal combinati

```python
python examples/03_simple_gimbal_camera.py --camera 0 --port COM3
```

Funzione: controlla manualmente il gimbal mentre visualizzi l'immagine della camera
1. **04_color_track_simple.py** - tracking del colore semplice (senza blocco)

```python
python examples/04_color_track_simple.py --camera 0 --port COM3 --color red
```

Funzione: la demo di tracking automatico più elementare

---

## Passo 3: Esecuzione del programma completo

Una volta acquisita familiarità con le funzioni di base, avvia il programma completo di tracking automatico:

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3 --color red
```

---

## Scorciatoie da tastiera del programma completo


|Tasto|Funzione|
|---|---|
|1|Passa alla modalità tracking del volto|
|2|Passa alla modalità tracking del colore|
|C|Connetti il gimbal|
|R|Centra il gimbal|
|T|Blocca/avvia il tracking del target|
|S|Interrompi il tracking|
|X|Modalità colore: rosso|
|Y|Modalità colore: verde|
|Z|Modalità colore: blu|
|Q|Esci dal programma|


---

## Flusso di prova rapida

### Prova del tracking del colore

1. Premi `C` per connettere il gimbal
2. Premi `2` per entrare nella modalità tracking del colore
3. Porta al centro dell'immagine un oggetto rosso (o di un altro colore)
4. Premi `T` per bloccare il target
5. Sposta l'oggetto e osserva il gimbal che lo segue

### Prova del tracking del volto

1. Premi `C` per connettere il gimbal
2. Premi `1` per entrare nella modalità tracking del volto
3. Posiziona il volto al centro dell'immagine
4. Premi `T` per bloccare il target
5. Muovi il volto e osserva il gimbal che lo segue

---

## Risposte rapide alle domande frequenti

D: Il programma segnala che non trova la porta seriale?
R: Esegui `list_ports.py` per visualizzare le porte seriali disponibili, poi specificane una con il parametro `--port`.
D: La camera non si apre?
R: Esegui `list_cameras.py` per visualizzare le camere disponibili e indica l'indice con il parametro `--camera`.
D: Il gimbal non si muove?
R: Verifica di aver connesso il gimbal con `C` e che l'alimentazione dei servo sia attiva.
D: La direzione del tracking è invertita?
R: Consulta il capitolo sulla risoluzione dei problemi.
