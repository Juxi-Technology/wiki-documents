---
title: Hardware and Environment Setup
---

# Hardware and Environment Setup

> **[Buy in Store](https://www.juxitech.com/products/2-dof-servo-pan-tilt-unit)**

This chapter describes the complete process of hardware assembly, connection, and environment setup.

---

## Hardware Checklist

Before you start using the product, make sure you have all of the following components:

|Component|Model/Specification|Quantity|
|---|---|---|
|Servo|SCS009|2|
|Gimbal bracket|2-DOF gimbal frame|1|
|Servo driver board|CH343 chip driver board|1|
|USB camera|Resolution of at least 640x480|1|
|Servo power supply|Voltage range 4V-7.4V, 6V recommended|1|
|Serial data cable|Connects the driver board to the computer|1|


---

## Servo Parameters


|Parameter|Servo #1 (pan)|Servo #2 (tilt)|
|---|---|---|
|Position range|220-802|220-511|
|Center position|511|511|
|Minimum|220 corresponds to the leftmost position|220 corresponds to the topmost position|
|Maximum|802 corresponds to the rightmost position|511 corresponds to the center position|


---

## Hardware Connection

### Step 1: Install the Servos and Gimbal Bracket

1. Install servo #1 (for pan) at the designated position on the gimbal's bottom bracket, and tighten the screws to secure it
2. Install servo #2 (for tilt) on the gimbal's upper bracket, and secure it in the same way
3. Install the camera mounting structure as instructed

### Step 2: Connect the Servos to the Driver Board

1. Connect the data cables of both servos to the servo ports on the driver board
2. Pay attention to the wiring order of the servo cables; the colors are usually red (power), black (ground), and white/yellow (signal)
3. Make sure each servo is connected with the correct ID: servo ID 1 for pan, servo ID 2 for tilt

### Step 3: Connect Power and the Serial Port

1. Connect the servo power supply to the power port on the driver board
2. Use the serial data cable to connect the driver board to a USB port on the computer
3. Connect the camera to the computer

---

## System and Environment Requirements

### Operating System Support

- Windows 10/11
- Linux distributions (e.g. Ubuntu 20.04 or later)

### Python Version

Python 3.8 or later

---

## Driver and Dependency Installation

### Install the Serial Driver

#### Windows

1. Visit the CH343 chip vendor's official website and download the driver installer for your Windows version
CH343 driver installation (install as administrator)
https://www.wch.cn/downloads/CH343SER_EXE.html

>
> If it is recognized in Device Manager as an unknown device "usb single serial" or "usb serial", right-click to uninstall it first, then install the driver!

1. Run the installer and follow the prompts to complete the driver installation
2. Connect the servo driver board to the computer; the serial port device should appear in Device Manager

#### Linux

Most Linux distributions include the CH343 serial driver out of the box, so no extra installation is needed. If you run into problems, try:
1. Check whether the kernel has loaded the driver: `lsmod | grep ch343`
2. If it is not loaded, try unplugging and replugging the device or rebooting

### Install Python Dependencies

Run in the project root directory:

```python
pip install -r requirements.txt
```

The project's main dependencies include:
- opencv-python: image capture and processing
- numpy: numerical computing library
- pyserial: serial communication library

---

## Verifying the Hardware Connection

Before starting the main program, you can use the tools to verify the hardware connection.

### Finding an Available Camera

Run the following command to list the available cameras:

```python
python examples/list_cameras.py
```

The program detects and lists all available cameras; note the index of the camera you need.

### Finding an Available Serial Port

Run the following command to list the available serial ports:

```python
python examples/list_ports.py
```

Note the name of the serial port device you are using.

### Hardware Diagnostics

If you need a full check of the entire hardware, run the diagnostic tool:

```python
python examples/diagnostic.py --camera 0 --port COM3
```

The diagnostic program tests the camera, serial port, and gimbal in sequence.

---

## Safety Notes

During use, pay attention to the following safety points:
1. The servo power supply must be within the specified range (4V-7.4V) to prevent damage to the servos
2. Avoid running the servos at their extreme positions for extended periods to prolong their service life
3. Before powering off, it is recommended to return the gimbal to center to reduce the load on the next startup
