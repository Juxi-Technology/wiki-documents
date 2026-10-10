---
title: Tutorial di assemblaggio del robot mobile Lekiwi
description: "In Fusion360 CAD online è possibile visualizzare le posizioni esatte dei componenti."
---

# Tutorial di assemblaggio del robot mobile Lekiwi

> **[Acquista nel negozio](https://www.juxitech.com/it/products/lekiwi-embodied-intelligence-mobile-robotic-car)**

[*Nel CAD online Fusion360*](https://a360.co/4k1P8yO)* è possibile visualizzare la posizione esatta dei componenti.*

[File URDF](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)

Anteprima URDF online https://urdf.d-robotics.cc/

## 1. Assemblaggio dei moduli ruota (3 per robot)

1. Utilizzare 12 viti autofilettanti **M2x6** per fissare il motore di trasmissione alla staffa del motore. (Incluse nella confezione del servo.)

![image – 1](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-01.png)
![image – 2](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-02.png)

2. Utilizzare 12 viti **M3x16** e 12 **dadi M3** per fissare i servo alla piastra di base usando le staffe del motore di trasmissione.

![image – 3](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-03.jpg)

3. Rimuovere le viti e i dadi dalle ruote omnidirezionali da 82 mm.

![image – 4](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-04.png)

4. Utilizzare viti m3\*6 per fissare la squadretta del servo al servo.

![image – 5](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-05.png)

5. Installare 4 dadi autobloccanti nel giunto. Per prima cosa, utilizzare 4 viti m3\*6 per fissare il giunto alla squadretta del servo.

![image – 6](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-06.png)
![image – 7](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-07.png)

6. Utilizzare viti m3\*25 e dadi autobloccanti per fissare le ruote omnidirezionali da 82 mm al giunto.



Una volta installate tutte e tre le ruote sulla piastra di base:

![image – 8](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-08.png)
![image – 9](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-09.jpg)

![image – 10](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-10.png)

## 2. Assemblaggio della piastra di base

1. Inserire 2 dadi M3 nei fori della scheda driver del servo e del supporto della batteria. Utilizzare 4 viti a brugola M3x12 per fissare entrambi alla piastra di base.

![image – 11](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-11.png)
![image – 12](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-12.png)

2. Utilizzare 2 viti a brugola M3\*12 e 2 dadi M3 per installare la scheda driver del servo e collegarla ai 3 servo.

![image – 13](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-13.png)

Collegamenti dei cavi dell'alimentatore portatile

- L'**ingresso di alimentazione** si collega direttamente all'alimentatore

![image – 14](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-14.png)
![image – 15](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-15.png)

- L'interfaccia **USB-C** fornisce alimentazione a 5V al Raspberry Pi
- Se si utilizza un **braccio robotico da 12V**, alimentare direttamente la **scheda del motore servo** con il **distributore di alimentazione DC**

![image – 16](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-16.png)
![image – 17](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-17.png)

I cavi possono essere collegati come mostrato nella figura seguente:

![image – 18](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-18.png)

## 3. Assemblaggio della piastra superiore

1. Collocare il Raspberry Pi 5 nella parte inferiore del case per Raspberry Pi, quindi agganciare la parte superiore del case.

2. Utilizzare due viti a brugola M3x16 e due dadi M3 per fissare il Raspberry Pi alla piastra di base superiore, e utilizzare quattro viti M4x25 e quattro dadi M4 per installare la base del braccio robotico SO-101.

![image – 19](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-19.png)

## 4.

1. Far passare il cavo da USB-C a USB-A della scheda driver del servo, il cavo di alimentazione USB-C a 5V e i cavi dei servo attraverso i fori della piastra superiore.

![image – 20](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-20.png)

2. Utilizzare 8 viti m3x16 e 4 dadi m3 per installare la piastra superiore sulle staffe del motore.

![image – 21](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-21.png)



## 5. Installazione delle telecamere

*Nota: la staffa che abbiamo progettato è realizzata su misura per la telecamera che abbiamo scelto. Moduli fotocamera diversi possono richiedere modifiche.*

## (Opzione 1) Installazione della telecamera frontale

①Utilizzare 4 viti distanziali m2\*5\*5 per fissare il modulo fotocamera

②Utilizzare 2 viti m3\*12 e 2 dadi m3 per installare la staffa della telecamera frontale sulla piastra di base

![image – 22](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-22.webp)
![image – 23](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-23.webp)

## (Opzione 2) Installazione della telecamera montata sul braccio

Utilizzare 4 viti distanziali m2\*5\*5 per fissare il modulo fotocamera

Questa staffa supporta telecamere con un interasse dei fori di 24\*25mm o 28\*28mm

![image – 24](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-24.png)

![image – 25](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-25.png)

## 6. Collegamento dell'alimentazione e cablaggio

Collegare l'adattatore con spina jack DC alla **scheda driver del servo**;

Collegare il connettore USB-C a 5V al **Raspberry Pi 5** per alimentare l'elettronica;

I cavi dati USB della scheda driver del servo e delle telecamere possono essere collegati direttamente al Raspberry Pi.

![image – 26](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Assembly/d02-26.png)
