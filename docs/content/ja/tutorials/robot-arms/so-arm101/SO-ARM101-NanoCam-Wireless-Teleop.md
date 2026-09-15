---
title: SO-ARM101 ワイヤレス遠隔操作(ESP32-NanoCam 版)
description: "競技会デモ向けのワイヤレス遠隔操作ソリューション:リーダーアームは LeRobot 経由で Ubuntu PC に接続し、フォロワーアームは ESP32-NanoCam モジュールから micro-ROS WiFi で制御。配線、給電、書き込み、キャリブレーション、カメラ FPV までの完全な流れを網羅します。"
---

# SO-ARM101 ワイヤレス遠隔操作(ESP32-NanoCam 版)

> **[ストアで購入](https://www.juxitech.com/ja/products/so-arm101-developers-kit)**

本チュートリアルは、競技会デモでドローンに搭載した SO-ARM101 ロボットアームをワイヤレス遠隔操作するシーンを対象としています。リーダーアームは LeRobot 経由で Ubuntu PC に接続し、フォロワーアームは自社開発の [ESP32-S3 WiFi 動画モジュール](/ja/products/esp32-s3-wifi-module)(ESP32-NanoCam、ESP32-S3 N16R8)で制御します。micro-ROS WiFi UDP で指令を受信し、オンボードカメラの FPV、マイク、スピーカー、RGB ステータス LED を統合しています。問題が発生した場合は [トラブルシューティングガイド](./SO-ARM101-NanoCam-Troubleshooting.md)を参照してください。

## 概要とシステム構成

```text
SO-ARM101 主臂(leader) → USB 舵机驱动板 → Ubuntu 22.04 (LeRobot + ROS2 Humble + micro-ROS Agent)
                                            │  2.4 GHz Wi-Fi(同一局域网)
                                            ▼
                              ESP32-NanoCam 从臂控制器(ESP32-S3)
                                            │  1 Mbps UART(经舵机驱动板 UART 针脚中转)
                                            ▼
                              SO-ARM101 从臂(follower) 6 × STS3215
```

- リーダーアームの操作者の動作 → LeRobot がリーダーアームを読み取り → ROS2 トピック `/joint_command` → micro-ROS Agent が UDP 8888 で送信 → ESP32-NanoCam が受信して 6 個のサーボを駆動;
- フォロワーアームはフィードバック `/joint_states`(20Hz)を逆方向に返し、クローズドループとウォッチドッグとして機能;
- オンボードカメラは MJPEG ストリーム `http://<IP>/stream`(FPV)を配信し、PC 側で ROS トピックに変換できます。

役割分担:リーダーアームは Ubuntu PC に接続し、フォロワーアームは ESP32-NanoCam で制御され、両者はワイヤレスで接続されます。ファームウェアの電源投入後に利用できるオンボード機能:

| 機能 | 実装 | 説明 |
|---|---|---|
| micro-ROS 遠隔操作 | `main.cpp` + `servo_bus.cpp` | `/joint_states` 20Hz フィードバック、`/joint_command` コマンド受信、完全な安全機構を内蔵 |
| カメラ FPV | `camera_stream.cpp` | `http://<IP>/stream` MJPEG ストリーム(QVGA) |
| マイク | `audio_es8311.cpp` | 環境音量レベル → `/follower_audio/level`(Float32、5Hz) |
| スピーカー | `audio_es8311.cpp` | 起動/準備完了/ロック解除/エラーの通知音 |
| RGB ステータス LED | `rgb_status.cpp` | 起動=赤 → WiFi 接続=橙 → micro-ROS 準備完了=緑 → ロック解除=青;WiFi 切断=赤 |

## ハードウェア一覧

| ハードウェア | 数量 | 説明 |
|---|---|---|
| SO-ARM101 リーダーアーム | 1 | 6×STS3215 サーボ付き |
| SO-ARM101 フォロワーアーム | 1 | 6×STS3215 サーボ付き |
| ESP32-NanoCam モジュール | 1 | ESP32-S3 N16R8、オンボードカメラ/オーディオ/RGB |
| USB サーボドライバ基板 | 2 | キャリブレーション + リーダー/フォロワーアームバスの中継(UART ピン) |
| Ubuntu 22.04 PC | 1 | LeRobot + ROS2 + Agent を実行 |
| 2.4GHz ルーターまたはスマホのホットスポット | 1 | リーダーアーム側 PC と NanoCam を同一 LAN に接続 |
| 12V 5A 外部電源 | 1 | **フォロワーアームへの給電**(USB では 6 個のサーボを駆動できません) |
| 5V 6A 外部電源 | 1 | **リーダーアームへの給電**(Ubuntu PC に接続) |
| USB-C データケーブル | 2 | NanoCam の給電/デバッグ + リーダーアームドライバ基板と PC の接続 |

> NanoCam オンボードペリフェラル:カメラ GC2145(DVP);オーディオ ES8311(I2S 24kHz、AP2718AT マイク + NS4150B スピーカー);RGB WS2812 @ GPIO18。

## 配線方法

ESP32-NanoCam とフォロワーアームの間は**サーボドライバ基板の UART ピンを介して中継**します:

```text
舵机驱动板 UART:   RX ←── NanoCam TX (P2-8 / GPIO20)
                   TX ──→ NanoCam RX (P2-7 / GPIO19)
                  GND ──→ NanoCam GND
```

- **TX は RX、RX は TX に接続(クロス)**、GND は共通接地、ボーレート 1 Mbps;
- NanoCam のサーボバスは UART1 を使用し、モジュールの **P2-7 / P2-8** に接続(デバッグ用シリアルは USB-C、CH340K → UART0 で、両者は完全に独立しており同時に使用可能);
- サーボバスとサーボ電源は共通接地(フォロワーアームの 12V 5A 電源)。

### NanoCam 主要ピン

| ペリフェラル | ピン |
|---|---|
| サーボバス(UART1) | TX=GPIO20(P2-8 ESP_P)、RX=GPIO19(P2-7 ESP_N)、モジュール P2 ピンヘッダ |
| デバッグ用シリアル(UART0) | GPIO43/44 → オンボード CH340K → USB-C(ネイティブ USB CDC なし) |
| カメラ DVP(GC2145) | D0~D7=GPIO4/2/1/3/5/7/8/10、PCLK=6、VSYNC=13、HREF=11、XCLK=9(24MHz)、PWDN=12、RESET=14、SCCB SDA/SCL=41/42 |
| オーディオ ES8311(I2S) | MCLK=39、BCLK=38、WS=47、DIN(ADC)=40、DOUT(DAC)=48;I2C SDA/SCL=41/42、アドレス 0x30 |
| マイク | AP2718AT アナログ MEMS(ES8311 ADC 経由) |
| スピーカー | NS4150B D 級アンプ(ES8311 DAC 経由)、基板上に PA イネーブルピンなし |
| RGB | WS2812 @ GPIO18(1 個、GRB、RMT 駆動) |
| BOOT | GPIO0 |

> ピン定義は `docs/reference/nano_config.h` とハードウェア回路図ドキュメントに基づきます。

## 給電

| デバイス | 給電方式 |
|---|---|
| ESP32-NanoCam | **USB データケーブルから給電**(CH340K デバッグシリアルも同時に動作) |
| フォロワーアーム(6×STS3215) | **12V 5A** 外部電源 |
| リーダーアーム(Ubuntu PC に接続) | **5V 6A** 外部電源 |

> ⚠️ USB では 6 個のサーボを駆動できません。フォロワーアームには必ず 12V 5A の外部給電を使用してください。ESP32 は USB データケーブルからの給電で問題ありません。

## 環境要件

### ビルド・書き込み側(Windows / Linux / macOS いずれも可)

| 項目 | 要件 |
|---|---|
| OS | Windows 10/11 または Linux(macOS も可) |
| Python | 3.8 以上(`python --version` で確認) |
| PlatformIO | Core 6.x(esp32s3 ツールチェーン + Arduino フレームワークを含む) |
| ディスク容量 | 最低 3 GB の空き |
| ネットワーク | GitHub / Espressif CDN にアクセス可能(初回のツールチェーンダウンロードは約 1-2 GB) |

### 実行側(遠隔操作を実際に動かす Ubuntu 22.04 PC)

| 項目 | 要件 |
|---|---|
| OS | Ubuntu 22.04(64 ビット) |
| ROS 2 | Humble(Hawksbill) |
| LeRobot | Feetech SO-101 サポートを含む(`so101_leader` / `so101_follower`) |
| micro-ROS Agent | `snap run micro-ros-agent` またはソースからインストール |
| 依存コマンド | `nmcli`、`ip`、`flock`(NetworkManager、iproute2、util-linux に同梱) |
| Python 環境 | `lerobot_so101` 仮想環境(conda/miniforge) |

> デバッグ用シリアルの認識:NanoCam の USB インターフェースは CH340K → UART0 で、Linux でのデバイス名は通常 `/dev/ttyUSB0`(または `/dev/serial/by-id/...CH340*`)。PlatformIO は自動認識できます(ボード定義に CH340 の HWID 0x1A86:0x7523 を設定済み)。シリアルモニタのボーレートは 115200。より完全な LeRobot/Ubuntu 環境のインストールは [SO-ARM101 チュートリアル](./SO-ARM101-Tutorial.md)を参照してください。

## インストール手順

### 1. PlatformIO のインストール(ビルド・書き込み側)

**方法 A:VSCode 拡張機能(推奨)**

1. [VSCode](https://code.visualstudio.com/) をインストール;
2. 拡張機能マーケットプレイスで **PlatformIO IDE** を検索してインストール。インストール後に自動で再起動し、PlatformIO Core をダウンロード;
3. VSCode のターミナルで `pio --version` により確認。

**方法 B:コマンドラインでのインストール**

```bash
pip install platformio
```

> Windows で Git Bash から `pio` コマンドが見つからない場合は、PowerShell/CMD のターミナルに切り替えるか、`C:\Users\<用户名>\.platformio\penv\Scripts` を PATH に追加してください。

### 2. 初回ビルド(ツールチェーンの自動ダウンロード)

ファームウェアディレクトリに入り、一度コンパイルを実行します(書き込みはしません):

```bash
cd firmware/nanocam_soarm
pio run
```

初回は次のものが順にダウンロードされます:

1. espressif32 プラットフォーム(`espressif32@7.0.1`);
2. **ツールチェーン** `toolchain-xtensa-esp32s3`(約 100 MB、Espressif CDN から);
3. Arduino フレームワーク `framework-arduinoespressif32`(約 200 MB)。

ダウンロードが遅い/止まる場合の対処:

- PlatformIO の残り時間表示は不正確で、しばらく止まったように見えた後に突然完了することがよくあります。5 分ほど待ち、パーセンテージが進むか確認してください;
- プロキシ/VPN を有効にする(システムプロキシ経由);
- ツールチェーンを手動ダウンロード:ブラウザで `https://dl.espressif.com/dl/xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-win32.zip` をダウンロード(Linux は `-linux-amd64.tar.gz`)。解凍後にディレクトリ名を `toolchain-xtensa-esp32s3` に変更し、`C:\Users\<用户名>\.platformio\packages\` に配置して `pio run` を再実行;
- 途中で Ctrl+C で中断しても環境は壊れません。再実行すると続きからダウンロードされます。

### 3. Ubuntu 実行環境のインストール

```bash
# 1. ROS 2 Humble(按官方文档安装)
#    https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debs.html
source /opt/ros/humble/setup.bash

# 2. LeRobot(含 Feetech 支持)
conda create -n lerobot_so101 python=3.10 -y
conda activate lerobot_so101
pip install lerobot[feetech]

# 3. micro-ROS Agent
sudo snap install micro-ros-agent
snap run micro-ros-agent udp4 --port 8888   # 测试能否启动

# 4. PlatformIO(Ubuntu 端若也要编译烧录)
pip install platformio
```

## WiFi の設定

PC と NanoCam は同じ LAN に接続する必要があり(2.4GHz Wi-Fi、スマホのホットスポットで可)、ルーター/ホットスポットでクライアント分離が無効になっている必要があります。WiFi の設定方法は 2 つあり、どちらか一方を選びます。

### 方法 1:コンパイル時設定(デフォルト)

```bash
cd firmware/nanocam_soarm
cp src/wifi_config.example.h src/wifi_config.h
# 编辑 wifi_config.h:WIFI_SSID / WIFI_PASS / AGENT_IP(Ubuntu 电脑局域网 IP)
```

### 方法 2:シリアルコマンドによる設定(推奨、再書き込み不要)

ファームウェアには実行時設定(NVS 保存)が組み込まれており、デバッグ用シリアル(ボーレート 115200)からいつでも入力できます:

| コマンド | 機能 |
|---|---|
| `wifi_ssid:你的热点名` | WiFi 名を設定して保存 |
| `wifi_pass:你的密码` | WiFi パスワードを設定して保存 |
| `agent_ip:Ubuntu电脑IP` | micro-ROS Agent の IP を設定して保存 |
| `wifi_show` | 現在有効な設定を表示 |
| `wifi_clear` | 保存済み設定を消去し、コンパイル時のデフォルトに戻す |

いずれかの設定コマンドを保存すると **3 秒後に自動再起動して反映**されます。優先順位:シリアルで保存した設定 > コンパイル時のデフォルト。ホットスポットや PC を変更する場合も、USB を挿して 3 つのコマンドを入力するだけで、コードを変更して再書き込みする必要はありません。

> コンパイル時のデフォルト値(`wifi_config.h`)は常に保持され、シリアルで設定していない場合のフォールバックとして機能します。`wifi_show` は"来自 NVS"と"编译期默认"を区別して表示します。パスワードは平文で NVS に保存されますが、LAN 内でのデモ用途では許容範囲です。`wifi_config.h` には WiFi パスワードが含まれるため `.gitignore` で除外済みです。リポジトリにコミットしないでください。

## 書き込みと起動

```bash
cd firmware/nanocam_soarm
pio run --target upload
```

**ダウンロードモードへの移行(重要)**:NanoCam は CH340K → UART0 のシリアルダウンロードです(USB CDC による自動ダウンロードではありません)。まず upload をそのまま実行し、基板に自動ダウンロード回路があればそのまま成功します。接続できないと表示された場合:**BOOT キー(GPIO0)を押し続ける → USB を挿す(またはリセットを押す)→ BOOT を離す**、その後すぐに upload を再実行してください。Windows でシリアルポートが自動認識されない場合は、`platformio.ini` の `[env:nano_cam]` に `upload_port = COM3` の 1 行を追加します(デバイスマネージャーに表示される CH340 の実際の COM 番号に置き換えてください)。

シリアルログの確認:

```bash
pio device monitor --baud 115200
```

書き込み後は次のログが(この順で)表示されます:

```text
audio: ES8311 ready @24000Hz      ← 音频初始化成功
Servo Ping mask: 0x3f             ← 6 个舵机全部在线
Servo calibration match: YES      ← 标定数组与舵机 EEPROM 一致
IP: 192.168.x.x  RSSI: -xx        ← WiFi 已连
Waiting for micro-ROS Agent...    ← 等待 Agent(下一步启动后消失)
```

> 書き込み時にサーボバスは接続したままで問題ありません。書き込みとサーボ動作は互いに干渉しません(UART0 のデバッグと UART1 のサーボは独立)。プロジェクトには ESP32-S3(xtensa-lx7)版の micro-ROS 静的ライブラリが同梱されており、通常の使用では自分でコンパイルする必要はありません。

## キャリブレーションについて

プロジェクトの `cali/` ディレクトリにはリーダーアーム/フォロワーアームのキャリブレーションファイルが含まれており、ファームウェア内のキャリブレーション配列もフォロワーアームのキャリブレーション(`cali/follower_recal.json`)に合わせてあります。**フォロワーアーム/リーダーアームのハードウェアを交換した場合のみ、再キャリブレーションが必要です。**

```bash
# 从臂
python -m lerobot.scripts.lerobot_calibrate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --robot.id=follower_recal --robot.calibration_dir="$PWD/cali"

# 主臂
python -m lerobot.scripts.lerobot_calibrate \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM0 \
  --teleop.id=leader_recal --teleop.calibration_dir="$PWD/cali"
```

フォロワーアームを再キャリブレーションした後は、必ず `firmware/nanocam_soarm/src/servo_bus.cpp` を開き、`kHomingOffsets` / `kRangeMin` / `kRangeMax` の 3 つの配列を自分の `cali/follower_recal.json` の数値に置き換えて(順序:shoulder_pan, shoulder_lift, elbow_flex, wrist_flex, wrist_roll, gripper)、再コンパイルして書き込み直してください。

## ワイヤレス遠隔操作の実行

### 起動前チェック

```bash
# 1. Ubuntu 电脑连上与 NanoCam 相同的 2.4GHz WiFi
# 2. 主臂 USB 舵机驱动板已连接并识别
ls -l /dev/ttyACM*   # 找到主臂串口
# 3. 从臂 NanoCam 已上电并联网(串口或浏览器确认 MJPEG 流可访问)
```

### ワンクリック起動

```bash
# 设置环境(或直接编辑 start_soarm_demo.sh 顶部的默认值)
export SOARM_WIFI_SSID="你的2.4G热点"
export SOARM_AGENT_IP="Ubuntu电脑IP"
export SOARM_LEADER_PORT="/dev/ttyACM*"
export SOARM_PYTHON="$(command -v python)"   # lerobot_so101 环境

./start_soarm_demo.sh --check    # 预飞检查:网络/主臂/Agent/从臂在线
./start_soarm_demo.sh            # 正式启动遥操作,Ctrl+C 停止
```

スクリプトは次の順に処理します:

1. ネットワーク(SSID が `EXPECTED_WIFI_SSID` と一致していること)、リーダーアームのシリアルポート、キャリブレーションファイルの存在を確認;
2. micro-ROS Agent を起動(未起動の場合。ログは `logs/micro_ros_agent.log`);
3. フォロワーアームの `/joint_states` がオンラインになるのを待機(15s タイムアウト);
4. リーダーアームの動作 → フォロワーアームが追従、コマンド周波数 30Hz、**`--mapping-mode absolute`(絶対マッピング)**。

**absolute マッピングについて**:リーダーアームとフォロワーアームの姿勢がそれぞれのキャリブレーション座標系で 1 対 1 に対応し、利点は**切断・再接続後に累積偏差が生じない**ことです——再接続時、フォロワーアームは 8 秒以内にリーダーアームの現在の姿勢へスムーズに整列し(startup_blend)、その後リーダーアームが原点に戻るとフォロワーアームも自身の原点に戻ります。以前は relative(相対)マッピングを使用していましたが、切断・再接続後にフォロワーアームが切断時の位置に留まり、原点に戻ったリーダーアームとの間に恒久的な偏差が生じるため、absolute に変更しました。

**Agent 切断時の自動再起動**(ファームウェア 2026-08-19 以降):Ctrl+C で遠隔操作を停止した後、フォロワーアームは約 10 秒以内に自動再起動して `Waiting for micro-ROS Agent...` に戻ります。そのため本スクリプトをそのまま再実行でき、フォロワーアームを手動でリセットする必要はありません(再接続中にフォロワーアームは原点に戻ります。つまり再電源投入と同じです)。

リンク確立後、フォロワーアームのシリアルに `micro-ROS ready` が表示され(RGB が緑になり、スピーカーが準備完了音を再生)、`Waiting for micro-ROS Agent...` は消えます。

### トピックの手動確認

```bash
ros2 topic echo /joint_states --once           # 从臂反馈
ros2 topic hz /joint_states                    # 应约 20 Hz
ros2 topic echo /follower_audio/level --once   # 麦克风电平(说话时抬升)
```

## カメラ FPV

ファームウェアは電源投入・ネットワーク接続後に MJPEG ストリーミングサービスを自動起動します(オンボード GC2145、DVP インターフェース、デフォルト HTTP ポート 80):

```text
http://<NANOCAM_IP>/         信息页
http://<NANOCAM_IP>/jpg      单帧 JPEG(快照)
http://<NANOCAM_IP>/stream   连续 MJPEG 流(FPV)
```

### パラメータとチューニング

- 解像度 **QVGA 320×240**(正式構成)、**RGB565 キャプチャ + `frame2jpg` ソフトウェアエンコード**(GC2145 にはハードウェア JPEG エンコーダがなく、OV2640/OV5640 のみ搭載)、JPEG 品質 12、ダブルバッファを **8MB Octal PSRAM** に配置;
- **QVGA を採用する理由**:実測で VGA(640×480)RGB565 は本基板の DVP ではデータレートが高すぎ、画面下部の約 2/3 に表示崩れが発生(XCLK 24/20/16MHz × シングル/ダブルバッファの組み合わせすべてで再現);QVGA は全体が滑らかに表示されます(フレームレートがハードウェア JPEG より低いのは正常);
- ストリーミングは独立した httpd タスクで動作(ソフトウェアエンコードに対応するためスタックを 16KB に拡張)。micro-ROS 遠隔操作やオーディオキャプチャとは互いに干渉しません;
- デフォルト HTTP ポート 80(ファームウェア `HTTPD_DEFAULT_CONFIG()`);
- 解像度/品質を変更したい場合:`firmware/nanocam_soarm/src/camera_stream.cpp` 内の `config.frame_size` / `kJpegQuality` を編集。画面の向きは `set_vflip` / `set_hmirror` で調整(同じファイル内);
- esp_http_server はシングルタスクのため、`/stream` と `/jpg` は**同時にアクセスできません**(ストリームを開いている間は `/jpg` がハングします);
- カメラの初期化に失敗した場合、ファームウェアは 1 行のメッセージを出力して通常動作を続行し、遠隔操作には影響しません。

PC 側での受信(ROS 2 トピックとして配信、メッセージ型 `sensor_msgs/CompressedImage`):

```bash
# 终端 1:照常启动遥操作
./start_soarm_demo.sh

# 终端 2:接收视频并发布话题
source /opt/ros/humble/setup.bash
python3 tools/follower_camera.py --stream http://<NANOCAM_IP>/stream
# 可选:--topic /自定义话题  --max-fps 10

# 验证
ros2 topic hz /follower_camera/image_raw/compressed   # 应约 10~15 Hz
rviz2    # Add → By topic → Camera,选 /follower_camera/image_raw/compressed
```

ROS をインストールしなくても先にリンクを確認できます:ブラウザで `http://<NANOCAM_IP>/stream` を開くか、`curl -s http://<NANOCAM_IP>/jpg -o snap.jpg` を実行してください。

## オーディオ(マイクとスピーカー)

**マイク**:AP2718AT アナログ MEMS(ES8311 ADC 経由)。ファームウェアは 200ms ごとに環境音量レベル(RMS、0~1 に正規化)を読み取り、`/follower_audio/level`(`std_msgs/Float32`、best-effort)に配信します。音声活動検出や環境モニタリング、"話者がいる時だけキャプチャする"ための簡単なトリガ信号として自分で実装できます。

```bash
ros2 topic echo /follower_audio/level
```

**スピーカー**:ES8311 DAC → NS4150B D 級アンプ(基板上に PA イネーブルピンなし)。4 組の通知音を内蔵(次節参照)。カスタム通知音が必要な場合は `audio_es8311.cpp` の `play_tone()` 呼び出しを変更してください。音量は ES8311 のレジスタ 0x32(`R_DAC32`、現在のファームウェアでは最大値 0xFF に設定済み)。

### オーディオのパラメータとチューニング

- サンプリングレート 24 kHz、16-bit、ステレオスロット(NanoCam 純正ファームウェアと同一)、MCLK = 256×FS = 6.144 MHz;
- **MCLK は LEDC で生成**(GPIO39、80MHz÷13≈6.154MHz、誤差 0.16% は許容範囲内):legacy I2S ドライバは ESP32-S3 で MCLK を出力せず、スピーカー無音 + マイクレベルが恒常的に 0 になります。`audio_es8311.cpp` の `start_ledc_mclk()` で LEDC を使い修正済み;
- ES8311 の制御は I2C1(GPIO41/42 の物理バスはカメラ SCCB と共用。カメラは起動時にのみ SCCB を使用するため実行時の競合なし)。`init()` の末尾で `Wire1.end()` を呼び I2C をカメラ用に解放;
- マイクゲインのデフォルト値は NanoCam 純正と同一(レジスタ 0x16 = 0x24)。感度を上げたい場合は `audio_es8311.cpp` の `R_ADC16` の値を調整してください。

## RGB ステータス LED と通知音

### RGB の状態の意味

| 色 | 状態 |
|---|---|
| 赤 | 起動中 / micro-ROS 初期化失敗 / WiFi 切断 |
| 橙 | WiFi 接続済み、micro-ROS Agent を待機中 |
| 緑 | micro-ROS 準備完了(遠隔操作リンク確立) |
| 青 | サーボ制御のロック解除済み(ARMED) |
| 紫 | 制御コマンドが拒否(ハンドシェイク/リミット/ステップ幅の不一致) |

### スピーカー通知音

| イベント | 通知音 |
|---|---|
| 電源投入 | 短い"ピピッ"2 回(起動音) |
| micro-ROS 準備完了 | 上昇する 2 音 |
| サーボのロック解除 | 上昇する 2 音 |
| 初期化失敗 | 低い音 1 回 |

> 通知音はイベントドリブンです:起動音は電源投入時に再生され、準備完了音は Agent との通信確立時に、ロック解除音は制御コマンドの受信時に再生されます。そのため、電源投入のみで遠隔操作を実行しない場合は起動音だけが聞こえます。

## 安全機構

ファームウェアには以下の安全機構が組み込まれており、手動設定は不要です:

- サーボ ID チェック、EEPROM キャリブレーションチェック;
- 現在姿勢のハンドシェイク(0.05 rad);
- ソフトリミット;1 コマンドあたりのステップ制限 0.25 rad;
- フィードバックウォッチドッグ 0.5 s;
- WiFi 切断後 10 s のタイムアウトで自動再起動。

> 飛行デモの注意:逆さ吊りで取り付けた後は、関節の方向、重心、給電(BEC)方式を再確認し、EMI 干渉テストを行ってください。

## 検証状況

### テスト結果(想定)

- フォロワー側の 6 個のサーボをすべて認識(`servo_mask=0x3f`);
- `/joint_states` は約 20 Hz で配信;
- メイン制御ブリッジは 30 Hz でコマンドを配信;
- カメラストリーム `http://<IP>/stream` は QVGA で滑らか;
- `/follower_audio/level` は 5 Hz で配信され、話すとレベルが明らかに上昇;
- RGB ステータス LED が起動→ネットワーク接続→準備完了→ロック解除と段階的に変化;
- USB データケーブルを抜いても(ESP32 は独立給電、フォロワーアームは外部 12V 給電)動作を継続できます。

### 開発状況

**実機検証済み(2026-08-19):**

- オーディオ `ES8311 ready @24000Hz`(MCLK 出力正常 + スピーカー/マイクともに正常。MCLK 欠落 + 音量過小を修正);
- WiFi 接続 + micro-ROS 通信(`/joint_states` 20Hz で安定、`/follower_audio/level` 正常);
- GC2145 カメラ FPV:QVGA `/stream` が完全かつ滑らか(I2C 競合 / ソフトウェアエンコード / httpd スタック / multipart バウンダリを修正);
- 遠隔操作リンク全体(リーダーアームの動作 → フォロワーアームの追従);
- **absolute マッピング + Agent 切断時の自動再起動**:切断・再接続後にリーダー/フォロワーアームが偏差なく整列;Ctrl+C 後はフォロワーアームが自動再起動して再接続を待機。

**未検証:**

- 飛行シーン:逆さ吊り取り付けの方向、重心、給電(BEC)、EMI 干渉。

## プロジェクト構成とファームウェア応用

本プロジェクトのフォロワーアームコントローラは、ESP32-S3 から自社開発の ESP32-NanoCam モジュール(ESP32-S3 N16R8、オンボード DVP カメラ / ES8311 オーディオ / WS2812 RGB)へと進化しました。

### ディレクトリ構造

```text
firmware/nanocam_soarm/   ESP32-NanoCam 从臂固件 (PlatformIO)
  ├─ boards/nano_cam.json 自研板卡定义 (16MB Flash / 8MB Octal PSRAM)
  ├─ src/                 固件源码 (micro-ROS 遥操作 + 摄像头 + 音频 + RGB)
  ├─ lib/microros/        micro-ROS 静态库 (xtensa-lx7)
  └─ lib/scservo/         SCServo 舵机库 (本地化, 无网络依赖)
tools/                    PC 端脚本 (wireless_teleoperate.py 遥操作桥, follower_camera.py FPV 接收)
start_soarm_demo.sh       一键启动脚本 (网络/Agent/标定预检 + 遥操作)
cali/                     主臂/从臂标定文件
docs/                     项目进度与实验记录 + 硬件参考 (docs/reference/)
```

### 初期バージョンとの違い

| 項目 | 本プロジェクト (ESP32-NanoCam) |
|---|---|
| ボード定義 | 自作 `boards/nano_cam.json`(16MB Flash / 8MB Octal PSRAM、qio_opi) |
| サーボバス | Serial1/UART1、TX=20/RX=19(UART0 は CH340K デバッグが使用) |
| デバッグ用シリアル | UART0 (43/44) → CH340K → USB-C |
| カメラ | NanoCam DVP GC2145(GPIO1~14 + 41/42)、XCLK 24MHz |
| オーディオ | ES8311 + AP2718AT マイク + NS4150B スピーカー(新規追加) |
| RGB | WS2812 ステータス LED(新規追加) |
| micro-ROS ライブラリ | xtensa-lx7——NanoCam も ESP32-S3 のため S3 版と共通 |
| PC 側スクリプト | 変更なし(tools/、start_soarm_demo.sh はハードウェア非依存) |

### micro-ROS ヘッダパスと build_flags

micro-ROS のヘッダツリーはフラット構造(`include/<pkg>/<header>.h`)で、`-Ilib/microros/include` のルートパスのみを保持します。パッケージごとの `-Ilib/microros/include/<pkg>/` パスを**追加しないでください**——`<string.h>` が `rosidl_runtime_c/string.h` に、WiFi ライブラリの `<Client.h>` が `rcl/Client.h` に解決され、コンパイルエラーになります。

### libmicroros.a の再ビルド(ESP32-S3 / xtensa-lx7)

> 本プロジェクトの `firmware/nanocam_soarm/lib/microros/` には ESP32-S3 版の静的ライブラリを同梱済み(NanoCam は ESP32-S3 のためライブラリは共通)。**通常の使用では本節をスキップしてください**。micro-ROS の構成(メッセージ型、QoS、メモリプールなど)をカスタマイズする場合にのみ再ビルドが必要で、日常的な開発で `libmicroros.a` を再コンパイルする必要はありません。

**方法 A:公式 Docker ビルダー(推奨、任意のマシンで実行可能)**

micro-ROS 公式 `micro_ros_arduino` ライブラリの生成スクリプトには **esp32s3 ターゲット**が付属しています:

```bash
git clone -b humble https://github.com/micro-ROS/micro_ros_arduino.git
cd micro_ros_arduino
docker pull microros/micro_ros_static_library_builder:humble
docker run -it --rm -v $(pwd):/project \
  --env MICROROS_LIBRARY_FOLDER=extras \
  microros/micro_ros_static_library_builder:humble -p esp32s3
```

成果物は `src/esp32s3/libmicroros.a`、ヘッダファイルは `src/` 以下の各パッケージディレクトリにあります:

```bash
cp src/esp32s3/libmicroros.a <工程>/firmware/nanocam_soarm/lib/microros/
# 头文件整体替换(保留该目录下的 default_transport.cpp / wifi_transport.cpp /
# micro_ros_arduino.h 三个自定义文件)
rsync -a src/* <工程>/firmware/nanocam_soarm/lib/microros/include/ \
  --exclude esp32s3 --exclude '*.cpp' --exclude micro_ros_arduino.h
```

**ツールチェーンについて**:公式スクリプトの esp32s3 セクションはデフォルトで `xtensa-esp32-elf`(LX6)ツールチェーンでコンパイルしますが、LX6/LX7 は通常の C コードの命令セットに互換性があり実行可能です。本プロジェクトに同梱の `libmicroros.a` は**純正の LX7 ツールチェーン**(`xtensa-esp32s3-elf` gcc 8.4.0、PlatformIO 内蔵版と同一)でコンパイルされており、手順は次のとおりです:`xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-linux-amd64.tar.gz`(Espressif crosstool-NG releases)をダウンロードして解凍し、`library_generation.sh` の esp32s3 セクションの `TOOLCHAIN_PREFIX` を `/uros_ws/xtensa-esp32s3-elf/bin/xtensa-esp32s3-elf-` に変更してから、コンテナにマウントして再実行します:

```bash
docker run --platform linux/amd64 -it --rm \
  -v $(pwd):/project \
  -v <解压目录>/xtensa-esp32s3-elf:/uros_ws/xtensa-esp32s3-elf \
  --env MICROROS_LIBRARY_FOLDER=extras \
  microros/micro_ros_static_library_builder:humble -p esp32s3
```

> 注意:Apple Silicon では `--platform linux/amd64` を必ず追加してください(イメージ内蔵の esp32 ツールチェーンは x86_64 バイナリで、arm64 コンテナ内では実行できません)。

**方法 B:Ubuntu 22.04 + ROS 2 Humble + PlatformIO ツールチェーン**

1. PlatformIO が S3 ツールチェーンをダウンロード済みであることを確認(ファームウェアディレクトリで一度 `pio run` を実行すれば OK):

   ```bash
   ls ~/.platformio/packages/toolchain-xtensa-esp32s3/bin/xtensa-esp32s3-elf-gcc
   ls ~/.platformio/packages/framework-arduinoespressif32/tools/sdk/esp32s3
   ```

2. micro_ros_setup で micro-ROS ソースを取得(`build_microros.sh` の `/tmp/firmware/mcu_ws` レイアウトと一致):

   ```bash
   mkdir -p /tmp/firmware && cd /tmp/firmware
   git clone -b humble https://github.com/micro-ROS/micro_ros_setup.git src/micro_ros_setup
   # 安装 micro_ros_setup 依赖后:
   source /opt/ros/humble/setup.bash
   colcon build && source install/local_setup.bash
   ros2 run micro_ros_setup create_firmware_ws.sh generate_lib
   ```

3. 本プロジェクトの S3 ビルドスクリプトを実行:

   ```bash
   cd <工程>/firmware/nanocam_soarm
   chmod +x build_microros_s3.sh
   ./build_microros_s3.sh
   ```

   スクリプトは riscv32 → xtensa-esp32s3、`-march=rv32imc` → `-mlongcalls`、`esp32c3` SDK → `esp32s3` SDK に置き換え済みです。成果物はスクリプト末尾の案内に従ってプロジェクトにコピーしてください。

### 参考資料

- NanoCam ハードウェア参考ドキュメント(回路図/仕様書/ピン定義/ES8311 ドライバ):リポジトリ `docs/reference/`
- [micro-ROS](https://micro.ros.org/) / [micro_ros_arduino](https://github.com/micro-ROS/micro_ros_arduino)
- [LeRobot](https://github.com/huggingface/lerobot)

<RelatedProducts slugs="so-arm101,esp32-s3-wifi-module" />
