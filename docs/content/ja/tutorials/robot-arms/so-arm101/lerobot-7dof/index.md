---
title: "SO-ARM101 ロボットアーム 7軸 チュートリアル"
description: "7DOFコースを始める前に、サーボと関節の対応や6サーボからの変更点、ファイル置き換え方法の選び方を確認する準備ページです。"
---

# SO\-ARM101 ロボットアーム 7軸 チュートリアル

# SO\-ARM101 7\-DOF · 実行前の準備

> 本説明は、**SO\-ARM101 を 6 サーボから 7 サーボに改造**した後、LeRobot で完全な流れ（キャリブレーション → 録画 → 訓練 → デプロイ）を実行するユーザー向けです。
> 対応するコード：本リポジトリ（`lerobot-7dof`）。公式 lerobot の fork であり、SO 関連のモーター設定のみを変更しています。
> 
> 

---

## 0\. まずお使いのロボットアームを確認する

7 サーボ（すべて STS3215）。サーボ ID と関節の対応関係は次のとおりです：

|**サーボ ID**|**関節名**|**説明**|
|---|---|---|
|1|`shoulder_pan`|肩部の水平回転|
|2|`shoulder_lift`|肩部の持ち上げ|
|3|`elbow_flex`|肘の屈曲|
|4|`wrist_flex`|手首のピッチ（上下の屈曲）|
|5|`wrist_yaw`|手首のヨー（左右回転約 90°）· **今回追加するサーボ**（元の 4 番と 5 番の間に挿入）|
|6|`wrist_roll`|手首のロール · 元の 5 番のロールモーター、ID 5→6、3D プリント部品は変更なし、名前も不変|
|7|`gripper`|グリッパー · 元の ID=6、改造後は繰り上がって 7|

関節データの順序（録画後の Parquet における `action` / `observation.state` の関節次元の順序）：
`shoulder_pan → shoulder_lift → elbow_flex → wrist_flex → wrist_yaw → wrist_roll → gripper`。

⚠️ 注意：**6 サーボ版のデータ、キャリブレーションファイル、訓練済みモデルは本リポジトリとは互換性がありません**。以下に従ってすべてやり直す必要があります。

---

## 1\. 公式コードリポジトリからクローンした場合、置き換え/変更が必要なファイル

### 方法 A：本リポジトリのコードをそのまま使用（推奨）

[lerobot\-7dof\.zip](/downloads/lerobot-7dof.zip)

### 方法 B：公式 lerobot を git clone して手動で置き換え

本リポジトリから公式クローンの**3 つのファイル**を上書きします：

|本リポジトリのファイル（コピー元）|上書き先（コピー先）|
|---|---|
|`src/lerobot/robots/so_follower/so_follower.py`|公式クローンの同名ファイル|
|`src/lerobot/teleoperators/so_leader/so_leader.py`|公式クローンの同名ファイル|
|`src/lerobot/robots/so_follower/robot_kinematic_processor.py`|公式クローンの同名ファイル（**コメント修正のみ**で機能に影響なし、置き換え不要）|

```Bash
cp src/lerobot/robots/so_follower/so_follower.py          <官方clone>/src/lerobot/robots/so_follower/so_follower.py
cp src/lerobot/teleoperators/so_leader/so_leader.py       <官方clone>/src/lerobot/teleoperators/so_leader/so_leader.py
```

> 前提：お使いの公式クローンが本リポジトリのベースライン（lerobot 2026\-08 版）と構造が一致していること。バージョンの差が大きい場合は、**ファイル全体を上書きせず**、以下の「手動変更」の 2 か所のみ変更してください。
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

`bi_so_follower / bi_so_leader（src/lerobot/robots/bi_so_follower/、src/lerobot/teleoperators/bi_so_leader/）は、シングルアームを left_/right_ プレフィックス付きでラップするだけで、`**`モーター定義は含みません`**`。`**`上記のシングルアームのファイル`**`さえ正しく変更すれば、デュアルアームのコマンド（--robot.type=bi_so_follower）は自動的に 7-DOF になります。`

## 1. LeRobot環境のインストール

- [Ubuntuコンピューター](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Ubuntu)
- [Windowsコンピューター](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Windows)
- [MACコンピューター](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/MacOS)

## 2. ファイルの置き換え（7DOF 対応）

- [ファイルの置き換え（7DOF 対応）](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/02-Replace-Files-7DOF)

## 3. シリアルポート番号の確認

- [Ubuntu](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Ubuntu)
- [Windowsコンピューター](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Windows)
- [MACコンピューター](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/MacOS)

## 4. ロボットアームのキャリブレーション

- [Ubuntuコンピューター](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Ubuntu)
- [Windowsコンピューター](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Windows)
- [Macコンピューター](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/MacOS)

## 5. テレオペレーション

- [Ubuntuコンピューター](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Ubuntu)
- [Windowsコンピューター](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Windows)
- [Macコンピューター](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/MacOS)

## 6. カメラ付きテレオペレーション

- [Ubuntuコンピューター](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Ubuntu)
- [Windowsコンピューター](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Windows)
- [Macコンピューター](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/MacOS)

## 7. データセット収集（実機）

- [データセットの確認・リプレイ](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Browse-and-Replay)
- [データセット収集の注意事項](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Collection-Notes)
- [Hugging Faceアカウントの登録（任意）](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Account)
- [データセットをHuggingFaceにアップロード（任意）](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Dataset-Upload)
- [教示によるデータセット収集-握手200](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording-Handshake-200)
- [教示によるデータセット収集](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording)

## 8. モデルの訓練

- [クラウドGPU訓練環境の設定](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Cloud-GPU)
- [訓練コマンドライン-ACT（入門に推奨）](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-ACT)
- [訓練コマンドライン-Diffusion](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-Diffusion)
- [訓練コマンドライン-pi0.5](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0.5)
- [訓練コマンドライン-pi0（効果が最も良い）](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0)
- [訓練コマンドライン-pi0fast](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0fast)
- [訓練コマンドライン-smolvla（次のステップに推奨）](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-smolvla)
- [モデルをHuggingFaceにアップロード（任意）](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/HF-Model-Upload)
- [LeRobotがサポートする模倣学習アルゴリズム](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Imitation-Learning-Algorithms)
- [ローカルUbuntuでの訓練](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Local-Ubuntu)
- [モデルの重みファイルを取得](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Model-Weights)
- [訓練パラメータの提案](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Training-Parameter-Tips)
- [wandbでリアルタイム訓練曲線を確認](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/WandB-Curves)

## 9. モデルのデプロイ

- [コマンドラインの説明](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/CLI-Reference)
- [推論コマンドライン-ACT](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-ACT)
- [推論コマンドライン-Diffusion](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-Diffusion)
- [推論コマンドライン-pi0.5](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0.5)
- [推論コマンドライン-pi0](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0)
- [推論コマンドライン-smolvla](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-smolvla)
- [よくあるBugと解決方法](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Common-Bugs)
- [NVIDIA DGX Spark 推論](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/DGX-Spark)
- [地瓜机器人（D-Robotics） RDK S100 推論](/ja/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/RDK-S100)
