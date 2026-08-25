---
title: Sensor de frecuencia cardíaca y SpO2
description: "Tutorial de uso del módulo sensor JUXI MAX30102 (Arduino / Python)"
---

# Sensor de frecuencia cardíaca y SpO2

## Descripción del producto

El sensor de frecuencia cardíaca y oximetría de JUXI se basa en el chip MAX30102, admite comunicación IIC y UART, y recopila en tiempo real la frecuencia cardíaca y la saturación de oxígeno. Incluye biblioteca Arduino y SDK Python (Raspberry Pi / Windows / Jetson), además de un software de visualización.

**Características**:
- Chip de alta precisión MAX30102
- Comunicación IIC y UART
- Biblioteca Arduino + SDK Python
- Software de visualización para Windows
- Código abierto: [GitHub](https://github.com/Juxi-Technology/JUXI_HeartRate_SPO2)

## Especificaciones del producto

| Parámetro | Especificación |
|------|------|
| Chip | MAX30102 |
| Mediciones | Frecuencia cardíaca (HR) / Saturación de oxígeno (SpO2) |
| Interfaces | IIC (0x57) / UART (9600 bps) |
| Tensión | 3,3 V – 5 V |
| Soporte de desarrollo | Arduino / Python (RPi / Windows / Jetson) |

## Inicio rápido

### Conexión

**Conexión IIC**:

![Conexión IIC](../../../../public/images/tutorials/accessories/heart-rate-spo2/IIC.png)

| MAX30102 | Arduino / Raspberry Pi |
|----------|-----------------|
| VCC | 3,3 V / 5 V |
| GND | GND |
| SCL | SCL (reloj I2C) |
| SDA | SDA (datos I2C) |

**Conexión UART**:

![Conexión UART](../../../../public/images/tutorials/accessories/heart-rate-spo2/UART.png)

| MAX30102 | Arduino UNO |
|----------|------------|
| VCC | VCC |
| GND | GND |
| TX | Pin 4 |
| RX | Pin 5 |

### Ejemplo de código Arduino

Instalación de la biblioteca: copie `JUXI_HeartRate_SPO2.h` y `.cpp` de la carpeta `src/` del repositorio al directorio libraries de Arduino.

```cpp
#include "JUXI_HeartRate_SPO2.h"

#define I2C_COMMUNICATION
#define I2C_ADDRESS  0x57
JUXI_HeartRate_SPO2_I2C MAX30102(&Wire, I2C_ADDRESS);

void setup() {
  Serial.begin(9600);
  while (!MAX30102.begin()) {
    Serial.println("init fail!");
    delay(1000);
  }
  Serial.println("start measuring...");
}

void loop() {
  MAX30102.sensor_read_data();
  int heartRate = MAX30102.sensor_get_heartRate();
  int spo2 = MAX30102.sensor_get_spo2();

  if (heartRate > 0 && spo2 > 0) {
    Serial.print("Heart Rate: ");
    Serial.print(heartRate);
    Serial.print(" bpm, SpO2: ");
    Serial.print(spo2);
    Serial.println(" %");
  }
  delay(100);
}
```

### Ejemplo de código Python (Raspberry Pi / Jetson)

```python
import sys
import os
import time
sys.path.append(os.path.dirname(os.path.realpath(__file__)))
from JUXI_HeartRate_SPO2 import *

# Select communication mode: ctype=0 for IIC, ctype=1 for UART
ctype = 1

if ctype == 0:
    I2C_1 = 0x01
    I2C_ADDRESS = 0x57
    max30102 = JUXI_HeartRate_SPO2_i2c(I2C_1, I2C_ADDRESS)
else:
    max30102 = JUXI_HeartRate_SPO2_uart(9600)

def setup():
    while not max30102.begin():
        print("init fail!")
        time.sleep(1)
    print("start measuring...")
    max30102.sensor_start_collect()
    time.sleep(1)

def loop():
    max30102.sensor_read_data()
    hr = max30102.sensor_get_heartRate()
    spo2 = max30102.sensor_get_spo2()
    if hr > 0 and spo2 > 0:
        print(f"Heart Rate: {hr} bpm, SpO2: {spo2}%")
    time.sleep(0.1)

if __name__ == "__main__":
    setup()
    try:
        while True:
            loop()
    except KeyboardInterrupt:
        print("Program ended")
```

## Software de visualización

JUXI ofrece un software para Windows que muestra en tiempo real las curvas de frecuencia cardíaca y SpO2:

![Captura del software](../../../../public/images/tutorials/accessories/heart-rate-spo2/心率模块上位机.png)

- Ruta del repositorio: `HeartRateOximeter/上位机源代码/HeartRateOximeter.py`
- Descarga: [GitHub Releases](https://github.com/Juxi-Technology/JUXI_HeartRate_SPO2)

## Preguntas frecuentes

**Q: ¿Falla la inicialización (init fail)?**
Verifique la conexión. En modo IIC, compruebe la dirección del dispositivo (0x57 por defecto). En modo UART, asegúrese de que la velocidad sea 9600.

**Q: ¿Las lecturas son inestables?**
Asegúrese de que el sensor esté en buen contacto con la piel. Coloque el dedo firmemente sobre el sensor y evite movimientos.

**Q: ¿Cómo se usa en Windows?**
Consulte los ejemplos y la documentación en la carpeta `python/windows/` del repositorio.

## Soporte técnico

- Correo: support@juxitech.com
- Sitio oficial: [www.juxitech.com](https://www.juxitech.com)
- Repositorio de código abierto: [GitHub](https://github.com/Juxi-Technology/JUXI_HeartRate_SPO2)
