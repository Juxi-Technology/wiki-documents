---
title: "IIC通訊"
description: "登出並重新登入生效。"
---

# IIC通訊

## 安裝相依性

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial i2c-tools
```

## 檢查使用者群組

```Plain Text
sudo usermod -aG i2c $USER
```

```Plain Text
sudo usermod -aG dialout $USER
```

登出並重新登入生效。

## 檔案位置

`IIC_Voice/iic_voice.py`

## 接線說明

![圖 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication/1.png)

## 檢查I2C裝置

```Plain Text
sudo i2cdetect -y -r 1
```

應能看到位址`0x2A`

## 執行

```Plain Text
cd IIC_Voice
```

```Plain Text
sudo python3 iic_voice.py
```

## 輸出格式

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

## 常見問題

### I2C權限問題

```Plain Text
sudo chmod 666 /dev/i2c-1
```



