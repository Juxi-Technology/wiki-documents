---
title: 器用ハンド公式サンプル実行チュートリアル
description: "本チュートリアル付属のコード圧縮パッケージをダウンロードしてデモを行っていただくか、公式オープンソースコードリポジトリ https://github.com/pollen-robotics/AmazingHand.git をクローンしてください。公式コードには誤りや不足がある可能性がありますのでご注意ください。"
---

# 器用ハンド公式サンプル実行チュートリアル

> **[ストアで購入](https://www.juxitech.com/ja/products/amazinghand)**


## 1.コードのダウンロード

本チュートリアル付属のコード圧縮パッケージをダウンロードしてデモを行っていただくか、公式オープンソースコードリポジトリ https://github.com/pollen-robotics/AmazingHand.git をクローンしてください。公式コードには誤りや不足がある可能性がありますのでご注意ください。

Windows コード圧縮パッケージ
[AmazingHand-main.zip]

Linux コード圧縮パッケージ
[AmazingHand-main.zip]

```Plain Text
git clone https://github.com/pollen-robotics/AmazingHand.git
```

## 2.環境のインストール

システムに応じて Rust、uv、dora-rs をインストールします

**1、Rust のインストール：**https://www.rust-lang.org/tools/install
Windows の場合 Rust 環境変数の設定（重要！） 参考 https://zhuanlan.zhihu.com/p/1933164131969659101
Linux の場合の環境変数設定：





初回インストールに Visual Studio Installer が必要な場合があります

**Cargo ミラーソースの設定**

`.cargo` フォルダに `config.toml` 設定ファイルを作成し、清华（Tsinghua）`crates.io-index` ミラーを設定します。これで Cargo は清华ミラーソースを使用して crate をダウンロードします。

```Bash
[source.crates-io]
replace-with = 'tuna'
[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
```

**2、uv のインストール：**https://docs.astral.sh/uv/getting-started/installation/
Windows では Powershell ターミナルを開き、コピーしてこのコマンドを入力してインストールします
**Linux の場合の環境変数設定：**



**3、dora-rs のインストール：**https://dora-rs.ai/docs/guides/Installation/installing を参照してダウンロード・インストール
Linux の場合の環境変数設定：



## 3.配線方法

電源は最低 5V3A 必要です。外部のサーボドライバ基板を接続し、USB で PC に接続します



## 4.サンプルデモ

### **1、サーボドライバ基板のポート番号の確認**

- windows システムは通常 COM11。デバイスマネージャーまたは飛特サーボ上位機で サーボドライバ基板 のポート番号を確認できます



- Ubuntu、Linux システムは通常 /dev/ttyACM0
コマンドラインでサーボドライバ基板のポートを確認：

```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

```Plain Text
sudo usermod -aG dialout $USER
```

仮想マシン内で ls /dev/ttyUSB* /dev/ttyACM* がディレクトリを見つけられない場合は、仮想マシン右下のアイコンで灵巧手（ロボットハンド）が PC に接続されているかを確認してください。接続されている場合は切断し、仮想マシンに接続してください



### **2、コード内のポート番号の変更**

①AmazingHand-main\Demo\AHControl\src ディレクトリの main.rs コードファイルをテキストで開き、自身のホストで確認したポート番号に変更します（windows は COM*、ubuntu、linux システムは通常 /dev/ttyACM*）



②対応するインスタンスファイルを見つけます
**右手灵巧手** AmazingHand-main\Demo ディレクトリの dataflow_tracking_real_right.yml
**左手灵巧手** AmazingHand-main\Demo ディレクトリの dataflow_tracking_real_left.yml
**両手灵巧手** AmazingHand-main\Demo ディレクトリの dataflow_tracking_real_2hands.yml

テキストで開き、自身のホストで確認したポート番号に変更します（windows は COM*、ubuntu、linux システムは通常 /dev/ttyACM*）







### **3、コードのデプロイ**

- Demo フォルダを開きます



- Windows システム はディレクトリで Powershell と入力し Enter で開きます



- デーモンプロセスを起動します（毎回必要）：
Linux システム は直接コンソールで開き、デーモンプロセスを起動します（毎回必要）：
```Plain Text
dora up
```

- その後コンソールでこのディレクトリから実行します（環境構築時に一度実行済みなら不要！！再実行すると仮想環境が上書きされます！！）仮想環境を作成：
```Plain Text
uv venv --python 3.12
```

- 仮想環境を有効化（毎回必要）システムに応じて入力・実行：
```Plain Text
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
.venv\Scripts\activate
```

```Plain Text
source .venv/bin/activate
```



コンソールが仮想環境を有効化していることを確認してください！

- 依存関係の同期を実行し、AHControl フォルダに入ります
```Plain Text
cd AHControl
```

```Plain Text
cargo build --release
```

- その後 `cd ..` と入力して Enter で Demo ディレクトリに戻ります！AHSimulation フォルダに入ります
```Plain Text
cd AHSimulation
```

```Plain Text
uv sync
```

- その後 `cd ..` と入力して Enter で Demo ディレクトリに戻ります！HandTracking フォルダに入ります
```Plain Text
cd HandTracking
```

```Plain Text
uv sync
```

### 4、実行結果

- Demo フォルダを開きます！ディレクトリで Powershell と入力し Enter で開き、デーモンプロセスを起動します（毎回必要）：
```Plain Text
dora up
```

- 仮想環境を有効化（毎回必要）システムに応じて入力・実行：
Windows の仮想環境有効化コマンド：
```Python
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

```Plain Text
.venv\Scripts\activate
```

Linux の仮想環境有効化コマンド：
```Plain Text
source .venv/bin/activate
```

### シミュレーション環境

- シミュレーション環境のみでネットワークカメラのハンドトラッキングデモを実行：
```Plain Text
dora build dataflow_tracking_simu.yml --uv   #（一度だけ実行）
```

```Plain Text
dora run dataflow_tracking_simu.yml --uv
```





### 実ハードウェアでの実行（ハンドトラッキング）

- 実ハードウェアでネットワークカメラのハンドトラッキングデモを実行：
    #### 右手灵巧手
    ```Plain Text
    dora build dataflow_tracking_real_right.yml --uv   #（一度だけ実行）
    ```

    ```Plain Text
    dora run dataflow_tracking_real_right.yml --uv
    ```

    #### 左手灵巧手
    ```Plain Text
    dora build dataflow_tracking_real_left.yml --uv   #（一度だけ実行）
    ```

    ```Plain Text
    dora run dataflow_tracking_real_left.yml --uv
    ```

    #### 両手灵巧手（両方を1つのサーボドライバ基板に接続することに注意）



    ```Plain Text
    dora build dataflow_tracking_real_2hands.yml --uv   #（一度だけ実行）
    ```

    ```Plain Text
    dora run dataflow_tracking_real_2hands.yml --uv
    ```





### 簡単なサンプルでシミュレーションの指角度を制御

- シミュレーション内の指角度を制御する簡単なサンプルを実行します：
    ```Plain Text
    dora build dataflow_angle_simu.yml --uv   #（一度だけ実行）
    ```

    ```Plain Text
    dora run dataflow_angle_simu.yml --uv
    ```





説明
- [AHControl](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/AHControl)にはモーターを制御する dora-rs ノードと、モーター設定用のユーティリティツールが含まれています。
- [AHSimulation](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/AHSimulation)には手の動きをシミュレートし逆運動学を求める dora-rs ノードが含まれています。
- [HandTracking](https://github.com/pollen-robotics/AmazingHand/blob/main/Demo/HandTracking)にはネットワークカメラから手を追跡し、それを AH! の制御ターゲットとして使用する dora-rs ノードが含まれています。

## 注意事項

### 1、mediapipe バージョン問題

pyproject.toml では mediapipe>=0.10.14 を設定していますが、インストール後の mediapipe パッケージに solutions サブモジュールがない場合、mediapipe バージョンと Python 3.12 の非互換（高バージョンの mediapipe は Python 3.12 のサポートに問題がある）、またはインストール中のパッケージファイル破損の可能性が高いです。

```Plain Text
uv pip uninstall mediapipe
```

```Plain Text
uv pip install mediapipe==0.10.14
```

### 2、Dora バージョン非互換、メッセージ形式（v0.7.0 vs v0.8.0）



答：①まず C ドライブユーザーディレクトリの .cargo/registry/src/github.xxxxxxxx/ で対応する依存パッケージのみを削除します！
**`dora-message-0.7.0`**（最重要！旧バージョンのメッセージ形式フォルダ、必ず削除）
`dora-core-0.4.1`
`dora-node-api-0.4.1`
`dora-arrow-convert-0.4.1`
`dora-metrics-0.4.1`
`dora-tracing-0.4.1`
`const-random-macro-0.1.16`（Dora 依存の補助ライブラリ、旧バージョンと一緒に削除）

②Demo/AHControl フォルダを開き Cargo.toml の dora-node-api="0.5.0" dora-message="0.8.0" を変更
③コンソールで AHControl ディレクトリに入り cargo build --release を再実行
④[実ハードウェアでの実行](https://juxitech.feishu.cn/wiki/ZpHmwYARQiN2fwkqFJecqUFZnQg?node-id=1759567650651511609&from=from_node_link)に従って再度 build
実際のエラー内容に応じてバージョンを修正します。例：dora-message が 0.6.0 必要な場合は dora-node-api="0.4.0" dora-message="0.6.0" に変更





### 3、openCV 依存ライブラリがない



HandTracking ディレクトリで以下のコマンドを入力します
```Python
python -m pip install opencv-contrib-python numpy mediapipe -i https://mirrors.aliyun.com/pypi/simple/
```

### 4、カメラ権限の有効化（PC側）







### 5、仮想マシン22.04からのカメラ呼び出し

https://blog.csdn.net/qq_19731521/article/details/124954288 を参照

### 6、デスクトップカメラの取り付け

#### 環境カメラキットブラケット取付手順

1.まず微調整角度ブラケットを固定します



2.側視環境カメラキット



## 仮想マシン22.04 で直接ハンドトラッキングを実行

これら4つのファイルをダウンロードし、同じ英語ディレクトリに置き、仮想マシンソフトで .ovf ファイルを直接開いてシステムに入ります
パスワード ubuntu
[ubuntu22.04_amazinghand.ovf]
[ubuntu22.04_amazinghand-disk1.vmdk]
[ubuntu22.04_amazinghand.mf]
[ubuntu22.04_amazinghand-file1.iso]

**1.Demo ディレクトリでコンソールを開きます：**
```Plain Text
dora up
```

**仮想環境を有効化します：**
```Plain Text
source .venv/bin/activate
```

**2.仮想マシンのカメラ呼び出し権限**
仮想マシン22.04でカメラを呼び出す場合は https://blog.csdn.net/qq_19731521/article/details/124954288 を参照

**3.コマンドラインでサーボドライバ基板のポートを確認：**
```Bash
ls /dev/ttyUSB* /dev/ttyACM*
```

```Plain Text
sudo chmod 666 /dev/ttyACM*
```

```Plain Text
sudo usermod -aG dialout $USER
```

**4.コードファイルのポート番号を変更**
①AmazingHand-main\Demo\AHControl\src ディレクトリの main.rs コードファイルをテキストで開き、自身のホストで確認したポート番号に変更します（windows は COM*、ubuntu、linux システムは通常 /dev/ttyACM*）



②対応するインスタンスファイルを見つけます
**右手灵巧手** AmazingHand-main\Demo ディレクトリの dataflow_tracking_real_right.yml
**左手灵巧手** AmazingHand-main\Demo ディレクトリの dataflow_tracking_real_left.yml
**両手灵巧手** AmazingHand-main\Demo ディレクトリの dataflow_tracking_real_2hands.yml

テキストで開き、自身のホストで確認したポート番号に変更します（windows は COM*、ubuntu、linux システムは通常 /dev/ttyACM*）







**5.右手のハンドトラッキングを実行**
```Plain Text
dora run dataflow_tracking_real_right.yml --uv
```
