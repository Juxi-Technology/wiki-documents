---
title: "ROS: preparação"
description: "(1) Depois de criar o espaço de trabalho, copie o conteúdo da pasta gpssrc para o src do espaço de trabalho e…"
---

# ROS: preparação

#### 1. Instruções de compilação do módulo GPS

(1) Depois de criar o espaço de trabalho, copie o conteúdo da pasta gps_src para o src do espaço de trabalho e compile com colcon build; se não houver erros, a compilação foi bem-sucedida;

Execute no diretório ~/gps_ros2

```
colcon build
```

Execute no diretório ~/gps_ros2 

```
source install/setup.bash
```

(2) Descrição do conteúdo dos pacotes de funcionalidades:

- nmea_navsat_driver: iniciar o módulo GPS, ler os dados do módulo GPS, desenhar dados de GPS e outras funções;
- nmea_msgs: armazena alguns arquivos msg de mensagens de GPS
- imu_gps_localization: função de fusão de dados de IMU e GPS
- gps_goal: converte dados de latitude e longitude em dados de navegação de destino do Nav2

#### 2. Vincular a porta do GPS

O módulo GPS se conecta ao computador ou ao controlador principal através da porta serial; portanto, precisamos vincular bem a porta do GPS, para evitar que problemas com o número da porta impeçam o computador ou o controlador principal de reconhecer o módulo GPS.

(1) Verifique os dispositivos USB conectados e localize o módulo GPS; no terminal, digite **lsusb** para encontrar o ID do dispositivo conectado ao GPS. Como mostra a figura abaixo, esse é o ID de identificação do dispositivo do módulo GPS,

![Imagem 1](../../../../../public/images/tutorials/sensors/gps/ROS-Preparation/1.png)

(2) Agora que sabemos o ID do dispositivo, o próximo passo é criar o arquivo rules e vincular bem a porta; no terminal, digite,

```
sudo gedit /etc/udev/rules.d/my_serial.rules 
```

Copie o conteúdo a seguir para dentro dele,

```
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="myserial"
```

Salve e saia, depois conceda permissão de execução; no terminal, digite,

```
sudo chmod 777 /etc/udev/rules.d/my_serial.rules 
```

(3) Reconecte o módulo GPS; no terminal, digite ll /dev/myserial para verificar se a vinculação foi bem-sucedida. Se a tela a seguir aparecer, a vinculação foi bem-sucedida,

```
ll /dev/myserial
```

![Imagem 2](../../../../../public/images/tutorials/sensors/gps/ROS-Preparation/2.png)

<RelatedProducts slugs="gps-beidou-module" />
