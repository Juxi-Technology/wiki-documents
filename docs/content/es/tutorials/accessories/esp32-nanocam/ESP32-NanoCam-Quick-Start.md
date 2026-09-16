---
title: Inicio rápido de ESP32-NanoCam
description: "Inicio rápido del módulo de transmisión de vídeo / visión IA ESP32-NanoCam: flashear el firmware, configurar el WiFi, ver la imagen en tiempo real."
---

# Inicio rápido de ESP32-NanoCam

> **[Comprar en la tienda](https://www.juxitech.com/es/products/esp32-s3-wifi-video-module)**


ESP32-NanoCam es el módulo de transmisión de vídeo / visión IA ESP32-S3 de Juxi Technology (página del producto: [Módulo de vídeo WiFi ESP32-S3](/es/products/esp32-s3-wifi-module)), con arquitectura de doble placa: placa central + placa base. Esta guía te lleva en cinco pasos para completar el flasheo del firmware, la conexión WiFi, la visualización del vídeo y el cambio de modo de IA.

## Preparación previa

- Placa central NanoCam + placa base (ESP32-S3 N16R8 + CH340K)
- Cable USB Type-C (compatible con transferencia de datos)
- Ordenador (Windows / Mac / Linux)
- Módulo de cámara GC2145 (conectado de fábrica)

![Figura 1: cara frontal de la placa central ESP32-NanoCam](../../../../../public/images/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start/1.png)

![Figura 2: placa base ESP32-NanoCam (alimentación USB-C y flasheo por puerto serie)](../../../../../public/images/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start/2.png)

## Paso 1: Flashear el firmware (3 minutos)

### Método A: sin entorno de desarrollo (recomendado)

1. Instala el [controlador de puerto serie CH340K](https://www.wch.cn/download/CH341SER_EXE.html)
2. Abre el navegador y visita [esptool-js](https://espressif.github.io/esptool-js/)
3. Conecta el NanoCam al ordenador con un cable Type-C
4. Selecciona el puerto serie, velocidad en baudios 115200
5. Localiza el archivo de firmware `nanocam_xxx.bin` dentro del paquete descomprimido
6. Selecciona el archivo de firmware `nanocam_xxx.bin`, dirección `0x0`
7. Haz clic en "START" y espera a que finalice

### Método B: línea de comandos (avanzado)

```Bash
pip install esptool
esptool.py --chip esp32s3 --port COM3 write_flash 0x0 nanocam.bin
```

## Paso 2: Conectar el WiFi (2 minutos)

El NanoCam ejecuta por defecto **los modos AP+STA a la vez**, sin necesidad de cambiar:

- **El punto de acceso AP** está siempre activo; el móvil se conecta directamente a `NanoCam-AP` (contraseña `12345678`) y en el navegador se abre `http://192.168.4.1`
- **STA con el router**: hay que configurar el WiFi una vez

Con una herramienta de puerto serie (velocidad **115200 8N1**) conecta al puerto Type-C del NanoCam:

```Plaintext
sta_ssid:你的WiFi名称
sta_pd:你的WiFi密码
```

> Recibir `OK` indica que la configuración se realizó correctamente. Tras modificar la contraseña, el dispositivo se reinicia automáticamente.

Si necesitas cambiar el modo WiFi (normalmente no es necesario):

|Comando|Modo|Descripción|
|---|---|---|
|`wifi_mode:0`|Solo AP|Desactiva STA, solo mantiene el punto de acceso|
|`wifi_mode:1`|Solo STA|Desactiva el punto de acceso, solo se conecta al router|
|`wifi_mode:2`|AP+STA|Predeterminado, ambos funcionan a la vez|

## Paso 3: Ver el vídeo en tiempo real (1 minuto)

1. Envía `sta_ip` por el puerto serie para obtener la IP de STA
2. Introduce en el navegador `http://<dirección IP>` (o `http://192.168.4.1` en modo AP)
3. La página web permite ver el vídeo en tiempo real

## Paso 4: Explorar la IA (2 minutos)

Envía los siguientes comandos por el puerto serie para cambiar de modo:

|Comando|Modo|Efecto|
|---|---|---|
|`ai_mode:0`|Transmisión de vídeo normal|Imagen MJPEG en tiempo real|
|`ai_mode:1`|Detección de caras de gato|Aparece un recuadro de detección de cara de gato en la imagen|
|`ai_mode:2`|Detección de rostros|Aparece un recuadro de detección de rostro en la imagen|
|`ai_mode:3`|Reconocimiento de color|Selecciona un color con un recuadro → seguimiento en tiempo real|
|`ai_mode:4`|Reconocimiento facial|Registrar → identificar → eliminar|
|`ai_mode:5`|Escaneo de código QR|Apunta al código QR → el contenido se envía por el puerto serie|
|`ai_mode:6`|Agente LLM|Activación por voz "你好小智" (XiaoZhi AI)|
|`ai_mode:7`|ESP-Claw|ESP-Claw AI Agent (framework oficial de Espressif)|

> Cada cambio de modo requiere un reinicio manual; puedes reiniciar pulsando el botón RST del módulo. El nuevo modo surte efecto tras el reinicio.

## Paso 5: Integrar en tu proyecto

### Control con Arduino

```C++
Serial.begin(115200);
Serial.print("ai_mode:2");  // 切换到人脸检测
```

### Control con Python

```Python
import serial
ser = serial.Serial("COM3", 115200)
ser.write(b"ai_mode:1\r\n")  # 切换到猫脸检测
```

### Ver la lista completa de comandos

Referencia completa de comandos: [manual del protocolo serie](./ESP32-NanoCam-Serial-Protocol.md).

## Preguntas frecuentes

|Problema|Solución|
|---|---|
|Fallo al flashear|Comprueba que el cable Type-C admita transferencia de datos; mantén pulsado S2(BOOT) de la placa base y vuelve a encender|
|No se ve la imagen|Envía `sta_ip` por el puerto serie para confirmar la IP y comprueba que estén en la misma subred|
|La cámara no se ilumina|Comprueba que el flex FPC esté insertado a fondo con los contactos metálicos hacia abajo; verifica PWDN(IO12)/RESET(IO14)|
|No se conecta al WiFi|Envía `wifi_reset` para restablecer de fábrica y vuelve a configurar|

## Próximos pasos

- 📖 [Manual del protocolo serie](./ESP32-NanoCam-Serial-Protocol.md) — referencia completa de comandos AT
- 🎓 [Índice del tutorial](./Ch01-Environment-Setup.md) — tutorial progresivo (este wiki incluye 11 capítulos)
- 🔧 [Especificaciones de hardware](./ESP32-NanoCam-Hardware-Spec.md) — mapa completo de pines GPIO
- 🤖 [Guía de integración ROS2](/es/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop) — tutorial de teleoperación inalámbrica con micro-ROS

<RelatedProducts slugs="esp32-s3-wifi-module" />
