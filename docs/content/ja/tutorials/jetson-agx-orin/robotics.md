---
title: JetPack 7.2 のロボティクス — 今すぐ使えるもの
sidebar_label: ロボティクス(現状)
slug: /tutorials/robotics
description: >-
  JetPack 7.2 を搭載した AGX Orin 開発キットでロボティクス開発を行うための、正直な現状を
  まとめたページです——ROS 2、Isaac ROS の提供状況、ロボット学習スタック、そして
  アーキテクチャを確定する前に何を確認すべきかを解説します。
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
    note: still lists Isaac ROS as "coming soon"; see the disagreement note below
  - source: https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html
    checked: 2026-09-24
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/getting_started/index.html
    checked: 2026-09-26
review_owner: cheny
---

# JetPack 7.2 のロボティクス — 今すぐ使えるもの

JetPack 7.2 は Orin を新しいプラットフォーム世代(Ubuntu 24.04、カーネル 6.8、
CUDA 13)へと移行させました。ロボティクスは混在した状況です——中核となる部分
(ROS 2、Isaac ROS)はこのプラットフォーム上で既に揃っていますが、周辺スタックの
一部はまだ安定していません。そのため本ページは意図的にチュートリアルではなく
現状説明ページとしています。アーキテクチャを確定する前にご確認ください。

## ステータス表(2026-09-24 確認、Isaac ROS 行は 2026-09-26 に再確認)

