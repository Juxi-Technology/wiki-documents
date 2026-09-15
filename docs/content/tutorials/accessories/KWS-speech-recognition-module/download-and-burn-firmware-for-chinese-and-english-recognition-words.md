---
title: "Firmware Download & Burn"
description: "The module has been pre-flashed with the voice recognition function firmware at the factory, and the factory firmware is also provided in the attached"
---

# Firmware Download & Burn

> **[Buy in Store](https://www.juxitech.com/products/ai-voice-recognition-module)**


> The module has been pre-flashed with the voice recognition function firmware at the factory, and the factory firmware is also provided in the attached materials. If you need to re-create the firmware, you can follow the steps below to make the firmware. 
> 
> 

## Enter [ Qiying Tairen Voice AI Platform ](https://aiplatform.chipintelli.com/home/index.html)

#### Register an official website account with Qiying Tailun

#### Click on the top menu "Platform Features", and select "In-depth Development of Product Firmware and SDK"

![Click on the top menu "Platform Features", and select "In-depth Development of Product Firmware and SDK" – 1](../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/1.png)

---

#### Click "Offline Speech Recognition Large Model Application"

![Click on the top menu "Platform Features", and select "In-depth Development of Product Firmware and SDK" – 2](../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/10.png)

---

#### Click "Speech Recognition Firmware and SDK Development"

![Click "Speech Recognition Firmware and SDK Development" – 1](../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/11.png)

---

#### New Project

![Click "Speech Recognition Firmware and SDK Development" – 2](../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/12.png)

---

#### Product Information Completion

1. **Product Name:**Follow your own naming rules

2. **Application Solution: ** Select "Single Microphone Speech Recognition" 

3. **Product Type:**"General -\> Intelligent Central Control"

4. **Chip Model:**Cl1302

5. **sdk名称：**Cl13XX_SDK_ASR_Offline

6. **SDK Version:**1.12.16

7. **Description:**Just follow your own description rules

![Product Information Completion – 1](../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/13.png)

---

#### Firmware Information Selection 

> Here you can choose Chinese or English 
> 
> 

1. **Version Name:**Follow your own versioning rules

2. **Language Type:**Select according to your own needs

3. **Select Acoustic Type:**

    1. **Chinese Selection:**VO0681_Chinese_ASR_General_0.9M

    2. **English Selection:**VO0916_English_ASR_General_1.1M

4. **Module Board Selection:**CI-D02GS02S

![Product Information Completion – 2](../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/14.png)

---

#### Firmware Configuration 

![Firmware Configuration – 1](../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/2.png)

---

#### Download Wake Word Firmware 

1. Upload - Select the wake word table for the corresponding language

2. Click "Submit Now"

3. Wait a few minutes to download the firmware

4. Two lists of command word and broadcast word protocols are provided here. Those who need to can make changes according to this table on their own. 

    命令词播报词协议列表V3_中文模板.xlsx

    命令词播报词协议列表V3_英文模板.xlsx

![Firmware Configuration – 2](../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/3.png)

![Firmware Configuration – 3](../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/4.png)

---

## Voice Module Firmware Flashing

#### Download the Compressed Packet of the Voice Module Flashing Software

语音模块固件烧录软件.7z

1. Open the software after decompression

> Select "CI1302" for the firmware, then click "Firmware Upgrade" 
> 
> 

![Download the Compressed Packet of the Voice Module Flashing Software – 1](../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/5.png)

2. Plug the sound card into the computer and open Device Manager 

![Download the Compressed Packet of the Voice Module Flashing Software – 2](../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/6.png)

![Download the Compressed Packet of the Voice Module Flashing Software – 3](../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/7.png)

3. Move to the firmware burning software page 

> Sound card button position
> 
> ![Download the Compressed Packet of the Voice Module Flashing Software – 4](../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/8.png)
> 
> 

![Download the Compressed Packet of the Voice Module Flashing Software – 5](../../../../public/images/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words/9.png)

#### After completion, you can move to the corresponding other tutorials on the left 

#### Here are the prepared firmware materials, which can be directly flashed

CI1302_中文_单麦_V00681_UART0_115200_2M.bin

CI1302_英文_单麦_V00916_UART0_115200_2M.bin





## Precautions 

1. CH341 Driver Installation (Install as Administrator)

https://www.wch.cn/downloads/CH341SER_EXE.html

If the device is recognized as an unknown device, such as USB Single Serial or USB Serial, in Device Manager, please right-click to uninstall it first, and then install the driver! 



