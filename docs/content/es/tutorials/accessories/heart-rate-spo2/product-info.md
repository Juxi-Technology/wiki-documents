---
title: "Información del producto"
description: "Descripción general, principio de detección, especificaciones técnicas, definición de pines y escenarios de aplicación típicos del módulo sensor de frecuencia cardíaca y SpO2 MAX30102."
---

# Información del producto

## 1. Descripción general del producto

El módulo sensor de frecuencia cardíaca y SpO2 Gravity: MAX30102 incorpora el chip original de alta precisión MAX30102 de Maxim, dedicado a la detección de frecuencia cardíaca y SpO2, junto con un microcontrolador que integra un algoritmo propio de frecuencia cardíaca y SpO2; no requiere que el dispositivo maestro escriba programas de cálculo complejos y puede entregar directamente valores estandarizados de frecuencia cardíaca y saturación de oxígeno.

El módulo utiliza la fotopletismografía (PPG) para adquirir los datos fisiológicos originales; el microcontrolador de la placa realiza automáticamente todo el proceso de filtrado de señal, cálculo de datos y calibración de valores, y finalmente transmite los resultados a través de dos interfaces de comunicación universales: I2C y UART. Esto reduce enormemente la dificultad de adaptación de hardware para los desarrolladores y el consumo de recursos del MCU maestro, por lo que incluso los principiantes pueden completar rápidamente el desarrollo de sus proyectos. Además, el módulo se acompaña de un software de PC dedicado que permite leer los datos directamente desde el ordenador y consultar en tiempo real y de forma visual los datos de frecuencia cardíaca y SpO2, lo que facilita y agiliza la depuración.

## 2. Principio de funcionamiento de la detección

El módulo emplea el **método de detección por fotopletismografía (PPG)** para realizar mediciones fisiológicas no invasivas: las arterias del cuerpo humano se dilatan y contraen rítmicamente con los latidos del corazón, lo que provoca fluctuaciones periódicas del volumen sanguíneo en los vasos; la variación del volumen sanguíneo afecta directamente la transmitancia de la luz en el tejido de la yema del dedo. El módulo emite luz de una longitud de onda específica y recoge la señal reflejada para captar los cambios dinámicos de la transmitancia y, combinando el algoritmo integrado, calcula con precisión la frecuencia cardíaca y la saturación de oxígeno en tiempo real.

## 3. Precauciones de uso

1. **La presión aplicada afecta a la precisión de los datos**: si la fuerza con la que el dedo presiona el sensor no es uniforme o la presión varía continuamente, se interfiere la señal del camino óptico y los valores de frecuencia cardíaca y SpO2 presentan desviaciones; durante el uso se recomienda mantener el dedo estable y una presión constante.
1. **Indicaciones de colocación**: la zona de medición de este módulo se limita a la yema del dedo y el cabezal de medición no tiene una orientación distinguible, por lo que la colocación no presenta ninguna dificultad.
1. **Declaración de no ser un dispositivo médico**: este producto es un módulo de detección electrónico de consumo y no es un dispositivo médico profesional; los datos de medición solo sirven como referencia de salud cotidiana y no deben utilizarse para el diagnóstico clínico, la monitorización de enfermedades ni el tratamiento médico auxiliar.

- Basta con apoyar la yema del dedo sobre el sensor y fijarla con la correa incluida

![Ilustración](../../../../../public/images/tutorials/accessories/heart-rate-spo2/product-info/01.png)

## 4. Especificaciones técnicas

- Tensión de alimentación: 3,3-5 V
- Corriente de trabajo: <15 mA
- Modo de comunicación: I2C/UART
- Dirección I2C: 0x57
- Velocidad en baudios del puerto serie: 9600
- Rango de temperatura de funcionamiento: -40 ℃~85 ℃
- Dimensiones del producto: 25,5*32 mm

**Definición de pines (serigrafía):**

| N.º | Serigrafía | Descripción de la función |
|---|---|---|
| 1 | D/T | Línea de datos I2C/TX |
| 2 | C/T | Línea de reloj I2C/RX |
| 3 | GND | Negativo de alimentación |
| 4 | VCC | Positivo de alimentación |

## 5. Escenarios de aplicación típicos

- Proyectos de desarrollo de monitorización de frecuencia cardíaca y SpO2 para dispositivos wearables
- Fabricación DIY de medidores domésticos sencillos de frecuencia cardíaca y SpO2
- Sistemas de monitorización continua e ininterrumpida de signos vitales humanos
- Proyectos de hardware de código abierto para makers y experimentos de detección fisiológica en cursos universitarios de electrónica
