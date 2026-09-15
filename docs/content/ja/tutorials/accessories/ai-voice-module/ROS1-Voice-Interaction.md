---
title: "ROS1 音声対話"
description: "AI 音声対話モジュールは以下の 3 種類の配線方法に対応しています："
---

# ROS1 音声対話

## 1、環境準備

#### システム要件

- **オペレーティングシステム**：Ubuntu 20.04 または 18.04

- **ROS1 バージョン**：Noetic (推奨) または Melodic

#### 依存ライブラリのインストール

```Bash
# 1. 更新源
sudo apt update

# 2. 安装 ROS1 桌面完整版
# (如果已安装ROS1，跳过)
sudo apt install ros-noetic-desktop-full -y    # Ubuntu 20.04
sudo apt install ros-melodic-desktop-full -y   # Ubuntu 18.04

# 3. 安装本项目依赖（同时支持串口和I2C）
sudo apt install python3-pip ros-noetic-rviz i2c-tools -y
pip3 install pyserial smbus2

# 如果是 Melodic (Python2)
sudo apt install python-pip ros-melodic-rviz i2c-tools -y
pip install pyserial smbus2

# 4. 如果使用 I2C 接线，额外安装
sudo apt install python3-smbus2 -y
```

---

## 2、3 種類の配線方法の説明

AI 音声対話モジュールは以下の 3 種類の配線方法に対応しています：

#### 自動検出メカニズム

ROS1 ノードの起動時には、以下の順序で配線方法を自動検出します：

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

#### catkin ワークスペースの作成

```Bash
mkdir -p ~/juxi_speech_ws/src
cd ~/juxi_speech_ws/src
```

#### ROS パッケージの作成

```Bash
catkin_create_pkg juxi_voice rospy std_msgs visualization_msgs
```

#### 最終的なディレクトリ構造

本プロジェクトで提供されるファイルを対応する位置に配置します：

```Bash
~/juxi_speech_ws/
├── build/
├── devel/
└── src/
    └── juxi_voice/
        ├── CMakeLists.txt      # (替换为本项目提供的)
        ├── package.xml          # (替换为本项目提供的)
        ├── juxi_voice.rviz      # (新建：RViz预配置文件)
        ├── launch/
        │   └── juxi_voice.launch # (新建：一键启动文件)
        └── scripts/
            ├── voice_node.py     # (新建：语音节点)
            └── rviz_control.py   # (新建：RViz控制节点)
```

---

## 6、ファイルの内容と配置

#### ファイル 1：`voice_node.py` (音声制御ノード)

**場所**：`~/juxi_speech_ws/src/juxi_voice/scripts/voice_node.py`

**主要機能**：

- Type-C / UART / IIC の配線方法を自動検出

- 統一コマンドワードマッピングテーブル（114 個のコマンドワード、Excel プロトコル表 V1 と完全に一致）

- 配線方法に応じて対応する通信バックエンド（シリアルポート / I2C）を使用

**主要アーキテクチャ**：

```Bash
# 统一命令数据: ID → (串口字节2, 串口字节3, 命令文本, 播报模式)
CMD_DATA = {
    1:   (0x01, 0x00, "欢迎语", "被"),
    3:   (0x03, 0x00, "你好小犀", "主"),
    14:  (0x00, 0x04, "小车前进", "主"),
    84:  (0xFF, 0x5F, "这是红色", "被"),
    ...
}

# 自动检测函数
def detect_connection():
    # 1. 尝试串口 /dev/ttyUSB0, /dev/ttyACM0, /dev/ttyAMA0, /dev/ttyS0
    # 2. 尝试 I2C /dev/i2c-1 (从机地址 0x2A)
    ...
```

（完全なコードはプロジェクトで提供される `voice_node.py` ファイルをご参照ください）

#### ファイル 2：`rviz_control.py` (RViz 制御ノード)

**場所**：`~/juxi_speech_ws/src/juxi_voice/scripts/rviz_control.py`

`/juxi_voice_cmd` トピックを購読してコマンドテキストを受信し、コマンドに応じてキューブの可視化を更新します。

（完全なコードはプロジェクトで提供される `rviz_control.py` ファイルをご参照ください）

#### ファイル 3：`CMakeLists.txt` と `package.xml`

本プロジェクトで提供済みです。`catkin_create_pkg` が自動生成したデフォルトファイルをそのまま置き換えるだけです。

---

## 7、ビルドと実行

#### ビルド

```Bash
cd ~/juxi_speech_ws
catkin_make
```

#### 環境変数

```Bash
source ~/juxi_speech_ws/devel/setup.bash
# 或写入 ~/.bashrc
echo "source ~/juxi_speech_ws/devel/setup.bash" >> ~/.bashrc
```

#### 権限設定

