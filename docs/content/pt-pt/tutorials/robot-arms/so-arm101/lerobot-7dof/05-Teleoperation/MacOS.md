---
title: "Computador Mac"
description: "Teleoperação no macOS com os dois braços ligados, depois de conceder as permissões às portas série e rever os números das mesmas."
---

# Computador Mac

## Dar permissões às portas

Permitir que todos os utilizadores tenham permissão de leitura e escrita nestes dispositivos de porta série

```Shell
chmod 666 /dev/tty.*
```

## Rever os números das portas

Braço seguidor:

/dev/tty\.usbmodem5AAF2193061

/dev/tty\.wchusbserial5AAF2193061

Braço líder:

/dev/tty\.usbmodem5AAF2194741

/dev/tty\.wchusbserial5AAF2194741

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

## Também funciona com a outra porta

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.wchusbserial5AAF2193061 \
    --robot.id=my_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.wchusbserial5AAF2194741 \
    --teleop.id=my_leader_arm
```


