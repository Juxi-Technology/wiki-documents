---
title: "Posizionamento assistito AGNSS"
description: "In questa lezione impareremo principalmente a utilizzare la Raspberry Pi, il modulo GPS e un server agnss per…"
---

# Posizionamento assistito AGNSS

**1. Obiettivi di apprendimento**

In questa lezione impareremo principalmente a utilizzare la Raspberry Pi, il modulo GPS e un server agnss per implementare la lettura e l'analisi delle informazioni di posizione in condizioni di segnale debole.

**2. Descrizione di AGNSS**

2.1. **Perché usare AGNSS**

• Le condizioni per il posizionamento di un ricevitore GNSS autonomo includono:

- Acquisire e inseguire i segnali satellitari, risolvere il tempo

- Ottenere il messaggio di navigazione dal satellite

• In un ambiente con segnale forte, un ricevitore GNSS autonomo può effettuare il posizionamento a freddo in circa 30 secondi; tuttavia, in un ambiente con segnale debole, un ricevitore senza assistenza esterna acquisisce i satelliti molto lentamente e difficilmente riesce a ottenere il messaggio di navigazione dai satelliti, per cui può impiegare molto tempo prima di posizionarsi o addirittura non riuscirci.

• AGNSS può fornire al ricevitore le informazioni di assistenza necessarie al posizionamento, come il messaggio di navigazione, la posizione approssimativa e il tempo. Sia in ambiente con segnale forte sia debole, queste informazioni possono ridurre notevolmente il tempo al primo fissaggio.

2.2. **Soluzione AGNSS**

• Il server AGNSS acquisisce e gestisce le informazioni di assistenza AGNSS da più fonti di dati GNSS. Il server è costantemente in ascolto e risponde alle richieste AGNSS dei client (sono richiesti nome utente e password).

• L'utente ottiene le informazioni di assistenza dal server AGNSS tramite il protocollo TCP/IP; le informazioni di assistenza ottenute possono essere trasmesse direttamente al ricevitore GNSS.

• L'utente può anche creare un proprio server proxy.

![Immagine 1](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/1.png) 

2.3. **Flusso AGNSS**

• Connessione al server AGNSS

–L'indirizzo del server è 121.41.40.95 (dominio: www.gnss-aide.com)

–Il numero di porta è 2621

• Invio della richiesta AGNSS

–Istruzione di richiesta: (i campi nome utente e password sono obbligatori)

–user=pm@juxi.com;pwd=juxi;cmd=full;gnss=gps+bd;lat=60.0;lon=55.0;alt=0;

• Ottenimento delle informazioni di assistenza AGNSS

• Invio delle informazioni di assistenza AGNSS al ricevitore

2.4. **Parametri della richiesta AGNSS**

• Il client invia la richiesta al server AGNSS; il formato dell'istruzione di richiesta è il seguente

–L'istruzione di richiesta è una combinazione di più gruppi key=value;, ad esempio: key=value;key=value;

• Esempio: user=pm@juxi.com;pwd=juxi;cmd=full;gnss=gps+bd;lat=60.0;lon=55.0;alt=0;

• La definizione concreta di key e value è riportata nella tabella seguente

