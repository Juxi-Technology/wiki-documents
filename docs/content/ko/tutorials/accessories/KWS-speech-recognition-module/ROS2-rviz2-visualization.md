---
title: ROS2-rviz2 시각화
description: "- 운영체제: Ubuntu 22.04"
---

# ROS2-rviz2 시각화

## 1. 환경 준비

#### 시스템 요구사항

- **운영체제**: Ubuntu 22.04

- **ROS2 버전**: Humble

#### 의존 라이브러리 설치

터미널을 열고 다음 명령을 순서대로 실행합니다:

```PowerShell
# 1. Update sources
sudo apt update

# 2. Install ROS2 base packages (if ROS2 is not installed yet)
# (If ROS2 is already installed, skip this step)
# sudo apt install ros-humble-desktop -y

# 3. Install project-specific dependencies
sudo apt install python3-pip ros-humble-rviz2 ros-humble-visualization-msgs -y
pip3 install pyserial
```

---

## 2. 워크스페이스와 디렉터리 구조 생성

#### 디렉터리 생성

터미널에서 실행:

```PowerShell
# Create the workspace directory
mkdir -p ~/juxi_speech_ws/src
cd ~/juxi_speech_ws/src
```

#### ROS2 기능 패키지 생성

```PowerShell
# Create a Python package named juxi_voice
ros2 pkg create --build-type ament_python juxi_voice --license MIT
```

#### 최종 디렉터리 구조

완료 후 디렉터리 트리는 다음과 같아야 합니다(이 구조대로 파일을 배치하세요):

```Bash
~/juxi_speech_ws/
├── build/                # (generated automatically by the build)
├── install/              # (generated automatically by the build)
├── log/                  # (generated automatically by the build)
└── src/
    └── juxi_voice/
        ├── package.xml   # (auto-generated, no changes needed)
        ├── setup.py      # (needs modification)
        ├── resource/
        │   └── juxi_voice
        └── juxi_voice/   # <-- put the core code here
            ├── __init__.py
            ├── voice_node.py    # (new: voice node)
            └── rviz_control.py  # (new: RViz control node)
```

---

## 3. 파일 내용과 배치

`~/juxi_speech_ws/src/juxi_voice/juxi_voice/` 디렉터리로 이동하여 다음 두 개의 Python 파일을 다운로드해 이 디렉터리에 넣으세요.

#### 파일 1: `voice_node.py` (음성 제어 노드)

**위치**: `~/juxi_speech_ws/src/juxi_voice/juxi_voice/voice_node.py`

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

        # === Config section ===
        self.serial_port_name = "/dev/ttyUSB0"
        self.baudrate = 115200
        self.frame_len = 5

        # === Wake word configuration ===
        self.awake_frames = {
            0x01: "你好小犀",
            0x02: "小犀小犀",
            0x03: "钜犀"
        }
        self.is_awake = False

        # === Full command word mapping (protocol V3) ===
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
        self.get_logger().info("✅ Voice node started")

    def _init_serial(self):
        try:
            ser = serial.Serial(self.serial_port_name, self.baudrate, timeout=0.01)
            if ser.is_open:
                self.get_logger().info(f"🔌 Serial port opened: {self.serial_port_name}")
                return ser
        except PermissionError:
            self.get_logger().error(f"❌ Permission denied! Run: sudo chmod 777 {self.serial_port_name}")
        except Exception as e:
            self.get_logger().error(f"❌ Serial error: {e}")
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

        # Handle wake words
        if b4 == 0x00 and b3 in self.awake_frames:
            self.is_awake = True
            self._play_voice(self.awake_play_frame)
            self.get_logger().info(f"🔔 Awakened: {self.awake_frames[b3]}")
            return

        # Handle control commands
        if self.is_awake:
            key = (b3, b4)
            if key in self.cmd_mapping:
                text, frame = self.cmd_mapping[key]
                self._play_voice(frame)
                msg = String()
                msg.data = text
                self.pub_cmd.publish(msg)
                self.get_logger().info(f"🚀 Sent command: {text}")

