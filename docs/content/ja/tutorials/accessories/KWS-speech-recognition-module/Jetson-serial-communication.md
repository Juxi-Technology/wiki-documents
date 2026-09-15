---
title: "Jetson シリアル通信"
description: "KWS 音声認識モジュールの Jetson シリアル通信チュートリアル。メインボードへの接続確認から制御プログラムの実装までを解説します。"
---

# Jetson シリアル通信

注意：音声対話モジュールには工場出荷ファームウェアの書き込みが必要です。音声チップが未書き込みの場合は不要

## 1.ポートの確認

USBインターフェースを介してJetsonメインボードに挿します。

ターミナルに入力すると、ttyUSB0デバイスが表示されれば正常に認識されています（通常はttyUSB0、他のデバイス番号の場合もあります）

```Plain Text
ls /dev/ttyUSB*
```

![1.ポートの確認 – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/Jetson-serial-communication/1.png)

## 2.コード実装

speech_serial.pyを対応するディレクトリにダウンロードします

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

## 3.実装効果

播報の内容は、添付の 命令詞播報詞協議列表V1_中文文件 を参照してプロトコルを確認できます。

1つ目と2つ目のバイトAA 55はプロトコルのフレームヘッダ、3つ目のバイト00は播報機能、4つ目が播報内容のIDです。ここで「車前進」が16進数の07であることがわかるので、プログラムでレジスタ0x03に0x07を送信すると対応する内容が播報されます。5つ目のバイトは終了フレームです。

![3.実装効果 – 1](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/Jetson-serial-communication/2.png)

以下のコマンドをターミナルに入力してプログラムを実行します

```Plain Text
python3 -m speech_serial
```

ウェイクワードを話して起動すると、コンソールが受信Read_ID：0を返します

「関灯（ライトオフ）」と言うと、コンソールが受信Read_ID：13を返します

![3.実装効果 – 2](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/Jetson-serial-communication/3.png)

このとき添付の 命令詞播報詞協議列表V1_中文文件 を開いて「関灯」のプロトコルを確認できます

![3.実装効果 – 3](../../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/Jetson-serial-communication/4.png)

1つ目と2つ目のバイトAA 55はプロトコルのフレームヘッダ、3つ目のバイトはチップの10個の機能語のID、4つ目が命令語のIDです。ここで「関灯」が16進数の0D、10進数で13であることがわかります。5つ目のバイトは終了フレームです。

他の命令語を話すと、コンソールも対応する命令語IDを出力します。ご自身で試してみてください
