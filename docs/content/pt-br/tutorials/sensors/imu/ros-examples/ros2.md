---
title: Aplicação ROS2
description: "Aplicação ROS2 do módulo IMU da Juxi Technology — configurar o ROS2 Humble no Ubuntu 22.04, construir o projeto, ler os dados do sensor e visualizar no RViz2."
---

# Aplicação ROS2

> **[Comprar na Loja](https://www.juxitech.com/products/imu-module-ahrs-attitude-and-heading-angle-sensor)**


**Configuração do sistema: ubuntu22.04**

**Versão ROS2: humble**

### Configuração do ambiente ROS2

1. **Atualizar a fonte de download**

```PowerShell
sudo apt update
```

2. **Digitar o comando de download do ros2**

```PowerShell
wget http://fishros.com/install -O fishros && . fishros
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
sudo service udev reload
sudo service udev restart
```

5. **Verificar**

```PowerShell
ll /dev/imu-serial
```

### Importar o pacote compactado preparado

1. **No mesmo diretório do Feishu há** [IMU_ROS2.zip](https://juxitech.feishu.cn/wiki/ZL8XwrPriifnASk41AhcoPj1nnb)

2. **Transfira-o para a máquina virtual por meio de um software de transferência de arquivos**

3. **Instalar a biblioteca IMU_Library**

```PowerShell
# Após baixar e descompactar o arquivo compactado IMU_ROS2, entre no diretório IMU_Library e execute o setup.py
cd IMU_ROS2/IMU_Library

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

### Construir o projeto ROS2

1. **Volte ao diretório ~/IMU_ROS2**

```PowerShell
cd IMU_ROS2
colcon build --symlink-install
```

1. **Adicionar o diretório de trabalho ~/IMU_ROS2 às variáveis de ambiente**

```PowerShell
# Editar ~/.bashrc
sudo gedit ~/.bashrc

# Adicionar o comando abaixo ao final
source ~/IMU_ROS2/install/setup.bash
```

Após a compilação bem-sucedida, execute o comando abaixo para verificar se há arquivos executáveis no pacote de funcionalidades imu_ros2

`ros2 pkg executables imu_ros2`

### Iniciar o nó ROS2

```PowerShell
source install/setup.bash
ros2 run imu_ros2 imu_publisher
```

### Impressão dos dados do IMU

1. **Abra um novo terminal e verifique os tópicos do IMU**

```PowerShell
ros2 topic list
```

2. **Imprimir os dados do tópico /imu/data**

```PowerShell
ros2 topic echo /imu/data
```

3. **Abra um novo terminal e verifique o tópico msg**

```PowerShell
ros2 topic echo /imu/mag
```

### Visualização no RViz2

1. **Execute o comando para abrir a interface de visualização rviz**

```PowerShell
ros2 launch imu_ros2 imu_visualization.launch.py
```

### Perguntas frequentes

1. Se o nó falhar ao abrir, tente os comandos abaixo

```PowerShell
# Executar no diretório ~/IMU_ROS2
source install/setup.bash

# Problema com o número da porta
sudo chmod 666 /dev/imu-serial
```

