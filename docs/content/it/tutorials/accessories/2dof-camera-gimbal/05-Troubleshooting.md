---
title: Risoluzione dei problemi
---

# Risoluzione dei problemi

> **[Acquista nel negozio](https://www.juxitech.com/it/products/2-dof-servo-pan-tilt-unit)**

Questo capitolo riassume i problemi più comuni e le relative soluzioni, per aiutarti a individuare e risolvere rapidamente i vari problemi riscontrati durante l'uso.

---

## Problemi hardware

### Il servo non risponde

**Possibili cause:**
1. L'alimentazione dei servo non è collegata
2. Collegamento difettoso tra servo e scheda driver
3. Connessione seriale non riuscita
4. Servo non abilitati
**Soluzioni:**
1. Controlla che l'alimentazione dei servo sia collegata correttamente e attiva
2. Controlla che i cavi di collegamento tra servo e scheda driver siano ben saldi
3. Esegui `examples/diagnostic.py` per visualizzare le informazioni di diagnostica
4. Assicurati di aver connesso il gimbal con `C` e che i servo siano abilitati

### Il servo si muove nella direzione opposta

**Possibili cause:**
- Il montaggio del servo o i parametri di controllo del programma richiedono una modifica
**Soluzioni:**
Modifica il metodo `calculate_move` in `src/trackers/tracking_controller.py`, invertendo il segno del parametro corrispondente:

# Se la direzione orizzontale (yaw) è invertita

```python
delta_pan = -int(self.kp_pan * err_x)
```

# Se la direzione verticale (pitch) è invertita

```python
delta_tilt = -int(self.kp_tilt * err_y)
```

### Vibrazione dei servo

**Possibili cause:**
- Parametri di tracking troppo sensibili
- Zona morta troppo piccola
- Carico eccessivo sui servo o alimentazione insufficiente
**Soluzioni:**
1. Aumenta il parametro `dead_zone`
2. Aumenta `min_move_interval`
3. Riduci `kp_pan` e `kp_tilt`
4. Controlla che la tensione di alimentazione sia regolare

### Connessione seriale non riuscita

**Possibili cause:**
- Driver non installato
- Numero di porta seriale errato
- Porta seriale occupata da un altro programma
- Cavo di collegamento difettoso
**Soluzioni:**
1. In Windows controlla Gestione dispositivi e verifica che il driver sia installato correttamente
2. Esegui `examples/list_ports.py` per trovare la porta seriale corretta
3. Chiudi gli altri programmi che potrebbero occupare la porta seriale
4. Prova a cambiare porta USB o cavo dati

---

## Problemi software

### Impossibile aprire la camera

**Possibili cause:**
- Indice della camera errato
- Camera occupata da un altro programma
- Problemi di collegamento hardware della camera
- Problemi di driver della camera
**Soluzioni:**
1. Esegui `examples/list_cameras.py` per visualizzare gli indici delle camere disponibili
2. Chiudi gli altri programmi che potrebbero usare la camera
3. Controlla che il collegamento della camera sia corretto
4. Prova a cambiare porta USB

### Errore di OpenCV

**Possibili cause:**
- Problema di versione di OpenCV
- Installazione incompleta delle librerie dipendenti
- Anomalia hardware della camera
**Soluzioni:**
1. Prova a reinstallare le librerie dipendenti:

```python
pip install --upgrade opencv-python numpy
```

1. Verifica che la versione di Python soddisfi i requisiti (>=3.8)
2. Esamina lo stack di errore per individuare il codice problematico

### Installazione delle dipendenze non riuscita

**Possibili cause:**
- Versione di pip troppo vecchia
- Problemi di connessione di rete
- Problemi di permessi
**Soluzioni:**
1. Aggiorna prima pip:

```python
pip install --upgrade pip
```

1. Usa un mirror cinese per accelerare l'installazione:

```python
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
```

1. Controlla che la connessione di rete sia regolare

### Avvio lento del programma

**Possibili cause:**
- DSHOW non utilizzato in Windows
- L'inizializzazione hardware della camera richiede tempo
**Soluzioni:**
1. Verifica che il codice usi `cv2.CAP_DSHOW` come backend della camera
2. Controlla se altri programmi occupano la camera
3. Attendi qualche secondo: l'inizializzazione della camera richiede di solito un po' di tempo

---

## Problemi di tracking

### Riconoscimento impreciso del target

**Durante il tracking del colore:**
- Controlla che il contrasto tra il colore del target e lo sfondo sia netto
- Regola i parametri del colore (in `src/detectors/color_detector.py`)
- Assicurati che l'illuminazione sia sufficiente e uniforme
**Durante il tracking del volto:**
- L'illuminazione deve essere sufficiente, evita il controluce
- Il volto deve essere rivolto frontalmente verso la camera
- Mantieni una distanza adeguata

### Il gimbal non si muove durante il tracking

**Possibili cause:**
1. Gimbal non connesso
2. Target non bloccato
3. Target nella zona morta
4. Errore nel programma
**Soluzioni:**
1. Verifica di aver connesso il gimbal con `C`
2. Verifica di aver bloccato il target con `T`
3. Controlla l'output della console alla ricerca di messaggi di errore
4. Controlla se il target rientra nell'intervallo di `dead_zone`

### Direzione del tracking invertita

**Soluzioni:**
Fai riferimento alle soluzioni descritte in “Il servo si muove nella direzione opposta”.

### Vibrazioni durante il tracking

**Soluzioni:**
Fai riferimento alle soluzioni descritte in “Vibrazione dei servo”.

### Blocco del target non riuscito

**Possibili cause:**
1. Al momento del blocco il target non era al centro dell'immagine
2. Il target è troppo piccolo o il colore non è netto
3. Nessun target rilevato
**Soluzioni:**
1. Assicurati che al momento del blocco il target sia al centro dell'immagine
2. Le dimensioni del target devono essere adeguate a un rilevamento corretto
3. Controlla l'output della console per verificare se il target viene rilevato
4. Riposiziona il target e prova di nuovo a bloccare

---

## Uso dello strumento di diagnostica

### Uso del programma di diagnostica

Il sistema fornisce uno strumento di diagnostica completo per testare l'hardware dell'intero sistema:

```python
python examples/diagnostic.py --camera 0 --port COM3
```

Il programma di diagnostica testa in sequenza:
1. Il corretto funzionamento della camera
2. La possibilità di connettersi correttamente alla porta seriale
3. La corretta risposta dei servo
Al termine mostra i risultati dei test, aiutandoti a individuare il problema.

### Consultazione dell'output di debug

Durante l'esecuzione, la console mostra informazioni di debug tra cui:
- Informazioni sui target rilevati
- Coordinate del target
- Valore dell'errore
- Comandi di movimento del gimbal
- Eventuali messaggi di errore
Osservare con attenzione questi output aiuta a individuare rapidamente il problema.

---

## Procedure di ripristino

### Riportare il gimbal in una posizione sicura

- Premi `R` per centrare il gimbal
- Oppure chiama `gimbal.return_to_center()`

### Reimpostare tutte le impostazioni

- Premi `S` per interrompere il tracking
- Premi `R` per centrare
- Blocca di nuovo il target

### Ricalibrazione

Se il tracking risulta gravemente insoddisfacente, puoi:
1. Regolare i parametri di tracking
2. Bloccare di nuovo il target
3. Riavviare il programma se necessario
4. Controllare i collegamenti hardware

---

## Come ottenere assistenza

Se i metodi precedenti non risolvono il problema, annota le seguenti informazioni:
- Informazioni sul sistema operativo
- Versione di Python
- Messaggi di errore dettagliati
- Passi per riprodurre il problema
- Risultato dell'esecuzione di diagnostic
