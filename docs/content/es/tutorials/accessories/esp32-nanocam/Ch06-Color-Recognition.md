---
title: "Capítulo 6: Reconocimiento de colores"
description: "Capítulo 6 del tutorial de ESP32-NanoCam: reconoce 7 colores (rojo, amarillo, verde, azul, púrpura, blanco y negro) según el espacio de color HSV."
---

# Capítulo 6: Reconocimiento de colores

> **[Comprar en la tienda](https://www.juxitech.com/es/products/esp32-s3-wifi-video-module)**

**Objetivo de este capítulo**: conseguir que NanoCam reconozca el color de los objetos de la imagen y obtener las coordenadas para aplicaciones como la clasificación.

## Principio

Basado en el espacio de color HSV (tono-saturación-valor). La imagen RGB565 que emite la cámara se procesa con el motor ColorDetector de esp-dl: la imagen se escala a 80×80 para reducir el ruido y, píxel a píxel, se convierte a HSV para compararla con los umbrales de los 7 colores predefinidos.

### Umbrales de color predefinidos (rango H estándar de OpenCV, escala 0-180)

|Color|Tono (H)|Saturación (S)|Valor (V)|Umbral de área|
|---|---|---|---|---|
|Rojo|0-15|70-255|90-255|64|
|Amarillo|23-33|70-255|90-255|64|
|Verde|34-75|70-255|90-255|64|
|Azul|97-124|70-255|90-255|64|
|Púrpura|125-155|70-255|90-255|64|
|Blanco|0-180|0-40|200-255|80|
|Negro|0-180|0-255|0-50|80|

> El tono usa la escala 0-180 de OpenCV (correspondiente a 0-360°). `set_bgr(false)` asegura que la biblioteca lea los datos RGB565 tal cual, sin intercambiar canales.

## Pasos

### 6.1 Entrar en el modo de color

```Plain
ai_mode:3
```

El dispositivo se reinicia automáticamente y entra en el modo de detección de color; el LED RGB WS2812 (GPIO18) muestra el color reconocido en ese momento.

> Consulta el [manual del protocolo de puerto serie](./ESP32-NanoCam-Serial-Protocol.md) para ver todos los comandos.

### 6.2 Observar el resultado del reconocimiento

Coloca un objeto de color sólido delante de la cámara y abre `http://<IP>` en el navegador; verás:
- **Cuadros rectangulares de color** que marcan la zona de color detectada
- **Texto de etiqueta de color** (red/yellow/green/blue/purple/white/black)
- El color del cuadro y de la etiqueta coincide con el color detectado real
> El modo de color solo superpone información en la imagen (OSD) y no emite registros por el puerto serie. Para obtener coordenadas, léelas mediante los registros I2C.

### 6.3 Leer los datos de detección por I2C

NanoCam actúa como esclavo I2C (dirección `0x33`, GPIO SDA=41 SCL=42) y actualiza en tiempo real las coordenadas del punto central del cuadro de detección.

|Registro|Contenido|Tipo de dato|
|---|---|---|
|0x28-0x29|Centro X|int16 BE|
|0x2A-0x2B|Centro Y|int16 BE|
|0x2C-0x2D|ID de reconocimiento|int16 BE|

## Código

### Motor de detección central

`components/modules/ai/who_color_detection.cpp` — basado en ColorDetector de esp-dl:

```C++
// Crear el detector; set_bgr(false) asegura canales de color correctos
ColorDetector detector;
detector.set_bgr(false);
detector.set_detection_shape({80, 80, 1});
// Registrar los umbrales de 7 colores
detector.register_color({h_lo, h_hi, s_lo, s_hi, v_lo, v_hi}, area_min, "red");
// Detectar
auto &results = detector.detect((uint16_t *)frame->buf,
    {(int)frame->height, (int)frame->width, 3});

// Recorrer los resultados y dibujar cuadros + etiquetas
for (int ci = 0; ci < (int)results.size(); ci++) {
    for (int ri = 0; ri < (int)results[ci].size(); ri++) {
        color_detect_result_t &res = results[ci][ri];
        draw_rect(frame, res.box[0], res.box[1], res.box[2], res.box[3], color_lcd);
        fb_gfx_print(frame, lx, ly, color_lcd, color_name);
    }
}
```

## Resultado

Objeto rojo, verde o azul → se reconoce el color → cuadro + etiqueta → coordenadas por I2C → se puede conectar un servo para clasificar.

Capítulo siguiente: [Capítulo 7: Escaneo de códigos QR](./Ch07-QR-Code-Scanning.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
