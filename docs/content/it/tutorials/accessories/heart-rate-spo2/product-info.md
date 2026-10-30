---
title: "Informazioni sul prodotto"
description: "Panoramica del prodotto, principio di rilevamento, specifiche tecniche, definizione dei pin e scenari applicativi tipici del modulo sensore di frequenza cardiaca e SpO2 MAX30102."
---

# Informazioni sul prodotto

## 1. Panoramica del prodotto

Il modulo sensore di frequenza cardiaca e SpO2 Gravity: MAX30102 monta il chip originale MAX30102 di Maxim ad alta precisione, dedicato al rilevamento di frequenza cardiaca e SpO2, insieme a un microcontrollore che integra un algoritmo proprietario di frequenza cardiaca e SpO2: non richiede che il dispositivo host scriva complessi programmi di calcolo e può restituire direttamente valori standardizzati di frequenza cardiaca e saturazione di ossigeno.

Il modulo acquisisce i dati fisiologici grezzi tramite fotopletismografia (PPG); il microcontrollore a bordo esegue automaticamente l'intero processo di filtraggio del segnale, calcolo dei dati e calibrazione dei valori e infine trasmette i risultati attraverso due interfacce di comunicazione universali: I2C e UART. Questo riduce enormemente la difficoltà di adattamento hardware per gli sviluppatori e l'occupazione di risorse dell'MCU host, e anche i principianti possono completare rapidamente lo sviluppo dei progetti. Inoltre, il modulo è fornito con un software per PC dedicato che permette di leggere i dati direttamente dal computer e di visualizzare in tempo reale frequenza cardiaca e SpO2, per un debug semplice ed efficiente.

## 2. Principio di funzionamento del rilevamento

Il modulo utilizza il **metodo di rilevamento fotopletismografico (PPG)** per misurazioni fisiologiche non invasive: le arterie del corpo umano si dilatano e si contraggono ritmicamente con i battiti del cuore, causando fluttuazioni periodiche del volume sanguigno nei vasi; la variazione del volume sanguigno influisce direttamente sulla trasmittanza della luce nel tessuto del polpastrello. Il modulo emette luce a una lunghezza d'onda specifica e raccoglie il segnale riflesso per catturare le variazioni dinamiche della trasmittanza e, grazie all'algoritmo integrato, calcola con precisione frequenza cardiaca e saturazione di ossigeno in tempo reale.

## 3. Precauzioni d'uso

1. **La pressione applicata influisce sulla precisione dei dati**: se la forza con cui il dito preme il sensore non è uniforme o la pressione cambia continuamente, il segnale del percorso ottico viene disturbato e i valori di frequenza cardiaca e SpO2 presentano deviazioni; durante l'uso si consiglia di mantenere il dito stabile e una pressione costante.
1. **Indicazioni di posizionamento**: l'area di misurazione di questo modulo è limitata al polpastrello e la sonda di rilevamento non ha un verso distinto, quindi il posizionamento non presenta alcuna difficoltà.
1. **Dichiarazione di non dispositivo medico**: questo prodotto è un modulo di rilevamento elettronico consumer, non un dispositivo medico professionale; i dati misurati servono solo come riferimento per la salute quotidiana e non possono essere utilizzati per diagnosi cliniche, monitoraggio di malattie o trattamenti medici ausiliari.

- È sufficiente appoggiare il polpastrello sul sensore e fissarlo con la fascetta in dotazione

![Illustrazione](../../../../../public/images/tutorials/accessories/heart-rate-spo2/product-info/01.png)

## 4. Specifiche tecniche

- Tensione di alimentazione: 3,3-5 V
- Corrente di esercizio: <15 mA
- Modalità di comunicazione: I2C/UART
- Indirizzo I2C: 0x57
- Baud rate della porta seriale: 9600
- Intervallo di temperatura di esercizio: -40 ℃~85 ℃
- Dimensioni del prodotto: 25,5*32 mm

**Definizione dei pin (serigrafia):**

| N. | Serigrafia | Descrizione della funzione |
|---|---|---|
| 1 | D/T | Linea dati I2C/TX |
| 2 | C/T | Linea di clock I2C/RX |
| 3 | GND | Polo negativo dell'alimentazione |
| 4 | VCC | Polo positivo dell'alimentazione |

## 5. Scenari applicativi tipici

- Progetti di sviluppo per il monitoraggio di frequenza cardiaca e SpO2 su dispositivi indossabili
- Realizzazione DIY di semplici misuratori domestici di frequenza cardiaca e SpO2
- Sistemi di monitoraggio continuo e ininterrotto dei segni vitali del corpo umano
- Progetti hardware open source per maker ed esperimenti di rilevamento fisiologico nei corsi universitari di elettronica
