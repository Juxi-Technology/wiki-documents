---
title: 中英文识别词固件下载及烧录
description: "模块出厂已经烧录语音识别功能固件，资料附件里面也提供了出厂固件，如果需要重新制作固件可以根据下面步骤进行固件制作"
---

# 中英文识别词固件下载及烧录

> 模块出厂已经烧录语音识别功能固件，资料附件里面也提供了出厂固件，如果需要重新制作固件可以根据下面步骤进行固件制作
> 
> 

## 进入[启英泰伦语音AI平台](https://aiplatform.chipintelli.com/home/index.html)

#### 注册启英泰伦官网账号

#### 点击顶部菜单“平台功能”，选择“产品固件及SDK深度开发”

![](../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/1.png)

---

#### 点击“离线语音识别大模型应用”

![](../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/10.png)

---

#### 点击“语音识别固件及SDK开发”

![](../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/11.png)

---

#### 新建项目

![](../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/12.png)

---

#### 产品信息填写

1. **产品名称：**按自己名称规则来即可

2. **应用方案：**选择“单麦语音识别”

3. **产品类型：**“通用-&amp;gt;智能中控”

4. **芯片型号：**Cl1302

5. **sdk名称：**Cl13XX_SDK_ASR_Offline

6. **sdk版本：**1.12.16

7. **描述：**按自己描述规则来即可

![](../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/13.png)

---

#### 固件信息选择

> 在这里可以选择中文或者英文
> 
> 

1. **版本名称：**按自己版本规则即可

2. **语言类型：**按自己需求选择

3. **选择声学类型：**

    1. **中文选择：**VO0681_中文_ASR_通用_0.9M

    2. **英文选择：**VO0916_英文_ASR_通用_1.1M

4. **模块板选择：**CI-D02GS02S

![](../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/14.png)

---

#### 固件配置

![](../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/2.png)

---

#### 下载唤醒词固件

1. 上传-选择对应语言的唤醒词表格

2. 点击“立即提交”

3. 等待几分钟即可下载固件

4. 这里提供了两份命令词播报词协议列表，有需要的可以根据这份表格自行更改

    [命令词播报词协议列表V3_中文模板.xlsx]

    [命令词播报词协议列表V3_英文模板.xlsx]

![](../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/3.png)

![](../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/4.png)

---

## 语音模块烧录固件

#### 下载语音模块烧录软件压缩包

[语音模块固件烧录软件.7z]

1. 解压后打开软件

> 固件选择“CI1302”，点击“固件升级”
> 
> 

![](../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/5.png)

2. 将声卡插上电脑，打开设备管理器

![](../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/6.png)

![](../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/7.png)

3. 移至固件烧录软件页面

> 声卡按键位置
> 
> ![](../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/8.png)
> 
> 

![](../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/9.png)

#### 完成后可移步到左侧对应的其他教程

#### 这里有准备好的固件资料，可直接烧录

[CI1302_中文_单麦_V00681_UART0_115200_2M.bin]

[CI1302_英文_单麦_V00916_UART0_115200_2M.bin]





## 注意事项

1. CH341驱动安装（以管理员身份安装）

https://www.wch.cn/downloads/CH341SER_EXE.html

若在设备管理器被识别成未知设备usb single serial 或usb serial，请先右键卸载，再安装驱动！



