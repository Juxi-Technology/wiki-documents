---
title: Tutorial de Uso do Módulo IMU
description: "Sensor de atitude IMU de alta precisão integrado, processador de 32 bits de alto desempenho de 72MHz, capaz de realizar cálculo de atitude em tempo real e compensação dinâmica"
---

# Tutorial de Uso do Módulo IMU

> **[Comprar na Loja](https://www.juxitech.com/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


# Introdução ao Módulo IMU

Sensor de atitude IMU de alta precisão integrado com **processador de 32 bits de alto desempenho de 72MHz**, capaz de realizar cálculo de atitude em tempo real e compensação dinâmica, com frequência de atualização de dados de até 100Hz, combinando as vantagens de resposta rápida e saída estável. Suporta os modos de comunicação IIC e serial, é compatível com microcontroladores e controladores principais Linux, e pode ser integrado perfeitamente ao sistema ROS, sendo amplamente aplicável a cenários de alto desempenho, como controle de movimento de robôs, estabilização de atitude de drones e navegação e posicionamento inteligentes.

# 1. Visão Geral das Versões

| Comparação de Desempenho |                                                     |                                                              |                                                              |
| ------------------------ | --------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
|                          | 6 eixos                                             | 9 eixos                                                       | 10 eixos                                                      |
| Processador de 32 bits de alto desempenho | √                                      | √                                                            | √                                                            |
| Giroscópio de 3 eixos   | √                                                    | √                                                            | √                                                            |
| Acelerômetro de 3 eixos  | √                                                    | √                                                            | √                                                            |
| Magnetômetro de 3 eixos  | -                                                    | √                                                            | √                                                            |
| Barômetro               | -                                                    | -                                                            | √                                                            |
| Algoritmo de fusão de dados de atitude AHRS | -                                        | √                                                            | √                                                            |
| Algoritmo de filtro de Mahony | √                                                   | √                                                            | √                                                            |
| Interface de comunicação | Type-C (requer placa base) / conector de pinos IIC |                                                              |                                                              |
| Método de comunicação    | IIC / serial                                        |                                                              |                                                              |
| Posicionamento / Cenários de aplicação | Projetado para aplicações sensíveis a custo, atendendo ao padrão de aplicações de alta resposta dinâmica | Construído sobre a arquitetura de hardware de 6 eixos com um módulo magnetômetro de 3 eixos integrado, ajustado com o algoritmo de fusão de dados de atitude AHRS, aumentando consideravelmente a estabilidade e a precisão de medição da saída de dados | Adiciona um barômetro à arquitetura de detecção de 9 eixos, capaz de fornecer informações precisas de altitude, adequado para cenários de aplicação com requisitos mais elevados de percepção de atitude espacial 3D e posição |

## Descrição das Funções dos Pinos

| SDA  | Linha de dados serial I2C   |
| ---- | --------------------------- |
| SCL  | Linha de clock serial I2C   |
| GND  | Terra                        |
| 3V3  | 3V3                          |
| RX   | Pino de recepção de dados seriais |
| TX   | Pino de transmissão de dados seriais |
| GND  | Terra                        |
| 5V   | 5V                           |

# 2. Parâmetros do Produto

| Parâmetros do Produto |                                                              |
| --------------------- | ------------------------------------------------------------ |
|                       | Observações                                                 |
| Taxa de transmissão serial | 115200bps                                                |
| Frequência de saída serial | Padrão 25Hz, ajustável de 10Hz a 100Hz                 |
| Taxa de clock IIC     | 100KHz                                                       |
| Dados de saída        | Aceleração de 3 eixos, velocidade angular de 3 eixos, giroscópio de 3 eixos, ângulos de Euler de 3 eixos, magnetômetro de 3 eixos, pressão barométrica, altitude, temperatura, quatérnio (*texto vermelho: apenas versões de 9/10 eixos; texto azul: apenas versão de 10 eixos) |
| Tempo de inicialização | 5000ms                                                     |
| Temperatura de operação | -40°C~+85°C                                               |
| Temperatura de armazenamento | -40°C~+100°C                                           |
| Resistência a impactos | 20kg (placa nua)                                             |
| Dispositivos suportados  | Hosts Linux: PC, Raspberry Pi, série Jetson, série RDK; hosts MCU: STM32, MSPM0, ESP32, Pico, Arduino |
| Tensão de operação     | 5V ou 3.3V                                                   |
| Corrente de operação   | 11mA                                                         |
| Dimensões do produto   | 27.4mm*22.6mm*12mm                                           |
| Peso do produto        | 3.8g                                                         |
| Suporte a ROS          | ROS1/ROS2                                                    |

# 3. Parâmetros de Desempenho do Sensor

Parâmetros de desempenho dos dados do IMU

| IMU                  | Acelerômetro    | Giroscópio        | Magnetômetro    |
| -------------------- | --------------- | ----------------- | --------------- |
| Faixa                | ±16g            | ±2000°/s          | ±8Gauss         |
| Resolução            | 0.0005(g/LSB)   | 0.061(°/s)/(LSB)  | 0.244mGauss/LSB |
| Ruído RMS (largura de banda de 100Hz) | 1.0mg-RMS | 0.07°/S-RMS | /               |
| Deriva de temperatura | ±0.15mg/C       | 0.015°/s/°C       | /               |
| Largura de banda     | 12.5~1600Hz     | 12.5~1600Hz       | /               |

Parâmetros de desempenho dos dados de navegação

| Parâmetro                          | Valor Típico |             |
| ---------------------------------- | ------------ | ----------- |
| Ângulo de inclinação/rolagem (posicionamento horizontal) | Faixa | X:±180°, Y:±90° |
| Precisão                           | 0.0055°      |             |
| Ângulo de proa (posicionamento horizontal) | Faixa   | Z:±180°     |
| Precisão                           | 0.0055°      |             |

Parâmetros de desempenho do barômetro

| Parâmetro        | Condição     | Valor Típico |
| ---------------- | ------------ | ------------ |
| Faixa            |              | 300~2000hPa  |
| Ruído RMS        | Modo padrão  | 1Pa-RMS      |
| Precisão relativa |             | ±0.12hPa     |

# 4. Parâmetros de Dimensão

![Pin Function Description – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjA3NmQ5NzIzMzdkYWZlMzZkYzcwOGIyOGRmMmYxYWJfNTAxNTBiYzRjZTk4MzJiY2YzMWZhMWY4NDI5ZTFjYTZfSUQ6NzYzODkyMjc2MDI5MDcxNjYwMl8xNzgwMzE3OTcyOjE3ODA0MDQzNzJfVjM)
