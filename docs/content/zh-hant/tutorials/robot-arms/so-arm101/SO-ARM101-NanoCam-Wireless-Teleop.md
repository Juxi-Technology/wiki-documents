---
title: SO-ARM101 無線遙操作(ESP32-NanoCam 版)
description: "SO-ARM101 無線遙操作(ESP32-NanoCam 版):主動臂經 LeRobot 連電腦,從動臂由 NanoCam 以 micro-ROS WiFi 控制,含接線與校準。"
---

# SO-ARM101 無線遙操作(ESP32-NanoCam 版)

> **[ 淘寶店鋪 ](https://juxitechnology.taobao.com)**

本教程面向比賽演示的無人機搭載 SO-ARM101 機械臂無線遙操作場景:主動臂透過 LeRobot 連接 Ubuntu 電腦,從動臂使用自研的 [ESP32-S3 WiFi 視頻模組](/zh-hant/products/esp32-s3-wifi-module)(ESP32-NanoCam,ESP32-S3 N16R8)控制,透過 micro-ROS WiFi UDP 接收指令,並集成板載攝像頭 FPV、麥克風、揚聲器與 RGB 狀態燈。遇到問題請參考 [故障排除指南](./SO-ARM101-NanoCam-Troubleshooting.md)。

## 簡介與系統架構

```text
SO-ARM101 主動臂(leader) → USB 舵機驅動板 → Ubuntu 22.04 (LeRobot + ROS2 Humble + micro-ROS Agent)
                                            │  2.4 GHz Wi-Fi(同一局域網)
                                            ▼
                              ESP32-NanoCam 從動臂控制器(ESP32-S3)
                                            │  1 Mbps UART(經舵機驅動板 UART 針腳中轉)
                                            ▼
                              SO-ARM101 從動臂(follower) 6 × STS3215
```

- 主動臂操作者動作 → LeRobot 讀主動臂 → ROS2 話題 `/joint_command` → micro-ROS Agent 透過 UDP 8888 發送 → ESP32-NanoCam 收下並驅動 6 個舵機;
- 從動臂反饋 `/joint_states`(20Hz)反向回傳,作為閉環與看門狗;
- 板載攝像頭發布 MJPEG 流 `http://<IP>/stream`(FPV),PC 端可轉成 ROS 話題。

角色分工:主動臂接 Ubuntu 電腦;從動臂由 ESP32-NanoCam 控制,兩者無線連接。固件上電後的板載功能:

| 功能 | 實現 | 說明 |
|---|---|---|
| micro-ROS 遙操作 | `main.cpp` + `servo_bus.cpp` | `/joint_states` 20Hz 反饋、`/joint_command` 命令接收,內置完整安全機制 |
| 攝像頭 FPV | `camera_stream.cpp` | `http://<IP>/stream` MJPEG 流(QVGA) |
| 麥克風 | `audio_es8311.cpp` | 環境音量電平 → `/follower_audio/level`(Float32,5Hz) |
| 揚聲器 | `audio_es8311.cpp` | 啟動/就緒/解鎖/錯誤提示音 |
| RGB 狀態燈 | `rgb_status.cpp` | 啟動紅 → WiFi 橙 → micro-ROS 綠 → 解鎖藍;WiFi 丟失紅 |

## 硬體清單

| 硬體 | 數量 | 說明 |
|---|---|---|
| SO-ARM101 主動臂 | 1 | 帶 6×STS3215 舵機 |
| SO-ARM101 從動臂 | 1 | 帶 6×STS3215 舵機 |
| ESP32-NanoCam 模組 | 1 | ESP32-S3 N16R8,板載攝像頭/音頻/RGB |
| USB 舵機驅動板 | 2 | 校準 + 主從臂總線中轉(UART 針腳) |
| Ubuntu 22.04 電腦 | 1 | 運行 LeRobot + ROS2 + Agent |
| 2.4GHz 路由器或手機熱點 | 1 | 主動臂電腦與 NanoCam 同一局域網 |
| 12V 5A 外部電源 | 1 | **從動臂供電**(USB 帶不動 6 個舵機) |
| 5V 6A 外部電源 | 1 | **主動臂供電**(連接 Ubuntu 電腦) |
| USB-C 數據線 | 2 | NanoCam 供電/調試 + 主動臂驅動板連電腦 |

> NanoCam 板載外設:攝像頭 GC2145(DVP);音頻 ES8311(I2S 24kHz,AP2718AT 麥克風 + NS4150B 揚聲器);RGB WS2812 @ GPIO18。

## 接線方式

ESP32-NanoCam 與從動臂之間**透過舵機驅動板的 UART 針腳中轉**:

```text
舵機驅動板 UART:   RX ←── NanoCam TX (P2-8 / GPIO20)
                   TX ──→ NanoCam RX (P2-7 / GPIO19)
                  GND ──→ NanoCam GND
```

- **TX 連 RX、RX 連 TX(交叉)**,GND 共地,1 Mbps 波特率;
- NanoCam 舵機總線走 UART1,接模組 **P2-7 / P2-8**(調試串口走 USB-C,CH340K → UART0,兩者完全獨立,可以同時使用);
- 舵機總線與舵機電源共地(從動臂 12V 5A 電源)。

### NanoCam 主要引腳

| 外設 | 引腳 |
|---|---|
| 舵機總線(UART1) | TX=GPIO20(P2-8 ESP_P),RX=GPIO19(P2-7 ESP_N),模組 P2 排針 |
| 調試串口(UART0) | GPIO43/44 → 板載 CH340K → USB-C(無原生 USB CDC) |
| 攝像頭 DVP(GC2145) | D0~D7=GPIO4/2/1/3/5/7/8/10,PCLK=6,VSYNC=13,HREF=11,XCLK=9(24MHz),PWDN=12,RESET=14,SCCB SDA/SCL=41/42 |
| 音頻 ES8311(I2S) | MCLK=39,BCLK=38,WS=47,DIN(ADC)=40,DOUT(DAC)=48;I2C SDA/SCL=41/42,地址 0x30 |
| 麥克風 | AP2718AT 模擬 MEMS(經 ES8311 ADC) |
| 揚聲器 | NS4150B D 類功放(經 ES8311 DAC),板上無 PA 使能腳 |
| RGB | WS2812 @ GPIO18(1 顆,GRB,RMT 驅動) |
| BOOT | GPIO0 |

> 引腳定義來自 `docs/reference/nano_config.h` 與硬體原理圖文檔。

## 供電

| 設備 | 供電方式 |
|---|---|
| ESP32-NanoCam | **USB 數據線供電**(CH340K 調試串口同時工作) |
| 從動臂(6×STS3215) | **12V 5A** 外部電源 |
| 主動臂(連接 Ubuntu 電腦) | **5V 6A** 外部電源 |

> ⚠️ USB 帶不動 6 個舵機,從動臂必須用 12V 5A 外部供電;ESP32 用 USB 數據線供電即可。

## 環境要求

### 編譯燒錄端(Windows / Linux / macOS 均可)

| 項 | 要求 |
|---|---|
| 操作系統 | Windows 10/11 或 Linux(macOS 也可) |
| Python | 3.8+(`python --version` 驗證) |
| PlatformIO | Core 6.x(含 esp32s3 工具鏈 + Arduino 框架) |
| 磁碟空間 | 至少 3 GB 空閒 |
| 網絡 | 能訪問 GitHub / Espressif CDN(首次下載工具鏈約 1-2 GB) |

### 運行端(Ubuntu 22.04 電腦,最終跑遙操作的地方)

| 項 | 要求 |
|---|---|
| 操作系統 | Ubuntu 22.04(64 位) |
| ROS 2 | Humble(Hawksbill) |
| LeRobot | 含 Feetech SO-101 支持(`so101_leader` / `so101_follower`) |
| micro-ROS Agent | `snap run micro-ros-agent` 或源碼安裝 |
| 依賴命令 | `nmcli`、`ip`、`flock`(NetworkManager、iproute2、util-linux 自帶) |
| Python 環境 | `lerobot_so101` 虛擬環境(conda/miniforge) |

> 調試串口識別:NanoCam 的 USB 接口是 CH340K 轉 UART0,Linux 下設備名通常是 `/dev/ttyUSB0`(或 `/dev/serial/by-id/...CH340*`),PlatformIO 可自動識別(板卡定義已配 CH340 的 HWID 0x1A86:0x7523);串口監視器波特率 115200。更完整的 LeRobot/Ubuntu 環境安裝可參考 [SO-ARM101 使用教程](./SO-ARM101-Tutorial.md)。

## 安裝步驟

### 1. 安裝 PlatformIO(編譯燒錄端)

**方式 A:VSCode 擴展(推薦)**

1. 安裝 [VSCode](https://code.visualstudio.com/);
2. 擴展商店搜索 **PlatformIO IDE** 並安裝,裝完自動重啟並下載 PlatformIO Core;
3. 在 VSCode 終端裏用 `pio --version` 驗證。

**方式 B:命令行安裝**

```bash
pip install platformio
```

> Windows 下 `pio` 命令若在 Git Bash 裏找不到,改用 PowerShell/CMD 終端,或把 `C:\Users\<你的使用者名稱>\.platformio\penv\Scripts` 加入 PATH。

### 2. 首次構建(自動下載工具鏈)

進入固件目錄跑一次編譯(不燒錄):

```bash
cd firmware/nanocam_soarm
pio run
```

首次會依次下載:

1. espressif32 平台(`espressif32@7.0.1`);
2. **工具鏈** `toolchain-xtensa-esp32s3`(約 100 MB,來自 Espressif CDN);
3. Arduino 框架 `framework-arduinoespressif32`(約 200 MB)。

下載慢/卡住的處理:

- PlatformIO 剩餘時間估算不準,常卡住一段時間後突然跳完,給 5 分鐘觀察百分比是否推進;
- 開代理/VPN(走系統代理);
- 手動下載工具鏈:瀏覽器下載 `https://dl.espressif.com/dl/xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-win32.zip`(Linux 對應 `-linux-amd64.tar.gz`),解壓後把目錄改名為 `toolchain-xtensa-esp32s3` 放入 `C:\Users\<你的使用者名稱>\.platformio\packages\`,重跑 `pio run`;
- 中途 Ctrl+C 中斷不會損壞環境,重跑會續傳。

### 3. 安裝 Ubuntu 運行環境

```bash
# 1. ROS 2 Humble(按官方文檔安裝)
#    https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debs.html
source /opt/ros/humble/setup.bash

# 2. LeRobot(含 Feetech 支持)
conda create -n lerobot_so101 python=3.10 -y
conda activate lerobot_so101
pip install lerobot[feetech]

# 3. micro-ROS Agent
sudo snap install micro-ros-agent
snap run micro-ros-agent udp4 --port 8888   # 測試能否啟動

# 4. PlatformIO(Ubuntu 端若也要編譯燒錄)
pip install platformio
```

## 配置 WiFi

PC 與 NanoCam 必須在同一局域網(2.4GHz Wi-Fi,手機熱點即可),且路由器/熱點未開啟客戶端隔離。WiFi 配置有兩種方式,二選一。

### 方式一:編譯期配置(默認)

```bash
cd firmware/nanocam_soarm
cp src/wifi_config.example.h src/wifi_config.h
# 編輯 wifi_config.h:WIFI_SSID / WIFI_PASS / AGENT_IP(Ubuntu 電腦局域網 IP)
```

### 方式二:串口命令配置(推薦,無需重燒)

固件內置運行時配置(NVS 存儲),透過調試串口(115200 波特率)隨時輸入:

| 命令 | 作用 |
|---|---|
| `wifi_ssid:你的熱點名` | 設置 WiFi 名稱並保存 |
| `wifi_pass:你的密碼` | 設置 WiFi 密碼並保存 |
| `agent_ip:Ubuntu電腦IP` | 設置 micro-ROS Agent IP 並保存 |
| `wifi_show` | 查看當前生效配置 |
| `wifi_clear` | 清除已保存配置,恢復編譯期默認 |

任意設置命令保存後 **3 秒自動重啟生效**。優先級:串口保存的配置 > 編譯期默認。換熱點/換電腦只需插 USB 敲三條命令,不用改代碼重燒。

> 編譯期默認值(`wifi_config.h`)始終保留,作為未用串口配置過時的回退;`wifi_show` 會區分"來自 NVS"和"編譯期默認"。密碼以明文存於 NVS,局域網演示場景可接受;`wifi_config.h` 含 WiFi 密碼,已被 `.gitignore` 排除,請勿提交到倉庫。

## 燒錄與啟動

```bash
cd firmware/nanocam_soarm
pio run --target upload
```

**進下載模式(關鍵)**:NanoCam 走 CH340K → UART0 串口下載(非 USB CDC 自動下載)。先直接跑 upload,若板子有自動下載電路會直接成功;若提示連接不上:**按住 BOOT 鍵(GPIO0)→ 插 USB(或按復位)→ 鬆開 BOOT**,立即重跑 upload。Windows 下若沒自動識別串口,可在 `platformio.ini` 的 `[env:nano_cam]` 加一行 `upload_port = COM3`(替換成設備管理器裏 CH340 的實際 COM 號)。

查看串口日誌:

```bash
pio device monitor --baud 115200
```

燒錄後應看到(按序出現):

```text
audio: ES8311 ready @24000Hz      ← 音頻初始化成功
Servo Ping mask: 0x3f             ← 6 個舵機全部在線
Servo calibration match: YES      ← 校準數組與舵機 EEPROM 一致
IP: 192.168.x.x  RSSI: -xx        ← WiFi 已連
Waiting for micro-ROS Agent...    ← 等待 Agent(下一步啟動後消失)
```

> 舵機總線燒錄時可空着,燒錄與舵機運行互不干擾(UART0 調試 / UART1 舵機獨立)。工程已附帶 ESP32-S3(xtensa-lx7)版 micro-ROS 靜態庫,日常使用無需自行編譯。

## 校準說明

工程 `cali/` 目錄已含主動臂/從動臂校準文件,固件內的校準數組也已與從動臂校準對齊(即 `cali/follower_recal.json`)。**只有更換從動臂/主動臂硬體時才需要重新校準。**

```bash
# 從動臂
python -m lerobot.scripts.lerobot_calibrate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --robot.id=follower_recal --robot.calibration_dir="$PWD/cali"

# 主動臂
python -m lerobot.scripts.lerobot_calibrate \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM0 \
  --teleop.id=leader_recal --teleop.calibration_dir="$PWD/cali"
```

重新校準從動臂後,必須打開 `firmware/nanocam_soarm/src/servo_bus.cpp`,把 `kHomingOffsets` / `kRangeMin` / `kRangeMax` 三個數組替換成自己的 `cali/follower_recal.json` 數值(順序:shoulder_pan, shoulder_lift, elbow_flex, wrist_flex, wrist_roll, gripper),然後重新編譯燒錄。

## 運行無線遙操作

### 啟動前檢查

```bash
# 1. Ubuntu 電腦連上與 NanoCam 相同的 2.4GHz WiFi
# 2. 主動臂 USB 舵機驅動板已連接並識別
ls -l /dev/ttyACM*   # 找到主動臂串口
# 3. 從動臂 NanoCam 已上電並聯網(串口或瀏覽器確認 MJPEG 流可訪問)
```

### 一鍵啟動

```bash
# 設置環境(或直接編輯 start_soarm_demo.sh 頂部的默認值)
export SOARM_WIFI_SSID="你的2.4G熱點"
export SOARM_AGENT_IP="Ubuntu電腦IP"
export SOARM_LEADER_PORT="/dev/ttyACM*"
export SOARM_PYTHON="$(command -v python)"   # lerobot_so101 環境

./start_soarm_demo.sh --check    # 預飛檢查:網絡/主動臂/Agent/從動臂在線
./start_soarm_demo.sh            # 正式啟動遙操作,Ctrl+C 停止
```

腳本會按順序做:

1. 檢查網絡(SSID 須與 `EXPECTED_WIFI_SSID` 一致)、主動臂串口、校準文件存在;
2. 啟動 micro-ROS Agent(若未運行,日誌在 `logs/micro_ros_agent.log`);
3. 等從動臂 `/joint_states` 上線(15s 超時);
4. 主動臂動作 → 從動臂跟隨,30Hz 命令頻率,**`--mapping-mode absolute`(絕對映射)**。

**關於 absolute 映射**:主動臂姿態與從動臂姿態在各自校準坐標系裏一一對應,好處是**斷連重連後無累積偏差**——重連時從動臂在 8 秒內平滑對齊主動臂當前姿態(startup_blend),之後主動臂回零 → 從動臂也回自己零位。曾用 relative(相對)映射,但斷連重連後從動臂停留在斷連位置,與回到零位的主動臂產生永久偏差,故改為 absolute。

**Agent 失聯自動重啟**(固件 2026-08-19 後):Ctrl+C 停掉遙操作後,從動臂約 10 秒內自動重啟回到 `Waiting for micro-ROS Agent...`,因此可直接重跑本腳本,無需手動復位從動臂(重連期間從動臂會回零位,即重新上電)。

鏈路建立後從動臂串口打印 `micro-ROS ready`(RGB 變綠、揚聲器響就緒提示音),`Waiting for micro-ROS Agent...` 隨之消失。

### 手動驗證話題

```bash
ros2 topic echo /joint_states --once           # 從動臂反饋
ros2 topic hz /joint_states                    # 應約 20 Hz
ros2 topic echo /follower_audio/level --once   # 麥克風電平(說話時抬升)
```

## 攝像頭 FPV

固件上電聯網後自動啟動 MJPEG 流媒體服務(板載 GC2145,DVP 接口,默認 HTTP 端口 80):

```text
http://<NANOCAM_IP>/         信息頁
http://<NANOCAM_IP>/jpg      單幀 JPEG(快照)
http://<NANOCAM_IP>/stream   連續 MJPEG 流(FPV)
```

### 參數與調參

- 分辨率 **QVGA 320×240**(正式配置),**RGB565 採集 + `frame2jpg` 軟件編碼**(GC2145 無硬件 JPEG 編碼器,僅 OV2640/OV5640 有),JPEG 質量 12,雙緩衝放 **8MB Octal PSRAM**;
- **為何用 QVGA**:實測 VGA(640×480) RGB565 在此板 DVP 上數據率過高,畫面下方約 2/3 花屏(XCLK 24/20/16MHz × 單/雙緩衝組合均復現);QVGA 完整流暢(幀率比硬件 JPEG 低,屬正常);
- 流媒體運行在獨立 httpd 任務中(棧已調至 16KB 容納軟編碼),與 micro-ROS 遙操作、音頻採集互不干擾;
- 默認 HTTP 端口 80(固件 `HTTPD_DEFAULT_CONFIG()`);
- 想改分辨率/質量:編輯 `firmware/nanocam_soarm/src/camera_stream.cpp` 裏的 `config.frame_size` / `kJpegQuality`;畫面方向用 `set_vflip` / `set_hmirror` 調整(同文件);
- esp_http_server 單任務,`/stream` 與 `/jpg` **不能同時訪問**(開着流時 `/jpg` 會掛起);
- 攝像頭初始化失敗時固件打印一行提示後繼續正常工作,遙操作不受影響。

PC 端接收(發布為 ROS 2 話題,消息類型 `sensor_msgs/CompressedImage`):

```bash
# 終端 1:照常啟動遙操作
./start_soarm_demo.sh

# 終端 2:接收視頻並發布話題
source /opt/ros/humble/setup.bash
python3 tools/follower_camera.py --stream http://<NANOCAM_IP>/stream
# 可選:--topic /自定義話題  --max-fps 10

# 驗證
ros2 topic hz /follower_camera/image_raw/compressed   # 應約 10~15 Hz
rviz2    # Add → By topic → Camera,選 /follower_camera/image_raw/compressed
```

不裝 ROS 也能先驗證鏈路:瀏覽器打開 `http://<NANOCAM_IP>/stream`,或 `curl -s http://<NANOCAM_IP>/jpg -o snap.jpg`。

## 音頻(麥克風與揚聲器)

**麥克風**:AP2718AT 模擬 MEMS(經 ES8311 ADC)。固件每 200ms 讀取一次環境音量電平(RMS,歸一化 0~1),發布到 `/follower_audio/level`(`std_msgs/Float32`,best-effort)。可自行實現語音活動檢測、環境監聽,或作為"有人說話再抓取"的簡單觸發信號。

```bash
ros2 topic echo /follower_audio/level
```

**揚聲器**:ES8311 DAC → NS4150B D 類功放(板上無 PA 使能腳),內置四組提示音(見下節);如需自定義提示音,修改 `audio_es8311.cpp` 中的 `play_tone()` 調用。音量在 ES8311 寄存器 0x32(`R_DAC32`,當前固件已設為最大 0xFF)。

### 音頻參數與調參

- 採樣率 24 kHz、16-bit、立體聲槽位(與 NanoCam 原廠固件一致),MCLK = 256×FS = 6.144 MHz;
- **MCLK 由 LEDC 生成**(GPIO39,80MHz÷13≈6.154MHz,誤差 0.16% 在容差內):legacy I2S 驅動在 ESP32-S3 上不輸出 MCLK,會導致揚聲器無聲 + 麥克風電平恆 0,已在 `audio_es8311.cpp` 的 `start_ledc_mclk()` 中用 LEDC 修復;
- ES8311 控制走 I2C1(GPIO41/42 物理總線與攝像頭 SCCB 共用,攝像頭只在啟動時使用 SCCB,運行期無衝突);`init()` 末尾 `Wire1.end()` 釋放 I2C 給攝像頭;
- 麥克風增益默認值同 NanoCam 原廠(寄存器 0x16 = 0x24),如需提高靈敏度可調 `audio_es8311.cpp` 中 `R_ADC16` 的值。

## RGB 狀態燈與提示音

### RGB 狀態含義

| 顏色 | 狀態 |
|---|---|
| 紅 | 啟動中 / micro-ROS 初始化失敗 / WiFi 丟失 |
| 橙 | WiFi 已連接,等待 micro-ROS Agent |
| 綠 | micro-ROS 就緒(遙操作鏈路通) |
| 藍 | 舵機控制已解鎖(ARMED) |
| 紫 | 控制命令被拒絕(握手/限位/步長不匹配) |

### 揚聲器提示音

| 事件 | 提示音 |
|---|---|
| 上電 | 兩聲短"嘀嘀"(啟動音) |
| micro-ROS 就緒 | 上揚雙音 |
| 舵機解鎖 | 上揚雙音 |
| 初始化失敗 | 一聲低音 |

> 提示音是事件驅動的:啟動音上電即播,就緒音在 Agent 通信建立時播,解鎖音在收到控制命令時播,因此只上電不跑遙操作時只會聽到啟動音。

## 安全機制

固件內置以下安全機制,無需手動配置:

- 舵機身份檢查、EEPROM 校準檢查;
- 當前姿態握手(0.05 rad);
- 軟限位;單命令步長限制 0.25 rad;
- 反饋看門狗 0.5 s;
- WiFi 丟失 10 s 超時自動重啟。

> 飛行演示注意:倒掛安裝後需重新確認關節方向、重心、供電(BEC)方案,並做 EMI 干擾測試。

## 驗證狀態

### 測試結果(預期)

- 六個從舵全部識別(`servo_mask=0x3f`);
- `/joint_states` 約 20 Hz 發布;
- 主控橋 30 Hz 發布命令;
- 攝像頭流 `http://<IP>/stream` QVGA 流暢;
- `/follower_audio/level` 5 Hz 發布,說話時電平明顯抬升;
- RGB 狀態燈隨啟動→聯網→就緒→解鎖逐級變化;
- 拔掉 USB 數據線後(ESP32 獨立供電,從動臂外部 12V 供電)仍可運行。

### 開發狀態

**已上板驗證通過(2026-08-19):**

- 音頻 `ES8311 ready @24000Hz`(MCLK 輸出正常 + 揚聲器/麥克風均正常,修復了 MCLK 缺失 + 音量過小);
- WiFi 連接 + micro-ROS 通信(`/joint_states` 20Hz 穩定、`/follower_audio/level` 正常);
- GC2145 攝像頭 FPV:QVGA `/stream` 完整流暢(修復了 I2C 衝突 / 軟編碼 / httpd 棧 / multipart 邊界);
- 完整遙操作鏈路(主動臂動作 → 從動臂跟隨);
- **absolute 映射 + Agent 失聯自動重啟**:斷連重連後主從臂對齊無偏差;Ctrl+C 後從動臂自動重啟等待重連。

**仍待驗證:**

- 飛行場景:倒掛安裝方向、重心、供電(BEC)、EMI 干擾。

## 工程結構與固件進階

本項目從動臂控制器由 ESP32-S3 演進到自研 ESP32-NanoCam 模組(ESP32-S3 N16R8,板載 DVP 攝像頭 / ES8311 音頻 / WS2812 RGB)。

### 目錄結構

```text
firmware/nanocam_soarm/   ESP32-NanoCam 從動臂固件 (PlatformIO)
  ├─ boards/nano_cam.json 自研板卡定義 (16MB Flash / 8MB Octal PSRAM)
  ├─ src/                 固件源碼 (micro-ROS 遙操作 + 攝像頭 + 音頻 + RGB)
  ├─ lib/microros/        micro-ROS 靜態庫 (xtensa-lx7)
  └─ lib/scservo/         SCServo 舵機庫 (本地化, 無網絡依賴)
tools/                    PC 端腳本 (wireless_teleoperate.py 遙操作橋, follower_camera.py FPV 接收)
start_soarm_demo.sh       一鍵啟動腳本 (網絡/Agent/校準預檢 + 遙操作)
cali/                     主動臂/從動臂校準文件
docs/                     項目進度與實驗記錄 + 硬件參考 (docs/reference/)
```

### 與早期版的差異

| 項目 | 本工程 (ESP32-NanoCam) |
|---|---|
| 板卡定義 | 自建 `boards/nano_cam.json`(16MB Flash / 8MB Octal PSRAM,qio_opi) |
| 舵機總線 | Serial1/UART1,TX=20/RX=19(UART0 被 CH340K 調試佔用) |
| 調試串口 | UART0 (43/44) → CH340K → USB-C |
| 攝像頭 | NanoCam DVP GC2145(GPIO1~14 + 41/42),XCLK 24MHz |
| 音頻 | ES8311 + AP2718AT 麥克風 + NS4150B 揚聲器(新增) |
| RGB | WS2812 狀態燈(新增) |
| micro-ROS 庫 | xtensa-lx7——NanoCam 同為 ESP32-S3,與 S3 版通用 |
| PC 端腳本 | 不變(tools/、start_soarm_demo.sh 與硬件無關) |

### micro-ROS 頭文件路徑與 build_flags

micro-ROS 頭文件樹是扁平結構(`include/<pkg>/<header>.h`),只保留 `-Ilib/microros/include` 根路徑。**不要**添加逐包 `-Ilib/microros/include/<pkg>/` 路徑——那會把 `<string.h>` 解析成 `rosidl_runtime_c/string.h`、把 WiFi 庫的 `<Client.h>` 解析成 `rcl/Client.h`,導致編譯失敗。

### 重建 libmicroros.a(ESP32-S3 / xtensa-lx7)

> 本工程 `firmware/nanocam_soarm/lib/microros/` 已附上 ESP32-S3 版靜態庫(NanoCam 為 ESP32-S3,庫通用)。**普通使用跳過本節**。只有當你需要自定義 micro-ROS 配置(消息類型、QoS、內存池等)時才需要重建——日常開發不需要重編 `libmicroros.a`。

**方式 A:官方 Docker 構建器(推薦,可在任意機器上執行)**

micro-ROS 官方 `micro_ros_arduino` 庫的生成腳本自帶 **esp32s3 目標**:

```bash
git clone -b humble https://github.com/micro-ROS/micro_ros_arduino.git
cd micro_ros_arduino
docker pull microros/micro_ros_static_library_builder:humble
docker run -it --rm -v $(pwd):/project \
  --env MICROROS_LIBRARY_FOLDER=extras \
  microros/micro_ros_static_library_builder:humble -p esp32s3
```

產物在 `src/esp32s3/libmicroros.a`,頭文件在 `src/` 下各包目錄中:

```bash
cp src/esp32s3/libmicroros.a <工程>/firmware/nanocam_soarm/lib/microros/
# 頭文件整體替換(保留該目錄下的 default_transport.cpp / wifi_transport.cpp /
# micro_ros_arduino.h 三個自定義文件)
rsync -a src/* <工程>/firmware/nanocam_soarm/lib/microros/include/ \
  --exclude esp32s3 --exclude '*.cpp' --exclude micro_ros_arduino.h
```

**關於工具鏈**:官方腳本的 esp32s3 段默認使用 `xtensa-esp32-elf`(LX6)工具鏈編譯,LX6/LX7 對普通 C 代碼指令集兼容、可運行。本工程隨附的 `libmicroros.a` 是用**純正 LX7 工具鏈**(`xtensa-esp32s3-elf` gcc 8.4.0,與 PlatformIO 內置版本一致)編譯的,做法:下載 `xtensa-esp32s3-elf-gcc8_4_0-esp-2021r2-patch5-linux-amd64.tar.gz`(Espressif crosstool-NG releases),解壓後把 `library_generation.sh` 裏 esp32s3 段的 `TOOLCHAIN_PREFIX` 改為 `/uros_ws/xtensa-esp32s3-elf/bin/xtensa-esp32s3-elf-`,再掛載進容器重跑:

```bash
docker run --platform linux/amd64 -it --rm \
  -v $(pwd):/project \
  -v <解壓目錄>/xtensa-esp32s3-elf:/uros_ws/xtensa-esp32s3-elf \
  --env MICROROS_LIBRARY_FOLDER=extras \
  microros/micro_ros_static_library_builder:humble -p esp32s3
```

> 注意:Apple Silicon 上必須加 `--platform linux/amd64`(鏡像內置的 esp32 工具鏈是 x86_64 二進制,arm64 容器內無法執行)。

**方式 B:Ubuntu 22.04 + ROS 2 Humble + PlatformIO 工具鏈**

1. 確保 PlatformIO 已下載過 S3 工具鏈(在固件目錄跑一次 `pio run` 即可):

   ```bash
   ls ~/.platformio/packages/toolchain-xtensa-esp32s3/bin/xtensa-esp32s3-elf-gcc
   ls ~/.platformio/packages/framework-arduinoespressif32/tools/sdk/esp32s3
   ```

2. 用 micro_ros_setup 拉取 micro-ROS 源碼(與 `build_microros.sh` 的 `/tmp/firmware/mcu_ws` 佈局一致):

   ```bash
   mkdir -p /tmp/firmware && cd /tmp/firmware
   git clone -b humble https://github.com/micro-ROS/micro_ros_setup.git src/micro_ros_setup
   # 安裝 micro_ros_setup 依賴後:
   source /opt/ros/humble/setup.bash
   colcon build && source install/local_setup.bash
   ros2 run micro_ros_setup create_firmware_ws.sh generate_lib
   ```

3. 運行本工程的 S3 構建腳本:

   ```bash
   cd <工程>/firmware/nanocam_soarm
   chmod +x build_microros_s3.sh
   ./build_microros_s3.sh
   ```

   腳本已把 riscv32 → xtensa-esp32s3、`-march=rv32imc` → `-mlongcalls`、`esp32c3` SDK → `esp32s3` SDK。產物按腳本末尾提示拷入工程即可。

### 參考資料

- NanoCam 硬件參考文檔(原理圖/規格書/引腳定義/ES8311 驅動):倉庫 `docs/reference/`
- [micro-ROS](https://micro.ros.org/) / [micro_ros_arduino](https://github.com/micro-ROS/micro_ros_arduino)
- [LeRobot](https://github.com/huggingface/lerobot)

<RelatedProducts slugs="so-arm101,esp32-s3-wifi-module" />
