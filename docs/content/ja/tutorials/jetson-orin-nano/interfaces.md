---
title: インターフェースとハードウェアレイアウト
sidebar_label: インターフェース & ハードウェアレイアウト
slug: /product/interfaces
description: >-
  NVIDIA Jetson Orin Nano Super Developer Kit のラベル付きレイアウトとコネクター
  リファレンス — すべてのポート、スロット、ヘッダー、コントロール、モジュール
  裏面の microSD スロット、カメラコネクター、電源、シリアルコンソール。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html
    checked: 2026-09-26
  - source: https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/slow-wi-fi-on-orin-nano-devkit-rtl8822ce-802-11ac/368697
    checked: 2026-09-26
review_owner: cheny
---

# インターフェースとハードウェアレイアウト

このキットは 2 枚のボードで構成されています:**Jetson Orin Nano モジュール**(P3767)と**リファレンスキャリアボード**(P3768)で、キット全体は P3766 です。本ページでは、NVIDIA 公式のマーク(1～12)を用いて、コネクターとコントロールを説明します。

## 番号付きレイアウト — ラベル付き部品

![開発キットの番号付きレイアウト](/images/jetson-orin-nano/jetson-orin-nano-qtr_numbered.png)
*公式の番号付きレイアウト — NVIDIA のマーク 1～12。*

| # | 部品 | 備考 |
|---|---|---|
| 1 | microSD カードスロット | **モジュールの裏面** — 下記参照 |
| 2 | 40 ピン拡張ヘッダー | UART、SPI、I2S、I2C、GPIO |
| 3 | 電源インジケーター LED | 緑色。キットの電源が入ると点灯 |
| 4 | USB-C ポート | ホスト、デバイス、USB リカバリーモード。映像出力なし |
| 5 | ギガビットイーサネットポート | RJ45 |
| 6 | USB 3.2 Type-A ×4 | 10 Gbps。2 段積みコネクター ×2 |
| 7 | DisplayPort 出力 | **キット上で唯一のディスプレイ出力** |
| 8 | DC 電源ジャック | 5.5 mm × 2.5 mm バレルジャック |
| 9 | MIPI CSI カメラコネクター ×2 | 22 ピン、0.5 mm ピッチ |
| 10 | M.2 Key-M スロット(2280) | PCIe 3.0 ×4 — NVMe SSD 用 |
| 11 | M.2 Key-M スロット(2230) | PCIe 3.0 ×2 — NVMe SSD 用 |
| 12 | M.2 Key-E スロット(2230) | 付属のワイヤレスモジュールを装着済み |

> **最初によく聞かれる 3 つのポイント:**
> - **ストレージ:** eMMC はなく、**箱にストレージもありません**。microSD カードまたは NVMe SSD を追加してください。
> - **microSD スロット:****モジュールの裏面**にあります — 下記参照。
> - **ディスプレイ:** DisplayPort が*唯一の*ディスプレイ出力です — HDMI はなく、USB-C 経由の映像もありません。

## microSD スロット — モジュールの裏面

![モジュール裏面の microSD スロット](/images/jetson-orin-nano/jetson-orin-nano-dev-kit-sd-slot.jpg)
*カードは**モジュールの裏面**に挿入します — NVIDIA の画像(拡大図付き)。*

> **注意:** microSD スロット(マーク 1)は**モジュールの裏面**にあり、キャリアボード上では
> ありません。このキットで最も見落とされやすい物理的ディテールです。インストーラーを
> 起動する前にカードを挿入してください。

- microSD カードが挿入されていると、キットはそのカードから起動します。64 GB UHS-1 以上を推奨します。
- インストーラーがカードを表示しない場合、NVIDIA のトラブルシューティングのガイダンスは、カードがモジュールのスロットに完全に挿入されているかを確認することです。
- JetPack 7.2 以降に SD カードイメージはありません。インストール内容を変更するには、サポートされたインストール経路を使用してください — **[書き込みと更新](/ja/tutorials/jetson-orin-nano/flashing-and-updates)** を参照。

## ストレージオプション

- **microSD**(モジュール裏面、マーク 1)— モジュールのメインストレージ。
- **NVMe SSD** — M.2 Key-M スロット(後述のマーク 10 と 11)に 2280 または 2230 サイズで装着。
- **USB ドライブ** — USB-C または Type-A に接続。起動順序は UEFI Boot Manager で設定します。

