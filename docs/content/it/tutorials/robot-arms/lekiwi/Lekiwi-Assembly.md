---
title: Tutorial di assemblaggio del robot mobile Lekiwi
description: "In Fusion360 CAD online è possibile visualizzare le posizioni esatte dei componenti."
---

# Tutorial di assemblaggio del robot mobile Lekiwi

> **[Acquista nel negozio](https://www.juxitech.com/it/products/lekiwi-embodied-intelligence-mobile-robotic-car)**


[*Fusion360 CAD online*](https://a360.co/4k1P8yO)*permette di visualizzare le posizioni esatte dei componenti.*
[File URDF](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)
Anteprima URDF online https://urdf.d-robotics.cc/

# 1. Montare il modulo ruota (3 per robot)

1. Fissare il motore di trazione al supporto motore con 12 viti autofilettanti **M2x6** (incluse nella scatola servo).





2. Fissare il supporto motore alla piastra di base con 12 **viti a macchina M3x16 e 12** .



3. Rimuovere viti e dadi della ruota omnidirezionale da 82 mm



4. Fissare il servo horn al servo con viti m3*6



5. Inserire 4 dadi di sicurezza nel giunto e fissare il giunto al servo horn con 4 viti m3*6





6. Fissare la ruota omnidirezionale da 82 mm al giunto con viti a macchina m3*25 e dadi di sicurezza

Dopo aver montato le tre ruote sulla piastra di base:







# 2. Assemblaggio della piastra di base

1. Inserire i dadi M3 nei fori della scheda driver servo e del supporto batteria. Fissare entrambi alla piastra di base con 4 viti M3x12.





2. Montare la scheda driver servo con quattro distanziali in ottone M2.5*6.5 e quattro viti M2.5*8, e collegarla ai 3 servo.



Collegamento cavi power bank

- **Ingresso alimentazione** direttamente alla sorgente





- **USB-C** fornisce 5 V al Raspberry Pi
- Con **braccio robotico a 12 V**, alimentare direttamente la **scheda motori servo** tramite il **divisore di alimentazione DC**





I cavi si collegano come nella figura:



# 3. Assemblaggio della piastra superiore

1. Sistemare il Raspberry Pi 5 nella parte inferiore della custodia e agganciare il coperchio superiore.
2. Fissare il Raspberry Pi alla piastra superiore con due viti M3x12 e due dadi di sicurezza M3, e montare la base del braccio SO-101 con quattro viti M4x25 e quattro dadi di sicurezza M4. Si può usare la nostra base SO-101 migliorata o quella originale: la piastra ha i fori per entrambe.



# 4.

1. Far passare il cavo USB-C verso USB-A della scheda driver, il cavo di alimentazione USB-C 5 V e il cavo servo SO0-101 attraverso i fori della piastra superiore.



2. Fissare la piastra superiore al supporto motore con 6 viti m3x12 e 6 dadi di sicurezza m3.



3. Collegare piastra superiore e piastra di base con 6 distanziali in ottone M3*50 e 6 viti a macchina M3*

# 5. Installare la fotocamera

*Nota: il nostro supporto è progettato specificamente per la fotocamera scelta. Altri moduli fotocamera possono richiedere modifiche.*

## (Opzione 1) Installare la fotocamera anteriore

Montare il supporto della fotocamera anteriore sulla piastra di base con 3 viti m3*12 e tre dadi m3
Fissare il modulo fotocamera con 4 viti distanziali m2*5*5

## (Opzione 2) Installare la fotocamera da braccio

Fissare il modulo fotocamera con 4 viti distanziali m2*5*5

# 6. Collegare l'alimentazione

Inserire l'adattatore cilindrico DC nella scheda driver e il connettore USB-C 5 V nel Raspberry Pi 5 per alimentare l'elettronica. I cavi dati USB della scheda driver e della fotocamera si collegano direttamente al Raspberry Pi.


