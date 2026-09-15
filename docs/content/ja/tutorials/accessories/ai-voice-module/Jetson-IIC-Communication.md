---
title: "Jetson: IIC 通信"
description: "ログアウトして再ログインすると有効になります。"
---

# Jetson: IIC 通信

## 依存関係のインストール

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial i2c-tools
```

## ユーザーグループの確認

```Plain Text
sudo usermod -aG i2c $USER
```

```Plain Text
sudo usermod -aG dialout $USER
```

ログアウトして再ログインすると有効になります。

## ファイルの場所

`IIC_Voice/iic_voice.py`

## 配線の説明

![図 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication/1.png)

## I2C デバイスの確認

```Plain Text
sudo i2cdetect -y -r 1
```

アドレス `0x2A` が確認できるはずです

## 実行

```Plain Text
cd IIC_Voice
```

```Plain Text
sudo python3 iic_voice.py
```

## 出力フォーマット

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

## よくある問題

### I2C 権限の問題

```Plain Text
sudo chmod 666 /dev/i2c-1
```

<RelatedProducts slugs="ai-voice-module" />