何を買うべきかと初回起動の流れは **[クイックスタート](/ja/tutorials/jetson-orin-nano/quick-start)** を参照してください。

## USB

| ポート | 速度 | モード | 備考 |
|---|---|---|---|
| USB 3.2 Type-A ×4(マーク 6) | USB 3.2 Gen 2、10 Gbps | ホストのみ | 2 段積みコネクター ×2。VBUS は 1 段あたり 3 A まで |
| USB-C(マーク 4) | USB 3.2 Type-C | ホスト、デバイス、USB リカバリー | データ専用 — このポートは映像を出力しません |

**デバイスモード**では、USB-C ポートはキットをホスト PC に対して次のように提示します:

- **L4T-README** ファイルを含む大容量ストレージデバイス。
- USB シリアルデバイス。
- USB イーサネット(RNDIS)リンク — Jetson は **192.168.55.1** です。

## DisplayPort 出力

- 出力は 1 つだけです(マーク 7):**DisplayPort 1.2(MST 対応)**。HDMI ポートはなく、USB-C ポートは映像を伝送しません。
- HDMI モニターには、DisplayPort-HDMI アダプターを使用します。
- ディスプレイ出力がない場合は、モニターを直接接続してください — KVM スイッチやアダプターの多段接続は避けてください。

## イーサネット

- ギガビットイーサネット ×1(RJ45)、マーク 5。このキットに 10 GbE ポートはありません。

## M.2 スロット

| マーク | スロット | サイズ | 電気仕様 | 装着可能なもの |
|---|---|---|---|---|
| 10 | M.2 Key-M | 2280 | PCIe 3.0 ×4 | NVMe SSD |
| 11 | M.2 Key-M | 2230 | PCIe 3.0 ×2 | NVMe SSD |
| 12 | M.2 Key-E | 2230 | — | 付属のワイヤレスモジュール(装着済み) |

### ワイヤレスモジュール

- Key-E スロットは**装着済み**で出荷されます。NVIDIA はこのカードを "802.11ac/ab/gn wireless network interface controller" としか説明しておらず、チップ名は公表していません。
- コミュニティの報告(未確認)では、標準搭載カードは **Realtek RTL8822CE**(AzureWave モジュール、PCI ID 10ec:c822)とされています。これはコミュニティの情報であり、NVIDIA の声明ではありません。
- 公式にサポートされる NVMe モデルと Key-E モジュールは、公開ページではなく Jetson Download Center の "Jetson supported components information" リストにあります。購入前にそこで部品を確認してください。
- カードがお使いのネットワークを認識しない場合 — 例えば MBSSID を使う 6 GHz ルーター — **[トラブルシューティング → Wi-Fi がネットワークを認識しない](/ja/tutorials/jetson-orin-nano/troubleshooting)** を参照してください。

## CSI カメラコネクター

- コネクター ×2(マーク 9):22 ポジション、0.5 mm ピッチ、ボトムコンタクトフレックス。
- **CAM0:** CSI 1×2 レーン。**CAM1:** CSI 1×2 レーンまたは 1×4 レーン。
- 15 ピンのカメラ(例えば Raspberry Pi Camera Module v2)には 15-22 ピン変換ケーブルが必要です。

## 40 ピン拡張ヘッダー(マーク 2)

- GPIO とペリフェラルインターフェース:UART、SPI、I2S、I2C、GPIO。
- ピン配置、電圧レベル、電気的制限については、NVIDIA は *Jetson Orin Nano Developer Kit Carrier Board Specification*(Jetson Download Center)を参照するよう述べています。このドキュメントは本ページでは参照できませんでした。

## ボタンヘッダー(12 ピン)

ボタンヘッダーは、シリアルコンソール、リセット、Force Recovery の機能を担います。

| ピン | 機能 |
|---|---|
| 3 (RXD)、4 (TXD)、7 (GND) | シリアルコンソール(UART) |
| 9 + 10 | Force Recovery モード — ピンをショートさせてから電源を入れる |
| 7 + 8 | リセット — システムの電源が入っている間にピンをショートさせる |
| ジャンパー | 自動電源オン動作を設定 |

### シリアルコンソール

