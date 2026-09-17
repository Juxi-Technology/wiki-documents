---
title: "IMU Calibration"
description: "Juxi Technology high-precision IMU module calibration — full, magnetometer, and temperature calibration over serial & I2C"
keywords: [imu, calibration, magnetometer, temperature calibration]
---

# IMU Calibration

> **[Buy in Store](https://www.juxitech.com/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


> Calibrate your IMU module before first use for the best attitude accuracy. Based on the official `imu_calibration_tool.py` from `IMU_Library`.

## Calibration Types

| Type | Description | When |
|------|-------------|------|
| **Full calibration** (`imu`) | Accelerometer + gyroscope + magnetometer | First install, after changing mounting position |
| **Magnetometer** (`mag`) | Eliminate ambient magnetic interference | After moving near motors / metal |
| **Temperature** (`temp`) | Compensate thermal drift | Large temperature variations |

---

## Preparation

1. Clone the official repository:

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module
```

2. Verify IMU connection to your host (serial or I2C)

3. **Calibration pose**: place IMU flat and stationary, away from strong magnetic sources (motors, magnets, metal fixtures)

---

## Serial Communication

```bash
cd ~/IMU_Library/IMU_Library

# Run all calibrations (full, magnetometer, temperature)
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial

# Full calibration only
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate imu

# Magnetometer only
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate mag

# Temperature only
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate temp
```

## I2C Communication

```bash
# Run all calibrations
python3 imu_calibration_tool.py --mode i2c --port 1

# Full calibration only
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate imu

# Magnetometer only
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate mag

# Temperature only
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate temp
```

> `--port`: I2C bus number for I2C mode (e.g., 1 on Raspberry Pi/STM32); device path for serial mode (e.g., `/dev/ttyUSB0`, `/dev/imu-serial`).

---

## Calibration Tips

| Tip | Description |
|-----|-------------|
| **Magnetometer** | Slowly rotate IMU horizontally (figure-8 or circles), covering all orientations |
| **Stationary** | IMU must be completely still during full calibration |
| **No magnets** | Keep away from motors, transformers, metal tables |
| **Multi-axis** | Magnetometer calibration must cover rotation on all three axes |

---

## FAQ

**Q: Attitude still drifts after calibration?**

**A:** Verify full calibration (`imu`) was executed; check the IMU is firmly mounted (vibration adds noise); add temperature calibration for large thermal changes.

**Q: Magnetometer calibration fails?**

**A:** Strong magnetic interference in the environment; verify the `--calibrate mag` flag; ensure full-orientation rotation during calibration.

**Q: What value for `--port` in I2C mode?**

**A:** Your host's I2C bus number. Default 1 on Raspberry Pi; check STM32's hardware I2C mapping; verify with `i2cdetect -l`.

---

## Related Links

- [IMU Module Overview (product info)](/tutorials/sensors/imu/product-info)
- [IMU ROS1](/tutorials/sensors/imu/ros-examples/ros1)
- [IMU ROS2](/tutorials/sensors/imu/ros-examples/ros2)
- [Official Repository](https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module)

## Support

- 📧 Email: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
