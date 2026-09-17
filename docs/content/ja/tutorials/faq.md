---
title: "FAQ"
description: "Juxi Technology 製品のよくある質問 — ロボットアーム、センサー、アクセサリー"
keywords: [faq, トラブルシューティング]
---

# FAQ

製品カテゴリ別に高頻度の質問をまとめました。

---

## ロボットアーム · SO-ARM101

**Q: ポートが認識されない?**

**A:** `lerobot-find-port` でポートを確認。USB 接続を確認し、Linux では `sudo chmod 666 /dev/ttyACM*` を実行。

**Q: `Could not connect on port "/dev/ttyACM0"` エラー?**

**A:** `/dev/ttyACM*` が存在し権限があることを確認して再試行。

**Q: キャリブレーション時に `Magnitude 30841 exceeds 2047`?**

**A:** ロボットアームの電源を入れ直して、再度キャリブレーションを実行してください。

**Q: サーボエラー `ConnectionError: Failed to sync read 'Present_Position' on ids=[1,...,6]`?**

**A:** そのポートのアームが給電されており、バスサーボが正しく接続されているか確認してください。

**Q: `Motor 'gripper' was not found`?**

**A:** サーボ通信ケーブルと供給電圧を確認してください。

**Q: PyTorch で GPU が利用できない?**

**A:** [Jetson Orin での PyTorch 非互換問題](/ja/tutorials/learning-resources/jetson-orin-pytorch-compatibility) を参照してください。

---

## センサー · IMU

**Q: IMU データがドリフトする?**

**A:** [キャリブレーション](/ja/tutorials/sensors/imu/calibration) を実行。モジュールの固定を確認。温度変化が大きい場合は温度キャリブレーションを追加してください。

**Q: 磁力計の値がおかしい?**

**A:** 磁力計のキャリブレーションを実行 — モーターやマグネットから離れた場所で、ゆっくり全方向に回転させながら行います。

**Q: ROS トピックにデータが表示されない?**

**A:** シリアル権限(`sudo chmod 666 /dev/ttyUSB*`)と launch ファイルのポート設定を確認してください。

---

## アクセサリー · KWS 音声認識

**Q: 音声モジュールが反応しない?**

**A:** 出荷時ファームウェアの書き込みを確認。[ファームウェア書き込み](/ja/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words) を参照。

**Q: シリアル通信でデータが取得できない?**

**A:** ボーレートがチュートリアルと一致しているか、配線(RX/TX クロス)が正しいか確認してください。

---

## アクセサリー · 心拍・血中酸素センサー

**Q: 初期化に失敗する(init fail)?**

**A:** 配線を確認: I2C アドレスはデフォルト 0x57、UART ボーレートは 9600 です。

**Q: 測定値が不安定?**

**A:** センサーと皮膚の密着を確保し、指を動かさないでください。

---

## アクセサリー · USB / CSI カメラ

**Q: カメラが認識されない?**

**A:** USB ケーブルとポートを確認し、`ls /dev/video*` と `v4l2-ctl --list-devices` を実行してください。

**Q: CSI カメラが認識されない?**

**A:** リボンケーブルの向き(金属接点を基板側に)を確認し、**電源を切った状態で**接続してください。JetPack 5.0 以上であることも確認してください。

**Q: GStreamer のパイプラインエラー?**

**A:** JetPack 5.0 以上を確認し、`apt list --installed | grep nvarguscamerasrc` で確認してください。

---

## アクセサリー · その他

**Q: 4K HDMI キャプチャが黒画面?**

**A:** HDMI インターフェースの種類(HDMI/Micro HDMI/DP アダプター)を確認し、適切な変換ケーブルを使用してください。

**Q: OLED スクリーンが点灯しない?**

**A:** I2C 配線(SCL/SDA)を確認してください。ピンのショートはホスト基板を損傷する恐れがあります。

**Q: USB サウンドカードが認識されない?**

**A:** プラグアンドプレイデバイスです。USB 給電を確認し、デフォルトのオーディオ出力デバイスを切り替えてください。

**Q: 2 自由度ジンバルのサーボが反応しない?**

**A:** サーボの電源を確認してください(SCS サーボは外部 6-8.4V が必要です)。

---

## 一般

**Q: チュートリアル内の飛書リンクが開かない?**

**A:** 飛書文書は内部・共同編集者のみです。本 Wiki をご利用いただくか、support@juxitech.com までお問い合わせください。

**Q: 対応プラットフォームは?**

**A:** PC(Linux/Windows)、Jetson、Raspberry Pi — 各チュートリアルの「システム要件」を参照してください。

**Q: サポートを受けるには?**
**A:**
- 📧 support@juxitech.com
- 💬 [GitHub Issues](https://github.com/Juxi-Technology/wiki-documents/issues)

---

## 関連リンク

- [ロボットアーム選定ガイド](/ja/tutorials/robot-arms/select-guide)
- [ダウンロードセンター](/ja/downloads/)
- [ユーザー成功事例](/ja/cases/)
