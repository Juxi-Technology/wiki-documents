---
title: "Protocollo IIC"
description: "Nota: il dispositivo host e il modulo di interazione vocale possono utilizzare alimentazioni diverse, ma al m…"
---

# Protocollo IIC

Nota: il dispositivo host e il modulo di interazione vocale possono utilizzare alimentazioni diverse, ma al momento del collegamento devono avere il GND in comune, per garantire un livello di comunicazione stabile

## 1. Il modulo di interazione vocale come slave

Ricezione e analisi del segnale inviato dal controller host:

Attendere l'interrupt del segnale IIC; se vengono ricevuti dati su IIC, chiamare la funzione corrispondente in base alle informazioni sull'indirizzo del registro ricevute via IIC.

Elaborazione dei dati e riscontro:

Quando il modulo di interazione vocale riceve un comando di lettura del registro, deve chiamare la funzione di invio corrispondente per inviare i dati riconosciuti al dispositivo host.

## 2. Indirizzo del dispositivo IIC e funzioni dei registri

L'indirizzo del dispositivo slave IIC del modulo di interazione vocale è 0x2A.

## 3. Acquisizione delle voci di comando.

Aprire negli allegati il file 命令词播报词协议列表V1_中文: si può vedere che il protocollo di comunicazione inizia con 0xFE, 0xED e termina con 0xEE, con 2 byte intermedi che sono rispettivamente il tipo di funzione e il numero ID.

![Immagine 1](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/1.png)

Quando il modulo di interazione vocale riconosce la parola di comando “停车”, risponde “好的，已停止”; il controller host può leggere un byte di dati, 0x02, dal registro dei risultati di riconoscimento (0xDA), dato identico al 4° byte nel protocollo di invio di “停车”.

![Immagine 2](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/2.png)

## 4. Voci di frase di riproduzione

Le voci di frase di riproduzione non vengono riprodotte attivamente: è necessario che il controller host le imposti tramite IIC perché avvenga la riproduzione (anche la frase di riproduzione delle voci di comando può essere riprodotta).

Il controller host, tramite IIC, scrive un byte — il numero ID della parola di comando — nell'indirizzo del registro di riproduzione (0xD1): il modulo di riproduzione vocale riproduce la frase corrispondente. 0xFF è la frase di riproduzione ordinaria.

![Immagine 3](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/3.png)

Ad esempio:

Quando l'utente deve riprodurre “这是红色”, il controller host deve scrivere “0x5F” nel registro di riproduzione (0xD1) tramite IIC; il modulo di interazione vocale riprodurrà “这是红色”.

![Immagine 4](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/4.png)

## 5. Voci di parola di funzione

Le voci di parola di funzione possono essere riprodotte quando viene riconosciuta una parola di comando, oppure tramite la scrittura di un byte specifico via IIC.

Il controller host, tramite IIC, scrive un byte — il numero ID della parola di comando — nell'indirizzo del registro di riproduzione (0xD2): il modulo di riproduzione vocale riproduce la frase corrispondente. 0xFF è la frase di riproduzione ordinaria.

![Immagine 5](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/5.png)

Ad esempio:

Quando l'utente deve riprodurre “这是红色”, il controller host deve scrivere “0x01” nel registro di riproduzione (0xD2) tramite IIC; il modulo di interazione vocale riprodurrà “欢迎使用小犀”.

![Immagine 6](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/6.png)

## 5. Voci di parola di comando

Le voci di parola di comando possono essere riprodotte quando viene riconosciuta una parola di comando, oppure tramite la scrittura di un byte specifico via IIC.

Il controller host, tramite IIC, scrive un byte — il numero ID della parola di comando — nell'indirizzo del registro di riproduzione (0xD3): il modulo di riproduzione vocale riproduce la frase corrispondente. 0xFF è la frase di riproduzione ordinaria.

![Immagine 7](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/7.png)

Ad esempio:

Quando l'utente deve riprodurre “好的，正在前进”, il controller host deve scrivere “0x04” nel registro di riproduzione (0xD3) tramite IIC; il modulo di interazione vocale riprodurrà “好的，正在前进”.

![Immagine 8](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/8.png)

<RelatedProducts slugs="ai-voice-module" />
