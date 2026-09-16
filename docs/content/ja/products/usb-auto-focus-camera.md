---
title: USBオートフォーカスカメラ
category: compute-vision
description: Juxi Technology USBドライバ不要オートフォーカスカメラ——86°広角、1080P 30FPS、UVC プラグアンドプレイ、ロボットビジョンと AI 推論向け、Windows/Linux/macOS/Jetson/Raspberry Pi 対応
keywords: [usb カメラ, オートフォーカス, 1080p, uvc, ドライバ不要, ロボットビジョン, jetson, ラズベリーパイ]
---

# USBオートフォーカスカメラ

> **[Taobao で購入](https://item.taobao.com/item.htm?id=912105917442)**

## 製品概要

USBオートフォーカスカメラは、プラグアンドプレイの高画質カメラモジュールで、ロボットビジョン、AI推論、コンピュータビジョン用途に適しています。**86°広角視野**、オートフォーカス、**1080P 30FPS** 動画出力をサポートし、UVC 標準プロトコルを採用しているため、ドライバのインストールは不要です。

**主な特長**:

- USBドライバ不要、UVC 標準プロトコルでプラグアンドプレイ
- Windows / Linux / macOS / Jetson / Raspberry Pi 対応
- 86°広角レンズでより広い視野をカバー
- オートフォーカス(AF)、手動調整不要
- 1080P 30FPS 高画質動画ストリーム

---

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

---

## クイックスタート

### 1. デバイスの接続

カメラのUSBプラグをデバイスのUSBポートに挿すだけです。追加ドライバのインストールは不要です。

### 2. デバイス認識の確認

```bash
# Linux / Jetson / Raspberry Pi
ls /dev/video*
v4l2-ctl --list-devices
```

通常、1つのUSBカメラは2つの`video`デバイスとして表示されます(例:新しく追加された`/dev/video2`、`/dev/video3`)。使用時は数字の小さい方を選択してください。

### 3. Python で映像を読み取る

```python
import cv2

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1920)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1080)
cap.set(cv2.CAP_PROP_FPS, 30)

while True:
    ret, frame = cap.read()
    if not ret:
        break
    cv2.imshow('USB Camera', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
```

---

## チュートリアル一覧

- [USBオートフォーカスカメラ使用チュートリアル——デバイス認識、複数カメラの選択と Python サンプル](/ja/tutorials/accessories/usb-auto-focus-camera)
- [Jetson でのオートフォーカスカメラ使用(video デバイスと GUVCView)](/ja/tutorials/accessories/csi-camera/02-Auto-Focus-Camera)

---

## アプリケーション

- ロボットビジョンと遠隔操作の映像転送
- AI 推論とコンピュータビジョンのプロジェクト
- Jetson / Raspberry Pi のマルチカメラ構成(CSI カメラとの併用)
- ライブ配信、画面録画、映像キャプチャ

---

## よくある質問

**Q: カメラが認識されない?**

**A:** USBケーブルがしっかり接続されているか確認してください。別のUSBポートを試してください。`lsusb` でUSBデバイス一覧を確認します。

**Q: 映像がぼやける?**

**A:** カメラはオートフォーカス機能を搭載しており、初回接続後2〜3秒で自動的にピントが合います。それでもぼやける場合は、レンズ表面の汚れを確認してください。

**Q: 解像度を変更するには?**

**A:** `cap.set(cv2.CAP_PROP_FRAME_WIDTH, width)` と `cap.set(cv2.CAP_PROP_FRAME_HEIGHT, height)` を使用します。

---

## サポート

- 📧 メール: support@juxitech.com
- 🌐 公式サイト: [www.juxitech.com](https://www.juxitech.com)
- 💬 [問題フィードバック](https://github.com/Juxi-Technology/wiki-documents/issues)
