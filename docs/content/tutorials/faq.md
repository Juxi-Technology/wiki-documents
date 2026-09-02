---
title: FAQ
description: Juxi Technology product FAQ — common issues for robot arms, sensors, and accessories
keywords: [faq, troubleshooting, common issues]
---

# FAQ

Frequently asked questions across Juxi Technology products, organized by category.

---

## Robot Arms · SO-ARM101

**Q: Robot arm port not detected?**

**A:** Run `lerobot-find-port` to find the port. Confirm USB connections — leader/follower arms on their respective ports. On Linux, grant serial permissions: `sudo chmod 666 /dev/ttyACM*`.

**Q: Getting `Could not connect on port "/dev/ttyACM0"`?**

**A:** Verify `/dev/ttyACM*` exists and permissions are granted, then retry.

**Q: `Magnitude 30841 exceeds 2047` during calibration?**

**A:** Power-cycle the robot arm and try calibrating again.

**Q: Servo error `ConnectionError: Failed to sync read 'Present_Position' on ids=[1,...,6]`?**

**A:** Check that the arm for that port is powered and the bus servos are connected properly.

**Q: `Motor 'gripper' was not found`?**

**A:** Check servo communication cables and supply voltage.

**Q: GPU unavailable with PyTorch?**

**A:** See [PyTorch Compatibility Issues on Jetson Orin](/tutorials/learning-resources/jetson-orin-pytorch-compatibility).

---

## Sensors · IMU Module

**Q: IMU data drifts badly?**

**A:** Run [full calibration](/tutorials/sensors/imu/calibration) first; confirm the module is firmly mounted; add temperature calibration for large thermal changes.

**Q: Magnetometer readings off?**

**A:** Run magnetometer calibration — slowly rotate through all orientations during the process, away from motors and magnets.

**Q: No data in ROS topics?**

**A:** Check serial permissions (`sudo chmod 666 /dev/ttyUSB*`) and port parameters in your launch file.

---

## Accessories · KWS Speech Recognition

**Q: Voice module not responding?**

**A:** Confirm factory firmware is flashed. Unflashed chips need burning first — see [Firmware Download & Burn](/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words).

**Q: No data from serial communication?**

**A:** Verify baud rate matches the tutorial and wiring is correct (RX/TX crossed).

---

## Accessories · Heart Rate & SpO2

**Q: Initialization fails (init fail)?**

**A:** Check wiring: I2C address default 0x57; UART baud 9600.

**Q: Unstable readings?**

**A:** Ensure good sensor-skin contact; keep the finger still.

---

## Accessories · USB / CSI Cameras

**Q: Camera not detected?**

**A:** Check USB cable and ports; run `ls /dev/video*` and `v4l2-ctl --list-devices`.

**Q: CSI camera not recognized?**

**A:** Check the ribbon cable orientation (metal contacts facing the board), connect only **while powered off**; verify JetPack ≥ 5.0.

**Q: GStreamer pipeline error?**

**A:** Confirm JetPack ≥ 5.0; check `apt list --installed | grep nvarguscamerasrc`.

---

## Accessories · Others

**Q: 4K HDMI capture shows black screen?**

**A:** Verify the HDMI interface type (HDMI/Micro HDMI/DP adapter) and use the right converter.

**Q: OLED screen not lighting up?**

**A:** Check I2C wiring (SCL/SDA); pin shorts can damage the host board.

**Q: USB sound card not detected?**

**A:** Plug-and-play device; verify USB power; switch the default audio output device.

**Q: 2-DOF gimbal servos not responding?**

**A:** Check servo power supply (SCS servos need external 6-8.4V).

---

## General

**Q: Feishu links in tutorials won't open?**
Feishu docs are internal/collaborator-only. Prefer this wiki, or contact support@juxitech.com.

**Q: Which platforms are supported?**
PC (Linux/Windows), Jetson, Raspberry Pi — see the "System Requirements" in each tutorial.

**Q: How to get support?**
- 📧 support@juxitech.com
- 💬 [GitHub Issues](https://github.com/Juxi-Technology/wiki-documents/issues)

---

## Related Links

- [Robot Arm Selection Guide](/tutorials/robot-arms/select-guide)
- [Download Center](/downloads/)
- [Success Stories](/cases/)
