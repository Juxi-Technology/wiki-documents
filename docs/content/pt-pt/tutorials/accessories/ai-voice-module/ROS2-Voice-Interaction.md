---
title: "Interação por voz ROS2"
description: "O módulo de interação por voz AI suporta os seguintes três modos de cablagem:"
---

# Interação por voz ROS2

## 1、Preparação do ambiente

#### Requisitos do sistema

- **Sistema operativo**: Ubuntu 22.04

- **Versão do ROS2**: Humble

#### Instalar as bibliotecas de dependências

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

## 2、Descrição dos três modos de cablagem

O módulo de interação por voz AI suporta os seguintes três modos de cablagem:

#### Mecanismo de deteção automática

Quando o nó ROS2 é iniciado, deteta automaticamente o modo de cablagem pela seguinte ordem:

1. Primeiro tenta a porta série: deteta sucessivamente `/dev/ttyUSB0` → `/dev/ttyACM0` → `/dev/ttyAMA0` → `/dev/ttyS0`

2. Depois tenta o I2C: deteta se existe o escravo `0x2A` em `/dev/i2c-1`

3. A deteção da porta série considera o dispositivo disponível desde que o ficheiro de dispositivo exista e possa ser aberto, sem necessidade de verificação adicional

Depois de detetar qualquer um dos modos, a deteção para e fica bloqueado o uso desse modo. Não é necessária qualquer configuração manual.

---

## 3、Descrição do protocolo IIC

#### Configuração do escravo IIC

#### Definição dos registos

---

## 4、Descrição do protocolo de porta série (Type-C / UART)

#### Formato da trama

Cada trama tem um tamanho fixo de **5 bytes**:

#### Débito em bauds

Fixo em **115200** bps.

---

## 5、Criação do espaço de trabalho e da estrutura de diretórios

#### Criar os diretórios

```Bash
mkdir -p ~/juxi_speech_ws/src
cd ~/juxi_speech_ws/src
```

#### Criar o pacote ROS2

```Bash
ros2 pkg create --build-type ament_python juxi_voice --license MIT
```

#### Estrutura final de diretórios

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

## 6、Conteúdo e colocação dos ficheiros

#### Ficheiro 1: `voice_node.py` (nó de controlo de voz)

**Localização**: `~/juxi_speech_ws/src/juxi_voice/juxi_voice/voice_node.py`

**Funcionalidades principais**:

- Deteta automaticamente o modo de cablagem Type-C / UART / IIC

- Tabela de mapeamento unificada de palavras de comando (114 palavras de comando)

- Utiliza o backend de comunicação correspondente de acordo com o modo de cablagem

**Arquitetura principal**:

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

(Para o código completo, consulte o ficheiro `voice_node.py` fornecido com o projeto)

#### Ficheiro 2: `rviz_control.py` (nó de controlo do RViz)

**Localização**: `~/juxi_speech_ws/src/juxi_voice/juxi_voice/rviz_control.py`

Subscreve o tópico `/juxi_voice_cmd` para receber o texto do comando e atualiza a visualização do cubo de acordo com o comando.

(Para o código completo, consulte o ficheiro `rviz_control.py` fornecido com o projeto)

#### Ficheiro 3: modificar o `setup.py`

**Localização**: `~/juxi_speech_ws/src/juxi_voice/setup.py`

```Bash
entry_points={
    'console_scripts': [
        'voice_node = juxi_voice.voice_node:main',
        'rviz_control = juxi_voice.rviz_control:main',
    ],
},
```

---

## 7、Compilação e execução

#### Compilação

```Bash
cd ~/juxi_speech_ws
colcon build --symlink-install
```

#### Variáveis de ambiente

```Bash
source ~/juxi_speech_ws/install/setup.bash
# 或写入 ~/.bashrc
echo "source ~/juxi_speech_ws/install/setup.bash" >> ~/.bashrc
```

#### Configuração de permissões

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

