---
title: "Braccio robotico open source SO-ARM101 e AmazingHand con mano destra"
category: robot
description: "Il SO-ARM101 & AmazingHand è una piattaforma completa di IA incarnata open source che abbina il braccio robotico a 6 assi SO-ARM101 alla mano multi-dito a 4…"
keywords: ["Braccio robotico open source SO-ARM101 e AmazingHand con mano destra", "SO-ARM101", "AmazingHand", "LeRobot", "SCS0009", "STS3215"]
---

# Braccio robotico open source SO-ARM101 e AmazingHand con mano destra

## Panoramica del prodotto

Il SO-ARM101 & AmazingHand è una piattaforma completa di IA incarnata open source che abbina il braccio robotico a 6 assi SO-ARM101 alla mano multi-dito a 4 dita e 8 gradi di libertà AmazingHand. La pinza parallela di serie viene sostituita da una mano a quattro dita azionata da un unico servo del braccio leader, che garantisce presa ed estensione sincronizzate delle quattro dita tramite un meccanismo semplice, affidabile e montato in fabbrica. Basata sull'ecosistema LeRobot di Hugging Face, supporta teleoperazione leader-follower, raccolta dati con doppia vista e apprendimento per imitazione end-to-end con ACT, SmolVLA, Pi0, Pi0.5 e GR00T N1.5: il punto di partenza più semplice per passare da una pinza a una mano multi-dito.

**SO-ARM101**è un braccio robotico a 6 assi open source profondamente ottimizzato a partire dall'SO-ARM100. Il nuovo instradamento dei cavi e il nuovo abbinamento motore/ingranaggi eliminano il problema di rottura dei cavi alle articolazioni e non limitano più l'ampiezza di movimento, supportando inoltre l'inseguimento leader-follower in tempo reale e la piena compatibilità con il kit di strumenti LeRobot di Hugging Face.

**AmazingHand**è un kit di sviluppo per mano robotica a 8 gradi di libertà, open source, a basso costo e completamente stampabile in 3D. I servi sono interamente alloggiati nel corpo della mano con un design interno senza cavi, e ogni dito è azionato da due articolazioni, combinando destrezza e collaborazione naturale tra le dita.

## Vantaggi principali

### Mano multi-dito a quattro dita con 8 gradi di libertà

AmazingHand offre quattro dita (pollice, indice, medio e anulare), due falangi articolate per dito e 8 gradi di libertà in totale. Un meccanismo a leve parallele consente alle dita di lavorare insieme per una presa più naturale, mentre tutti i servi sono alloggiati nel corpo della mano, senza cablaggi esterni, per una costruzione compatta e pulita.

### Un unico servo con leva aziona tutte e quattro le dita

Il servo n. 6 (STS3215) del braccio leader aziona gli otto servi bus SCS0009 all'interno della mano tramite mappatura della corsa, così un singolo movimento produce la presa sincronizzata delle quattro dita (pugno chiuso) o l'estensione (palmo aperto). Meccanica semplice, controllo affidabile e nessuna programmazione complessa lato mano.

### Apprendimento per imitazione end-to-end con ACT, SmolVLA, Pi0, Pi0.5 e GR00T N1.5

Esegui la teleoperazione leader-follower per registrare i dati dimostrativi, poi addestra una policy di apprendimento per imitazione in un'unica passata. Un piccolo set di dati è sufficiente perché il braccio follower completi autonomamente le attività di presa predefinite, e l'intero ciclo può essere chiuso senza scrivere codice da zero.

### Raccolta dati con doppia vista

Una telecamera superiore su supporto copre l'intera area di lavoro dall'alto per determinare la posizione spaziale e l'orientamento degli oggetti target, mentre una telecamera laterale su supporto da tavolo trasmette il contesto dell'area di lavoro in tempo reale. Insieme mantengono la manipolazione precisa, rispondono rapidamente ai cambiamenti della scena ed evitano derive o stalli.

### Montato in fabbrica, pronto all'uso

Ogni unità viene spedita montata, cablata e calibrata: basta collegare alimentazione e USB e la piattaforma è pronta per teleoperazione e raccolta dati. Le opzioni per la telecamera includono un modulo con autofocus a 86° e 30 FPS e un modulo grandangolare a fuoco fisso da 100° e 60 FPS, entrambi USB, senza driver e plug-and-play.

