---
title: Jetson Orin NX Super 開発キット
description: 鉅犀科技 NVIDIA Jetson Orin NX SUPER 開発キット——117/157 TOPS エッジ AI コンピューティングプラットフォーム、Ubuntu 22.04 と 256GB NVMe SSD プリインストール
keywords: [jetson, orin nx, edge ai, エッジコンピューティング, leRobot, ロボット]
---

# Jetson Orin NX Super 開発キット

> **[ストアで購入](https://www.juxitech.com/ja/products/nvidia-jetson-orin-nx-super-developer-kit)**

## 製品概要

NVIDIA Jetson Orin NX SUPER 開発キットは、高度なロボット開発者、生成 AI 研究者、組み込みシステムエンジニア向けの高性能エッジ AI コンピューティングプラットフォームです。Jetson Orin NX SUPER モジュールを採用し、最大 **117 TOPS (8GB) / 157 TOPS (16GB)** の AI 性能を提供——初代 Jetson Nano の 234 倍 / 314 倍です。

開封後すぐに使用でき、ストレージの別途購入やシステムインストールは不要:

- **Ubuntu 22.04** プリインストール
- **256GB NVMe PCIe 3.0 x4 SSD** プリ構成(読み取り最大 2800MB/s)
- 2.4G/5G デュアルバンド WiFi 5 + Bluetooth 5.0(4dBi 高利得アンテナ)
- PWM 制御ボールベアリングファン(寿命 50,000 時間)
- アクリル筐体、カメラマウント用穴加工済み

**適用シーン**:大規模言語モデルのエッジ展開、高度なコンピュータビジョン、LeRobot SO-ARM ロボット開発。

## 製品仕様

| カテゴリ | 仕様 |
|------|------|
| コアモジュール | NVIDIA Jetson Orin NX SUPER |
| AI 性能 | 117 TOPS(8GB)/ 157 TOPS(16GB) |
| CPU | 6 コア NVIDIA Carmel ARMv8.2 @ 2.0GHz |
| GPU | NVIDIA Ampere アーキテクチャ、1792 CUDA コア + 56 Tensor コア + 2 NVDLA エンジン |
| メモリ | 8GB / 16GB LPDDR5(102.4 GB/s) |
| ストレージ | 256GB NVMe PCIe 3.0 x4 SSD(読み取り最大 2800MB/s) |
| 無線 | 2.4G/5G デュアルバンド WiFi 5 + Bluetooth 5.0、4dBi 高利得デュアルアンテナ |
| 冷却 | PWM ボールベアリングファン(50,000 時間)+ アルミヒートシンク |
| 映像出力 | DP 1.4、最大 4K@60Hz (H.265) |
| インターフェース | 4× USB 3.2、DP 4K60Hz、40 ピン GPIO ヘッダ |
| システム | Ubuntu 22.04 プリインストール |

## ハードウェア接続

### クイックスタート

1. 電源アダプタ(19V 40W)を接続
2. DP-HDMI ケーブルでモニターに接続
3. キーボードとマウス(USB 3.2)を接続
4. 起動してプリインストールされた Ubuntu 22.04 へ

### カメラ取付

アクリル筐体にはカメラマウント用の穴が加工済み。デュアルカメラ設置対応(CSI / USB)。

## ソフトウェア構成

### PyTorch GPU の確認

```python
import torch
print(torch.cuda.is_available())  # True と出力されるはず
```

### LeRobot のインストール(SO-ARM100/101 開発)

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot
pip install -e ".[feetech]"
```

### 参考

- [Jetson Orin での PyTorch 互換性問題](/ja/tutorials/learning-resources/jetson-orin-pytorch-compatibility)
- [SO-ARM101 チュートリアル](/ja/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)

## キットバリエーション

| キットタイプ | 追加コンポーネント | 適用シーン |
|---------|---------|---------|
| **標準キット** | メインボード + アクリル筐体 + 256GB SSD + WiFi/BT + アンテナ + 19V 40W 電源 + DP-HDMI ケーブル + Type-C ケーブル + ドライバー | 汎用高性能 AI 開発 |
| **OLED ディスプレイキット** | + 0.91 インチ OLED ステータスディスプレイ | システムリソースのリアルタイム監視 |
| **USB オーディオキット** | + USB サウンドカード(スピーカー + マイク、ノイズ低減/エコーキャンセル) | 音声対話、LLM ボイスアシスタント |
| **IMX219 カメラキット** | + IMX219 CSI カメラ(77° FOV、8MP)+ アルミ調整式マウント | ネイティブ CSI ビジョン |
| **オートフォーカスカメラキット** | + 86° オートフォーカス USB カメラ(1080P)+ アルミ調整式マウント | 汎用ビジョン、ロボットアーム |
| **SO-ARM100/101 ロボットキット** | + USB 3.0 HUB + オートフォーカスカメラ + 専用取付マウント | ロボットアームビジョン開発 |

## バージョン選択

| バージョン | AI 性能 | 推奨シーン |
|------|---------|---------|
| **8GB** | 117 TOPS | 高度な AI 開発、中級ロボットプロジェクト、LLM エッジ展開 |
| **16GB** | 157 TOPS | 高性能具身知能、大規模モデルエッジ推論、複雑なビジョンタスク |

## よくある質問

**Q: 標準 Orin NX よりどれくらい速い?**

**A:** 1.7 倍(SUPER バージョンの最適化)。

**Q: システムのインストールは必要?**

**A:** いいえ。Ubuntu 22.04 と 256GB SSD はプリインストール済み。電源を入れるだけです。

**Q: SO-ARM101 はサポートされますか?**

**A:** 完全互換。専用ロボットビジョンキット(カメラ + マウント)があり、LeRobot エコシステムとシームレスに連携します。

**Q: 冷却の騒音は?**

**A:** PWM ボールベアリングファンで、40W フル負荷でも安定した性能と低騒音。寿命 50,000 時間(油圧ファンより 10 倍耐久)。

## サポート

- 📧 メール: support@juxitech.com
- 🌐 公式サイト: [www.juxitech.com](https://www.juxitech.com)
- 💬 [問題フィードバック](https://github.com/Juxi-Technology/wiki-documents/issues)
