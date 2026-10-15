---
title: JetPack 7.2 のロボティクス — Orin Nano で動くもの
sidebar_label: ロボティクス(現状)
slug: /tutorials/robotics
description: >-
  JetPack 7.2.1 搭載の Jetson Orin Nano Super 開発キット(8GB)における
  ロボティクスの正直な現状ページ — ROS 2、Isaac ROS、Isaac Sim、LeRobot 系
  スタック、そしてまだ計画の前提にすべきでないもの。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://nvidia-isaac-ros.github.io/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/v/release-5.0/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/performance/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/getting_started/isaac_ros_buildfarm_cdn.html
    checked: 2026-09-26
  - source: https://docs.isaacsim.omniverse.nvidia.com/6.0.0/installation/requirements.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/learning/physical-ai/gr00t-e2e-workflow/latest/getting-started/prerequisites.html
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/is-ros2-jazzy-the-correct-version-to-use-with-jetpack-7-2-1-ubuntu-24-04/382439
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/Ubuntu-Install-Debs.rst
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/_Apt-Repositories.rst
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/huggingface/lerobot/main/docs/source/installation.mdx
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/huggingface/lerobot/main/pyproject.toml
    checked: 2026-09-26
  - source: https://packages.ubuntu.com/noble/python3
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx
    checked: 2026-09-26
  - source: https://www.nvidia.com/en-us/ai/build-a-claw/
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
review_owner: cheny
---

# JetPack 7.2 のロボティクス — Orin Nano で動くもの

JetPack 7.2 はこのキットを新しいプラットフォーム世代へと移行させました:Ubuntu 24.04、CUDA 13、そしてすべての AI ワークロードを規定する 8GB のメモリ上限です。ロボティクスのエコシステムは、依然としてこの移行に追いつこうとしているところです。今日動くものもあれば、動かないものもあり、まだどの公式ページからも確認できないものもあります。

本ページはチュートリアルではなく現状説明ページです。ここにある内容はすべてドキュメントによる確認のみで、Juxi はこれらのスタックを実機でテストしていません。読むロボティクスページの日付を必ず確認してください:このエコシステムのいくつかの部分は 2026 年 8 月と 9 月に変化しています。下の図では、右側の大きなブロックがキット上で動作します。Isaac Sim と Isaac Lab は左側の Omniverse ブロックにあり、これは別のホストです。

![NVIDIA Jetson ソフトウェアスタック。左側に DGX と Omniverse のホスト](/images/jetson-orin-nano/robotics-diagram-jetpack7.2.png)

## ステータス表(2026-09-26 確認)

| 必要なもの | JetPack 7.2.1 / Orin Nano(8GB)での状態 | 備考 |
|---|---|---|
| **ROS 2(コア)** | ✅ 動作します | JetPack は ROS ディストリビューションをインストールも要求もしません。ROS 2 **Jazzy** には公式の Ubuntu 24.04 arm64 パッケージがあります。NVIDIA 社員によるフォーラム回答(2026-09-07)は、Jazzy を「JetPack 7.2.1 に推奨される ROS ディストリビューション」と呼んでいます。フォーラムの回答は公式ドキュメントではありません。インストール手順は後述します。 |
| **Isaac ROS**(ハードウェアアクセラレーションされた ROS 2) | ⚠️ 2026 年 8 月にリリース — ただし実際のギャップあり | Isaac ROS 4.6.0 のリリースノート:「Jetson Orin のサポートを追加」「JetPack 7.2 のサポートを追加」。NVIDIA の公式ベンチマーク表には Orin Nano Super 8GB が登場します。しかし、ウォークスルーに Orin Nano のセクションはなく、サポート表は NVMe SSD を前提としており、NVIDIA の JetPack ページは依然として「近日公開」と記載しています。詳細は後述します。 |
| **Isaac Sim / Isaac Lab**(シミュレーション) | ⛔ このキットでは動作しません | RTX GPU を搭載した x86_64 ホストが必要です(最低 GeForce RTX 4080、16 GB VRAM、32 GB RAM)。RT コアのない GPU はサポートされません。aarch64 ビルドは DGX Spark 向けにのみ存在します。シミュレーションのワークフローでは、シミュレーターは Jetson ではなく x86_64 マシン上で動作します。 |
| **GR00T(ヒューマノイド基盤モデル)** | ⛔ このキットでは実行できません | GR00T 1.7 のポストトレーニングには最低 48 GB VRAM の GPU が必要です。NVIDIA のリファレンスワークフローは、実機ロボットのエッジコンピューターとして Jetson AGX Thor を使用しています。同じワークフローはデモンストレーションデータを LeRobot 形式に変換します — ソフトウェアの方向性は一致しますが、計算はここにはありません。 |
| **LeRobot 系の Python スタック**(SO-ARM101、LeKiwi、ビジョンキット) | ⚠️ 検証が必要 | Python のバージョン要件は満たされています(Ubuntu 24.04 は Python 3.12.3 を同梱、LeRobot は 3.12 以降が必要)。しかし上流に公式の JetPack 7.2 経路はなく、ドキュメント化された Jetson 経路は JetPack 6.2 向けにコミュニティが維持しているものです。プロジェクトを決める前に、あなたの使用する構成そのものをテストしてください。 |
| **DeepStream** | — このレビューでは未検証 | 専用ページで扱っています — [DeepStream 映像解析](/ja/tutorials/jetson-orin-nano/deepstream)を参照。このロボティクスレビューでは DeepStream のサポートマトリクスを再確認していません。 |
| **TensorRT Edge-LLM** | — このレビューでは未検証 | 専用ページで扱っています — [ローカル LLM 推論](/ja/tutorials/jetson-orin-nano/local-llm)を参照。ロボティクスとは主に VLA 系モデルを通じて関係します。 |
| **NemoClaw(エージェントスタック)** | ⚠️ 動作します(事実上のサポート) | インストーラーは Jetson(Orin と Thor)を自動検出し、NVIDIA のサイトは「Install OpenClaw on Your NVIDIA Jetson Orin Nano™」を宣伝しています。しかし公式のプラットフォームマトリクスに Jetson の行はなく、プロジェクトはアルファ/「Early preview」です。8GB が公称の最小 RAM(推奨 16GB)で、メモリ不足のリスクがドキュメント化されています。[エージェント型 AI](/ja/tutorials/jetson-orin-nano/agentic-ai)を参照。 |

