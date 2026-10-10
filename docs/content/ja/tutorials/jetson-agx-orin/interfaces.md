---
title: インターフェースとハードウェアレイアウト
sidebar_label: インターフェース & ハードウェアレイアウト
slug: /product/interfaces
description: >-
  NVIDIA Jetson AGX Orin 開発キットのラベル付きレイアウトとコネクタリファレンス
  — ボタン、ポート、キャリアボードのコネクタ、ディスプレイとストレージの
  オプション、40 ピンヘッダー、オートメーションヘッダー。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-23
review_owner: cheny
---

# インターフェースとハードウェアレイアウト

開発キットには 2 つの参照体系があります。NVIDIA の公式ガイドと本ページで使用している**側面図の番号ラベル(0–12)**と、PCB に印刷された**キャリアボードのコネクタ番号(J 番号)**です。以降のガイドでも両方を参照するため、どちらも手元に置いておいてください。

## 側面図 — ラベル付き部品

![開発キット、ボタンと DC 入力側のアングル](/images/jetson-agx-orin/jaodk_labeled_01.png)
![開発キット、PCIe カバーと 40 ピン側のアングル](/images/jetson-agx-orin/jaodk_labeled_02.png)

| # | 部品 | 備考 |
|---|---|---|
| 0 | 白色 LED | 電源インジケーター |
| 1 | 電源ボタン | |
| 2 | Force Recovery ボタン | Force Recovery / 書き込みモードで使用 |
| 3 | リセットボタン | |
| 4 | USB Type-C ポート | DFP のみ(周辺機器を接続) |
| 5 | DC 電源ジャック | バレルジャック — 仕様は J41 を参照 |
| 6 | イーサネットポート | |
| 7 | USB Type-A ×2 | USB 3.2 Gen 2 |
| 8 | DisplayPort 出力 | **キット上で唯一のディスプレイインターフェース** |
| 9 | USB micro-B ポート | デバッグ用 |
| 10 | USB Type-C ポート | 書き込みとデータ転送(UFP と DFP) |
| 11 | 40 ピンコネクタ | |
| 12 | USB Type-A ×2 | USB 3.2 Gen 1 |

## キャリアボード — コネクタ

| マーク | コネクタ | 仕様 / 備考 |
|---|---|---|
| DS2 | 白色 LED | |
| S1 / S2 / S3 | 電源 / リセット / Force Recovery ボタン | |
| J24 | USB Type-C(DC ジャックの上) | DFP のみ、USB 3.2 Gen 2 — **付属の USB-C 電源はここに接続します** |
| J41 | DC 電源ジャック | 外径 5.5 mm、内径 2.5 mm、センタープラス |
| J17 | イーサネット | 最大 10GBASE-T |
| J33 | USB Type-A ×2(イーサネットの隣) | USB 3.2 Gen 2 |
| J18 | DisplayPort 出力 | MST 対応 |
| J26 | USB micro-B | デバッグ UART |
| J40 | USB Type-C(40 ピンヘッダーの隣) | UFP と DFP — **SDK Manager 用にホスト PC と接続する際に使用するポート** |
| J30 | 40 ピンコネクタ | PCB 上の Pin 1 は白い三角形でマークされています |
| J42 | オートメーションヘッダー | 自動電源オン、Wake-on-LAN、スロットリングトリガー(ピンは下記) |
| J13 | RTC バックアップバッテリーコネクタ | |
| J509 | カメラコネクタ | |
| J502 | JTAG デバッグコネクタ | |
| J505 | M.2 E-Key スロット | 通常は Wi-Fi モジュールを搭載 |
| J511 | HD Audio ヘッダー | |
| J1 | M.2 M-Key スロット | NVMe SSD 用 |
| J10 | microSD カードスロット | UHS-1 |
| J3 | Jetson モジュールコネクタ | 699 ピン |
| J6 | PCIe x16 コネクタ | 電気的には PCIe 4.0 ×8 |
| J9 | ファンコネクタ | 4 ピン、1.25 mm ピッチ |

> **最初によく聞かれる 3 つのポイント:**
> - **ディスプレイ:** DisplayPort(J18)が*唯一の*ディスプレイ出力です — HDMI ポートはなく、DisplayPort を USB-C 経由で出力することもできません。HDMI ディスプレイを使う場合は、アクティブな DP→HDMI アダプターまたはケーブルを使用してください。
> - **電源:** 付属の USB-C 電源は **J24**(DC ジャックの上の USB-C ポート)に接続します。ご自身で電源を用意する場合は、別途バレルジャック入力(J41)を利用できます。
> - **ホスト PC との接続:** SDK Manager やシリアルコンソールを使う場合は、**J40**(40 ピンヘッダーの隣の USB-C ポート)を使用してください — J24 ではありません。

## DisplayPort 出力

- DP SST、DP MST(外部ディスプレイ最大 2 台)、DP DSC に対応
- 最大解像度:8K@30 / 4K@120(DSC の有無を問わず)
- 出力フォーマット:RGB 8/10 bpc、YUV444 8/10 bpc

## ストレージオプション

- **デフォルト:** モジュール上の eMMC フラッシュメモリ
- **オプション:** NVMe SSD(M.2 M-Key、J1)・microSD カード(J10、UHS-1)・USB ドライブ

Jetson ISO インストーラーはシステムを eMMC または NVMe にインストールできます。SDK Manager はベース L4T BSP を対応する任意のストレージメディアに書き込めます。

## 40 ピンヘッダー(J30)

![40 ピンヘッダーのピン配置](/images/jetson-agx-orin/jao_cbspec_figure_3-4_black-bg.png)
*40 ピンヘッダーのピン配置 — NVIDIA の Carrier Board Specification より。*

![40 ピンヘッダーの Pin 1 マーク](/images/jetson-agx-orin/jao_40pin_pin1_marking.png)
*Pin 1 は PCB 上で白い三角形によって示されています。*

## オートメーションヘッダー(J42)

生産および自動化向けの配線に使用します:

- Pin 1、12:GND
- Pin 2、3、4:入力。Force Recovery、リセット、電源ボタンと同じ機能
- Pin 5–6:オープン = 自動電源オン無効;ショート = 自動電源オン有効
- Pin 7:CVB_STBY 出力 — モジュールがスリープ状態かどうかを示します
- Pin 8:SYSTEM_OC 入力 — Tegra のスロットリングをトリガーします
- Pin 9–10:オープン = 電源オフ状態からの Wake-on-LAN 起動無効;ショート = 有効
- Pin 11:JTAG_TRST — JTAG テストリセット

## 参考資料

- [ハードウェアレイアウト — Jetson AGX Orin 開発キットユーザーガイド](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html)(2026-09-23 確認)
- キャリアボードの詳細は、*NVIDIA Jetson AGX Orin Developer Kit Carrier Board Specification*(NVIDIA の[ダウンロードページ](https://developer.nvidia.com/embedded/downloads)からリンク)を参照してください。

*ステータス: レビュー済み（2026-10-11）。上記の手順と数値は、記載の日付時点の NVIDIA 公式ドキュメントに基づくものです。Juxi Technology による実機検証はまだ行われていません。*

**画像クレジット:** レイアウト図とピン配置図は、NVIDIA 公式の *Jetson AGX Orin Developer Kit User Guide* および *Carrier Board Specification*(2026-09-23 ダウンロード)からのものであり、著作権は © NVIDIA Corporation に帰属します。

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。本ページは Juxi Technology によって公開されており、NVIDIA の公式出版物ではありません。
