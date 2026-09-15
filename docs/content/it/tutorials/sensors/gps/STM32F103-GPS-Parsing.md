---
title: "STM32F103: output analisi GPS"
description: "Analisi dei dati GPS con STM32F103C8T6: collegare il modulo via UART, analizzare le informazioni di posizione e convertire latitudine e longitudine in gradi."
---

# STM32F103: output analisi GPS

**1. Obiettivi di apprendimento**

In questa lezione impareremo principalmente a utilizzare l'STM32F103C8T6 e il modulo GPS per implementare la funzione di output dell'analisi delle informazioni di posizione.

**2. Preparazione preliminare**

Il modulo GPS utilizza la comunicazione UART e USB. Qui si utilizza la porta UART dell'STM32 per leggere le informazioni; collegare il TXD del modulo al pin PA10 della scheda STM32F103C8T6. VCC e GND vanno collegati rispettivamente a 5V e GND dell'STM32F103C8T6; il GND e l'RXD del modulo TTL vanno collegati rispettivamente al GND e al PA9 dell'STM32.

![Immagine 1](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/1.png)

**3.** **Programma**

Il baud rate del modulo è 9600.

![Immagine 2](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/2.jpg) 

Leggere e analizzare i dati ricevuti.

![Immagine 3](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/3.jpg) 

Convertire l'unità delle informazioni di latitudine e longitudine in gradi

![Immagine 4](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/4.jpg) 

Stampare tramite la porta seriale i dati ricevuti.

![Immagine 5](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/5.jpg) 

Nota: in realtà il valore del sistema di coordinate del posizionamento GPS/BeiDou non ha una semplice relazione di 100 volte, ma richiede una conversione di gradi, minuti e secondi. Pertanto, i valori di coordinata GPS/BeiDou che otteniamo, come latitudine nord 2429.53531 e longitudine est 11810.78036, richiedono il seguente calcolo: 24+（29.53531/60）≈ 24.49225517 118+（10.78036/60）≈118.17967267. Inoltre, microcontrollori diversi possono presentare un certo errore a causa di problemi di precisione nella conversione dei dati.

**4. Fenomeno sperimentale**

Dopo aver alimentato il modulo, sono necessari circa 32 s per l'avvio; successivamente il LED di stato della stampa seriale sul modulo lampeggerà in modo continuo e a quel punto sarà possibile ricevere i dati normalmente.

Dopo aver scaricato ed eseguito il programma, aprire il software della porta seriale e impostare il baud rate a 9600; la porta seriale stamperà ciclicamente le informazioni di posizione attuali.

![Immagine 6](../../../../../public/images/tutorials/sensors/gps/STM32F103-GPS-Parsing/6.jpg) 

Nota: l'antenna del modulo deve trovarsi all'aperto, altrimenti potrebbe non rilevare il segnale GPS.

<RelatedProducts slugs="gps-beidou-module" />
