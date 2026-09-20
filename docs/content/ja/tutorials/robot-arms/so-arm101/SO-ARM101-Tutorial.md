---
title: LeRobot ロボットアームチュートリアル
description: "本チュートリアルは12月15日までに更新済み。最新版の公式ドキュメントに従うこともできます。リンク参照。SO-ARM101 と SO-ARM100 は実行コードが相互互換。"
---

# LeRobot ロボットアームチュートリアル

> 本ページは要点早見版です。8 ステップを OS 別に解説した[「LeRobot 完全コース」](/ja/tutorials/robot-arms/so-arm101/lerobot/)の方が網羅的ですので、初めての方はコースから始めてください。

> **[ストアで購入](https://www.juxitech.com/ja/products/so-arm101-developers-kit)**


本チュートリアルは12月15日までに更新済み。最新版の[公式ドキュメント](https://github.com/huggingface/lerobot/tree/main)に従うこともできます。具体的なチュートリアルは[このリンク](https://zihao-ai.feishu.cn/wiki/TS6swApHbinx01kHDi5cf5n5n8c)を参照。URDF などのファイルが必要な場合は[このリンク](https://github.com/TheRobotStudio/SO-ARM100)を参照。9月15日の旧バージョンは[このリンク](https://juxitech.feishu.cn/docx/DJkBdcwzooBqamxl0kgcvVUbngh?from=from_copylink)を参照。SO-ARM101 と SO-ARM100 は実行コードが相互互換です。

## A. チュートリアルの説明

**Pro版 黑色の能動アームは5V6A電源アダプター、白色の従動アームは12V5A電源アダプターを使用！**

サーボの取り付けと角度キャリブレーションは事前に済ませてください。[公式アセンブリチュートリアル](https://huggingface.co/docs/lerobot/so101)を参照。本チュートリアルでは扱いません！

アセンブリチュートリアルは [Lerobotロボットアームアセンブリ教程](https://juxitech.feishu.cn/wiki/IAhYwcDRQiShY1kH1oHcZzKined)を参照

サーボが未設定または未アセンブルの場合は、まずこの[README](https://github.com/TheRobotStudio/SO-ARM100)の内容に従ってください。材料リスト、部品入手リンク、3Dプリント部品の説明、初めて印刷する場合や3Dプリンターがない場合のアドバイスが含まれています。

まず LeRobot 環境のインストールから始めましょう。

## B. 環境準備

For Ubuntu X86:

- Ubuntu 22.04
- CUDA 12+
- Python 3.10
- Torch 2.6+

For Jetson Orin:

- Jetson Jetpack 6.0+
- Python 3.10
- Torch 2.5.0a0+872d972e41

### LeRobot 環境のインストール

#### 1. [Miniconda のインストール](https://docs.anaconda.com/miniconda/install/#quick-command-line-install):

CUDA バージョンに応じて pytorch と torchvision などの環境をインストールする必要があります。

1. Jetson の場合:

```Bash
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh
chmod +x Miniconda3-latest-Linux-aarch64.sh
bash ~/Miniconda3-latest-Linux-aarch64.sh
source ~/.bashrc
```

または、X86 Ubuntu 22.04 の場合:

```Bash
mkdir -p ~/miniconda3
cd miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
source ~/miniconda3/bin/activate
conda init --all
```

#### 2. デプロイしたいディレクトリ（例: lerobot を作成）で lerobot 用の新しい conda 環境を作成して有効化します:

> ~/miniconda3 ディレクトリ内に lerobot プロジェクトを作成またはインポートしないでください

```PowerShell
conda create -y -n lerobot python=3.10
```

#### 3. その後、`conda` 環境を有効化します（lerobot を使用するたびにターミナルを開くたびに必要です!）:

```PowerShell
conda activate lerobot
```

#### 4. LeRobot のクローン:

```PowerShell
git clone https://github.com/Juxi-Technology/lerobot.git
```

最新版に従うこともできます: https://github.com/huggingface/lerobot.git
注: 最新バージョンのコマンドコードが異なる場合があります!

#### 5. 環境に ffmpeg をインストール:

`miniconda` を使用する場合、環境に `ffmpeg` をインストールします:

```PowerShell
conda install ffmpeg -c conda-forge
```

これにより通常は libsvtav1 エンコーダでコンパイルされた ffmpeg 7.X がインストールされます。libsvtav1 をサポートしない場合（`ffmpeg -encoders` で確認可能）:

【すべてのプラットフォーム】ffmpeg 7.X を明示的にインストール:
`conda install ffmpeg=7.1.1 -c conda-forge`

グラフィックス依存なし（gdk-pixbuf、librsvg）はこのコマンドで:
`conda install ffmpeg=7.1.1 -c conda-forge --no-deps`

【Linux のみ】ffmpeg のビルド依存をインストールし、libsvtav1 サポート付き ffmpeg をソースからコンパイルし、使用する ffmpeg 実行ファイルが正しいことを `which ffmpeg` で確認してください。

以下のエラーに遭遇した場合も、上記のコマンドで解決できます。
![5. 環境に ffmpeg をインストール: – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/1.png)




#### 6. lerobot ディレクトリに入り、feetech モーター依存を含む LeRobot をインストール:

```PowerShell
cd ~/lerobot && pip install -e ".[feetech]"
```

Jetson Jetpack 6.0+ デバイスの場合（このステップの前に[このリンクのチュートリアル](https://pytorch.org/get-started/locally/)に従って Pytorch-gpu と Torchvision をインストールしてください）:

```Plain Text
conda install -y -c conda-forge "opencv>=4.10.0.84"  # conda で OpenCV とその他の依存関係をインストール、Jetson Jetpack 6.0+ にのみ適用
conda remove opencv   # OpenCV をアンインストール
pip3 install opencv-python==4.10.0.84  # pip3 で指定バージョンの OpenCV をインストール
conda install -y -c conda-forge ffmpeg
conda uninstall numpy
pip3 install numpy==1.26.0  # このバージョンは torchvision と互換性が必要
```

#### 7. Pytorch と Torchvision の確認

pip で lerobot 環境をインストールすると既存の Pytorch と Torchvision がアンインストールされ CPU 版がインストールされるため、Python で確認する必要があります。

```Plain Text
import torch
print(torch.cuda.is_available())
```

出力が False の場合は、[公式チュートリアル](https://pytorch.org/)に従って Pytorch と Torchvision を再インストールしてください。

[Jetson Orin の Pytorch 非互換](https://juxitech.feishu.cn/wiki/AJWBwSbXiinQT5kM1SZc7N3Tn8d)

#### 8. intelRealSense 深度カメラ SDK 依存環境のインストール（intelRealSense 深度カメラがある場合）

RealSense 深度カメラを使用する場合、`lerobot/src/lerobot/` に pyrealsense2 をインストール:

```Plain Text
pip install pyrealsense2
```

## C. ロボットアーム制御

### ポート権限

電源ケーブルを接続します。黑色の能動アームは5V6A電源アダプター、白色の従動アームは12V5A電源アダプターを使用し、サーボドライバ基板をデータケーブルでホストに接続します

まず `lerobot/src/lerobot/` ディレクトリに入ります

```Plain Text
cd ~/lerobot/src/lerobot/
```

その後、`conda` 環境を有効化します（lerobot を使用するたびに必要です!）:

```Plain Text
conda activate lerobot
```

#### 1. ポートを見つけるスクリプトを実行

ロボットアームに対応する USB ポートを見つけるには、ユーティリティスクリプトを2回実行します:

```Plain Text
lerobot-find-port
```

#### 2. 出力例

Leader ロボットアームのポートを認識するときの例（Mac では `/dev/tty.usbmodem575E0031751`、Linux では `/dev/ttyACM0` の場合があります）:

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.
[...Disconnect corresponding leader or follower arm and press Enter...]
The port of this MotorsBus is /dev/ttyACM1
Reconnect the USB cable.
```

Follower ロボットアームのポートを認識するときの例（`/dev/tty.usbmodem575E0032081`、Linux では `/dev/ttyACM1` の場合があります）:

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.
[...Disconnect corresponding leader or follower arm and press Enter...]
The port of this MotorsBus is /dev/ttyACM0
Reconnect the USB cable.
```

USB コネクタを抜くことを忘れないでください。抜かないとインターフェースを検出できません。

#### 3. トラブルシューティング

Linux では、以下のコマンドを実行して USB ポートへのアクセス権限を付与する必要があります:

```PowerShell
sudo chmod 666 /dev/ttyACM0
```

```Plain Text
sudo chmod 666 /dev/ttyACM1
```

### ロボットアームのキャリブレーション

次に、SO-10x ロボットに電源とデータケーブルを接続してキャリブレーションを行い、同じ物理位置で Leader アームと Follower アームの位置情報が一致するようにします。このキャリブレーションは重要です。ある SO-10x ロボットで訓練したニューラルネットワークが別のロボットでも機能するようにするためです。再キャリブレーションが必要な場合は、`~/.cache/huggingface/lerobot/calibration/robots` または `~/.cache/huggingface/lerobot/calibration/teleoperators` のファイルを完全に削除して再キャリブレーションしてください。そうしないとエラーが出ます。キャリブレーションされたアーム情報はそのディレクトリの json ファイルに保存されます。

#### 1. Follower ロボットアームの手動キャリブレーション

3 ピンインターフェースで6個のロボットサーボのインターフェースを接続し、シャーシサーボをサーボドライバ基板に接続し、以下のコマンドまたは API サンプルを実行してキャリブレーションします:

PC(linux) と jetson ボードを例にすると、`最初` に USB に挿すと `ttyACM0` にマッピングされ、`2番目` に挿すと `ttyACM1` にマッピングされます。

コードを実行する前に、leader と follower のマッピングインターフェースに注意してください。

#### 2. インターフェース権限

まず、インターフェース権限を付与します。以下のコマンドを実行:

```Bash
sudo chmod 666 /dev/ttyACM*
```

#### 3. その後、Follower ロボットアームをキャリブレーション

以下の Python コマンドを実行して従動アームをキャリブレーション:

```Python
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm
```

まず、ロボットをすべての関節が可動範囲の中央にある位置に移動し、そのまま動かさないでください。次に、Enter キーを押した後、各関節を可動範囲全体で動かす必要があります。キャリブレーションファイルは可動範囲の中位、最大値、最小値を記録し、`~/.cache/huggingface/lerobot/calibration/robots` または `~/.cache/huggingface/lerobot/calibration/teleoperators` ディレクトリの json ファイルに保存されます。
![3. その後、Follower ロボットアームをキャリブレーション – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/2.png)



![3. その後、Follower ロボットアームをキャリブレーション – 2](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/3.png)




#### **4. Leader ロボットアームのキャリブレーション**

主アームのキャリブレーションは上記と同様です。以下のコマンドまたは API サンプルを実行:

```Python
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm
```

ロボットアーム中位キャリブレーション動画.mp4

### 遠隔操作

#### **1. **簡単な遠隔操作

これでロボットを遠隔操作できます! この簡単なスクリプトを実行します（カメラには接続しません）:

ロボットに関連付けられた **ID はキャリブレーションファイルの保存に使用されます。同じ設定でリモート操作、録画、評価を行う際は、同じ ** を使用することが重要です。

まずシリアルポートに権限を与えます:

```Bash
sudo chmod 666 /dev/ttyACM*
```

遠隔操作を実行:

```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm
```

リモート操作コマンドは以下の手順を自動実行します:

1. 不足しているキャリブレーションファイルを識別し、キャリブレーションプログラムを起動します。
2. ロボットとリモートデバイスを接続し、遠隔操作を開始します。

#### 2. カメラ表示付きの遠隔操作

カメラをインスタンス化するには、カメラ識別子が必要です。この識別子は PC の再起動やカメラの抜き差しで変更される場合があります（OS に依存）。

システムに接続されたカメラの**カメラインデックス**を見つけるには、以下のスクリプトを実行:

```Python
lerobot-find-cameras realsense # or realsense for Intel Realsense cameras
```

ターミナルに関連カメラ情報が出力されます。
![2. カメラ表示付きの遠隔操作 – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/4.png)




`~/lerobot/outputs/captured_images` ディレクトリに各カメラが撮影した画像があります。

**macOS** で Intel RealSense カメラを使用すると、**"Error finding RealSense cameras: failed to set power state"** エラーが発生する場合があります。これは同じコマンドを `sudo` 権限で実行することで解決できます。なお、**macOS** での RealSense カメラの使用は不安定です。

その後、遠隔操作時に PC にカメラ映像を表示できます。次のコードを実行するだけです。最初のデータセットを録画する前に設定を準備するのに便利です。

```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true
```

`fourcc: "MJPG"` 形式の画像は圧縮された画像です。より高い解像度を試せます。もちろん `YUYV` 形式の画像も試せますが、画像の解像度と FPS が低下しロボットアームの動作がカクつきます。現在 `MJPG` 形式では `3` 台のカメラで `1920*1080` 解像度かつ `30FPS` を維持できますが、2台のカメラを同じ USB HUB でホストに接続することは推奨しません。

カメラがさらに必要な場合は、`--robot.cameras` パラメータを変更して追加できます。`index_or_path` の形式は `python -m lerobot.find_cameras opencv` コマンドで出力されるカメラ ID の最後の数字で決まることに注意してください。

例えば、カメラを追加する場合:

```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true
```

RealSense 深度カメラを追加する場合、まず `python -m lerobot.find_cameras realsense` で Id を取得し、このコマンドの robot.cameras パラメータの serial_number_or_name: "323622271780" を自分の深度カメラ Id に置き換え、`use_depth: true` で深度ストリームを有効にします:

![2. カメラ表示付きの遠隔操作 – 2](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/5.png)



```Python
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: intelrealsense, serial_number_or_name: "323622271780", width: 1280, height: 720, fps: 30, use_depth: true}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true
```

## D. データ収集

### データセットの記録

- データセットをローカルに保存する場合、直接実行:

```Python
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true \
    --dataset.repo_id=juxi/test \
    --dataset.num_episodes=5 \
    --dataset.single_task="Put the blue cube on the black box" \
    --dataset.push_to_hub=false \
    --dataset.episode_time_s=30 \
    --dataset.reset_time_s=30
```

`dateset.repo_id` と `dataset.single_task` は自由に変更できます。`push_to_hub=false` の場合、データセットはホームディレクトリの `~/.cache/huggingface/lerobot` に上記の `juxi/test` フォルダが作成されます。[RealSense 深度カメラを使用する場合は、実行コマンドを自分で変更できます](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc#share-ByBqdibmroBp9kx1jjxc0MGWn4e)

- Hugging Face Hub の機能でデータセットをアップロードする場合、以前にログインしていなければ、[Hugging Face 設定](https://huggingface.co/settings/tokens)から生成できる書き込み権限付きトークンでログインしてください:

```Bash
hf auth login

# 従来の CLI を使用している場合:
huggingface-cli login --token ${HUGGINGFACE_TOKEN} --add-to-git-credential
```

Hugging Face リポジトリ名を変数に保存して、以下のコマンドを実行:

```Bash
hf auth whoami

# 従来の CLI を使用している場合:
HF_USER=$(huggingface-cli whoami | head -n 1)
echo $HF_USER
```

5 エピソードを記録して Hub にアップロード:

```Python
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM1 \
    --teleop.id=my_awesome_leader_arm \
    --display_data=true \
    --dataset.repo_id=${HF_USER}/record-test \
    --dataset.num_episodes=5 \
    --dataset.single_task="Put the blue cube on the black box" \
    --dataset.push_to_hub=true \
    --dataset.episode_time_s=30 \
    --dataset.reset_time_s=30
```

以下のようなデータが表示されます:

```Bash
INFO 2024-08-10 15:02:58 ol_robot.py:219 dt:33.34 (30.0hz) dtRlead: 5.06 (197.5hz) dtWfoll: 0.25 (3963.7hz) dtRfoll: 6.22 (160.7hz) dtRlaptop: 32.57 (30.7hz) dtRphone: 33.84 (29.5hz)
```

**パラメータ説明**
- episode_time_s: 各回のデータ収集時間。
- reset_time_s: データ収集間の準備時間。
- num_episodes: 収集するデータ組数。
- push_to_hub: HuggingFace Hub にアップロードするかどうか。

|キー|動作|
|---|---|
|右矢印 →|現在のエピソードを早期終了/リセットし、次へ。|
|左矢印 ←|現在のエピソードを取り消し、再録画。|
|ESC|セッションを即座に停止し、動画をエンコードしてデータセットをアップロード。|

**データ収集のコツ**
- **タスクの提案**: 異なる位置にある物体をつかんで箱に入れます。
- **規模**: 50 エピソード以上を記録します（各位置につき 10 エピソード）。
- **一貫性**:
    - カメラを固定します。
    - 同じつかむ動作を維持します。
    - 操作対象の物体がカメラのフレーム内に映っていることを確認します。
- **段階的に進める**:
    - 確実につかめる動作から始め、徐々にバリエーション（新しい位置、つかみ方、カメラの調整）を追加します。
    - 失敗を防ぐため、複雑さを急激に上げることは避けます。

💡 **経験則**: カメラ映像だけを手がかりにし、画面からフィードバックされる映像のみを頼りにロボットアームを操作してタスクを完了させます。

この重要なトピックをさらに深く掘り下げたい場合は、良いデータセットとは何かについての[ブログ記事](https://huggingface.co/blog/lerobot-datasets#what-makes-a-good-dataset)をご覧ください。

- 以降の章では、ニューラルネットワークを訓練します。確実につかめるようになったら、データ収集時にさらにバリエーションを追加できます。例えば、つかむ位置の追加、異なるつかみ方、カメラ位置の変更などです。
- 変更を急に追加しすぎると、結果の妨げになる可能性があるため避けてください。
- エピソードの録画中はいつでも右矢印 → を押して早期終了し、リセット状態に移行できます。同様に、リセット中も早期終了して次のエピソードの録画に移行できます。
- 録画中またはリセット中に前の段階に戻したい場合は、いつでも左矢印 ← を押して現在のエピソードを早期終了し、録画し直すことができます。
- 録画中はいつでも ESCAPE（ESC）キーを押すとセッションを早期終了し、そのまま動画のエンコードとデータセットのアップロードに進みます。
- 同じコマンドに `--resume=true` を追加して再実行すると、録画を再開できます。⚠️ **重要な注意**: 再開する場合、`--dataset.num_episodes` には追加で録画するエピソード数を設定してください（データセットの目標エピソード総数ではありません）。最初から録画し直したい場合は、データセットのディレクトリを手動で削除してください。
- Linux では、データ録画中に左右の矢印キーと Esc キーが効かない場合、$DISPLAY 環境変数が設定されていることを確認してください。[pynput の制限事項](https://pynput.readthedocs.io/en/latest/limitations.html#linux)を参照してください。

キーを押してもキーボードが反応しない場合は、pynput のバージョンをダウングレードする必要があるかもしれません。例えば、バージョン 1.6.8 をインストールします。

`pip install pynput==1.6.8`

### データセットの可視化

```Python
echo ${HF_USER}/so101_test  
```

データセットをアップロードした場合、[オンラインで可視化](https://huggingface.co/spaces/lerobot/visualize_dataset)できます。以下のコマンドで生成されたリポジトリ ID をコピーして貼り付けます:

```Bash
python lerobot/scripts/visualize_dataset_html.py \
  --repo-id ${HF_USER}/so101_test \
  --local-files-only 1
```

データセットをアップロードした場合、次のコマンドでもローカルに可視化できます:

```Python
lerobot-dataset-viz \
  --repo-id ${HF_USER}/so101_test
```

データセットをアップロードしていない場合、ローカルで可視化:

```Python
lerobot-dataset-viz \
  --repo-id juxi/test \
```

ここで、`juxi` はデータ収集時にカスタムした `repo_id` 名です。
![データセットの可視化 – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/6.png)


### エピソードのリプレイ（スキップ可能、試すことも可能）

データセットからエピソードを 1 つ再生するには:

では、ロボットで最初のデータセットを再生してみてください:

```Python
lerobot-replay \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --dataset.repo_id=${HF_USER}/record-test \
    --dataset.episode=0
```

このとき、ロボットは遠隔操作で録画したときと同じ動作をするはずです。

`--replay=true` を付けて record コマンドを実行することでも、エピソードを再生できます:

```Python
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0 \
    --robot.id=my_awesome_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30, fourcc: "MJPG"}}" \
    --dataset.repo_id=${HF_USER}/so101_test \
    --dataset.single_task="Put the blue cube on the black box" \
    --dataset.num_episodes=1 \
    --dataset.episode_time_s=30 \
    --dataset.reset_time_s=30 \
    --dataset.push_to_hub=true \
    --replay=true
```

## E. データセットの訓練と評価

### ACT

公式チュートリアル [ACT](https://huggingface.co/docs/lerobot/training#act) を参照

**訓練**

```Python
lerobot-train \
  --dataset.repo_id=${HF_USER}/so101_test \
  --policy.type=act \
  --output_dir=outputs/train/act_so101_test \
  --job_name=act_so101_test \
  --policy.device=cuda \
  --wandb.enable=false \
  --steps=300000
```

**ローカルデータセットで訓練する場合は、**`repo_id`** がデータ収集時の名前と一致していることを確認し、**`--policy.push_to_hub=false`** を追加してください。**

```Python
lerobot-train \
  --dataset.repo_id=juxi/test \
  --policy.type=act \
  --output_dir=outputs/train/act_so101_test \
  --job_name=act_so101_test \
  --policy.device=cuda \
  --wandb.enable=false \
  --policy.push_to_hub=false\
  --steps=300000
```

コマンドの説明
- **データセット指定**: `--dataset.repo_id=${HF_USER}/so101_test` パラメータでデータセットを指定しました。
- **訓練ステップ数**: `--steps=300000` で訓練ステップ数を変更。アルゴリズムのデフォルトは 800000。タスクの難易度に応じて訓練時の loss を観察して調整してください。
- **ポリシータイプ**: `policy.type=act` でポリシーを指定。同様に [act,diffusion,pi0,pi0fast,pi0.5,sac,smolvla] などのポリシーに変更できます。これは `configuration_act.py` から設定を読み込みます。重要なのは、このポリシーはあなたのロボット（例: `laptop` や `phone`）のモーター状態、モーター動作、カメラ数に自動適応することです。これらはデータセットに保存されています。
- **デバイス選択**: Nvidia GPU で訓練するため `policy.device=cuda` を指定しますが、Apple Silicon では `policy.device=mps` を使用できます。
- **可視化ツール**: `wandb.enable=true` で [Weights and Biases](https://docs.wandb.ai/quickstart) による訓練グラフ可視化を利用できます。これは任意ですが、使用する場合は `wandb login` でログインしていることを確認してください。

以下のエラーが出た場合:
![ACT – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/7.png)




次のコマンドを実行して解決します:

```Bash
pip install datasets==2.19
```

訓練には数時間かかる場合があります。訓練結果の重みファイルは `outputs/train/act_so101_test/checkpoints` ディレクトリにあります。

ある訓練結果の重みファイルから訓練を再開する場合、`act_so101_test` ポリシーの最後の訓練結果重みファイルから再開するコマンド例:

```Bash
lerobot-train \
  --config_path=outputs/train/act_so101_test/checkpoints/last/pretrained_model/train_config.json \
  --resume=true
```

**評価**

[`lerobot/record.py`](https://github.com/huggingface/lerobot/blob/main/lerobot/record.py) の `record` 機能を使用できますが、ポリシー訓練結果の重みファイルを入力として渡す必要があります。例: 10 回の評価エピソードを記録するコマンド:

```Python
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --robot.id=my_awesome_follower_arm \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM1 \
  --teleop.id=my_awesome_leader_arm \
  --display_data=false \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.single_task="Put the blue cube on the black box" \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=30 \
  --dataset.num_episodes=5 \
  --policy.path=outputs/train/act_so101_test/checkpoints/last/pretrained_model
  --dataset.push_to_hub=false
```

1. `--policy.path` パラメータはポリシー訓練結果重みファイルのパスを示します（例: `outputs/train/act_so101_test/checkpoints/last/pretrained_model`）。モデル重みファイルを Hub にアップロードした場合、モデルリポジトリ（例: `$\{HF_USER\}/act_so101_test`）も使用できます。
2. データセット名 `dataset.repo_id` が `eval_` で始まる場合、評価時に評価用の動画とデータが別途録画され、eval_ で始まるフォルダに保存されます（例: `juxi/eval_test123`）。
3. 評価段階で `File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'` に遭遇した場合は、`eval_` で始まるフォルダを削除してから再度実行してください。
4. `mean is infinity. You should either initialize with stats as an argument or use a pretrained model` に遭遇した場合は、`--robot.cameras` パラメータの front や side などのキーワードがデータ収集時と厳密に一致していることを確認してください。

### Smolvla

公式チュートリアル [SmolVLA](https://huggingface.co/docs/lerobot/smolvla) を参照

```Bash
pip install -e ".[smolvla]"
```

**訓練**

```Bash
lerobot-train \
  --policy.path=lerobot/smolvla_base \
  --dataset.repo_id=${HF_USER}/mydataset \
  --batch_size=64 \
  --steps=20000 \
  --output_dir=outputs/train/my_smolvla \
  --job_name=my_smolvla_training \
  --policy.device=cuda \
  --wandb.enable=true
```

**検証**

```Bash
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_awesome_follower_arm \ # <- Use your robot id
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --dataset.single_task="Put the blue cube on the black box" \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=30 \
  --dataset.num_episodes=5 \
  # <- Teleop optional if you want to teleoperate in between episodes \
  # --teleop.type=so101_leader \
  # --teleop.port=/dev/ttyACM0 \
  # --teleop.id=my_awesome_leader_arm \
  --policy.path=HF_USER/FINETUNE_MODEL_NAME # <- Use your fine-tuned model
```

### Pi0

公式チュートリアル [Pi0](https://huggingface.co/docs/lerobot/pi0) を参照

```Bash
pip install -e ".[pi]"
```

**訓練**

```Bash
lerobot-train \
  --policy.type=pi0 \
  --dataset.repo_id=juxi/eval_test123 \
  --job_name=pi0_training \
  --output_dir=outputs/pi0_training \
  --policy.pretrained_path=lerobot/pi0_base \
  --policy.compile_model=true \
  --policy.gradient_checkpointing=true \
  --policy.dtype=bfloat16 \
  --steps=20000 \
  --policy.device=cuda \
  --batch_size=32 \
  --wandb.enable=false
```

**検証**

```Bash
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --robot.id=my_awesome_follower_arm \
  --display_data=false \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.single_task="Put the blue cube on the black box" \
  --policy.path=outputs/pi0_training/checkpoints/last/pretrained_model
```

### Pi0.5

公式チュートリアル [Pi0.5](https://huggingface.co/docs/lerobot/pi05) を参照

```Bash
pip install -e ".[pi]"
```

**トレーニング**

```Bash
lerobot-train \
    --dataset.repo_id=juxi/eval_test123 \
    --policy.type=pi05 \
    --output_dir=outputs/pi05_training \
    --job_name=pi05_training \
    --policy.pretrained_path=lerobot/pi05_base \
    --policy.compile_model=true \
    --policy.gradient_checkpointing=true \
    --wandb.enable=false \
    --policy.dtype=bfloat16 \
    --steps=3000 \
    --policy.device=cuda \
    --batch_size=32
```

**検証**

```Bash
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --robot.id=my_awesome_follower_arm \
  --display_data=false \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.single_task="Put the blue cube on the black box" \
  --policy.path=outputs/pi05_training/checkpoints/last/pretrained_model
```

### GR00T N1.5

公式チュートリアル [GR00T](https://huggingface.co/docs/lerobot/gr00t) を参照

トレーニングは Pi0 と同じで、ポリシータイプを `gr00t` に変更します。

## F. クラウドサーバーでの訓練展開とモデルエクスポート

#### **1.「算力市場」をクリックし、必要なGPUを選択。できるだけ多コアを選ぶ**
![1.「算力市場」をクリックし、必要なGPUを選択。できるだけ多コアを選ぶ – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/8.png)


#### **2.「按量計費」を選択し、ベースイメージは「Miniconda/conda3/3.8(ubuntu20.04)/11.8」を選択、「立即創建」をクリック**
![2.「按量計費」を選択し、ベースイメージは「Miniconda/conda3/3.8ubuntu20.04/11.8」を選択、「立即創建」をクリック – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/9.png)


#### **3.「JupyterLab」をクリックしてコントロール画面に入り、ターミナルを開く**
![3.「JupyterLab」をクリックしてコントロール画面に入り、ターミナルを開く – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/10.png)


#### **4.conda環境を初期化**

```Plain Text
conda env list
```

```Plain Text
conda activate base
```

```Plain Text
conda init
```

![4.conda環境を初期化 – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/11.png)


#### **5.このターミナルを閉じて、新しいターミナルを開く**

https://www.autodl.com/docs/network_turbo/ を参照

```Plain Text
source /etc/network_turbo
```
![5.このターミナルを閉じて、新しいターミナルを開く – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/12.png)




#### **6.lerobot環境を作成**

```PowerShell
conda create -y -n lerobot python=3.10
```

```PowerShell
conda activate lerobot
```

```PowerShell
git clone https://github.com/Juxi-Technology/lerobot.git
```

最新版に従うこともできます: https://github.com/huggingface/lerobot.git
注: 最新バージョンのコマンドコードが異なる場合があります!

```PowerShell
conda install ffmpeg -c conda-forge
```
![6.lerobot環境を作成 – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/13.png)


#### **7.srcディレクトリのlerobotに入り、feetechモーター依存を含むLeRobotをインストール:**

```PowerShell
cd ~/lerobot && pip install -e ".[feetech]"
```

#### **8.データセットをクラウドサーバーにインポート**

2つのケースがあります。1つは**データ収集時にすでにhuggingfaceデータベースにアップロード済みの場合**、もう1つはそうでない場合です。

**①データ収集時にhuggingfaceデータベースにアップロード済みの場合、huggingfaceデータベースから取得したkeyでアクセスできます**



```Plain Text
huggingface-cli login --token ${HUGGINGFACE_TOKEN} --add-to-git-credential
```

```Plain Text
HF_USER=$(huggingface-cli whoami | head -n 1)
```

```Plain Text
echo $HF_USER
```
![8.データセットをクラウドサーバーにインポート – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/14.png)




```Plain Text
export HYDRA_FULL_ERROR=1
```

**②FileZillaでローカルデータセットをアップロード。**https://www.autodl.com/docs/filezilla/ を参照

Linuxでの最も簡単なインストール方法:

```Python
sudo apt install filezilla
```

```Python
filezilla
```

filezillaを開き、「ファイル」をクリックし「サイトマネージャー」を選択、「新規サイト」を作成、「SFTPプロトコル」を選択
![8.データセットをクラウドサーバーにインポート – 2](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/15.png)



![8.データセットをクラウドサーバーにインポート – 3](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/16.png)




AutoDL算力雲に戻り「ログイン指令」をコピーして見やすい場所に貼り付け、対応情報をコピーして入力し、「接続」をクリック
![8.データセットをクラウドサーバーにインポート – 4](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/17.png)



![8.データセットをクラウドサーバーにインポート – 5](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/18.png)



![8.データセットをクラウドサーバーにインポート – 6](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/19.png)



![8.データセットをクラウドサーバーにインポート – 7](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/20.png)



![8.データセットをクラウドサーバーにインポート – 8](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/21.png)




クラウドサーバーのlerobotディレクトリに data フォルダを作成
![8.データセットをクラウドサーバーにインポート – 9](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/22.png)




データセットフォルダを右側にドラッグして転送し、転送完了を待つ
![8.データセットをクラウドサーバーにインポート – 10](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/23.png)




#### 9.データセット訓練

本チュートリアルの [E.データセット訓練と評価] を参照し、クラウドサーバーで訓練コマンドを実行

#### 10.モデルファイルのエクスポート

訓練完了後、対応するtrainディレクトリの訓練モデルをエクスポート
![10.モデルファイルのエクスポート – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/24.png)




## G. よくある質問

本チュートリアルを使用する場合は、本ドキュメントで推奨している github リポジトリ https://github.com/Juxi-Technology/lerobot.git を git clone してください。

本ドキュメントで推奨しているリポジトリは検証済みの安定版です。Lerobot公式リポジトリはリアルタイム更新の最新版で、予期しない問題(データセットバージョン違い、コマンド違いなど)が発生する可能性があります。

- [RealSense深度カメラを使用する場合、自分で参考にして実行コマンドを変更してください](https://juxitech.feishu.cn/wiki/Wztzw95Cui2F9LkbMk8cnAoanCc#share-ByBqdibmroBp9kx1jjxc0MGWn4e)
- Jetsonデバイスで評価コマンドを実行後、エピソード数と時間を設定せずにctrl+zでプロセスを中断するとロボットアームとカメラが切断され、再接続するとすべてのポートが変わります。

コマンドに評価のエピソード数と時間パラメータを追加してください。

例:

```Python
lerobot-record \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30, fourcc: "MJPG"},   side: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30,fourcc: "MJPG"}}" \
  --robot.id=my_awesome_follower_arm \
  --teleop.type=so101_leader \
  --teleop.port=/dev/ttyACM1 \
  --teleop.id=my_awesome_leader_arm \
  --display_data=false \
  --dataset.repo_id=juxi/eval_test123 \
  --dataset.single_task="Put the blue cube on the black box" \
  --dataset.episode_time_s=30 \
  --dataset.reset_time_s=30 \
  --dataset.num_episodes=5 \
  --policy.path=outputs/train/act_so101_test/checkpoints/last/pretrained_model
  --dataset.push_to_hub=false
```

- サーボIDキャリブレーション時に次のエラーが出た場合

```Bash
`Motor 'gripper' was not found, Make sure it is connected`
```

通信線がサーボに正しく接続されているか、電源電圧が正しいかをよく確認してください。

- 次のエラーが出た場合

```Bash
Could not connect on port "/dev/ttyACM0"
```

`ls /dev/ttyACM*` で ACM0 が存在するのに接続できない場合、シリアルポート権限を忘れている可能性があります。ターミナルで `sudo chmod 666 /dev/ttyACM*` を入力してください。

- 次のエラーが出た場合

```Bash
No valid stream found in input file. Is -1 of the desired media type?
```
![G. よくある質問 – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/25.png)


ffmpeg7.1.1 をインストールしてください。`conda install ffmpeg=7.1.1 -c conda-forge`。



- 次のエラーが出た場合

```Bash
ConnectionError: Failed to sync read 'Present_Position' on ids=[1,2,3,4,5,6] after 1 tries. [TxRxResult] There is no status packet!
```

対応するポート番号のロボットアームが電源に接続されているか、バスサーボのデータ線が緩んでいないか・抜けていないかを確認してください。どのサーボのランプが点灯していないかで、どのサーボの線が緩んでいるかわかります。

- ロボットアームキャリブレーション時に次のエラーが出た場合

```Bash
Magnitude 30841 exceeds 2047 (max for sign_bit_index=11)
```

ロボットアームを一度電源オフにして再度電源を入れ、キャリブレーションを再試行してください。キャリブレーション中にMAX角度が数万に達する場合もこの方法を使用できます。ダメな場合は該当サーボの再キャリブレーション、つまり中位キャリブレーションとID書き込みが必要です。

- 評価段階で次のエラーが出た場合

```Bash
File exists: 'home/xxxx/.cache/huggingface/lerobot/xxxxx/juxi/eval_xxxx'
```

`eval_` で始まるフォルダを削除してから再度実行してください。

- 評価段階で次のエラーが出た場合

```Bash
`mean` is infinity. You should either initialize with `stats` as an argument or use a pretrained model
```

--robot.cameras パラメータの front や side などのキーワードがデータ収集時と厳密に一致していることを確認してください。

## Windows でのサーボ検出（飛特サーボ上位機デバッグソフトウェア）

デバッグ用に、任意の Windows PC で USB 接続によるサーボのプログラミング・デバッグ・テストが可能です。そのためには [Feetech ソフトウェア](https://www.feetechrc.com/software.html) をダウンロードしてください。Ubuntu システムでは [FT_SCServo_Debug_Qt ツール](https://github.com/Kotakku/FT_SCServo_Debug_Qt) を使用できます。

fddebug-master.zip

ポート番号を選択し、ボーレートを 1000000 に設定して開き、「Search」をクリックします

![Windows でのサーボ検出（飛特サーボ上位機デバッグソフトウェア） – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/26.png)

## ROS2 シミュレーション制御（別途実装可能）

https://github.com/holmsslk/so-arm-moveit-hardware

## ウェブ上でサーボ ID を設定し中位キャリブレーションを行う

https://bambot.org/feetech.js?lang=zh

1. サーボモデルに応じて 0 または 1 を入力し、「Connect」をクリックします。

![ウェブ上でサーボ ID を設定し中位キャリブレーションを行う – 1](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/27.png)

2. ID 1〜6 のサーボをスキャンし、スキャン結果の FOUND から対応する ID を確認できます。例: 画像のサーボ ID 1 がスキャン済みです。

![ウェブ上でサーボ ID を設定し中位キャリブレーションを行う – 2](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/28.png)

3. ID 設定と中位キャリブレーション

① 現在のサーボ ID 入力欄には、スキャンされたサーボの ID を入力します

② 「ID 管理」に数値を入力し、「Change ID」をクリックして ID を設定します

③ 中位キャリブレーション（STS3215 サーボの中位値は 2047、SCS0009 サーボは 511）

STS サーボ: 「Position Control」に 2047 を入力し「Set」をクリック

SCS サーボ: 「Position Control」に 511 を入力し「Set」をクリックします。

![ウェブ上でサーボ ID を設定し中位キャリブレーションを行う – 3](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial/29.png)

<RelatedProducts slugs="so-arm101,robot-vision-kit,tpu-flexible-gripper" />
