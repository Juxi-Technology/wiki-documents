---
title: トラブルシューティングと早見表
---

# トラブルシューティングと早見表

> **所属**：[troubleshooting/](01-Troubleshooting.md)
> **関連**：[deployment/](../deployment/01-Overview.md) ·
> [xlerobot/](../xlerobot/01-Operation.md) ·
> [lerobot/](../lerobot/01-Operation.md)

---

## よくある問題

### コンテナ内でロボットのシリアルポートが見えない

```bash
# ホストマシン上でデバイスの存在を確認
ls /dev/ttyACM*
# ユーザーが dialout グループに所属しているか確認
groups | grep dialout
```

グループにいない場合は `sudo usermod -aG dialout $USER` を実行してから**再ログイン**してください。

### イメージの取得が止まる / タイムアウトする

ミラーアクセラレータが未設定です。[02-Environment-Setup](../deployment/02-Environment-Setup.md) の第 2 節を参照してください。

### モデルのダウンロードに失敗する / huggingface に接続できない

`-e HF_ENDPOINT=https://hf-mirror.com` を設定してください。
[02-Environment-Setup](../deployment/02-Environment-Setup.md) の第 4 節を参照してください。

### rerun の可視化ウィンドウがクラッシュする

```
thread 'main' panicked at 'Library libxkbcommon-x11.so could not be loaded.'
```

X11 ライブラリが不足しています。**ロボット本体には影響しません**が、ウィンドウが見えなくなります。
ライブラリのインストールコマンドと注意事項は [xlerobot/](../xlerobot/01-Operation.md) の第 1 節を参照してください——
ポイントは `docker exec` に**必ず `-u root` を付けること**です。

### コンテナ内で `torch.cuda.is_available()` が False になる

- `cpu` / `cpu-slim` イメージを使用している → 正常です。これらのバージョンにはそもそも GPU がありません
- `jetson` イメージを使用している → `--runtime nvidia` を使用していないか確認してください
  （**`--device nvidia.com/gpu=all` が必須です**）。あわせて CDI 仕様が生成されているかも確認してください

### コンテナが起動せず、CDI エラーが出る

```
CDI device injection failed: failed to stat CDI host device "/dev/dri/card0"
```

ホストマシン上の自動リフレッシュサービスが、存在しない `card0` を参照する仕様を生成しています。修正方法：

```bash
sudo systemctl disable --now nvidia-cdi-refresh.path nvidia-cdi-refresh.service
sudo rm -f /var/run/cdi/nvidia.yaml
sudo systemctl restart docker
```

（この問題は私たちのボードでは再起動のたびに再現します。詳細は
developer/03-Board-Remote-Testing.md を参照してください。）

### キャリブレーションを毎回やり直すことになる

キャリブレーションファイルはコンテナ内に保存されるため、コンテナを削除すると失われます。起動時にキャッシュディレクトリをマウントしてください：

```bash
-v ~/.cache/huggingface:/home/jetson/.cache/huggingface
```

`scripts/run.sh` はすでにこれを行っています。

### キャリブレーションコマンドで `invalid choice: 'xlerobot'` が報告される

故障ではなく、仕様です。`lerobot-calibrate` のコマンドラインツールは XLeRobot をサポートしておらず、
キャリブレーションはサンプルスクリプト内で自動的に開始されます。[xlerobot/](../xlerobot/01-Operation.md) の第 0・3 節を参照してください。

### データセット操作時に torchcodec のエラーが大量に表示される

イメージではなく**自分でインストールした**環境を使用している場合、
`libnvrtc.so.13: cannot open shared object file` が表示されることがあります。これは torchcodec が純 CPU
環境では読み込めないためで、lerobot が自動的に pyav にフォールバックし、機能には影響しません。
イメージではすでに削除済みのため、このエラーは発生しません。

### コンテナ内でロボットのバリアントを 2 つ `import` するとエラーになる

```
Cannot register ... as xlerobot because ... is already registered
```

