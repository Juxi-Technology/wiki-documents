---
title: AI 音声対話モジュール
category: accessory
description: Juxi Technology AI 音声対話モジュール(CI1302)——110+ 個のオフライン音声コマンド、5 メートルで認識率 99%、中国語/英語のカスタムコマンドワード対応、シリアル/IIC 通信、Arduino/Jetson/RDK/Raspberry Pi/PC 対応
keywords: [ai音声, 音声対話モジュール, ci1302, オフライン音声認識, ウェイクワード, コマンドワード, シリアル, iic, ros1, ros2]
---

# AI 音声対話モジュール

## 製品概要

AI 音声対話モジュールは、启英泰伦の **CI1302** 高性能ニューラルネットワークスマート音声チップをベースに、BNPU V3 脳ニューラルネットワークプロセッサを統合し、オフライン遠距離音声認識に対応します。オンボードの **STC8H コプロセッサ** は音声認識結果を自動的にシリアルまたは IIC データに変換し、外部ホストコントローラデバイスとの通信を簡素化します。認識処理はすべてモジュール上でローカルに実行され、ネットワーク接続は不要です。

**主な特長**:

- 100% オフライン音声認識、ネットワーク不要(プライバシー + 低遅延)
- 出荷時に **110+ 個の音声コマンド** をプリセット、中国語と英語のカスタムコマンドワードに対応(最大約 120 個)
- ウェイクワード “你好，小犀”、15 秒間コマンドが認識されないと自動スリープ、再度ウェイクアップすればすぐに使用可能
- 高忠実度スピーカーと高性能マイクを内蔵、ノイズ低減とエコーキャンセル、5 メートル以内で認識率 99% に到達
- オンボード STC8H コプロセッサが認識結果をシリアル / IIC データとして出力
- アクティブ再生とパッシブ再生の 2 種類の再生モード
- ROS1 / ROS2 SDK、および Arduino / Jetson / RDK / Raspberry Pi / PC 通信チュートリアルを提供

---

## 製品仕様

| カテゴリ | 仕様 |
|------|------|
| 音声チップ | 启英泰伦 CI1302(BNPU V3 ニューラルネットワークプロセッサ、最大 220MHz) |
| ストレージ | 640KB SRAM + 2MB Flash |
| 音声コマンド | 110+ 個をプリセット;中国語/英語のカスタムコマンドワード、最大約 120 個まで書き込み可能 |
| ウェイクアップ方式 | ウェイクワード “你好，小犀”(変更可能) |
| 認識距離 | 5 メートル以内(静かな環境で認識率 99% に到達) |
| オーディオ | 高忠実度スピーカー + 高性能マイク内蔵(ノイズ低減 + エコーキャンセル) |
| 通信インターフェース | シリアル / IIC / Type-C(オンボード STC8H コプロセッサ) |
| 電源 | 5V(Type-C) |
| 対応プラットフォーム | Arduino、Jetson、RDK、Raspberry Pi、PC(STM32 / ESP32 / MSPM0 などの MCU) |
| ソフトウェア | ROS1 / ROS2 SDK、ファームウェア書き込みツール、カスタムコマンドワード用 Web ツール |

---

## クイックスタート

出荷時に音声認識ファームウェアが書き込み済みのため、書き込みなしですぐに体験できます:

1. Type-C データケーブルでモジュールに電源を供給します(5V)
2. ウェイクワード “你好，小犀” を話し、モジュールが “我在” と返答したらコマンドを発話できます(例:“小车前进”)
3. 15 秒以内にコマンドエントリーが認識されない場合、モジュールは “我去休息了” を再生してスリープに入ります。再度使用するときは、もう一度ウェイクワードを話してください

他の認識エントリーを追加する場合は、Web ツールでコマンドワードを変更して新しいファームウェアを生成し、PC ソフトウェアでモジュールに書き込むことで対応できます。詳細は[モジュールファームウェアの書き込み](/ja/tutorials/accessories/ai-voice-module/Firmware-Flashing)と[カスタムプロトコルエントリーの作成](/ja/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries)をご覧ください。

---

