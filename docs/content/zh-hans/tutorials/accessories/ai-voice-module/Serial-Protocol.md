---
title: "串口协议"
description: "打开附件中的命令词播报词协议列表V1中文文件，能看到发送协议和接收协议，"
---

# 串口协议

打开附件中的命令词播报词协议列表V1_中文文件，能看到发送协议和接收协议，

## 1.功能性词条解析

根据文件能看到10个功能性词条的发送和接收协议，

![图 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/1.png)

功能性词条我们可以通过解析协议的第三个字节来区分

![图 2](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/2.png)

其中第一第二个字节（EF EF）表示帧头，第三个字节表示功能字的ID，第四个字节表示命令词的ID，第五个字节（EE）表示帧尾

## 2.命令词条

命令词条示例如下，命令词中的第四个字节表示ID

![图 3](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/3.png)

例子：

比如我们对模块说小车停止，模块会通过串口发送FE EF 00 01 EE五个字节，我们可以通过主控串口服务函数获取到这一组数据，之后通过解析第四个字节得到ID:01，这个时候就得知现在是小车停止。

## 3.播报语词条

播报语词条不会主动播报，必须要主控通过串口发送指令才会进行播报（命令词条的播报语也可以进行播报）。

![图 4](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/4.png)

其中第一第二个字节（FE EF）表示帧头，第三个字节表示播报功能FF的，第四个字节表示需要播报内容的ID，第五个字节（EE）表示帧尾

例字：

但我们需要播报“初始化完成”时，主控需要通过串口发送FE EF FF 67 EE给语音交互模块，发送完成之后，语音交互模块即可播报“初始化完成”

![图 5](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/5.png)

<RelatedProducts slugs="ai-voice-module" />