| 必要なもの | JetPack 7.2 / AGX Orin での状態 | 備考 |
|---|---|---|
| **ROS 2(コア)** | ✅ 利用可能です | Ubuntu 24.04 は ROS 2 **Jazzy** のターゲットプラットフォームです。導入は [ROS 2 インストールドキュメント](https://docs.ros.org/en/jazzy/Installation.html) に従ってください。Docker ベースの ROS 2 も選択肢です。 |
| **Isaac ROS**(ハードウェアアクセラレーションされた ROS 2 パッケージ) | ✅ **Isaac ROS 4.6.0 以降でサポート**(2026-08-18) | Jetson Orin 上の JetPack 7.2 向けにリリースされ、公式の AGX Orin セットアップウォークスルーも用意されています。実質的な判断は ROS 2 ディストリビューションの選択です:**Jazzy 上の 4.6.x** か **Lyrical 上の 5.0** か——[JetPack 7.2 上の Isaac ROS](#jetpack-7-2-上の-isaac-ros)をご覧ください。 |
| **ローカル LLM / VLM / VLA モデル** | ✅ 利用可能です | TensorRT Edge-LLM は JP7.2 上の Orin を正式にサポートしており、**Vision-Language-Action** のサンプルも含まれます——[ローカル LLM 推論](/ja/tutorials/jetson-agx-orin/local-llm)をご覧ください。 |
| **マルチカメラ映像パイプライン** | ✅ 利用可能です | DeepStream 9.1 は JP7.2 に同梱されています——[DeepStream ビデオ分析](/ja/tutorials/jetson-agx-orin/deepstream)をご覧ください。 |
| **エージェント的行動 / オーケストレーション** | ✅ 利用可能です | NemoClaw + Jetson エージェントスキル——[エージェント AI](/ja/tutorials/jetson-agx-orin/agentic-ai)をご覧ください。 |
| **ロボット学習スタック(LeRobot スタイルの Python フレームワーク)** | ⚠️ 採用前に必ず検証してください | こうしたスタックは Python への依存度が高く、Ubuntu 24.04 では Python 3.12 に移行したため、一部の依存関係が追随できていない可能性があります。それを前提に設計する前に、JP7.2 上でお使いのスタックをテストしてください——また、**当社はハードウェア上での検証を行っていない**点にご注意ください。 |
| **GR00T(ヒューマノイド基盤モデル)** | ⚠️ 公式情報を確認してください | プラットフォーム対応については、NVIDIA 公式の Isaac GR00T リポジトリと発表を追ってください。パートナーが公開したウォークスルーでは、AGX Orin + JP7.2 でのフルウェイトの TensorRT デプロイが報告されています*(第三者の情報であり、当社は検証していません)*。 |
| **カスタムキャリアボード / BSP 作業** | ✅ 新しいツール | JetPack 7.2 の **Jetson Linux カスタマイズ用エージェントスキル** が BSP の立ち上げ作業を自動化します——[エージェントスキルリポジトリ](https://github.com/jetson-bsp-skills)をご覧ください。 |

## JetPack 7.2 上の Isaac ROS

「近日公開」の時代は終わりました。Isaac ROS リリース **4.6.0**(2026-08-18)が
**Jetson Orin** と **JetPack 7.2** のサポートを追加し、サポート対象プラットフォーム
表では *Jetson Orin* と *JetPack 7.2*(128+ GB NVMe SSD)が対になっています。
NVIDIA はこの組み合わせ向けに、**Jetson AGX Orin** 専用のクイックスタートと
Docker セットアップのウォークスルーを公開しています——このキットはおまけではなく、
第一級のターゲットです。

実際に重要なのは、どの **ROS 2 ディストリビューション**を採用するかという判断です:

| | Isaac ROS **4.6.x** | Isaac ROS **5.0** |
|---|---|---|
| リリース | 2026-08-18 | 2026-09-21 |
| ROS 2 ディストリビューション | **Jazzy**——Ubuntu 24.04 の標準リリース | **Lyrical Luth**——NVIDIA が ROS 2 Noble パッケージを自らビルドし、自社の buildfarm CDN から配信しています |
| NITROS パッケージ | あり | **削除**され、`rosidl::Buffer` 上でネイティブに再構築。NITROS の API や型を直接呼び出すコードはソースレベルの移行が必要です |
| Isaac Sim との組み合わせ | 6.0(5.0/5.1 はレガシー扱いで引き続きサポート) | 6.0 |

- 新規に始めて主流の道を選ぶなら:**Jazzy 上の 4.6.x** が標準の ROS 2 リリースに
  とどまります。**5.0** は NVIDIA が向かう先で、Lyrical エコシステムを伴います——
  既存のノードコードをアップグレードする前に、[5.0.0 リリースノート](https://nvidia-isaac-ros.github.io/releases/index.html)から
  リンクされている NITROS から `rosidl::Buffer` への移行ガイダンスをお読みください。
- **これらのバージョンでの Orin 上の既知の制約:** RealSense カメラは **Docker
  モードでのみ**動作します。`isaac_ros_stereo_image_proc` では、AGX Orin で
  RGB8/BGR8 入力を使用して `backend:=JETSON` を選択すると、VPI エラーでノードが
  異常終了することがあります——デフォルトの `backend:=CUDA` を維持してください。
  Debian パッケージの Teleop は Orin で `ISAAC_TELEOP_CLOUDXR_EXP=0` が必要です。
  また 5.0 の `isaac_ros_dnn_image_encoder` の前処理は AGX Orin 上で 4.6 より
  遅くなっています——このノードがグラフのホットスポットなら、4.6 を優先してください。
- **OpenCV:** JetPack 7.2 は OpenCV **4.8.0** を同梱していますが、Isaac ROS が
  想定するのは **4.6.0** です。システムパッケージを削除すると
  (`sudo apt-get remove -y libopencv* opencv*`)、Isaac ROS パッケージが
  固定バージョンをインストールします。

### NVIDIA 自身のページが食い違っている点

NVIDIA の[JetPack ダウンロードページ](https://developer.nvidia.com/embedded/jetpack/downloads)
は、今回のリリースでも依然として Isaac ROS を **「近日公開」** と記載していますが、
Isaac ROS のリリースノートは 4.6.0 以降でサポート済みとしています。両ページは
突き合わせられていません——Isaac ROS は JetPack とは独立にリリースされ、JetPack
ページのコンポーネント表は JetPack *に同梱される*ものを追跡しているためです。
Isaac ROS のドキュメントが示す apt リポジトリが、サポートされる組み合わせの
確たる証拠です:`…/isaac-ros/release-4.6 noble-jetpack`——*noble* は Ubuntu
24.04、*jetpack* は JetPack ビルドを表します。両者が食い違う場合は、
[Isaac ROS リリースノート](https://nvidia-isaac-ros.github.io/releases/index.html)
を運用上の情報源として扱い、どちらを前提に設計するにしても、まずご自身の
セットアップで検証してください。

## 推奨

- **ロボティクスに依存しない新規プロジェクト:** JetPack 7.2 を基盤にしてください——
  Ubuntu 24.04 LTS のサポート、CUDA 13、DeepStream 9.1、オンデバイス LLM、
  そしてエージェントツール群が利用できます。
- **Isaac ROS を利用しているプロジェクト:** JetPack 7.2 は再びサポート対象です。
  4.6.x(Jazzy)か 5.0(Lyrical)かを意識的に選択し、OpenCV の入れ替えと、
  RealSense が Docker モードのみになる点を見込んでおいてください。検証済みの
  スタックで JetPack 6.x のプロジェクトが進行中でも、強制的な移行はありません——
  Isaac ROS のバージョン選定が固まったタイミングで移行してください(再構築作業は、
  当社の[移行ガイド](/ja/tutorials/jetson-agx-orin/jetpack-6-to-7)で扱っています)。
- **1 台のキットで多数のモジュール:** 開発キットは再書き込みによって他の
  Jetson Orin モジュールをエミュレートできることを覚えておいてください——
  量産部品を選定する前に、モジュールラインナップ全体にわたってロボットの
  ワークロードを検証するのに便利です([製品概要](/ja/tutorials/jetson-agx-orin/overview))。

## 参考資料

- [Isaac ROS リリース — 4.6.0(2026-08-18)と 5.0.0(2026-09-21)のリリースノート](https://nvidia-isaac-ros.github.io/releases/index.html)(2026-09-26 確認)
- [Isaac ROS 4.6 — Getting Started:サポート対象プラットフォーム、Jetson AGX Orin のウォークスルー、apt インストール](https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html)(2026-09-26 確認)
- [Isaac ROS 5.0 — Getting Started:サポート対象プラットフォーム、Lyrical buildfarm CDN](https://nvidia-isaac-ros.github.io/getting_started/index.html)(2026-09-26 確認)
- [JetPack 7.2.1 ダウンロードページ — コンポーネント一覧](https://developer.nvidia.com/embedded/jetpack/downloads)——Isaac ROS の古い「近日公開」行がまだ残っています(2026-09-26 確認)
- [Jetson AGX Orin Developer Kit User Guide — Introduction](https://docs.nvidia.com/jetson/agx-orin-devkit/user-guide/latest/index.html)(モジュールエミュレーション;2026-09-24 確認)
- [ROS 2 Jazzy インストールドキュメント](https://docs.ros.org/en/jazzy/Installation.html)

*ステータス: レビュー済み（2026-10-11）。エコシステムの可用性は急速に変化します——
この表に依拠する前に、リンク先の NVIDIA ページを再確認してください。Juxi Technology
による実機での検証はまだ行われていません。*

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。本ページは Juxi Technology によって公開されており、NVIDIA の公式出版物ではありません。
