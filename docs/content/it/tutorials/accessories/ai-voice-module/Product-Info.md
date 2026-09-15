---
title: "Informazioni sul prodotto"
description: "CI1302 è un chip vocale intelligente di nuova generazione ad alte prestazioni con rete neurale, sviluppato da…"
---

# Informazioni sul prodotto

## 1. Introduzione al modulo di interazione vocale

CI1302 è un chip vocale intelligente di nuova generazione ad alte prestazioni con rete neurale, sviluppato da Chipintelli. Integra il processore di rete neurale cerebrale BNPU V3 sviluppato internamente da Chipintelli e un core CPU, con frequenza di sistema fino a 220MHz, SRAM integrata fino a 640KByte, unità di gestione dell'alimentazione PMU e oscillatore RC, oltre a un Audio Codec dual-channel ad alte prestazioni e basso consumo e a molteplici interfacce di controllo periferiche quali UART, IIC, IIS, PWM, GPIO e PDM. Il chip richiede solo pochi componenti periferici come resistenze e condensatori per realizzare soluzioni hardware per ogni tipo di prodotto vocale intelligente, con un rapporto qualità-prezzo estremamente elevato.

Adotta la tecnologia BNPU hardware di terza generazione e supporta reti neurali come DNN\\TDNN\\RNN\\CNN e operazioni vettoriali parallele, consentendo funzioni quali riconoscimento vocale, riconoscimento del timbro vocale, autoapprendimento delle parole di comando, rilevamento vocale e riduzione del rumore tramite deep learning. La soluzione basata su questo chip supporta inoltre numerose lingue globali, tra cui cinese, inglese e giapponese, e può essere ampiamente applicata in ambiti quali elettrodomestici, illuminazione, giocattoli, dispositivi indossabili, industria e automotive, per realizzare interazione e controllo vocale e ogni tipo di applicazione vocale intelligente.

Il chip CI1302 dispone di un core processore di rete neurale cerebrale (BNPU), supporta il calcolo accelerato NN offline e l'accelerazione hardware dell'elaborazione del segnale vocale, ha una frequenza CPU fino a 220MHz, è in grado di eseguire il riconoscimento vocale far-field offline, ha una memoria FLASH integrata da 2MB e può supportare 300 parole di comando.

## 2. Caratteristiche del prodotto

- 110+ comandi vocali preimpostati, con supporto per parole di comando personalizzate in cinese e inglese.

L'utente può modificare le parole di comando tramite la pagina web che forniamo, generare un nuovo file di firmware e scrivere il firmware nel modulo tramite il software per PC; il modulo sarà quindi in grado di riconoscere i nuovi comandi. Con lo spazio di archiviazione integrato da 2M è possibile scrivere fino a circa 120 parole di comando.

- Altoparlante ad alta fedeltà e microfono ad alte prestazioni integrati.

Integra algoritmi avanzati e tecnologia di riduzione del rumore a livello di circuito, è in grado di filtrare efficacemente il rumore di fondo ambientale e raggiunge un tasso di riconoscimento fino al 99% entro un raggio di 5 metri, consentendo così una conversazione naturale e la cancellazione dell'eco. Offre un'uscita audio nitida e riproduce con precisione i dettagli della voce.

- Coprocessore e interfacce IIC/porta seriale/Type-C a bordo.

Integra un chip STC8H che converte automaticamente i dati vocali nel formato dati della porta seriale o IIC, semplificando il processo di comunicazione con i dispositivi controller host esterni. Vengono forniti gratuitamente diversi cavi di collegamento, con cui l'utente può collegare il modulo a schede di sviluppo MCU e a dispositivi controller host embedded per comunicare e creare i propri progetti DIY.

- Tutorial d'uso basati su diverse schede di sviluppo

Vengono fornite informazioni sulle schede di sviluppo, ad esempio STM32, ESP32, MSPM0, Raspberry Pi, la serie di schede di sviluppo Jetson, RDK, ecc. Vengono inoltre forniti i file SDK per i sistemi ROS1 e ROS2.

## 3. Principio di funzionamento

Il modulo utilizza l'attivazione in modalità comando: l'utente deve pronunciare la parola di attivazione configurata per attivare prima il modulo di interazione vocale; dopo l'attivazione è possibile eseguire il riconoscimento vocale. La parola chiave di attivazione predefinita nel firmware di fabbrica è “你好，小犀”. Se dopo 15 secondi non viene riconosciuto alcun parlato, il modulo entra in modalità sospensione e, al successivo utilizzo, è necessario riattivarlo.

Quando il chip CI1302 riconosce la voce corrispondente, la invia tramite la porta seriale o l'interfaccia IIC e ne fornisce la riproduzione come riscontro; il chip IIC memorizza il comando vocale ricevuto e lo invia tramite il protocollo slave IIC.

Il modulo supporta la modifica della parola di attivazione, la modifica delle parole di comando e le voci personalizzate; è possibile apprendere come procedere nei tutorial "[Modifica della parola di attivazione e delle parole di comando](https://juxitech.feishu.cn/wiki/Po6bw8OtLiDNonklg7ZcBbGknyc)" e "[Creazione di voci con protocollo personalizzato](https://juxitech.feishu.cn/wiki/CIHLwo8qNiVBtKkhuTtcZIeNnAb)".

## 4. Precauzioni

1、Alimentare con una tensione di 5V; superare i 5V danneggia il modulo

2、L'ambiente d'uso deve essere silenzioso; un ambiente rumoroso influisce sul riconoscimento

3、Quando si pronuncia una voce, il volume deve essere alto e il ritmo non troppo veloce; si consiglia di rimanere entro 5 metri dal modulo

## 5. Descrizione dell'interfaccia hardware

![Immagine 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Product-Info/1.png)

<RelatedProducts slugs="ai-voice-module" />
