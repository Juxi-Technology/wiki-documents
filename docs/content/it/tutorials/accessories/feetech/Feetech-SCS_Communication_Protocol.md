---
title: "Protocollo di comunicazione SCS"
description: "Il livello di comunicazione usa TTL compatibile con la comunicazione ad alta velocità e RS485 con forte immunità ai disturbi; la comunicazione è asincrona full-duplex, trasmissione e ricezione sono elaborate in modo asincrono."
---

# Protocollo di comunicazione SCS

> **[Acquista nel negozio](https://www.juxitech.com/it/products/feetech-scs0009-serial-bus-servo)**


## 1 Panoramica del protocollo di comunicazione

  Il livello di comunicazione usa TTL compatibile con la comunicazione ad alta velocità e RS485 con forte immunità ai disturbi; la comunicazione è asincrona full-duplex, trasmissione e ricezione sono elaborate in modo asincrono.

  Controller e servo comunicano in modalità domanda-risposta: il controller invia una trama di comando, il servo restituisce una trama di risposta.

  Una rete di controllo a bus può contenere più servos, quindi ogni servo ha un numero ID univoco nella rete. Il comando inviato dal controller contiene l'informazione ID; solo il servo con ID corrispondente può ricevere completamente il comando e restituire una risposta.

La comunicazione è seriale asincrona: una trama è composta da 1 bit di start, 8 bit di dati e 1 bit di stop, senza bit di parità, per un totale di 10 bit.

  Quando alcuni parametri della tabella di memoria usano due byte, il loro ordine dipende dal modello di servo: i servo a potenziometro usano il formato big-endian (byte alto prima, byte basso dopo), i servo a encoder magnetico il formato little-endian (byte basso prima, byte alto dopo). Poiché ogni servo ha funzioni leggermente diverse, per il controllo reale fare riferimento alla tabella di memoria del modello specifico.

## 2 Trama di comando

- Intestazione: due 0xFF consecutivi ricevuti indicano l'arrivo di un pacchetto dati.
Numero ID: ogni servo ha un ID. Intervallo 0–253, in esadecimale 0x00–0xFD.

- ID broadcast: l'ID 254 è l'ID broadcast. Se il controller invia ID 254 (0xFE), tutti i servos ricevono il comando; tranne PING, gli altri comandi non restituiscono risposta (con più servos sul bus non è possibile usare il comando PING broadcast).

- Lunghezza dati: uguale al numero di parametri N da inviare più 2, cioè «N+2».

- Comando: codice di funzione del pacchetto dati, vedi 1.3 Tipi di comando.

- Parametri: informazioni di controllo aggiuntive al comando; un parametro può rappresentare un valore di memoria su due byte al massimo. Ordine dei byte: vedi tabella di controllo memoria del manuale del servo (diverso per modello).

- Checksum: calcolo del Check Sum:
Check Sum = ~ (ID + Length + Instruction + Parameter1 + … Parameter N) Se la somma tra parentesi supera 255, prendere solo il byte più basso. «~» rappresenta l'inversione bit per bit.

## 3 Trama di risposta

La trama di risposta contiene lo stato attuale ERROR del servo. Se lo stato operativo non è normale, si riflette in questo byte (significato degli stati: vedi tabella di controllo memoria del manuale). Se ERROR è 0, il servo non ha errori.

## 4 Tipi di comando

### 4.1 Comando di interrogazione stato PING

- Funzione: leggere lo stato operativo del servo

- Lunghezza: 0x02

- Comando: 0x01

- Parametri: nessuno

- PING inviato con l'indirizzo broadcast restituisce comunque una risposta.

Esempio 1: leggere lo stato operativo del servo con ID 1.

Trama di comando: FF FF 01 02 01 FB (invio in esadecimale)

```Plain Text
Intestazione: FF FF
ID: 01
Lunghezza: 02
Comando: 01
Checksum: FB
```

Trama di risposta:  FF FF 01 02 00 FC (visualizzazione esadecimale)

```Plain Text
Intestazione: FF FF
ID: 01
Lunghezza: 02
Stato: 00
Checksum: FC
```

### 4.2 Comando di lettura READ DATA

- Funzione: leggere dati dalla tabella di controllo memoria del servo

- Lunghezza: 0x04

- Comando: 0x02

- Parametro 1: indirizzo iniziale del segmento di lettura

- Parametro 2: lunghezza dei dati da leggere

Esempio 2: leggere la posizione attuale del servo con ID 1 (byte basso prima, byte alto dopo). L'indirizzo del parametro di posizione è 0X38, due byte consecutivi.

Trama di comando: FF FF 01 04 02 38 02 BE (invio in esadecimale)

```Plain Text
Intestazione: FF FF
ID: 01
Lunghezza: 04
Comando: 02
Parametri: 38 02 (indirizzo posizione attuale, lunghezza dati lettura)
Checksum: BE
```

Trama di risposta: FF FF 01 04 00 18 05 DD (visualizzazione esadecimale)

```Plain Text
Intestazione: FF FF
ID: 01
Lunghezza: 04
Stato: 00
Parametri: 18 05
Checksum: DD
```

I due byte letti (struttura little-endian): byte basso L 0x18, byte alto H 0x05. I due byte compongono il dato a 16 bit 0X0518, in decimale la posizione attuale è 1304.

### 4.3 Comando di scrittura WRITE DATA

- Funzione: scrivere dati nella tabella di controllo memoria del servo

- Lunghezza: N+2 (N = lunghezza parametri)

- Comando: 0x03

- Parametro 1: indirizzo iniziale del segmento di scrittura

- Parametro 2: primo dato da scrivere

- Parametro 3: secondo dato da scrivere
…

- Parametro N: n-esimo dato da scrivere, N=n+1

Esempio 3: con l'ID broadcast (0xFE), impostare a 1 l'ID di un servo qualsiasi. Nella tabella di memoria, l'indirizzo di salvataggio dell'ID è 5.

Trama di comando: FF FF FE 04 03 05 01 F4 (invio in esadecimale)

```Plain Text
Intestazione: FF FF
ID: 01
Lunghezza: 04
Comando: 03
Parametri: 05 01 (indirizzo ID, nuovo valore ID)
Checksum: F4
```

Poiché l'invio usa l'ID broadcast, non viene restituita alcuna risposta. Inoltre, l'EPROM della tabella di memoria ha un interruttore di blocco di protezione: va disattivato (0) prima di modificare l'ID, altrimenti il nuovo ID non sarà salvato allo spegnimento. Vedi la tabella di memoria o il manuale del modello di servo specifico.

Esempio 4: far ruotare il servo ID1 a 1000 passi al secondo fino alla posizione 2048. L'indirizzo iniziale della posizione obiettivo è 0x2A, quindi si scrivono sei byte consecutivi a partire da 0x2A.

- Dato di posizione 0x0800 (2048)

- Dato riservato 0x0000 (0)

- Dato di velocità 0x03E8 (1000)

Trama di comando: FF FF 01 09 03 2A 00 08 00 00 E8 03 D5 (invio in esadecimale)

```Plain Text
Intestazione: FF FF
ID: 01
Lunghezza: 09
Comando: 03
Parametri:
2A (indirizzo iniziale)
00 08 (posizione)
00 00 (riservato)
E8 03 (velocità)
Checksum: D5
```

Trama di risposta: FF FF 01 02 00 FC (visualizzazione esadecimale)

```Plain Text
Intestazione: FF FF
ID: 01
Lunghezza: 02
Stato: 00
Checksum: FC
```

Lo stato operativo restituito è 0: il servo ha ricevuto il comando senza errori e ha iniziato a eseguirlo. Poiché l'ID del pacchetto inviato non è quello broadcast (0xFE), il servo restituisce un pacchetto di stato dopo la ricezione.

### 4.4 Comando di scrittura asincrona REG WRITE

REG WRITE è simile a WRITE DATA, ma il momento di esecuzione è diverso. Alla ricezione di una trama REG WRITE, i dati vengono memorizzati in un buffer e il registro di scrittura asincrona viene impostato a 1. Alla ricezione del comando ACTION, il comando memorizzato viene infine eseguito.

- Lunghezza: N+2 (N = lunghezza parametri)

- Comando: 0x04

- Parametro 1: indirizzo iniziale dell'area di scrittura

- Parametro 2: primo dato da scrivere

- Parametro 3: secondo dato da scrivere

- Parametro N: n-esimo dato da scrivere, N=n+1

Esempio 5: far ruotare i servos ID1–ID10 a 1000 passi/s fino alla posizione 2048.

```Plain Text
ID 1: trama di scrittura asincrona: FF FF 01 09 04 2A 00 08 00 00 E8 03 D4
ID 1: trama di risposta: FF FF 01 02 00 FC
ID 2: trama di scrittura asincrona: FF FF 02 09 04 2A 00 08 00 00 E8 03 D3
ID 2: trama di risposta: FF FF 02 02 00 FB
ID 3: trama di scrittura asincrona: FF FF 03 09 04 2A 00 08 00 00 E8 03 D2
ID 3: trama di risposta: FF FF 03 02 00 FA
ID 4: trama di scrittura asincrona: FF FF 04 09 04 2A 00 08 00 00 E8 03 D1
ID 4: trama di risposta: FF FF 04 02 00 F9
ID 5: trama di scrittura asincrona: FF FF 05 09 04 2A 00 08 00 00 E8 03 D0
ID 5: trama di risposta: FF FF 05 02 00 F8
ID 6: trama di scrittura asincrona: FF FF 06 09 04 2A 00 08 00 00 E8 03 CF
ID 6: trama di risposta: FF FF 06 02 00 F7
ID 7: trama di scrittura asincrona: FF FF 07 09 04 2A 00 08 00 00 E8 03 CE
ID 7: trama di risposta: FF FF 07 02 00 F6
ID 8: trama di scrittura asincrona: FF FF 08 09 04 2A 00 08 00 00 E8 03 CD
ID 8: trama di risposta: FF FF 08 02 00 F5
ID 9: trama di scrittura asincrona: FF FF 09 09 04 2A 00 08 00 00 E8 03 CC
ID 9: trama di risposta: FF FF 09 02 00 F4
ID10: trama di scrittura asincrona: FF FF 0A 09 04 2A 00 08 00 00 E8 03 CB
ID10: trama di risposta: FF FF 0A 02 00 F3
```

### 4.5 Eseguire la scrittura asincrona ACTION

- Funzione: innesca il comando REG WRITE

- Lunghezza: 0x02

- Comando: 0x05

- Parametri: nessuno

1. ACTION è molto utile per controllare più servos contemporaneamente.

2. Controllando più servos, ACTION consente al primo e all'ultimo servo di eseguire le rispettive azioni simultaneamente, senza ritardi intermedi.

3. L'invio di ACTION a più servos usa l'ID broadcast (0xFE): quindi non viene restituita alcuna trama di dati.

Esempio 6: dopo l'invio della scrittura asincrona per i servos ID1–ID10 (1000 passi/s verso la posizione 2048), occorre eseguire il comando di scrittura asincrona.

```Plain Text
Trama di comando: FF FF FE 02 05 FA
Trama di risposta: nessuna
```

### 4.6 Comando di scrittura sincrona SYNC WRITE

- Funzione: controllare più servos contemporaneamente.

- ID: 0xFE

- Lunghezza: (L+1)*n+4 (L: lunghezza dati inviati a ogni servo, n: numero di servos)

- Comando: 0x83

- Parametro 1: indirizzo iniziale dei dati da scrivere

- Parametro 2: lunghezza dei dati da scrivere (L)

- Parametro 3: ID del primo servo

- Parametro 4: primo dato del primo servo

- Parametro 5: secondo dato del primo servo
…

- Parametro L+3: L-esimo dato del primo servo

- Parametro L+4: ID del secondo servo

- Parametro L+5: primo dato del secondo servo

- Parametro L+6: secondo dato del secondo servo
…

- Parametro 2L+4: L-esimo dato del secondo servo
…

A differenza di REG WRITE+ACTION, il tempo reale è migliore: un solo comando SYNC WRITE può modificare in una volta le tabelle di controllo di più servos, mentre REG WRITE+ACTION procede a passi. Tuttavia, con SYNC WRITE la lunghezza dei dati scritti e l'indirizzo iniziale devono essere identici.

Esempio 7: scrivere per 4 servos (ID1–ID4) all'indirizzo iniziale 0x2A: posizione 0x0800, tempo 0X0000 e velocità 0x03E8 (byte basso prima, byte alto dopo).

Trama di comando: FF FF FE 20 83 2A 06 01 00 08 00 00 E8 03 02 00 08 00 00 E8 03 03 00 08 00 00 E8 03 04 00 08 00 00 E8 03 58 (invio in esadecimale)

```Plain Text
Intestazione: FF FF
ID: FE
Lunghezza dati effettiva: 20
Comando: 83
Parametri:
2A 06 (indirizzo iniziale, lunghezza dati)
01 00 08 00 00 E8 03 (comando servo ID1)
02 00 08 00 00 E8 03 (comando servo ID2)
03 00 08 00 00 E8 03 (comando servo ID3)
04 00 08 00 00 E8 03 (comando servo ID4)
Checksum: 58
```

### 4.7 Comando di lettura sincrona SYNC READ

- Funzione: interrogare più servos contemporaneamente.

- ID: 0xFE

- Lunghezza: n+4 (n = numero di servos)

- Comando: 0x82

- Parametro 1: indirizzo iniziale dei dati da leggere

- Parametro 2: lunghezza dei dati da leggere

- Parametro 3: ID del primo servo

- Parametro 4: ID del secondo servo
…

- Parametro N: ID dell'n-esimo servo, N=n+2

Un comando SYNC READ interroga in una volta le tabelle di controllo di più servos; gli ID da interrogare sono specificati nel comando, e i servos rispondono nell'ordine degli ID del pacchetto. Con SYNC READ, la lunghezza e l'indirizzo iniziale di tutti i dati interrogati devono essere identici (comando disponibile solo su alcuni servos a bus seriale).

Esempio 8: interrogare per 2 servos (ID1–ID2) posizione, velocità, carico, tensione e temperatura attuali (indirizzo iniziale 0x38, 8 word di dati in totale, byte basso prima, byte alto dopo).

Trama di comando: FF FF FE 06 82 38 08 01 02 36

```Plain Text
Intestazione: FF FF
ID: FE
Lunghezza: 06
Comando: 82
Parametri:
38 08 (indirizzo iniziale dati, lunghezza dati)
01 02 (ID01, ID02)
Checksum: 36
```

Trama di risposta:

```Plain Text
Servo ID01: FF FF 01 0A 00 00 08 00 00 00 00 79 1E 55
Servo ID02: FF FF 02 0A 00 FF 07 00 00 00 00 77 23 53
```

La trama di risposta può essere decodificata in base al comando di lettura

### 4.8 Comando di reset dello stato RESET

- Funzione: resettare lo stato del servo (resettare i giri del servo)

- Lunghezza: 0x02

- Comando: 0x0A

- Parametri: nessuno

Esempio 9: resettare il servo, ID 01.

```Plain Text
Trama di comando: FF FF 01 02 0A F2 (invio in esadecimale)
Trama di risposta: FF FF 01 02 00 FC (visualizzazione esadecimale)
```

### 4.9 Comando di calibrazione posizione

- Funzione: ricalibrare la posizione attuale al valore impostato

- Lunghezza: 0x02 o 0x04

- Comando: 0x0B

- Parametri: nessuno o valore impostato

Nota: senza parametri, la posizione attuale viene calibrata alla posizione centrale. Il comando di calibrazione è supportato solo da alcuni modelli – vedi tabella sotto.

Esempio 10: ricalibrare la posizione attuale alla posizione centrale.

```Plain Text
Trama di comando: FF FF 01 02 0B F1 (invio in esadecimale)
Trama di risposta: FF FF 01 02 00 FC (visualizzazione esadecimale)
```

Esempio 11: ricalibrare la posizione attuale a 1024.

Trama di comando: FF FF 01 04 0B 00 04 EB (invio in esadecimale)

```Plain Text
Intestazione: FF FF
ID: 01
Lunghezza: 04
Comando: 0B
Valore impostato: 00 04 (1024)
Checksum: EB
```

Trama di risposta: FF FF 01 02 00 FC (visualizzazione esadecimale)

```Plain Text
Intestazione: FF FF
ID: 01
Lunghezza: 02
Stato: 00
Checksum: FC
```

### 4.10 Comando di ripristino parametri

- Funzione: ripristinare i parametri del servo tranne l'ID

- Lunghezza: 0x02

- Comando: 0x06

- Parametri: nessuno

Esempio 11: ripristinare i parametri del servo.

```Plain Text
Trama di comando: FF FF 01 02 06 F6 (invio in esadecimale)
Trama di risposta: FF FF 01 02 00 FC (visualizzazione esadecimale)
```

Nota: sbloccare i parametri EPROM prima di ripristinare i parametri del servo

### 4.11 Comando di backup parametri

- Funzione: backup dei parametri (per il ripristino)

- Lunghezza: 0x02

- Comando: 0x09

- Parametri: nessuno

Esempio 12: eseguire il backup dei parametri del servo.

```Plain Text
Trama di comando: FF FF 01 02 09 F3 (invio in esadecimale)
Trama di risposta: FF FF 01 02 00 FC (visualizzazione esadecimale)
```

Nota: sbloccare i parametri EPROM prima di eseguire il backup dei parametri del servo

### 4.12 Comando di riavvio

- Funzione: riavviare il servo

- Lunghezza: 0x02

- Comando: 0x08

- Parametri: nessuno

Esempio 13: riavviare il servo.

```Plain Text
Trama di comando: FF FF 01 02 08 F4 (invio in esadecimale)
Trama di risposta: nessuna (riavvio di circa 800 ms)
```

Nota: disattivare l'interruttore di coppia prima di riavviare il servo
