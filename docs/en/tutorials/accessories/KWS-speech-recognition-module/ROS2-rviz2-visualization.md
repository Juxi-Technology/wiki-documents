# ROS2-rviz2 Visualization

## 1. Environment Preparation

#### System Requirements

- **Operating System**: Ubuntu 22.04

- **ROS2 Version**: Humble

#### Install the dependency library 

Open the terminal and execute the following commands in sequence: 

```PowerShell
# 1. 更新源
sudo apt update

# 2. 安装 ROS2 基础包（如果还没装ROS2）
# (如果已安装ROS2，跳过此步)
# sudo apt install ros-humble-desktop -y

# 3. 安装本项目特定依赖
sudo apt install python3-pip ros-humble-rviz2 ros-humble-visualization-msgs -y
pip3 install pyserial
```

---

## 2. Create workspace and directory structure

#### Create Directory

Execute in the terminal:

```PowerShell
# 创建工作空间目录
mkdir -p ~/juxi_speech_ws/src
cd ~/juxi_speech_ws/src
```

#### Create a ROS2 Package

```PowerShell
# 创建一个名为 juxi_voice 的 Python 功能包
ros2 pkg create --build-type ament_python juxi_voice --license MIT
```

#### Final Directory Structure

After completion, your directory tree should be as follows (please place files strictly according to this structure): 

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

## 3. File Content and Placement

Please enter the `~/juxi_speech_ws/src/juxi_voice/juxi_voice/` directory, download the following two Python files, and place them in this directory.

#### File 1:`voice_node.py` (Voice Control Node)

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
        
        # === 配置区 ===
        self.serial_port_name = "/dev/ttyUSB0"
        self.baudrate = 115200
        self.frame_len = 5
        
        # === 唤醒词配置 ===
        self.awake_frames = {
            0x01: "你好小犀",
            0x02: "小犀小犀",
            0x03: "钜犀"
        }
        self.is_awake = False

        # === 完整命令词映射 (协议V3) ===
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

        # 处理唤醒词
        if b4 == 0x00 and b3 in self.awake_frames:
            self.is_awake = True
            self._play_voice(self.awake_play_frame)
            self.get_logger().info(f"🔔 已唤醒: {self.awake_frames[b3]}")
            return

        # 处理控制指令
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

#### File 2:`rviz_control.py` (RViz control node)

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

#### File 3: Modify `setup.py`

**位置**：`~/juxi_speech_ws/src/juxi_voice/setup.py`

Find the `entry_points` section and modify it to the following content (tell ROS2 where these two programs are located):

```Python
entry_points={
        'console_scripts': [
            'voice_node = juxi_voice.voice_node:main',
            'rviz_control = juxi_voice.rviz_control:main',
        ],
    },
```

---

## 4. Compile and Run

#### Compile

```Python
cd ~/juxi_speech_ws
colcon build --symlink-install
```

#### Refresh environment variables

**This step must be executed every time a new terminal is opened **, or add it to `~/.bashrc`: 

```Python
cd ~/juxi_speech_ws
source install/setup.bash
或者写入到环境变量
source ~/juxi_speech_ws/install/setup.bash
```

#### Run the node (requires 3 terminals)

Terminal 1: Run the voice node

```Bash
cd ~/juxi_speech_ws
source install/setup.bash
sudo chmod 777 /dev/ttyUSB0  # 解决串口权限
ros2 run juxi_voice voice_node
```



Terminal 2: Run the RViz control node

```Python
cd ~/juxi_speech_ws
source install/setup.bash
ros2 run juxi_voice rviz_control
```



Terminal 3: Open the RViz visualization interface

```Python
rviz2
```

---

## 5. RViz Interface Configuration

1. Click at the bottom left corner **Add**. 

2. Find `Marker` under **rviz_default_plugins**, and click OK.

3. At the top of the left panel, change **Fixed Frame** to `map`.

4. Find the newly added **Marker in the left list, click to expand it, and change ** to `/juxi_visual_marker`.

At this point, you will see a white cube appear in the center of the screen. 

---

## 6. Usage Method

**Wake up **: Say "Hello, Xiaoxi" to the module. 

- The module will reply "I'm here". 

- Terminal 1 will display "🔔 Wakeup completed".

**Send commands**: Then say "car move forward", "turn on red light", "turn off light", etc.

- The module will automatically broadcast the corresponding response. 

- The cube in RViz will move or change color. 

---

## 7. Troubleshooting Common Issues

**Serial port permission error**: 

- Solution: Execute ` sudo chmod 777 /dev/ttyUSB0 `. 

**There is no cube in RViz**: 

- Solution: Check if Fixed Frame is ` map ` and if Topic is `/juxi_visual_marker `. 

**No response after giving the instruction **: 

- Troubleshooting: Open a new terminal and enter `ros2 topic echo /juxi_voice_cmd`.

- If there is data showing: it indicates that the voice is normal, and the problem lies in the RViz configuration. 

- If no data is displayed: it indicates that there is no wake-up or no data on the serial port. 



