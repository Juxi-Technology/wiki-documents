---
title: "3 · Connect and calibrate"
description: "Connect and calibrate both arms in LeLab: USB wiring notes, Linux serial permissions, and the guided calibration that records each joint's zero point and range."
---

# 3 · Connect and calibrate

> **Previous:** [02 Install and run](02-Install.md)
> **Next:** [04 Teleoperation](04-Teleoperation.md)

Calibration records each joint's zero point and travel range. Do it once per arm; redo it after disassembly or if the calibration file is lost.

## Before you start

- Both arms assembled, servos given their IDs.
- Both arms powered.
- One USB cable per arm, into **two separate USB ports** — a shared hub sometimes enumerates them unreliably.

### Linux: serial permissions

```bash
sudo usermod -aG dialout $USER
```

Then **log out and back in**. Without this, LeLab finds the arm but every read fails with a permission error. Windows and macOS need nothing.

## Which arm is which

| Arm | LeRobot name | LeLab calls it |
|---|---|---|
| The one you move by hand | `so101_leader` | **teleop** |
| The one that follows | `so101_follower` | **robot** |

Calibrate the leader first. Mixing the two up is the usual reason a freshly calibrated arm behaves strangely.

## The flow

Open the **Calibration** tab and work through one arm at a time:

1. **Pick the device** — leader (teleop) or follower (robot).
2. **Pick the serial port.** LeLab lists the USB serial devices it sees. To tell them apart, unplug one arm and see which entry disappears. The choice is remembered.
3. **Pick a calibration profile** — an existing one, or a new one. The profile holds the saved zero positions; if this arm was calibrated before, reuse its profile.
4. **Follow the guided steps.** LeLab walks through each joint in turn; move the joint to the position it asks for and confirm. No keyboard prompts.
5. **Repeat for the other arm** — its own profile and port.

> Each profile belongs to one physical arm. Swapping the two arms over means recalibrating.

## Cameras

Cameras are configured on the same tab. Each camera's name (`front`, `wrist`, …) is the key the policy sees, so use names you will recognise in a training log.

Cameras can be mounted before or after calibration; calibration does not depend on them. Keep the binding stable — swapping which physical camera is called `wrist` between recording and inference makes a trained policy behave nonsensically.

### Rotation

If a camera is mounted upside down or sideways, set its **Rotation**: 0°, 90°, 180° or 270° clockwise. An upside-down wrist camera is 180°.

Rotation is saved per camera and applied to the setup preview, the teleoperation preview, recorded frames and inference. Profiles without a rotation setting are treated as 0°.

- **90° and 270° swap the output dimensions.** A 640 × 480 capture becomes 480 × 640.
- **Checkpoint image dimensions do not reveal orientation.** 0° and 180° produce identical dimensions but opposite images. Before inference, set the rotation used while recording — see [page 6](06-Train-and-Inference.md).

## What gets saved

| File | Contents |
|---|---|
| `~/.cache/huggingface/lerobot/calibration/teleoperators/so101_leader/*.json` | Leader profiles |
| `~/.cache/huggingface/lerobot/calibration/robots/so101_follower/*.json` | Follower profiles |
| `~/.cache/huggingface/lerobot/ports/leader_port.txt` | Leader serial port |
| `~/.cache/huggingface/lerobot/ports/follower_port.txt` | Follower serial port |

These live under `~/.cache/`, so cache-cleanup tools can delete them. If a calibrated arm asks to be calibrated again, check here — see [Troubleshooting](07-Troubleshooting.md).

---

> **Next:** [04 Teleoperation](04-Teleoperation.md)

<RelatedProducts slugs="so-arm101" />
