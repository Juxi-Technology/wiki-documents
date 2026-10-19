---
title: "Tutoriais do Braço Robótico SO-ARM101"
description: "Página inicial do tutorial do SO-ARM101: o que são inteligência corpórea e LeRobot, o braço, a configuração de computador necessária e o significado da aprendizagem por imitação (VLA), com a navegação completa do curso."
---

# Tutoriais do Braço Robótico SO-ARM101

![image.png](../../../../../public/images/tutorials/robot-arms/so-arm101/so-arm101-index/d02-03.png)

## O que é a Inteligência Corporizada?

Inteligência com um corpo. Liga a IA a diversas entidades físicas de hardware, tais como:

Cães robóticos quadrúpedes, robôs humanoides bípedes, robôs com rodas e pernas, drones, carros autónomos

## O que é o LeRobot?

O LeRobot é a `estrutura de software de robôs inteligentes corporizados` de código aberto da HuggingFace

Endereço GitHub: https://github.com/huggingface/lerobot

Reduz a barreira à **recolha de dados, ao treino de algoritmos e à implementação de inferência** para aprendizagem por reforço e **aprendizagem por imitação (VLA)**, sendo a **aprendizagem por imitação (VLA)** o foco principal

- Que robôs podem ser desenvolvidos com o LeRobot?

Desde o braço robótico SO-ARM 101 da classe dos milhares de yuan e o carrinho LeKiwi, até ao braço AgileX piper da casa dos dez milhares de yuan, ao braço Huaxinjing StarAI e à mão dextra Hope-JR, e ainda ao robô humanoide Unitree G1 da casa das centenas de milhares de yuan. O LeRobot tornou-se o padrão para a recolha de dados e o treino de algoritmos no setor da inteligência corporizada.

Também pode adaptar o seu próprio robô à estrutura LeRobot.

- Conjuntos de dados e modelos LeRobot

O LeRobot define o seu próprio formato de conjunto de dados de aprendizagem por imitação. Pode ver, utilizar, descarregar e treinar com todos os conjuntos de dados e modelos públicos no HuggingFace, e também pode carregar os seus próprios conjuntos de dados para o HuggingFace.

## O que é o Braço Robótico SO-ARM 101?

Este tutorial toma como exemplo o braço robótico SO-ARM 101; utiliza peças estruturais impressas em 3D e servos Feetech, a um custo muito baixo.

Trata-se de um corpo de inteligência corporizada que até um estudante sem recursos pode pagar, e é um dos corpos oficialmente recomendados pelo LeRobot.

O braço é composto por dois braços: um braço Leader e um braço Follower. Cada braço tem 5 graus de liberdade mais 1 grau de liberdade da pinça.

## Que Configuração de Computador Preciso

Um portátil Windows comum consegue fazer tudo até ao treino.

Um Mac comum consegue fazer tudo.

Uma máquina Ubuntu com uma GPU NVIDIA consegue fazer tudo.

