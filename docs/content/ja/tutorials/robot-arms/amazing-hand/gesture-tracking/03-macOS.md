---
title: "Mac ワンクリックデプロイ実行"
description: "AmazingHand ジェスチャートラッキング ワンクリックデプロイ（Mac）。ターミナルで実行権限を付与し、スクリプトを順に実行、カメラジェスチャーでハンドを動かします。"
---

# Mac ワンクリックデプロイ実行

AmazingHand-main.zip

本チュートリアルは AmazingHand（Pollen Robotics の器用なハンド）公式 Demo に基づいており、ワンクリックデプロイスクリプトを用意済みです。 番号順に実行するだけです。**すべてのスクリプトは Demo/Mac一键部署脚本/ フォルダ下にあり、ターミナルで ./スクリプト名 を実行します。**

---

## ハードウェアの準備

|ハードウェア|要件|
|---|---|
|器用なハンド本体|右手 / 左手 / 両手|
|サーボドライバ基板|外部接続、USB でパソコンに接続|
|電源|**少なくとも 5V 4A**（USB 給電では不足、必ず外部電源を接続）|
|カメラ|Mac 内蔵カメラまたは USB カメラ|

> モデルファイルは [Onshape](https://cad.onshape.com/documents/430ff184cf3dd9557aaff2be/w/e3658b7152c139971d22c688/e/d79fbb3641873de0a515037e) で閲覧またはダウンロードできます（URDF を含む）。
> 
> 

---

## スクリプトの実行権限の取得（重要）

**スクリプトを Windows / 圧縮パッケージから Mac にコピーすると、実行権限（****`+x`****）が失われ、そのまま実行すると
****`Permission denied`**** が報告されます。初めて使用する前に必ず実行してください：**

```Plain Text
cd "AmazingHand-main/Demo/Mac一键部署脚本"
chmod +x *.sh
```

その後、各スクリプトは `./脚本名` で実行できます。

> ヒント：`AmazingHand-main` を Mac にコピーする際、**tar** で権限を保持するのが最も確実です：
> `tar czf AmazingHand-main.tar.gz AmazingHand-main`、または解凍後に一度 `chmod +x *.sh` をまとめて実行します。
> 
> 

---

## 環境のインストール（スクリプト 1）

ターミナルでスクリプトディレクトリに入り、実行します（上記の手順 2 の `chmod +x` を済ませておいてください）：

```Plain Text
cd "AmazingHand-main/Demo/Mac一键部署脚本"
./1-安装环境.sh
```

自動で以下を実行します：

1. **Xcode コマンドラインツールの確認**（Rust のコンパイルに必須）。欠けている場合は `xcode-select --install` を提示

2. **Rust のインストール**（rustup + stable ツールチェーン）

3. **cargo の清華ミラー源の設定**（`~/.cargo/config.toml`）、crate のダウンロードを高速化

4. **uv のインストール**（Python パッケージマネージャー）

5. **dora-cli 0.5.0 のインストール**（`cargo install`、初回コンパイルは約 10~20 分、気長にお待ちください）。旧版 dora を自動でクリーンアップ

6. **dora-rs pip パッケージのインストール**（任意）

> **重要**：スクリプト終了後に**ターミナルを閉じて開き直し**、環境変数を反映させてください。バージョン番号が空で表示される場合は、 以下のパスを `~/.zshrc` に追加してください：
> 
> 

```Plain Text
export PATH="$HOME/.cargo/bin:$HOME/.local/bin:$PATH"
```

### 手動インストールの代替（スクリプトが使えない場合）

- **Xcode コマンドラインツール**：`xcode-select --install`

- **Rust**：`curl --proto '=https' --tlsv1.2 -sSf `[`https://sh.rustup.rs`](https://sh.rustup.rs)` | sh`

- **uv**：`curl -LsSf `[`https://astral.sh/uv/install.sh`](https://astral.sh/uv/install.sh)` | sh`

- **dora-cli**：`cargo install dora-cli --version 0.5.0`

### cargo 清華ミラー（~/.cargo/config.toml）

```Plain Text
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

- macOS の USB シリアルデバイス名は **/dev/tty.usbmodem\*** または **/dev/cu.usbmodem\***（Linux の `/dev/ttyACM*` ではありません）

- ポートの確認：

```Plain Text
ls /dev/tty.usbmodem* /dev/cu.usbmodem*
```

---

## シリアルポートの設定（スクリプト 2）

**`./2-配置串口.sh` を実行**：

1. 「サーボドライバ基板をパソコンに接続してください」と表示 → Enter で検出開始

2. 検出されたシリアルポートを自動で一覧表示（`/dev/tty.usbmodem* / /dev/cu.usbmodem* / *.usbserial*`）

3. ポートが 1 つの場合は Enter で確定、複数の場合は番号を入力

4. 3 つの dataflow yml の `--serialport` と `AHControl/src/main.rs` の既定ポートを自動で書き込み

5. macOS の USB シリアルは通常ユーザーが読み書き可能です；権限がないと表示された場合は、手動で実行します：

```Bash
sudo chmod 666 /dev/cu.usbmodem*
```

または **システム設定 → プライバシーとセキュリティ → 入力監視** で、ターミナルのアクセスを許可します。

> 仮想マシン内の場合は、USB デバイスを仮想マシンに接続してください。
> 
> 

---

## コードのデプロイ（スクリプト 3）

**`./3-部署代码.sh` を実行**、自動で以下を実行します：

1. dora デーモンを起動（`dora up`）

2. Python 3.12 仮想環境を作成（`uv venv --python 3.12`）

3. 仮想環境をアクティブ化

4. AHControl Rust ノードをコンパイル（`cargo build --release`、初回約 10 分）

5. AHSimulation、HandTracking の依存関係を同期（`uv sync`）

6. mediapipe==0.10.14 を強制インストール（チュートリアル既知の落とし穴、フォールバック）

> デプロイは 1 回だけ実行すれば十分です。その後繰り返し実行すると、仮想環境を再作成するか確認されます。
> 
> 

---

## コードの実行（スクリプト 4）

**`./4-运行代码.sh` を実行**、対話メニューが表示されます：

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

選択後、自動で `dora build` + `dora run` が実行されます。カメラウィンドウが開き、カメラに向かってジェスチャーを行うと、器用なハンドがリアルタイムに追従します。**Ctrl+C で停止**、データフロー終了後に Enter を押すとメインメニューに戻り、他のモードを選択するか q で終了できます。

> **初回実行時、macOS がカメラ認証をポップアップします**：システム設定 → プライバシーとセキュリティ → カメラ で、ターミナルのカメラ使用を許可してください。
> 
> 

---

## プロジェクトのクリーンアップ（スクリプト 0）

**`./0-清理项目.sh` を実行**、Y を入力して確定すると自動でクリーンアップします：

1. dora デーモンを停止

2. 3 つの仮想環境（`.venv`）を削除

3. Rust のコンパイル生成物（`Demo/target`）を削除

4. `__pycache__`、`.bak` バックアップ、ログ、`Demo/out`（dora ログディレクトリ）を削除

5. **既定ポートを復元**（`--serialport /dev/ttyACM0`）、本機のシリアルポートの残留を除去

> クリーンアップ後は `AmazingHand-main` フォルダ全体を他人にコピーでき、きれいで残留がありません。新しいマシンでは 1 → 2 → 3 → 4 の順に実行するだけです。
> 
> 

---

## よくある問題と注意事項

### 9.1 `Permission denied`（スクリプトに実行権限がない）

- 症状：`./1-安装环境.sh` を実行すると `bash: ./1-安装环境.sh: Permission denied` が報告される

- 原因：スクリプトを Windows / 圧縮パッケージから Mac にコピーすると**実行ビットが失われる**

- 解決：

```Plain Text
chmod +x *.sh
```

### 9.2 cargo が `Updating 'tuna' index` で止まる

- 原因：ミラー設定が **git リポジトリ方式**（`.../git/crates.io-index.git`）になっており、初回に 1GB+ のインデックスをダウンロードする

- 解決：`~/.cargo/config.toml` を **sparse 疎インデックス**に変更（3.2 節参照）、または `1-安装环境.sh` を再実行

### 9.3 mediapipe に solutions サブモジュールが欠落 / インストール破損

```Plain Text
uv pip uninstall mediapipe
uv pip install mediapipe==0.10.14
```

- 必ず仮想環境をアクティブ化した状態で実行してください（Demo ディレクトリ内）

- `3-部署代码.sh` が自動でこのステップをフォールバックとして行います

### 9.4 dora のバージョン非互換（message v0.8.0 vs v0.7.0）

- 症状：`version mismatch: message format v0.8.0 is not compatible with expected message format v0.7.0`

- 原因：dora-cli のバージョンと dora-node-api が一致していません。**必ず 0.5.0 に統一する必要があります**

    - 確認：`dora --version` は `dora-cli 0.5.0`、`dora-message: 0.8.0` を出力するはずです

    - `1-安装环境.sh` は旧版を自動で検出し強制再インストールします

**システムに旧版 dora（例 0.4.1）が残留している場合は、先に手動でクリーンアップしてください：**

```Bash
# 1. 旧バージョンの dora を特定
which dora
ls -la ~/.cargo/bin/dora ~/.dora/bin/dora ~/.local/bin/dora 2>/dev/null

# 2. 見つかった旧バージョンを削除（実際のパスに従って）
rm -f ~/.cargo/bin/dora ~/.dora/bin/dora ~/.local/bin/dora

# 3. 0.5.0 を強制インストール
cargo install dora-cli --version 0.5.0 --force

# 4. バージョンを確認（dora-cli 0.5.0 / dora-message: 0.8.0 が出力されるはず）
dora --version
```

> `dora --version` が依然として旧版を表示する場合は、PATH に他の旧 dora が残っていることを示します。which dora で 1 つずつ確認して削除してください。
> 
> 

### 9.5 シリアルポートの権限がない

```Bash
sudo chmod 666 /dev/cu.usbmodem*
```

- または **システム設定 → プライバシーとセキュリティ → 入力監視** → ターミナルを許可

- `tty.*` デバイスで読めない場合は、対応する `cu.*` デバイスに切り替えてください（cu デバイスは読み取り専用ポートで、直接制御により適しています）

### 9.6 カメラの権限

- **初回実行時のポップアップで「許可」を選択**、または **システム設定 → プライバシーとセキュリティ → カメラ** で、ターミナルのカメラ使用を許可

- カメラが他のアプリ（FaceTime、会議ソフト）に占有されていないことを確認

### 9.7 ポート番号が毎回変わる

- USB を抜き差しするとデバイス名が変わる場合があり、`2-配置串口.sh` を再実行

### 9.8 openCV が不足

```Bash
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

（`HandTracking` ディレクトリで、仮想環境をアクティブ化した後に実行）

### 9.9 Apple Silicon でコンパイルが遅い / 初回実行が Gatekeeper にブロックされる

- Apple Silicon では初回の `cargo build` で dora 依存関係のコンパイルが遅いのは正常で、気長にお待ちください

- 「開発元を検証できません」と表示された場合：システム設定 → プライバシーとセキュリティ → このまま開く

---

## コード構成の説明

### Demo ディレクトリ

|ディレクトリ/ファイル|説明|
|---|---|
|AHControl|Rust ノード、サーボモーターを制御。src/main.rs がエントリ|
|AHSimulation|Python ノード、MuJoCo シミュレーション + 逆運動学（mink）|
|HandTracking|Python ノード、MediaPipe 手部トラッキング|
|dataflow_\*.yml|dora データフロー定義（ノード接続図）|
|Mac一键部署脚本|本ワンクリックスクリプト一式|

### 各 dataflow の対応関係

|ファイル|用途|
|---|---|
|dataflow_tracking_simu.yml|シミュレーション環境、カメラのジェスチャー → シミュレーション両手|
|dataflow_tracking_real_right.yml|実機右手|
|dataflow_tracking_real_left.yml|実機左手|
|dataflow_tracking_real_2hands.yml|実機両手（同じドライバ基板に接続）|

### データフローの原理

```Bash
摄像头 → HandTracking（MediaPipe 识别手势）
              ↓ 手部关键点坐标
         AHSimulation（MuJoCo 仿真 + 逆运动学）
              ↓ 关节目标角度
         AHControl（串口 → 舵机驱动板 → 灵巧手）
```

### ポート設定の場所

- 3 つの `dataflow_tracking_real_*.yml` の `args:` 行：`--serialport /dev/cu.usbmodem...`

- `AHControl/src/main.rs` の `default_value`（シリアルポートパラメータの既定値）

- `AHControl/config/*.toml`：サーボ型番、ID、オフセット（通常は変更不要）



