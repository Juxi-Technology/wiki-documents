---
title: "ステップ6:教示によるデータセット収集"
description: "プレースホルダーの置き換えからカメラ1台と2台での収集、収録中の操作方法、保存先まで、教示によるデータセット収集の流れを説明します。"
---

# ステップ6:教示によるデータセット収集

## コマンド内のプレースホルダーは、先にご自身の情報へ置き換えてください

チュートリアルでは汎用的な操作手順を記載しているため、この手順からはコマンド内で2つのプレースホルダーを使用します。これらはあなただけが持つ情報を表しています。以下の説明に従って置き換えてください。置き換える際は**山括弧ごと削除してください**：

| プレースホルダー | それが表すもの | 置き換え方 |
|---|---|---|
| `<あなたのユーザー名>` | お使いのパソコンのシステムユーザー名、つまりホームディレクトリの名称 | ターミナルで `whoami` を入力すると確認できます |
| `<ユーザー名>` | あなたの HuggingFace アカウント名 | HuggingFace にログイン後、右上のアバター横のアカウント名を確認します |

例を挙げます。ターミナルの `whoami` の出力が `zhangsan` で、あなたの HuggingFace アカウント名も `zhangsan` だとすると、

- `/Users/<あなたのユーザー名>/.cache/huggingface/lerobot/<ユーザー名>/` は `/Users/zhangsan/.cache/huggingface/lerobot/zhangsan/` と記述します
- `<ユーザー名>/lerobot_my_dataset_a` は `zhangsan/lerobot_my_dataset_a` と記述します

> 以降のすべてのコマンドに含まれるこの2つのプレースホルダーも、同じ方法で置き換えてください。

> **注意**：以下の最初のコマンドは `sudo rm -rf` で、ディレクトリを削除するものです。パスがご自身のものに置き換わっていることを必ず確認してから、Enter キーを押してください。

## 以前から存在する同名のデータセットを削除する（ある場合）

```Shell
sudo rm -rf /Users/<ユーザー名>/.cache/huggingface/lerobot/<ユーザー名>/lerobot_my_dataset_a
```

## カメラ1台でデータセットを収集する-Macコンピューター

```Shell
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true \
    --dataset.repo_id=<ユーザー名>/lerobot_my_dataset_a \
    --dataset.num_episodes=40 \
    --dataset.single_task="Grab Oranges" \
    --dataset.push_to_hub=false \
    --dataset.episode_time_s=10 \
    --dataset.reset_time_s=2
```

## カメラ2台でデータセットを収集する-Macコンピューター

```Shell
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}, side: {type: opencv, index_or_path: 1, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true \
    --dataset.repo_id=<ユーザー名>/lerobot_my_dataset_a \
    --dataset.num_episodes=40 \
    --dataset.single_task="Grab Oranges" \
    --dataset.push_to_hub=true \
    --dataset.episode_time_s=10 \
    --dataset.reset_time_s=2
```

## 収集中

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording/1.jpg)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-Teaching-and-Recording/2.jpg)

キーボードの方向キー操作：
→（右矢印）現在のepisodeを途中で終了し、次のepisodeに進みます。
←（左矢印）現在のepisodeをキャンセルし、録り直します。
ESCで即座に停止し、動画をエンコードして、データセットをアップロードします。

## 収集完了後、データセットの保存ディレクトリ

```Shell
/Users/<ユーザー名>/.cache/huggingface/lerobot/<ユーザー名>/lerobot_my_dataset_a
```

## 握手

```Shell
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=/dev/tty.usbmodem5AAF2193061 \
    --robot.id=my_follower_arm \
    --robot.cameras="{ front: {type: opencv, index_or_path: 0, width: 1280, height: 720, fps: 30, fourcc: "MJPG"}}" \
    --teleop.type=so101_leader \
    --teleop.port=/dev/tty.usbmodem5AAF2194741 \
    --teleop.id=my_leader_arm \
    --display_data=true \
    --dataset.repo_id=<ユーザー名>/lerobot_my_dataset_shake_hands \
    --dataset.num_episodes=30 \
    --dataset.single_task="Shanke Hands" \
    --dataset.push_to_hub=false \
    --dataset.episode_time_s=12 \
    --dataset.reset_time_s=1
```

収集完了後、握手のデータセットは以下に保存されます：

```Shell
/Users/<ユーザー名>/.cache/huggingface/lerobot/<ユーザー名>/lerobot_my_dataset_shake_hands
```

## チュートリアルで使用する2つのデータセットについて

本記事では2つのタスクを例示しており、それぞれ用途が異なります：

- **オレンジをつかむ `lerobot_my_dataset_a`**：前述の「カメラ1台」「カメラ2台」の2つの収集コマンドに対応し、[ローカルUbuntuトレーニング](/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/Local-Ubuntu)の記事で使用されている例でもあります
- **握手 `lerobot_my_dataset_shake_hands`**：上記の「握手」コマンドに対応します。第七步のトレーニングから第八步のデプロイまで、チュートリアルでは一貫してこれを例として使用しているため、トレーニングコマンド内の `--dataset.repo_id` と `--dataset.root` がどちらもこれを指していることがわかります

つまり、**握手のデータセットこそが後半のチュートリアルのメインの例**であり、これに従って収集してください。なお、コマンド内の `--dataset.num_episodes=30`、`--dataset.episode_time_s=12` といったパラメータは、ご自身のタスクに合わせて調整してください。

## 収集時に注意すべき点

- リーダーアーム（Leader）が画面に映らないようにしてください。さもないとモデルがリーダーアームも特徴として学習してしまいます。詳しくは[データセット収集の注意事項](/ja/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/Collection-Notes)を参照してください
- 毎回の収集が終わったら、物体を開始位置に戻してください。動作はできるだけ一定に保ち、データセットは量よりも一貫性の方が重要です
- **収集時と推論時のカメラパラメータ（解像度、fps、アスペクト比）は完全に一致させる必要があります**。解像度はデータセットのメタデータに書き込まれ、トレーニング時と推論時に検証されるため、一致しないと直接エラーになります。たとえエラーにならなくても、解像度が異なれば視野（撮影範囲）も異なることを意味し、モデルが見る世界とあなたが教示したときの世界が一致しなくなります。本チュートリアルでは統一的に `1280×720@30` を使用しており、別の値に変更したい場合は、収集・テレオペレーション・デプロイの3か所のコマンドをまとめて変更する必要があります
- 途中で終了する際は reset 段階で止めないでください。そうしないと、この回はフレームが1つもないために保存に失敗します（すでに収集したデータには影響しません）
- 途中で終了した後に続けて収集したい場合は、`--resume=true` を使用し、さらに `--dataset.root` と `--dataset.repo_id` を最初のときと完全に一致させてください

## 収集完了後

データはデフォルトで `~/.cache/huggingface/lerobot/<ユーザー名>/` の下に保存されます。次に：

1. データセットをクラウドにバックアップしたい場合は、[データセットをHuggingFaceにアップロードする（任意）](/ja/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload)を参照してください
2. トレーニングを始める準備ができたら、続けて[第七步：モデルのトレーニング](/ja/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU)をご覧ください。その記事では、まずクラウドGPUプラットフォームにデータをアップロードし、環境を構築します

<RelatedProducts slugs="so-arm101" />