### Integrazione completa con Hugging Face LeRobot

Riutilizza direttamente i modelli pre-addestrati, i set di dati e le librerie di algoritmi di LeRobot, condividi codice ed esperienze con una community globale di sviluppatori ed entra nell'IA incarnata senza dover ricostruire da zero la toolchain.

## Panoramica hardware

### Versioni disponibili (scegli in base alle esigenze dell'effettore finale):

| Versione | Effettore finale | Controllo della mano | Adatta a |
|---|---|---|---|
| Versione Pro | Pinza flessibile in TPU | Controllo indipendente per servo | Utenti che necessitano della pinza standard a due dita dell'SO-ARM101 |
| Versione con mano multi-dito | Mano multi-dito a quattro dita AmazingHand | Servo n. 6 del braccio leader con mappatura della corsa per azionare 8 servi bus all'unisono | Utenti che esplorano la presa destra e l'apprendimento per imitazione end-to-end |

**Metodo di presa:**la Versione Pro utilizza il pizzico a due dita, mentre la Versione con mano multi-dito usa presa ed estensione a quattro dita. Il controllo indipendente di ciascun dito non è supportato nella versione attuale ed è nella roadmap di sviluppo.

### Dispositivi compatibili:

Controller Raspberry Pi / D-Robotics RDK / serie NVIDIA Jetson, oltre a PC Windows e Linux via seriale USB. Completamente compatibile con i progetti open source LeRobot SO-ARM101 e AmazingHand e supporta la maggior parte dei servi bus seriali sul mercato.

### Configurazione facile in 3 passi:

- Collega la scheda driver servo al tuo controller Raspberry Pi, RDK o Jetson con il cavo in dotazione, poi alimenta il braccio leader (DC5521 5V6A) e il braccio follower (DC5521 12V5A).
- Accendi e collega via seriale USB. Braccio e mano arrivano montati, cablati e calibrati: non servono montaggio meccanico né configurazione degli ID dei servi.
- Segui i tutorial LeRobot forniti per teleoperare il braccio follower, raccogliere set di dati con doppia vista e addestrare la tua policy di apprendimento per imitazione.

## Specifiche tecniche

### Mano multi-dito (AmazingHand)

| Apertura delle dita | 195 mm ~ 101 mm |
|---|---|
| Gradi di libertà | 8 gradi di libertà (azionati da 8 servi bus) |
| Capacità di carico per dito | 0,2 kg (massimo 0,5 kg con tutte e quattro le dita in presa completa) |
| Numero di dita | 4 (pollice, indice, medio, anulare) |
| Falangi per dito | 2 |
| Peso della mano | 0,416 kg |
| Range di flessione delle dita | Prima falange 0~86°, seconda falange 0~80° |
| Angolo di rollio laterale delle dita | Pollice 20°, le altre tre dita -20°~20° |
| Tensione di alimentazione | 6 V DC |
| Metodo di controllo | Azionata dal servo n. 6 del braccio leader — presa/estensione sincronizzata delle quattro dita |
| Potenza | Massima 48 W, nominale 4,8 W |

### Braccio robotico (SO-ARM101)

| Materiale del prodotto | Bambu PLA+ |
|---|---|
| Dimensioni del prodotto | Braccio leader: 111 x 239 x 525 mm
Braccio follower: 111 x 173 x 532 mm |
| Peso del prodotto | Braccio leader: ca. 680 g
Braccio follower: ca. 690 g |
| Scheda driver servo | Adattatore per servo bus JUXI |
| Telecamera | Telecamera HD da 2 MP con autofocus a 30 FPS (1080P)
Telecamera HD da 2 MP a fuoco fisso a 60 FPS (1080P) |
| Alimentazione | DC5521 5V6A (braccio leader) / DC5521 12V5A (braccio follower) |
| Sistema operativo | Windows / Linux |
| Interfaccia di controllo | Comunicazione seriale USB |
| Linguaggio di programmazione | Python |

### Configurazione dei servi

