---
title: Tutorial de Introdução ao ROS
description: Tutorial ROS da Juxi Technology — configuração de ambiente ROS 1/ROS 2, conceitos básicos de tópicos/serviços/launch, prática com IMU e SO-ARM101
keywords: [ros, ros2, ros1, tutorial, robot operating system]
---

# Tutorial de Introdução ao ROS

> Para desenvolvedores iniciantes em ROS. Baseado em Ubuntu 22.04 + ROS 2 Humble, com exemplos práticos a usar o módulo IMU e o braço SO-ARM101 da Juxi Technology.

## 1. O que é o ROS?

O ROS (Robot Operating System) é o padrão de middleware de fato para robótica:

- **Topics**: publish/subscribe, comunicação ponto a ponto (ex.: fluxos de dados do IMU)
- **Services**: requisição/resposta (ex.: acionar uma ação)
- **Launch**: inicialização de vários nós com um único comando

O ROS 2 (Humble) é a versão principal atual, com melhorias em tempo real, multi-máquina e segurança.

## 2. Configuração do Ambiente

### Ubuntu 22.04 + ROS 2 Humble

```bash
# Add ROS 2 repository
sudo apt update && sudo apt install -y curl gnupg lsb-release
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key \
  -o /usr/share/keyrings/ros-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(source /etc/os-release && echo $UBUNTU_CODENAME) main" | \
  sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# Install
sudo apt update
sudo apt install -y ros-humble-desktop

# Source environment (each new terminal, or add to ~/.bashrc)
source /opt/ros/humble/setup.bash
```

### Verificar a Instalação

```bash
# Terminal 1
ros2 run demo_nodes_cpp talker

# Terminal 2
ros2 run demo_nodes_py listener
```

Ver `Hello World: N` em loop significa sucesso.

## 3. Conceitos Principais

| Conceito | Descrição | Exemplo |
|---------|-------------|---------|
| **Nó** | Processo independente | Nó do IMU, nó do braço robótico |
| **Tópico** | Fluxo de dados publish/subscribe | `/imu/data` atitude |
| **Mensagem** | Tipo de dado do tópico | `sensor_msgs/Imu` |
| **Serviço** | Requisição/resposta | Acionar reset do servo |
| **Ficheiro launch** | Orquestração de inicialização de vários nós | `imu_launch.py` |

## 4. Prática com Produtos Juxi

### Módulo IMU (ROS 2)

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module
colcon build
source install/setup.bash

ros2 launch icm42670p imu_launch.py

# View data
ros2 topic echo /imu/data
```

- [Tutorial IMU ROS2](/pt-pt/tutorials/sensors/imu/ros-examples/ros2)
- [Tutorial IMU ROS1](/pt-pt/tutorials/sensors/imu/ros-examples/ros1)

### Módulo KWS (RViz2)

- [Visualização KWS ROS2 RViz2](/pt-pt/tutorials/accessories/KWS-speech-recognition-module/ROS2-rviz2-visualization)

## 5. Cola de Comandos

```bash
ros2 node list                 # List nodes
ros2 topic list                # List topics
ros2 topic echo /topic         # View topic data
ros2 service list              # List services
ros2 launch pkg file.launch.py # Launch
```

## FAQ

**Q: `source /opt/ros/humble/setup.bash` com erros?**

**A:** Verifique a versão instalada e o caminho; no Jetson, ative o conda primeiro, se usado.

**Q: Erros de permissão de porta?**

**A:** `sudo chmod 666 /dev/ttyACM*`.

**Q: Usando Jetson?**

**A:** Atenção à compatibilidade do PyTorch — veja [Compatibilidade PyTorch em Jetson](/pt-pt/tutorials/learning-resources/jetson-orin-pytorch-compatibility).

---

## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Relatar Problemas](https://github.com/Juxi-Technology/wiki-documents/issues)