def main(args=None):
    rclpy.init(args=args)
    node = VoiceControlNode()
    try: rclpy.spin(node)
    except KeyboardInterrupt: pass
    finally: node.destroy_node(); rclpy.shutdown()

if __name__ == '__main__': main()
```

#### 파일 2: `rviz_control.py` (RViz 제어 노드)

**위치**: `~/juxi_speech_ws/src/juxi_voice/juxi_voice/rviz_control.py`

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
        self.get_logger().info("✅ RViz node started")

    def _cmd_callback(self, msg):
        cmd = msg.data
        self.get_logger().info(f"📢 Received: {cmd}")

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

#### 파일 3: `setup.py` 수정

**위치**: `~/juxi_speech_ws/src/juxi_voice/setup.py`

`entry_points` 부분을 찾아 다음과 같이 수정합니다(ROS2에 이 두 프로그램의 위치를 알려줍니다):

```Python
entry_points={
        'console_scripts': [
            'voice_node = juxi_voice.voice_node:main',
            'rviz_control = juxi_voice.rviz_control:main',
        ],
    },
```

---

## 4. 빌드 및 실행

#### 빌드

```Python
cd ~/juxi_speech_ws
colcon build --symlink-install
```

#### 환경 변수 새로고침

**새 터미널을 열 때마다 이 단계를 실행해야 합니다**. 또는 `~/.bashrc`에 추가하세요:

```Python
cd ~/juxi_speech_ws
source install/setup.bash
# Or add to the environment
source ~/juxi_speech_ws/install/setup.bash
```

#### 노드 실행 (터미널 3개 필요)

터미널 1: 음성 노드 실행

```Bash
cd ~/juxi_speech_ws
source install/setup.bash
sudo chmod 777 /dev/ttyUSB0  # solve serial port permission
ros2 run juxi_voice voice_node
```



터미널 2: RViz 제어 노드 실행

```Python
cd ~/juxi_speech_ws
source install/setup.bash
ros2 run juxi_voice rviz_control
```



터미널 3: RViz 시각화 인터페이스 열기

```Python
rviz2
```

---

## 5. RViz 인터페이스 설정

1. 왼쪽 아래에서 **Add** 클릭.

2. `rviz_default_plugins` 아래의 **Marker** 찾아 OK 클릭.

3. 왼쪽 패널 상단에서 **Fixed Frame**을 `map`으로 변경.

4. 왼쪽 목록에서 방금 추가한 **Marker**를 찾아 펼치고 **Topic**을 `/juxi_visual_marker`로 변경.

이때 화면 중앙에 흰색 큐브가 나타납니다.

---

## 6. 사용 방법

**웨이크업**: 모듈을 향해 "你好小犀"라고 말합니다.

- 모듈이 "我在"이라고 응답합니다.

- 터미널 1에 "🔔 已唤醒"이 표시됩니다.

**명령 전송**: 이어서 "小车前进", "亮红灯", "关灯" 등을 말합니다.

- 모듈이 해당 응답을 자동으로 재생합니다.

- RViz의 큐브가 이동하거나 색이 바뀝니다.

---

## 7. 자주 묻는 문제 해결

**시리얼 포트 권한 오류**:

- 해결: `sudo chmod 777 /dev/ttyUSB0` 실행.

**RViz에 큐브가 없음**:

- 해결: Fixed Frame이 `map`인지, Topic이 `/juxi_visual_marker`인지 확인.

**명령을 말해도 반응 없음**:

- 확인: 새 터미널에서 `ros2 topic echo /juxi_voice_cmd` 실행.

- 데이터가 표시됨: 음성은 정상, 문제는 RViz 설정에 있습니다.

- 데이터가 없음: 웨이크업되지 않았거나 시리얼에 데이터가 없습니다.
