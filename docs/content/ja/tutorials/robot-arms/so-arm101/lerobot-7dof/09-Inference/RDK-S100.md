---
title: "地瓜机器人（D-Robotics） RDK S100 推論"
description: "D-Robotics RDK S100上で、ベンダーのLeRobot ACTポリシー手順に沿って7軸SO-ARM101の推論を実行する方法を解説します。"
---

# 地瓜机器人（D-Robotics） RDK S100 推論

具体的な実装フローはこちらのリンクを参照してください [LeRobot ACT Policy 全流程ドキュメント](https://horizonrobotics.feishu.cn/docx/HSr8dBdZ0oQ5OwxPQvBcsuyZnWe)



## RDK S100/S100P での ACT モデル端到端デプロイ

本節では、ACT モデルを地瓜机器人（D-Robotics） RDK S100 シリーズのハードウェア上で完全にデプロイする一連の流れを解説します。全体は 3 つのコアフェーズに分かれます：**モデルのエクスポート**、**量子化コンパイル**、**ボード上での実行**です。

**前提説明：**

- **開発マシン \(Host\)：**ステップ 1 とステップ 2 を実行するために使用します。通常はお使いのモデル訓練マシンです（ある程度の性能があり、Docker がインストールされている必要があります）。

- **ボード側 \(Edge\)：**地瓜机器人 RDK S100/S100P。ステップ 3 を実行するために使用します。

- **ツールチェーン：**本記事は `rdk_LeRobot_tools` リポジトリに依存します。詳細は [GitHub リポジトリ](https://github.com/D-Robotics/rdk_LeRobot_tools)を参照してください。

**バージョン互換性に関する重要なお知らせ \(必読\)：** 現在のバージョンの `rdk_LeRobot_tools` の ONNX エクスポートフローは **LeRobot datasets v2\.1** と完全に互換しています。最新の v3\.0 ではデータ構造が変更されているため、本章の操作を行う前に、元の `lerobot` メインリポジトリを v2\.1 互換の特定の commit に切り替えることを**強く推奨**します。これによりエクスポートフローが円滑になります。 

*推奨される Commit ID：* `8cfab3882480bdde38e42d93a9752de5ed42cae2`



### フェーズ1：モデルの ONNX 形式エクスポート 💻 \(開発マシンで実行\)

まず、** PyTorch で訓練済みの **モデルを中間形式（ONNX）にエクスポートする必要があります。



#### **1\. ツールチェーンリポジトリを取得する** 

`lerobot` の作業ディレクトリに移動し、RDK 専用のツールチェーンをクローンします：

```Bash
cd lerobot

# 1. v2.1 datasets と互換性のある安定版に切り替える
git checkout 8cfab3882480bdde38e42d93a9752de5ed42cae2

# 2. 地瓜机器人（D-Robotics） RDK 専用ツールチェーンを取得する
git clone https://github.com/D-Robotics/rdk_LeRobot_tools.git
```



#### **2\. エクスポートパラメータを設定する** 

`rdk_LeRobot_tools/bpu_export_config.yaml` ファイルを編集し、実際のパスに合わせて設定を変更します：

```YAML
dataset:
  root: "data/so101_pick_place" # データセットの絶対パスまたは相対パス
act_path: "outputs/train/act_so101/checkpoints/050000/pretrained_model" # 元の PyTorch モデルの重みファイルのパス
type: "nash-e" # 対象ハードウェアアーキテクチャ。RDK S100 は nash-e、S100P は nash-m に対応
```



#### 3\. エクスポートスクリプトを実行する

```Bash
# ONNX をエクスポート（開発マシン）
python export_bpu_actpolicy.py --config bpu_export_config.yaml
```

✅ **成功の目印**：カレントディレクトリに `bpu_export_output` フォルダが生成され、その中に以降で必要となる `build_all.sh` スクリプトと量子化キャリブレーションデータが含まれています。



### フェーズ2：BPU モデルをコンパイルする 🐳 \(開発マシンの Docker 環境で実行\)

地瓜机器人の BPU モデルの量子化とコンパイルには OpenExplorer \(OE\) 環境が必要です。環境を分離するために Docker の使用を推奨します。



#### **1\.** **Docker 環境とイメージを準備する** 

開発マシンに Docker がインストールされていることを確認します（[公式インストールガイド](https://docs.docker.com/engine/install/)）。推奨の CPU イメージをダウンロードしてロードします：

```Bash
# ダウンロード済みのオフラインイメージのアーカイブをロードする
sudo docker load -i ai_toolchain_ubuntu_22_s100_xxx.tar
```



#### **2\. コンパイルコンテナを起動する**

**トラブル回避のポイント**：モデルのコンパイルには比較的大きな共有メモリが必要です。必ず `--shm-size=15g` パラメータを追加してください。追加しないと IPC のメモリエラーが発生しやすくなります。

開発マシンの作業ディレクトリ（先ほどエクスポートしたフォルダを含む）をコンテナ内にマウントします：

```Bash
sudo docker run -it --rm \
  --network host \
  --shm-size=15g \
  -v "$(pwd)":/workspace \
  --workdir /workspace \
  <docker-image-name> /bin/bash
```

\(注：`<docker-image-name>` は、`sudo docker images` で確認した実際のイメージ名に置き換えてください。\)



#### **3\.** **コンテナ内でコンパイルを実行する** 

コンテナ内部に入ったら、ワンクリックコンパイルスクリプトを実行します：

```Bash
cd /workspace/bpu_export_output
bash build_all.sh
```



#### **4\.** **コンパイル成果物を確認する** 

コンパイル完了後、`bpu_export_output` の下に `bpu_output/` フォルダが生成されます。ここには RDK ボード上での実行に必要なすべてのコアファイルが含まれています： 

- クリックして `bpu_output/` のディレクトリ構造を表示する

    - `BPU_ACTPolicy_TransformerLayers.hbm` \(量子化後のモデルファイル\)

    - `BPU_ACTPolicy_VisionEncoder.hbm` \(量子化後のモデルファイル\)

    - `action_mean.npy` などのデータセット正規化パラメータ

    - `camera1_mean.npy` などのカメラ統計パラメータ

---

### フェーズ3：ボード側でのデプロイと推論 🤖 \(RDK S100 上で実行\)

**前提条件の確認：**

1. RDK ボード側に `D-Robotics/lerobot` の実行環境が構成され、`hbm_runtime` がインストールされていること。

2. `scp`、USB メモリなどの方法で、前の手順で生成した `bpu_output/` フォルダ全体を RDK ボード側に完全にコピーしていること。

3. 基本的なテレオペレーションの設定が完了しており、ロボットアームのシリアルポート、カメラの USB ポート、キャリブレーションファイルの設定に誤りがないこと。



#### **1\.** **BPU による加速推論を実行する**

RDK ボード側のターミナルで、ツールチェーンのディレクトリに移動して制御スクリプトを起動します：

```Bash
cd rdk_LeRobot_tools

python bpu_control_robot.py \
  --bpu-act-path ../bpu_output \
  --fps 30 \
  --inference-time 60
```



---

### 🛠️ よくあるトラブルシューティング \(Troubleshooting\)

実際のデプロイで問題が発生した場合は、以下のチェックリストに沿って確認してください：

- **ロボットアームが動かない？**

    - デバイスのマウント状況を確認：ターミナルで `ls /dev/ttyACM*` を入力し、ロボットアームに対応するシリアルポート番号が正しいか確認します。

    - 権限を確認：`sudo` で推論スクリプトを実行してみるか、現在のユーザーを `dialout` グループに追加します。

- **カメラのストリーミングエラー / 映像の異常 / ロボットアームがその場で振動する？**

    - カメラのインデックス番号（Camera Index）がホットプラグによってずれていないか確認し、コード内のカメラパラメータ設定が実際の `/dev/video*` と対応しているか確認します。

- **開発マシンでコンテナが生成したファイルをコピーする際に「権限が不足しています」と表示される？**

    - Docker のマウントディレクトリで生成されたファイルの所有者はデフォルトで root になります。開発マシンで `sudo chown -R $USER:$USER bpu_export_output` を実行すれば修正できます。

