---
title: "Calibrazione dei bracci robotici"
description: "Calibrazione XLeRobot di entrambi i bracci e della testa: comandi lerobot-calibrate per Windows / macOS / Linux, posizione centrale, verifica dei limiti e controllo dei bracci sinistro/destro."
---

# Calibrazione dei bracci robotici

![Procedura di calibrazione di entrambi i bracci e della testa](/images/tutorials/robot-arms/xlerobot/05-calibration/01.png)

## Procedura di calibrazione di entrambi i bracci e della testa

> Eseguire il comando relativo al proprio sistema operativo. `port1` è la scheda di controllo del braccio sinistro, `port2` quella del braccio destro; verificare prima le porte effettive con `lerobot-find-port`.
>
> Su Linux è possibile elencare rapidamente le porte con `ls /dev/ttyACM*`.

**Windows**

```bash
lerobot-calibrate \
    --robot.type=xlerobot --robot.id=juxi_xlerobot \
    --robot.port1=COM3 \
    --robot.port2=COM4
```

**macOS**

```bash
lerobot-calibrate \
    --robot.type=xlerobot --robot.id=juxi_xlerobot \
    --robot.port1=/dev/tty.usbmodem58546521551 \
    --robot.port2=/dev/tty.usbmodem58546521552
```

**Linux**

```bash
lerobot-calibrate \
    --robot.type=xlerobot --robot.id=juxi_xlerobot \
    --robot.port1=/dev/ttyACM0 \
    --robot.port2=/dev/ttyACM1
```

Dopo l'avvio del comando di calibrazione, il terminale chiede prima Middle Position. Portare i bracci in posizione centrale — ganascia mobile in alto, ganascia fissa in basso — e premere Invio. Poi muovere ogni giunto fino ai limiti massimo e minimo.

::: warning Avviso di calibrazione

Prima di premere Invio per avviare la calibrazione, portare il braccio robotico in posizione centrale: ogni giunto al centro del proprio intervallo utilizzabile.

Controllare i valori minimo e massimo di ogni giunto. Se un minimo supera 0 e inizia improvvisamente a decrescere da 4095, o un massimo supera 4095 e inizia a crescere da 0, eseguire una calibrazione della posizione centrale con il software PC Feetech, quindi ricalibrare il braccio robotico.

:::

I due servi della torre della telecamera funzionano allo stesso modo: ruotarli una volta fino ai limiti massimo e minimo.

Quando compare la riga seguente, inizia la calibrazione del braccio sinistro e della testa:

![Procedura di calibrazione di entrambi i bracci e della testa](/images/tutorials/robot-arms/xlerobot/05-calibration/02.png)

![Procedura di calibrazione di entrambi i bracci e della testa](/images/tutorials/robot-arms/xlerobot/05-calibration/03.png)

Quando compare la riga seguente, inizia la calibrazione del braccio destro. Le ruote della base non richiedono calibrazione.

![Procedura di calibrazione di entrambi i bracci e della testa](/images/tutorials/robot-arms/xlerobot/05-calibration/04.png)

![Procedura di calibrazione di entrambi i bracci e della testa](/images/tutorials/robot-arms/xlerobot/05-calibration/05.png)
