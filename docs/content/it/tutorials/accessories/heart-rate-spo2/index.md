---
title: "Tutorial d'uso del modulo sensore di frequenza cardiaca e SpO2 MAX30102"
description: "Tutorial completo del modulo sensore di frequenza cardiaca e SpO2 MAX30102: informazioni sul prodotto, versione web, Arduino, Raspberry Pi e software per PC."
---

# Tutorial d'uso del modulo sensore di frequenza cardiaca e SpO2 MAX30102

Questo tutorial presenta l'uso del modulo sensore di frequenza cardiaca e SpO2 MAX30102 di Juxi Technology. Il modulo monta il chip dedicato MAX30102 di Maxim per il rilevamento di frequenza cardiaca e SpO2, integra un algoritmo proprietario di frequenza cardiaca e SpO2 e può restituire direttamente frequenza cardiaca, saturazione di ossigeno e temperatura a bordo; supporta due modalità di comunicazione: I2C e UART.

## Indice dei tutorial

| Contenuto | Descrizione |
|---|---|
| [Informazioni sul prodotto](./product-info.md) | Panoramica del prodotto, principio di rilevamento, specifiche tecniche, definizione dei pin e scenari applicativi tipici |
| [Tutorial della versione web](./web-console.md) | Connessione diretta tramite Web Serial nel browser, senza installare software |
| [Tutorial Arduino](./arduino.md) | Cablaggio, installazione della libreria, codice di esempio, API e domande frequenti |
| [Tutorial Raspberry Pi](./raspberry-pi.md) | Cablaggio I2C / UART, configurazione dell'ambiente, codice di esempio e API |
| [PC · Esecuzione con Python](./pc/python.md) | Adattatore USB-TTL + script Python per leggere i dati |
| [Software per PC](./pc/upper-computer.md) | Software grafico per PC: impostazioni della porta seriale, acquisizione e monitoraggio in tempo reale |

## Avvio rapido

1. Leggere prima le [informazioni sul prodotto](./product-info.md) e verificare l'alimentazione (3,3–5 V) e la definizione dei pin;
2. Per vedere subito i dati: usare il [tutorial della versione web](./web-console.md), basta aprire la pagina in Chrome / Edge;
3. Per collegarlo a un microcontrollore: vedere il [tutorial Arduino](./arduino.md);
4. Per collegarlo a una Raspberry Pi: vedere il [tutorial Raspberry Pi](./raspberry-pi.md);
5. Per collegarlo a un computer: vedere [PC · Esecuzione con Python](./pc/python.md) o il [software per PC](./pc/upper-computer.md).

> Questo prodotto è un modulo di rilevamento elettronico consumer, non un dispositivo medico professionale; i dati misurati servono solo come riferimento per la salute quotidiana.

<RelatedProducts slugs="heart-rate-spo2" />
