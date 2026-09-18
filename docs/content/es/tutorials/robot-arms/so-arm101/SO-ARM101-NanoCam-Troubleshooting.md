---
title: "Solución de problemas de teleoperación"
description: "Recopilación de los fallos más comunes de la teleoperación inalámbrica del SO-ARM101 (versión ESP32-NanoCam): síntomas."
---

# Solución de problemas de teleoperación

> **[Comprar en la tienda](https://www.juxitech.com/es/products/so-arm101-developers-kit)**

Esta página recopila la resolución de los problemas más comunes de la teleoperación inalámbrica del SO-ARM101 en su versión ESP32-NanoCam. Para el flujo de trabajo completo, consulte [Teleoperación inalámbrica SO-ARM101 (versión ESP32-NanoCam)](./SO-ARM101-NanoCam-Wireless-Teleop.md).

## Consulta rápida de problemas generales

| Síntoma | Comprobación |
|---|---|
| No se puede conectar al grabar | Entrar manualmente en modo de descarga (BOOT + reset); añadir `upload_port` en `platformio.ini` |
| Sin salida por el puerto serie tras grabar | Comprobar el cable USB y el driver CH340; en Windows, ver el puerto COM en el Administrador de dispositivos |
| Se queda en `Waiting for micro-ROS Agent...` | Comprobar AGENT_IP / UDP 8888 / aislamiento de clientes |
| El bus de servos no responde (`servo_mask≠0x3f`) | Confirmar la conexión a P2-7/P2-8 a través del UART de la placa controladora de servos; el brazo seguidor con alimentación externa de 12V 5A |
| Nivel del micrófono siempre 0 | Ver el registro `audio: ES8311 ready`; pull-up del I2C 41/42; soplar hacia el micrófono para verificarlo |
| Altavoz sin sonido | Comprobar la conexión del altavoz; registro de volumen `R_DAC32` del ES8311 (el firmware actual ya lo tiene al máximo, 0xFF) |
| El WiFi se corta con frecuencia | Comprobar la antena y la distancia; el RGB en rojo indica pérdida de WiFi y el reinicio automático tras 10 s |

## Problemas de grabación y puerto serie

- **No se puede conectar al grabar**: mantenga pulsada la tecla BOOT (GPIO0) → enchufe el USB (o pulse el reinicio) → suelte BOOT y vuelva a ejecutar upload de inmediato. En Windows, si el puerto serie no se detecta automáticamente, añada una línea `upload_port = COM3` en `[env:nano_cam]` de `platformio.ini` (sustituya COM3 por el número COM real del CH340 en el Administrador de dispositivos).
- **Sin salida por el puerto serie tras grabar**: el USB del NanoCam es CH340K → UART0; en Linux el nombre del dispositivo es `/dev/ttyUSB0`; si al conectarlo no se reconoce, compruebe el cable USB y el driver del CH340 (incluido en el kernel).
- **El bus de servos no responde (`servo_mask≠0x3f`)**: confirme que el bus de servos está conectado a **P2-7/P2-8** (GPIO19/20) a través del UART de la placa controladora de servos, y no a los pines 43/44 del UART0; el brazo seguidor debe alimentarse externamente con 12V 5A (el USB no puede con 6 servos).
- **Confusión entre el bus de servos y el puerto serie de depuración**: el puerto de depuración es el USB-C (CH340K → UART0), totalmente independiente del bus de servos; ambos pueden usarse a la vez.

## Problemas de compilación y toolchain

- **La primera ejecución de `pio run` descarga despacio o se atasca** (la primera vez se descargan en orden la plataforma espressif32, el toolchain `toolchain-xtensa-esp32s3` de unos 100 MB y el framework Arduino de unos 200 MB): la estimación de tiempo restante de PlatformIO es inexacta; a menudo se queda atascado un rato y de repente termina; espere 5 minutos y observe si el porcentaje avanza; puede activar un proxy/VPN (usa el proxy del sistema);
- **Descarga manual del toolchain**: descargue en el navegador `https://dl.espressif.com/dl/xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-win32.zip` (en Linux, el equivalente `-linux-amd64.tar.gz`), descomprímalo, renombre la carpeta a `toolchain-xtensa-esp32s3`, colóquela en `C:\Users\<usuario>\.platformio\packages\` y vuelva a ejecutar `pio run`; interrumpir con Ctrl+C a mitad no daña el entorno y al reejecutar se reanuda la descarga;
- **En Windows, el comando `pio` no se encuentra en Git Bash**: use una terminal PowerShell/CMD, o añada `C:\Users\<usuario>\.platformio\penv\Scripts` al PATH.

## Solución de problemas específica de la cámara

| Síntoma | Causa raíz | Solución |
|---|---|---|
| `i2c driver install error` + `camera probe failed` | **Conflicto de I2C**: el ES8311 usa `Wire1` y ocupa GPIO41/42; el SCCB de la cámara intenta instalar de nuevo el driver I2C y es rechazado | Añadir `Wire1.end()` al final de `init()` en `audio_es8311.cpp` para liberar el I2C en favor de la cámara |
| `JPEG format is not supported on this sensor` (0x106) | **El GC2145 no tiene codificador JPEG por hardware** (solo lo tienen los OV2640/OV5640) | Cambiar la captura a `PIXFORMAT_RGB565` y codificar a JPEG por software con `frame2jpg` para `/stream` y `/jpg` |
| `/jpg` y `/stream` no responden, el navegador gira sin parar | **Desbordamiento de pila de httpd**: la pila predeterminada de 8 KB no admite la codificación por software `frame2jpg` | `config.stack_size = 16384` en `start_server()` |
| `/stream` se abre pero la pantalla está negra | **Falta el límite multipart**: no se envía `STREAM_BOUNDARY` entre fotogramas y el navegador no puede analizarlos | Enviar `STREAM_BOUNDARY` antes de cada fotograma |
| Probar `/jpg` con curl devuelve `HTTP:000`, pero el navegador sí muestra la imagen | esp_http_server es de **una sola tarea**: mientras `/stream` ocupa la tarea httpd, `/jpg` no puede atender; o el tiempo de espera de curl es demasiado corto | Cerrar `/stream` y probar `/jpg` por separado; verificar con el navegador en lugar de curl |
| La cámara se inicializa correctamente pero la imagen es negra / no hay fotogramas | Suele ser **hardware**: alimentación AVDD/DOVDD, nivel de PWDN, contacto del cable flexible | Probar primero una instantánea con `/jpg` en el navegador (si sale imagen, el enlace funciona); comprobar la alimentación de 2.8V de la cámara y el cable flexible |
| Aproximadamente los 2/3 inferiores de la imagen en VGA muestran artefactos | **Tasa de datos DVP demasiado alta**: VGA RGB565 supera el margen de temporización de muestreo del DVP de esta placa (se reproduce con 24/20/16 MHz × búfer simple/doble); con QVGA es normal | Usar **QVGA 320×240** como configuración oficial (suficiente para FPV), o cambiar a un XCLK más estable / modificar el ruteado del hardware DVP |

> Nota: los cuatro primeros puntos de la tabla ya están corregidos en el firmware incluido; basta con grabar el firmware más reciente, sin necesidad de modificar el código manualmente.

**Atención**: esp_http_server es de una sola tarea; `/stream` y `/jpg` no pueden usarse a la vez: con `/stream` abierto, `/jpg` se queda colgado indefinidamente. Cierre la página del flujo antes de capturar un fotograma.

## Solución de problemas específica de audio

| Síntoma | Causa raíz | Solución |
|---|---|---|
| Altavoz **completamente en silencio** + nivel del micrófono ≈ 0 (p. ej. `0.0009`) | **El MCLK no se emite**: el driver I2S legacy no genera MCLK en el ESP32-S3 y el DAC/ADC interno del ES8311 se queda sin reloj | Generar un **MCLK de 6.15 MHz con LEDC en GPIO39** (`start_ledc_mclk()` en `audio_es8311.cpp`) |
| Tono de aviso **demasiado bajo** (solo se oye con el oído pegado) | Amplitud digital baja + volumen maestro del ES8311 bajo | Amplitud de `play_tone` 12000→30000, `R_DAC32` 0x30→0xFF (unos +29 dB) |
| Al encender solo suenan los "bips" de arranque y ningún otro tono | **Comportamiento normal**: los tonos de listo/desbloqueo están dirigidos por eventos y solo se disparan al ejecutar la teleoperación | Tono de arranque = suena al encender; tono de listo = al establecerse la comunicación con el agente; tono de desbloqueo = al recibir un comando de control |

> Nota: los dos primeros puntos ya están corregidos en el firmware incluido; el tercero es un comportamiento normal y no requiere ninguna acción.

## Comprobaciones de hardware del micrófono, el altavoz y el RGB

- **El nivel del micrófono siempre es 0**: compruebe el registro `audio: ES8311 ready`; confirme que el MCLK se emite (en GPIO39 debería haber ~1.65V, generado por LEDC); pull-up del bus I2C 41/42 (la placa ya incorpora 10K); sople hacia el micrófono y observe si `/follower_audio/level` fluctúa.
- **El altavoz no suena**: confirme que el altavoz del NS4150B está conectado al conector de altavoz; confirme que el MCLK de GPIO39 se emite (LEDC, `start_ledc_mclk()`); registro de volumen `R_DAC32` (actualmente 0xFF); si el ES8311 no se inicializa, el registro por puerto serie imprimirá el motivo del fallo.
- **El LED RGB no se enciende**: el pin de datos del WS2812 es GPIO18; compruebe si en el registro de arranque del firmware aparece un error de inicialización de RMT antes de `camera_stream` (normalmente no ocurre).

## Problemas de red y micro-ROS

- **Se queda en `Waiting for micro-ROS Agent...`**: compruebe en orden si `AGENT_IP` contiene la IP de red local de la computadora con Ubuntu, si el UDP 8888 está permitido y si el router/punto de acceso tiene activado el aislamiento de clientes (hay que desactivarlo). La antena del NanoCam es una antena U.FL en el módulo; si el RSSI es bajo, revise primero la antena y su colocación; se recomienda hacer pruebas reales de distancia a 5/10/20/30 metros.
- **El WiFi se corta con frecuencia**: compruebe la antena y la distancia; el RGB en rojo indica pérdida de WiFi y el firmware se reinicia automáticamente tras un tiempo de espera de 10 s.
- **Si no hay conectividad, confirme primero el entorno**: el NanoCam y la computadora con Ubuntu deben estar en la misma red local de 2.4 GHz (sirve el punto de acceso del móvil); si ha cambiado de red, recuerde actualizar también `AGENT_IP` y la configuración del WiFi (véase la sección "Configurar WiFi" del tutorial de teleoperación inalámbrica).

<RelatedProducts slugs="so-arm101,esp32-s3-wifi-module" />
