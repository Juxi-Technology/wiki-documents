---
title: "Windows ワンクリックデプロイ実行"
description: "本チュートリアルは AmazingHand（Pollen Robotics の器用なハンド）公式 Demo に基づいており、ワンクリックデプロイスクリプトを用意済みです。"
---

# Windows ワンクリックデプロイ実行

[AmazingHand-main.zip](/downloads/AmazingHand-main.zip)

本チュートリアルは AmazingHand（Pollen Robotics の器用なハンド）公式 Demo に基づいており、ワンクリックデプロイスクリプトを用意済みです。
番号順に実行するだけです。**すべてのスクリプトは ****`Demo\Windows一键部署脚本\`**** フォルダ下にあり、そのままダブルクリックで実行します。**

---

## ハードウェアの準備

> モデルファイルは [Onshape](https://cad.onshape.com/documents/430ff184cf3dd9557aaff2be/w/e3658b7152c139971d22c688/e/d79fbb3641873de0a515037e) で閲覧またはご自身でダウンロードできます（URDF を含む）。
> 
> 

---

## 環境のインストール（スクリプト 1）

**ダブルクリック ****`1-安装环境.bat`**、自動で以下を実行します：

1. **MSVC ビルドツールの確認**（cl.exe）——Rust のコンパイルに必須。欠けている場合はインストールを促します
Visual Studio 2022 Build Tools をインストールし、「C++ によるデスクトップ開発」にチェックを入れ、インストール後にターミナルを開き直します。

2. **Rust のインストール**（rustup + stable-msvc ツールチェーン）

3. **cargo の清華ミラー源の設定**（`C:\Users\你的用户名.cargo\config.toml`）、crate のダウンロードを高速化

4. **uv のインストール**（Python パッケージマネージャー）

5. **dora-cli 0.5.0 のインストール**（`cargo install`、初回コンパイルは約 10~20 分、気長にお待ちください）

6. **dora-rs pip パッケージのインストール**（任意、仮想環境にインストールされます）

> **重要**：スクリプト終了後に**ターミナルを閉じて開き直し**、環境変数を反映させてください。インストール過程はネットワークが原因で遅い場合があります。気長にお待ちいただき、途中で閉じないでください。
> 
> 

### 手動インストールの代替（スクリプトが使えない場合）

- **Rust**：[https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install)

    - Windows は rustup-init.exe を使用し、既定の MSVC ツールチェーンを選択

    - 環境変数：`%USERPROFILE%.cargo\bin` を PATH に追加

- **uv**：PowerShell で `irm ``https://astral.sh/uv/install.ps1`` | iex` を実行

    - 環境変数：`%USERPROFILE%.local\bin` を PATH に追加

- **dora-cli**：`cargo install dora-cli --version 0.5.0`

### cargo 清華ミラーの設定（~/.cargo/config.toml）

```Bash
[source.crates-io]
replace-with = "tuna"

[source.tuna]
registry = "sparse+https://mirrors.tuna.tsinghua.edu.cn/crates.io-index/"

[registries.tuna]
index = "sparse+https://mirrors.tuna.tsinghua.edu.cn/crates.io-index/"

[http]
check-revoke = false
```

> **sparse 疎インデックス**（上記）を使用し、git リポジトリミラーは使用しないでください——git 方式は初回に約 1GB のインデックスをダウンロードする必要があり、`Updating 'tuna' index` でスタックしやすいです。
> 
> 

---

## 配線方法

- サーボドライバ基板の USB をパソコンに接続、**外部 5V4A 電源**

- パソコン側でポート番号を確認：**デバイスマネージャー → ポート(COM と LPT)**、例 `COM11`

---

## シリアルポートの設定（スクリプト 2）

**ダブルクリック ****`2-配置串口.bat`**（実際のロジックは `2-配置串口.ps1`）：

1. 「サーボドライバ基板をパソコンに接続してください」と表示 → Enter で検出開始

2. 検出された COM ポートを自動で一覧表示（デバイス名付き）

3. ポートが 1 つの場合は Enter で確定、複数の場合は番号を入力

4. 3 つの dataflow yml の `--serialport` と `AHControl\src\main.rs` の既定ポートを自動で書き込み

5. 元のファイルは自動で `.bak` にバックアップ

> USB を抜き差しするとポート番号が変わる場合があり、本スクリプトを再実行する必要があります。
> 
> 

---

## コードのデプロイ（スクリプト 3）

**ダブルクリック ****`3-部署代码.bat`**、自動で以下を実行します：

1. dora デーモンを起動（`dora up`）

2. Python 3.12 仮想環境を作成（`uv venv --python 3.12`）

3. 仮想環境をアクティブ化

4. AHControl Rust ノードをコンパイル（`cargo build --release`、初回約 10 分）

5. AHSimulation、HandTracking の依存関係を同期（`uv sync`）

6. mediapipe==0.10.14 を強制インストール

> デプロイは 1 回だけ実行すれば十分です。その後繰り返し実行すると、仮想環境を再作成するか確認されます。
> 
> 

---

## コードの実行（スクリプト 4）

**ダブルクリック ****`4-运行代码.bat`**、対話メニューが表示されます：

