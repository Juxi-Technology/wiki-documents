---
title: Tutorial de tarjeta de sonido USB sin controlador
description: "Tutorial de la tarjeta de sonido USB sin controlador JUXI: software de prueba, comandos y depuración de audio – Raspberry Pi, Jetson, PC, etc."
---

# Tutorial de tarjeta de sonido USB sin controlador

> **[Comprar en la tienda](https://www.juxitech.com/es/products/usb-2-0-driver-free-sound-card-onboard-mic-speaker-for-ai-voice-interaction)**


# Software de prueba visual (Windows)

[audio_tools.7z](https://juxitech.feishu.cn/wiki/Wuc3wAppNi5elfkSI6VccrNDnfE)

**Resumen de comandos (se puede omitir)

- Actualizar el sistema e instalar herramientas:

    - Ejecutar: `sudo apt update && sudo apt full-upgrade`

    - Instalar ALSA: `sudo apt install alsa-base alsa-utils`

- Identificar el hardware:

    - Listar dispositivos de audio: `aplay -l`

    - Ver dispositivos de audio PCI/USB: `lspci | grep -i audio`、`lsusb`

- Configuración y verificación básica:

    - Ejecutar el asistente de configuración: `sudo alsaconf` (si está disponible)

    - Ajustar el volumen: `alsamixer` (**M** para desactivar el silencio, flechas para el volumen, ESC para salir)

    - Guardar la configuración: `sudo alsactl store`

    - Prueba de reproducción: probar la salida de audio (altavoces / auriculares conectados):

```Bash
# Reproducir tono de prueba; -D especifica la tarjeta USB (X = número card de aplay -l)
speaker-test -c 2 -D plughw:X,0
```

- Reiniciar el servicio de audio: `sudo systemctl restart alsa` (en algunos entornos puede requerir reinicio: `sudo reboot`)

# Serie Jetson y sistema Ubuntu y Raspberry Pi

## Depuración por línea de comandos

### 1. Conectar la tarjeta de sonido USB

1. Antes de insertar la tarjeta de sonido USB, ver los dispositivos USB con `lsusb`:

![1. Conectar la tarjeta de sonido USB – 1](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/1.png)

2. Insertar la tarjeta de sonido USB y volver a ejecutar `lsusb`: el dispositivo adicional es la tarjeta de sonido USB:

![1. Conectar la tarjeta de sonido USB – 2](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/10.png)

3. `arecord -l` lista todos los dispositivos de grabación; ahí se ve nuestra tarjeta de sonido USB:

![1. Conectar la tarjeta de sonido USB – 3](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/2.png)

4. `aplay -l` lista todos los dispositivos de reproducción:

![1. Conectar la tarjeta de sonido USB – 4](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/3.png)

### 2. Usar la tarjeta de sonido USB

Si `arecord -l` muestra por ejemplo UACDemoV1.0, esa es nuestra tarjeta de sonido. Si es card 0; device 0, en el comando se cambia a plughw:0,0 para designar ese dispositivo de grabación:

![2. Usar la tarjeta de sonido USB – 1](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/4.png)

Ejecutar el comando de grabación nativo de Linux para grabar 5 segundos y probar:

`arecord -D plughw:0,0 -f S16_LE -r 16000 -d 5 -t wav test.wav`

Aquí `plughw:0,0` significa `card 0, device 0`, es decir, nuestra tarjeta de sonido USB; hay que ajustarlo según el número de dispositivo de `arecord -l`. Si UACDemoV1.0 aparece como card 1; device 1, habrá que cambiar `plughw:0,0` a `plughw:1,1`. El parámetro `plughw` proporciona conversión automática de formato y sirve de puente entre diferentes formatos de datos y hardware. Otros parámetros de arecord:

|Comando|Significado|Significado en este comando|
|---|---|---|
|-D|Seleccionar nombre del dispositivo|Usar la tarjeta de sonido USB externa "plughw:1.0"|
|-f|Formato de grabación|S16_LE = entero con signo de 16 bits en little-endian|
|-r|Frecuencia de muestreo|16000 = muestreo de 16 kHz|
|-d|Duración de grabación|Grabar 5 segundos|
|-t|Formato de grabación|Formato wav|
|test.wav|Nombre de archivo (puede incluir ruta)|El archivo se llama test.wav|

Si el sonido es muy bajo, ejecutar `alsamixer` y pulsar `F6` para seleccionar la tarjeta de sonido USB:

![2. Usar la tarjeta de sonido USB – 2](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/5.png)

Luego pulsar `F5` para mostrar los dispositivos de grabación y reproducción. Subir el volumen de grabación con la flecha hacia arriba. PCM es reproducción, CAPTURE MIC es grabación:

![2. Usar la tarjeta de sonido USB – 3](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/6.png)

Después, reproducir con el comando `aplay`:

`aplay -D plughw:0,0 -f S16_LE -r 16000 -c 1 test.wav`

Explicación de parámetros:

- -D plughw:0,0: especifica el dispositivo de grabación. plughw:0,0 = primer dispositivo de la primera tarjeta de sonido.

- -f S16_LE: establece el formato del archivo de audio. S16_LE = entero con signo de 16 bits en little-endian (Signed 16-bit Little Endian), un formato de datos de audio común; "little-endian" significa que el byte bajo se almacena en la dirección baja de la memoria.

- -r 16000: establece la frecuencia de muestreo.

- -c 1: establece el número de canales.

- -d 5: establece la duración de grabación en segundos.

## Visualización con PulseAudio

![Visualización con PulseAudio – 1](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/7.png)

Ver PulseAudio por [línea de comandos](https://so.csdn.net/so/search?q=%E5%91%BD%E4%BB%A4%E8%A1%8C&spm=1001.2101.3001.7020):

`pactl list sources short`            # Lista todas las fuentes de audio disponibles del servidor PulseAudio

![Visualización con PulseAudio – 2](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/8.png)

> 49 representa el índice de la fuente
>
> Alsa _input.usb indica un dispositivo de entrada USB, es decir, un micrófono
>
> s16le es el formato de muestreo de audio de 16 bits con signo en little-endian.
>
> 1ch indica mono.
>
> 48000Hz es la frecuencia de muestreo, 48000 muestras por segundo
>
> SUSPENDED indica que el micrófono está suspendido
>
> RUNNING indica que el micrófono está en uso

## Llamar a la tarjeta de sonido USB sin controlador desde Python

Buscar ejemplos de código, por ejemplo «[Python调用USB免驱声卡](https://blog.csdn.net/weixin_44463519/article/details/157463731?spm=1001.2101.3001.6650.3&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EYuanLiJiHua%7ECtr-3-157463731-blog-105694458.235%5Ev43%5Epc_blog_bottom_relevance_base9&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EYuanLiJiHua%7ECtr-3-157463731-blog-105694458.235%5Ev43%5Epc_blog_bottom_relevance_base9&utm_relevant_index=4)»

## Resumen de problemas

### Jetson

1. Dispositivo ocupado

![Jetson – 1](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/9.png)

Cerrar la página de configuración y volver a ejecutar el comando

Si no funciona, desconectar y volver a conectar, o reiniciar

Ver qué proceso ocupa el dispositivo de audio:

`sudo lsof /dev/snd/*`

Antes de insertar la tarjeta de sonido:

![Jetson – 2](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/1.png)

Después de insertar la tarjeta de sonido:

![Jetson – 3](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/10.png)

Matar el proceso `kill -9 PID`, donde PID es el que aparece tras insertar la tarjeta (33739 en la captura)

Luego volver a grabar y reproducir

### Raspberry Pi

1. Mucho ruido

```Plain Text
Primero poner el volumen del micrófono en 100
Abrir una terminal
$ sudo vi /boot/config.txt    #o quizás /boot/firmware/config.txt
Añadir al final del archivo
audio_pwm_mode = 2
ESC, escribir :wq para guardar y salir
Luego reiniciar
$ reboot
```

2. La configuración de volumen se reinicia al arrancar

Después de volver a ajustar el volumen,

hay que guardar la configuración actual en el archivo de configuración predeterminado del sistema

Ejecutar los siguientes comandos para persistir la configuración:

```Bash
sudo chmod 664 /var/lib/alsa/asound.state
sudo alsactl store
```

### Máquina virtual Ubuntu

1. Ruido al grabar

Solución: cambiar la compatibilidad del controlador USB a 3.0 o 3.1

# RDK x3&x5

## Comprobar el número de dispositivo

Comprobar si existe la tarjeta de sonido y su número de dispositivo.

Con `cat /proc/asound/cards` comprobar si la tarjeta de sonido está registrada:

```Shell
0 [duplexaudio    ]: simple-card - duplex-audio
                      duplex-audio
```

Con `cat /proc/asound/devices` comprobar los dispositivos lógicos:

```Shell
root@ubuntu:~# cat /proc/asound/devices
  2: [ 0- 0]: digital audio playback
  3: [ 0- 0]: digital audio capture
  4: [ 0]   : control
 33:        : timer
```

Con `ls /dev/snd/` comprobar los archivos de dispositivo reales en espacio de usuario:

```Shell
root@ubuntu:~# ls /dev/snd/
by-path/   controlC0  pcmC0D0c   pcmC0D0p   timer
```

Con estas comprobaciones se confirma: la tarjeta de sonido 0 es la tarjeta integrada; los dispositivos existen y su número es `0-0`. Los dispositivos que realmente operamos son `pcmC0D0p` y `pcmC0D0c`.

## Grabar 5 segundos de sonido para probar

`arecord -D plughw:0,0 -f S16_LE -r 16000 -d 5 -t wav test.wav`

Aquí `plughw:0,0` significa `card 0, device 0`, es decir, nuestra tarjeta de sonido USB. `plughw` proporciona conversión automática de formato y sirve de puente entre diferentes formatos de datos y hardware. Otros parámetros de arecord:

|Comando|Significado|Significado en este comando|
|---|---|---|
|-D|Seleccionar nombre del dispositivo|Usar la tarjeta de sonido USB externa "plughw:1.0"|
|-f|Formato de grabación|S16_LE = entero con signo de 16 bits en little-endian|
|-r|Frecuencia de muestreo|16000 = muestreo de 16 kHz|
|-d|Duración de grabación|Grabar 5 segundos|
|-t|Formato de grabación|Formato wav|
|test.wav|Nombre de archivo (puede incluir ruta)|El archivo se llama test.wav|

Si el sonido es muy bajo, ejecutar `alsamixer` y pulsar `F6` para seleccionar la tarjeta de sonido USB:

![Grabar 5 segundos de sonido para probar – 1](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/2.png)

Luego pulsar `F5` para mostrar los dispositivos de grabación y reproducción. Subir el volumen de grabación con la flecha hacia arriba. PCM es reproducción, CAPTURE MIC es grabación:

![Grabar 5 segundos de sonido para probar – 2](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/3.png)

Después, reproducir con el comando `aplay`:

`aplay -D plughw:0,0 -f S16_LE -r 16000 -c 1 test.wav`

Explicación de parámetros:

- -D plughw:0,0: especifica el dispositivo de grabación. plughw:0,0 = primer dispositivo de la primera tarjeta de sonido.

- -f S16_LE: establece el formato del archivo de audio. S16_LE = entero con signo de 16 bits en little-endian (Signed 16-bit Little Endian), un formato de datos de audio común; "little-endian" significa que el byte bajo se almacena en la dirección baja de la memoria.

- -r 16000: establece la frecuencia de muestreo.

- -c 1: establece el número de canales.

- -d 5: establece la duración de grabación en segundos.

## Preguntas frecuentes

### ¿Cómo distinguir la tarjeta de sonido USB de la tarjeta integrada en una placa RDK?

### ¿Cómo hacer que la subplaca de audio de la serie RDK X3 coexista con la tarjeta de sonido USB y se usen a la vez?

### ¿Cómo activar las funciones de audio del RDKS100 mediante la interfaz gráfica?

Consultar [Procesamiento y aplicación multimedia RDK](https://developer.d-robotics.cc/rdk_doc/FAQ/multimedia#usb-%E5%A3%B0%E5%8D%A1%E5%92%8C%E6%9D%BF%E8%BD%BD%E5%A3%B0%E5%8D%A1%E5%A6%82%E4%BD%95%E5%8C%BA%E5%88%86%E4%BD%BF%E7%94%A8)

# Comprobar el controlador de audio básico

Si la tarjeta de sonido USB sin controlador funciona depende **fundamentalmente del kernel**

- ¿Está habilitado el soporte de USB Audio Class (es decir, `CONFIG_USB_AUDIO`)?

- ¿Está cargado el módulo del kernel correspondiente (por ejemplo, `snd-usb-audio`)?

Si el kernel lo soporta, basta con instalar las herramientas de audio básicas; si el kernel está recortado, habrá que recompilarlo para habilitar el controlador.

**Paso 1: comprobar si el kernel soporta snd_usb_audio**

```Plain Text
# Método 1: comprobar si el módulo del controlador está cargado
lsmod | grep snd_usb_audio

# Método 2: comprobar si el módulo está integrado en el kernel (aunque no esté cargado)
modinfo snd_usb_audio  # con salida = el kernel lo soporta; sin salida = el kernel no incluye el módulo
```

**Si `modinfo` no da salida**: el kernel del sistema eliminó este controlador; hay que recompilar el kernel y activar en `.config`:

```Plain Text
CONFIG_SND_USB_AUDIO=m  # compilar como módulo, o =y para integrarlo en el kernel
CONFIG_SND_USB_UA101=y
CONFIG_SND_USB_CAIAQ=y
```

**Si `modinfo` da salida**: cargar el módulo directamente:

```Bash
sudo modprobe snd_usb_audio
```

#### Paso 2: instalar las herramientas de audio básicas (ausentes por defecto en la versión ligera)

Los sistemas ligeros normalmente no tienen `alsa-utils`; hay que instalarlos manualmente:

```Bash
# Sistemas Ubuntu/Debian
sudo apt update && sudo apt install -y alsa-utils usbutils

# Sin red: descargar el paquete offline de alsa-utils e instalarlo con dpkg -i
```

#### Paso 3: verificar el reconocimiento y funcionamiento de la tarjeta de sonido USB

1. Insertar la tarjeta de sonido USB y comprobar el reconocimiento:

```Bash
# Ver la enumeración USB
lsusb | grep -i audio

# Listar dispositivos de audio
aplay -l
```

Si en la salida aparece una entrada `card X` relacionada con `USB Audio`, el reconocimiento fue exitoso.

2. Probar la salida de audio (altavoces / auriculares conectados):

```Bash
# Reproducir tono de prueba; -D especifica la tarjeta USB (X = número card de aplay -l)
speaker-test -c 2 -D plughw:X,0
```

#### Paso 4: (opcional) instalar un servicio de audio (para escritorio / reproducción en segundo plano)

Para reproducir en segundo plano o con entorno de escritorio, en versiones ligeras hay que instalar un servicio de audio adicional:

```Bash
# Servicio ligero (recomendado, funciona sin escritorio)
sudo apt install -y pulseaudio

# o PipeWire (recomendado en Ubuntu 22.04+)
sudo apt install -y pipewire pipewire-alsa
```

### Problemas comunes de los sistemas ligeros y soluciones

**1. Permisos insuficientes: el usuario normal no puede acceder a la tarjeta de sonido**

Solución: añadir el usuario al grupo `audio`, efectivo tras reiniciar:

```Bash
sudo usermod -aG audio $USER
```

2.**Sin sonido, pero el dispositivo se reconoce correctamente**

Solución: subir el volumen con `alsamixer` y quitar el silencio (tecla **M**):

```Bash
alsamixer -c X  # X = número card de la tarjeta de sonido USB
```

3.**Kernel demasiado antiguo para tarjetas USB modernas – dos casos**

```Bash
sudo apt install -y linux-generic && sudo reboot
```

```Bash
sudo modprobe snd-hda-intel model=generic #(probar distintos valores según el modelo)
# Crear el archivo de configuración del controlador
sudo echo "options snd-hda-intel model=generic" > /etc/modprobe.d/sound.conf
sudo reboot
```


---

## Repositorio oficial

Repositorio open source de la tarjeta de sonido USB sin controlador JUXI: [GitHub](https://github.com/Juxi-Technology/Driver-Free-Sound-Card)

Plug-and-play, compatible con Raspberry Pi, Jetson, PC, etc. Sin controlador adicional: el sistema la reconoce automáticamente como dispositivo de entrada/salida de audio.