これは **`xlerobot` と `xlerobot_mecanum` の組み合わせ**でのみ発生します——両者はソースコード内で
どちらも `"xlerobot"` として登録されるためです（mecanum 側の設定はコピーして作られており、登録名は変更されていません）。
これは XLeRobot 上流のバグです。

**それ以外の組み合わせは競合しません**：原版 LeRobot のすべてのロボット + XLeRobot は**同一プロセス内で共存できます**
（実測で 8 つのタイプが同時に登録成功）。`xlerobot_2wheels` も競合しません。

1 台のロボットには 1 つのバリアントしか使用しないため、実際の使用には影響しません。どうしても同時に使いたい場合（比較スクリプトを書く場合など）は、
プロセスを分けて実行してください。

---

## 原版 `lerobot-*` コマンドを使うときの問題

### `lerobot-record` でカメラ関連のエラーが出る / 録ったデータに画像がない

カメラは `--robot.cameras` で**ネストされた辞書**として渡す必要があり、独立したトップレベルのパラメータではありません：

```bash
--robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }"
```

`index` ではなく `index_or_path` であることに注意してください。`front` はカメラの名前で、複数指定できます。
完全な例は [lerobot/](../lerobot/01-Operation.md) の第 6 節を参照してください。

### `lerobot-eval` が実機では動作しない

`lerobot-eval` は**シミュレーションベンチマーク**用です（`--env.type=aloha/pusht/libero/metaworld...`）。
**実機デプロイツールではありません**。

実機でトレーニング済みポリシーを実行するには **`lerobot-rollout`** を使用します：

```bash
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<あなたのユーザー名>/<モデル名> --strategy.type=base
```

### `examples/` と `lerobot-*` のどちらを使うべきか分からない

| お使いのハードウェア | 使うもの |
|---|---|
| XLeRobot 本体（両腕 + 台車） | `examples/` スクリプト → [xlerobot/](../xlerobot/01-Operation.md) |
| 単腕の SO-101 / SO-100 アーム、LeKiwi | `lerobot-*` コマンドライン → [lerobot/](../lerobot/01-Operation.md) |

判断は簡単です：`lerobot-*` のロボットのホワイトリストに**`xlerobot` がありません**（完全なリストは
[lerobot/](../lerobot/01-Operation.md) の第 11 節を参照）。

### `--robot.type` を渡したのに `invalid choice` が報告される

[lerobot/](../lerobot/01-Operation.md) の第 11 節の完全なリストと照らし合わせてください——
使用できるのはあの原版 14 種のみです。`xlerobot` は含まれていないため、`examples/` 配下のスクリプトを使用してください。

---

## 早見表

### 共通（両方に必要）

```bash
# イメージを取得
docker pull chenyang310/xlerobot:cpu-slim

# 起動（汎用）
bash scripts/run.sh cpu

# 起動（Jetson、GPU 付き）
bash scripts/run.sh jetson

# コンテナに入った後 —— 初回セットアップ
lerobot-find-port                     # シリアルポートを探す（対話式。プロンプトに従ってサーボケーブルを抜き挿し）

# rerun に必要な X11 ライブラリを 2 つインストール（別のターミナルで。-u root は省略不可）
docker exec -u root -it xlerobot bash -c "apt-get update && apt-get install -y libxkbcommon-x11-0 libxinerama1"

# トレーニング（2 つのルートで共用：robot.type は不要）
lerobot-train --policy.type=act --dataset.repo_id=<あなたのユーザー名>/<データセット名>

# セルフチェック
python -c "import torch, lerobot; print(torch.__version__, lerobot.__version__)"
python -c "import torch; print('GPU:', torch.cuda.is_available())"
```

### A · XLeRobot 本体（両腕 + 台車）

```bash
# テレオペレーション：ターミナル 1 つで十分。初回は自動でキャリブレーションガイドに入る
python examples/4_xlerobot_teleop_keyboard.py

# 2 輪台車版
python examples/4_xlerobot_2wheels_teleop_keyboard.py

# ⚠️ lerobot-calibrate / lerobot-record / lerobot-teleoperate に xlerobot を渡さないこと。
#    ホワイトリストにないため、invalid choice が報告されるだけです。XLeRobot は examples/ 配下のスクリプトを使用します。
```

