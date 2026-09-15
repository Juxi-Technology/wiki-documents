---
title: "Jetson: Comunicazione della porta seriale"
description: "La modifica ha effetto dopo la disconnessione e un nuovo accesso."
---

# Jetson: Comunicazione della porta seriale

## Installazione delle dipendenze

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial
```

## Verifica dei gruppi utente

```Plain Text
sudo usermod -aG i2c $USER
```

```Plain Text
sudo usermod -aG dialout $USER
```

La modifica ha effetto dopo la disconnessione e un nuovo accesso.

## Posizione dei file

`UART_Voice/uart_voice.py`

Il modulo si collega al Jetson tramite i pin UART; commentare `SERIAL_PORT = '/dev/ttyUSB0'` e rimuovere il commento da `SERIAL_PORT = '/dev/ttyTHS1'`

![Immagine 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication/1.png)

## Descrizione del cablaggio

![Immagine 2](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication/2.png)

## Verifica della porta seriale

```Plain Text
ls /dev/ttyTHS*
```

## Esecuzione

```Plain Text
cd UART_Voice
```

```Plain Text
python3 uart_voice.py
```

## Formato dell'output

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

Il modulo si collega al Jetson tramite il cavo dati Type; rimuovere il commento da `SERIAL_PORT = '/dev/ttyUSB0'` e commentare `SERIAL_PORT = '/dev/ttyTHS1'`

![Immagine 3](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication/3.png)

## Verifica della porta seriale

```Plain Text
ls /dev/ttyUSB*
```

## Esecuzione

```Plain Text
cd UART_Voice
```

```Plain Text
python3 uart_voice.py
```

## Formato dell'output

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

## Risoluzione dei problemi

### Porta seriale occupata

Se la porta seriale non si apre, verificare se è occupata da un altro servizio:

```Plain Text
sudo systemctl stop nvgetty
```

```Plain Text
sudo systemctl disable nvgetty
```

<RelatedProducts slugs="ai-voice-module" />
