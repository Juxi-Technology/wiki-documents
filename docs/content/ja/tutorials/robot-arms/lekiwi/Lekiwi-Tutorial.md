---
title: Lekiwi 移動ロボット使用チュートリアル
description: "LeRobot ベースの Lekiwi 移動ロボットのセットアップ、電機設定、遠隔操作、データ収集、訓練、評価の完全ガイド"
---

# Lekiwi 移動ロボット使用チュートリアル

> **[ストアで購入](https://www.juxitech.com/ja/products/lekiwi-embodied-intelligence-mobile-robotic-car)**


黑色の能動アームは5V6A電源アダプター、白色の従動アームは12V5A電源アダプターを使用

[lerobot-Lekiwi.zip]

このチュートリアルのリポジトリのコードは、2026年3月1日より前にテストされた Lerobot の安定版で維持されています。現在、Huggingface は Lerobot を大幅にアップグレードし、多数の新機能を追加しています。最新のチュートリアルを体験したい場合は、[公式ドキュメントの手順](https://huggingface.co/docs/lerobot/lekiwi) に従って操作してください。

[Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) は、[SIGRobotics-UIUC](https://github.com/SIGRobotics-UIUC) が立ち上げた完全オープンソースのロボットカー(ロボット車両)プロジェクトです。詳細な 3D プリントファイルと操作ガイドが含まれており、[LeRobot](https://github.com/huggingface/lerobot/tree/main) 模倣学習フレームワークとの互換性を目的に設計されています。SO101 ロボットアームに対応しており、これにより完全な模倣学習プロセスを実現できます。

[*各部品の正確な位置は、Fusion360 オンライン CAD で確認できます*](https://a360.co/4k1P8yO)*.*

[URDF ファイル](https://gitcode.com/gh_mirrors/le/LeKiwi/tree/main)

オンライン URDF プレビュー https://urdf.d-robotics.cc/

![Image](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

## 主な特徴

1. **オープンソースで低コスト**： [Lekiwi](https://github.com/SIGRobotics-UIUC/LeKiwi) はオープンソースの低コストロボットカーソリューションを提供します。
2. **LeRobot との統合**： [LeRobot プラットフォーム](https://github.com/huggingface/lerobot) との統合用に設計されています。
3. **豊富な学習リソース**： 組み立て・キャリブレーションガイド、テスト、データ収集、訓練、展開のチュートリアルを含む包括的なオープンソース学習リソースを提供し、ユーザーがすぐに使い始めてロボットアプリケーションを開発できます。
4. **Nvidia 互換**： reComputer Mini J4012 Orin NX 16 GB と組み合わせて使用できます。
5. **多様な応用シーン**： 教育、科学研究、自動化生産、ロボティクス分野に適し、さまざまな複雑なタスクで効率的かつ正確なロボット操作を実現します。

JUXI はハードウェア自体の品質のみに責任を負います。チュートリアルは公式ドキュメントに厳密に従って更新されています。ソフトウェアの問題や環境依存の問題をどうしても解決できない場合は、[LeRobot プラットフォーム](https://github.com/huggingface/lerobot) または [LeRobot Discord チャンネル](https://discord.gg/8TnwDdjFGU) に早めに報告してください。

**注意**
- Lekiwi シャーシ内のすべてのサーボには 12V 電源が必要です。5V ロボットアームを使用するユーザーには、12V から 5V への降圧変換モジュールを提供しています。回路の変更はご自身で行ってください。
- 12V 電源 - 必要に応じて、チェックアウト時にこのオプションを選択できます。すでに 12V 電源をお持ちの場合は、出力インターフェースを 5521 DC プラグに変換するだけで済みます。
- ラズベリーパイコントローラとカメラ - 注文画面から個別に購入する必要があります。

## 部品表 (BOM)

## 初期システム環境

**Ubuntu x86 の場合:**
- Ubuntu 22.04
- CUDA 12+
- Python 3.10
- Torch 2.6

**Jetson Orin の場合:**
- Jetson JetPack 6.0
- Python 3.10
- Torch 2.3+

**ラズベリーパイの場合:**
- ラズベリーパイ5 4G~16G

### SSH の設定

ラズベリーパイの設定が完了したら、[SSH](https://www.raspberrypi.com/news/coding-on-raspberry-pi-remotely-with-visual-studio-code/)（セキュアシェルプロトコル）を有効化して設定してください。これにより、ラズベリーパイに画面・キーボード・マウスを接続せずにノートPCからログインできます。[こちら](https://www.raspberrypi.com/documentation/computers/remote-access.html#ssh)に素晴らしいチュートリアルがあります。コマンドプロンプト (cmd) でラズベリーパイにログインするか、VSCode を使用する場合は[この](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)拡張機能を使用できます。

## 3Dプリントガイド

### 部品

以下3Dプリント部品の印刷可能な STL ファイルを提供します。これらの部品は一般的な PLA フィラメントでコンシューマーグレードの FDM プリンターで印刷できます。Bambu Lab P1S プリンターでテスト済みです。すべてのコンポーネントについて、bambuslicer に読み込むだけで自動回転・配置され、推奨サポートを有効にして印刷できます。

### 印刷パラメータ

提供された STL ファイルは多くの FDM プリンターで直接印刷できます。以下はテストおよび推奨設定です。他の設定も有効な場合があります。

- 材料: PLA+
- ノズル直径と精度: 0.2mm ノズル直径、層高 0.2mm
- 充填密度: 15%
- 印刷速度: 150 mm/s
- 必要に応じて、Gコード（スライスファイル）をプリンターにアップロードして印刷

# LeRobot のインストール

ラズベリーパイ上で:

### 1. [Miniconda のインストール](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

```Python
mkdir *-p* ~/miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh *-O* ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh *-b* *-u* *-p* ~/miniconda3
rm ~/miniconda3/miniconda.sh
```

### 2. シェルの再起動

シェルで以下をコピーして貼り付けます: `source ~/.bashrc` または Mac ユーザー: `source ~/.bash_profile` または `source ~/.zshrc`（zshell を使用している場合）

### 3. LeRobot 用の新しい Conda 環境を作成して有効化

```Python
conda create -y -n lerobot python=3.10
```

その後、Conda 環境を有効化します（LeRobot を使用するたびにシェルを開くたびに実行が必要です!）:

```Bash
conda activate lerobot
```

### 4. LeRobot のクローン:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. 環境に ffmpeg をインストール:

`miniconda` を使用する場合、環境に `ffmpeg` をインストールします:

```PowerShell
conda install ffmpeg -c conda-forge
```

これにより、通常は libsvtav1 エンコーダでコンパイルされた ffmpeg 7.X がプラットフォームにインストールされます。libsvtav1 をサポートしていない場合（`ffmpeg -encoders` でサポートされるエンコーダを確認できます）:

【すべてのプラットフォーム】ffmpeg 7.X を明示的にインストール:
`conda install ffmpeg=7.1.1 -c conda-forge`

【Linux のみ】ffmpeg のビルド依存関係をインストールし、libsvtav1 サポート付き ffmpeg をソースからコンパイルし、使用する ffmpeg 実行ファイルが正しいことを `which ffmpeg` で確認してください。

以下のエラーに遭遇した場合も、上記のコマンドで解決できます。

![Image](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

### 6. feetech モーター依存関係を含む LeRobot のインストール:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install *-e* ".[lekiwi]"
```

### 7. 接続時間の設定

`lerobot\src\lerobot\robots\lekiwi` ディレクトリ内の config_lekiwi.py を探してください

connection_time_s: int = 7200 # 也就是2小时

![](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)



## C. ノートPCに LeRobot をインストール

ノートPCにすでに LeRobot をインストールしている場合は、このステップをスキップできます。それ以外の場合は、ラズベリーパイでの**同じ手順**に従ってください。

> [!Tip] コマンドプロンプト (cmd) を頻繁に使用します。cmd に慣れていない場合は、[コマンドライン入門コース](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line)を参照してください。

コンピューター上で:

### 1. [Miniconda のインストール](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

### 2. シェルの再起動

シェルで以下をコピーして貼り付けます: `source ~/.bashrc` または Mac ユーザー: `source ~/.bash_profile` または `source ~/.zshrc`（zshell を使用している場合）

![Image](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)

### 3. LeRobot 用の新しい Conda 環境を作成して有効化

```Bash
conda create *-y* *-n* lerobot *python*=3.10
```

その後、Conda 環境を有効化します（LeRobot を使用するたびにシェルを開くたびに実行が必要です!）:

```Bash
conda activate lerobot
```

### 4. LeRobot のクローン:

```Bash
git clone https://github.com/huggingface/lerobot.git ~/lerobot
```

### 5. 環境に ffmpeg をインストール:

`miniconda` を使用する場合、環境に `ffmpeg` をインストールします:

```PowerShell
conda install ffmpeg -c conda-forge
```

これにより、通常は libsvtav1 エンコーダでコンパイルされた ffmpeg 7.X がプラットフォームにインストールされます。libsvtav1 をサポートしていない場合（`ffmpeg -encoders` でサポートされるエンコーダを確認できます）:

【すべてのプラットフォーム】ffmpeg 7.X を明示的にインストール:
`conda install ffmpeg=7.1.1 -c conda-forge`

【Linux のみ】ffmpeg のビルド依存関係をインストールし、libsvtav1 サポート付き ffmpeg をソースからコンパイルし、使用する ffmpeg 実行ファイルが正しいことを `which ffmpeg` で確認してください。

以下のエラーに遭遇した場合も、上記のコマンドで解決できます。

![Image](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/4.png)

### 6. feetech モーター依存関係を含む LeRobot のインストール:

```Bash
cd ~/lerobot && pip install --no-binary=av -e ".[feetech]"
pip install *-e* ".[lekiwi]"
```

# モーターの設定

![Image](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/5.png)

![Image](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/6.png)

### **1.ロボットアームに関連する USB ポートを見つける**

個々のモーターの正しいポートを見つけるには、以下のユーティリティスクリプトを2回実行します:

```Bash
lerobot-find-port
```

出力例（Mac では `/dev/tty.usbmodem575E0031751`、Linux では `/dev/ttyACM0` の可能性）:

出力例（Mac では `/dev/tty.usbmodem575E0032081`、Linux では `/dev/ttyACM1` の可能性）:

トラブルシューティング: Linux では、以下のコマンドで USB ポートへのアクセス権限を付与する必要がある場合があります:

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

### **2.モーターの設定（完成品はスキップ可能）**

シャーシの各モーターを順番に挿入し、以下のスクリプトを実行します。まずロボットアームのサーボ（ID 6..1）を初期化し、その後シャーシのサーボを初期化して、その ID を（ID 9..7）に設定します。アームをすでにキャリブレーション済みの場合は、Enter を連打してどんどん上書きしてスキップできます:

```Bash
lerobot-setup-motors \
    *--robot.type*=lekiwi \
    *--robot.port*=/dev/tty.usbmodem58760431551 # <- paste here the port found at previous step
```

![Image](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/8.png)

### 3.HuggingFace 国内ミラーの設定

- Ubuntu

```Shell
sudo nano ~/.bashrc

# 在文件末尾加入
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.bashrc
echo $HF_ENDPOINT

# 输出
# https://hf-mirror.com
```

- Mac

```Shell
sudo nano ~/.zshrc

# 在文件末尾加入
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.zshrc

# 输出
# https://hf-mirror.com
```

#### ①トークンの作成

https://huggingface.co/settings/tokens

![Image](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

![Image](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

![Image](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)

#### ②トークンの記録

例えば、私のもの:

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### ③トークンのバインド

```Shell
hf auth login

hf auth whoami
```

![Image](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/4.png)

#### ④データセットリポジトリの作成

**後で必要になる \<hf_username\> と \<dateset_repo_id\> にあたる Owner とデータセット名を控えておいてください**

![Image](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/5.png)

![Image](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/6.png)

![Image](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/8.png)

### 4. 設定の更新!!!

LeKiwi の LeRobot 側とノートPC 側の設定ファイルは一致している必要があります。まず、移動ロボットアームのラズベリーパイの **IP アドレス**を見つける必要があります。これは SSH に使用する IP アドレスと同じです。また、ノートPC 側で能動アームのサーボドライバ基板の **USB ポート**と、LeKiwi 側の **サーボドライバ基板のポート**を見つける必要もあります。これらのポートは以下のスクリプトで確認できます。

Linux では、以下のコマンドを実行して USB ポートへのアクセス権限を付与する必要がある場合があります:

```Bash
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyACM1
```

重要: 能動アームのポート番号と Lekiwi ロボットアームの IP アドレスが分かったら、ネットワーク設定の **ip**、能動アーム設定の **port**、LeKiwi 設定の **port、remote_ip** を更新してください。

example\lekiwi ディレクトリにある以下の4つのファイルを変更します

![Image](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

#### ①teleoperate.py の変更

remote_ip: Raspberry Pi の IP アドレス

port: 能動アームをコンピューターまたは Linux に接続した際のポート番号

![Image](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

#### ②record.py の変更

HF_REPO_ID: [Hugging Face 上のユーザー名とデータセット名](https://juxitech.feishu.cn/docx/DXtPd0iF1oO3aGxRChBcL3LSnFh?fromScene=spaceOverview#doxcnsAUzU1e1l6XIM07OE8grYg)

remote_ip: Raspberry Pi の IP アドレス

port: 能動アームをコンピューターまたは Linux に接続した際のポート番号

![Image](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)

#### ③replay.py の変更

remote_ip: Raspberry Pi の IP アドレス

\<hf_username\>/\<dataset_repo_id\>、つまり[Hugging Face のユーザー名とデータセット名](https://juxitech.feishu.cn/docx/DXtPd0iF1oO3aGxRChBcL3LSnFh?fromScene=spaceOverview#doxcnsAUzU1e1l6XIM07OE8grYg)

![Image](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/4.png)

## キャリブレーション

ここで能動アームと従動アームをキャリブレーションする必要があります。全方向ホイールのステアリングギアはキャリブレーション不要です。

### 従動アームのキャリブレーション（Lekiwi ベースに搭載）

コンピューターで以下のコマンドを実行して能動アームをキャリブレーションします。注意: ここに示す画像は SO101 モデルの例です。

```Bash
lerobot-calibrate \
    --teleop.type=so100_leader \
    --teleop.port=/dev/tty.usbmodem58760431551 \ #修改为找到的端口号
    --teleop.id=my_awesome_leader_arm
```

次に、ラズベリーパイで以下のコマンドを実行して、LeKiwi に搭載された従動アームをキャリブレーションします。テーブル上の現在の位置は無視してください - 通常のキャリブレーションは Lekiwi シャーシに取り付けた状態で行うべきです。

```Bash
lerobot-calibrate \
    --robot.type=lekiwi \
    --robot.id=my_awesome_kiwi
```

私たちはほとんどのロボットでキャリブレーション方法を統一しています。まず、ロボットを各関節が**可動範囲の中間点**に来る位置まで動かし、ボタンを押します。次に、すべての関節を**可動範囲全体**にわたって動かします。SO101 の同じキャリブレーションプロセスのビデオは、[こちら](https://huggingface.co/docs/lerobot/en/so101#calibration-video)で参照できます。

# F. 遠隔操作

新しい Anaconda Prompt を開きます

![Image](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/5.png)

> Mac を使用している場合、遠隔操作のためにキーボードへのアクセスを「Terminal」に許可する必要があるかもしれません。「System Preferences」>「Security &amp; Privacy」>「Input Monitoring」に移動し、「Terminal」チェックボックスにチェックを入れてください。

遠隔操作を行うには、SSH でラズベリーパイにログインし、環境を有効化するために `conda activate lerobot` を実行してから、以下のスクリプトを実行します:

```Bash
python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

![Image](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/6.png)

次に、ノートPC でも環境を有効化するために `conda activate lerobot` を実行し、その後以下のスクリプトを実行します:

```Bash
python examples/lekiwi/teleoperate.py
```

ノートPC の画面には次のようなインターフェースが表示されるはずです:`[INFO] Connected to remote robot at tcp://172.17.133.91:5555 and video stream at tcp://172.17.133.91:5556.`これでコントロールアームを動かし、キーボードの (W, A, S, D) キーでロボットの前進、左折、後退、右折を制御できます。(Z, X) キーでロボットを左右に旋回させます。(R, F) キーで移動ロボットの速度を増減できます。速度モードは全部で3種類あります。以下の表を参照してください:

別のキーボードを使用する場合は、[`LeKiwiClientConfig`](https://github.com/huggingface/lerobot/blob/main/src/lerobot/robots/lekiwi/config_lekiwi.py) で各コマンドのキー設定を変更できます。

## 通信トラブルシューティング

移動ロボット SO101 の接続に問題がある場合は、以下の手順で診断・解決してください。

### 1.IP アドレス設定の確認

設定ファイルに正しいラズベリーパイ IP アドレスが設定されていることを確認します。IP アドレスを確認するには、次のコマンドを実行します（Pi のコマンドラインで）:

```Bash
hostname *-I*
```

### 2.ノートPC/PC が Pi にアクセスできるか確認

ノートPCからラズベリーパイに ping してみます:

```Bash
ping <your_pi_ip_address>
```

ping が失敗する場合:
- Pi が起動し、同じネットワークに接続されていることを確認。
- Pi で SSH が有効になっているか確認。

### 3.SSH 接続を試す

SSH で Pi にログインできない場合、接続が正しくない可能性があります。以下のコマンドを使用します:

```Bash
ssh <your_pi_user_name>@<your_pi_ip_address>
```

例: `ssh pi@192.168.0.106`

接続エラーが発生する場合:
- Pi で SSH が有効になっていることを確認。次のコマンドを実行:

```Bash
sudo raspi-config
```

- そしてナビゲート: **Interfacing Options -\> SSH** を有効にします。

### 4.設定ファイルの一致!!!

ノートPC/PC とラズベリーパイの設定ファイルが完全に一致していることを確認してください。

# G. データセットの記録

遠隔操作に慣れたら、LeKiwi で最初のデータセットを記録できます。

LeKiwi でプログラムを起動するには、SSH でラズベリーパイに接続し、環境を有効化してスクリプトを起動する以下のコマンドを実行します:

```Bash
conda activate lerobot

python -m lerobot.robots.lekiwi.lekiwi_host --robot.id=my_awesome_kiwi
```

Hugging Face hub 機能でデータセットをアップロードする場合、以前にログインしていなければ、書き込み権限付きのトークンでログインしてください。トークンは [Hugging Face 設定](https://huggingface.co/settings/tokens) から生成できます:

```Bash
hf auth login
```

Hugging Face のリポジトリ名を変数に保存して、以下のコマンドを実行します:

```Bash
*hf auth whoami*
```

その後、ノートPC で以下のコマンドを実行して 2 ラウンドを記録し、データセットを hub にアップロードします:

```Bash
python examples/lekiwi/record.py
```

# H. データセットの可視化

データセットをアップロードした場合は、[オンラインで可視化](https://huggingface.co/spaces/lerobot/visualize_dataset)できます。以下のコマンドで生成されたリポジトリ ID をコピーして貼り付けます:

```Bash
echo *${HF_USER}*/my_lekiwi_dataset
```

データセットをアップロードしていない場合は、ローカルで可視化することもできます（ブラウザウィンドウは `http://127.0.0.1:9090` で開けます）:

```Bash
python lerobot/scripts/visualize_dataset_html.py \
  --repo-id *${HF_USER}*/lekiwi_test \
  --local-files-only 1
```

### データセットの可視化（スキップ可能、試すことも可能）

```Bash
echo ${HF_USER}/my_lekiwi_dataset
```

データセットをアップロードした場合、ローカルでも以下のコマンドで可視化できます:

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/my_lekiwi_dataset \
```

データセットをアップロードしていない場合、ローカルで以下のコマンドでも可視化できます:

```Python
lerobot-dataset-viz \
  --repo-id juxi/my_lekiwi_dataset \
```

ここで、`juxi` はデータ収集時にカスタムした `repo_id` 名です。

#### データ収集のコツ

データ記録に慣れたら、トレーニング用のより大きなデータセットを作成できます。良い入門タスクは、異なる位置の物体を掴んでコンテナに入れることです。少なくとも 50 エピソード、各位置 10 エピソードの録画を推奨します。カメラ位置は固定し、録画全体で一貫した掴み動作を維持してください。また、操作する物体がカメラ画像に明確に見えるようにしてください。簡単な判断基準は、カメラ画像だけを見てタスクを完了できることです。

次の章では、ニューラルネットワークを訓練します。信頼できる掴み性能を得た後、データ収集に多様性を導入し始めることができます（掴む位置の追加、異なる掴み技術の採用、カメラ位置の変更など）。

多様性を追加しすぎるのは避けてください。結果に影響する可能性があります。

この重要なトピックについて詳しく知りたい場合は、優れたデータセットの構成要素についての[ブログ記事](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset)をご覧ください。

#### トラブルシューティング:

Linux システムで、データ収集中に左右の矢印キーと Esc キーが機能しない場合は、`$DISPLAY` 環境変数が設定されていることを確認してください。[pynput の制限](https://pynput.readthedocs.io/en/latest/limitations.html#linux) を参照してください。

# I. 1ラウンドの再生

では、ロボットで最初のラウンドを再生してみましょう:

```Bash
python examples/lekiwi/replay.py
```

おめでとうございます 🎉、ロボットは自律学習タスクの準備ができました。このチュートリアルのトレーニングセクションに従ってトレーニングを開始してください: [実世界ロボット入門](https://huggingface.co/docs/lerobot/il_robots)

## K. 戦略の評価

remote_ip、port、HF_MODEL_ID を必ず変更してください

#### evaluate.py の変更

HF_MODEL_ID="\<hf_username\>/\<model_repo_id\>" は、トレーニング後に Hugging Face にアップロードしたデータセット名（アップロードした場合）、またはトレーニング後にローカルにエクスポートしたモデルのディレクトリに変更します

HF_DATASET_ID = "\< hf_username \>/\< eval_dataset_id \>" 自分で作成したユーザー名と eval データセット名に変更します

remote_ip: Raspberry Pi の IP アドレス

![Image](../../../../public/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/8.png)

次に以下のコマンドを実行します:

```Bash
python examples/lekiwi/evaluate.py
```

1. データセットの名前は `eval` で始めます。これは推論を実行していることを示すためです（例: `${HF_USER}/eval_act_lekiwi_test`）。

2. 評価フェーズで ` File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx' ` が発生した場合は、まず `eval_` で始まるフォルダを削除してから、プログラムを再度実行してください。

シミュレーショントレーニングは以下を参照できます

https://github.com/Ekumen-OS/lekiwi/tree/main

https://github.com/SIGRobotics-UIUC/LeKiwi-sim

## ヘルプ 🙋

ハードウェアの問題については、カスタマーサービスにお問い合わせください。使用方法の問題については、Discord にご参加ください。

[LeRobot プラットフォーム](https://github.com/huggingface/lerobot)

[LeRobot Discord チャンネル](https://discord.gg/8TnwDdjFGU)
