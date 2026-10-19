---
title: "01 · Switching Between Two Computers (Button & IR Remote)"
description: "One keyboard and mouse (and any peripherals plugged into the USB-A ports) switch between two computers; only one computer is connected at a time."
---

# 01 · Switching Between Two Computers (Button & IR Remote)

> [← Back to overview](/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Applies to: JUXI Technology KVM&HUB&TTL

One keyboard and mouse (and any peripherals plugged into the USB-A ports) switch between **two computers**; only one computer is connected at a time.

## How to Switch

### ① Button
Press the **switch button** in the middle of the device to swap PC1 ⇄ PC2. The **PC1/PC2 indicator LED** on the corresponding side lights up, showing which computer is currently connected.

### ② IR Remote
Point the **IR remote control** at the IR receiver (top-left corner) and press the switch key.
(Whether a remote is included depends on the package you purchased.)

(Illustration: tutorial asset 05 – Button and IR switching)

## Two Usage Forms

| Form | Wiring | Notes |
|---|---|---|
| Both computers have monitors | Each connects its own monitor | Keyboard/mouse switch and use (see Quick Start in 00) |
| One computer has no monitor (dev board, etc.) | The other connects a monitor + capture-card solution | See [06 - Headless Host (Capture Card + OBS)](/tutorials/accessories/kvm-switch/06-Headless-Host-Capture-Card-and-OBS) |

## Normal Behaviour During Switching

- Devices on the USB-A ports temporarily disappear from the "current" computer and appear on the other one (dongles/printers may take a few seconds to re-enumerate).
- **The Bluetooth wireless channel is unaffected by switching** (the connection stays up). The PC-side serial port briefly disconnects during switching and recovers automatically after switching back (see [03](/tutorials/accessories/kvm-switch/03-Bluetooth)/[04](/tutorials/accessories/kvm-switch/04-TTL-Serial-Port)).

## Troubleshooting

**No response when pressing?** Check the PC1/PC2 indicator to confirm the current channel; make sure the target computer is connected via Type-C and powered on; press again to switch back and verify.

<RelatedProducts slugs="kvm-switch" />
