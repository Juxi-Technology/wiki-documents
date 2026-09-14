---
title: ESP32-S3 WiFi 動画モジュール
category: compute-vision
description: Juxi Technology ESP32-S3 WiFi 動画転送モジュール——200 万画素カメラ、WiFi リアルタイム転送、AI ビジョン認識(色/顔/QR)、AP+STA デュアルモード
keywords: [esp32, wifi, 動画転送, カメラ, ai vision]
---

# ESP32-S3 WiFi 動画モジュール

> **[ストアで購入](https://www.juxitech.com/ja/products/esp32-s3-wifi-video-module)**

## 製品概要

ESP32-WiFi 動画転送モジュール(型番 **ESP32-NanoCam**)は、コンパクトでコストパフォーマンスに優れた AI ビジョンソリューションです。デュアルボードモジュラーアーキテクチャ(コア処理ボード + 通信拡張ボード)を採用。コアボードには **ESP32-S3** 高性能プロセッサと 200 万画素高解像度カメラを搭載し、WiFi ビデオストリーム転送、AI ビジョン認識と音声対話機能に対応。ファームウェアプリインストール済みで開封後すぐに使用できます。

**主な特長**:

- 200 万画素高解像度カメラ(1600×1200@30FPS)
- **AP + STA デュアルモード** WiFi リアルタイム転送
- 8 種類の AI モード:猫顔検出、顔検出、色認識、顔認識、QR コードスキャン、LLM 音声対話(小智 AI)、ESP-Claw 音声制御
- オンボード ES8311 オーディオ(マイク + スピーカー)、音声対話対応
- WS2812 RGB ステータス LED
- Type-C ワンクリックファームウェア更新
- 標準 PH2.0 I2C / UART 通信インターフェース

## 製品仕様

| カテゴリ | 仕様 |
|------|------|
| メインMCU | ESP32-S3 N16R8(Espressif 公式、デュアルコア 240MHz) |
| ストレージ | 16MB Flash + 8MB PSRAM |
| カメラ | 200 万画素 CMOS GC2145(1600×1200@30FPS) |
| 視野角 | 対角 68°、水平 49.5° |
| オーディオ | ES8311 コーデック + MEMS マイク + D 級アンプスピーカー |
| ステータス LED | WS2812 RGB |
| ワイヤレス | WiFi(BT デュアルモード)AP/STA + 高利得アンテナ |
| インターフェース | Type-C / I2C / UART(PH2.0) |
| ファンクションキー | リセットキー + BOOT キー |
| 認識能力 | 猫顔、顔検出、顔認識、色、QR コード、音声対話 |

## クイックスタート

### 1. 起動と接続

プリインストールされたファームウェアで開封後すぐに使用可能。電源投入後、モジュールが WiFi ホットスポットを自動作成します:

- スマホ/PC でモジュールのホットスポットに接続
- ブラウザで指定アドレスにアクセスしてリアルタイム映像を確認

### 2. 2 つの動作モード

| モード | 説明 |
|------|------|
| **AP モード** | モジュールが WiFi ホットスポットを自動作成、端末はモジュールに直接接続 |
| **STA モード** | モジュールが既存の WiFi ルーターに接続、端末と同一ネットワークで転送 |

### 3. ホスト接続

**UART 通信**(Raspberry Pi/Jetson Orin):

```
ESP32 模块 RX → 主控 TX
ESP32 模块 TX → 主控 RX
```

**I2C 通信**:標準 PH2.0 I2C インターフェース、顔検出/色認識の**座標データ**を出力可能。

### 4. 二次開発

Type-C で PC に接続しワンクリックファームウェア更新;シリアルコマンドで AI モード(猫顔/顔検出/色/顔認識/QR コード/音声対話)を切替。完全なコマンドは[シリアルプロトコルマニュアル](/ja/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Serial-Protocol)を参照。

---

## チュートリアル一覧

- [クイックスタート——3 分でファームウェア書き込み、WiFi 接続、映像表示](/ja/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Quick-Start)
- [ハードウェア仕様書——完全な GPIO ピンマッピングと電源設計](/ja/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Hardware-Spec)
- [シリアルプロトコルマニュアル——WiFi 設定と AI モードの完全な AT コマンド](/ja/tutorials/accessories/esp32-nanocam/ESP32-NanoCam-Serial-Protocol)
- [AI ビジョンチュートリアル——11 章の段階的実践(顔/猫顔/色/QR コード/音声)](/ja/tutorials/accessories/esp32-nanocam/Ch01-Environment-Setup)
- [ESP32-NanoCam を SO-ARM101 のワイヤレス従動アームコントローラとして使用](/ja/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop)

---

## アプリケーション

- ワイヤレス動画転送(AP/STA デュアルモード)
- AI ビジョン開発(色/顔/QR 認識)
- IoT/AIoT プロジェクト
- ロボットビジョン拡張

---

## よくある質問

**Q: リアルタイム映像はどうやって見ますか?**

**A:** プリインストールされたファームウェアが AP ホットスポットを自動作成。スマホ/PC で接続後、指定の Web ページまたはアプリで確認できます。

**Q: 対応している認識機能は?**

**A:** 色閾値分割 + 軽量 CNN を内蔵し、色、顔、QR コード認識に対応。通信コマンドで切替可能。

**Q: 認識座標を返せますか?**

**A:** はい。I2C/UART 通信インターフェースで顔/色検出の座標データを出力し、二次開発に利用できます。

**Q: ファームウェアはどう更新しますか?**

**A:** Type-C で PC に接続、ワンクリックファームウェア更新に対応。

---

## サポート

- 📧 メール: support@juxitech.com
- 🌐 公式サイト: [www.juxitech.com](https://www.juxitech.com)
- 💬 [問題フィードバック](https://github.com/Juxi-Technology/wiki-documents/issues)