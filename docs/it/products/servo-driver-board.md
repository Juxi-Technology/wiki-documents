---
title: Scheda driver servo bus JUXI
description: "Scheda driver servo bus JUXI – controllo fino a 253 servo su un bus, tensione estesa 7–12,6 V, Type-C plug-and-play, progettata per LeRobot SO-ARM"
keywords: [driver servo, servo bus, LeRobot, SO-ARM]
---

# Scheda driver servo bus JUXI

> **[Acquista nel negozio](https://www.juxitech.com/it/products/bus-servo-driver-board)**

## Panoramica del prodotto

**Caratteristiche principali**:

- Controllo fino a **253** servo a bus seriale su un solo bus
- Ingresso tensione estesa **7–12,6 V**, alimentazione integrata (presa DC 5521)
- Feedback in tempo reale: posizione, velocità, coppia, modalità operativa
- **Type-C plug-and-play**, compatibile con Raspberry Pi/Jetson/RDK/PC
- Fori di montaggio precisi, installazione diretta su SO-ARM100/101 in 2 minuti
- Circuito di protezione TVS (sovratensione/sovracorrente)

## Specifiche del prodotto

| Categoria | Specifica |
|------|------|
| Tensione di ingresso | DC 7 V – 12,6 V |
| Interfacce | USB Type-C / UART |
| Supporto servo | fino a 253 servo a bus seriale |
| Feedback dati | Posizione, velocità, coppia, modalità operativa |
| Dimensioni scheda | 42,00 × 33,00 mm |
| Distanza fori | 37,00 × 28,00 mm (match con fori SO-ARM) |
| Servo compatibili | la maggior parte dei servo a bus seriale comuni |
| Host compatibili | Raspberry Pi, NVIDIA Jetson (Nano/Orin/Xavier), RDK, PC (Win/macOS/Linux), Orange Pi |

## Guida rapida

```bash
# Esempio di avvio SO-ARM101
python3 examples/arm_boot.py --port /dev/ttyACM0
```

## Tutorial correlati

- [Kit di sviluppo SO-ARM101](/it/products/so-arm101)
- [Servo bus Feetech (SCS0009 / STS3215)](/it/products/feetech-servo)

## Supporto tecnico

- 📧 E-mail: support@juxitech.com
- 🌐 Sito ufficiale: [www.juxitech.com](https://www.juxitech.com)
