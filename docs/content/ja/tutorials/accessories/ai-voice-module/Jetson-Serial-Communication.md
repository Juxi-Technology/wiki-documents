---
title: "シリアルポート通信"
description: "ログアウトして再ログインすると有効になります。"
---

# シリアルポート通信

## 依存関係のインストール

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial
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

`UART_Voice/uart_voice.py`

モジュールは UART ピンで Jetson に接続します。`SERIAL_PORT = '/dev/ttyUSB0'` をコメントアウトし、`SERIAL_PORT = '/dev/ttyTHS1'` のコメントを解除します

![図 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication/1.png)

## 配線の説明

![図 2](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication/2.png)

## シリアルポートの確認

```Plain Text
ls /dev/ttyTHS*
```

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

モジュールは Type データケーブルで Jetson に接続します。`SERIAL_PORT = '/dev/ttyUSB0'` のコメントを解除し、`SERIAL_PORT = '/dev/ttyTHS1'` をコメントアウトします

![図 3](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication/3.png)

## シリアルポートの確認

```Plain Text
ls /dev/ttyUSB*
```

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

## よくある問題

### シリアルポートが使用中

シリアルポートが開けない場合は、他のサービスに占有されていないか確認してください：

```Plain Text
sudo systemctl stop nvgetty
```

```Plain Text
sudo systemctl disable nvgetty
```



