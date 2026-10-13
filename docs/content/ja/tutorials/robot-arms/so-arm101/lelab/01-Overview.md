---
title: "1 · 概要"
description: "LeLab は LeRobot のワークフロー(キャリブレーション、テレオペレーション、記録、訓練、再生)をブラウザー 1 画面にまとめます:できること、動作要件、ファイルの保存先。"
---

# 1 · 概要

> **次へ:** [02 インストールと起動](02-Install.md)

LeLab は、LeRobot のワークフロー——キャリブレーション、テレオペレーション、記録、訓練、再生——を 1 つのブラウザウィンドウに収める web アプリです。

## できること

| ページ | 内容 |
|---|---|
| **Calibration** | 両アームのガイド付きキャリブレーション |
| **Teleoperation** | リーダーアームを動かすとフォロワーが追従し、関節をリアルタイムで配信 |
| **Recording** | カメラ付きで操作を LeRobotDataset に収録 |
| **Datasets** | ディスク上のエピソードを 1 フレームずつ、関節の動きグラフ付きで表示 |
| **Training** | LeRobot の訓練ジョブを開始し、ログを確認 |
| **Inference** | 訓練済みポリシーをフォロワーアームで実行 |
| **Upload** | データセットを Hugging Face Hub に push |

## LeLab と LeRobot

LeRobot はライブラリです——ロボットのドライバ、データセット形式、訓練コード。LeLab はそれを呼び出す FastAPI サーバで、加えてそのサーバと HTTP と WebSocket で通信する React フロントエンドがあります。

- LeLab が公開していない機能も、`lerobot-*` コマンドラインから使えます。
- LeLab は LeRobot を同梱しません。LeLab をインストールすると LeRobot もインストールされます。

## 必要なもの

| | |
|---|---|
| ロボット | **SO-101 リーダー + フォロワーアーム**——唯一対応の構成 |
| コンピュータ | Linux、macOS、Windows |
| Python | **3.12 以降** |
| Node.js | 22——`lelab --dev` でのみ必要 |
| USB | 空きポート 2 つ、アームごとに 1 つ |

キャリブレーション、テレオペレーション、記録はノート PC で動きます。訓練は重い工程で、LeLab は代わりに Hugging Face Hub で実行できます——[6 ページ](06-Train-and-Inference.md)を参照。

## ファイルの保存先

`~/.cache/huggingface/lerobot/` の下です：

| パス | 内容 |
|---|---|
| `calibration/teleoperators/so101_leader/*.json` | リーダーのキャリブレーションファイル |
| `calibration/robots/so101_follower/*.json` | フォロワーのキャリブレーションファイル |
| `ports/leader_port.txt` · `ports/follower_port.txt` | 最後に使ったシリアルポート |
| `saved_configs/*.txt` | 最後に選んだキャリブレーションプロファイル |

データセットは LeRobot が置く場所——デフォルトでは同じツリー——に保存されます。

このキャッシュを消すか再インストールすると、両アームとも再キャリブレーションが必要です。[トラブルシューティング](07-Troubleshooting.md)を参照。

## 用語

LeRobot はアームを役割で呼び、LeLab の API は同じ 2 本のアームに別の名前を使います：

| あなたの呼び方 | LeRobot / LeLab の呼び方 |
|---|---|
| 手で動かすアーム | **leader** · **teleop** |
| 追従するアーム | **follower** · **robot** |

---

> **次へ:** [02 インストールと起動](02-Install.md)

<RelatedProducts slugs="so-arm101" />
