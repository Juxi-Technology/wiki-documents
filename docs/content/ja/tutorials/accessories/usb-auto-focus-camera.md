---
title: "USB オートフォーカスカメラ"
description: "JUXI USBドライバ不要 86°広角オートフォーカス 1080P カメラの使用方法"
---

# USB オートフォーカスカメラ

## 製品概要

JUXI USBオートフォーカスカメラは、プラグアンドプレイの高画質カメラモジュールで、ロボットビジョン、AI推論、コンピュータビジョン用途に適しています。86°広角視野、オートフォーカス、1080P 30FPS 動画出力をサポートします。

**特長**:
- USBドライバ不要、Windows / Linux / macOS / Jetson / Raspberry Pi 対応
- 86°広角レンズでより広い視野をカバー
- オートフォーカス(AF)、手動調整不要
- 1080P 30FPS 高画質動画ストリーム
- UVC 標準プロトコル、プラグアンドプレイ

## 製品仕様

| 項目 | 仕様 |
|------|------|
| 解像度 | 1920 × 1080 (1080P) |
| フレームレート | 30 FPS |
| 画角 | 86°広角 |
| フォーカス方式 | オートフォーカス (AF) |
| インターフェース | USB 2.0 |
| プロトコル | UVC (USB Video Class) |
| 対応OS | Windows / Linux / macOS / Jetson / Raspberry Pi |

## クイックスタート

### デバイスの接続

カメラのUSBプラグをデバイスのUSBポートに挿すだけです。追加ドライバのインストールは不要です。

### デバイス認識の確認

```bash
# Linux / Jetson / Raspberry Pi
ls /dev/video*
# Should see /dev/video0 or /dev/video1

# View detailed information
v4l2-ctl --list-devices
```

### Python コード例

OpenCV のインストール:

```bash
pip install opencv-python
```

基本的な画像キャプチャ:

```python
import cv2

# Open the camera
cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1920)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1080)
cap.set(cv2.CAP_PROP_FPS, 30)

if not cap.isOpened():
    print("Failed to open camera")
    exit()

print(f"Resolution: {cap.get(cv2.CAP_PROP_FRAME_WIDTH)}×{cap.get(cv2.CAP_PROP_FRAME_HEIGHT)}")

while True:
    ret, frame = cap.read()
    if not ret:
        break
    cv2.imshow('USB Camera', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

複数カメラの選択:

```python
import cv2

def list_cameras(max_devices=5):
    available = []
    for i in range(max_devices):
        cap = cv2.VideoCapture(i)
        if cap.isOpened():
            available.append(i)
            cap.release()
    return available

print(f"Available cameras: {list_cameras()}")

# Select a specific camera
camera_index = 1  # second camera
cap = cv2.VideoCapture(camera_index)
```

## Jetson での使用

```bash
# Check the camera
v4l2-ctl --list-devices

# Use a GStreamer pipeline for better performance
gst-launch-1.0 v4l2src device=/dev/video0 ! videoconvert ! autovideosink
```

## よくある質問

**Q: カメラが認識されない?**

**A:** USBケーブルがしっかり接続されているか確認してください。別のUSBポートを試してください。`lsusb` でUSBデバイス一覧を確認します。

**Q: 映像がぼやける?**

**A:** カメラはオートフォーカス機能を搭載しており、初回接続後2〜3秒で自動的にピントが合います。それでもぼやける場合は、レンズ表面の汚れを確認してください。

**Q: 解像度を変更するには?**

**A:** `cap.set(cv2.CAP_PROP_FRAME_WIDTH, width)` と `cap.set(cv2.CAP_PROP_FRAME_HEIGHT, height)` を使用します。

## 技術サポート

- 📧 メール：support@juxitech.com
- 🌐 公式サイト：[www.juxitech.com](https://www.juxitech.com)
- 💬 GitHub Issues：[問題報告](https://github.com/Juxi-Technology/wiki-documents/issues)

<RelatedProducts slugs="usb-auto-focus-camera" />