| Parola chiave (Key) | Valore (value) | Opzionalità | Note                                                        |
| ----------- | ----------- | ------ | ------------------------------------------------------------ |
| **user**    | Stringa      | Obbligatorio   | Nome utente. Si consiglia vivamente di utilizzare come nome utente un indirizzo email valido; le importanti informazioni di manutenzione del server AGNSS verranno inviate a tale indirizzo email. |
| **pwd**     | Stringa      | Obbligatorio   | Password utente                                                     |
| **gnss**    | Stringa      | Opzionale   | Elenco di GNSS separati da virgole; attualmente supporta GPS. I valori validi sono: gps,bds,glo. "gnss=gps;" indica la richiesta delle informazioni di assistenza GPS; "gnss=gps,bds;" indica la richiesta delle informazioni di assistenza GPS e BDS; |
| **cmd**     | Stringa      | Opzionale   | full: tutte le informazioni, incluse effemeridi, tempo e posizione stimati. eph: fornisce solo le informazioni sulle effemeridi. aid: informazioni assistite su tempo e posizione. Se non viene compilato, il valore predefinito è full |
| **lat**     | Valore numerico        | Opzionale   | Valore stimato della latitudine della posizione dell'utente. Unità della latitudine: gradi. L'intervallo di valori è da -90 a 90 gradi. I formati di assistenza alla posizione sono due: formato latitudine, longitudine e altitudine e formato ECEF; se ne sceglie uno dei due. Il formato valido di assistenza alla posizione latitudine, longitudine e altitudine è "lat=30;lon=120.3;alt=100;"; i tre campi devono essere completi. |
| **lon**     | Valore numerico        | Opzionale   | Valore stimato della longitudine della posizione dell'utente. Unità della longitudine: gradi. L'intervallo di valori è da -180 a 180 gradi. |
| **alt**     | Valore numerico        | Opzionale   | Valore stimato dell'altitudine della posizione dell'utente. Unità: metri.                              |
| **x**       | Valore numerico        | Opzionale   | Valore stimato della posizione dell'utente (X, Y, Z nel sistema di coordinate ECEF). Unità: metri. Il formato valido di assistenza alla posizione ECEF è "x=30000;y=1111120.3;z=3345100;"; i tre campi devono essere completi. |
| **y**       | Valore numerico        | Opzionale   | Valore stimato della posizione dell'utente (X, Y, Z nel sistema di coordinate ECEF). Unità: metri.           |
| **z**       | Valore numerico        | Opzionale   | Valore stimato della posizione dell'utente (X, Y, Z nel sistema di coordinate ECEF). Unità: metri.           |
| **pacc**    | Valore numerico        | Opzionale   | Accuratezza della posizione dell'utente. Unità: metri.                                 |

2.5. **Informazioni restituite dal server**

![Immagine 2](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/2.png) 

• Esempio di dati restituiti dal server AGNSS: intestazione dei dati + contenuto dei dati di assistenza

• I dati binari sono i dati di assistenza necessari al ricevitore GNSS; questi dati binari includono già di per sé la verifica dei dati. Per il formato dei dati binari fare riferimento alla specifica di protocollo del ricevitore di 中科微.

• Se anche l'intestazione dei dati viene inviata al ricevitore GNSS, non produrrà alcun effetto sul ricevitore GNSS.

2.6. **Confronto delle prestazioni di AGNSS**

• Rispetto a un normale ricevitore GNSS autonomo, il ricevitore AGNSS presenta un miglioramento notevole nelle prestazioni TTFF, soprattutto in condizioni di segnale debole.

![Immagine 3](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/3.jpg) 

2.7. **Avvertenze**

• L'assistenza alla posizione approssimativa deve essere ottenuta dal client in altro modo, ad esempio

–Moduli di comunicazione GSM/GPRS/3G: questi moduli possono ottenere la posizione approssimativa attuale tramite il CELL ID

–Moduli wireless come il WiFi, che possono anch'essi effettuare un posizionamento approssimativo

• La precisione della posizione approssimativa deve essere entro 15 km; un'assistenza alla posizione errata influisce sulle prestazioni del ricevitore

• Se non è possibile ottenere la posizione approssimativa, omettere i campi di posizione (lat,lon,alt,x,y,z) nell'istruzione di richiesta AGNSS; il ricevitore selezionerà automaticamente una posizione valida dallo storico di posizionamento

• Non è necessario utilizzare come posizione approssimativa la posizione prodotta dal ricevitore GNSS stesso

2.8. **Quando è necessario AGNSS**

• Non è necessario scaricare dal server a ogni accensione, risparmiando traffico

–Il chip di 中科微 dispone internamente di una SRAM con backup a batteria e di una FLASH di backup permanente, che possono salvare automaticamente i dati delle effemeridi ricevuti, ecc.

–Durante il normale funzionamento, il chip scarica continuamente dai satelliti i dati delle effemeridi più recenti

• Consultando lo stato del ricevitore si decide se è necessario scaricare i dati AGNSS dal server

–Il ricevitore può emettere l'istruzione di stato del messaggio (per impostazione predefinita non viene emessa; è necessario configurarla per emetterla)

