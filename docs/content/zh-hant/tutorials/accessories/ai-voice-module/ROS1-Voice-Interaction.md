---
title: "ROS1語音互動"
description: "AI 語音互動模組教程(ROS1 環境)——三種接線方式自動偵測,支援串列埠與 IIC 通訊的互動節點。"
---

# ROS1語音互動

## 1、環境準備

#### 系統要求

- **作業系統**：Ubuntu 20.04 或 18.04

- **ROS1 版本**：Noetic (推薦) 或 Melodic

#### 安裝相依性函式庫

```Bash
# 1. 更新源
sudo apt update

# 2. 安裝 ROS1 桌面完整版
# (如果已安裝ROS1，跳過)
sudo apt install ros-noetic-desktop-full -y    # Ubuntu 20.04
sudo apt install ros-melodic-desktop-full -y   # Ubuntu 18.04

# 3. 安裝本項目依賴（同時支持串口和I2C）
sudo apt install python3-pip ros-noetic-rviz i2c-tools -y
pip3 install pyserial smbus2

# 如果是 Melodic (Python2)
sudo apt install python-pip ros-melodic-rviz i2c-tools -y
pip install pyserial smbus2

# 4. 如果使用 I2C 接線，額外安裝
sudo apt install python3-smbus2 -y
```

---

## 2、三種接線方式說明

AI語音互動模組支援以下三種接線方式：

#### 自動偵測機制

ROS1節點啟動時會按以下順序自動偵測接線方式：

1. 先嘗試串列埠：依序偵測 `/dev/ttyUSB0` → `/dev/ttyACM0` → `/dev/ttyAMA0` → `/dev/ttyS0`

2. 再嘗試 I2C：偵測 `/dev/i2c-1` 上是否存在從機 `0x2A`

3. 串列埠偵測只需裝置檔案存在且可開啟即視為可用，無需額外驗證

偵測到任意一種方式後即停止偵測並鎖定使用該方式。無需任何手動配置。

---

## 3、IIC 協定說明

#### IIC 從機配置

#### 暫存器定義

---

## 4、串列埠協定說明 (Type-C / UART)

#### 訊框格式

每個訊框固定為 **5位元組**：

#### 鮑率

固定 **115200** bps。

---

## 5、建立工作空間與目錄結構

#### 建立 catkin 工作空間

```Bash
mkdir -p ~/juxi_speech_ws/src
cd ~/juxi_speech_ws/src
```

#### 建立 ROS 功能包

```Bash
catkin_create_pkg juxi_voice rospy std_msgs visualization_msgs
```

#### 最終目錄結構

將本專案提供的檔案放置到對應位置：

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

## 6、檔案內容與放置

#### 檔案 1：`voice_node.py` (語音控制節點)

**位置**：`~/juxi_speech_ws/src/juxi_voice/scripts/voice_node.py`

**核心功能**：

- 自動偵測 Type-C / UART / IIC 接線方式

- 統一命令詞對映表（114條命令詞，與Excel協定表V1完全一致）

- 根據接線方式使用對應的通訊後端（串列埠 / I2C）

**關鍵架構**：

```Bash
# 統一命令數據: ID → (串口字節2, 串口字節3, 命令文本, 播報模式)
CMD_DATA = {
    1:   (0x01, 0x00, "欢迎语", "被"),
    3:   (0x03, 0x00, "你好小犀", "主"),
    14:  (0x00, 0x04, "小车前进", "主"),
    84:  (0xFF, 0x5F, "这是红色", "被"),
    ...
}

# 自動檢測函數
def detect_connection():
    # 1. 嘗試串口 /dev/ttyUSB0, /dev/ttyACM0, /dev/ttyAMA0, /dev/ttyS0
    # 2. 嘗試 I2C /dev/i2c-1 (從機地址 0x2A)
    ...
```

（完整程式碼請查看專案提供的 `voice_node.py` 檔案）

#### 檔案 2：`rviz_control.py` (RViz 控制節點)

**位置**：`~/juxi_speech_ws/src/juxi_voice/scripts/rviz_control.py`

訂閱 `/juxi_voice_cmd` 話題接收命令文字，根據命令更新立方體視覺化。

（完整程式碼請查看專案提供的 `rviz_control.py` 檔案）

#### 檔案 3：`CMakeLists.txt` 和 `package.xml`

已在本專案中提供，直接取代 `catkin_create_pkg` 自動產生的預設檔案即可。

---

## 7、編譯與執行

#### 編譯

```Bash
cd ~/juxi_speech_ws
catkin_make
```

#### 環境變數

```Bash
source ~/juxi_speech_ws/devel/setup.bash
# 或寫入 ~/.bashrc
echo "source ~/juxi_speech_ws/devel/setup.bash" >> ~/.bashrc
```

#### 權限設定

```Bash
# I2C 權限
sudo chmod 666 /dev/i2c-1
# 串口權限
sudo chmod 666 /dev/ttyUSB0
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyAMA0
# 或加入用戶組
sudo usermod -aG dialout $USER
sudo usermod -aG i2c $USER
# 設置後需要重新登錄生效
```

#### 執行節點

**方式一：一鍵啟動（推薦）**

```Bash
cd ~/juxi_speech_ws
source devel/setup.bash
roslaunch juxi_voice juxi_voice.launch
```

