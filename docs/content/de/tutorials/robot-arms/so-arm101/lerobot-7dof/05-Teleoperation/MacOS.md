---
title: "Mac-Computer"
description: "Führt unter macOS durch die Teleoperation: Zugriffsrechte setzen, die usbmodem-Ports beider Arme eintragen und den Folgearm über den Führungsarm steuern."
---

# Mac\-Computer

## Port\-Berechtigungen erteilen

Allen Benutzern Lese\- und Schreibzugriff auf diese seriellen Geräte geben

```Shell
chmod 666 /dev/tty.*
```

## Portnummern in Erinnerung rufen

Folgearm:

/dev/tty\.usbmodem5AAF2193061

/dev/tty\.wchusbserial5AAF2193061

Führungsarm:

/dev/tty\.usbmodem5AAF2194741

/dev/tty\.wchusbserial5AAF2194741

## Teleoperation

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm
```

## Ein anderer Port funktioniert ebenfalls

```Shell
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.wchusbserial5AAF2193061 \
    --robot.id=my_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.wchusbserial5AAF2194741 \
    --teleop.id=my_leader_arm
```



