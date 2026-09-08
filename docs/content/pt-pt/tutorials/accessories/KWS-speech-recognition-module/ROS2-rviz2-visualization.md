---
title: Visualização ROS2-rviz2
description: "- Sistema operacional: Ubuntu 22.04"
---

# Visualização ROS2-rviz2

> **[Comprar na loja](https://www.juxitech.com/pt-pt/products/ai-voice-recognition-module)**


## 1. Preparação do ambiente

#### Requisitos do sistema

- **Sistema operacional**: Ubuntu 22.04

- **Versão ROS2**: Humble

#### Instalar as bibliotecas de dependências

Abra o terminal e execute os seguintes comandos em sequência: 

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

## 2. Criar o espaço de trabalho e a estrutura de diretórios

#### Criar diretórios

Execute no terminal:

```PowerShell
# 创建工作空间目录
mkdir -p ~/juxi_speech_ws/src
cd ~/juxi_speech_ws/src
```

#### Criar um pacote ROS2

```PowerShell
# 创建一个名为 juxi_voice 的 Python 功能包
ros2 pkg create --build-type ament_python juxi_voice --license MIT
```

#### Estrutura final de diretórios

Após a conclusão, a árvore de diretórios deve ser a seguinte (coloque os ficheiros estritamente de acordo com esta estrutura): 

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

## 3. Conteúdo e posicionamento dos ficheiros

Entre no diretório `~/juxi_speech_ws/src/juxi_voice/juxi_voice/`, baixe os dois ficheiros Python a seguir e coloque-os neste diretório.

#### Arquivo 1: `voice_node.py` (nó de controle de voz)

**Localização**: `~/juxi_speech_ws/src/juxi_voice/juxi_voice/voice_node.py`

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

#### Arquivo 2: `rviz_control.py` (nó de controle RViz)

**Localização**: `~/juxi_speech_ws/src/juxi_voice/juxi_voice/rviz_control.py`

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

#### Arquivo 3: Modificar o `setup.py`

**Localização**: `~/juxi_speech_ws/src/juxi_voice/setup.py`

Encontre a seção `entry_points` e modifique-a para o seguinte conteúdo (informe ao ROS2 onde esses dois programas estão localizados):

```Python
entry_points={
        'console_scripts': [
            'voice_node = juxi_voice.voice_node:main',
            'rviz_control = juxi_voice.rviz_control:main',
        ],
    },
```

---

## 4. Compilar e executar

#### Compilar

```Python
cd ~/juxi_speech_ws
colcon build --symlink-install
```

#### Atualizar as variáveis de ambiente

**Esta etapa deve ser executada sempre que um novo terminal for aberto**, ou adicione-a ao `~/.bashrc`: 

```Python
cd ~/juxi_speech_ws
source install/setup.bash
或者写入到环境变量
source ~/juxi_speech_ws/install/setup.bash
```

#### Executar os nós (requer 3 terminais)

Terminal 1: Execute o nó de voz

```Bash
cd ~/juxi_speech_ws
source install/setup.bash
sudo chmod 777 /dev/ttyUSB0  # 解决串口权限
ros2 run juxi_voice voice_node
```



Terminal 2: Execute o nó de controle RViz

```Python
cd ~/juxi_speech_ws
source install/setup.bash
ros2 run juxi_voice rviz_control
```



Terminal 3: Abra a interface de visualização RViz

```Python
rviz2
```

---

## 5. Configuração da interface RViz

1. Clique em **Add** no canto inferior esquerdo. 

2. Encontre `Marker` em **rviz_default_plugins** e clique em OK.

3. No topo do painel esquerdo, altere **Fixed Frame** para `map`.

4. Encontre o **Marker** recém-adicionado na lista à esquerda, clique para expandir e altere **Topic** para `/juxi_visual_marker`.

Neste ponto, você verá um cubo branco aparecer no centro da ecrã. 

---

## 6. Método de uso

**Ativação**: Diga "Olá, Xiaoxi" ao módulo. 

- O módulo responderá "Estou aqui". 

- O Terminal 1 exibirá "🔔 Ativação concluída".

**Enviar comandos**: Em seguida, diga "carro avança", "ligar luz vermelha", "desligar luz", etc.

- O módulo transmitirá automaticamente a resposta correspondente. 

- O cubo no RViz se moverá ou mudará de cor. 

---

## 7. Solução de problemas comuns

**Erro de permissão da porta serial**: 

- Solução: Execute `sudo chmod 777 /dev/ttyUSB0`. 

**Não há cubo no RViz**: 

- Solução: Verifique se o Fixed Frame é `map` e se o Topic é `/juxi_visual_marker`. 

**Sem resposta após dar a instrução**: 

- Diagnóstico: Abra um novo terminal e execute `ros2 topic echo /juxi_voice_cmd`.

- Se houver dados exibidos: indica que a voz está normal e o problema está na configuração do RViz. 

- Se nenhum dado for exibido: indica que não houve ativação ou não há dados na porta serial. 



