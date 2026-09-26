---
title: トラブルシューティング
sidebar_label: トラブルシューティング
slug: /support/troubleshooting
description: >-
  NVIDIA Jetson Orin Nano Super Developer Kit(8GB)向けの症状別
  トラブルシューティング — インストールの落とし穴、電力モード、NVMe ストレージ、
  GPU アクセラレーション、既知の問題を、明確な情報源グレード付きでまとめています。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-missing-25w-power-mode-qspi-firmware-mismatch-after-missed-capsule-update/377553
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-in-jetpack-7-2-r39-2-nvme-ssd-on-pcie-c7-is-not-detected-bootable-in-uefi-stage-but-works-normally-after-linux-boots/383858
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/jetson-orin-nano-repeated-ext4-nvme-filesystem-corruption-and-attempting-recovery-boot-on-jetpack-7-2/379702
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269
    checked: 2026-09-26
review_owner: cheny
---

# トラブルシューティング

下のインデックスで症状を探し、該当するセクションをお読みください。グレード:
**A** = NVIDIA 公式ドキュメント、**B** = NVIDIA 開発者フォーラム(NVIDIA スタッフ
またはコミュニティの報告)。コミュニティのみの情報には*未確認*と表示しています。
Juxi は本シリーズの実機を保有していません — 本ページはドキュメントでの確認のみで、
実機検証は行われていません。

## まずは NVIDIA 公式のトラブルシューティングガイド

このキットについて NVIDIA が最初の拠り所とするのは[トラブルシューティングガイド](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html)です。セットアップの問題をちょうど 5 つ扱っています:(1) Jetson ISO が起動しない、(2) 映像出力がない、(3) インストーラーがインストール先ストレージを表示しない、(4) ファームウェア更新が必要、(5) docker の権限エラー。関連する公式ページ:[暫定ソリューション(Interim Solutions)](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/interim_solutions.html)ページには現在回避策が掲載されていません(JetPack 6.x Update Path に委ねています)。また [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html)ページには NVIDIA のエスカレーション窓口が掲載されています。(グレード A)

## 症状インデックス

| 症状 | セクション |
| --- | --- |
| インストーラーが言語/ネットワーク/ユーザーの画面をスキップし、その後カーソルのある黒い画面でハングする。どのパスワードも通らない | QSPI capsule プロンプトの見逃し |
| インストールは正常に見えたが後で失敗する | QSPI capsule プロンプトの見逃し |
| USB ハブやドングルを接続しているとインストール/書き込みが失敗する | USB 周辺機器 |
| 電力メニューに 7W と 15W しかない。`nvpmodel -m 2` がエラーになる | 25W / MAXN SUPER が表示されない |
| MAXN SUPER でも GPU が 624.75 MHz に固定される | GPU が 624.75 MHz に固定される |
| 電力モードの変更が再起動を求める。その再起動が黒い画面でハングすることがある | 電力モードの変更とブラックスクリーン再起動 |
| インストーラーが NVMe ドライブを提示しない。100% 到達後にインストールがハングする | NVMe ストレージの問題 |
| UEFI ステージで NVMe が見えない | NVMe ストレージの問題 |
| 「Step 9/13 Updating boot firmware」でインストールが中断する | Step 9/13 でのボード名不一致 |
| ISO で書き込んだ Super 個体で `jetson-io.py` が失敗する | Jetson-IO の DTB 不一致 |
| Ollama が CPU で動作する。「Unsupported JetPack version」警告が出る | Ollama と GPU アクセラレーション |
| JetPack 7.2 用の Python ホイールが必要 | Python ホイール |
| Wi-Fi がネットワークを認識しない。6 GHz の MBSSID ルーターが非対応 | Wi-Fi がネットワークを認識しない |
| 映像出力がない。インストーラーが起動しない | 公式トラブルシューティングガイド(上記) |
| Docker ソケットの権限エラー | Docker の権限エラー |
| ディスプレイなしでブートログが必要 | シリアルコンソール |

## QSPI capsule プロンプトの見逃し(最も多いインストールの落とし穴)

