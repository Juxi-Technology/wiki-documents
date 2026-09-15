---
title: "RDK: IIC 通信"
description: "本リポジトリは、RDK X5（Raspberry Pi）プラットフォームと AI 音声対話モジュール間の通信を行う Python サンプルコードを提供しており、I2C と UART の 2 種類の通信方式に対応していま…"
---

# RDK: IIC 通信

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

### I2C バージョンの接続

**注意**：デフォルトでは I2C バス 5（BCM 番号）を使用します

![図 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RDK-IIC-Communication/1.jpg)

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
sudo apt install -y python3-pip python3-smbus i2c-tools
```

### I2C インターフェースの有効化

```Bash
# 打开配置工具
sudo raspi-config

# 选择 Interface Options → I2C → Enable
# 重启生效
sudo reboot
```

### ハードウェアインターフェースのテスト

```Bash
# 测试 I2C 设备
sudo i2cdetect -y 5
```

---

## IIC バージョンの使用方法

### コードファイルの確認

```Bash
cd IIC_Voice
ls -la
# 应该看到 iic_voice.py
```

### I2C バスの設定

`iic_voice.py` ファイルを編集し、必要なパラメータを変更します：

```Bash
# I2C 设备地址
DEVICE_ADDRESS = 0x2A

# 寄存器地址
REG_RESULT = 0xDA

# I2C 总线编号（根据实际连接修改）
bus = smbus.SMBus(5)  # I2C 总线 5
```

### プログラムの実行

```Bash
# 赋予执行权限
chmod +x iic_voice.py

# 运行（需要 sudo 权限访问 I2C）
sudo python3 iic_voice.py
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

`Ctrl + C` を押してプログラムを停止します：

```Bash
Program terminated
```

---

## よくある問題

### Q1: I2C 操作の権限が不足している

**A：ユーザーを I2C ユーザーグループに追加します：**

```Bash
sudo usermod -aG i2c $USER
# 重新登录生效
```

または `sudo` を使用してプログラムを実行します

---

### Q2: I2C デバイスがスキャンできない

**A：確認項目：**

1. I2C が有効になっていることを確認する（raspi-config）

2. SDA/SCL が逆に接続されていないか確認する

3. 共通接地されているか確認する

4. デバイスに電源が入っているか確認する

```Bash
# 扫描 I2C 设备
sudo i2cdetect -y 5
# 如果看到 0x2A，说明设备连接正常
```

---

### Q3: コマンド ID が 0 しか表示されない、または表示されない

**A：正常な現象です：**

- 0 = 有効なコマンドが認識されていない

- 有効なコマンドワードを話したときのみ ID が出力されます

- 先にモジュールをウェイクアップし、その後にコマンドを話します

---

### Q4: 認識精度が高くない

**A：最適化の提案：**

- 環境が静かであることを確保し、背景ノイズが大きすぎないようにします

- マイクとの距離を適切に保つ（10-50cm）

- 話す速度を適切にし、発音をはっきりさせます

---

## テクニカルサポート

問題がある場合は、以下を確認してください：

1. ハードウェアの配線が正しいか（共通接地は非常に重要です！）

2. シリアルポートのボーレートが 115200 であるか

3. I2C アドレスが正しいか（0x2A）

4. ハードウェアインターフェースにアクセスする十分な権限があるか

## よく使うデバッグコマンド

```Bash
ls -l /dev/i2c*      # 查看 I2C 设备
groups                # 查看用户组权限
```

<RelatedProducts slugs="ai-voice-module" />
