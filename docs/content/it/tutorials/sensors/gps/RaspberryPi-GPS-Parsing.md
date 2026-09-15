---
title: "Analisi delle informazioni di posizione del modulo GPS"
description: "In questa lezione impareremo principalmente a utilizzare la Raspberry Pi e il modulo GPS per leggere e analiz…"
---

# Analisi delle informazioni di posizione del modulo GPS

**1. Obiettivi di apprendimento**

In questa lezione impareremo principalmente a utilizzare la Raspberry Pi e il modulo GPS per leggere e analizzare le informazioni di posizione.

**2. Preparazione preliminare**

Il modulo GPS utilizza la comunicazione UART o la comunicazione USB. Qui si prende come esempio la comunicazione USB.

![Immagine 1](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/1.png)

Collegare la Raspberry Pi e il modulo GPS con un cavo type-c; eseguire il comando ls /dev | grep 'ttyUSB' e si potrà vedere che il modulo vocale viene riconosciuto come USB0

![Immagine 2](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/2.jpg) 

**3. Programma**

Per il programma di questa lezione fare riferimento a: GPS.py

Inizializzare l'USB:

![Immagine 3](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/3.jpg) 

Funzione di acquisizione e analisi delle informazioni di posizione. Nella figura seguente, tra le informazioni di posizione vengono filtrati i messaggi che iniziano con GNGGA, quindi i dati vengono analizzati e memorizzati nelle varie variabili globali.

![Immagine 4](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/4.jpg) 

![Immagine 5](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/5.jpg) 

Con lo stesso metodo sono state acquisite e analizzate le informazioni di rotta di GNVTG.

![Immagine 6](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/6.jpg) 

I dati analizzati vengono stampati ciclicamente

![Immagine 7](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/7.jpg) 

**4. Esecuzione del programma**

Nel terminale digitare sudo python2 GPS.py per eseguire il programma.

**5.** **Fenomeno sperimentale**

Dopo aver alimentato il modulo, sono necessari circa 32 s per l'avvio; successivamente il LED di stato della stampa seriale sul modulo lampeggerà in modo continuo e a quel punto sarà possibile ricevere i dati normalmente.

Dopo l'esecuzione del programma inizia l'inizializzazione dell'USB; se l'inizializzazione riesce viene visualizzato "GPS Serial Opened! Baudrate=9600", altrimenti viene visualizzato "GPS Serial Open Failed!". In caso di errore occorre controllare il cablaggio o la porta USB; successivamente vengono stampate ciclicamente le informazioni di posizione e di rotta.

![Immagine 8](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-GPS-Parsing/8.jpg) 

Premere Ctrl+C per uscire dalla lettura delle informazioni.

Nota: l'antenna del modulo deve trovarsi all'aperto, altrimenti potrebbe non rilevare il segnale GPS. Quando il segnale non viene rilevato viene stampato "GPS no found".

<RelatedProducts slugs="gps-beidou-module" />
