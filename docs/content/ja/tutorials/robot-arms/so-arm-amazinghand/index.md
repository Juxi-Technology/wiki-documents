---
title: "SO-ARM101 + AmazingHand 使用チュートリアル"
description: "SO-ARM101 フォロワーアームと AmazingHand 器用ハンドの遠隔操作、データ収集、訓練の全工程をステージ別に再現するチュートリアルの総合案内です。"
---


# SO-ARM101 + AmazingHand 使用チュートリアル

本チュートリアルは、**SO-ARM101 フォロワーアーム + AmazingHand 器用なハンド** の遠隔操作、データ収集、訓練の全工程を再現するためのものです。LeRobot（公式リポジトリのカスタム版）に基づきます。

チュートリアルは**ステージ**ごとに構成され、各ステージは独立したディレクトリになっています。内部は OS ごとに `win.md`（Windows）と `linux.md`（Linux）の 2 つのドキュメントに分かれています。お使いの OS に応じて該当するドキュメントをお読みください。

---

## ハードウェアとソフトウェアの概要

|機器|シリアルポート（例、要置換）|サーボ型番|説明|
|---|---|---|---|
|リーダーアーム（Leader）|`COM54` / `/dev/ttyACM1`|複合型番<br>`sts3125-C001、sts3215-C044、sts3215-C046`|遠隔操作の入力、6 番グリッパーを保持|
|フォロワーアーム（Follower）|`COM58` / `/dev/ttyACM0`|`sts3215-C018`（1-5 番）|実行側、6 番グリッパーを取り外し|
|AmazingHand 器用なハンド|`COM11` / `/dev/ttyACM2`|`scs0009`（8 個、ID 1-8）|フォロワーアーム先端、独立シリアルポート|

> **⚠️ シリアルポート名はマシンごとに異なります**：上の表は例です。COM 番号/デバイスパスは各 PC で異なるため、必ず `lerobot-find-port` で本機の実際の値を確認し、すべてのコマンドのプレースホルダーを置き換えてください。

> 3 つの機器は**それぞれ独立したシリアルポート、独立した電源**が必要です。SCS0009（プロトコル 1）と STS3215（プロトコル 0）は同一バス上で互換性がありません。

---

## チュートリアルのディレクトリ構成

```Plaintext
tutorials/
├── README.md                          # 本ファイル（概要）
├── 01-environment/                    # ステージ1：環境構築
│   ├── win.md                         #   Windows 環境構築
│   └── linux.md                       #   Linux 環境構築
├── 02-calibration/                    # ステージ2：キャリブレーション
│   ├── win.md
│   └── linux.md
├── 03-teleoperation/                  # ステージ3：遠隔操作
│   ├── win.md
│   └── linux.md
├── 04-data-collection/                # ステージ4：データ収集
│   ├── win.md
│   └── linux.md
├── 05-training/                       # ステージ5：モデル訓練
│   ├── win.md
│   └── linux.md
└── 06-deployment/                     # ステージ6：デプロイと評価
    ├── win.md
    └── linux.md
```

---

## 推奨の閲覧順序

|手順|ステージ|Windows|Linux|
|---|---|---|---|
|1|環境構築|01-environment/win.md|01-environment/linux.md|
|2|キャリブレーション|02-calibration/win.md|02-calibration/linux.md|
|3|遠隔操作|03-teleoperation/win.md|03-teleoperation/linux.md|
|4|データ収集|04-data-collection/win.md|04-data-collection/linux.md|
|5|モデル訓練|05-training/win.md|05-training/linux.md|
|6|デプロイと評価|06-deployment/win.md|06-deployment/linux.md|

---

## 各ステージの主な違い早見表

|項目|Windows|Linux|
|---|---|---|
|Python 環境|Miniconda + `conda create -n lerobot python=3.12`|Miniforge + 同じコマンド|
|シリアルポート名|`COM54` / `COM58` / `COM11`（例）|`/dev/ttyACM0/1/2`（例）|
|シリアルポート権限|特別な設定は不要|`sudo chmod 666 /dev/ttyACM*` または udev ルールが必要|
|コマンド呼び出し|conda 有効化後に `lerobot-xxx`|conda 有効化後に `lerobot-xxx`|
|CUDA 訓練|CUDA 版 torch を手動でインストール|公式サポート、解決がスムーズ|

---

## 共通の注意事項

1. **まずステージ1 を通してから次のステージへ**——環境は以降すべてのコマンドの前提です。

2. **PC ごとに再キャリブレーションが必須**：特にハンド角度（`lerobot-calibrate-amazing-hand`）は、config 内の角度は AmazingHand 公式の汎用デフォルトで、あくまでフォールバックです。`hand_angles.json` が存在する場合は本機の実測値が優先して読み込まれます。

3. **キャリブレーションファイルの場所**：`~/.cache/huggingface/lerobot/calibration/`、マシンを変える場合は移行または再キャリブレーションが必要です。

4. **初回の遠隔操作では必ず方向を検証**：グリッパーが開く ↔ ハンドが開く、つまむ ↔ ハンドが閉じる。

5. 各ステージの `win.md` / `linux.md` には**そのプラットフォーム固有の注意事項**が含まれています。最後までお読みください。

---

## トラブルシューティングの入口

各ステージのドキュメントに、プラットフォーム別のトラブルシューティング表があります。よくある問題：

- conda が未初期化/コマンドが見つからない

- シリアルポートの権限不足（Linux）

- ハンド/アームの方向マッピングの誤り

- ハンド角度が未キャリブレーションによる開閉異常

各ステージのドキュメントを参照してください。

## 関連リンク

- [AmazingHand 器用なハンド使用チュートリアル](https://juxitech.feishu.cn/wiki/PR1JwkQxaiDAn1k85e2cZIi5nTf)
- [SO-ARM101 ロボットアームチュートリアル](https://juxitech.feishu.cn/wiki/NOWXw9NOJiDTs2kRr7RcdIrKnvg)

<RelatedProducts slugs="so-arm101,amazinghand" />
