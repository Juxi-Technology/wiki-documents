---
title: "04-Serial Bus Servo Version-User Instructions"
description: "SCS0009 Official Serial Bus Servo Version — User Instructions"
---

# 04-Serial Bus Servo Version-User Instructions

SCS0009 Official Serial Bus Servo Version — User Instructions

> **If what you purchased is the PWM servo version(ESP32-S3 + 8-channel PWM), please ignore this directory**,
just use `..\01_gui_control` or `..\02_hand_tracking`.

This directory explains the support status for the AmazingHand **official original SCS0009 serial bus servo**.

## Current Status

The `..\02_hand_tracking\Demo` in this delivery_package supports both servo backends at the same time and can switch seamlessly through configuration:

|Version|Servo Type|Baud Rate|Configuration File|
|---|---|---|---|
|**PWM**(main deliverable of this package)|ESP32-S3 direct-drive PWM|115200|`{l,r}_hand_pwm.toml`|
|**SCS0009**(official original)|Official serial bus servo|1,000,000|`{l,r}_hand.toml`|

- **PWM version**: In the menu, select `3 - PWM servo (ESP32 direct drive)` and use this package's tutorial.

- **SCS0009 version**: In the menu, select `2 - Real hardware (SCS0009 serial bus servo)`.

## How to Use the SCS0009 Version

1. Hardware: official serial bus servo + serial port adapter(baud rate 1M).

2. Deployment: `Demo\Windows_Scripts_CN\3-部署代码.bat`(or the corresponding Linux script).

3. Run: 4-运行代码.bat → select `2 - Real hardware (SCS0009 serial bus servo)` → select the hand type.

4. For detailed instructions, see `..\02_hand_tracking\Demo\双版本舵机并存说明.md`
and `Demo\Windows_Scripts_CN\Windows使用教程.md`(official tutorial).

## Notes

- SCS0009 requires official servo id configuration(already built into `{l,r}_hand.toml`), which the PWM version does not involve.

- **Only one set of the two servo types can be connected at any one time**; simply switch the hardware + menu option.

- This package takes the PWM version as its main deliverable; for the SCS0009 official tutorial, refer to the official Demo.

