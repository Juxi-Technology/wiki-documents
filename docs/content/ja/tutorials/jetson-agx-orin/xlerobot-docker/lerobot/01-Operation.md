---
title: 原版 LeRobot の実行コマンド
---

# 原版 LeRobot の実行コマンド

> **所属**：[lerobot/](01-Operation.md) —— 単腕の SO-101 / SO-100 アーム、LeKiwi
> **前提**：[deployment/](../deployment/01-Overview.md) を先に読み終え、コンテナ内に入っていること
> **もう一つのルート**：[xlerobot/](../xlerobot/01-Operation.md)（XLeRobot 本体）
> **次へ**：[troubleshooting/](../troubleshooting/01-Troubleshooting.md)

`lerobot-*` コマンドラインで**単腕の SO-101 / SO-100 アーム**や **LeKiwi** を操作します。

> ⚠️ **XLeRobot 本体**を動かす場合は [xlerobot/](../xlerobot/01-Operation.md) に戻ってください。
> これらのコマンドラインツールは **`xlerobot` に対応していません**——理由は後述の第 0 節を参照してください。

---

## 0. どんな場合にこのルートを使うか

| お使いのハードウェア | 進むルート | 理由 |
|---|---|---|
| **単腕の SO-101 / SO-100 アーム** | ✅ **本ページ**（`lerobot-*` CLI） | 原版ツールが直接対応 |
| **LeKiwi** | ✅ **本ページ**（`lerobot-*` CLI） | 原版ツールが直接対応 |
| **XLeRobot 本体**（両腕 + 台車） | ❌ [04](../xlerobot/01-Operation.md) へ | CLI のホワイトリストに `xlerobot` がない |

**なぜ 2 つのルートに分かれているのか**：`lerobot-calibrate` のようなコマンドラインツールは、ソースコード内にロボットのインポートリストをハードコードしています（原版ロボット 14 種。完全なリストは第 11 節を参照）。**その中に `xlerobot` はありません**。無理に渡すと次のエラーが出ます：

```
lerobot-calibrate: error: argument --robot.type: invalid choice: 'xlerobot'
```

逆に、`examples/` 配下のスクリプトは XLeRobot 本体向けに書かれたもので、単腕には使えません。

**2 つのルートは同じ環境を共有しています**——イメージにインストールされているパッケージの名前は `lerobot` で、XLeRobot は
`robots/` ディレクトリにコードを 3 つ追加しているだけです。そのため**いつでも切り替えられ、何もインストールし直す必要はありません**。
同一プロセス内で両方を一緒に import することもできます。

---

## 1. 完全なフロー

```
準備            キャリブレーション    使用          トレーニング  デプロイ
────            ──────────────────    ────          ────────────  ────────
find-port   →   calibrate      →      teleoperate  ┐
find-cameras                          record       ┴→ train  →  rollout
                                      replay
```

各ステップにつき 1 コマンドです。以下で順に説明します。

---

## 2. 準備：シリアルポートとカメラを探す

```bash
lerobot-find-port          # 対話式：プロンプトに従ってサーボケーブルを抜き挿し、シリアルポート名を表示
lerobot-find-cameras opencv   # カメラを 1 つずつ試してスクリーンショットを撮影
```

`lerobot-find-cameras` はスクリーンショットを `outputs/captured_images/` に保存します。映像が見えればカメラが使用可能です。
**実測で使用可能**（`/dev/video0` を認識し、キャプチャに成功）。

> どちらのコマンドも**対話式**です。`--help` を直接付けて実行すると EOF エラーになりますが、正常な動作です。

---

## 3. 新しいサーボを初めて使う場合：ID の書き込み

新品のサーボは出荷時の ID がすべて 1 のため、1 本のバスに接続するには 1〜6 に 1 つずつ変更する必要があります：

```bash
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0
```

「サーボを 1 つだけ接続して Enter を押してください」と表示され、1 つ変更したら次のサーボを接続します。

> 新しく組み立てた場合、またはサーボを交換した場合にのみ必要です。すでに正常に通信できるアームはこのステップをスキップしてください。

---

## 4. キャリブレーション

```bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_arm
```

- **キャリブレーションファイルがない場合** → ガイドが開始されます：まずアームを可動範囲の中点に合わせて Enter を押し、その後各関節を可動範囲の端から端まで順に動かします
- **キャリブレーションファイルがある場合** → 復元するか、再キャリブレーションするかを聞かれます

