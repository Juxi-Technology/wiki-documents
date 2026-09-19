---
title: "ROS2 音声対話"
description: "AI 音声対話モジュールの ROS2 連携チュートリアル。Ubuntu 22.04 と Humble 環境で、配線からトピックでの音声対話までを解説します。"
---

# ROS2 音声対話

## 1、環境準備

#### システム要件

- **オペレーティングシステム**：Ubuntu 22.04

- **ROS2 バージョン**：Humble

#### 依存ライブラリのインストール

```Bash
# 1. ソースを更新
sudo apt update

# 2. ROS2 基本パッケージをインストール
# (ROS2 インストール済みの場合はスキップ)
sudo apt install ros-humble-desktop -y

# 3. 本プロジェクトの依存関係をインストール（シリアルと I2C の両方に対応）
sudo apt install python3-pip ros-humble-rviz2 ros-humble-visualization-msgs -y
pip3 install pyserial smbus2

# 4. I2C 接線を使用する場合は追加でインストール
sudo apt install python3-smbus2 i2c-tools -y
```

---

## 2、3 種類の配線方法の説明

AI 音声対話モジュールは以下の 3 種類の配線方法に対応しています：

#### 自動検出メカニズム

ROS2 ノードの起動時には、以下の順序で配線方法を自動検出します：

1. まずシリアルポートを試行：`/dev/ttyUSB0` → `/dev/ttyACM0` → `/dev/ttyAMA0` → `/dev/ttyS0` を順に検出

2. 次に I2C を試行：`/dev/i2c-1` 上にスレーブ `0x2A` が存在するかどうかを検出

3. シリアルポートの検出では、デバイスファイルが存在して開くことができれば使用可能とみなし、追加の検証は不要です

いずれかの方法が検出されると検出を停止し、その方法を使用するよう固定します。手動設定は一切不要です。

---

## 3、IIC プロトコルの説明

#### IIC スレーブ設定

#### レジスタ定義

---

## 4、シリアルポートプロトコルの説明 (Type-C / UART)

#### フレームフォーマット

各フレームは固定で **5 バイト**です：

#### ボーレート

固定 **115200** bps です。

---

## 5、ワークスペースとディレクトリ構造の作成

#### ディレクトリの作成

```Bash
mkdir -p ~/juxi_speech_ws/src
cd ~/juxi_speech_ws/src
```

#### ROS2 パッケージの作成

```Bash
ros2 pkg create --build-type ament_python juxi_voice --license MIT
```

#### 最終的なディレクトリ構造

```Bash
~/juxi_speech_ws/
├── build/
├── install/
├── log/
└── src/
    └── juxi_voice/
        ├── package.xml
        ├── setup.py           # (本プロジェクト提供のものに置き換え)
        ├── juxi_voice.rviz    # (新規作成: RViz 設定ファイル)
        ├── resource/
        │   └── juxi_voice
        └── juxi_voice/
            ├── __init__.py
            ├── voice_node.py    # (新規作成: 音声ノード)
            └── rviz_control.py  # (新規作成: RViz 制御ノード)
```

---

## 6、ファイルの内容と配置

#### ファイル 1：`voice_node.py` (音声制御ノード)

**場所**：`~/juxi_speech_ws/src/juxi_voice/juxi_voice/voice_node.py`

**主要機能**：

- Type-C / UART / IIC の配線方法を自動検出

- 統一コマンドワードマッピングテーブル（114 個のコマンドワード）

- 配線方法に応じて対応する通信バックエンドを使用

**主要アーキテクチャ**：

```Bash
# 統一コマンドデータ: ID → (シリアルバイト2, シリアルバイト3, コマンドテキスト, 再生モード)
CMD_DATA = {
    1:  (0x01, 0x00, "欢迎语", "被"),
    3:  (0x03, 0x00, "你好小犀", "主"),
    14: (0x00, 0x04, "小车前进", "主"),
    84: (0xFF, 0x5F, "这是红色", "被"),
    ...
}

# 自動検出関数
def detect_connection(logger):
    # 1. I2C を試行
    # 2. シリアルポート /dev/ttyUSB0, /dev/ttyACM0, /dev/ttyAMA0, /dev/ttyS0 を試行
    ...
```

（完全なコードはプロジェクトで提供される `voice_node.py` ファイルをご参照ください）

#### ファイル 2：`rviz_control.py` (RViz 制御ノード)

**場所**：`~/juxi_speech_ws/src/juxi_voice/juxi_voice/rviz_control.py`

`/juxi_voice_cmd` トピックを購読してコマンドテキストを受信し、コマンドに応じてキューブの可視化を更新します。

（完全なコードはプロジェクトで提供される `rviz_control.py` ファイルをご参照ください）

#### ファイル 3：`setup.py` の変更

