---
title: "Paso 4: Teleoperación (macOS)"
description: "Inicia la teleoperación en macOS usando los números de puerto del brazo seguidor y del brazo líder, con la alternativa del segundo puerto disponible."
---

# Paso 4: Teleoperación (macOS)

## Otorgar permisos al puerto

Permitir que todos los usuarios tengan permiso de lectura y escritura en estos dispositivos de puerto serie

```Shell
chmod 666 /dev/tty.*
```

## Repasar los números de puerto

Brazo seguidor:

/dev/tty.usbmodem5AAF2193061

/dev/tty.wchusbserial5AAF2193061

Brazo líder:

/dev/tty.usbmodem5AAF2194741

/dev/tty.wchusbserial5AAF2194741

## Teleoperación

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm
```

## También sirve usar el otro puerto

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
