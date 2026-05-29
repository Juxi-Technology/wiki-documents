# Jetson Nano串口通信

注意：语音交互模块需要烧录出厂固件，语音芯片到手之后没有刷过固件的则不需要 

## 1\.查看端口

通过USB接口插到Jetson Nano主板上。

终端输入，出现ttyUSB0设备表示正常识别到了（正常都是ttyUSB0,也有可能是其他设备号）

```Plain Text
ls /dev/ttyUSB*
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZGY2NzA0ZGZkYjQ5M2ZkYWI0N2U2OTkzYWIwMzQ1MGVfODFkNzk1NWE2ZjE2YzM3ZDg2NDVhNGYxODE2ZmZiN2JfSUQ6NzYyNzA1MTcwNDI2OTc2OTkyOF8xNzgwMDU2OTM2OjE3ODAxNDMzMzZfVjM)

## 2\.代码实现

将speech\_serial\.py下载到对应的目录下

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

## 3\.实现效果

播报的内容可以根据附件提供的 命令词播报词协议列表V1\_中文文件 查看协议。

其中第一第二个字节AA 55表示的是协议的帧头，第三个字节00表示的是播报功能，第四个就是播报内容 的ID，这里能看到“小车前进”是16进制的07，所以程序里给寄存器0x03发送0x07即可播报对应内容。 第五个字节是结束帧。 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MjMzNjdlOTY5M2JkZTQ5YTFmM2VkODBlZWQ2YTc5ZWJfZjYzMzBiN2JhNzYyZjI1M2QzOGI5MGRiZWQwZDAwZDNfSUQ6NzYyNzA1MTcwNDY3NjM4ODA0MF8xNzgwMDU2OTM2OjE3ODAxNDMzMzZfVjM)

终端输入以下指令运行程序

```Plain Text
python3 -m speech_serial
```

当说出唤醒词唤醒之后，控制台会回复接收Read\_ID：0

说“关灯”，控制台会回复接收Read\_ID：13

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ODk4ZTc1NDdlZDc0MWQ3YjllNzU5ZmRmNDkwMDQ5NGNfMGNhMGNkZTk5MDVhMGMzMzJiMjYwZDc4MTMyYmM0YTVfSUQ6NzYyNzA1MTcwMjc3Njg5MjYyMF8xNzgwMDU2OTM2OjE3ODAxNDMzMzZfVjM)

这时候可以打开附件的 命令词播报词协议列表V1\_中文文件 查看“关灯”的协议 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2JjMjc3ZGVkMTQ4ZjA3NDk2Njc3YzNjMGE2N2E0MzNfMjA3YjZlYTMzMjI1YTc1MWE5YzE0OWYyYjFlYmJkZjZfSUQ6NzYyNzA1MTcwMjkyMzcyNjA0Nl8xNzgwMDU2OTM2OjE3ODAxNDMzMzZfVjM)

其中第一第二个字节AA 55表示的是协议的帧头，第三个字节表示的是芯片的十个功能词的ID，第四个就 是命令词的ID，这里能看到“关灯”是16进制的0D，十进制是13。第五个字节是结束帧。

说其他的命令词，控制台也会打印相对应得命令词ID，可以自行尝试



