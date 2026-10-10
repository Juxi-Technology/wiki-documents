---
title: Uso di base
---

# Uso di base

> **[Acquista nel negozio](https://www.juxitech.com/it/products/2-dof-servo-pan-tilt-unit)**

Questo capitolo descrive in dettaglio i metodi di controllo di base e il flusso d'uso del gimbal, per aiutare l'utente a familiarizzare con le operazioni fondamentali.

---

## Panoramica delle modalità di controllo

Il sistema del gimbal supporta due modalità principali di controllo:
1. Controllo da tastiera: controllo manuale del movimento del gimbal tramite i tasti della tastiera
2. Tracking automatico: il sistema rileva e insegue automaticamente il target

---

## Controllo da tastiera

### Descrizione delle scorciatoie da tastiera

Di seguito le scorciatoie da tastiera disponibili nel programma principale:

|Tasto|Funzione|
|---|---|
|Freccia ←|Ruota il gimbal verso sinistra|
|Freccia →|Ruota il gimbal verso destra|
|Freccia ↑|Inclina il gimbal verso l'alto|
|Freccia ↓|Inclina il gimbal verso il basso|
|C|Connetti o disconnetti il gimbal|
|R|Centra il gimbal (ritorno alla posizione iniziale)|
|1|Passa alla modalità tracking del volto|
|2|Passa alla modalità tracking del colore|
|T|Blocca/avvia il tracking del target|
|S|Interrompi il tracking|
|X|Modalità colore: tracking degli oggetti rossi|
|Y|Modalità colore: tracking degli oggetti verdi|
|Z|Modalità colore: tracking degli oggetti blu|
|Q|Esci dal programma|


### Esempio di controllo da tastiera indipendente

Puoi anche esercitarti con un programma separato di controllo da tastiera:

```python
python examples/keyboard_control.py --port COM3
```

Questo programma offre solo le funzioni di base di controllo del gimbal ed è adatto a chi inizia.

---

## Flusso operativo di base

### Avvio e connessione

1. Avvia il programma principale con il comando seguente:

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3
```

1. Dopo l'avvio del programma, premi `C` per connettere il gimbal
2. Osserva se i servo rispondono correttamente; in caso di anomalie consulta il capitolo sulla risoluzione dei problemi

### Esercizi di controllo manuale

1. Premi i tasti freccia e osserva se il movimento del gimbal corrisponde alle aspettative
2. Esercitati a spostare il gimbal in posizioni diverse con i tasti freccia
3. Premi `R` per centrare il gimbal
4. Prendi familiarità con i limiti minimo e massimo di posizione del gimbal
Ti consigliamo i seguenti esercizi:
- Esercizio 1: porta il gimbal nelle quattro posizioni estreme (più a sinistra, più a destra, più in alto, più in basso) per familiarizzare con l'intervallo di posizione
- Esercizio 2: centra il gimbal da una posizione qualsiasi e osserva se il ritorno al centro è fluido
- Esercizio 3: prova regolazioni di precisione per familiarizzare con la precisione di movimento dei servo

---

## Programmi di esempio di base

Il progetto fornisce alcuni programmi di esempio progressivi per l'apprendimento:

### Solo visualizzazione della camera

```python
python examples/01_camera_only.py --camera 0
```

Questo programma apre solo la camera e mostra l'immagine in tempo reale, senza controllo del gimbal. Adatto a verificare il corretto funzionamento della camera.

### Solo controllo del gimbal

```python
python examples/02_gimbal_only.py --port COM3
```

Questo programma offre solo il controllo del gimbal, senza camera. Adatto a verificare il collegamento tra servo e scheda driver.

### Camera e gimbal combinati

```python
python examples/03_simple_gimbal_camera.py --camera 0 --port COM3
```

Questo programma combina la visualizzazione della camera con il controllo del gimbal: puoi osservare l'effetto congiunto di immagine e gimbal.

---

## Precauzioni d'uso

Durante l'uso, tieni presente quanto segue:
1. Dopo aver connesso il gimbal, verifica che i servo siano alimentati
2. Durante il controllo manuale, evita di sostare a lungo nelle posizioni estreme
3. Evita urti violenti al supporto del gimbal durante l'uso
4. Se i servo vibrassero in modo anomalo o emettessero rumori insoliti, togli subito l'alimentazione e controlla
5. Se non usi il dispositivo per lunghi periodi, è consigliabile scollegare l'alimentazione
