---
title: JetPack フラッシングとシステム設定
description: "NVIDIA Jetson 向け JetPack の書き込みとシステム設定ガイド。SDK Manager と公式イメージの 2 方式、フラッシュ失敗時の対処、初期設定を解説します。"
keywords: [jetson, jetpack, フラッシュ, システム設定, nvidia]
---

# JetPack フラッシングとシステム設定

> 📌 Jetson AGX Orin 公式キット(JetPack 7.2)をお使いですか?専用シリーズはこちら:[クイックスタート](/ja/tutorials/jetson-agx-orin/quick-start)。

> 📌 Jetson Orin Nano Super 公式キット(JetPack 7.2.1)をお使いですか?専用シリーズはこちら:[クイックスタート](/ja/tutorials/jetson-orin-nano/quick-start)。

> NVIDIA Jetson プラットフォームに初めて触れる開発者向け。JUXI Jetson 開発キットは出荷時に Ubuntu 22.04 がプリインストールされています。本ドキュメントは OS 再インストールや JetPack バージョン変更時の参考用です。

## 1. JetPack とは?

JetPack は NVIDIA が Jetson プラットフォーム用に提供する SDK パッケージで、以下を含みます：

- Ubuntu システムイメージ
- CUDA / cuDNN / TensorRT
- マルチメディア API（L4T）

**バージョン対応**（一般的）：

| Jetson ボード | 推奨 JetPack | システム |
|------------|-------------|------|
| Orin NX / Nano | JetPack 6.x | Ubuntu 22.04 |
| Xavier NX / AGX | JetPack 5.x | Ubuntu 20.04 |
| Orin Nano Super (NVIDIA 公式キット) | JetPack 7.2.1 | Ubuntu 24.04 |

> JUXI [Jetson Orin NX Super 開発キット](/ja/products/jetson-orin-nx-super-kit) は Ubuntu 22.04（JetPack 6.x エコシステム）プリインストール。

> [Jetson Orin Nano Super 開発キット(8GB)](/ja/products/jetson-orin-nano-devkit)——NVIDIA 公式キット(Juxi 取り扱い)——は**ストレージなし・システム未プリインストール**で出荷され、同梱の microSD カードは空です。JetPack 7.2.1 は Jetson ISO 方式でインストールします。手順は [Jetson Orin Nano シリーズ](/ja/tutorials/jetson-orin-nano/quick-start) を参照してください。

## 2. フラッシュ方法

### 方法1：公式イメージ（Ubuntu ブート）

既存の Ubuntu ホストまたは USB ブート環境に適しています：

```bash
# 1. NVIDIA 公式サイトから対応ボードのドライバパッケージ（Driver Package）をダウンロード
# 2. 解凍して Linux_for_Tegra ディレクトリに入る
cd Linux_for_Tegra
sudo ./apply_binaries.sh
# 3. Jetson を Recovery モードにする（REC キーを押しながら電源投入）
# 4. フラッシュ
sudo ./flash.sh <board-name> mmcblk0p1
```

### 方法2：SDK Manager（初心者推奨）

1. [NVIDIA SDK Manager](https://developer.nvidia.com/sdk-manager) をインストール
2. Jetson を PC に接続（Recovery モード）
3. ボードモデル → JetPack バージョンを選択 → コンポーネントをチェック(推奨: CUDA/TensorRT 全選択)
4. フラッシュ + 初回ブート完了を待つ

> ⚠️ フラッシュには 20〜60 分かかります。途中で**ケーブルを抜いたり電源を切ったりしない**でください。

## 3. フラッシュ失敗のトラブルシューティング

| 現象 | 対処 |
|------|------|
| Recovery モードに入れない | REC キーを押しながら電源投入を確認、`lsusb` で NVIDIA デバイスが検出されるか確認 |
| フラッシュ途中で失敗 | **データケーブル**を交換（まずケーブル問題を排除）；PC の省電力モードをオフ；再フラッシュ |
| フラッシュ後に黒画面 | ディスプレイ接続を確認（Orin は DP）；Recovery モードに戻して再フラッシュ |
| バージョン不一致と表示 | ボードモデルと JetPack バージョンの対応を確認（ボード側面のシルク印刷） |

## 4. システム基本設定

### 4.1 ネットワークとソース

```bash
# 国内ミラーに変更(オプション、apt 高速化)
sudo sed -i 's|archive.ubuntu.com|mirrors.tuna.tsinghua.edu.cn|g' /etc/apt/sources.list
sudo apt update
```

### 4.2 GPU 環境の確認

```bash
# JetPack/CUDA の確認
cat /etc/nv_tegra_release
nvcc --version
# PyTorch GPU の検証
python3 -c "import torch; print(torch.cuda.is_available())"
```

> PyTorch が使えない場合は [Jetson Orin の PyTorch 非互換問題](/ja/tutorials/learning-resources/jetson-orin-pytorch-compatibility) を参照。

### 4.3 64G メモリモードの有効化（Orin）

```bash
sudo nvpmodel -m 0          # 最高性能モード
sudo jetson_clocks          # 周波数上限のロック解除
```

### 4.4 ルートパーティションの拡張

JetPack フラッシュ後、ルートパーティションが SD/eMMC の一部しか使用していない場合があります：

```bash
sudo systemctl enable --now nvresize             # 自動拡張
# または手動:
sudo resize2fs /dev/nvme0n1p1                    # 実際のデバイスに合わせる
```

## 5. よくある質問

**Q: フラッシュ後に WiFi が出ない?**

**A:** Orin シリーズコアボードは M.2 WiFi モジュールの外付けが必要。デュアルバンドアンテナの接続を確認してください。

**Q: Recovery モードにはどう入る?**

**A:** 電源オフ → REC（または BOOT）キーを押しながら電源/Type-C 接続 → `lsusb` で `NVIDIA Corp.` デバイスが確認できれば成功。

**Q: 必要なストレージ容量は?**

**A:** 推奨 ≥128GB SSD（SD カードは書き込み速度がボトルネック）。256GB が開発キットの標準構成です。

---

## 関連リンク

- [Jetson Orin NX Super 開発キット](/ja/products/jetson-orin-nx-super-kit)
- [エッジ AI 導入入門](/ja/topics/edge-ai-intro)
- [ROS 入門チュートリアル](/ja/tutorials/ros-intro)

## 技術サポート

- 📧 メール：support@juxitech.com
- 🌐 公式サイト：[www.juxitech.com](https://www.juxitech.com)
