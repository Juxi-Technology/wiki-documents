---
title: "Web Console Usage Tutorial"
description: "Use the browser-based host application (Web Serial) to connect to and monitor the MAX30102 heart rate & SpO2 module — no software installation required."
---

# Web Console Usage Tutorial

This tutorial explains how to use the browser-based host application to connect to and monitor the heart rate & SpO2 module. The web version accesses the serial port directly through Web Serial; no Python or `.exe` installation is required, and it works on Windows, macOS and Linux.

**Online address:**[https://juxi-technology.github.io/JUXI_HeartRate_SPO2/](https://juxi-technology.github.io/JUXI_HeartRate_SPO2/)

> The web version and the desktop host application use the same Modbus RTU protocol (slave address `0x20`, 9600 baud), and the readings are exactly the same.

## 1. Requirements

- Desktop **Chrome, Edge or Opera** (Web Serial support required)
- Safari, Firefox and mobile browsers do not implement Web Serial and cannot connect to the serial port
- USB-to-TTL driver (CH340, CP2102, FT232, etc.)
- The page needs an Internet connection to load
- The browser only grants the page access to one serial device at a time

## 2. Hardware Connection

| Heart Rate & SpO2 Module | USB-to-TTL |
|---|---|
| **VCC** | **5V** (do not connect to 3.3V) |
| **GND** | **GND** |
| **TX** | **RX** (cross-connect) |
| **RX** | **TX** (cross-connect) |

⚠️ TX and RX must be cross-connected. After wiring is complete, plug the USB-to-TTL adapter into the computer.

## 3. Connecting the Device

1. Open the online address above in desktop Chrome / Edge / Opera.
1. Keep the baud rate at **9600**, the same as the module.
1. Click "**Connect**" and select the USB serial device corresponding to the module in the browser's built-in dialog.
1. When the status shows "**Connected, ready to collect**", the connection is successful, and the selected device is shown next to the button.

> The serial parameters are fixed at 8 data bits, 1 stop bit, no parity and no flow control. The page sets them automatically; no manual configuration is needed.

## 4. Starting Collection and Monitoring

1. Click "**Start Collection**" — the module LED turns on and the status changes to "Collecting, LED is on".
1. Place your finger on the sensor and completely cover the optical area; rest it gently, do not press hard.
1. Click "**Start Monitoring**" — the status changes to "Monitoring..." and real-time data starts refreshing.

## 5. Interface Overview

### Real-time Data

| Metric | Unit | Description |
|---|---|---|
| Blood Oxygen (SPO2) | % | Blood oxygen saturation |
| Heart Rate | BPM | Pulse rate |
| Temperature | °C | Module onboard temperature, not body temperature |

**Filter**: Enabled by default. Applies 5-point median smoothing to the readings and removes outliers outside reasonable ranges (heart rate 35–220, SpO2 70–100%, temperature 0–60 °C). The number removed is shown below the data area, for example "N outliers dropped". Uncheck it to view unprocessed raw readings.

**Status prompts**: Disconnected / Waiting for device selection... / Connected, ready to collect / Collecting, LED is on / Collection stopped, LED is off / Monitoring... / Monitoring stopped / Device disconnected / This browser does not support Web Serial.

### Language Switching

The **EN / 中文** button in the top-right corner switches the interface language. The baud rate and filter switch choices are remembered by the browser and kept the next time you open the page.

### Docs Tab

The "**Docs**" tab at the top embeds this product's tutorials in 11 languages, and you can switch languages directly within the page.

## 6. Stopping and Disconnecting

It is recommended to follow this order:

1. Click "Stop Monitoring"
1. Click "Stop Collection" — the LED turns off
1. Click "Disconnect"

## 7. Data Interpretation

| Data | Normal range | Description |
|---|---|---|
| Blood Oxygen SpO2 | 95% – 100% | Below 90%, consult a doctor |
| Heart Rate | 60 – 100 BPM | Adult resting range |
| Temperature | 25 – 35 °C | Onboard sensor temperature, not body temperature |

Displaying `-1` just after connecting or when the finger is not placed properly is normal.

## 8. Differences from the Desktop Host Application

| Item | Web version | Desktop host application |
|---|---|---|
| Installation | No installation required | Requires running an `.exe` or a Python script |
| Runtime environment | Browser | Windows |
| Communication | Web Serial | System serial port |
| Offline use | Not supported; the page must be online | Supported |
| Protocol and readings | Same | Same |

## 9. FAQ

**Q1: The message "This browser does not support Web Serial" appears.**
Switch to desktop Chrome, Edge or Opera. Safari, Firefox and mobile browsers have not implemented Web Serial.

**Q2: After clicking "Connect", no device appears in the dialog.**
Check whether the USB-to-TTL driver is installed and whether the data cable supports data transfer; try another USB port or unplug and replug the device before trying again.

**Q3: The connection fails.**
Make sure the serial port is not occupied by another program (serial assistant, Arduino IDE, etc.) and that the device is powered on.

**Q4: The LED does not light up after clicking "Start Collection".**
Confirm that VCC is connected to 5V rather than 3.3V, and check whether TX/RX are cross-connected.

**Q5: The data keeps showing -1.**
Confirm that "Start Collection" has been clicked, that your finger completely covers the sensor's optical area, and keep it steady for a few seconds.

**Q6: The device is unplugged.**
The page displays "Device disconnected"; plug it back in and click "Connect" again.

## 10. Precautions

1. Connect the sensor first, then plug in USB.
1. The sensor must be powered at 5V; 3.3V may not work properly.
1. During measurement, completely cover the optical area with your finger and do not press hard.
1. Avoid direct strong light on the sensor.
1. The browser grants access to only one serial device at a time; multiple devices need to be connected separately.
