---
title: Modulo di interazione vocale IA
category: accessory
description: "Modulo vocale IA con chip CI1302: riconoscimento 100% offline di oltre 110 comandi e uscita seriale o IIC per Arduino, Jetson, RDK, Raspberry Pi e PC."
keywords: [ia vocale, modulo di interazione vocale, ci1302, riconoscimento vocale offline, parola di attivazione, parole di comando, porta seriale, iic, ros1, ros2]
---

# Modulo di interazione vocale IA

> **[Acquista su Taobao](https://item.taobao.com/item.htm?id=1055967142978)**

## Panoramica

Il modulo di interazione vocale IA si basa sul chip vocale intelligente ad alte prestazioni con rete neurale **CI1302** di Chipintelli, che integra il processore di rete neurale cerebrale BNPU V3 e supporta il riconoscimento vocale far-field offline; il **coprocessore STC8H** a bordo converte automaticamente i risultati del riconoscimento in dati della porta seriale o IIC, semplificando la comunicazione con i dispositivi controller host esterni. L'intero riconoscimento avviene localmente sul modulo, senza necessità di connessione a Internet.

**Caratteristiche principali**:

- Riconoscimento vocale 100% offline, senza connessione a Internet (privacy + bassa latenza)
- **110+ comandi vocali** preimpostati in fabbrica; supporto per parole di comando personalizzate in cinese e inglese (fino a circa 120 voci)
- Parola di attivazione “你好，小犀”; dopo 15 secondi senza comandi entra automaticamente in sospensione, basta ripetere la parola di attivazione per riprendere l'uso
- Altoparlante ad alta fedeltà e microfono ad alte prestazioni integrati, con riduzione del rumore e cancellazione dell'eco; tasso di riconoscimento fino al 99% entro 5 metri
- Coprocessore STC8H a bordo — i risultati del riconoscimento vengono emessi come dati seriali / IIC
- Due modalità di riproduzione: attiva e passiva
- SDK ROS1 / ROS2 e tutorial di comunicazione per Arduino / Jetson / RDK / Raspberry Pi / PC

---

## Specifiche

| Categoria | Specifica |
|------|------|
| Chip vocale | CI1302 di Chipintelli (processore di rete neurale BNPU V3, frequenza fino a 220MHz) |
| Memoria | 640KB SRAM + 2MB Flash |
| Comandi vocali | 110+ preimpostati; parole di comando personalizzate in cinese e inglese, fino a circa 120 voci |
| Metodo di attivazione | Parola di attivazione “你好，小犀” (modificabile) |
| Distanza di riconoscimento | Entro 5 metri (ambiente silenzioso, tasso di riconoscimento fino al 99%) |
| Audio | Altoparlante ad alta fedeltà + microfono ad alte prestazioni integrati (riduzione del rumore + cancellazione dell'eco) |
| Interfacce di comunicazione | Seriale / IIC / Type-C (coprocessore STC8H a bordo) |
| Alimentazione | 5V (Type-C) |
| Piattaforme supportate | Arduino, Jetson, RDK, Raspberry Pi, PC (STM32 / ESP32 / MSPM0 e altri MCU) |
| Supporto software | SDK ROS1 / ROS2, strumento per il flash del firmware, strumento web per voci personalizzate |

---

## Avvio rapido

Il firmware di riconoscimento vocale è già stato caricato in fabbrica, quindi è possibile provarlo subito senza eseguire il flashing:

1. Alimentare il modulo con un cavo dati Type-C (5V)
2. Pronunciare la parola di attivazione “你好，小犀”: dopo che il modulo risponde “我在”, è possibile impartire i comandi (ad es. “vai avanti”)
3. Se entro 15 secondi non viene riconosciuta alcuna parola di comando, il modulo riproduce “我去休息了” ed entra in sospensione; per riutilizzarlo è sufficiente pronunciare di nuovo la parola di attivazione

Per aggiungere altre voci di riconoscimento, è possibile modificare le parole di comando tramite lo strumento web per generare un nuovo firmware, quindi scriverlo nel modulo con il software per PC; per i dettagli si vedano [Flash del firmware del modulo](/it/tutorials/accessories/ai-voice-module/Firmware-Flashing) e [Creazione di voci con protocollo personalizzato](/it/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries).

---

## Tutorial completi

- [Avvio rapido — esperienza di unboxing, attivazione e riproduzione](/it/tutorials/accessories/ai-voice-module/Quick-Start)
- [Informazioni sul prodotto — caratteristiche, principio di funzionamento, precauzioni e interfacce hardware](/it/tutorials/accessories/ai-voice-module/Product-Info)
- [Flash del firmware del modulo](/it/tutorials/accessories/ai-voice-module/Firmware-Flashing)
- [Modifica della parola di attivazione e delle parole di comando](/it/tutorials/accessories/ai-voice-module/Wake-Word-Commands-Edit)
- [Creazione di voci con protocollo personalizzato](/it/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries)
- [Interazione vocale ROS1](/it/tutorials/accessories/ai-voice-module/ROS1-Voice-Interaction) / [Interazione vocale ROS2](/it/tutorials/accessories/ai-voice-module/ROS2-Voice-Interaction)
- [Protocollo della porta seriale](/it/tutorials/accessories/ai-voice-module/Serial-Protocol) / [Protocollo IIC](/it/tutorials/accessories/ai-voice-module/IIC-Protocol)
- [Comunicazione con PC](/it/tutorials/accessories/ai-voice-module/PC-Communication)
- Arduino: [Comunicazione seriale](/it/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication) / [Comunicazione IIC](/it/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication)
- Jetson: [Comunicazione seriale](/it/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication) / [Comunicazione IIC](/it/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication)
- RDK: [Comunicazione seriale](/it/tutorials/accessories/ai-voice-module/RDK-Serial-Communication) / [Comunicazione IIC](/it/tutorials/accessories/ai-voice-module/RDK-IIC-Communication)
- Raspberry Pi: [Comunicazione seriale](/it/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication) / [Comunicazione IIC](/it/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication)

---

## Casi d'uso

- Interazione vocale e controllo dei robot tramite comandi (ad es. “vai avanti”, “stop”)
- Controllo vocale domotico (illuminazione, elettrodomestici)
- Prodotti vocali per l'educazione e i giocattoli
- Controllo vocale di apparecchiature industriali
- Progetti DIY di interazione vocale di ogni tipo

---

## FAQ

**D: Serve una connessione a Internet?**
No. Il CI1302 è un chip vocale offline: il riconoscimento avviene localmente sul modulo, senza necessità di connessione a Internet.

**D: Funziona subito appena acquistato?**
Sì. Il firmware con la funzione di riconoscimento vocale è già caricato in fabbrica: basta alimentare il modulo via Type-C e pronunciare la parola di attivazione per provarlo; il flashing è necessario solo quando si aggiungono voci personalizzate.

**D: Supporta i comandi in inglese?**
Sì. È possibile personalizzare parole di comando in cinese e inglese: si modificano tramite lo strumento web, si genera il firmware e lo si scrive nel modulo.

**D: Come comunica con il controller host?**
Il coprocessore STC8H a bordo converte automaticamente i risultati del riconoscimento in dati della porta seriale o IIC; sono disponibili i tutorial di comunicazione per Arduino, Jetson, RDK, Raspberry Pi e PC, oltre agli SDK ROS1 / ROS2.

**D: Qual è la distanza di riconoscimento?**
In un ambiente silenzioso il tasso di riconoscimento raggiunge il 99% entro 5 metri; un ambiente rumoroso influisce sull'effetto del riconoscimento.

---

## Precauzioni

- Alimentare con una tensione di 5V: superare i 5V danneggia il modulo
- L'ambiente d'uso deve essere il più silenzioso possibile; un ambiente rumoroso influisce sul riconoscimento
- Quando si pronunciano le voci di comando, il volume deve essere alto e il ritmo non troppo veloce; si consiglia di mantenersi entro 5 metri dal modulo

---

## Supporto

- 📧 E-mail: support@juxitech.com
- 🌐 Sito ufficiale: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Feedback](https://github.com/Juxi-Technology/wiki-documents/issues)
