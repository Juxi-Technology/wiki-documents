---
title: "Etapa 4: Teleoperação (macOS)"
description: "No macOS, conceda permissões às portas, revise os números anotados e execute a teleoperação do SO-ARM101 usando qualquer um dos dois drivers de porta."
---

# Etapa 4: Teleoperação (macOS)

## Conceder permissões à porta

Permitir que todos os usuários tenham permissão de leitura e escrita nesses dispositivos de porta serial

```Shell
chmod 666 /dev/tty.*
```

## Revisar os números de porta

Braço seguidor:

/dev/tty.usbmodem5AAF2193061

/dev/tty.wchusbserial5AAF2193061

Braço líder:

/dev/tty.usbmodem5AAF2194741

/dev/tty.wchusbserial5AAF2194741

## Teleoperação

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm
```

## Também é possível usar a outra porta

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
