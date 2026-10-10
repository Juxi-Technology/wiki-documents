---
title: Informazioni sul prodotto
---

# Informazioni sul prodotto

> **[Acquista nel negozio](https://www.juxitech.com/it/products/2-dof-servo-pan-tilt-unit)**

Progetto di controllo del gimbal camera 2-DOF, con tracking automatico di colore, volto e QR code.

---

## 📋 Caratteristiche

- 🎮 Controllo manuale del gimbal da tastiera
- 🎯 Tracking automatico di oggetti colorati
- 👤 Tracking automatico del volto
- 📱 Tracking automatico dei QR code
- 🔒 Meccanismo di blocco del target
- 🚀 Avvio rapido (con backend DSHOW)

---

## 🛠 Configurazione hardware

- **Modello servo**: SCS009
- **Assegnazione dei servo**:
  - Servo n. 1: controllo della rotazione orizzontale (yaw)
  - Servo n. 2: controllo dell'inclinazione verticale (pitch)
- **Modalità di comunicazione**: scheda driver del bus seriale
- **Chip della scheda driver**: CH343
- **Baud rate**: 1 Mbps (predefinito)

### Parametri dei servo


|Parametro|Servo n. 1 (yaw)|Servo n. 2 (pitch)|
|---|---|---|
|Intervallo|220-802|220-511|
|Posizione centrale|511|511|
|Descrizione|220=sinistra, 802=destra|220=alto, 511=centro|


---

## 📁 Struttura del progetto

```python
2-DOF-Camera-Gimbal/
├── docs/            # documentazione e tutorial
│   └── tutorials/  # file dei tutorial
├── examples/        # programmi di esempio
│   ├── auto_tracking_demo.py  # demo completa del tracking
│   ├── basic_usage.py        # esempio di uso di base
│   ├── keyboard_control.py    # esempio di controllo da tastiera
│   └── diagnostic.py         # strumento di diagnostica
├── src/            # codice sorgente
│   ├── detectors/  # rilevatori di target
│   │   ├── color_detector.py
│   │   ├── face_detector.py
│   │   └── qr_detector.py
│   ├── trackers/  # controller del tracking
│   │   └── tracking_controller.py
│   └── sc_servo.py  # libreria di comunicazione dei servo
├── .gitignore
├── requirements.txt
└── README.md
```

---

## 🚀 Avvio rapido

### Installazione delle dipendenze

```python
pip install -r requirements.txt
```

### Ricerca dei dispositivi disponibili

**Ricerca delle camere disponibili**

```python
python examples/list_cameras.py
```

**Ricerca delle porte seriali disponibili**

```python
python examples/list_ports.py
```

### Esecuzione della demo

Configurazione tramite parametri della riga di comando:

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3 --color red
```

**Descrizione dei parametri**
- `--camera` o `-c`: indice della camera (predefinito 0)
- `--port` o `-p`: dispositivo seriale (predefinito COM3)
- `--color` o `-C`: colore predefinito (predefinito red)

---

## 🎮 Istruzioni d'uso

### Scorciatoie da tastiera


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


### Flusso d'uso del tracking automatico

1. Premi `C` per connettere il gimbal
2. Scegli la modalità (premi `1` o `2`)
3. Porta l'oggetto target al centro dell'immagine
4. Premi `T` per bloccare il target
5. Sposta il target: il gimbal lo seguirà automaticamente

---

## 📚 Documentazione e tutorial

Per i tutorial dettagliati consulta la directory docs/tutorials/:
- 01-Guida-rapida.md - per iniziare rapidamente
- 02-Hardware-e-preparazione-dell'ambiente.md - elenco dell'hardware e preparazione dell'ambiente
- 03-Uso-di-base.md - controllo da tastiera e uso di base
- 04-Funzioni-avanzate-e-tracking.md - funzioni avanzate e tracking in dettaglio
- 05-Risoluzione-dei-problemi.md - problemi comuni e soluzioni

---

## 🔧 Note tecniche

### Parametri di controllo del tracking

In `src/trackers/tracking_controller.py` puoi regolare:

|Parametro|Valore predefinito|Descrizione|
|---|---|---|
|kp_pan|0.08|guadagno proporzionale del tracking orizzontale (pan)|
|kp_tilt|0.12|guadagno proporzionale del tracking verticale (tilt)|
|dead_zone|30|zona morta (pixel): entro questo intervallo il gimbal non si muove|
|min_move_interval|0.15|intervallo minimo di movimento (secondi)|


### Meccanismo di blocco del target

Dopo il blocco, il sistema seleziona il target in base ai seguenti criteri:
- Minore distanza dal punto di blocco (peso 70%)
- Dimensioni più simili a quelle del momento del blocco (peso 30%)

---

## 📖 Specifiche dei servo

- **Modello**: SCS009
- **Tensione di funzionamento**: 4V-7.4V (tipica 6V)
- **Coppia di stallo**: 2,3 kg·cm a 6V
- **Protocollo**: seriale asincrona half-duplex (TTL)
