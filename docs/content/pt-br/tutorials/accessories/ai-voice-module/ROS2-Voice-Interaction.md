---
title: "Interação de voz ROS2"
description: "Interação de voz ROS2 Humble com o módulo de voz: detecção automática do cabeamento serial ou I2C e visualização no RViz2."
---

# Interação de voz ROS2

## 1、Preparação do ambiente

#### Requisitos do sistema

- **Sistema operacional**: Ubuntu 22.04

- **Versão do ROS2**: Humble

#### Instalação das bibliotecas de dependência

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

## 2、Descrição dos três modos de cabeamento

O módulo de interação por voz oferece suporte aos três modos de cabeamento a seguir:

#### Mecanismo de detecção automática

Ao iniciar, o nó ROS2 detecta automaticamente o modo de cabeamento na seguinte ordem:

1. Primeiro, tenta a porta serial: verifica, em sequência, `/dev/ttyUSB0` → `/dev/ttyACM0` → `/dev/ttyAMA0` → `/dev/ttyS0`

2. Em seguida, tenta o I2C: verifica se o escravo `0x2A` existe em `/dev/i2c-1`

3. Para a porta serial, basta que o arquivo de dispositivo exista e possa ser aberto para considerá-la disponível, sem necessidade de verificação adicional

Assim que qualquer um dos modos é detectado, a detecção é interrompida e esse modo é fixado para uso. Não é necessária nenhuma configuração manual.

---

## 3、Descrição do protocolo IIC

#### Configuração do escravo IIC

#### Definição dos registradores

---

## 4、Descrição do protocolo da porta serial (Type-C / UART)

#### Formato do quadro

Cada quadro tem tamanho fixo de **5 bytes**:

#### Taxa de transmissão

Fixada em **115200** bps.

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

## 6、Conteúdo dos arquivos e posicionamento

#### Arquivo 1: `voice_node.py` (nó de controle de voz)

**Local**: `~/juxi_speech_ws/src/juxi_voice/juxi_voice/voice_node.py`

**Funções principais**:

- Detecção automática do modo de cabeamento Type-C / UART / IIC

- Tabela de mapeamento unificada de palavras de comando (114 palavras de comando)

- Usa o backend de comunicação correspondente conforme o modo de cabeamento

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

(Consulte o arquivo `voice_node.py` fornecido com o projeto para ver o código completo)

#### Arquivo 2: `rviz_control.py` (nó de controle do RViz)

**Local**: `~/juxi_speech_ws/src/juxi_voice/juxi_voice/rviz_control.py`

Assina o tópico `/juxi_voice_cmd` para receber o texto dos comandos e atualiza a visualização do cubo conforme o comando.

(Consulte o arquivo `rviz_control.py` fornecido com o projeto para ver o código completo)

#### Arquivo 3: modificar o `setup.py`

**Local**: `~/juxi_speech_ws/src/juxi_voice/setup.py`

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

Ao iniciar, o modo de cabeamento detectado é exibido:

```Bash
自动检测: IIC /dev/i2c-1 (从机地址 0x2A)
语音节点启动完成 - IIC /dev/i2c-1 (从机地址 0x2A)
```

ou

```Bash
自动检测: UART /dev/ttyUSB0
语音节点启动完成 - UART /dev/ttyUSB0
```

**Terminal 2**: nó de controle do RViz

```Bash
cd ~/juxi_speech_ws
source install/setup.bash
ros2 run juxi_voice rviz_control
```

**Terminal 3**: visualização do RViz (carrega diretamente o arquivo predefinido, sem necessidade de configuração manual)

```Bash
rviz2 -d ~/juxi_speech_ws/src/juxi_voice/juxi_voice.rviz
```

Ou abra o RViz primeiro e depois carregue:

```Bash
rviz2
# 菜单栏: File → Open Config → 选择 juxi_voice.rviz
```

---

## 8、Descrição da predefinição do RViz

`juxi_voice.rviz` já vem com o conteúdo a seguir predefinido; basta iniciar para usar, sem nenhuma operação manual:

- **Fixed Frame**: `map`

- **Exibição de Marker**: já assina `/juxi_visual_marker` (marcador único)

- **Exibição de MarkerArray**: já assina `/juxi_visual_markers` (vários marcadores: braço robótico, nível da bateria, alarme etc.)

- **Ponto de vista**: observação de cima e de lado, com o centro na origem

---

## 9、Modo de uso

#### Ativação

Diga **"你好小犀"** ao módulo → o módulo responde "我在"

#### Enviar comandos

- "小车前进" → o bloco avança

- "亮红灯" → o bloco fica vermelho

- "打开流水灯" → as cores mudam em ciclo

- "报警" → esfera pulsante vermelha

- "显示电量" → texto do nível da bateria

#### Reprodução acionada pelo host

```Bash
# 被动播报
ros2 topic pub /juxi_passive_play std_msgs/msg/String "data: '这是红色'"
# 功能词播报
ros2 topic pub /juxi_func_play std_msgs/msg/String "data: '欢迎语'"
# 命令词播报
ros2 topic pub /juxi_cmd_play std_msgs/msg/String "data: '小车前进'"
```

---

## 10、Tabela de referência de ID das palavras de comando

### Palavras de função (ID 1-10)

### Palavras de comando (ID 11-83, 113)

### Palavras de reprodução passiva (ID 84-112, 114)

---

## 11、Descrição dos tópicos do ROS2

---

## 12、Solução de problemas

**Exibe "módulo de interação por voz não detectado" na inicialização**

Verifique se o arquivo de dispositivo correspondente ao modo de cabeamento existe:

```Bash
# I2C 接线
ls /dev/i2c-1
sudo i2cdetect -y 1   # 应看到 0x2A

# Type-C 接线
ls /dev/ttyUSB0 /dev/ttyACM0

# UART 接线
ls /dev/ttyAMA0 /dev/ttyS0
```

**Erro de permissão na porta serial**

```Bash
sudo chmod 666 /dev/ttyUSB0   # 或 /dev/ttyACM0 等
```

**Erro de permissão no I2C**

```Bash
sudo chmod 666 /dev/i2c-1
```

**Nenhum cubo no RViz**

- Verifique se o Fixed Frame é `map`

- Verifique se o Topic é `/juxi_visual_marker`

**Sem resposta aos comandos após a ativação**

```Bash
ros2 topic echo /juxi_voice_cmd
```

Há dados → problema de configuração do RViz; sem dados → cabeamento/comunicação anormal.

<RelatedProducts slugs="ai-voice-module" />