| Posizione | Modello servo | Rapporto di riduzione | Quantità |
|---|---|---|---|
| Braccio leader — articolazione n. 2 (7,4 V) | STS3215-C001 | 1:345 | 1 |
| Braccio leader — articolazioni n. 1 e n. 3 (7,4 V) | STS3215-C044 | 1:191 | 2 |
| Braccio leader — articolazioni n. 4 e n. 5 e pinza/mano n. 6 (7,4 V) | STS3215-C046 | 1:147 | 3 |
| Braccio follower — tutte le articolazioni, Versione Pro (12 V) | STS3215-C018 | 1:345 | 6 |
| Braccio follower — articolazioni del braccio, Versione con mano multi-dito (12 V) | STS3215-C018 | 1:345 | 5 |
| Mano multi-dito AmazingHand (6 V) | SCS0009-C001 | — | 8 |

### Servo bus SCS0009 (mano multi-dito)

| Modello servo | Feetech SCS0009-C001 (servo bus seriale monoasse da 2,3 kg) |
|---|---|
| Velocità di rotazione | 0,07 s/60° (143 RPM) @6V |
| Coppia di stallo | 2,3 kg·cm @6V |
| Precisione del servo | 0,293° (300/1024) |
| Sensore e range | Sensore a potenziometro, 300° controllabili, supporta sia la modalità servo con controllo d'angolo sia la modalità a rotazione continua |
| Protezione | Protezione di tensione, protezione da stallo, protezione da sovratemperatura |
| Lettura dati | Supportata — feedback di temperatura, velocità, tensione e posizione |
| Disposizione | Due servi SCS0009 per dito, per una risposta rapida e coordinata e un movimento fluido delle dita |

### Servo bus STS3215 (braccio robotico)

| Parametro | STS3215-C001 | STS3215-C018 |
|---|---|---|
| Velocità di rotazione | 0,192 s/60° (52 RPM) @7,4 V | 0,222 s/60° (45 RPM) @12 V |
| Coppia di stallo | 19,5 kg·cm @7,4 V | 30 kg·cm @12 V |
| Precisione del servo | 0,088° | 0,088° |
| Sensore e range | Encoder magnetico ad alta precisione a 12 bit, 360° controllabili | Encoder magnetico ad alta precisione a 12 bit, 360° controllabili |
| Protezione | Protezione di tensione, protezione da stallo, protezione da sovratemperatura | Protezione di tensione, protezione da stallo, protezione da sovratemperatura |
| Lettura dati | Supportata — feedback di angolo, temperatura, tensione e posizione | Supportata — feedback di angolo, temperatura, tensione e posizione |

L'STS3215 integra due motori con encoder magnetico di alta qualità con risposta coordinata a livello di millisecondi e diverse modalità operative, mantenendo ogni movimento del braccio fluido e preciso.

### Adattatore per servo bus JUXI (scheda driver)

| Ingresso di alimentazione | 7~12 V |
|---|---|
| Connettore di alimentazione | DC5521 |
| Interfaccia servo | Interfaccia servo bus PH2.0 |
| Interfaccia di comunicazione | USB Type-C |
| Distanza tra i fori di montaggio | 37,00 x 28,00 mm |
| Diametro dei fori di montaggio | 2,5 mm |
| Dimensioni del prodotto | 42,00 x 33,00 mm |
| Peso del prodotto | 15 g |

La scheda ha un design compatto plug-and-play con un modulo di protezione e regolazione di tensione TVS per prevenire guasti da alta tensione. Un solo cavo la collega a controller Raspberry Pi, D-Robotics RDK o NVIDIA Jetson per il controllo motori in tempo reale e il feedback dei dati dell'encoder. Supporta il braccio LeRobot SO-ARM101, la mano multi-dito AmazingHand e la maggior parte dei servi bus seriali sul mercato.

### Modulo telecamera (opzionale)

| Risoluzione | 1080P, 2 MP |
|---|---|
| Opzioni disponibili | Telecamera da 86° con autofocus a 30 FPS / telecamera grandangolare da 100° a fuoco fisso a 60 FPS |
| Interfaccia | USB, senza driver e plug-and-play |
| Opzioni di montaggio | Kit di montaggio telecamera laterale o superiore |

### Applicazioni

- **Ricerca universitaria**— laboratori didattici e progetti di ricerca in robotica, intelligenza artificiale e automazione, in particolare presa destra e apprendimento per imitazione.
- **Sviluppatori e maker**— sviluppo di algoritmi, validazione di prototipi, sviluppo secondario della mano multi-dito e competizioni di robotica.
- **Istituzioni educative**— un sussidio didattico ideale per corsi avanzati di programmazione IA e visione robotica.
- **Appassionati**— costruisci un robot da tavolo che mette in pratica tecniche di IA reali e afferra con una mano simile a quella umana.

