---
title: "Guida alla scelta"
description: Confronto SO-ARM101 vs AmazingHand vs Lekiwi
keywords: [scelta, braccio robotico, confronto]
---

# Guida alla scelta

Juxi Technology offre diversi bracci robotici per esigenze diverse.

> Nota: per le specifiche dettagliate consultare la documentazione ufficiale di ogni prodotto. Questa tabella serve solo come riferimento per la scelta.

## Confronto

| Caratteristica | SO-ARM101 | AmazingHand | Lekiwi |
|----------------|-----------|-------------|--------|
| **Tipo** | Teleoperazione doppio braccio | Mano robotica | Braccio didattico low-cost |
| **DOF** | 6 DOF per braccio | 5 dita, multi-articolato | 6 DOF |
| **Controllo** | LeRobot / API Python | Bus seriale TTL | Servo |
| **Host** | PC (Linux) / Jetson | Scheda di controllo | PC / MCU |
| **Uso** | Apprendimento IA, teleop | Presa, gesti | Educazione, principiante |
| **Open source** | [LeRobot](https://github.com/Juxi-Technology/lerobot) | [AmazingHand](https://github.com/Juxi-Technology/AmazingHand) | Doc ufficiale |
| **Ideale per** | Ricercatori, sviluppatori IA | Ricercatori di manipolazione | Studenti, maker |

## Come scegliere

### 🎓 Studenti / Principianti → Lekiwi

- Struttura semplice, costo contenuto — ideale per la didattica in aula e per iniziare
- Controllo intuitivo tramite servo

### 🤖 Ricerca su presa e manipolazione → AmazingHand

- Mano dexterous a 4 dita per la ricerca su strategie di presa e controllo dei gesti
- Controllo tramite bus seriale TTL, compatibile con i controller mainstream

### 🧠 Imitazione IA / Teleoperazione → SO-ARM101

- Design a doppio braccio con teleoperazione leader-follower
- Profonda integrazione con l'ecosistema LeRobot, ideale per l'imitation learning
- Supporto Jetson per flussi di lavoro IA senza interruzioni

## Combinazioni consigliate

| Esigenza | Configurazione consigliata |
|----------|----------------------------|
| Ricerca sulla teleoperazione IA | SO-ARM101 + AmazingHand (manipolazione dexterous) |
| Laboratorio didattico | Più unità Lekiwi |
| Sistema robotico completo | SO-ARM101 + modulo IMU + accessori di visione |

## Tutorial correlati

- [Tutorial SO-ARM101](/it/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Controllo interfaccia AmazingHand](/it/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control)
- [Tutorial Lekiwi](/it/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial)

## Supporto

- 📧 Email: support@juxitech.com
- 🌐 Sito web ufficiale: [www.juxitech.com](https://www.juxitech.com)