詳細は [xlerobot/](../xlerobot/01-Operation.md) を参照してください。

### B · 単腕 SO-101 / LeKiwi（`lerobot-*` コマンドライン）

```bash
# デバイスを探す
lerobot-find-port
lerobot-find-cameras opencv

# 新しいサーボに ID を書き込む（新しく組み立てたアームのみ必要）
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0

# キャリブレーション
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower

# テレオペレーション（キーボード。リーダーアーム不要）
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard

# データセットを録る
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=keyboard \
  --dataset.repo_id=<あなたのユーザー名>/<データセット名> --dataset.num_episodes=10 \
  --dataset.single_task="pick up the cube"

# リプレイで確認
lerobot-replay --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --dataset.repo_id=<あなたのユーザー名>/<データセット名> --dataset.episode=0

# トレーニング済みポリシーを実機にデプロイ（⚠️ lerobot-eval ではありません。あれはシミュレーション用）
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<あなたのユーザー名>/<モデル名> --strategy.type=base
```

詳細は [lerobot/](../lerobot/01-Operation.md) を参照してください。

### キー操作早見表

| 部位 | キー | 動作 |
|---|---|---|
| 台車 | `i` `k` `j` `l` | 前 / 後 / 左 / 右 |
| 台車 | `u` `o` `n` `m` | 左旋回 / 右旋回 / 加速 / 減速 |
| 台車 | `b` | 終了 |
| 左腕 | `q/e` `w/s` `a/d` `z/x` | pan / x / y / pitch |
| 左腕 | `r/f` `t/g` `c` `y` | wrist / グリッパー / ゼロ位置に戻す / 矩形軌道 |
| 左腕 | `<` `>` `,` `.` | 頭部サーボ 1 / 2 |
| 右腕 | `7/9` `8/2` `4/6` `1/3` | pan / x / y / pitch |
| 右腕 | `/` `*` `+` `-` `0` | wrist / グリッパー / ゼロ位置に戻す |
| 右腕 | `Y`（**大文字**） | 矩形軌道 |
| その他 | `?` | 頭部をゼロ位置に戻す |

完全な説明は [xlerobot/](../xlerobot/01-Operation.md) の第 4 節を参照してください。

---

## 付録：このチュートリアルで触れた事柄がこうなっている理由

| 決定事項 | 理由 |
|---|---|
| Python 3.12 が必須 | lerobot 0.6.2 は PEP 695 構文（`type X = ...`、`class Foo[T]:`）を使用しており、3.10/3.11 ではコンパイルすら通らない |
| 中国本土ではミラーアクセラレータの設定が必須 | Docker Hub への直接接続はタイムアウトし、実測で `context deadline exceeded` が発生 |
| HF_ENDPOINT の設定が必須 | `huggingface.co` は中国本土からは完全に到達不可で、`hf-mirror.com` は到達可能 |
| Jetson では `--runtime nvidia` ではなく CDI を使用 | JetPack 6/7 の cgroup v2 環境では `--runtime nvidia` がデバイスノードを注入しない |
| placo 運動学ライブラリをインストールしない | cp312/aarch64 向けのホイールが存在しない。XLeRobot は自前の解析的 IK を使用しており、依存していない |

より詳しい技術的詳細は developer/01-Jetson-Environment.md を参照してください。

---

## 関連リンク

- [XLeRobot プロジェクト](https://github.com/Vector-Wangel/XLeRobot)
- [LeRobot 公式ドキュメント](https://huggingface.co/docs/lerobot)
- [Docker Hub の使用量と制限](https://docs.docker.com/docker-hub/usage/)
- [Juxi Technology Wiki](https://wiki.juxitech.com)

---

> **最初に戻る**：[01-Overview](../deployment/01-Overview.md)
> **もう一つのルート**：[xlerobot/](../xlerobot/01-Operation.md) ·
> [lerobot/](../lerobot/01-Operation.md)
