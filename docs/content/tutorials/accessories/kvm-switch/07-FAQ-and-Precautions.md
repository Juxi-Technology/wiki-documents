---
title: "07 · FAQ and Precautions"
description: "Q1: Can it switch the monitor picture?"
---

# 07 · FAQ and Precautions

> [← Back to overview](/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Applies to: JUXI Technology KVM&HUB&TTL
> Module-specific questions are covered in their own pages (Bluetooth → 03; TTL serial → 04).

## FAQ

**Q1: Can it switch the monitor picture?**
No. This product switches keyboard/mouse and USB devices. Each computer uses its own monitor; for a host without a monitor, use the capture-card solution (see [06](/tutorials/accessories/kvm-switch/06-Headless-Host-Capture-Card-and-OBS)).

**Q2: Do I need to install drivers?**
No — driver-free (Windows / macOS / Linux / Chinese domestic operating systems).

**Q3: Can I connect a portable hard drive?**
This product is USB 2.0; for high-speed storage and capture cards, connect directly to the computer. USB flash drives, keyboards/mice, printers and dongles are fine.

**Q4: The phone cannot connect via Bluetooth / a PIN prompt appears?**
Do not use system Bluetooth "pairing"; install the **BleUart** app and connect inside the app (see [03](/tutorials/accessories/kvm-switch/03-Bluetooth)).

**Q5: Can a phone and a computer connect via Bluetooth at the same time?**
No — only one host device at a time. The PC-side **serial port** (USB) is unaffected and can be used simultaneously.

**Q6: Do USB devices briefly drop when switching?**
Normal: devices "move" between computers with the switch, and the other computer re-enumerates them (some devices need a few seconds).

**Q7: Can it be used as just a HUB?**
Yes — with only one computer connected it is a 3-port USB HUB (see [02](/tutorials/accessories/kvm-switch/02-HUB-Function-One-to-Three)).

**Q8: Does it support gaming mice?**
Keyboard/mouse traffic uses standard USB 2.0 HID — imperceptible in office and debugging use; use high-report-rate gaming devices with caution.

## Precautions

- The TTL port logic level is **3.3 V** — never feed 5 V signal levels into it; `3V3/5V` are **output** pins — never feed power back into them.
- USB 2.0 bandwidth is limited; choose devices according to the recommendations in [02](/tutorials/accessories/kvm-switch/02-HUB-Function-One-to-Three).
- Do not disassemble or re-solder the device; it is ESD-sensitive — discharge yourself before touching it.
- Product functions and interfaces are subject to the physical unit; if this tutorial is updated, the latest version prevails.

## Version History

| Version | Date | Notes |
|---|---|---|
| v1.0 | 2026-10-14 | Initial release, split by functional module (switching/HUB/Bluetooth/TTL/10-pin/capture card/FAQ) |

<RelatedProducts slugs="kvm-switch" />
