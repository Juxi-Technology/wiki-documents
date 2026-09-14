---
title: "Capítulo 2: Inicio rápido"
description: "Capítulo 2 del tutorial de ESP32-NanoCam: graba el firmware y completa la configuración de red WiFi (por puerto serie o punto de acceso AP); abre la primera imagen MJPEG en tiempo real en el navegador y conoce los distintos endpoints HTTP."
---

# Capítulo 2: Inicio rápido

> **[Comprar en la tienda](https://www.juxitech.com/es/products/esp32-s3-wifi-video-module)**

**Objetivo de este capítulo**: grabar el firmware, completar la configuración de red WiFi y ver la primera imagen en tiempo real de NanoCam en el navegador.

## 2.1 Grabación del firmware

### Pasos

1. Descomprime la carpeta → `nanocam_xxx.bin`

2. Abre [esptool-js](https://espressif.github.io/esptool-js/)

3. Conecta NanoCam por Type-C

4. Haz clic en Connect → selecciona el puerto serie

5. Selecciona el archivo de firmware y pon `0x0` como dirección

6. Haz clic en START → espera a que termine

### Verificación

Conecta NanoCam con una herramienta de puerto serie (115200 8N1); deberías ver:

```Plain
NanoCam Board Ver:0.3.0
```

---

## 2.2 Configuración de red WiFi

> Resultado: **NanoCam se conecta al WiFi y obtiene una IP**

### Método A: Configuración de red por puerto serie (el más habitual)

```Plain
sta_ssid:tu_nombre_de_WiFi
sta_pd:tu_contraseña_de_WiFi
```

Al recibir `OK` → configuración correcta. Si se cambia la contraseña, el dispositivo se reinicia automáticamente.

> Consulta el [manual del protocolo de puerto serie](./ESP32-NanoCam-Serial-Protocol.md) para ver todos los comandos de puerto serie.

### Método B: Conexión directa al punto de acceso AP

NanoCam crea su propio punto de acceso: `NanoCam-AP`, contraseña `12345678`
Conecta el móvil y abre `http://192.168.4.1` en el navegador

### Verificación

```Plain
sta_ip
```

Devuelve: `sta_ip:192.168.x.x` ✅

---

## 2.3 Primera imagen

> Resultado: **ver la imagen en tiempo real de NanoCam en el navegador**

1. Escribe `http://<dirección IP>` en el navegador

2. Verás la imagen MJPEG en tiempo real

3. Envía `ai_mode:1` por el puerto serie → cambia a la detección de cara de gato → aparece el cuadro de detección en la imagen

### Descripción de los endpoints

|URL|Uso|
|---|---|
|`http://<IP>/`|Imagen en tiempo real (HTML)|
|`http://<IP>/stream`|Flujo MJPEG puro (legible por OpenCV/VLC)|
|`http://<IP>/status`|Estado del dispositivo en JSON|
|`http://<IP>/admin`|Panel de administración web|

Capítulo siguiente: [Capítulo 3: Fundamentos de la cámara](./Ch03-Camera-Basics.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
