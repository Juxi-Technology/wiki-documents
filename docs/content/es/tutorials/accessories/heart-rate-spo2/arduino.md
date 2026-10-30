---
title: "Tutorial de Arduino"
description: "Use la biblioteca JUXI_HeartRate_SPO2 en Arduino para leer frecuencia cardíaca, SpO2 y temperatura de la placa; incluye cableado, código de ejemplo, API y preguntas frecuentes."
---

# Tutorial de Arduino

## Introducción al sensor

JUXI_HeartRate_SPO2 es un módulo sensor de frecuencia cardíaca y SpO2 basado en el chip MAX30102; su algoritmo integrado puede entregar directamente los valores de frecuencia cardíaca y saturación de oxígeno.

**Funciones principales:**

- Medición de saturación de oxígeno (SPO2)
- Medición de frecuencia cardíaca (veces/minuto)
- Medición de temperatura de la placa
- Compatibilidad con comunicación I2C

---

## Tutorial de Arduino

### Preparación del hardware

| Material necesario |
|---|
| Placa de desarrollo Arduino (Uno/ESP32, etc.) |
| Sensor JUXI_HeartRate_SPO2 |
| Cables Dupont (varios) |
| Cable de datos USB (para conectar el Arduino al ordenador) |

### Instalación de la biblioteca

