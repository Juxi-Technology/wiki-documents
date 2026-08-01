# Magnetic Encoded STS Servo - Memory Table Parsing

# 1 Servo Communication Protocol

The servo uses the FT-SCS Custom Communication Protocol, with the default serial port configuration at the factory. The default baud rate for the STS servo is 1M, using TTL single-bus communication, with 8 data bits, no parity, and 1 stop bit. The configurable range of the baud rate is 38400~1Mbps, and the default communication address (station number) is 1. [FT-SCS Custom Communication Protocol](https://juxitech.feishu.cn/wiki/MTPLw8xCniTidGkm3amc27FXnKg) (Servo SCS Communication Protocol) 

# 2 Servo Memory Table Definition

If the function address uses two-byte data, the low-order byte is at the front address and the high-order byte is at the back address 

## 2.1 Version Information

## 2.2 EPROM Configuration

## 2.3 SRAM Control

## 2.4 SRAM Feedback

## 2.5 Factory Parameters

# 3 Special Byte Explanation

## 3.1 Servo Phase

- Digit/bit weight: Description

- BIT0 (1): Driving Direction Phase; (0) Forward, (1) Reverse

- BIT1 (2): Drive Axle Mode; (0) Brushless, (1) Brushed, takes effect after restart

- BIT2 (4): Speed Unit; (0) 0.732 RPM, (1) 0.0146 RPM

- BIT3 (8): Speed Mode; (0) Speed 0 indicates stop, (1) Speed 0 indicates maximum speed

- BIT4 (16): Angle Feedback Mode; (0) Feedback single-turn angle, (1) Feedback full angle

- BIT5 (32): Drive Bridge Configuration/Voltage Sampling, (0) Independent H-Bridge/1K High-Voltage Sampling, (1) Integrated H-Bridge/1.5K Low-Voltage Sampling/No Current Feedback

- BIT6 (64): PWM Frequency, (0) 24kHz, (1) 16kHz

- BIT7 (128): Position feedback direction phase, (0) forward, (1) reverse

If multiple bits are set simultaneously, the phase value of the servo is the sum of the values of each bit. For example: if the original phase value is 0 and the servo runs in reverse, the phase value is 128 + 1 = 129; 

## 3.2 Servo Status

Steering gear status: 0 indicates normal, 1 indicates abnormal

- Digit/bit weight: Description

- BIT0 (1): Voltage Status

- BIT1 (2): Magnetic Encoding Status

- BIT2 (4): Temperature Status

- BIT3 (8): Current Status

- BIT4 (16): ----

- BIT5 (32): Load Status

- BIT6 (64): ----

- BIT7 (128): ----

If there are multiple states simultaneously, the state value of the servo is the sum of the individual bit values. For example, if there is overvoltage/undervoltage and servo overheating, the servo state value is 4 + 1 = 5; 

## 3.3 Unloading Conditions

Uninstall condition: 0 indicates off, 1 indicates on

- Digit/bit weight: Description

- BIT0 (1): Voltage Protection

- BIT1 (2): Magnetic Encoding Protection

- BIT2 (4): Overheat Protection

- BIT3 (8): Overcurrent Protection

- BIT4 (16): ----

- BIT5 (32): Load Overload

- BIT6 (64): ----

- BIT7 (128): ----

If multiple bits are set simultaneously, the unloading condition value of the servo is the sum of the values of each bit. For example, if both voltage protection and overheat protection are enabled, the unloading condition value is 4 + 1 = 5; 

## 3.4 LED Alarm Conditions

LED alarm condition: 0 indicates off, 1 indicates on

- Digit/bit weight: Description

- BIT0 (1): Voltage Alarm

- BIT1 (2): Magnetic Encoding Alarm

- BIT2 (4): Overheat Alarm

- BIT3 (8): Overcurrent Alarm

- BIT4 (16): ----

- BIT5 (32): Load Overload Alarm

- BIT6 (64): ----

- BIT7 (128): ----

If multiple bits are set simultaneously, the LED alarm condition value of the servo is the sum of the values of each bit. For example, if both the voltage alarm and overheat alarm are enabled simultaneously, the alarm condition value is 4 + 1 = 5; 

