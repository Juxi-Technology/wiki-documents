---
title: XLeRobot の実行コマンド
---

# XLeRobot の実行コマンド

> **所属**：[xlerobot/](01-Operation.md) —— XLeRobot 本体（両腕 + 台車）
> **前提**：[deployment/](../deployment/01-Overview.md) を先に読み終え、コンテナ内に入っていること
> **もう一つのルート**：[lerobot/](../lerobot/01-Operation.md)（単腕の SO-101 アーム / LeKiwi）
> **次へ**：[troubleshooting/](../troubleshooting/01-Troubleshooting.md)

🎯 **このページでは XLeRobot 本体（両腕 + 台車）の操作方法だけを説明します。**

`lerobot-*` コマンドラインで**単腕の SO-101 / SO-100 アーム**や **LeKiwi** を操作する場合は、
[lerobot/](../lerobot/01-Operation.md) を参照してください——ルートが異なります。

本ページの内容：キャリブレーション、テレオペレーション、キー操作表、データ記録、トレーニング、推論。

---

## 0. まずルートを選ぶ ⚠️

イメージには**2 つのプロジェクト**が入っており、実行方法が異なります。**まずこの表を見て、進むルートを決めてください**：

| お使いのハードウェア | 進むルート | 入り口 |
|---|---|---|
| **XLeRobot 本体**（両腕 + 台車） | ✅ **本ページ** | `examples/` 配下のサンプルスクリプト |
| **単腕の SO-101 / SO-100 アーム** | ➡️ [lerobot/](../lerobot/01-Operation.md) | `lerobot-*` コマンドライン |
| **LeKiwi** | ➡️ [lerobot/](../lerobot/01-Operation.md) | `lerobot-*` コマンドライン |

**なぜ 2 つのルートに分かれているのか**：`lerobot-calibrate`、`lerobot-record`、`lerobot-teleoperate`
といったコマンドラインツールは、**明示的にインポートしているロボットタイプしか認識しません**（原版ロボット 14 種のみで、**`xlerobot` はありません**）。
無理に渡すと次のエラーが出ます：

```
lerobot-calibrate: error: argument --robot.type: invalid choice: 'xlerobot'
```

**XLeRobot の入り口は `examples/` 配下のサンプルスクリプトです**（これらは `XLerobot` を直接 import しています）。

2 つのルートは**同じ環境を共有しています**——いつでも切り替えられ、何もインストールし直す必要はありません。

> サンプルファイルには host/client の 2 プロセス構成の使い方が書かれていますが、**その部分はコメントアウトされています**。
> 実際に実行されるのは**直結モード**です——ターミナル 1 つで十分で、host を別途起動する必要はありません。

---

## 1. 初めてテレオペレーションを実行する前に：X11 ライブラリを 2 つインストール ⚠️

イメージには X11 ライブラリが 2 つ不足しています。**インストールしないと rerun の可視化ウィンドウがクラッシュします**：

```
Failed loading libxkbcommon-x11.so.0
thread 'main' panicked at 'Library libxkbcommon-x11.so could not be loaded.'
```

**ロボット本体には影響しません**（テレオペレーションは通常どおり動作し、キーも反応します）。ただ可視化ウィンドウが見えないだけでなく、
rerun のデータチャンネルが詰まって WARN を出し続け、テレオペレーションが遅くなります。

**別のターミナルを開いて**コンテナにインストールします：

```bash
docker exec -u root -it xlerobot bash -c "apt-get update && apt-get install -y libxkbcommon-x11-0 libxinerama1"
```

⚠️ **`-u root` は省略できません**——イメージはデフォルトで `jetson` ユーザーとして動作し、`docker exec` で入った場合も
デフォルトで同じユーザーになりますが、apt パッケージのインストールには root 権限が必要です。このパラメータを忘れると次のエラーが出ます：

```
E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock — are you root?
```

しかも**パッケージは静かにインストールに失敗し**、rerun は相変わらずクラッシュするため、「インストールしたのに効かない」と誤解しやすくなります。

インストール後は**テレオペレーションスクリプトを再起動**してください（`Ctrl+C` で終了して再実行）。

> ⚠️ この変更は**今回の実行中にのみ有効です**——コンテナは `--rm` なので、終了すると消えます。
> そのため、コンテナを開き直すたびにインストールし直す必要があります。

---

## 2. シリアルポートの確認

```bash
lerobot-find-port
```

サーボケーブルを抜いてから挿し直すよう促され、その後シリアルポート名（例：`/dev/ttyACM0`）が表示されます。

> このコマンドは**対話式**です。`--help` を直接実行すると EOF エラーになりますが、正常な動作です。

**XLeRobot はシリアルポートを 2 つ使用します**（設定の `port1` と `port2` に対応）：

| パラメータ | デフォルト値 | 接続先 |
|---|---|---|
| `port1` | `/dev/ttyACM0` | SO-101 両腕 + ヘッドカメラ |
| `port2` | `/dev/ttyACM1` | 台車（ホイール）関連のサーボ |

