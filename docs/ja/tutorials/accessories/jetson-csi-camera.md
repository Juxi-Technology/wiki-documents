---
title: Jetson CSI カメラ
description: "NVIDIA Jetson Orin CSI カメラモジュールの使用方法"
---

# Jetson CSI カメラ

## 製品概要

JUXI CSI カメラモジュールは NVIDIA Jetson Orin 開発者キット向けに設計されており、CSI (Camera Serial Interface) 経由で低遅延・高帯域の映像転送を提供します。AI ビジョン推論、ロボット知覚、エッジコンピューティングのシーンに適しています。

**特長**:
- CSI-2 インターフェース、Jetson Orin 開発ボードに直結
- OpenCV / GStreamer ベースのすぐ使えるサンプル
- 低遅延の映像転送
- UVC プロトコル対応

## 製品仕様

| 項目 | 仕様 |
|------|------|
| インターフェース | CSI-2 (MIPI) |
| 対応プラットフォーム | NVIDIA Jetson Orin シリーズ |
| 映像フォーマット | RAW / YUV |
| SDK サポート | JetPack 5.0+ |
| ソフトウェアフレームワーク | GStreamer / OpenCV |

## クイックスタート

### ハードウェア接続

1. Jetson Orin の電源を切る
2. CSI フラットケーブルの一端をカメラモジュールに接続する
3. ケーブルのもう一端を Jetson Orin 開発ボードの CSI コネクタに挿す
4. ケーブルの向きを確認する(金属接点が基板側)

> ⚠️ **注意**: CSI フラットケーブルは必ず電源を切った状態で接続してください。ハードウェアが損傷する恐れがあります。

### デバイス認識の確認

```bash
# Check CSI camera devices
ls /dev/video*

# View detailed info with v4l2
v4l2-ctl --list-devices
v4l2-ctl --list-formats-ext -d /dev/video0
```

### Python コード例

依存関係のインストール:

```bash
sudo apt install -y python3-opencv
```

GStreamer + OpenCV で CSI カメラをキャプチャ:

```python
import cv2

# GStreamer pipeline for the CSI camera
def gstreamer_pipeline(
    sensor_id=0,
    capture_width=1920,
    capture_height=1080,
    display_width=960,
    display_height=540,
    framerate=30,
    flip_method=0,
):
    return (
        "nvarguscamerasrc sensor-id=%d ! "
        "video/x-raw(memory:NVMM), "
        "width=(int)%d, height=(int)%d, "
        "format=(string)NV12, framerate=(fraction)%d/1 ! "
        "nvvidconv flip-method=%d ! "
        "video/x-raw, width=(int)%d, height=(int)%d, format=(string)BGRx ! "
        "videoconvert ! "
        "video/x-raw, format=(string)BGR ! appsink"
        % (
            sensor_id,
            capture_width,
            capture_height,
            framerate,
            flip_method,
            display_width,
            display_height,
        )
    )

cap = cv2.VideoCapture(gstreamer_pipeline(), cv2.CAP_GSTREAMER)

if not cap.isOpened():
    print("Failed to open CSI camera")
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        break
    cv2.imshow('CSI Camera', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

基本キャプチャ(UVC モードで動作する場合):

```python
import cv2

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1920)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1080)

while True:
    ret, frame = cap.read()
    if not ret:
        break
    cv2.imshow('Camera', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

## よくある質問

**Q: カメラが認識されない?**
まずフラットケーブルの接続と向きを確認してください。`ls /dev/video*` でデバイスノードを確認します。それでも認識されない場合は JetPack を再インストールしてください。

**Q: GStreamer パイプラインでエラーが出る?**
JetPack バージョンが 5.0 以上であることを確認してください。`apt list --installed | grep nvarguscamerasrc` で関連する GStreamer プラグインがインストールされているか確認します。

**Q: カメラを切り替えるには?**
`sensor-id` パラメータを変更します: `sensor_id=0` が 1 台目、`sensor_id=1` が 2 台目です。

## 技術サポート

- 📧 メール：support@juxitech.com
- 🌐 公式サイト：[www.juxitech.com](https://www.juxitech.com)
- 💬 GitHub Issues：[問題報告](https://github.com/Juxi-Technology/wiki-documents/issues)
