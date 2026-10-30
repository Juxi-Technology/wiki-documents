---
title: "インターフェース制御チュートリアル"
description: "AmazingHand Python GUI / コマンドライン制御ツール：左右手の選択、インストール、キャリブレーション、プロトコルとよくある質問。"
---

# インターフェース制御チュートリアル

## AmazingHand Python 制御ツール（左手・右手対応）

Python で書かれた GUI とコマンドラインツールで、シリアルバスサーボドライバ基板を介して 8 個の Feetech SCS0009 サーボを制御し、[Pollen Robotics の AmazingHand](https://github.com/pollen-robotics/AmazingHand) 器用ハンドを駆動します。

> **左右手ともにサポート。** 起動時に右手（サーボ ID 1-8）または左手（サーボ ID 11-18）を選択します。--hand で質問をスキップできます。ポーズライブラリは左右手で共用し、各手のサーボマッピング、取り付けオフセット、生値ターゲットは data/config.yaml で個別に管理します。詳細は左右手の選択を参照してください。

![図](../../../../../public/images/tutorials/robot-arms/amazing-hand/interface-control/01.png)

---

## プロジェクト構造

```text
amazing_hand_gui.py   – GUI 主程序
amazing_hand_cmd.py   – 命令行工具
hand_logic.py         – 共用业务逻辑(不依赖 UI)
pyproject.toml        – 包元数据、依赖、pytest 配置
data/
  config.yaml         – 应用设置(串口、限位、原始值目标)
  hand_config.yaml    – 已保存的手势与序列
docs/
  REQUIREMENTS.md       – 需求与验收标准
  user_manual.md        – 用户手册
  CONFIG_FORMAT.md      – 配置文件格式说明
  scs_servo_protocol.md – SCS0009 寄存器参考
  优化说明.md            – 相对原版的改动说明与原因
  CHANGES.md            – 同一份文档的英文版
tests/
  test_hand_logic.py      – hand_logic 单元测试(155 项)
  test_gui_utils.py       – GUI 工具函数单元测试(51 项)
  test_cmd.py             – CLI 单元测试(42 项)
  test_integration.py     – 集成测试(14 项)
  test_system.py          – 子进程系统测试(22 项)
  test_system_hardware.py – 硬件测试(33 项,需 --hardware)
  test_cmd_hardware.py    – CLI 硬件测试(21 项,需 --hardware)
```

## 環境要件

- Python 3.10 以上（GUI には Tkinter が必要）
- 8 個のサーボ用に独立した 5V 外部電源を用意
- ドライバーがインストール済みの USB シリアルバスアダプター

## インストール

pip でのインストールを推奨（pyproject.toml を読み込み）:

```bash
pip install -e .
```

または依存関係を直接インストール:

```bash
pip install -r requirements.txt
```

開発・テスト環境:

```bash
pip install -r requirements-dev.txt
```

---

## キャリブレーション

サーボの角度体系、ジェスチャープリセット、中間位置は、実際の機械式ハンドによって異なります。これらのパラメータはすべて data/config.yaml に集約されています。

### 左右手の選択

左右の手では使用するサーボも機械構造も異なるため、画面が表示される前に選択します:

```text
  AmazingHand — which hand?
    1 = right hand  (servo IDs 1-8)
    2 = left hand   (servo IDs 11-18)
  Enter 1 or 2 [1]:
  LEFT hand — servo IDs 11-18
    Ring (11, 12)  Middle (13, 14)  Pointer (15, 16)  Thumb (17, 18)
    middle position raw: [571, 451, 571, 451, 571, 451, 571, 451]
```

質問をスキップする:

```bash
python amazing_hand_gui.py --hand left
python amazing_hand_cmd.py --pose victory --hand left
```

--hand を付けない場合は data/config.yaml の hand: 値が使用されます。

**なぜ片手は単に ID の組を変えるだけではないのか。** サーボ番号（右手 1-8、左手 11-18、しかも左手の指番号は鏡像 —— 薬指が先頭）に加えて、左手には 2 つの機械的な違いがあり、プログラムはどちらも自動的に処理します:

|  | 右手 | 左手 |
|---|---|---|
| サーボ ID | 1-8 | 11-18 |
| 指 → ID | 人差し指 1,2 / 中指 3,4 / 薬指 5,6 / 親指 7,8 | 薬指 11,12 / 中指 13,14 / 人差し指 15,16 / 親指 17,18 |
| メーカー MiddlePos | [451, 571, …] | [571, 451, …] |
| 取り付けオフセット | 0° | **−35.16°**(hands.left.angle_offset) |
| 同一指の 2 サーボ | (a, b) | **(b, a)**(hands.left.mirror_pose) |

上記の後ろ 2 項目のどちらかが欠けると、ジェスチャーは崩れます: 取り付けオフセットがないと各指が 35°ずれ、同一指の入れ替えがないと開く方向が完全に逆になります（V 字サインでは 2 本の指がくっついてしまい、くっつくべき 3 本の指が開いてしまいます）。

data/hand_config.yaml は**左右手で共用**され、常に右手順で保存されます。左手は読み込み時に変換され、保存時に元に戻されます。

**新しい手をキャリブレーションする。** hands.left の値をテンプレートにして、次の順序で検証します:

1. **Middle position** を押し、Current (0-1023) の行が期待どおりの生値を読み取っているか確認します
1. **Open All** / **Close All** を押します —— ストロークは機械的限界まで達し、かつストールしないはずです
1. 開くジェスチャーを試します（victory は V 字に開き、greeting は 3 本の指を揃える）

どの項目が違う場合に、どのパラメータを調整すべきか:

| 現象 | 変更箇所 |
|---|---|
| Middle position の読み値が違う | hands.<名前>.raw_positions.middle |
| 開く方向が逆 | hands.<名前>.mirror_pose |
| ストロークが不足または過大 | hands.<名前>.raw_positions.open / close |

### 角度体系

GUI と CLI はどちらも**角度値**を使用し、rustypot ドライバーがサーボ内部の生値に変換します:

```text
raw = 1024 × angle / 300° + 511        (0.29297°/step,原始值范围 0–1023)
```

| 角度 | 意味 |
|---|---|
| **−35°** | 完全に開く（伸展） |
| **0°** | 中間位置、指は自然にわずかに曲がる |
| **+75°** | 完全に握る（拳） |

偶数 ID のサーボは奇数 ID に対して**符号が反転**するため、1 つのポーズ値で同じ指の 2 つのサーボを逆方向に動かせます。これはプログラムが自動的に処理するので、手動で換算する必要はありません。

### リミット

```text
limits:
  servo_min: -75      # 任何舵机指令的绝对行程上下限
  servo_max: 75
  base_min: -75       # 开合滑块范围
  base_max: 75
  side_min: -35       # 左右滑块范围
  side_max: 35
```

side_min/side_max は**左右の開き**を制御します。プログラムが正規化（u = |side_offset| / |side_min|）を行っているため、**この範囲を変更するだけでは実際の開き幅は変わりません** —— スライダーの目盛りが圧縮されるだけです。指の開く角度を実際に変えるには、auto_extremes も同時に変更する必要があります。

### 生値ターゲット

3 つのグローバル位置ボタンは、角度モデルを経由せずにサーボを**正確な生値**へ駆動します:

```text
raw_positions:              # 下标 0 -> 舵机 ID 1 …… 下标 7 -> 舵机 ID 8
  open:   [260, 760, 260, 760, 260, 760, 260, 760]
  close:  [760, 260, 760, 260, 760, 260, 760, 260]
  middle: [451, 571, 451, 571, 451, 571, 451, 571]
```

- open / close —— 機械的ストロークの両端。メーカーの Feetech デバッグツールでサーボを個別に駆動して測定します。
- middle —— **キャリブレーション後の機械的中間位置**（メーカーの Arduino デモプログラムにおける MiddlePos）。open と close の中点では**なく**、raw 511 から約 **±60 raw（±17.6°）** ずれている点に注意してください。

> これらは**手ごとのキャリブレーション値**です。メーカーの原文は *"replace values by your calibration results"* です。

**検証方法:** Servo Feedback パネルに Current (0-1023) の行があり、生位置をリアルタイム表示します。**Middle position** ボタンを押した後、この行は 451, 571, 451, 571, … と読み取れるはずです。

### コントロール範囲早見表

| コントロール | 範囲 |
|---|---|
| 開閉スライダー（縦方向） | −75 … +75 |
| 左右スライダー（横方向） | −35 … +35 |
| 速度 | 1（遅い）… 6（速い） |

速度値はドライバーによって rad/s としてサーボに渡されるため、1–6 はおおよそ **57–344 °/s** に対応します。負荷をかけると実際の速度はその約 **70%** になる —— シーケンスの遅延を決めるときはこれを考慮してください。

---

## GUI の実行 (amazing_hand_gui.py)

pip インストール後は直接呼び出せます:

```text
amazing-hand-gui
amazing-hand-gui --port /dev/ttyUSB0
```

または直接実行:

```bash
python amazing_hand_gui.py
python amazing_hand_gui.py --port /dev/ttyUSB0
```

ポートのドロップダウンには、本機に**実際に存在する**シリアルポートが一覧表示されます（pyserial を優先し、なければ Windows レジストリを読み取ります）。そのため番号が後ろのアダプターも表示できます。ドロップダウンにはポート番号を直接手入力できます。設定のデフォルトポートが接続されていない場合、GUI は自動的に最初の実在ポートで起動します。ポートを固定したい場合は --port を明示的に指定してください。

### 機能

- 指ごとのスライダーで開閉と左右を制御し、**Auto**（開閉 + 左右）と **Raw**（2 つのサーボ角度を直接制御）の 2 モードに対応
- 指ごとの Open / Close / Center ショートカットボタン
- 指ごとの速度選択（1–6）、ほかにグローバル速度同期ドロップダウン
- キーボードショートカットによる正確な微調整
- **グローバル位置ボタン**: Open All、Close All、Center All、Middle position
- data/hand_config.yaml に基づくジェスチャーとシーケンスの管理
- 保存済みジェスチャーを画面上から直接削除可能（🗑 Delete ボタン）
- リアルタイムのサーボテレメトリ曲線（位置、負荷、温度、電圧）
- Servo Feedback テーブル。リアルタイムの**生位置**（0–1023）を含み、キャリブレーション検証に利用可能

### キーボード操作

- **1-4**: 指を選択（Ring 薬指、Middle 中指、Pointer 人差し指、Thumb 親指）
- **矢印キー**: 選択中の指を移動
  - 上/下: 握る / 開く
  - 左/右: 左右移動
- **修飾キー**:
  - なし: 1°ずつ（微調整）
  - Shift: 5°ずつ（通常）
  - Ctrl: 10°ずつ（高速）
- **ショートカット操作**:
  - Q: 選択中の指を完全に握る
  - E: 選択中の指を完全に開く
  - C: 左右位置を中央へ戻す

### グローバルボタン

| ボタン | 開閉 | 左右 |
|---|---|---|
| ✋ **Open All** | すべての指を生値 open へ | 中央へ戻す |
| ✊ **Close All** | すべての指を生値 close へ | 中央へ戻す |
| ⊙ **Center All** | **変更なし** | 中央へ戻す |
| ⊙ **Middle position** | すべての指を生値 middle へ | 中央へ戻す |

**Global Speed** ドロップダウン（1–6）は、選択した速度をすべての指のコントロールに即座に適用し、各指のスライダー表示も同期します。

3 つの生値ボタン（Open All、Close All、Middle position）は角度モデルをバイパスするため、**実行後のスライダー表示は正確な値ではなく、最も近い表現可能な値になります**。その後にスライダーを触ると、手は生値ターゲットから最大約 0.3°ずれます —— これはキャリブレーション位置に正確に合わせるための意図的なトレードオフです。

> 既知の問題: Center All は **Raw** モードの指を**スキップせず**、手動で設定した生角度を上書きします。単指の ⊙ Center ボタンは上書きしません。

---

## CLI の実行 (amazing_hand_cmd.py)

独立したコマンドラインツールで、GUI を起動せずにジェスチャーの適用とシーケンスの再生ができます。GUI と同じ data/hand_config.yaml を読み込み、保存されたポーズ値を**そのまま送信**します —— GUI が送る内容と完全に一致します。

### Linux: シリアルポートの権限

USB シリアルアダプターは通常 /dev/ttyACM0（Waveshare / CDC-ACM）または /dev/ttyUSB0（FTDI / CH340）として見えます。

確認方法:

```bash
ls /dev/ttyACM* /dev/ttyUSB* 2>/dev/null
# 或者
dmesg | grep -E 'ttyACM|ttyUSB' | tail -5
```

**Permission denied** が出る場合は、現在のユーザーを dialout グループに追加して再ログインします:

```bash
sudo usermod -aG dialout $USER
```

### pip インストール後

```text
amazing-hand-cmd --list
amazing-hand-cmd --pose open
amazing-hand-cmd --sequence demo --loop
amazing-hand-cmd --pose open --speed 6
# 需要时覆盖串口:
amazing-hand-cmd --pose open --port /dev/ttyUSB0
```

### 直接実行

```bash
python amazing_hand_cmd.py --list
python amazing_hand_cmd.py --pose open
python amazing_hand_cmd.py --pose close --speed 6
python amazing_hand_cmd.py --sequence demo
python amazing_hand_cmd.py --sequence wave --loop
python amazing_hand_cmd.py --port /dev/ttyUSB0 --pose open
python amazing_hand_cmd.py --list --config /path/to/hand_config.yaml
```

### パラメータ

| パラメータ | デフォルト値 | 説明 |
|---|---|---|
| --pose NAME | – | 指定した名前のジェスチャーを適用 |
| --sequence NAME | – | 指定した名前のシーケンスを再生 |
| --list | – | すべてのジェスチャーとシーケンスを一覧表示 |
| --loop | オフ | Ctrl+C までシーケンスを繰り返し再生 |
| --speed N | 3 | サーボ速度 1（遅い）… 6（速い） |
| --port PORT | Linux /dev/ttyACM0<br>Windows COM9 | シリアルポート番号 |
| --baudrate N | 1000000 | ボーレート |
| --config PATH | data/hand_config.yaml | 別の設定ファイルを指定 |
| --hand {right,left} | config.yaml の hand | どちらの手を使うか指定（右手 1-8、左手 11-18） |

スクリプトの終了時（Ctrl+C を含む）には、すべてのサーボのトルクが自動的にオフになります。

> CLI には data/config.yaml に対応する --config パラメータはなく、このファイルは常にプロジェクトディレクトリから読み込まれます。

---

## 設定ファイル

### data/config.yaml

| セクション | 用途 |
|---|---|
| serial | 各プラットフォームのデフォルトシリアルポート、ボーレート、選択可能なボーレート一覧 |
| servos | 各指に対応するサーボ ID |
| limits | サーボと 2 つのスライダーの角度範囲 |
| speeds | 1–6 速度スケールのデフォルト値/最小値/最大値 |
| auto_extremes | 左右スライダーが限界に達したときのサーボ位置 |
| raw_positions | グローバル位置ボタンの正確な生値ターゲット |
| paths | ジェスチャー/シーケンスファイルの場所 |

### サーボと指の対応関係

| 指 | サーボ ID | ポーズ配列のインデックス |
|---|---|---|
| Pointer 人差し指 | 1, 2 | 4, 5 |
| Middle 中指 | 3, 4 | 2, 3 |
| Ring 薬指 | 5, 6 | 0, 1 |
| Thumb 親指 | 7, 8 | 6, 7 |

**ポーズ配列の順序は薬指、中指、人差し指、親指であり、サーボ ID 順ではありません。** hand_config.yaml を手動で編集する際に最も間違えやすい点です。

> amazing_hand_cmd.py 冒頭のコメントには "index 0→servo1 … 7→servo8" と書かれていますが、**そのコメントは誤り**で、上表がコードの実際の動作です。

---

## ジェスチャーとシーケンス

すべてのジェスチャーとシーケンスは data/hand_config.yaml に保存されます。ファイルが存在しない場合、GUI が自動的に作成します。

### ジェスチャーの保存

1. スライダーまたはキーボードで手を目標のポーズに動かします
1. 「Name:」入力欄に名前を入力します
1. Pose Management エリアの「➕ Add New」をクリックします

速度はスライダーの移動速度にのみ影響します。保存されるジェスチャーは 8 個のサーボ位置のみを記録します。

### ジェスチャーの読み込み / 削除

- ドロップダウンで選択して **✓ Apply** をクリックすると、手がそのポーズへ移動します
- Apply の右側にある **🗑 Delete** をクリックし、確認すると完全に削除されます

### シーケンス管理

1. Sequence Player で「🔧 Manage」をクリックしてシーケンスマネージャーを開きます
1. **Saved Sequences**（左カラム）
  - 既存のシーケンスの表示、実行、編集、削除
  - ダブルクリックまたは「▶ Execute」で 1 回実行

1. **Sequence Builder**（右カラム）
  - 「Available Poses」のジェスチャーをダブルクリックすると 1 ステップとして追加されます
  - 各ステップごとに 8 個のサーボの速度と遅延を個別に設定できます。ステップは "pose:s1,s2,...,s8|delay" 形式で保存されます
  - ↑/↓ で順序を調整するか、「⏱ Delay」ボタンで独立した一時停止を挿入します
  - 名前を入力して「💾 Save Sequence」をクリックすると保存されます。「▶ Execute」をクリックすると、保存せずに試し実行できます

1. メインウィンドウに戻り、連続再生が必要な場合は Sequence Player の **Loop** にチェックを入れます

### ステップ形式

```text
pose_name:speed1,speed2,...,speed8|delay
```

- speed1..speed8 —— ポーズ順に並んだ 8 個のサーボ速度（1–6）
- delay —— 次のステップまでの待ち時間（例: 0.6s）。**省略可能**で、省略時は GUI が固定の自動待機にフォールバックします
- 独立した一時停止は SLEEP:1.0s と記述します（カンマ区切りの速度リストはありません）

**遅延の選び方。** ドライバー自体はサーボが停止したかどうかを読み取れますが、シーケンス再生は固定遅延を使用します。おおよそ ストローク角度 / (速度 × 57.3 × 0.7) 秒で見積もり、余裕を持たせてください —— 負荷のかかった手では、約 130°を超える動作は速度 3 で 1.0 秒以上かかります。

### YAML 形式の例

```text
poses:
  open:
    positions: [-35, -35, -35, -35, -35, -35, -35, -35]
  close:
    positions: [75, 75, 75, 75, 75, 75, 75, 75]
  ring_close:                 # 无名指握紧,其余张开
    positions: [75, 75, -35, -35, -35, -35, -35, -35]

sequences:
  demo:
    steps:
      - "open:3,3,3,3,3,3,3,3|2.0s"
      - "close:6,6,6,6,6,6,6,6|2.0s"
      - "ok:3,3,3,3,3,3,3,3|1.0s"
      - "victory:3,3,3,3,3,3,3,3|1.0s"
      - "greeting:3,3,3,3,3,3,3,3|1.5s"
      - "close:6,6,6,6,6,6,6,6|2.0s"
  wave:
    steps:
      - "open:6,6,6,6,6,6,6,6|0.8s"
      - "wave_r:5,5,5,5,5,5,5,5|0.6s"
      - "wave_l:5,5,5,5,5,5,5,5|0.6s"
      - "open:5,5,5,5,5,5,5,5|0.8s"
  finger_roll:
    steps:
      - "open:6,6,6,6,6,6,6,6|0.5s"
      - "ring_close:5,5,5,5,5,5,5,5|0.6s"
      - "open:5,5,5,5,5,5,5,5|0.5s"
      - "middle_close:5,5,5,5,5,5,5,5|0.6s"
      - "open:5,5,5,5,5,5,5,5|0.5s"
```

ループ再生は実行時に制御され（GUI のチェックボックス）、YAML には書き込まれなくなりました。

---

## テスト

プロジェクトには 284 のユニット/統合/システムテストと、54 のハードウェアテストが含まれます。

### すべてのテストを実行（ハードウェア不要）

```text
pytest
```

### GUI + CLI ハードウェアテストを実行（サーボ接続が必要）

```text
pytest tests/test_system_hardware.py --hardware --port /dev/ttyACM0
pytest tests/test_cmd_hardware.py --hardware --port /dev/ttyACM0
# 或两个一起:
pytest tests/test_system_hardware.py tests/test_cmd_hardware.py --hardware
```

test_system_hardware.py は、接続、ジェスチャー適用、テレメトリ読み取り、単指の開閉/手振り、速度制御、シーケンス実行、モーション検出を検証します。

test_cmd_hardware.py は CLI レイヤーをエンドツーエンドで検証します: ポーズ位置、速度パラメータ、シーケンスステップ、wait_for_motion、--list 出力、および終了時のトルクオフ。

完全な受け入れ基準は docs/REQUIREMENTS.md を参照してください。

> 注意: 非ハードウェアテストが検証するのは hand_logic.py の**フォールバック既定値**であり、その既定値は今もオリジナルの −40…110 スケールです。実行時には data/config.yaml がこれらを上書きするため、どのようにキャリブレーションしてもテストは通ります —— ただしそれは、**テストが現在のキャリブレーションパラメータを検証しない**ことも意味します。

---

## サーボ ID の設定

Feetech 公式ソフトウェアとシリアルバスドライバーでサーボ ID を設定するチュートリアル: [https://www.robot-maker.com/forum/tutorials/article/168-brancher-et-controler-le-servomoteur-feetech-sts3032-360/](https://www.robot-maker.com/forum/tutorials/article/168-brancher-et-controler-le-servomoteur-feetech-sts3032-360/)

Feetech ソフトウェアのダウンロード: [https://github.com/Robot-Maker-SAS/FeetechServo](https://github.com/Robot-Maker-SAS/FeetechServo)

---

## 謝辞

オリジナルプロジェクト: [Betatester777](https://github.com/Betatester777/AmazingHandControl) ハードウェアとリファレンスファームウェア: [Pollen Robotics](https://github.com/pollen-robotics/AmazingHand)
