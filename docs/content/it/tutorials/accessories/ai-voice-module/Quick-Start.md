---
title: "Avvio rapido"
description: "Il firmware con funzione di riconoscimento vocale è già stato caricato in fabbrica, quindi l'utente può prova…"
---

# Avvio rapido

Il firmware con funzione di riconoscimento vocale è già stato caricato in fabbrica, quindi l'utente può provarlo subito senza eseguire il flashing. Se occorre aggiungere altre voci di riconoscimento, riscrivere un altro firmware o personalizzare le voci, è possibile consultare il tutorial "3. Creazione di voci con protocollo personalizzato" per vedere come personalizzare le voci.

## 1. Preparazione prima dell'uso

1. Un cavo dati type-c  

2. Modulo di interazione vocale

## 2. Connessione del dispositivo

![Immagine 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Quick-Start/1.png)

## 3. Riconoscimento vocale e realizzazione della riproduzione

Dopo aver alimentato il modulo di interazione vocale tramite type-c, è possibile attivarlo con la parola di attivazione “你好，小犀”. Un modulo attivato correttamente risponde “我在”, indicando che al momento si trova nello stato di riconoscimento vocale. Se entro 15 secondi non viene riconosciuta alcuna voce di comando, il modulo entra in modalità sospensione e riproduce “我去休息了”. Per riattivare il modulo è sufficiente pronunciare di nuovo la parola di attivazione.

Il firmware di fabbrica include già parole di comando e frasi di riproduzione; l'elenco dei protocolli è disponibile negli allegati forniti. La figura seguente mostra una parte dell'elenco dei protocolli delle parole di comando e delle frasi di riproduzione: è possibile verificare quale funzione rappresenta la parola di comando corrispondente tramite il tipo di funzione. Le frasi di riproduzione che devono essere riprodotte sono frasi di riproduzione passive e possono essere attivate solo inviando il comando corrispondente al modulo di interazione vocale da una porta seriale del computer oppure da un altro microcontrollore o dispositivo controller host; per i dettagli si veda la figura seguente.

Parole di funzione:

Parole di comando:

Frasi di riproduzione:

Esistono due modalità di riproduzione: una attiva e una passiva

Riproduzione attiva: dopo che abbiamo pronunciato una parola di comando secondo la tabella, il modulo riproduce attivamente la frase corrispondente; dopo l'attivazione, quando diciamo “小车前进”, il modulo, una volta riconosciuto, riproduce attivamente “好的，正在前进” 

Riproduzione passiva: è necessario inviare al modulo vocale il comando presente nella tabella dei protocolli tramite la porta seriale, e solo allora il modulo riproduce la frase corrispondente; è inoltre possibile scrivere i corrispondenti dati di riproduzione nel registro della riproduzione passiva secondo il protocollo IIC. Per i dettagli si veda "Comunicazione multi-controller host".