```Bash
============================================
   请选择运行模式：
============================================
    1 - 模拟仿真（摄像头手势追踪）
    2 - 真实硬件
    q - 退出
============================================
  请输入序号 [1/2/q]:
```

- **1** を選択：シミュレーション環境、カメラのジェスチャーで 2 体のシミュレーションハンドを駆動

- **2** を選択：サブメニューに入り、右手 / 左手 / 両手を選択

```Bash
============================================
   真实硬件 - 请选择灵巧手：
============================================
    1 - 右手
    2 - 左手
    3 - 左右双手
    b - 返回上级菜单
============================================
```

選択後、自動で `dora build` + `dora run` が実行されます。カメラウィンドウが開き、カメラに向かってジェスチャーを行うと、器用なハンドがリアルタイムに追従します。**Ctrl+C で停止**、データフロー終了後に Enter を押すとメインメニューに戻り、他のモードを選択するか `q` で終了できます。

> 初回実行時、Windows がカメラの権限をブロックする場合があります。「許可」をクリックするだけです。
> 
> 

---

## プロジェクトのクリーンアップ（スクリプト 0）

**ダブルクリック ****`0-清理项目.bat`**、`Y` を入力して確定すると自動でクリーンアップします：

1. dora デーモンを停止

2. 3 つの仮想環境（`.venv`）を削除

3. Rust のコンパイル生成物（`Demo\target`）を削除

4. `pycache`、`.bak` バックアップ、ログ、`Demo\out`（dora ログディレクトリ）を削除

5. **既定ポートを復元**（`--serialport /dev/ttyACM0`）、本機のシリアルポートの残留を除去

> クリーンアップ後は `AmazingHand-main` フォルダ全体を他人にコピーでき、きれいで残留がありません。新しいマシンでは 1 → 2 → 3 → 4 の順に実行するだけです。
> 
> 

---

## よくある問題と注意事項

### 8.1 cargo が `Updating 'tuna' index` で止まる

- 原因：ミラー設定が **git リポジトリ方式**（`.../git/crates.io-index.git`）になっており、初回に 1GB+ のインデックスをダウンロードする

- 解決：`C:\Users\你的用户名.cargo\config.toml` を **sparse 疎インデックス**に変更（2.2 節参照）、または `1-安装环境.bat` を再実行

### 8.2 mediapipe に solutions サブモジュールが欠落 / インストール破損

```Bash
uv pip uninstall mediapipe
```

```Bash
uv pip install mediapipe==0.10.14
```

- 必ず仮想環境をアクティブ化した状態で実行してください（`Demo` ディレクトリ内）

- `3-部署代码.bat` が自動でこのステップをフォールバックとして行います

### 8.3 dora のバージョン非互換（message v0.8.0 vs v0.7.0）

- 症状：`version mismatch: message format v0.8.0 is not compatible with expected message format v0.7.0`

- 原因：dora-cli のバージョンと dora-node-api が一致していません。**必ず 0.5.0 に統一する必要があります**

    - 確認：`dora --version` は `dora-cli 0.5.0`、`dora-message: 0.8.0` を出力するはずです

    - 修正：`cargo install dora-cli --version 0.5.0 --force`

    - PATH に複数の dora がある場合（例 `C:\Users\xxx.dora\bin` の旧版）、`.cargo\bin` が前に来るようにするか、旧版を削除してください

### 8.4 MuJoCo / mediapipe のモデル読み込み失敗（中国語パス）

- 症状：`ParseXML: Error opening file '...\scene.xml'` または `Can't find file: ....tflite`

- 原因：MuJoCo 3.x / mediapipe の C++ ローダーは Windows 上で**中国語を含む絶対パスを開けません**（例 `D:\Claude工作区...`）

- 本プロジェクトは修正を内蔵済み：

    - `AHSimulation\AHSimulation\mj_mink_*.py` はモデル読み込み前に作業ディレクトリを切り替え

    - `HandTracking\mediapipe_patch.py` は 8.3 短縮パス + 相対パスで回避

- これらの修正コードを削除しないでください

### 8.5 カメラの権限

- 初回実行時のポップアップで「許可」を選択

- 設定 → プライバシー → カメラ → デスクトップアプリのアクセスを許可

### 8.6 ポート番号が毎回変わる

- USB を抜き差しすると COM 番号が変わる場合があり、`2-配置串口.bat` を再実行

### 8.7 openCV が不足

```Bash
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

（`HandTracking` ディレクトリで、仮想環境をアクティブ化した後に実行）

---

## コード構成の説明

### Demo ディレクトリ

### 各 dataflow の対応関係

### データフローの原理

```Bash
摄像头 → HandTracking（MediaPipe 识别手势）
              ↓ 手部关键点坐标
         AHSimulation（MuJoCo 仿真 + 逆运动学）
              ↓ 关节目标角度
         AHControl（串口 → 舵机驱动板 → 灵巧手）
```

### ポート設定の場所

- 3 つの `dataflow_tracking_real_*.yml` の `args:` 行：`--serialport COMxx`

- `AHControl\src\main.rs` の `default_value = "COMxx"`（シリアルポートパラメータの既定値）

- `AHControl\config\*.toml`：サーボ型番、ID、オフセット（通常は変更不要）

