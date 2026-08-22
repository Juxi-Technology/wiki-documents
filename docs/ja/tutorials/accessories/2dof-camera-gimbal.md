---
title: 2自由度カメラジンバル
description: "Juxi Technology 2-DOF カメラジンバル:カラートラッキング、顔検出、自動追跡対応"
---

# 2自由度カメラジンバル

## 製品概要

Juxi Technology の 2-DOF カメラジンバルはオープンソースの2自由度カメラ安定プラットフォーム。Python 制御、カラートラッキング、顔検出、自動目標追跡に対応します。

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

## 基本制御

```python
from sc_servo import SCServo, Gimbal
servo = SCServo("COM3")  # Linux: /dev/ttyUSB0
servo.connect()
gimbal = Gimbal(servo)
gimbal.enable_all()
gimbal.set_angle(0, 30)   # yaw
time.sleep(1)
gimbal.set_angle(1, -20)  # pitch
```

## カラートラッキング例

```python
import cv2, sys
sys.path.append('../src')
from sc_servo import SCServo, Gimbal

cap = cv2.VideoCapture(0)
servo = SCServo("COM3"); servo.connect()
gimbal = Gimbal(servo); gimbal.enable_all()

while True:
    ret, frame = cap.read()
    if not ret: break
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    mask = cv2.inRange(hsv, (0,100,100), (10,255,255))
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if contours:
        largest = max(contours, key=cv2.contourArea)
        x,y,w,h = cv2.boundingRect(largest)
        cx, cy = x+w//2, y+h//2
        fh, fw = frame.shape[:2]
        yaw = int((cx/fw - 0.5) * 180)
        pitch = int((0.5 - cy/fh) * 90)
        gimbal.set_angle(0, max(-90, min(90, yaw)))
        gimbal.set_angle(1, max(-45, min(45, pitch)))
    cv2.imshow('Color Tracking', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'): break
```

## FAQ

**Q: シリアル接続できない?**
ポート番号確認。Windows `COMx`、Linux `/dev/ttyUSBx`。

**Q: サーボが反応しない?**
サーボ電源確認(SCS は 6-8.4V 外部電源)。

**Q: 追跡が不安定?**
PID 調整と追跡頻度。解像度低減でリアルタイム性向上。

## 技術サポート

- 📧 support@juxitech.com
- 🌐 [www.juxitech.com](https://www.juxitech.com)