---
title: "So-ARM Series STS3215 Servo Calibration — Web Version"
description: "So-ARM101 STS3215 servo calibration web version: connect the leader/follower arms via the browser's Web Serial, middle and range calibration, remote control, FT debugger and calibration file export."
---

# So-ARM Series STS3215 Servo Calibration — Web Version

> **Desktop tool:** [SoARM Series Servo Calibration Tool Tutorial](./SO-ARM101-Servo-Calibration-Tool.md)

The **web version** of the So-ARM101 servo calibration tool: the whole interface runs in the browser and connects to the serial port directly via Web Serial — **no Python installation required**.

Online address:

[https://juxi-technology.github.io/SO-ARM101-ServoController/](https://juxi-technology.github.io/SO-ARM101-ServoController/)

> ⚠️ This tool supports **Feetech (STS3215 series) servos** only.

## 1. Before You Start

- **Browser**: Chrome or Edge 89+ (Firefox / Safari do not support Web Serial)
- Open over **HTTPS or localhost**; GitHub Pages already satisfies this
- **USB-to-serial adapter** + Feetech STS3215 servos, default **1 M baud rate** (`1000000`)


## 2. Connect the Robotic Arm

1. Select the "**Connection Baud Rate**" on the left side of the top bar; the default is `1000000`. **If a servo's baud rate has been changed, select the correct one before connecting**.
1. Click "**Connect Serial**" under "Leader Arm" or "Follower Arm", and choose the corresponding COM port in the browser pop-up.
1. After connecting, the servos are scanned automatically (ID 1–6).


> The two arms can be connected separately and operated independently. If no servos are found, first check whether the connection baud rate matches the servos, then make sure the serial port is not occupied by another program.

## 3. Demo Mode (No Hardware)

Check "**Demo Mode (No Hardware)**" in the top bar before connecting, and a simulated dataset of 6 servos is used so you can browse the entire interface.

> The data in demo mode is simulated and **does not operate real hardware**.

## 4. Three Function Tabs

### 🦾 Servo Calibration

Displays each servo's position, voltage, temperature, and torque status in real time; provides "Middle Calibration", "Middle Test", "Disable Motor", and "Clear Limits" actions for individual servos, plus an entry point for whole-arm calibration.

### 🎚️ Single Servo Control

One row per servo: **ID / Pos / Slider / L (Target)**.

- **Pos and slider are two-way bound**: dragging the slider makes Pos follow, and releasing sends the command; typing a value into Pos sends it immediately.


### 🔬 FT Debugger

Serial connection, servo scanning, reading all registers, single-register read/write, position control, baud rate change, factory reset, and xdat parameter backup and restore.

## 5. Complete Calibration Workflow (Recommended)

1. On the "Servo Calibration" tab, click "**Leader Arm Middle Calibration**" to open the wizard.
1. Click "**Start Middle Value Recording**" (the button turns orange) → pose the robotic arm at the standard middle position → click "**Finish Middle Value Recording**".
1. Click "**Record Motion Range**" (the button turns green) → rotate each joint from one end to the other (**the gripper must be rotated too**) → click again to stop.
1. After the 6 joints are done, the **calibration file is saved automatically**; repeat once for the follower arm.
1. Once both arms are calibrated, click "**🎮 Remote Control**" in the top bar to drive the follower arm with the leader arm.


## 6. Where to Put the Calibration Files

The browser can only download files to the "Downloads" directory. After saving, the wizard shows the target path — **move the files there manually**:

| Part | Target path |
|---|---|
| Leader arm | `~/.cache/huggingface/lerobot/calibration/teleoperators/so_leader/my_leader_arm.json` |
| Follower arm | `~/.cache/huggingface/lerobot/calibration/robots/so_follower/my_follower_arm.json` |

On Windows, `~` is `%USERPROFILE%`; the full path looks like `%USERPROFILE%.cache\huggingface\lerobot\calibration...`.

## 7. Remote Control

After both arms are calibrated and connected, click "**🎮 Remote Control**" in the top bar to drive the follower arm with the leader arm's angles. Click "⏹ Stop Remote Control" again to end.

> Before remote control, make sure the area around both arms is safe — **once the torque is on, the servos cannot be moved by hand**. Remote control requires two connected serial ports.

## 8. FT Debugger in Detail

### Reading and Writing Registers

- Click "**Read All Parameters**" to read all registers of the selected servo; the results fill the parameter table.
- **Clicking a row in the parameter table fills the address and length above; then enter a "Value" and click "Write"**.
- Gray rows (DEFAULT area) are **not readable or writable**, preventing accidental writes to read-only areas.


### Position Control

After selecting a servo, set the target position with the slider or a numeric value and click "Move" to execute. If the torque is not on, you are asked first whether to enable it.

### Change the Baud Rate

After selecting the new baud rate, click "Apply"; after writing, the connection is dropped and it tries to reconnect at the new baud rate; on failure the reason is given in the log.

### Factory Reset

Resets the ID to 1 and the baud rate to 1M; it is **irreversible**, and a second confirmation is required before execution.

### xdat Parameter Backup and Restore

| Button | Action |
|---|---|
| 💾 Save Current Servo as xdat | Read all parameters and download an `.xdat` file |
| 📂 Open xdat | Load a local `.xdat` file |
| 📤 Restore Parameters to Servo | Write the xdat parameters back to the current servo's EEPROM |

> Restoring overwrites settings such as the ID, baud rate, and limits; before executing, make sure the selected servo is correct. EEPROM has a limited write endurance, so do not write frequently.

## 9. Notes

1. **Keep the page in the foreground**: the browser throttles background tabs, so remote control and real-time refresh slow down or even stop.
1. **Sweep the same joint of both arms over a consistent range**, otherwise the motion amplitude will not match during remote control.
1. **The gripper is not a continuous rotation joint and still needs a range sweep**; otherwise its range falls back to the default 0–4095.
1. In the FT debugger, **gray rows (DEFAULT area) are not readable or writable**; EEPROM has a limited write endurance, so do not write frequently.
1. **Make sure the area around both arms is safe before remote control**; once the torque is on, the servos cannot be moved by hand.
1. Only one program can occupy the serial port at a time — while using this page, close the desktop version or other host software.


## 10. FAQ

**Q1: Cannot connect / no servos found.**
First check whether the connection baud rate matches the servos, then make sure the serial port is not occupied by another program.

**Q2: Pos does not refresh.**
Make sure the servo is online; click "Connect Serial" again or refresh the page.

**Q3: Writing fails.**
Check the specific reason in the log; make sure the address and length come from a row in the parameter table.

**Q4: The browser reports that Web Serial is not supported.**
Use Chrome / Edge 89+ and open the page over HTTPS or localhost.

**Q5: LeRobot cannot find the calibration file after saving.**
The browser only downloads to the "Downloads" directory; move the file manually to the path listed in Section 6.
