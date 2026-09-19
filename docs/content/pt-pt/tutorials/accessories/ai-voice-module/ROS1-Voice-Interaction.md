---
title: "Interação por voz ROS1"
description: "Interação por voz em ROS1 com o módulo de voz AI: preparação do ambiente em Ubuntu com Noetic ou Melodic e deteção automática do modo de ligação."
---

# Interação por voz ROS1

## 1、Preparação do ambiente

#### Requisitos do sistema

- **Sistema operativo**: Ubuntu 20.04 ou 18.04

- **Versão do ROS1**: Noetic (recomendado) ou Melodic

#### Instalar as bibliotecas de dependências

```Bash
# 1. Atualizar as fontes
sudo apt update

# 2. Instalar a versão completa ROS1 Desktop
# (se o ROS1 já estiver instalado, ignorar)
sudo apt install ros-noetic-desktop-full -y    # Ubuntu 20.04
sudo apt install ros-melodic-desktop-full -y   # Ubuntu 18.04

# 3. Instalar as dependências deste projeto (com suporte para porta série e I2C)
sudo apt install python3-pip ros-noetic-rviz i2c-tools -y
pip3 install pyserial smbus2

# Se for Melodic (Python2)
sudo apt install python-pip ros-melodic-rviz i2c-tools -y
pip install pyserial smbus2

# 4. Se utilizar ligação I2C, instalar adicionalmente
sudo apt install python3-smbus2 -y
```

---

## 2、Descrição dos três modos de cablagem

O módulo de interação por voz AI suporta os seguintes três modos de cablagem:

#### Mecanismo de deteção automática

Quando o nó ROS1 é iniciado, deteta automaticamente o modo de cablagem pela seguinte ordem:

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

#### Criar o espaço de trabalho catkin

```Bash
mkdir -p ~/juxi_speech_ws/src
cd ~/juxi_speech_ws/src
```

#### Criar o pacote ROS

```Bash
catkin_create_pkg juxi_voice rospy std_msgs visualization_msgs
```

#### Estrutura final de diretórios

Coloque os ficheiros fornecidos com este projeto nos locais correspondentes:

```Bash
~/juxi_speech_ws/
├── build/
├── devel/
└── src/
    └── juxi_voice/
        ├── CMakeLists.txt      # (substituir pelo fornecido neste projeto)
        ├── package.xml          # (substituir pelo fornecido neste projeto)
        ├── juxi_voice.rviz      # (criar: ficheiro de pré-configuração do RViz)
        ├── launch/
        │   └── juxi_voice.launch # (criar: ficheiro de arranque com um clique)
        └── scripts/
            ├── voice_node.py     # (criar: nó de voz)
            └── rviz_control.py   # (criar: nó de controlo RViz)
```

---

## 6、Conteúdo e colocação dos ficheiros

#### Ficheiro 1: `voice_node.py` (nó de controlo de voz)

**Localização**: `~/juxi_speech_ws/src/juxi_voice/scripts/voice_node.py`

**Funcionalidades principais**:

- Deteta automaticamente o modo de cablagem Type-C / UART / IIC

- Tabela de mapeamento unificada de palavras de comando (114 palavras de comando, totalmente consistente com a tabela de protocolo Excel V1)

- Utiliza o backend de comunicação correspondente (porta série / I2C) de acordo com o modo de cablagem

**Arquitetura principal**:

```Bash
# Dados de comando unificados: ID → (byte 2 da porta série, byte 3 da porta série, texto do comando, modo de reprodução)
CMD_DATA = {
    1:   (0x01, 0x00, "欢迎语", "被"),
    3:   (0x03, 0x00, "你好小犀", "主"),
    14:  (0x00, 0x04, "小车前进", "主"),
    84:  (0xFF, 0x5F, "这是红色", "被"),
    ...
}

# Função de deteção automática
def detect_connection():
    # 1. Tentar a porta série /dev/ttyUSB0, /dev/ttyACM0, /dev/ttyAMA0, /dev/ttyS0
    # 2. Tentar I2C /dev/i2c-1 (endereço de escravo 0x2A)
    ...
```

(Para o código completo, consulte o ficheiro `voice_node.py` fornecido com o projeto)

#### Ficheiro 2: `rviz_control.py` (nó de controlo do RViz)

**Localização**: `~/juxi_speech_ws/src/juxi_voice/scripts/rviz_control.py`

Subscreve o tópico `/juxi_voice_cmd` para receber o texto do comando e atualiza a visualização do cubo de acordo com o comando.

(Para o código completo, consulte o ficheiro `rviz_control.py` fornecido com o projeto)

#### Ficheiro 3: `CMakeLists.txt` e `package.xml`

Já são fornecidos neste projeto; basta substituir os ficheiros predefinidos gerados automaticamente pelo `catkin_create_pkg`.

---

## 7、Compilação e execução

#### Compilação

```Bash
cd ~/juxi_speech_ws
catkin_make
```

#### Variáveis de ambiente

```Bash
source ~/juxi_speech_ws/devel/setup.bash
# Ou escrever em ~/.bashrc
echo "source ~/juxi_speech_ws/devel/setup.bash" >> ~/.bashrc
```

#### Configuração de permissões

