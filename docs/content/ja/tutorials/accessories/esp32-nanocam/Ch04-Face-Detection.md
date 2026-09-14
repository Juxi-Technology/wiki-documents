---
title: 第 4 章:顔検出
description: "ESP32-NanoCam チュートリアル第 4 章:ESP-DL MobileNet 顔検出モデルを使用し、画面に顔枠と 5 つのキーポイントを描画、Arduino/Python で座標を読み取ってサーボを制御します。"
---

# 第 4 章:顔検出

> **[ストアで購入](https://www.juxitech.com/ja/products/esp32-s3-wifi-video-module)**

**この章の目標**:NanoCam に画面内の顔を検出させ、顔枠とキーポイントを描画し、座標を読み取って外部制御に利用します。

## 原理

顔検出には ESP-DL 深層学習ライブラリを使用し、MobileNet 軽量検出モデルに基づきます。入力は 320x240 RGB565 画像、出力は顔のバウンディングボックスリスト(位置+サイズ+信頼度)。推論は ESP32-S3 上で完結し、ネットワーク接続は不要です。

### 検出結果の形式

- 座標: 左上(x,y) + 幅・高さ(w,h)

- 信頼度: 0-1 の間の浮動小数点数

- 複数の顔がある場合は複数の枠を返す

## 手順

### 4.1 モード切り替え

```Plain
ai_mode:2
```

> 完全なコマンドは[シリアルプロトコルマニュアル](./ESP32-NanoCam-Serial-Protocol.md)を参照。

### 4.2 効果の確認

ブラウザ `http://<IP>` で顔検出枠が表示されます。

### 4.3 座標の取得

シリアル出力形式:

```Plain
I (xxxxx) detection_result: [ 0]: ( 45,  30, 180, 210)
I (xxxxx) detection_result:       left eye: ( 90,  80), right eye: (150,  80), nose: (120, 120), mouth left: ( 95, 150), mouth right: (145, 150)
```

- 1 行目:`[番号] (x, y, w, h)` — 顔枠の座標

- 2 行目:5 つのキーポイント — 左目、右目、鼻、左口角、右口角

## コード

### Arduino で座標を読み取りサーボを制御

```C++
// $face:x,y,w,h# 形式を解析
if (nanoSerial.available()) {
    String line = nanoSerial.readStringUntil('\n');
    if (line.startsWith("$face:")) {
        int x = line.substring(6).toInt();
        int y = line.substring(line.indexOf(',')+1).toInt();
        servoX.write(map(x, 0, 320, 0, 180));
    }
}
```

### Python で読み取り

```Python
ser = serial.Serial("COM3", 115200)
line = ser.readline().decode()
if line.startswith("$face:"):
    parts = line[6:-1].split(",")
    x, y, w, h = map(int, parts)
```

## 効果

カメラの前に顔が現れる → 画面に緑枠を描画 → シリアルが座標を出力。

次の章:[第 5 章:猫顔検出](./Ch05-Cat-Face-Detection.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
