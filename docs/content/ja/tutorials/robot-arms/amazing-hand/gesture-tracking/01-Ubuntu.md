---
title: "Linux（Ubuntu）ワンクリックデプロイ実行"
description: "AmazingHand ジェスチャートラッキング ワンクリックデプロイ（Ubuntu）。ターミナルでスクリプトを順に実行し、カメラジェスチャーでハンドを動かします。"
---

# Linux（Ubuntu）ワンクリックデプロイ実行

AmazingHand-main.zip

本チュートリアルは AmazingHand（Pollen Robotics の器用なハンド）公式 Demo に基づいており、ワンクリックデプロイスクリプトを用意済みです。
番号順に実行するだけです。**すべてのスクリプトは ****`Demo/Linux(Ubuntu)一键部署脚本/`**** フォルダ下にあり、ターミナルで ****`./脚本名`**** を実行します。**

---

## ハードウェアの準備

> モデルファイルは [Onshape](https://cad.onshape.com/documents/430ff184cf3dd9557aaff2be/w/e3658b7152c139971d22c688/e/d79fbb3641873de0a515037e) で閲覧またはご自身でダウンロードできます（URDF を含む）。
> 
> 

---

## スクリプトの実行権限の取得（重要）

**スクリプトを Windows / 圧縮パッケージから Linux にコピーすると、実行権限（****`+x`****）が失われます**、そのまま実行すると
`Permission denied` が報告されます。**初めて使用する前に必ず実行してください：**

```Bash
cd "AmazingHand-main/Demo/Linux(Ubuntu)一键部署脚本"
```

```Bash
chmod +x *.sh
```

その後、各スクリプトは `./脚本名` で実行できます。2 つのステップを 1 つにまとめることもできます：

```Bash
cd "AmazingHand-main/Demo/Linux(Ubuntu)一键部署脚本" && chmod +x *.sh && ./1-安装环境.sh
```

> ヒント：`AmazingHand-main` を Linux にコピーする際、**tar** で権限を保持するのが最も確実です：
> `tar czf AmazingHand-main.tar.gz AmazingHand-main`（Windows/Linux どちら側でパッケージしてもよく、Linux 側で解凍します）、
> または解凍後に一度 `chmod +x *.sh` をまとめて実行するだけです。
> 
> 

---

## 環境のインストール（スクリプト 1）

ターミナルでスクリプトディレクトリに入り、実行します（上記の手順 2 の `chmod +x` を済ませておいてください）：

```Bash
cd "Demo/Linux(Ubuntu)一键部署脚本"
```

```Bash
./1-安装环境.sh
```

自動で以下を実行します：

1. **Rust のインストール**（rustup + stable ツールチェーン）

2. **cargo の清華ミラー源の設定**（`~/.cargo/config.toml`）、crate のダウンロードを高速化

3. **uv のインストール**（Python パッケージマネージャー）

4. **dora-cli 0.5.0 のインストール**（`cargo install`、初回コンパイルは約 10~20 分、気長にお待ちください）

5. **dora-rs pip パッケージのインストール**（任意）

> **重要**：スクリプト終了後に**ターミナルを閉じて開き直し**、環境変数を反映させてください。バージョン番号が空で表示される場合は、以下のパスを `~/.bashrc` に追加してください：
> 
> export PATH="$HOME/.cargo/bin:$HOME/.local/bin:$PATH"
> 
> 

### 手動インストールの代替（スクリプトが使えない場合）

- **Rust**：

```Bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

- **uv**：

```Bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

- **dora-cli**：

```Bash
cargo install dora-cli --version 0.5.0
```

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

- ポート番号の確認：

```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

- 通常は `/dev/ttyACM0`

---

## シリアルポートの設定（スクリプト 2）

**`./2-配置串口.sh` を実行**：

1. 「サーボドライバ基板をパソコンに接続してください」と表示 → Enter で検出開始

2. 検出されたシリアルポートを自動で一覧表示（`/dev/ttyACM*` / `/dev/ttyUSB*`）

3. ポートが 1 つの場合は Enter で確定、複数の場合は番号を入力

4. 3 つの dataflow yml の `--serialport` と `AHControl/src/main.rs` の既定ポートを自動で書き込み

5. **シリアルポートの権限を自動設定**：

```Bash
sudo chmod 666 /dev/ttyACM0
```

6. 現在のユーザーを dialout グループに追加することを推奨します（毎回パスワードを入力せずに済み、ログアウトと再ログインが必要）：

```Bash
sudo usermod -aG dialout $USER
```

> 仮想マシン内で `ls /dev/ttyUSB* /dev/ttyACM*` に結果がない場合は、仮想マシンの設定で USB デバイスを仮想マシンに接続してください。
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

選択後、自動で `dora build` + `dora run` が実行されます。カメラウィンドウが開き、カメラに向かってジェスチャーを行うと、器用なハンドがリアルタイムに追従します。**Ctrl+C で停止**、データフロー終了後に Enter を押すとメインメニューに戻り、他のモードを選択するか `q` で終了できます。

> Linux デスクトップではカメラの権限が必要です（例 Ubuntu のプライバシー設定 → カメラ）。また、カメラが他のアプリに占有されていないことを確認してください。
> 仮想マシンでカメラが開けない場合は  9.6 カメラの権限 / 仮想マシンでカメラが開けない を参照してください。
> 
> 

---

## プロジェクトのクリーンアップ（スクリプト 0）

**`./0-清理项目.sh` を実行**、`Y` を入力して確定すると自動でクリーンアップします：

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

- 原因：スクリプトを Windows / 圧縮パッケージから Linux にコピーすると**実行ビットが失われる**

- 解決：すべてのスクリプトに実行権限を付与

```Bash
chmod +x *.sh
```

- その後 `./脚本名` で実行します（`bash 脚本名` は使用しないでください。本チュートリアル手順 2 の対話プロンプトをスキップします）

### 9.2 cargo が `Updating 'tuna' index` で止まる

- 原因：ミラー設定が **git リポジトリ方式**（`.../git/crates.io-index.git`）になっており、初回に 1GB+ のインデックスをダウンロードする

- 解決：`~/.cargo/config.toml` を **sparse 疎インデックス**に変更（3.2 節参照）、または `1-安装环境.sh` を再実行

### 9.3 mediapipe に solutions サブモジュールが欠落 / インストール破損

```Bash
uv pip uninstall mediapipe
```

```Bash
uv pip install mediapipe==0.10.14
```

- 必ず仮想環境をアクティブ化した状態で実行してください（`Demo` ディレクトリ内）

- `3-部署代码.sh` が自動でこのステップをフォールバックとして行います

### 9.4 dora のバージョン非互換（message v0.8.0 vs v0.7.0）

- 症状：`version mismatch: message format v0.8.0 is not compatible with expected message format v0.7.0`

- 原因：dora-cli のバージョンと dora-node-api が一致していません。**必ず 0.5.0 に統一する必要があります**

    - 確認：`dora --version` は `dora-cli 0.5.0`、`dora-message: 0.8.0` を出力するはずです

    - `1-安装环境.sh` は現在**バージョンを自動検出**します：0.5.0 でなければクリーンアップして強制再インストールします

**システムに旧版 dora（例 0.4.1）が残留している場合は、先に手動でクリーンアップしてから再インストールしてください：**

```Bash
# 1. 旧バージョンの dora がどこにあるか特定
which dora
ls -la ~/.cargo/bin/dora ~/.dora/bin/dora ~/.local/bin/dora 2>/dev/null

# 2. 見つかった旧バージョンを削除（実際のパスに従って削除、複数可）
rm -f ~/.cargo/bin/dora ~/.dora/bin/dora ~/.local/bin/dora

# 3. 0.5.0 を強制インストール（~/.cargo/bin にインストール）
cargo install dora-cli --version 0.5.0 --force

# 4. バージョンを確認（dora-cli 0.5.0 / dora-message: 0.8.0 が出力されるはず）
dora --version
```

> `dora --version` が依然として旧版を表示する場合は、PATH に他の場所に旧 dora が隠れていることを示します。`which dora` で 1 つずつ確認して削除し、`~/.cargo/bin` が PATH の前の方にあることを確認してください。
> 
> 

### 9.5 シリアルポートの権限がない（Permission denied）

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

- 抜き差しするたびに権限がリセットされる場合があります

- 根本解決：`sudo usermod -aG dialout $USER`、ログアウトして再ログイン

### 9.6 カメラの権限 / 仮想マシンでカメラが開けない

**実機ホスト**：

- Ubuntu：設定 → プライバシー → カメラ → アプリのアクセスを許可

- カメラが他のアプリ（カメラアプリ、Zoom など）に占有されていないことを確認

**仮想マシン（VMware）でカメラが開けない**：

症状：`open VIDEOIO(V4L2:/dev/video0): can't open camera by index` または `select() timeout`、
一方 `ls /dev/video0` は存在し、`v4l2-ctl` はフレームを取得できるのに、OpenCV の `cap.read()` は `ret = False` のままです。

調査と解決（順番に）：

1. **カメラを仮想マシンに転送する**：メニュー → 仮想マシン → リムーバブルデバイス → カメラ → 接続

2. **USB コントローラのバージョンを切り替える（VMware でよくある解決法、最も有効）**：

    - 仮想マシン → 設定 → **USB コントローラ** → `USB 2.0` / `USB 3.1` を切り替え

    - 切り替え後に**仮想マシンを再起動**して再試行

3. デバイスの存在を検証：

```Plain Text
ls -l /dev/video0
sudo usermod -aG video $USER   # video グループに追加し、ログアウトして再ログイン
```

4. v4l2 でカメラが本当にフレームを出力できるか検証（出力できれば = ドライバは正常、問題は OpenCV の互換性）：

```Bash
v4l2-ctl --device=/dev/video0 --set-fmt-video=width=640,height=480,pixelformat=MJPG --stream-mmap --stream-count=1 --stream-to=/tmp/frame.jpg
ls -l /tmp/frame.jpg   # 数十~数百KB あれば = 正常に出力されている
```

### 9.7 ポート番号が毎回変わる

- USB を抜き差しするとデバイス番号が変わる場合があり、`2-配置串口.sh` を再実行

### 9.8 openCV が不足

```Bash
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

（`HandTracking` ディレクトリで、仮想環境をアクティブ化した後に実行）

---

## コード構成の説明

### Demo ディレクトリ

### 各 dataflow の対応関係

### データフローの原理

```Plain Text
摄像头 → HandTracking（MediaPipe 识别手势）
              ↓ 手部关键点坐标
         AHSimulation（MuJoCo 仿真 + 逆运动学）
              ↓ 关节目标角度
         AHControl（串口 → 舵机驱动板 → 灵巧手）
```

### ポート設定の場所

- 3 つの `dataflow_tracking_real_*.yml` の `args:` 行：`--serialport /dev/ttyACMx`

- `AHControl/src/main.rs` の `default_value = "/dev/ttyACM0"`（シリアルポートパラメータの既定値）

- `AHControl/config/*.toml`：サーボ型番、ID、オフセット（通常は変更不要）