啟動時會自動開啟語音節點、RViz控制節點和RViz視覺化介面。

**方式二：分步啟動（3 個終端）**

**終端 1**：啟動 roscore

```Bash
roscore
```

**終端 2**：語音節點

```Bash
cd ~/juxi_speech_ws
source devel/setup.bash
rosrun juxi_voice voice_node.py
```

啟動時會顯示偵測到的接線方式：

```Bash
[INFO] 自动检测: IIC /dev/i2c-1 (从机地址 0x2A)
[INFO] 语音节点启动完成 - IIC /dev/i2c-1 (从机地址 0x2A)
```

或

```Bash
[INFO] 自动检测: UART /dev/ttyUSB0
[INFO] 语音节点启动完成 - UART /dev/ttyUSB0
```

如果未偵測到任何裝置：

```Bash
[FATAL] 未检测到AI语音交互模块！请检查接线 (Type-C / UART / IIC)
[FATAL] 支持的端口: I2C(/dev/i2c-1) | 串口(/dev/ttyUSB0 /dev/ttyACM0 /dev/ttyAMA0 /dev/ttyS0)
```

**終端 3**：RViz 控制節點

```Bash
cd ~/juxi_speech_ws
source devel/setup.bash
rosrun juxi_voice rviz_control.py
```

**終端 4**：RViz 視覺化（直接載入預先配置檔案，無需手動設定）

```Bash
rviz -d ~/juxi_speech_ws/src/juxi_voice/juxi_voice.rviz
```

或者先開啟 RViz 再載入：

```Bash
rviz
# 菜單欄: File → Open Config → 選擇 juxi_voice.rviz
```

---

## 8、RViz 預先配置說明

`juxi_voice.rviz` 已預先配置好以下內容，啟動即可使用，無需任何手動操作：

- **Fixed Frame**：`map`

- **Marker 顯示**：已訂閱 `/juxi_visual_marker`（單標記）

- **MarkerArray 顯示**：已訂閱 `/juxi_visual_markers`（多標記：機械手臂、電量、報警等）

- **視角**：從斜上方觀察，中心點在原點

---

## 9、使用方法

#### 喚醒

對著模組說 **"你好小犀"** → 模組回覆 "我在"

#### 發指令

- "小車前進" → 方塊前進

- "亮紅燈" → 方塊變紅色

- "打開流水燈" → 顏色循環變化

- "報警" → 紅色脈衝球體

- "顯示電量" → 電量文字

#### 主機觸發播報

```Bash
# 被動播報 (I2C → 寫 0xD1, 串口 → 發 FE EF FF XX EE)
rostopic pub /juxi_passive_play std_msgs/String "data: '这是红色'"
# 功能詞播報 (I2C → 寫 0xD2, 串口 → 發 FE EF 01 00 EE)
rostopic pub /juxi_func_play std_msgs/String "data: '欢迎语'"
# 命令詞播報 (I2C → 寫 0xD3, 串口 → 發 FE EF 00 04 EE)
rostopic pub /juxi_cmd_play std_msgs/String "data: '小车前进'"
```

---

## 10、命令詞ID對照表

> 共114條命令詞，與`命令词播报词协议列表V1_中文.xlsx`完全一致。
> 
> 

### 功能詞 (ID 1-10)

### 命令詞 (ID 11-83, 113)

### 被動播報詞 (ID 84-112, 114)

---

## 11、ROS1 話題說明

---

## 12、常見問題排查

**1.啟動時報"未偵測到AI語音互動模組"**

檢查接線方式對應的裝置檔案是否存在：

```Bash
# I2C 接線
ls /dev/i2c-1
sudo i2cdetect -y 1   # 应看到 0x2A

# Type-C 接線
ls /dev/ttyUSB0 /dev/ttyACM0

# UART 接線
ls /dev/ttyAMA0 /dev/ttyS0
```

**2.串列埠權限報錯**

```Bash
sudo chmod 666 /dev/ttyUSB0   # 或 /dev/ttyACM0 等
# 或加入 dialout 用戶組（需要重新登錄）
sudo usermod -aG dialout $USER
```

**3.I2C 權限報錯**

```Bash
sudo chmod 666 /dev/i2c-1
# 或加入 i2c 用戶組（需要重新登錄）
sudo usermod -aG i2c $USER
```

**4.RViz 裡沒有方塊**

- 檢查 Fixed Frame 是否為 `map`

- 檢查 Topic 是否為 `/juxi_visual_marker`

- 確認 rviz_control.py 節點已啟動

**5.喚醒後說指令沒反應**

```Bash
rostopic echo /juxi_voice_cmd
```

有資料 → RViz 配置問題；無資料 → 接線/通訊異常。

**6.rosrun 找不到節點**

確認已執行過編譯和 source：

```Bash
cd ~/juxi_speech_ws
catkin_make
source devel/setup.bash
```

**7.提示語法錯誤**

```Bash
# 確認 Python 腳本有執行權限
chmod +x ~/juxi_speech_ws/src/juxi_voice/scripts/voice_node.py
chmod +x ~/juxi_speech_ws/src/juxi_voice/scripts/rviz_control.py
```

<RelatedProducts slugs="ai-voice-module" />
