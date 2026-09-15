---
title: "Analisi dei dati GPS"
description: "In questa lezione impareremo principalmente a utilizzare il microcontrollore 51 modello STC89C52RC e il modul…"
---

# Analisi dei dati GPS

**1. Obiettivi di apprendimento**

In questa lezione impareremo principalmente a utilizzare il microcontrollore 51 modello STC89C52RC e il modulo GPS per implementare la funzione di analisi delle informazioni di posizione.

**2. Preparazione preliminare**

Il modulo GPS utilizza la comunicazione UART e USB. Qui si utilizza la porta UART del C51 per leggere le informazioni; collegare il TX del modulo al pin P3.0 della scheda 51. VCC e GND vanno collegati rispettivamente a 5V e GND.

![Immagine 1](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/1.png)

**3.** **Programma**

Inizializzare la porta seriale e l'array di dati

![Immagine 2](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/2.jpg) 

Leggere e analizzare i dati ricevuti.

![Immagine 3](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/3.jpg) 

Stampare tramite la porta seriale i dati ricevuti.

![Immagine 4](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/4.jpg) 

**4****. Fenomeno sperimentale**

Dopo aver alimentato il modulo, sono necessari circa 32 s per l'avvio; successivamente il LED di stato della stampa seriale sul modulo lampeggerà in modo continuo e a quel punto sarà possibile ricevere i dati normalmente.

Dopo aver scaricato ed eseguito il programma, aprire il software della porta seriale e impostare il baud rate a 9600; la porta seriale stamperà ciclicamente le informazioni di posizione attuali.

![Immagine 5](../../../../../public/images/tutorials/sensors/gps/51-MCU-GPS-Parsing/5.jpg) 

Nota: l'antenna del modulo deve trovarsi all'aperto, altrimenti potrebbe non rilevare il segnale GPS.

<RelatedProducts slugs="gps-beidou-module" />
