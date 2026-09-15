---
title: "Instruções antes de utilizar o módulo GPS"
description: "(1) Depois de criar o espaço de trabalho, copie o conteúdo da pasta gpssrc para dentro do src do espaço de tr…"
---

# Instruções antes de utilizar o módulo GPS

#### 1. Instruções de compilação do módulo GPS

(1) Depois de criar o espaço de trabalho, copie o conteúdo da pasta gps_src para dentro do src do espaço de trabalho e compile com colcon build; se não aparecerem erros, a compilação foi bem-sucedida;

Execute no diretório ~/gps_ros2

```
colcon build
```

Execute no diretório ~/gps_ros2 

```
source install/setup.bash
```

(2) Descrição do conteúdo dos pacotes de funcionalidades:

- nmea_navsat_driver: arrancar o módulo GPS, ler os dados do módulo GPS, traçar dados de GPS e outras funções;
- nmea_msgs: guarda alguns ficheiros msg de mensagens de GPS
- imu_gps_localization: função de fusão de dados de IMU e GPS
- gps_goal: converte dados de latitude e longitude em dados de navegação de destino do Nav2

#### 2. Associar a porta do GPS

O módulo GPS liga-se ao computador ou ao controlador principal através da porta série; por isso, temos de associar bem a porta do GPS, para evitar que problemas com o número da porta impeçam o computador ou o controlador principal de reconhecer o módulo GPS.

(1) Verifique os dispositivos USB ligados e localize o módulo GPS; no terminal, introduza **lsusb** para encontrar o ID do dispositivo ligado ao GPS. Como mostra a figura abaixo, esse é o ID de identificação do dispositivo do módulo GPS,

![Imagem 1](../../../../../public/images/tutorials/sensors/gps/ROS-Preparation/1.png)

(2) Agora que sabemos o ID do dispositivo, o próximo passo é criar o ficheiro rules e associar bem a porta; no terminal, introduza,

```
sudo gedit /etc/udev/rules.d/my_serial.rules 
```

Copie o conteúdo a seguir para dentro dele,

```
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="myserial"
```

Guarde e saia, depois conceda permissão de execução; no terminal, introduza,

```
sudo chmod 777 /etc/udev/rules.d/my_serial.rules 
```

(3) Volte a ligar o módulo GPS; no terminal, introduza ll /dev/myserial para verificar se a associação foi bem-sucedida. Se aparecer o ecrã seguinte, a associação foi bem-sucedida,

```
ll /dev/myserial
```

![Imagem 2](../../../../../public/images/tutorials/sensors/gps/ROS-Preparation/2.png)

<RelatedProducts slugs="gps-beidou-module" />
