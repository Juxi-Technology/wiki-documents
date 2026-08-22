---
title: よくある質問 (FAQ)
description: Juxi Technology 製品のよくある質問 — ロボットアーム、センサー、アクセサリー
keywords: [faq, トラブルシューティング]
---

# よくある質問 (FAQ)

製品カテゴリ別に高頻度の質問をまとめました。

## ロボットアーム · SO-ARM101

**Q: ポートが認識されない?**
`lerobot-find-port` でポートを確認。USB 接続を確認し、Linux では `sudo chmod 666 /dev/ttyACM*` を実行。

**Q: `Could not connect on port "/dev/ttyACM0"` エラー?**
`/dev/ttyACM*` が存在し権限があることを確認して再試行。

## センサー · IMU

**Q: IMU データがドリフトする?**
[キャリブレーション](/ja/tutorials/sensors/imu/calibration) を実行。モジュールの固定を確認。

## アクセサリー · KWS

**Q: 音声モジュールが反応しない?**
出荷時ファームウェアの書き込みを確認。[ファームウェア書き込み](/ja/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words) を参照。

## 一般

**Q: サポートを受けるには?**
- 📧 support@juxitech.com
- 💬 [GitHub Issues](https://github.com/Juxi-Technology/wiki-documents/issues)