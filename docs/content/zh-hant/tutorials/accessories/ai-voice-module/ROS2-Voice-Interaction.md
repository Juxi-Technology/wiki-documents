---
title: "ROS2語音互動"
description: "AI語音互動模組支援以下三種接線方式："
---

# ROS2語音互動

## 1、環境準備

#### 系統要求

- **作業系統**：Ubuntu 22.04

- **ROS2 版本**：Humble

#### 安裝相依性函式庫

```Bash
# 1. 更新源
sudo apt update

# 2. 安装 ROS2 基础包
# (如果已安装ROS2，跳过)
sudo apt install ros-humble-desktop -y

# 3. 安装本项目依赖（同时支持串口和I2C）
sudo apt install python3-pip ros-humble-rviz2 ros-humble-visualization-msgs -y
pip3 install pyserial smbus2

# 4. 如果使用 I2C 接线，额外安装
sudo apt install python3-smbus2 i2c-tools -y
```

---

## 2、三種接線方式說明

AI語音互動模組支援以下三種接線方式：

#### 自動偵測機制

ROS2節點啟動時會按以下順序自動偵測接線方式：

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

#### 建立目錄

```Bash
mkdir -p ~/juxi_speech_ws/src
cd ~/juxi_speech_ws/src
```

#### 建立 ROS2 功能包

```Bash
ros2 pkg create --build-type ament_python juxi_voice --license MIT
```

#### 最終目錄結構

```Bash
~/juxi_speech_ws/
├── build/
├── install/
├── log/
└── src/
    └── juxi_voice/
        ├── package.xml
        ├── setup.py           # (替换为本项目提供的)
        ├── juxi_voice.rviz    # (新建：RViz预配置文件)
        ├── resource/
        │   └── juxi_voice
        └── juxi_voice/
            ├── __init__.py
            ├── voice_node.py    # (新建：语音节点)
            └── rviz_control.py  # (新建：RViz控制节点)
```

---

## 6、檔案內容與放置

#### 檔案 1：`voice_node.py` (語音控制節點)

**位置**：`~/juxi_speech_ws/src/juxi_voice/juxi_voice/voice_node.py`

**核心功能**：

- 自動偵測 Type-C / UART / IIC 接線方式

- 統一命令詞對映表（114條命令詞）

- 根據接線方式使用對應的通訊後端

**關鍵架構**：

```Bash
# 统一命令数据: ID → (串口字节2, 串口字节3, 命令文本, 播报模式)
CMD_DATA = {
    1:  (0x01, 0x00, "欢迎语", "被"),
    3:  (0x03, 0x00, "你好小犀", "主"),
    14: (0x00, 0x04, "小车前进", "主"),
    84: (0xFF, 0x5F, "这是红色", "被"),
    ...
}

# 自动检测函数
def detect_connection(logger):
    # 1. 尝试 I2C
    # 2. 尝试串口 /dev/ttyUSB0, /dev/ttyACM0, /dev/ttyAMA0, /dev/ttyS0
    ...
```

（完整程式碼請查看專案提供的 `voice_node.py` 檔案）

#### 檔案 2：`rviz_control.py` (RViz 控制節點)

**位置**：`~/juxi_speech_ws/src/juxi_voice/juxi_voice/rviz_control.py`

訂閱 `/juxi_voice_cmd` 話題接收命令文字，根據命令更新立方體視覺化。

（完整程式碼請查看專案提供的 `rviz_control.py` 檔案）

#### 檔案 3：修改 `setup.py`

**位置**：`~/juxi_speech_ws/src/juxi_voice/setup.py`

```Bash
entry_points={
    'console_scripts': [
        'voice_node = juxi_voice.voice_node:main',
        'rviz_control = juxi_voice.rviz_control:main',
    ],
},
```

---

## 7、編譯與執行

#### 編譯

```Bash
cd ~/juxi_speech_ws
colcon build --symlink-install
```

#### 環境變數

```Bash
source ~/juxi_speech_ws/install/setup.bash
# 或写入 ~/.bashrc
echo "source ~/juxi_speech_ws/install/setup.bash" >> ~/.bashrc
```

#### 權限設定

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
```

#### 執行節點（3 個終端）

**終端 1**：語音節點

```Bash
cd ~/juxi_speech_ws
source install/setup.bash
ros2 run juxi_voice voice_node
```

啟動時會顯示偵測到的接線方式：

```Bash
自动检测: IIC /dev/i2c-1 (从机地址 0x2A)
语音节点启动完成 - IIC /dev/i2c-1 (从机地址 0x2A)
```

或

```Bash
自动检测: UART /dev/ttyUSB0
语音节点启动完成 - UART /dev/ttyUSB0
```

**終端 2**：RViz 控制節點

```Bash
cd ~/juxi_speech_ws
source install/setup.bash
ros2 run juxi_voice rviz_control
```

**終端 3**：RViz 視覺化（直接載入預先配置檔案，無需手動設定）

```Bash
rviz2 -d ~/juxi_speech_ws/src/juxi_voice/juxi_voice.rviz
```

或者先開啟 RViz 再載入：

```Bash
rviz2
# 菜单栏: File → Open Config → 选择 juxi_voice.rviz
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
# 被动播报
ros2 topic pub /juxi_passive_play std_msgs/msg/String "data: '这是红色'"
# 功能词播报
ros2 topic pub /juxi_func_play std_msgs/msg/String "data: '欢迎语'"
# 命令词播报
ros2 topic pub /juxi_cmd_play std_msgs/msg/String "data: '小车前进'"
```

---

## 10、命令詞ID對照表

### 功能詞 (ID 1-10)

### 命令詞 (ID 11-83, 113)

### 被動播報詞 (ID 84-112, 114)

---

## 11、ROS2 話題說明

---

## 12、常見問題排查

**啟動時報"未偵測到AI語音互動模組"**

檢查接線方式對應的裝置檔案是否存在：

```Bash
# I2C 接线
ls /dev/i2c-1
sudo i2cdetect -y 1   # 应看到 0x2A

# Type-C 接线
ls /dev/ttyUSB0 /dev/ttyACM0

# UART 接线
ls /dev/ttyAMA0 /dev/ttyS0
```

**串列埠權限報錯**

```Bash
sudo chmod 666 /dev/ttyUSB0   # 或 /dev/ttyACM0 等
```

**I2C 權限報錯**

```Bash
sudo chmod 666 /dev/i2c-1
```

**RViz 裡沒有方塊**

- 檢查 Fixed Frame 是否為 `map`

- 檢查 Topic 是否為 `/juxi_visual_marker`

**喚醒後說指令沒反應**

```Bash
ros2 topic echo /juxi_voice_cmd
```

有資料 → RViz 配置問題；無資料 → 接線/通訊異常。

<RelatedProducts slugs="ai-voice-module" />
