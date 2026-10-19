---
title: "07 · Domande frequenti e precauzioni"
description: "D1: Può commutare l'immagine del monitor?"
---

# 07 · Domande frequenti e precauzioni

> [← Torna alla panoramica](/it/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Prodotto applicabile: JUXI Technology KVM&HUB&TTL
> Le domande specifiche dei singoli moduli sono nelle rispettive pagine (Bluetooth → 03; seriale TTL → 04).

## Domande frequenti

**D1: Può commutare l'immagine del monitor?**
No. Questo prodotto commuta tastiera/mouse e dispositivi USB. Ogni computer usa il proprio monitor; per un host senza monitor usa la soluzione con scheda di acquisizione (vedi [06](/it/tutorials/accessories/kvm-switch/06-Headless-Host-Capture-Card-and-OBS)).

**D2: Servono driver?**
No — senza driver (Windows / macOS / Linux / sistemi operativi nazionali cinesi).

**D3: Posso collegare un disco rigido portatile?**
Questo prodotto è USB 2.0; per memorie veloci e schede di acquisizione collega direttamente al computer. Chiavette USB, tastiera/mouse, stampanti e dongle non hanno problemi.

**D4: Il telefono non si connette via Bluetooth / appare una richiesta di PIN?**
Non usare l'«associazione» Bluetooth di sistema; installa l'app **BleUart** e connettiti dall'interno dell'app (vedi [03](/it/tutorials/accessories/kvm-switch/03-Bluetooth)).

**D5: Telefono e computer possono collegarsi contemporaneamente via Bluetooth?**
No — è ammesso un solo dispositivo host alla volta. La **porta seriale** (USB) del PC non è interessata e può essere usata in parallelo.

**D6: I dispositivi USB si disconnettono per un attimo durante la commutazione?**
Normale: i dispositivi «migrano» tra i computer con la commutazione e l'altro computer li rienumera (alcuni richiedono qualche secondo).

**D7: Può essere usato solo come HUB?**
Sì — con un solo computer collegato è un HUB USB a 3 porte (vedi [02](/it/tutorials/accessories/kvm-switch/02-HUB-Function-One-to-Three)).

**D8: Supporta mouse da gaming?**
Tastiera/mouse funzionano su USB 2.0 HID standard — impercettibile in ambito office e debug; presta cautela con periferiche gaming ad alto polling rate.

## Precauzioni

- Il livello della porta TTL è **3,3 V** — non applicare mai livelli di segnale a 5 V; `3V3/5V` sono pin di **uscita** — non alimentare mai a ritroso;
- La larghezza di banda USB 2.0 è limitata; scegli i dispositivi secondo le raccomandazioni di [02](/it/tutorials/accessories/kvm-switch/02-HUB-Function-One-to-Three);
- Non smontare né risaldare il dispositivo; è sensibile alle scariche elettrostatiche — scaricati prima di toccarlo;
- Funzioni e interfacce del prodotto fanno riferimento all'unità fisica; in caso di aggiornamento di questo tutorial fa fede la versione più recente.

## Cronologia versioni

| Versione | Data | Descrizione |
|---|---|---|
| v1.0 | 2026-10-14 | Versione iniziale, suddivisa per moduli funzionali (commutazione/HUB/Bluetooth/TTL/10 pin/scheda di acquisizione/FAQ) |

<RelatedProducts slugs="kvm-switch" />
