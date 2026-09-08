---
title: Servo SCSCL com potenciômetro - Análise da tabela de memória
description: "O servo utiliza o Protocolo de Comunicação Personalizado FT-SCS. A taxa de transmissão padrão do servo é 1M ou 500k, usando comunicação de barramento único TTL, com 8"
---

# Servo SCSCL com potenciômetro - Análise da tabela de memória

> **[Comprar na loja](https://www.juxitech.com/pt-br/products/feetech-scs0009-serial-bus-servo)**


# 1 Protocolo de comunicação do servo

O servo utiliza o Protocolo de Comunicação Personalizado FT-SCS. A taxa de transmissão padrão do servo é 1M ou 500k, usando comunicação de barramento único TTL, com 8 bits de dados, sem paridade e 1 bit de parada. A faixa configurável da taxa de transmissão é 38400~1Mbps (500k), e o endereço de comunicação padrão (número de estação) é 1. [Protocolo de Comunicação Personalizado FT-SCS](https://juxitech.feishu.cn/wiki/MTPLw8xCniTidGkm3amc27FXnKg)

# 2 Definição da tabela de memória do servo

Se o endereço de função usar dados de dois bytes, o byte de ordem alta fica no endereço frontal e o byte de ordem baixa fica no endereço posterior 

## 2.1 Informações de versão

## 2.2 Configuração EPROM

## 2.3 Controle SRAM

## 2.4 Feedback SRAM

## 2.5 Parâmetros de fábrica

# 3 Explicação dos bytes especiais

## 3.1 Fase do servo

- Peso do dígito/bit: Descrição

- BIT0 (1): Fase de direção de acionamento; (0) Direta, (1) Reversa

- BIT1 (2): ----

- BIT2 (4): ----

- BIT3 (8): Modo de velocidade; (0) Velocidade 0 indica parada, (1) Velocidade 0 indica velocidade máxima

- BIT4 (16): ----

- BIT5 (32): Fase PWM, (0) Em fase, (1) Em antifase

- BIT6 (64): Modo de tensão, (0) Amostragem de baixa tensão 1.5K, (1) Amostragem de alta tensão 1K

- BIT7 (128): ----

Se vários bits forem definidos simultaneamente, o valor de fase do servo é a soma dos valores dos bits individuais. 

## 3.2 Estado do servo

Estado do servo: 0 indica normal, 1 indica anormal

- Peso do dígito/bit: Descrição

- BIT0 (1): Estado de tensão

- BIT1 (2): ----

- BIT2 (4): Estado de temperatura

- BIT3 (8): ----

- BIT4 (16): ----

- BIT5 (32): Estado de carga

- BIT6 (64): ----

- BIT7 (128): ----

Se houver vários estados simultaneamente, o valor de estado do servo é a soma dos valores dos bits individuais. Por exemplo, se houver sobretensão/subtensão e superaquecimento do servo, o valor de estado do servo é 4 + 1 = 5; 

## 3.3 Condições de desenergização

Condição de desenergização: 0 indica desativada, 1 indica ativada 

- Peso do dígito/bit: Descrição

- BIT0 (1): Proteção de tensão

- BIT1 (2): ----

- BIT2 (4): Proteção contra superaquecimento

- BIT3 (8): ----

- BIT4 (16): ----

- BIT5 (32): Sobrecarga de carga

- BIT6 (64): ----

- BIT7 (128): ----

Se vários bits forem definidos simultaneamente, o valor da condição de desenergização do servo é a soma dos valores de cada bit. Por exemplo, se a proteção de tensão e a proteção contra superaquecimento estiverem ambas ativadas, o valor da condição de desenergização é 4 + 1 = 5; 

## 3.4 Condições de alarme do LED

Condição de alarme do LED: 0 indica desativada, 1 indica ativada

- Peso do dígito/bit: Descrição

- BIT0 (1): Alarme de tensão

- BIT1 (2): ----

- BIT2 (4): Alarme de superaquecimento

- BIT3 (8): ----

- BIT4 (16): ----

- BIT5 (32): Alarme de sobrecarga de carga

- BIT6 (64): ----

- BIT7 (128): ----

Se vários bits forem definidos simultaneamente, o valor da condição de alarme do LED do servo é a soma dos valores de cada bit. Por exemplo, se tanto o alarme de tensão quanto o alarme de superaquecimento estiverem ativados simultaneamente, o valor da condição de alarme é 4 + 1 = 5; 

