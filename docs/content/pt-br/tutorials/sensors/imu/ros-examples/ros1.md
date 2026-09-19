---
title: Aplicação ROS1
description: "Aplicação ROS1 do módulo IMU da Juxi Technology — configurar o ROS Noetic no Ubuntu 20.04, construir o projeto, ler os dados do sensor e visualizar no RViz."
---

# Aplicação ROS1

> **[Comprar na Loja](https://www.juxitech.com/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


**Configuração do sistema: ubuntu20.04**

**Versão ROS1: noetic**

### Configuração do ambiente ROS1

1. **Configurar a fonte de instalação do ROS1**

```PowerShell
sudo sh -c '. /etc/lsb-release && echo "deb http://mirrors.tuna.tsinghua.edu.cn/ros/ubuntu/ `lsb_release -cs` main" > /etc/apt/sources.list.d/ros-latest.list'
```

2. **Configurar a chave (Key)**

```PowerShell
sudo apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654
```

```Plain Text
sudo apt update
```

3. **Instalar o ROS1 (download oficial)**

```PowerShell
sudo apt install ros-noetic-desktop-full
```

Acelerar o download e a instalação do ROS1 via proxy

wget http://fishros.com/install -O fishros && . fishros

4. **Configurar as variáveis de ambiente**

```Plain Text
echo "source /opt/ros/noetic/setup.bash" >> ~/.bashrc
```

```PowerShell
source ~/.bashrc
```

### Conectar o dispositivo à máquina virtual

1. **Verificar o dispositivo**

```PowerShell
ll /dev/ttyUSB*
```

2. **Criar o mapeamento de portas**

```PowerShell
sudo gedit /etc/udev/rules.d/99-serial-imu.rules
```

3. **Preencher o conteúdo do arquivo de mapeamento**

```PowerShell
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"
```

4. **Salvar, sair e executar os comandos para ativar as regras**

```PowerShell
sudo udevadm trigger
```

```Plain Text
sudo service udev reload
```

```Plain Text
sudo service udev restart
```

5. **Verificar**

```PowerShell
ll /dev/imu-serial
```

```Bash
sudo usermod -aG dialout ash
```

### Importar o pacote compactado preparado

1. **No mesmo diretório do Feishu há** [IMU_ROS1.zip](https://juxitech.feishu.cn/wiki/BcWGwW2yDiXex9k6qjTcleTvnPb)

2. **Após descompactar, transfira-o para a máquina virtual por meio de um software de transferência de arquivos**

3. **Instalar a biblioteca IMU_Library**

```PowerShell
cd IMU_ROS1
# Após baixar e descompactar o arquivo compactado IMU_ROS1, entre no diretório IMU_Library e execute os comandos abaixo
cd IMU_Library

# Instalar a biblioteca e suas dependências
pip install -e .

# Ou instalar usando setup.py
python setup.py install
```

### Instalação das bibliotecas Python

```PowerShell
sudo pip3 install pyserial
sudo pip3 install smbus2
```

**Se ocorrerem problemas de renderização, execute os comandos abaixo**

```PowerShell
sudo apt-get install ros-noetic-imu-filter-madgwick
sudo apt-get install ros-noetic-rviz-imu-plugin
```

### Construir o projeto ROS1

1. **Abra um novo terminal no diretório /home e crie um novo espaço de trabalho ros1**

```PowerShell
mkdir imu_ros1
cd imu_ros1
mkdir src
cd src/
catkin_init_workspace
```

2. **Copie a pasta IMU_ROS1 transferida para o diretório ~/imu_ros1/src/**

```PowerShell
# Copiar a pasta IMU_ROS1 para o diretório src recém-criado
cp -r ~/IMU_ROS1 ~/imu_ros1/src
cd ~/imu_ros1
catkin_make
```

3. **Adicionar o diretório de trabalho ~/imu_ros1 às variáveis de ambiente**

```PowerShell
# Editar ~/.bashrc
sudo gedit ~/.bashrc

# Adicionar o comando abaixo ao final
source ~/imu_ros1/devel/setup.bash

source ~/.bashrc
```

### Iniciar o nó ROS1

1. **Abra um terminal e execute roscore para iniciar o nó**

```PowerShell
# Iniciar o roscore
roscore

# Abrir um novo terminal, configurar o ambiente e iniciar o nó
source ~/imu_ros1/devel/setup.bash
```

2. **Adicionar permissão de execução aos scripts Python (fundamental)**

Entre no diretório `scripts` onde o script está localizado e execute o comando `chmod +x` para conceder permissão de execução (`+x` significa add execute):

```PowerShell
# Entrar no diretório onde está o imu_driver.py (conforme o seu caminho real)
cd ~/imu_ros1/src/IMU_ROS1/scripts/

# Conceder permissão de execução (basta executar 1 vez; tem efeito permanente)
chmod +x imu_driver.py
chmod +x mag_visualizer.py
```

Volte à pasta imu_ros1 e execute imu_driver.py

```Plain Text
cd ~/imu_ros1
```

```Plain Text
rosrun IMU_ROS1 imu_driver.py
```

### Impressão dos dados do IMU

1. **Abra um novo terminal e verifique os tópicos do IMU**

```PowerShell
# Ver todos os tópicos publicados no momento
rostopic list
```

2. **Imprimir os dados do tópico**

```PowerShell
# Imprimir os dados brutos da IMU
rostopic echo /imu/data_raw

# Imprimir os dados do magnetômetro
rostopic echo /imu/mag
```

### Visualização no RViz

1. **Execute o comando para iniciar o rviz**

```PowerShell
roslaunch IMU_ROS1 imu_display.launch
```

### Perguntas frequentes

1. Se o nó falhar ao abrir, tente os comandos abaixo

```PowerShell
# Executar no diretório ~/imu_ros1
source devel/setup.bash

# Problema com o número da porta
sudo chmod 666 /dev/imu-serial
```

2. Na visualização RViz, os três eixos aparecem muito pequenos; marque novamente Enable axes

![常见问题 – 1](../../../../../../public/images/tutorials/sensors/imu/ros-examples/ros1/1.png)