1. Descargue el archivo de la biblioteca [JUXI_HeartRate_SPO2.zip](https://juxitech.feishu.cn/wiki/W2IwwDop5i4BVlk98EacfyJvnrh)
1. Descomprima el archivo y cópielo en el directorio de bibliotecas de Arduino:
  - Windows: `C:\Users\用户名\Documents\Arduino\libraries\`
  - Mac: `~/Documents/Arduino/libraries/`
  - Linux: `~/Arduino/libraries/`

1. Reinicie el Arduino IDE

### Carga del código de ejemplo

> Al cargar el código, conecte solo el Arduino al ordenador; no conecte el módulo de monitorización de frecuencia cardíaca y SpO2 al Arduino.

#### Opción 1: ejemplo en modo UART

Comente #define I2C_COMMUNICATION y cargue el código en el Arduino

```cpp
#include "JUXI_HeartRate_SPO2.h"

// I2C 地址
#define I2C_ADDRESS 0x57

// 创建传感器对象，I2C模式
JUXI_HeartRate_SPO2_I2C sensor(&Wire, I2C_ADDRESS);

void setup() {
  Serial.begin(9600);

  // 初始化传感器
  while (!sensor.begin()) {
    Serial.println("传感器初始化失败，请检查连接！");
    delay(1000);
  }
  Serial.println("传感器初始化成功！");

  // 启动数据采集
  sensor.sensorStartCollect();
}

void loop() {
  // 读取心率和血氧数据
  sensor.getHeartbeatSPO2();

  // 输出血氧饱和度
  Serial.print("血氧饱和度: ");
  Serial.print(sensor._sHeartbeatSPO2.SPO2);
  Serial.println(" %");

  // 输出心率
  Serial.print("心率: ");
  Serial.print(sensor._sHeartbeatSPO2.Heartbeat);
  Serial.println(" 次/分钟");

  // 读取并输出温度
  Serial.print("板载温度: ");
  Serial.print(sensor.getTemperature_C());
  Serial.println(" ℃");

  Serial.println("------------------------");

  // 传感器每4秒更新一次数据
  delay(4000);
}
```

##### Conexión de hardware

Comunicación I2C

![Ilustración](../../../../../public/images/tutorials/accessories/heart-rate-spo2/arduino/01.png)

![Ilustración](../../../../../public/images/tutorials/accessories/heart-rate-spo2/arduino/02.png)

| Pin del sensor | Arduino |
|---|---|
| VCC | 5V/3.3V |
| GND | GND |
| SDA | SDA/A4 |
| SCL | SCL/A5 |

- ¡Desplace el interruptor del módulo de monitorización de frecuencia cardíaca y SpO2 a IIC!
- Conecte el Arduino al ordenador con el cable de datos

#### Resultado de ejecución:

1. Abra Arduino - Herramientas - Monitor Serie

Configure la velocidad en baudios a 9600

![Ilustración](../../../../../public/images/tutorials/accessories/heart-rate-spo2/arduino/03.png)

2. Abra el asistente de depuración de puerto serie

[Asistente de depuración de puerto serie uartassist5.15.zip](https://juxitech.feishu.cn/wiki/BJlfwSQydi7u5lkRDQ6cV4dvnBd)

Seleccione el número de puerto serie

Configure la velocidad en baudios a `9600`

Bits de datos `8`, bit de parada `1`, bit de paridad `NONE`, control de flujo `NONE`

Seleccione `ASCII` en la configuración de recepción y de envío

![Ilustración](../../../../../public/images/tutorials/accessories/heart-rate-spo2/arduino/04.png)

### Descripción de la API

| Función | Descripción |
|---|---|
| begin() | Inicializa el sensor; devuelve true/false |
| getHeartbeatSPO2() | Lee la frecuencia cardíaca y el SpO2 y los guarda en la estructura _sHeartbeatSPO2 |
| getTemperature_C() | Lee la temperatura de la placa (grados Celsius) |
| sensorStartCollect() | Inicia la adquisición de datos (el sensor se enciende) |
| sensorEndCollect() | Detiene la adquisición de datos (el sensor se apaga) |

### Descripción de los datos

- **SPO2 (saturación de oxígeno)**: rango normal 95% - 100%; un valor de -1 indica inválido
- **Heartbeat (frecuencia cardíaca)**: rango normal 60 - 100 veces/minuto; un valor de -1 indica inválido
- **Causa de los valores inválidos**: el dedo no está bien colocado o los datos aún no se han estabilizado

---

## Precauciones de uso

### Técnicas de medición

1. **Coloque el dedo correctamente**
  - Apoye suavemente el dedo sobre el sensor, cubriendo los dos LEDs
  - No presione con fuerza para no afectar la circulación sanguínea
  - Mantenga el dedo estable, sin moverlo

1. **Espere a que los datos se estabilicen**
  - Al principio de la medición, los valores pueden ser inestables
  - Se recomienda esperar de 10 a 30 segundos a que los datos se estabilicen antes de leerlos
  - El sensor actualiza los datos cada 4 segundos

1. **Requisitos del entorno**
  - Evite la luz intensa directa sobre el sensor
  - Mantenga una temperatura ambiente adecuada
  - Mantenga un entorno tranquilo durante la medición

### Interpretación de los datos

| Rango de SPO2 | Descripción |
|---|---|
| 95% - 100% | Normal |
| 90% - 94% | Hipoxia leve |
| < 90% | Hipoxia; se recomienda acudir al médico |

| Rango de frecuencia cardíaca | Descripción |
|---|---|
| 60 - 100 veces/min | Rango normal de un adulto |
| < 60 veces/min | Bradicardia |
| > 100 veces/min | Taquicardia |

---

## Preguntas frecuentes

### P1: ¿Qué hacer si falla la inicialización del sensor?

**A:**

1. Compruebe si el cableado es correcto (SDA a GPIO2/A4, SCL a GPIO3/A5)
1. Confirme que la alimentación es correcta (3,3V o 5V)
1. Use el comando `i2cdetect -y 1` para detectar el dispositivo
1. Confirme que el interruptor del sensor está en la posición IIC

### P2: ¿Qué hacer si los datos muestran siempre -1?

**A:**

1. Confirme que el dedo está correctamente colocado sobre el sensor
1. Espere unos segundos a que los datos se estabilicen
1. Compruebe si se ha llamado a `sensorStartCollect()` para iniciar la adquisición
1. Confirme si el indicador LED del sensor está encendido

### P3: ¿Qué hacer si los datos son imprecisos?

**A:**

1. Asegúrese de que el dedo cubre por completo la zona óptica del sensor
1. Mantenga el dedo quieto, sin moverlo
1. Espere más de 30 segundos a que los datos se estabilicen
1. Realice varias mediciones y obtenga el promedio

### P4: ¿Qué placas de desarrollo Arduino son compatibles con el sensor?

**A:** Compatibles:

- Arduino Uno/Mega
- ESP8266
- ESP32
- Otras placas de desarrollo compatibles con el entorno Arduino

---

## Ubicación de los archivos de ejemplo

### Ejemplo de Arduino

```text
JUXI_HeartRate_SPO2/
└── examples/
    └── gainHeartbeatSPO2/
        └── gainHeartbeatSPO2.ino
```
