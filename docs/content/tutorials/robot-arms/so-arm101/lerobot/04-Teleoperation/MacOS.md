---
title: "Step 4: Teleoperation (macOS)"
description: "Run teleoperation on macOS with the usbmodem or wchusbserial ports, including permission setup, port review and an alternative command."
---

# Step 4: Teleoperation (macOS)

## Grant permissions to the port

Grant all users read/write permission for these serial devices

```Shell
chmod 666 /dev/tty.*
```

## Review the port numbers

Follower:

/dev/tty.usbmodem5AAF2193061

/dev/tty.wchusbserial5AAF2193061

Leader:

/dev/tty.usbmodem5AAF2194741

/dev/tty.wchusbserial5AAF2194741

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

## Using the other port also works

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