Neste tutorial utilizamos uma [plataforma de GPU na nuvem](https://featurize.cn?s=d7ce99f842414bfcaea5662a97581bd1) para treinar os modelos, por isso o seu próprio computador não precisa de uma configuração de topo.

## O que é a **Aprendizagem por Imitação e o VLA**?

Um humano arrasta o robô para demonstrar e recolher um conjunto de dados. Esse conjunto de dados é depois usado para treinar um algoritmo de aprendizagem por imitação, que é finalmente implementado no robô, permitindo-lhe imitar autonomamente as ações humanas e generalizar para o ambiente real. Não é necessária teleoperação nem controlo remoto.

Por exemplo, no vídeo acima, um humano arrasta o braço robótico SO-ARM para agarrar um lagostim-de-água-doce, mergulhá-lo em tempero e deixá-lo cair em óleo quente, e o braço acaba por executar esta ação sozinho. Mesmo com um lagostim novo, consegue reagir e completar a ação em qualquer momento.

A aprendizagem por imitação tem também um nome moderno e de vanguarda: VLA (modelo de grande dimensão Visão-Linguagem-Ação). É também o campo de investigação em inteligência corporizada que atualmente cresce mais depressa, atrai o investimento mais cobiçado, assiste à competição China-EUA mais feroz, desfruta do ecossistema de código aberto mais próspero, atrai intensa atenção dos media e cativa inúmeros estudantes de mestrado e doutoramento.

Os algoritmos que o LeRobot adapta principalmente são os de aprendizagem por imitação, tais como ACT, Diffusion Policy, SmolVLA, Pi0, Pi0.5, Wall-OSS e outros.

A aprendizagem por imitação neste tutorial é exclusivamente VLA.


## Navegação dos tutoriais

### Cursos completos

- [Visão geral do curso de LeRobot](/pt-pt/tutorials/robot-arms/so-arm101/lerobot/)
- [Tutorial do braço robótico SO-ARM101 de 7 eixos](/pt-pt/tutorials/robot-arms/so-arm101/lerobot-7dof/)

### Tutoriais de montagem e expansão

- [Tutorial do Braço Robótico LeRobot](/pt-pt/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Guia de Montagem do Braço Robótico Lerobot](/pt-pt/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [Instalação do Suporte de Braço e Kit de Câmara SO-ARM100&101](/pt-pt/tutorials/robot-arms/so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation)
- [Instalação da Câmara Superior](/pt-pt/tutorials/robot-arms/so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation)
- [Instalação da garra de dedos paralelos](/pt-pt/tutorials/robot-arms/so-arm101/Parallel-Finger-Gripper-Installation)
- [Tutorial do braço duplo SO-ARM101 (dois braços seguidores)](/pt-pt/tutorials/robot-arms/so-arm101/SO-ARM101-Bi-Arm-Tutorial)
- [Teleoperação sem fios do SO-ARM101 (versão ESP32-NanoCam)](/pt-pt/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop)
- [Resolução de problemas de teleoperação](/pt-pt/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Troubleshooting)
- [Tutorial de utilização da ferramenta de calibração de servos da série SoARM](/pt-pt/tutorials/robot-arms/so-arm101/SO-ARM101-Servo-Calibration-Tool)
- [Controlo de simulação ROS2](/pt-pt/tutorials/robot-arms/so-arm101/ROS2-Simulation-Control)
- [Compatibilidade PyTorch no Jetson Orin](/pt-pt/tutorials/robot-arms/so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility)

### Noções básicas

- [Conhecer o LeRobot](/pt-pt/tutorials/robot-arms/so-arm101/basics/Understanding-LeRobot)
- [Conjuntos de dados LeRobot no HuggingFace](/pt-pt/tutorials/robot-arms/so-arm101/basics/HF-Datasets)
- [Materiais para o treino de modelos](/pt-pt/tutorials/robot-arms/so-arm101/basics/Training-Resources)
- [Ficheiros oficiais de impressão 3D do SO-ARM 100](/pt-pt/tutorials/robot-arms/so-arm101/basics/Official-3D-Print-Files)
- [Ficheiros URDF e materiais de referência](/pt-pt/tutorials/robot-arms/so-arm101/basics/URDF-Reference)
- [Suportes e fixações de câmara recomendados](/pt-pt/tutorials/robot-arms/so-arm101/basics/Camera-Mounts-Recommended)

### Tutorial do LeLab

- [1 · Visão geral](/pt-pt/tutorials/robot-arms/so-arm101/lelab/01-Overview)
- [2 · Instalar e executar](/pt-pt/tutorials/robot-arms/so-arm101/lelab/02-Install)
- [3 · Ligar e calibrar](/pt-pt/tutorials/robot-arms/so-arm101/lelab/03-Calibration)
- [4 · Teleoperação](/pt-pt/tutorials/robot-arms/so-arm101/lelab/04-Teleoperation)
- [5 · Gravar um conjunto de dados](/pt-pt/tutorials/robot-arms/so-arm101/lelab/05-Record-Dataset)
- [6 · Treinar e executar inferência](/pt-pt/tutorials/robot-arms/so-arm101/lelab/06-Train-and-Inference)
- [7 · Resolução de problemas](/pt-pt/tutorials/robot-arms/so-arm101/lelab/07-Troubleshooting)
,### Tutorial de simulação MuJoCo,,- [SO-ARM101 × MuJoCo — Tutorial do fluxo completo (índice)](/pt-pt/tutorials/robot-arms/so-arm101/mujoco/),- [01 · Preparação do ambiente](/pt-pt/tutorials/robot-arms/so-arm101/mujoco/01-Environment),- [02 · Verificação do modelo de simulação (carregamento e acionamento MJCF)](/pt-pt/tutorials/robot-arms/so-arm101/mujoco/02-Sim-Model-Verification),- [03 · Ligação ao robô real e calibração](/pt-pt/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration),- [04 · Teleoperação por teclado](/pt-pt/tutorials/robot-arms/so-arm101/mujoco/04-Keyboard-Teleop),- [05 · Gémeo digital do braço líder (braço físico a comandar o braço simulado)](/pt-pt/tutorials/robot-arms/so-arm101/mujoco/05-Leader-Digital-Twin),- [06 · Gravação e reprodução de dados](/pt-pt/tutorials/robot-arms/so-arm101/mujoco/06-Record-and-Replay),- [07 · Problemas comuns e lições aprendidas](/pt-pt/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting),- [08 · Próximos passos](/pt-pt/tutorials/robot-arms/so-arm101/mujoco/08-Roadmap),- [09 · Tutorial de utilização completo (braço → conjunto de dados → ver vídeos → treino → implementação)](/pt-pt/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial)

### Tutorial da imagem Docker do XLeRobot

- [Tutorial do XLeRobot Docker — Kit de Desenvolvedor Jetson AGX Orin](/pt-pt/tutorials/jetson-agx-orin/xlerobot-docker/deployment/01-Overview)
- [Tutorial do XLeRobot Docker — Kit de Desenvolvedor Jetson Orin Nano Super](/pt-pt/tutorials/jetson-orin-nano/xlerobot-docker/deployment/01-Overview)

<RelatedProducts slugs="so-arm101" />