## Open source ed ecosistema

Questo prodotto si basa sul progetto open source LeRobot SO-ARM101 e sul progetto AmazingHand. La piattaforma SO-ARM101 & AmazingHand si collega direttamente alla community Hugging Face: i modelli pre-addestrati, i set di dati e le librerie di algoritmi di LeRobot possono essere riutilizzati direttamente, e codice ed esperienze possono essere condivisi con sviluppatori di tutto il mondo, abbassando la barriera tecnica per entrare nell'IA incarnata.

- Il codice sorgente è rilasciato con licenza Apache 2.0.
- I file di progettazione meccanica sono rilasciati con licenza CC BY 4.0.

## Opzioni di pacchetto

| Pacchetto | AmazingHand (montata) | SO-ARM101 Versione Pro | Kit SO-ARM101 mano multi-dito | Kit mano multi-dito (doppia telecamera) |
|---|---|---|---|---|
| Parti stampate in 3D | ✓ | ✓ | ✓ | ✓ |
| Mano multi-dito AmazingHand | ✓ | — | ✓ | ✓ |
| Telecamera di scena | — | — | — | ✓ |
| Raccolta dati con doppia vista | — | — | — | ✓ |
| Teleoperazione leader-follower | — | ✓ | ✓ | ✓ |
| Apprendimento per imitazione end-to-end | ✓ | ✓ | ✓ | ✓ |

## Elenco parti

### Kit SO-ARM101 mano multi-dito:

- 1× braccio leader (montato) — 1× STS3215-C001 (7,4 V, 1:345), 2× STS3215-C044 (7,4 V, 1:191), 3× STS3215-C046 (7,4 V, 1:147)
- 1× braccio follower (montato) — 5× STS3215-C018 (12 V, 1:345)
- 1× mano multi-dito a quattro dita AmazingHand (montata) — 8× servi bus SCS0009-C001 (6 V)
- 2× adattatore per servo bus JUXI (scheda driver servo)
- 1× cavo di alimentazione DC5521 5V6A (braccio leader)
- 1× cavo di alimentazione DC5521 12V5A (braccio follower)
- 2× cavo USB Type-C
- 4× clip di fissaggio
- 1× hub USB

### Kit SO-ARM101 mano multi-dito (doppia telecamera):

Tutto ciò che è incluso nel Kit SO-ARM101 mano multi-dito, più:

- 1× kit di montaggio telecamera superiore con modulo telecamera 1080P da 2 MP
- 1× kit telecamera laterale con supporto da tavolo e modulo telecamera 1080P da 2 MP

### SO-ARM101 Pro (pinza in TPU):

- 1× braccio leader (montato) — 1× STS3215-C001 (7,4 V, 1:345), 2× STS3215-C044 (7,4 V, 1:191), 3× STS3215-C046 (7,4 V, 1:147)
- 1× braccio follower (montato) con pinza flessibile in TPU — 6× STS3215-C018 (12 V, 1:345)
- 2× adattatore per servo bus JUXI (scheda driver servo)
- 1× cavo di alimentazione DC5521 5V6A (braccio leader)
- 1× cavo di alimentazione DC5521 12V5A (braccio follower)
- 2× cavo USB Type-C
- 4× clip di fissaggio
- 1× hub USB

### AmazingHand (mano destra):

- 1× mano multi-dito a quattro dita AmazingHand, completamente montata, con 8× servi bus SCS0009-C001 (6 V)
- 1× adattatore per servo bus JUXI (scheda driver servo)
- 1× cavo di interconnessione


## Tutorial

- [Tutorial SO-ARM101](/it/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Montaggio SO-ARM101](/it/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [Guida alla scelta del braccio robotico](/it/tutorials/robot-arms/select-guide)
- [Introduzione all'IA incarnata (LeRobot)](/it/topics/embodied-ai-intro)
- [Controllo interfaccia AmazingHand](/it/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control)
- [Esempio ufficiale AmazingHand](/it/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example)
- [Debug TTL AmazingHand](/it/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging)


## Supporto

- 📧 E-mail: support@juxitech.com
- 🌐 Sito ufficiale: [www.juxitech.com](https://www.juxitech.com)
