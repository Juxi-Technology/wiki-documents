---
title: Product Info
---

# Product Info

> **[Buy in Store](https://www.juxitech.com/products/2-dof-servo-pan-tilt-unit)**

A 2-DOF camera gimbal control project with automatic color, face, and QR code tracking.

---

## 📋 Features

- 🎮 Manual gimbal control with the keyboard
- 🎯 Automatic tracking of colored objects
- 👤 Automatic face tracking
- 📱 Automatic QR code tracking
- 🔒 Target lock mechanism
- 🚀 Fast startup (using the DSHOW backend)

---

## 🛠 Hardware Configuration

- **Servo model**: SCS009
- **Servo assignment**:
  - Servo #1: pan (left/right) control
  - Servo #2: tilt (up/down) control
- **Communication**: serial bus driver board
- **Driver board chip**: CH343
- **Baud rate**: 1Mbps by default

### Servo Parameters


|Parameter|Servo #1 (pan)|Servo #2 (tilt)|
|---|---|---|
|Range|220-802|220-511|
|Center position|511|511|
|Notes|220=left, 802=right|220=up, 511=center|


---

## 📁 Project Structure

```python
2-DOF-Camera-Gimbal/
├── docs/            # Documentation and tutorials
│   └── tutorials/  # Tutorial files
├── examples/        # Example programs
│   ├── auto_tracking_demo.py  # Full tracking demo
│   ├── basic_usage.py        # Basic usage example
│   ├── keyboard_control.py    # Keyboard control example
│   └── diagnostic.py         # Diagnostic tool
├── src/            # Source code
│   ├── detectors/  # Target detectors
│   │   ├── color_detector.py
│   │   ├── face_detector.py
│   │   └── qr_detector.py
│   ├── trackers/  # Tracking controller
│   │   └── tracking_controller.py
│   └── sc_servo.py  # Servo communication library
├── .gitignore
├── requirements.txt
└── README.md
```

---

## 🚀 Quick Start

### Install Dependencies

```python
pip install -r requirements.txt
```

### Find Available Devices

**Find an available camera**

```python
python examples/list_cameras.py
```

**Find an available serial port**

```python
python examples/list_ports.py
```

### Run the Demo

Configure it with command-line arguments:

```python
python examples/auto_tracking_demo.py --camera 0 --port COM3 --color red
```

**Parameter description**
- `--camera` or `-c`: camera index (default 0)
- `--port` or `-p`: serial port device (default COM3)
- `--color` or `-C`: default color (default red)

---

## 🎮 Usage Instructions

### Keyboard Shortcuts


|Key|Function|
|---|---|
|1|Switch to face tracking mode|
|2|Switch to color tracking mode|
|C|Connect the gimbal|
|R|Return the gimbal to center|
|T|Lock / start tracking the target|
|S|Stop tracking|
|X|Color mode: red|
|Y|Color mode: green|
|Z|Color mode: blue|
|Q|Quit the program|


### Automatic Tracking Workflow

1. Press `C` to connect the gimbal
2. Select a mode (press `1` or `2`)
3. Move the target object to the center of the frame
4. Press `T` to lock the target
5. Move the target; the gimbal follows automatically

---

## 📚 Documentation and Tutorials

For detailed tutorials, see the docs/tutorials/ directory:
- 01-快速开始指南.md - Get started quickly
- 02-硬件与环境准备.md - Hardware checklist and environment setup
- 03-基础使用.md - Keyboard control and basic usage
- 04-高级功能与追踪.md - Advanced features and tracking in detail
- 05-故障排除.md - Common problems and solutions

---

## 🔧 Technical Notes

### Tracking Control Parameters

These can be adjusted in `src/trackers/tracking_controller.py`:

|Parameter|Default|Description|
|---|---|---|
|kp_pan|0.08|Proportional gain for pan tracking|
|kp_tilt|0.12|Proportional gain for tilt tracking|
|dead_zone|30|Dead zone (pixels); no movement within this range|
|min_move_interval|0.15|Minimum move interval (seconds)|


### Target Lock Mechanism

After locking, the system selects the target based on the following criteria:
- Closest to the lock point (weight 70%)
- Most similar in size to the locked target (weight 30%)

---

## 📖 Servo Specifications

- **Model**: SCS009
- **Operating voltage**: 4V-7.4V (6V typical)
- **Stall torque**: 2.3kg·cm at 6V
- **Protocol**: half-duplex asynchronous serial (TTL)