- USB-TTL シリアルアダプターを接続します:アダプターの TX をピン 3(RXD)へ、RX をピン 4(TXD)へ、GND をピン 7 へ。
- これがヘッドレス時のフォールバックです。起動ログの取得方法は **[トラブルシューティング](/ja/tutorials/jetson-orin-nano/troubleshooting)** を参照してください。

### Force Recovery とリセット

- **Force Recovery モード:** ピン 9 と 10 を接続し、キットの電源を入れます。
- **リセット:** キットの電源が入っている間に、ピン 7 と 8 をショートさせます。
- Force Recovery モードは書き込みの流れで使用します — **[書き込みと更新](/ja/tutorials/jetson-orin-nano/flashing-and-updates)** を参照してください。

## 電源

- **DC 電源ジャック(マーク 8):** 5.5 mm × 2.5 mm バレルジャック。付属の 19 V 電源を使用してください。
- **自動電源オン:** デフォルトでは、キットは DC 電源を接続するとすぐに電源が入ります。ボタンヘッダーのジャンパーでこの動作を変更できます。
- **電源 LED(マーク 3):** USB-C コネクターの隣の緑色 LED が、キットの電源が入ると点灯します。
- NVIDIA の確認済みページには、付属電源の定格電流やジャックの極性の記載がありません。サードパーティ製の電源を使う場合は、サプライヤーに両方を確認してください。

## ファンコネクタ

- キャリアボードには 4 ピンのファンヘッダーがあります。
- モジュールはヒートシンク付きで出荷され、公式画像ではファンはヒートシンクシュラウドに統合されています。このヘッダーは交換用の熱ソリューション向けです。
- NVIDIA の確認済みページには、モジュールの動作温度範囲や Tj 限界の記載がありません — それらは Jetson Orin Nano Series Data Sheet と Orin NX/Orin Nano Thermal Design Guide にあり、どちらもログインが必要な Download Center にあります。

## 寸法

- **モジュール:** 69.6 mm × 45 mm、260 ピン SO-DIMM コネクター。
- **キット:** 公式の 2 つの数値が一致していません — データシート(2024 年 12 月)は **103 mm × 90.5 mm × 34.77 mm**、NVIDIA の製品ファミリ表は **100 mm × 79 mm × 21 mm** としています。どちらも高さに脚、キャリアボード、モジュール、熱ソリューションを含めています。
- NVIDIA は整合を説明していません。再販業者による説明(ベースに載せた状態のキットか、裸のキャリアボードか)は**未検証**です。

> **Juxi 注記:** エンクロージャーを設計する前に、NVIDIA の最新のデータシートで寸法を確認してください。

## 参考資料

- [Hardware Layout — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) (2026-09-26 確認)
- [Quick Start — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) (2026-09-26 確認)
- [How-To — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/howto.html) (2026-09-26 確認)
- [Troubleshooting — Jetson Orin Nano Developer Kit User Guide](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html) (2026-09-26 確認)
- [Jetson Orin Nano Super Developer Kit datasheet (PDF, Dec 2024)](https://dam-cdn.nvd.orangelogic.com/AssetLink/2ug686w80406gxf6q8uv7r3l7265m2n8.pdf) (2026-09-26 確認)
- [Jetson Orin NX/Nano Series — Module Adaptation and Bring-Up, L4T r39.2 Developer Guide](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/HR/JetsonModuleAdaptationAndBringUp/JetsonOrinNxNanoSeries.html) (2026-09-26 確認)
- [Jetson Orin product family — developer.nvidia.com](https://developer.nvidia.com/embedded/jetson-orin) (2026-09-26 確認)
- [NVIDIA Developer Forums — "Slow Wi-Fi on Orin Nano DevKit (RTL8822CE)", community thread](https://forums.developer.nvidia.com/t/slow-wi-fi-on-orin-nano-devkit-rtl8822ce-802-11ac/368697) (2026-09-26 確認)

*ステータス:ドラフト、cheny によるレビュー待ち。上記の手順と数値は、記載の日付時点の NVIDIA 公式ドキュメントに基づくものです。Juxi Technology による実機検証はまだ行われていません。*

**画像クレジット:** レイアウト図は NVIDIA 公式の *Jetson Orin Nano Developer Kit User Guide*(2026-09-26 ダウンロード)からのもので、著作権は © NVIDIA Corporation に属します。

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。本ページは Juxi Technology によって公開されており、NVIDIA の公式出版物ではありません。