## チュートリアル一覧

- [クイックスタート——開封体験、ウェイクアップと再生](/ja/tutorials/accessories/ai-voice-module/Quick-Start)
- [製品資料——製品の特長、動作原理、注意事項とハードウェアインターフェース](/ja/tutorials/accessories/ai-voice-module/Product-Info)
- [モジュールファームウェアの書き込み](/ja/tutorials/accessories/ai-voice-module/Firmware-Flashing)
- [ウェイクワードとコマンドワードの変更](/ja/tutorials/accessories/ai-voice-module/Wake-Word-Commands-Edit)
- [カスタムプロトコルエントリーの作成](/ja/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries)
- [ROS1 音声対話](/ja/tutorials/accessories/ai-voice-module/ROS1-Voice-Interaction) / [ROS2 音声対話](/ja/tutorials/accessories/ai-voice-module/ROS2-Voice-Interaction)
- [シリアルポートプロトコル](/ja/tutorials/accessories/ai-voice-module/Serial-Protocol) / [IIC プロトコル](/ja/tutorials/accessories/ai-voice-module/IIC-Protocol)
- [PC 通信](/ja/tutorials/accessories/ai-voice-module/PC-Communication)
- Arduino: [シリアル通信](/ja/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication) / [IIC 通信](/ja/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication)
- Jetson: [シリアル通信](/ja/tutorials/accessories/ai-voice-module/Jetson-Serial-Communication) / [IIC 通信](/ja/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication)
- RDK: [シリアル通信](/ja/tutorials/accessories/ai-voice-module/RDK-Serial-Communication) / [IIC 通信](/ja/tutorials/accessories/ai-voice-module/RDK-IIC-Communication)
- Raspberry Pi: [シリアル通信](/ja/tutorials/accessories/ai-voice-module/RaspberryPi-Serial-Communication) / [IIC 通信](/ja/tutorials/accessories/ai-voice-module/RaspberryPi-IIC-Communication)

---

## アプリケーション

- ロボットの音声対話とコマンド制御(例:“小车前进”“停止”)
- スマートホームの音声制御(照明、家電)
- 教育・玩具向けの音声製品
- 産業機器の音声制御
- 各種 DIY 音声対話プロジェクト

---

## よくある質問

**Q: ネットワーク接続は必要ですか?**

**A:** 不要です。CI1302 はオフライン音声チップであり、認識はモジュール上でローカルに完了するため、ネットワーク接続なしで動作します。

**Q: 出荷状態のまますぐに使用できますか?**

**A:** はい。出荷時に音声認識機能のファームウェアが書き込み済みのため、Type-C で給電してウェイクワードを話すだけで体験できます。ファームウェアの再書き込みが必要になるのは、カスタムエントリーを追加する場合だけです。

**Q: 英語のコマンドに対応していますか?**

**A:** 対応しています。中国語と英語のコマンドワードをカスタマイズでき、Web ツールで変更してファームウェアを生成し、書き込むことで使用できます。

**Q: ホストコントローラとはどのように通信しますか?**

**A:** オンボードの STC8H コプロセッサが音声認識結果を自動的にシリアルまたは IIC データに変換します。Arduino、Jetson、RDK、Raspberry Pi、PC の通信チュートリアルと ROS1 / ROS2 SDK を提供しています。

**Q: 認識距離はどのくらいですか?**

**A:** 静かな環境では 5 メートル以内で認識率 99% に到達します。騒がしい環境では認識効果に影響します。

---

## 注意事項

- 5V 電圧で給電してください。5V を超えるとモジュールが破損します
- 使用環境はできるだけ静かな場所にしてください。騒がしい環境は認識効果に影響します
- エントリーを発話する際は、声をはっきりと大きくし、話す速度は速すぎないようにしてください。モジュールとの距離は 5 メートル以内に保つことを推奨します

---

## サポート

- 📧 メール: support@juxitech.com
- 🌐 公式サイト: [www.juxitech.com](https://www.juxitech.com)
- 💬 [問題フィードバック](https://github.com/Juxi-Technology/wiki-documents/issues)
