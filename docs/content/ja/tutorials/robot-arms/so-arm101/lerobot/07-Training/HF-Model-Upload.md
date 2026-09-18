---
title: "ステップ7:モデルをHuggingFaceにアップロード（任意）"
description: "訓練時の自動アップロードと訓練後の手動アップロードの両方を、チェックポイントの指定や読み込み方法も含めて説明します。"
---

# ステップ7:モデルをHuggingFaceにアップロード（任意）

> この手順は任意です。モデルは訓練が終わるとあなたのパソコンまたはクラウドGPUインスタンス上に保存され、そのまま推論に使っても全く問題ありません。**モデルのバックアップ、別のマシンでの推論、またはモデルを他の人と共有**したい場合にのみ、HuggingFace にアップロードする必要があります。

## コマンド内のプレースホルダー

本記事は前の章のプレースホルダーの書き方に従っています。ご自身の情報に置き換えてください。置き換える際は**山括弧ごと削除してください**：

- `<用户名>`：あなたの HuggingFace アカウント名
- `<你的用户名>`：あなたのパソコンのシステムユーザー名。ターミナルで `whoami` を入力すると確認できます

## 方法一：訓練時に自動アップロード

訓練コマンドに2行のパラメータを追加すると、訓練終了時に自動でモデルがアップロードされます：

```Shell
  --policy.push_to_hub=true \
  --policy.repo_id=<用户名>/shake_act_a \
```

**この2行は必ずペアで記述する必要があり、`push_to_hub=true` だけを書くとエラーになります。** `repo_id` はこのモデルに付けるリポジトリ名で、`账号名/模型名` の形式です。リポジトリが存在しない場合、LeRobot が自動的に作成します。

例えば ACT の完全なコマンドは次のようになります：

```Shell
lerobot-train \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=act \
  --output_dir=~/output_lerobot_train/shake/act/ \
  --job_name=shake_act_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=true \
  --policy.repo_id=<用户名>/shake_act_a \
  --steps=20000 \
  --batch_size=8
```

前の節の説明のとおり、このバージョンの訓練が完了すると、モデルは `https://huggingface.co/<用户名>/shake_act_a` に表示されます。

### 中間のチェックポイントも一緒にアップロードしたい場合

訓練中、`save_freq`（デフォルト 20000 ステップ）ごとにチェックポイントが保存されます。これらの途中のチェックポイントもアップロードしたい場合（例えば訓練に長時間かかり、途中のモデルをいつでも取り出して使いたい場合）は、次の行を追加します：

```Shell
  --policy.save_checkpoint_to_hub=true \
```

アップロード時に各チェックポイントにはステップ数と同じ名前のタグ（例えば `010000`）が付けられます。後でモデルをロードする際にこのタグを指定すると、対応するステップ数のバージョンを取得できます。詳細は後述の「アップロードしたモデルのロード」を参照してください。

### いくつかの任意パラメータ

必要に応じて追加してください：

| パラメータ | 説明 |
|---|---|
| `--policy.private=true` | リポジトリを非公開にする。他の人からは見えません |
| `--policy.tags=act,so101` | モデルにタグを付けて検索しやすくする |
| `--policy.license=mit` | オープンソースライセンスを指定する |

## 方法二：訓練完了後の手動アップロード

こちらがより一般的な方法です：訓練時は通常どおり `--policy.push_to_hub=false` と書き、訓練が終わって効果に満足したことを確認してから、手動でモデルをアップロードします。

### 1. ログイン

Token を連携済みならスキップできます。未連携の場合は[登録Hugging Faceアカウント（任意）](/ja/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account)を参照してください。

```Shell
hf auth login
hf auth whoami
```

### 2. アップロード

ACT の訓練の出力ディレクトリが `~/output_lerobot_train/shake/act/` であると仮定します：

```Shell
export HF_USER=<用户名>

hf upload ${HF_USER}/shake_act_a \
  ~/output_lerobot_train/shake/act/checkpoints/last/pretrained_model
```

モデルリポジトリは事前に作成する必要はありません。`hf upload` はリポジトリが存在しないと自動的に作成します。

### 3. 指定したステップ数のチェックポイントをアップロード

最後のものではなく、ある中間チェックポイントだけをアップロードしたい場合：

```Shell
CKPT=005000
hf upload ${HF_USER}/shake_act_a_${CKPT} \
  ~/output_lerobot_train/shake/act/checkpoints/${CKPT}/pretrained_model
```

### 4. Webページでアップロード

モデルが大きくなく、コマンドを入力したくない場合は、HuggingFace のWebページで直接操作することもできます：新しい Model リポジトリを作成し、`pretrained_model` ディレクトリ内のファイルをドラッグして入れるだけです。

## アップロードしたモデルのロード

モデルをアップロードしたら、デプロイ時に `--policy.path` をそれを指すようにするだけです。事前にローカルへダウンロードする必要はありません：

```Shell
  --policy.path=<用户名>/shake_act_a \
```

これはローカルパスを指すよりも便利で、パソコンを変えても、あるいは他の人があなたのアカウント名さえ知っていれば直接使えます。HuggingFace からモデルを取得するにはそのサーバーに接続できる必要がある点に注意してください。中国国内のネットワーク環境では、先に[登録Hugging Faceアカウント（任意）](/ja/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account)に従ってミラーを設定することをおすすめします。

複数のチェックポイントをアップロードした場合、どれを使うか指定したいときはバージョン番号を追加します：

```Shell
  --policy.pretrained_revision=005000 \
```

`005000` はアップロード時のそのチェックポイントのステップ数です。

## 説明

- モデルのリポジトリ名（`repo_id`）は訓練コマンド内の `--output_dir`、`--job_name` とは関係がなく独立しています。分かりやすい名前を付ければよいです
- チュートリアル内のすべての訓練コマンドは `--policy.push_to_hub=false` と書かれています。自動アップロードを使いたい場合は、この行を `true` に変更し、`--policy.repo_id` を追加してください。両方とも欠かせません

<RelatedProducts slugs="so-arm101" />