2.9. **Introduzione all'istruzione di stato del messaggio**

![Immagine 4](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/4.png) 

![Immagine 5](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/5.png) 

• Questa istruzione emette il tempo interno attuale del ricevitore + lo stato del messaggio.

• È possibile inviare il comando $PCAS03,,,,,,,,,,,1*1F per emettere una volta al secondo l'istruzione di stato del messaggio

• È possibile inviare il comando $PCAS03,,,,,,,,,,,0*1E per interrompere l'emissione dell'istruzione di stato del messaggio

• Nota: ogni istruzione deve terminare con \r\n (0x0D,0x0A); l'istruzione contiene 11 virgole

• Se il flag di tempo è valido (diverso da 0) e il numero di effemeridi valide è elevato (maggiore di 8), non è necessario scaricare le effemeridi AGNSS.

 

**3. Preparazione preliminare**

**3.1. Cablaggio**

Il modulo GPS utilizza la comunicazione UART o la comunicazione USB. Qui si prende come esempio la comunicazione USB.

![Immagine 6](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/6.png)

Collegare la Raspberry Pi e il modulo GPS con un cavo type-c; eseguire il comando ls /dev | grep 'ttyUSB' e si potrà vedere che il modulo GPS viene riconosciuto come USB0

![Immagine 7](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/7.png) 

**3.2. Richiesta della ak di 百度地图**

Vedere il documento [Tutorial per richiedere la api di 百度地图]()

 

**4. Programma**

Per il programma di questa lezione fare riferimento a: GPS-agnss.py

Inizializzare l'USB:

![Immagine 8](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/8.jpg) 

Nei materiali è necessario inserire il valore di ak richiesto; in questo modo sarà possibile ottenere tramite 百度地图 le informazioni approssimative di latitudine e longitudine attuali.

![Immagine 9](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/9.jpg) 

Qui le informazioni approssimative di latitudine e longitudine ottenute tramite 百度地图 vengono inviate al server; l'account di accesso che utilizziamo è l'account ufficiale di 钜犀. Una volta completata l'acquisizione, l'intero pacchetto viene inviato al modulo.

![Immagine 10](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/10.jpg) 

![Immagine 11](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/11.jpg) 

Funzione di acquisizione e analisi delle informazioni di posizione. Nella figura seguente, tra le informazioni di posizione vengono filtrati i messaggi che iniziano con GNGGA, quindi i dati vengono analizzati e memorizzati nelle varie variabili globali.

![Immagine 12](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/12.jpg) 

![Immagine 13](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/13.jpg) 

Con lo stesso metodo sono state acquisite e analizzate le informazioni di rotta di GNVTG.

![Immagine 14](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/14.jpg) 

I dati analizzati vengono stampati ciclicamente

![Immagine 15](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/15.jpg) 

**5. Esecuzione del programma**

Nel terminale digitare sudo python2 GPS-agnss.py per eseguire il programma.

**6. Fenomeno sperimentale**

**Nota: nel posizionamento assistito la Raspberry Pi deve essere connessa alla rete.**

Dopo aver alimentato il modulo in condizioni di segnale debole, inizia l'inizializzazione dell'USB; se l'inizializzazione riesce viene visualizzato "GPS Serial Opened! Baudrate=9600", altrimenti viene visualizzato "GPS Serial Open Failed!". In caso di errore occorre controllare il cablaggio o la porta USB.

Successivamente viene visualizzato "GPS Agnss start" e inizia l'invio delle informazioni di posizionamento assistito al server; completato l'invio viene visualizzato "GPS Agnss success"

Se entro un certo tempo dall'invio non è ancora stato letto il segnale GPS, viene visualizzato "GPS no found" e vengono stampate le informazioni approssimative di latitudine e longitudine lette tramite 百度地图.

![Immagine 16](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/16.jpg) 

Dopo un po' di tempo, una volta riconosciuto il GPS, vengono stampate ciclicamente le informazioni di posizione e di rotta.

![Immagine 17](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/17.jpg) 

Premere Ctrl+C per uscire dalla lettura delle informazioni.

![Immagine 18](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/18.jpg)

<RelatedProducts slugs="gps-beidou-module" />
