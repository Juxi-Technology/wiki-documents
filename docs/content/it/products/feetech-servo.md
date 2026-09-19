---
title: Servo bus Feetech (SCS0009 / STS3215)
category: accessory
description: "Servo bus seriale Feetech di Juxi Technology — protocollo SCS, versioni a encoder magnetico/potenziometro, analisi tabelle di memoria, debug FD"
keywords: [feetech, servo, scs, sts, bus seriale]
---

# Servo bus Feetech (SCS0009 / STS3215)

> **[Acquista nel negozio](https://www.juxitech.com/it/products/feetech-scs0009-serial-bus-servo)**

## Panoramica

I servo bus seriale Feetech sono il cuore di azionamento di bracci robotici come il SO-ARM101. Supportano il **protocollo SCS** e collegano più servo su un unico bus. Due versioni (encoder magnetico STS / potenziometro SCSCL) con debug host FD su Windows.

**Caratteristiche principali**:

- Comunicazione bus seriale, più servo su un bus
- Versioni encoder magnetico (STS) / potenziometro (SCSCL)
- Feedback in tempo reale posizione/velocità/coppia
- Documentazione completa delle tabelle di memoria
- Doppia comunicazione: TTL (veloce) / RS485 (anti-rumore)
- Fino a 254 servo per bus (ID 0-253, broadcast ID 254)
- 1M baud predefinito, 8 bit di dati, 1 bit di stop
- Protezioni sovratemperatura/sovratensione/sovracorrente/sovraccarico
- Debug host FD (Windows)

## Specifiche

| Categoria | Specifica |
|------|------|
| Protocollo | Bus seriale SCS |
| Versioni | STS3215 (encoder magnetico) / SCS0009 (potenziometro) |
| Debug | Host FD (Windows) |
| Baud rate | 1.000.000 (predefinito host) |

## Avvio rapido

```bash
# Debug con il software host (Windows): scarica da feetechrc.com/software.html
# Seleziona la porta, baud rate 1000000, clicca su « 搜索 »
```
## Tutorial

- [Tutorial debug Feetech STS3215 & SCS0009](/it/tutorials/accessories/feetech/Feetech-STS3215&SCS0009-Tutorial)
- [Protocollo di comunicazione SCS](/it/tutorials/accessories/feetech/Feetech-SCS_Communication_Protocol)
- [Tabella di memoria del servo STS a encoder magnetico](/it/tutorials/accessories/feetech/Feetech-Magnetic_Encoder_STS_Servo-Memory_Table_Analysis)
- [Tabella di memoria del servo SCSCL a potenziometro](/it/tutorials/accessories/feetech/Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis)

## Supporto

- 📧 E-mail: support@juxitech.com
- 🌐 Sito ufficiale: [www.juxitech.com](https://www.juxitech.com)
