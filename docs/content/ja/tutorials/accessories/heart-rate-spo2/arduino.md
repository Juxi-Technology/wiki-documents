---
title: "Arduino 使用チュートリアル"
description: "Arduino で JUXI_HeartRate_SPO2 ライブラリを使用して心拍数、血中酸素、基板温度を読み取る方法。配線、サンプルコード、API、よくある質問を掲載。"
---

# Arduino 使用チュートリアル

## センサーの概要

JUXI_HeartRate_SPO2 は MAX30102 チップをベースにした心拍・血中酸素センサーモジュールで、内蔵アルゴリズムが心拍数と血中酸素飽和度の値を直接出力できます。

**主な機能：**

- 血中酸素飽和度（SPO2）の測定
- 心拍数の測定（回/分）
- 基板温度の測定
- I2C 通信方式に対応

---

## Arduino 使用チュートリアル

### ハードウェアの準備

| 必要なもの |
|---|
| Arduino ボード（Uno/ESP32 など） |
| JUXI_HeartRate_SPO2 センサー |
| ジャンパーワイヤ 数本 |
| USB ケーブル（Arduino を PC に接続） |

### ライブラリのインストール

1. 本ライブラリのファイル[JUXI_HeartRate_SPO2.zip](https://juxitech.feishu.cn/wiki/W2IwwDop5i4BVlk98EacfyJvnrh)をダウンロードします
1. 圧縮ファイルを解凍し、Arduino のライブラリディレクトリにコピーします：
  - Windows: `C:\Users\ユーザー名\Documents\Arduino\libraries\`
  - Mac: `~/Documents/Arduino/libraries/`
  - Linux: `~/Arduino/libraries/`

1. Arduino IDE を再起動します

### サンプルコードの書き込み

> コードを書き込む際は、Arduino のみを PC に接続し、Arduino に心拍・血中酸素モジュールを接続しないでください！

#### 方法 1：UART モードのサンプル

`#define I2C_COMMUNICATION` をコメントアウトして、Arduino にコードを書き込みます

```cpp
#include "JUXI_HeartRate_SPO2.h"

// I2C 地址
#define I2C_ADDRESS 0x57

// 创建传感器对象，I2C模式
JUXI_HeartRate_SPO2_I2C sensor(&Wire, I2C_ADDRESS);

void setup() {
  Serial.begin(9600);

  // 初始化传感器
  while (!sensor.begin()) {
    Serial.println("传感器初始化失败，请检查连接！");
    delay(1000);
  }
  Serial.println("传感器初始化成功！");

  // 启动数据采集
  sensor.sensorStartCollect();
}

void loop() {
  // 读取心率和血氧数据
  sensor.getHeartbeatSPO2();

  // 输出血氧饱和度
  Serial.print("血氧饱和度: ");
  Serial.print(sensor._sHeartbeatSPO2.SPO2);
  Serial.println(" %");

  // 输出心率
  Serial.print("心率: ");
  Serial.print(sensor._sHeartbeatSPO2.Heartbeat);
  Serial.println(" 次/分钟");

  // 读取并输出温度
  Serial.print("板载温度: ");
  Serial.print(sensor.getTemperature_C());
  Serial.println(" ℃");

  Serial.println("------------------------");

  // 传感器每4秒更新一次数据
  delay(4000);
}
```

##### ハードウェア接続

I2C 通信

![図](../../../../../public/images/tutorials/accessories/heart-rate-spo2/arduino/01.png)

![図](../../../../../public/images/tutorials/accessories/heart-rate-spo2/arduino/02.png)

| センサーピン | Arduino |
|---|---|
| VCC | 5V/3.3V |
| GND | GND |
| SDA | SDA/A4 |
| SCL | SCL/A5 |

- 心拍・血中酸素モジュールのスイッチを IIC に切り替えてください！！！
- データケーブルで Arduino を PC に接続します

#### 実行結果：

1. Arduino の「ツール」→「シリアルモニタ」を開きます

ボーレートを 9600 に設定します

![図](../../../../../public/images/tutorials/accessories/heart-rate-spo2/arduino/03.png)

2. シリアルデバッグアシスタントを開きます

[シリアルデバッグアシスタント uartassist5.15.zip](https://juxitech.feishu.cn/wiki/BJlfwSQydi7u5lkRDQ6cV4dvnBd)

シリアルポート番号を選択します

ボーレートを`9600`に設定します

データビット`8`、ストップビット`1`、パリティ`NONE`、フロー制御`NONE`

受信設定と送信設定で`ASCII`を選択します

![図](../../../../../public/images/tutorials/accessories/heart-rate-spo2/arduino/04.png)

### API 説明

| 関数 | 説明 |
|---|---|
| begin() | センサーを初期化し、true/false を返します |
| getHeartbeatSPO2() | 心拍数と血中酸素データを読み取り、_sHeartbeatSPO2 構造体に格納します |
| getTemperature_C() | 基板温度（摂氏）を読み取ります |
| sensorStartCollect() | データ収集を開始します（センサー LED 点灯） |
| sensorEndCollect() | データ収集を停止します（センサー LED 消灯） |

### データの説明

- **SPO2（血中酸素飽和度）**: 正常範囲は 95% - 100%、値が -1 の場合は無効を意味します
- **Heartbeat（心拍数）**: 正常範囲は 60 - 100 回/分、値が -1 の場合は無効を意味します
- **無効値の原因**: 指が正しく置かれていない、またはデータが安定していない

---

## 使用上の注意

### 測定のコツ

1. **指を正しく置く**
  - 指をそっとセンサーの上に置き、2 つの LED を覆います
  - 血流に影響するため、強く押さないでください
  - 指を安定させ、動かさないでください

1. **データが安定するまで待つ**
  - 測定開始直後は数値が不安定になることがあります
  - 10～30 秒待ってデータが安定してから読み取ることをおすすめします
  - センサーは 4 秒ごとにデータを更新します

1. **環境要件**
  - センサーに強い光が直接当たらないようにしてください
  - 適切な環境温度を保ってください
  - 測定時は静かにしてください

### データの見方

| SPO2 範囲 | 説明 |
|---|---|
| 95% - 100% | 正常 |
| 90% - 94% | 軽度低酸素 |
| < 90% | 低酸素、受診を推奨 |

| 心拍数範囲 | 説明 |
|---|---|
| 60 - 100 回/分 | 成人の正常範囲 |
| < 60 回/分 | 徐脈 |
| > 100 回/分 | 頻脈 |

---

## よくある質問

### Q1: センサーの初期化に失敗したらどうすればよいですか？

**A:**

1. 配線が正しいか確認します（SDA は GPIO2/A4、SCL は GPIO3/A5）
1. 電源が正常か確認します（3.3V または 5V）
1. `i2cdetect -y 1` コマンドでデバイスを検出します
1. センサーのスイッチが IIC の位置にあることを確認します

### Q2: データがずっと -1 と表示される場合は？

**A:**

1. 指がセンサーの上に正しく置かれていることを確認します
1. 数秒待ってデータを安定させます
1. `sensorStartCollect()` を呼び出して収集を開始したか確認します
1. センサーのインジケーター LED が点灯しているか確認します

### Q3: データが正確でない場合は？

**A:**

1. 指がセンサーの光学領域を完全に覆っていることを確認します
1. 指を静止させ、動かさないようにします
1. 30 秒以上待ってデータを安定させます
1. 複数回測定して平均値を取ります

### Q4: センサーはどの Arduino ボードに対応していますか？

**A:** 以下に対応しています：

- Arduino Uno/Mega
- ESP8266
- ESP32
- その他 Arduino 環境をサポートするボード

---

## サンプルファイルの場所

### Arduino サンプル

```text
JUXI_HeartRate_SPO2/
└── examples/
    └── gainHeartbeatSPO2/
        └── gainHeartbeatSPO2.ino
```