## JetPack 7.2 上の Isaac ROS — 公式ページが現在示している内容

**NVIDIA のページ同士が矛盾しています。** JetPack 7.2.1 のダウンロードページは依然として「NVIDIA Isaac™ ROS — 近日公開」と記載しています。Isaac ROS プロジェクトのページはサポートが出荷済みだとしています。Isaac ROS 自体については、プロジェクトのページの方がより具体的な情報源であり、かつ新しいものです:

- **Isaac ROS 4.6.0(2026-08-18)** — リリースノート:「Jetson Orin のサポートを追加」「JetPack 7.2 のサポートを追加」。この組み合わせを含む最初の 4.x リリースです。
- **サポート対象プラットフォーム:**「この表で定義されたプラットフォームが、Isaac ROS がテストし公式にサポートする唯一のハードウェアとソフトウェアの組み合わせです」。Jetson の行:「Jetson Thor(T5000 および T4000)と Jetson Orin」、JetPack 7.2、ストレージ「128+ GB NVMe SSD」。表記は「Orin Nano」ではなく「Jetson Orin」(ファミリー名)です。
- **ベンチマーク:** パフォーマンス表には「Orin Nano Super 8GB」という専用の列があり、実際の数値が入っています — 例えば AprilTag Node が 720p で 104 fps、Mobile SAM graph が 720p で 4.80 fps。これらはこのデバイスについて NVIDIA が公開した数値であり、Juxi の実測値ではありません。より重いワークロードはダッシュ(「–」)で示されています:FoundationPose、Grounding DINO、フル SAM は実行可能として記載されていません。
- **Isaac ROS 5.0.0(2026-09-21)** は ROS 2 Lyrical Luth に移行しました。公開の ROS 2 apt リポジトリは Ubuntu 24.04 向けの ROS 2 Lyrical パッケージを提供しておらず、NVIDIA が独自の Isaac ROS Buildfarm CDN で公開しています。Isaac ROS 4.6 は ROS 2 Jazzy のままです。主流の Jazzy スタックを使うなら 4.6 を選んでください。

**導入を決める前に知っておくべきギャップ:**

