---
title: "ステップ2:ファイルの置き換え（7DOF 対応）"
description: "公式lerobotクローンを7DOF版にするため、本リポジトリのコードを使う方法Aと手動置き換えの方法B、バージョン不一致時の手動変更2か所を説明します。"
---

# ステップ2:ファイルの置き換え（7DOF 対応）

## 1\. 公式コードリポジトリからクローンした場合、置き換え/変更が必要なファイル

### 方法 A：本リポジトリのコードをそのまま使用（推奨）

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### 方法 B：公式 lerobot を git clone して手動で置き換え

本リポジトリから公式クローンの**3 つのファイル**を上書きします：

|本リポジトリのファイル（コピー元）|上書き先（コピー先）|
|---|---|
|`src/lerobot/robots/so_follower/so_follower.py`|公式クローンの同名ファイル|
|`src/lerobot/teleoperators/so_leader/so_leader.py`|公式クローンの同名ファイル|

[so\_follower\.py](/downloads/so_follower.py)

[so\_leader\.py](/downloads/so_leader.py)

> 前提：お使いの公式クローンが本リポジトリのベースライン（lerobot 2026\-09 版）と構造が一致していること。
> 
> バージョンの差が大きい場合は、**ファイル全体を上書きせず**、以下の「手動変更」の 2 か所のみ変更してください。
> 
> 

### バージョン不一致時の手動変更（2 か所のみ）

**① モーター辞書**（`so_follower.py` と `so_leader.py` に各 1 か所、内容は同じ）——元のコード：

```Python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_roll": Motor(5, "sts3215", norm_mode_body),
"gripper": Motor(6, "sts3215", MotorNormMode.RANGE_0_100),
```

を次のように変更します

```Python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_yaw": Motor(5, "sts3215", norm_mode_body),   # サーボを追加、左右回転
"wrist_roll": Motor(6, "sts3215", norm_mode_body),  # 元の 5 番のロールモーター、ID 5→6
"gripper": Motor(7, "sts3215", MotorNormMode.RANGE_0_100),
```

**② キャリブレーションロジック**（両ファイルそれぞれの `calibrate()`）——「全周回転関節」の特例判定を削除します。元のコード：

```Python
full_turn_motor = "wrist_roll"
unknown_range_motors = [motor for motor in self.bus.motors if motor != full_turn_motor]
range_mins, range_maxes = self.bus.record_ranges_of_motion(unknown_range_motors)
range_mins[full_turn_motor] = 0
range_maxes[full_turn_motor] = 4095
```

これを 1 行に置き換え、すべての関節の実際の可動範囲を記録するようにします：

```Python
range_mins, range_maxes = self.bus.record_ranges_of_motion()
```

> 理由：オリジナルのコードは `wrist_roll`（前腕軸まわりのロール）を全周回転（0\~4095）できる関節として全範囲をハードコードしていました。7\-DOF 改造後は 5/6 番の手首関節（yaw / roll）**はいずれも機械的リミットがあり、全周回転はできません**。全周回転をハードコードすると、コードが機械的に到達できない角度へ関節指令を送ってしまい、破損のリスクがあります。現在はキャリブレーション時に、各モーターの実際の min/max を手動で記録します。
> 
> 

### デュアルフォロワーについて

`bi_so_follower` / `bi_so_leader`（`src/lerobot/robots/bi_so_follower/`、`src/lerobot/teleoperators/bi_so_leader/`）は、シングルアームを `left_`/`right_` プレフィックス付きでラップするだけで、**モーター定義は含みません**。**上記のシングルアームのファイル**を正しく変更すれば、デュアルアームのコマンド（`--robot.type=bi_so_follower`）は自動的に 7\-DOF になります。

