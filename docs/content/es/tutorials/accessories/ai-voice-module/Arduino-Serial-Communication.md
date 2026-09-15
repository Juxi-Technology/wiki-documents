---
title: "Arduino: Comunicación por puerto serie"
description: "Módulo de voz IA con Arduino por puerto serie: cableado RX/TX cruzado, formato de trama del protocolo UART, código de ejemplo y depuración."
---

# Arduino: Comunicación por puerto serie

## 📁 Estructura de archivos

```Plain Text
UART_Voice/
├── UART_Voice.ino    # 主程序
├── bsp_uart.hpp         # 头文件（协议帧和函数声明）
├── bsp_uart.cpp         # 实现文件
└── README.md              # 本教程
```

---

## 🔌 Conexión del hardware

### Conexión al módulo de voz

> 💡 **Nota:** ¡RX y TX deben conectarse en cruz!
> 
> 

![Imagen 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication/1.png)

---

## 🔧 Compilar y subir

### Paso 1: Abrir el Arduino IDE

1. Abra el archivo `UART_Voice.ino`

2. Seleccione el modelo de su placa de desarrollo (por ejemplo, Arduino Uno)

3. Seleccione el puerto serie correspondiente

### Paso 2: Compilar y subir

1. Haga clic en el botón ✔️ para compilar

2. Haga clic en el botón ➡️ para subir a la placa de desarrollo

---

## 📡 Prueba del puerto serie

### Abrir el monitor de puerto serie del Arduino IDE

- Velocidad en baudios: **115200**

- Final de línea: **Ninguno**

### Salida esperada

Tras encender debería ver:

```Plain Text
UART Voice Module Initialized
```

Diga la palabra de activación y las palabras de comando al módulo y se emitirán los ID correspondientes:

```Plain Text
ID: 1
ID: 2
ID: 10
```

---

## 📚 Formato de trama del protocolo

**Ejemplo:** se lee el ID de comando = 10

```Plain Text
FE EF 00 0A EE
```

**Ejemplo:** se envía la reproducción de una palabra de comando

```Plain Text
FE EF D3 00 EE
```

---

## 📚 Descripción de la interfaz BSP

### UART_Init()

```Plain Text
void UART_Init(void);
```

**Función**: inicializar el puerto serie (velocidad en baudios 115200)

**Ejemplo**:

```Plain Text
void setup() {
  UART_Init();
}
```

---

### UART_ReadCommand()

int UART_ReadCommand(void);

**Función**: leer el ID del comando reconocido por el módulo de voz

**Valor devuelto**:

- `0` - no se ha reconocido ningún comando

- `1~254` - ID de comando

- `-1` - no hay datos nuevos

**Ejemplo**:

```Plain Text
int id = UART_ReadCommand();
if (id > 0) {
  Serial.print("识别到命令: ");
  Serial.println(id);
}
```

---

### UART_SetPassiveVoice()

```Plain Text
void UART_SetPassiveVoice(uint8_t voiceID);
```

**Función**: establecer la voz de reproducción pasiva

**Parámetro**:

- `0x00` - tipo de frase de reproducción pasiva

**Ejemplo**:

```Plain Text
UART_SetPassiveVoice(0x00);
delay(200);
```

---

### UART_SetFunctionVoice()

```Plain Text
void UART_SetFunctionVoice(uint8_t voiceID);
```

**Función**: establecer la voz de reproducción de palabras de función

**Parámetro**:

- `0x00` - tipo de frase de reproducción de palabras de función

**Ejemplo**:

```Plain Text
UART_SetFunctionVoice(0x00);
delay(200);
```

---

### UART_SetCommandVoice()

```Plain Text
void UART_SetCommandVoice(uint8_t voiceID);
```

**Función**: establecer la voz de reproducción de palabras de comando

**Parámetro**:

- `0x00` - tipo de frase de reproducción de palabras de comando

**Ejemplo**:

```Plain Text
UART_SetCommandVoice(0x00);
delay(200);
```

---

## 🎯 Descripción de la lógica del programa principal

```JavaScript
void setup() {
  Serial.begin(115200);
  UART_Init();

  Serial.println("UART Voice Module Initialized");

  UART_SetCommandVoice(0x00);  // 上电播报命令词语音
  delay(200);
}

void loop() {
  int commandId = UART_ReadCommand();

  if (commandId >= 0) {
    // 过滤无效值，防止重复输出
    if (commandId != 0 && commandId != 255 && commandId != lastCommandId) {
      Serial.print("ID: ");
      Serial.println(commandId);
      lastCommandId = commandId;

      // 示例：根据识别到的命令控制播报
      if (commandId == 1) {
        UART_SetCommandVoice(0x00);  // 识别到命令1，播报命令词语音
      } else if (commandId == 2) {
        UART_SetCommandVoice(0x00);  // 识别到命令2，播报命令词语音
      }
    } else if (commandId == 0 || commandId == 255) {
      if (lastCommandId != 0) {
        lastCommandId = 0;  // 重置状态
      }
    }
  }

  delay(50);
}
```

---

## 🔍 Solución de problemas

### Q1: No hay ninguna salida

**Posibles causas:**

1. RX/TX están invertidos

2. GND no comparte tierra común

3. El módulo no está alimentado

4. Velocidad en baudios incorrecta

**Soluciones:**

- Confirme que D10 se conecta al TX del módulo y D11 al RX del módulo (conexión en cruz)

- Confirme la conexión de GND

- Confirme que la alimentación de 5V sea normal

- Confirme que la velocidad en baudios del puerto serie sea 115200

---

### Q2: El puerto serie solo muestra caracteres ilegibles

**Posibles causas:**

1. La velocidad en baudios no coincide

2. El módulo no se alimenta correctamente

**Soluciones:**

- Confirme que la velocidad en baudios del monitor de puerto serie sea 115200

- Pulse una vez el botón de reinicio del módulo

---

### Q3: Se emite "ID: 255" o "ID: 0"

**Nota:** esto es normal

- `0` = no se ha reconocido ningún comando

- `255` = no hay datos nuevos

Estos valores ya se han filtrado en el código y normalmente no se emitirán. Si ve que se emiten, significa que el código no está surtiendo efecto.

---

## 💡 Ventajas de la arquitectura BSP

### Capas de código claras

- **bsp_uart.hpp** - solo se ven las declaraciones, no la implementación

- **bsp_uart.cpp** - los detalles concretos de implementación

- **UART_Voice.ino** - solo se ocupa de la lógica de negocio

### Fácil de portar

Si cambia a otra plataforma (como STM32 o ESP32), solo necesita modificar la implementación de `bsp_uart.cpp`; el programa principal no necesita cambios.

### Fácil de mantener

Las modificaciones del código relacionado con UART se realizan solo en `bsp_uart.cpp`; se modifica una vez y surte efecto en todas partes.

---

## 🚀 Ejemplos de funciones ampliadas

### Ejemplo 1: Activar distintas reproducciones según distintos comandos

```Plain Text
if (commandId == 1) {
  UART_SetCommandVoice(0x00);      // 播报命令词
} else if (commandId == 2) {
  UART_SetFunctionVoice(0x00);     // 播报功能词
} else if (commandId == 3) {
  UART_SetPassiveVoice(0x00);      // 播报被动语
}
```

### Ejemplo 2: Controlar un LED

```Plain Text
if (commandId == 10) {
  digitalWrite(LED_PIN, LOW);    // 关灯
  UART_SetCommandVoice(0x00);     // 播报确认
}
```

### Ejemplo 3: Controlar un motor

```Plain Text
if (commandId == 11) {
  motor_stop();
  UART_SetCommandVoice(0x00);     // 播报确认
}
```

<RelatedProducts slugs="ai-voice-module" />
