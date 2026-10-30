---
title: "PC 側 · Python 実行"
description: "Windows で USB-TTL 変換と Python スクリプトを使って MAX30102 心拍・血中酸素データを読み取る方法。ドライバ、COM ポート、実行手順、Modbus レジスタを掲載。"
---

# PC 側 · Python 実行

## 目次

1. ハードウェアの準備
1. ハードウェア接続
1. ソフトウェア環境の設定
1. サンプルプログラムの実行
1. よくある質問

---

## ハードウェアの準備

### 必要なもの

| 材料 | 説明 |
|---|---|
| JUXI_HeartRate_SPO2 センサー | 心拍・血中酸素モジュール |
| USB-TTL 変換モジュール | CH340 / CP2102 / FT232 など |
| ジャンパーワイヤ | 4 本（メス-メス） |
| Windows PC | Win7/Win10/Win11 |

---

## ハードウェア接続

### 配線方法

| センサーピン | USB-TTL 変換ピン | 説明 |
|---|---|---|
| VCC | 3.3V または 5V | 電源プラス |
| GND | GND | 電源マイナス |
| TX | RX | センサー送信 → モジュール受信 |
| RX | TX | センサー受信 → モジュール送信 |

![図](../../../../../../public/images/tutorials/accessories/heart-rate-spo2/pc-python/01.png)

⚠️ **重要：**

1. モジュールのスイッチを UART に切り替えてください！！！
1. **TX と RX は必ずクロス接続してください！**
1. センサーは 3.3V と 5V に対応しています。電圧を間違えないでください
1. すべての配線を接続してから、USB を PC に挿入してください

### 配線イメージ

```text
传感器        USB转TTL模块
┌──────┐      ┌──────────┐
│ VCC  │──────│ 3.3V/5V  │
│ GND  │──────│ GND      │
│ TX   │──────│ RX       │  ← 交叉连接
│ RX   │──────│ TX       │  ← 交叉连接
└──────┘      └──────────┘
```

---

## ソフトウェア環境の設定

### ドライバのインストール

USB-TTL 変換チップの型番に応じて、対応するドライバをインストールします：

