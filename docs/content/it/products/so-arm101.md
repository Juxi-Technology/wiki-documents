---
title: Kit di sviluppo SO-ARM101
category: robot
description: "Il kit robotico a doppio braccio open source di Juxi Technology — bracci 6 DOF, ecosistema LeRobot, teleoperazione/apprendimento per imitazione"
keywords: [so-arm101, braccio robotico, leRobot, teleoperazione, doppio braccio]
---

# Kit di sviluppo SO-ARM101

> **[Acquista nel negozio](https://www.juxitech.com/it/products/so-arm101-developers-kit)**

## Panoramica

SO-ARM101 è il kit di sviluppo robotico a doppio braccio 6-DOF open source di Juxi Technology, profondamente integrato con l'ecosistema **LeRobot**. Braccio leader nero + braccio follower bianco, pronto all'uso per teleoperazione, raccolta dati di apprendimento per imitazione e addestramento di policy.

**Caratteristiche principali**:

- Doppi bracci, 6 DOF ciascuno, servo a bus
- Integrazione profonda con LeRobot (HuggingFace) — policy ACT/Diffusion/Pi0
- Supporto Jetson / PC (Linux)
- Hardware completamente open source (schemi/CAD/firmware)

## 1. Progettazione hardware: modulare ad alte prestazioni, facile da assemblare e personalizzare

- **Materiali strutturali**: la struttura principale combina componenti stampati in 3D e parti portanti rinforzate, con cablaggio e design delle articolazioni ottimizzati per evitare interferenze nel movimento, bilanciando leggerezza e durata; l'utente può stampare autonomamente i componenti strutturali per sostituirli o ampliarli.

- **Configurazione di azionamento**: il braccio follower monta **6 servomotori a coppia elevata da 12V 30KG con encoder magnetico**, abbinati a un feedback a encoder magnetico a 360° e all'algoritmo di controllo PID; il movimento è fluido e senza vibrazioni, con elevata precisione di posizionamento ripetibile, potenza elevata e azioni precise; il braccio leader utilizza invece **6 servomotori da 7.4V**, con rapporti di riduzione diversi assegnati in base al carico delle articolazioni, per facilitare la programmazione tramite trascinamento manuale.

- **Sistema di visione**: supporta un sistema di visione intelligente a doppia telecamera; la telecamera sull'estremità cattura i dettagli della presa ravvicinata, la telecamera globale copre l'ambiente operativo e la fusione dei dati delle due telecamere costruisce un modello tridimensionale, fornendo un ricco supporto dati per l'apprendimento per imitazione.

- **Connessione di controllo**: dotato di scheda driver per servomotori, si collega direttamente al computer o a Raspberry Pi tramite interfaccia USB-C, plug-and-play, semplificando il processo di connessione hardware e predisponendo rapidamente l'ambiente di controllo.

## 2. Ecosistema software: profonda integrazione con LeRobot, sviluppo AI a soglia zero

- **Compatibilità con il framework principale**: profonda integrazione con il **framework ML open source per robotica LeRobot** di Hugging Face, basato su PyTorch, con modelli pre-addestrati, dataset multi-scenario e ambiente di simulazione integrati, compatibile con dataset open source noti come Stanford ALOHA.

- **Comunicazione a bassa latenza**: utilizza il **motore distribuito di flusso dati DORA**, realizzando un'interazione a bassa latenza tra hardware e algoritmi; le prestazioni di esecuzione di Python sono 17 volte più veloci di ROS2, con supporto al ricaricamento a caldo del codice per regolare le policy in tempo reale senza riavvio.

- **Open source full-stack**: file di stampa 3D dell'hardware, codice di controllo software, script di addestramento AI e l'intero set di tutorial sono **completamente open source**; l'utente può modificarli liberamente e svilupparli ulteriormente, realizzando rapidamente estensioni funzionali personalizzate.

## 3. Scenari applicativi principali: dall'avvio all'implementazione, adatti a ogni contesto

1. **Avvio all'educazione robotica**: fornisce tutorial per l'intero processo, dall'assemblaggio del braccio robotico alla programmazione di base fino alla distribuzione delle policy AI, con interfaccia operativa visuale e codice di esempio; gli utenti senza basi possono padroneggiare rapidamente le competenze di controllo robotico e applicazione dell'AI.

2. **Validazione di algoritmi per la ricerca scientifica**: dedicato alla ricerca su **apprendimento per imitazione e apprendimento per rinforzo**, supporta la registrazione dei dati delle operazioni umane tramite VR per addestrare il robot; caso tipico: basandosi su 50 video di operazioni da 15 secondi, con 2 ore di addestramento è possibile padroneggiare attività come piegare i vestiti, inserire chiavi e smistare materiali.

3. **Prototipi industriali leggeri**: validazione a basso costo di soluzioni di automazione, adatti a scenari come **movimentazione di materiali, assemblaggio di precisione e smistamento di componenti**; con un costo nell'ordine delle migliaia di yuan realizza le funzioni principali di un braccio robotico di livello industriale, implementando rapidamente la validazione del prototipo.

## Specifiche

| Categoria | Specifica |
|------|------|
| Tipo | Robot di teleoperazione a doppio braccio |
| DOF | 6 DOF per braccio |
| Azionamento | Servo a bus Feetech |
| Host | PC (Linux) / Jetson |
| Ecosistema | LeRobot, ROS 2, ROS 1 |
| Alimentazione | Leader 5V6A / Follower 12V5A |
| Carico utile | 500g |
| Ripetibilità | ±0.1mm |
| Raggio di lavoro | 520mm |
| Comunicazione | USB-C |
| Materiale | Bambu Lab PLA+ |
| Dimensioni (leader / follower) | 111×239×525 mm / 111×173×532 mm |

![Disegno quotato dei bracci leader e follower](../../../public/images/products/so-arm101/dimensions.jpg)

## Avvio rapido

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot && pip install -e ".[feetech]"

lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0

lerobot-teleoperate --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM1
```

## Tutorial

- [Tutorial SO-ARM101](/it/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Montaggio SO-ARM101](/it/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [Guida alla scelta del braccio robotico](/it/tutorials/robot-arms/select-guide)
- [Introduzione all'IA incarnata (LeRobot)](/it/topics/embodied-ai-intro)

## Supporto

- 📧 E-mail: support@juxitech.com
- 🌐 Sito ufficiale: [www.juxitech.com](https://www.juxitech.com)
