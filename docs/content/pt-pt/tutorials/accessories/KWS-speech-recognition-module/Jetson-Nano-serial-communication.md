---
title: Comunicação serial Jetson Nano
description: "Nota: o módulo de interação por voz precisa ser gravado com o firmware de fábrica. Se o chip de voz ainda não tiver sido gravado com firmware após o recebimento, não é necessário gravá-lo."
---

# Comunicação serial Jetson Nano

Nota: o módulo de interação por voz precisa ser gravado com o firmware de fábrica. Se o chip de voz ainda não tiver sido gravado com firmware após o recebimento, não é necessário gravá-lo. 

## 1. Verificar a porta

Conecte à placa-mãe do Jetson Nano pela interface USB. 

Ao digitar no terminal, o aparecimento do dispositivo ttyUSB0 indica reconhecimento normal (geralmente é ttyUSB0, mas pode ser outro número de dispositivo) 

```Plain Text
ls /dev/ttyUSB*
```

![1. Verificar a porta – 1](../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/Jetson-Nano-serial-communication/1.png)

## 2. Implementação do código

Baixe speech_serial.py para o diretório correspondente

```Python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import time
import serial
from typing import Optional, Tuple


class SpeechModule:
    """
    语音模块串口通信控制器
    封装了与语音模块的交互逻辑
    """
    
    # 串口配置常量
    DEFAULT_PORT = "/dev/ttyUSB0"
    DEFAULT_BAUDRATE = 115200
    
    # 命令字定义 (播报词/功能ID)
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
        """建立串口连接"""
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
        发送指令帧
        协议格式: 0xAA 0x55 0xFF [Data] 0xFB
        """
        if not self._serial_conn or not self._serial_conn.is_open:
            return

        # 构造完整的数据帧
        frame = bytes([0xAA, 0x55, 0xFF, int(cmd_id), 0xFB])
        
        self._serial_conn.write(frame)
        time.sleep(0.005)
        self._serial_conn.reset_input_buffer()  # 等同于 flushInput

    def read_response(self) -> Optional[int]:
        """
        读取并解析返回数据
        返回: Read_ID (第6个字节的数据)
        """
        if not self._serial_conn or not self._serial_conn.is_open:
            return None

        # 检查缓冲区数据量
        bytes_available = self._serial_conn.in_waiting
        if bytes_available <= 0:
            return None

        raw_data = self._serial_conn.read(bytes_available)
        hex_str = raw_data.hex()

        # 校验帧头 'aa55'
        if hex_str.startswith('aa55'):
            try:
                # 简单的索引提取逻辑 (与原代码逻辑保持一致)
                # 注意：此处假设数据长度足够，实际工业代码建议加长度校验
                # byte1 = hex_str[4:6] # 保留原逻辑中的第5字节但不使用
                byte2 = hex_str[6:8] # 提取第6字节
                
                read_id = int(byte2, 16)
                
                self._serial_conn.reset_input_buffer()
                time.sleep(0.005)
                print(f"Read_ID: {read_id}")
                return read_id
            except (IndexError, ValueError):
                pass
        
        return None

    def run(self):
        """主运行循环"""
        if not self.connect():
            return

        # 初始化模块
        self.send_command(self.CMD_INIT)
        time.sleep(0.005)

        print("[Listening] Waiting for data...")
        try:
            while True:
                self.read_response()
        except KeyboardInterrupt:
            print("\n[Stopped] Program interrupted by user.")
        finally:
            if self._serial_conn and self._serial_conn.is_open:
                self._serial_conn.close()
                print("[Disconnected] Serial port closed.")


if __name__ == "__main__":
    module = SpeechModule()
    module.run()

```

## 3. Efeito da implementação

O conteúdo da transmissão pode ser visualizado de acordo com o protocolo do ficheiro \<Lista de Protocolos de Palavras de Comando e Anúncio V1_Arquivo Chinês\> fornecido no anexo. 

Entre eles, o primeiro e o segundo bytes AA 55 representam o cabeçalho do protocolo, o terceiro byte 00 representa a função de transmissão, o quarto é o ID do conteúdo transmitido, onde podemos ver que "o carro avança" é 0x07 em hexadecimal, portanto enviar 0x07 para o registrador 0x03 no programa transmitirá o conteúdo correspondente. O quinto byte é o quadro final. 

![3. Efeito da implementação – 1](../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/Jetson-Nano-serial-communication/2.png)

Digite o seguinte comando no terminal para executar o programa 

```Plain Text
python3 -m speech_serial
```

Após dizer a palavra de ativação "Wake", o Console responderá com o Read_ID recebido: 0 

diga "Desligar a luz", e o Console responderá com Read_ID recebido: 13 

![3. Efeito da implementação – 2](../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/Jetson-Nano-serial-communication/3.png)

Neste momento, você pode abrir o anexo "Lista de Protocolos de Palavras de Comando e Anúncio V1_Arquivo Chinês" para consultar o protocolo de "Desligar a luz" 

![3. Efeito da implementação – 3](../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/Jetson-Nano-serial-communication/4.png)

Entre eles, o primeiro e o segundo bytes AA 55 representam o cabeçalho do protocolo, o terceiro byte representa o ID das dez palavras funcionais do chip, o quarto é o ID da palavra de comando, onde podemos ver que "desligar a luz" é 0D em hexadecimal e 13 em decimal. O quinto byte é o quadro final.

Se você disser outras palavras de comando, o Console também imprimirá o ID da palavra de comando correspondente. Você pode testar por conta própria. 



