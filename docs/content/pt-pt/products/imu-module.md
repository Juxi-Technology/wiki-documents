---
title: Módulo Inercial IMU de Alta Precisão
category: sensor
description: "Sensor de atitude IMU de alta precisão com cálculo em tempo real até 100Hz, versões de 6, 9 e 10 eixos e comunicação IIC ou porta série, com integração ROS."
keywords: [imu, inercial, sensor de atitude, ahrs, ros]
---

# Módulo Inercial IMU de Alta Precisão

> **[Comprar na loja](https://www.juxitech.com/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**

## Visão Geral

Sensor de atitude IMU de alta precisão com processador 32-bit de 72MHz para cálculo de atitude em tempo real e compensação dinâmica, com taxa de dados de até **100Hz**. Suporta comunicação dupla IIC e serial com hosts MCU e Linux, integrando-se perfeitamente ao ROS.

**Seleção de versão**:

| Versão | Giroscópio | Acelerômetro | Magnetômetro | Barômetro | AHRS |
|---------|------|-------|-----|------|------|
| 6 eixos | ✅ | ✅ | - | - | - |
| 9 eixos | ✅ | ✅ | ✅ | - | ✅ |
| 10 eixos | ✅ | ✅ | ✅ | ✅ | ✅ |

## Especificações

| Categoria | Especificação |
|----------|------|
| MCU | 32-bit 72MHz |
| Taxa de dados | Padrão 25Hz, 10-100Hz |
| Interface | IIC (100KHz) / UART (115200bps) |
| Saída | Acel/giro de 3 eixos/euler/mag/pressão/temperatura/quatérnio |
| Alimentação | 5V ou 3,3V, 11mA |
| Tamanho/Peso | 27,4×22,6×12mm, 3,8g |
| Temperatura de operação | -40°C ~ +85°C (armazenamento -40°C ~ +100°C) |
| Resistência a choques | 20kg (placa nua) |
| ROS | ROS1 / ROS2 |

## Início Rápido

```bash
ros2 launch icm42670p imu_launch.py
ros2 topic echo /imu/data

# Calibrate before first use
python3 imu_calibration_tool.py --mode serial --port /dev/ttyUSB0
```

## Tutoriais

- [Visão Geral do Módulo IMU](/pt-pt/tutorials/sensors/imu/product-info)
- [Guia de Calibração IMU](/pt-pt/tutorials/sensors/imu/calibration)
- [IMU ROS2](/pt-pt/tutorials/sensors/imu/ros-examples/ros2)
- [Exemplos Multi-Placa IMU](/pt-pt/tutorials/sensors/imu/multi-board-examples/overview)

## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
