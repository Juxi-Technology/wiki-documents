---
title: "01-Controllo visuale tramite GUI"
description: "Controllo visuale via GUI della mano AmazingHand con ESP32-S3 e 8 canali PWM: pulsanti per i gesti, cursori per i servo e controllo differenziale delle dita."
---

# 01-Controllo visuale tramite GUI

Comandi gestuali visuali — Tutorial d'uso

Questa cartella fornisce uno **strumento di controllo host**: dopo aver collegato ESP32, con il computer è possibile cliccare pulsanti o digitare comandi per far eseguire i gesti alla mano abile.

> Compatibile con: ESP32-S3 + 8 canali di servomotori PWM (azionamento differenziale). Per il flashing del firmware vedere le istruzioni in `..\03_firmware_docs`.

## 1. Due modalità d'uso

|Modalità|Requisiti|Adatta a|
|---|---|---|
|**Programma preconfezionato** (consigliato)|Doppio clic su `AmazingHand控制台.exe`|Nessuna installazione di Python, uso immediato|
|**Esecuzione dal codice sorgente**|Python 3.12 a 64 bit|Tracciamento dei gesti o personalizzazione|

## 2. Modalità 1: doppio clic sull'exe

1. Fare doppio clic su `AmazingHand控制台.exe`.

2. **Selezionare la porta seriale**: nel menu a discesa in alto selezionare la porta COM di ESP32 (verificare in Gestione dispositivi).

3. Cliccare su **«Connetti»**: la spia di stato diventa verde e nel log compare «Connesso».

4. Cliccare sui pulsanti dei gesti: **sasso / forbici / carta / pollice in su / OK / pizzico / indica / apri / pugno**; la mano abile li esegue.

5. **Mano destra/sinistra**: selezionare «Mano destra» / «Mano sinistra» per cambiare (la direzione speculare del pollice è diversa).

6. **Azionamento diretto dei servomotori**: trascinare gli 8 cursori per controllare in tempo reale l'angolo di un singolo servomotore (0-180°).

7. **Controllo differenziale delle dita**: due barre di avanzamento per ogni dito——

    - **Piega◀▶Distendi**: il dito si piega o si distende (intervallo -70 ~ +70).

    - **Oscilla a destra◀▶Oscilla a sinistra**: il dito oscilla a destra e a sinistra (intervallo 60 ~ 120, 90 = neutro).

8. **Ripeti / Stop**: ripete l'ultimo gesto / interrompe immediatamente.

## 3. Modalità 2: esecuzione dal codice sorgente

### Installazione delle dipendenze

Richiede **Python 3.12 a 64 bit** (mediapipe supporta solo la versione a 64 bit).

```Bash
# 1. Installare le dipendenze di base
pip install -r requirements.txt

# 2. Installare le dipendenze di tracciamento (quando serve il tracciamento dei gesti, crea automaticamente un ambiente virtuale)
setup_tracking.bat
```

### Esecuzione

```Bash
# Avviare con l'ambiente di tracciamento (include mediapipe)
tracking_env\Scripts\python hand_gui.py
```

> Oppure direttamente `python hand_gui.py` (qualsiasi Python con pyserial).

### Tracciamento dei gesti integrato nella GUI

La GUI include un pannello **Tracciamento dei gesti** (la telecamera segue i movimenti della mano):

1. Dopo aver collegato la porta seriale, scorrere fino al pannello «Tracciamento dei gesti (telecamera MediaPipe)».

2. Selezionare il numero della telecamera (predefinito 0) e cliccare su **«Avvia tracciamento»**.

3. Mettere la mano nell'inquadratura della telecamera: la mano abile segue piegando/distendendo le dita.

> Il tracciamento richiede che `setup_tracking.bat` abbia installato mediapipe. L'exe senza installazione non include la funzione di tracciamento.

## 4. Test da riga di comando (serial_test.py)

```Bash
# Test del collegamento (verificare prima che sia possibile connettersi)
python serial_test.py COM3 nop

# Gesto
python serial_test.py COM3 rock         # Sasso
python serial_test.py COM3 thumbs_up    # Pollice in su
python serial_test.py COM3 index        # Indice puntato
python serial_test.py COM3 open         # Mano aperta
python serial_test.py COM3 close        # Pugno

# Azionamento diretto di un singolo servo
python serial_test.py COM3 servo 1 90   # Servomotore 1 → 90°

# Centrare tutto
python serial_test.py COM3 mid

# Impostare mano sinistra/destra
python serial_test.py COM3 hand L
python serial_test.py COM3 hand R

# Scansione di frequenza/autotest
python serial_test.py COM3 sweep 1      # Scansione di frequenza del servomotore 1
python serial_test.py COM3 test         # Test di tutti i servomotori uno per uno
```

## 5. Domande frequenti

|Sintomo|Soluzione|
|---|---|
|Il servomotore non si muove|Controllare l'alimentazione (alimentatore indipendente 5V 3A), la porta COM e i collegamenti|
|L'exe si chiude all'improvviso|Eseguire dal codice sorgente (la versione preconfezionata potrebbe avere dipendenze mancanti)|
|Nessuna immagine dalla telecamera|Concedere i permessi per la telecamera (Impostazioni→Privacy→Fotocamera)|
|La forma della mano è invertita|Selezionare la mano destra/sinistra opposta|

> Per il protocollo completo e la descrizione dei comandi vedere `..\03_firmware_docs\用户手册.md`.

