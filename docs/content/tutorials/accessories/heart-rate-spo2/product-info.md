---
title: "Product Info"
description: "Product overview, detection principle, technical specifications, pin definitions and typical application scenarios for the MAX30102 heart rate & SpO2 sensor module."
---

# Product Info

## 1. Product Overview

The Gravity: MAX30102 Heart Rate & SpO2 Sensor Module features Maxim's original high-precision MAX30102 dedicated heart rate & SpO2 sensor chip and integrates a microcontroller with a built-in in-house heart rate & SpO2 algorithm, so no complex computation program needs to be written on the host device; it can directly output standardized heart rate and blood oxygen saturation readings.

The module collects raw physiological data based on photoplethysmography (PPG), and the onboard microcontroller automatically completes the entire process of signal filtering, data computation and value calibration, finally transmitting the measurement results through the two common communication interfaces, I2C and UART. This greatly reduces the hardware adaptation difficulty for developers and the resource usage of the host MCU, so even beginners can quickly complete project development. In addition, the module comes with a dedicated PC host application that can read data directly from a computer and visualize heart rate and SpO2 readings in real time, making debugging convenient and efficient.

## 2. Detection Principle

The module uses the **photoplethysmography (PPG)** method for non-invasive physiological measurement: human arteries regularly dilate and contract with each heartbeat, causing periodic fluctuations in blood volume within the vessels; changes in blood volume directly affect the light transmittance of fingertip tissue. By emitting light of specific wavelengths and collecting the reflected light signal, the module captures dynamic changes in light transmittance and, combined with the built-in algorithm, accurately converts them into real-time pulse rate and blood oxygen saturation values.

## 3. Usage Precautions

1. **Finger pressure affects data accuracy**: Uneven fingertip pressure on the sensor or continuously changing pressure interferes with the optical signal path and causes deviations in heart rate and SpO2 readings. During use, it is recommended to keep your finger steady and apply constant pressure.
1. **Placement notes**: This module measures only at the fingertip; the sensing probe has no front/back orientation, so there is no difficulty in placing it.
1. **Not a medical device statement**: This product is a consumer-grade electronic sensing module and is not a professional medical device; its readings are for daily health reference only and must not be used for clinical diagnosis, disease monitoring or medical auxiliary treatment.

- Just place the pad of your finger against the sensor and secure it with the included strap

![Illustration](../../../../public/images/tutorials/accessories/heart-rate-spo2/product-info/01.png)

## 4. Technical Specifications

- Supply voltage: 3.3-5V
- Operating current: <15mA
- Communication: I2C/UART
- I2C address: 0x57
- Serial baud rate: 9600
- Operating temperature range: -40℃~85℃
- Product dimensions: 25.5*32mm

**Pin definitions (silkscreen):**

| No. | Silkscreen | Function description |
|---|---|---|
| 1 | D/T | I2C data line/TX |
| 2 | C/T | I2C clock line/RX |
| 3 | GND | Power negative |
| 4 | VCC | Power positive |

## 5. Typical Application Scenarios

- Smart wearable device heart rate and SpO2 monitoring development projects
- DIY home simple heart rate and SpO2 monitors
- Long-term continuous monitoring systems for human vital signs
- Maker open-source hardware and university electronics training projects involving physiological measurement