**場所**：`~/juxi_speech_ws/src/juxi_voice/setup.py`

```Bash
entry_points={
    'console_scripts': [
        'voice_node = juxi_voice.voice_node:main',
        'rviz_control = juxi_voice.rviz_control:main',
    ],
},
```

---

## 7、ビルドと実行

#### ビルド

```Bash
cd ~/juxi_speech_ws
colcon build --symlink-install
```

#### 環境変数

```Bash
source ~/juxi_speech_ws/install/setup.bash
# または ~/.bashrc に追記
echo "source ~/juxi_speech_ws/install/setup.bash" >> ~/.bashrc
```

#### 権限設定

```Bash
# I2C 権限
sudo chmod 666 /dev/i2c-1
# シリアルポートの権限
sudo chmod 666 /dev/ttyUSB0
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyAMA0
# またはユーザーグループに追加
sudo usermod -aG dialout $USER
sudo usermod -aG i2c $USER
```

#### ノードの実行（3 つのターミナル）

**ターミナル 1**：音声ノード

```Bash
cd ~/juxi_speech_ws
source install/setup.bash
ros2 run juxi_voice voice_node
```

起動時には検出された配線方法が表示されます：

```Bash
自动检测: IIC /dev/i2c-1 (从机地址 0x2A)
语音节点启动完成 - IIC /dev/i2c-1 (从机地址 0x2A)
```

または

```Bash
自动检测: UART /dev/ttyUSB0
语音节点启动完成 - UART /dev/ttyUSB0
```

**ターミナル 2**：RViz 制御ノード

```Bash
cd ~/juxi_speech_ws
source install/setup.bash
ros2 run juxi_voice rviz_control
```

**ターミナル 3**：RViz 可視化（設定済みファイルを直接読み込むため、手動設定は不要）

```Bash
rviz2 -d ~/juxi_speech_ws/src/juxi_voice/juxi_voice.rviz
```

または、先に RViz を開いてから読み込むこともできます：

```Bash
rviz2
# メニューバー: File → Open Config → juxi_voice.rviz を選択
```

---

## 8、RViz 設定済みファイルの説明

`juxi_voice.rviz` には以下の内容が設定済みで、起動するだけで使用でき、手動操作は一切不要です：

- **Fixed Frame**：`map`

- **Marker 表示**：`/juxi_visual_marker` を購読済み（単一マーカー）

- **MarkerArray 表示**：`/juxi_visual_markers` を購読済み（複数マーカー：ロボットアーム、バッテリー残量、アラームなど）

- **視点**：斜め上方から観察し、中心点は原点

---

## 9、使用方法

#### ウェイクアップ

モジュールに向かって **"你好小犀"** と言う → モジュールが "我在" と応答します

#### コマンドの送信

- "小车前进" → ブロックが前進

- "亮红灯" → ブロックが赤色に変化

- "打开流水灯" → 色が循環して変化

- "报警" → 赤いパルス球体

- "显示电量" → バッテリー残量のテキスト

#### ホストからの再生トリガー

```Bash
# パッシブ再生
ros2 topic pub /juxi_passive_play std_msgs/msg/String "data: '这是红色'"
# 機能ワード再生
ros2 topic pub /juxi_func_play std_msgs/msg/String "data: '欢迎语'"
# コマンドワード再生
ros2 topic pub /juxi_cmd_play std_msgs/msg/String "data: '小车前进'"
```

---

## 10、コマンドワード ID 対照表

### 機能ワード (ID 1-10)

### コマンドワード (ID 11-83, 113)

### パッシブ再生フレーズ (ID 84-112, 114)

---

## 11、ROS2 トピックの説明

---

## 12、よくある問題のトラブルシューティング

**起動時に"AI 音声対話モジュールが検出されません"と表示される**

配線方法に対応するデバイスファイルが存在するか確認します：

```Bash
# I2C 接線
ls /dev/i2c-1
sudo i2cdetect -y 1   # 0x2A が表示されるはず

# Type-C 接線
ls /dev/ttyUSB0 /dev/ttyACM0

# UART 接線
ls /dev/ttyAMA0 /dev/ttyS0
```

**シリアルポートの権限エラー**

```Bash
sudo chmod 666 /dev/ttyUSB0   # または /dev/ttyACM0 など
```

**I2C 権限エラー**

```Bash
sudo chmod 666 /dev/i2c-1
```

**RViz にブロックが表示されない**

- Fixed Frame が `map` であるか確認してください

- Topic が `/juxi_visual_marker` であるか確認してください

**ウェイクアップ後にコマンドを言っても反応しない**

```Bash
ros2 topic echo /juxi_voice_cmd
```

データがある → RViz 設定の問題；データがない → 配線/通信の異常。

<RelatedProducts slugs="ai-voice-module" />