キャリブレーションファイルの保存先は `~/.cache/huggingface/lerobot/calibration/robots/so101_follower/my_arm.json` です。
**コンテナ起動時に `-v ~/.cache/huggingface` をマウントしています**（[03-Deployment](../deployment/03-Deployment.md) 参照）ので、コンテナを開き直しても失われません。

リーダー/フォロワー構成の場合、フォロワーアームとリーダーアームを**それぞれ 1 回ずつキャリブレーション**します：

```bash
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower
lerobot-calibrate --teleop.type=so101_leader --teleop.port=/dev/ttyACM1 --teleop.id=my_leader
```

---

## 5. テレオペレーション

### リーダーアームでフォロワーアームを動かす（リーダー/フォロワーモード）

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader
```

### リーダーアームがない場合は？キーボードを使う

`--teleop.type` には `keyboard` があり、2 台目のハードウェアは不要です：

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard
```

`--teleop.type=gamepad` で Xbox コントローラーを接続することもできます（`pip install "lerobot[gamepad]"` が必要）。

### カメラを接続して映像を見る

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader \
  --display_data=true --display_mode=rerun
```

> rerun での可視化を使う場合も、先に 2 つの X11 ライブラリのインストールが必要です。
> [xlerobot/](../xlerobot/01-Operation.md) の第 1 節を参照してください。

---

## 6. デモンストレーションデータの収集

```bash
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader \
  --dataset.repo_id=<あなたのユーザー名>/<最初のデータセット名> \
  --dataset.num_episodes=10 \
  --dataset.single_task="pick up the cube"
```

**パラメータの説明：**

| パラメータ | 役割 |
|---|---|
| `--robot.cameras` | カメラ設定。**ネストされた辞書の構文**で、`名前: {type: opencv, index_or_path: ..., width/height/fps}` |
| `--dataset.repo_id` | データセットの Hugging Face 上の ID（ローカルに録ってから後でプッシュも可能） |
| `--dataset.num_episodes` | 録るエピソード数 |
| `--dataset.single_task` | タスクの説明。トレーニング時に使用 |
| `--dataset.root` | 別のディレクトリに保存したい場合に追加。デフォルトはキャッシュディレクトリ配下 |

**録画中のキー操作**（ターミナルに表示されます）：

| キー | 動作 |
|---|---|
| `→`（右矢印キー） | 現在のエピソードを途中終了し、リセット段階へ進む |
| `←`（左矢印キー） | 現在のエピソードを破棄して、この 1 本を録り直す |
| `Esc` | 録画全体を停止 |

録り終えたデータはローカルでそのまま使用できます。Hub にプッシュする場合：

```bash
--dataset.push_to_hub=true
```

（コンテナ起動時に `-e HF_ENDPOINT=https://hf-mirror.com` を追加したことを忘れずに。）

---

## 7. リプレイによる確認

録り終えたらまずリプレイで一度確認し、データに問題がないことを確かめてからトレーニングします：

```bash
lerobot-replay \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --dataset.repo_id=<あなたのユーザー名>/<最初のデータセット名> \
  --dataset.episode=0
```

---

## 8. トレーニング

```bash
lerobot-train \
  --policy.type=act \
  --dataset.repo_id=<あなたのユーザー名>/<最初のデータセット名>
```

> `lerobot-train` は **`robot.type` を必要としません**（データセットとポリシータイプだけを扱います）。
> そのためこのコマンドは XLeRobot のルートと**共用**です——XLeRobot で録ったデータも同じようにトレーニングできます。
>
> トレーニングは非常に計算負荷が高いです。CPU では極小規模しか実行できず、実用的には Jetson の GPU が必要です。

選択可能なポリシー（`--policy.type`）：`act`（最もよく使われる）、`diffusion`、`smolvla`、
`pi0` / `pi05` / `pi0_fast`、`groot`、`tdmpc`、`vqbet` など。

---

## 9. 実機デプロイ：トレーニング済みポリシーの実行

```bash
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<あなたのユーザー名>/<モデル名> \
  --strategy.type=base
```

| パラメータ | 説明 |
|---|---|
| `--policy.path` | トレーニング済みモデル（Hub 上の ID またはローカルパス） |
| `--strategy.type` | `base` が最もよく使われる。ほかに `sentry`、`highlight`、`episodic`、`dagger` |
| `--inference.type` | `sync`（デフォルト）または `rtc` |

> ⚠️ **`lerobot-eval` を実機で使わないでください**——あれは**シミュレーションベンチマーク**用です
> （`--env.type=aloha/pusht/libero/metaworld...`）。実機デプロイには使用しません。実機では
> `lerobot-rollout` を使用してください。

