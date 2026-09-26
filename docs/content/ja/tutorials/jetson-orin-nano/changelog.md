---
title: 変更履歴
sidebar_label: 変更履歴
slug: /appendix/changelog
description: >-
  本ドキュメントセットの更新内容と、NVIDIA Jetson Orin Nano Super Developer Kit の
  JetPack リリース履歴。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
review_owner: cheny
---

# 変更履歴

## ドキュメントの更新

| 日付 | 変更内容 |
|---|---|
| 2026-09-26 | ドキュメントセットをドラフトとして初公開:クイックスタート、書き込みと更新、システムの確認、製品概要、インターフェースとハードウェアレイアウト、FAQ、トラブルシューティング、ダウンロード、JetPack 6.x → 7.2 移行ガイド、5 つのチュートリアル(ローカル LLM、メモリ効率、DeepStream、ロボティクス、エージェント AI)、用語集、および本変更履歴。JetPack 7.2.1 に関する NVIDIA 公式ドキュメントに基づいて執筆。実機での検証はまだ行われていません。 |

## 本キットの JetPack リリース

| JetPack | Jetson Linux (L4T) | 日付 | 備考 |
|---|---|---|---|
| **7.2.1** | **39.2.1** | 2026-08 | **最新。** ISO は Orin Nano Developer Kit をデフォルトで Super Mode 構成でフラッシュするようになり、ISO で更新した個体が以前の電力プロファイルのままになる r39.2 の問題に対処しました。 |
| 7.2 | 39.2.0 | 2026-06 | Orin ファミリー向けの最初の JetPack 7 リリース(Ubuntu 24.04、カーネル 6.8、CUDA 13.x)。このリリースの既知の問題:Jetson ISO で更新した個体はデフォルトで Super モードになりませんでした — [トラブルシューティング](/ja/tutorials/jetson-orin-nano/troubleshooting)を参照。 |
| 6.2.x | 36.x | 2025 | このキット向けの JetPack 6 系(Ubuntu 22.04)。「Super」電力モードはここで導入されました — 同じハードウェアで、より高い CPU/GPU/メモリクロックと 25 W モードを備えます。 |
| 6.0 / 6.1 | 36.x | 2024–2025 | 以前の JetPack 6 リリース。 |
| 5.1.3 | 35.x | 2023–2024 | 現在も参照される最も古いファームウェア系統:JetPack 6.x Update Path は 5.1.3 のブリッジイメージを使い、非常に古いキットを JetPack 7 をインストールできるよう JetPack 6.x 世代のファームウェアに引き上げます。 |

完全な履歴:[JetPack アーカイブ](https://developer.nvidia.com/embedded/jetpack-archive) · [Jetson Linux アーカイブ](https://developer.nvidia.com/embedded/jetson-linux-archive)

キットを更新するには**[書き込みと更新](/ja/tutorials/jetson-orin-nano/flashing-and-updates)**、
現在実行している内容を確認するには**[システムの確認](/ja/tutorials/jetson-orin-nano/verify-your-system)**を
ご覧ください。

## 出典

- [JetPack SDK ダウンロード](https://developer.nvidia.com/embedded/jetpack/downloads)(2026-09-26 確認)
- [Jetson Linux 39.2.1 リリースノート(PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)(2026-09-26 確認)
- [NVIDIA JetPack 6.2 アナウンス — Jetson Orin Nano の Super モード](https://developer.nvidia.com/blog/nvidia-jetpack-6-2-brings-super-mode-to-nvidia-jetson-orin-nano-and-jetson-orin-nx-modules/)(Super 電力モードのベンダー発表としてリンク)

*ステータス:ドラフト、cheny によるレビュー待ち。記載日時点の NVIDIA 公式
ドキュメントに基づく内容であり、Juxi Technology による実機検証はまだ行われていません。*

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。本ページは Juxi Technology
によって公開されており、NVIDIA の公式出版物ではありません。
