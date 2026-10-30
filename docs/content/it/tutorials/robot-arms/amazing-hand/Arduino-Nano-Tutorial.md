---
title: "Tutorial d'uso di Arduino Nano"
description: "Eseguire il «programma dimostrativo 02» di AmazingHand con Arduino Nano (328P) e la scheda driver dei servo: cablaggio, installazione delle librerie, compilazione, caricamento e risultato di esecuzione."
---

# Tutorial d'uso di Arduino Nano

## Cablaggio (scheda driver dei servo + scheda Nano)

**Verificare bene la posizione dei pin della scheda Nano (cioè la scheda di sviluppo 328P)!**

![Illustrazione](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/01.png)

![Illustrazione](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/02.png)

![Illustrazione](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/03.png)

![Illustrazione](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/04.png)

Di seguito viene descritto il processo di debug con il microcontrollore. Il microcontrollore stesso esegue il programma dimostrativo in un ciclo continuo; è sufficiente scollegare il cavo dati per interromperlo.

## Eseguire il «programma dimostrativo 02»

1. Installare autonomamente Arduino IDE.

2. In base alla **mano sinistra o alla mano destra**, aprire il file `.ino` corrispondente.

   ![Illustrazione](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/05.png)

3. Prima di compilare e caricare il programma Arduino sulla scheda Nano, installare la **libreria FTServo** e la **libreria SCServo** in «Gestione librerie».

   ![Illustrazione](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/06.png)

4. Selezionare il tipo di scheda Nano «**Arduino Nano**».

   ![Illustrazione](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/07.png)

5. Compilare e caricare.

> **Attenzione:** in questo momento il computer è collegato solo alla scheda Nano; la scheda Nano non va ancora collegata alla scheda driver dei servo (cioè non va collegata alla mano abile).

Dopo il caricamento riuscito, collegare la scheda Nano alla scheda driver dei servo con tre cavetti jumper, e collegare i servo alla scheda driver dei servo; fare riferimento al [modo di cablaggio per il debug della scheda MEGA328P Nano](https://juxitech.feishu.cn/wiki/Wt46wtt26imdWkkQlxTcL87qnHd#share-HdS4dNgwyo2seVxRZ9PcZ1R3nuc).

La mano abile eseguirà il «programma dimostrativo 02» in un ciclo continuo; il risultato di esecuzione è il seguente:

![Illustrazione](../../../../../public/images/tutorials/robot-arms/amazing-hand/arduino-nano/08.png)
