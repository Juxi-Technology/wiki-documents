---
title: "IIC协议"
description: "注意：主机设备与语音交互模块的供电电源可以不同，但在连接时必须要共地，才可以提供稳定的通讯电平"
---

# IIC协议

注意：主机设备与语音交互模块的供电电源可以不同，但在连接时必须要共地，才可以提供稳定的通讯电平

## 1.语音交互模块当从机

接收解析主机发送的信号：

等待 IIC 信号中断，若 IIC 有数据接收到，则根据 IIC 接收到的寄存器地址信息，调用对应的函数功能。

数据处理与反馈：

当语音交互模块接收到读取寄存器命令时，则需要调用对应的发送函数，将识别到的数据发送给主机设备。

## 2.IIC设备地址及寄存器功能

语音交互模块的 IIC 从机的设备地址为 0x2A。

## 3.获取命令词条。

打开附件中的命令词播报词协议列表V1_中文文件，能看到通信协议协议以 0xFE、0xED 开头，以 0xEE结尾，中间 2 个字节，分别为功能类型和 ID 号。

![图 1](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/1.png)

当语音交互模块识别到“停车”命令词时，会回应“好的，已停止”，主控可在识别结果寄存器（0xDA）上读取到 0x02一个字节数据，该数据与“停车”的发送协议中第 4 个字节相同。

![图 2](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/2.png)

## 4.播报语词条

播报语词条不会主动播报，必须要主控通过 IIC 设置才会进行播报（命令词条的播报语也可以进行播报）。

主控通过 IIC 在播报寄存器地址（0xD1）上写入 一个1个字节，为命令词 ID 号，语音播报模块就会播报对应的语句，0xFF 为普通播报语。

![图 3](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/3.png)

例如：

用户需要播放“这是红色”时，主控需要通过 IIC 在播报寄存器（0xD1）上写入“0x5F”，语音交互模块即会播报“这是红色”。

![图 4](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/4.png)

## 5.播报功能词条

功能词条可以识别到命令词的时候播报，也可以通过IIC写入特定的字节播报。

主控通过 IIC 在播报寄存器地址（0xD2）上写入 一个1个字节，为命令词 ID 号，语音播报模块就会播报对应的语句，0xFF 为普通播报语。

![图 5](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/5.png)

例如：

用户需要播放“这是红色”时，主控需要通过 IIC 在播报寄存器（0xD2）上写入“0x01”，语音交互模块即会播报“欢迎使用小犀”。

![图 6](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/6.png)

## 5.播报命令词条

命令词条可以识别到命令词的时候播报，也可以通过IIC写入特定的字节播报。

主控通过 IIC 在播报寄存器地址（0xD3）上写入 一个1个字节，为命令词 ID 号，语音播报模块就会播报对应的语句，0xFF 为普通播报语。

![图 7](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/7.png)

例如：

用户需要播放“好的，正在前进”时，主控需要通过 IIC 在播报寄存器（0xD3）上写入“0x04”，语音交互模块即会播报“好的，正在前进”。

![图 8](../../../../../public/images/tutorials/accessories/ai-voice-module/IIC-Protocol/8.png)



