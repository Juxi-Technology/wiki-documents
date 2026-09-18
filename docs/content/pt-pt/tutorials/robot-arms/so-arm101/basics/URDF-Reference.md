---
title: "Ficheiros URDF e materiais de referência"
description: "Referências do ficheiro URDF do LeRobot, ferramentas como o URDF Studio, controlo de simulação ROS2 e a interface gráfica oficial."
---

# Ficheiros URDF e materiais de referência

## [Ficheiro URDF](https://github.com/TheRobotStudio/SO-ARM100/blob/main/Simulation/SO101/so101_new_calib.urdf) oficial do Lerbot

### URDF Studio

https://urdf.d-robotics.cc/

### Controlo de simulação ROS2 (pode ser implementado por conta própria)

https://github.com/holmsslk/so-arm-moveit-hardware

### Interface gráfica oficial do LeRobot

https://github.com/huggingface/leLab

LeLab é uma aplicação web que integra todo o fluxo de trabalho do LeRobot — calibração, teleoperação, gravação, treino, reprodução — numa única interface de navegador. Basta ligar o braço robótico, abrir a aplicação e começar a operar. Sem necessidade de operações complicadas de linha de comandos nem de entrada por teclado.

🤗 A entrada web nativa do LeRobot, concebida para permitir que os novos utilizadores completem em poucos minutos todo o processo, desde “abrir a caixa” até “treinar a sua primeira política”.

🤗 Instalar e executar todos os programas com um único comando.

## Controlo do braço seguidor pelo telemóvel

https://huggingface.co/docs/lerobot/main/en/phone_teleop

### Investigação e desenvolvimento de robôs na nuvem: implementação baseada em AWS da simulação Lerobot e do fluxo de dados entre dispositivos ROS 2 e Isaac Sim

https://github.com/ti/ti.github.io/blob/95261efa4f8bdb4c8571920762318a532e58c7fd/%E5%BC%80%E5%8F%91/isaac/aws-ros2-isaac.md

### Configurar o ID do servo e a calibração de posição média na página web

https://bambot.org/feetech.js?lang=zh

1、Introduza 0 ou 1 de acordo com o modelo do servo e clique em “Ligar”

![截图_20260413125622.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/1.png)

2、Digitalizar os servos com ID 1~6; pode confirmar o servo correspondente ao ID através do FOUND nos resultados da digitalização. Por exemplo, na imagem o servo com ID 1 foi digitalizado

![截图_20260413125712.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/2.png)

3、Definição do ID e calibração de posição média

①O ID do servo atual introduzido é o ID do servo digitalizado

②Introduza um número em “Gestão de ID” e clique em “Alterar ID” para definir o ID

③Calibração de posição média (a posição média do servo STS3215 é 2047 e a do servo SCS0009 é 511)

Servo STS: introduza 2047 em “Controlo de posição” e clique em “Set”

Servo SCS: introduza 511 em “Controlo de posição” e clique em “Set”

![截图_20260413125748.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/3.png)

<RelatedProducts slugs="so-arm101" />
