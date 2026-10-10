---
title: Hardware e preparazione dell'ambiente
---

# Hardware e preparazione dell'ambiente

> **[Acquista nel negozio](https://www.juxitech.com/it/products/2-dof-servo-pan-tilt-unit)**

Questo capitolo descrive in dettaglio l'intero processo di assemblaggio hardware, collegamento e configurazione dell'ambiente.

---

## Elenco hardware

Prima di iniziare a usare il prodotto, verifica di avere a disposizione i seguenti componenti:

|Componente|Modello/Specifiche|Quantità|
|---|---|---|
|Servo|SCS009|2|
|Supporto del gimbal|Struttura del gimbal 2-DOF|1|
|Scheda driver dei servo|Scheda driver con chip CH343|1|
|Camera USB|Risoluzione non inferiore a 640x480|1|
|Alimentatore dei servo|Tensione 4V-7.4V, consigliati 6V|1|
|Cavo dati seriale|Per collegare la scheda driver al computer|1|


---

## Spiegazione dei parametri dei servo


|Parametro|Servo n. 1 (yaw / rotazione orizzontale)|Servo n. 2 (pitch / inclinazione verticale)|
|---|---|---|
|Intervallo di posizione|220-802|220-511|
|Posizione centrale|511|511|
|Valore minimo|220 corrisponde alla posizione più a sinistra|220 corrisponde alla posizione più in alto|
|Valore massimo|802 corrisponde alla posizione più a destra|511 corrisponde alla posizione centrale|


---

## Collegamento hardware

### Passo 1: Montaggio dei servo e del supporto del gimbal

1. Monta il servo n. 1 (per la rotazione orizzontale) nella posizione prevista sul supporto inferiore del gimbal e serra le viti per garantirne la stabilità
2. Monta il servo n. 2 (per l'inclinazione verticale) sul supporto superiore del gimbal, fissandolo allo stesso modo
3. Installa il supporto di fissaggio della camera come indicato nelle istruzioni

### Passo 2: Collegamento dei servo alla scheda driver

1. Collega i cavi dati dei due servo ai connettori per servo della scheda driver
2. Fai attenzione all'ordine dei fili dei servo: i colori sono in genere rosso (alimentazione), nero (massa), bianco/giallo (segnale)
3. Verifica che ogni servo sia collegato all'ID corrispondente: ID servo 1 per lo yaw, ID servo 2 per il pitch

### Passo 3: Collegamento di alimentazione e porta seriale

1. Collega l'alimentatore dei servo al connettore di alimentazione della scheda driver
2. Collega la scheda driver alla porta USB del computer con il cavo dati seriale
3. Collega la camera al computer

---

## Requisiti di sistema e ambiente

### Sistemi operativi supportati

- Windows 10/11
- Distribuzioni Linux (ad esempio Ubuntu 20.04 o versioni successive)

### Versione di Python

Python 3.8 o versione successiva

---

## Installazione di driver e dipendenze

### Installazione del driver della porta seriale

#### Windows

1. Visita il sito ufficiale del produttore del chip CH343 e scarica il programma di installazione del driver per Windows
Installazione del driver CH343 (eseguire come amministratore)
https://www.wch.cn/downloads/CH343SER_EXE.html

>
> Se in Gestione dispositivi viene riconosciuto come dispositivo sconosciuto “usb single serial” o “usb serial”, fai prima clic con il tasto destro e seleziona Disinstalla, poi installa il driver!

1. Esegui il programma di installazione e segui le istruzioni per completare l'installazione del driver
2. Collega la scheda driver dei servo al computer: in Gestione dispositivi dovresti vedere il dispositivo seriale

#### Linux

La maggior parte delle distribuzioni Linux include già il driver seriale CH343, non serve installarlo separatamente. In caso di problemi, prova a:
1. Controlla se il driver è caricato nel kernel: `lsmod | grep ch343`
2. Se non è caricato, prova a scollegare e ricollegare il dispositivo oppure a riavviare

### Installazione delle dipendenze Python

Esegui nella directory principale del progetto:

```python
pip install -r requirements.txt
```

Le principali dipendenze del progetto includono:
- opencv-python: acquisizione ed elaborazione delle immagini
- numpy: libreria di calcolo numerico
- pyserial: libreria di comunicazione seriale

---

## Verifica del collegamento hardware

Prima di avviare il programma principale, possiamo usare gli strumenti per verificare il collegamento hardware.

### Ricerca delle camere disponibili

Esegui il comando seguente per elencare le camere disponibili:

```python
python examples/list_cameras.py
```

Il programma rileva ed elenca tutte le camere disponibili; annota l'indice della camera che vuoi usare.

### Ricerca delle porte seriali disponibili

Esegui il comando seguente per elencare le porte seriali disponibili:

```python
python examples/list_ports.py
```

Annota il nome del dispositivo seriale che usi.

### Diagnostica hardware

Se vuoi eseguire una verifica completa di tutto l'hardware, puoi avviare lo strumento di diagnostica:

```python
python examples/diagnostic.py --camera 0 --port COM3
```

Il programma di diagnostica testa in sequenza camera, porta seriale e gimbal.

---

## Avvertenze di sicurezza

Durante l'uso, presta attenzione alle seguenti avvertenze di sicurezza:
1. L'alimentazione dei servo deve rientrare nell'intervallo previsto (4V-7.4V) per evitare di danneggiarli
2. Evita che i servo rimangano a lungo in posizione estrema, per prolungarne la durata
3. Prima di togliere l'alimentazione, è consigliabile centrare il gimbal per ridurre il carico al successivo avvio
