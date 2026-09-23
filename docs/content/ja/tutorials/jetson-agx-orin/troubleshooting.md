---
title: トラブルシューティング
sidebar_label: トラブルシューティング
slug: /support/troubleshooting
description: >-
  Jetson AGX Orin 開発キット向けの症状別トラブルシューティング —
  起動とディスプレイ、電源、書き込み、既知の問題を NVIDIA の公式ドキュメントに
  基づいてまとめています。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html
    checked: 2026-09-23
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-23
review_owner: cheny
---

# トラブルシューティング

問題は症状ごとに分類されています — 該当する症状を見つけたら、チェック項目を順番に
実行してください。ここに記載している内容はすべて NVIDIA の公式ドキュメントに
基づいています(出典はページ末尾)。記載のない項目については、末尾の
*サポートを受けるには*をご覧ください。

## キットの電源が入らない

1. 付属の USB-C 電源アダプターは、**DC ジャックの上の USB-C ポート**(J24)に接続する必要があります — 40 ピンヘッダーの隣にあるポートではありません。
2. キットは電源を接続すると自動的に起動します。起動しない場合は、**電源ボタン**を押してください。
3. ご自身の電源をバレルジャック(J41)から使用する場合:外径 5.5 mm、内径 2.5 mm、**センタープラス**。

## 画面が表示されない / 画面が真っ黒のまま

- **ディスプレイ出力は DisplayPort のみです。** HDMI ポートはなく、DisplayPort を USB-C 経由で出力することもできません。HDMI ディスプレイを使う場合は、**アクティブ**な DP→HDMI アダプターまたはケーブルを使用してください。
- 初回起動では、画面が表示されるまでに**最大 1 分**ほどかかることがあります。
- **KVM スイッチ**を使用している場合は、ディスプレイをキットに直接接続してください — KVM 機器は、通常の起動時と ISO インストール時のどちらでもブラックスクリーン問題の既知の原因となっています(NVIDIA もセットアップガイドに記載しています)。
- 問題のある電源構成で起動しようとしていませんか?後述の*ディスプレイを接続した状態で再起動するとシステムがクラッシュする*を参照してください — ディスプレイを**接続せずに**起動し、起動後に再接続してみてください。

## ISO インストール後、キットが古いシステムで起動する

インストール後は、インストール用 USB メモリを取り外してください。挿したままにすると、
キットが新しくインストールしたシステムではなく、再び USB メモリから起動する
可能性があります。(NVIDIA 公式ガイドの記載。)

## 書き込み — Jetson ISO の問題

- **キットが USB メモリから起動しない:** 起動中に **UEFI ブートマネージャー**を開き、USB ドライブを選択します。
- **QSPI ファームウェアのプロンプトが表示される:** **`Y`** を押します。この capsule 更新は互換性のために必須で、2 回実行されます。プロンプトを見逃した場合や、完了したか確信が持てない場合は、**インストールをやり直し**、確定してください。この手順をスキップするとインストールに問題が生じます(NVIDIA リリースノートの既知の問題 6266271)。
- **お使いのキットが L4T r35.5 より古い:** ISO の方法には、r35.5 以降の BSP がインストールされている必要があります。先にホスト PC を使う方法(SDK Manager または `flash.sh`)で r35.5 以降に更新してください — [書き込みと更新](/ja/tutorials/jetson-agx-orin/flashing-and-updates)を参照してください。

## 書き込み — SDK Manager の問題

- **デバイスが検出されない:** 次の順に確認します —
  1. ケーブルが**40 ピンヘッダーの隣にある USB-C ポート**(port 10 / J40)に接続されているか(電源ポートではない)。
  2. キットが **Force Recovery モード**に入っているか:電源プラグを差し込みながら**中央の Force Recovery ボタン**を押し続けます。
  3. ホストが要件を満たしているか:x86_64 上の Ubuntu Desktop 20.04/22.04、8 GB のシステムメモリ、25 GB の空きディスク、NVIDIA Developer Program アカウントへのログイン。(L4T 39.2 リリースノートでは、書き込み用のホストディストリビューションは 24.04/22.04 と記載されています — 最新のリストは SDK Manager のシステム要件ページで確認してください。)
- **NVMe / microSD / USB ドライブに書き込みたい:** ISO インストーラーが対応するのは eMMC と NVMe です。その他のターゲットには SDK Manager または書き込みスクリプト(ホスト PC)が必要です。

## ディスプレイを接続した状態で再起動するとシステムがクラッシュする(AGX Orin 64GB、15W モード)

NVIDIA リリースノートの既知の問題 **6236259**:AGX Orin プラットフォームでは、
systemd の初期化中に EMC 周波数を最大値未満に下げると(15W などの低電力モードで
発生します)、再起動時にシステムがクラッシュすることがあります — 特にディスプレイを
接続している場合です。NVIDIA による回避策:

1. 再起動する前に、**MAXN** 電源モードに切り替えます(EMC が Fmax に戻ります)。
2. システムの再起動後に、目的の電源モードを適用します。
3. 問題のあるモードのまま再起動してしまった場合:ディスプレイを外して起動し、初期化の完了後にディスプレイを再接続します。

## ネットワークとワイヤレス(書き込み後の注意点)

- **書き込み直後に 6 GHz / WPA3 に接続できない:** デバイスをリセットして再試行してください(L4T 39.2.0 では修正済みと記載されています。古いイメージを書き込んだ個体には、リセットの注意が引き続き当てはまります)。
- **スキャンで一部の Wi-Fi アクセスポイントが見つからない(混雑した環境):** スキャンバッファーを増やします — `wpa_cli set bss_max_count 500`(リリースノートの「修正済みの問題」セクションより)。

## このページ以外の既知の問題

深いデバッグに入る前に、現在のリリースノートの**既知の問題**セクションを確認して
ください — 一般的なシステム、カメラ、マルチメディア、グラフィックス、接続性、
ディスプレイ、コンピュートスタックの項目を網羅しています:

- [Jetson Linux 39.2.0 リリースノート(PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)

## サポートを受けるには

- **[NVIDIA Jetson 開発者フォーラム](https://forums.developer.nvidia.com/c/robotics-edge-computing/jetson-embedded-systems/70)** — 公式コミュニティです。投稿する前に検索し、`cat /etc/nv_tegra_release` の出力を添えてください。
- **Juxi Technology サポート** — 技術サポート、およびご注文・保証・RMA に関するお問い合わせは **support@juxitech.com** まで。より迅速に対応するため、ご注文番号と `cat /etc/nv_tegra_release` の出力を添えてください。(営業:sales@juxitech.com · 製品に関するご質問:pe@juxitech.com)

## 参考資料

- [クイックスタート](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/quick_start.html) · [BSP のインストール](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/setup_bsp.html) · [ハードウェアレイアウト](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/hardware_layout.html) — Jetson AGX Orin Developer Kit ユーザーガイド(2026-09-23 確認)
- [Jetson Linux 39.2.0 リリースノート(PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)(2026-09-23 確認)

*ステータス:ドラフト、cheny によるレビュー待ち。お客様から報告される
ハードウェア固有の動作は異なる場合があります。現場からの報告が届き次第、
このページを更新してください。*

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。このページは Juxi Technology
によって公開されており、NVIDIA の公式出版物ではありません。