```Bash
# Permissões I2C
sudo chmod 666 /dev/i2c-1
# Permissões da porta série
sudo chmod 666 /dev/ttyUSB0
sudo chmod 666 /dev/ttyACM0
sudo chmod 666 /dev/ttyAMA0
# Ou adicionar ao grupo de utilizadores
sudo usermod -aG dialout $USER
sudo usermod -aG i2c $USER
# Depois de configurar, é necessário iniciar sessão novamente para ter efeito
```

#### Executar os nós

**Modo 1: arranque com um clique (recomendado)**

```Bash
cd ~/juxi_speech_ws
source devel/setup.bash
roslaunch juxi_voice juxi_voice.launch
```

No arranque, são abertos automaticamente o nó de voz, o nó de controlo do RViz e a interface de visualização RViz.

**Modo 2: arranque por passos (3 terminais)**

**Terminal 1**: iniciar o roscore

```Bash
roscore
```

**Terminal 2**: nó de voz

```Bash
cd ~/juxi_speech_ws
source devel/setup.bash
rosrun juxi_voice voice_node.py
```

No arranque, é apresentado o modo de cablagem detetado:

```Bash
[INFO] 自动检测: IIC /dev/i2c-1 (从机地址 0x2A)
[INFO] 语音节点启动完成 - IIC /dev/i2c-1 (从机地址 0x2A)
```

ou

```Bash
[INFO] 自动检测: UART /dev/ttyUSB0
[INFO] 语音节点启动完成 - UART /dev/ttyUSB0
```

Se não for detetado nenhum dispositivo:

```Bash
[FATAL] 未检测到AI语音交互模块！请检查接线 (Type-C / UART / IIC)
[FATAL] 支持的端口: I2C(/dev/i2c-1) | 串口(/dev/ttyUSB0 /dev/ttyACM0 /dev/ttyAMA0 /dev/ttyS0)
```

**Terminal 3**: nó de controlo do RViz

```Bash
cd ~/juxi_speech_ws
source devel/setup.bash
rosrun juxi_voice rviz_control.py
```

**Terminal 4**: visualização do RViz (carrega diretamente o ficheiro pré-configurado, sem necessidade de configuração manual)

```Bash
rviz -d ~/juxi_speech_ws/src/juxi_voice/juxi_voice.rviz
```

Ou abra primeiro o RViz e depois carregue:

```Bash
rviz
# Barra de menus: File → Open Config → selecionar juxi_voice.rviz
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
# Reprodução passiva (I2C → escrever 0xD1, porta série → enviar FE EF FF XX EE)
rostopic pub /juxi_passive_play std_msgs/String "data: '这是红色'"
# Reprodução de palavras de função (I2C → escrever 0xD2, porta série → enviar FE EF 01 00 EE)
rostopic pub /juxi_func_play std_msgs/String "data: '欢迎语'"
# Reprodução de palavras de comando (I2C → escrever 0xD3, porta série → enviar FE EF 00 04 EE)
rostopic pub /juxi_cmd_play std_msgs/String "data: '小车前进'"
```

---

## 10、Tabela de correspondência de IDs das palavras de comando

> Um total de 114 palavras de comando, totalmente consistente com `命令词播报词协议列表V1_中文.xlsx`.
> 
> 

### Palavras de função (ID 1-10)

### Palavras de comando (ID 11-83, 113)

### Frases de reprodução passiva (ID 84-112, 114)

---

## 11、Descrição dos tópicos ROS1

---

## 12、Resolução de problemas

**1. É apresentado "módulo de interação por voz AI não detetado" no arranque**

Verifique se o ficheiro de dispositivo correspondente ao modo de cablagem existe:

```Bash
# Ligação I2C
ls /dev/i2c-1
sudo i2cdetect -y 1   # Deverá ver 0x2A

# Ligação Type-C
ls /dev/ttyUSB0 /dev/ttyACM0

# Ligação UART
ls /dev/ttyAMA0 /dev/ttyS0
```

**2. Erro de permissões da porta série**

```Bash
sudo chmod 666 /dev/ttyUSB0   # Ou /dev/ttyACM0, etc.
# Ou adicionar ao grupo de utilizadores dialout (é necessário iniciar sessão novamente)
sudo usermod -aG dialout $USER
```

**3. Erro de permissões do I2C**

```Bash
sudo chmod 666 /dev/i2c-1
# Ou adicionar ao grupo de utilizadores i2c (é necessário iniciar sessão novamente)
sudo usermod -aG i2c $USER
```

**4. Não há nenhum cubo no RViz**

- Verifique se o Fixed Frame é `map`

- Verifique se o Topic é `/juxi_visual_marker`

- Confirme que o nó rviz_control.py foi iniciado

**5. Sem resposta aos comandos após a ativação**

```Bash
rostopic echo /juxi_voice_cmd
```

Com dados → problema de configuração do RViz; sem dados → anomalia de cablagem/comunicação.

**6. O rosrun não encontra o nó**

Confirme que a compilação e o source já foram executados:

```Bash
cd ~/juxi_speech_ws
catkin_make
source devel/setup.bash
```

**7. É apresentado um erro de sintaxe**

```Bash
# Confirmar que o script Python tem permissões de execução
chmod +x ~/juxi_speech_ws/src/juxi_voice/scripts/voice_node.py
chmod +x ~/juxi_speech_ws/src/juxi_voice/scripts/rviz_control.py
```

<RelatedProducts slugs="ai-voice-module" />
