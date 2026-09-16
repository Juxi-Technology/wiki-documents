---
title: "Chapter 11: ESP-Claw Voice Control"
description: "ESP32-NanoCam tutorial Chapter 11: the 5 hardware control tools in ESP-Claw mode — voice-controlled LED color, AI mode switching, photo vision analysis."
---

# Chapter 11: ESP-Claw Voice Control

> **[Buy in Store](https://www.juxitech.com/products/esp32-s3-wifi-video-module)**

**Chapter goal**: Use voice to directly control the NanoCam's LED effects, AI mode switching, and photo vision analysis.

## About This Chapter

When the device is switched to `ai_mode:7`, the NanoCam enters ESP-Claw mode. It **shares the same firmware** with XiaoZhi AI (`ai_mode:6`) (`nanocam_espclaw/`); the only difference is that ESP-Claw mode additionally registers 5 hardware control tools on top of voice chat.

|Comparison|XiaoZhi AI (mode 6)|ESP-Claw (mode 7)|
|---|---|---|
|Voice chat|✅ ASR→LLM→TTS|✅ The same voice pipeline|
|LED control|❌|✅ Voice-controlled color / on-off|
|AI mode switching|❌|✅ Voice-controlled switching|
|Photo + AI vision analysis|❌|✅ Takes photos and calls multimodal AI to understand the image|

## Principle

On top of the voice pipeline, ESP-Claw mode registers 5 NanoCam-specific tools through `RegisterMcpTools()`:

```Plain
User voice "Turn the light blue"
  → ASR speech recognition (cloud)
  → LLM understands the intent → calls self.led.set_color({"r":0, "g":0, "b":255})
  → The NanoCam WS2812 LED turns blue
  → TTS: "OK, the light is now blue"
```

## Steps

### 11.1 Flashing the Firmware

ESP-Claw uses the standalone `nanocam_espclaw/` firmware project:

```Bash
cd nanocam_espclaw
idf.py set-target esp32s3
idf.py build
idf.py -p COMx flash
```

### 11.2 Switching the Mode

After startup, set it to ESP-Claw mode:

```Plain
ai_mode:7
```

The device reboots automatically and enters it. Use `ai_mode:6` to switch back to XiaoZhi AI mode.

### 11.3 Voice Control Examples

After waking it up, just say what you need:

```Plain
💬 "Turn on the light"             → WS2812 lights up white
💬 "Turn the light blue"           → LED turns blue
💬 "Turn off the light"            → LED turns off
💬 "Switch to face detection mode" → saves ai_mode:2 to NVS + reboots
💬 "Take a look at what's here"    → photo + upload to multimodal AI for analysis
💬 "Is there a cup in front of me" → multimodal AI recognizes the image
```

### 11.4 Photo + AI Vision Analysis

When the user says "take a look...", the firmware captures a VGA RGB565 frame, compresses it to JPEG, and sends it to the multimodal API configured on the server for analysis; the result is announced through TTS voice.

> The multimodal API URL and token are delivered automatically by the server during the connection handshake; there is no need to enter configuration commands over serial manually.

## The 5 NanoCam-Specific Tools

|Tool name|Function|Parameters|
|---|---|---|
|`self.led.set_color`|Set the WS2812 RGB LED (GPIO18)|`r,g,b`: 0-255|
|`self.led.turn_off`|Turn off the LED|None|
|`self.camera.set_ai_mode`|Switch AI mode (saved to NVS + reboot)|`mode`: 0-7|
|`self.camera.inspect_image`|Photo + multimodal LLM vision analysis|`prompt`: question description|
|`self.get_device_info`|Device information JSON|None|

## Configuration Files

|Content|Path|
|---|---|
|MCP tool registration|`nanocam_espclaw/main/boards/nanocam/nanocam_board.cc`|
|Vision sending logic|`nanocam_espclaw/main/boards/common/esp32_camera.cc`|
|SDK default configuration|`nanocam_espclaw/sdkconfig.defaults`|

> The ESP-Claw firmware is a standalone project and does not share code with `nanocam_vision`. The two firmwares must be built and flashed separately.

## How to Choose

|Your need|Recommended mode|
|---|---|
|Just want voice chat and Q&A|mode 6 (XiaoZhi)|
|Want voice control of the LED|mode 7 (ESP-Claw)|
|Want to take photos and have AI "look" at the image|mode 7 (ESP-Claw)|
|Want to switch AI detection modes by voice|mode 7 (ESP-Claw)|

> The full usage of ESP-Claw (server configuration, custom MCP tool development, etc.) is still being explored; the documentation will be updated as research progresses.

This completes the full 11-chapter tutorial series. For the complete serial commands (such as `ai_mode` mode switching), see the [Serial Protocol Manual](./ESP32-NanoCam-Serial-Protocol.md).

<RelatedProducts slugs="esp32-s3-wifi-module" />
