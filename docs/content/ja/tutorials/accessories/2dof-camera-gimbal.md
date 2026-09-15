---
title: "2自由度ジンバル"
description: "Juxi Technology 2-DOF カメラジンバル:カラートラッキング、顔検出、自動追跡対応"
---

# 2自由度ジンバル

> **[ストアで購入](https://www.juxitech.com/ja/products/2-dof-servo-pan-tilt-unit)**


## 製品概要

Juxi Technology の 2-DOF カメラジンバルはオープンソースの2自由度カメラ安定プラットフォーム。Python 制御、カラートラッキング、顔検出、自動目標追跡に対応します。ロボットビジョン、監視、自動化アプリケーションに適しています。

**特徴**
- 2自由度(Pitch/Yaw)サーボ制御
- カラートラッキング、顔検出、QRコード検出
- 純 Python 実装、二次開発容易
- USB カメラとシリアルサーボ対応
- オープンソース: [GitHub](https://github.com/Juxi-Technology/2dof-camera-gimbal)

## 製品仕様

| パラメータ | 仕様 |
|-----------|------|
| 自由度 | 2軸(Pitch + Yaw) |
| サーボ | シリアルバスサーボ(SCS) |
| 制御IF | USB シリアル |
| カメラ | USB UVC |
| 追跡 | カラー/顔/QRコード |
| 言語 | Python 3 |

## クイックスタート

### ハードウェア接続

1. サーボをシリアルバスインターフェースに接続します
2. USB-シリアル変換モジュールを PC / Jetson / Raspberry Pi に接続します
3. カメラをジンバルブラケットに取り付けます
4. USB カメラを接続します

### 依存関係のインストール

```bash
pip install -r requirements.txt
# または手動インストール
pip install opencv-python pyserial numpy
```

### 基本制御コード

```python
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))

from sc_servo import SCServo, Gimbal
import time

# Initialize servo controller
servo = SCServo("COM3")  # Linux: "/dev/ttyUSB0"
if servo.connect():
    print("✓ Serial connected")

    gimbal = Gimbal(servo)
    gimbal.enable_all()

    # Set angle (pitch, yaw)
    gimbal.set_angle(0, 30)   # yaw: -90~90
    time.sleep(1)
    gimbal.set_angle(1, -20)  # pitch: -45~45
    time.sleep(1)

    # Return to center
    gimbal.set_angle(0, 0)
    gimbal.set_angle(1, 0)

    gimbal.disable_all()
    servo.disconnect()
```

### カラートラッキング例

```python
import sys
import os
import cv2
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))
from sc_servo import SCServo, Gimbal

# Initialize camera and gimbal
cap = cv2.VideoCapture(0)
servo = SCServo("COM3")
servo.connect()
gimbal = Gimbal(servo)
gimbal.enable_all()

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Convert to HSV for color detection
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    # Red color range
    lower_red1 = (0, 100, 100)
    upper_red1 = (10, 255, 255)
    mask = cv2.inRange(hsv, lower_red1, upper_red1)

    # Find the largest contour
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if contours:
        largest = max(contours, key=cv2.contourArea)
        x, y, w, h = cv2.boundingRect(largest)
        center_x = x + w // 2
        center_y = y + h // 2

        # Map pixel coordinates to servo angles
        frame_h, frame_w = frame.shape[:2]
        yaw = int((center_x / frame_w - 0.5) * 180)
        pitch = int((0.5 - center_y / frame_h) * 90)
        gimbal.set_angle(0, max(-90, min(90, yaw)))
        gimbal.set_angle(1, max(-45, min(45, pitch)))

        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)

    cv2.imshow('Color Tracking', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

gimbal.disable_all()
cap.release()
cv2.destroyAllWindows()
```

## 高度な機能

### 顔検出トラッキング

リポジトリの `src/detectors/face_detector.py` には OpenCV DNN ベースの顔検出器が用意されており、自動顔追跡に使用できます。

### 自動追跡

リポジトリの `examples/auto_tracking_demo.py` が、ターゲット選択、PID 制御、滑らかな追跡を含む完全な自動追跡ワークフローを実装しています。

## FAQ

**Q: シリアル接続できない?**

**A:** ポート番号確認。Windows `COMx`、Linux `/dev/ttyUSBx`。`python examples/list_ports.py` で利用可能なポートを一覧表示できます。

**Q: サーボが反応しない?**

**A:** サーボ電源確認(SCS は 6-8.4V 外部電源)。

**Q: 追跡が不安定?**

**A:** PID 調整と追跡頻度。解像度低減でリアルタイム性向上。

## 技術サポート

- 📧 support@juxitech.com
- 🌐 [www.juxitech.com](https://www.juxitech.com)
- 💻 オープンソースリポジトリ: [GitHub](https://github.com/Juxi-Technology/2dof-camera-gimbal)
