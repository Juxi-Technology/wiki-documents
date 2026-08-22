---
title: Jetson Nano 직렬 통신
description: "주의: 음성 대화 모듈에는 출고 펌웨어 플래싱이 필요합니다. 음성 칩이 새 제품으로 미플래시된 경우는 불필요"
---

# Jetson Nano 직렬 통신

주의: 음성 대화 모듈에는 출고 펌웨어 플래싱이 필요합니다. 음성 칩이 새 제품으로 미플래시된 경우는 불필요

## 1. 포트 확인

USB 인터페이스를 통해 Jetson Nano 메인보드에 꽂습니다.

터미널에 입력하여 ttyUSB0 장치가 나타나면 정상적으로 인식된 것입니다(보통 ttyUSB0, 다른 장치 번호일 수도 있음)

```Plain Text
ls /dev/ttyUSB*
```

![](../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/Jetson-Nano-serial-communication/1.png)

## 2. 코드 구현

speech_serial.py를 해당 디렉터리에 다운로드합니다

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

## 3. 구현 효과

알림 내용은 첨부된 命令詞播報詞協議列表V1_中文文件 을 참조하여 프로토콜을 확인할 수 있습니다.

첫 번째와 두 번째 바이트 AA 55는 프로토콜 프레임 헤더, 세 번째 바이트 00은 알림 기능, 네 번째가 알림 내용의 ID입니다. 여기서 "차량 전진"이 16진수 07임을 알 수 있으므로 프로그램에서 레지스터 0x03에 0x07을 보내면 해당 내용이 알림됩니다. 다섯 번째 바이트는 종료 프레임입니다.

![](../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/Jetson-Nano-serial-communication/2.png)

터미널에 다음 명령을 입력하여 프로그램 실행

```Plain Text
python3 -m speech_serial
```

깨우기 단어를 말해 활성화하면 콘솔이 수신 Read_ID: 0을 응답합니다

"등 끄기"라고 말하면 콘솔이 수신 Read_ID: 13을 응답합니다

![](../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/Jetson-Nano-serial-communication/3.png)

이때 첨부된 命令詞播報詞協議列表V1_中文文件 을 열어 "등 끄기"의 프로토콜을 확인할 수 있습니다

![](../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/Jetson-Nano-serial-communication/4.png)

첫 번째와 두 번째 바이트 AA 55는 프로토콜 프레임 헤더, 세 번째 바이트는 칩의 10개 기능어 ID, 네 번째가 명령어 ID입니다. 여기서 "등 끄기"가 16진수 0D, 10진수 13임을 알 수 있습니다. 다섯 번째 바이트는 종료 프레임입니다.

다른 명령어를 말하면 콘솔도 해당 명령어 ID를 출력합니다. 직접 시도해 보세요
