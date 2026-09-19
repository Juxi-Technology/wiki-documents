---
title: USB ドライバ不要サウンドカード
category: accessory
description: "オンボードマイクとスピーカー搭載の USB ドライバ不要サウンドカード。挿すだけで認識され、Raspberry Pi や Jetson の音声対話開発に最適です。"
keywords: [sound card, サウンドカード, usb audio, 音声対話]
---

# USB ドライバ不要サウンドカード

> **[ストアで購入](https://www.juxitech.com/ja/products/usb-2-0-driver-free-sound-card-onboard-mic-speaker-for-ai-voice-interaction)**

## 製品概要

USB ドライバ不要サウンドカードは、オンボードのマイクとスピーカーを備えたプラグアンドプレイの音声デバイスです。システムが自動的に音声入出力デバイスとして認識します。ロボット音声対話、AI 音声アシスタント開発(KWS モジュール、LLM ボイスアシスタントとの併用)に最適です。

**主な特長**:

- プラグアンドプレイ、ドライバ不要
- オンボードマイク + スピーカー
- Raspberry Pi、Jetson、PC 対応
- USB オーディオキットと併用して Jetson 開発に使用

## 仕様

| カテゴリ | 仕様 |
|------|------|
| インターフェース | USB 2.0 |
| オーディオ | 入力(マイク)+ 出力(スピーカー) |
| プラットフォーム | Raspberry Pi / Jetson / PC |
| サンプルレート | 16KHz / 48KHz、16 ビット |

## クイックスタート

```bash
# USB を挿すと自動認識
# デバイスを確認
arecord -l    # 録音デバイス
aplay -l      # 再生デバイス
```
## 関連チュートリアル

- [USB ドライバ不要サウンドカードチュートリアル](/ja/tutorials/accessories/usb-audio-card-tutorial)
- [ダウンロードセンター](/ja/downloads/)

## サポート

- 📧 メール: support@juxitech.com
- 🌐 公式サイト: [www.juxitech.com](https://www.juxitech.com)