```Bash
# I2C 权限
sudo chmod 666 /dev/i2c-1
# 串口权限
sudo chmod 666 /dev/ttyUSB0
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyAMA0
# 或加入用户组
sudo usermod -aG dialout $USER
sudo usermod -aG i2c $USER
# 设置后需要重新登录生效
```

#### ノードの実行

**方法 1：ワンクリック起動（推奨）**

```Bash
cd ~/juxi_speech_ws
source devel/setup.bash
roslaunch juxi_voice juxi_voice.launch
```

起動時には音声ノード、RViz 制御ノード、RViz 可視化インターフェースが自動的に開きます。

**方法 2：段階的な起動（3 つのターミナル）**

**ターミナル 1**：roscore の起動

```Bash
roscore
```

**ターミナル 2**：音声ノード

```Bash
cd ~/juxi_speech_ws
source devel/setup.bash
rosrun juxi_voice voice_node.py
```

起動時には検出された配線方法が表示されます：

```Bash
[INFO] 自动检测: IIC /dev/i2c-1 (从机地址 0x2A)
[INFO] 语音节点启动完成 - IIC /dev/i2c-1 (从机地址 0x2A)
```

または

```Bash
[INFO] 自动检测: UART /dev/ttyUSB0
[INFO] 语音节点启动完成 - UART /dev/ttyUSB0
```

デバイスがまったく検出されない場合：

```Bash
[FATAL] 未检测到AI语音交互模块！请检查接线 (Type-C / UART / IIC)
[FATAL] 支持的端口: I2C(/dev/i2c-1) | 串口(/dev/ttyUSB0 /dev/ttyACM0 /dev/ttyAMA0 /dev/ttyS0)
```

**ターミナル 3**：RViz 制御ノード

```Bash
cd ~/juxi_speech_ws
source devel/setup.bash
rosrun juxi_voice rviz_control.py
```

**ターミナル 4**：RViz 可視化（設定済みファイルを直接読み込むため、手動設定は不要）

```Bash
rviz -d ~/juxi_speech_ws/src/juxi_voice/juxi_voice.rviz
```

または、先に RViz を開いてから読み込むこともできます：

```Bash
rviz
# 菜单栏: File → Open Config → 选择 juxi_voice.rviz
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
# 被动播报 (I2C → 写 0xD1, 串口 → 发 FE EF FF XX EE)
rostopic pub /juxi_passive_play std_msgs/String "data: '这是红色'"
# 功能词播报 (I2C → 写 0xD2, 串口 → 发 FE EF 01 00 EE)
rostopic pub /juxi_func_play std_msgs/String "data: '欢迎语'"
# 命令词播报 (I2C → 写 0xD3, 串口 → 发 FE EF 00 04 EE)
rostopic pub /juxi_cmd_play std_msgs/String "data: '小车前进'"
```

---

## 10、コマンドワード ID 対照表

> 全 114 件のコマンドワードで、`命令词播报词协议列表V1_中文.xlsx` と完全に一致します。
> 
> 

### 機能ワード (ID 1-10)

### コマンドワード (ID 11-83, 113)

### パッシブ再生フレーズ (ID 84-112, 114)

---

## 11、ROS1 トピックの説明

---

## 12、よくある問題のトラブルシューティング

**1.起動時に"AI 音声対話モジュールが検出されません"と表示される**

配線方法に対応するデバイスファイルが存在するか確認します：

```Bash
# I2C 接线
ls /dev/i2c-1
sudo i2cdetect -y 1   # 应看到 0x2A

# Type-C 接线
ls /dev/ttyUSB0 /dev/ttyACM0

# UART 接线
ls /dev/ttyAMA0 /dev/ttyS0
```

**2.シリアルポートの権限エラー**

```Bash
sudo chmod 666 /dev/ttyUSB0   # 或 /dev/ttyACM0 等
# 或加入 dialout 用户组（需要重新登录）
sudo usermod -aG dialout $USER
```

**3.I2C 権限エラー**

```Bash
sudo chmod 666 /dev/i2c-1
# 或加入 i2c 用户组（需要重新登录）
sudo usermod -aG i2c $USER
```

**4.RViz にブロックが表示されない**

- Fixed Frame が `map` であるか確認してください

- Topic が `/juxi_visual_marker` であるか確認してください

- rviz_control.py ノードが起動していることを確認してください

**5.ウェイクアップ後にコマンドを言っても反応しない**

```Bash
rostopic echo /juxi_voice_cmd
```

データがある → RViz 設定の問題；データがない → 配線/通信の異常。

**6.rosrun でノードが見つからない**

ビルドと source を実行済みであることを確認してください：

```Bash
cd ~/juxi_speech_ws
catkin_make
source devel/setup.bash
```

**7.構文エラーが表示される**

```Bash
# 确认 Python 脚本有执行权限
chmod +x ~/juxi_speech_ws/src/juxi_voice/scripts/voice_node.py
chmod +x ~/juxi_speech_ws/src/juxi_voice/scripts/rviz_control.py
```



