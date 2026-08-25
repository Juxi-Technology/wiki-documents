---
title: Análisis de la tabla de memoria del servo SCSCL con potenciómetro
description: "El servo utiliza el protocolo personalizado FT-SCS. Configuración serie predeterminada de fábrica: velocidad por defecto 1M o 500k, comunicación TTL de bus único, 8 bits de datos, sin paridad, 1 bit de parada; velocidad configurable 38400~1Mbps (500k), dirección de comunicación predeterminada (n.º de estación) 1."
---

# Análisis de la tabla de memoria del servo SCSCL con potenciómetro

> **[Comprar en la tienda](https://www.juxitech.com/es/products/feetech-scs0009-serial-bus-servo)**


# 1 Protocolo de comunicación del servo

El servo utiliza el protocolo personalizado FT-SCS. Velocidad por defecto 1M o 500k, comunicación TTL de bus único, 8 bits de datos, sin paridad, 1 bit de parada; velocidad configurable 38400~1Mbps (500k), dirección de comunicación predeterminada (n.º de estación) 1.
[Protocolo personalizado FT-SCS](https://juxitech.feishu.cn/wiki/MTPLw8xCniTidGkm3amc27FXnKg)

# 2 Definición de la tabla de memoria del servo

Si una dirección de función utiliza datos de dos bytes, el byte alto está en la dirección anterior y el byte bajo en la dirección posterior

## 2.1 Información de versión

## 2.2 Configuración EPROM

## 2.3 Control SRAM

## 2.4 Retroalimentación SRAM

## 2.5 Parámetros de fábrica

# 3 Explicación de bytes especiales

## 3.1 Fase del servo

- Bits / peso: descripción

- BIT0（1）: fase de dirección de accionamiento; (0) directo, (1) inverso

- BIT1（2）: ----

- BIT2（4）: ----

- BIT3（8）: modo de velocidad; (0) velocidad 0 = parada, (1) velocidad 0 = velocidad máxima

- BIT4（16）: ----

- BIT5（32）: fase PWM; (0) en fase, (1) en oposición de fase

- BIT6（64）: modo de voltaje; (0) muestreo 1.5K de bajo voltaje, (1) muestreo 1K de alto voltaje

- BIT7（128）: ----

Si se configuran varios bits simultáneamente, el valor de fase del servo es la suma de los valores de los bits.

## 3.2 Estado del servo

Estado del servo: 0 = normal, 1 = anormal

- Bits / peso: descripción

- BIT0（1）: estado de voltaje

- BIT1（2）: ----

- BIT2（4）: estado de temperatura

- BIT3（8）: ----

- BIT4（16）: ----

- BIT5（32）: estado de carga

- BIT6（64）: ----

- BIT7（128）: ----

Si hay varios estados simultáneos, el valor de estado del servo es la suma de los valores de los bits. Ejemplo: sobre/subtensión y sobrecalentamiento del servo, estado = 4+1=5;

## 3.3 Condiciones de descarga

Condiciones de descarga: 0 = desactivado, 1 = activado

- Bits / peso: descripción

- BIT0（1）: protección de voltaje

- BIT1（2）: ----

- BIT2（4）: protección contra sobrecalentamiento

- BIT3（8）: ----

- BIT4（16）: ----

- BIT5（32）: sobrecarga de carga

- BIT6（64）: ----

- BIT7（128）: ----

Si se configuran varios bits simultáneamente, el valor de descarga es la suma de los valores de los bits. Ejemplo: protección de voltaje y protección de sobrecalentamiento activadas, descarga = 4+1=5;

## 3.4 Condiciones de alarma LED

Condiciones de alarma LED: 0 = desactivada, 1 = activada

- Bits / peso: descripción

- BIT0（1）: alarma de voltaje

- BIT1（2）: ----

- BIT2（4）: alarma de sobrecalentamiento

- BIT3（8）: ----

- BIT4（16）: ----

- BIT5（32）: alarma de sobrecarga

- BIT6（64）: ----

- BIT7（128）: ----

Si se configuran varios bits simultáneamente, el valor de alarma LED es la suma de los valores de los bits. Ejemplo: alarma de voltaje y alarma de sobrecalentamiento activadas, alarma = 4+1=5;
