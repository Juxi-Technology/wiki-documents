---
title: "シリアルポート通信"
description: "本リポジトリは、RDK X5（Raspberry Pi）プラットフォームと AI 音声対話モジュール間の通信を行う Python サンプルコードを提供しており、I2C と UART の 2 種類の通信方式に対応していま…"
---

# シリアルポート通信

## 概要

本リポジトリは、RDK X5（Raspberry Pi）プラットフォームと AI 音声対話モジュール間の通信を行う Python サンプルコードを提供しており、I2C と UART の 2 種類の通信方式に対応しています。

- **音声認識モジュール**：オフライン音声認識に対応し、認識後はコマンド ID を出力します

- **再生機能**：パッシブ再生、機能ワード再生、コマンドワード再生に対応

- **通信プロトコル**：I2C アドレス 0x2A、UART ボーレート 115200

- **プログラミング言語**：Python 3

---

## ハードウェア接続

### 共通接続

> **重要な注意**：すべてのデバイスが共通接地されていることを確認してください！
> 
> 

---

### UART バージョンの接続

**注意**：デフォルトでは `/dev/ttyAMA0` シリアルデバイスを使用します

---

### Type-C データケーブル接続（UART 代替）

USB-TTL 変換モジュールを使用する場合：

**注意**：この場合のシリアルデバイスは通常 `/dev/ttyUSB0` です

![図 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RDK-Serial-Communication/1.jpg)

---

## 環境設定

### システム要件

- RDK X5

- Ubuntu / Debian システム

- Python 3.7+

### 依存パッケージのインストール

```Bash
# 更新软件包
sudo apt update
sudo apt upgrade -y

# 安装 Python 库
sudo apt install -y python3-pip

# 安装 pyserial
pip3 install pyserial
```

### シリアルポートインターフェースの有効化

```Bash
# 打开配置工具
sudo raspi-config

# 选择 Interface Options → Serial
Select: No (shell) → Yes (hardware serial port)
# 重启生效
sudo reboot
```

---

## UART バージョンの使用方法

### コードファイルの確認

```Bash
cd UART_Voice
ls -la
# 应该看到 uart_voice.py
```

### シリアルポートデバイスの設定

`uart_voice.py` ファイルを編集し、シリアルデバイスを変更します：

```Bash
# UART 直连（默认）
SERIAL_PORT = '/dev/ttyAMA0'

# 或者使用 USB-TTL
SERIAL_PORT = '/dev/ttyUSB0'

# 波特率
BAUD_RATE = 115200
```

### プログラムの実行

## 実行権限の付与

```Bash
chmod +x uart_voice.py
# 运行（需要 sudo 权限访问串口）
sudo python3 uart_voice.py
```

### 実行テスト

正常に起動すると以下が表示されます：

```Bash
Speech Serial Opened! Baudrate=115200
```

音声モジュールにコマンドワードを話しかけると、対応する ID が表示されます：

```Bash
Speech Serial Opened! Baudrate=115200
ID:1
ID:4
ID:10
```

### プログラムの停止

`Ctrl + C` を押してプログラムを停止します

---

## よくある問題

### Q1: シリアルポートデバイスが見つからない

**A：確認項目：**

1. シリアルポートが有効になっているか確認する（raspi-config）

2. デバイス名が正しいか確認する

    - UART 直結：`/dev/ttyAMA0`

    - USB-TTL：`/dev/ttyUSB0` または `/dev/ttyUSB1`

3. ハードウェア接続が正しいか確認する

4. シリアルポートが他のプログラムに占有されていないか確認する

```Bash
# 查看可用串口
ls /dev/tty* | grep tty
```

---

### Q2: コマンド ID が 0 しか表示されない、または表示されない

**A：正常な現象です：**

- 0 = 有効なコマンドが認識されていない

- 有効なコマンドワードを話したときのみ ID が出力されます

- 先にモジュールをウェイクアップし、その後にコマンドを話します

---

### Q3: 認識精度が高くない

**A：最適化の提案：**

- 環境が静かであることを確保し、背景ノイズが大きすぎないようにします

- マイクとの距離を適切に保つ（10-50cm）

- 話す速度を適切にし、発音をはっきりさせます

---

### Q4: シリアルポート通信の異常

**A：確認項目：**

1. TX/RX がクロス接続されているか（モジュール TX → RPi RX）

2. ボーレートが 115200 であるか

3. 共通接地されているか

4. シリアルポートが他のプロセスに占有されていないか

```Bash
# 检查串口占用
sudo lsof /dev/ttyAMA0
```

---

## テクニカルサポート

問題がある場合は、以下を確認してください：

1. ハードウェアの配線が正しいか（共通接地は非常に重要です！）

2. シリアルポートのボーレートが 115200 であるか

3. ハードウェアインターフェースにアクセスする十分な権限があるか

## よく使うデバッグコマンド

```Bash
ls -l /dev/ttyAMA0   # 查看串口设备
groups                # 查看用户组权限
```

<RelatedProducts slugs="ai-voice-module" />
