---
title: "Controlo de simulação ROS2"
description: "Conjunto de pacotes ROS 2 para o braço SO-ARM101, com descrição do robô, simulação no Gazebo, planeamento no MoveIt 2 e hardware real."
---

# Controlo de simulação ROS2

[SO-ARM101_ROS2.zip](/downloads/SO-ARM101_ROS2.zip)

Workspace ROS 2 completo do braço robótico de seis graus de liberdade SO-ARM101, abrangendo descrição do robô, driver de hardware integrado, simulação no Gazebo e planeamento de movimento do MoveIt 2.

SO-ARM101 é o braço seguidor open source de segunda geração projetado em conjunto pela [TheRobotStudio](https://www.therobotstudio.com/) e pela comunidade [LeRobot](https://huggingface.co/lerobot), usando seis servos STS3215, placa de acionamento de servos e peças impressas em 3D de PLA+.

**Atenção:****o braço robótico precisa de calibração da posição central; faça a calibração da posição central quando todas as articulações estiverem no meio de sua faixa de rotação**

## Estrutura dos pacotes

Plataforma alvo: **ROS 2 Humble / Jazzy**.

---

## Preparação do ambiente ROS2

Antes de compilar este projeto, certifique-se de que o ROS 2 e os componentes relacionados já estão instalados no sistema.

### Requisitos do sistema

- Ubuntu 22.04 (recomendado) ou 24.04

- Pelo menos 4 GB de memória

- O modo de hardware real requer porta série USB

### 0.1  Instalar o ROS 2 Humble

```Bash
# Definir o locale
sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8

# Adicionar o repositório do ROS 2
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo apt update && sudo apt install curl -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# Instalar o ROS 2 Humble Desktop
sudo apt update
sudo apt install ros-humble-desktop
```

### 0.2  Instalar ferramentas de compilação e dependências

```Bash
# Ferramenta de compilação colcon
sudo apt install python3-colcon-common-extensions

# MoveIt 2
sudo apt install ros-humble-moveit

# ros2_control
sudo apt install ros-humble-ros2-control \
                 ros-humble-ros2-controllers \
                 ros-humble-controller-manager \
                 ros-humble-joint-state-publisher-gui
```

### 0.3  Definir variáveis de ambiente

```Bash
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

### 0.4  Definir permissões da porta série (necessário para hardware real)

**Configuração permanente (recomendada)**:

```Bash
sudo usermod -a -G dialout $USER
# Tem efeito após sair e entrar novamente na sessão
```

**Configuração temporária (precisa de ser reexecutada após cada reinicialização)**:

```Bash
sudo chmod 666 /dev/ttyACM0
```

## Instalar o ambiente do workspace

```Markdown
# Passo 1  Criar o workspace
mkdir -p ~/so101_ws/src
cd ~/so101_ws/src

# Passo 2  Colocar o código-fonte aqui
cp -r /path/to/SO-ARM101_ROS2 ./

# Passo 3  Instalar as dependências do sistema
cd ~/so101_ws
rosdep install --from-paths src --ignore-src -r -y

# Passo 4  Compilar todos os pacotes
colcon build --symlink-install

# Passo 5  Carregar o ambiente  ← deve ser executado em cada novo terminal
source install/setup.bash
```

**Nota sobre hardware real** — o pacote `so_arm_hardware` já vem integrado. Não é necessário
instalar drivers adicionais; comunica-se diretamente com os servos STS3215 pela porta série usando o protocolo SCS.

## Verificação visual

Começar por aqui é o mais simples — não requer controladores nem hardware.

```Bash
#  Terminal 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_description view_description.launch.py rviz:=true
```

O RViz apresenta o modelo completo do robô; arraste os controlos deslizantes para verificar se o movimento de cada articulação está correto.

---

## Teste de controladores (hardware virtual / modo Mock)

Ainda não é necessário um robô real; tudo corre em memória.

```Bash
#  Terminal 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_description controllers_bringup.launch.py
```

Quando os logs aparecerem, isso indica que está pronto:

```Bash
joint_state_broadcaster      → active
joint_trajectory_controller  → active
```

**Atenção**: o modo de simulação inicia apenas dois controladores (`joint_state_broadcaster` e
`joint_trajectory_controller`). O `gripper_controller` foi removido, e a garra
é controlada de forma unificada pelo `joint_trajectory_controller` em todas as 6 articulações.

### Responsabilidades dos controladores

## Planeamento de movimento do MoveIt (hardware Mock)

**Basta um único terminal** — o MoveIt inicia a pilha de controladores automaticamente.

```Bash
#  Terminal 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config demo.launch.py
```

Depois que a janela do RViz abrir:

1. No painel **MotionPlanning**, em **Planning Group → manipulator**

2. **Start State → ****`<current>`**, **Goal State → extended**

3. Clique em **Plan** e depois em **Execute**

Posições predefinidas disponíveis: `open`, `zero`, `extended`, `rest`.

### 4.1  Detalhes da interface do MoveIt

Após iniciar o RViz, o painel **MotionPlanning** é apresentado à esquerda, contendo os seguintes separadores principais:

#### Separador Planning

#### Parâmetros de planeamento

> **Sugestão para o primeiro teste**: defina Velocity e Acceleration em 0.3, reduzindo a velocidade de movimento para garantir a segurança.
> 
> 

#### Separador Scene Objects

- Adicionar obstáculos (Box / Sphere / Cylinder) para deteção de colisão

- Importar / exportar cena

- O MoveIt planeia desviando automaticamente dos obstáculos

#### Separador Stored States

- Guardar posições de braço robótico de uso frequente

- Posições predefinidas: `open`, `zero`, `extended`, `rest`

### 4.2  Fluxo básico de operação

#### Método A: arraste interativo (recomendado)

1. Na visualização 3D, encontre o **marcador interativo** (setas coloridas e anéis) na extremidade do braço robótico

2. Arraste as setas para transladar a posição da extremidade e arraste os anéis para rotacionar a orientação

3. O sistema resolve a IK automaticamente e atualiza os ângulos das articulações em tempo real

4. Clique em **Plan** para ver a trajetória planeada (em laranja)

5. Após confirmar, clique em **Execute** para executar

> Se houver travamentos ao arrastar, recomenda-se partir primeiro da posição predefinida `rest` e então arrastar.
> 
> 

#### Método B: posições predefinidas

1. Menu pendente **Query Goal State** → selecione `open` / `extended` / `rest` etc.

2. Clique em **Update**

3. Clique em **Plan**

4. Clique em **Execute**

#### Método C: definir manualmente os ângulos das articulações

1. **Query Goal State** → separador **Joints**

2. Arraste os controlos deslizantes de cada articulação para definir os ângulos desejados

3. Referência das faixas das articulações:

1. Clique em **Update**

2. Clique em **Plan**

3. Clique em **Execute**

#### Método D: alvo válido aleatório

Clique no botão **Random Valid** para gerar automaticamente uma posição aleatória alcançável e, em seguida, Plan → Execute.

### 4.3  Observações de segurança

1. **Reduza a velocidade no primeiro uso**: defina Velocity / Acceleration em 0.1–0.3

2. **Paragem de emergência**: a qualquer momento, encerre o programa com Ctrl+C ou desligue a alimentação

3. **Limites das articulações**: o MoveIt não planeia além dos limites de `joint_limits.yaml`, mas é preciso garantir que a configuração esteja correta

4. **Hardware real**: antes de executar, garanta que há espaço suficiente ao redor do braço robótico

### Visão geral da configuração do MoveIt

---

## Simulação no Gazebo

A simulação no Gazebo exige **4 terminais em execução simultânea**. Siga a ordem rigorosamente.

### 5.1  Iniciar a simulação no Gazebo  (terminal 1)

```Bash
#  Terminal 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm_gz so_arm_gz_bringup.launch.py
```

Aguarde o surgimento da janela do Gazebo; o robô permanece brevemente no ar e depois cai no chão.

### 5.2  Carregar o controlador de trajetória  (terminal 2)

Por omissão, o Gazebo ativa apenas o `forward_position_controller`; é preciso alternar
manualmente para o `joint_trajectory_controller`:

```Markdown
#  Terminal 2
source ~/so101_ws/install/setup.bash

# Passo A — desligar o forward_position_controller
ros2 control set_controller_state forward_position_controller inactive

# Passo B — carregar e ativar o joint_trajectory_controller com o spawner
ros2 run controller_manager spawner joint_trajectory_controller

# Passo C — verificar
ros2 control list_controllers
```

Saída esperada:

```Bash
forward_position_controller  inactive
joint_state_broadcaster      active
joint_trajectory_controller  active
```

⚠️ Não use `ros2 control load_controller` primeiro! Ele deixa o controlador no estado
`unconfigured`, fazendo com que o spawner não consiga ativar. Se já executou, primeiro
`unload_controller` e comece de novo.

### 5.3  Iniciar o move_group  (terminal 3)

```Bash
#  Terminal 3
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config move_group.launch.py use_sim_time:=True
```

### 5.4  Iniciar o RViz  (terminal 4)

```Bash
#  Terminal 4
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config moveit_rviz.launch.py
```

Depois que o RViz estiver pronto:

1. **Planning Group → manipulator**

2. **Goal State → open** (ou `extended`, `rest`)

3. Clique em **Plan** e depois em **Execute**

As articulações do braço no Gazebo acompanham o movimento.

**Atenção**: devido à limitação de ganho do PID na versão Humble do `gz_ros2_control`,
a garra pode não abrir fisicamente no Gazebo (o log de execução ainda mostra sucesso).
Os modos Mock e de hardware real não têm esse problema.

### 5.5  Modo headless (sem GUI)

```Bash
ros2 launch so_arm_gz so_arm_gz_bringup.launch.py \
  gazebo_gui:=false \
  launch_rviz:=false
```

### 5.6  Solução de problemas: quando o carregamento falha repetidamente

Se o spawner reportar `Failed to activate controller` continuamente, execute os passos abaixo para redefinir completamente:

```Bash
# 1. Descarregar o controlador travado
ros2 control unload_controller joint_trajectory_controller

# 2. Desligar o forward_position_controller
ros2 control set_controller_state forward_position_controller inactive

# 3. Fazer spawn novamente
ros2 run controller_manager spawner joint_trajectory_controller
```

## Hardware real

Pré-requisito: braço robótico SO-ARM101 montado, com a placa de acionamento de servos ligada ao computador via USB.

### 6.1  Iniciar os controladores (pode ser ignorado)

```Bash
#  Terminal 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_description controllers_bringup.launch.py \
  hardware_type:=real \
  usb_port:=/dev/ttyACM0
```

O plugin `so_arm_hardware` faz automaticamente:

1. Abrir a porta série

2. Varrer os 6 IDs de servo (1–6)

3. Verificar se cada servo responde

4. Ativar o torque e ler a posição atual

Depois que os controladores estiverem prontos, abra mais dois terminais para iniciar o MoveIt:

```Bash
#  Terminal 2 — move_group
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config move_group.launch.py
```

```Bash
#  Terminal 3 — RViz
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config moveit_rviz.launch.py
```

### 6.2  MoveIt (inicialização com um clique)

> Os comandos abaixo **substituem** o 6.1 (não execute os dois ao mesmo tempo; pare os comandos do 6.1) — o `demo.launch.py` já contém a pilha de controladores internamente.
> 
> 

```Bash
#  Terminal 1
source ~/so101_ws/install/setup.bash
ros2 launch so_arm101_moveit_config demo.launch.py \
  hardware_type:=real \
  usb_port:=/dev/ttyACM0
```

### 6.3  Solução de problemas da porta série

### 6.4  Apresentação do RViz inconsistente com a posição real

Se a posição do braço robótico no RViz estiver inconsistente com o hardware real (por exemplo, deslocamento de articulação, falso positivo de colisão):

1. Confirme que os servos já passaram pela calibração da posição central

2. Ajuste o `position_offset` de cada articulação em `so_arm101.ros2_control.xacro`

3. Fórmula de conversão: `novo offset = offset atual + (rad apresentado atual / 0.00153398)`

4. Após a modificação, recompile o pacote `so_arm101_description`

---

## Perguntas frequentes

### Q1: durante a compilação, é reportado "package not found"

**R**: certifique-se de que todas as dependências do sistema foram instaladas corretamente e de que o ambiente do ROS 2 foi carregado com source:

```Bash
source /opt/ros/humble/setup.bash
cd ~/so101_ws
rosdep install --from-paths src --ignore-src -r -y
colcon build --symlink-install
```

### Q2: ao iniciar, é apresentado "Permission denied" no acesso à porta série

**R**: verifique as permissões da porta série:

```Bash
# Solução temporária
sudo chmod 666 /dev/ttyACM0

# Solução permanente (tem efeito após sair da sessão)
sudo usermod -a -G dialout $USER
```

### Q3: falha no planeamento do MoveIt, com a mensagem "Motion planning start tree could not be initialized"

**R**: geralmente há duas causas:

1. **Articulação além do limite** — verifique a saída de `FixStartStateBounds` no log. A tolerância atual é
0.3 rad; se o excesso estiver dentro dessa faixa, ele passará. Caso contrário, é preciso ajustar `start_state_max_bounds_error`
ou verificar o deslocamento dos servos.

2. **Colisão no estado inicial** — verifique a saída de `FixStartStateCollision` no log. Se
for apresentado "Unable to find a valid state nearby", isso indica autocolisão na posição atual.
O braço robótico pode estar numa posição dobrada (por exemplo, a gripper tocando o shoulder), ou o deslocamento está incorreto.
Ajuste o `position_offset` e tente novamente.

### Q4: o braço robótico não se move após o Execute

**R**: verifique o estado dos controladores:

```Bash
ros2 control list_controllers
```

Certifique-se de que o `joint_trajectory_controller` está no estado `active`. Se não estiver, faça spawn novamente:

```Bash
ros2 run controller_manager spawner joint_trajectory_controller
```

### Q5: o RViz inicia lentamente ou trava

**R**: é um comportamento normal. Ao iniciar, o MoveIt carrega o modelo URDF, o plugin de deteção de colisão,
os solucionadores de cinemática etc.; a primeira inicialização leva cerca de 10 segundos.

### Q6: a trajetória planeada não é suave ou apresenta trepidação

**R**: tente os seguintes métodos:

- Alterne para um planeador diferente (selecione `RRTConnect` no menu pendente Planner do RViz)

- Aumente o Planning Time para 10 segundos

- Confirme que o alvo está dentro do espaço de trabalho (teste com `Random Valid`)

### Q7: a garra não se move no Gazebo

**R**: esta é uma limitação de ganho do PID codificado de forma fixa na versão Humble do `gz_ros2_control`
(fixado em 0.1), que não pode ser sobrescrita por parâmetros do URDF. O Execute no log mostra sucesso,
mas a garra não abre na simulação física do Gazebo. Os modos Mock e de hardware real não têm esse problema.

## Anexo: referência rápida dos parâmetros de inicialização

### `controllers_bringup.launch.py`

### `so_arm_gz_bringup.launch.py`

---

## Layout de diretórios

```Bash
SO-ARM101_ROS2/
├── so_arm_utils/                   # Biblioteca de ferramentas Python
├── so_arm101_description/          # URDF · controlador · malhas · RViz · MuJoCo
├── so_arm101_moveit_config/        # MoveIt 2 SRDF · planificador · ficheiros de lançamento
├── so_arm_gz/                      # Arranque da simulação Gazebo
├── so_arm_hardware/                # Controlador de porta série SCS integrado (C++)
└── Simulation/                     # URDF CAD original (mantido para referência)
```

<RelatedProducts slugs="so-arm101" />