- **Orin Nano のセットアップセクションがありません。** Jetson のウォークスルーは Jetson AGX Thor と Jetson AGX Orin のみを扱っており、Orin Nano に関係する唯一のリンクは電力設定ガイドです。
- **NVMe SSD が前提です。** ストレージの列には「128+ GB NVMe SSD」とあります。このキットはストレージを一切搭載せずに出荷されるため、microSD のみの構成は示された前提の外にあります([クイックスタート](/ja/tutorials/jetson-orin-nano/quick-start)を参照)。
- **バージョンのずれ。** 4.6 のセットアップページは、`cat /etc/nv_tegra_release` で「R39 (release), REVISION: 2.0」(L4T r39.2.0)を確認するよう求めていますが、このキットが出荷するのは JetPack 7.2.1 = L4T r39.2.1 です。本番ロボットを移行する前に Docker で検証してください。
- **カメラと OpenCV。** Intel RealSense カメラは「Docker モードでのみサポートされます。Virtual Environment モードと Bare Metal モードはサポートされません」。また JetPack 7.2 は OpenCV 4.8.0 をインストールしますが、Isaac ROS は 4.6.0 でテストされています — 対処法は後述のインストール手順にあります。
- **5.0 でのリグレッション。** Isaac ROS 5.0 では、DNN image encoder のスループットが 4.6 より低下している可能性があります。このノードが重要なら 4.6 を検討してください。

> **重要**:Isaac ROS がクリティカルパスにある場合は、時期を見極めてください。JetPack 7.2 でのサポートは本物ですが新しく(2026 年 8 月)、Orin Nano のドキュメントは薄い状態です。このキットは JetPack 6.2 時代(Isaac ROS 3.2 Update 1、2025 年 1 月)からすでに Isaac ROS のサポート対象でした。最も実績の長い組み合わせを必要とし、初回リリースの混乱を吸収できないチームには、JetPack 6.2 時代の構成にとどまるという擁護可能な判断があります。それ以外の場合は 7.2.1 に移行しつつ、コミットする前にこのキット上の Docker で、あなたのパイプラインそのものを検証してください。

## シミュレーションと学習 — 別のマシンの仕事

Isaac Sim 6.0 はこのキットでは実行できません。Linux x86_64 経路について公開されている最低要件:GeForce RTX 4080、16 GB VRAM、32 GB RAM、50 GB SSD。「RT コアのない GPU(A100、H100)はサポートされません」。aarch64 ビルドは「現在 DGX Spark システムでのみサポートされています」。Isaac ROS のシミュレーションワークフローでは、「Isaac Sim はセンサーデータとワールド情報を提供する x86_64 マシン上で動作します」— Jetson はデプロイ先です。

ロボット学習の重い側でも分担は同じです:GR00T 1.7 のポストトレーニングには少なくとも 48 GB の VRAM が必要で、NVIDIA のリファレンスワークフローは実機ロボットのエッジコンピューターとして Jetson AGX Thor を使用します。原則はこうです:シミュレーションと学習は PC で、デプロイと推論の実行はキットで。Isaac Sim が Orin Nano を検討した理由だったなら、それはその仕事には間違ったマシンです。

## LeRobot と Python 系ロボットスタック — 互換性の疑問

1. **Python バージョンの疑問には明確な答えがあります:3.12 で問題ありません。** Ubuntu 24.04 のシステム Python は 3.12.3 で、LeRobot(0.6.2)は Python 3.12 以降を必要とします。このアップグレードが Python バージョンを理由に LeRobot を妨げることはありません。
2. **しかし上流に JetPack 7.2 の経路はありません。** LeRobot の公式インストールページには、Jetson ではデフォルトで GPU アクセラレーションされたビデオデコードが行われないこと(ライブラリは pyav にフォールバックします)、aarch64 の torchcodec ホイールには PyTorch 2.11 以降が必要であること、Jetson 用の Docker ビルドは **JetPack 6.2** を対象としコミュニティが維持していることが記載されています。現在の LeRobot が JetPack 7.2 の CUDA 13 向けの aarch64 CUDA ホイールを用意しているという公式の記述はありません。
3. **つまり「検証が必要」です — 「サポート済み」でも「壊れている」でもありません。** このキットで LeRobot を前提に設計する前に、あなたの使用する構成そのものをテストしてください:インストールし、小さなポリシーを実行し、推論が GPU を使用していることを確認します。

> **Juxi の補足:** 当社のロボットキット(SO-ARM101、LeKiwi、ビジョンキット)は LeRobot を基盤としています。JetPack 7.2.1 のこのキットでは、
> 上流からも Juxi からも、まだテスト済みの経路は存在しません。コミュニティが維持する経路の参照プラットフォームは JetPack 6.2 です。
> このキットでの LeRobot をプロジェクト日程に組み込む前に、Juxi サポートに確認してください([ダウンロード](/ja/tutorials/jetson-orin-nano/downloads)を参照)。

## 現在動くもの

### ROS 2 Jazzy — 基盤

JetPack に ROS は含まれません。動作する経路は、Ubuntu 24.04(arm64)向けの公式 ROS 2 Jazzy deb インストールです。ROS 2 ドキュメントからの要約:

```bash
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo apt update && sudo apt install curl -y
export ROS_APT_SOURCE_VERSION=$(curl -s https://api.github.com/repos/ros-infrastructure/ros-apt-source/releases/latest | grep -F "tag_name" | awk -F'"' '{print $4}')
curl -L -o /tmp/ros2-apt-source.deb "https://github.com/ros-infrastructure/ros-apt-source/releases/download/${ROS_APT_SOURCE_VERSION}/ros2-apt-source_${ROS_APT_SOURCE_VERSION}.$(. /etc/os-release && echo ${UBUNTU_CODENAME:-${VERSION_CODENAME}})_all.deb"
sudo dpkg -i /tmp/ros2-apt-source.deb
sudo apt update
sudo apt install ros-jazzy-ros-base    # or: ros-jazzy-desktop
source /opt/ros/jazzy/setup.bash
```

### Isaac ROS 4.6 — アクセラレーションされた知覚が必要なとき

NVIDIA の apt リポジトリからインストールします(公式ページに正確なキーリングのコマンドが記載されています):リポジトリ `https://isaac.download.nvidia.com/isaac-ros/release-4.6`、チャンネル `noble-jetpack`、中国ミラー `isaac.download.nvidia.cn`。次に:

```bash
sudo apt-get install isaac-ros-cli
mkdir -p ~/workspaces/isaac_ros-dev/src
echo 'export ISAAC_ROS_WS="${ISAAC_ROS_WS:-${HOME}/workspaces/isaac_ros-dev/}"' >> ~/.bashrc
```

プリインストールされた OpenCV 4.8.0 を一度削除します(上記のギャップ一覧を参照)。その後、Isaac ROS が固定バージョンの OpenCV 4.6.0 を自動的にインストールします:

```bash
sudo apt-get remove -y libopencv* opencv*
```

NVIDIA は Docker を推奨しています:「Docker はほとんどのユーザーに推奨される選択肢です。ホストシステムからの最高レベルの分離を提供します」。これは RealSense カメラの要件(Docker のみ)とも一致します。

### NemoClaw とエージェントスタック

インストーラーは NVIDIA Jetson デバイス(Orin と Thor)を自動検出し、JetPack 固有のホスト構成を適用します。注意点が 2 つあります:プロジェクトはアルファ(「Early preview」)であり、公式のプラットフォームマトリクスに Jetson の行がないため、サポートは事実上のもので公式の主張ではありません。8GB が公称の最小 RAM(推奨 16GB)で、およそ 2.4 GB のサンドボックスイメージ周辺でメモリ不足のリスクがドキュメント化されています。[エージェント型 AI](/ja/tutorials/jetson-orin-nano/agentic-ai)を参照。

## 推奨

- **ROS 2 のみ:** 今日から JetPack 7.2.1 + ROS 2 Jazzy で構築してください。これは動作します。
- **Isaac ROS がクリティカル:** 2026 年 8 月からサポートされていますが新しく、Orin Nano のドキュメントは薄い状態です。Docker で検証し、NVMe を計画してください。最も実績の長い組み合わせが必要なら、JetPack 6.2 時代の構成は依然として擁護可能です — どちらを選んでも生じる再構築コストは[移行ガイド](/ja/tutorials/jetson-orin-nano/jetpack-6-to-7)を参照してください。
- **シミュレーションや学習が必要:** 別途 RTX PC(Isaac Sim)と、GR00T クラスの作業用に Thor クラスのデバイスを見込んでください。このキットはどちらの仕事もできません。
- **LeRobot を基盤とする場合:** 検証が必要です。まずテストしてください。ドキュメント化された経路の参照は JetPack 6.2 です。
- **このキットを買ってはいけない用途:** Isaac Sim、GR00T のポストトレーニング、またはリアルタイムのフル SAM / Grounding DINO / FoundationPose クラスのワークロード — 後者 3 つは、NVIDIA のこのデバイス向けベンチマーク表に実行可能として記載されていません。

## 依然として不明な点

- **micro-ROS:** Jetson 固有の公式ページは見つかりませんでした(micro.ros.org の公式 URL 2 つは現在 404 を返します)。組み合わせは未検証として扱ってください。
- **Isaac ROS 5.0 以降の ROS ディストリビューション:** Jazzy を推奨するフォーラム回答は 5.0(2026-09-21)より前のもので、5.0 以降の記述は見つかっていません。
- **JetPack 7.2 上の LeRobot:** 公式の記述はありません。コミットする前に CUDA 13 向けの PyTorch aarch64 ホイールの提供状況を確認してください。
- **Isaac ROS と microSD のみの構成:** サポート表は NVMe としていますが、Orin Nano に限った再記載はありません。
- **「Jetson Orin」と「Orin Nano」:** プラットフォーム表はファミリー名を使っており、「Orin Nano Super 8GB」はベンチマーク表にのみ登場します。NVIDIA がこれらを別々のサポート主張として扱っているかは未解決です。
- **DeepStream と TensorRT Edge-LLM:** このロボティクスレビューでは再検証していません — それぞれのページを参照してください。

