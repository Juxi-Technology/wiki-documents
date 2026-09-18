---
title: "Étape 4 : Téléopération (macOS)"
description: "Lancez sur Mac la téléopération des deux bras en réutilisant vos numéros de port, avec les deux variantes de pilote série possibles."
---

# Étape 4 : Téléopération (macOS)

## Accorder les permissions au port

Permettre à tous les utilisateurs de lire et d'écrire ces périphériques série

```Shell
chmod 666 /dev/tty.*
```

## Rappel des numéros de port

Bras esclave :

/dev/tty.usbmodem5AAF2193061

/dev/tty.wchusbserial5AAF2193061

Bras maître :

/dev/tty.usbmodem5AAF2194741

/dev/tty.wchusbserial5AAF2194741

## Téléopération

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm
```

## Un autre port fonctionne aussi

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
