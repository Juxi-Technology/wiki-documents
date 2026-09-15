---
title: "Product Information"
description: "Product information for the AI Voice Interaction Module: CI1302 chip specs, 110+ preset commands, working principle, and hardware interfaces."
---

# Product Information

## 1. Voice Interaction Module Introduction

CI1302 is a new-generation high-performance neural-network intelligent voice chip developed by Chipintelli, integrating Chipintelli's self-developed brain neural network processor BNPU V3 and a CPU core. Its system clock can reach 220MHz, it has up to 640KByte of built-in SRAM, integrates a PMU power management unit and an RC oscillator, and provides a dual-channel high-performance low-power Audio Codec plus peripheral control interfaces such as UART, IIC, IIS, PWM, GPIO and PDM. With only a few peripheral components such as resistors and capacitors, the chip can implement hardware solutions for all kinds of intelligent voice products, offering extremely high cost-effectiveness.

It adopts third-generation hardware BNPU technology and supports neural networks such as DNN\\TDNN\\RNN\\CNN as well as parallel vector operations, enabling functions such as speech recognition, voiceprint recognition, command word self-learning, voice detection and deep-learning noise reduction. The chip solution also supports many global languages including Chinese, English and Japanese, and can be widely applied in product fields such as home appliances, lighting, toys, wearable devices, industry and automobiles, enabling voice interaction and control as well as various intelligent voice solution applications.

The CI1302 chip has a brain neural network processor core (BNPU), supports offline NN accelerated computation and hardware acceleration for voice signal processing, has a CPU clock of up to 220MHz, can perform offline far-field speech recognition, has 2MB of built-in FLASH storage, and can support 300 command words.

## 2. Product Features

- Preset with 110+ voice commands, supporting custom Chinese and English command words.

Users can modify the command words through the web page we provide, generate a new firmware file, and write the firmware into the module using the PC software; the module can then recognize the new commands. With 2M of built-in storage, up to about 120 command words can be written.

- Built-in high-fidelity speaker and high-performance microphone.

It integrates advanced algorithms and circuit-level noise reduction technology, can effectively filter ambient background noise, and achieves a recognition rate of up to 99% within a range of 5 meters, thereby enabling natural conversation and echo cancellation. It provides clear audio output and accurately restores voice details.

- Onboard coprocessor and IIC/serial port/Type-C interfaces.

It integrates an STC8H chip, which can automatically convert voice data into serial port or IIC data format, simplifying the communication process with external host controller devices. Various connection cables are provided free of charge, allowing users to connect it to MCU development boards and embedded host controller devices to achieve communication and create their own DIY projects.

- Usage tutorials based on various development boards are provided

Development board information is provided, such as STM32, ESP32, MSPM0, Raspberry Pi, the Jetson series of development boards, RDK, etc. SDK files for ROS1 and ROS2 systems are also provided.

## 3. Working Principle

The module uses command-mode wake-up: the user must say the configured wake word to activate the voice interaction module first, and after activation speech recognition can be performed. The default wake keyword in the factory firmware is “你好，小犀”. If no speech is recognized after 15 seconds, the module enters sleep mode and must be woken up again before the next use.

After the CI1302 chip recognizes the corresponding voice entry, it sends it out through the serial port or IIC interface and provides playback feedback; the IIC chip stores the received voice command and sends it out through the IIC slave protocol.

The module supports wake word modification, command word modification and custom entries; you can learn how to do this in the tutorials "[Modify the Wake Word and Command Words](https://juxitech.feishu.cn/wiki/Po6bw8OtLiDNonklg7ZcBbGknyc)" and "[Custom Protocol Entry Creation](https://juxitech.feishu.cn/wiki/CIHLwo8qNiVBtKkhuTtcZIeNnAb)".

## 4. Precautions

1、Power with a 5V supply; exceeding 5V will damage the module

2、The usage environment should be quiet; a noisy environment will affect the recognition performance

3、When speaking an entry, the voice should be loud and the speaking rate should not be too fast; it is recommended to stay within 5 meters of the module

## 5. Hardware Interface Description

![Image 1](../../../../public/images/tutorials/accessories/ai-voice-module/Product-Info/1.png)

<RelatedProducts slugs="ai-voice-module" />
