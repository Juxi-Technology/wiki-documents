---
title: "Serial Port Protocol"
description: "Open the command word / playback word protocol list V1中文 file in the attachments; you can see the send protoc…"
---

# Serial Port Protocol

Open the command word / playback word protocol list V1_中文 file in the attachments; you can see the send protocol and the receive protocol,

## 1. Functional Entry Parsing

According to the file, you can see the send and receive protocols for 10 functional entries,

![Image 1](../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/1.png)

We can distinguish functional entries by parsing the third byte of the protocol

![Image 2](../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/2.png)

Among them, the first and second bytes (EF EF) represent the frame header, the third byte represents the function word ID, the fourth byte represents the command word ID, and the fifth byte (EE) represents the frame tail

## 2. Command Entries

An example of a command entry is shown below; the fourth byte in the command word represents the ID

![Image 3](../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/3.png)

Example:

For example, if we say 小车停止 to the module, the module will send the five bytes FE EF 00 01 EE through the serial port. We can obtain this group of data through the host controller's serial port service function, then parse the fourth byte to get ID:01, and at this point we know that it is 小车停止.

## 3. Response Phrase Entries

Response phrase entries are not played back actively; the host controller must send a command through the serial port before playback occurs (the response phrases of command word entries can also be played back).

![Image 4](../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/4.png)

Among them, the first and second bytes (FE EF) represent the frame header, the third byte represents the playback function FF, the fourth byte represents the ID of the content to be played back, and the fifth byte (EE) represents the frame tail

Example:

When we need to play “初始化完成”, the host controller must send FE EF FF 67 EE to the voice interaction module through the serial port; after sending is complete, the voice interaction module can play back “初始化完成”

![Image 5](../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/5.png)

