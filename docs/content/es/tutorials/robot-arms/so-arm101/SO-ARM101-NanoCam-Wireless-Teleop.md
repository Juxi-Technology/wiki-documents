---
title: Teleoperación inalámbrica SO-ARM101 (versión ESP32-NanoCam)
description: "Solución de teleoperación inalámbrica orientada a demostraciones de competición: el brazo líder se conecta a una computadora con Ubuntu mediante LeRobot."
---

# Teleoperación inalámbrica SO-ARM101 (versión ESP32-NanoCam)

> **[Comprar en la tienda](https://www.juxitech.com/es/products/so-arm101-developers-kit)**

Este tutorial está orientado al escenario de teleoperación inalámbrica de un brazo SO-ARM101 montado en un dron para demostraciones de competición: el brazo líder se conecta a una computadora con Ubuntu mediante LeRobot; el brazo seguidor se controla con el módulo de vídeo WiFi [ESP32-S3](/es/products/esp32-s3-wifi-module) de desarrollo propio (ESP32-NanoCam, ESP32-S3 N16R8), recibe comandos por micro-ROS mediante WiFi/UDP e integra cámara FPV a bordo, micrófono, altavoz y LED de estado RGB. Si encuentra problemas, consulte la [guía de solución de problemas](./SO-ARM101-NanoCam-Troubleshooting.md).

## Introducción y arquitectura del sistema

```text
SO-ARM101 brazo líder → placa controladora de servos USB → Ubuntu 22.04 (LeRobot + ROS2 Humble + micro-ROS Agent)
                                            │  2.4 GHz Wi-Fi (misma red local)
                                            ▼
                              Controlador del brazo seguidor ESP32-NanoCam (ESP32-S3)
                                            │  1 Mbps UART (retransmitido a través de los pines UART de la placa controladora de servos)
                                            ▼
                              SO-ARM101 brazo seguidor 6 × STS3215
```

- Las acciones del operador del brazo líder → LeRobot lee el brazo líder → tópico ROS 2 `/joint_command` → el agente micro-ROS envía por UDP 8888 → ESP32-NanoCam los recibe y acciona los 6 servos;
- El brazo seguidor retransmite `/joint_states` (20 Hz) en sentido inverso, como bucle cerrado y watchdog;
- La cámara a bordo publica el flujo MJPEG `http://<IP>/stream` (FPV), que el PC puede convertir en un tópico ROS.

Reparto de roles: el brazo líder se conecta a la computadora con Ubuntu; el brazo seguidor lo controla el ESP32-NanoCam; ambos se comunican de forma inalámbrica. Funciones a bordo del firmware tras el encendido:

| Función | Implementación | Descripción |
|---|---|---|
| Teleoperación micro-ROS | `main.cpp` + `servo_bus.cpp` | Realimentación `/joint_states` a 20 Hz y recepción de comandos `/joint_command`, con mecanismos de seguridad completos integrados |
| FPV de cámara | `camera_stream.cpp` | Flujo MJPEG `http://<IP>/stream` (QVGA) |
| Micrófono | `audio_es8311.cpp` | Nivel de volumen ambiente → `/follower_audio/level` (Float32, 5 Hz) |
| Altavoz | `audio_es8311.cpp` | Tonos de aviso de arranque/listo/desbloqueo/error |
| LED de estado RGB | `rgb_status.cpp` | Arranque en rojo → WiFi en naranja → micro-ROS en verde → desbloqueo en azul; WiFi perdido en rojo |

## Lista de hardware

| Hardware | Cantidad | Descripción |
|---|---|---|
| Brazo líder SO-ARM101 | 1 | Con 6 servos STS3215 |
| Brazo seguidor SO-ARM101 | 1 | Con 6 servos STS3215 |
| Módulo ESP32-NanoCam | 1 | ESP32-S3 N16R8, con cámara/audio/RGB a bordo |
| Placa controladora de servos USB | 2 | Calibración + retransmisión del bus líder/seguidor (pines UART) |
| Computadora con Ubuntu 22.04 | 1 | Ejecuta LeRobot + ROS 2 + agente |
| Router de 2.4 GHz o punto de acceso del móvil | 1 | La computadora del brazo líder y el NanoCam en la misma red local |
| Fuente de alimentación externa de 12V 5A | 1 | **Alimentación del brazo seguidor** (el USB no puede con 6 servos) |
| Fuente de alimentación externa de 5V 6A | 1 | **Alimentación del brazo líder** (conectado a la computadora con Ubuntu) |
| Cable de datos USB-C | 2 | Alimentación/depuración del NanoCam + conexión de la placa controladora del brazo líder a la computadora |

> Periféricos a bordo del NanoCam: cámara GC2145 (DVP); audio ES8311 (I2S 24 kHz, micrófono AP2718AT + altavoz NS4150B); RGB WS2812 @ GPIO18.

## Cableado

Entre el ESP32-NanoCam y el brazo seguidor **se intermedia a través de los pines UART de la placa controladora de servos**:

```text
UART de la placa controladora de servos:   RX ←── NanoCam TX (P2-8 / GPIO20)
                   TX ──→ NanoCam RX (P2-7 / GPIO19)
                  GND ──→ NanoCam GND
```

- **TX a RX y RX a TX (cruzado)**, GND común, velocidad de 1 Mbps;
- El bus de servos del NanoCam usa UART1 y se conecta a los pines **P2-7 / P2-8** del módulo (el puerto serie de depuración va por USB-C, CH340K → UART0; ambos son totalmente independientes y pueden usarse a la vez);
- El bus de servos comparte GND con la alimentación de los servos (fuente de 12V 5A del brazo seguidor).

### Pines principales del NanoCam

| Periférico | Pin |
|---|---|
| Bus de servos (UART1) | TX=GPIO20 (P2-8 ESP_P), RX=GPIO19 (P2-7 ESP_N), cabecera P2 del módulo |
| Puerto serie de depuración (UART0) | GPIO43/44 → CH340K a bordo → USB-C (sin USB CDC nativo) |
| Cámara DVP (GC2145) | D0~D7=GPIO4/2/1/3/5/7/8/10, PCLK=6, VSYNC=13, HREF=11, XCLK=9 (24 MHz), PWDN=12, RESET=14, SCCB SDA/SCL=41/42 |
| Audio ES8311 (I2S) | MCLK=39, BCLK=38, WS=47, DIN(ADC)=40, DOUT(DAC)=48; I2C SDA/SCL=41/42, dirección 0x30 |
| Micrófono | MEMS analógico AP2718AT (a través del ADC del ES8311) |
| Altavoz | Amplificador clase D NS4150B (a través del DAC del ES8311), sin pin de habilitación de PA en la placa |
| RGB | WS2812 @ GPIO18 (1 unidad, GRB, controlado por RMT) |
| BOOT | GPIO0 |

> Las definiciones de pines provienen de `docs/reference/nano_config.h` y de la documentación del esquemático de hardware.

## Alimentación

| Dispositivo | Modo de alimentación |
|---|---|
| ESP32-NanoCam | **Alimentado por el cable de datos USB** (el puerto serie de depuración CH340K funciona al mismo tiempo) |
| Brazo seguidor (6×STS3215) | Fuente externa de **12V 5A** |
| Brazo líder (conectado a la computadora con Ubuntu) | Fuente externa de **5V 6A** |

> ⚠️ El USB no puede alimentar 6 servos: el brazo seguidor debe usar alimentación externa de 12V 5A; el ESP32 se alimenta con el cable de datos USB.

## Requisitos de entorno

### Lado de compilación y grabación (Windows / Linux / macOS)

| Elemento | Requisito |
|---|---|
| Sistema operativo | Windows 10/11 o Linux (también macOS) |
| Python | 3.8+ (verificar con `python --version`) |
| PlatformIO | Core 6.x (con toolchain esp32s3 + framework Arduino) |
| Espacio en disco | Al menos 3 GB libres |
| Red | Acceso a GitHub / CDN de Espressif (la primera descarga del toolchain ocupa unos 1-2 GB) |

### Lado de ejecución (computadora con Ubuntu 22.04, donde se ejecuta la teleoperación)

| Elemento | Requisito |
|---|---|
| Sistema operativo | Ubuntu 22.04 (64 bits) |
| ROS 2 | Humble (Hawksbill) |
| LeRobot | Con soporte Feetech SO-101 (`so101_leader` / `so101_follower`) |
| Micro-ROS Agent | `snap run micro-ros-agent` o instalación desde el código fuente |
| Comandos de dependencias | `nmcli`, `ip`, `flock` (incluidos en NetworkManager, iproute2, util-linux) |
| Entorno de Python | Entorno virtual `lerobot_so101` (conda/miniforge) |

> Identificación del puerto serie de depuración: la interfaz USB del NanoCam es un CH340K convertido a UART0; en Linux el nombre del dispositivo suele ser `/dev/ttyUSB0` (o `/dev/serial/by-id/...CH340*`); PlatformIO puede identificarlo automáticamente (la definición de placa ya incluye el HWID 0x1A86:0x7523 del CH340); la velocidad del monitor serie es 115200. Para una instalación más completa del entorno LeRobot/Ubuntu, consulte el [tutorial de uso del SO-ARM101](./SO-ARM101-Tutorial.md).

## Pasos de instalación

### 1. Instalar PlatformIO (lado de compilación y grabación)

**Método A: extensión de VSCode (recomendado)**

1. Instale [VSCode](https://code.visualstudio.com/);
2. Busque **PlatformIO IDE** en la tienda de extensiones e instálelo; al terminar se reiniciará automáticamente y descargará PlatformIO Core;
3. Verifique con `pio --version` en la terminal de VSCode.

**Método B: instalación por línea de comandos**

```bash
pip install platformio
```

> En Windows, si el comando `pio` no se encuentra en Git Bash, use una terminal PowerShell/CMD, o añada `C:\Users\<usuario>\.platformio\penv\Scripts` al PATH.

### 2. Primera compilación (descarga automática del toolchain)

Entre en el directorio del firmware y ejecute una compilación (sin grabar):

```bash
cd firmware/nanocam_soarm
pio run
```

La primera vez se descargarán en orden:

1. La plataforma espressif32 (`espressif32@7.0.1`);
2. El **toolchain** `toolchain-xtensa-esp32s3` (unos 100 MB, desde el CDN de Espressif);
3. El framework Arduino `framework-arduinoespressif32` (unos 200 MB).

Si la descarga va lenta o se atasca:

- La estimación de tiempo restante de PlatformIO es inexacta; a menudo se queda atascado un rato y luego termina de golpe: espere 5 minutos y observe si el porcentaje avanza;
- Active un proxy/VPN (usa el proxy del sistema);
- Descargue el toolchain manualmente: en el navegador, `https://dl.espressif.com/dl/xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-win32.zip` (en Linux, el equivalente `-linux-amd64.tar.gz`); tras descomprimirlo, renombre la carpeta a `toolchain-xtensa-esp32s3` y colóquela en `C:\Users\<usuario>\.platformio\packages\`, y vuelva a ejecutar `pio run`;
- Interrumpir con Ctrl+C a mitad no daña el entorno; al reejecutar se reanuda la descarga.

### 3. Instalar el entorno de ejecución de Ubuntu

```bash
# 1. ROS 2 Humble (instalar según la documentación oficial)
#    https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debs.html
source /opt/ros/humble/setup.bash

# 2. LeRobot (con soporte para Feetech)
conda create -n lerobot_so101 python=3.10 -y
conda activate lerobot_so101
pip install lerobot[feetech]

# 3. micro-ROS Agent
sudo snap install micro-ros-agent
snap run micro-ros-agent udp4 --port 8888   # Probar si se puede iniciar

# 4. PlatformIO (si también se va a compilar y grabar desde Ubuntu)
pip install platformio
```

## Configurar WiFi

El PC y el NanoCam deben estar en la misma red local (WiFi de 2.4 GHz; sirve el punto de acceso del móvil), y el router/punto de acceso no debe tener activado el aislamiento de clientes. Hay dos formas de configurar el WiFi; elija una.

### Método 1: configuración en tiempo de compilación (predeterminada)

```bash
cd firmware/nanocam_soarm
cp src/wifi_config.example.h src/wifi_config.h
# Editar wifi_config.h: WIFI_SSID / WIFI_PASS / AGENT_IP (IP de red local del ordenador Ubuntu)
```

### Método 2: configuración mediante comandos por puerto serie (recomendado, sin regrabar)

El firmware incorpora configuración en tiempo de ejecución (almacenada en NVS), que puede introducirse en cualquier momento por el puerto serie de depuración (115200 baudios):

| Comando | Función |
|---|---|
| `wifi_ssid:nombre_de_tu_punto_de_acceso` | Establece y guarda el nombre del WiFi |
| `wifi_pass:tu_contraseña` | Establece y guarda la contraseña del WiFi |
| `agent_ip:IP_del_ordenador_Ubuntu` | Establece y guarda la IP del agente micro-ROS |
| `wifi_show` | Muestra la configuración activa actual |
| `wifi_clear` | Borra la configuración guardada y restaura los valores predeterminados de compilación |

Cualquier comando de configuración se guarda y **se reinicia automáticamente a los 3 segundos** para aplicarse. Prioridad: configuración guardada por puerto serie > valores predeterminados de compilación. Para cambiar de punto de acceso o de computadora basta con conectar el USB e introducir tres comandos, sin modificar el código ni regrabar.

> Los valores predeterminados de compilación (`wifi_config.h`) se conservan siempre como respaldo cuando no se ha usado la configuración por puerto serie; `wifi_show` distingue entre "procedente de NVS" y "predeterminado de compilación". La contraseña se almacena en texto plano en la NVS, algo aceptable para escenarios de demostración en red local; `wifi_config.h` contiene la contraseña del WiFi y ya está excluido por `.gitignore`: no lo suba al repositorio.

## Grabación y arranque

```bash
cd firmware/nanocam_soarm
pio run --target upload
```

**Entrar en modo de descarga (clave)**: el NanoCam se graba por el puerto serie CH340K → UART0 (no por descarga automática USB CDC). Ejecute primero `upload` directamente: si la placa tiene circuito de descarga automática, funcionará; si indica que no puede conectarse: **mantenga pulsada la tecla BOOT (GPIO0) → enchufe el USB (o pulse el reinicio) → suelte BOOT**, y vuelva a ejecutar `upload` de inmediato. En Windows, si el puerto serie no se detecta automáticamente, añada una línea `upload_port = COM3` en `[env:nano_cam]` de `platformio.ini` (sustituya COM3 por el número real del CH340 en el Administrador de dispositivos).

Ver los registros del puerto serie:

```bash
pio device monitor --baud 115200
```

Tras grabar, debería ver (en este orden):

```text
audio: ES8311 ready @24000Hz      ← audio inicializado correctamente
Servo Ping mask: 0x3f             ← los 6 servos en línea
Servo calibration match: YES      ← los datos de calibración coinciden con la EEPROM de los servos
IP: 192.168.x.x  RSSI: -xx        ← WiFi conectado
Waiting for micro-ROS Agent...    ← esperando al Agent (desaparece al iniciar el paso siguiente)
```

> El bus de servos puede dejarse vacío durante la grabación: grabar y ejecutar los servos no se estorban (UART0 de depuración y UART1 de servos son independientes). El proyecto ya incluye la biblioteca estática de micro-ROS para ESP32-S3 (xtensa-lx7), por lo que en el uso diario no hace falta compilarla.

## Notas de calibración

El directorio `cali/` del proyecto ya contiene los archivos de calibración del brazo líder y del brazo seguidor, y el arreglo de calibración del firmware ya está alineado con la calibración del brazo seguidor (es decir, `cali/follower_recal.json`). **Solo es necesario recalibrar cuando se cambia el hardware del brazo seguidor o del brazo líder.**

```bash
# Brazo seguidor
python -m lerobot.scripts.lerobot_calibrate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --robot.id=follower_recal --robot.calibration_dir="$PWD/cali"

# Brazo líder
python -m lerobot.scripts.lerobot_calibrate \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM0 \
  --teleop.id=leader_recal --teleop.calibration_dir="$PWD/cali"
```

Tras recalibrar el brazo seguidor, es obligatorio abrir `firmware/nanocam_soarm/src/servo_bus.cpp` y sustituir los tres arreglos `kHomingOffsets` / `kRangeMin` / `kRangeMax` por los valores de su propio `cali/follower_recal.json` (orden: shoulder_pan, shoulder_lift, elbow_flex, wrist_flex, wrist_roll, gripper), y después recompilar y grabar.

## Ejecutar la teleoperación inalámbrica

### Comprobaciones antes de iniciar

```bash
# 1. Conectar el ordenador Ubuntu a la misma WiFi de 2.4 GHz que la NanoCam
# 2. La placa controladora de servos USB del brazo líder está conectada y reconocida
ls -l /dev/ttyACM*   # Encontrar el puerto serie del brazo líder
# 3. La NanoCam del brazo seguidor está encendida y conectada a la red (confirmar por puerto serie o navegador que el flujo MJPEG es accesible)
```

### Inicio con un solo comando

```bash
# Configurar el entorno (o editar directamente los valores predeterminados al principio de start_soarm_demo.sh)
export SOARM_WIFI_SSID="tu punto de acceso 2.4G"
export SOARM_AGENT_IP="IP del ordenador Ubuntu"
export SOARM_LEADER_PORT="/dev/ttyACM*"
export SOARM_PYTHON="$(command -v python)"   # Entorno lerobot_so101

./start_soarm_demo.sh --check    # Comprobación previa al vuelo: red / brazo líder / Agent / brazo seguidor en línea
./start_soarm_demo.sh            # Iniciar la teleoperación; para detener, Ctrl+C
```

El script hace lo siguiente en orden:

1. Comprueba la red (el SSID debe coincidir con `EXPECTED_WIFI_SSID`), el puerto serie del brazo líder y la existencia de los archivos de calibración;
2. Inicia el agente micro-ROS (si no está en ejecución; el registro queda en `logs/micro_ros_agent.log`);
3. Espera a que el brazo seguidor publique `/joint_states` (tiempo límite de 15 s);
4. Las acciones del brazo líder → el brazo seguidor le sigue, con una frecuencia de comandos de 30 Hz y **`--mapping-mode absolute` (mapeo absoluto)**.

**Sobre el mapeo absolute**: las poses del brazo líder y del brazo seguidor se corresponden una a una en sus respectivos sistemas de coordenadas de calibración; la ventaja es que **tras una desconexión y reconexión no hay desviación acumulada**: al reconectar, el brazo seguidor se alinea suavemente con la pose actual del líder en 8 segundos (startup_blend) y, después, cuando el brazo líder vuelve a cero, el seguidor vuelve también a su propio cero. Antes se usaba el mapeo relative (relativo), pero tras desconectarse y reconectarse el seguidor permanecía en la posición de desconexión y generaba una desviación permanente respecto al líder ya en cero, por lo que se cambió a absolute.

**Reinicio automático al perder el agente** (firmware posterior al 2026-08-19): tras detener la teleoperación con Ctrl+C, el brazo seguidor se reinicia automáticamente en unos 10 segundos y vuelve a `Waiting for micro-ROS Agent...`, por lo que se puede volver a ejecutar este script directamente, sin reiniciar manualmente el brazo seguidor (durante la reconexión el brazo seguidor vuelve a la posición cero, es decir, se reenciende).

Una vez establecido el enlace, el puerto serie del brazo seguidor imprime `micro-ROS ready` (el RGB se pone verde y el altavoz emite el tono de aviso de listo) y `Waiting for micro-ROS Agent...` desaparece.

### Verificación manual de los tópicos

```bash
ros2 topic echo /joint_states --once           # Retroalimentación del brazo seguidor
ros2 topic hz /joint_states                    # Debería ser de unos 20 Hz
ros2 topic echo /follower_audio/level --once   # Nivel del micrófono (sube al hablar)
```

## Cámara FPV

Tras el encendido y la conexión a la red, el firmware inicia automáticamente el servicio de streaming MJPEG (GC2145 a bordo, interfaz DVP, puerto HTTP predeterminado 80):

```text
http://<NANOCAM_IP>/         página de información
http://<NANOCAM_IP>/jpg      un solo fotograma JPEG (instantánea)
http://<NANOCAM_IP>/stream   flujo MJPEG continuo (FPV)
```

### Parámetros y ajuste

- Resolución **QVGA 320×240** (configuración oficial), **captura RGB565 + codificación por software con `frame2jpg`** (el GC2145 no tiene codificador JPEG por hardware; solo lo tienen los OV2640/OV5640), calidad JPEG 12 y doble búfer en la **PSRAM Octal de 8 MB**;
- **Por qué se usa QVGA**: en las pruebas, la tasa de datos de VGA (640×480) RGB565 en el DVP de esta placa resultó demasiado alta y aproximadamente los 2/3 inferiores de la imagen mostraban artefactos (se reproduce con todas las combinaciones de XCLK 24/20/16 MHz × búfer simple/doble); con QVGA la imagen es completa y fluida (la tasa de fotogramas es inferior a la del JPEG por hardware, lo cual es normal);
- El streaming se ejecuta en una tarea httpd independiente (pila ajustada a 16 KB para la codificación por software) y no interfiere con la teleoperación micro-ROS ni con la captura de audio;
- Puerto HTTP predeterminado 80 (`HTTPD_DEFAULT_CONFIG()` del firmware);
- Para cambiar la resolución/calidad: edite `config.frame_size` / `kJpegQuality` en `firmware/nanocam_soarm/src/camera_stream.cpp`; la orientación de la imagen se ajusta con `set_vflip` / `set_hmirror` (en el mismo archivo);
- esp_http_server usa una sola tarea, por lo que `/stream` y `/jpg` **no pueden usarse a la vez** (con el flujo abierto, `/jpg` se queda colgado);
- Si la cámara no se inicializa correctamente, el firmware imprime una línea de aviso y sigue funcionando con normalidad; la teleoperación no se ve afectada.

Recepción en el PC (publicando como tópico ROS 2, tipo de mensaje `sensor_msgs/CompressedImage`):

```bash
# Terminal 1: iniciar la teleoperación como de costumbre
./start_soarm_demo.sh

# Terminal 2: recibir el vídeo y publicar el tema
source /opt/ros/humble/setup.bash
python3 tools/follower_camera.py --stream http://<NANOCAM_IP>/stream
# Opcional: --topic /tema personalizado  --max-fps 10

# Verificar
ros2 topic hz /follower_camera/image_raw/compressed   # Debería ser de unos 10~15 Hz
rviz2    # Add → By topic → Camera, seleccionar /follower_camera/image_raw/compressed
```

También puede verificar el enlace sin instalar ROS: abra `http://<NANOCAM_IP>/stream` en el navegador, o ejecute `curl -s http://<NANOCAM_IP>/jpg -o snap.jpg`.

## Audio (micrófono y altavoz)

**Micrófono**: MEMS analógico AP2718AT (a través del ADC del ES8311). El firmware lee el nivel de volumen ambiente cada 200 ms (RMS, normalizado de 0 a 1) y lo publica en `/follower_audio/level` (`std_msgs/Float32`, best-effort). Puede implementar por su cuenta detección de actividad de voz, monitorización ambiental, o usarlo como señal de disparo sencilla para "capturar cuando alguien habla".

```bash
ros2 topic echo /follower_audio/level
```

**Altavoz**: DAC del ES8311 → amplificador clase D NS4150B (sin pin de habilitación de PA en la placa); incluye cuatro grupos de tonos de aviso (véase la sección siguiente); para personalizar los tonos, modifique las llamadas a `play_tone()` en `audio_es8311.cpp`. El volumen está en el registro 0x32 del ES8311 (`R_DAC32`; el firmware actual ya lo tiene al máximo, 0xFF).

### Parámetros de audio y ajuste

- Frecuencia de muestreo 24 kHz, 16 bits, ranuras estéreo (igual que el firmware original del NanoCam), MCLK = 256×FS = 6.144 MHz;
- **El MCLK lo genera el LEDC** (GPIO39, 80 MHz÷13≈6.154 MHz, un error del 0.16% dentro de la tolerancia): el driver I2S legacy no emite MCLK en el ESP32-S3, lo que provoca altavoz sin sonido + nivel de micrófono siempre 0; ya se corrigió en `audio_es8311.cpp` con `start_ledc_mclk()`;
- El control del ES8311 va por I2C1 (los pines GPIO41/42 del bus físico se comparten con el SCCB de la cámara; la cámara solo usa SCCB al arrancar, por lo que no hay conflicto en tiempo de ejecución); al final de `init()`, `Wire1.end()` libera el I2C para la cámara;
- La ganancia del micrófono por defecto es la misma que la del NanoCam original (registro 0x16 = 0x24); si necesita más sensibilidad, ajuste el valor de `R_ADC16` en `audio_es8311.cpp`.

## LED de estado RGB y tonos de aviso

### Significado de los estados RGB

| Color | Estado |
|---|---|
| Rojo | Arrancando / fallo al inicializar micro-ROS / WiFi perdido |
| Naranja | WiFi conectado, esperando al agente micro-ROS |
| Verde | micro-ROS listo (enlace de teleoperación establecido) |
| Azul | Control de servos desbloqueado (ARMED) |
| Púrpura | Comando de control rechazado (handshake/límite de recorrido/paso incompatible) |

### Tonos de aviso del altavoz

| Evento | Tono de aviso |
|---|---|
| Encendido | Dos "bips" cortos (tono de arranque) |
| micro-ROS listo | Doble tono ascendente |
| Desbloqueo de servos | Doble tono ascendente |
| Fallo de inicialización | Un tono grave |

> Los tonos de aviso se disparan por eventos: el tono de arranque suena al encender, el de listo cuando se establece la comunicación con el agente y el de desbloqueo cuando se recibe un comando de control; por eso, si solo se enciende y no se ejecuta la teleoperación, solo se oye el tono de arranque.

## Mecanismos de seguridad

El firmware incorpora los siguientes mecanismos de seguridad, sin necesidad de configuración manual:

- Comprobación de identidad de los servos y de la calibración en la EEPROM;
- Handshake de la pose actual (0.05 rad);
- Límites de recorrido software; límite de paso de 0.25 rad por comando;
- Watchdog de realimentación de 0.5 s;
- Reinicio automático tras 10 s de pérdida de WiFi.

> Nota para la demostración en vuelo: tras la instalación invertida hay que volver a confirmar la dirección de las articulaciones, el centro de gravedad y el esquema de alimentación (BEC), y realizar pruebas de interferencias EMI.

## Estado de verificación

### Resultados de prueba (esperados)

- Los seis servos seguidores se reconocen todos (`servo_mask=0x3f`);
- `/joint_states` se publica a unos 20 Hz;
- El puente del control principal publica comandos a 30 Hz;
- El flujo de la cámara `http://<IP>/stream` es fluido en QVGA;
- `/follower_audio/level` se publica a 5 Hz y el nivel sube claramente al hablar;
- El LED de estado RGB cambia progresivamente: arranque→conexión a la red→listo→desbloqueo;
- Tras desconectar el cable de datos USB (el ESP32 se alimenta por separado y el brazo seguidor con fuente externa de 12V) sigue funcionando.

### Estado de desarrollo

**Verificado en placa (2026-08-19):**

- Audio `ES8311 ready @24000Hz` (salida MCLK correcta + altavoz y micrófono funcionando; se corrigieron la ausencia de MCLK y el volumen demasiado bajo);
- Conexión WiFi + comunicación micro-ROS (`/joint_states` estable a 20 Hz, `/follower_audio/level` correcto);
- FPV de la cámara GC2145: `/stream` QVGA completo y fluido (se corrigieron el conflicto I2C, la codificación por software, la pila de httpd y el límite multipart);
- Cadena completa de teleoperación (acción del brazo líder → seguimiento del brazo seguidor);
- **Mapeo absolute + reinicio automático al perder el agente**: tras desconectar y reconectar, los brazos líder y seguidor se alinean sin desviación; tras Ctrl+C, el brazo seguidor se reinicia solo y espera la reconexión.

**Aún por verificar:**

- Escenario de vuelo: orientación con instalación invertida, centro de gravedad, alimentación (BEC) e interferencias EMI.

## Estructura del proyecto y firmware avanzado

Este proyecto evolucionó el controlador del brazo seguidor de un ESP32-S3 al módulo ESP32-NanoCam de desarrollo propio (ESP32-S3 N16R8, con cámara DVP a bordo / audio ES8311 / RGB WS2812).

### Estructura de directorios

```text
firmware/nanocam_soarm/   firmware del brazo seguidor ESP32-NanoCam (PlatformIO)
  ├─ boards/nano_cam.json definición de placa de desarrollo propio (16MB Flash / 8MB Octal PSRAM)
  ├─ src/                 código fuente del firmware (teleoperación micro-ROS + cámara + audio + RGB)
  ├─ lib/microros/        biblioteca estática de micro-ROS (xtensa-lx7)
  └─ lib/scservo/         biblioteca de servos SCServo (incluida localmente, sin dependencia de red)
tools/                    scripts del PC (wireless_teleoperate.py puente de teleoperación, follower_camera.py recepción FPV)
start_soarm_demo.sh       script de inicio con un clic (comprobación previa de red/Agent/calibración + teleoperación)
cali/                     archivos de calibración del brazo líder/seguidor
docs/                     progreso del proyecto y registros de experimentos + referencia de hardware (docs/reference/)
```

### Diferencias con versiones anteriores

| Elemento | Este proyecto (ESP32-NanoCam) |
|---|---|
| Definición de placa | Propia: `boards/nano_cam.json` (16MB Flash / 8MB Octal PSRAM, qio_opi) |
| Bus de servos | Serial1/UART1, TX=20/RX=19 (UART0 lo ocupa el CH340K de depuración) |
| Puerto serie de depuración | UART0 (43/44) → CH340K → USB-C |
| Cámara | NanoCam DVP GC2145 (GPIO1~14 + 41/42), XCLK 24 MHz |
| Audio | ES8311 + micrófono AP2718AT + altavoz NS4150B (nuevo) |
| RGB | LED de estado WS2812 (nuevo) |
| Biblioteca micro-ROS | xtensa-lx7: el NanoCam también es ESP32-S3, compatible con la versión para S3 |
| Scripts del PC | Sin cambios (`tools/` y `start_soarm_demo.sh` no dependen del hardware) |

### Rutas de las cabeceras de micro-ROS y build_flags

El árbol de cabeceras de micro-ROS es plano (`include/<pkg>/<header>.h`) y solo se conserva la ruta raíz `-Ilib/microros/include`. **No** añada rutas `-Ilib/microros/include/<pkg>/` por paquete: harían que `<string.h>` se resolviera como `rosidl_runtime_c/string.h` y que `<Client.h>` de la biblioteca WiFi se resolviera como `rcl/Client.h`, lo que provoca fallos de compilación.

### Recompilar libmicroros.a (ESP32-S3 / xtensa-lx7)

> Este proyecto ya incluye la biblioteca estática para ESP32-S3 en `firmware/nanocam_soarm/lib/microros/` (el NanoCam es un ESP32-S3, así que la biblioteca es válida). **Para el uso normal, sáltese esta sección**. Solo es necesario recompilar si necesita una configuración personalizada de micro-ROS (tipos de mensaje, QoS, pool de memoria, etc.); en el desarrollo diario no hace falta recompilar `libmicroros.a`.

**Método A: generador oficial con Docker (recomendado, se puede ejecutar en cualquier máquina)**

El script de generación de la biblioteca oficial `micro_ros_arduino` de micro-ROS ya incluye el objetivo **esp32s3**:

```bash
git clone -b humble https://github.com/micro-ROS/micro_ros_arduino.git
cd micro_ros_arduino
docker pull microros/micro_ros_static_library_builder:humble
docker run -it --rm -v $(pwd):/project \
  --env MICROROS_LIBRARY_FOLDER=extras \
  microros/micro_ros_static_library_builder:humble -p esp32s3
```

El resultado queda en `src/esp32s3/libmicroros.a` y las cabeceras en los directorios de cada paquete bajo `src/`:

```bash
cp src/esp32s3/libmicroros.a <proyecto>/firmware/nanocam_soarm/lib/microros/
# Sustituir por completo los archivos de cabecera (conservar en ese directorio default_transport.cpp / wifi_transport.cpp /
# micro_ros_arduino.h, los tres archivos personalizados)
rsync -a src/* <proyecto>/firmware/nanocam_soarm/lib/microros/include/ \
  --exclude esp32s3 --exclude '*.cpp' --exclude micro_ros_arduino.h
```

**Sobre el toolchain**: la sección esp32s3 del script oficial compila por defecto con el toolchain `xtensa-esp32-elf` (LX6); LX6/LX7 son compatibles a nivel de conjunto de instrucciones para código C normal, por lo que funciona. El `libmicroros.a` incluido en este proyecto se compiló con el **toolchain LX7 auténtico** (`xtensa-esp32s3-elf` gcc 8.4.0, idéntico al que incorpora PlatformIO); el procedimiento es: descargar `xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-linux-amd64.tar.gz` (releases de crosstool-NG de Espressif), descomprimirlo, cambiar `TOOLCHAIN_PREFIX` de la sección esp32s3 en `library_generation.sh` a `/uros_ws/xtensa-esp32s3-elf/bin/xtensa-esp32s3-elf-`, montarlo en el contenedor y volver a ejecutar:

```bash
docker run --platform linux/amd64 -it --rm \
  -v $(pwd):/project \
  -v <directorio_descomprimido>/xtensa-esp32s3-elf:/uros_ws/xtensa-esp32s3-elf \
  --env MICROROS_LIBRARY_FOLDER=extras \
  microros/micro_ros_static_library_builder:humble -p esp32s3
```

> Nota: en Apple Silicon es obligatorio añadir `--platform linux/amd64` (el toolchain de esp32 incluido en la imagen es un binario x86_64 y no puede ejecutarse en un contenedor arm64).

**Método B: Ubuntu 22.04 + ROS 2 Humble + toolchain de PlatformIO**

1. Asegúrese de que PlatformIO ya ha descargado el toolchain del S3 (basta con ejecutar `pio run` una vez en el directorio del firmware):

   ```bash
   ls ~/.platformio/packages/toolchain-xtensa-esp32s3/bin/xtensa-esp32s3-elf-gcc
   ls ~/.platformio/packages/framework-arduinoespressif32/tools/sdk/esp32s3
   ```

2. Use micro_ros_setup para obtener el código fuente de micro-ROS (misma disposición de `/tmp/firmware/mcu_ws` que en `build_microros.sh`):

   ```bash
   mkdir -p /tmp/firmware && cd /tmp/firmware
   git clone -b humble https://github.com/micro-ROS/micro_ros_setup.git src/micro_ros_setup
   # Después de instalar las dependencias de micro_ros_setup:
   source /opt/ros/humble/setup.bash
   colcon build && source install/local_setup.bash
   ros2 run micro_ros_setup create_firmware_ws.sh generate_lib
   ```

3. Ejecute el script de compilación del S3 de este proyecto:

   ```bash
   cd <proyecto>/firmware/nanocam_soarm
   chmod +x build_microros_s3.sh
   ./build_microros_s3.sh
   ```

   El script ya ha cambiado riscv32 → xtensa-esp32s3, `-march=rv32imc` → `-mlongcalls` y el SDK esp32c3 → SDK esp32s3. Copie el resultado al proyecto siguiendo las indicaciones del final del script.

### Referencias

- Documentación de referencia del hardware del NanoCam (esquemático/especificaciones/definiciones de pines/driver ES8311): directorio `docs/reference/` del repositorio
- [micro-ROS](https://micro.ros.org/) / [micro_ros_arduino](https://github.com/micro-ROS/micro_ros_arduino)
- [LeRobot](https://github.com/huggingface/lerobot)

<RelatedProducts slugs="so-arm101,esp32-s3-wifi-module" />