両方とも見つける必要があります。デフォルト値は `/dev/ttyACM0` と `/dev/ttyACM1` です。**実際の値が異なる場合は、
以降の各コマンドで `--robot.port1=` / `--robot.port2=` を指定する必要があります**（第 6 節参照）。

---

## 3. キャリブレーション：サンプル実行時に自動で開始、単独のコマンド実行は不要

⚠️ **`lerobot-calibrate --robot.type=xlerobot` は使用しないでください**。あのコマンドラインツールは明示的に
インポートしている一部のロボット（so100/so101/lekiwi など）しか認識せず、XLeRobot の設定**はそのリストにありません**。
`invalid choice: 'xlerobot'` が報告されます。

XLeRobot のキャリブレーション**は `XLerobot.connect()` に組み込まれています**。任意のサンプルを実行すると自動的に始まります：

```bash
cd /opt/xlerobot
python examples/4_xlerobot_teleop_keyboard.py
```

**何が行われるか：**

- **キャリブレーションファイルがない場合** → 自動的にガイド付きキャリブレーションに入ります：
  1. 「左腕と頭部のサーボを可動範囲の中点に移動し、Enter を押す」と表示
  2. 続けて「各関節を順に可動範囲の端から端まで動かし、Enter で停止」と表示
  3. 右腕と台車も同様
- **キャリブレーションファイルがある場合** → Enter でキャリブレーションを復元するか、`c` を入力して再キャリブレーションするかを聞かれます

キャリブレーションファイルの保存先：

```
~/.cache/huggingface/lerobot/calibration/robots/xlerobot/<id>.json
```

**このディレクトリはホストマシンにマウントする必要があります**。そうしないと、コンテナを開き直すたびに再キャリブレーションになります：

```bash
-v ~/.cache/huggingface:/home/jetson/.cache/huggingface
```

> XLeRobot 全体ではなく、SO-101 アーム単体だけをキャリブレーションしたい場合は、元のコマンドが使用できます。
> `so101_follower` タイプは CLI のホワイトリストに入っています：
> ```bash
> lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_arm
> ```

> 一部のサンプル（例：`examples/0_so100_keyboard_joint_control.py`）は、
> 上記のフローではなく**コード内に直接書かれたキャリブレーション係数**を使用します。どちらが使用されるかはロボットの
> バリアントと使用するサンプルによって異なります——まず該当サンプルファイル冒頭のコメントを確認してください。

---

## 4. テレオペレーション

**ターミナル 1 つで十分です**（サンプルは直結モードで、host を別途起動する必要はありません）：

```bash
cd /opt/xlerobot
python examples/4_xlerobot_teleop_keyboard.py
```

**初回実行時は自動的にキャリブレーションガイドに入ります**（キャリブレーションコマンドを単独で実行する必要はありません）：

1. `Move left arm and head motors to the middle of their range of motion and press ENTER....`
   → 左腕と頭部のサーボを可動範囲の中間に合わせ、**Enter を押す**
2. `Move all left arm and head joints sequentially through their entire ranges of motion...`
   → 各関節を端から端まで順に動かし、**Enter で終了**
3. 右腕と台車も同様

以降、キャリブレーションファイルがある場合は、Enter で復元するか、`c` を入力して再キャリブレーションするかを聞かれます。

### キーマッピング

**台車**

| キー | 動作 |
|---|---|
| `i` / `k` | 前進 / 後退 |
| `j` / `l` | 左移動 / 右移動 |
| `u` / `o` | 左旋回 / 右旋回 |
| `n` / `m` | 加速 / 減速（3 段階） |
| `b` | プログラムを終了 |

**左腕**

| キー | 関節 |
|---|---|
| `q` / `e` | shoulder_pan（ベース回転）± |
| `w` / `s` | x（前後）± |
| `a` / `d` | y（左右）± |
| `z` / `x` | pitch（ピッチ）± |
| `r` / `f` | wrist_roll（手首回転）± |
| `t` / `g` | gripper（グリッパー）開 / 閉 |
| `c` | ゼロ位置に戻す |
| `y` | 矩形軌道を描く（デモ/テスト用） |
| `<` / `>` | head_motor_1 ± |
| `,` / `.` | head_motor_2 ± |

**右腕**

| キー | 関節 |
|---|---|
| `7` / `9` | shoulder_pan ± |
| `8` / `2` | x（前後）± |
| `4` / `6` | y（左右）± |
| `1` / `3` | pitch（ピッチ）± |
| `/` / `*` | wrist_roll ± |
| `+` / `-` | gripper 開 / 閉 |
| `0` | ゼロ位置に戻す |
| `Y`（**大文字**） | 矩形軌道を描く |

**その他**：`?` → 頭部サーボをゼロ位置に戻す

> 左右の腕は**ミラー**になっています：左は英字キーエリア（`q/e`、`w/a/s/d`）、右はテンキー/数字キーエリア
> （`7/9`、`4/6`、`8/2`、`1/3`）。`reset` キーも異なります——左腕は `c`、右腕は `0`。
> 矩形軌道のキーは左腕が小文字 `y`、右腕が**大文字** `Y` であることに注意してください。

