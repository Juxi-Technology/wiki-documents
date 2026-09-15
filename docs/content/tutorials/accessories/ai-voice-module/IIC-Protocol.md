---
title: "IIC Protocol"
description: "Note: the host device and the voice interaction module may use different power supplies, but they must share …"
---

# IIC Protocol

Note: the host device and the voice interaction module may use different power supplies, but they must share a common ground when connected in order to provide a stable communication level

## 1. The Voice Interaction Module as Slave

Receive and parse the signal sent by the host:

Wait for an IIC signal interrupt; if data is received on IIC, call the corresponding function according to the register address information received via IIC.

Data processing and feedback:

When the voice interaction module receives a register read command, it needs to call the corresponding send function to send the recognized data to the host device.

## 2. IIC Device Address and Register Functions

The IIC slave device address of the voice interaction module is 0x2A.

## 3. Obtaining Command Entries.

Open the command word / playback word protocol list V1_中文 file in the attachments; you can see that the communication protocol starts with 0xFE, 0xED and ends with 0xEE, with 2 bytes in between that are the function type and the ID number respectively.

![Image 1](../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/1.png)

When the voice interaction module recognizes the “停车” command word, it responds “好的，已停止”. The host controller can read one byte of data, 0x02, from the recognition result register (0xDA); this data is the same as the 4th byte in the send protocol for “停车”.

![Image 2](../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/2.png)

## 4. Response Phrase Entries

Response phrase entries are not played back actively; the host controller must set them via IIC before playback occurs (the response phrases of command word entries can also be played back).

The host controller writes one byte — the command word ID number — to the playback register address (0xD1) via IIC, and the voice playback module will play back the corresponding sentence; 0xFF is the ordinary response phrase.

![Image 3](../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/3.png)

For example:

When the user needs to play “这是红色”, the host controller must write “0x5F” to the playback register (0xD1) via IIC, and the voice interaction module will play back “这是红色”.

![Image 4](../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/4.png)

## 5. Function Word Playback Entries

Function word entries can be played back when a command word is recognized, or played back by writing a specific byte via IIC.

The host controller writes one byte — the command word ID number — to the playback register address (0xD2) via IIC, and the voice playback module will play back the corresponding sentence; 0xFF is the ordinary response phrase.

![Image 5](../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/5.png)

For example:

When the user needs to play “这是红色”, the host controller must write “0x01” to the playback register (0xD2) via IIC, and the voice interaction module will play back “欢迎使用小犀”.

![Image 6](../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/6.png)

## 5. Command Word Playback Entries

Command word entries can be played back when a command word is recognized, or played back by writing a specific byte via IIC.

The host controller writes one byte — the command word ID number — to the playback register address (0xD3) via IIC, and the voice playback module will play back the corresponding sentence; 0xFF is the ordinary response phrase.

![Image 7](../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/7.png)

For example:

When the user needs to play “好的，正在前进”, the host controller must write “0x04” to the playback register (0xD3) via IIC, and the voice interaction module will play back “好的，正在前进”.

![Image 8](../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/8.png)



