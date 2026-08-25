---
title: Steering Gear SCS Communication Protocol
description: "The communication level uses the TTL level method compatible with high-speed communication and the RS485 method with strong anti-interference ability."
---

# Steering Gear SCS Communication Protocol

> **[Buy in Store](https://www.juxitech.com/products/feetech-scs0009-serial-bus-servo)**


# 1 Summary of Communication Protocol

The communication level uses the TTL level method compatible with high-speed communication and the RS485 method with strong anti-interference ability. Communication still uses asynchronous duplex, and the sending and receiving signals are processed asynchronously. 

The controller and the servo communicate using a question-and-answer method, where the controller sends a command frame and the servo returns a response frame. 

In a bus control network, multiple servos are allowed, so each servo is assigned a unique ID number within the network. The control commands sent by the controller contain ID information, and only the servo that matches the ID number can fully receive this command and return response information. 

The communication mode is serial asynchronous, with one frame of data divided into 1 start bit, 8 data bits, and 1 stop bit, no parity bit, totaling 10 bits. 

When some parameters of the memory table use a two-byte value range, the order of the two bytes is distinguished according to the servo model. For potentiometer-type servos, it is in big-endian format (high byte first, low byte second), and for magnetic encoder-type servos, it is in little-endian format (low byte first, high byte second). Since each servo has slightly different functions, please refer to the memory table of the specific model during actual control. 

# 2 Instruction Frame

- Header: Receiving two consecutive 0xFF bytes indicates the arrival of a data packet.
ID Number: Each servo has an ID number. The ID number ranges from 0 to 253, which translates to 0x00 to 0xFD in hexadecimal.

- Broadcast ID: ID number 254 is the broadcast ID. If the ID number sent by the controller is 254 (0xFE), all servos will receive the command, and no response information will be returned for commands other than the PING command (the broadcast PING command cannot be used when multiple servos are connected to the bus).

- Data length: equal to the parameter N to be sent plus 2, i.e., "N+2".

- Instruction: Packet operation function code, see 1.3 Instruction Types for details.

- Parameter: Additional control information required besides the instruction. The parameter supports up to a two-ByteDance parameter to represent a memory value, and the ByteDance order refers to the memory control table in the servo motor user manual (the ByteDance order varies for different servo motor models).

- Checksum: Checksum, the calculation method is as follows
Check Sum = ~ (ID + Length + Instruction + Parameter1 + … Parameter N). If the sum of the calculation within the parentheses exceeds 255, take the lowest ByteDance, where "~" denotes bitwise negation.

# 3 Response Frame

The returned response frame contains the current state ERROR of the servo. If the current operating state of the servo is abnormal, it will be reflected through this ByteDance (for details on the meaning represented by each state, please refer to the Memory Control Table in the manual). If ERROR is 0, the servo has no error information. 

# 4 Instruction Types

## 4.1 Query Status Command PING

- Function: Read the operating status of the servo motor

- Length: 0x02

- Instruction: 0x01

- Parameter: None

- The PING command uses the broadcast address, and the servo also returns a response message.

Example 1: Read the operating status of the servo with ID number 1. 

Command Frame: FF FF 01 02 01 FB (sent in hexadecimal)

```Plain Text
Header：FF FF
ID：01
Length：02
Instruction：01
Checksum：FB
```

Response Frame: FF FF 01 02 00 FC (Hexadecimal Display)

```Plain Text
Header：FF FF
ID：01
Length：02
Instruction：00
Checksum：FC
```

## 4.2 Read Instruction READ DATA

- Function: Read data from the servo memory control table

- Length: 0x04

- Instruction: 0x02

- Parameter 1: Starting address of the data readout segment

- Parameter 2: Length of the data to be read

Example 2: Read the current position of the servo with ID 1 (low byte first, high byte second). The memory table address of the position parameter is 0X38, which is two consecutive bytes. 

Command Frame: FF FF 01 04 02 38 02 BE (sent in hexadecimal)

```Plain Text
Header：FF FF
ID：01
Length：04
Instruction：02
Parameter：38 02（Current position address, data read length）
Checksum：BE
```

Response Frame: FF FF 01 04 00 18 05 DD (Hexadecimal Display)

```Plain Text
Header：FF FF
ID：01
Length：04
Instruction：00
Parameter：18 05
Checksum：DD
```

The two bytes of data read out (in little-endian structure) are: low byte L 0x18, high byte H 0x05. The two bytes combined form a 16-bit data 0X0518, and the current position represented in decimal is 1304. 

## 4.3 Write Instruction WRITE DATA

- Function: Write data to the servo memory control table

- Length: N+2 (N is the parameter length)

- Instruction: 0x03

- Parameter 1: Starting address of the data write segment

- Parameter 2: Write the 1st data

- Parameter 3: Write the second data
…

- Parameter N: Write the nth data, where N = n + 1

Example 3: Use the broadcast ID (0xFE) to set the ID of any numbered servo to 1, and the address where the ID number is stored in the memory table is 5.

Command Frame: FF FF FE 04 03 05 01 F4 (sent in hexadecimal)

```Plain Text
Header：FF FF
ID：01
Length：04
Instruction：03
Parameter：05 01（ID Address New ID Value）
Checksum：F4
```

Since commands are sent using the broadcast ID, there will be no data returned. Additionally, the memory table EPROM has a protection lock switch, which needs to be turned off (set to 0) before modifying the ID; otherwise, the example ID number will not be saved when power is lost. For detailed operations, please refer to the memory table or operation manual of the specific servo model.

Example 4: Control the ID1 servo to rotate to the position of 2048 at a speed of 1000 steps per second. The starting address of the target position in the memory table is 0x2A, so start writing six consecutive ByteDance data at address 0x2A.

- Position data 0x0800 (2048)

- Reserved data 0x0000(0)

- Speed data 0x03E8 (1000)

Command Frame: FF FF 01 09 03 2A 00 08 00 00 E8 03 D5 (sent in hexadecimal)

```Plain Text
Header：FF FF
ID：01
Length：09
Instruction：03
Parameter：
2A（starting address）
00 08（Position）
00 00（Reserved）
E8 03（Speed）
Checksum：D5
```

Response Frame: FF FF 01 02 00 FC (Hexadecimal Display)

```Plain Text
Header：FF FF
ID：01
Length：02
Instruction：00
Checksum：FC
```

Returning a working status of 0 indicates that the servo has correctly received the command without error and has started execution. The ID of the sent command packet uses a non-broadcast ID (0xFE), so the servo will return a status packet after the command reception is completed. 

## 4.4 Asynchronous Write Instruction REG WRITE

The REG WRITE instruction is similar to WRITE DATA, except that the execution time is different. When a REG WRITE instruction frame is received, the received data is stored in the buffer for later use, and the asynchronous write flag register is set to 1. After receiving the ACTION instruction, the stored instruction is finally executed. 

- Length: N+2 (N is the parameter length)

- Instruction: 0x04

- Parameter 1: Starting address of the data write area

- Parameter 2: The first data written 

- Parameter 3: The second data written

- Parameter N: The nth data written, where N = n + 1

Example 5: Control servos from ID1 to ID10 to rotate to position 2048 at a speed of 1000 per second. 

```Plain Text
ID 1：Asynchronous Write Command Frame：FF FF 01 09 04 2A 00 08 00 00 E8 03 D4 
ID 1：Response Frame：FF FF 01 02 00 FC
ID 2：Asynchronous Write Command Frame：FF FF 02 09 04 2A 00 08 00 00 E8 03 D3 
ID 2：Response Frame：FF FF 02 02 00 FB
ID 3：Asynchronous Write Command Frame：FF FF 03 09 04 2A 00 08 00 00 E8 03 D2 
ID 3：Response Frame：FF FF 03 02 00 FA
ID 4：Asynchronous Write Command Frame：FF FF 04 09 04 2A 00 08 00 00 E8 03 D1 
ID 4：Response Frame：FF FF 04 02 00 F9
ID 5：Asynchronous Write Command Frame：FF FF 05 09 04 2A 00 08 00 00 E8 03 D0 
ID 5：Response Frame：FF FF 05 02 00 F8
ID 6：Asynchronous Write Command Frame：FF FF 06 09 04 2A 00 08 00 00 E8 03 CF 
ID 6：Response Frame：FF FF 06 02 00 F7
ID 7：Asynchronous Write Command Frame：FF FF 07 09 04 2A 00 08 00 00 E8 03 CE 
ID 7：Response Frame：FF FF 07 02 00 F6
ID 8：Asynchronous Write Command Frame：FF FF 08 09 04 2A 00 08 00 00 E8 03 CD 
ID 8：Response Frame：FF FF 08 02 00 F5
ID 9：Asynchronous Write Command Frame：FF FF 09 09 04 2A 00 08 00 00 E8 03 CC 
ID 9：Response Frame：FF FF 09 02 00 F4
ID10：Asynchronous Write Command Frame：FF FF 0A 09 04 2A 00 08 00 00 E8 03 CB
ID10：Response Frame：FF FF 0A 02 00 F3
```

## 4.5 Execute asynchronous write instruction ACTION

- Function: Trigger REG WRITE instruction

- Length: 0x02

- Instruction: 0x05

- Parameter: None

1. The ACTION command is very useful when controlling multiple servos simultaneously.

2. When controlling multiple servos, using the ACTION command allows the first and last servos to execute their respective actions simultaneously, with no delay in between.

3. When sending ACTION commands to multiple servos, the broadcast ID (0xFE) is used. Therefore, sending this command will not result in a data frame being returned.

Example 6: After sending the asynchronous write command to control the servos from ID1 to ID10 to rotate to position 2048 at a speed of 1000 per second, an asynchronous write command needs to be executed. 

```Plain Text
Command Frame：FF FF FE 02 05 FA
Response Frame：None
```

## 4.6 Synchronous Write Instruction SYNC WRITE

- Function: Used to control multiple servos simultaneously.

- ID：0xFE

- Length: (L+1)\*n+4 (L: Data length sent to each servo, n: Number of servos)

- Instruction: 0x83

- Parameter 1: Starting address of the written data

- Parameter 2: Length (L) of the written data

- Parameter 3: ID number of the first servo

- Parameter 4: Write the first data of the first servo

- Parameter 5: Write the second data of the first servo
…

- Parameter L+3: Write the Lth data of the 1st servo

- Parameter L+4: ID number of the second servo

- Parameter L+5: Write the first data of the second servo motor

- Parameter L+6: Write the second data of the second servo
…

- Parameter 2L+4: Write the L-th data of the 2nd servo
…

Different from the REG WRITE+ACTION command, the SYNC WRITE command has higher real-time performance. A single SYNC WRITE command can modify the contents of the control tables of multiple servos at once, while the REG WRITE+ACTION command achieves this in steps. Nevertheless, when using the SYNC WRITE command, the length of the written data and the starting address of the saved data must be the same. 

Example 7: Write position 0x0800, time 0X0000, and speed 0x03E8 (low byte first, high byte last) to the starting address 0x2A of a total of 4 servos from ID1 to ID4. 

Command Frame: FF FF FE 20 83 2A 06 01 00 08 00 00 E8 03 02 00 08 00 00 E8 03 03 00 08 00 00 E8 03 04 00 08 00 00 E8 03 58 (Sent in Hexadecimal)

```Plain Text
Header：FF FF
ID：FE
Valid Data Length：20
Instruction：83
Parameter：
2A 06（Start Address Data Length）
01 00 08 00 00 E8 03（ID1 servo Instruction）
02 00 08 00 00 E8 03（ID2 servo Instruction）
03 00 08 00 00 E8 03（ID3 servo Instruction）
04 00 08 00 00 E8 03（ID4 servo Instruction）
Checksum：58
```

## 4.7 Synchronous Read Instruction SYNC READ

- Function: Used to query multiple servos simultaneously.

- ID：0xFE

- Length: n+4 (n is the number of servos)

- Instruction: 0x82

- Parameter 1: Starting address for reading data

- Parameter 2: Length of Read Data

- Parameter 3: ID number of the 1st servo

- Parameter 4: ID number of the second servo
…

- Parameter N: ID number of the nth servo, N = n + 2

A SYNC READ command can query the contents of the control tables of multiple servos in one go. The SYNC READ command specifies the IDs of the servos to be queried, and the servos return response packets in the order of the IDs in the command packet. When using the SYNC READ command, the length and starting address of all queried data must be the same (this command is available for some serial bus servos). 

Example 8: Query the current position, current speed, current load, current voltage, and current temperature of a total of 2 servo motors from ID1 to ID2 (starting address 0x38, a total of 8-word data, with the low-order ByteDance first and the high-order ByteDance last).

Command Frame: FF FF FE 06 82 38 08 01 02 36

```Plain Text
Header：FF FF
ID：FE
Length：06
Instruction：82
Parameter：
38 08（Data Starting Address  Data Length）
01 02（ID01 ID02）
Checksum：36
```

Response Frame:

```Plain Text
ID01 servo motor：FF FF 01 0A 00 00 08 00 00 00 00 79 1E 55 
ID02 servo motor：FF FF 02 0A 00 FF 07 00 00 00 00 77 23 53
```

The response frame can be decoded according to the read command 

## 4.8 Status Reset Command RESET

- Function: Reset servo state (reset servo rotation count)

- Length: 0x02

- Instruction: 0x0A

- Parameter: None

Example 9: Reset the servo motor with ID number 01. 

```Plain Text
Command Frame：FF FF 01 02 0A F2（Send in hexadecimal format）
Response Frame：FF FF 01 02 00 FC（Hexadecimal display）
```

## 4.9 Position Calibration Instruction

- Function: Recalibrate the current position to the set value

- Length: 0x02 or 0x04

- Instruction: 0x0B

- Parameter: None or set value 

Note: If the position calibration command has no parameters, it means calibrating the current position to the middle position; the calibration command only supports some servo models, and please refer to the following table for the supported servo models.

Example 10: Recalibrate the current position to the middle position. 

```Plain Text
Command Frame：FF FF 01 02 0B F1（Send in hexadecimal format）
Response Frame：FF FF 01 02 00 FC（Hexadecimal display）
```

Example 11: The current position is recalibrated to 1024. 

Command Frame: FF FF 01 04 0B 00 04 EB (sent in hexadecimal)

```Plain Text
Header：FF FF
ID：01
Length：04
Instruction：0B
Set value：00 04（1024）
Checksum：EB
```

Response Frame: FF FF 01 02 00 FC (Hexadecimal Display)

```Plain Text
Header：FF FF
ID：01
Length：02
Status：00
Checksum：FC
```

## 4.10 Parameter Restoration Instruction

- Function: Restore other parameters of the servo except the ID number

- Length: 0x02

- Instruction: 0x06

- Parameter: None

Example 11: Restore servo parameters.

```Plain Text
Command Frame：FF FF 01 02 06 F6（Send in hexadecimal format）
Response Frame：FF FF 01 02 00 FC（Hexadecimal display）
```

Note: Unlock the EPROM parameters before restoring the servo parameters.

## 4.11 Parameter Backup Instruction

- Function: Parameter backup (used for parameter restoration instruction)

- Length: 0x02

- Instruction: 0x09

- Parameter: None

Example 12: Back up steering gear parameters.

```Plain Text
Command Frame：FF FF 01 02 09 F3（Send in hexadecimal format）
Response Frame：FF FF 01 02 00 FC（Hexadecimal display）
```

Note: Unlock the eprom parameters before backing up the servo parameters

## 4.12 Restart Command

- Function: Restart command (restart the servo)

- Length: 0x02

- Instruction: 0x08

- Parameter: None

Example 13: Restart the servo. 

```Plain Text
Command Frame：FF FF 01 02 08 F4（Send in hexadecimal format）
Response Frame：None (Restart duration approx. 800ms)
```

Note: Before restarting the servo, turn off the torque switch first

