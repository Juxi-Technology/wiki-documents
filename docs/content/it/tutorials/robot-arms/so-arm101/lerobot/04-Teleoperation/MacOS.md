---
title: "Passo 4: Teleoperazione (macOS)"
description: "Su Mac concedere i permessi alle porte, rivedere i numeri e avviare la teleoperazione con le porte del follower o con la seconda porta disponibile."
---

# Passo 4: Teleoperazione (macOS)

## Concedere le autorizzazioni alle porte

Consentire a tutti gli utenti di leggere e scrivere su questi dispositivi seriali

```Shell
chmod 666 /dev/tty.*
```

## Rivedere i numeri di porta

Braccio passivo:

/dev/tty.usbmodem5AAF2193061

/dev/tty.wchusbserial5AAF2193061

Braccio attivo:

/dev/tty.usbmodem5AAF2194741

/dev/tty.wchusbserial5AAF2194741

## Teleoperazione

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm
```

## È possibile usare anche l'altra porta

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.wchusbserial5AAF2193061 \
    --robot.id=my_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.wchusbserial5AAF2194741 \
    --teleop.id=my_leader_arm
```

<RelatedProducts slugs="so-arm101" />
