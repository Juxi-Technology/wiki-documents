---
title: 第 5 章:猫顔検出
description: "ESP32-NanoCam チュートリアル第 5 章。CatFaceDetectMN03 モデルによる猫顔検出の手順と、キーポイントの有無など顔検出モデルとの違いを解説します。"
---

# 第 5 章:猫顔検出

> **[ストアで購入](https://www.juxitech.com/ja/products/esp32-s3-wifi-video-module)**

**この章の目標**:NanoCam に猫の顔を検出させ、顔検出モデルとの違いを理解します。

## 原理

猫顔検出には CatFaceDetectMN03 モデルを使用し、猫の顔の特徴(三角形の耳/広い瞳間距離/鼻)に最適化して学習されています。入力は 320x240 RGB565 画像、出力は猫顔のバウンディングボックスリスト。[第 4 章](./Ch04-Face-Detection.md)の顔検出と同じ `print_detection_result` 出力形式を共用します。

### 猫顔 vs 顔検出モデルの違い

|比較項目|顔検出 (ai_mode:2)|猫顔検出 (ai_mode:1)|
|---|---|---|
|モデル|MSR01 + MNP01 二段カスケード|CatFaceDetectMN03 単段|
|キーポイント|10 個(両目/鼻先/口角)|なし(モデルが出力しない)|
|信頼度閾値|MSR01=0.3, MNP01=0.4|0.4|
|検出枠の描画|緑の枠線矩形 + 5 キーポイント|緑の枠線矩形(キーポイントなし)|

## 手順

### 5.1 モード切り替え

```Plain
ai_mode:1
```

デバイスは自動的に再起動して猫顔検出モードに入ります

> 完全なコマンドは[シリアルプロトコルマニュアル](./ESP32-NanoCam-Serial-Protocol.md)を参照。

### 5.2 効果の確認

猫または猫の画像をカメラの前に置き、ブラウザで `http://<IP>` を開くと、緑の検出枠が猫の顔をマークするのが見えます。

### 5.3 シリアル出力

猫の顔を検出すると、シリアルに出力されます:

```Plain
I (xxxxx) detection_result: [ 0]: ( 45,  30, 180, 210)
```

- 形式:`[番号] (x, y, w, h)` — 猫顔枠の左上座標 + 幅・高さ

- 猫顔モデルはキーポイントを出力しません(顔検出とは異なります)

## コード

### コア検出ロジック

`components/modules/ai/who_cat_face_detection.cpp`:

```C++
CatFaceDetectMN03 detector(0.4F, 0.3F, 10, 0.3F);
std::list<dl::detect::result_t> &detect_results = detector.infer(
    (uint16_t *)frame->buf, {(int)frame->height, (int)frame->width, 3});

if (detect_results.size() > 0) {
    draw_detection_result((uint16_t *)frame->buf, frame->height, frame->width, detect_results);
    print_detection_result(detect_results);  // シリアルに座標を出力
}
```

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

### Python でシリアル読み取り

```Python
import serial
ser = serial.Serial("COM3", 115200)
while True:
    line = ser.readline().decode().strip()
    if "detection_result" in line:
        print(line)
```

## 効果

猫が現れる → 画面に緑枠を描画 → シリアルが座標を出力。Arduino/Python で座標を読み取り、サーボを駆動して追跡できます。

次の章:[第 6 章:色認識](./Ch06-Color-Recognition.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
