---
title: Tutorial di assemblaggio del robot mobile Lekiwi
description: "In Fusion360 CAD online è possibile visualizzare le posizioni esatte dei componenti."
---

# Tutorial di assemblaggio del robot mobile Lekiwi

> **[Acquista nel negozio](https://www.juxitech.com/it/products/lekiwi-embodied-intelligence-mobile-robotic-car)**


[*Fusion360 CAD online*](https://a360.co/4k1P8yO)*permette di visualizzare le posizioni esatte dei componenti.*
[File URDF](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)
Anteprima URDF online https://urdf.d-robotics.cc/

## 1. Montare il modulo ruota (3 per robot)

1. Fissare il motore di trazione al supporto motore con 12 viti autofilettanti **M2x6** (incluse nella scatola servo).

![image – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/1.jpg)

![image – 2](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/2.jpg)





2. Fissare il supporto motore alla piastra di base con 12 **viti a macchina M3x16 e 12** .

![image – 3](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/3.jpg)



3. Rimuovere viti e dadi della ruota omnidirezionale da 82 mm

![image – 4](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/4.jpg)



4. Fissare il servo horn al servo con viti m3*6

![image – 5](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/5.jpg)



5. Inserire 4 dadi di sicurezza nel giunto e fissare il giunto al servo horn con 4 viti m3*6

![image – 6](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/6.jpg)

![image – 7](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/7.jpg)





6. Fissare la ruota omnidirezionale da 82 mm al giunto con viti a macchina m3*25 e dadi di sicurezza

Dopo aver montato le tre ruote sulla piastra di base:

![image – 8](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/8.jpg)

![image – 9](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/9.jpg)

![image – 10](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/10.jpg)







## 2. Assemblaggio della piastra di base

1. Inserire i dadi M3 nei fori della scheda driver servo e del supporto batteria. Fissare entrambi alla piastra di base con 4 viti M3x12.

![image – 11](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/11.jpg)

![image – 12](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/12.jpg)





2. Montare la scheda driver servo con quattro distanziali in ottone M2.5*6.5 e quattro viti M2.5*8, e collegarla ai 3 servo.



Collegamento cavi power bank

- **Ingresso alimentazione** direttamente alla sorgente





- **USB-C** fornisce 5 V al Raspberry Pi
- Con **braccio robotico a 12 V**, alimentare direttamente la **scheda motori servo** tramite il **divisore di alimentazione DC**





I cavi si collegano come nella figura:

![image – 13](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/13.jpg)

![image – 14](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/14.jpg)

![image – 15](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/15.jpg)

![image – 16](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/16.jpg)

![image – 17](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/17.jpg)

![image – 18](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/18.jpg)



## 3. Assemblaggio della piastra superiore

1. Sistemare il Raspberry Pi 5 nella parte inferiore della custodia e agganciare il coperchio superiore.
2. Fissare il Raspberry Pi alla piastra superiore con due viti M3x12 e due dadi di sicurezza M3, e montare la base del braccio SO-101 con quattro viti M4x25 e quattro dadi di sicurezza M4. Si può usare la nostra base SO-101 migliorata o quella originale: la piastra ha i fori per entrambe.

![image – 19](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/19.jpg)



## 4.

1. Far passare il cavo USB-C verso USB-A della scheda driver, il cavo di alimentazione USB-C 5 V e il cavo servo SO0-101 attraverso i fori della piastra superiore.

![image – 20](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/20.jpg)



2. Fissare la piastra superiore al supporto motore con 6 viti m3x12 e 6 dadi di sicurezza m3.

![image – 21](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/21.jpg)



3. Collegare piastra superiore e piastra di base con 6 distanziali in ottone M3*50 e 6 viti a macchina M3*

## 5. Installare la fotocamera

*Nota: il nostro supporto è progettato specificamente per la fotocamera scelta. Altri moduli fotocamera possono richiedere modifiche.*

### (Opzione 1) Installare la fotocamera anteriore

Montare il supporto della fotocamera anteriore sulla piastra di base con 3 viti m3*12 e tre dadi m3
Fissare il modulo fotocamera con 4 viti distanziali m2*5*5

### (Opzione 2) Installare la fotocamera da braccio

Fissare il modulo fotocamera con 4 viti distanziali m2*5*5

## 6. Collegare l'alimentazione

Inserire l'adattatore cilindrico DC nella scheda driver e il connettore USB-C 5 V nel Raspberry Pi 5 per alimentare l'elettronica. I cavi dati USB della scheda driver e della fotocamera si collegano direttamente al Raspberry Pi.


![Option 2 Install an arm-mounted camera – 1](../../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/22.jpg)



