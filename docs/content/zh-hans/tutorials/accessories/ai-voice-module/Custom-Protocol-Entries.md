---
title: "自定义协议词条制作"
description: "模块出厂已经烧录语音识别功能固件，资料压缩包里面也提供了出厂固件，如果需要重新制作固件可以根据下面步骤进行固件制作。"
---

# 自定义协议词条制作

## 1.语音芯片固件制作

## 1.1注意事项

模块出厂已经烧录语音识别功能固件，资料压缩包里面也提供了出厂固件，如果需要重新制作固件可以根据下面步骤进行固件制作。

## 1.2固件制作

首先需要打开“[启英泰伦语音AI平台](https://aiplatform.chipintelli.com/)”这个链接，进入固件制作官网。  点击菜单栏的“功能开发”，之后点击产品开发栏下的“离线语音识别大模型应用”。

![图 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/1.png)

这个时候会提示需要登录，这里需要使用自己的信息注册一个平台账号，这里教程时已经提前注册好了的，登录之后再次点击 “语音识别固件及SDK开发”。

![图 2](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/2.png)

页面跳转之后，在左侧点击新建项目，按照下图新建一个产品，其中产品名称和描述都可以自定义，其余信息需要按照红框内容进行选择，产品类型需要选择 “通用->智能中控”，完成后点击创建。

![图 3](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/3.png)

接下来需要填写项目的基础信息，我们需要识别中文，所以语言类型选择 “中文”，若需要识别英文也可以进行相应的修改，其他部分信息按照下图选择即可，完成点击继续。

![图 4](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/4.png)

然后需要对固件进行配置，这里我们只对需要修改的部分进行说明，将算法参数的回声消除打开。

![图 5](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/5.png)

硬件参数中，需要将晶振源选择为“内部 RC”。

![图 6](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/6.png)

在打印串口配置中，将 UART0 电平配置为开漏功能，支持外部上拉 5V。

![图 7](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/7.png)

对通讯串口配置进行修改，设置波特率为 115200，并配置 UART1 电平为开漏功能，支持外部上拉 5V，配置完成后点击“继续”进入下一步。

![图 8](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/8.png)

下面进入到编辑命令词功能中，首先需要选择播放的音色，这里我们选择“小蝶-清新女声 Ver.3”。

![图 9](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/9.png)

接着我们将命令词附件进行上传，找到本文档同路径下的“命令词播报词协议列表V1_中文”表格，直接拖入到网页中进行上传。

![图 10](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/10.png)

上传文件后，即可在下方的表格中看到我们的命令词数据。

![图 11](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/11.png)

打开自学习功能选择指定学习，此时系统会自动生成 4 个自学习指令，我们这里不做修改。

![图 12](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/12.png)

提交后等待几分钟即可完成固件制作，完成后点击下载固件即可获取到制作的固件了。

![图 13](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/13.png)

烧录固件步骤可以查看《[模块固件烧录](https://juxitech.feishu.cn/wiki/FfE8wbL1wipUWgkUKW6cbsw2nOe)》。

## 2.修改功能性词条

打开附件中的命令词播报词协议列表V1_中文文件。

![图 14](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/14.png)

找到表格中的功能性词条，也就是表格中的前 10 项。需要注意的是，这里的前 10条功能性词条均为固定词条，无法新增，只能进行修改。

![图 15](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/15.png)

这里我们以修改唤醒词的播报语为例，将原先识别到 “你好，小犀” 后播报 “在的” ，修改为播报“我在”。

![图 16](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/16.png)

修好完后保存，接着按照“1.2 固件制作”中的步骤，将表格导入到网站中。如果已经制作过一次固件了，那么可以点击之前项目中的“继承”按键，这样可以省去参数配置的步骤。

![图 17](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/17.png)

重新制作固件后，还需要将固件烧录到语音交互模块中，这样就能实现修改功能性词条了。

## 3.新增命令词条

打开附件中的命令词播报词协议列表V1_中文文件。

![图 18](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/18.png)

在表格的最下方，增加新的命令词条，这里以新增一个“打扫房间”的命令词为例。

![图 19](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/19.png)

这里需要将功能类型选择为“命令词”，同时播报模式需要设置为“主”，这样才能在识别到“打扫房间”后主动播报“好的”。

![图 20](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/20.png)

下面我们来了解一下发送协议，数据中的第 1 位和第 2 位是数据帧头，不需要修改。当我们选择了功能类型为命令词，那么根据发送协议，第 3 位数据必须要为“00”，这是为了区分指令为“命令词”还是“播报语”。

![图 21](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/21.png)

第 4 位数据则是命令词的数据 ID，这是一个十六进制数据，因为前一个命令词的ID 是“8B”，所以我们这一位需要设置为“8C”。在特殊情况下数据 ID 也可以相同，例如下面两个命令词的返回的结果一致时。

![图 22](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/22.png)

协议中的第 5 位固定为“EE”，同样也不需要修改。在表格中，需要使发送协议和接收协议一致。

![图 23](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/23.png)

修好完后保存，接着按照“1.2 固件制作”中的步骤，将表格导入到网站中。如果已经制作过一次固件了，那么可以点击之前项目中的“继承”按键，这样可以省去参数配置的步骤

![图 24](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/24.png)

重新制作固件后，还需要将固件烧录到语音交互模块中，这样就能实现新增命令词条的功能了。

## 4.新增播报语

打开附件中的命令词播报词协议列表V1_中文文件。

![图 25](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/25.png)

在表格的最下方，增加新的命令词条，这里以新增一个“现在是晚上”的播报语为例。

![图 26](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/26.png)

这里需要将功能类型选择为“播报语”，同时播报模式需要设置为“被”。

![图 27](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/27.png)

下面我们来了解一下发送协议，数据中的第 1 位和第 2 位是数据帧头，不需要修改。当我们选择了功能类型为播报语，那么根据发送协议，第 3 位数据必须要为“FF”，这是为了区分指令为“播报语”。

![图 28](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/28.png)

第 4 位数据则是命令词的数据 ID，这是一个十六进制数据，因为前一个播报语的ID 是“8B”，所以我们这一位需要设置为“8C”。

协议中的第 5 位固定为“EE”，同样也不需要修改。在表格中，需要使发送协议和接收协议一致。

![图 29](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/29.png)

修好完后保存，接着按照“1.2 固件制作”中的步骤，将表格导入到网站中。如果已经制作过一次固件了，那么可以点击之前项目中的“继承”按键，这样可以省去参数配置的步骤。

![图 30](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/30.png)

重新制作固件后，还需要将固件烧录到语音交互模块中，这样就能实现新增命令词条的功能了。