#### Executar os nós (3 terminais)

**Terminal 1**: nó de voz

```Bash
cd ~/juxi_speech_ws
source install/setup.bash
ros2 run juxi_voice voice_node
```

No arranque, é apresentado o modo de cablagem detetado:

```Bash
自动检测: IIC /dev/i2c-1 (从机地址 0x2A)
语音节点启动完成 - IIC /dev/i2c-1 (从机地址 0x2A)
```

ou

```Bash
自动检测: UART /dev/ttyUSB0
语音节点启动完成 - UART /dev/ttyUSB0
```

**Terminal 2**: nó de controlo do RViz

```Bash
cd ~/juxi_speech_ws
source install/setup.bash
ros2 run juxi_voice rviz_control
```

**Terminal 3**: visualização do RViz (carrega diretamente o ficheiro pré-configurado, sem necessidade de configuração manual)

```Bash
rviz2 -d ~/juxi_speech_ws/src/juxi_voice/juxi_voice.rviz
```

Ou abra primeiro o RViz e depois carregue:

```Bash
rviz2
# 菜单栏: File → Open Config → 选择 juxi_voice.rviz
```

---

## 8、Descrição da pré-configuração do RViz

`juxi_voice.rviz` já tem pré-configurado o seguinte; está pronto a utilizar no arranque, sem necessidade de qualquer operação manual:

- **Fixed Frame**: `map`

- **Visualização Marker**: já subscreve `/juxi_visual_marker` (marcador único)

- **Visualização MarkerArray**: já subscreve `/juxi_visual_markers` (vários marcadores: braço robótico, bateria, alarme, etc.)

- **Perspetiva**: vista de cima em ângulo, com o centro na origem

---

## 9、Modo de utilização

#### Ativação

Diga **"你好小犀"** ao módulo → o módulo responde "我在"

#### Enviar comandos

- "小车前进" → o cubo avança

- "亮红灯" → o cubo fica vermelho

- "打开流水灯" → as cores mudam ciclicamente

- "报警" → esfera vermelha pulsante

- "显示电量" → texto da bateria

#### Reprodução acionada pelo controlador anfitrião

```Bash
# 被动播报
ros2 topic pub /juxi_passive_play std_msgs/msg/String "data: '这是红色'"
# 功能词播报
ros2 topic pub /juxi_func_play std_msgs/msg/String "data: '欢迎语'"
# 命令词播报
ros2 topic pub /juxi_cmd_play std_msgs/msg/String "data: '小车前进'"
```

---

## 10、Tabela de correspondência de IDs das palavras de comando

### Palavras de função (ID 1-10)

### Palavras de comando (ID 11-83, 113)

### Frases de reprodução passiva (ID 84-112, 114)

---

## 11、Descrição dos tópicos ROS2

---

## 12、Resolução de problemas

**É apresentado "módulo de interação por voz AI não detetado" no arranque**

Verifique se o ficheiro de dispositivo correspondente ao modo de cablagem existe:

```Bash
# I2C 接线
ls /dev/i2c-1
sudo i2cdetect -y 1   # 应看到 0x2A

# Type-C 接线
ls /dev/ttyUSB0 /dev/ttyACM0

# UART 接线
ls /dev/ttyAMA0 /dev/ttyS0
```

**Erro de permissões da porta série**

```Bash
sudo chmod 666 /dev/ttyUSB0   # 或 /dev/ttyACM0 等
```

**Erro de permissões do I2C**

```Bash
sudo chmod 666 /dev/i2c-1
```

**Não há nenhum cubo no RViz**

- Verifique se o Fixed Frame é `map`

- Verifique se o Topic é `/juxi_visual_marker`

**Sem resposta aos comandos após a ativação**

```Bash
ros2 topic echo /juxi_voice_cmd
```

Com dados → problema de configuração do RViz; sem dados → anomalia de cablagem/comunicação.

<RelatedProducts slugs="ai-voice-module" />
