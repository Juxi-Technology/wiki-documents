---
title: "05 · 10-Pin Expansion Header"
description: "The 10-pin header at the bottom-right corner of the device is a reserved expansion interface."
---

# 05 · 10-Pin Expansion Header

> [← Back to overview](/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Applies to: JUXI Technology KVM&HUB&TTL

The **10-pin header** at the bottom-right corner of the device is a **reserved expansion interface**. Its silkscreen markings are:

| Row | Markings |
|---|---|
| Top row | `RI#` `DSR#` `FCE` `DTR#` `RST#` |
| Bottom row | `CTS#` `DCD#` `GND` `GND` `GND` |

## Notes

- This port is intended for **secondary development** — connecting external controllers, custom cables, etc. (serial control signals).
- Normal use (switching keyboard/mouse, HUB, wireless serial) **does not require this port**.
- For the electrical definition and usage of this interface, please contact us (subject to the physical unit and the latest manual).
- Before wiring it yourself, verify levels with a multimeter to avoid damaging the device.

(Illustration: tutorial asset 03 – TTL pins and 10-pin header)

<RelatedProducts slugs="kvm-switch" />
