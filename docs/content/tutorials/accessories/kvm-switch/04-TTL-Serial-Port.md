---
title: "04 · TTL Serial Port (Wireless Serial)"
description: "The 6-pin TTL port is a serial passthrough port: connect a dev board, sensor, etc."
---

# 04 · TTL Serial Port (Wireless Serial)

> [← Back to overview](/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Applies to: JUXI Technology KVM&HUB&TTL

## What It Is

The 6-pin TTL port is a **serial passthrough port**: connect a dev board, sensor, etc. and its serial data is output from two places "simultaneously" (bidirectional):

```
                ┌─→ PC serial port (USB; recognized as "USB-BLE-SERIAL CH9143")
External device → 6-pin header ┤
                └─→ Bluetooth wireless (phone BleUart app, see 03)
```

**Measured reference**: with an IMU sensor connected, both the PC serial port and Bluetooth steadily received about 1650 bytes/second.

## Pinout and Wiring

Left to right: `GND` `RXD` `TXD` `TNOW` `3V3` `5V`

| Pin | Description | Wiring |
|---|---|---|
| GND | Ground | Connect to the external device's GND (**mandatory**) |
| RXD | Local receive | Connect to the external device's **TXD** (crossed) |
| TXD | Local transmit | Connect to the external device's **RXD** (crossed) |
| TNOW | Transmit-direction indicator | **Leave unconnected** |
| 3V3 | 3.3 V power output | Can power low-power peripherals (choose either 5V) |
| 5V | 5 V power output | Can power low-power peripherals (choose either 3V3) |

**Key points**: TX/RX must be **crossed**; logic level is **3.3 V**; the power pins are **outputs** — never feed power back into them; power low-power modules only.

(Illustration: tutorial asset 12 – TTL wiring example)

## Using It on a Computer

1. Connect this product to the computer via Type-C (either PC1 or PC2).
2. The system recognizes the serial port **`USB-BLE-SERIAL CH9143`** automatically (driver-free on Windows 10/11).
3. Open it with any serial tool; parameters: **115200, 8N1**.
4. Data from the external device streams in immediately (you can also send data to the device).

## Connecting Dev Boards (Raspberry Pi / Jetson)

3.3 V logic level — direct connection works (crossed wiring, GND connected):

| This product | Raspberry Pi | Jetson (Orin series 40-pin) |
|---|---|---|
| RXD | Pin8 (GPIO14 / TXD) | Pin8 (UART1_TXD) |
| TXD | Pin10 (GPIO15 / RXD) | Pin10 (UART1_RXD) |
| GND | Any GND (e.g., Pin9) | Any GND (e.g., Pin9) |

> On Raspberry Pi, enable the serial port in `raspi-config`; on Jetson, enable the 40-pin UART first.
> Typical scenario: dev board serial → KVM → watch logs on the PC while your phone also views them via Bluetooth (wireless debugging).

(Illustration: tutorial asset 10 – Jetson pinout, 11 – Raspberry Pi pinout)

## Troubleshooting: No Serial Data?

Check in order:
1. Is the external device's TX/RX **crossed** and GND connected?
2. Is the external device's baud rate **115200**?
3. Is the external device powered (you may use this product's 5V/3V3 pins)?
4. Is the PC serial port occupied by another program? When the device switches to the other computer, the port briefly disappears (normal).

<RelatedProducts slugs="kvm-switch" />
