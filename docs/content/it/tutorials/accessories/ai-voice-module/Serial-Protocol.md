---
title: "Protocollo della porta seriale"
description: "Aprire negli allegati il file 命令词播报词协议列表V1中文: si possono vedere il protocollo di invio e il protocollo di ric…"
---

# Protocollo della porta seriale

Aprire negli allegati il file 命令词播报词协议列表V1_中文: si possono vedere il protocollo di invio e il protocollo di ricezione,

## 1. Analisi delle voci funzionali

In base al file si possono vedere i protocolli di invio e di ricezione di 10 voci funzionali,

![Immagine 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/1.png)

Le voci funzionali possono essere distinte analizzando il terzo byte del protocollo

![Immagine 2](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/2.png)

Tra questi, il primo e il secondo byte (EF EF) rappresentano l'intestazione del frame, il terzo byte rappresenta l'ID della parola di funzione, il quarto byte rappresenta l'ID della parola di comando e il quinto byte (EE) rappresenta la coda del frame

## 2. Voci di comando

Di seguito un esempio di voce di comando; il quarto byte della parola di comando rappresenta l'ID

![Immagine 3](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/3.png)

Esempio:

Ad esempio, se diciamo 小车停止 al modulo, il modulo invierà tramite la porta seriale i cinque byte FE EF 00 01 EE. Possiamo ottenere questo gruppo di dati tramite la funzione di servizio della porta seriale del controller host, quindi analizzare il quarto byte per ottenere ID:01: a questo punto sappiamo che si tratta di 小车停止.

## 3. Voci di frase di riproduzione

Le voci di frase di riproduzione non vengono riprodotte attivamente: la riproduzione avviene solo se il controller host invia il comando tramite la porta seriale (anche la frase di riproduzione delle voci di comando può essere riprodotta).

![Immagine 4](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/4.png)

Tra questi, il primo e il secondo byte (FE EF) rappresentano l'intestazione del frame, il terzo byte rappresenta la funzione di riproduzione FF, il quarto byte rappresenta l'ID del contenuto da riprodurre e il quinto byte (EE) rappresenta la coda del frame

Esempio:

Quando dobbiamo riprodurre “初始化完成”, il controller host deve inviare FE EF FF 67 EE al modulo di interazione vocale tramite la porta seriale; al termine dell'invio, il modulo di interazione vocale riprodurrà “初始化完成”

![Immagine 5](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/5.png)

<RelatedProducts slugs="ai-voice-module" />
