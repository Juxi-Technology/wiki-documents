---
title: "ラズベリーパイ: IIC 通信"
description: "AI 音声対話モジュールとラズベリーパイを IIC 接続する手順。I2C の有効化、配線、サンプルコードの実行と出力形式を解説します。"
---

# ラズベリーパイ: IIC 通信

## 依存関係のインストール

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial i2c-tools
```

## I2C の有効化

```Plain Text
sudo raspi-config
```

選択 `Interface Options` -> `I2C` -> `Yes`

Raspberry Pi を再起動します

## ファイルの場所

`~/IIC_Voice/iic_voice.py`

## 配線の説明

![図 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication/1.png)

## 実行

```Plain Text
cd IIC_Voice
```

```Plain Text
python3 iic_voice.py
```

## 出力フォーマット

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

<RelatedProducts slugs="ai-voice-module" />
