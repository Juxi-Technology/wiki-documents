---
title: Robot mobile a due bracci XLeRobot
category: robot
description: "XLeRobot: robot mobile open source a due bracci SO-ARM101 con base a ruote omnidirezionali e torre della telecamera, nell'ecosistema LeRobot."
keywords: [xlerobot, robot a due bracci, robot mobile, ia incarnata, lerobot, so-arm101, base a ruote omnidirezionali]
---

# Robot mobile a due bracci XLeRobot

> **[Acquista su Taobao](https://item.taobao.com/item.htm?id=1045195950187)**

## Panoramica

XLeRobot è una piattaforma robotica mobile a due bracci: un carrello con base a ruote omnidirezionali (ruote orientabili) funge da base mobile e, tramite la torre della telecamera, porta due bracci robotici follower SO-ARM101; con le due schede di driver del servo, il controller host Raspberry Pi/Jetson e il power bank PD, il risultato è un robot open source in grado di manipolare spostandosi, pensato per la ricerca sull'IA incarnata, le faccende domestiche e lo sviluppo nell'ecosistema LeRobot.

**Caratteristiche principali**:

- Manipolazione a due bracci + base mobile omnidirezionale, per afferrare vari oggetti domestici in movimento
- Basato sui bracci robotici SO-ARM101, con servomotori bus Feetech STS3215-C018
- Torre della telecamera + telecamera da polso, con supporto per la raccolta dati e l'imitation learning
- Due schede di driver del servo che pilotano indipendentemente bracci e base, con alimentazione a 12V
- Ecosistema software LeRobot completo: configurazione dell'ambiente, raccolta dati, addestramento e inferenza
- Disponibile in versione assemblata e in kit a pezzi, con elenco completo dei componenti per il kit a pezzi
- Compatibile con la base Lekiwi (se disponi già di un Lekiwi, puoi riutilizzarne direttamente la base a ruote)

---

## Specifiche

| Categoria | Specifica |
|------|------|
| Bracci | SO-ARM101 follower ×2 (servomotori bus Feetech STS3215-C018, ID 1-6) |
| Base | Carrello con base a ruote omnidirezionali (ruote orientabili), 3 servomotori STS3215-C018 (ID 7/8/9) |
| Torre della telecamera | Base della torre della telecamera + 2 servomotori STS3215-C018 (ID 7/8) + telecamera |
| Driver | 2 schede di driver del servo (cavi dati da USB-C a USB-A per il controller host; cavi di alimentazione da PD a DC12V3A) |
| Alimentazione | Power bank PD versione 12V (fino a 100W per porta singola, testato come sufficiente per il funzionamento) |
| Controller host | Raspberry Pi (da procurarsi separatamente) / Jetson |
| Cavi di collegamento | 2 cavi di prolunga del servo da 90CM (carrello di base e torre della telecamera → scheda di driver del servo) |
| Peso totale | Circa 12kg (una volta completamente assemblato) |
| Software | Ecosistema LeRobot; configurazione dei servomotori tramite Bambot (Windows / macOS / Linux) |

---

## Avvio rapido

### 1. Configurare l'ambiente LeRobot

Scegliere il tutorial di configurazione dell'ambiente in base al sistema operativo (macOS / Ubuntu / Windows) e installare LeRobot e le dipendenze.

### 2. Spostare i file XLeRobot

Spostare i file XLeRobot nella directory corrispondente per completare la preparazione del software.

### 3. Assemblare il robot

- **Montaggio kit assemblato**: secondo l'elenco dei componenti, installare direttamente il carrello, la base della torre della telecamera, i due bracci e il cablaggio
- **Montaggio kit a pezzi**: configurare prima i servomotori (scansionare e rinominare gli ID con [Bambot](https://bambot.org/feetech.js)), poi assemblare in sequenza il carrello, la base a ruote, le basi dei bracci robotici e il cablaggio, e infine posizionare la batteria

Con il kit a pezzi si consiglia di collegare i cavi di alimentazione per ultimi; durante l'inserimento o la rimozione degli altri cavi, mantenere l'alimentazione scollegata per proteggere le schede di driver del servo.

---

## Tutorial completi

- [Panoramica dei tutorial XLeRobot](/it/tutorials/robot-arms/xlerobot/)
- [Configurazione (macOS)](/it/tutorials/robot-arms/xlerobot/01-Environment-Setup-macOS)
- [Configurazione (Ubuntu)](/it/tutorials/robot-arms/xlerobot/01-Environment-Setup-Ubuntu)
- [Configurazione (Windows)](/it/tutorials/robot-arms/xlerobot/01-Environment-Setup-Windows)
- [Spostare i file XLeRobot](/it/tutorials/robot-arms/xlerobot/02-Move-Xlerobot-Files)
- [Montaggio kit assemblato](/it/tutorials/robot-arms/xlerobot/03-Assembly-Assembled-Kit)
- [Montaggio kit a pezzi](/it/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit)

---

## Casi d'uso

- Ricerca sull'IA incarnata e sull'imitation learning (faccende domestiche, presa di oggetti)
- Sviluppo di algoritmi di manipolazione mobile a due bracci (ecosistema LeRobot)
- Didattica e competizioni di robotica
- Prototipazione di robot di servizio domestici

---

## FAQ

**D: Qual è la differenza tra il kit assemblato e il kit a pezzi?**
Il kit assemblato è già montato secondo l'elenco dei componenti; il kit a pezzi richiede l'assemblaggio autonomo e la configurazione preliminare degli ID dei servomotori con lo strumento Bambot (bracci 1-6, base 7/8/9, torre della telecamera 7/8).

**D: Quali altri componenti occorre procurarsi?**
Il power bank, il Raspberry Pi e il cavo di alimentazione PD 5V5A per il Raspberry Pi devono essere acquistati separatamente (come indicato nel tutorial).

**D: Come si configurano gli ID dei servomotori?**
Dopo aver collegato i servomotori e la scheda di driver del servo al computer, usare la [pagina di configurazione dei servomotori di Bambot](https://bambot.org/feetech.js) per scansionare e rinominare gli ID dei servomotori; il repository ufficiale del codice LeRobot non supporta ancora la configurazione di servomotori diversi da quelli dei bracci robotici, per cui si usa Bambot in alternativa.

**D: Una volta completato l'assemblaggio, si può spingere il robot per spostarlo?**
No. Una volta completamente assemblato, non spingere l'XLeRobot come un carrello: si rischia di danneggiare gli ingranaggi dei servomotori; quando serve spostarlo manualmente, sollevare il robot (circa 12kg).

---

## Supporto

- 📧 E-mail: support@juxitech.com
- 🌐 Sito ufficiale: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Feedback](https://github.com/Juxi-Technology/wiki-documents/issues)
