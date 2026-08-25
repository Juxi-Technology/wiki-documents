---
title: Comunicación serie Raspberry Pi
description: "Nota: el módulo de interacción de voz requiere flashear el firmware de fábrica; si el chip de voz es nuevo y no se ha flasheado, no es necesario"
---

# Comunicación serie Raspberry Pi

Nota: el módulo de interacción de voz requiere flashear el firmware de fábrica; si el chip de voz es nuevo y no se ha flasheado, no es necesario

## 1. Comprobar el puerto

Conectar a través del puerto USB a la Raspberry Pi.

Al introducir en el terminal, la aparición del dispositivo ttyUSB0 indica que se ha reconocido correctamente (normalmente ttyUSB0, también puede ser otro número de dispositivo)

```Plain Text
ls /dev/ttyUSB*
```

![](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/raspberry-pi-serial-communication/1.png)

## 2. Implementación del código

Descargar speech_serial.py al directorio correspondiente

```Python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import time
import serial
from typing import Optional, Tuple


class SpeechModule:
    """
    Serial communication controller for the speech module
    Encapsulates the interaction logic with the speech module
    """

    # Serial port configuration constants
    DEFAULT_PORT = "/dev/ttyUSB0"
    DEFAULT_BAUDRATE = 115200

    # Command word definitions (announcement words / function IDs)
    CMD_THIS_RED = 0x60
    CMD_THIS_GREEN = 0x61
    CMD_THIS_YELLOW = 0x62
    CMD_RECOGNIZE_YELLOW = 0x63
    CMD_RECOGNIZE_GREEN = 0x64
    CMD_RECOGNIZE_BLUE = 0x65
    CMD_RECOGNIZE_RED = 0x66
    CMD_INIT = 0x67

    def __init__(self, port: str = DEFAULT_PORT, baudrate: int = DEFAULT_BAUDRATE):
        self._port = port
        self._baudrate = baudrate
        self._serial_conn: Optional[serial.Serial] = None

    def connect(self) -> bool:
        """Establish serial connection"""
        try:
            self._serial_conn = serial.Serial(self._port, self._baudrate, timeout=0.1)
            if self._serial_conn.is_open:
                print(f"[Connected] Speech Serial Opened! Baudrate={self._baudrate}")
                return True
            return False
        except serial.SerialException as e:
            print(f"[Error] Speech Serial Open Failed: {e}")
            return False

    def send_command(self, cmd_id: int) -> None:
        """
        Send command frame
        Protocol format: 0xAA 0x55 0xFF [Data] 0xFB
        """
        if not self._serial_conn or not self._serial_conn.is_open:
            return

        # Build the complete data frame
        frame = bytes([0xAA, 0x55, 0xFF, int(cmd_id), 0xFB])

        self._serial_conn.write(frame)
        time.sleep(0.005)
        self._serial_conn.reset_input_buffer()  # Same as flushInput

    def read_response(self) -> Optional[int]:
        """
        Read and parse the returned data
        Returns: Read_ID (data from the 6th byte)
        """
        if not self._serial_conn or not self._serial_conn.is_open:
            return None

        # Check the bytes available in the buffer
        bytes_available = self._serial_conn.in_waiting
        if bytes_available <= 0:
            return None

        raw_data = self._serial_conn.read(bytes_available)
        hex_str = raw_data.hex()

        # Verify frame header 'aa55'
        if hex_str.startswith('aa55'):
            try:
                # Simple index extraction logic (kept consistent with the original code)
                # Note: assumes enough data; production code should add length validation
                # byte1 = hex_str[4:6] # keep the 5th byte from the original logic but unused
                byte2 = hex_str[6:8] # Extract the 6th byte

                read_id = int(byte2, 16)

                self._serial_conn.reset_input_buffer()
                time.sleep(0.005)
                print(f"Read_ID: {read_id}")
                return read_id
            except (IndexError, ValueError):
                pass

        return None

    def run(self):
        """Main run loop"""
        if not self.connect():
            return

        # Initialize the module
        self.send_command(self.CMD_INIT)
        time.sleep(0.005)

        print("[Listening] Waiting for data...")
        try:
            while True:
                self.read_response()
        except KeyboardInterrupt:
            print("
[Stopped] Program interrupted by user.")
        finally:
            if self._serial_conn and self._serial_conn.is_open:
                self._serial_conn.close()
                print("[Disconnected] Serial port closed.")


if __name__ == "__main__":
    module = SpeechModule()
    module.run()

```

## 3. Resultado

El contenido de los anuncios puede consultarse mediante el archivo adjunto 命令詞播報詞協議列表V1_中文文件 (lista de protocolos de anuncio).

El primer y segundo byte AA 55 son la cabecera de la trama del protocolo, el tercer byte 00 es la función de anuncio, el cuarto es el ID del contenido anunciado. Aquí se ve que «vehículo avanza» es 07 en hexadecimal: enviar 0x07 al registro 0x03 para anunciar el contenido correspondiente. El quinto byte es la trama de final.

![](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/raspberry-pi-serial-communication/2.png)

Ejecutar el siguiente comando en el terminal

```Plain Text
python3 -m speech_serial
```

Al decir la palabra de activación, la consola responde con Read_ID: 0

Al decir «apagar la luz», la consola responde con Read_ID: 13

![](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/raspberry-pi-serial-communication/3.png)

Entonces se puede abrir el archivo adjunto 命令詞播報詞協議列表V1_中文文件 y consultar el protocolo de «apagar la luz»

![](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/raspberry-pi-serial-communication/4.png)

El primer y segundo byte AA 55 son la cabecera de la trama, el tercer byte es el ID de las diez palabras de función del chip, el cuarto es el ID de la palabra de comando. Aquí se ve que «apagar la luz» es 0D en hexadecimal, 13 en decimal. El quinto byte es la trama de final.

Al decir otras palabras de comando, la consola también imprime el ID correspondiente – puede probarlo usted mismo