- **CH340**: [https://sparks.gogo.co.nz/ch340.html](https://sparks.gogo.co.nz/ch340.html)
- **CP2102**: [https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers)
- **FT232**: [https://ftdichip.com/drivers/vcp-drivers/](https://ftdichip.com/drivers/vcp-drivers/)

インストール完了後、USB-TTL 変換モジュールを挿入します。

### COM ポートの確認

#### 方法 1：デバイスマネージャー

1. `Win + X` を押し、「デバイスマネージャー」を選択します
1. 「ポート (COM および LPT)」を展開します
1. USB-TTL 変換に対応する COM ポート番号（例：COM3）を確認します

#### 方法 2：プログラムによる自動検出

サンプルプログラムを実行すると、利用可能なすべてのシリアルポートが自動的に一覧表示されます。

### Python 依存パッケージのインストール

コマンドプロンプト（CMD）または PowerShell を開き、以下を実行します：

```bash
pip install pyserial
```

---

## サンプルプログラムの実行

圧縮ファイル[JUXI_HeartRate_SPO2.zip](https://juxitech.feishu.cn/wiki/W2IwwDop5i4BVlk98EacfyJvnrh)をダウンロードして解凍します

### ファイルの場所

```text
JUXI_HeartRate_SPO2/python/windows/
├── gain_heartbeat_SPO2.py  ← 主程序（直接运行这个）
├── JUXI_HeartRate_SPO2_Windows.py
├── JUXI_RTU_Windows.py
└── README_CN.md        ← 本文件
└── README.md
```

### 実行手順

1. **ハードウェア接続が正しいことを確認**
  - VCC → 3.3V/5V
  - GND → GND
  - TX → RX（クロス）
  - RX → TX（クロス）

1. **USB を PC に挿入**
1. **プログラムを実行**

```bash
cd D:\JUXI_HeartRate_SPO2\python\windows
```

```bash
python gain_heartbeat_SPO2.py
```

1. **画面の指示に従って操作**
  - プログラムが利用可能なすべてのシリアルポートを一覧表示します
  - COM ポート番号（例：COM3）を入力します
  - プログラムがセンサーを自動検出して測定を開始します

### 出力例

```python
==================================================
JUXI Blood Oxygen Sensor - Windows Test
==================================================
Available serial ports:
  COM3

Please enter the COM port number (e.g., COM3):

Connecting to COM3 at 9600 baud...
Initializing sensor...
Sensor initialized successfully!

Starting data collection...
Sensor LED should be ON now!

Place your finger on the sensor...

SPO2 (血氧): 97 %
Heart Rate (心率): 82 BPM
Temperature (温度): 26.5 °C
SPO2 (血氧): 98 %
Heart Rate (心率): 78 BPM
Temperature (温度): 26.6 °C
...
```

`Ctrl + C` を押してプログラムを停止します。

---

## プログラム機能の説明

### 主要API

```bash
# 创建传感器对象
sensor = BloodOxygenSensor("COM3", 9600)

# 初始化传感器
sensor.begin()

# 开始采集（LED亮起）
sensor.sensor_start_collect()

# 读取心率血氧
sensor.get_heartbeat_SPO2()
print(f"SPO2: {sensor.SPO2}%")
print(f"Heart Rate: {sensor.heartbeat} BPM")

# 读取温度
temp = sensor.get_temperature_c()

# 停止采集（LED熄灭）
sensor.sensor_end_collect()

# 关闭串口
sensor.close()
```

---

## よくある質問

### Q1: COM ポートが見つからない場合は？

**A:**

1. USB-TTL 変換が正しく挿入されているか確認します
1. ドライバを再インストールします
1. 別の USB ポートを試します
1. デバイスマネージャーに「不明なデバイス」がないか確認します

### Q2: センサーの初期化に失敗する場合は？

**A:**

1. 配線を確認します：
  - VCC と GND が正しく接続されているか
  - **TX と RX がクロス接続されているか**（最もよくある問題）

1. ボーレートが 9600 であることを確認します
1. USB-TTL 変換モジュールが正常に動作しているか確認します
1. USB を挿し直します

### Q3: データがずっと -1 と表示される場合は？

**A:**

1. 指がセンサーの上に正しく置かれている（LED 領域を完全に覆っている）ことを確認します
1. 指を安定させ、動かさないようにします
1. 数秒待ってデータを安定させます
1. センサーの LED が点灯しているか確認します

### Q4: LED は点灯しないが通信は正常な場合は？

**A:**

- LED のハードウェア問題の可能性がありますが、センサー機能は正常です
- データが正常であれば、LED が点灯しない問題は無視して構いません

### Q5: シリアルポートが占有されている場合は？

**A:**

1. 他のシリアルソフト（シリアルアシスタント、Arduino IDE など）を閉じます
1. 他の Python プログラムが実行されていないか確認します
1. USB を挿し直します

### Q6: データが正確でない場合は？

**A:**

1. 指がセンサーの光学領域を完全に覆っていることを確認します
1. 測定中は静かにし、話したり動いたりしないでください
1. 30 秒以上待ってデータを安定させます
1. 複数回測定して平均値を取ります

---

## 技術仕様

| パラメータ | 仕様 |
|---|---|
| 通信方式 | UART (TTL レベル) |
| ボーレート | 9600 bps（デフォルト） |
| データ形式 | 8N1 (8 データビット, パリティなし, 1 ストップビット) |
| 供給電圧 | 3.3V / 5V |
| SPO2 測定範囲 | 35% - 100% |
| 心拍数測定範囲 | 30 - 250 BPM |
| Modbus デバイスアドレス | 0x20 |

---

## Modbus レジスタの説明

| レジスタアドレス | 機能 | 説明 |
|---|---|---|
| 0x02 | デバイス ID | 読み取り：0x0020 を返す |
| 0x06-0x09 | 心拍・血中酸素データ | 読み取り：SPO2 + 心拍数 |
| 0x0A | 温度 | 読み取り：基板温度 |
| 0x10 | 収集制御 | 書き込み：0x0001=開始, 0x0002=停止 |
