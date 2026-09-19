---
title: "ROS2 rviz2 可視化"
description: "KWS 語音識別模組教程——在 Ubuntu 22.04 安裝 ROS2,並以 rviz2 視覺化命令詞辨識結果。"
---

# ROS2 rviz2 可視化

> **[ 淘寶店鋪 ](https://juxitechnology.taobao.com)**


## 1、環境準備

#### 系統要求

- **操作系統**：Ubuntu 22.04

- **ROS2 版本**：Humble

#### 安裝依賴庫

打開終端，依次執行以下命令：

```PowerShell
# 1. 更新源
sudo apt update

# 2. 安裝 ROS2 基礎包（如果還沒裝ROS2）
# (如果已安裝ROS2，跳過此步)
# sudo apt install ros-humble-desktop -y

# 3. 安裝本項目特定依賴
sudo apt install python3-pip ros-humble-rviz2 ros-humble-visualization-msgs -y
pip3 install pyserial
```

---

## 2、創建工作空間與目錄結構

#### 創建目錄

在終端執行：

```PowerShell
# 創建工作空間目錄
mkdir -p ~/juxi_speech_ws/src
cd ~/juxi_speech_ws/src
```

#### 創建 ROS2 功能包

```PowerShell
# 創建一個名為 juxi_voice 的 Python 功能包
ros2 pkg create --build-type ament_python juxi_voice --license MIT
```

#### 最終目錄結構

完成後，你的目錄樹應該如下（請嚴格按照此結構放置文件）：

```Bash
~/juxi_speech_ws/
├── build/                # (编译自动生成)
├── install/              # (编译自动生成)
├── log/                  # (编译自动生成)
└── src/
    └── juxi_voice/
        ├── package.xml   # (自动生成，无需修改)
        ├── setup.py      # (需要修改)
        ├── resource/
        │   └── juxi_voice
        └── juxi_voice/   # 【核心代码放这里】
            ├── __init__.py
            ├── voice_node.py    # (新建：语音节点)
            └── rviz_control.py  # (新建：RViz控制节点)
```

---

## 3、文件內容與放置

請進入 `~/juxi_speech_ws/src/juxi_voice/juxi_voice/` 目錄，下載以下兩個 Python 文件，並放到這個目錄下。

#### 文件 1：`voice_node.py` (語音控制節點)

**位置**：`~/juxi_speech_ws/src/juxi_voice/juxi_voice/voice_node.py`

```Python

#!/usr/bin/env python3
import rclpy
from rclpy.node import Node
from std_msgs.msg import String
import serial
import time

class VoiceControlNode(Node):
    def __init__(self):
        super().__init__('juxi_voice_node')
        
        # === 配置區 ===
        self.serial_port_name = "/dev/ttyUSB0"
        self.baudrate = 115200
        self.frame_len = 5
        
        # === 喚醒詞配置 ===
        self.awake_frames = {
            0x01: "你好小犀",
            0x02: "小犀小犀",
            0x03: "钜犀"
        }
        self.is_awake = False

        # === 完整命令詞映射 (協議V3) ===
        self.cmd_mapping = {
            (0x00, 0x01): ["小车停止", [0xAA, 0x55, 0x00, 0x01, 0xFB]],
            (0x00, 0x04): ["小车前进", [0xAA, 0x55, 0x00, 0x04, 0xFB]],
            (0x00, 0x05): ["小车后退", [0xAA, 0x55, 0x00, 0x05, 0xFB]],
            (0x00, 0x06): ["小车左转", [0xAA, 0x55, 0x00, 0x06, 0xFB]],
            (0x00, 0x07): ["小车右转", [0xAA, 0x55, 0x00, 0x07, 0xFB]],
            (0x00, 0x0A): ["关灯", [0xAA, 0x55, 0x00, 0x0A, 0xFB]],
            (0x00, 0x0B): ["亮红灯", [0xAA, 0x55, 0x00, 0x0B, 0xFB]],
            (0x00, 0x0C): ["亮绿灯", [0xAA, 0x55, 0x00, 0x0C, 0xFB]],
            (0x00, 0x0D): ["亮蓝灯", [0xAA, 0x55, 0x00, 0x0D, 0xFB]],
            (0x00, 0x0E): ["亮黄灯", [0xAA, 0x55, 0x00, 0x0E, 0xFB]],
            (0x00, 0x0F): ["打开流水灯", [0xAA, 0x55, 0x00, 0x0F, 0xFB]],
            (0x00, 0x21): ["回到原点", [0xAA, 0x55, 0x00, 0x21, 0xFB]],
            (0x00, 0x27): ["向上", [0xAA, 0x55, 0x00, 0x27, 0xFB]],
            (0x00, 0x28): ["向下", [0xAA, 0x55, 0x00, 0x28, 0xFB]],
            (0x00, 0x2B): ["夹紧", [0xAA, 0x55, 0x00, 0x2B, 0xFB]],
            (0x00, 0x2C): ["松开", [0xAA, 0x55, 0x00, 0x2C, 0xFB]],
            (0x00, 0x03): ["小车休眠", [0xAA, 0x55, 0x00, 0x03, 0xFB]],
        }
        
        self.awake_play_frame = [0xAA, 0x55, 0x01, 0x00, 0xFB]
        self.pub_cmd = self.create_publisher(String, '/juxi_voice_cmd', 10)
        self.ser = self._init_serial()
        self.timer = self.create_timer(0.01, self._read_and_parse_serial)
        self.get_logger().info("✅ 语音节点启动完成")

    def _init_serial(self):
        try:
            ser = serial.Serial(self.serial_port_name, self.baudrate, timeout=0.01)
            if ser.is_open:
                self.get_logger().info(f"🔌 串口打开成功: {self.serial_port_name}")
                return ser
        except PermissionError:
            self.get_logger().error(f"❌ 权限不足！请执行: sudo chmod 777 {self.serial_port_name}")
        except Exception as e:
            self.get_logger().error(f"❌ 串口错误: {e}")
        return None

    def _play_voice(self, play_frame):
        if self.ser:
            try:
                self.ser.write(bytes(play_frame))
                time.sleep(0.005)
            except: pass

    def _read_and_parse_serial(self):
        if not self.ser or self.ser.in_waiting < self.frame_len:
            return
        raw_data = self.ser.read(self.frame_len)
        if len(raw_data) < 5: return
        
        b0, b1, b3, b4, b5 = raw_data
        if b0 != 0xAA or b1 != 0x55 or b5 != 0xFB:
            self.ser.flushInput()
            return

        # 處理喚醒詞
        if b4 == 0x00 and b3 in self.awake_frames:
            self.is_awake = True
            self._play_voice(self.awake_play_frame)
            self.get_logger().info(f"🔔 已唤醒: {self.awake_frames[b3]}")
            return

        # 處理控制指令
        if self.is_awake:
            key = (b3, b4)
            if key in self.cmd_mapping:
                text, frame = self.cmd_mapping[key]
                self._play_voice(frame)
                msg = String()
                msg.data = text
                self.pub_cmd.publish(msg)
                self.get_logger().info(f"🚀 发送指令: {text}")

def main(args=None):
    rclpy.init(args=args)
    node = VoiceControlNode()
    try: rclpy.spin(node)
    except KeyboardInterrupt: pass
    finally: node.destroy_node(); rclpy.shutdown()

if __name__ == '__main__': main()
```

#### 文件 2：`rviz_control.py` (RViz 控制節點)

**位置**：`~/juxi_speech_ws/src/juxi_voice/juxi_voice/rviz_control.py`

```Python
#!/usr/bin/env python3
import rclpy
import time
from rclpy.node import Node
from std_msgs.msg import String
from visualization_msgs.msg import Marker

class RvizCubeControl(Node):
    def __init__(self):
        super().__init__('juxi_rviz_node')
        self.cube_x, self.cube_y, self.cube_z = 0.0, 0.0, 0.0
        self.cube_color = (1.0, 1.0, 1.0)
        self.cube_alpha = 1.0
        self.cube_scale = 0.5
        self.move_step = 0.5
        
        self.marker_pub = self.create_publisher(Marker, '/juxi_visual_marker', 10)
        self.cmd_sub = self.create_subscription(String, '/juxi_voice_cmd', self._cmd_callback, 10)
        self.timer = self.create_timer(0.1, self._publish_marker)
        self.get_logger().info("✅ RViz节点启动完成")

    def _cmd_callback(self, msg):
        cmd = msg.data
        self.get_logger().info(f"📢 收到: {cmd}")

        if cmd == "小车前进": self.cube_x += self.move_step
        elif cmd == "小车后退": self.cube_x -= self.move_step
        elif cmd in ["小车左转", "向左"]: self.cube_y += self.move_step
        elif cmd in ["小车右转", "向右"]: self.cube_y -= self.move_step
        elif cmd == "向上": self.cube_z += self.move_step
        elif cmd == "向下": self.cube_z -= self.move_step; self.cube_z = max(0.0, self.cube_z)
        elif cmd == "关灯": self.cube_color = (0.0,0.0,0.0); self.cube_alpha = 0.3
        elif cmd == "亮红灯": self.cube_color = (1.0,0.0,0.0); self.cube_alpha = 1.0
        elif cmd == "亮绿灯": self.cube_color = (0.0,1.0,0.0); self.cube_alpha = 1.0
        elif cmd == "亮蓝灯": self.cube_color = (0.0,0.0,1.0); self.cube_alpha = 1.0
        elif cmd == "亮黄灯": self.cube_color = (1.0,1.0,0.0); self.cube_alpha = 1.0
        elif cmd == "打开流水灯":
            colors = [(1.0,0.0,0.0), (0.0,1.0,0.0), (0.0,0.0,1.0), (1.0,1.0,0.0)]
            idx = int(time.time() * 2) % 4
            self.cube_color = colors[idx]
        elif cmd == "回到原点":
            self.cube_x = self.cube_y = self.cube_z = 0.0
            self.cube_color = (1.0,1.0,1.0)
            self.cube_alpha = 1.0
            self.cube_scale = 0.5
        elif cmd == "夹紧": self.cube_scale = 0.25
        elif cmd == "松开": self.cube_scale = 0.5
        elif cmd == "小车休眠": self.cube_color = (0.3,0.3,0.3)

    def _publish_marker(self):
        marker = Marker()
        marker.header.frame_id = "map"
        marker.header.stamp = self.get_clock().now().to_msg()
        marker.ns = "juxi_cube"
        marker.id = 0
        marker.type = Marker.CUBE
        marker.action = Marker.ADD
        
        marker.pose.position.x = self.cube_x
        marker.pose.position.y = self.cube_y
        marker.pose.position.z = self.cube_z
        marker.pose.orientation.w = 1.0
        
        marker.scale.x = marker.scale.y = marker.scale.z = self.cube_scale
        
        marker.color.r = float(self.cube_color[0])
        marker.color.g = float(self.cube_color[1])
        marker.color.b = float(self.cube_color[2])
        marker.color.a = float(self.cube_alpha)

        self.marker_pub.publish(marker)

def main(args=None):
    rclpy.init(args=args)
    node = RvizCubeControl()
    try: rclpy.spin(node)
    except KeyboardInterrupt: pass
    finally: node.destroy_node(); rclpy.shutdown()

if __name__ == '__main__': main()
```

#### 文件 3：修改 `setup.py`

**位置**：`~/juxi_speech_ws/src/juxi_voice/setup.py`

找到 `entry_points` 部分，修改爲如下內容（告訴 ROS2 這兩個程序在哪裏）：

```Python
entry_points={
        'console_scripts': [
            'voice_node = juxi_voice.voice_node:main',
            'rviz_control = juxi_voice.rviz_control:main',
        ],
    },
```

---

## 4、編譯與運行

#### 編譯

```Python
cd ~/juxi_speech_ws
colcon build --symlink-install
```

#### 刷新環境變量

**每次打開新終端都必須執行這一步**，或者將其添加到 `~/.bashrc`：

```Python
cd ~/juxi_speech_ws
source install/setup.bash
或者写入到环境变量
source ~/juxi_speech_ws/install/setup.bash
```

#### 運行節點（需要 3 個終端）

終端 1：運行語音節點

```Bash
cd ~/juxi_speech_ws
source install/setup.bash
sudo chmod 777 /dev/ttyUSB0  # 解决串口权限
ros2 run juxi_voice voice_node
```



終端 2：運行 RViz 控制節點

```Python
cd ~/juxi_speech_ws
source install/setup.bash
ros2 run juxi_voice rviz_control
```



終端 3：打開 RViz 可視化界面

```Python
rviz2
```

---

## 5、RViz 界面配置

1. 左下角點擊 **Add**。

2. 找到 `rviz_default_plugins` 下的 **Marker**，點擊 OK。

3. 在左側面板頂部，將 **Fixed Frame** 改爲 `map`。

4. 在左側列表中找到剛添加的 **Marker，點擊展開，將 ** 改爲 `/juxi_visual_marker`。

此時你會看到一個白色的立方體出現在屏幕中央。

---

## 6、使用方法

**喚醒**：對着模塊說 “你好小犀”。

- 模塊會回覆 “我在”。

- 終端 1 會顯示 “🔔 已喚醒”。

**發指令**：接着說 “小車前進”、“亮紅燈”、“關燈” 等。

- 模塊會自動播報對應的回覆語。

- RViz 裏的方塊會移動或變色。

---

## 7、常見問題排查

**串口權限報錯**：

- 解決：執行 `sudo chmod 777 /dev/ttyUSB0`。

**RViz 裏沒有方塊**：

- 解決：檢查 Fixed Frame 是否爲 `map`，Topic 是否爲 `/juxi_visual_marker`。

**說完指令沒反應**：

- 排查：新開一個終端，輸入 `ros2 topic echo /juxi_voice_cmd`。

- 如果有數據顯示：說明語音正常，問題在 RViz 配置。

- 如果沒數據顯示：說明沒喚醒或串口沒數據。



