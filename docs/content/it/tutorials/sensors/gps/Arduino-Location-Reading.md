---
title: "Arduino: lettura posizione"
description: "In questa lezione impareremo principalmente a utilizzare Arduino e il modulo GPS per implementare la funzione…"
---

# Arduino: lettura posizione

**1. Obiettivi di apprendimento**

In questa lezione impareremo principalmente a utilizzare Arduino e il modulo GPS per implementare la funzione di lettura delle informazioni di posizione.

**2. Preparazione preliminare**

Il modulo GPS utilizza la comunicazione UART e USB. Qui si utilizza la porta UART di Arduino UNO per leggere le informazioni; collegare il TX del modulo al pin D0 della scheda Arduino UNO. VCC e GND vanno collegati rispettivamente a 5V e GND.

![Immagine 1](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Reading/1.png)

**3.** **Programma**

Inizializzare la porta seriale.

![Immagine 2](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Reading/2.jpg) 

Stampare i dati ricevuti.


**4. Compilazione e download del programma**

4.1 Dobbiamo aprire il file con il software Arduino IDE, quindi fare clic sulla "√" nella barra dei menu per compilare il programma e attendere che in basso a sinistra compaia la dicitura "compilazione riuscita".

 ![Immagine 3](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Reading/3.jpg)

4.2 Nella barra dei menu di Arduino IDE dobbiamo selezionare 【Strumenti】---【Porta】--- selezionare il numero di porta appena visualizzato in Gestione dispositivi, come mostrato nella figura seguente.

![Immagine 4](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Reading/4.jpg) 

4.3 Completata la selezione, fare clic sulla "→" sotto la barra dei menu per caricare il codice sulla scheda UNO. Quando in basso a sinistra compare la dicitura "caricamento completato", significa che il programma è stato caricato correttamente sulla scheda UNO, come mostrato nella figura seguente.

![Immagine 5](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Reading/5.jpg) 

 

**5. Fenomeno sperimentale**

Dopo aver alimentato il modulo, sono necessari circa 32 s per l'avvio; successivamente il LED di stato della stampa seriale sul modulo lampeggerà in modo continuo e a quel punto sarà possibile ricevere i dati normalmente.

Dopo aver scaricato ed eseguito il programma, aprire la finestra del monitor seriale e il software della porta seriale, impostare il baud rate a 9600; la porta seriale stamperà ciclicamente le informazioni di posizione attuali. Queste informazioni sono dati grezzi non elaborati, pertanto è possibile consultare  CASIC多模卫星导航接收机协议规范.pdf  per visualizzare il contenuto specifico di ciascun messaggio.

![Immagine 6](../../../../../public/images/tutorials/sensors/gps/Arduino-Location-Reading/6.jpg) 

Nota: l'antenna del modulo deve trovarsi all'aperto, altrimenti potrebbe non rilevare il segnale GPS.

<RelatedProducts slugs="gps-beidou-module" />
