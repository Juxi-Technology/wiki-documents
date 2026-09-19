---
title: "ROS2シミュレーション制御"
description: "SO-ARM101のROS 2ワークスペースを使い、GazeboでのシミュレーションからMoveIt 2によるモーションプランニングまで試す手順を説明します。"
---

# ROS2シミュレーション制御

[SO-ARM101_ROS2.zip](/downloads/SO-ARM101_ROS2.zip)

SO-ARM101 6 自由度ロボットアームの完全な ROS 2 ワークスペースで、ロボット記述、内蔵ハードウェアドライバ、Gazebo シミュレーション、MoveIt 2 モーションプランニングを網羅しています。

SO-ARM101 は [TheRobotStudio](https://www.therobotstudio.com/) と [LeRobot](https://huggingface.co/lerobot) コミュニティが共同で設計した第 2 世代のオープンソースフォロワーアームで、6 個の STS3215 サーボ、サーボドライバ基板、3D プリントの PLA+ 部品を使用しています。

**注意：****ロボットアームには中位キャリブレーションが必要です。すべての関節が可動範囲の中央位置にあるときに中位キャリブレーションを行ってください**

## パッケージ構成

対象プラットフォーム：**ROS 2 Humble / Jazzy**。

---

## ROS2 環境の準備

本プロジェクトをビルドする前に、システムに ROS 2 と関連コンポーネントがインストールされていることを確認してください。

### システム要件

- Ubuntu 22.04（推奨）または 24.04

- メモリ 4 GB 以上

- 実ハードウェアモードには USB シリアルポートが必要

### 0.1  ROS 2 Humble のインストール

```Bash
# ロケールの設定
sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8

# ROS 2 ソフトウェアソースの追加
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo apt update && sudo apt install curl -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# ROS 2 Humble Desktop のインストール
sudo apt update
sudo apt install ros-humble-desktop
```

### 0.2  ビルドツールと依存関係のインストール

```Bash
# colcon ビルドツール
sudo apt install python3-colcon-common-extensions

# MoveIt 2
sudo apt install ros-humble-moveit

# ros2_control
sudo apt install ros-humble-ros2-control \
                 ros-humble-ros2-controllers \
                 ros-humble-controller-manager \
                 ros-humble-joint-state-publisher-gui
```

### 0.3  環境変数の設定

```Bash
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

### 0.4  シリアルポートの権限設定（実ハードウェアでは必須）

**恒久的な設定（推奨）**：

```Bash
sudo usermod -a -G dialout $USER
# ログアウトして再ログインすると有効になります
```

**一時的な設定（再起動のたびに再実行が必要）**：

```Bash
sudo chmod 666 /dev/ttyACM0
```

## ワークスペース環境のインストール

```Markdown
# ステップ 1  ワークスペースの作成
mkdir -p ~/so101_ws/src
cd ~/so101_ws/src

# ステップ 2  ソースコードを配置
cp -r /path/to/SO-ARM101_ROS2 ./

# ステップ 3  システム依存関係のインストール
cd ~/so101_ws
rosdep install --from-paths src --ignore-src -r -y

# ステップ 4  すべてのパッケージをビルド
colcon build --symlink-install

# ステップ 5  環境の読み込み  ← 新しいターミナルごとに実行
source install/setup.bash
```

**実ハードウェアの説明** — `so_arm_hardware` パッケージは内蔵済みです。追加のドライバをインストールする必要はなく、
シリアルポート経由で SCS プロトコルを使い、STS3215 サーボと直接通信します。

## 可視化による検証

ここから始めるのが最も簡単です——コントローラもハードウェアも不要です。

```Bash
#  ターミナル 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_description view_description.launch.py rviz:=true
```

RViz に完全なロボットモデルが表示され、スライダーをドラッグして各関節の動きが正しいか検証できます。

---

## コントローラのテスト（仮想ハードウェア / Mock モード）

ここでも実機は不要で、すべてメモリ上で動作します。

```Bash
#  ターミナル 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_description controllers_bringup.launch.py
```

ログが表示されたら準備完了です：

```Bash
joint_state_broadcaster      → active
joint_trajectory_controller  → active
```

**注意**：シミュレーションモードでは 2 つのコントローラ（`joint_state_broadcaster` と
`joint_trajectory_controller`）のみを起動します。`gripper_controller` は削除され、グリッパは
`joint_trajectory_controller` が 6 つの関節すべてを一括して制御します。

### コントローラの役割

## MoveIt モーションプランニング（Mock ハードウェア）

**ターミナルは 1 つだけ**で済みます — MoveIt が内部でコントローラスタックを自動的に起動します。

```Bash
#  ターミナル 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config demo.launch.py
```

RViz ウィンドウが開いたら：

1. **MotionPlanning** パネルで、**Planning Group → manipulator**

2. **Start State → ****`<current>`**、**Goal State → extended**

3. **Plan** と **Execute** を順にクリックします

使用可能なプリセット姿勢：`open`、`zero`、`extended`、`rest`。

### 4.1  MoveIt インターフェースの詳細

RViz が起動すると、左側に **MotionPlanning** パネルが表示され、以下の主要なタブがあります：

#### Planning タブ

#### プランニングパラメータ

> **初回テストの推奨**：Velocity と Acceleration を 0.3 に設定し、動作速度を下げて安全を確保してください。
> 
> 

#### Scene Objects タブ

- 障害物（Box / Sphere / Cylinder）を追加して衝突検出に使用

- シーンのインポート / エクスポート

- MoveIt は障害物を自動的に回避してプランニングします

#### Stored States タブ

- よく使うロボットアームの姿勢を保存

- デフォルト姿勢：`open`、`zero`、`extended`、`rest`

### 4.2  基本操作の流れ

#### 方法 A：インタラクティブなドラッグ（推奨）

1. 3D ビューでロボットアーム先端の**インタラクティブマーカー**（色付きの矢印とリング）を見つけます

2. 矢印をドラッグして先端位置を平行移動し、リングをドラッグして向きを回転させます

3. システムが自動的に IK を解き、関節角度をリアルタイムに更新します

4. **Plan** をクリックして計画軌道（オレンジ色）を確認します

5. 確認したら **Execute** をクリックして実行します

> ドラッグ時にカクつく場合は、まず `rest` プリセット姿勢から始めてからドラッグすることをおすすめします。
> 
> 

#### 方法 B：プリセット姿勢

1. **Query Goal State** ドロップダウンメニュー → `open` / `extended` / `rest` などを選択

2. **Update** をクリック

3. **Plan** をクリック

4. **Execute** をクリック

#### 方法 C：関節角度を手動で設定

1. **Query Goal State** → **Joints** タブ

2. 各関節のスライダーをドラッグして目標角度を設定

3. 関節範囲の参考：

1. **Update** をクリック

2. **Plan** をクリック

3. **Execute** をクリック

#### 方法 D：ランダムな有効目標

**Random Valid** ボタンをクリックすると、到達可能なランダムな姿勢が自動生成されます。その後 Plan → Execute を実行します。

### 4.3  安全上の注意

1. **初回使用時は速度を下げる**：Velocity / Acceleration を 0.1–0.3 に設定

2. **緊急停止**：いつでも Ctrl+C でプログラムを終了するか、電源を切ります

3. **関節リミット**：MoveIt は `joint_limits.yaml` の範囲を超えるプランニングを行いませんが、設定が正しいことを確認する必要があります

4. **実ハードウェア**：実行する前に、ロボットアームの周囲に十分な空間があることを確認してください

### MoveIt 設定の概要

---

## Gazebo シミュレーション

Gazebo シミュレーションでは**同時に 4 つのターミナルを実行する**必要があります。必ず順番どおりに実行してください。

### 5.1  Gazebo シミュレーションの起動  （ターミナル 1）

```Bash
#  ターミナル 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm_gz so_arm_gz_bringup.launch.py
```

Gazebo ウィンドウが表示されるのを待ちます。ロボットは空中にしばらく留まった後、着地します。

### 5.2  軌道コントローラの読み込み  （ターミナル 2）

Gazebo はデフォルトで `forward_position_controller` のみをアクティブにするため、手動で
`joint_trajectory_controller` に切り替える必要があります：

```Markdown
#  ターミナル 2
source ~/so101_ws/install/setup.bash

# ステップ A — forward_position_controller を停止
ros2 control set_controller_state forward_position_controller inactive

# ステップ B — spawner で joint_trajectory_controller を読み込んでアクティブ化
ros2 run controller_manager spawner joint_trajectory_controller

# ステップ C — 検証
ros2 control list_controllers
```

期待される出力：

```Bash
forward_position_controller  inactive
joint_state_broadcaster      active
joint_trajectory_controller  active
```

⚠️ 先に `ros2 control load_controller` を使わないでください！コントローラが
`unconfigured` 状態になり、spawner がアクティブ化できなくなります。すでに実行してしまった場合は、先に
`unload_controller` を実行してやり直してください。

### 5.3  move_group の起動  （ターミナル 3）

```Bash
#  ターミナル 3
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config move_group.launch.py use_sim_time:=True
```

### 5.4  RViz の起動  （ターミナル 4）

```Bash
#  ターミナル 4
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config moveit_rviz.launch.py
```

RViz の準備ができたら：

1. **Planning Group → manipulator**

2. **Goal State → open**（または `extended`、`rest`）

3. **Plan** と **Execute** を順にクリックします

Gazebo 内のアーム関節が追従して動作します。

**注意**：`gz_ros2_control` の Humble 版の PID ゲインの制限により、
グリッパは Gazebo 内で物理的に開かない可能性があります（実行ログには成功と表示されます）。
Mock モードと実ハードウェアではこの問題はありません。

### 5.5  ヘッドレスモード（GUI なし）

```Bash
ros2 launch so_arm_gz so_arm_gz_bringup.launch.py \
  gazebo_gui:=false \
  launch_rviz:=false
```

### 5.6  トラブルシューティング：読み込みが繰り返し失敗する場合

spawner がずっと `Failed to activate controller` を報告する場合は、以下の手順で完全にリセットしてください：

```Bash
# 1. スタックしたコントローラをアンロード
ros2 control unload_controller joint_trajectory_controller

# 2. forward_position_controller を停止
ros2 control set_controller_state forward_position_controller inactive

# 3. 再び spawn
ros2 run controller_manager spawner joint_trajectory_controller
```

## 実ハードウェア

前提：SO-ARM101 ロボットアームを組み立て済みで、サーボドライバ基板が USB でパソコンに接続されていること。

### 6.1  コントローラの起動（スキップ可能）

```Bash
#  ターミナル 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_description controllers_bringup.launch.py \
  hardware_type:=real \
  usb_port:=/dev/ttyACM0
```

`so_arm_hardware` プラグインが自動的に以下を完了します：

1. シリアルポートを開く

2. 6 個のサーボ ID（1–6）をスキャン

3. 各サーボが応答することを検証

4. トルクを有効にして現在位置を読み取る

コントローラの準備ができたら、別の 2 つのターミナルを開いて MoveIt を起動します：

```Bash
#  ターミナル 2 — move_group
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config move_group.launch.py
```

```Bash
#  ターミナル 3 — RViz
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config moveit_rviz.launch.py
```

### 6.2  MoveIt（ワンクリック起動）

> 以下のコマンドは 6.1 を**置き換えます**（同時に実行しないでください。6.1 のコマンドを停止してください）——`demo.launch.py` には内部でコントローラスタックが含まれています。
> 
> 

```Bash
#  ターミナル 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config demo.launch.py \
  hardware_type:=real \
  usb_port:=/dev/ttyACM0
```

### 6.3  シリアルポートのトラブルシューティング

### 6.4  RViz の表示と実際の姿勢が一致しない

RViz 内のロボットアームの姿勢が実際のハードウェアと一致しない場合（たとえば関節のずれ、衝突の誤検出）：

1. サーボが中位キャリブレーション済みであることを確認します

2. `so_arm101.ros2_control.xacro` 内で各関節の `position_offset` を調整します

3. 換算式：`新しい offset = 現在の offset + (現在表示されている rad / 0.00153398)`

4. 変更後、`so_arm101_description` パッケージを再ビルドします

---

## よくある質問

### Q1：ビルド時に "package not found" が発生する

**A**：すべてのシステム依存関係が正しくインストールされ、ROS 2 環境を source していることを確認してください：

```Bash
source /opt/ros/humble/setup.bash
cd ~/so101_ws
rosdep install --from-paths src --ignore-src -r -y
colcon build --symlink-install
```

### Q2：起動時にシリアルポートへのアクセスで "Permission denied" が表示される

**A**：シリアルポートの権限を確認してください：

```Bash
# 一時的な解決
sudo chmod 666 /dev/ttyACM0

# 恒久的な解決（ログアウト後に有効）
sudo usermod -a -G dialout $USER
```

### Q3：MoveIt のプランニングに失敗し、"Motion planning start tree could not be initialized" が表示される

**A**：通常は 2 つの原因があります：

1. **関節がリミットを超えている** — ログ内の `FixStartStateBounds` の出力を確認してください。現在の許容値は
0.3 rad で、超過量がこの範囲内であれば通過します。そうでない場合は `start_state_max_bounds_error` を
調整するか、サーボのオフセット量を確認してください。

2. **初期状態での衝突** — ログ内の `FixStartStateCollision` の出力を確認してください。もし
"Unable to find a valid state nearby" と表示される場合は、現在の姿勢に自己衝突があることを意味します。
ロボットアームが折り畳まれた姿勢（たとえば gripper が shoulder に接触している）か、オフセット量が正しくない可能性があります。
`position_offset` を調整してから再試行してください。

### Q4：Execute 後もロボットアームが動かない

**A**：コントローラの状態を確認してください：

```Bash
ros2 control list_controllers
```

`joint_trajectory_controller` が `active` 状態であることを確認してください。そうでない場合は再度 spawn します：

```Bash
ros2 run controller_manager spawner joint_trajectory_controller
```

### Q5：RViz の起動が遅い、またはフリーズする

**A**：正常な現象です。MoveIt は起動時に URDF モデル、衝突検出プラグイン、
運動学ソルバなどを読み込むため、初回起動には約 10 秒かかります。

### Q6：プランニングされた経路が滑らかでない、または振動する

**A**：以下の方法を試してください：

- 別のプランナに切り替える（RViz の Planner ドロップダウンメニューで `RRTConnect` を選択）

- Planning Time を 10 秒に増やす

- 目標がワークスペース内にあることを確認する（`Random Valid` でテスト）

### Q7：Gazebo 内でグリッパが動かない

**A**：これは `gz_ros2_control` の Humble 版における PID ゲインのハードコード制限
（0.1 に固定）であり、URDF パラメータでは上書きできません。ログでは Execute が成功と表示されますが、
Gazebo の物理シミュレーションではグリッパは開きません。Mock モードと実ハードウェアではこの問題はありません。

## 付録：起動パラメータ早見表

### `controllers_bringup.launch.py`

### `so_arm_gz_bringup.launch.py`

---

## ディレクトリ構成

```Bash
SO-ARM101_ROS2/
├── so_arm_utils/                   # Python ツールライブラリ
├── so_arm101_description/          # URDF · コントローラ · メッシュ · RViz · MuJoCo
├── so_arm101_moveit_config/        # MoveIt 2 SRDF · プランナ · 起動ファイル
├── so_arm_gz/                      # Gazebo シミュレーション起動
├── so_arm_hardware/                # 内蔵 SCS シリアルドライバ（C++）
└── Simulation/                     # 元の CAD URDF（参考用に保持）
```

<RelatedProducts slugs="so-arm101" />
