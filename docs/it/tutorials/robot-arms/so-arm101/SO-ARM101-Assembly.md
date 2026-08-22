---
title: Guida di montaggio del braccio robotico Lerobot
description: "Versione Pro: braccio leader 5V6A, braccio follower 12V5A"
---

# Guida di montaggio del braccio robotico Lerobot

**Versione Pro: braccio leader (nero) 5V6A, braccio follower (bianco) 12V5A**

Impostazione ID servo, calibrazione angolo e montaggio da fare in anticipo. Vedi [guida ufficiale](https://huggingface.co/docs/lerobot/so101).

## Passo 1: Impostare gli ID dei servo, montare i pignoni (tranne n.5)

**Attenzione**: gli ID delle articolazioni e il rapporto di trasmissione devono corrispondere esattamente al **SO-ARM101**.

Ogni motore del bus necessita di un ID univoco (nuovo: `1` di default). Baudrate: 100000.

### Windows

[Software servo Feetech.zip] — impostare ID (1-6) e calibrare la posizione centrale.

### Linux/Ubuntu

```
lerobot-setup-motors \\
    --robot.type=so101_follower \\
    --robot.port=/dev/ttyACM0
```

Collegare prima il servo gripper, impostare ID (6→1):

```
'gripper' motor id set to 6
```

**Sempre 1 solo servo** alla volta. Dopo il completamento, collegare i cavi a 3 pin dall'ID 1.

Stessi passaggi per il braccio leader:

```
lerobot-setup-motors \\
    --teleop.type=so101_leader \\
    --teleop.port=/dev/ttyACM0
```

## Passo 2: Montaggio

Braccio follower come leader (differenza: montaggio dell'end-effector dopo il passo 12).