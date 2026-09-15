---
title: "Potentiometer SCSCL Servo Memory Table"
description: "The servo uses the FT-SCS custom Communication Protocol. The default baud rate of the servo is 1M or 500k, using TTL single bus communication, with 8"
---

# Potentiometer SCSCL Servo Memory Table

> **[Buy in Store](https://www.juxitech.com/products/feetech-scs0009-serial-bus-servo)**


## 1 Servo Communication Protocol

The servo uses the FT-SCS custom Communication Protocol. The default baud rate of the servo is 1M or 500k, using TTL single bus communication, with 8 data bits, no parity, and 1 stop bit. The configurable range of the baud rate is 38400~1Mbps (500k), and the default communication address (station number) is 1. [FT-SCS Custom Communication Protocol](https://juxitech.feishu.cn/wiki/MTPLw8xCniTidGkm3amc27FXnKg)

## 2 Servo Memory Table Definition

If the function address uses data with two bytes, the high-order byte is at the front address, and the low-order byte is at the back address 

### 2.1 Version Information

### 2.2 EPROM Configuration

### 2.3 SRAM Control

### 2.4 SRAM Feedback

### 2.5 Factory Parameters

## 3 Special Byte Explanation

### 3.1 Servo Phase

- Digit/bit weight: Description

- BIT0 (1): Driving direction phase; (0) Forward, (1) Reverse

- BIT1 (2): ----

- BIT2 (4): ----

- BIT3 (8): Speed Mode; (0) Speed 0 indicates stop, (1) Speed 0 indicates maximum speed

- BIT4 (16): ----

- BIT5 (32): PWM Phase, (0) In-phase, (1) Anti-phase

- BIT6 (64): Voltage Mode, (0) 1.5K Low Voltage Sampling, (1) 1K High Voltage Sampling

- BIT7 (128): ----

If multiple bits are set simultaneously, the phase value of the servo is the sum of the individual bit values. 

### 3.2 Servo Status

Steering Gear Status: 0 indicates normal, 1 indicates abnormal

- Digit/bit weight: Description

- BIT0 (1): Voltage Status

- BIT1 (2): ----

- BIT2 (4): Temperature Status

- BIT3 (8): ----

- BIT4 (16): ----

- BIT5 (32): Load Status

- BIT6 (64): ----

- BIT7 (128): ----

If there are multiple states simultaneously, the state value of the servo is the sum of the individual bit values. For example, if there is overvoltage/undervoltage and servo overheating, the servo state value is 4 + 1 = 5; 

### 3.3 Unloading Conditions

Uninstallation condition: 0 indicates off, 1 indicates on 

- Digit/bit weight: Description

- BIT0 (1): Voltage protection

- BIT1 (2): ----

- BIT2 (4): Overheat Protection

- BIT3 (8): ----

- BIT4 (16): ----

- BIT5 (32): Load Overload

- BIT6 (64): ----

- BIT7 (128): ----

If multiple bits are set simultaneously, the unloading condition value of the servo is the sum of the values of each bit. For example, if voltage protection and overheat protection are both enabled, the unloading condition value is 4 + 1 = 5; 

### 3.4 LED Alarm Conditions

LED Alarm Condition: 0 indicates off, 1 indicates on

- Digit/bit weight: Description

- BIT0 (1): Voltage Alarm

- BIT1 (2): ----

- BIT2 (4): Overheat Alarm

- BIT3 (8): ----

- BIT4 (16): ----

- BIT5 (32): Load Overload Alarm

- BIT6 (64): ----

- BIT7 (128): ----

If multiple bits are set simultaneously, the LED alarm condition value of the servo is the sum of the values of each bit. For example, if both voltage alarm and overheat alarm are enabled simultaneously, the alarm condition value is 4 + 1 = 5; 

