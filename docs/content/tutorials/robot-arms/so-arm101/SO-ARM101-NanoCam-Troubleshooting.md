---
title: "Wireless Teleoperation Troubleshooting"
description: "A roundup of common failures in the SO-ARM101 wireless teleoperation (ESP32-NanoCam version): symptoms, causes, and solutions for flashing and serial, camera."
---

# Wireless Teleoperation Troubleshooting

> **[Buy in Store](https://www.juxitech.com/products/so-arm101-developers-kit)**

This page collects common troubleshooting for the ESP32-NanoCam version of the SO-ARM101 wireless teleoperation. For the complete workflow, see [SO-ARM101 Wireless Teleoperation (ESP32-NanoCam Version)](./SO-ARM101-NanoCam-Wireless-Teleop.md).

## General Troubleshooting Quick Reference

| Symptom | Check |
|---|---|
| Cannot connect for flashing | Manually enter download mode (BOOT + reset); add `upload_port` in `platformio.ini` |
| No serial output after flashing | Check the USB cable and the CH340 driver; on Windows check the COM port in Device Manager |
| Stuck at `Waiting for micro-ROS Agent...` | Check AGENT_IP / UDP 8888 / client isolation |
| Servo bus not responding (`servo_mask≠0x3f`) | Make sure it is wired to P2-7/P2-8 through the servo driver board UART; follower arm on 12V 5A external power |
| Microphone level stuck at 0 | Check the `audio: ES8311 ready` log; I2C 41/42 pull-ups; blow at the microphone to verify |
| Speaker silent | Check the speaker connection; ES8311 volume register `R_DAC32` (set to max 0xFF in the current firmware) |
| WiFi frequently drops | Check the antenna and distance; the RGB turning red indicates WiFi loss, with auto-reboot after 10s |

## Flashing and Serial Problems

- **Cannot connect for flashing**: hold the BOOT button (GPIO0) → plug in USB (or press reset) → release BOOT, then immediately re-run upload. On Windows, if the serial port is not detected automatically, add a line `upload_port = COM3` under `[env:nano_cam]` in `platformio.ini` (replace it with the CH340's actual COM number from Device Manager).
- **No serial output after flashing**: the NanoCam's USB is CH340K → UART0, with the device name `/dev/ttyUSB0` under Linux; if it is not recognized when plugged in, check the USB cable and the CH340 driver (bundled in the kernel).
- **Servo bus not responding (`servo_mask≠0x3f`)**: make sure the servo bus is wired to **P2-7/P2-8** (GPIO19/20) through the servo driver board UART, not to UART0's 43/44; the follower arm must use 12V 5A external power (USB cannot drive 6 servos).
- **Servo bus confused with the debug serial**: the debug serial is USB-C (CH340K → UART0), completely independent of the servo bus, and the two can be used at the same time.

## Build and Toolchain Problems

- **First `pio run` downloads slowly / appears stuck** (the first run downloads, in order, the espressif32 platform, the `toolchain-xtensa-esp32s3` toolchain (~100 MB) and the Arduino framework (~200 MB)): PlatformIO's time-remaining estimate is inaccurate — it often appears stuck for a while and then suddenly jumps to done; give it 5 minutes and watch whether the percentage advances; you can turn on a proxy/VPN (uses the system proxy);
- **Download the toolchain manually**: get `https://dl.espressif.com/dl/xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-win32.zip` in a browser (the Linux equivalent is `-linux-amd64.tar.gz`), unzip it, rename the directory to `toolchain-xtensa-esp32s3`, place it in `C:\Users\<username>\.platformio\packages\`, and re-run `pio run`; a Ctrl+C interruption midway does not damage the environment, and re-running resumes the download;
- **The `pio` command is not found in Git Bash on Windows**: use a PowerShell/CMD terminal instead, or add `C:\Users\<username>\.platformio\penv\Scripts` to PATH.

## Camera-Specific Troubleshooting

| Symptom | Root cause | Fix |
|---|---|---|
| `i2c driver install error` + `camera probe failed` | **I2C conflict**: ES8311 occupies GPIO41/42 via `Wire1`, so the camera SCCB's attempt to install the I2C driver is rejected | Add `Wire1.end()` at the end of `init()` in `audio_es8311.cpp` to release the I2C for the camera |
| `JPEG format is not supported on this sensor` (0x106) | **The GC2145 has no hardware JPEG encoder** (only the OV2640/OV5640 do) | Switch capture to `PIXFORMAT_RGB565`; `/stream` and `/jpg` use `frame2jpg` to software-encode into JPEG |
| `/jpg`, `/stream` no response, browser spins forever | **httpd stack overflow**: the default 8KB stack cannot fit `frame2jpg` software encoding | Set `config.stack_size = 16384` in `start_server()` |
| `/stream` opens but shows a black screen | **Missing multipart boundary**: no `STREAM_BOUNDARY` is sent between frames, so the browser cannot parse it | Send `STREAM_BOUNDARY` before each frame |
| curl to `/jpg` returns `HTTP:000`, but the browser shows the image | esp_http_server is **single-tasking**: while `/stream` occupies the httpd task, `/jpg` cannot get a slot; or the curl timeout is too short | Close `/stream` and test `/jpg` separately; verify in a browser instead of curl |
| Camera initializes successfully but is all black / no frames | Usually **hardware**: AVDD/DOVDD power, PWDN level, ribbon contact | First test a snapshot with `/jpg` in a browser (an image means the link works); check the camera 2.8V supply and the ribbon cable |
| Corruption on the bottom ~2/3 of the VGA image | **DVP data rate too high**: VGA RGB565 exceeds this board's DVP sampling timing margin (reproduced with 24/20/16MHz × single/double buffering); QVGA is fine | Use **QVGA 320×240** in the production configuration (good enough for FPV), or switch to a more stable XCLK / change the DVP hardware routing |

> Remark: the first four items in the table are already fixed in the bundled firmware — just flash the latest firmware, no manual code changes needed.

**Note**: esp_http_server is single-tasking, so `/stream` and `/jpg` cannot be accessed at the same time — while `/stream` is open, `/jpg` hangs indefinitely. Close the stream page before grabbing a single frame.

## Audio-Specific Troubleshooting

| Symptom | Root cause | Fix |
|---|---|---|
| Speaker **completely silent** + microphone level ≈ 0 (e.g. `0.0009`) | **MCLK not output**: the legacy I2S driver does not generate MCLK on the ESP32-S3, so the ES8311 internal DAC/ADC has no clock | Use **LEDC to generate a 6.15MHz MCLK on GPIO39** (`start_ledc_mclk()` in `audio_es8311.cpp`) |
| Tones **too quiet** (only audible with an ear against it) | Low digital amplitude + low ES8311 master volume | `play_tone` amplitude 12000→30000, `R_DAC32` 0x30→0xFF (~+29dB) |
| Only the startup "beep beep" after power-on, no other tones | **Normal behavior**: the ready/unlock tones are event-driven and require running the teleoperation | Startup tone = plays at power-on; ready tone = Agent communication established; unlock tone = control command received |

> Remark: the first two items are already fixed in the bundled firmware; the third is normal behavior and needs no action.

## Microphone, Speaker, and RGB Hardware Checks

- **Microphone level stays at 0**: check the `audio: ES8311 ready` log; confirm MCLK is output (GPIO39 should show ~1.65V, generated by LEDC); I2C bus 41/42 pull-ups (10K already on the board); blow at the microphone and see whether `/follower_audio/level` fluctuates.
- **Speaker silent**: confirm the NS4150B speaker is connected to the speaker connector; confirm GPIO39 MCLK is output (LEDC, `start_ledc_mclk()`); volume register `R_DAC32` (currently 0xFF); if the ES8311 fails to initialize, the log prints the failure reason.
- **RGB LED does not light**: the WS2812 data pin is GPIO18; check the firmware boot log for an RMT initialization error before `camera_stream` appears (generally will not happen).

## Network and micro-ROS Problems

- **Stuck at `Waiting for micro-ROS Agent...`**: check in order whether `AGENT_IP` is set to the Ubuntu PC's LAN IP, whether UDP 8888 is allowed, and whether the router/hotspot has client isolation enabled (it must be off). The NanoCam's antenna is the U.FL antenna on the module; if the RSSI is poor, first check the antenna and its placement, and it is recommended to run real distance tests at 5/10/20/30 m.
- **WiFi frequently drops**: check the antenna and distance; the RGB turning red indicates WiFi loss, and the firmware auto-reboots after a 10s timeout.
- **When nothing connects, verify the environment first**: the NanoCam and the Ubuntu PC must be on the same 2.4GHz LAN (a phone hotspot will do); if you changed networks, remember to update `AGENT_IP` and the WiFi configuration accordingly (see the "Configure WiFi" section of the wireless teleoperation tutorial).

<RelatedProducts slugs="so-arm101,esp32-s3-wifi-module" />
