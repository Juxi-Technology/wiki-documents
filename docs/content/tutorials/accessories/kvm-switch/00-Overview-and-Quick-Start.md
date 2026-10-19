---
title: "KVM Switch · Tutorial Overview"
description: "A 2-in 3-out USB keyboard/mouse switch: one keyboard and mouse (plus peripherals) switch between two computers at the press of a button; built-in 3-port USB …"
---

# KVM Switch · Tutorial Overview

> Applies to: JUXI Technology **KVM&HUB&TTL** dual-computer keyboard/mouse switch (USB 2.0)
> Version v1.0 (2026-10-14) | The tutorial is split by functional module — read the parts you need

---

## Find by Module

| What I want to do | Read |
|---|---|
| Get the device running first | This page → "Quick Start" |
| Switch keyboard/mouse & peripherals between two computers | [01 - Switching Between Two Computers](/tutorials/accessories/kvm-switch/01-Switching-Between-Two-Computers) |
| Use it as a USB HUB (one-to-three) | [02 - HUB Function (One to Three)](/tutorials/accessories/kvm-switch/02-HUB-Function-One-to-Three) |
| **Connect via phone Bluetooth, send/receive data** | [03 - Bluetooth](/tutorials/accessories/kvm-switch/03-Bluetooth) |
| **Wire the 6-pin TTL serial port, view data on a PC** | [04 - TTL Serial Port (Wireless Serial)](/tutorials/accessories/kvm-switch/04-TTL-Serial-Port) |
| **Learn about the 10-pin expansion header** | [05 - 10-Pin Expansion Header](/tutorials/accessories/kvm-switch/05-10-Pin-Expansion-Header) |
| Control a dev board / host without a monitor | [06 - Headless Host (Capture Card + OBS)](/tutorials/accessories/kvm-switch/06-Headless-Host-Capture-Card-and-OBS) |
| FAQ and precautions | [07 - FAQ and Precautions](/tutorials/accessories/kvm-switch/07-FAQ-and-Precautions) |

## Product in One Sentence

**A 2-in 3-out USB keyboard/mouse switch**: one keyboard and mouse (plus peripherals) switch between two computers at the press of a button; built-in 3-port USB HUB; plus a **wireless serial feature** — connect a dev board's or sensor's serial port to the 6-pin header and the data is passed through to both the PC serial port and your phone via Bluetooth.

## Interfaces at a Glance

| Location | Name | Description |
|---|---|---|
| Left / right side | PC1 / PC2 ports (Type-C) | Connect the two computers |
| Bottom | USB-A × 3 | Keyboards/mice, USB drives, printers, etc. — switched as a group |
| Top | Power port (Type-C) | Auxiliary power (when host power is insufficient) |
| Middle | Switch button | Short press to switch; long press for Bluetooth mode |
| Top-left | IR receiver | Works with the IR remote control |
| Bottom-right | TTL serial port (6-pin) | Wireless serial feature (see 04) |
| Bottom-right | 10-pin header | Expansion interface (see 05) |
| Top-right | Bluetooth module (built-in) | Wireless serial feature (see 03) |

**Indicator LEDs**: PC1/PC2 (current channel) | Power | UART serial (blinks during transmission) | Bluetooth (lights up after long press)

## Quick Start (5 Minutes)

1. Computer A → Type-C cable → **PC1** port; Computer B → **PC2** port (one computer only is also fine — then it is simply a USB HUB).
2. Plug the keyboard/mouse (or wireless receiver) into any **USB-A** port.
3. Press the switch button and check the **PC1/PC2 indicator LEDs** to confirm which computer is connected.
4. If the host's power is insufficient, also connect Type-C power to the **power port**.

(Illustration: tutorial asset 01 – Function layout)

## Two Important Notes

- This product **does not switch video**: each computer uses its own monitor. For a host without a monitor, use the capture-card solution (see 06).
- This product is **USB 2.0**: perfectly adequate for keyboards/mice, printers, USB drives and dongles; for high-speed storage, connect directly to the computer.

---

*(For details on each functional module, click the corresponding entry in the "Find by Module" table above.)*

<RelatedProducts slugs="kvm-switch" />
