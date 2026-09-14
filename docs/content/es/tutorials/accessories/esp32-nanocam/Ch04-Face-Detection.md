---
title: "Capítulo 4: Detección de rostros"
description: "Capítulo 4 del tutorial de ESP32-NanoCam: usa el modelo de detección de rostros MobileNet de ESP-DL para marcar en la imagen el cuadro del rostro y sus 5 puntos clave, y lee las coordenadas con Arduino/Python para controlar un servo."
---

# Capítulo 4: Detección de rostros

> **[Comprar en la tienda](https://www.juxitech.com/es/products/esp32-s3-wifi-video-module)**

**Objetivo de este capítulo**: conseguir que NanoCam detecte los rostros de la imagen, marque el cuadro del rostro y los puntos clave, y leer las coordenadas para control externo.

## Principio

La detección de rostros usa la biblioteca de aprendizaje profundo ESP-DL, basada en el modelo ligero de detección MobileNet. Recibe una imagen RGB565 de 320x240 y devuelve una lista de cuadros delimitadores de rostros (posición + tamaño + confianza). La inferencia se ejecuta en el ESP32-S3, sin necesidad de conexión a la red.

### Formato del resultado de detección

- Coordenadas: esquina superior izquierda (x, y) + ancho y alto (w, h)

- Confianza: número decimal entre 0 y 1

- Con varios rostros se devuelven varios cuadros

## Pasos

### 4.1 Cambiar de modo

```Plain
ai_mode:2
```

> Consulta el [manual del protocolo de puerto serie](./ESP32-NanoCam-Serial-Protocol.md) para ver todos los comandos.

### 4.2 Observar el resultado

En el navegador `http://<IP>` se ve el cuadro de detección de rostros.

### 4.3 Obtener las coordenadas

Formato de salida del puerto serie:

```Plain
I (xxxxx) detection_result: [ 0]: ( 45,  30, 180, 210)
I (xxxxx) detection_result:       left eye: ( 90,  80), right eye: (150,  80), nose: (120, 120), mouth left: ( 95, 150), mouth right: (145, 150)
```

- Primera línea: `[número] (x, y, w, h)` — coordenadas del cuadro del rostro

- Segunda línea: 5 puntos clave — ojo izquierdo, ojo derecho, nariz, comisura izquierda de la boca, comisura derecha de la boca

## Código

### Leer coordenadas con Arduino para controlar un servo

```C++
// Parsear el formato $face:x,y,w,h#
if (nanoSerial.available()) {
    String line = nanoSerial.readStringUntil('\n');
    if (line.startsWith("$face:")) {
        int x = line.substring(6).toInt();
        int y = line.substring(line.indexOf(',')+1).toInt();
        servoX.write(map(x, 0, 320, 0, 180));
    }
}
```

### Lectura con Python

```Python
ser = serial.Serial("COM3", 115200)
line = ser.readline().decode()
if line.startswith("$face:"):
    parts = line[6:-1].split(",")
    x, y, w, h = map(int, parts)
```

## Resultado

Aparece un rostro delante de la cámara → la imagen marca el cuadro verde → el puerto serie emite las coordenadas.

Capítulo siguiente: [Capítulo 5: Detección de caras de gatos](./Ch05-Cat-Face-Detection.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
