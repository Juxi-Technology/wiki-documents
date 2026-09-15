---
title: SO-ARM101 7-DOF 改造と LeRobot 使用チュートリアル
description: "SO-ARM101 を 7 自由度に改造して LeRobot で使うチュートリアル。サーボ ID 対照表、コードの置き換え、キャリブレーションの注意点を解説します。"
---

# SO-ARM101 7-DOF 改造と LeRobot 使用チュートリアル

> **[ストアで購入](https://www.juxitech.com/ja/products/so-arm101-developers-kit)**

本チュートリアルは、**SO-ARM101 を 6 サーボから 7 サーボに改造**した後、LeRobot で完全な流れ(キャリブレーション → 録画 → 訓練 → デプロイ)を実行したいユーザー向けです。対応する改造版コードは LeRobot 公式ソースを基にコピー・改造したもので、**SO-ARM101 7 自由度ロボットアーム**(7 個の STS3215 サーボ)に対応しています。

**公式 SO-101(6 サーボ)との主な違い:**

| サーボ ID | 関節名 | 公式 SO-101(6-DOF) | 説明 |
| :---: | :--- | :--- | :--- |
| 1 | `shoulder_pan` | shoulder_pan | 肩部の水平回転 |
| 2 | `shoulder_lift` | shoulder_lift | 肩部の持ち上げ |
| 3 | `elbow_flex` | elbow_flex | 肘の屈曲 |
| 4 | `wrist_flex` | wrist_flex | 手首のピッチ(上下の屈曲) |
| 5 | `wrist_yaw` | —(新規追加) | 手首のヨー(左右回転約 90°)、**今回追加するサーボ**(元の 4 番と 5 番の間に挿入) |
| 6 | `wrist_roll` | wrist_roll(ID 5→6) | 手首のロール。元の 5 番ロールモーターで、3D プリント部品は変更なし、名前も不変 |
| 7 | `gripper` | gripper(ID 6→7) | グリッパー。元の ID=6 で、改造後は繰り上がって 7 に |

> ⚠️ 注意:**6 サーボ版のデータ、キャリブレーションファイル、訓練済みモデルは 7-DOF 改造とは互換性がありません**。本チュートリアルに従ってすべてやり直す必要があります。

## 関節データの順序

録画後の Parquet における `action` / `observation.state` の関節次元の順序は次のとおりです:

`shoulder_pan → shoulder_lift → elbow_flex → wrist_flex → wrist_yaw → wrist_roll → gripper`

## 機械的取り付けの変更

元の 4 番(`wrist_flex`)と 5 番(`wrist_roll`)の間に、新規追加の `wrist_yaw` サーボと 3D プリント部品 1 点を挿入し、それ以降のモーターは全体が 1 つ後ろにずれます:元の 5 番ロールモーター → 6 番の位置、グリッパー → 7 番の位置(この 2 つの旧モーターの 3D プリント部品は変更なし)。

## コアコードの変更

1. **モーター定義を 7 個に変更**:`wrist_yaw(5)`(左右回転)を新規追加。元の `wrist_roll` モーターは **ID 6** に移動(ロールのまま、名前も不変)。グリッパーは `gripper(6)` → `gripper(7)`。グリッパーは引き続き `RANGE_0_100`(0~100 の開閉度)を使用し、その他の関節は `DEGREES` を使用します。
   - `src/lerobot/robots/so_follower/so_follower.py`
   - `src/lerobot/teleoperators/so_leader/so_leader.py`
2. **キャリブレーションで「全周回転関節」を設定しなくなる**:元のコードは `wrist_roll` を全周回転関節(0~4095)としてハードコードしていました。7-DOF 改造後は手首の yaw/roll のいずれにも機械的リミットがあり、全周回転はできません。キャリブレーション時は `record_ranges_of_motion()` ですべての関節の実際の可動範囲を記録するように変更します。
   - `src/lerobot/robots/so_follower/so_follower.py`(`calibrate()`)
   - `src/lerobot/teleoperators/so_leader/so_leader.py`(`calibrate()`)

## 改造版リポジトリの使用または手動でのファイル置き換え

公式コードリポジトリからクローンした場合、以下のファイルを置き換え/変更する必要があります。

### 方法 A:改造版リポジトリを直接使用(推奨)

7-DOF 対応が完了したコードリポジトリをそのまま使用します。手動での変更は不要です。

### 方法 B:公式 lerobot を git clone して手動で置き換え

改造版リポジトリから公式クローンの**3 ファイル**を上書きします:

| 改造版リポジトリのファイル(コピー元) | 上書き先(コピー先) |
| :--- | :--- |
| `src/lerobot/robots/so_follower/so_follower.py` | 公式クローンの同名ファイル |
| `src/lerobot/teleoperators/so_leader/so_leader.py` | 公式クローンの同名ファイル |
| `src/lerobot/robots/so_follower/robot_kinematic_processor.py` | 公式クローンの同名ファイル(**コメント修正のみ**で機能に影響なし、置き換え不要) |

```bash
cp src/lerobot/robots/so_follower/so_follower.py          <官方clone>/src/lerobot/robots/so_follower/so_follower.py
cp src/lerobot/teleoperators/so_leader/so_leader.py       <官方clone>/src/lerobot/teleoperators/so_leader/so_leader.py
```

> 前提:お使いの公式クローンが改造版リポジトリのベースライン(lerobot 2026-08 版)と構造が一致していること。バージョンの差が大きい場合は、**ファイル全体の上書きはせず**、以下の「手動変更」の 2 か所のみ変更してください。

### バージョン不一致時の手動変更(2 か所のみ)

**① モーター辞書**(`so_follower.py` と `so_leader.py` に各 1 か所、内容は同じ)——元のコード:

```python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_roll": Motor(5, "sts3215", norm_mode_body),
"gripper": Motor(6, "sts3215", MotorNormMode.RANGE_0_100),
```

を次のように変更します:

```python
"wrist_flex": Motor(4, "sts3215", norm_mode_body),
"wrist_yaw": Motor(5, "sts3215", norm_mode_body),   # 新增舵机,左右旋转
"wrist_roll": Motor(6, "sts3215", norm_mode_body),  # 原 5 号滚动电机,ID 5→6
"gripper": Motor(7, "sts3215", MotorNormMode.RANGE_0_100),
```

**② キャリブレーションロジック**(両ファイルそれぞれの `calibrate()`)——「全周回転関節」の特例判定を削除し、元の

```python
full_turn_motor = "wrist_roll"
unknown_range_motors = [motor for motor in self.bus.motors if motor != full_turn_motor]
range_mins, range_maxes = self.bus.record_ranges_of_motion(unknown_range_motors)
range_mins[full_turn_motor] = 0
range_maxes[full_turn_motor] = 4095
```

を 1 行に置き換え、すべての関節の実際の可動範囲を記録するようにします:

```python
range_mins, range_maxes = self.bus.record_ranges_of_motion()
```

変更の理由とリスクは次の節「キャリブレーションの注意事項」を参照してください。

## キャリブレーションの注意事項

- **「全周回転関節」は存在しない**:オリジナルの公式コードは `wrist_roll`(前腕軸まわりのロール)を全周(0~4095)回転できる関節として全範囲をハードコードしていました。7-DOF 改造後は、5/6 番の手首関節(`wrist_yaw` / `wrist_roll`)はいずれも機械的リミットがあり、全周回転はできません。
- **リスクの説明**:公式の全周ハードコードをそのまま使うと、コードが機械的に到達できない角度へ関節指令を送ってしまい、破損のリスクがあります。そのためキャリブレーション時は、各モーターの実際の min/max を手動で記録するよう変更します(上記のコード変更 ② に対応)。
- **6 サーボ版のキャリブレーションファイルは 7-DOF と互換性がありません**。改造後は必ず再度キャリブレーションを行ってください。
- デュアルアーム(デュアルフォロワー)のキャリブレーションと使用の流れは [SO-ARM101 デュアルアーム(デュアルフォロワー)チュートリアル](./SO-ARM101-Bi-Arm-Tutorial.md)を参照してください。

## デュアルアーム(bi_so_follower)について

`bi_so_follower` / `bi_so_leader`(`src/lerobot/robots/bi_so_follower/`、`src/lerobot/teleoperators/bi_so_leader/`)は、シングルアームを `left_`/`right_` プレフィックス付きでラップするだけで、**モーター定義は含みません**。上記のシングルアームのファイルを正しく変更すれば、デュアルアームのコマンド(`--robot.type=bi_so_follower`)は自動的に 7-DOF になります。デュアルアームの完全な流れ(キャリブレーション、遠隔操作、データセット録画、訓練、デプロイ)は [SO-ARM101 デュアルアーム(デュアルフォロワー)チュートリアル](./SO-ARM101-Bi-Arm-Tutorial.md)を参照してください。

<RelatedProducts slugs="so-arm101" />
