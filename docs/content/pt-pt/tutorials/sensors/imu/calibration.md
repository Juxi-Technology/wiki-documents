---
title: "Calibração IMU"
description: "Como calibrar o módulo IMU de alta precisão: calibração completa, do magnetómetro e da temperatura, por comunicação I2C ou porta série, com dicas."
keywords: [imu, calibração, magnetômetro, calibração de temperatura]
---

# Calibração IMU

> **[Comprar na Loja](https://www.juxitech.com/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


> Calibre seu módulo IMU antes do primeiro uso para obter a melhor precisão de atitude. Baseado no `imu_calibration_tool.py` oficial da `IMU_Library`.

## Tipos de Calibração

| Tipo | Descrição | Quando |
|------|-------------|------|
| **Calibração completa** (`imu`) | Acelerômetro + giroscópio + magnetômetro | Primeira instalação, após mudar a posição de montagem |
| **Magnetômetro** (`mag`) | Eliminar interferência magnética ambiente | Após se aproximar de motores / metal |
| **Temperatura** (`temp`) | Compensar a deriva térmica | Grandes variações de temperatura |

---

## Preparação

1. Clone o repositório oficial:

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module
```

2. Verifique a conexão do IMU ao seu host (serial ou I2C)

3. **Posição de calibração**: coloque o IMU nivelado e parado, longe de fontes magnéticas fortes (motores, ímãs, fixações metálicas)

---

## Comunicação Serial

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

## Comunicação I2C

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

> `--port`: número do barramento I2C para o modo I2C (ex.: 1 no Raspberry Pi/STM32); caminho do dispositivo para o modo serial (ex.: `/dev/ttyUSB0`, `/dev/imu-serial`).

---

## Dicas de Calibração

| Dica | Descrição |
|-----|-------------|
| **Magnetômetro** | Gire lentamente o IMU na horizontal (em forma de 8 ou círculos), cobrindo todas as orientações |
| **Parado** | O IMU deve ficar completamente imóvel durante a calibração completa |
| **Sem ímãs** | Mantenha-se longe de motores, transformadores, mesas metálicas |
| **Multi-eixo** | A calibração do magnetômetro deve cobrir a rotação nos três eixos |

---

## Perguntas Frequentes

**Q: A atitude ainda apresenta deriva após a calibração?**

**A:** Verifique se a calibração completa (`imu`) foi executada; confirme se o IMU está firmemente montado (vibração adiciona ruído); adicione calibração de temperatura para grandes variações térmicas.

**Q: A calibração do magnetômetro falha?**

**A:** Forte interferência magnética no ambiente; verifique a flag `--calibrate mag`; garanta rotação em todas as orientações durante a calibração.

**Q: Qual valor usar para `--port` no modo I2C?**

**A:** O número do barramento I2C do seu host. Padrão 1 no Raspberry Pi; verifique o mapeamento do I2C de hardware do STM32; confirme com `i2cdetect -l`.

---

## Links Relacionados

- [Visão Geral do Módulo IMU (informações do produto)](/pt-pt/tutorials/sensors/imu/product-info)
- [IMU ROS1](/pt-pt/tutorials/sensors/imu/ros-examples/ros1)
- [IMU ROS2](/pt-pt/tutorials/sensors/imu/ros-examples/ros2)
- [Repositório Oficial](https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module)

## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
