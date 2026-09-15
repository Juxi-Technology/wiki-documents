---
title: Guida di montaggio del braccio robotico Lerobot
description: "Versione Pro: braccio leader 5V6A, braccio follower 12V5A"
---

# Guida di montaggio del braccio robotico Lerobot

> **[Acquista nel negozio](https://www.juxitech.com/it/products/so-arm101-developers-kit)**


![image – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/1.jpg)

**Il braccio leader (attivo) della versione Pro usa un alimentatore 5V6A, mentre il braccio follower (passivo) usa un alimentatore 12V5A**

Impostazione degli ID dei servo, calibrazione dell'angolo dei servo e montaggio vanno completati in anticipo; puoi fare riferimento al [tutorial di montaggio ufficiale](https://huggingface.co/docs/lerobot/so101)

## Passo 1: Impostare l'ID dei servo e installare il braccetto del servo (escluso il servo n. 5)

![image – 2](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/2.png)

Ancora una volta, assicurati che gli ID delle articolazioni dei servo e il rapporto di trasmissione corrispondano rigorosamente a quelli di **SO-ARM101**.

Ogni motore del bus ha un ID univoco. I motori nuovi di solito hanno l'ID predefinito ` 1 `. Per garantire una comunicazione normale tra motore e controller, dobbiamo prima impostare un ID univoco per ogni motore. Inoltre, la velocità di trasmissione dei dati sul bus è determinata dal baud rate. Per poter comunicare tra loro, il controller e tutti i motori devono essere configurati con lo stesso baud rate; il baud rate dei servi di questo braccio robotico è 100000.

A questo scopo, dobbiamo prima collegare il controller a ogni motore separatamente per la configurazione. Poiché scriveremo questi parametri nell'area non volatile della memoria interna del motore (EEPROM), è necessaria una sola operazione.

Se hai intenzione di riutilizzare i motori di altri robot, potrebbe essere necessario eseguire questo passaggio: ID e baud rate potrebbero non corrispondere.

Il video seguente mostra i passaggi in sequenza per impostare l'ID del motore.

### Sistema Windows

飞特舵机上位机.zip

Usa il software host dei servo Feetech per impostare l'ID dei servo e calibrare il punto centrale; l'impostazione dell'ID va da 1 a 6!

机械臂舵机设置ID-Windows系统.mp4

### Sistema Linux/Ubuntu

Per il software host FTServo, fai riferimento a https://gitee.com/ftservo/FTServo_Linux

Segui prima il [tutorial del Manipulator LeRobot](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc) fino a **C. Controllo del Manipulator**, nella sezione **Autorizzazione porta** → **Esegui lo script per trovare la porta**.

Collega la scheda driver dei servo del braccio follower al computer con un cavo dati USB e accendi l'alimentazione. Poi esegui il seguente comando. Modifica --robot.port=/dev/ttyACM0 nel comando con il numero di porta trovato. Se la porta trovata è /dev/ttyACM1, modificalo in --robot.port=/dev/ttyACM1

```Python
lerobot-setup-motors \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0
```

Vedrai il seguente output.

```Python
Connect the controller board to the 'gripper' motor only and press enter.
```

Collega il servo del gripper come indicato. Assicurati che sia l'unico servo collegato alla scheda driver dei servo e che questo servo non sia collegato ad altri servi. Dopo aver premuto il tasto **[Invio]**, lo script imposterà automaticamente l'ID e il baud rate di questo servo, con l'ID impostato da 6 a 1!

Dopo di che, dovresti vedere il seguente messaggio:

```Python
'gripper' motor id set to 6
```

Poi, l'output della voce successiva è:

```Python
Connect the controller board to the 'wrist_roll' motor only and press enter.
```

**Nota**: ripeti le operazioni precedenti per ogni servo seguendo le istruzioni.

Come per il servo precedente, assicurati che sia l'unico servo collegato alla scheda driver e che il servo stesso non sia collegato ad altri servi.

Prima di ogni pressione del tasto **Invio**, controlla i collegamenti dei cavi. Ad esempio, quando si lavora sulla scheda, il cavo di alimentazione potrebbe scollegarsi.

Dopo aver completato tutti i passaggi, lo script terminerà automaticamente; a quel punto i servi saranno pronti per l'uso. Ora puoi collegare in sequenza l'interfaccia a 3 pin di ogni servo e collegare il cavo del primo servo (il servo "shoulder pan" con ID 1) alla scheda driver. Ora la scheda driver può essere installata sulla base del braccio robotico.

Ripeti gli stessi passaggi per il braccio leader.

```Python
lerobot-setup-motors \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM0
```

机械臂舵机设置ID-Linux系统.mp4

## Passo 2: Montaggio

- I passaggi di montaggio del braccio follower sono sostanzialmente gli stessi di quelli del braccio leader. L'unica differenza è che, dopo il Passo 12, il metodo di installazione dell'end-effector (gripper e maniglia) è diverso.

SO-ARM101机械臂组装教程.mp4

Installazione della scheda driver dei servo: installa prima 4 pilastrini in rame, poi fissa la scheda driver con quattro viti M2.5\*8

![Sistema Linux/Ubuntu – 1](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/7.png)

![Sistema Linux/Ubuntu – 2](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/8.png)

![Sistema Linux/Ubuntu – 3](../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/9.png)

**Il braccio leader nero della versione Pro usa un alimentatore 5V6A, mentre il braccio follower bianco usa un alimentatore 12V5A**

<RelatedProducts slugs="so-arm101,servo-driver-board,overhead-camera-mount" />
