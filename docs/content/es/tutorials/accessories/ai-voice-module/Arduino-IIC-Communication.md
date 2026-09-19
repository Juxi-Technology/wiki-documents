---
title: "Arduino: Comunicación IIC"
description: "Módulo de voz IA con Arduino por IIC: conexión del hardware, mapa de registros, lógica del ejemplo de control y solución de problemas."
---

# Arduino: Comunicación IIC

## 📁 Estructura de archivos

```Plain Text
IIC_Voice/
├── IIC_Voice.ino    # Programa principal
├── bsp_iic.hpp         # Archivo de cabecera (direcciones y declaraciones de funciones)
├── bsp_iic.cpp         # Archivo de implementación
└── README.md            # Este tutorial
```

---

## 🔌 Conexión del hardware

![Imagen 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication/1.png)

---

## 🔧 Compilar y subir

### Paso 1: Abrir el Arduino IDE

1. Abra el archivo `IIC_Voice.ino`

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

`IIC Voice Module Initialized`

Diga la palabra de activación y las palabras de comando al módulo y se emitirán los ID correspondientes:

```Plain Text
ID: 1
ID: 2
ID: 10
```

---

## 📚 Mapa de registros

---

## 📚 Descripción de la interfaz BSP

### IIC_Init()

```Plain Text
void IIC_Init(void);
```

**Función**: inicializar el bus I2C

**Ejemplo**:

```Plain Text
void setup() {
  IIC_Init();
}
```

---

### IIC_ReadCommand()

```Plain Text
int IIC_ReadCommand(void);
```

**Función**: leer el ID del comando reconocido por el módulo de voz

**Valor devuelto**:

- `0` - no se ha reconocido ningún comando

- `1~254` - ID de comando

- `-1` - error de comunicación

**Ejemplo**:

```Plain Text
int id = IIC_ReadCommand();
if (id > 0) {
  Serial.print("识别到命令: ");
  Serial.println(id);
}
```

---

### IIC_SetPassiveVoice()

```Plain Text
void IIC_SetPassiveVoice(uint8_t voiceID);
```

**Función**: establecer la voz de reproducción pasiva

**Parámetro**:

- `0x00` - tipo de frase de reproducción pasiva

**Ejemplo**:

```Plain Text
IIC_SetPassiveVoice(0x00);
delay(200);
```

---

### IIC_SetFunctionVoice()

```Plain Text
void IIC_SetFunctionVoice(uint8_t voiceID);
```

**Función**: establecer la voz de reproducción de palabras de función

**Parámetro**:

- `0x00` - tipo de frase de reproducción de palabras de función

**Ejemplo**:

```Plain Text
IIC_SetFunctionVoice(0x00);
delay(200);
```

---

### IIC_SetCommandVoice()

```Plain Text
void IIC_SetCommandVoice(uint8_t voiceID);
```

**Función**: establecer la voz de reproducción de palabras de comando

**Parámetro**:

- `0x00` - tipo de frase de reproducción de palabras de comando

**Ejemplo**:

```Plain Text
IIC_SetCommandVoice(0x00);
delay(200);
```

---

## 🎯 Descripción de la lógica del programa principal

```JavaScript
void setup() {
  Serial.begin(115200);
  IIC_Init();

  Serial.println("IIC Voice Module Initialized");

  IIC_SetCommandVoice(0x00);  // Reproducir la voz de palabra de comando al encender
  delay(200);
}

void loop() {
  int commandId = IIC_ReadCommand();

  if (commandId >= 0) {
    // Filtrar valores no válidos para evitar salidas repetidas
    if (commandId != 0 && commandId != 255 && commandId != lastCommandId) {
      Serial.print("ID: ");
      Serial.println(commandId);
      lastCommandId = commandId;

      // Ejemplo: controlar la reproducción según el comando reconocido
      if (commandId == 1) {
        IIC_SetCommandVoice(0x00);  // Comando 1 reconocido: reproducir la voz de palabra de comando
      } else if (commandId == 2) {
        IIC_SetCommandVoice(0x00);  // Comando 2 reconocido: reproducir la voz de palabra de comando
      }
    } else if (commandId == 0 || commandId == 255) {
      if (lastCommandId != 0) {
        lastCommandId = 0;  // Restablecer el estado
      }
    }
  } else {
    Serial.println("IIC Read Error");
    delay(1000);
  }

  delay(50);
}
```

---

## 🔍 Solución de problemas

### Q1: El puerto serie solo muestra "IIC Read Error"

**Posibles causas:**

1. Cableado incorrecto, no conectado

2. El módulo no está alimentado

3. Dirección I2C incorrecta

**Soluciones:**

- Compruebe si SDA/SCL están invertidos

- Compruebe si GND comparte tierra común

- Compruebe si la alimentación de 5V es normal

- Utilice un programa de escaneo I2C para confirmar la dirección del dispositivo

---

### Q2: No hay ninguna salida

**Posibles causas:**

1. Velocidad en baudios del puerto serie incorrecta

2. El módulo no está activado

**Soluciones:**

- Confirme que la velocidad en baudios del puerto serie sea 115200

- Diga primero la palabra de activación y luego las palabras de comando

---

### Q3: Se emite "ID: 255" o "ID: 0"

**Nota:** esto es normal

- `0` = no se ha reconocido ningún comando

- `255` = no hay datos nuevos

Estos valores ya se han filtrado en el código y normalmente no se emitirán. Si ve que se emiten, significa que el código no está surtiendo efecto.

---

## 💡 Ventajas de la arquitectura BSP

### Capas de código claras

- **bsp_iic.hpp** - solo se ven las declaraciones, no la implementación

- **bsp_iic.cpp** - los detalles concretos de implementación

- **IIC_Voice.ino** - solo se ocupa de la lógica de negocio

### Fácil de portar

Si cambia a otra plataforma (como STM32 o ESP32), solo necesita modificar la implementación de `bsp_iic.cpp`; el programa principal no necesita cambios.

### Fácil de mantener

Las modificaciones del código relacionado con I2C se realizan solo en `bsp_iic.cpp`; se modifica una vez y surte efecto en todas partes.

---

## 🚀 Ejemplos de funciones ampliadas

### Ejemplo 1: Activar distintas reproducciones según distintos comandos

```Plain Text
if (commandId == 1) {
  IIC_SetCommandVoice(0x00);      // Reproducir palabra de comando
} else if (commandId == 2) {
  IIC_SetFunctionVoice(0x00);     // Reproducir palabra de función
} else if (commandId == 3) {
  IIC_SetPassiveVoice(0x00);      // Reproducir frase pasiva
}
```

### Ejemplo 2: Controlar un LED

```Plain Text
if (commandId == 10) {
  digitalWrite(LED_PIN, LOW);    // Apagar la luz
  IIC_SetCommandVoice(0x00);     // Reproducir confirmación
}
```

### Ejemplo 3: Controlar un motor

```Plain Text
if (commandId == 11) {
  motor_stop();
  IIC_SetCommandVoice(0x00);     // Reproducir confirmación
}
```

<RelatedProducts slugs="ai-voice-module" />
