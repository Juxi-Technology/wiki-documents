---
title: "Arquivos URDF e materiais de referência"
description: "Referências de URDF e materiais do SO-ARM101: URDF Studio, controle de simulação ROS2, a interface gráfica LeLab e ferramentas para ajustar o ID dos servos."
---

# Arquivos URDF e materiais de referência

## [Arquivo URDF](https://github.com/TheRobotStudio/SO-ARM100/blob/main/Simulation/SO101/so101_new_calib.urdf) oficial do Lerbot

### URDF Studio

https://urdf.d-robotics.cc/

### Controle de simulação ROS2 (você pode implementar por conta própria)

https://github.com/holmsslk/so-arm-moveit-hardware

### Interface gráfica oficial do LeRobot

https://github.com/huggingface/leLab

LeLab é uma aplicação web que integra todo o fluxo de trabalho do LeRobot — calibração, teleoperação, gravação, treinamento e reprodução — em uma única interface de navegador. Basta conectar o braço robótico, abrir o aplicativo e começar a operar. Não são necessárias operações complicadas na linha de comando, nem entrada pelo teclado.

🤗 A entrada web nativa do LeRobot, projetada para permitir que novos usuários concluam todo o processo, do “desempacotamento” até “treinar sua primeira política”, em poucos minutos.

🤗 Instale e execute todos os programas com apenas um comando.

## Controlar o braço seguidor pelo celular

https://huggingface.co/docs/lerobot/main/en/phone_teleop

### Pesquisa e desenvolvimento de robôs na nuvem: implementação da simulação e do fluxo de dados do Lerobot entre dispositivos ROS 2 e o Isaac Sim na AWS

https://github.com/ti/ti.github.io/blob/95261efa4f8bdb4c8571920762318a532e58c7fd/%E5%BC%80%E5%8F%91/isaac/aws-ros2-isaac.md

### Configurar o ID do servo e a calibração de centro pela página web

https://bambot.org/feetech.js?lang=zh

1. Digite 0 ou 1 de acordo com o modelo do servo e clique em “Conectar”

![截图_20260413125622.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/1.png)

2. Escaneie os servos com ID 1~6; você pode confirmar o servo com o ID correspondente pelo FOUND no resultado da varredura. Por exemplo, na imagem o servo ID 1 foi escaneado

![截图_20260413125712.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/2.png)

3. Configuração de ID e calibração de centro

① O ID do servo atual inserido é o ID do servo escaneado

② Digite um número em “Gerenciamento de ID” e clique em “Alterar ID” para definir o ID

③ Calibração de centro (o centro do servo STS3215 é 2047 e o centro do servo SCS0009 é 511)

Servo STS: insira 2047 em “Controle de posição” e clique em “Set”

Servo SCS: insira 511 em “Controle de posição” e clique em “Set”

![截图_20260413125748.png](../../../../../../public/images/tutorials/robot-arms/so-arm101/basics-URDF-Reference/3.png)

<RelatedProducts slugs="so-arm101" />