### その他のサンプル

| サンプル | 説明 | 追加インストールが必要か |
|---|---|---|
| `4_xlerobot_2wheels_teleop_keyboard.py` | 2 輪台車版 | 不要（同様に、先に 2 つのライブラリが必要） |
| `5_xlerobot_teleop_xbox.py` | Xbox コントローラー | `pip install "lerobot[gamepad]"` が必要 |
| `7_xlerobot_teleop_joycon.py` | Joy-Con | `joyconrobotics` モジュールがなく、使用不可 |
| `8_xlerobot_teleop_vr.py` | VR | XLeVR ディレクトリの追加マウントが必要 |

---

## 5. デモンストレーションデータの収集

⚠️ `lerobot-record --robot.type=xlerobot` は**使用できません**（第 0 節と同じ理由）。

XLeRobot には VR による記録パスしかなく、それは `XLeVR` モジュールに依存していますが、イメージには含まれていません。

**使用したい場合は自分でスクリプトを書く必要があります**。LeRobotDataset API（ライブラリはイメージ内にあります）を使用します：

```python
from lerobot.datasets.lerobot_dataset import LeRobotDataset

ds = LeRobotDataset.create(
    repo_id="<あなたのユーザー名>/<データセット名>", fps=30,
    features={"observation.state": {"dtype": "float32", "shape": (6,), "names": None},
              "action": {"dtype": "float32", "shape": (6,), "names": None}},
    root="/data/ds")

# テレオペレーションのループ内：
#   ds.add_frame({"observation.state": ..., "action": ..., "task": "pick"})
#   ds.save_episode()

ds.finalize()   # 必ず呼ぶこと。呼ばないとメタデータが保存されない
```

イメージ内の `examples/8_vr_teleop_with_dataset_recording.py` を参考にして、
VR の部分をキーボードテレオペレーションに置き換えてください。

**`-e HF_ENDPOINT=https://hf-mirror.com` を忘れずに追加してください**。そうしないと、データセットの Hub へのプッシュが失敗します。

> データセットを書く際のハマりどころ：`save_episode()` の後は**必ず `ds.finalize()` を呼び出してください**。
> そうしないとエピソードのメタデータがディスクに書き込まれず、後から読み戻せません（
> `Provided directory does not contain any parquet file` が報告されます）。

---

## 6. シリアルポートが ACM0/ACM1 でない場合

サンプルには**argparse がありません**。シリアルポートには `XLerobotConfig()` のデフォルト値が使用されます：

```python
robot_config = XLerobotConfig()
robot = XLerobot(robot_config)
```

ポートを明示的に指定するように変更します：

```python
robot_config = XLerobotConfig(port1="/dev/ttyACM1", port2="/dev/ttyACM2")
robot = XLerobot(robot_config)
```

変更したらそのまま再実行してください（ソースコードはマウントされているため、ホスト側のファイル変更がすぐに反映されます）。

---

## 7. トレーニング済みモデルのデプロイ

ACT ポリシーは**追加の依存関係が不要**で、イメージ内でそのまま使用できます：

```python
from lerobot.policies.act.configuration_act import ACTConfig
from lerobot.policies.act.modeling_act import ACTPolicy

policy = ACTPolicy.from_pretrained("<あなたのユーザー名>/<モデル名>")
policy.eval()

# ロボットを接続したら推論をループ実行
# action = policy.select_action(batch)
```

イメージにすでにプリインストールされているポリシー：

| ポリシー | 依存関係 | 説明 |
|---|---|---|
| **ACT** | なし | 最もよく使われる。実測で使用可能 |
| **Diffusion** | `diffusers` | フル版イメージが必要 |
| SmolVLA / pi0 / groot | transformers | **未プリインストール**。パッケージが大きく、CPU では動作しません |

> 同一プロセス内で**ロボットのバリアントを 2 つ同時に import することはできません**——`xlerobot_mecanum`
> は自分の設定を `"xlerobot"` として登録するため基本版と名前が衝突し、
> `Cannot register ... already registered` が報告されます。1 台のロボットには 1 つのバリアントだけを使用し、
> プロセスを分けて実行すれば問題ありません。

---

## 8. トレーニング

```bash
lerobot-train \
  --policy.type=act \
  --dataset.repo_id=<あなたのユーザー名>/<データセット名>
```

> `lerobot-train` は **`robot.type` を必要としません**（データセットとポリシータイプだけを扱います）。
> そのためこのコマンドは使用でき、第 0 節の制限を受けません。
>
> トレーニングは非常に計算負荷が高いです。CPU では極小規模しか実行できず、実用的には Jetson の GPU が必要です。

---

> **次へ：**[troubleshooting/](../troubleshooting/01-Troubleshooting.md) —— 問題が起きたらここを確認
> **もう一つのルート**：[lerobot/](../lerobot/01-Operation.md)（`lerobot-*` コマンドラインで単腕 / LeKiwi を実行）