---

## 10. コマンドラインツール一覧

| コマンド | 役割 | `robot.type` は必要か |
|---|---|---|
| `lerobot-find-port` | シリアルポートを探す | いいえ |
| `lerobot-find-cameras` | カメラを探す | いいえ |
| `lerobot-setup-motors` | 新しいサーボに ID を書き込む | はい |
| `lerobot-calibrate` | キャリブレーション | はい |
| `lerobot-teleoperate` | テレオペレーション | はい |
| `lerobot-record` | データセットの記録 | はい |
| `lerobot-replay` | データのリプレイ | はい |
| `lerobot-train` | ポリシーのトレーニング | **いいえ**（XLeRobot と共用） |
| `lerobot-rollout` | **実機**へのポリシーデプロイ | はい |
| `lerobot-eval` | **シミュレーション**ベンチマーク評価 | いいえ（`--env.type` を使用） |
| `lerobot-edit-dataset` | データセットの編集 | いいえ |
| `lerobot-dataset-viz` | データセットの可視化 | いいえ |
| `lerobot-info` | 環境とバージョン情報の表示 | いいえ |

---

## 11. CLI が対応するロボットタイプ（完全なリスト）

これは `lerobot-*` コマンドラインが**実際に認識できる**すべてのタイプです（ソースコードのホワイトリストから読み取ったもの）。
**`xlerobot` はありません**——これが 2 つのルートに分かれている理由です。

**ロボット（`--robot.type`）—— 14 種：**

```
openarm_follower      bi_openarm_follower     rebot_b601_follower
bi_rebot_b601_follower so100_follower         so101_follower
bi_so_follower        hope_jr_hand            hope_jr_arm
koch_follower         lekiwi                  lekiwi_client
omx_follower          unitree_g1
```

**テレオペレーター（`--teleop.type`）—— 含まれるもの：**

```
so101_leader      so100_leader      bi_so_leader      koch_leader
openarm_leader    omx_leader        rebot_102_leader  unitree_g1
keyboard          gamepad           homunculus_arm    homunculus_glove
```

> 完全なリストはご自身のイメージ内の `--help` を基準にしてください。バージョンによって追加・削除があります。

---

## 12. 完全な例（ゼロから実行できるまで）

```bash
# 1. デバイスを探す
lerobot-find-port                          # シリアルポート名を控える。以下では /dev/ttyACM0 を使用
lerobot-find-cameras opencv                # カメラを控える。以下では /dev/video0 を使用

# 2. 新しいサーボに ID を書き込む（新しく組み立てたアームのみ必要）
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0

# 3. キャリブレーション
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower

# 4. キーボードで動くか試す
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard

# 5. データを 10 エピソード録る
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=keyboard \
  --dataset.repo_id=<あなたのユーザー名>/my-first-dataset \
  --dataset.num_episodes=10 --dataset.single_task="pick up the cube"

# 6. トレーニング
lerobot-train --policy.type=act --dataset.repo_id=<あなたのユーザー名>/my-first-dataset

# 7. アームを自律実行させる
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<あなたのユーザー名>/my-first-dataset --strategy.type=base
```

---

## 検証状況

本ページのコマンドはすべて JetPack 7.2 の `chenyang310/xlerobot:jetson` イメージ内で**実際に実行済み**です：

| 項目 | 結果 |
|---|---|
| 原版 `--robot.type` 14 種の引数解析 | ✅ 成功 |
| `--teleop.type`（`keyboard` を含む）の引数解析 | ✅ 成功 |
| `lerobot-calibrate` 全フロー | ✅ シリアルポートを開くところまで到達（当時サーボは未接続） |
| `lerobot-teleoperate --teleop.type=keyboard` 全フロー | ✅ 同上 |
| `lerobot-find-cameras opencv` | ✅ **実ハードウェア**：`/dev/video0` を認識し、画像キャプチャに成功 |
| `--robot.cameras` のネスト構文の解析 | ✅ 成功 |
| 原版ロボットと XLeRobot の**同一プロセス内での共存** | ✅ 8 つのタイプが同時に登録成功 |

ロボットアームを接続していないため、**動作レベルの検証はまだ行っていません**。SO-101 を接続した後、第 12 節の手順で一度実行してみてください。
どこかのステップがうまくいかない場合は教えてください。

---

> **次へ：**[troubleshooting/](../troubleshooting/01-Troubleshooting.md) —— 問題が起きたらここを確認