## 出典

- [Isaac ROS — Getting Started](https://nvidia-isaac-ros.github.io/getting_started/index.html)(サポート対象プラットフォーム、Docker、ROS 2 Lyrical。2026-09-26 確認)
- [Isaac ROS 4.6 — Getting Started](https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html)(Jazzy との組み合わせ、apt インストール、OpenCV の注記。2026-09-26 確認)
- [Isaac ROS 5.0 — Getting Started](https://nvidia-isaac-ros.github.io/v/release-5.0/getting_started/index.html)(x86_64 上の Isaac Sim。2026-09-26 確認)
- [Isaac ROS — Releases](https://nvidia-isaac-ros.github.io/releases/index.html)(4.6.0 と 5.0.0 のノート、RealSense と DNN エンコーダーの制限。2026-09-26 確認)
- [Isaac ROS — Performance](https://nvidia-isaac-ros.github.io/performance/index.html)(Orin Nano Super 8GB のベンチマーク列。2026-09-26 確認)
- [Isaac ROS Buildfarm CDN](https://nvidia-isaac-ros.github.io/getting_started/isaac_ros_buildfarm_cdn.html)(Ubuntu 24.04 向け ROS 2 Lyrical パッケージ。2026-09-26 確認)
- [Isaac Sim 6.0 のインストール要件](https://docs.isaacsim.omniverse.nvidia.com/6.0.0/installation/requirements.html)(2026-09-26 確認)
- [GR00T エンドツーエンドワークフロー — 前提条件](https://docs.nvidia.com/learning/physical-ai/gr00t-e2e-workflow/latest/getting-started/prerequisites.html)(2026-09-26 確認)
- [NVIDIA 開発者フォーラム — 「Is ROS2 Jazzy the correct version...」(社員の回答。フォーラムであり公式ドキュメントではない)](https://forums.developer.nvidia.com/t/is-ros2-jazzy-the-correct-version-to-use-with-jetpack-7-2-1-ubuntu-24-04/382439)(2026-09-26 確認)
- [ROS 2 Jazzy インストール — deb パッケージ(上流)](https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/Ubuntu-Install-Debs.rst)(2026-09-26 確認)
- [ROS 2 Jazzy インストール — apt リポジトリ(上流)](https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/_Apt-Repositories.rst)(2026-09-26 確認)
- [LeRobot インストールガイド(上流)](https://raw.githubusercontent.com/huggingface/lerobot/main/docs/source/installation.mdx)(2026-09-26 確認)
- [LeRobot pyproject.toml(上流)](https://raw.githubusercontent.com/huggingface/lerobot/main/pyproject.toml)(Python と torchcodec の固定バージョン。2026-09-26 確認)
- [Ubuntu Noble — python3 パッケージ](https://packages.ubuntu.com/noble/python3)(Python 3.12.3。2026-09-26 確認)
- [NemoClaw — 前提条件](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md)(2026-09-26 確認)
- [NemoClaw — プラットフォームサポートマトリクス](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md)(アルファ段階。Jetson の行なし。2026-09-26 確認)
- [NemoClaw — インストーラーのトラブルシューティング(Jetson 自動検出)](https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx)(2026-09-26 確認)
- [NVIDIA — Build a Claw(「Install OpenClaw on Your NVIDIA Jetson Orin Nano™」)](https://www.nvidia.com/en-us/ai/build-a-claw/)(2026-09-26 確認)
- [JetPack 7.2.1 ダウンロードページ(コンポーネントマトリクスでは Isaac ROS は「近日公開」)](https://developer.nvidia.com/embedded/jetpack/downloads)(2026-09-26 確認)

*ステータス: レビュー済み（2026-10-11）。エコシステムの可用性は急速に変化します — この表に依拠する前に、リンク先の NVIDIA および上流のページを再確認してください。Juxi Technology による実機検証はまだ行われていません。*

---

NVIDIA® および Jetson™ は NVIDIA Corporation の商標です。本ページは Juxi Technology によって公開されており、NVIDIA の公式出版物ではありません。
