---
title: SO-ARM101 Wireless Teleoperation (ESP32-NanoCam Version)
description: "A wireless teleoperation solution for competition demos: the leader arm connects to an Ubuntu PC via LeRobot, and the follower arm is controlled by the ESP32-NanoCam module over micro-ROS WiFi — covering the complete workflow of wiring, power, flashing, calibration, and camera FPV."
---

# SO-ARM101 Wireless Teleoperation (ESP32-NanoCam Version)

> **[Buy in Store](https://www.juxitech.com/products/so-arm101-developers-kit)**

This tutorial covers the wireless teleoperation scenario of a competition-demo drone carrying an SO-ARM101 robotic arm: the leader arm connects to an Ubuntu PC via LeRobot, while the follower arm is controlled by our in-house [ESP32-S3 WiFi video module](/products/esp32-s3-wifi-module) (ESP32-NanoCam, ESP32-S3 N16R8), receiving commands over micro-ROS WiFi UDP, with an onboard camera FPV, microphone, speaker, and RGB status LED integrated. If you run into problems, see the [Troubleshooting Guide](./SO-ARM101-NanoCam-Troubleshooting.md).

## Introduction and System Architecture

```text
SO-ARM101 leader arm → USB servo driver board → Ubuntu 22.04 (LeRobot + ROS2 Humble + micro-ROS Agent)
                                            │  2.4 GHz Wi-Fi (same LAN)
                                            ▼
                              ESP32-NanoCam follower-arm controller (ESP32-S3)
                                            │  1 Mbps UART (relayed through the servo driver board UART pins)
                                            ▼
                              SO-ARM101 follower arm 6 × STS3215
```

- Leader-arm operator motion → LeRobot reads the leader arm → ROS2 topic `/joint_command` → the micro-ROS Agent sends it over UDP 8888 → ESP32-NanoCam receives it and drives the 6 servos;
- The follower arm's `/joint_states` feedback (20Hz) is sent back in the reverse direction, serving as closed loop and watchdog;
- The onboard camera publishes an MJPEG stream at `http://<IP>/stream` (FPV), which the PC side can convert into a ROS topic.

Roles: the leader arm connects to the Ubuntu PC; the follower arm is controlled by the ESP32-NanoCam, with the two linked wirelessly. Onboard features after the firmware powers up:

| Feature | Implementation | Description |
|---|---|---|
| micro-ROS teleoperation | `main.cpp` + `servo_bus.cpp` | `/joint_states` feedback at 20Hz, `/joint_command` reception, with complete built-in safety mechanisms |
| Camera FPV | `camera_stream.cpp` | `http://<IP>/stream` MJPEG stream (QVGA) |
| Microphone | `audio_es8311.cpp` | Ambient volume level → `/follower_audio/level` (Float32, 5Hz) |
| Speaker | `audio_es8311.cpp` | Startup/ready/unlock/error tones |
| RGB status LED | `rgb_status.cpp` | Boot red → WiFi orange → micro-ROS green → unlock blue; red when WiFi is lost |

## Hardware List

| Hardware | Qty | Description |
|---|---|---|
| SO-ARM101 leader arm | 1 | With 6×STS3215 servos |
| SO-ARM101 follower arm | 1 | With 6×STS3215 servos |
| ESP32-NanoCam module | 1 | ESP32-S3 N16R8, onboard camera/audio/RGB |
| USB servo driver board | 2 | Calibration + leader/follower bus relay (UART pins) |
| Ubuntu 22.04 PC | 1 | Runs LeRobot + ROS2 + Agent |
| 2.4GHz router or phone hotspot | 1 | Puts the leader-arm PC and the NanoCam on the same LAN |
| 12V 5A external power supply | 1 | **Follower-arm power** (USB cannot drive 6 servos) |
| 5V 6A external power supply | 1 | **Leader-arm power** (connected to the Ubuntu PC) |
| USB-C data cable | 2 | NanoCam power/debug + leader-arm driver board to PC |

> NanoCam onboard peripherals: camera GC2145 (DVP); audio ES8311 (I2S 24kHz, AP2718AT microphone + NS4150B speaker); RGB WS2812 @ GPIO18.

## Wiring

Between the ESP32-NanoCam and the follower arm, the connection is **relayed through the UART pins of the servo driver board**:

```text
Servo driver board UART:   RX ←── NanoCam TX (P2-8 / GPIO20)
                           TX ──→ NanoCam RX (P2-7 / GPIO19)
                          GND ──→ NanoCam GND
```

- **TX to RX, RX to TX (crossed)**, common GND, 1 Mbps baud rate;
- The NanoCam servo bus uses UART1, connected to the module's **P2-7 / P2-8** (the debug serial uses USB-C, CH340K → UART0; the two are completely independent and can be used at the same time);
- The servo bus shares a common ground with the servo power supply (the follower arm's 12V 5A supply).

### NanoCam Main Pins

| Peripheral | Pin |
|---|---|
| Servo bus (UART1) | TX=GPIO20 (P2-8 ESP_P), RX=GPIO19 (P2-7 ESP_N), module P2 header |
| Debug serial (UART0) | GPIO43/44 → onboard CH340K → USB-C (no native USB CDC) |
| Camera DVP (GC2145) | D0~D7=GPIO4/2/1/3/5/7/8/10, PCLK=6, VSYNC=13, HREF=11, XCLK=9 (24MHz), PWDN=12, RESET=14, SCCB SDA/SCL=41/42 |
| Audio ES8311 (I2S) | MCLK=39, BCLK=38, WS=47, DIN (ADC)=40, DOUT (DAC)=48; I2C SDA/SCL=41/42, address 0x30 |
| Microphone | AP2718AT analog MEMS (via ES8311 ADC) |
| Speaker | NS4150B Class-D amplifier (via ES8311 DAC), no PA enable pin on the board |
| RGB | WS2812 @ GPIO18 (1 LED, GRB, RMT-driven) |
| BOOT | GPIO0 |

> Pin definitions come from `docs/reference/nano_config.h` and the hardware schematic documentation.

## Power Supply

| Device | Power supply |
|---|---|
| ESP32-NanoCam | **USB data cable power** (the CH340K debug serial works at the same time) |
| Follower arm (6×STS3215) | **12V 5A** external power supply |
| Leader arm (connected to the Ubuntu PC) | **5V 6A** external power supply |

> ⚠️ USB cannot drive 6 servos — the follower arm must use a 12V 5A external supply; the ESP32 is fine powered from the USB data cable.

## Environment Requirements

### Build & Flash Side (Windows / Linux / macOS all work)

| Item | Requirement |
|---|---|
| OS | Windows 10/11 or Linux (macOS also works) |
| Python | 3.8+ (verify with `python --version`) |
| PlatformIO | Core 6.x (with the esp32s3 toolchain + Arduino framework) |
| Disk space | At least 3 GB free |
| Network | Access to GitHub / Espressif CDN (the first toolchain download is about 1-2 GB) |

### Runtime Side (the Ubuntu 22.04 PC that ultimately runs the teleoperation)

| Item | Requirement |
|---|---|
| OS | Ubuntu 22.04 (64-bit) |
| ROS 2 | Humble (Hawksbill) |
| LeRobot | With Feetech SO-101 support (`so101_leader` / `so101_follower`) |
| micro-ROS Agent | `snap run micro-ros-agent` or installed from source |
| Required commands | `nmcli`, `ip`, `flock` (bundled with NetworkManager, iproute2, util-linux) |
| Python environment | `lerobot_so101` virtual environment (conda/miniforge) |

> Debug serial port identification: the NanoCam's USB interface is a CH340K-to-UART0, so under Linux the device name is usually `/dev/ttyUSB0` (or `/dev/serial/by-id/...CH340*`), and PlatformIO detects it automatically (the board definition already includes the CH340 HWID 0x1A86:0x7523); the serial monitor baud rate is 115200. For a more complete LeRobot/Ubuntu environment installation, see the [SO-ARM101 Tutorial](./SO-ARM101-Tutorial.md).

## Installation Steps

### 1. Install PlatformIO (build & flash side)

**Option A: VSCode extension (recommended)**

1. Install [VSCode](https://code.visualstudio.com/);
2. Search for **PlatformIO IDE** in the extension marketplace and install it; it restarts automatically and downloads PlatformIO Core;
3. Verify with `pio --version` in the VSCode terminal.

**Option B: command-line installation**

```bash
pip install platformio
```

> On Windows, if the `pio` command is not found in Git Bash, use a PowerShell/CMD terminal instead, or add `C:\Users\<username>\.platformio\penv\Scripts` to PATH.

### 2. First Build (toolchain downloaded automatically)

Enter the firmware directory and compile once (without flashing):

```bash
cd firmware/nanocam_soarm
pio run
```

On the first run it downloads, in order:

1. The espressif32 platform (`espressif32@7.0.1`);
2. The **toolchain** `toolchain-xtensa-esp32s3` (about 100 MB, from the Espressif CDN);
3. The Arduino framework `framework-arduinoespressif32` (about 200 MB).

If the download is slow or gets stuck:

- PlatformIO's time-remaining estimate is inaccurate — it often appears stuck for a while and then suddenly jumps to done; give it 5 minutes and watch whether the percentage advances;
- Turn on a proxy/VPN (uses the system proxy);
- Download the toolchain manually: get `https://dl.espressif.com/dl/xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-win32.zip` in a browser (the Linux equivalent is `-linux-amd64.tar.gz`), unzip it, rename the directory to `toolchain-xtensa-esp32s3`, place it in `C:\Users\<username>\.platformio\packages\`, and re-run `pio run`;
- A Ctrl+C interruption midway does not damage the environment; re-running resumes the download.

### 3. Install the Ubuntu Runtime Environment

```bash
# 1. ROS 2 Humble (install per the official documentation)
#    https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debs.html
source /opt/ros/humble/setup.bash

# 2. LeRobot (with Feetech support)
conda create -n lerobot_so101 python=3.10 -y
conda activate lerobot_so101
pip install lerobot[feetech]

# 3. micro-ROS Agent
sudo snap install micro-ros-agent
snap run micro-ros-agent udp4 --port 8888   # test that it starts

# 4. PlatformIO (if you also want to build/flash on the Ubuntu side)
pip install platformio
```

## Configure WiFi

The PC and the NanoCam must be on the same LAN (2.4GHz Wi-Fi — a phone hotspot will do), and client isolation must be off on the router/hotspot. There are two ways to configure WiFi; choose one.

### Option 1: Compile-time configuration (default)

```bash
cd firmware/nanocam_soarm
cp src/wifi_config.example.h src/wifi_config.h
# edit wifi_config.h: WIFI_SSID / WIFI_PASS / AGENT_IP (Ubuntu PC LAN IP)
```

### Option 2: Serial command configuration (recommended, no re-flashing needed)

The firmware has built-in runtime configuration (stored in NVS); enter it at any time over the debug serial port (115200 baud):

| Command | Effect |
|---|---|
| `wifi_ssid:your_hotspot_name` | Set and save the WiFi name |
| `wifi_pass:your_password` | Set and save the WiFi password |
| `agent_ip:ubuntu_pc_ip` | Set and save the micro-ROS Agent IP |
| `wifi_show` | Show the currently effective configuration |
| `wifi_clear` | Clear the saved configuration and restore the compile-time defaults |

After any setting command is saved, the board **automatically reboots within 3 seconds** to apply it. Priority: serial-saved configuration > compile-time defaults. To switch hotspots or PCs, just plug in USB and type three commands — no code changes or re-flashing needed.

> The compile-time defaults (`wifi_config.h`) are always retained as a fallback for when serial configuration has not been used; `wifi_show` distinguishes "from NVS" and "compile-time default". The password is stored in NVS in plaintext, which is acceptable for LAN demo scenarios; `wifi_config.h` contains the WiFi password and is already excluded by `.gitignore` — do not commit it to the repository.

## Flashing and Startup

```bash
cd firmware/nanocam_soarm
pio run --target upload
```

**Entering download mode (critical)**: the NanoCam flashes through CH340K → UART0 serial (not USB CDC auto-download). Run upload directly first — if the board has an auto-download circuit it will succeed; if it reports that it cannot connect: **hold the BOOT button (GPIO0) → plug in USB (or press reset) → release BOOT**, then immediately re-run upload. On Windows, if the serial port is not detected automatically, add a line `upload_port = COM3` under `[env:nano_cam]` in `platformio.ini` (replace it with the CH340's actual COM number from Device Manager).

To view the serial log:

```bash
pio device monitor --baud 115200
```

After flashing you should see (in this order):

```text
audio: ES8311 ready @24000Hz      ← audio initialized successfully
Servo Ping mask: 0x3f             ← all 6 servos online
Servo calibration match: YES      ← calibration arrays match the servo EEPROM
IP: 192.168.x.x  RSSI: -xx        ← WiFi connected
Waiting for micro-ROS Agent...    ← waiting for the Agent (disappears after the next step starts)
```

> The servo bus may stay disconnected while flashing — flashing and servo operation do not interfere with each other (UART0 debug / UART1 servo are independent). The project ships with the ESP32-S3 (xtensa-lx7) micro-ROS static library, so no manual compilation is needed for everyday use.

## Calibration Notes

The project's `cali/` directory already contains leader/follower calibration files, and the calibration arrays in the firmware are already aligned with the follower calibration (i.e. `cali/follower_recal.json`). **Re-calibration is only needed when you replace the follower/leader arm hardware.**

```bash
# Follower arm
python -m lerobot.scripts.lerobot_calibrate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --robot.id=follower_recal --robot.calibration_dir="$PWD/cali"

# Leader arm
python -m lerobot.scripts.lerobot_calibrate \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM0 \
  --teleop.id=leader_recal --teleop.calibration_dir="$PWD/cali"
```

After re-calibrating the follower arm, you must open `firmware/nanocam_soarm/src/servo_bus.cpp` and replace the three arrays `kHomingOffsets` / `kRangeMin` / `kRangeMax` with the values from your own `cali/follower_recal.json` (order: shoulder_pan, shoulder_lift, elbow_flex, wrist_flex, wrist_roll, gripper), then recompile and flash.

## Running the Wireless Teleoperation

### Pre-flight Checks

```bash
# 1. Connect the Ubuntu PC to the same 2.4GHz WiFi as the NanoCam
# 2. The leader arm's USB servo driver board is connected and recognized
ls -l /dev/ttyACM*   # find the leader-arm serial port
# 3. The follower NanoCam is powered and online (confirm via serial or browser that the MJPEG stream is reachable)
```

### One-Click Startup

```bash
# Set the environment (or edit the defaults at the top of start_soarm_demo.sh directly)
export SOARM_WIFI_SSID="your 2.4G hotspot"
export SOARM_AGENT_IP="Ubuntu PC IP"
export SOARM_LEADER_PORT="/dev/ttyACM*"
export SOARM_PYTHON="$(command -v python)"   # lerobot_so101 environment

./start_soarm_demo.sh --check    # pre-flight check: network / leader arm / Agent / follower online
./start_soarm_demo.sh            # actually start the teleoperation; Ctrl+C to stop
```

The script does the following, in order:

1. Check the network (the SSID must match the setting), the leader-arm serial port, and that the calibration files exist;
2. Start the micro-ROS Agent (if not already running; logs go to `logs/micro_ros_agent.log`);
3. Wait for the follower's `/joint_states` to come online (15s timeout);
4. Leader-arm motion → follower follows, 30Hz command rate, **`--mapping-mode absolute`**.

**About absolute mapping**: leader and follower poses correspond one-to-one in their respective calibration frames, and the benefit is **no accumulated offset after a disconnect/reconnect** — on reconnect the follower smoothly aligns with the leader's current pose within 8 seconds (startup_blend), after which the leader returning to zero → the follower also returns to its own zero. Relative mapping was used before, but after a disconnect/reconnect the follower stayed at the disconnection position, creating a permanent offset against the leader (which had returned to zero), so it was changed to absolute.

**Automatic restart after Agent loss** (firmware after 2026-08-19): after you stop the teleoperation with Ctrl+C, the follower automatically reboots within about 10 seconds back to `Waiting for micro-ROS Agent...`, so you can re-run this script directly without manually resetting the follower (during the reconnect the follower returns to zero, i.e. it powers up again).

Once the link is established, the follower's serial prints `micro-ROS ready` (the RGB turns green and the speaker plays the ready tone), and `Waiting for micro-ROS Agent...` disappears.

### Manually Verify the Topics

```bash
ros2 topic echo /joint_states --once           # follower feedback
ros2 topic hz /joint_states                    # should be about 20 Hz
ros2 topic echo /follower_audio/level --once   # microphone level (rises when you speak)
```

## Camera FPV

Once powered and connected to the network, the firmware automatically starts the MJPEG streaming service (onboard GC2145, DVP interface, default HTTP port 80):

```text
http://<NANOCAM_IP>/         info page
http://<NANOCAM_IP>/jpg      single JPEG frame (snapshot)
http://<NANOCAM_IP>/stream   continuous MJPEG stream (FPV)
```

### Parameters and Tuning

- Resolution **QVGA 320×240** (production configuration), **RGB565 capture + `frame2jpg` software encoding** (the GC2145 has no hardware JPEG encoder — only the OV2640/OV5640 do), JPEG quality 12, double-buffered in **8MB Octal PSRAM**;
- **Why QVGA**: in testing, VGA (640×480) RGB565 had too high a data rate on this board's DVP — about the bottom 2/3 of the image was corrupted (reproduced with every XCLK 24/20/16MHz × single/double-buffer combination); QVGA is complete and smooth (a lower frame rate than hardware JPEG is normal);
- Streaming runs in a separate httpd task (the stack has been raised to 16KB to accommodate software encoding) and does not interfere with micro-ROS teleoperation or audio capture;
- Default HTTP port 80 (firmware `HTTPD_DEFAULT_CONFIG()`);
- To change the resolution/quality: edit `config.frame_size` / `kJpegQuality` in `firmware/nanocam_soarm/src/camera_stream.cpp`; adjust the image orientation with `set_vflip` / `set_hmirror` (same file);
- esp_http_server is single-tasking, so `/stream` and `/jpg` **cannot be accessed at the same time** (`/jpg` hangs while the stream is open);
- If camera initialization fails, the firmware prints one line and continues working normally; teleoperation is unaffected.

PC-side reception (published as ROS 2 topics, message type `sensor_msgs/CompressedImage`):

```bash
# Terminal 1: start the teleoperation as usual
./start_soarm_demo.sh

# Terminal 2: receive the video and publish the topic
source /opt/ros/humble/setup.bash
python3 tools/follower_camera.py --stream http://<NANOCAM_IP>/stream
# Optional: --topic /custom_topic  --max-fps 10

# Verify
ros2 topic hz /follower_camera/image_raw/compressed   # should be about 10~15 Hz
rviz2    # Add → By topic → Camera, select /follower_camera/image_raw/compressed
```

You can verify the link even without ROS installed: open `http://<NANOCAM_IP>/stream` in a browser, or run `curl -s http://<NANOCAM_IP>/jpg -o snap.jpg`.

## Audio (Microphone and Speaker)

**Microphone**: AP2718AT analog MEMS (via ES8311 ADC). The firmware reads the ambient volume level once every 200ms (RMS, normalized 0~1) and publishes it to `/follower_audio/level` (`std_msgs/Float32`, best-effort). You can implement voice activity detection or ambient monitoring yourself, or use it as a simple trigger for "capture when someone speaks".

```bash
ros2 topic echo /follower_audio/level
```

**Speaker**: ES8311 DAC → NS4150B Class-D amplifier (no PA enable pin on the board), with four built-in tones (see the next section); to customize the tones, modify the `play_tone()` calls in `audio_es8311.cpp`. The volume is in ES8311 register 0x32 (`R_DAC32`, set to the maximum 0xFF in the current firmware).

### Audio Parameters and Tuning

- Sample rate 24 kHz, 16-bit, stereo slots (consistent with the NanoCam factory firmware), MCLK = 256×FS = 6.144 MHz;
- **MCLK is generated by LEDC** (GPIO39, 80MHz÷13≈6.154MHz, a 0.16% error within tolerance): the legacy I2S driver does not output MCLK on the ESP32-S3, which causes a silent speaker + a microphone level stuck at 0; this has been fixed with LEDC in `start_ledc_mclk()` in `audio_es8311.cpp`;
- ES8311 control runs over I2C1 (the GPIO41/42 physical bus is shared with the camera SCCB; the camera only uses SCCB at startup, so there is no conflict at runtime); `Wire1.end()` at the end of `init()` releases the I2C for the camera;
- The microphone gain default matches the NanoCam factory value (register 0x16 = 0x24); to increase sensitivity, adjust the `R_ADC16` value in `audio_es8311.cpp`.

## RGB Status LED and Tones

### RGB Status Meanings

| Color | Status |
|---|---|
| Red | Booting / micro-ROS initialization failed / WiFi lost |
| Orange | WiFi connected, waiting for the micro-ROS Agent |
| Green | micro-ROS ready (teleoperation link up) |
| Blue | Servo control unlocked (ARMED) |
| Purple | Control command rejected (handshake/limit/step mismatch) |

### Speaker Tones

| Event | Tone |
|---|---|
| Power-on | Two short "beep beeps" (startup tone) |
| micro-ROS ready | Rising two-tone |
| Servo unlock | Rising two-tone |
| Initialization failure | One low tone |

> The tones are event-driven: the startup tone plays at power-on, the ready tone when Agent communication is established, and the unlock tone when a control command is received — so if you only power the board without running the teleoperation, you will only hear the startup tone.

## Safety Mechanisms

The firmware includes the following built-in safety mechanisms; no manual configuration is needed:

- Servo identity check and EEPROM calibration check;
- Current-pose handshake (0.05 rad);
- Soft limits; per-command step limit 0.25 rad;
- Feedback watchdog 0.5 s;
- Auto-reboot after a 10 s WiFi-loss timeout.

> Flight-demo note: after inverted mounting, re-confirm the joint directions, center of gravity, and power (BEC) scheme, and run EMI interference tests.

## Verification Status

### Test Results (Expected)

- All six follower servos recognized (`servo_mask=0x3f`);
- `/joint_states` published at about 20 Hz;
- The host bridge publishes commands at 30 Hz;
- Camera stream `http://<IP>/stream` smooth at QVGA;
- `/follower_audio/level` published at 5 Hz; the level clearly rises when you speak;
- RGB status LED steps through boot→connected→ready→unlocked;
- Still runs after unplugging the USB data cable (the ESP32 has independent power and the follower arm uses its external 12V supply).

### Development Status

**Verified on hardware (2026-08-19):**

- Audio `ES8311 ready @24000Hz` (MCLK output normal + speaker/microphone both normal; the missing MCLK + too-low volume were fixed);
- WiFi connection + micro-ROS communication (`/joint_states` stable at 20Hz, `/follower_audio/level` normal);
- GC2145 camera FPV: QVGA `/stream` complete and smooth (fixed the I2C conflict / software encoding / httpd stack / multipart boundary);
- Full teleoperation chain (leader-arm motion → follower follows);
- **absolute mapping + automatic restart after Agent loss**: leader/follower aligned with no offset after a disconnect/reconnect; after Ctrl+C the follower automatically restarts and waits for reconnection.

**Still to be verified:**

- Flight scenario: inverted-mount orientation, center of gravity, power (BEC), EMI interference.

## Project Structure and Advanced Firmware

The follower-arm controller in this project evolved from an ESP32-S3 to our in-house ESP32-NanoCam module (ESP32-S3 N16R8, onboard DVP camera / ES8311 audio / WS2812 RGB).

### Directory Structure

```text
firmware/nanocam_soarm/   ESP32-NanoCam follower-arm firmware (PlatformIO)
  ├─ boards/nano_cam.json in-house board definition (16MB Flash / 8MB Octal PSRAM)
  ├─ src/                 firmware source (micro-ROS teleop + camera + audio + RGB)
  ├─ lib/microros/        micro-ROS static library (xtensa-lx7)
  └─ lib/scservo/         SCServo servo library (vendored, no network dependency)
tools/                    PC-side scripts (wireless_teleoperate.py teleop bridge, follower_camera.py FPV receiver)
start_soarm_demo.sh       one-click startup script (network/Agent/calibration pre-check + teleoperation)
cali/                     leader/follower calibration files
docs/                     project progress and experiment records + hardware reference (docs/reference/)
```

### Differences from the Earlier Version

| Item | This project (ESP32-NanoCam) |
|---|---|
| Board definition | Custom `boards/nano_cam.json` (16MB Flash / 8MB Octal PSRAM, qio_opi) |
| Servo bus | Serial1/UART1, TX=20/RX=19 (UART0 is taken by the CH340K debug) |
| Debug serial | UART0 (43/44) → CH340K → USB-C |
| Camera | NanoCam DVP GC2145 (GPIO1~14 + 41/42), XCLK 24MHz |
| Audio | ES8311 + AP2718AT microphone + NS4150B speaker (new) |
| RGB | WS2812 status LED (new) |
| micro-ROS library | xtensa-lx7 — the NanoCam is also an ESP32-S3, so it is interchangeable with the S3 build |
| PC-side scripts | Unchanged (tools/, start_soarm_demo.sh are hardware-independent) |

### micro-ROS Header Paths and build_flags

The micro-ROS header tree is flat in structure (`include/<pkg>/<header>.h`); keep only the root path `-Ilib/microros/include`. Do **not** add per-package `-Ilib/microros/include/<pkg>/` paths — that resolves `<string.h>` to `rosidl_runtime_c/string.h` and the WiFi library's `<Client.h>` to `rcl/Client.h`, causing compilation failures.

### Rebuilding libmicroros.a (ESP32-S3 / xtensa-lx7)

> This project's `firmware/nanocam_soarm/lib/microros/` already ships the ESP32-S3 build of the static library (the NanoCam is an ESP32-S3, so the library is interchangeable). **Skip this section for normal use.** You only need to rebuild when you want to customize the micro-ROS configuration (message types, QoS, memory pool, etc.) — everyday development does not require recompiling `libmicroros.a`.

**Option A: official Docker builder (recommended, can run on any machine)**

The official micro-ROS `micro_ros_arduino` library's generation script includes an **esp32s3 target**:

```bash
git clone -b humble https://github.com/micro-ROS/micro_ros_arduino.git
cd micro_ros_arduino
docker pull microros/micro_ros_static_library_builder:humble
docker run -it --rm -v $(pwd):/project \
  --env MICROROS_LIBRARY_FOLDER=extras \
  microros/micro_ros_static_library_builder:humble -p esp32s3
```

The output is at `src/esp32s3/libmicroros.a`, with headers in the per-package directories under `src/`:

```bash
cp src/esp32s3/libmicroros.a <project>/firmware/nanocam_soarm/lib/microros/
# replace all headers (keeping the three custom files in that directory:
# default_transport.cpp / wifi_transport.cpp / micro_ros_arduino.h)
rsync -a src/* <project>/firmware/nanocam_soarm/lib/microros/include/ \
  --exclude esp32s3 --exclude '*.cpp' --exclude micro_ros_arduino.h
```

**About the toolchain**: the official script's esp32s3 section compiles with the `xtensa-esp32-elf` (LX6) toolchain by default; for ordinary C code LX6/LX7 are instruction-set compatible and the result runs. The `libmicroros.a` shipped with this project was compiled with the **genuine LX7 toolchain** (`xtensa-esp32s3-elf` gcc 8.4.0, the same version as PlatformIO's bundled one). To do the same: download `xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-linux-amd64.tar.gz` (Espressif crosstool-NG releases), unzip it, change the `TOOLCHAIN_PREFIX` in the esp32s3 section of `library_generation.sh` to `/uros_ws/xtensa-esp32s3-elf/bin/xtensa-esp32s3-elf-`, then mount it into the container and re-run:

```bash
docker run --platform linux/amd64 -it --rm \
  -v $(pwd):/project \
  -v <extracted_dir>/xtensa-esp32s3-elf:/uros_ws/xtensa-esp32s3-elf \
  --env MICROROS_LIBRARY_FOLDER=extras \
  microros/micro_ros_static_library_builder:humble -p esp32s3
```

> Note: on Apple Silicon you must add `--platform linux/amd64` (the esp32 toolchain inside the image is an x86_64 binary and cannot execute inside an arm64 container).

**Option B: Ubuntu 22.04 + ROS 2 Humble + PlatformIO toolchain**

1. Make sure PlatformIO has already downloaded the S3 toolchain (just run `pio run` once in the firmware directory):

   ```bash
   ls ~/.platformio/packages/toolchain-xtensa-esp32s3/bin/xtensa-esp32s3-elf-gcc
   ls ~/.platformio/packages/framework-arduinoespressif32/tools/sdk/esp32s3
   ```

2. Fetch the micro-ROS sources with micro_ros_setup (matching the `/tmp/firmware/mcu_ws` layout of `build_microros.sh`):

   ```bash
   mkdir -p /tmp/firmware && cd /tmp/firmware
   git clone -b humble https://github.com/micro-ROS/micro_ros_setup.git src/micro_ros_setup
   # after installing the micro_ros_setup dependencies:
   source /opt/ros/humble/setup.bash
   colcon build && source install/local_setup.bash
   ros2 run micro_ros_setup create_firmware_ws.sh generate_lib
   ```

3. Run this project's S3 build script:

   ```bash
   cd <project>/firmware/nanocam_soarm
   chmod +x build_microros_s3.sh
   ./build_microros_s3.sh
   ```

   The script has already switched riscv32 → xtensa-esp32s3, `-march=rv32imc` → `-mlongcalls`, and the `esp32c3` SDK → `esp32s3` SDK. Copy the output into the project as prompted at the end of the script.

### References

- NanoCam hardware reference documents (schematic/datasheet/pin definitions/ES8311 driver): the repository's `docs/reference/`
- [micro-ROS](https://micro.ros.org/) / [micro_ros_arduino](https://github.com/micro-ROS/micro_ros_arduino)
- [LeRobot](https://github.com/huggingface/lerobot)

<RelatedProducts slugs="so-arm101,esp32-s3-wifi-module" />
