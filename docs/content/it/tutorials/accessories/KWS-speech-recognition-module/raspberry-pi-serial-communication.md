---
title: Comunicazione seriale Raspberry Pi
description: "Nota: il modulo di interazione vocale richiede il flashing del firmware di fabbrica; se il chip vocale è nuovo e non flashato, non è necessario"
---

# Comunicazione seriale Raspberry Pi

Nota: il modulo di interazione vocale richiede il flashing del firmware di fabbrica; se il chip vocale è nuovo e non flashato, non è necessario

## 1. Verificare la porta

Collegare tramite la porta USB alla Raspberry Pi.

Inserendo nel terminale, la comparsa del dispositivo ttyUSB0 indica il riconoscimento corretto (di solito ttyUSB0, può essere anche un altro numero di dispositivo)

```Plain Text
ls /dev/ttyUSB*
```

![1. Verificare la porta – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/raspberry-pi-serial-communication/1.png)

## 2. Implementazione del codice

Scaricare speech_serial.py nella directory corrispondente

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

## 3. Risultato

Il contenuto degli annunci può essere verificato tramite il file allegato 命令詞播報詞協議列表V1_中文文件 (elenco dei protocolli di annuncio).

Il primo e il secondo byte AA 55 sono l'intestazione di trama del protocollo, il terzo byte 00 è la funzione di annuncio, il quarto è l'ID del contenuto annunciato. Qui si vede che «veicolo avanti» è 07 in esadecimale: inviare 0x07 al registro 0x03 per annunciare il contenuto corrispondente. Il quinto byte è la trama di fine.

![3. Risultato – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/raspberry-pi-serial-communication/2.png)

Eseguire il seguente comando nel terminale

```Plain Text
python3 -m speech_serial
```

Dopo la parola di attivazione, la console risponde con Read_ID: 0

Dicendo «spegnere la luce», la console risponde con Read_ID: 13

![3. Risultato – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/raspberry-pi-serial-communication/3.png)

A questo punto si può aprire il file allegato 命令詞播報詞協議列表V1_中文文件 e verificare il protocollo di «spegnere la luce»

![3. Risultato – 3](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/raspberry-pi-serial-communication/4.png)

Il primo e il secondo byte AA 55 sono l'intestazione di trama, il terzo byte è l'ID delle dieci parole di funzione del chip, il quarto è l'ID della parola di comando. Qui si vede che «spegnere la luce» è 0D in esadecimale, cioè 13 in decimale. Il quinto byte è la trama di fine.

Dicendo altre parole di comando, la console stampa anche l'ID corrispondente – può provare lei stesso
