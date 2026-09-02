---
title: Mano bionica AmazingHand
description: Mano bionica open source a 4 dita di Juxi Technology, controllo bus TTL, CAD aperto, ricerca IA incarnata e HRI
keywords: [amazinghand, mano dexterous, dexterous hand, ia incarnata]
---

# Mano bionica AmazingHand

> **[Acquista nel negozio](https://www.juxitech.com/it/products/amazinghand)**

## Panoramica

AmazingHand è la mano bionica open source a 4 dita di Juxi Technology e controllo tramite bus seriale TTL. I file CAD aperti consentono di personalizzare liberamente le dita per manipolazione fine, strategie di presa e ricerca nell'interazione uomo-robot (HRI).

**Caratteristiche principali**:

- 4 dita, proporzioni simili alla mano umana
- Controllo bus seriale TTL, compatibile con i controller più comuni
- CAD/sorgente aperti, personalizzabili
- Si combina con SO-ARM101 per piattaforme di manipolazione complete
- Tracking della mano in tempo reale: gesti via webcam e controllo live
- Demo di simulazione: tracking della mano senza hardware (ecosistema dora-rs)
- Controllo angolo per singolo dito, una o due mani
- Alimentazione: scheda driver servo 5V3A, collegamento USB all'host

## Specifiche

| Categoria | Specifica |
|------|------|
| Tipo | Mano bionica a 4 dita |
| Controllo | Bus seriale TTL |
| Ecosistema | SDK Python, ROS |
| Open source | CAD/sorgente su GitHub |

## Avvio rapido

```bash
git clone https://github.com/Juxi-Technology/AmazingHand.git
cd AmazingHand
pip install -r requirements.txt
python examples/basic_control.py
```

## Tutorial

- [Controllo interfaccia AmazingHand](/it/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control)
- [Esempio ufficiale AmazingHand](/it/tutorials/robot-arms/amazing-hand/AmazingHand-Official-Example)
- [Debug TTL AmazingHand](/it/tutorials/robot-arms/amazing-hand/AmazingHand-TTL-Debugging)

## Supporto

- 📧 E-mail: support@juxitech.com
- 🌐 Sito ufficiale: [www.juxitech.com](https://www.juxitech.com)
