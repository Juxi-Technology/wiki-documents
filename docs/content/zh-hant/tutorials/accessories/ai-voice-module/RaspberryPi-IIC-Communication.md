---
title: "樹莓派: IIC通訊"
description: "選擇 Interface Options -> I2C -> Yes"
---

# 樹莓派: IIC通訊

## 安裝相依性

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial i2c-tools
```

## 啟用I2C

```Plain Text
sudo raspi-config
```

選擇 `Interface Options` -> `I2C` -> `Yes`

重啟Raspberry Pi

## 檔案位置

`~/IIC_Voice/iic_voice.py`

## 接線說明

![圖 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication/1.png)

## 執行

```Plain Text
cd IIC_Voice
```

```Plain Text
python3 iic_voice.py
```

## 輸出格式

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

<RelatedProducts slugs="ai-voice-module" />