ISO インストール中、キットは QSPI ファームウェアの capsule 更新の確認を求めます。
NVIDIA はこれを「最も見逃されやすい手順」と呼んでいます:プロンプトの待ち時間は
30 秒だけです。**Y を押してください。**

- タイムアウトすると「インストールは後で失敗します」。NVIDIA の指示は、インストール
  を再起動して Y を押すことです。(グレード A;[クイックスタート](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)の 5.1 節;リリースノートの既知の問題 6266271、[r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) と [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) に記載:「この手順をスキップすると、新しい ISO イメージと古い QSPI イメージの非互換によりインストールの問題が発生します。」)
- 更新は 2 回に分けて実行され、その間にキットが再起動することがあります。これは
  想定どおりです。NVIDIA はまた、自動起動に頼らず、UEFI ブートマネージャーで
  USB インストーラーを明示的に選択することも推奨しています。(グレード A、[クイックスタート](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html);スタッフが、あるユーザーの回避策がガイドに追記されたことを確認 — グレード B、[スレッド 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))
- 障害の特徴(グレード B、ユーザー報告とスタッフの認知、[スレッド 380410](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410)):
  インストーラーが言語・ネットワーク・ユーザー名の画面をスキップし、
  「Finished installation and reboot」に進み、その後システムがカーソルのある黒または
  グレーの画面でハングします。どの既定の資格情報も通りません(nvidia/nvidia、
  ubuntu/ubuntu、root/空)。原因:capsule プロンプトが確定されなかったことです。
  Y を押したところセットアップ画面が表示され、インストールが完了しました。同じ
  スレッドの他のユーザーは SDK Manager での書き込みで解決しました。(グレード B)
- キットがインストーラーにまったく到達しない場合(黒い画面、または UEFI シェルに
  落ちる)、QSPI ファームウェアが古すぎる可能性があります:JetPack 7.2/7.2.1 には
  JetPack 6.x 世代の UEFI/QSPI ファームウェアが必要です。[書き込みと更新](/ja/tutorials/jetson-orin-nano/flashing-and-updates)と [JetPack 6.x からの移行](/ja/tutorials/jetson-orin-nano/jetpack-6-to-7)を参照してください。(グレード A、[クイックスタート](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html))

## 特定の USB 周辺機器を接続するとインストール/書き込みが失敗する

公式の既知の問題 **5424568** と **5460707**([r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) と [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) のリリースノートに記載):インストーラー用の USB ドライブを「**USB3.0 4-port Portable Hub Model UH400**」ハブに接続すると ISO インストールが失敗します — 「他の USB メモリやハブは想定どおり動作します」— また、**TRENDnet TU2-ET100** USB-Ethernet ドングルを接続していると書き込みが失敗することがあります。再試行する前に、別の USB メモリ/ハブまたは直接接続の USB ポートを使用し、ドングルを取り外してください。(グレード A)

## 25W と MAXN SUPER が表示されない

症状:7W と 15W しか表示されない、または `nvpmodel -m 2` が不正な電力モードの
エラーを返します。原因 — 公式の既知の問題 **6279443**([r39.2 リリースノート](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)):ISO で更新した個体は「更新後にデフォルトで「Super」モードになりません。「Super」モードを使用するには、Linux ホストまたは SDKM でターゲットを書き込む必要があります。」(グレード A)

特徴 — `/etc/nv_boot_control.conf` に `-super` 接尾辞がないこと。スタッフの発言:
「Super Mode が有効な場合、構成に -super 接尾辞が含まれているはずです…現状、ISO
イメージではデバイスを非 Super Mode から Super Mode にアップグレードできません。
x86 ホストを使用して、Super Mode 構成でデバイスを再書き込みしてください。」
(グレード B、[スレッド 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627))

7.2.1 では設計上修正済み — スタッフ:「これは jp7.2.1 で修正される予定です」。[r39.2.1 リリースノート](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)には「ISO は Jetson Orin Nano Developer Kit をデフォルトで Super Mode の書き込み構成でフラッシュするようになりました」とあり、既知の問題リストに 6279443 は載っていません。(グレード A)

修正の選択肢:

1. Linux ホストまたは SDK Manager で再書き込みします。(グレード A、既知の問題 6279443、[r39.2 リリースノート](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf))
2. スタッフによる QSPI のみの書き込み — QSPI ブートローダーのみを書き込み、システム
   イメージは書き込みません(グレード B、[スレッド 377553](https://forums.developer.nvidia.com/t/jetson-orin-nano-missing-25w-power-mode-qspi-firmware-mismatch-after-missed-capsule-update/377553))。1 つ目のコマンドがスタッフのコマンドで、2 つ目は報告者の成功した Super ターゲットと EEPROM オーバーライドを追加したものです:

```
sudo ./flash.sh --no-systemimg -c bootloader/generic/cfg/flash_t234_qspi.xml jetson-orin-nano-devkit internal

sudo SKIP_EEPROM_CHECK=1 BOARDID=3767 BOARDSKU=0005 FAB=300 ./flash.sh --no-systemimg -c bootloader/generic/cfg/flash_t234_qspi.xml jetson-orin-nano-devkit-super internal
```

3. コミュニティによるインプレース修正 — *未確認*、NVIDIA は非推奨(グレード B、[スレッド 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627)、[スレッド 375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435))。NVIDIA スタッフは、このファイルを編集する**前に**状態を取得するようユーザーに求めました(`cat /etc/nv_tegra_release`、`cat /etc/nv_boot_control.conf`、`sudo /usr/sbin/nvpmodel -q --verbose`) — 編集すると「調査に必要な失敗状態が失われる」ためです。報告されている手順:`sudo -i`;`perl -i -0777 -pe 's/nano-devkit-\n/nano-devkit-super-\n/g' /etc/nv_boot_control.conf`;`dpkg-reconfigure nvidia-l4t-bootloader`;`rm /etc/nvpmodel.conf`;`reboot`;その後 `sudo nvpmodel -m 2 --verbose --force`。複数のユーザーが、その後 25W と MAXN SUPER が表示されたことを確認しています。SD カードへインストールしたあるユーザーはブートループになり、再インストールしました。

補足:7.2 の非 Super インストールでは `/etc/nvpmodel/nvpmodel_p3767_0003_super.conf`(15W、25W、MAXN_SUPER)は存在しますが、`/etc/nvpmodel.conf` は 15W と 7W だけの非 Super のファイルを指しています。(グレード B、コミュニティ、[スレッド 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))。電力モードの確認コマンド:[システムの確認](/ja/tutorials/jetson-orin-nano/verify-your-system)。

## GPU が 624.75 MHz に固定される

MAXN_SUPER が有効でも、GPU が 624,750,000 Hz に固定されたままになることがあります
(`bpmp/debug/clk/nafll_gpc0/max_rate` = 624750000)。報告されたケースでは、Super
capsule だけを書き込んでも解決しませんでした — Super ファームウェアが適用されて
いなかったのです。スタッフの回答:SDK Manager、または Ubuntu ホストからの手動
書き込みで書き込んでください。7.2.1 で修正済みとのことです。(グレード B、[スレッド 377003](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003))コミュニティの注記:L4T 39.2 には `nvpmodel_p3767_0005.conf` が存在せず、P3767-0005 モジュールは 0003 の構成を使用しています(スタッフは未確認)。(グレード B、コミュニティ、上記と同じスレッド)

## 電力モードの変更とブラックスクリーン再起動

- 電力モード変更後の再起動要求は、GPU が一度使用された後(「golden image context」)
  は想定内です。(グレード B、スタッフ、[スレッド 375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435))
- 再起動が黒い画面でハングする場合は、既知の問題 **6236259** と一致します([r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf);[r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) では修正済みとして記載):systemd の初期化中に EMC を Fmax 未満に下げると、再起動時にシステムがクラッシュすることがあります — 特にディスプレイを接続している場合です。(グレード A)
- 回避策:モニターを外した状態で再起動し、起動後に再接続します — あるユーザーは、これで電力モードの問題が解消したと確認しています。(グレード B、スタッフとユーザー、[スレッド 375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435))
- NVIDIA の緩和策:再起動の前に MAXN に切り替えます(EMC が Fmax に戻ります)。すでに問題のあるモードに入っている場合は、ディスプレイなしで一度起動します。(グレード A、既知の問題 6236259、[r39.2 リリースノート](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf))

## NVMe ストレージの問題

**インストーラーがドライブを提示しない/パーティション手順が失敗する** — *未確認*:
インストーラーは 4K セクターでフォーマットされた NVMe ドライブに対応していない
可能性があります。必要なのは 512n/512e です。`nvme id-ns -H /dev/nvme0n1` で確認し、
`nvme format --lbaf=ID /dev/nvme0n1` で変更します — **破壊的**です。投稿ではデータ
保全について触れられていません。NVIDIA は公式には確認していません。(グレード B、未確認、[スレッド 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))

**正常に見えたインストール後に起動がハングする** — *未確認*:インストーラーが
100% に達した後に黒い画面や点滅するカーソルになる報告が複数あります。あるユーザー
はリカバリーモードでの直接書き込みでのみ解決し、別のユーザーは上記の 4K セクター
問題に行き着きました。確定した根本原因はありません。(グレード B、未確認、[スレッド 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))

**UEFI ステージで NVMe が検出されない(r39.2)** — PCIe C7 上のドライブが、R36.4
では動作していたにもかかわらず UEFI ブートステージで見えませんでした。報告者は
既定構成に戻して再書き込みすることで解決しました。スタッフの回答:「NV devkit では、
デフォルト BSP ですべて正しく構成されています。項目を構成しようとするほど、何かが
動作しなくなる可能性が高まります。」(グレード B、[スレッド 383858](https://forums.developer.nvidia.com/t/jetson-orin-nano-in-jetpack-7-2-r39-2-nvme-ssd-on-pcie-c7-is-not-detected-bootable-in-uefi-stage-but-works-normally-after-linux-boots/383858))。注記:JetPack 7.2 以降、SD カードイメージはなくなりました — ISO を USB ドライブに書き込み、microSD または NVMe にインストールします。(グレード A、[クイックスタート](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html))

## インストーラーが「Step 9/13 Updating boot firmware」で中断する(ボード名の不一致)

*未確認。* インストールが次のエラーで中断することがあります:

```
ERROR. 3767--0005--1--jetson-orin-nx-devkit-16gb- does not match any known boards.
```

原因:`/etc/nv_boot_control.conf` に古い COMPATIBLE_SPEC が残っており、ブートローダー
パッケージのボードリストと一致しません。その結果 oem-config/ユーザー作成の手順が
実行されません — このケースでは、これが「ユーザー名/パスワードのスキップ」の仕組み
です。起動済みの r39.2 システムでの再現方法:
`sudo apt-get install --reinstall nvidia-l4t-bootloader`。NVIDIA はこれを確認して
いません。Orin NX 16GB でも再現され、第三者が 2026-09-18 に再現しています
(subiquity `command_34 … returned non-zero exit status 100`)。SDK Manager 7.2.x が
「Step 9」で失敗する変種も報告されています。(グレード B、未確認、[スレッド 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))

コミュニティの回避策、*未確認*:`/target` に chroot し、
`/var/lib/dpkg/info/nvidia-l4t-bootloader.postinst` 内の `select_3767_payload` の
ボード glob 分岐を拡張し、`rm -f /opt/nvidia/l4t-packages/.nv-l4t-disable-boot-fw-update-in-preinstall`
を実行し、`dpkg --configure -a` を実行してから `apt-mark hold nvidia-l4t-bootloader`
を実行します。NVIDIA はこの障害に対する修正を投稿していません。上記のコミュニティ
回避策は未確認のままです。(グレード B)

## ISO 書き込みの Super 個体での Jetson-IO DTB 不一致

公式の既知の問題 **6236205**([r39.2](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) と [r39.2.1](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) に記載):ISO で書き込んだ Orin Nano Super 個体では `jetson-io.py` が失敗します。公式の回避策:`/compatible` と `/model` を比較する `fdtget` ループで `/boot` から一致する DTB を見つけ、`kernel_<name>.dtb` として `/boot/dtb/` にコピーし、`sudo /opt/nvidia/jetson-io/jetson-io.py` を再実行します。他の方法で書き込んだ個体は影響を受けません。(グレード A)

## Ollama と GPU アクセラレーション

経緯:JetPack 7.2 上の初期の Ollama ビルドは、Ollama のプリビルド CUDA ライブラリに
sm_87(Orin のコンピュートケイパビリティ 8.7)が含まれていなかったため CPU に
フォールバックしました。スタッフはログ
「skipping CUDA device — compute capability not in compiled architectures …
device=Orin cc=870」を引用し、こう述べました:「これは既知の問題です…Ollama チームと
直接協力して、JP 7.2 のネイティブサポートを追加する作業を進めています。」
(グレード B、スタッフ、[スレッド 372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521))

現在の状況:最新のアップストリーム Ollama は動作します。スタッフが JetPack 7.2.1
で確認済み(2026-09-21):`curl -fsSL https://ollama.com/install.sh | sh` で
インストールし、モデルを実行して `ollama ps` を確認すると `100% GPU` と表示される
はずです。「WARNING: Unsupported JetPack version detected」の行は無害なメッセージ
です。以前の `override.conf` 回避策は「もう不要」です。(グレード B、スタッフ、[スレッド 383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350))

古いビルドの修正:`find /usr/local/lib/ollama ... | grep -Ei 'cuda|cudart|runner'`
の結果に `cuda_v12` と `cuda_v13` の両方のツリーが表示される場合は、古い方を削除
します — `sudo rm -rf /usr/local/lib/ollama/cuda_v12`。その後ログに
「load_backend: loaded CUDA backend from /usr/local/lib/ollama/cuda_v13/libggml-cuda.so
… compute capability 8.7」と表示されました。(グレード B、スタッフとユーザー、[スレッド 372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521))

8 GB の注記:`free -h` で空きメモリが表示されていても、より大きなモデルは
`cudaMalloc failed: out of memory … failed to allocate buffer for kv cache` で
失敗することがあります — GPU メモリは共有です。より小さな、または量子化された
モデルを使用してください。(グレード B、コミュニティ、[スレッド 383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350))。詳細:[ローカル LLM 推論](/ja/tutorials/jetson-orin-nano/local-llm)。

## JetPack 7.2 用の Python ホイール

JP 7.2 / CUDA 13.2 についてのスタッフの回答:`https://pypi.jetson-ai-lab.io/sbsa/cu130`
を使用します。(グレード B、スタッフ、[スレッド 372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521))。注意:
インデックスのルートを確認したところ(2026-09-26)、`jp6/cu126`、`jp6/cu128`、
`jp6/cu129`、`sbsa/cu130`、`sbsa/dev` が掲載されており、`jp7` のエントリーは
見当たりませんでした。コミュニティのスレッドでは
`https://pypi.jetson-ai-lab.io/jp7/cu132` も挙げられていますが、この一覧には
表示されていません。(グレード C)。スタッフ:「ダウングレード:はい、必要であれば
SDK Manager 経由で JP 6.2.2 に戻して書き込むことができます。」(グレード B)

## Wi-Fi がネットワークを認識しない

公式の Wi-Fi 既知の問題([r39.2.1 リリースノート](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf)に記載):**MBSSID を使用する Wi-Fi 6 GHz ルーターは非対応**(既知の問題 **5226667**)、および**混雑した環境では Wi-Fi スキャンが AP を見逃すことがある** — バッファーの回避策として `wpa_cli set bss_max_count 500` を実行します(既知の問題 **5426982**)。(グレード A)

## シリアルコンソール(ヘッドレスデバッグ)

配線(グレード A、[クイックスタート](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html)):Button Header に USB-TTL シリアルケーブルを接続します — RXD ピン 3 をアダプターの TX 線に、TXD ピン 4 をアダプターの RX 線に、GND ピン 7 をアダプターのグラウンド線に。次に「PC でシリアルコンソールを開きます」。起動中に **Esc** を繰り返し押すと UEFI に入ります。ヘッドレスの ISO インストールでは、起動前オプションで Esc を押し、**Boot Manager** を選択して USB ディスクを選びます。

- NVIDIA のページにはボーレートやターミナルプログラムの記載がなく、「PC でシリアル
  コンソールを開く」とだけあります。(下記の*確認できなかったこと*を参照)
- DisplayPort ディスプレイまたは Debug UART がないと、ヘッドレスでの ISO インストール
  は現実的ではありません — スタッフ:「DP ディスプレイ出力か Debug UART のいずれかを
  使用する必要があります…どちらもない場合、実質的に不可能です。」(グレード B、スタッフ、[スレッド 372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151))
- ヘッドレス ISO インストールでは UEFI コンソールは `/dev/ttyACM1` で、QSPI が
  GA(38.2)に更新されるまで出力があふれます。ディスプレイ接続時には見られません
  ([既知の問題 5463861](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf))。(グレード A)
- デバッグケーブルを挿し直すと minicom にアクセスできなくなることがあります —
  minicom を再起動してください([既知の問題 5437763](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf)、両リリースに記載)。(グレード A)

## Docker の権限エラー

公式の修正(グレード A、[トラブルシューティングガイド](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html)) — グループ変更が反映されない場合はターミナルを再起動してください:

```
sudo usermod -aG docker $USER
newgrp docker
```

## サポートを受けるには

- **NVIDIA Jetson 開発者フォーラム**(forums.developer.nvidia.com) — 公式コミュニティで、NVIDIA の Additional Docs ページに掲載されています。まず検索し、投稿時には `cat /etc/nv_tegra_release` の出力を添えてください。電力やファームウェアの問題では `/etc/nv_boot_control.conf` と `sudo /usr/sbin/nvpmodel -q --verbose` も添えてください。(掲載についてグレード A)
- **注意:**「NVIDIA-STAFF」と表示された返信の一部は自動生成の LLM 回答です — 「— 🤖 This is an automated AI response. I'm here to help, but please verify important details! —」や「*** Please note that this reply is generated by LLM automatically ***」のようなマーカーで始まります。これらは権威ある情報として扱わないでください。(グレード B、[スレッド 372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627)、[スレッド 372269](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269))
- **Juxi Technology** — テクニカルサポート、および注文・保証・RMA については **support@juxitech.com** まで(注文番号を添えてください)。営業:sales@juxitech.com · 製品に関するご質問:pe@juxitech.com。

## アップストリームで未解決の項目

NVIDIA のリリースノートには、予期しないリセットを引き起こす可能性のある未解決の
問題がこのキット向けに 1 件記載されています:**SC7 サスペンド/レジューム中の DCE
アボートがウォッチドッグリセットを引き起こす**(既知の問題 6235055、r39.2 と
r39.2.1 の両方で未解決)。キットをサスペンドしない場合はこの問題の影響はありません。
サスペンドする場合は、構成での回避策を探すのではなく、アップストリームで追跡して
ください。(グレード A、[r39.2.1 リリースノート](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf))

## 確認できなかったこと

情報源における未解決の疑問:

- シリアルコンソールのボーレートとターミナルプログラム — NVIDIA は「PC でシリアルコンソールを開く」としか述べていません。
- ボード名の不一致(`command_34` 終了ステータス 100)が r39.2.1 で修正されているかどうか。スレッドに NVIDIA からの返信はなく、最後のコミュニティ再現は 2026-09-18 です。
- 7.2.1 の ISO インストールで、もともと 7.2 の ISO で書き込まれた個体の Super モードが復元されるかどうか — リリースノートには、7.2.1 がデフォルトで Super 構成を書き込むとあるだけです。
- 4K セクター NVMe の制限が実際に存在し、公式に文書化されているかどうか — コミュニティの報告のみで、リリースノートにもユーザーガイドにもありません。
- 古い COMPATIBLE_SPEC/TNSPEC を再スタンプする公式手順はありません。NVIDIA へのフォーラムでの質問は回答がありませんでした。
- JP 7.2 の正式なホイールインデックスはどれか:`/sbsa/cu130`(スタッフ)か `/jp7/cu132`(コミュニティの引用)か。
- 書き込みホストの要件は公式ソース間で矛盾しています:リリースノートは「Ubuntu 24.04 と 22.04」(アーキテクチャの記載なし)、BSP ページは SDK Manager 用に x86_64、ユーザーは Windows の SDK Manager で 7.2.1 の書き込みに成功したとも報告しています。
- コミュニティの `nv_boot_control.conf` 編集が安全かどうか — NVIDIA はインプレースの方法を承認も修正もしていません。
- 非 Super インストールで `sudo nvpmodel -m 2` が再起動をまたいで持続するかどうか(コミュニティの報告では「いいえ」)。
- EXT4/NVMe の破損報告(ジャーナルリカバリーの失敗、I/O タグタイムアウト、「Attempting recovery boot」)— 未解決で、スレッドは回答なしでクローズされました。
- ソースビルドやコンテナ経由の Ollama — どちらの方法も権威ある情報源ではなく、NVIDIA スタッフの確認があるのは 7.2.1 上の最新アップストリームインストーラーのみです。
- 「7.2.1-b49 vs b184」というビルドの主張と「Agent Skills」の欠落 — 未検証で、混同の可能性が高いです。r39.2.1 の What's New には「ビデオパイプライン向けエージェントスキル」が記載されています。

## 出典

- NVIDIA Jetson Orin Nano Developer Kit ユーザーガイド:[トラブルシューティングガイド](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/troubleshoot.html) · [クイックスタート](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/quick_start.html) · [JetPack 6.x Update Path](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/update_firmware.html) · [Additional Docs](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/additional_docs.html) · [ハードウェアレイアウト](https://docs.nvidia.com/jetson/orin-nano-devkit/user-guide/latest/hardware_layout.html) — 2026-09-26 確認
- リリースノート:[JetPack 7.2 / L4T r39.2(PDF)](https://docs.nvidia.com/jetson/archives/r39.2/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.pdf) · [JetPack 7.2.1 / L4T r39.2.1(PDF)](https://docs.nvidia.com/jetson/archives/r39.2.1/ReleaseNotes/Jetson_Linux_Release_Notes_r39.2.1.pdf) — 2026-09-26 確認
- NVIDIA 開発者フォーラムのスレッド(2026-09-26 確認):[372151](https://forums.developer.nvidia.com/t/jetpack-7-2-jetson-linux-r39-2-on-jetson-orin-nano-developer-kit-getting-started-and-feedback-thread/372151) · [380410](https://forums.developer.nvidia.com/t/jetson-orin-nano-super-dev-kit-boot-hangs-after-jetpack-7-2-installation-on-nvme-ssd-installer-skips-username-password-setup/380410) · [372627](https://forums.developer.nvidia.com/t/25w-and-maxn-super-not-seen-in-jetpack-7-2/372627) · [377003](https://forums.developer.nvidia.com/t/jetpack-7-2-l4t-39-2-gpu-frequency-stuck-at-624-mhz-on-orin-nano-8gb-p3767-0005-bpmp-hard-limit-super-mode-not-unlocking/377003) · [377553](https://forums.developer.nvidia.com/t/jetson-orin-nano-missing-25w-power-mode-qspi-firmware-mismatch-after-missed-capsule-update/377553) · [375435](https://forums.developer.nvidia.com/t/continuing-power-mode-issues-on-jetpack-7-2/375435) · [372521](https://forums.developer.nvidia.com/t/jetpack-7-2-gpu-acceleration-issue/372521) · [383350](https://forums.developer.nvidia.com/t/ollama-not-supporting-jetson/383350) · [383858](https://forums.developer.nvidia.com/t/jetson-orin-nano-in-jetpack-7-2-r39-2-nvme-ssd-on-pcie-c7-is-not-detected-bootable-in-uefi-stage-but-works-normally-after-linux-boots/383858) · [379702](https://forums.developer.nvidia.com/t/jetson-orin-nano-repeated-ext4-nvme-filesystem-corruption-and-attempting-recovery-boot-on-jetpack-7-2/379702) · [372269](https://forums.developer.nvidia.com/t/nemoclaw-on-jetson-orin-super-with-jetpack-7-2/372269)

*ステータス:ドラフト、cheny によるレビュー待ち。未確認と記載した項目はコミュニティ
フォーラムの報告に基づくもので、変わる可能性があります。本ページはドキュメントでの
確認のみで、Juxi はこのキットの実機検証を行っていません。*

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。本ページは Juxi Technology
によって公開されており、NVIDIA の公式出版物ではありません。
