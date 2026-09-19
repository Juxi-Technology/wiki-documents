---
title: "RDK: Comunicazione della porta seriale"
description: "Modulo di interazione vocale IA e RDK X5 via porta seriale: codice di esempio Python per leggere i comandi riconosciuti e avviare la riproduzione vocale."
---

# RDK: Comunicazione della porta seriale

## Introduzione

Questo repository fornisce codice di esempio Python per la comunicazione tra la piattaforma RDK X5 (Raspberry Pi) e il modulo di interazione vocale AI, con supporto per due modalità di comunicazione: I2C e UART.

- **Modulo di riconoscimento vocale**: supporta il riconoscimento vocale offline e, dopo il riconoscimento, restituisce l'ID del comando

- **Funzione di riproduzione**: supporta la riproduzione passiva, la riproduzione delle parole di funzione e la riproduzione delle parole di comando

- **Protocollo di comunicazione**: indirizzo I2C 0x2A, baud rate UART 115200

- **Linguaggio di programmazione**: Python 3

---

## Connessione hardware

### Connessione generale

> **Nota importante**: assicurarsi che tutti i dispositivi abbiano il GND in comune!
> 
> 

---

### Connessione della versione UART

**Nota**: per impostazione predefinita viene utilizzato il dispositivo di porta seriale `/dev/ttyAMA0`

---

### Connessione con cavo dati Type-C (alternativa UART)

Se si utilizza un modulo adattatore USB-TTL:

**Nota**: in questo caso il dispositivo di porta seriale è solitamente `/dev/ttyUSB0`

![Immagine 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RDK-Serial-Communication/1.jpg)

---

## Configurazione dell'ambiente

### Requisiti di sistema

- RDK X5

- Sistema Ubuntu / Debian

- Python 3.7+

### Installazione dei pacchetti di dipendenza

```Bash
# Aggiorna i pacchetti
sudo apt update
sudo apt upgrade -y

# Installa le librerie Python
sudo apt install -y python3-pip

# Installa pyserial
pip3 install pyserial
```

### Abilitazione dell'interfaccia della porta seriale

```Bash
# Apri lo strumento di configurazione
sudo raspi-config

# Seleziona Interface Options → Serial
Select: No (shell) → Yes (hardware serial port)
# Effettivo dopo il riavvio
sudo reboot
```

---

## Utilizzo della versione UART

### Verifica dei file di codice

```Bash
cd UART_Voice
ls -la
# Dovresti vedere uart_voice.py
```

### Configurazione del dispositivo di porta seriale

Modificare il file `uart_voice.py` e cambiare il dispositivo di porta seriale:

```Bash
# Collegamento diretto UART (predefinito)
SERIAL_PORT = '/dev/ttyAMA0'

# Oppure usa USB-TTL
SERIAL_PORT = '/dev/ttyUSB0'

# Baud rate
BAUD_RATE = 115200
```

### Esecuzione del programma

## Concessione dell'autorizzazione di esecuzione

```Bash
chmod +x uart_voice.py
# Esegui (serve sudo per accedere alla porta seriale)
sudo python3 uart_voice.py
```

### Test di esecuzione

Al termine di un avvio corretto viene visualizzato:

```Bash
Speech Serial Opened! Baudrate=115200
```

Pronunciando una parola di comando al modulo vocale, viene visualizzato l'ID corrispondente:

```Bash
Speech Serial Opened! Baudrate=115200
ID:1
ID:4
ID:10
```

### Arresto del programma

Premere `Ctrl + C` per arrestare il programma

---

## Risoluzione dei problemi

### Q1: il dispositivo di porta seriale non viene trovato

**R: verificare:**

1. Verificare se la porta seriale è abilitata (raspi-config)

2. Verificare se il nome del dispositivo è corretto

    - UART diretto: `/dev/ttyAMA0`

    - USB-TTL: `/dev/ttyUSB0` o `/dev/ttyUSB1`

3. Verificare se il collegamento hardware è corretto

4. Verificare se la porta seriale è occupata da un altro programma

```Bash
# Visualizza le porte seriali disponibili
ls /dev/tty* | grep tty
```

---

### Q2: l'ID del comando mostra solo 0 o non viene visualizzato

**R: fenomeno normale:**

- 0 = nessun comando valido riconosciuto

- L'ID viene emesso solo dopo aver pronunciato una parola di comando valida

- Attivare prima il modulo, poi pronunciare il comando

---

### Q3: precisione di riconoscimento non elevata

**R: suggerimenti di ottimizzazione:**

- Assicurarsi che l'ambiente sia silenzioso e che il rumore di fondo non sia troppo elevato

- Mantenere una distanza adeguata dal microfono (10-50cm)

- Ritmo di parlata moderato e pronuncia chiara

---

### Q4: comunicazione della porta seriale anomala

**R: verificare:**

1. Se TX/RX sono collegati in modo incrociato (TX del modulo → RX del RPi)

2. Se il baud rate è 115200

3. Se il GND è in comune

4. Se la porta seriale è occupata da un altro processo

```Bash
# Controlla se la porta seriale è occupata
sudo lsof /dev/ttyAMA0
```

---

## Supporto tecnico

In caso di problemi, verificare:

1. Se il cablaggio hardware è corretto (il GND in comune è molto importante!)

2. Se il baud rate della porta seriale è 115200

3. Se si dispone di autorizzazioni sufficienti per accedere all'interfaccia hardware

## Comandi di debug comuni

```Bash
ls -l /dev/ttyAMA0   # Visualizza il dispositivo seriale
groups                # Visualizza i permessi dei gruppi utente
```

<RelatedProducts slugs="ai-voice-module" />
