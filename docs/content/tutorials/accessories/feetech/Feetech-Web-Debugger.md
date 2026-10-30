---
title: "Feetech Bus Servo Web Debugger (SCS0009 / STS3215 / HD1910)"
description: "Feetech bus servo web debugger: connect via Web Serial in the browser; supports scanning, parameter read/write, position control, baud rate change, factory reset and xdat backup for SCS0009 / STS3215 / HD1910."
---

# Feetech Bus Servo Web Debugger (SCS0009 / STS3215 / HD1910)

> **Desktop tools:** [SCS0009 Servo Debug Tool Tutorial](./SCS0009-Debug-Tool.md) ｜ [STS3215 & SCS0009 Tutorial](./Feetech-STS3215&SCS0009-Tutorial.md)

The web version of the Feetech bus servo debug tool: the browser opens the USB serial port directly via **Web Serial** to communicate with the servos, covering serial connection, servo scanning, model identification, parameter read/write, position control and real-time following, baud rate change, factory reset, and xdat parameter backup and restore.

A pure static page — **no software or Python environment to install**; just open the URL and use it. Currently adapted for three models: **SCS0009**, **STS3215**, and **HD1910**.

## 1. Open the Web Page

Online address:

[https://juxi-technology.github.io/FT-ServoController-web/](https://juxi-technology.github.io/FT-ServoController-web/)

The same site also hosts the complete web version usage guide (supports Chinese/English switching):

[https://juxi-technology.github.io/FT-ServoController-web/guide.html](https://juxi-technology.github.io/FT-ServoController-web/guide.html)

Environment requirements:

- **Chrome or Edge 89+** (Firefox and Safari do not support Web Serial)
- The page must be opened over **https or localhost**
- A USB-to-TTL driver is required (CH340, CH343, CP2102, etc.)


## 2. Connect the Serial Port

1. In the "🔌 Serial Connection" section, select the **baud rate**; the default is 1000000 (1M).
1. Click "**Connect Serial**" and select the USB serial port of the servo in the system dialog that the browser pops up.
1. After a successful connection, the status in the upper-right corner changes to "🟢 Connected".


Available baud rates: 1000000 / 500000 / 250000 / 128000 / 115200 / 76800 / 57600 / 38400.

## 3. Scan Servos and Identify Models

1. After connecting the serial port, click "🔍 **Scan Servos**". The page scans IDs 1–254 and **displays a servo as soon as it is found**, with no need to wait for the whole scan to finish.
1. During scanning, the button turns into a red "⏹ **Stop Scanning**"; click it again to interrupt the scan, and the servos already found are kept.
1. Click a servo chip (or the dropdown above) to select the target servo.


The model is determined automatically from the **two bytes at addresses 3 / 4** of the servo (servo major and minor version numbers):

| Model | Identification bytes (major / minor) | Position range | Byte order |
|---|---|---|---|
| SCS0009 | 5 / 4 | 0–1023 | Big-endian |
| STS3215 | 9 / 3 | 0–4095 | Little-endian |
| HD1910 | 10 / 31 | 0–4095 | Little-endian |

The identification result is shown on the servo chip, e.g. **ID1 (SCS0009 · SCS)**; the parameter table and position range switch automatically with the selected servo. Models not in the identification table are shown as "Unknown model", and the log prints the two bytes actually read, making it easy to send us feedback so we can add support.

## 4. Parameter Table

The parameter table shows all registers of the selected servo in five columns — **address, register, value, storage area, read-write**; the storage area is divided into EPROM, SRAM, and DEFAULT and color-coded by area.

> **Only the row marked as writable in the "read-write" column can be selected and written**; read-only registers and the DEFAULT area cannot be clicked and never become the write row, preventing accidental writes to read-only areas.

## 5. Reading and Writing Parameters

**Read parameters**: after clicking a servo chip to select the target servo, the page **automatically reads all parameters of that servo** and fills them into the parameter table, while aligning the position-control slider to its current actual position. You can also click "📖 Read Params" at any time to refresh manually.

**Write parameters**:

1. **Select a row** in the parameter table (only writable rows can be selected).
1. The "Write Address 0x" and "Length" fields at the bottom are filled in automatically.
1. Enter the new value in the "Value" input box and click "✏️ **Write**".
1. When writing to EEPROM, the page automatically performs **unlock → write → lock**; the result is shown in a floating toast with the reason for success or failure.


> Before changing parameters such as the ID, baud rate, or angle limits, use "Save Current Servo" to back up an xdat file first, so it is easy to restore if something goes wrong.

## 6. Position Control

1. After selecting a servo, drag the **target position** slider in the "🎯 Position Control" section, or type directly in the value box. The range depends on the model: **0–1023 for SCS0009** and **0–4095 for STS3215 / HD1910**; the slider and value box are linked in both directions.
1. Set the **speed** (raw register value; the unit meaning differs between series).
1. Click "▶ **Move**" to execute; the page polls the MOVING flag and prompts you to turn off the torque when the movement ends.


**Real-time follow**: after checking "Real-time Follow", the servo follows the slider in real time while you drag. Checking it first asks for a second confirmation and automatically enables that servo's torque; sending is throttled so the bus is not flooded. It turns off automatically when you switch servos, rescan, or disconnect, with a reminder to turn off the torque.

Torque control:

| Button | Action |
|---|---|
| ⚡ Torque ON | Enable the current servo's torque |
| ⏹ Torque OFF | Disable the current servo's torque |
| ⏹ All Torque OFF | Release all servos on the bus with one click |

> **If the connection drops suddenly during rotation, reconnect and turn off the torque immediately.**

## 7. Read Status

Click "📊 Read Status"; the status bar below shows the current position, speed, load, voltage, temperature, current, and running flag.

## 8. Change the Baud Rate

1. In the "🔧 Baud Rate / Factory Reset" section, select the **new baud rate**.
1. Click "🔧 **Change Baud Rate**".
1. After writing, the page **reopens the serial port at the new rate and reads back to verify**; on failure it **rolls back automatically** to the original baud rate, so the servos do not become unreachable.


## 9. Factory Reset

Click "🔄 **Factory Reset**"; a **second confirmation** is required before execution. The reset command differs between series, and the page selects it automatically according to the identified model:

| Model | Reset command | After execution |
|---|---|---|
| SCS0009 | 0x0A factory reset | ID returns to 1, baud rate returns to 1M |
| STS3215 / HD1910 | 0x06 parameter restore | ID stays unchanged; other parameters return to defaults |

> Factory reset is **irreversible**; it is recommended to save an xdat backup before executing it.

## 10. xdat Parameter Backup and Restore

The "📁 xdat Parameters (EEPROM only)" section provides three actions:

| Button | Action |
|---|---|
| 💾 Save Current Servo | Read all parameters of the servo and download them as an .xdat file |
| 📂 Open xdat | Load a local .xdat file and preview its contents |
| 📤 Restore Parameters to Servo | Write the loaded xdat parameters back to the current servo's EEPROM |

The saved file name includes the **model and ID**, e.g. **SCS0009_ID1.xdat**, **HD1910_ID6.xdat**, so files with the same ID on different models do not overwrite each other.

The file format is "2-byte file header + 49-byte data area"; register address A is stored at offset A+2; multi-byte values are stored in the model's byte order (big-endian for SCS, little-endian for STS / HD1910).

> To avoid corrupting parameters, the page verifies whether the file and the current servo belong to the same byte-order family, and **forbids writing back when they differ**. During restore, only writable EEPROM parameters are written, skipping the model and read-only areas; the data area only covers addresses 0–48. Before restoring, make sure the selected servo ID is correct.

## 11. Log

The "📜 Log" at the bottom of the page records every operation and its returned result in real time; click "Clear" to clear it.

The interface supports **Chinese/English switching** — the "EN / English" button in the upper-right corner switches the interface and log language instantly, and historical log entries are refreshed as well, with no need to reconnect.

## 12. Safety Notes

- ⚠️ Only one program can occupy the serial port at a time. While using this page, close the desktop host software, serial assistants, and other such programs.
- ⚠️ If the cable is unplugged during movement, the servo may still be executing its action — **turn off the torque first** after reconnecting.
- ⚠️ Always cut the power before wiring or plugging/unplugging.
- ⚠️ Before leaving the page, click "⏹ All Torque OFF" to release all servos with one click.


## 13. FAQ

**Q1: The page reports that Web Serial is not supported, or it cannot connect.**
Use Chrome / Edge 89+ and access the page over https or localhost. Firefox and Safari do not implement Web Serial.

**Q2: Connection fails with a message that the serial port cannot be opened.**
Make sure the serial port is not occupied by another program (desktop host software, serial assistant, Arduino IDE, etc.), and that the USB-to-TTL driver is installed.

**Q3: No servos are found when scanning.**
Make sure the wiring is correct, the servos are powered, and the baud rate matches the servos. If a servo's baud rate has been changed, try the other settings first; when there is an ID conflict on the bus, two servos respond at the same time — connect a single servo to troubleshoot first.

**Q4: Some rows in the parameter table cannot be clicked.**
This is by design: only rows marked as writable in the "read-write" column can be selected for writing; read-only registers and the DEFAULT area are not writable.

**Q5: What if changing the baud rate fails?**
The page rolls back automatically to the original baud rate and shows the reason for the failure; check the wiring and try again.

**Q6: What if the servo shows "Unknown model"?**
It means the two bytes at addresses 3 / 4 of that servo are not in the identification table. Currently only SCS0009, STS3215, and HD1910 are adapted; check the "major version / minor version" values in the log and send them to us as feedback so we can add support.

**Q7: The page behavior does not change after an update.**
The browser caches scripts; reload with a hard refresh (Windows: Ctrl+Shift+R; macOS: Cmd+Shift+R).
