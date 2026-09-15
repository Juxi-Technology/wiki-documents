---
title: "Tabla de memoria del servo STS con encoder magnético"
description: "El servo utiliza el protocolo personalizado FT-SCS. Configuración serie predeterminada de fábrica: servo STS a 1M, comunicación TTL de bus único, 8 bits de datos, sin paridad, 1 bit de parada; velocidad configurable 38400~1Mbps, dirección de comunicación predeterminada (n.º de estación) 1."
---

# Tabla de memoria del servo STS con encoder magnético

> **[Comprar en la tienda](https://www.juxitech.com/es/products/feetech-scs0009-serial-bus-servo)**


## 1 Protocolo de comunicación del servo

El servo utiliza el protocolo personalizado FT-SCS. Configuración serie predeterminada de fábrica: servo STS a 1M, comunicación TTL de bus único, 8 bits de datos, sin paridad, 1 bit de parada; velocidad configurable 38400~1Mbps, dirección de comunicación predeterminada (n.º de estación) 1.
[Protocolo personalizado FT-SCS](https://juxitech.feishu.cn/wiki/MTPLw8xCniTidGkm3amc27FXnKg) (protocolo de comunicación SCS de servos)

## 2 Definición de la tabla de memoria del servo

Si una dirección de función utiliza datos de dos bytes, el byte bajo está en la dirección anterior y el byte alto en la dirección posterior

### 2.1 Información de versión

### 2.2 Configuración EPROM

### 2.3 Control SRAM

### 2.4 Retroalimentación SRAM

### 3.5 Parámetros de fábrica

## 3 Explicación de bytes especiales

### 3.1 Fase del servo

- Bits / peso: descripción

- BIT0(1): fase de dirección de accionamiento; (0) directo, (1) inverso

- BIT1(2): modo de puente de accionamiento; (0) sin escobillas, (1) con escobillas, efectivo tras reiniciar

- BIT2(4): unidad de velocidad; (0) 0.732 RPM, (1) 0.0146 RPM

- BIT3(8): modo de velocidad; (0) velocidad 0 = parada, (1) velocidad 0 = velocidad máxima

- BIT4(16): modo de retroalimentación de ángulo; (0) retroalimentación de ángulo de una vuelta, (1) retroalimentación de ángulo completo

- BIT5(32): configuración del puente de accionamiento / muestreo de voltaje; (0) puente H independiente / muestreo 1K de alto voltaje, (1) puente H integrado / muestreo 1.5K de bajo voltaje / sin retroalimentación de corriente

- BIT6(64): frecuencia PWM; (0) 24 kHz, (1) 16 kHz

- BIT7(128): fase de dirección de la retroalimentación de posición; (0) directo, (1) inverso

Si se configuran varios bits simultáneamente, el valor de fase del servo es la suma de los valores de los bits. Ejemplo: fase original 0, servo funcionando en sentido inverso, fase = 128+1=129;

### 3.2 Estado del servo

Estado del servo: 0 = normal, 1 = anormal

- Bits / peso: descripción

- BIT0(1): estado de voltaje

- BIT1(2): estado del encoder magnético

- BIT2(4): estado de temperatura

- BIT3(8): estado de corriente

- BIT4(16): ----

- BIT5(32): estado de carga

- BIT6(64): ----

- BIT7(128): ----

Si hay varios estados simultáneos, el valor de estado del servo es la suma de los valores de los bits. Ejemplo: sobre/subtensión y sobrecalentamiento del servo, estado = 4+1=5;

### 3.3 Condiciones de descarga

Condiciones de descarga: 0 = desactivado, 1 = activado

- Bits / peso: descripción

- BIT0(1): protección de voltaje

- BIT1(2): protección del encoder magnético

- BIT2(4): protección contra sobrecalentamiento

- BIT3(8): protección contra sobrecorriente

- BIT4(16): ----

- BIT5(32): sobrecarga de carga

- BIT6(64): ----

- BIT7(128): ----

Si se configuran varios bits simultáneamente, el valor de descarga es la suma de los valores de los bits. Ejemplo: protección de voltaje y protección de sobrecalentamiento activadas, descarga = 4+1=5;

### 3.4 Condiciones de alarma LED

Condiciones de alarma LED: 0 = desactivada, 1 = activada

- Bits / peso: descripción

- BIT0(1): alarma de voltaje

- BIT1(2): alarma del encoder magnético

- BIT2(4): alarma de sobrecalentamiento

- BIT3(8): alarma de sobrecorriente

- BIT4(16): ----

- BIT5(32): alarma de sobrecarga

- BIT6(64): ----

- BIT7(128): ----

Si se configuran varios bits simultáneamente, el valor de alarma LED es la suma de los valores de los bits. Ejemplo: alarma de voltaje y alarma de sobrecalentamiento activadas, alarma = 4+1=5;
