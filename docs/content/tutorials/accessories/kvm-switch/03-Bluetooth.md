---
title: "03 · Bluetooth"
description: "The device has a built-in Bluetooth module (the wireless side of the same serial channel as the 6-pin TTL port)."
---

# 03 · Bluetooth

> [← Back to overview](/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Applies to: JUXI Technology KVM&HUB&TTL

## What Bluetooth Is For

The device has a built-in Bluetooth module (the **wireless side of the same serial channel as the 6-pin TTL port**). Once a dev board or sensor is wired to the TTL port, its data is output not only on the PC serial port but also **simultaneously over Bluetooth**; connect a phone and you can send/receive data wirelessly.

> For wiring, see [04 - TTL Serial Port](/tutorials/accessories/kvm-switch/04-TTL-Serial-Port). Bluetooth connection and data transfer are **unaffected by computer switching** (the link stays up whichever computer is selected).

## How It Works (Read This First)

⚠️ **Bluetooth is not a "remote control"** — it is a **wireless serial cable**: it carries serial data between the "device on the 6-pin header" and your "phone/computer". **With no external device connected, a Bluetooth connection shows no data — this is normal.**

```
【External device】        【This product】            【You】
 Dev board/sensor ──6-pin──> serial passthrough ──┬─ wired → PC serial (USB-BLE-SERIAL CH9143)
 (produces/receives data)                          └─ wireless → phone/PC Bluetooth (BleUart App)
```

**Example 1: View IMU attitude data wirelessly**

1. Wire the IMU module's TX/RX/GND/5V to the 6-pin header (crossed, with power — see 04); the IMU starts streaming data.
2. Long-press the switch button for about 3 seconds to enter Bluetooth mode (the LED lights up).
3. Connect the phone's BleUart app to `CH9143BLE2U`.
4. Continuous data frames appear on the phone immediately (about 80 frames per second of attitude data in our test).
5. At the same time, opening `USB-BLE-SERIAL CH9143` in a PC serial tool shows exactly the same data.

**Example 2: Wireless debugging of Raspberry Pi / Jetson**

1. Wire Raspberry Pi Pin8(TXD)/Pin10(RXD)/GND to the 6-pin header (crossed).
2. Boot the Raspberry Pi; the boot log is output on the serial port.
3. Connect via phone BleUart to **view the boot log wirelessly**.
4. Typing and sending in the app sends data out of the 6-pin TXD to the Raspberry Pi — the phone becomes a **wireless serial console** (log in, send commands).

## Phone Connection Steps (4 Steps)

1. **Long-press the switch button for about 3 seconds** until the LED lights up — Bluetooth mode (advertised name: `CH9143BLE2U`).
2. Install the official WCH app **"BleUart"** on your phone (search the app store; free).
3. Open the app → tap "Connect Bluetooth" → select **CH9143BLE2U** from the list.
4. Connected (**no password required**) — start sending/receiving data.

(Illustration: tutorial asset 04 – Long-press to enter Bluetooth mode)

## ⚠️ Important Notes

- **Do not use the phone's system Bluetooth "pairing"**: it will prompt for a PIN and no PIN will work — always connect BLE devices directly with the **BleUart app**.
- The Bluetooth module can be connected to **only one host device at a time** (while a phone is connected, a computer cannot connect via Bluetooth, and vice versa). The PC-side **serial port** (USB) is not affected and can be used simultaneously.

## Troubleshooting

| Problem | Solution |
|---|---|
| CH9143BLE2U not found | Long-press the button again until the LED lights; make sure you are within 10 m |
| PIN prompt / cannot connect | Stop system pairing and use the BleUart app instead |
| Cannot connect in the app | It may be occupied by another device (e.g., a computer) — disconnect the other connection first |
| Connected but no data | Bluetooth carries the serial data of the 6-pin header — first make sure the external device is wired to the TTL port (see 04) |

<RelatedProducts slugs="kvm-switch" />
