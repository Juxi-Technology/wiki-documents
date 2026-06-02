# 樹莓派串口通信

注意：語音交互模塊需要燒錄出廠固件，語音芯片到手之後沒有刷過固件的則不需要 

## 1\.查看端口

通過USB接口插到樹莓派上。



終端輸入，出現ttyUSB0設備表示正常識別到了（正常都是ttyUSB0,也有可能是其他設備號）

```Plain Text
ls /dev/ttyUSB*
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ODdjZjhmOGYzZjY4M2Y4OThkYjcwODI2YzExZTJiNDRfMTc1MjY4ZTQxYThlNWIxNTEzOGQ2ZDNmZjc1NTM0NjhfSUQ6NzYzODk2MTIxOTgxMTY0MjMyMF8xNzgwNDAzODcxOjE3ODA0OTAyNzFfVjM)

## 2\.代碼實現

將speech\_serial\.py下載到對應的目錄下

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

## 3\.實現效果

播報的內容可以根據附件提供的 命令詞播報詞協議列表V1\_中文文件 查看協議。

其中第一第二個字節AA 55表示的是協議的幀頭，第三個字節00表示的是播報功能，第四個就是播報內容 的ID，這裏能看到“小車前進”是16進制的07，所以程序裏給寄存器0x03發送0x07即可播報對應內容。 第五個字節是結束幀。 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OWUyMDc0NDkwOThlNjQyMzJkYTU4NjM5MWQxMjRlYTVfYTM2NWEwZGNlOTg3YTg5MWZjZDBlZDQ2NWNmZTBkMGJfSUQ6NzYzODk2MTIyMDc1NzgxODMwNF8xNzgwNDAzODcxOjE3ODA0OTAyNzFfVjM)

終端輸入以下指令運行程序

```Plain Text
python3 -m speech_serial
```

當說出喚醒詞喚醒之後，控制檯會回覆接收Read\_ID：0

說“關燈”，控制檯會回覆接收Read\_ID：13

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NDNkZmRjMmNhODY5NGMzNTQxM2JlYmUzNzYxYWRmM2NfNWUxYzBjNThmZmJiNGIxYWUyNGJiZGNhNWU2OWRjYzhfSUQ6NzYzODk2MTIxOTY1OTA3NDUzN18xNzgwNDAzODcxOjE3ODA0OTAyNzFfVjM)

這時候可以打開附件的 命令詞播報詞協議列表V1\_中文文件 查看“關燈”的協議 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZGZhMWY0YzkyM2IxYWE3YzZhYjI5NjllZDM4NzQzMDVfZDBlOWVlZDRkODE1YTI3ZWZjNTkxZTIzZjE4ZDZmZmJfSUQ6NzYzODk2MTIxOTIzMTM3MDE4OV8xNzgwNDAzODcxOjE3ODA0OTAyNzFfVjM)

其中第一第二個字節AA 55表示的是協議的幀頭，第三個字節表示的是芯片的十個功能詞的ID，第四個就 是命令詞的ID，這裏能看到“關燈”是16進制的0D，十進制是13。第五個字節是結束幀。

說其他的命令詞，控制檯也會打印相對應得命令詞ID，可以自行嘗試



