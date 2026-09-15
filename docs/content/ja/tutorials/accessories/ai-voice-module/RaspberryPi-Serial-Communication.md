---
title: "ラズベリーパイ: シリアルポート通信"
description: "AI 音声対話モジュールとラズベリーパイのシリアルポート通信。シリアルポートの有効化、配線、サンプルコードの実行方法を解説します。"
---

# ラズベリーパイ: シリアルポート通信

## 依存関係のインストール

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial
```

## ファイルの場所

`~/UART_Voice/uart_voice.py`

## シリアルポートの有効化

`/boot/firmware/config.txt` または `/boot/config.txt` を編集し、以下の設定を確認します：

```Plain Text
enable_uart=1
dtoverlay=disable-bt
```

その後、Raspberry Pi を再起動します。

```Plain Text
sudo reboot
```

## 配線の説明

Type で Raspberry Pi に直結する場合、`SERIAL_PORT = '/dev/ttyUSB0'` のコメントを解除し、`SERIAL_PORT = '/dev/ttyAMA0'` をコメントアウトします

![図 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication/1.png)

UART ピンで Raspberry Pi に接続します

![図 2](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication/2.png)

`SERIAL_PORT = '/dev/ttyUSB0'` をコメントアウトし、`SERIAL_PORT = '/dev/ttyAMA0'` のコメントを解除します

![図 3](../../../../../public/images/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication/3.png)

## 実行

```Plain Text
cd UART_Voice
```

```Plain Text
python3 uart_voice.py
```

## 出力フォーマット

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

<RelatedProducts slugs="ai-voice-module" />
